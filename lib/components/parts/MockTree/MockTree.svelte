<script>
  import { createEventDispatcher } from 'svelte'
  import { reflectSwitchData } from '../../../utils/patterns'
  export let treeData

  const dispatch = createEventDispatcher()

  function getMockUrl(treeItem) {
    const actionsJson = JSON.stringify(treeItem.actions)
    const mockUrl = `${treeItem.url}?__amMocktimes__=${actionsJson}`

    return mockUrl
  }

  function onActionClick(treeItem) {
    dispatch('actionclick', {
      mockUrl: getMockUrl(treeItem),
      treeItem,
    })
  }

  function onSwitch(treeItem, switchItem) {
    reflectSwitchData(treeItem, switchItem)
    treeData = treeData
  }

  function toggleItem(treeDataItem) {
    treeDataItem.isOpen = !treeDataItem.isOpen
    treeData = treeData
  }
</script>

<style>
  .tree-ul {
    display: grid;
  }

  .tree-li {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-template-areas:
      '. . description'
      '. . .';
    justify-content: start;
    align-items: center;
    grid-column-gap: 6px;
  }
  .tree-li.has-switch {
    grid-template-columns: auto auto auto 1fr;
    grid-template-areas:
      '. . . description'
      '. . . .';
  }

  .open-close-icon {
    cursor: pointer;
    user-select: none;
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
    border: solid 2px #555;
  }
  .open-close-icon:hover {
    background-color: #ccc;
  }
  .open-close-icon.hide {
    visibility: hidden;
  }

  .action {
    cursor: pointer;
    color: blue;
    padding: 2px 4px;
    margin-top: 2px;
    margin-bottom: 2px;
    box-sizing: border-box;
    line-height: 1.15;
    text-decoration: none;
  }
  .action:hover {
    opacity: 0.4;
  }
  .action.executed {
    border: 1px solid #555;
    border-radius: 4px;
  }

  small {
    grid-area: description;
    white-space: pre-line;
    margin-left: 6px;
  }

  .child {
    margin-left: 10px;
    grid-column: 1 / -1;
  }

  .switch-ul {
    display: grid;
    grid-auto-flow: column;
  }

  .switch-ul li {
    cursor: pointer;
    border: 1px solid rgba(255, 128, 0, 0.6);
    padding: 0 6px;
    text-align: center;
    display: inline-block;
    line-height: 1.15;
  }
  .switch-ul li.selected {
    background-color: yellow;
  }
</style>

<ul class="tree-ul">
  {#each treeData as item}
    <li class="tree-li {item.hasSwitch ? 'has-switch' : ''}">
      <div
        class="open-close-icon"
        class:hide={!item.hasChild}
        on:click={() => toggleItem(item)}>
        {item.isOpen ? '-' : '+'}
      </div>

      <a
        href={getMockUrl(item)}
        class="action"
        class:executed={item.lastExecuted}
        on:click|preventDefault={() => onActionClick(item)}>
        {item.name}
      </a>

      {#if item.hasSwitch}
        <ul class="switch-ul">
          {#each item.switchData as switchItem}
            <li
              class:selected={item.selected.name === switchItem.name}
              on:click={() => onSwitch(item, switchItem)}>
              {switchItem.name}
            </li>
          {/each}
        </ul>
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
