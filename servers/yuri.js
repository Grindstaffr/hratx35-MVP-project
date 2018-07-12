const express = require('express')

const yuri = express()

yuri.listen(7777, () => {console.log('yuri is listening on port 7777')})