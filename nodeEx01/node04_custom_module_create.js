// 모듈 생성하기
// 모듈을 생성하는 내장객체는 exports이다.

// 1. 변수를 모듈로 선언하는 방법
// var num = 1234;
exports.num=5678;
exports.username='hong gil dong';
exports.addr ='서울시 마포구';

// 2. 함수를 이용하여 모듈로 선언하는 방법
exports.sum=function(){
	var sum=0;
	for(i=1; i<=100; i++){
		sum+=i;
	}
	return sum;
}
exports.hap=function(n1, n2){
	return n1+n2;
}