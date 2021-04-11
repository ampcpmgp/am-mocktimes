<script>
  import { createEventDispatcher } from "svelte";
  import octocat from "../../../images/octocat.svg";

  const dispatch = createEventDispatcher();

  function onOverlayClick() {
    dispatch("overlayclick");
  }
</script>

<style>
  .overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }

  section {
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 80%;
    min-height: 300px;
    background: white;
    padding: 16px;
    border-radius: 10px;
  }

  h1 {
    padding: 16px;
    margin: -16px -16px 16px;
    border-bottom: 1px solid #ccc;
  }

  ul {
    display: grid;
    grid-row-gap: 8px;
    line-height: 1;
    color: #333;
  }

  li {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 10px;
  }

  kbd {
    display: inline-block;
    padding: 3px 5px;
    font: 11px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: solid 1px #d1d5da;
    border-bottom-color: #c6cbd1;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #c6cbd1;
  }

  footer a {
    display: inline-block;
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 80px;
    height: 80px;
  }
</style>

<div class="overlay" on:click={onOverlayClick} />

<section>
  <h1>Keyboard Shortcuts</h1>

  <ul>
    <li>
      <kbd>?</kbd>
      <span>Open this window.</span>
    </li>
    <li>
      <kbd>Esc</kbd>
      <span>Close this window.</span>
    </li>
    <li>
      <span>
        <kbd>1</kbd>
        -
        <kbd>8</kbd>
      </span>
      <span>Fold [1 - 8] depth tree node.</span>
    </li>
    <li>
      <kbd>9</kbd>
      <span>Fold all tree node.</span>
    </li>
    <li>
      <kbd>0</kbd>
      <span>Unfold all tree node.</span>
    </li>
  </ul>

  <footer>
    <a href="https://github.com/ampcpmgp/am-mocktimes" target="_blank">
      <img src={octocat} alt="" />
    </a>
  </footer>
</section>
