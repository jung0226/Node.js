var http = require('http');
var url = require('url');
var fs = require('fs');
var socketio = require('socket.io');

var server  =http.createServer((req, res)=>{
	var urlName = url.parse(req.url);
	var pathName = urlName.pathname;
	
	if(pathName=='/chatForm'){
		fs.readFile(__dirname+'/chat_1.html','utf-8',(e, data)=>{
			if(e){
				//에러 있을 때
				res.writeHead(500,{'Content-Type':'text/html;charset=utf-8'});
				res.end('<h2>500 Error ....... </h2>');
			}else{
				//에러 없을 때
				res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
				res.end(data);
			}
		});
	}else{
		res.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
		res.end('<h2>404 Error .... </h2>');
	}
});

server.listen(10013, function(){
	console.log('Start server...');
	console.log('http://localhost:10013/chatForm')
});

// socketio 객체 만들기  ///////////////////////////////////////////
// socketio 이벤트 를 만든다.  -> 접속을 대기하기 위한 이벤트
var io = socketio.listen(server);

var id='';
// 클라이언트 서버에 연결하면 실행될 이벤트(connection)
io.sockets.on('connection',(socket)=>{
	console.log("클라이언트가 접속함....");
	//접속자에게 자동으로 할당된 아이디
	id = socket.id;
	console.log('id= '+id);
	
	// 클라이언트가 보낸 통신정보를 받을 이벤트
	//		이벤트 종류, 받은 정보
	socket.on('hello',(data)=>{
		console.log('Client Msg-> '+data);
		
		//클라이언트에게 문자 보내는 이벤트를 발생 시킨다.
		//socket.emit('echo','welcome Client --> '+data);
		
		//[1] public : 모든 접속자에게 정보 보내기
		//io.sockets.emit('echo','public-> '+data);
		//[2] broadcast : 나를 제외한 모든 접속자에게 정보 보내기
		//socket.broadcast.emit('echo','broadcast -> ' + data);
		//[3] private : 특정 클라이언트에게만 데이터 보내기
		//	  id가 전역변수인 경우는 마지막 접속자에게 보낸다.
		//	  id가 지역변수인 경우에는 현재 접속자에게 보낸다.
		io.sockets.in(id).emit('echo','private->'+data);
		
	});
});