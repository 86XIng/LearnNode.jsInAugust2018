const express = require('express');
const cookie_parser = require('cookie-parser');
var server = express();

server.use(cookie_parser());
server.use('/',function(req,res){
    console.log(req.cookies);
    res.send('ok');
});

server.listen(8080);