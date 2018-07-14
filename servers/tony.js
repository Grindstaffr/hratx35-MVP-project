const express     = require('express')
// const tonyCode    = require('./methods/bitmash.js')
const bodyParser  = require('body-parser')


const tony        = express()

//tony.use(bodyParser.json())

var registers =  {
  instruction        : [0,0,0,0,0,0,0,0,0],
  auxBufferOne       : [0,0,0,0,0,0,0,0,0],
  auxBufferTwo       : [0,0,0,0,0,0,0,0,0],
  address            : [0,0,0,0,0,0,0,0,0],
  headBufferLocation : [0,0,0,0,0,0,0,0,0], 
  memoryBufferA      : [0,0,0,0,0,0,0,0,0],
  memoryBufferB      : [0,0,0,0,0,0,0,0,0]
}

tony.post('/command', (req, res) => {
  req.setEncoding('utf-8');
  req.rawBody = '';
  req.on('data', function(chunk){
    req.rawBody += chunk;
  })
  req.on('end',() =>{
    console.log(req.rawBody)
    res.end()
  })
  
});

tony.get('/registerstatus', (req,res) => {
  var sendableReg = JSON.stringify(registers)
  res.end(sendableReg)
});

















tony.listen(7049, () => {console.log('tony is listening on port 7049')})