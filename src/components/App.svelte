<script>
  import Router from 'svelte-spa-router'
  import Header from './parts/Header/Header'
  import routes from './routes'
</script>

<Header name="World" />
<Router {routes} />
