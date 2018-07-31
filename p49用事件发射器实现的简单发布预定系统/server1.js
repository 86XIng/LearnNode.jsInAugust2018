var events = require('events');
var net = require('net');
var channel1 = new events.EventEmitter();
channel1.clients = {};
channel1.subscriptions = {};

channel1.on('join',function(id,client){
	this.clients[id]=client;
	var welcome = "welcome!\n"+'guests online '+this.listeners('broadcast').length;
	client.write(welcome+"\n");
	this.subscriptions[id] = function(senderId,message){
		if(id!=senderId){
			this.clients[id].write(message);
		}
	}
	this.on('broadcast',this.subscriptions[id]);  //此时的this指向的应是channel1 
});												  //等于channel1.on

channel1.on('leave',function(id){   //接收leave事件并移除指定客户端的broadcast监听器
	channel1.removeListener('broadcast',this.subscriptions[id]);
	channel1.emit('broadcast',id,id+"has left the chat.\n");
});

channel1.on('shutdown',function(){  //监听shutdown事件
	channel1.emit('broadcast',' ',"Chat has shut down .\n");
	channel1.removeAllListeners('broadcast');
})

var server = net.createServer(function(client){
	var id = client.remoteAddress+':'+client.remotePort;
	channel1.emit('join',id,client);  //发出join事件和id和client
	client.on('data',function(data){  //监听data
		data=data.toString();
		if(data=="shutdown\r\n"){
			channel1.emit('shutdown');  //如果有人发出了shutdown命令则向channel1广播shutdown事件
		}
		channel1.emit('broadcast',id,data);    //发出broadcast事件和id和data
	});
	client.on('close',function(){  //监听关闭
		channel1.emit('leave',id);  //发出leave事件和id
	});
});
server.listen(8888);