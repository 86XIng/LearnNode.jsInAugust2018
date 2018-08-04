var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var async = require('async');

var startUrl = 'https://www.proginn.com/users/';

var page = 1;
var infoArr = [];
request(startUrl,function(err,response){
	if(err){
		console.log(err);
	}
	var $ = cheerio.load(response.body);
	var length = $('.J_user');
	// for(let i = 0 ; i<length;i++){

	// }
	length.each(function(){
		console.log($(this).text());
	})
	// var desc = $('.desc-item span');
	// // console.log(desc.length);
	// var info = $('.info');
	// info.each(function(){
	// 	var userid = $(this).attr('userid');
	// 	info[userid] = $(this).text();
	// })
	// desc.each(function(){
	// 	console.log($(this).text());
	// 	var skill = $(this).text();
	// })





	// var amount = parseInt($('.current-comment-page').text().match(/(\d)+/g)[0]);
	// console.log(amount);
	// var pageUrl = [];
	// for(var i = amount; i>=amount - page + 1 ; i --){
	// 	 // console.log(i);
	// 	pageUrl.push('http://jandan.net/ooxx/page-'+i);
	// }
	// // console.log(pageUrl);
	// async.mapLimit(pageUrl,5,function(page,callback){
	// 	request(page,function(err,response){
	// 		if(err){
	// 			console.log(err);
	// 		}
	// 		var $ = cheerio.load(response.body);
	// 		var links = $('img');
	// 		var imgArr = [];
	// 		links.each(function(){
	// 			console.log($(this).attr('src'));
	// 		})
	// 		// console.log($(links[0]).attr('href'));
	// 	})
	// })
})