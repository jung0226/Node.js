/*
	get으로 접속시 데이터 처리방법
 */
var http=require('http');
// 클라이언트에서 보낸 데이터를구하기 위해서는 url객체를 생성해야 한다.
var url = require('url');
//?num=1234&name=홍길동&tel=010-7845-7878를 처리하는 querystring모듈 객체를 생성한다.
var queryString = require('querystring');

var server = http.createServer(function(request, response){

	//request의 url주소를 파싱한다.
	var urlParse = url.parse(request.url);	
	console.log(urlParse);
	
	//파싱딘 url객체에서 데이터를 Json데이터로 변경하는 처리
	var parseQuery= queryString.parse(urlParse.query,'&','=');
	console.log(parseQuery);
	response.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
	response.write("번호: "+parseQuery.num+"<br/>이름: "+parseQuery.name);
	response.end("<br/>연락처: "+parseQuery.tel);
});

server.listen(10002,function(){
	console.log("start server .... http://localhost:10002");
});

//	http://localhost:10002?num=1234&name=홍길동&tel=010-7845-7878
