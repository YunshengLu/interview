# 使用webpack的目的
 1. npm的组件在浏览器端的js代码中，并不能直接引入 ，使用webpack快速复用优秀成熟的组件
 2. 解析jsx和vux的语法

 webpack与构建发展史
    为什么需要构建工具
    1. 转换ES6语法
    2. 转换 JSX
    3. css 前缀补全/预处理器
    4. 压缩混淆
    5. 图片压缩

    文件webpack.config.js

    配置组成
     module.exports = {
         entry:'./src/index.js',    1. 打包的入口文件
         output: './xx/main.js'     2. 打包的输出
         mode: 'production'         3. 环境
         module:{
             rules:[
                 {text/\.text$/,use:'raw-loader'}  4. Loader配置
             ]
         },
         plugins: [
             new HtmlwebpackPlugin({
                 template: './src/index.html'   5. 插件配置
             })
         ]
     }

     使用webpack；
     1. 初始化webpack npm init -y 
     2. npm install webpack webpack-cli --save-dev

     webpack初体验
     创建webpack.config.js文件
     设置打包入口文件和出口文件
     const path = require('path')
```js 
        module.exports = {
            entry: './src/index.js',
            output: {
                path: path.join(__dirname,'dist'),
                filename: 'bundle.js'
            },
            mode: 'production' 
        }
```
     运行方式:
     1. ./node_modules/.bin/webpack
     2. 在package.json中配置 
     "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"  ==》这一句
  },   然后运行 npm run dev

## entry (入口文件)
    模块之间有相互依赖 依赖图的入口就是entry
    单入口文件： entry 是一个字符串
    module.exports = {
        entry: './path/to/my/entry/file.js'
    }
    多入口文件: entry 是一个对象
    module.exports = {
        entry: {
            app: './src/app.js',
            adminApp: './src/adminApp.js'
        }
    }
## output (打包出口文件)
    Output的用法：多入口配置 
    module.exports = {
        entry: {
            app: './src/app.js',
            search: './src/search.js'
        },
        output: {
            filename: '[name].js',          ===> 通过占位符来确保文件的唯一性
            path:__dirname + '/dist'
        }
    }
## loader 
webpack 只支持js和json两种文件类型，通过loader去支持其他文件类型并且把他们转化成有效的模块，并且可以添加到依赖图中。
本身是一个函数，接受源文件作为参数，返回转换的结果
常见的loader:
  bable-loader  转换ES6 ES7 等js新特性语法
  css-loader 支持.css文件的加载和解析
  less-loader 将less文件转换成css
  ts-loader 将ts转换成js
  file-loader 进行图片字体等的打包
  raw-loader 将文件以字符串的形式导入
  thread-loader 多进程打包js和css
  使用:
  module: {
      rules:[
          {test:/\/txt$/,use: 'raw-loader'}   ===> test 指定匹配规则  use 指定使用的loader名称
      ]
  }

  ## Plugin 
    插件用于bundle 文件的优化，资源管理和环境变量注入
    作用于整个构建过程
    常见的plugins:
    CommonsChunkPlugin 将chunks相同的模块代码提取成公共js
    cleanWebpackPlugin 清理构建目录
    ExtractTextWebpackPlugin 将css从bundle 文件里提取成一个独立的css文件
    copyWebpackPlugin 将文件或者文件夹拷贝到构建的输出目录
    HtmlWebpackPluin  创建html文件去承载输出的bundle
    UglifyjsWebackPlugin 压缩js
    ZipwebpackPlugin  将打包出的资源生成一个zip包
    module.exports = {
        output: {
            filename: 'bundle.js'
        },
        plugins: [
            new HtmlWebpackPlugin({template:'./src/index.html'})   ==> 放到plugin数组里
        ]
    }

  ## mode
  mode用来指定当前的构建环境是： production,development 还是none
  设置mode可以使用webpack内置的函数，默认值为production
  开启不同的环境会默认帮你打开不同的插件配置

  ## 解析ES6
  使用bable-loader
  rules:[{text:/\.js$/,use:'babel-loader'}]
  增加ES6的babel preset配置
  {
      "presets":[
          "@babel/preset-env"   ==>增加es6 的babel preset配置
      ],
      "plugins":[
          "@babel/proposal-class-properties"
      ]
  }
  解析es6需要安装 npm i @babel/core @babel/preset-env babel-loader -D
  创建.babelrc 然后设置属性:
  {
    "presets":[
        "@babel/preset-env"
    ]
}

   解析 React JSX
   下载相应的react和babel npm i react react-dom @babel/preset-react -D
   然后创建响应的react文件
   ```js
   'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
class Search extends React.Component {
    render() {
        return <div>Search Text</div>
    }
}
ReactDOM.render(
    <Search/>,
    document.getElementById('root')
);
   ```

   ## 解析css
   css-loader 用于加载.css文件，并且转换成commonjs对象
   style-loader  将样式通过<style>便签插入到head中 使css代码能生效
   安装 npm i style-loader css-loader -D
    css的调用是链式调用 从右到左的 
```js
    {
        test:/.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    }
```    
     所有我们先调用css-loader去解析css 然后将解析好的css传递给style-loader
     解析less 和sass
     安装 npm i less less-loader -D
      use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
            ]

##  解析图片字体
    安装 npm i file-loader -D
    {
                test: /.(png|jpg|gif|jpeg)$/,
                use: 'file-loader'
    }
    解析字体：
    {
        test: /.(woff|woff2|eot|ttf|otf),
        use:'file-loader'
    }

    使用 url-loader 
    url-loader 也可以处理图片和字体 可以设置较小资源自动base64 (解压到js文件中，然后减少http的请求次数，优化页面的加载性能)

    webpack 中的文件监听
    文件监听是在发现源码发生变化时，自动重新构建出新的输出文件

    webpack 开启监听模式，有两种方式：
    1. 启动webpack 命令时，带上--watch 参数
```js
      "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch"
  },
  npm run watch
```
    2.在配置webpack.config.js中设置watch:true (唯一的缺点，每次都需要手动刷新浏览器)
    
    原理 轮询判断文件的最后编辑时间是否变化
    某个文件发生了变化，并不会立刻告诉监听这个，而是先缓存起来，等 aggregateTimrout

    module.export={
        // 默认false,也就是不开启
        watch:true
        // 只有开启监听模式时，watchOptions才有意义
        watchOptions: {
            //默认为空，不监听的文件或者文件夹，支持正则匹配
            ignore: /node_modules/,
            // 监听到变化后会等300ms再去执行，默认300ms
            aggregateTimeout:300,
            // 判断文件是否发生变化时通过不停询问系统指定文件有没有变化实现，默认每秒1000次
            poll:1000
        }
    }


 模块热替换（HMR - Hot Module Replacement）是 webpack 提供的最有用的功能之一。它允许在运行时替换，添加，删除各种模块，而无需进行完全刷新重新加载整个页面，其思路主要有以下几个方面
   webpacp热更新
   webpack-dev-server
   WDS 不刷新浏览器
   WDS 不输出文件，而是放在内存中
   使用HotModuleReplacementPlugin插件
    热更新的原理分析：
    webpack compile: 将js编译成Bundle
    HMR server: 将热更新的文件输出给HMR Runtime
    Bundle server:提供文件在浏览器的访问
    HMR Runtime: 会被注入到浏览器，更新文件的变化
    bundle.js:构建输出的文件
   （待续）

## 什么是文件指纹？
       打包后输出的文件名的后缀
       作用：做版本的管理，当我们项目要发布的时候，有些文件修改了有些文件没有修改，我们只需要把我们修改的文件发布上去。

       文件指纹如何生成
       Hash：和整个项目的构建相关，只要项目文件修改，整个项目构建的hash值就会更改
       chunkhash: 和 webpack 打包的chunk 有关，不同的entry 会生成不同的chunkhash值 （不能用来更新css可能会导致也页面样式没有发布上去）
       contentthash: 根据文件内容来定义hash,文件内容不变，则contenthash不变
       js文件的指纹设置
       设置 output 的filename,使用[chunkhash]
       output:{
           filename:'[name][chunkhash:8].js',
           path:__dirname + '/dist'
       }
       css的文件指纹
       设置MiniCssExtractPlugin 的filename,
       使用 [contenthash]
       plugins:[
           new MiniCssExtractPlugin({
               filename: `[name][contenthash:8].css`
           })
       ]
       图片的文件指纹设置
       设置file-loader的name,使用[hash]
       {
           test: /\.(png|svg|jpg|gif)$/,
           use:[{
               loader: 'file-loader',
               options: {
                   name: 'img/[name][hash:8].[ext]'
               }
           }]
       }

       js文件的压缩
       内置了uglifyjs-webpack-plugin
       css文件的压缩
       使用 optimize-css-assets-webpack-plugin
       安装 npm i optimize-css-assets-webpack-plugin -D
       同时使用cssnano
       plugins: [
           new OptimizeCSSAssetsPlugin({
               assetNameRegExp:/\.css$/g,
               cssProcessor:require('cssnano')
           })
       ]
       HTML文件的压缩
       修改html-webpack-plugin,设置压缩参数 （压缩空格换行符）
       new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        filename: 'index.html',
        chunks: ['index'],
        inject: true,
        minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
        }
    }),
    安装npm i html-webpack-plugin -D

## 当前构建时的问题（自动删除清理目录）
  每次构建的时候不会清理目录，造成构建的输出目录output文件越来越多 
  安装 npm i clean-webpack-plugin -D
  const { CleanWebpackPlugin }  = require('clean-webpack-plugin') 
  new CleanWebpackPlugin()

## css3前缀问题（自动补全各个浏览器的前缀 -webkit-  -moz- -o-等等）
使用 autoprefixer 插件
安装 npm i postcss-loader autoprefixer -D
 {
                test:/.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options:{
                            plugins: ()=>{
                                require('autoprefixer')({
                                    browsers: ['last 2 version','>1%','ios 7']
                                })
                            }
                        }
                    }
                ]
            },
            

            浏览器的分辨率
            css媒体查询实现响应式布局（缺陷需要写多套适配样式代码）
            rem 相对单位 根节点的font-size 
            使用px2rem-loader 自动转换成rem （移动端csspx自动转换成rem）
            但是我们需要动态去计算页面打开时根节点的font0-size 可以使用（lib-flexible）
            npm i px2rem-loader -D
            npm i lib-flexible -S
            {
                loader: 'px2rem-loader',
                options: {
                    remUnit: 75,
                    remPrecesion: 8
                }
            }

## 资源内联
代码层面： 页面框架的初始化脚本   上报相关打点  css内联避免页面闪动
请求层面： 减少HTTP网络请求数 小图片或者字体内联
css内联
方案一： 借助style-loader
方案二： html-inline-css-webpack-plugin
安装 npm i row-loader@0.5.1 -D
   meta

## 多页面应用（MPA）概念
每一次页面跳转的时候，后台服务器都会给返回一个新的html文档，这种类型的网站也就是多页网站，也叫多页应用
利用glob.sync  动态的而获取entry入口文件

## webpack 启动过程分析
查找webpack入口文件
在命令行运行以上命令后（npm run dev/npm run build）npm会让命令行工具进入node_modules\.bin目录查找是否存在webpack.sh
或者webpack.cmd文件，如果存在，就执行，不存在，就抛出错误
实际的入口文件是：node_modules\webpack\bin\webpack.js

## 手写loader
loader 只是一个导出为函数的javaScript模块  
module.exports = function(source) {
    return source;
}
多个loader 串行执行
顺序从后往前
compose = (f,g)=>(...args)=>f(g(...args))
a-loader.js
module.exports = function(source) {
    console.log('loader a is executed')
    return source
}
b-loader.js
module.exports = function (source) {
    console.log('loader b is executed');
    return source;
}
 调试loader
定义： loader-runner 允许你在不安装webpack的情况下运行loader

作用： 作为webpack 的依赖，webpack 中使用它执行loader 进行loader的开发和调试


开发一个自动合成雪碧图的loader
如何将两张图片合成一张图片？ 使用spritesmith 
spritesmith 使用实例
const sprites = ['./images/1.jpg','./images/2.jpg'];

Spritesmith.run({src: sprites},function handleResult(err,result){
    result.image;
    result.coordintes;
    result.properties;
})

## 插件的基本结构 
class MyPlugin{                                ==> 插件名称
    apply(complier){                           ==> 插件上的apply方法
        compiler.hooks.done.tap('My Plugin',(  ==> 插件的hooks
            stats /* stats is passed as argument when done hook is tapped
        )=>{
            console.log('hello world')         ==> 插件的处理逻辑
        })
    }
}
module.exports = MyPlugin;