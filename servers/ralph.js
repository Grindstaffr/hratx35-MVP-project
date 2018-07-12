const express = require('express')

const ralph = express()


//handle root request on server
ralph.get('/', (req, res) => res.end('somehtml'))

ralph.listen(7007, () => {console.log('ralph is listening on port 7007')})