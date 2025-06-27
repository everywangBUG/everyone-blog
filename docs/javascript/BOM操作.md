# BOM

### *BOM*

### BOM(Brower Object Model)

- **浏览器对象模型**
- 简称BOM，由浏览器提供的用于处理文档之外的所有内容的其他对象
- 比如navagator、location、history等对象

### JavaScript重要的运行环境：浏览器

- 而且浏览器本身又作为一个应用程序需要对其本身进行操作
- 所以通常浏览器会有对应的对象模型（BOM，Browser Object Model）
- 我们可以将BOM看成是连接JavaScript脚本与浏览器窗口的桥梁；

### BOM主要包含的对象模型

- window：包括全局属性、方法，控制浏览器窗口相关的属性、方法
- location：浏览器连接到的对象的位置（URL）
- history：操作浏览器的历史
- navigator：用户代理（浏览器）的状态和标识（很少用到）
- screen：屏幕窗口信息（很少用到）

### 运行环境(规范为globalThis)

### 对于浏览器：window

### 对于Node: global

### Loacation对象

### location的属性

1. href: 当前window对应的超链接URL, 整个URL；
2. protocol: 当前的协议；
3. host: 主机地址；
4. hostname: 主机地址(不带端口)；
5. port: 端口；
6. pathname: 路径；
7. search: 查询字符串；
8. hash: 哈希值；

### URLsearchParmas

1. get：获取搜索参数值
2. set：设置一个搜索参数值
3. append：追加一个搜索参数值
4. has：判断是否有某个搜索参数值
- 中文会使用**encodeURIComponent**和**decodeURIComponent**进行编码和解码、

### location对象常见的方法

1. assign：赋值一个新的URL，并且跳转到该URL中；
2. replace：打开一个新的URL，并且跳转到该URL中（不同的是不会在浏览记录中留下之前的记录）；
3. reload：重新加载页面，可以传入一个Boolean类型；

### history常见的属性和方法

### 属性

length：会话中的记录条数

state：当前保留的状态值

### 五个方法

- back()：返回上一页，等价于history.go(-1)
- forward()：前进下一页，等价于history.go(1)
- go()：加载历史中的某一页 go(1/2)后退/前进几步
- pushState()：打开一个指定的地址
- replaceState()：打开一个新的地址，并且使用repalce

### navigation对象的使用(较少使用)

### JSON

### JSON的基本语法

### 三种类型的值

- **简单值**：数字（Number）、字符串（String，不支持单引号）、布尔类型（Boolean）、null类型
- **对象值**：由key、value组成，key是字符串类型，并且必须添加双引号，值可以是简单值、对象值、数组值
- **数组值**：数组的值可以是简单值、对象值、数组值

### XML(很少使用)

### Protobuf

未来有可能流行的格式，目前使用较少

### **JSON**对象包含两个方法

### parse() 方法

用于解析 JavaScript Object Notation (JSON)

```jsx
var obj = {
    name: "zhangsan",
    age: 19,
    friend: {
        name: "lisi"
    }
}

//1. replacer参数
var objStringify = JSON.stringify(obj, function (key, value) {
    if (key === "name") {
        return "wangwu"
    }
    return value
})
console.log(objStringify)

//2. space参数
var objJSONString = JSON.stringify(obj, null, 5)
console.log(objJSONString)
```

### stringify()方法

将对象/值转换为 JSON 字符串，除了这两个方法，JSON 这个对象本身并没有其他作用，也不能被调用或者作为构造函数调用。

```jsx
var obj = {
    name: "zhangsan",
    age: 19,
    friend: {
        name: "lisi"
    }
}

var objStringify = JSON.stringify(obj)
console.log(objStringify)

//使用parse的第二个参数，让age + 2
var newObj = JSON.parse(objStringify, function (key, value) {
    if (key === "age") {
        return value + 2
    }
    return value
})
console.log(newObj)
```

### tips

1. 不能出现N开头的字符
2. 不能出现undefined
3. 不能出现多余的符号
4. 双引号里不能出现明文的type(空格)符