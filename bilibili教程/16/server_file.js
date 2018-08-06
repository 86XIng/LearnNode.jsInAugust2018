const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const pathLib = require('path');

var server= express();
var objMulter = multer();
server.use(objMulter.any({dest:'./www/upload/'}));

server.post('/',function(req,res){
    console.log(req.files[0].path);
    // var newName = req.files[0].path+pathLib.parse(req.files[0].origionalname).ext;
    // fs.rename(req.files[0].path,newName,function(err){
    //     if(err){
    //         res.send('上传失败');
    //     } else {
    //         res.send('上传成功');
    //     }
    // });
    // console.log(req.files[0].path);
});
server.listen(8080);