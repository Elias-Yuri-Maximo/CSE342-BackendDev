const express = require('express')
const port = 3000
const server = express()

//const server = http.createServer(function(req,resp){
//    resp.write('Elias Maximo')
//    resp.end()
//})

server.use('/',require('./routes'))

server.listen(port, function(error){
    if(error){
        console.log('An error has occcured: ', error)
    }else{
        console.log('server is listening on port ' +port)
    }
})