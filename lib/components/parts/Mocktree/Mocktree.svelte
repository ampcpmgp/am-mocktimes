<script>
  import { createEventDispatcher } from 'svelte'
  import { getActionKeys } from '../../../utils/patterns'
  export let patterns
  export let url

  const dispatch = createEventDispatcher()

  function onActionClick(actionKey) {
    console.log(actionKey)
    dispatch('actionclick', {
      actionKey,
    })
  }
</script>

{#each getActionKeys(patterns) as actionKey}
  <div on:click={() => onActionClick(actionKey)}>{actionKey}</div>
{/each}
<div>{url}</div>
<div>{url}</div>
<div>{patterns}</div>

<div>
  思想： rawデータはそのまま渡す。 加工が必要なものは、内部で生成する。
  加工が必要で上から渡す必要があれば、propsを追加する。
</div>
