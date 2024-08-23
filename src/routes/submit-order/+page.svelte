<script>
  // import { onMount } from 'svelte';
  import { createOrder } from '$lib/api.js';

  let date = new Date().toISOString().split('T')[0];
  let orderer = '';
  let orders = [{ grant: [{name: '', percentage: ''}], item: '', company: '', link: '', catalogNumber: '', listPrice: 0, quantity: 1, totalPrice: 0, comments: '', team: [''], urgent: false }];
  let grants = ['MPA', 'IR&D', 'RVP', 'Lab Management'];
  let teams = ['MPA', 'Bioinformatics', 'RVP', 'Lab Management', 'Molecular Biology'];
  let isLoading = false;
  let showPopup = null;

  $: orders = orders.map(order => ({
    ...order,
    totalPrice: (order.listPrice * order.quantity).toFixed(2)
  }));

  // onMount(async () => {
  //   // Fetch grants and teams from API
  //   // grants = await fetchGrants();
  //   // teams = await fetchTeams();
  // });

  function addOrder() {
    orders = [...orders, { grant: [{name: '', percentage: ''}], item: '', company: '', catalogNumber: '', listPrice: 0, quantity: 1, totalPrice: 0, comments: '', team: [''], urgent: false }];
  }

  function addGrant(i) {
    orders[i].grant = [...orders[i].grant, {name: '', percentage: ''}] 
  }

  function addTeam(i) {
    orders[i].team = [...orders[i].team, ''] 
  }

  // function calculateTotalPrice(order) {
  //   order.totalPrice = order.listPrice * order.quantity;
  // }

  async function submitOrders() {
    let success = true;
    isLoading = true;
    for (let order of orders) {
      success = await createOrder({ ...order, date, orderer });
      if (!success) {
        showPopup = 'order_submit_fail';
        break
      }
    }
    if (success) {
      showPopup = 'success';
    }
    orders = [{ grant: '', item: '', company: '', catalogNumber: '', listPrice: 0, quantity: 1, totalPrice: 0, comments: '', team: [''], urgent: false }];
    date = new Date().toISOString().split('T')[0];
    orderer = '';
    isLoading = false;
  }

  function closePopup() {
    showPopup = null;
  }
</script>
<h1>Submit Order(s)</h1>
<div class="order-form">
  <form on:submit|preventDefault={submitOrders}>
    <div class="input-object">
      <label for="order-date">Order Date</label>
      <input type="date" id="order-date" bind:value={date}>
    </div>
    <div class="input-object">
      <label for="orderer">Orderer Name</label>
      <input type="text" id="orderer" bind:value={orderer} placeholder="Your Name">
    </div>
    {#each orders as order, i}
      <div>
        <div class="input-object">
          <label for="grants">Grant/Project</label>
          <div class="grants">
            {#each order.grant as orderGrant}
              <div class="grant">
                <select id="grants" bind:value={orderGrant.name}>
                  {#each grants as grant}
                    <option value={grant}>{grant}</option>
                  {/each}
                </select>
                <input type="number" id={"percentage" + i} class="percentage" min=1 step=1 bind:value={orderGrant.percentage}>
                <i class="fa-solid fa-percent" style="margin-top: 5px;"></i>
              </div>
            {/each}
          </div>
          <button type="button" on:click={() => addGrant(i)}><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="input-object">
          <label for={"item" + i}>Item Name</label>
          <input type="text" id={"item" + i} bind:value={order.item} placeholder="Item Name...">
        </div>
        <div class="input-object">
          <label for={"company" + i}>Seller</label>
          <input type="text" id={"company" + i} bind:value={order.company} placeholder="Company...">
        </div>
        <div class="input-object">
          <label for={"link" + i}>Link</label>
          <input type="text" id={"link" + i} bind:value={order.link} placeholder="Hyperlink...">
        </div>
        <div class="input-object">
          <label for={"catalog-num" + i}>Catalog Number</label>
          <input type="text" id={"catalog-num" + i} bind:value={order.catalogNumber} placeholder="Catalog Number...">
        </div>
        <div class="input-object">
          <label for={"list-price" + i}>List Price</label>
          <input type="number" id={"list-price" + i} bind:value={order.listPrice}>
        </div>
        <div class="input-object">
          <label for={"quantity" + i}>Quantity</label>
          <input type="number" id={"quantity" + i} min=1 step=1 bind:value={order.quantity}>
        </div>
        <div class="input-object">
          <label for={"total-price" + i}>Total Price</label>
          <span id={"total-price" + i}>${order.totalPrice}</span>
        </div>
        <div class="input-object">
        <label for="comments">Comments</label>
          <textarea id="comments" bind:value={order.comments}></textarea>
        </div>
        <div class="input-object">
          <label for="teams">Team(s)</label>
          <div class="teams">
            {#each order.team as orderTeam}
              <div class="team">
                <select id="teams" bind:value={orderTeam}>
                  {#each teams as team}
                    <option value={team}>{team}</option>
                  {/each}
                </select>
              </div>
            {/each}
          </div>
          <button type="button" on:click={() => addTeam(i)}><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="input-object">
          <label for="urgent">Urgent?</label>
          <input type="checkbox" id="urgent" bind:checked={order.urgent}>
        </div>
      </div>
      <div class="order-sep">

      </div>
    {/each}
    <div class="buttons">
      <button type="button" on:click={addOrder}>Add Another Order</button>
      <button type="submit">Submit Orders</button>
    </div>
  </form>
</div>
{#if isLoading}
  <div class="modal">
    <div class="modal-content">
      <p>Loading...</p>
    </div>
  </div>
{/if}

{#if showPopup === 'success'}
  <div class="popup">
    <div class="popup-content success">
      <p>Form submitted successfully!</p>
      <button on:click={closePopup}>OK</button>
    </div>
  </div>
{/if}

{#if showPopup === 'order_submit_fail'}
  <div class="popup">
    <div class="popup-content failure">
      <p>Failed to submit the form. Please try again.</p>
      <button on:click={closePopup}>OK</button>
    </div>
  </div>
{/if}

<style>
  h1 {
    margin-left: 2%;
  }

  textarea {
    height: 150px;
    width: 400px;
  }

  .order-form {
    margin-left: 2%;
    margin-bottom: 5%;
    margin: 0 auto;
  }

  .order-sep {
    height: 10px;
    width: 90%;
    border: 2px solid gray;
    margin: 2%;
    background-color: gray;
  }

  form {
    display: block;
  }

  .input-object {
    margin: 1%;
    display: flex;
  }

  .grant, .team {
    display: flex;
    margin-bottom: 5px;
  }

  label {
    margin-right: 10px;
    text-align: right;
    width: 150px;
  }

  input {
    padding: 5px;
    width: 500px;
  }

  input[type=checkbox] {
    width: 20px;
  }

  .percentage {
    width: 50px;
    margin-left: 1%;
    margin-right: 5px;
  }

  select {
    width: 500px;
    height: 30px;
  }

  .buttons {
    margin: 1%;
  }

  button {
    width: 150px;
    height: 50px;
    cursor: pointer;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    cursor: pointer;
  }

  .popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }

  .popup-content.success {
    border: 2px solid green;
  }

  .popup-content.failure {
    border: 2px solid red;
  }

  .input-object > button {
    height: 30px;
    width: 30px;
    margin-left: 1%;
  }
</style>