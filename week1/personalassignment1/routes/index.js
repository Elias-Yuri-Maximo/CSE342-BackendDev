const routes = require('express').Router();

routes.get('/',(req,res)=>{
    res.send('Elias Maximo');
})

module.exports = routes;