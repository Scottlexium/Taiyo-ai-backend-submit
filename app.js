const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
const routes = require('./routes/Routes');
const { defaultConfiguration } = require("express/lib/application");
app.use('/', routes)
//start server
const port = process.env.PORT||3030
app.listen(port, ()=>{
    console.log("listeniing at port:3030")
}) 