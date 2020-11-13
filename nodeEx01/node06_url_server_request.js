var http = require('http');
var url = require('url');
var dataModule = require('./node04_custom_module_create');

var server = http.createServer(function(request, response){
	// http://localhost:10007/name   -> hong gil dong
	// http://localhost:10007/address   -> 서울시 마포구
	// http://localhost:10007/sum   -> 5050
	
	//1. 실제 클라이언트 요청 주소
	console.log(request.url);//		/name
	
	var urlParse = url.parse(request.url)
	console.log(urlParse);
	
	var pathname =  urlParse.pathname;
	
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	if(pathname == '/name'){
		response.end('<h1>'+dataModule.username+'</h1>');
	}else if(pathname =='/address'){
		response.end('<h1>'+dataModule.addr+"</h1>");
	}else if(pathname =='/sum'){
		response.end('<h1>'+dataModule.sum()+'</h1>');
	}else{
		response.end('<h1>잘못된 접속입니다.</h1>');
	}
});

server.listen(10007,function(){
	console.log('server statrt... http://localhost:10007');
});
