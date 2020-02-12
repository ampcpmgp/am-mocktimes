<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function onHelpClick() {
    dispatch('helpclick')
  }
</script>

<style>
  header {
    width: 100%;
    background: #333;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    align-items: center;
  }
  h1 {
    color: white;
    font-size: 20px;
  }
  div {
    width: 24px;
    height: 24px;
    margin: 6px;
    border-radius: 12px;
    background-color: white;
    cursor: pointer;
    display: grid;
    align-items: center;
    justify-content: center;
  }
</style>

<header>
  <h1>AM: MockTimes 🔧</h1>
  <div on:click={onHelpClick}>?</div>
</header>
