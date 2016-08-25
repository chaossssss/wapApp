# wapApp

## 技术选型
#### 1. vue
#### 2. jquery
#### 3. fastclick
#### 4. swiper
#### 5. 构建工具 gulp
#### 6. 适配方案 flexile

## 开发规范

__本项目只是罗列了其中一部分，详细请阅读以下开发规范__

[前端开发规范手册](http://zhibimo.com/read/Ashu/front-end-style-guide/index.html)

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

## jQuery 规范

####jQuery 变量

##### 1.存放 jQuery 对象的变量以 $ 开头；
##### 2.将 jQuery 选择器返回的对象缓存到本地变量中复用；
##### 3.使用驼峰命名变量；

```
var $myDiv = $("#myDiv");

$myDiv.click(function(){...});
```

#### 选择器

##### 1.尽可能的使用 ID 选择器，因为它会调用浏览器原生方法 document.getElementById 查找元素。当然直接使用原生 document.getElementById 方法性能会更好；
##### 2.在父元素中选择子元素使用 .find() 方法性能会更好, 因为 ID 选择器没有使用到 Sizzle 选择器引擎来查找元素；

```
// Not recommended

var $productIds = $("#products .class");

// Recommended

var $productIds = $("#products").find(".class");
```



## 使用案例



## 组件使用案例

