import ReservedKey from '../const/reserved-key'

const { PATTERN } = ReservedKey

export function isReservedKey(key) {
  return PATTERN.some(reservedKey => reservedKey === key)
}

export function isActionKey(key) {
  return !isReservedKey(key)
}

export function getActionKeys(patterns) {
  if (isFunc(patterns) || isFuncs(patterns)) return []

  return Object.keys(patterns).filter(isActionKey)
}

export function hasChild(patterns) {
  const keys = getActionKeys(patterns)

  return keys.length > 0
}

export function getActions(patterns) {
  if (isFuncs(patterns)) {
    return patterns
  }

  if (isFunc(patterns)) {
    return [patterns]
  }

  if (isFuncs(patterns.funcs)) {
    return patterns.funcs
  }

  if (isFunc(patterns.func)) {
    return [patterns.func]
  }

  return []
}

export function isFunc(actionValue) {
  return Array.isArray(actionValue) && !Array.isArray(actionValue[0])
}

export function isFuncs(actionValue) {
  return Array.isArray(actionValue) && isFunc(actionValue[0])
}

export function reflectSwitchData(treeItem, selected) {
  if (selected.settings && selected.settings.url) {
    treeItem.url = selected.settings.url
  }

  treeItem.description = selected.description || ''
  treeItem.selected = selected
  treeItem.actions = [...selected.actions]

  const { patterns, nameTree, url, target, actions, depth } = treeItem
  treeItem.treeData = transformTreeData(
    patterns,
    nameTree,
    url,
    target,
    actions,
    depth
  )
}

export function transformTreeData(
  patterns,
  name = '',
  url = patterns.settings.url,
  target = (patterns.settings && patterns.settings.target) || 'browser',
  actions = [],
  depth = 0
) {
  const actionKeys = getActionKeys(patterns)

  return actionKeys.map(key => {
    const itemPatterns = patterns[key]
    const { settings } = itemPatterns
    const nameTree = `${name ? name + '!' : ''}${key}`
    const itemActions = [...actions, ...getActions(itemPatterns)]
    const hasSwitch = !!itemPatterns.switch
    const itemUrl = (settings && settings.url) || url
    const itemTarget = (settings && settings.target) || target
    const description = itemPatterns.description || ''
    const switchData = hasSwitch
      ? transformTreeData(
          itemPatterns.switch,
          key,
          itemUrl,
          itemTarget,
          itemActions,
          depth
        )
      : []
    const itemDepth = depth + 1

    const treeData = {
      patterns: itemPatterns,
      nameTree,
      name: key,
      url: itemUrl,
      target: itemTarget,
      description,
      actions: itemActions,
      isOpen: false,
      hasChild: hasChild(itemPatterns),
      treeData: [],
      hasSwitch,
      switchData,
      selected: {},
      depth: itemDepth,
      lastExecuted: false,
    }

    if (hasSwitch) {
      reflectSwitchData(treeData, switchData[0])
    } else {
      treeData.treeData = transformTreeData(
        itemPatterns,
        nameTree,
        itemUrl,
        itemTarget,
        itemActions,
        itemDepth
      )
    }

    return treeData
  })
}

export function openAll(treeData) {
  treeData.forEach(item => {
    item.isOpen = true
    item.treeData && openAll(item.treeData)
  })

  return treeData
}

export function closeAll(treeData) {
  treeData.forEach(item => {
    item.isOpen = false
    item.treeData && closeAll(item.treeData)
  })

  return treeData
}

export function closeByDepth(treeData, depth) {
  treeData.forEach(item => {
    if (item.depth === depth) {
      item.isOpen = false
    }
    item.treeData && closeByDepth(item.treeData, depth)
  })

  return treeData
}

export function resetLastExecuted(treeData) {
  treeData.forEach(item => {
    item.lastExecuted = false
    item.treeData && resetLastExecuted(item.treeData)
  })

  return treeData
}

export function getAllNameTrees(treeData) {
  let names = {}

  treeData.forEach(item => {
    names[item.nameTree] = true

    if (item.treeData) {
      names = {
        ...names,
        ...getAllNameTrees(item.treeData),
      }
    }
  })

  return names
}

export function setIsOpenStatus(names, treeData) {
  treeData.forEach(item => {
    if (names[item.nameTree]) {
      item.isOpen = true
    }

    item.treeData && setIsOpenStatus(names, item.treeData)
  })
}
