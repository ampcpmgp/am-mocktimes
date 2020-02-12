<script>
  import Router from 'svelte-spa-router'
  import routes from './routes'
</script>

<style>
  :global(body) {
    background-color: #eee;
  }
</style>

<Router {routes} />
