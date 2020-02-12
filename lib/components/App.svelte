<script>
  import Router from 'svelte-spa-router'
  import Header from './parts/Header/Header'
  import routes from './routes'
</script>

<style>
  :global(body) {
    background-color: #eee;
  }
</style>

<Header text="World" />
<Router {routes} />
