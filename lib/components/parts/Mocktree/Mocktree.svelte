<script>
  import { createEventDispatcher } from 'svelte'
  import {
    getActionKeys,
    getDescription,
    hasChild,
    getActions,
  } from '../../../utils/patterns'
  export let patterns
  export let url
  export let actions

  const actionKeys = getActionKeys(patterns)
  const dispatch = createEventDispatcher()

  let treeItems = actionKeys.map(key => {
    const itemPatterns = patterns[key]

    const itemActions = [...actions, ...getActions(itemPatterns)]
    let itemUrl = url

    if (itemPatterns.settings && itemPatterns.settings.url) {
      itemUrl = itemPatterns.settings.url
    }

    return {
      name: key,
      isOpen: false,
      patterns: itemPatterns,
      hasChild: hasChild(itemPatterns),
      url: itemUrl,
      actions: itemActions,
    }
  })

  function onActionClick(treeItem) {
    const decodeActions = encodeURIComponent(JSON.stringify(treeItem.actions))
    const mockUrl = `${treeItem.url}?__amMocktimes__=${decodeActions}`

    dispatch('actionclick', {
      mockUrl,
    })
  }

  function toggleItem(treeItem) {
    treeItem.isOpen = !treeItem.isOpen
    treeItems = treeItems
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
    color: #555;
    line-height: 0px;
    font-weight: bold;
    font-family: sans-serif;
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
        on:click={() => toggleItem(treeItem)}>
        {treeItem.isOpen ? '-' : '+'}
      </div>

      <div class="action" on:click={() => onActionClick(treeItem)}>
        {treeItem.name}
      </div>

      <small>{getDescription(patterns, treeItem.name)}</small>

      {#if treeItem.isOpen}
        <div class="child">
          <svelte:self
            on:actionclick
            patterns={treeItem.patterns}
            actions={treeItem.actions}
            url={treeItem.url} />
        </div>
      {/if}
    </li>
  {/each}
</ul>
