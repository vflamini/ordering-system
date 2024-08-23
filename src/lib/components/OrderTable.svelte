<script>
  import TextBubble from '$lib/components/TextBubble.svelte';
  export let orders = [{
    name: '',
    orderer: '',
    teams: [],
    orderNum: '',
    listPrice: '',
    quantity: '',
    totalPrice: '',
    grants: [{name: '', percentage: ''}],
    seller: '',
    link: '',
    priority: '',
    submissionDate: '',
    comments: ''
  }]
</script>

<div class="table-container" style="display: flex;">
  <table>
    <thead>
      <tr>
        <th>Item Name</th>
        <th>Orderer Name</th>
        <th>Team(s)</th>
        <th>Order #</th>
        <th>List Price</th>
        <th>Quantity</th>
        <th>Total Price</th>
        <th>Grant(s)</th>
        <th>Seller</th>
        <th>Link</th>
        <th>Priority</th>
        <th>Submission Date</th>
        <th>Comments</th>
      </tr>
    </thead>
    <tbody>
      {#each orders as order}
        <tr>
          <td class="cut-off-text">{order.name}</td>
          <td>{order.orderer}</td>
          <td class="bubble-td">
            <div class="bubble-container">
              {#each order.teams as team}
                <TextBubble bubbleText={team} />
              {/each}
              <div style="clear: both;"></div>
           </div>
           <div style="clear: both;"></div>
          </td>
          <td>{order.orderNum}</td>
          <td>${order.listPrice}</td>
          <td>{order.quantity}</td>
          <td>${order.totalPrice}</td>
          <td class="bubble-td">
            <div class="bubble-container">
              {#each order.grants as grant}
                <TextBubble bubbleText={grant.name + ' ' + grant.percentage + '%'} />
              {/each}
            </div>
          </td>
          <td>{order.seller}</td>
          <td><a href={order.link} target="_blank"><i class='fa-solid fa-link'></i></a></td>
          <td class={order.priority.toLowerCase() + '-priority'}>
            <i class={'fa-solid fa-circle-dot fa-xs' + ' ' + order.priority.toLowerCase() + '-dot'}></i>
            {order.priority}
          </td>
          <td>{order.submissionDate}</td>
          <td></td>
        </tr>
      {/each}
    </tbody>
  </table>
  <table class="button-table">
    <tr>
      <th class="button-th"></th>
    </tr>
    {#each orders as order}
      <tr>
        <td class="button-td">
          <button class="cancel-button">
            <i class="fa-solid fa-x"></i>
          </button>
        </td>
      </tr>
    {/each}
  </table>
</div>

<style>
  i {
    margin: 1%;
  }

  .table-container {
    padding: 1%;
    overflow-x: auto;
  }

  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  td, th {
    padding: 5px;
    text-align: center;
    white-space: nowrap;
  }

  td {
    height: 58px;
  }

  .bubble-container {
    display: flex;
    padding: 5px;
    overflow-x: scroll;
  }

  .bubble-td {
    width: 500px;
  }

  .cut-off-text {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 225px;
  }

  .button-table, .button-td, .button-th {
    margin-left: 1%;
    border: none;
    padding: 5px;
    height: 58.34px;
  }

  .button-th {
    height: 30px;
  }

  .normal-priority {
    background-color: rgb(223, 255, 223);
  }

  .normal-dot {
    color:green;
  }

  .urgent-priority {
    background-color: rgb(255, 194, 194);
  }

  .urgent-dot {
    color:red;
  }
  
  div::-webkit-scrollbar {
    height: 5px;
  }

  div::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }

  div::-webkit-scrollbar-thumb {
    background: #888; 
  }

  div::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }

  .cancel-button {
    background-color: darkgray;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
    width: 35px;
  }

  .cancel-button:hover {
    background-color: rgb(243, 86, 86);
    border: 1px solid rgb(252, 54, 54);
  }

  button {
    cursor: pointer;
  }
</style>