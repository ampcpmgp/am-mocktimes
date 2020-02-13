<script>
  import { createEventDispatcher } from 'svelte'
  import {
    getActionKeys,
    getDescription,
    hasChild,
  } from '../../../utils/patterns'
  export let patterns
  export let url

  const actionKeys = getActionKeys(patterns)
  const dispatch = createEventDispatcher()

  const treeItems = actionKeys.map(key => {
    const itemPatterns = patterns[key]

    return {
      name: key,
      isOpen: false,
      patterns: itemPatterns,
      hasChild: hasChild(itemPatterns),
    }
  })

  function onActionClick(actionKey) {
    dispatch('actionclick', {
      actionKey,
    })
  }
</script>

<style>
  ul {
    display: grid;
  }

  li {
    padding: 2px;
    display: grid;
    grid-template-columns: auto auto 1fr;
    justify-content: start;
    align-items: center;
    grid-column-gap: 6px;
  }

  .open-close-icon {
    cursor: pointer;
    user-select: none;
    border: solid 2px #555;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    display: grid;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 0px;
  }

  .action {
    cursor: pointer;
    color: blue;
  }

  small {
    white-space: pre-line;
    margin-left: 6px;
  }

  .child {
    margin-left: 10px;
    grid-column: 1 / -1;
  }

  .hide {
    visibility: hidden;
  }
</style>

<ul>
  {#each treeItems as treeItem}
    <li>
      <div
        class="open-close-icon {treeItem.hasChild ? '' : 'hide'}"
        on:click={() => (treeItem.isOpen = !treeItem.isOpen)}>
        {treeItem.isOpen ? '-' : '+'}
      </div>

      <div class="action" on:click={() => onActionClick(treeItem.name)}>
        {treeItem.name}
      </div>

      <small>{getDescription(patterns, treeItem.name)}</small>

      {#if treeItem.isOpen}
        <div class="child">
          <svelte:self patterns={treeItem.patterns} />
        </div>
      {/if}
    </li>
  {/each}
</ul>
