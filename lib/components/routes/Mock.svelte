<script>
  import MockView from '../parts/MockView/MockView.svelte'

  const viewInfoEncoded = location.hash.replace(/^#\//, '')
  const viewInfoJson = decodeURIComponent(viewInfoEncoded)
  const { mockUrl, target } = JSON.parse(viewInfoJson)
</script>

<MockView src={mockUrl} {target} />
