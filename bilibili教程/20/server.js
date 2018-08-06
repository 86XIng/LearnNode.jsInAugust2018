const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const consolidate = require('consolidate');
const mysql = require('mysql');
const common = require('./libs/common');

const db = mysql.createPool({host:'localhost',user:'root',password:'123456',database:'blog'});
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
server.set('views','./template');
//设置模板引擎,输出为html
server.engine('html',consolidate.ejs);


//接收用户请求
server.get('/',function(req,res,next){
    db.query("select * from banner_table ;",function(err,data){
        if(err){
            console.log(err)
            res.status(500).send('database error').end();
        }
        else{
            // console.log(data);
            res.banners=data;
            next();
        }
    });
   
})
server.get('/',function(req,res,next){
    // 查询新闻列表
    db.query("select title,summary,ID from article_table ;",function(err,data){
        if(err){
            console.log(err)
            res.status(500).send('database error').end();
        }
        else{
            res.articles=data;
            next();
        }
    });
})

server.get('/',function(req,res){
    // 查询新闻列表
    db.query("select title,summary from article_table ;",function(err,data){
        if(err){
            console.log(err)
            res.status(500).send('database error').end();
        }
        else{
           res.render('index.ejs',{banners:res.banners,articles:res.articles});
        //    console.log(res.articles);
        }
    });
})

server.get('/article',function(req,res){
    if(req.query.id){
        db.query(`select * from article_table where ID=${req.query.id}`,
        function(err,data){
            if(err){
                res.status(500).send('数据有问题').end();
            } else {
                if(data.length==0){
                    res.status(404).send('您请求的文章找不到').end();
                }else {
                    // console.log(data[0]);
                    var articleData = data[0];
                    articleData.sDate=common.time2date(articleData.post_time);
                    articleData.content=articleData.content.replace(/^/gm,'<p>').replace(/$/gm,'</p>');
                    var oDate=new Date();
                    oDate.setTime(articleData)
                    res.render('conText.ejs',{
                        article_data:data[0]
                    });
                }
            }
        });
    }
})








//4.static数据
server.use(static('./www'));