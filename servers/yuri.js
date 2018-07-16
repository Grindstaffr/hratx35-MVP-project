const express    = require('express')
// const bundle     = require('./methods/tonyCodeBundler.js')
const compile = require('../methods/compileParse.js')
const bodyParser = require('body-parser')
const request = require('request')


const yuri = express()
yuri.use(bodyParser.json())

yuri.post('/compile', (req, res) => {
  var body = req.body.string
  
sleep(200)
console.log('compiling...')
  if (typeof compile.parse(body) === 'string'){
    sleep(200)
    console.log('compiling error, sending back error')
    res.end(compile.parse(body))
  }
  sleep(400)
console.log('compiling...')
sleep(400)
console.log('compiling...')
sleep(400)
console.log('compiling...')
  var tonyCode = compile.parse(body).instruction + compile.parse(body).argument1 + compile.parse(body).argument2 
  var options = { json: false, body : tonyCode, method: 'POST'}
  console.log('Sending bit string ' + tonyCode + " to tony")
  if (!(typeof compile.parse(body) === 'string')){
    request('http://localhost:7049/command', options, (err, resp, bod) => {
      if (err){
        console.error(err)
      }
      var goog = JSON.stringify(bod)
      console.log(bod)
      res.end(goog) 
    })}
})

yuri.get('/')

yuri.listen(7777, () => {console.log('yuri is listening on port 7777')})

var sleep = function (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
