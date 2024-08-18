<script>
  import { onMount } from 'svelte';
  import { getAllOrders, updateOrder } from '$lib/api';
  import OrderModal from '$lib/components/OrderModal.svelte';

  let orders = [];
  let showReceived = true;
  let selectedOrder = null;

  onMount(async () => {
    orders = await getAllOrders();
  });

  function toggleReceived() {
    showReceived = !showReceived;
    // Filter orders based on showReceived
  }

  function openOrderModal(order) {
    selectedOrder = order;
  }

  async function updateOrderStatus(order, status) {
    await updateOrder(order.id, { status });
    // Refresh orders
  }
</script>

<label>
  <input type="checkbox" bind:checked={showReceived}>
  Show Received Orders
</label>

<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Person</th>
      <th>Grant</th>
      <th>Item</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each orders as order}
      <tr class:urgent={order.urgent}>
        <td>{order.orderDate}</td>
        <td>{order.personName}</td>
        <td>{order.grant}</td>
        <td>{order.item}</td>
        <td>{order.status}</td>
        <td>
          <button on:click={() => updateOrderStatus(order, 'open')}>Open</button>
          <button on:click={() => updateOrderStatus(order, 'ordered')}>Ordered</button>
          <button on:click={() => updateOrderStatus(order, 'received')}>Received</button>
          <button on:click={() => openOrderModal(order)}>Details</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

{#if selectedOrder}
  <OrderModal order={selectedOrder} on:close={() => selectedOrder = null} />
{/if}