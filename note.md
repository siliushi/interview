React源码
Vue3

源码+视频
URL组成：


webgl

react/vue源码
网络


搭一个博客

tree-shaking
v8引擎
node.js

css选择器优先级
计算机网络：
https://www.bilibili.com/video/BV1t34y1d7yA?p=30&vd_source=8e6dfd9fb6e70ce8104f69d8d3ea1703
https://blog.csdn.net/m0_49635911/article/details/137932222

import *

https://juejin.cn/post/7398933999319990291

Jsfuck 
Js 1k
代数效应

散列，快速移动监听不到

jsperf

迭代器：https://juejin.cn/post/7401408756221542426

低码
https://github.com/maqi1520/react-antd-low-code


string、boolean、number、null、undefined 和  object symbol
函数、数组都是object的子类
不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都为 0 的话会被判 断为 object 类型，null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回“object”

# js
作用域RHS和LHS
词法作用域查找只会查找一级标识符
new Function(..)
with给obj赋值一个没有的属性，非严格模式下会创建一个全局属性并赋值
变量和函数，函数会首先被提升，然后才是变量，在后面的函数声明还是可以覆盖前面的
声明和执行两步，先声明变量，赋值留在原地等待执行
动态作用域，不关心函数是如何声明以及在何处声明,只关心它们从何处调
箭头函数继承了上层函数的this绑定，根据外层（函数或者全局）作用域来决 定 this。
this被自动定义在所有函数的作用域中
直接执行函数，函数内部的this都指向全局，严格模式，全局对象将无法使用默认绑定，因此 this 会绑定 到 undefined
this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。
this 是在运行时进行绑定的
严格模式与调用位置无关，与定义有关
new > 显示 > 隐士 > 默认
null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值 在调用时会被忽略，实际应用的是默认绑定规则，相当于直接调用函数，且函数内部没有this
赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是foo()而不是p.foo()或者o.foo()
如果要判断一个运行中函数的 this 绑定，就需要找到这个函数的直接调用位置。找到之后 就可以顺序应用下面这四条规则来判断 this 的绑定对象。 
1. 由 new 调用？绑定到新创建的对象。 
2. 由 call 或者 apply（或者 bind）调用？绑定到指定的对象。 
3. 由上下文对象调用？绑定到那个上下文对象。
4. 默认：在严格模式下绑定到 undefined，否则绑定到全局对象。
赋值，只要是对象（属性是对象也算），修改属性会影响原对象
Object.preventExtensions(obj)
判断属性是否在对象里: in或者hasOwnProperty
ES6 中的符号 Symbol.iterator 来获取数组的 @@iterator 内部属 性。var it = myArray[Symbol.iterator]()
obj.propertyIsEnumerable('a')
Object.assign浅复制，不会复制属性描述，=会复制属性描述

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
var a = new Boolean( false ); a是true值
null和undefined在==情况下相等，和其他都不想等
加法转字符串
相等判断转数字
null 和 undefined 不能够被封装（boxed），Object(null)和 Object() 均返回一个常规对象。
""、"\n"（或者 " " 等其他空格组合）等空字符串被 ToNumber 强制类型转换为 0。null转number为0
对象和数组的比较操作会先执行toPrimitive
ReferenceError SyanxError TypeError URIError EvalError RangeError
逗号运算符允许你在一行代码中执行多个表达式，并返回最后一个表达式的值。
优先级：== > && > || > (?:) > =
从高到低
基本：x++,x--,
一元：+(正号),-（负号）,!,++x,--x
乘除：*,/,%
加减：+,-
关系和类型：<,>,<=,>=
相等：==,!=
逻辑与：&&
逻辑或：||
最后：=,*=,/=,%=,+=,-=

# 取整数和小数
console.log(parseInt(0.00000001));  // 1
console.log(parseInt(9000000000000000000000)); // 9
这是因为，0.00000001.toString() === 1e-8而1000000000000000000000..toString() === 1e+21。
parseInt的缺陷：1、先转成字符串，2、科学计数法不准
第一种：
Math.round是四舍五入的，Math.ceil是向上取整，Math.floor是向下取整
如果是负数，要使用Math.ceil，如果是正数，则使用Math.floor
第二种：
取整数：Math.trunc()
第三种：
let num = 3.75;
console.log(num | 0); // 3
num = -num;
console.log(num | 0); // -3

# BroadcastChannel
BroadcastChannel只能用于同源的页面之间进行通信，而window.postMessage却可以用于任何的页面之间

# showDirectoryPicker

# 宏任务 微任务 同步任务先执行然后才是宏微任务
宏任务（Macrotask）较大的任务，通常是由宿主环境（如浏览器或Node.js）发起的
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
同步任务->微任务->UI渲染->宏任务第一个任务->微任务->UI渲染
事件循环是JavaScript运行时的核心机制，它负责调度和执行任务。其基本过程如下：
从宏任务队列中取出第一个任务并执行。
检查并执行所有的微任务，直到微任务队列为空。
渲染UI（如果需要）。
重复上述步骤。


# 类型转换
如果其中有一个操作数为string，则将另一个操作数隐式的转换为string，然后进行字符串拼接得出结果。
如果操作数为对象({})或者是数组([])这种复杂的数据类型，那么就将两个操作数都转换为字符串，进行拼接
String([]) //[]进行字符串转换得到结果为""
String({}) //{}进行字符串转换得到结果为"[object Object]"
如果操作数是像boolean这种的简单数据类型，那么就将操作数转换为number相加得出结果

https://share.weiyun.com/CTt8HYKc 密码：254jp6
https://blog.csdn.net/musio777/article/details/135964396

优化浏览器主线程：https://blog.csdn.net/wangfeijiu/article/details/137948341


// 周六
//webpack: https://juejin.cn/post/7170852747749621791#heading-2
// https://juejin.cn/post/6893097741258326030
// https://zhuanlan.zhihu.com/p/635396848

混入模式：https://segmentfault.com/a/1190000019002233

Reflect的receiver：https://zhuanlan.zhihu.com/p/668451280
解决捕获器函数调用过程中的this指向问题。
https://blog.csdn.net/Stubborn_bull/article/details/117326780

熔断、限流、降级
超时、重试、密等

前端冷知识：https://github.com/akira-cn/FE_You_dont_know

手写面试题：https://blog.csdn.net/q95548854/article/details/128373307
https://blog.csdn.net/2401_84411323/article/details/138861093
react面试题:https://blog.csdn.net/jyl919221lc/article/details/130285333

// react源码、hooks keep-alive、umi、
// Vue3源码
设计模式
实现axios

在JavaScript中，‌mixin是一种用来复用组件选项的方式，‌它允许将一组组件选项对象合并到另一个组件的选项对象中，‌从而实现对组件功能的复用和扩展。‌ 这种技术在Vue.js中特别常见，‌通过mixin，‌可以避免在多个组件中重复编写相同的逻辑或方法。‌Mixin提供了一种灵活的代码复用机制，‌使得开发者能够更高效地组织和利用代码。‌
Mixin的优点在于它有助于减少系统中的重复功能，‌增加函数复用性。‌通过在Mixin中维持共享功能，‌可以专注于实现系统中真正不同的功能，‌从而轻松避免任何重复。‌然而，‌Mixin也有其缺点，‌比如将功能注入对象原型中可能导致原型污染和函数起源方面的不确定性。‌
在Vue.js的实现中，‌mixin的功能是通过mergeOptions函数来合并配置到组件选项上的。‌例如，‌可以通过定义一个mixin对象，‌并将其作为参数传递给Vue的mixin方法，‌这样该mixin中的选项就会被合并到Vue实例的选项中。‌这种方式使得开发者能够灵活地扩展和复用组件的功能


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


禁止iframe嵌入
1、window.location != top.location
2、nginx X-Frame-Options  DENY SAMEORIGIN、
add_header Cache-Control no-cache;
add_header X-Frame-Options DENY;


如果对象无法响应某个请求，它会把这个请求委托给它的构造器的原型

手动触发事件更好的做法是IE下用fireEvent，标准浏览器下用dispatchEvent实现。

delete删除对象的属性、数组元素
length可以清空数组

const event = new Event('click')  new KeyboardEvent('key', '')
div.dispatchEvent(event)

分组后面有量词的话，分组最终捕获到的数据是最后一次的匹配。
如果当多个贪婪量词挨着存在，并相互有冲突时，先下手为强。
/can|candy/，去匹配字符串 "candy"，得到的结果是 "can"，因为分支匹配也是惰性的
但是，全匹配会造成回溯，上面的例子加上^$
search 和 match，会把字符串转换为正则的。
search() 方法返回第一个匹配项的索引
exec 和 test，如果有g，每一次匹配完成后，都会修改 lastIndex。如果没有 g，自然都是从字符串第 0 个字符处开始尝试匹配
split第二个参数，表示结果数组的最大长度
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


utc时间：协调世界时，又称世界统一时间、世界标准时间、国际协调时间。比北京时间慢8小时


# script type
<script type="module">
<script type="importmap">


作用域：查找变量的一种规则RHS LHS
闭包：在函数运行完毕后继续访问这个函数作用域（其变量）的一种方法。

上卷，class
中卷，worker 288
下卷，集合 188