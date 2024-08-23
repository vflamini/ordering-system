<script>
  export let bubbleText = '';
</script>
<div class="bubble">
  {bubbleText.toLowerCase()}
</div>

<style>
  .bubble {
    border: 1px solid blue;
    border-radius: 10px;
    font-size: 11px;
    padding: 3px;
    background-color: rgb(99, 99, 252);
    color: white;
    font-family: 'Libre Franklin';
    margin: 2%;
  }
</style>