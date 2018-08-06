const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');

var server = express();
server.listen(8080);

//1.解析cookie
server.use(cookieParser('dfsafas'));
//2.使用session
var arr=[];
for(var i = 0 ; i<100000;i++){
    arr.push('keys_'+Math.random());
}
server.use(cookieSession({name:'zns_sess_id',keys:arr,maxAge:20*3600*1000}));

//3.post数据
server.use(bodyParser.urlencoded({extended:false}));

//4.配置模板引擎
//输出什么东西
server.set('view engine','html');
//模板文件放在哪里
server.set('views','./views');
//设置模板引擎,输出为html
server.engine('html',consolidate.ejs);

server.get('/',function(req,res){
    //render编译并输出 类似于res.send
    res.render('1.ejs',{name:'blue'});
})



//4.static数据
server.use(static('./www'));