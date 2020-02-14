<script>
  import { push } from 'svelte-spa-router'
  import { isOpen } from '../../states/help'
  import { treeData } from '../../states/mock'
  import { resetLastExecuted } from '../../utils/patterns'
  import Header from '../parts/Header/Header'
  import Help from '../parts/Help/Help'
  import MockTree from '../parts/MockTree/MockTree'

  function showMock(e) {
    const { refresh, mockUrl, treeItem } = e.detail

    // TODO: 実装
    resetLastExecuted($treeData)
    treeItem.lastExecuted = true
    $treeData = $treeData

    void (push, refresh, mockUrl)

    // treeItem.lastExecuted = true
    //   refresh()
    // setTimeout(() => {
    //   resetLastExecuted($treeData)
    //   refresh()
    // }, 1000)

    // refreshCache()
    // treeItem.lastExecuted = true
    // refresh()

    // refreshCache = refresh
    // push('/' + e.detail.mockUrl)
  }
</script>

<Header on:helpclick={() => ($isOpen = true)} />
{#if $isOpen}
  <Help on:overlayclick={() => ($isOpen = false)} />
{/if}

<MockTree treeData={$treeData} on:actionclick={showMock} />
