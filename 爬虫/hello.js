var page = require('webpage').create();
phantom.outputEncoding="UFT-8";
page.open("http://jandan.net/ooxx/page-47#comments",function(statue){
	if(status == "success"){
		console.log(page.body);
	} else {
		console.log("error");
	}
	phantom.exit(0);
});