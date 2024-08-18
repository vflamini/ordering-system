<script>
  import { onMount } from 'svelte';
  import { createOrder, fetchGrants, fetchTeams } from '$lib/api';

  let orderDate = new Date().toISOString().split('T')[0];
  let personName = '';
  let orders = [{ grant: '', item: '', company: '', catalogNumber: '', listPrice: 0, quantity: 1, totalPrice: 0, comments: '', team: '', urgent: false }];
  let grants = [];
  let teams = [];

  onMount(async () => {
    // Fetch grants and teams from API
    grants = await fetchGrants();
    teams = await fetchTeams();
  });

  function addOrder() {
    orders = [...orders, { grant: '', item: '', company: '', catalogNumber: '', listPrice: 0, quantity: 1, totalPrice: 0, comments: '', team: '', urgent: false }];
  }

  function calculateTotalPrice(order) {
    order.totalPrice = order.listPrice * order.quantity;
  }

  async function submitOrders() {
    for (let order of orders) {
      await createOrder({ ...order, orderDate, personName });
    }
    // Reset form or navigate to confirmation page
  }
</script>

<form on:submit|preventDefault={submitOrders}>
  <input type="date" bind:value={orderDate}>
  <input type="text" bind:value={personName} placeholder="Your Name">
  
  {#each orders as order, i}
    <div>
      <select bind:value={order.grant}>
        {#each grants as grant}
          <option value={grant}>{grant}</option>
        {/each}
      </select>
      <input type="text" bind:value={order.grant} placeholder="New Grant">
      <input type="text" bind:value={order.item} placeholder="Item Name">
      <input type="text" bind:value={order.company} placeholder="Company">
      <input type="text" bind:value={order.catalogNumber} placeholder="Catalog Number">
      <input type="number" bind:value={order.listPrice} on:input={() => calculateTotalPrice(order)}>
      <input type="number" bind:value={order.quantity} on:input={() => calculateTotalPrice(order)}>
      <span>{order.totalPrice}</span>
      <textarea bind:value={order.comments}></textarea>
      <select bind:value={order.team}>
        {#each teams as team}
          <option value={team}>{team}</option>
        {/each}
      </select>
      <input type="checkbox" bind:checked={order.urgent}>
    </div>
  {/each}
  
  <button type="button" on:click={addOrder}>Add Another Order</button>
  <button type="submit">Submit Orders</button>
</form>