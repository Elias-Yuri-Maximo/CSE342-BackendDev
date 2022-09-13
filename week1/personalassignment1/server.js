const http = require('http')
const port = 3000

const server = http.createServer(function(req,resp){
    resp.write('Elias Maximo')
    resp.end()
})

server.listen(port, function(error){
    if(error){
        console.log('An error has occcured: ', error)
    }else{
        console.log('server is listening on port ' +port)
    }
})