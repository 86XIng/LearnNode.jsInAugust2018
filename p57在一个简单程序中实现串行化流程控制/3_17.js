var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';

function checkForRSSFile(){
	fs.exists(configFilename,function(exists){  //确保文件存在
		if(!exists){
			return next(new Error('Missing RSS file :'+configFilename));
		}
		next(null,configFilename);  //若存在执行下一个任务readRSSFile
	});
}

function readRSSFile(configFilename){
	fs.readFile(configFilename,function(err,feedList){  //读取文件
		if(err) return next(err);  //读取失败
		feedList = feedList  //对feedList数组进行解析
					.toString()
					.replace(/^\s+|\s+$/g,'')
					.split("\n");
		var random = Math.floor(Math.random()*feedList.length);  //从feedList数组中随机选择一个数
		next(null,feedList[random]);  //传递给next函数 执行下一个任务（downloadRSSFeed）
	});
}

function downloadRSSFeed(feedUrl){
	request({uri:feedUrl},function(err,res,body){  //向预订源发送http请求以获取数据
		if(err) return next(err);
		if(res.statusCode!=200){  //res.statusCode非200都代表请求失败
			return next(new Error('Abnormal respnose status code'));
		}
		next(null,body);  //request的回调函数的参数body即结果传递给下一个任务
	});
}

function parseRSSFeed(rss){
	var handler = new htmlparser.RssHandler();  
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);
	if (!handler.dom.items.length) {return next(new Error('No RSS items found'));}  //如果length不存在代表RSS items不存在
	var item = handler.dom.items.shift();  //shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
	console.log(item.title);
	console.log(item.link);
}

var tasks = [ checkForRSSFile,readRSSFile,downloadRSSFeed,parseRSSFeed];

function next(err,result){
	if(err) throw err;
	var currentTask = tasks.shift();
	if(currentTask){
		currentTask(result);
	}
}

next();