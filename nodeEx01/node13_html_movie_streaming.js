var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');

var server = http.createServer((request, response) => {

	var parseUrl = url.parse(request.url);
	var pathName = parseUrl.pathname;//		/index	/images/1.jpg
	if (pathName == '/index') {
		fs.readFile(__dirname + '/node12_html_movie.html', 'utf-8', function(e, readData) {
			if (!e) {
				//쓰기 :파일에 정상적으로 읽기를 했을 때
				response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
				response.end(readData);
			} else {
				response.writeHead(500, { 'Content-Type': 'text/html' });
				response.end('500 error.......');
			}
		});
	} else if (pathName.indexOf('/images') == 0) {//이미지 파일을 요청하는 경우
		var imgName = pathName.substring(1);// images/1.jpg
		var imgMime = mime.lookup(imgName);
		fs.readFile(__dirname + pathName, function(error, imgReadData) {
			if (!error) {
				response.writeHead(200, { 'Content-Type': imgMime });
				response.end(imgReadData);
			}
		});
	} else if(pathName.indexOf('/movie')==0){//동영상 파일을 요청하는 경우 스트리밍 처리
		var movieName = pathName.substring(1);
		
		//1. 스트림객체
		var stream = fs.createReadStream(movieName);
		
		var cnt =1;
		//2. data이벤트 생성 - 동영상 파일 읽기가 되면 발생하는 이벤트
		stream.on('data',(readData)=>{
			response.write(readData);
			console.log('cnt = '+ cnt++ +", file.size= "+readData.byteLength);
		});		
		//3. end이벤트 생성 - 동영상 파일을 다 읽었을 때 발생하는 이벤트
		stream.on('end',()=>{
			response.end();
			console.log('stream end ..............');
		});
		
		//4. error이벤트 생성 - 파일을 읽기 중 에러 발생시 처리할 이벤트
		stream.on('error',(error)=>{
			response.end('에러 발생');
			console.log(error);
		});
		
	} else {
		response.writeHead(404, { 'Content-Type': 'text/html' });
		response.end('404 Error.. File Not Found');
	}
});
server.listen(10010, function() {
	console.log('server Start....');
	console.log("http://localhost:10010/index");
});