const express = require('express')
const port = 8080
const server = express()

//const server = http.createServer(function(req,resp){
//    resp.write('Elias Maximo')
//    resp.end()
//})
//server.get('/', (req,res)=>{
//    res.send('Hello World');
//});

server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();});
server.use('/professional',require('./routes'))


server.listen(port, function(error){
    if(error){
        console.log('An error has occcured: ', error)
    }else{
        console.log('server is listening on port ' +port)
    }
})