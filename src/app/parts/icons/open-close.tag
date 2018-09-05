<parts-icons-open-close>
  <svg xmlns="http://www.w3.org/2000/svg"
    width="16" height="16"
    viewBox="0 0 24 24" stroke="#333"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <g if={opts.isPlus}>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </g>
    <g if={!opts.isPlus}>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </g>
  </svg>
  <style type="less">
    :scope {
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 20px;
      height: 20px;
      background: #eee;

      &:hover > svg {
        fill: #ccc;
      }

      > svg {
        fill: #eee;
      }
    }
  </style>
</parts-icons-open-close>
