## TS类型
### 元组tuple类型
+ 元组数据类型中可以放不同的数据

```typescript
const info: [string, number, number] = [ 'zhangsan', 18, 18 ]
```

+ `useState`案例，使用元组类型约束函数返回值的类型

```typescript
function useState(initialVal: number): [number, (newVal: number) => void] {
  let stateVal = initialVal
  function setValue(newVal: number) {
    stateVal = newVal
	}
  return [stateVal, setValue]
}
const [count, setCount] = useState(10)
setCount(100)
```

```typescript
function useState<T>(initailVal: T): [T, (newVal: T) => void] {
  let state = initailVal
	function setState(newVal: T) {
  	state = newVal
  }
	return [state, setState]
}
const [count, setCount] = useState(100)
const [message, setMessage] = useState('Hello World!']
setCount('1111') // 编译阶段报错
```

### void函数类型
```typescript
type FooType = () => void

export const foo: FooType = () => {
  console.log('this is function void type')
}
```

+ 可以指定返回值为undefined

```typescript
type FooUndefinedType = () => undefined
export const baz: FooUndefinedType = () => {
  return undefined
}
```

+ 函数返回值传参

```typescript
type Exectype = (...arg: any[]) => void
export const delayExecFn = (fn: Exectype) => {
  setTimeout(() => {
    fn('zhangsan', 18, 19)
  }, 1000)
}
```

### unkown类型
```typescript
// unknown类型，所有操作都不可用，和any相反
const unkownExec1 = () => {
  return 'foo'
}
const unkownExec2 = () => {
  return 123
}
export const unknowUse = () => {
  let res: unknown
  const flag = true
  // 函数返回时接下来的类型不确定，使用unkown类型进行约束
  flag ? res = unkownExec1() : res = unkownExec2()
  // unkown进行类型缩小可以使用
  if (typeof res === 'string') {
    console.log(res.length)
    console.log(res.split(''))
  }
  if (typeof res === 'number') {
    console.log(res.toFixed(3))
  }
}
unknowUse()
```

### never类型(了解)
### 枚举类型
+ 枚举类型的值默认从0开始递增，也可以赋一个初始的值

```typescript
enum EDirection {
  LEFT,
  RIGHT
}

const d1: EDirection = EDirection.LEFT

function turnDirection(der: EDirection) {
  switch(der) {
    case EDirection.LEFT:
      console.log('向左移动')
      break
    case EDirection.RIGHT:
      console.log('向右移动')
      break
  }
}

turnDirection(d1)
```

## TS进阶
### 联合类型(union Type)
+ 语法：`string|number|boolean`

```typescript
function parseId(id: string|number) {
  // 类型缩小
	if (typeof id === 'string') {
    return id.split('')
  }
  if (typeof id === 'number') {
    return id.toFixed(2)
  }
}
// 类型别名
type IID = string|number
```

### interface和type
#### 区别
+ type通过类似于const赋值的方式，interface通过申明的方式
+ type可以直接在声明非对象时使用，interface只能申明对象类型
+ type只能声明一次类型别名，interface可以**多次声明同一个类型别名**
+ type不支持继承，interface**支持**`**extends**`**关键字继承**，拓展性较强
+ interface可以被类class实现
+ 一般申明非对象类型使用type，一般声明对象类型使用interface

#### 相同
+ interface所有的特性都可以在type中实现

### 交叉类型
+ 使用较多的场景是把两个对象类型交叉使用

```typescript
interface IPerson {
  name: string
  age: number
}

interface IAnimal {
  running: () => void
  eat: () => void
}

const info: IPerson & IAnimal = {
  name: 'dog',
  age: 10,
  running: () => {
    console.log('running')
  },
  eat: () => {
    console.log('eat')
  }
}
console.log(info)
```

### 类型断言as(Type assertions)
```typescript
// 类型断言
const imgEl = document.querySelector('.img') as HTMLImageElement
imgEl.src = 'http://xxxx.com'
imgEl.alt = '头像'
```

+ 规则：断言为**具体的类型**或**不太具体的类型**

### 非空类型断言(危险)
```typescript
interface IFriend {
  name: string
  age: number
  info?: {
    address: string
    job: string
  }
}

function getUserInfo(info: IFriend) {
  // 第一种防止读到空值的做法
  if (info.info) {
    console.log(info.info.job);
  }
  // 第二种做法非空断言
  info.info!.address = '上海'
}
const userInfo: IFriend = {
  name: 'zhangsan',
  age: 13,
  info: {
    address: '北京',
    job: 'coder'
  }
}
getUserInfo(userInfo)
console.log(getUserInfo(userInfo))
```

### 字面量类型
```typescript
// 字面量类型
type Direction = 'right'|'left'|'up'|'down'
type RequestMethods = 'post'|'get'|'delete'|'patch'|'options'|'head'
function request(url: string, method: RequestMethods) {
  console.log(url, method)
}
const info1 = {
  url: 'xxx',
  method: 'post'
}
// info1.method无法使用字面量类型
request(info1.url, info1.method)
// 方式一：对info1.method使用类型断言
request(info1.url, info1.method as 'post')
// 方式二：对info1使用类型断言
const info2 = {
  url: 'xxxx',
  method: 'post'
} as const
// 这里的info2.url可以使用，因为info2中的url中是一个string类型
request(info2.url, info2.method)
```

+ **const断言**告诉编译器为表达式推断出它能推断出的最窄或最特定的类型，强制 TypeScript 将变量或表达式的类型视为不可变的（immutable），即把info2属性都视为`readonly`

### 类型缩小(type narrow)
#### 使用`typeof`进行类型收窄(最常使用)
#### 字面量类型平等缩小
```typescript
// 平等缩小
type Direction = 'right'|'left'|'up'|'down'
function move(direction: Direction) {
  if (direction === 'down') {
    console.log('人物向下移动')
  }
  if (direction === 'up') {
    console.log('人物向上移动')
  }
}
move('down')
move('up')
```

#### 通过in属性类型缩小
```typescript
interface ISwimming {
  swim: () => void
}
interface IRun {
  run: () => void
}
function moveBody(animal: ISwimming | IRun) {
  // 判断某一个对象中是否包含某一个key
  if ('swim' in animal) {
    animal.swim()
  }
  if ('run' in animal) {
    animal.run()
  }
}
```

#### 通过instanceof类型缩小
```typescript
function printDate(date: string | Date) {
  if (date instanceof Date) {
    console.log(date.getDate())
  } else {
    console.log(date)
  }
}
```

### 函数类型(重点)(Function type expression)
+ 对于函数的参数个数，ts不进行检测

```typescript
type CalcType = (num1: number, num2: number) => number

function calcNum(calcFn: CalcType) {
  const num1 = 10
  const num2 = 20
  const res = calcFn(num1, num2)
  console.log(res)
}

// 对于参数个数不校验，匿名函数用的较多，
function sumNum(num1: number, num2: number) {
  return num1 + num2
}
calcNum(sumNum)
```

+ ts对于第一次定义的时候对类型不检测不报错，有自己的一套规则

```typescript
interface  IPerson {
  name: string
  age: number
}
const p = {
  name: 'zhangsan',
  age: 18,
  address: '北京市'
}
const info: IPerson = p //这里不进行类型检测，第一次"新鲜的"
```

### 函数调用签名(call signature)
+ 函数即是函数类型，也是对象类型，对象类型就有属性，函数调用签名即描述一个带有属性的函数，使用interface在对象类型中写一个调用签名(call signature)

```typescript
// 调用签名
// 定义函数类型
type PrintType = (num1: number) => number
const printNum: PrintType = (num1: number): number => {
  return num1
}
printNum(123)
// 函数属性：定义函数调用签名
interface IPrintOthers1 {
  name: string
  age: number
  // 调用签名，括号内为参数列表，:后为返回值类型
  (name: string, age: number): (string | number)[]
}
const printOther: IPrintOthers1 = (name: string, age: number): (string | number)[] => {
  return [name, age]
}
printOther.age = 123
printOther.name = 'lisi'
console.log(printOther.age, printOther.name)
printOther('zhangsan', 20)
```

### 函数构造签名(constructor signature)
```typescript
// 函数构造签名
class Person {
}
interface IConsPerson {
  new (): Person
}
function factory(fn: IConsPerson) {
  const f =  new fn()
  return f
}
factory(Person)
```

### 函数重载(Function overloading)
#### js中的函数重载
```typescript
function createOverload() {
  const callMap = new Map()
  function overload(...args) {
    const key = args.map(arg => typeof arg).join(',')
    const fn = callMap.get(key)
    if (fn) {
      // this和overload函数保持一致
      return fn.apply(this, args)
    }
    throw new Error('no matching function')
  }
  overload.addImpl = function(...args) {
    const fn = args.pop()
    // 如果fn没有传参数或fn不是一个函数
    if (!fn || typeof fn !== 'function') {
      return 
    }
    const types = args
    // 使用字典数组列表和参数列表对应起来
    callMap.set(types.join(','), fn)
  }
  return overload
}

const getUsers = createOverload()

getUsers.addImpl(() => {
  console.log('查询所有用户')
})

const searchPage = (page, size = 10) => {
  console.log('安按照页码和数量查询用户')
}

getUsers.addImpl('number', searchPage)
getUsers.addImpl('number', 'number', searchPage)

getUsers.addImpl('string', (name) => {
  console.log('按照姓名查询用户')
})
getUsers.addImpl('string', 'string', (name, sex) => {
  console.log('按照性别查询用户')
})

getUsers(1, 2)
getUsers('a')
```

#### ts中的函数重载
+ 有实现体的函数无法被调用
+ 可以使用联合类型实现则使用联合类型实现，不能则使用函数重载

```typescript
// 先编写重载签名
function add(param1: number, param2: number): number
function add(param1: string, param2: string): string

// 后编写通用的函数签名
function add(param1: any, param2: any) {
  return param1 + param2
}

add(1, 2)
// 通用函数不能调用
add('james', 'judy')
```

### ts中this的内置工具
#### ThisType
+ **this的绑定工具**，pinia中类似做法

```typescript
// this的内置工具ThisType
interface IState {
  name: string
  age: number
}
interface IStore {
  state: IState
  eating?: () => void
  running?: () => void
}
// 将store对象中的函数全部绑定为IState
const store: IStore & ThisType<IState> =  {
  state: {
    name: 'zhangsan',
    age: 18
  },
  eating: function () {
    console.log('eating')
    console.log('this', this, this.name, this.age)
  },
  running: function () {
    console.log('running')
  }
}
store.eating?.call(store.state)
```

#### ThisParameter
+ **获取某个类型中this的类型**

```typescript
function foo(this: { name: string}, info: { name: string }) {
  console.log(this, info)
}

type FooType = typeof foo

// 获取FooType类型中this的类型
type FooThisType = ThisParameterType<FooType>
```

#### OmitThisParameter
+ **删除this参数类型，剩余的函数类型**
+ `type FooThisType = ThisParameterType<FooType>`	

## TS面向对象
### TS/JS类的成员修饰符
+ `public``private``protected` `readonly`

### TS类中的getter和setter
+ `setter`给`private`设置值
+ 在ts中**独有的参数属性**

```typescript
class Animal {
  // 成员修饰符的常规写法
  private _age: number
  // 成员修饰符直接在construtor中的语法糖，称为参数属性
  constructor(public name: string, age: number, private _price: number) {
    this._age = age
  }

  set age(newVal: number) {
    if (newVal < 10 && newVal >0) {
    	this._age = newVal
    }
  }

  get age() {
    return this._age
  }

  set price(newVal: number) {
    this._price = newVal
  }

  get price() {
    return this._price
  }
}

const a = new Animal('dog', 2, 100)
a.age = 100
console.log(a.age)
a.price = 200
console.log(a.price)
```

### 抽象类抽象方法(abstract)
+ 目的是复用方法和类
+ 抽象类必须放实例方法，其本身不能被实例化，使用abstract保留字声明
+ 抽象方法必须由子类实现实现体

```typescript
abstract class Shape {
  // getArea只有声明没有实现体，实现体由子类自己实现
  // 抽象类中必须放抽象方法
  abstract getArea()
  running() {
    console.log('keep running')
  }
}

class Reactangle extends Shape {
  constructor(public width: number, public height: number) {
    super()
  }

  getArea() {
    return this.width * this.height
  }
}

class Cicle extends Shape {
  constructor(public radius: number) {
    super()
  }

  getArea() {
    return this.radius ** 2 * Math.PI
  }
}

// 多态
function calcArea(shap: Shape) {
  return shap.getArea()
}

calcArea(new Reactangle(10, 10))
calcArea(new Cicle(10))

// 抽象类不能被实例化
// new Shap
```

### TS鸭子类型
+ 不继承特定的类或者实现特定的接口，而是由**当前的方法和属性的集合**决定

### TS中的类具有类型特征
+ 类可以创建对应的实例对象
+ 类本身可以作为这个实例的类型
+ 类可以作为一个构造签名的函数

```typescript
class Person {
  public name: string
  public age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}
// 1.创建实例对象
// 2.Person类作为实例p的类型
const p: Person = new Person('zhangsan', 18)
// 3.类作为构造签名的函数
function printPerson(p: Person){}
function factory(ctor: new (...arg: any[]) => void) {}
factory(Person)
```

### 对象类型属性修饰符
+ 可选修饰符`?.`
+ 只读`readonly`属性修饰符

```typescript
type IPerson {
  name?: string
  readonly age: number
}
```

### 对象类型索引签名1
```typescript
interface IPerson {
  [key: string]: string
}
function printPerson(): IPerson {
  const a: any = 1
  return a
}
const p = printPerson()
const name = p['name']
console.log(name, p.adress, p.age, p.name)

export {}
```

### 对象类型索引签名2
```typescript
interface ICollection {
  [index: number]: string
  length: number
}

// 或使用这种写法 arr[0]转为arr["0"]，不报错
// interface ICollection {
//   [index: string]: any
//   length: number
// }

// 报错，涉及到严格字面量类型检测，names.forEach则会报错，string不过对应function等等
// interface ICollection {
//   [index: string]: string
//   length: number
// }

function logCollection(collection: ICollection) {
  for (let i = 0; i < collection.length; i++) {
    const item = collection[i]
    console.log(item.length)
  }
}

const arr = ['aaa', 'bbb']
const tuple: [string, string, string] = ['zhangsan', "18", "1.89"]
logCollection(tuple)
logCollection(arr)
```

### 对象类型索引签名3
```typescript
interface ICollection {
  [index: number]: string
  [key: string]: any
}

function logCollection(collection: ICollection) {
  for (let i = 0; i < collection.length; i++) {
    const item = collection[i]
    console.log(item.length)
  }
}

const arr = ['aaa', 'bbb']
const tuple: [string, string, string] = ['zhangsan', "18", "1.89"]
logCollection(tuple)
logCollection(arr)
```

### 接口被类实现
+ 接口可以继承
+ 接口可以被类实现，实现后，后续所有创建的该类的实例，都可以被该接口提供类型和属性

```typescript
interface IAnimal {
  age: number
  running: () => void
}

interface IPerson extends IAnimal {
  name: string
  height: number
}

const p: IPerson = {
  name: 'zhangssan',
  height: 19,
  age: 18,
  running: () => {console.log('running')}
}

// 接口被类实现
class Person implements IPerson {
  name: string
  height: number
  age: number
  running() {
    console.log('running')
  }
}

// 后续创建所有的实例，都具备接口的属性和方法
const p1 = new Person()
console.log(p1.age, p1.height, p1.name, p1.running)
```

### 严格字面量赋值检测
```typescript
interface IPerson {
  name: string
  age: number
}

const obj = {
  name: "zhangsan",
  age: 18,
  height: 190
}

// 1.此处没有类型检测
const per: IPerson = obj
// 2.
const per1 = {
  name: "lisi",
  age: 19,
  height: 190
}
function printPerson(person: IPerson){}
// 此处不进行类型检测
printPerson(per1)
```

+ 第一次创建字面量对象时，'新鲜'的时候必须满足严格字面量的类型检测，第二次则不会进行检测
+ 当**类型断言**或**对象字面量的类型扩大**时，'新鲜'会消失

### 抽象类和接口的区别
+ 抽象类是事物的抽象，抽象类用于捕捉子类的通用特征；接口通常是一些行为的描述
+ 抽象类通常用于一系列紧密的类之间；接口只用来描述一个类应该具有什么行为
+ 抽象类只能单一的继承；接口可以被多层的实现
+ 抽象类中可以有实现体；接口只能有函数的申明

#### 总结
+ 抽象类是对事物的抽象，is
+ 接口是对行为的抽象，has

## TS泛型编程
+ `T`: type的简写
+ `K`: key的简写
+ `V`: value的简写
+ `E`: element的简写
+ `O`: object的简写
+ `R`: returnType的简写

### 泛型语法的基本使用
```typescript
// 此处的Type作为一个类型参数，被调用函数传递过来
function foo<Type>(bar: Type): Type {
  return bar
}

// 完整写法
const res1 = foo<string>('Hello World!')
const res2 = foo<number>(11111)

// 大多数情况的简略的写法
const res3 = foo(11111) 
// 使用const默认是字面量类型 const res4: "this is 泛型"
const res4 = foo('this is 泛型')
// 使用let变为了字符类型 let res5: string
let res5 = foo('this is 泛型')
```

### 泛型传入多个类型的参数
```typescript
function foo<T, E>(arg1: T, arg2: E): [T, E] {
  return [arg1, arg2]
}

foo<string, number>('123', 234)
```

### 泛型接口基本使用
```typescript
// T可以使用等于号给定默认值
interface IPerson<T = string> {
  name: T,
  age: number,
  address: T
}

// 这里没办法进行类型的推导
// const p: IPerson = {
//   name: 'zhangsan',
//   age: 12,
//   address: "朝阳区"
// }

// 必须显示的给定类型传递
const p1: IPerson<string> = {
  name: "zhangsan",
  age: 18,
  address: '朝阳区'
}

// 如果给定了默认值直接使用默认值不需要进行传递类型参数
const p2: IPerson = {
  name: 'lisi',
  age: 19,
  address: "西湖区"
}
```

### 泛型类的使用
```typescript
// 类里面的成员参数限定，类型参数化
class Point<T = number> {
  public x: T
  public y: T
  constructor(x: T, y: T) {
    this.x = x
    this.y = y
  }
}

const p = new Point(1, 2)
const p1 = new Point('1', '2')

export {}
```

### 泛型约束基本使用（参数限制条件等）
#### 使用extends关键字约束
```typescript
// 使用extends关键字进行对象类型的约束
interface ILength {
  length: number
}

// 传入的内容中必须要有length属性
function foo<T extends ILength>(arg1: T): T {
  return arg1
}

const res1 = foo('123456')
const res2 = foo([1, 2, 3])
// 123数字类型没有length属性，因此无法传入
// const res3 = foo(123)
```

#### 使用extends和keyof关键字约束
+ `keyof`表示对象类型所有key的联合类型

```typescript
const info = {
  name: 'zhangsan',
  age: 18,
  address: '朝阳区'
}

function getObjectProperty<O, K extends keyof O>(obj: O, key: K) {
  return obj[key]
}

const name = getObjectProperty(info, 'name') // name type is string
const age = getObjectProperty(info, 'age') // age type is number
```

### 映射类型
#### 建立在索引签名上的语法
+ 使用了PropertyKeys联合类型的泛型
+ PropertyKeys多是通过keyof创建，循环遍历键名创建一个类型

```typescript
type MapPerson<T> = {
	readonly [property in keyof T]?: T[property]
}

interface IPerson {
	name: string,
  age: 18,
  address: string
}

type IPersonOption = MapPerson<IPerson>
const p: IPerson
```

#### 修饰符前面的符号+和-
```typescript
type MapPerson<T> = {
  // 这里的-号是复制类型属性时把IPerson中的?和readonly修饰符删除并复制类型属性
	-readonly [property in keyof T]-?: T[property]
}

interface IPerson {
	name?: string,
  readonly age: 18,
  address: string
}

type IPersonOption = MapPerson<IPerson>
const p: IPerson
```

### 条件类型 
+ 包括通过keyof和extends定义的条件类型

## TS模块化
+ `import type { IPerson, ILogin }`中的`type`作用是**给编译工具(babel、swc、esbuild)提供这是一个类型信息，在编译阶段可以安全的删除**，使得编译的速度更快，没有必要一定写

### 命名空间(namespace)
+ ts早期内部模块化，将一个模块的内部进行作用域的划分，防止一些命名冲突的问题
+ 推荐使用ESModule，ESModule中基本包含了命名空间的特性

```typescript
export namespace price {
  export function foo(price) {
    return '￥' + price
  }
}
export namespace date {
	export function foo(data) {
    return `2022-data`
  }
}

// 如何使用，在别的文件中进行引入
import { price, date }
price.foo(100)
date.foo(10-10)
```

### 类型查找
+ ts对于类型的管理和查找规则
+ .d.ts进行类型的申明文件或定义文件，不包含业务逻辑的代码

```typescript
declare var close: boolean;
declare var document: Document;
declare module "*.png"
declare module "*.svg"
declare namespace $ {
  export functon ajx(setting: any): any {
  }
}
```

#### ts查找类型声明的地方
+ 内置类型声明(HTMLImageElement等)
+ 外部定义类型声明(第三方库定义的声明)
+ 自己定义的类型声明(.d.ts类型声明)

### Ts类型声明
#### 第三方库引入ts声明文件
+ 比如按照react包之后，react没有自带的ts声明文件，需要在ts官网中引入
+ 或者从github中查询该库的ts声明文件
+ 目前在npm包中已经包含声明文件，不需要声明，如果第三方没有提供，需要手写声明文件

```typescript
declare module "lodash" {
  export function join(...arg: any[]): any
}
```

### 使用TS进行axios的封装

```typescript
```
