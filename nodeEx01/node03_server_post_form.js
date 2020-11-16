var http = require('http');

var server = http.createServer(function(request, response){
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	response.write('<form method="post" action="http://localhost:10004">');
	response.write('번호 : <input type="text" name="num"/><br/>');
	response.write('이름 : <input type="text" name="username"/><br/>');
	response.write('연락처: <input type="text" name="tel"/><br/>');
	response.write('<input type="submit" value="서버로 보내기"/><br/>');
	response.write('</form>');
	response.end('<img src="./images/bird.gif"/>');
});

server.listen(10003,function(){
	console.log('서버 실행 중... http://localhost:10003');
});