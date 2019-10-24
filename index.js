const server = require('express')()
require('./middleware')(server)

const port = process.env.PORT || 8000

server.listen(port, () => {
  console.log(`\n ==== API RUNNING === ${port}\n`)
})
