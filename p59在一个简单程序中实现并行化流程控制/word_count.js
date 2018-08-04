var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './text';

function checkIfComplete(){
	completedTasks++;
	if(completedTasks == tasks.length){
		for(var index in wordCounts){  //当所有任务完成后，列出文件中用到的每一个单词以及用了多少次
			console.log(index+': '+wordCounts[index]);
		}
	}
}
function countWordsInText(text){
	var words = text
				.toString()
				.toLowerCase()
				.split(/\W+/)
				.sort();
	for(var index in words){  //对words数组进行遍历
		var word = words[index];  //word赋值为words数组里的第一个单词 ，然后依次加一
		if(word) {  //如果加一之后word不为空值
			wordCounts[word] = 
			(wordCounts[word])?wordCounts[word]+1:1;  //wordscounts数组里以word为下标的数组里的元素对应加一
		}
	}
}

fs.readdir(filesDir,function(err,files){
	if(err) throw err;
	for(var index in files){  //对files目录下的文件列表进行遍历

		var task = (function(file) {  //此闭包内为异步执行，tasks数组依次执行时，每一个task的状态互不干扰
			return function(){
				fs.readFile(file,function(err,text){
					if(err) throw err;
					countWordsInText(text);    //统计该index下的单词的数目
					checkIfComplete();		   //是否完成所有任务，若完成则列出所有文件中用到的每一个单词以及用了多少次
											   //若没有完成则继续下一轮循环直到tasks中的任务被执行完成
				});
			}
		})(filesDir+'/'+files[index]);  //闭包以避免index的变化带来影响  传入的参数即为file

		tasks.push(task);  //并行化控制所以先保存在tasks数组中然后再同步执行
	}
	for(var task in tasks) {
		tasks[task]();   //开始并执行所有任务
	}
});