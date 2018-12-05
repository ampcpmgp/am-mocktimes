import './icons/open-close.tag'

<parts-tree-descripion>
  <small>{opts.description}</small>
  <style type="less">
    > small {
      white-space: pre-line;
      margin-top: 4px;
      margin-bottom: 4px;
    }
  </style>
  <script>
    this.on('update', () => {
      this.root.style.display = opts.description ? '' : 'none'
    })
  </script>
</parts-tree-descripion>

<parts-tree>
  <section class="list-line" if={opts.mdAction.level > 0}>
    <parts-icons-open-close
     style={getOpenCloseIconStyle()}
      is-plus={opts.mdAction.isOpen}
      onclick={toggleActionBox}
      />
    <a href={opts.mdAction.mockUrl}
      onclick={openIframe}
      data-mock-links
      data-name-tree={opts.mdAction.nameTree}
      class={executed: opts.mdAction.mockUrl === lastExecutedUrl}>
      {opts.mdAction.name}
    </a>
    <section class="labels">
      <label each={switchItem in opts.mdAction.switchs}
        class={parent.getLabelClass(switchItem.name)}
        onclick={() => parent.switchLabel(switchItem.name)}
        >
        {switchItem.name}
      </label>
    </section>
    <parts-tree-descripion description={getDescription()}></parts-tree-descripion>
  </section>
  <section class='child-tree' style={getChildTreeStyle()}>
    <virtual each={mdAction in opts.mdAction.mdActions}>
      <parts-tree md-action={mdAction} class={mdAction.levelName}></parts-tree>
    </virtual>
  </section>
  <style type="less">
    :scope {
      margin-left: 12px;
      display: block;
      border-left: 1px solid #ccc;
      box-sizing: border-box;
    }

    > section.list-line {
      display: flex;
      align-items: center;
      position: relative;

      > parts-icons-open-close {
        position: absolute;
        top: 50%;
        left: -8px;
        transform: translateY(-50%);
      }

      > section.labels {
        > label {
          cursor: pointer;
          border: 1px solid rgba(255, 128, 0, 0.6);
          padding: 0 6px;
          text-align: center;
          display: inline-block;

          &.focus {
            background: rgba(255, 255, 0, 1);
          }

          &:hover {
            border: 1px solid rgba(255, 64, 0, 1);
          }

          &:last-child {
            margin-right: 4px;
          }
        }
      }

      > a {
        padding: 2px 4px;
        margin-top: 2px;
        margin-bottom: 2px;
        margin-left: 14px;
        margin-right: 8px;
        text-decoration: none;
        box-sizing: border-box;
        outline: none;

        &.executed {
          border: 1px solid #555;
          border-radius: 4px;
        }

        &:hover {
          opacity: 0.4;
        }
      }
    }

    > section.child-tree {
      > parts-tree {
        &.level-1 {
          border: none;
        }
      }
    }
  </style>
  <script>
    import { observe } from 'dob'
    import route from 'riot-route'
    import * as Actions from '../../actions'
    import state from '../../state'
    import { getRoutePath } from '../../utils/pattern'
    import {getTarget} from '../../utils/target'

    const openIframe = (e) => {
      if (getTarget() === 'electron') {
        location.assign(opts.mdAction.mockUrl)
      } else {
        route(getRoutePath(opts.mdAction.mockUrl))
      }
      e.preventDefault()
    }

    const toggleActionBox = () => {
      Actions.toggleActionBox(opts.mdAction)
    }

    const getOpenCloseIconStyle = () => opts.mdAction.mdActions.length === 0 && {
      visibility: 'hidden'
    }

    const getChildTreeStyle = () => !opts.mdAction.isOpen && {
      display: 'none'
    }

    const getLabelClass = (name) => ({
      focus: name === opts.mdAction.selectedSwitchName
    })

    const switchLabel = (name) => {
      Actions.setSelectedSwitchName(opts.mdAction, name)
    }

    const getDescription = () => {
      const {
        selectedSwitchName,
        description,
        switchs
      } = opts.mdAction

      if (selectedSwitchName) {
        return switchs.find(switchItem => switchItem.name === selectedSwitchName).description
      }
      return description
    }

    Object.assign(this, {
      lastExecutedUrl: state.mock.lastExecutedUrl,
      getDescription,
      getOpenCloseIconStyle,
      getChildTreeStyle,
      openIframe,
      switchLabel,
      getLabelClass,
      toggleActionBox
    })

    observe(() => {
      void (
        opts.mdAction.isOpen,
        opts.mdAction.selectedSwitchName,
        opts.mdAction.mockUrl
      )

      this.update({
        lastExecutedUrl: state.mock.lastExecutedUrl
      })
    })
  </script>
</parts-tree>
