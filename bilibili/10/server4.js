const express = require('express');
const bodyPaser = require('body-parser');
const querystring = require('querystring');
var server = express();

server.listen(8080);

server.use(function(req,res,next){
    var str = '';
    req.on('data',function(data){
        str += data;
    });
    res.on('end',function(){
        req.body = querystring.parse(str);
        next();
    })
})

server.use('/',function(req,res,next){
    console.log(req.body);

})




//链式操作
//req.parse 用于get请求
//req.body 用于post请求