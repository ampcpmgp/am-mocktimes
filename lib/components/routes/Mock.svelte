<script>
  import queryString from 'query-string'
  import MockView from '../parts/MockView/MockView.svelte'

  const viewInfoEncoded = location.hash.replace(/^#\//, '')
  const viewInfoJson = decodeURIComponent(viewInfoEncoded)
  const { mockUrl, target } = JSON.parse(viewInfoJson)

  console.log(viewInfoEncoded)
  console.log(viewInfoJson)
  console.log(mockUrl)

  const url = new URL(mockUrl, location.origin)
  const { __amMocktimes__ } = queryString.parse(url.search)
  console.log(__amMocktimes__)
  // JSON データ一度取り出して encode する。# が入らないようにするため。
  const mockSrc = `${url.origin}${
    url.pathname
  }?__amMocktimes___=${encodeURIComponent(__amMocktimes__)}`
  console.log(mockSrc)
</script>

<MockView src={mockSrc} {target} />
