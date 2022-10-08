const axios = require('axios')

async function auth(req, res, next){
  try{
    const token = req.headers.authorization
    const opts = {headers:{authorization:token}}
    const response = await axios.get('https://api.github.com/user', opts)
    console.log(response.data)
    next()
  }catch(error){
    return res.status(401).json({message:"unauthorized"})
  }
}

module.exports={
    auth
}