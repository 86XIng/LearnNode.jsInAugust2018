const express = require('express');

var server = express();

var routeUser = express.Router();

routeUser.get('/1.html',function(req,res){
    res.send('user1');
});
routeUser.use('/2.html',function(req,res){
    res.send('user2');
});

server.use('/user',routeUser);

server.listen(8080);