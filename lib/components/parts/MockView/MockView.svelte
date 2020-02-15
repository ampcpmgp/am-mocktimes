<script>
  import { onMount } from 'svelte'
  export let target = 'browser'
  export let src
  let webview

  onMount(() => {
    if (target === 'electron') {
      webview.addEventListener('dom-ready', () => {
        webview.openDevTools()
      })
    }
  })
</script>

<style>
  .main {
    position: fixed;
    top: 0;
    left: 0;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 100%;
    background-color: white;
  }

  iframe,
  webview {
    overflow: auto;
    border: none;
    width: inherit;
    height: inherit;
  }
</style>

<div class="main">
  {#if target === 'browser'}
    <iframe {src} title="mock" />
  {:else if target === 'electron'}
    <webview {src} bind:this={webview} nodeintegration />
  {:else}
    settings.target = `{target}`, not defined. 'browser' or 'electron'.
  {/if}
</div>
