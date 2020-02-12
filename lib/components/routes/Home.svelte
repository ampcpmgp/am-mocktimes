<script>
  import { name, greeting } from '../../states/mock'
</script>

<h1>{$greeting}</h1>
<input bind:value={$name} />
