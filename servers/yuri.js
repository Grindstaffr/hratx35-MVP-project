const express    = require('express')
const bundle     = require('./methods/tonyCodeBundler.js')
const bodyParser = require('body-parser')

yuri.use(bodyParser.json())

const yuri = express()

yuri.post('/compile', (req, res) => {
  parsereq.body
})

yuri.get('/')

yuri.listen(7777, () => {console.log('yuri is listening on port 7777')})