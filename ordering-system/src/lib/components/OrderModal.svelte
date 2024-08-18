<script>
  import { createEventDispatcher } from 'svelte';
  import { updateOrder } from '$lib/api';

  export let order;

  const dispatch = createEventDispatcher();

  async function saveChanges() {
    await updateOrder(order.id, order);
    dispatch('close');
  }
</script>

<div class="modal">
  <h2>Order Details</h2>
  <input bind:value={order.item}>
  <input bind:value={order.grant}>
  <!-- Add other fields -->
  <textarea bind:value={order.comments}></textarea>
  <button on:click={saveChanges}>Save Changes</button>
  <button on:click={() => dispatch('close')}>Close</button>
</div>