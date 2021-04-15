const express = require('express')
const app = express();
require('rootpath')(); 
var config = require("./config.json");
var cors = require('cors');

var api = express();
api.use(cors());
api.use(express.urlencoded());
api.use(express.json());

api.use('/api/user', require('./controllers/user.controller'));
api.use('/api/perfil', require('./controllers/perfil.controller'));

var apiPort = process.env.PORT || config.port;

var serverAPI = api.listen(apiPort, function () {
  console.log('Server API listening at http://' + serverAPI.address().address + ':' + serverAPI.address().port);
});
