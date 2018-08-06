const mysql = require('mysql');


//1.连接
var db = mysql.createConnection({host:'localhost',user:
'root',password:'123456',database:'20161222'});
//2.查询
db.query('select *from user_table;',function(err,data){
    if(err)
        console.log(err);
    else
        console.log(JSON.stringify(data));
})
