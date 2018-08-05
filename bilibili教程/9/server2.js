const express = require('express');
const expressStatic = require('express-static');
var server = express();
server.listen(8080);

var users = {
    'blue':'123456',
    'zhangsan':'654321',
    'lisi':'987987'
}
server.get('/login',function(req,res){
    var usr = req.query['user'];
    var pass = req.query['pass'];
    if(users[usr]==null){
        res.send({ok:false,msg:"用户名不存在"});
    } else if(users[usr]!=pass){
        res.send({ok:false,msg:"密码错误"});
    } else {
        res.send({ok:true,msg:"登陆成功"});
    }
})

server.use(expressStatic('./www'));


















// server.get('/login',function(req,res){
    //     var usr = req.query['user'];
    //     var pass = req.query['pass'];
    
    //     if(users[usr]==null){
    //         res.send({ok:false,msg:'此用户不存在'});
    //     } else {
    //         if(users[usr]!=pass){
    //             res.send({ok:false,msg:'密码错误'});
    //         } else{
    //             res.send({ok:true,msg:'成功'});
    //         }
    //     }
    // });