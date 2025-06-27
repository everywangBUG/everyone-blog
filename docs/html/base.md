## html

### 什么是HTML?

+ HTML(HyperText Mark Language，超文本标记语言)是一种用来告知浏览器如何组织页面的标记语言。

### HTML剖析

+ `<!DOCTYPE html>` :申明文档类型
+ `<html></html>`: [`html`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/html) 元素。这个元素包裹了页面中所有的内容，有时被称为根元素。

+ `<head></head>`: [`head`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head) 元素。这个元素是一个容器，它包含了所有你想包含在 HTML 页面中但**不在 HTML 页面中显示**的内容。
+ `<meta charset="uft-8">` : <meta>元素，**用来描述网页文档的属性**。
  + `charset` ，用来描述HTML文档的编码类型：`<meta charset="UTF-8" >` 
  + `keywords`，页面关键词：`<meta name="keywords" content="关键词" />`
  + `description`，页面描述：`<meta name="description" content="页面描述内容" />`
  + `refresh`，页面重定向和刷新：`<meta http-equiv="refresh" content="0;url=" />`
  + `viewport`，适配移动端，可以控制视口的大小和比例：`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">` 
    + `width viewport`：宽度(数值/device-width)
    + `height viewport` ：高度(数值/device-height)
    + `initial-scale` ：初始缩放比例
    + `maximum-scale` ：最大缩放比例
    + `minimum-scale` ：最小缩放比例
    + `user-scalable` ：是否允许用户缩放(yes/no）
  + 搜索引擎索引方式：`<meta name="robots" content="index,follow" />`
    + `all`：文件将被检索，且页面上的链接可以被查询；
    + `none`：文件将不被检索，且页面上的链接不可以被查询；
    + `index`：文件将被检索；
    + `follow`：页面上的链接可以被查询；
    + `noindex`：文件将不被检索；
    + `nofollow`：页面上的链接不可以被查询。
+ `<title></title>`: [`title`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/title) 元素。这设置了页面的标题，也就是出现在该页面加载的浏览器标签中的内容。

+ `<body></body>`: [`body`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body) 元素。包含了你访问页面时*所有*显示在页面上的内容，包含文本、图片、视频、游戏、可播放音频轨道等等。

### HTML中的特殊字符

| 原义字符 | 等价字符引用 |
| -------- | ------------ |
| <        | `&lt`        |
| >        | `&gt`        |
| "        | `&quot`      |
| "        | `&apos`      |
| &        | `&amp`       |

