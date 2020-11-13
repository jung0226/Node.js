/* nodeJS 전역변수
[1] __filename : 현재 실행 중인 파일의 절대 경로와 파일명을 가지고 있다.
[2] __dirname : 현재 실행 중인 파일의 경로

*/

var http = require('http');
var server = http.createServer(function(request, response){
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	response.end('http 모듈 이벤트 테스트 중');
});

//1. 클라이언트가 서버에 접속할 때 발생하는 이벤트 : connection
//on, listen, addListen
server.on('connection',function(code){
	console.log('Connection Event 발생-> '+code);
});

//2. 서버가 종료되면 발생하는 이벤트 : close
server.on('close',function(code){
	console.log('Close Event 발생-> '+code);
});

//3. 클라이언트가 서버로 요청을 보낼때 발생하는 이벤트 : request
server.on('request',function(code){
	console.log('Request Event 발생-> '+code);
});

//4. 서버가 클라이언트에게 응답하면 발생하는 이벤트 : response
server.on('response',function(code){
	console.log('Response Event 발생-> '+code);
});

server.listen(10008, function(){
	console.log('server start... http://localhost:10008 ');
	console.log('__filename= '+ __filename);
	console.log('__dirname= '+ __dirname);
});
