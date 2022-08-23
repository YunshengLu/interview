// 浅拷贝
function clone(obj) {
	const newobj = {};
	for (const key in obj) {
		newobj[key] = obj[key];
	}
	return newobj;
}

// 递归深拷贝
function deepclone(target) {
	if (typeof target !== "object") {
		return target;
	}
	const newobj = {};
	for (const key in target) {
		newobj[key] = deepclone(target[key]);
	}
	return newobj;
}
// 处理各种数据 正则 时间 数组 null
function deepclone2(target) {
	if (target instanceof RegExp) {
		return new RegExp(target);
	}
	if (target instanceof Date) {
		return new Date(target);
	}
	if (target === null) {
		return target;
	}

	if (typeof target !== "object") {
		return target;
	}
	const clone = new target.constructor();
	for (const key in target) {
		clone[key] = deepclone2(target[key]);
	}
	return clone;
}
// 处理symbol Reflect.ownKeys返回一个由自生属性生成的数组
function deepclone3(target) {
	if (target instanceof RegExp) {
		return new RegExp(target);
	}
	if (target instanceof Date) {
		return new Date(target);
	}
	if (target === null) {
		return target;
	}

	if (typeof target !== "object") {
		return target;
	}
	const clone = new target.constructor();
	Reflect.ownKeys(target).forEach((key) => {
		clone[key] = deepclone3(target[key]);
	});
	return clone;
}
// 防止递归爆栈  生成一个空间用来保存当前对象和拷贝对象之间的关系，需要拷贝当前对象是就去空间中查找如果有的话就直接返回，这样就能避免五点递归爆栈

function deepclone4(target, hash = new WeakMap()) {
	if (target === null) {
		return target;
	}
	if (target instanceof Date) {
		return new Date(target);
	}
	if (target instanceof RegExp) {
		return new RegExp(target);
	}

	if (typeof target !== "object") {
		return target;
	}
	if (hash.get(target)) return hash.get(target);
	// 数组对象
	const clone = new target.constructor();
	hash.set(target, clone);
	Reflect.ownKeys(target).forEach((key) => {
		clone[key] = deepclone4(target[key]);
	});
	return clone;
}
