const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
///////////////////////
const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Temples api",
            version:"1.0.0",
            description:"Simple Express Library API"            
        },
        servers:[{
            url:"http://localhost:8080"
        }],
        
    },
    apis:["./routes/*.js"]
};

const specs = swaggerJsDoc(options)



app
  .use("/documentation", swaggerUI.serve, swaggerUI.setup(specs))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'));

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



