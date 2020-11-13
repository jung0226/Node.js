var http= require('http');
var myModule = require('./node04_custom_module_create');
var server = http.createServer(function(request, response){
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	//						모듈 객체명.변수
	response.write('번호: '+myModule.num+'<br/>');
	response.write('이름: '+myModule.username+'<br/>');
	response.write('주소: '+myModule.addr+'<br/>');
	
	response.write('1~100까지의 합--> '+myModule.sum()+'<br/>');
	response.end('두 값의 합-> '+myModule.hap(5,2));
});

server.listen(10005,function(){
	console.log('server start.... http://localhost:10005');
});