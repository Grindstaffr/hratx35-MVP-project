const express    = require('express')
// const bundle     = require('./methods/tonyCodeBundler.js')
const compile = require('../methods/compileParse.js')
const bodyParser = require('body-parser')
const request = require('request')


const yuri = express()
yuri.use(bodyParser.json())

yuri.post('/compile', (req, res) => {
  var body = req.body.string
  if (typeof compile.parse(body) === 'string'){
    res.end(compile.parse(body))
  }
  var tonyCode = compile.parse(body).instruction + compile.parse(body).argument1 + compile.parse(body).argument2 
  var options = { json: false, body : tonyCode, method: 'POST'}
  request('http://localhost:7049/command', options, (err, res, body) => {
    if (err){
      console.error(err)
    }
    console.log(body)
  })
  res.end(body) 
})

yuri.get('/')

yuri.listen(7777, () => {console.log('yuri is listening on port 7777')})