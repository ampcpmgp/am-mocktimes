<script>
  import { push } from "svelte-spa-router";
  import { isOpen } from "../../states/help";
  import { treeData } from "../../states/mock";
  import { resetLastExecuted } from "../../utils/patterns";
  import { setLastOpenName } from "../../utils/localForage";
  import Header from "../parts/Header/Header.svelte";
  import Help from "../parts/Help/Help.svelte";
  import MockTree from "../parts/MockTree/MockTree.svelte";

  function saveOpenStatus(e) {
    const { nameTree, isOpen } = e.detail;
    setLastOpenName(nameTree, isOpen);
  }

  function showMock(e) {
    const { mockUrl, treeItem } = e.detail;

    resetLastExecuted($treeData);
    treeItem.lastExecuted = true;
    $treeData = $treeData;

    const viewInfo = {
      mockUrl,
      target: treeItem.target,
    };

    const viewInfoJson = JSON.stringify(viewInfo);

    push("/" + viewInfoJson);
  }
</script>

<style>
  .content-wrapper {
    margin: 4px 8px;
  }
</style>

<Header on:helpclick={() => ($isOpen = true)} />
{#if $isOpen}
  <Help on:overlayclick={() => ($isOpen = false)} />
{/if}

<div class="content-wrapper">
  <MockTree
    treeData={$treeData}
    on:actionClick={showMock}
    on:changeOpenStatus={saveOpenStatus} />
</div>
