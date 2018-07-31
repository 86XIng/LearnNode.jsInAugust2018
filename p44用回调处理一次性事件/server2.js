//创建中间函数以减少嵌套的例子

var http  = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){  //客户端请求一开始会到达这里
	getTitles(res);  //调用getTles方法
}).listen(8000,'127.0.0.1');

function getTitles(res){
	fs.readFile('./titles.json',function(err,data){  //同样是读取titles.json文件
		if(err){
			hadError(err,res);
		}
		else {
			getTemplate(JSON.parse(data.toString()),res);  //不成功调用hadError函数，成功从json文本中解析数据并作为参数之一传递给getTemplate函数
		}
	})
}

function getTemplate(titles,res) {
	fs.readFile('./template.html',function(err,data){  
		if(err){
			hadError(err,res);
		}
		else {
			formatHtml(titles,data.toString(),res);  //成功的话调用formatHtml函数，参数为json文本中的数据和html的文本数据
		}
	})
}

function formatHtml(titles,tmpl,res){
	var html = tmpl.replace('%',titles.join('</li><li>'));  //渲染并返回给客户端
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(html);
}

function hadError(err,res){
	console.error(err);
	res.end('Server Error');  //如果错误log并给客户端返回Error信息
}