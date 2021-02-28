const express = require('express');
const Todoroutes= require('./Controller/routing');
const app = express();
const cors = require('cors')

//adding cors
app.use(cors());

//Set router for todo api
app.use('/todo',Todoroutes)


app.listen(3000,()=>{
  console.log("Todo Server Listening on port 3000")
})
