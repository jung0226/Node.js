/* 파일 입출력 모듈
fs: FileSystem
*/

//1. fs모듈 객체 구하기
var fs = require('fs');

//쓰기할 내용
var txt="my first data \r\n노드 js를 이용한 파일쓰기";

//2. 비동기식으로 파일쓰기: 비동기식은 읽기, 쓰기가 스레드에 의해서 처리된다.
//				쓰기할 파일주소(절대주소)
fs.writeFile("D:/javaFolder/nodeWrite.txt",txt,function(e){
	if(e){//쓰기 실패시
		console.log('비동기식 쓰기 에러...'+e);	
	}else{//쓰기 성공시
		console.log('비동기식 쓰기 성공...'+e);			
	}
	
})

//3. 동기식으로 파일쓰기: 명령어를 실행하면 바로 쓰기를 한다.
//					콜백함수가 없으므로 에러 발생이 처리를 위해서 예외처리를 한다.
try{
	//				 파일명, 데이터, 인코딩
	fs.writeFileSync("D:/javaFolder/nodeWriteSync.txt",txt+"->동기식","utf-8");
}catch(e){
	console.log('동기식 쓰기 에러 발생...'+e);
}
