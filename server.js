var express = require('express');
var app = express();

app.use("/",express.static("./App")) // Server for static file

app.listen(3000)