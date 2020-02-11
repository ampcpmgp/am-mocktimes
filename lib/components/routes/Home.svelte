<script>
  import { name, greeting } from '../../states/greetings/greetings'
</script>

<h1>{$greeting}</h1>
<input bind:value={$name} />
