import { writable } from 'svelte/store'
import * as pattenrsUtil from '../utils/patterns'

export const treeData = writable([])

export function init(patterns) {
  treeData.set(pattenrsUtil.transformTreeData(patterns))
}

export function openAll() {
  treeData.update(value => pattenrsUtil.openAll(value))
}

export function closeAll() {
  treeData.update(value => pattenrsUtil.closeAll(value))
}

export function closeByDepth(depth) {
  treeData.update(value => pattenrsUtil.closeByDepth(value, depth))
}
