<script>
  import { location, querystring } from 'svelte-spa-router'

  const url = $location.replace(/\//, '') + '?' + $querystring
</script>

<div>{url}</div>
