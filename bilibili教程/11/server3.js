const express = require('express');
const cookie_parser = require('cookie-parser');
var server = express();

server.use(cookie_parser('dsafdasff'));
server.use('/',function(req,res){
    req.secret='dsafdasff';
    res.cookie('user','blue',{signed:true});
    console.log('签名cookie：',req.signedCookies);
    console.log("无签名cookie",req.cookies);
    res.send('ok');
});

server.listen(8080);