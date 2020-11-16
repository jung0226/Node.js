var http= require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');

var server = http.createServer((request, response)=>{
	
	var parseUrl = url.parse(request.url); 
	var pathName = parseUrl.pathname;//		/index
	
	if(pathName=='/index'){
		fs.readFile(__dirname+'/node12_html_movie.html','utf-8',function(e, readData){
			if(!e){
				//쓰기 :파일에 정상적으로 읽기를 했을 때
				response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
				response.end(readData);
			}else{
				response.writeHead(500,{'Content-Type':'text/html'});
				response.end('500 error.......');
			}
		});
	}else{
		response.writeHead(404,{'Content-Type':'text/html'});
		response.end('404 Error.. File Not Found');
	}
	
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	response.end('');
});
server.listen(10010,function(){
	console.log('server Start....');
	console.log("http://localhost:10010/index");
});