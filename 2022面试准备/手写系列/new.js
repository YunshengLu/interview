// 创建对象
// 将构造函数的prototype赋值给新对象的隐式原型 __proto__
// this指向新对象 将构造函数内的this赋值为这个新的对象
// retrun

function myNew(fun,...args){
    const obj = {};
    obj.__proto = Object.create(fun.prototype);
    const res = fun.apply(obj,args);
    // 如果有返回值且是一个对象，那么就返回执行结果，否则返回新创建的对象
    return res instanceof Object ? res : obj;
}
function parents(m) {
    this.a=m;
    return "asd";
}
const me = myNew(parents,'lsj');
console.log(me.a);