const express = require('express');
var server = express();


server.use('/',function(req,res){
    res.cookie('user','blue',{maxAge:30*24*3600*1000});  //30天*24小时*3600秒*1000毫秒
    res.send('ok');
});

server.listen(8080);