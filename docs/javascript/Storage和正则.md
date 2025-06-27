# Storage和正则

### Storages

```jsx
//localStorage的基本逻辑
let token = localStorage.getItem("token")
let userName = localStorage.getItem("ueserName")
let passWord = localStorage.getItem("passWord")
if (!token || !userName || !passWord) {
    token = "tokenInfo"
    localStorage.setItem("token", token)
    userName = "zhangsan"
    localStorage.setItem("userName", userName)
    passWord = "123456"
    localStorage.setItem("passWord", passWord)
}
//后续的使用
console.log(token)
console.log(userName.length)
```

### Local Storage和Session Storage

- Local Storage：本地存储，提供的是一种永久性的存储方法，在关闭掉网页重新打开时，存储的内容依然保留
- Session Storage：会话存储，提供的是本次会话的存储，在关闭掉会话时，存储的内容会被清除

### 区别

- 验证一：关闭网页后重新打开，localStorage会保留，而sessionStorage会被删除；
- 验证二：在页面内实现跳转，localStorage会保留，sessionStorage也会保留；
- 验证三：在页面外实现跳转（打开新的网页），localStorage会保留，sessionStorage不会被保留

### 基本方法和属性

### 属性

- Storage.length：只读属性
    
    ✓ 返回一个整数，表示存储在Storage对象中的数据项数量
    

### 方法

 Storage.key(index)：该方法接受一个数值n作为参数，返回存储中的第n个key名称

 Storage.getItem()：该方法接受一个key作为参数，并且返回key对应的value

 Storage.setItem()：该方法接受一个key和value，并且将会把key和value添加到存储中

✓ 如果key存储，则更新其对应的值

 Storage.removeItem()：该方法接受一个key作为参数，并把该key从存储中删除

 Storage.clear()：该方法的作用是清空存储中的所有key

### *正则字符笔记*

- `//g`：全局匹配
- `//gi`: 全局匹配 + 忽略大小写
- `//i`：正则表达式的“i”是“in-casesensitive”的缩写，表示的是“区分大小写”的意思，是正则表达式中的修正符；在正则表达式中设定此修正符时，表示正则表达式进行匹配的字符将同时匹配大小写字母，语法为“/ 匹配条件 /i”。
- `//u:` 表示支持Unicode

### 常用元字符

- `\d`：匹配一个数字字符。等价于 [0-9] 语法：`new RegExp("\d")` 直接量语法：`/\d/` 大括号数字表示限制数位`/\d{shuzi}/`
- `\w`: 匹配任意不是字母，数字，下划线的字符（`[^0-9a-zA-Z_]`）
- `\s` 空白字符
- `\D` 数字字符以外的字符，必须要匹配一个字符
- `\W` 数字字母以外的字符，必须要匹配一个字符
- `\S` 空白符以外的字符
- `[^]` 表示任意字符，即对空集取反，得到全集，所以代表任意字符，包含回车

### 常用反义元字符

### 常用范围限定元字符

- `abc`
- `[abc]` 字符集，中括号只能匹配一个符号
- `[a-x]` 字符集范围
- `[^abc]` 字符集取反

### 常用重复限定元字符

- `?` **重复0次或1次**（n?匹配0个或1个n 的字符串）
- `+` **重复1次或n次**（n+匹配1个或n个n 的字符串）
- `*` **重复0次或n次**（n*匹配0个或n个n 的字符串）
- `{n}` **重复n次**
- `{n,}` **重复n次或更多次**（ 至少n次）
- `{n,m}` **重复n到m次**（{min, max}介于min次到max次之间）

### 分组

- `(foo|bar)`
- `(?:foo|bar)`
- `(?<name>baz|baa|baaba)`

### 常用前后选择元字符(零宽断言)

**零宽断言**：即两个字符之间的位置满足或不满足某种匹配条件

- `^` 匹配字符串开始位置
- `$` 匹配字符串结束位置
- `\b` 匹配单词边界，Sheep\b可以匹配CodeSheep末尾的Sheep，不能匹配CodeSheepCode中的Sheep
- `(?=xxx)` 正预测先行断言(positive lookahead): 位置的右边要匹配xxx
- `(?!xxx)` 负预测先行断言(negative lookahead): 位置的右边要不能匹配xxx
- `(?<=xxx)` 正回顾后发断言(positive lookbehead): 位置的左边要匹配xxx
- `(?<!xxx)` 负回顾后发断言(negative lookbehead): 位置的左边要不能匹配xxx

### tip

- 零宽断言的语法整体只匹配一个位置
- 零宽断言的括号不计入捕获分组
- 多个零宽断言连续使用时，断言的也是同一个位置

### summary

`\b`  等价于=>  `(?<!\w)(?=\w)|(?<=\w)(?!\w)`

`^`   等价于=>   `(?<!.) 或 (?<![^])`

`$`   等价于=>   `(?!.)`

### 其他

- `.` 代表除换行之外的任何字符
- `/.(.)\1/`后向引用，\1表示前面的第一个分组已经匹配到的具体内容在\1所在的位置出现

### exercises

- car and cat =>`/ca[tr]/`
- pop and prop =>`/pr?op/` r可出现可不出现
- ferret ferry and ferrari =>`/^ferr/`
- Any word ending in ious =>`\b.*ious\b 或 /ious$/`
- A whitespace character followed by a dot, comma, colon, or semicolon => /`s[. , : ; ]/ /s(.|,|:|;)/`
- A word longer than six letters => `/\b\w{7,}\b/`
- A word without the letter e =>`/\b[a-df-zA-DF-Z]\b/`
- A word without the letter ee =>`/\b(?!\w*ee)\w+/`