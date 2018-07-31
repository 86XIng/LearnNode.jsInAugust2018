var net = require('net');

var server = net.createServer(function(socket){
	socket.once('data',function(data){  //只响应一次
		socket.write(data);
	});
});
server.listen(8888);