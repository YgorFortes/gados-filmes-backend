const express = require('express')
const app = new express()

app.get('/', (req, res) => {
  res.send('hello word')
})

app.listen(3000)