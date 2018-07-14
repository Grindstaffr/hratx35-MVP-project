const express = require('express')
const request = require('request')
const ralph = express()


//handle root request on server
ralph.get('/', (req, res) =>{
    //serve up some html  
  
  res.end('somehtml')

})

ralph.post('/', (req, res) => {
  var options = {json : true, body : clientString, method: 'POST'}
  request('http://localhost:7777/compile', options, (err, res, body) => {
  if (err){
    console.error(err)
  }

})

})

ralph.listen(7007, () => {console.log('ralph is listening on port 7007')})