const express = require('express');
const bodyPaser = require('body-parser');

var server = express();

server.use(bodyPaser.urlencoded({}))
server.listen(8080);
server.use('/',function(req,res){
    console.log(req.body);
})
//链式操作
//req.parse 用于get请求
//req.body 用于post请求