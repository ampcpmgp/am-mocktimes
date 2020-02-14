<script>
  import { isOpen } from '../../states/help'
  import Header from '../parts/Header/Header'
  import Help from '../parts/Help/Help'
</script>

<Header on:helpclick={() => ($isOpen = true)} />
{#if $isOpen}
  <Help on:overlayclick={() => ($isOpen = false)} />
{/if}
