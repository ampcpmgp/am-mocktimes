import mock from 'am-mocktimes'

mock({
  action (param) {
    console.log('action', param)
  }
})
