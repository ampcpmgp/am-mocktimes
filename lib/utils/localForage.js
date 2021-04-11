// import esm module / not commonjs module (main module)
import localforage from "localforage/src/localforage";
import { getAllNameTrees, setIsOpenStatus } from "./patterns";

const LAST_OPEN_NAMES = "lastOpenNames";

export async function removeNoExistsNames(treeData) {
  const names = await getLastOpenNames();
  const nameTrees = getAllNameTrees(treeData);

  Object.keys(names).forEach(name => {
    if (!nameTrees[name]) {
      delete names[name];
    }
  });

  await localforage.setItem(LAST_OPEN_NAMES, names);

  setIsOpenStatus(names, treeData);

  return treeData;
}

export async function getLastOpenNames() {
  const names = await localforage.getItem(LAST_OPEN_NAMES);

  return names || {};
}
export async function setLastOpenName(nameTree, isOpen) {
  const names = await getLastOpenNames();
  names[nameTree] = isOpen;

  await localforage.setItem(LAST_OPEN_NAMES, names);
}
