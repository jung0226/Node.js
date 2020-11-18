var http = require('http');
var fs = require('fs');

var express = require('express');
var ejs = require('ejs');
var reqestip = require('request-ip');

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
//글스기 폼
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


server.listen(10016, () => {
	console.log('server Start');
	console.log('http://localhost:10016/write');
});