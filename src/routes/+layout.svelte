<script>
  import { page } from '$app/stores';
</script>

<div class="container">
  <aside class="sidebar">
    <i class="fa-solid fa-bars fa-2xl" style="margin-bottom: 5%"></i>
    <nav>
      <ul>
        <li><a href="/">HOME</a></li>
        <li><a href="/submit-order">SUBMIT ORDER</a></li>
        <li><a href="/my-orders">MY ORDERS</a></li>
        <li><a href="/all-orders">ALL ORDERS</a></li>
        <li><a href="/receive-orders">RECEIVE ORDERS</a></li>
      </ul>
    </nav>
  </aside>
  <main>
    <slot />
  </main>
</div>

<style>
  a {
    display: flex;
    color: black;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  i {
    cursor: pointer;
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    text-align: center;
    align-items: center;
    width: 100%;
    margin-top: 5%;
  }

  nav ul {
    list-style-type: none;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  nav li {
    height: 12%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    color: black;
  }

  nav li:hover {
    background-color: rgb(195, 195, 255);
  }

  .sidebar {
    width: 250px;
    background-color: #f4f4f4;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding-top: 10vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  
  .container {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  
  main {
    height: 100%;
    width: 100%;
  }

</style>