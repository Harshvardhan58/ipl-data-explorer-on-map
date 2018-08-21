const express = require('express');
var bodyParser = require("body-parser");
var multer = require("multer");
const keys = require('./config/keys');
require('./models/match');
require('./services/mongo');
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);
const app = express();
app.use(express.static(__dirname+"/dist"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes/index')(app);
app.all("*",(req,res)=>{
    res.status(200).sendFile(__dirname+"/dist/index.html");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
