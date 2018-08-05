const jade = require('jade');
const fs = require('fs');
var str = jade.renderFile('./views/3.jade',{pretty:true});
fs.writeFile('./bulid/1.html',str,function(err){
    if(err)
        console.log(err);
    else 
        console.log('写入成功');
})
// console.log(str);