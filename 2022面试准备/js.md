## ES6 系列

### var let const 的区别

var 会将变量提升至全局，所以可以在声明前使用，声明的变量挂在 window 下，可以多次重复声明。
let 不会变量提升，所以不能在其什么前使用，声明的变量只能在其块级作用域内使用，可以多次重复声明
const 不会变量提升，所以不能在其什么前使用，声明的变量只能在其块级作用域内使用,不能多次重复声明（const 定义的数据不是值这个变量的值不能动，而是变量指向的那个内存地址所保存的数据不得改动）
(函数提升优于变量提升)

### 数组新增扩展

1. 扩展运算符的应用 [a,...b] 扩展运算法实现的是浅拷贝，修改了引用指向的值，会同步反映到新数组
   [...'hello']
   (5) ['h', 'e', 'l', 'l', 'o']
   定义了遍历器（iterator）接口的对象都可以使用扩展运算符
2. 构造函数新增的方法
   Array.from()
   将类数组和可遍历的对象转为数组
   可接受两个参数，第一个参数是要转变为数组的值，第二个参数是一个回调函数用来处理每个元素，然后返回至数组
   Array.of()
   将一组值转换为数组
   没有参数返回空数组
   一个数返回数组长度
   多个值返回新数组
3. 实例对象新增的方法
   [].copyWithin(target,start,end)
   target: 要被替换的值的首位
   start: 要替换值的初始位置
   end: 要替换值的末尾
   [].find((value,index,arr)=>{return value==xxx})从数组中查找符合条件的第一个值并且返回
   [].findIndex((value,index,arr)=>{return value==xxx})从数组中查找符合条件的第一个值的下标并且返回，没有返回-1。两者都能接受第二个参数，用来绑定回调函数的 this 对象
   [].fill()用来数组可以接受三个参数，第一个要填充的值，第二个要填充的起始位置，第三个要填充的末尾位置。（如果要填充的为对象，则是浅拷贝）
   [].keys() 对键名的遍历，[].values()对健值的遍历， [].entries()对健值对的遍历
   [].includes() 判定是否存在某个值，返回 boolean
   [].flat()扁平化数组，不改变原数组，默认值拉平一层，如果多层可以接受一个参数代表要扁平的层数
   [].flatMap()方法对原数组的每个成员执行一个函数相当于执行 Array.prototype.map()，然后对返回值组成的数组执行 flat()方法。该方法返回一个新数组，不改变原数组
   // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
   [2, 3, 4].flatMap((x) => [x, x * 2])
   // [2, 4, 3, 6, 4, 8]

### 对象新增拓展

属性简写: {name:name}==>{name}
属性名表达式 ES6 允许字面量定义对象将表达式放在括号内

    ```js
    let lastWord = "last word";
    const a = {
    	"first word": "hello",
    	[lastWord]: "world",
    };
    a["first word"]; // "hello"
    a[lastWord]; // "world"
    a["last word"]; // "world"
    ```

    super 关键字用来访问一个对象的父对象上的函数

    ```js
    super([arguments]); // 调用 父对象/父类 的构造函数
    super.functionOnParent([arguments]); // 调用 父对象/父类 上的方法
    ```

    扩展运算符 在结构赋值中，未被读取的可遍历的属性，分配到指定的对象上面（浅拷贝，修改原来的浅拷贝出来的也会被修改）

    遍历对象属性

    1. for...in 遍历对象自身的属性和所有继承的可枚举属性。
    2. Object.keys(obj) 返回一个数组，包括对象自身的所有可枚举属性（不包括继承的）的键名。
    3. Object.getOwnPropertyNames(obj)：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
    4. Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名。
    5. Reflect.ownKeys(obj)：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

    对象新增的方法
    (1) Object.is() 和 === 相似用来判断两个值是否相等，除了(+0===-0//true NaN===NaN//false)(Object.is(+0,-0)//false , Object.is(NaN,NaN)//true)
    (2) Object.assign() 用于对象的合并，接受的第一个参数是目标对象要合并进去的对象，后面的参数是要合并的对象合并是浅拷贝，相同对象后面的会覆盖前面的。
    (3) Object.getOwnPropertyDescriptors() 返回指定对象所有自身属性的描述对象。
    (4) Object.setPrototypeOf() 设置一个对象的原型对象
    (5) Object.getPrototypeOf() 获取一个对象的原型对象
    (6) Object.keys()返回一个数组，里面是对象的所有可枚举属性的键名
    (7) Object.values() 返回一个数组，里面是对象的所有可枚举属性的键值
    (8) Object.entries() 返回一个数组，里面是对象的所有可枚举属性的键值对
    (9) Object.fromEntries() 将键值对数组转换为对象

### 函数新增扩展

    参数 函数参数可以设置默认值
    属性

    1. length 返回没有设置默认参数的个数，如果设置了默认值的参数不是尾参数，那么 length 属性也不再计入后面的参数了。
    2. name 返回该函数的函数名。

    箭头函数
    函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象
    不可以当作构造函数，不能使用 new
    不可以使用 arguments(函数的参数数组)，可以使用 rest 代替
    不可以使用 yield 命令，因此箭头函数不能用作 generator 函数

    你是怎么理解 Set 和 Map 的
    Set 是一堆无序相关联且无重复值的元素组成的集合 类似数组拥有遍历器是以[值,值]存储的
    Set 本身是一个构造函数我们可以用 new Set() 来创建这种数据结构。
    Set 有四个方法 add() 给集合添加值，如果添加重复的值，不会生效。delete()删除集合中的值返回一个 boolean 值。clear() 清空集合。has() 判断是否有某个值。
    keys() values() entries() forEach() 遍历集合
    运用 Set 加扩展运算符来对数组去重 [...new Set(arr)],同理还可以获取交集并集

    ```js
    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);
    // 并集
    let union = new Set([...a, ...b]);
    // Set {1, 2, 3, 4}
    // 交集
    let intersect = new Set([...a].fliter((x) => b.has(x)));
    // set {2, 3}
    // （a 相对于 b 的）差集
    let difference = new Set([...a].filter((x) => !b.has(x)));
    // Set {1}
    ```

    Map 是键值对的有序列表，而键和值都可以是任意类型。[key,value]的形式存储的
    size 返回 Map 内元素的总数
    set() 存储键值对，如果有相同的键，则值更新
    get() 读取 key,返回值
    has() clear() delete() 遍历操作 同 Set

    WeakSet 和 Set 的区别，WeakSet 没有遍历操作和没有 size 属性 WeackSet 成员只能是引用类型，而不能是其他类型的值。
    WeakMap 和 Map 的区别，WeakMap 没有遍历操作和 clear 属性。WeakMap 只能接受对象作为键名。
    如果键名所指的值不在需要所对应的键值队也会消失

### 怎么理解 ES6 中的 Proxy

### ES6 module

模块 能够单独命名并且能独立的完成一定功能的程序语句的集合
主要有两个特征外部特征和和内部特征：
外部特征：外部程序调用，输入输出参数等和模块的功能
内部特征：模块内部环境具有的特点
为什么需要模块化？ 代码封装 代码抽象 代码复用 依赖管理
AMD CMD CommonJs ESmodule
AMD 采用异步方式加载模块 所有依赖模块的语句都定义在一个回调函数中，等模块加载完成后，回调函数才会运行。
CommonJs 主要用于服务端，module.exports = {foo,bar}//抛出模块 const {foo,bar} = require('a.js')//引入模块 所有模块都是运行在模块作用域内，不会污染全局作用域 模块是同步加载，只有加载完成才能运行后面的操作 模块首次执行后就会缓存，后续在加载会从缓存中读取，如果有改动需要清除缓存 require 到处的值是拷贝的，模块内的改变不会影响拷贝出来的值。
ES6 export 导出模块 import 导入模块 \*号加载整个模块代表 import 的变量是只读的不允许修改，但是如果是对象是允许修改的
动态加载 import("").then()在需要时才去加载相应的模块，返回的是一个 promsie
commonJs 和 ESmodule 的区别
commonjs 可以动态加载语句比如（require(`${xxx}`/js)）代码之发生在运行时，导出值时拷贝的，不可以修改导出值，代码出错是不好排查问题
ESM 是静态的不可以动态的加载语句，只能声明在文件最顶部，代码发生在编译时，导出值存在映射关系值都是可读，不能修改

## javascript 系列

### 数据类型及存储区别

数据类型： 主要分成两种基本数据类型和复杂数据类型（存储不同）
基本数据类型：number（NaN） string boolean undefined(声明变量而没有赋值) null(被人为重制为空对象栈中的变量没有指向堆中的内存地址，如果一个对象将来要被定义为一个对象，我们可以暂时先给这个变量定义为 null,某一个数不在需要使用我们可以将其设置为 null,解除引用，表示为空对象指针 typeof 为 object) symbol（确保对象属性是唯一值）（bigInt）
复杂数据类型：array object function
基本数据类型是存放在栈内存中 当我们将一个值 a 赋值给 b 时,b 会生成一个新的栈内存地址，两个值时相互独立的，修改互不影响。
复杂数据类型是存放在堆内存中 当我们将一个对象 a 赋值给 b 时，我们会栈中复制一个指针引用，原来的指针引用和复制出来的指针引用都是指向同一个堆内存地址，我们不管修改 a 或者 b，最后修改的都是堆内存引用的同一个值，两个值都会受影响。

### 数组的方法

增
push 往数组末尾推值，返回新数组长度
unshift 往数组首位推值，返回新数组长度
splice 三个参数 第一参数开始操作数组的位置，要删除的个数，要插入的元素 ，返回一个空数组
concat 合并两个数组返回新数组，不会影响原数组
删
pop 删除数组最后一个值，返回被删除的项
shift 删除数组第一项，返回被删除数组的项
splice 用前两个参数来删除，第一个参数开始操作数组的位置，第二个参数要删除的数目。
slice 截取数组 不会修改原数组，返回一个全新的数组
改
splice
查
indexOf 返回查找元素的在数组中的位置（第一个），没有返回-1
find 返回匹配的第一个元素
includes 返回一个 boolean 值
排序
reverse 反转数组
sort 排序
转换
join 数组转字符串
遍历数组方法
some 遍历数组每一个数，将数传入回调进行测试，只要有一个符合条件的返回 true
every 遍历数组每一个数，将数传入回调进行测试,全部符合返回 true
foreach 遍历所有值，没有返回值
filter 过滤数组，返回符合的数
map 遍历数组，对每一项数进行处理，返回被处理后的数组

### js 字符串的常用方法

增
concat 合并两个字符串
删
创建一个新的副本，在副本上修改，不会改变原数组
slice()
substr()
substring()
改
toLowerCase() 全小写
toupperCase() 全大写
查
chatAt() 返回指定下标的值
indexOf() 返回要查找的下标的第一个值
includes() 返回 boolean

split 字符串转数组

replace() 两个参数第一个参数为要匹配的元素，第二个参数要替换的元素

### == 和 ===

== 会做隐式转换后在啊比较

1.  都为简单数据类型转为数值在比较
2.  都为对象，比较是否是引用的是同一个内存地址
3.  null 和 undefined 相等
4.  NaN false
5.  简单和复杂类型 会将对象转变为原始类型在比较

### 深拷贝和浅拷贝的区别

浅拷贝你可以理解为拷贝了一份数据如果是基础数据类型那就是会生成一份新的栈内存数据，如果是对象，也只是拷贝一份栈指针，最后指向的是同一个堆内存数据，浅拷贝出来的深层次的引用型数据都只是拷贝指针，堆内存数据都是同一份，所以修改其中一个深层次的引用型数据，两个都会被修改（object.assign slice concat 扩展运算符）
深拷贝是完全复制出一份新的内存空间，深层次的引用型堆内存也会复制新的内存地址，修改其中一个对象属性不会改变另一个对象的属性。
深拷贝的方法 \_.cloneDeep JSON.stringify(sympole,undefined 函数不能拷贝) structuredClone()不兼容 structuredClone structuredClone

通过闭包来保存一个标记，来保存 setTimeout 的返回的值

### 闭包的理解和使用场景

闭包是指一个函数，能够访问另外一个函数中的变量，或者能够访问自由变量中的函数自由变量是指外部函数作用域中的变量，也可以说是一个函数对外部的变量的引用形成了一个闭包。闭包存储的变量存放在堆内存中

闭包的作用，保护函数内的私有变量不被外部影响，把函数内的值保存下来。
用法：返回一个函数 自执行函数 循环赋值 回调函数也是闭包 节流和防抖 柯里化
闭包容易造成内存泄露
闭包经典题： for 循环引用

### 作用域链的理解

作用域指变量和函数生效的区域和集合。
作用域分为：全局作用域 函数作用域 块级作用域
作用域链我们寻找一个变量是会从当前作用域寻找变量如果没有找到就往上层作用域找如果还有找到，就继续向上找直到全局作用域为止

### js 原型原型链 （instanceOf  new 继承）

（为什么说万物皆对象呢，new String() new Number() 都可以由这个创建）

js 里面万物皆对象，当我们创建一个对象的时候（new String() new Number()），除了他们各自的属性以外，每个对象还有一个隐实的 _proto_ 属性，当我们去查找创建的对象的属性时，我们先从对象上找，如果没有找到我们就会通过 _proto_ 去隐式原型上去找，如果没有找到就继续在 _proto_ 的 _proto_ 上去查找，直到找到为止，我们通过 _proto_ 对象将原型链接起来形成原型链（最后这个 _proto_ 是指向object的null）。除此之外 我们new String 构造函数的 prototype 也指向这个原型对象。

### js 继承 
js 继承可以使子类拥有同样的方法，而不需要在编写同样的代码。
同时子类可以重新定义某些方法和覆盖父类的某些属性。
实现继承的最优方法：组合继承

### this 的理解  （谁调用我我就指向谁）
函数在执行过程中一旦确定了this的指向就不能再修改。
this 是指函数运行时函数内部产生的一个内部对象，他只在函数内部使用，总是指向调用他的对象。
他的指向：
1. 默认绑定 严格模式下全局this式undefined 非严格模式下次啊是window 

2. 隐式绑定 o.b.fn()  指向b   let a=o.b.fn a() 指向a 的全局环境。

3. new  指向这个实例对象（如果实例对象有返回值且返回值为对象，则指向这个返回的对象，否则指向实例对象）

4. call apply bind 修改this指向 ，this指向第一个参数

5. 箭头函数 箭头函数本身是没有this 他其中的this 是指向第一个包裹箭头函数的非箭头函数。

new  > call ... > 隐式  > 默认

### JS 中的执行上下文和执行栈
 js 中的执行上下文主要分为三部分： 全局执行上下文，函数执行上下文， eval 执行上下文
全局执行上下文： 只有一个，他就代表 window 环境的执行上下文，
函数执行上下文： 可以有无数个，当函数被调用时就会创建函数执行上下文
Eval函数执行上下文： 指的是运行在 eval 函数中的代码
三个生命周期 创建--执行--回收
创建阶段： 确定this的指向，创建词法环境和变量环境（比如var声明的对象提升并且赋值为undefined）
执行阶段：赋值和代码执行
回收阶段：回收执行上下文

执行栈： 后进后出，先把全局执行上下文压入栈中，然后调用a方法的时候，将a的函数执行上下文压入栈中，a中又调用了b 我们就会把b的函数执行上下文压入栈中，b执行完毕，将b推出栈中，再执行a ,a执行完毕，将a推出，所有代码执行完毕，在推出全局执行上下文。



### js 中的事件模型
事件和事件流：是网页具备交互性，加载事件鼠标事件自定义事件
因为dom是树形结构的 当子节点触发事件的时候，就会有一个事件顺序
事件流会经历三个事件：
事件捕获阶段 (从最高层的父节点出发，一直向里捕获知道目标节点为止)
目标阶段
事件冒泡阶段（由具体的触发节点出发一直向父节点冒泡，直到最高层的父节点）

事件模型：
原始事件模型（DOM 0级） 
   可以通过直接在HTML上写onclick="function(){}" 或者btn.onclick= fun 来绑定事件
   只支持冒泡，不支持捕获 同一个类型只能绑定一次，如果绑定两次后面的会覆盖前面的

标准事件模型（DOM 2级）
   通过addEventListener来监听事件的发生，他会完整的经历捕获和冒泡事件，
   接受三个参数一个是触发事件，一个是事件处理方法，最后一个是boolean,设置时候进行捕获，默认是false，设置为true 时会先进行捕获事件，在进行冒泡事件

事件委托 将事件委托给父节点，这样就不需要每个子节点都去绑定事件，只需要通过父节点完成绑定即可。（focus,blur没有事件冒泡机制）

event.stopImmediatePropagation() 如果同一个dom上绑定了多个相同的方法，会先按顺序执行这些方法，执行到其中一个方法内有event.stopImmediatePropagation(),则下面的方法都不会在执行，也不会在冒泡
event.stopPropagation(),阻止捕获和冒泡事件在当前事件进一步传播
event.preventDefault 默认动作不被执行，比如对链接的点击不会被处理

### typeof  和  instanceof 
typeof 是用来判断基础数据类型的 （typeof null 为object ） 也可以判断function 
instanceof 检测构造函数的prototype 是否出现在实例对象的原型链上。 一般用来判断复杂的引用数据类型，但是不能判断基础数据类型。（左边操作数的原型链上是否有右边构造函数的prototype属性，判断某个对象是否是构造函数的实例）
Object.prototype.tostring.call() 通用的方法判断数据类型，表示toString运行时this指向的对象类型。
为什么用call 本来按道理我们通过原型链查找toSting方法,最终都是会指向Objec中的toString方法，但是因为大部分对象都自身实现了toString 的方法，比如Number.toString()这就可能导致toString方法被劫持，所有使用call方法来强制执行object.tostring()方法

### ajax 原理如何实现
通过 XMLHttpRequest 来实现向服务器发送异步请求数据，从服务器获得数据，然后用JS来操作DOM而更新页面。
实现过程：
1. 创建ajax的核心对象XMLHttpRequest对象。
2. 通过 XMLHttpRequest 对象的 open() 方法和服务端建立连接。
3. 构建请求所需要的数据，通过XMLHttpRequest对象的send()方法发送给服务器端
4. 通过 XMLHttpRequest 对象提供的 onreadystatechange 事件监听服务器端的通信状态
5. 接受并处理服务端返回的数据
6. 将结果更新到HTML的页面中


### call apply bind 
作用是该改变函数运行时的this指向。
call 第一个参数是this的指向，后续的参数是要传入的参数列表。
apply 第一个参数是this的指向,第二个参数是一个数组表示要传入的参数列表。
bind 返回的不是一个立即执行的函数。

### 事件循环
js 中事件分为同步任务和异步任务，同步任务会推入主线程，进入主线程栈中异步任务会进入任务队列，当主线程内的任务执行完以后会将异步任务队列（先进先出）推入主线程栈中执行。
异步任务又分为宏任务和微任务
常见的微任务有：Promise.then catch finally process.nextTick
常见的宏任务有：setTimeout setInterval requestAnimationFram
我们先执行同步任务，当同步任务执行完以后，我们会从任务队列中找到微任务将微任务推入到主线程中执行，然后在将宏任务推入到主线程中执行，碰到微任务又把微任务放到队列中然后继续上面的操作。
```js
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
```

### DOM 常见的操作
DOM 他提供了文档对结构化的描述

创建节点：createElement (创建元素) creatNodeText(创建文本节点)
获取节点：querySelector("") querySelector("") getElementById   getElementByClassName  getElementByName getElementByTagName
更新节点：innerHTML innerText textContent style(修改css属性)
添加节点：appendChild  setAttribute 修改增加元素属性
删除节点：removeChild

### BOM 的理解
BOM 提供对浏览器进行交互的对象 比如页面的前进后退刷新滚动窗口的改变等
window相关的方法
window.scrollTo()移动到某个位置  window.scrollBy()相对移动多少px
window.open 打开某个窗口导航到某个页面
location 相关的方法（获取页面路径上的一些数据）
location.hash location.host ...  location.reload() 重新从缓存中请求页面，如果传入参数true则从服务器强制重新请求。
navication 获取浏览器的相关数据
screen 屏幕的一些数据
history 操作路由 history.go()   history.forword()前进  history.back()后退 history.length

### 内存泄露

### JS本地存储的方式有哪些？区别及应用场景？
本地缓存主要分为四种：
cookie：
因为http 是无状态的，因此网站通过生成一段cookie字段 用来区分用户身份而存储在用户本地的终端的数据。
它的大小大概只有4kb 由name value MaxAge(有效时间) secure(只能在https的加密协议下才可被发送) domain(那些主机可以接受cookie) httpOnly(为true时只有服务器才可以修改，js无法获取cookie)
SameSite(是否允许跨站请求)   删除cookie 设置一个过期时间

localStorage
生命周期持久如果不主动删除的话一直存放在本地，大小为5M ，存储的消息在同一域。只能在同一域中使用。
localStorage.setItem 设置
localStorage.getItem 获取
localStorage.key(0) 获取键名
localStorage.removeItem 删除
localStorage.clear()

sessionStorge
页面级回话关闭页面数据就被删除，其他和localStorage类似

indexedDB
没用过


### 函数式编程的理解
把过程写成函数，只需要关注输入和输出
纯函数：相同的输入，产生相同的输出，输入输出值和其他隐藏信息或者状态无关，无副作用
高阶函数：以函数作为输入或者输出的函数
柯里化是把一个多参数的函数转化为一个嵌套的一元函数的过程。

```js
const curry = function(fn){
   return function curriedFn(...args) {
      if(args.length<fn.length){
         return function () {
            return curriedFn(...args.concat([...arguments]))
         }
      }
   }
}
```

### 函数缓存
闭包：一个函数能够访问另外一个函数中的变量（闭包可以让你内层函数访问到外层函数的作用域）
柯里化 
高阶函数 函数作为参数传入或返回其他函数的函数

### 精确丢失
0.1+0.2===0.3 //false 
会将浮点数转化为二进制数进行计算，然后再将结果二进制转换为浮点数时结果就会有误差，因为js中不能无限的存储小数点后的数，最多52位，所以计算出来的值有误差

### 防抖和节流
防抖，短时间内多次发生之发生最后一次
```js
 function trottle (fn,timeout){
   let timer = null
   return function(...args){
      clearTimeout(timer)
      timer = setTimeout(()=>{
         fn.apply(this,args)
      },timeout)
   }
 }
 function debounce(fn,timeout){
   let flag = false
   return function(...args) {
      if(!flag) return
      flag = true
      setTimeout(()=>{
         fn.apply(this,args)
         flag = false
      }.timeout)
   }
 }
```

### 判断元素是否在可视区域
```js
function isInViewPort(element) {
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewHeight =
          window.innerHeight || document.documentElement.clientHeight;
    const { top, right, bottom, left } = element.getBoundingClientRect();
    // top >= 0 在视窗往下  left >= 0在视窗往右 right <= viewWidth bottom <= viewHeight没有超出视窗
    return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
```

### 大文件断点续传
跳过，没碰到过类似需求

### 单点登录
只需要登录一次其他的几个应用也能登录
同域名下的单点登录：
cookie 的domain 属性设置为父域，父域的cookie会被子域共享，将path设置为根路径，将token保存在父域中所有的子域就都能访问这个cookie.
不同域名下的单点登录：（sso认证中心）
用户进入系统一，系统一判断用户没有登录，跳转到sso认证中心，
sso认证中心发现没临牌没有登录，跳转到登录页面
用户登录以后跳转回sso认证中心,并且验证登录是否成功，验证完成以后和用户生成一个全局回话，同时生成一个令牌，将令牌发送给系统一，系统一接受到令牌以后在sso认证中心判读用户是否有效，sso认证中心判断令牌有效，系统一用该令牌和用户建立局部对话，安全发送数据
用户访问系统二，系统二发现用户没有登录，跳转到sso认证中心，发现用户和sso认证中心建立了全局回话已经登录，sso认证中心生成令牌发送给系统二，系统二在拿到令牌去sso认证中心，判断用户是否登录。sso认证中心校验令牌，返回有效，注册系统2。


### wab常见的攻击方式
XSS 攻击（跨站脚本攻击）
恶意代码未经过过滤，与网站的正常代码混在一起，浏览器无法分辨哪些是脚本是可信的，导致恶意脚本被执行。
主要分为：
存储型：比如掘金写文章我们写入一段脚本发布存储到服务端，用户读取这个页面的时候，就会将文章中脚本当代码执行。
反射型：攻击的人伪造一段url，这个url里面含有攻击代码，诱导用户点击这个url,用户点击这个url后，网站服务端将恶意代码提取出来，拼接在HTML中返回给浏览器端，浏览器解析执行恶意代码，我们就中招了，恶意代码的内容可能是获取用户数据，或者冒充用户行为。
DOM型：和反射型类似不过，他不会经过服务端，纯在前端发生的，比如页面有短代码是获取url里面的name内容，我们在name后面拼接个script标签脚本，我们获取到script 当成代码执行了。
预防这种攻击：
1. 纯前端渲染，页面加载一个静态的HTML 其中不包含任何数据，在去执行HTML中的js，js强求数据。
2. 转义HTML 
3. 对特殊字符过滤
4. CSP
(dengerouslySetInnerHTML)

CSRF 攻击（跨站请求伪造）
攻击者伪造我们的身份去发送一些恶意请求。
我们先登录浏览一个安全的网站A,生成一个A页面的有效cookie，然后被诱导进入B页面，b页面有个图片我们被诱导点击，图片的src是A网站的操作路径比如get什么什么东西，因为我们此时其实是有a页面的有效cookie，a页面就会任务是用户发出的请求，这样我们就莫名其妙被操作了。
预防：重要的地方加验证码，同源验证判断是否是同源下发出的请求。

SQL 注入

DNS 劫持使得访问到的不是预期的ip。

DDOS 分布式拒绝服务
服务器承受不了这么大的访问量，就会崩溃，扩容，同一个ip的大量访问的给封了。




### promise 