const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const ralph = express()
ralph.use(bodyParser.json())


ralph.use(express.static(__dirname + '/../client/react-client/dist'))
//handle root request on server

ralph.post('/', (req, res) => {
  console.log(req.body)
  var options = {json : true, body : req.body, method: 'POST'}
  request('http://localhost:7777/compile', options, (err, resp, bod) => {
  if (err){
    console.error(err)
  }
    // console.log(resp)
    res.setStatus = 200
    var goog = JSON.stringify(bod)
    console.log(goog)
    res.end(bod)
})
  
  // res.end()

})

ralph.listen(7007, () => {console.log('ralph is listening on port 7007')})