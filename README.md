# wapApp

## 技术选型

[BootCDN 静态资源库地址](http://www.bootcdn.cn)

#### 1. [angularjs]() 
#### 2. [jquery](http://www.bootcdn.cn/jquery/)
#### 3. [fastclick](https://github.com/ftlabs/fastclick)
#### 4. swiper
#### 5. 构建工具 gulp
#### 6. 适配方案 flexible
#### 7. 媒体查询 @media screen and (max-wdith:xxx px)

## 开发规范

__本项目只是罗列了其中一部分，详细请阅读以下开发规范__

[前端开发规范手册](http://zhibimo.com/read/Ashu/front-end-style-guide/index.html)

__无线web开发文档，值得学习__

[支付宝移动Web解决方案](http://am-team.github.io/amg/dev-exp-doc.html)

#### HEAD 模版
 
```
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!--禁止电话，邮件识别-->
	<meta content="telephone=no,email=no" name="format-detection">
    <meta name="description" content="助家生活">
    <meta name="keywords" content="助家生活">
    <meta name="author" content="zxh">
    <!-- 为移动设备添加 viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Style Guide</title>
    <!-- iOS 图标 -->
    <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-57x57-precomposed.png">
    <link rel="shortcut icon" href="path/to/favicon.ico">

</head>

``` 

## CSS组件开发注释规范

```
/* ==========================================================================
   组件块
 ============================================================================ */

/* 子组件块
 ============================================================================ */
.selector {
  padding: 15px;
  margin-bottom: 15px;
}



/* 子组件块
 ============================================================================ */
.selector-secondary {
  display: block; /* 注释*/
}

.selector-three {
  display: span;
}
```

### CSS组件命名规范

Components 最少以两个单词命名，通过 - 分离，例如：

* 点赞按钮 (.like-button)
* 搜索框 (.search-form)
* 文章卡片 (.article-card)
* 与样式库一起开发的时候，自定义样式请带上前缀 zj-

## JS 函数/方法注释规范

* 函数/方法注释必须包含函数说明，有参数和返回值时必须使用注释标识。；
* 参数和返回值注释必须包含类型信息和说明；
* 当函数是内部函数，外部不可访问时，可以使用 @inner 标识；

```
/**
 * 函数描述
 *
 * @param {string} p1 参数1的说明
 * @param {string} p2 参数2的说明，比较长
 *     那就换行了.
 * @param {number=} p3 参数3的说明（可选）
 * @return {Object} 返回值描述
 */
function foo(p1, p2, p3) {
    var p3 = p3 || 10;
    return {
        p1: p1,
        p2: p2,
        p3: p3
    };
}

```

### JS 命名规范

__变量,使用 Camel 命名法__

var loadingModules = {};

__私有属性、变量和方法以下划线 _ 开头__

var _privateMethod = {};

__常量, 使用全部字母大写，单词间下划线分隔的命名方式__

var HTML_ENTITY = {};

__类名驼峰，并且首字母要大写__

var CamelName = {};

## jQuery 规范

### 使用严格模式开发

```
 "use strict";
```

### 为提高代码执行效率，为二者兼容提供可能，在使用 jQuery / Zepto.js 时做以下约定：

##### 1.存放 jQuery / Zepto 对象的变量以 $ 开头；
##### 2.禁止使用 slideUp/Down() fadeIn/fadeOut() 等方法；
##### 3.尽量不使用 animate() 方法；
##### 4.使用和 Zepto.js 兼容的基本选择符，不使用效率较低且与 Zepto.js 不兼容的选择符。

### jQuery 变量

##### 1.存放 jQuery 对象的变量以 $ 开头；
##### 2.将 jQuery 选择器返回的对象缓存到本地变量中复用；
##### 3.使用驼峰命名变量；

```
var $myDiv = $("#myDiv");

$myDiv.click(function(){...});

```

### 选择器

##### 1.尽可能的使用 ID 选择器，因为它会调用浏览器原生方法 document.getElementById 查找元素。当然直接使用原生 document.getElementById 方法性能会更好；
##### 2.在父元素中选择子元素使用 .find() 方法性能会更好, 因为 ID 选择器没有使用到 Sizzle 选择器引擎来查找元素；

```
// Not recommended

var $productIds = $("#products .class");

// Recommended

var $productIds = $("#products").find(".class");

```


## 静态资源

```
<link href="//cdn.bootcss.com/Swiper/3.3.1/css/swiper.min.css" rel="stylesheet">
<script src="//cdn.bootcss.com/jquery/2.2.3/jquery.min.js"></script>
<script src="//cdn.bootcss.com/vue/1.0.24/vue.min.js"></script>
<script src="//cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
<script src="//cdn.bootcss.com/Swiper/3.3.1/js/swiper.min.js"></script>
<script src="//cdn.bootcss.com/vue/2.0.0-rc.3/vue.min.js"></script>


```

## 移动端适配方案

[flexible适配方案](http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)

#### 1.引入文件 

```
<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>

```
##### 采用flexible适配方案的HEAD

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<!--禁止电话，邮件识别-->
    <meta content="telephone=no,email=no" name="format-detection">
    <meta name="description" content="助家生活">
    <meta name="keywords" content="助家生活">
    <meta name="author" content="zxh">
	<title>模版测试</title>
	
	<!-- link和script的引用后缀要加上min -->
	<link type="text/css" rel="stylesheet" href="css/test.min.css">
	<link href="//cdn.bootcss.com/Swiper/3.3.1/css/swiper.min.css" rel="stylesheet">
</head>

```

#### 2.根据设计稿px转换为rem

* iphone 5 (640x1136) rem = px / 64
* iphone 6 (750x1334) rem = px / 75

## 组件使用案例


## 如何安装运行项目

### 1. 依赖，请自行安装node、npm、git、gulp。如果不会请自行百度。

### 2. 进入wapApp目录，输入如下命令

```bash
	npm install  

```

### 3. 进入wapApp目录，输入如下命令

```bash
	gulp -ws

```

### 4. 每次提交的时候，输入如下命令-清理文件夹

```bash
	gulp clean

```

### 5.安装异常处理

```
Error: Cannot find module 'autoprefixer'.....

```
请重新安装gulp-autoprefixer插件，解决方案如下

```
npm install gulp-autoprefixer --save-dev
```

## 压力测试工具

[超实用压力测试工具－ab工具](http://www.jianshu.com/p/43d04d8baaf7)

##  学习资源

### vue

## 插件资源

####ng无限滚动插件
[ng-infinite-scroll](http://sroze.github.io/ngInfiniteScroll/)


## 主分支&副分支


