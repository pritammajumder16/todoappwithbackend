const express = require('express');
const Todoroutes= require('./Controller/routing');
const app = express();
const cors = require('cors')

const port=process.env.PORT||8080;
//adding cors
app.use(cors());

//Set router for todo api
app.use('/todo',Todoroutes)


app.listen(port,()=>{
  console.log("Todo Server Listening on port 3000")
})
