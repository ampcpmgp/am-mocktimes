<script>
  import { createEventDispatcher } from 'svelte'
  export let treeData

  const dispatch = createEventDispatcher()

  function onActionClick(treeItem) {
    const decodeActions = encodeURIComponent(JSON.stringify(treeItem.actions))
    const mockUrl = `${treeItem.url}?__amMocktimes__=${decodeActions}`

    dispatch('actionclick', {
      mockUrl,
    })
  }

  function toggleItem(treeDataItem) {
    treeDataItem.isOpen = !treeDataItem.isOpen
    treeData = treeData
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

  li.has-switch {
    grid-template-columns: auto auto auto 1fr;
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
    grid-column: 3 / span 1;
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
  {#each treeData as item}
    <li>
      <div
        class="open-close-icon {item.hasChild ? '' : 'hide'}"
        on:click={() => toggleItem(item)}>
        {item.isOpen ? '-' : '+'}
      </div>

      <div class="action" on:click={() => onActionClick(item)}>{item.name}</div>

      {#if item.switch}
        <div>1</div>
      {/if}

      <small>{item.description}</small>

      {#if item.isOpen}
        <div class="child">
          <svelte:self on:actionclick treeData={item.treeData} />
        </div>
      {/if}
    </li>
  {/each}
</ul>
