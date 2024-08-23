<script>
  import OrderTable from '$lib/components/OrderTable.svelte';
  import { onMount } from 'svelte';
  import { getOpenOrders } from '$lib/api';
  let dummyOrders = null;
  let pendingOrders = [
    {
      name: '',
      orderer: '',
      teams: [],
      orderNum: '',
      listPrice: '',
      quantity: '',
      totalPrice: '',
      grants: [{name: '', percentage: '50'}],
      seller: '',
      link: '',
      priority: '',
      submissionDate: '',
      comments: ''
    }
  ]
  onMount(async () => {
    pendingOrders = await getOpenOrders();
    console.log(pendingOrders)
  });

  async function loadPendingTable() {
    pendingOrders = await getOpenOrders();
  }
</script>

<div class="top-bar">
  <h1>Order Management System</h1>
  <i class="fa-solid fa-circle-info fa-2xl" style="margin-top: 2.5%;"></i>
  <i class="fa-solid fa-bug fa-2xl" style="margin-top: 2.5%;"></i>
</div>

<div style="display: flex;">
  <h3>Pending Orders</h3>
  <button on:click={loadPendingTable} class="refresh-button"><i class="fa-solid fa-arrows-rotate fa-xl refresh-icon"></i></button>
</div>
<OrderTable orders={pendingOrders} />

<style>
  .top-bar {
    margin: 1%;
    display: flex;
  }

  i {
    margin: 1%;
  }

  h3 {
    margin: 1%;
  }

  .refresh-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .refresh-icon {
    transform: rotate(0deg);
    transition: 0.5s ease;
  }

  .refresh-icon:hover {
    color: gray;
    transform: rotate(90deg);
  }

</style>
