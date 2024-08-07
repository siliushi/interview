React源码
Vue3
webgl
低码
数据存储字节

react源码   React源码深度解析：从理念到架构，从架构到实现，从实现到具体代码。
https://react.iamkasong.com/
https://pomb.us/build-your-own-react/



setTimeout 延迟加载 （使用不当可能适得其反）
web worker 多线程 （不能操作dom，主要计算密集型的任务）
requestIdleCallback 帧空闲时运行 （react18带🔥的，低优先级任务）
requestAnimationFrame 每帧都会运行 （主要做动画效果调优）



https://juejin.cn/post/7181356579709517861

schedule 调度 scheduler 小顶堆数据结构
render 协调 reconciler  fiber 深度优先遍历（dfs）
commit 渲染  render ReactDOM ReactArt

lane模型 优先级模型 了解二进制掩码

ClassComponent     面向对象
FunctionComponent  函数式（编译时优化，useMemo useCallback）

hooks 代数效应

event loop
message channel 宏任务 微任务




宏任务 微任务 同步任务先执行然后才是宏微任务
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

事件循环（Event Loop）
事件循环是JavaScript运行时的核心机制，它负责调度和执行任务。其基本过程如下：
从宏任务队列中取出第一个任务并执行。
检查并执行所有的微任务，直到微任务队列为空。
渲染UI（如果需要）。
重复上述步骤。



https://share.weiyun.com/CTt8HYKc 密码：254jp6
https://blog.csdn.net/musio777/article/details/135964396

优化浏览器主线程：https://blog.csdn.net/wangfeijiu/article/details/137948341


数据存储字节


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

delete只能删除对象的属性
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
