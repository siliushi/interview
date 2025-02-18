[toc]

# 零宽字符或者幽灵字符

# 3 种编程思想

OOP 面向对象编程 Object Oriented Programing
关注整个程序里的事物
FOP 面向函数编程 Function Oriented Programing
关注整个程序里的运算
POP 面向过程编程 Procedure Oriented Programing
按照步骤，一步一步编程

# 概念

ES 概念、语法、内部方法
runtime 运行时
浏览器、node.js 小程序
web api

js

# navigator.clipboard

navigator.clipboard.writeText()
navigator.clipboard.readText().then(text => {})

<!-- 粘贴 -->
<div class="editor" contenteditable></div>
document.addEventListener('paste', function(e) {
    <!-- 当粘贴的是文件的时候下面才有值 -->
    if(e.clipboardData.files.length > 0) {
        e.preventDefault();
        const file = e.clipboardData.files[0]
        const reader = new FileReader();
        reader.onload = e => {
            const img = document.createElement('img')
            img.src = e.target.result;
            document.querySelector('body').appendChild(img);
        }
        reader.read(file)
    }
})

# 访问器 待确认？对象的方法的,属性和方法

第一种：传统的函数表达式，obj.get()
get: function() {}
第二种：ES6 中的一种语法糖，obj.get
get() {}

# 真随机：物理世界

计算机 01 的二进制，如果要在计算机里面实现真随机需要借助设备，比如光电、量子等
伪随机

- 种子
  Java 里的 new Random(种子)
  JS：Math.random() // 浏览器自带种子
- 动态概率

# 用 void 0 代替 undefined

null 等关键字不能被当成变量使用，但是 undefined 可以被赋值，window 下面是只读的，但是局部作用域是可写的

# 网络状态

navigator.connection
navigator.onLine
window.addEventListener('online', 网络在线)
window.addEventListener('offline', 网络不在线)
navigator.connection.addEventListener('change', 网络变化)

# 面向对象

面向对象就是对具象世界的抽象表达，过程就叫面向对象设计，将设计转换成具体的类的过程叫做面向对象编程
对象创建时、动作产生时

# CSS

- 混合占位
- houdini
- filter
  filter 给图片像素加阴影，box-shadow 是给整个盒子加阴影
  滤镜，针对元素中的像素点进行计算
  blur(10px)高斯模糊算法
  hue-rotate(45deg)
  grayscale(1)黑白
  filter：可以组合
  backdrop-filter 磨砂玻璃
- clip-path
  裁剪，可以把元素裁剪成任意想要的形状
  inset、circle、ellips、polygon
- 模块化，用@import 导入
- stick 黏性定位
  包含块
  最近可滚动元素
- border-image
  border-image-slice 数字
  border-image-repeat
- write-mode：lr, margin-block-start: -30px; 数字作为一个整体：text-combine-upright: all;
- p 元素有隔行
- 图片裁剪上传
  - FileReader
  - canvas drawImage
  - 拖拽 e.dataTransfer.items，选择：e.target.files
- 动画，数字经过一段时间便成另一个数字
- 时间函数

CSS 预编译器/前处理器 CSS 后处理器
前处理：Sass、Less、Stylus
后处理器： cssnano(css 压缩)、purgecss(去掉没用的 css)、autoprefix

# filter

drop-shadow()
blur()
hue-rotate()
contrast()对比度
grayscale(1)灰白

# 行盒截断样式

box-decoration-break: clone;

# pagevisibility

当浏览器切换 tab 时，之前页面的复杂耗时的操作优化最少 1s 中执行一次

# 判断奇偶，求模，求余

function isOdd(n) {
// 判断是否时奇数
return n % 2 === 1 || n % 2 === -1;
}
console.log(isOdd(-3))
余数都是使用的欧几里德的求余法
a % b = a - b _ p
p = a/b 的整数部分
5 % 2 = 5 - 2 _ (5/2) = 1
-5 % 2 = -5 - 2 \* (-5/2) = -1

求模
a mod b = a - b _ p
p: a/b 的商（向下取整）
-5 mod 2 = -5 - 2 _ (-5/2) = 1

# TS

类型演算

# 高阶函数

传入一个或多个函数，返回一个函数。表达的是运算的缺失和延续

# 滤镜

**故障波纹动效**
湍流滤镜 Perlin noise
canvas
css
svg

# Audio

音频上下文 AudioContext
处理节点

# console.log 显示的问题，当显示一个复杂数据，浏览器为了优化性能，折叠输出，当点击展开是才会真正读区变量

let obj = [{a: 1}, {b: 2}]
console.log(obj)
obj[0].a = 3
console.log(obj)
可以用 debugger 调试或者 string 输出

# 事件循环

浏览器的进程模型
进程：程序运行需要有它自己专属的内存空间，可以把这块内存空间简单的理解为进程
每个程序至少有一个进程，进程之间相互独立，即使要通信也要双方同意

线程：有了进程后就可以运行程序的代码了。运行代码的人称之为线程
一个进程至少有一个线程，所以在进程开启后会自动创建一个线程来运行代码，该线程称之为主线程。主线程结束，整个程序就结束了
如果程序需要同时执行多块代码，主线程就会启动更多的线程来执行代码，所以一个进程中可以包含多个线程。

浏览器有哪些进程和线程
浏览器是一个多进程多线程的应用程序，
为了避免相互影响，为了减少连环崩溃的几率，当启动浏览器后，它会自动启动多个进程。
浏览器进程（主进程）：主要负责界面显示，用户交互、子进程管理等。浏览器进程内部会启动多个线程处理不同的任务。
网络进程（子进程）：负责加载网络资源，网络进程内部会启动多个线程来处理不同的网络任务。
渲染进程（子进程）：渲染进程启动后，会开启一个渲染主线程，主线程负责执行 HTML、CSS、JS 代码。默认情况下，浏览器会为每个标签页开启一个全新的渲染进程，以保证不同标签页之前互不影响。

将来一个站点一个进程
https://chromium.googlesource.com/chromium/src/+/main/docs/process_model_and_site_isolation.md#Modes-and-Availability

## 渲染主线程，事件循环发生在这里

渲染主线程是浏览器中最繁忙的线程，需要它处理的任务包括但不限于：
解析 HTML
解析 CSS
计算样式
布局
处理图层
每秒把页面画 60 次
执行全局 JS 代码
执行事件处理函数
执行计时器的回调函数

浏览器
shell：外壳
core：内核
浏览器进程 - 浏览器主进程 - GPU 进程 - 第三方插件进程 - 渲染进程

渲染线程 - GUI 渲染线程 - js 解析引擎线程 - 事件触发线程 - 定时器触发线程 - 异步网络请求线程

问什么渲染进程不适用多个线程来处理？

渲染线程如何调度任务：消息队列

1、在最开始的时候，渲染主线程会进入一个无限循环
2、每一次循环会检查消息队列中是否有任务存在，如果有，就取出第一个任务执行，执行完一个后就进入下一次循环，如果没有，则进入休眠状态
3、其他所有线程（包括其他进程的线程）可以随时向消息队列添加任务。新任务会加到消息队列的末尾。在添加新任务时，如果主线程是休眠状态，则会将其唤醒以继续循环拿取任务。

W3C Event loop
谷歌 Message Loop

异步：代码在执行过程中，会遇到一些无法立即处理的任务，比如：
计时器 setTimeout setInterval
网络 xhr fetch
用户操作后需要执行的任务 addEventListener

计时线程：计时结束才会把任务添加到消息队列

如何理解 JS 的异步?
JS 是一门单线程的语言。这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。而渲染主线程承担着诸多的工作，渲染页面、执行 JS 都在其中运行。
如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象。
所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程调度执行。在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。

js 为何会阻碍渲染？

任务优先级
两个任务队列
同一个类型的任务必须在同一个队列，不同类型的任务可以分属于不同的队列
浏览器必须准备好一个微队列，微队列中的任务优先所有其他任务执行

延时队列 优先级中
交互队列 优先级高
微队列 优先级高

阐述一下 JS 的事件循环
事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。在 Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行。

JS 中的计时器能做到精确计时吗?为什么?
不行，因为:
1、计算机硬件没有原子钟，无法做到精确计时，计算机是利用 cpu 寄存器计时
2、操作系统的计时函数本身就有少量偏差，由于 JS 的计时器最终调用的是操作系统的函数，也就携带了这些偏差
3、按照 W3C 的标准，浏览器实现计时器时，如果嵌套层级超过 5 层，则会带有 4 毫秒的最少时间，这样在计时时间少于 4 毫秒时又带来了偏差 kMaxTimerNestingLeveL = 5
4、受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来了偏差

单线程是异步产生的原因
事件循环是异步的实现方式

总结：
浏览器的进程模型，启动多个进程进行隔离，渲染进程，主线程，队列 事件循环，同步阻塞，异步实现线程用不阻塞，多个队列

# 渲染原理

渲染：html 字符串 渲染 像素信息

渲染时间点
网络线程-通信-渲染任务
渲染主线程-执行渲染任务

渲染流水线
1、解析 HTMl，DOM 树、CssOM 树
document.styleSheets
给所有 div 添加 border document.styleSheets[0].addRule('div', 'border: 1px solid red')

html 解析过程中遇到 css 代码怎么办？
为了提高解析效率，浏览器会启动一个预解析器率先下载和解析 css，css 不会阻塞 html 解析
html 解析过程中遇到 JS 代码怎么办？
渲染主线程遇到 JS 时必须暂停一切行为，等待下载执行完后才能继续。预解析线程可以分担一点下载 js 的任务。因为有可能会改变之前 DOM

2、样式计算 Computed Style
css 属性值的计算过程：层叠、继承
视觉格式化模型：盒模型、BFC、块

3、布局 Layout
位置相对包含块的
宽高百分比是在布局计算的，不是在样式计算中
DOM 树和 Layout 树不一定一一对应
1、display：none，不存在 Layout 树
2、::before，不存在 DOM 树

**内容必须在行盒中，行盒和块盒不能相邻，匿名行盒、匿名块盒**

Navigator(Gecko)
Opera(Preston/Blink)
IE(Trident) / Edge(Chromium)
FireFox(Gecko)
Safari(Webkit)
Chrome(Webkit , Chromium , Blink)

电脑：冯诺依曼

# html

超文本标记语言，描述页面结构

问什么需要语义化？
1、为了 seo 搜索引擎优化
2、为了让浏览器理解网页，阅读模式、语音模式

muted 静音会自动播放

<img usemap="#solarMap">
<map name="solarMap">
    <area shape="" coords="" href="" alt="">
</map>
