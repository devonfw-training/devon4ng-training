var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;
var todosRouter = require('./todos-backend.js');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/services', todosRouter);
app.listen(port);
