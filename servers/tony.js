const express = require('express')
const assembly = require('./methods/assembly.js')
const machineCode = require('./methods/machinecode.js')
const bitmash = require('./methods/bitmash.js')
const bodyParser = require('body-parser')

const tony = express()

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
  const commandstring = req.body.text //should be a 64 character string of '1's and '0's 


});

tony.get('/registerstatus', (req,res) => {
  var sendableReg = JSON.stringify(registers)
  res.end(sendableReg)
});

















tony.listen(7049, () => {console.log('tony is listening on port 7049')})