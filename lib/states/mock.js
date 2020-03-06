import { writable } from 'svelte/store'
import * as pattenrsUtil from '../utils/patterns'
import * as localForage from "../utils/localForage";

export const treeData = writable([])

export async function init(patterns) {
  const treeDataTmp = pattenrsUtil.transformTreeData(patterns)
  const initializedTreeData = await localForage.removeNoExistsNames(treeDataTmp)

  treeData.set(initializedTreeData)
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
