function asyncFunction(callback) {
	setTimeout(callback,200);
}
var color = 'blue';
(function(color){  //匿名函数参考 https://zhidao.baidu.com/question/242686709298633004.html
	asyncFunction(function(){
		console.log('The color is '+color);
	})
})(color);  

color = 'green';