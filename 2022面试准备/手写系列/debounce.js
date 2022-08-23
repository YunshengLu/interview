// function debounce(fn, timeout) {
// 	let timer = null;
// 	return function (...arg) {
// 		clearTimeout(timer);
// 		timer = setTimeout(() => {
// 			fn.apply(this, arg);
// 		}, timeout);
// 	};
// }




function debounce(fn,timeout){
	let timer=null;
	return function(...arg) {
		clearTimeout(timer);
		timer= setTimeout(()=>{
			fn.apply(this,arg);
		},timeout);
	};
}

function throttle(fn,timeout){
	let flag =false;
	return function(...arg) {
		if(flag) return;
		flag=true;
		setTimeout(()=>{
			fn.apply(this,arg);
			flag=false;
		}); 
	};
}
// 一分钟之内如果多次触发就把上一次的清楚，只执行最后一次
