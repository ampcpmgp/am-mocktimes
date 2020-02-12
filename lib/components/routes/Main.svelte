<script>
  import { isOpen } from '../../states/help'
  import Header from '../parts/Header/Header'
</script>

<Header on:helpclick={() => isOpen.set(true)} />
{#if $isOpen}aaa{/if}
