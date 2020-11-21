<script>
  import { push } from 'svelte-spa-router'
  import { isOpen } from '../../states/help'
  import { treeData } from '../../states/mock'
  import { resetLastExecuted } from '../../utils/patterns'
  import { setLastOpenName } from '../../utils/localForage'
  import Header from '../parts/Header/Header'
  import Help from '../parts/Help/Help'
  import MockTree from '../parts/MockTree/MockTree'

  function saveOpenStatus(e) {
    const { nameTree, isOpen } = e.detail
    setLastOpenName(nameTree, isOpen)
  }

  function showMock(e) {
    const { mockUrl, treeItem } = e.detail

    resetLastExecuted($treeData)
    treeItem.lastExecuted = true
    $treeData = $treeData

    const viewInfo = {
      mockUrl: decodeURIComponent(mockUrl),
      target: treeItem.target,
    }

    const viewInfoJson = encodeURIComponent(JSON.stringify(viewInfo))

    push('/' + viewInfoJson)
  }
</script>

<Header on:helpclick={() => ($isOpen = true)} />
{#if $isOpen}
  <Help on:overlayclick={() => ($isOpen = false)} />
{/if}

<MockTree
  treeData={$treeData}
  on:actionClick={showMock}
  on:changeOpenStatus={saveOpenStatus} />
