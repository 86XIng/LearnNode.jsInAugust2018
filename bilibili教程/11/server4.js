const express = require('express');
const cookie_parser = require('cookie-parser');
var server = express();

server.use(cookie_parser('dsafdasff'));
server.use('/',function(req,res){
    res.clearCookie('user');  //清除cookie
    res.send('ok');
});

server.listen(8080);