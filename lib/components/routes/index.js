import Main from "./Main.svelte";
import Mock from "./Mock.svelte";

export default {
  "/": Main,
  "*": Mock,
};
