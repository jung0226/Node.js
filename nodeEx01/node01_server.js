/**
	nodejs는 이벤트 기반 비동기식 서버프레임워크다.
	
	======= 준비사항 =========
	1. http://nodejs.org에서 다운로드 후 설치한다.
		cmd에서 node -v로 버전을 확인할 수 있다.
	2. 이클립스에서 node 설치
		help -> eclipse Marketplace -> node 검색 후
		Enide.p2f - Eclipse Node.js IDE 1.0.1를 install한다.
 */

// 1. 서버를 생성하기 위해서는 http 모듈이 필요하다.
// http모듈을 객체로 생성하기 위해서는 require()함수를 이용한다.
var http = require('http');

// 2. http모듈을 이용하여 서버를 생성
var server = http.createServer(function(request, response){
	// request : 클라이언트에서 서버로 정보를 보낼 때
	// response : 서버에서 클라이언트로 정보를 보낼 때
	
	//
	response.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
	response.write('<h1>nodejs서버에서 받은 정보</h1>');
	response.write("<div style='color:red'>노드에서 한글은 </div>");
	response.end("<h2>End에서 보낸 메세지</h2>");
});

// 3. 클라이언트가 서버에 접속하면 접속을 받아낼 이벤트
//  ***.listen() : 이벤트 대기
//			 포트번호
server.listen(10001,function(){
	console.log('서버 대기중 ...http://localhost:10001');
});

