var http = require('http');
var fs = require('fs');

var express = require('express');
var ejs = require('ejs');
var requestip = require('request-ip');

var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);
//-----------------oracledb
var oracledb = require('oracledb');
oracledb.autoCommit = true;//자동커밋 설정
//db연결
var conn;
oracledb.getConnection({
	user: 'scott',
	password: 'tiger',
	connectString: 'localhost:1521/xe'
}, (error, con) => {
	//연결이 되면
	if (error) {
		console.log('DB연결 error 발생->' + error);
	} else {
		conn = con;
	}
});

app.use(express.static(__dirname)); //express에 기본 폴더 셋팅
app.use(bodyParser.urlencoded({ extended: true }));//한글 인코딩

//get방식으로 접속
app.get('/list', (req, res) => {
	var sql = "select no, subject, userid, to_char(writedate,'MM-DD HH:MI'), hit";
	sql += " from freeboard order by no desc";
	//실행하기	쿼리문, 콜백함수
	conn.execute(sql, (error, result) => {
		if (error) {
			console.log('레코드 선택 에러 발생-> ' + error);
		} else {
			var cnt = result.rows.length;//총 레코드 수 
			//list.ejs파일을 읽은 후 선택한 레코드 렌더하여 클라이언트에게 보낸다.
			fs.readFile('list.ejs', 'utf-8', (e, d) => {
				if (!e) {
					res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
					//					view코드, ejs에 보낼 데이터를 json
					res.end(ejs.render(d, {
						records: result,
						recordCount: cnt,
						paging: {
							firstPage: 7,
							lastPage: 25,
							nowPage: 6
						}
					}));
				} else {
					console.log('list.ejs 파일읽기 에러 발생-> ' + e);
				}
			});
		}
	});
});
//글쓰기 폼
app.get('/write', (req, res) => {
	fs.readFile('write.html', (error, data) => {
		if (!error) {
			res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
			res.end(data);
		} else {
			conosole.log("글 쓰기 폼 에러..." + error);
		}
	});

});

//글 등록
app.post('/writeOk',(request,response)=>{
	//행의 데이터를 request
	var userid = request.body.userid;
	var subject=request.body.subject;
	var content= request.body.content;
	
	//접속자의 아이피 구하기 -- 홈페이지 접속시 ip로 접속한다.
	//	 	192.168.0.225:10016/ 127.0.0.1:110016
	var ip = requestip.getClientIp(request).substring(7);
	console.log("ip-> "+ip); // ::ffff:102.168.0.225
	var sql="insert into freeboard (no, userid, subject, content, ip) ";
		sql+="values (a_sq.nextval, '"+userid+"','"+subject+"','"+content+"','"+ip+"')";
		
	conn.execute(sql, (error, result)=>{
		if(error){//추가 실패, 글 쓰기
			//다른 url 리다이렉트 하기
			response.statusCode =302;
			response.setHeader('location', '/write');
			response.end();
		}else{//추가 성공
			response.statusCode=302;
			response.setHeader('Location','/list');
			response.end();
		}
	});
});
//글 내용보기
app.get('/view',(req,res)=>{
	var no= req.param('no');
	
	var sql = "select no, subject, DBMS_LOB.SUBSTR(content,DBMS_LOB.GETLENGTH(content)), userid, ";
		sql+= "hit, to_char(writedate,'YYYY-MM-DD HH:MI:SS' )";
		sql += "from freeboard where no="+no;
	conn.execute(sql,(error,result)=>{
		if(!error){
			fs.readFile('view.ejs','utf-8',(error, data)=>{
				if(!error){
					res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
					res.end(ejs.render(data, {
						results:result
					}));
				}
			});
		}
	});
});

//글 수정 폼
app.get('/edit',(req,res)=>{
	var no= req.param('no');
	var sql = "select no, subject, DBMS_LOB.SUBSTR(content,DBMS_LOB.GETLENGTH(content)) ";
		sql+= "from freeboard where no="+no;
	conn.execute(sql,(e, result)=>{
		if(!e){
			fs.readFile('edit.ejs', 'utf-8',(error, data)=>{
				res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
				res.end(ejs.render(data,{
					results:result
				}));
			});
		}
	});
});
//글 수정- 실패수정, 성공 글 내용
app.post('/editOk', (req, res)=>{
	var no = req.body.no;
	var subject =req.body.subject;
	var content = req.body.content;
	
	var sql = "update freeboard set subject='"+subject+"',content='"+content+"' ";
		sql += "where no="+no;
	conn.execute(sql,(error, result)=>{
		if(error){//에러 발생
			res.statusCode=302;
			res.setHeader('Location','/edit?no='+no);
			res.end();
		}else{//
			res.statusCode=302;
			res.setHeader('Location','/view?no='+no);
			res.end();			
		}
	});
});

//삭제하기
app.get('/del',(req,res)=>{
	var no=req.param('no');
	var sql = "delete from freeboard where no="+no;
	
	conn.execute(sql,(error, result)=>{
		if(error){//에러발생
			res.writeHead(200,{'Content-Type': 'text/html'});
			res.end("<script>location.href='/view?no='"+no+"';</script>");
		}else{
			res.writeHead(200,{'Content-Type': 'text/html'});
			res.end("<script>location.href='/list';</script>");
			
		}
	});
});

server.listen(10016, () => {
	console.log('server Start');
	console.log('http://localhost:10016/write');
});