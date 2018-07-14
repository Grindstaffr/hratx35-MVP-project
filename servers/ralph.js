const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const ralph = express()
ralph.use(bodyParser.json())


ralph.use(express.static(__dirname + '/../client/react-client/dist'))
//handle root request on server

ralph.post('/', (req, res) => {
  console.log(req.body)
  var options = {json : true, body : 'a', method: 'POST'}
  request('http://localhost:7777/compile', options, (err, response, body) => {
  if (err){
    console.error(err)
  }

    var data = JSON.stringify(body)
    res.end(data)
})

})

ralph.listen(7007, () => {console.log('ralph is listening on port 7007')})