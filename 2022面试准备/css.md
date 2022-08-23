盒子模型：
盒子模型是什么？
当我们对一个文档进行布局的时候，浏览器会将一个个元素表示成一个个的盒子类型的模型，这个盒子由四部分组成：content(内容) padding(内边距) border(边框) margin(外边距)

标准盒模型和怪异盒模型的区别？
标准盒模型的宽度等于 border + padding + width +margin
怪异盒模型的宽度等于 width(它包含了 border 和 padding 和 本身内容的宽度) + margin
可以理解为怪异盒模型的宽度等于 标准盒模型 border 和 padding 和 本身内容的宽度

box-sizing 可以用来设置元素该以哪种盒模型展现。
box-sizing: content-box 标准盒模型
box-sizing: border-box 怪异盒模型
box-sizing: inherit 继承父元素的盒模型

css 选择器用哪些？优先级？那些属性？

选择器：
类选择器 .class
id 选择器 #id
标签选择器 div
后代选择器 #class div id 为 class 下的所有 div 元素
子选择器 .one>one_1 父元素为.one 的所有.one_1 的元素
相邻同胞选择器（.one+.two）选择紧接在.one 之后的所有.two 元素
群组选择器（div,p）,选择 div、p 的所有元素
伪类选择器
伪元素选择器
属性选择器

优先级：
简单说就是 !important 无穷大 >内联样式>id 选择器>类选择器>标签选择器
计算方式分为 ABCD 四类
A 类为内联样式有则为 1 ，没有则为 0
B 类则是计算出现的 id 选择器的总次数
C 类计算类选择器，属性选择器和伪类选择器的总次数
D 类标签选择器和伪元素选择器的总次数

```js
li                                  /* (0, 0, 0, 1) */
 ul li                               /* (0, 0, 0, 2) */
 ul ol+li                            /* (0, 0, 0, 3) */
 ul ol+li                            /* (0, 0, 0, 3) */
 h1 + *[REL=up]                      /* (0, 0, 1, 1) */
 ul ol li.red                        /* (0, 0, 1, 3) */
 li.red.level                        /* (0, 0, 2, 1) */
 a1.a2.a3.a4.a5.a6.a7.a8.a9.a10.a11  /* (0, 0, 11,0) */
 #x34y                               /* (0, 1, 0, 0) */
 li:first-child h2 .title            /* (0, 0, 2, 2) */
 #nav .selected > a:hover            /* (0, 1, 2, 1) */
 html body #nav .selected > a:hover  /* (0, 1, 2, 3) */
```

比较从左往右比较，较大的获胜，相等往下比，最后全部相等，在后面的回覆盖前面的。

继承的属性：
字体系列属性

    无继承的属性
    display
    文本属性：vertical-align、text-decoration
    盒子模型的属性：宽度、高度、内外边距、边框等
    背景属性：背景图片、颜色、位置等
    定位属性：浮动、清除浮动、定位position等
    生成内容属性：content、counter-reset、counter-increment
    轮廓样式属性：outline-style、outline-width、outline-color、outline

    em / px / rem / vh / vw 的区别
    px 可认为是绝对长度也可认为是相对长度，像素可以理解为，我们设备上的画面是由一个一个的像素点组成的，每个像素点大小都是等同的。但是在移动端有不同的设备像素比导致这个像素大小是不确定的，在不同的设备px可能展示的是不同的距离。
    em 是相对长度单位，继承父元素的字体大小，默认字体大小为16px=1em
    rem 相对单位，相对的是HTML根元素的字体大小，默认字体大小为16px=1em，两者区别一个是相对根元素，一个是继承父元素。
    vh、vw 相对元素，相对的窗口大小（浏览器的可视区域或者移动端的布局视口），将窗口大小分为100份。
    % 百分比则是相对父元素的比宽，在不同的布局下定位不同，正常情况是相对父元素，position:fixed则是相对于Viewport（可视区域）

    在不同的设备或不同的环境中，css中所代表的1px所表达的物理像素是不同的。
    px是一个相对单位，相对的是设备像素(device pixel)
    一般情况下页面缩放比为1，1个css像素等于一个设备独立像素
    css两个相对性：
    1. 在同设备情况下，更改分辨率，相对的css像素所代表的设备像素是可以变化的。
    2. 不同设备情况下，不同的手机型号相对的css像素也随设备像素而变化

    随两个数值改变（每英寸像素PPI，设备像素比DPR）

    设备像素device pixels ,物理像素，无标准宽高，是设备用来控制显示的最小单位。

    DPR 设备像素比，widonw.devicePixelRatio来获取，这个值越高说明一个独立设备像素里面包含的物理像素点越多，屏幕看起来就越清晰。

    css，隐藏页面的方式和区别？
    1. display: none
    元素直接在页面消失，不占据空间，会触发重绘和重排，绑定的相关事件不能触发。
    2. visbility:hidden
    元素直接在页面消失，占据空间，不会触发重排，会触发重绘，绑定的相关事件不能触发
    3. opacity:0
    表示透明度，元素不可见，占据空间，不会触发重排，会触发重绘，绑定的相关的事件能触发
    4. width,height 设置为0.
    整个盒子模型宽高设置为0，如果有子元素，再加上overflow:hidden.
    不占据空间绑定的相关事件不能触发
    5. position:absolute z-index:-10
    移除可视区域或者被其他高层盖住，不影响页面布局
    6. clip-path
    clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px);

    BFC的理解
    BFC (block formatting content)快级格式上下文，用来表示元素对其内容如何定位，和与其他元素的关系和相互作用。
    内部的字元素不受外部元素的影响形成一个独立的封闭空间。
    主要应用于父元素塌陷，清楚浮动，margin重叠，两栏布局。
    触发条件：
    overflow: 不为visility   ,auto hidden scroll
    position:absolute fixed
    display: inline-block .flex ......
    浮动元素

    元素水平垂直居中
    1. 父元素设置position: relative 子元素设置position:absolute margin:auto left right top bottom 为 0
    2. 父元素设置为positon :relative 子元素设置 position:absolute  top :50% left :50%
    再相对自己的宽高移动百分之50 ，translate:transfrom(-50%,-50%)
    3. 父元素设置为display:table-cell , vertical-align:middle text-align:center，子元素设置display: inline-block
    4. 父元素设置为display：flex justifly-content:center, align-item;center
    5. 父元素设置为display：grid justifly-content:center, align-item;center

    双栏布局
    1. 父元素设置BFC overflow:hidden 左边元素浮动设置固定宽度，右边元素margin 出左边元素的宽度
    2. 父元素设置display： flex ,左元素固定宽度，右元素flex ：1
    三栏布局
    1. 左右两边元素设置浮动，中间margin一下
    2. 左右两边position: absolute, 中间margin一下
    3. 父元素设置 display:flex; justify-content:space-between; 左右两边固定宽度，中间宽度设置百分百

    flex 布局
    主要分为容器属性和容器成员属性（一种针对的是整个父元素，一个针对的是整个容器内的单个子元素）
    容器属性：
    flex-wrap: nowrap wrap
    flex-direction: row  column
    flex-flow: flex-wrap || flex-dircetion (上面两个属性的集合)
    justify-content: center space-between flex-start flex-end space-around
    align-item: center flex-start flex-end baseline stretch
    align-content: center space-between flex-start flex-end space-around
    容器成员属性：
    order 排列顺序越小越靠前默认0
    flex-grow 放大比例
    flex-shrink 缩小比例 为0是不变其他按比例缩小
    flex-basis 项目在主轴上占据的初始尺寸
    flex: order flex-grow flex-shrink 三者的和
    align-self: 单个项目的对其方式，可覆盖align-item 属性

    grid 布局
     二维布局，只能定义到容器的顶层子元素

    CSS3 新增了那些属性
    边框
     border-radius
     box-shadow: 10px 10px 5px 10px #888888; 水平阴影位置 垂直阴影位置 模糊距离 阴影大小 颜色
     border-image
    背景
    background-clip:border-box padding-box content-box 背景从那一块开始显示
    background-origin:border-box padding-box content-box 从那里对齐
    background-size: cover centent
    文字
    word-wrap: 是否允许单词文字换行
    text-overflow: 修剪文本超出打点
    transition  transfrom animation flex

    css动画元素从一种形式过度到另外一种形式
    实现方式: transtion  animation transform
    transtion 通过一个动作来触发，比如hover active等
    主要有四个属性:
    property （要渐变的css属性比如height ,width等）不是所有属性都能使用过渡
    duration 完成过度所需要的时间
    timing-fuction 完成效果的速度曲线 linear ease ....
    delay 动画延迟多久触发
    transform 可以通过transtion来一起使用，transtion-property:transform;（只能作用于块级元素）
    roate 旋转
    translate 移动
    scale 放大
    skew 倾斜
    animation 不需要动作来触发 @keyframse
    animation-name 定义要播放的动画名称
    animation-duration 播放动画一个周期的时间
    animation-timing-fuction 播放动画的速率
    animation-delay 动画延迟时间
    animation-iteration-count 播放次数
    animation-fill-mode 动画填充模式
    animation-play-state 动画播放状态暂停或者运行

    回流和重绘
    回流: 重新计算页面内的盒子的大小和位置，然后进行绘制
    重绘: 页面内的盒子大小和位置已经计算好，浏览器根据每个盒子的特性进行绘制颜色等绘制

    浏览器渲染机制：
    1. 解析 HTML 生成DOM树，解析CSS生成CSSOM树
    2. 将DOM树和CSSOM树结合生成渲染树（render tree）
    3. layout 回流：根据生成的渲染树，进行回流（layout）,得到节点的几何信息（位置，大小）
    4. painting 重绘 根据渲染树和回流得到的几何信息，计算得到节点的绝对像素
    5. 将像素发送给GPU，展示到页面上
     页面渲染初始渲染（从空白页面开始渲染）一定会触发回流和重绘
     我们对dom元素进行修改，修改了几何，比如尺寸和位置等会触发回流，浏览器对几何元素重新计算，在去重绘展示
     我们对dom如果只修改了颜色，不改变几何属性，只需要进行重绘不需要回流

    回流触发： 添加删除dom  修改尺寸  修改位置   内容发生变化，比如文本或者图片被替换  浏览器窗口发生改变
    重绘：颜色修改  阴影修改 文本方向修改(writing-mode)
    减少回流：多使用fixed absolute 使脱离文档流避免造成对其他元素的影响 多使用transform opacity  避免使用table   避免多项使用内联样式

    响应式布局
    能够同时适配PC 手机 平板等多端
    实现方式：
    首先必须声明<meta name="viewport">
    1. 媒体查询
    2. 百分比
    3. vw/vh
    4. rem
    媒体查询
    @media screen and(max-width:1920px){...}
    @media screen (min-width: 240px) and (max-width:480px){....}这个区间内的样式
    百分比 大部分是相对父元素
    vw/vh 相对的是视窗口
    rem 相对的是根元素的字体大小

    css 提高性能的方法
     首屏内联关键css: 打开一个页面，页面首屏的渲染速度非常影响用户的体验，通过内联css的关键代码能够使浏览器在下载玩HTML 后就能立刻渲染完，如果使用引入外部css代码，在解析HTML结构的过程中遇到外部css文件，才会开始下载css文件，在渲染，使用内联直接是这个渲染时间提前，
     但是如果css代码过大不适合内联，不美观不适合维护，而且也不能缓存，每次请求都需要重新渲染，增加服务器负荷。
     异步加载css: css 文件请求下载加载之前会阻塞页面的渲染，我们可以将加载css的代码写在head标签之后或者<link media="noexist" onload="this.media='all'"/>或者<link rel="alternate stylesheet" onload="this.rel='stylesheet'"/>
     资源压缩：
     使用webpack等模块化工具对css代码压缩，是文件变小，降低加载时间
     合理使用选择器： 避免过多层级嵌套，使用id选择器没必要在嵌套（这些都能必要css匹配元素花费过多的时间）
     减少使用昂贵的属性：shadow radius 透明度 会降低浏览器的渲染性能
     不要使用@import ： 会影响浏览器的并行下载，如果是嵌套引用可能会导致加载出错
     减少重排 很多属性可以继承避免过多重复属性 雪碧图 动画或者过度尽量使用opacity transform

     单行文本溢出：overflow:hidden white-space:nowrap text-overflow:ellipsis
     多行文本溢出：
     1. 使用伪元素
     .demo{position:relative ; height:40px;line-height:20px;width:300px}
     .demo::after{position:absolute; content:"..."bottom:0;right:0;}
     2. 基于行数截断
     p{overflow:hiddern; line-clamp:2;text-overflow:ellipsis;display:-webkit-box;-webkit-box-origin:vertical}
     3. js+css通过 获取文本高度然后用你每行的高度乘你想设置的行数比较两个大小然后在给他们加上相应的css样式或者添加不同的类名

      使用css实现视差滚动效果
    1. 使用background-attachment:fixed;固定背景图片不让他们随页面滚动，然后其他则遮盖的图层随页面滚动

    css画三角形
     使用border,border-style:solid; width:0;height:0;border-width:0 20px 20px;border-color:transparent transparent red;
     使用伪类再画一个三角形覆盖
     使用旋转平移
     支持字体小于12px 使用zoom缩小  使用transform:scale(0.8)

     css 预处理器
     css容易写出大量重复不利于维护和扩展的代码。
     css预处理语言（sass less stylus）
     补充css语言，增加诸如变量，混合函数等功能，让css更容易维护，本质上预处理是css的超集。
     包含一套自定义的语法和解析器，根据这些语法定义自己的样式规则，最终会通过解析器编译生成对应的css的文件。
     特性：
     嵌套 三者语法一致都是用 & 引用父级选择器。sass和stylus 可以省略大括号。
     变量 less 通过@来申明变量@red:#c00;  sass 通过$来申明变量$red:#c00;  stylus 直接red=#c00
     作用域  sass 中没有全局作用域的概念，后面定义的会覆盖前面的，less和stylus会先从局部作用域在去往外面查找变量
     混入  将公共的部分抽出来，定义为一个单独的模块，被很多选择器使用
