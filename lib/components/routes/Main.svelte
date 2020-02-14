<script>
  import { push } from 'svelte-spa-router'
  import { isOpen } from '../../states/help'
  import { treeData } from '../../states/mock'
  import Header from '../parts/Header/Header'
  import Help from '../parts/Help/Help'
  import MockTree from '../parts/MockTree/MockTree'

  function showMock(e) {
    const json = JSON.stringify(e.detail)
    push('/' + json)
  }
</script>

<Header on:helpclick={() => ($isOpen = true)} />
{#if $isOpen}
  <Help on:overlayclick={() => ($isOpen = false)} />
{/if}

<MockTree treeData={$treeData} on:actionclick={showMock} />
