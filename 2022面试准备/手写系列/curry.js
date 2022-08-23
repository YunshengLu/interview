// 科里化

function cur(x) {
	return function (y) {
		return function (z) {
			return x + y + z;
		};
	};
}

console.log(cur(3)(2)(3));
