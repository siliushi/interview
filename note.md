软考+鸿蒙学习

prototype 是函数的，指向构造函数
\_\_proto\_\_ 是对象的，
对象用 **proto** 指回构造函数的 prototype。

React 源码
实现 keep-alive

MVC、MVP、MVVM、MVI

Vue3

0 八进制
0x 十六进制
11..toString(2)

源码+视频
URL 组成：

webgl

react/vue 源码
网络

函数式编程：compose/pipe

class 方法前面加 static 和不加主要区别在于方法的调用方式 和 作用范围。
static 归属于 类本身（ClassName），而不是实例（instance），不能通过实例调用，只能通过类名直接调用。
非 static 归属实例，必须通过实例调用，不能通过类名调用

发布订阅与观察者模式区别：
具有相似的目标：建立对象之间的通信机制，但它们在架构和使用方式上存在关键区别。
发布订阅
✅ 有“消息中间件”/事件中心（Event Bus）
✅ 发布者（Publisher）和订阅者（Subscriber）不直接通信
✅ 松耦合（Decoupled）
✅ 支持多个订阅者接收相同消息
观察者
✅ 没有“事件中心”，直接由被观察对象（Subject）管理观察者
✅ 观察者（Observer）直接订阅被观察对象（Subject）
✅ 耦合度较高（Coupled）
✅ 每个 Subject 维护自己的 Observer 列表

slice(start, end) 数组或字符串
当为负数时，加上 length 处理，如果计算之后 end<start 返回空
substring(start, end) 字符串
当为负数时，负数变成 0，取 start/end 最小值为开始，最大值为结束
substr(start, length) 字符串
当 length 为负数时，返回空。当 start 为负数时，从右往左定位，从左往右截取

http 发展：https://juejin.cn/post/7350520171611652147

# Mobx

全局：makeAutoObservable
局部：useLocalObservable

# 面试题

第一题：连续赋值
var a = {n: 1}; // a 在栈，对象在堆
var b = a;
a.x = a = {n :2};
console.log(a.x)
console.log(b.x)
console.log(a)

第二题：a++，对象键顺序：数字、字符 symbol
const obj = {
a: 0,
};
obj['1'] = 0;
obj[++obj.a] = obj.a++;
const values = Object.values(obj);
obj[values[1]] = obj.a;
console.log(obj);

URLSearchParams:https://blog.csdn.net/qq_72935001/article/details/131154797
网络是怎么连接的：https://zhuanlan.zhihu.com/p/535811369
搭一个博客

tree-shaking
v8 引擎
node.js

计算机网络：
https://www.bilibili.com/video/BV1t34y1d7yA?p=30&vd_source=8e6dfd9fb6e70ce8104f69d8d3ea1703
https://blog.csdn.net/m0_49635911/article/details/137932222

import \*

https://juejin.cn/post/7398933999319990291

Jsfuck
Js 1k
代数效应

散列，快速移动监听不到

jsperf

迭代器：https://juejin.cn/post/7401408756221542426

低码
https://github.com/maqi1520/react-antd-low-code

string、boolean、number、null、undefined 和 object symbol
函数、数组都是 object 的子类
不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都为 0 的话会被判 断为 object 类型，null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回“object”

# js

作用域 RHS 和 LHS
词法作用域查找只会查找一级标识符
new Function(..)
with 给 obj 赋值一个没有的属性，非严格模式下会创建一个全局属性并赋值
变量和函数，函数会首先被提升，然后才是变量，在后面的函数声明还是可以覆盖前面的
声明和执行两步，先声明变量，赋值留在原地等待执行
动态作用域，不关心函数是如何声明以及在何处声明,只关心它们从何处调
箭头函数继承了上层函数的 this 绑定，根据外层（函数或者全局）作用域来决 定 this。
this 被自动定义在所有函数的作用域中
直接执行函数，函数内部的 this 都指向全局，严格模式，全局对象将无法使用默认绑定，因此 this 会绑定 到 undefined
this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。
this 是在运行时进行绑定的
严格模式与调用位置无关，与定义有关
new > 显示 > 隐士 > 默认
null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值 在调用时会被忽略，实际应用的是默认绑定规则，相当于直接调用函数，且函数内部没有 this
赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo()而不是 p.foo()或者 o.foo()
如果要判断一个运行中函数的 this 绑定，就需要找到这个函数的直接调用位置。找到之后 就可以顺序应用下面这四条规则来判断 this 的绑定对象。

1. 由 new 调用？绑定到新创建的对象。
2. 由 call 或者 apply（或者 bind）调用？绑定到指定的对象。
3. 由上下文对象调用？绑定到那个上下文对象。
4. 默认：在严格模式下绑定到 undefined，否则绑定到全局对象。
   赋值，只要是对象（属性是对象也算），修改属性会影响原对象
   Object.preventExtensions(obj)
   判断属性是否在对象里: in 或者 hasOwnProperty
   ES6 中的符号 Symbol.iterator 来获取数组的 @@iterator 内部属 性。var it = myArray[Symbol.iterator]()
   obj.propertyIsEnumerable('a')
   Object.assign 浅复制，不会复制属性描述，=会复制属性描述

中卷
number string boolean null undefined object symbol
依赖注入：将依赖通过参数显式地传递到函数中
“稀疏”数组
字符串键值和属性（但这些并不计算在数组长度内）
如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当作数字索引来处理。
NaN 是 JavaScript 中唯 一一个不等于自身的值。
[]!=[] [] == ![]
对负零进行字符串化会返回 "0"
-0 === 0 // true
var a = new Boolean( false ); a 是 true 值
null 和 undefined 在==情况下相等，和其他都不想等
加法转字符串
相等判断转数字
null 和 undefined 不能够被封装（boxed），Object(null)和 Object() 均返回一个常规对象。
""、"\n"（或者 " " 等其他空格组合）等空字符串被 ToNumber 强制类型转换为 0。null 转 number 为 0
对象和数组的比较操作会先执行 toPrimitive
ReferenceError SyanxError TypeError URIError EvalError RangeError
逗号运算符允许你在一行代码中执行多个表达式，并返回最后一个表达式的值。
优先级：== > && > || > (?:) > =
从高到低
基本：x++,x--,
一元：+(正号),-（负号）,!,++x,--x
乘除：_,/,%
加减：+,-
关系和类型：<,>,<=,>=
相等：==,!=
逻辑与：&&
逻辑或：||
三目运算：?:-
最后：=,_=,/=,%=,+=,-=

# 取整数和小数

## 取整数

console.log(parseInt(0.00000001)); // 1
console.log(parseInt(9000000000000000000000)); // 9
这是因为，0.00000001.toString() === 1e-8 而 1000000000000000000000..toString() === 1e+21。
parseInt 的缺陷：1、先转成字符串，2、科学计数法不准
第一种：
Math.round 是四舍五入的，Math.ceil 是向上取整，Math.floor 是向下取整
如果是负数，要使用 Math.ceil，如果是正数，则使用 Math.floor
第二种：
取整数：Math.trunc()
第三种：
let num = 3.75;
console.log(num | 0); // 3
num = -num;
console.log(num | 0); // -3

## 取小数

console.log(3.75 % 1); // 0.75
console.log(-3.75 % 1); // -0.75

# BroadcastChannel

BroadcastChannel 只能用于同源的页面之间进行通信，而 window.postMessage 却可以用于任何的页面之间

# showDirectoryPicker

# 宏任务 微任务 同步任务先执行然后才是宏微任务

宏任务（Macrotask）较大的任务，通常是由宿主环境（如浏览器或 Node.js）发起的
宏任务包括：
setTimeout
setInterval
setImmediate（Node.js 特有）
I/O 操作
UI rendering
宏任务队列中的任务是按顺序执行的。一个宏任务执行完毕后，事件循环会检查是否有微任务需要执行，如果有，则会先执行所有的微任务，然后再继续执行下一个宏任务。

微任务（Microtask）较小的任务，通常是在当前执行上下文结束后立即执行的。
微任务包括：
Promise 的回调函数
process.nextTick（Node.js 特有）
MutationObserver
微任务队列中的任务也按顺序执行，但它们的执行优先级高于宏任务。也就是说，在当前的宏任务执行完后，事件循环会先处理所有的微任务，然后再处理下一个宏任务。

# 事件循环（Event Loop）

同步任务->微任务->UI 渲染->宏任务第一个任务->微任务->UI 渲染
事件循环是 JavaScript 运行时的核心机制，它负责调度和执行任务。其基本过程如下：
从宏任务队列中取出第一个任务并执行。
检查并执行所有的微任务，直到微任务队列为空。
渲染 UI（如果需要）。
重复上述步骤。

# 类型转换

如果其中有一个操作数为 string，则将另一个操作数隐式的转换为 string，然后进行字符串拼接得出结果。
如果操作数为对象({})或者是数组([])这种复杂的数据类型，那么就将两个操作数都转换为字符串，进行拼接
String([]) //[]进行字符串转换得到结果为""
String({}) //{}进行字符串转换得到结果为"[object Object]"
如果操作数是像 boolean 这种的简单数据类型，那么就将操作数转换为 number 相加得出结果

https://share.weiyun.com/CTt8HYKc 密码：254jp6
https://blog.csdn.net/musio777/article/details/135964396

优化浏览器主线程：https://blog.csdn.net/wangfeijiu/article/details/137948341

//webpack: https://juejin.cn/post/7170852747749621791#heading-2
// https://juejin.cn/post/6893097741258326030
// https://zhuanlan.zhihu.com/p/635396848

混入模式：https://segmentfault.com/a/1190000019002233

Reflect 的 receiver：https://zhuanlan.zhihu.com/p/668451280
解决捕获器函数调用过程中的 this 指向问题。
https://blog.csdn.net/Stubborn_bull/article/details/117326780

熔断、限流、降级
超时、重试、密等

前端冷知识：https://github.com/akira-cn/FE_You_dont_know

手写面试题：https://blog.csdn.net/q95548854/article/details/128373307
https://blog.csdn.net/2401_84411323/article/details/138861093
react 面试题:https://blog.csdn.net/jyl919221lc/article/details/130285333

// react 源码、hooks keep-alive、umi、
// Vue3 源码
设计模式
实现 axios

在 JavaScript 中，‌mixin 是一种用来复用组件选项的方式，‌ 它允许将一组组件选项对象合并到另一个组件的选项对象中，‌ 从而实现对组件功能的复用和扩展。‌ 这种技术在 Vue.js 中特别常见，‌ 通过 mixin，‌ 可以避免在多个组件中重复编写相同的逻辑或方法。‌Mixin 提供了一种灵活的代码复用机制，‌ 使得开发者能够更高效地组织和利用代码。‌
Mixin 的优点在于它有助于减少系统中的重复功能，‌ 增加函数复用性。‌ 通过在 Mixin 中维持共享功能，‌ 可以专注于实现系统中真正不同的功能，‌ 从而轻松避免任何重复。‌ 然而，‌Mixin 也有其缺点，‌ 比如将功能注入对象原型中可能导致原型污染和函数起源方面的不确定性。‌
在 Vue.js 的实现中，‌mixin 的功能是通过 mergeOptions 函数来合并配置到组件选项上的。‌ 例如，‌ 可以通过定义一个 mixin 对象，‌ 并将其作为参数传递给 Vue 的 mixin 方法，‌ 这样该 mixin 中的选项就会被合并到 Vue 实例的选项中。‌ 这种方式使得开发者能够灵活地扩展和复用组件的功能

低码平台

Object.getPrototypeOf()
Object.getOwnPropertyDescriptor()
Object.getOwnPropertyDescriptors()
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
obj.hasOwnProperty()
.isPrototypeOf(..)

// promise、ajax、继承、Diff、LOD

https://zhuanlan.zhihu.com/p/690322740
https://www.jb51.net/javascript/315766xjk.htm

禁止 iframe 嵌入
1、window.location != top.location
2、nginx X-Frame-Options DENY SAMEORIGIN、
add_header Cache-Control no-cache;
add_header X-Frame-Options DENY;

如果对象无法响应某个请求，它会把这个请求委托给它的构造器的原型

手动触发事件更好的做法是 IE 下用 fireEvent，标准浏览器下用 dispatchEvent 实现。

delete 删除对象的属性、数组元素
length 可以清空数组

const event = new Event('click') new KeyboardEvent('key', '')
div.dispatchEvent(event)

分组后面有量词的话，分组最终捕获到的数据是最后一次的匹配。
如果当多个贪婪量词挨着存在，并相互有冲突时，先下手为强。
/can|candy/，去匹配字符串 "candy"，得到的结果是 "can"，因为分支匹配也是惰性的
但是，全匹配会造成回溯，上面的例子加上^$
search 和 match，会把字符串转换为正则的。
search() 方法返回第一个匹配项的索引
exec 和 test，如果有 g，每一次匹配完成后，都会修改 lastIndex。如果没有 g，自然都是从字符串第 0 个字符处开始尝试匹配
split 第二个参数，表示结果数组的最大长度
正则使用分组时，结果数组中是包含分隔符的
优化：
1、使用具体型字符组来代替通配符，来消除回溯
2、当我们不需要使用分组引用和反向引用时，此时可以使用非捕获分组
3、独立出确定字符
4、提取分支公共部分
5、减少分支的数量，缩小它们的范围

document.addEventListener(
  'DOMContentLoaded',
  function () {
  callback()
  },
  false
  );

put: 全部更新
patch：部分更新

utc 时间：协调世界时，又称世界统一时间、世界标准时间、国际协调时间。比北京时间慢 8 小时

# script type

<script type="module">
<script type="importmap">
      {
        "imports": {
          "vue@2/": "https://cdn.jsdelivr.net/npm/vue@2.0.0/dist/vue.esm-browser.js",
          "vue@3/": "https://cdn.jsdelivr.net/npm/vue@3.0.0/dist/vue.esm-browser.js"
        }
      }
</script>

动态生成 js 内容，可以通过 import()引入

作用域：查找变量的一种规则 RHS LHS
闭包：在函数运行完毕后继续访问这个函数作用域（其变量）的一种方法。

400 （错误请求） 服务器不理解请求的语法。
401 （未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
403 （禁止） 服务器拒绝请求。
404 （未找到） 服务器找不到请求的网页。
405 （方法禁用） 禁用请求中指定的方法。
406 （不接受） 无法使用请求的内容特性响应请求的网页。
407 （需要代理授权） 此状态代码与 401（未授权）类似，但指定请求者应当授权使用代理。
408 （请求超时） 服务器等候请求时发生超时。
409 （冲突） 服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。
410 （已删除） 如果请求的资源已永久删除，服务器就会返回此响应。
411 （需要有效长度） 服务器不接受不含有效内容长度标头字段的请求。
412 （未满足前提条件） 服务器未满足请求者在请求中设置的其中一个前提条件。
413 （请求实体过大） 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。
414 （请求的 URI 过长） 请求的 URI（通常为网址）过长，服务器无法处理。
415 （不支持的媒体类型） 请求的格式不受请求页面的支持。
416 （请求范围不符合要求） 如果页面无法提供请求的范围，则服务器会返回此状态代码。
417 （未满足期望值） 服务器未满足”期望”请求标头字段的要求。

# getElementBy 与 querySelector

getElement(s)Byxxxx 获取的是动态集合，querySelector 获取的是静态集合。
动态就是选出的元素会随文档改变，静态的不会 取出来之后就和文档的改变无关了。
querySelector：[object NodeList] CSS 选择器
getElementBy：[object HTMLCollection] 单一的 ClassName tagName id

# URLSearchParams

https://blog.csdn.net/qq_72935001/article/details/131154797
// 创建 URLSearchParams 对象
const params = new URLSearchParams(window.location.search);
// 获取参数值
const name = params.get('name');

# 禁止开发者操作网页上的 DOM 对象

1、用 worker 隔离

```
function execturCode(code) {
    let b = new Blob([code])
    let url = URL.createObjectURL(b)
    const worker = new Worker(url);
    return worker;
}
```

2、ShadowDOM
document.body.attachShadow({mode: 'closed'});

# CSS

initial
inherit
属性计算过程 Computing Style

- 声明：作者样式表、浏览器默认样式表
- 层叠：解决样式冲突
  - 优先级
    - 作者样式表 !important
    - 浏览器样式表 !important
    - 作者普通样式
    - 浏览器样式
  - 特定性
    （0 或 1，？，？，？）
  - 源次序
- 继承
- 默认

# 网络

navigator.connection
window.addEventListener('online', function() {})
window.addEventListener('offline', function() {})
navigator.connection.addEventListener('change', function() {})

# 循环时间对比

for（时间短）≈ while < < for of < forEach < map

# 字符串与数字占用内存对比

1. 字符串（a）
   字符串在 JavaScript 中是一个字符序列，每个字符通常占用 2 个字节（16 位），因为 JavaScript 的字符串是基于 UTF-16 编码的。
   例如，字符串 "a" 占用 2 个字节（1 个字符），如果是 "abc"，则占用 6 个字节（3 个字符）。
2. 数字（1）
   在 JavaScript 中，所有数字（包括整数和浮点数）都使用 64 位浮动点表示（即 8 个字节），遵循 IEEE 754 标准。
   因此，数字 1 占用 8 个字节，无论它是整数还是浮动数。
   比较：
   字符串 a：通常占用 2 个字节。
   数字 1：占用 8 个字节。

# https 原理（握手过程）

# http1 和 http2 有什么区别，http2 优势

# http 常见返回码及其含义

# http 缓存控制，协商缓存相关的几个头部的之间的优先级关系

# 什么是 cors？为什么要用 cors？

# xss 是什么？如何防范？具体例子，jsonp 如何防止 xss？

# cookie 有什么用？存在什么问题？如何解决？crsf 如何防范？

# dns 寻址过程？简述 cdn 原理

# 谈下 vue 和 react 的差异

# 谈下对 react hook 的理解

# 谈下对 typescript 的理解

# 谈下对前端微服务的理解，有什么好处，有什么坏处

# 谈下对 serverless 架构的理解

# 谈下 react fiber 的理解

# 浏览器输入 url 后流程，尽可能详细

# 前端适配方案

方案 | 核心思路 | 使用场景 | 优点 | 缺点
媒体查询（Media Query） | 用 CSS 判断设备宽度等条件，切换样式 | 响应式布局 | 简单、灵活、广泛兼容 | 样式重复多、维护成本高
rem + flexible.js | 根节点 font-size 动态设置，实现等比缩放 | 移动端 | 单位统一、兼容主流机型 | 依赖 JS 动态设置，部分布局不精准
vw/vh 视口单位 | 页面元素按视口宽度百分比设置 | 移动端、H5 活动页 | 原生支持、代码简洁 | 部分小屏设备精度问题
自适应布局 + 百分比 + 弹性盒（flex/grid） | 使用布局系统自适应 | 移动/PC 混合开发 | 弹性强、可组合 | 小屏适配细节多
响应式框架（如 Tailwind、Bootstrap） | 使用内置断点类名切换布局 | PC + 移动混合站点 | 快速上手，社区活跃 | 灵活性低，依赖框架设计

# 谈下 mobx 和 redux 的差异和选择

中小型选 mobx
大型选 redux

# 如果让你从零主导一个项目，描述下整体思路，前端后端，开发到部署

# 如果让你搭建一套前端监控方案，具体思路

Navigator.sendBeacon

# 如何定位内存泄露

chrome Dev
Memory：snapshot、timeline、、sample、detached
Performance：call tree

# 随机字符

Math.random().toString(16).slice(2,8).padEnd(6, '0')
最长 16 位

# 只有一个地方引用传递

export let a = 1;
import {a} from '' // 改变 a 会影响上面
