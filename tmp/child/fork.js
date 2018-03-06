process.on('message', async (m) => {
  console.log('CHILD got message:', m)
  setTimeout(() => {
    console.log(__dirname, process.cwd())
  }, 1000)
})

// Causes the parent to print: PARENT got message: { foo: 'bar', baz: null }
process.send({ foo: 'bar', baz: NaN })
