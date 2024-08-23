<script>
  import { onMount } from 'svelte';

  let openOrders = [];
  let selectedOrders = [];
  let dateReceived = new Date().toISOString().split('T')[0];
  let signature = '';

  // onMount(async () => {
  //   openOrders = await getOpenOrders();
  // });

  async function submitReceivedOrders() {
    await receiveOrders(selectedOrders, dateReceived, signature);
    // Reset form or navigate to confirmation page
  }
</script>

<form on:submit|preventDefault={submitReceivedOrders}>
  <input type="date" bind:value={dateReceived}>
  <input type="text" bind:value={signature} placeholder="Your Signature">

  {#each openOrders as order}
    <label>
      <input type="checkbox" bind:group={selectedOrders} value={order.id}>
      {order.item} - {order.grant}
    </label>
  {/each}

  <button type="submit">Mark as Received</button>
</form>