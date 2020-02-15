<script>
  import { push } from 'svelte-spa-router'
  import { isOpen } from '../../states/help'
  import { treeData } from '../../states/mock'
  import { resetLastExecuted } from '../../utils/patterns'
  import Header from '../parts/Header/Header'
  import Help from '../parts/Help/Help'
  import MockTree from '../parts/MockTree/MockTree'

  function showMock(e) {
    const { mockUrl, treeItem } = e.detail

    resetLastExecuted($treeData)
    treeItem.lastExecuted = true
    $treeData = $treeData

    push('/' + mockUrl)
  }
</script>

<Header on:helpclick={() => ($isOpen = true)} />
{#if $isOpen}
  <Help on:overlayclick={() => ($isOpen = false)} />
{/if}

<MockTree treeData={$treeData} on:actionclick={showMock} />
