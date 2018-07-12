const express = require('express')

const tony = express()

tony.listen(7049, () => {console.log('tony is listening on port 7049')})