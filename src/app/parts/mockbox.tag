import './tree.tag'

<parts-mockbox>
  <parts-tree md-action={mdAction}></parts-tree>

  <style type="less">
    > parts-tree {
      border-left: none;
      margin-left: 0px;
    }
  </style>

  <script>
    import state from '../../state'

    this.mdAction = state.mock.mdAction
  </script>
</parts-mockbox>
