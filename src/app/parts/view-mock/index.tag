<parts-view-mock>
  <iframe if="{opts.dataTarget === 'browser'}" src={opts.dataSrc}></iframe>
  <webview if="{opts.dataTarget === 'electron'}" src={opts.dataSrc}></webview>
  <style type="less">
    :scope {
      position: fixed;
      top: 0;
      left: 0;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      height: 100%;
      background-color: white;
    }

    > iframe,
    > webview {
      overflow: auto;
      border: none;
      width: inherit;
      height: inherit;
    }
  </style>
</parts-view-mock>
