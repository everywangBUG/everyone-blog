# Vue.js 2
## 模板语法
### 指令(Directives)
+ `v-bind` ：绑定元素的attribute，支持动态绑定多个值，使用`:`简写。**可以实现单向的数据绑定**。
+ `v-if`：基于表达式的真假值移除或插入元素，条件渲染。不保留DOM元素，相当于`dispaly: none`
+ `v-else`：和`v-if`配合使用
+ `v-on`：监听DOM事件，缩写`@`
+ `v-for`：数组的循环遍历
+ `v-show`：条件渲染，可以在DOM中保留元素，相当于`visibility: hidden`，不能配合`v-else`使用，如果变化的频繁，试一下`v-show`
+ `v-model`：只能**绑定输入框类型的标签**，可以**实现双向的数据绑定**。

### 动态参数（值和函数）
+  动态绑定值 
    - `<a v-bind:[attributeName]="url">...</a>`，将href的值绑定到attributeName：`const attributeName = href`，等同于`<a :href="url">...</a>`
    - 如果动态值是一个字符串，或者`null`，`null`意思为显示的移除绑定
+  动态绑定事件名称  
`<a @[eventName]="dosomething">...</a>` 

### 修饰符Modifiers
#### 事件修饰符
+ `prevent`：等同于`preventDefayult()`阻止默认行为
+ `stop`：等同于`stopPropagation()`阻止事件冒泡
+ `once`：事件只执行一次
+ `passive`：先执行DOM事件，再执行回调函数
+ `self`：只有`event.target`当前的操作的元素才触发事件，可以用于阻止事件冒泡
+ `capture`：在事件捕获阶段就处理事件，而不用等到事件冒泡阶段

#### 键盘事件的修饰符别名(9个)
+ `enter`：回车键
+ `delete`：删除键
+ `esc`：Esc键
+ `space`：空格
+ `tab`：换行
+ `up`：上
+ `down`：下
+ `right`：右
+ `left`：左
+ `<a @keyup.caps-lock="showInfo"></a>`

##### 系统修饰符特殊性
+  `ctrl` `alt` `shift` `meta` 
    - 配合`keyup`使用：按下修饰键的同时，再按下其他的键，随后释放其他的键，事件触发
    - 配合`keydown`使用：正常触发事件
+  特殊的例子：`tab`键绑定`keydown`而不能绑定`keyup` 

##### 自定义的键名
`Vue.config.keyCodes.自定义键名 = 键码`可以定制键别名

#### tips
+ 修饰符可以链式调用，如`<a @click.stop.prevent="stopPropagationAndpreventDefault"></a>`
+ 组合键名：`<input @keydown.ctrl.y>`Ctrl和y键同时按下触发事件

## 响应式基础
### `Object.defineProperty()`
+ vue2中使用`Object.defineProperty()`实现数据代理

### Data
+ `data`声明组件的响应式状态。返回一个对象的函数。

```vue
<script>
    export default {
        data() {
            return {
                count: 1
            }
        },
        mounted() {
            // this指向当前组件的实例
            console.log(this.count)
            // 数据属性可以被更改
            this.count = 2
        }
    }
</script>
```

### 响应式VS原始值
+ 基于proxy实现的响应式原理
+ **与 Vue 2 不同的是，这里原始的 **`**newObject**`** 不会变为响应式：请确保始终通过 **`**this**`** 来访问响应式状态。**

```vue
<script>
    export default {
        data() {
            return {
                someObject: {}
            }
        },
        mounted() {
            const newObject = {}
            this.someObject = newObject
            
            console.log(newObject === this.someObject) // false
        }
    }
</script>
```

### 声明方法
+  使用`mouths`选项，一个包含所有方法的对象 
+  不在`methods`使用箭头函数，箭头函数没有自己的`this`上下文 
+  `this`永远指向组件的实例 

```vue
<script>
    export default {
        data() {
            return {
                count: 0
            }
        },
        methods: {
            increment() {
                this.count++
            }
        },
        mounted() {
            this.increment()
            // increment: () => {} // 无法访问此处的`this`
        }
    }
</script>
```

#### 方法在模板上被使用
+ `increament`方法在`button`被点击时调用

```vue
<button @click="increment">{{ count }}</button>
```

### 计算属性
+ 计算属性中的getter和setter

```javascript
Vue.config.productionTip = false;
      const vm = new Vue({
        data() {
          return {
            message: "World",
            school: {
              students: ["a", "b", "c"],
            },
            name: {
              firstName: "zhang",
              lastName: "sang",
            },
          };
        },
        methods: {},
        computed: {
          showBookComputed: {
            get() {
              console.log("get被调用了");
              return this.school.students.length ? true : false;
            },
          },
          // 这里的get的作用是读取了fullName的值时被调用，返回值作为fullName的值
          // get什么时候调用？1.初次读取showBookComputed的值时，2.依赖的数据发生变化时，只要return中的返回值firstName或lastName发生改变
          fullName: {
            get() {
              console.log("fullName中的getter被调用");
              return this.name.firstName + "-" + this.name.lastName;
            },
            // set什么时候调用，当fullName被修改的时候调用
            set(newValue) {
              console.log("set", newValue);
              const arr = newValue.split("-");
              console.log("arr:", arr);
              this.name.firstName = arr[0];
              this.name.lastName = arr[1];
            },
          },
        },
      });
      vm.$mount("#root");
```

### 监视属性
+  第一种在watch属性中配置 
+  第二种在vm实例的$watch上进行配置 

```javascript
vm.$watch("isHot", {
        immediate: true,
        handler(newValue, oldValue) {
          console.log(newValue, oldValue);
        },
});
```

#### 深度监视属性
+ Vue中的watch默认不监测对象内部值得改变(一层)
+ 配置`deep:true`：true可以检测对象内部值得改变(多层)
+ 立即执行一次`immediate: true`：开始就执行一次 

#### 监视属视的简写
+ 监视属性简写的时候，不能使用深度监视属性

```javascript
isHot(newValue, oldValue) {
	console.log("isHot被改变了", newValue, oldValue)
}
vm.$watch("isHot", (newValue, oldValue) {
	console.log("isHot被改变了", newValue, oldValue)
}
```

#### 计算属性和监视属性的区别
+ 如果涉及到异步任务(setTimeout/setInterval)的的场景，使用watch
+ watch能完成的功能，computed不一定可以完成

#### tips
+ vue自身可以检测对象内部值得改变，但vue提供的watch默认不可以
+ 使用watch根据数据的具体结构，决定是否使用深度监视
+ 所有Vue管理的函数，最好写成普通函数，这样的this的指向才是vm或组件实例对象
+ 所有不被Vue所管理的函数(定时器函数、ajax的回调函数、promise的回调函数)，写成箭头函数，this指向的是vm或组件实例对象

## 类和样式的绑定
+  `v-bind:class`：简写为`:class`，`:class="{active: isActive}"` ，可以在data中写对象形式、数组形式、字符串形式
+  `:style`：绑定内联样式`<div :style="{'font-size': '30px'}"><div>` 

## 列表渲染
+ 语法`v-for="(p, index) in/of person"`，遍历数组和对象可以使用in和of
+ 必须绑定一个`:key=p.id/index`，**注意v-for中使用的是value-key的形式遍历**

### key的作用和原理
![画板](https://cdn.nlark.com/yuque/0/2023/jpeg/32767583/1684735161539-6b9e10e2-3e43-43be-bbcc-27024ed0c74f.jpeg)

+ 总结：如果没有涉及到用户输入等交互操作，可以使用index作为唯一的key

### 列表过滤
```html
  <div id="root">
      <label for="">
        输入搜索名称：
        <input type="text" v-model="keyWord" />
      </label>
      <div v-for="(person, index) of filterPeople" :key="index">
        {{person.name}}——{{person.age}}
      </div>
    </div>
```

+ 使用watch属性实现列表过滤

```javascript
const vm = new Vue({
  el: "#root",
  data() {
    return {
      keyWord: "",
      peopleInfo: [
        { id: 1, name: "周冬雨", age: 30 },
        { id: 2, name: "马冬梅", age: 40 },
        { id: 3, name: "周杰伦", age: 43 },
        { id: 4, name: "温兆伦", age: 53 },
      ],
      filterPeople: [],
    };
  },
  watch: {
    keyWord: {
      immediate: true,
      handler(val) {
        this.filterPeople = this.peopleInfo.filter((p) => {
          return p.name.indexOf(val) !== -1;
        });
      },
    },
  },
});
```

+ 使用computed属性实现列表过滤

```javascript
const vm = new Vue({
  el: "#root",
  data() {
    return {
      sortType: 0, // 0代表原顺序，1代表降序，2代表升序
      keyWord: "",
      peopleInfo: [
        { id: 1, name: "周冬雨", age: 30 },
        { id: 2, name: "马冬梅", age: 16 },
        { id: 3, name: "周杰伦", age: 25 },
        { id: 4, name: "温兆伦", age: 53 },
      ],
    };
  },
  computed: {
    filterPeople() {
      return this.peopleInfo.filter((p) => {
        return p.name.indexOf(this.keyWord) !== -1;
      });
    },
  },
});
```

### 列表排序
```html
<div id="root">
  <label for="">
    输入搜索名称：
    <input type="text" v-model="keyWord" />
  </label>
  <button @click="sortType = 2">年龄升序</button>
  <button @click="sortType = 1">年龄降序</button>
  <button @click="sortType = 0">原顺序</button>
  <div v-for="(person, index) of filterPeople" :key="index">
    {{person.name}}——{{person.age}}
  </div>
</div>
```

+ 使用computed实现列表排序

```javascript
const vm = new Vue({
        el: "#root",
        data() {
          return {
            sortType: 0, // 0代表原顺序，1代表降序，2代表升序
            keyWord: "",
            peopleInfo: [
              { id: 1, name: "周冬雨", age: 30 },
              { id: 2, name: "马冬梅", age: 16 },
              { id: 3, name: "周杰伦", age: 25 },
              { id: 4, name: "温兆伦", age: 53 },
            ],
          };
        },
        computed: {
          filterPeople() {
            const arr = this.peopleInfo.filter((p) => {
              return p.name.indexOf(this.keyWord) !== -1;
            });
            // 判断是否需要排序
            if (this.sortType) {
              arr.sort((p1, p2) => {
                return this.sortType === 1 ? p2.age - p1.age : p1.age - p2.age;
              });
            }
            return arr;
          },
        },
      });
```

### 监测数据改变的原理
#### vm实例的基本实现
+ 不是直接通过definePrototype监测代理对象的变化然后改变，在中间使用Observer监测对象中的属性

```javascript
  let data = {
    name: "张三",
    age: 40,
  };

  // 创建一个监视的实例对象，用于检测data中的属性变化
  const obs = new Observer(data);
  console.log(data);

  // vm实例对象
  let vm = {};
  // vm._data = obs
  vm._data = data = obs;
  function Observer(obj) {
    const keys = Object.keys(obj);
    keys.forEach((k) => {
      Object.defineProperty(this, k, {
        get() {
          return obj[k];
        },
        set(val) {
          console.log(`${k}被改变了，解析模板，生成虚拟DOM`);
          obj[k] = val;
        },
      });
    });
  }
```

