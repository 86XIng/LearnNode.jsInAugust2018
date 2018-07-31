//在简单程序中使用回调的例子
var http  = require('http');
var fs = require('fs');

http.createServer(function(req,res){ //创建http服务器并定义回调逻辑
	if(req.url == '/'){
		fs.readFile('./titles.json',function(err,data){ //读取JSON文件并用回调定义如何处理其中的内容
			if(err){
				console.error(err);
				res.end('Server Error');  //如果出错输出出错日志并给客户端返回"Server Error"
			}
			else {
				var titles = JSON.parse(data.toString());  //从JOSN文本中解析数据

				fs.readFile('./template.html',function(err,data){ //读取html模板并在加载完成后使用回调
					if(err){
						console.error(err);
						res.end('Server Error');  //如果出错输出出错日志并给客户端返回"Server Error"
					}
					else {
						var tmpl = data.toString(); 
						var html = tmpl.replace('%',titles.join('</li><li>'));  //组装html页面以显示博客标题
						res.writeHead(200,{'Content-Type':'text/html'});
						res.end(html); //将html页面发送给用户
					}
				});
			}
		});
	}
}).listen(8000,"127.0.0.1");