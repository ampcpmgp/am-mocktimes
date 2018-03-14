module.exports = () => {
  return `import mock from 'am-coffee-time'

mock({
  action (param) {
    console.log('action', param)
  }
})
`
}
