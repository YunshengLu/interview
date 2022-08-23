function throttle(fn, timeout) {
	let timer;
	return function (...arg) {
		if (timer) return;
		timer = setTimeout(() => {
			fn.apply(this, arg);
			timer = null;
		}, timeout);
	};
}
// 在一定时间内多次执行判断是否，则把除第一次外的全丢掉就等第一次的执行完再说，执行完把timer 放开可以执行下一次的
