var exec  = require("child_process").exec;
var querystring = require("querystring");

function start(response,postData) {
	console.log("Request handler 'start' was called.");

	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" method="post">'+
	'<input type="text" name="text" />'+
	'<br />'+
	'<input type="submit" value="Submit text" />'+
	'</form>'+
	'</body>'+
	'</html>';

	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(body);
	response.end();
}


function upload(response,postData) {
	console.log("Request handler 'upload' was called.");
	exec(querystring.parse(postData).text , function(error,stdout , stderr){
		var body = '<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
		'</head>'+
		'<body>'+
		stdout +
		'</body>' +
		'</html>';		
		response.writeHead("200" , {"Content-Type": "text/plain"});
		
		response.write(stdout);
		response.end();
	});	
}
exports.start = start;
exports.upload = upload;
