# 优化主线程的执行
setTimeout 延迟加载 （使用不当可能适得其反）
web worker 多线程 （不能操作dom，主要计算密集型的任务）不能直接访问 DOM，也不能执行一些涉及 DOM 操作的代码。
requestIdleCallback 帧空闲时运行 （react18带🔥的，低优先级任务）
requestAnimationFrame 每帧都会运行 （主要做动画效果调优）

帧（Frame）是指一幅静态图像或一帧图像。
帧率（frame rate）表示每秒渲染的图像帧数。人眼对于连续视觉变化的感知能力通常被认为是每秒24到30帧。这意味着当连续的静态图像以每秒24到30帧的速度在屏幕上播放时，人眼会感知到流畅的运动和连续的动画效果。较高的帧率可以提供更流畅的动画效果，使用户感觉到连贯和真实的运动。当帧率高于30帧时，人眼对于连续动画的感知能力有所限制，因此超过这个帧率对大多数人来说没有明显的区别。
浏览器的主线程是一个单线程，负责处理页面渲染、用户交互和执行 JavaScript 代码的线程。它按照任务队列（task queue）中的顺序依次执行任务（FIFO）。当任务被添加到任务队列中时，主线程会处理当前的任务，然后再处理下一个任务。
如果一个任务执行时间过长，它会阻塞主线程对页面的渲染，导致页面变得卡顿或不响应。

浏览器帧率和显示器帧率
显示器的帧率（也称为刷新率）是指显示器每秒钟刷新屏幕的次数。它通常以赫兹（Hz）为单位表示，例如60 Hz、120 Hz或144 Hz。显示器的帧率决定了它能够显示的最大帧数。

浏览器帧率是指在网页浏览器中渲染和显示网页内容的帧率。它表示浏览器每秒钟更新屏幕上的内容的次数。尽管60帧/秒是一种常见的标准，但浏览器的帧率并不仅限于60帧/秒，并且可能根据不同的环境和设备而有所变化。

浏览器帧率可以受多个因素影响，包括浏览器的性能、网页的复杂程度、脚本和动画效果的使用等。浏览器的帧率可以根据设备的硬件性能、操作系统的设置和显示器的刷新率进行调整和适配。


# requestIdleCallback
是一个Web API，允许开发者在主线程空闲时去执行低优先级回调函数。这个函数的主要目的是使得开发者能够在不影响关键事件如动画和输入响应的情况下，执行后台或低优先级的任务。
window.requestIdleCallback(callback[, options]);
--callback 是一个函数，表示在空闲时段执行的回调函数。当callback被调用时，会接受一个参数 deadline，deadline是一个对象，对象上有两个属性timeRemaining，timeRemaining属性是一个函数，函数的返回值表示当前空闲时间还剩下多少时间；
didTimeout，didTimeout属性是一个布尔值，如果didTimeout是true，那么表示本次callback的执行是因为超时的原因
--options 是一个可选的配置对象，用于指定更精确的空闲条件，例如 timeout（回调函数执行的最长时间）等。

**不是每一帧都会执行，只有在浏览器主线程空闲的时候才会执行。**


requestIdleCallback回调函数: 回调函数是在主线程空闲时被调用的函数。每次调用时，都会传入一个IdleDeadline对象，该对象提供一个timeRemaining()方法，用来检测当前帧中剩余的空闲时间。

空闲时间和截止时间（deadline）: IdleDeadline对象的timeRemaining()方法返回一个DOMHighResTimeStamp，表示在执行回调函数时，在当前帧中剩余多少空闲时间（毫秒）。开发者可以使用这个时间来执行任务，并在时间耗尽前选择适当的时机终止任务，从而避免影响关键渲染或事件处理。didTimeout判断是否已经超时，如果超时将强制执行。

调度和取消回调: requestIdleCallback函数安排一个回调函数在主线程下一次空闲时被执行，并返回一个ID，可以用这个ID通过cancelIdleCallback函数取消回调。

超时: 可以给requestIdleCallback传递一个对象，其中一个属性是timeout，用来指定最长时间（毫秒）。如果 didTimeout 的值为 true，则表示回调函数在超时时间内没有执行完毕。didTimeout 参数并不会强制执行回调函数。它只是一个标识，用于告知回调函数是否超过了可用的空闲时间。

```
requestIdleCallback((deadline) => {
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
    // 执行任务
    performTask(tasks.shift());
  }
}, { timeout: 200 });
```

requestIdleCallback 注册的回调函数时，该回调函数会作为一个宏任务被添加到事件队列中。
requestIdleCallback 的回调函数在执行时是依赖于事件队列的管理的。当浏览器在空闲时段时调用。


react 并没有使用了 requestIdleCallback 来解决 stack 的问题，但 react 自主实现的调度算法与 requestIdleCallback 息息相关
- 浏览器兼容性，目前并不是所有浏览器都支持这个 API
- 触发频率不稳定
- FPS 远低于60, 这远远低于页面流畅度的要求（主要原因）


# requestAnimationFrame 
用于优化执行动画和其他循环操作的效率。它允许开发者在浏览器的下一次重绘之前调度一个回调函数，以确保动画在每一帧中都能够以最佳的性能和流畅度运行。
```
requestAnimationFrame(callback)

--参数 callback 当你的动画需要更新时，为下一次重绘所调用的函数。该回调函数会传入 DOMHighResTimeStamp 参数，该参数与 performance.now() 的返回值相同，它表示 requestAnimationFrame() 开始执行回调函数的时刻。

--返回值 一个 long 整数，请求 ID，是回调列表中唯一的标识。是个非零值，没有别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数请求。
```

requestAnimationFrame 的工作原理是，浏览器会在每一帧开始绘制之前，自动调用注册的回调函数。这意味着回调函数将与浏览器的刷新率同步，通常是每秒 60 次（60 帧/秒），以提供更平滑的动画效果。

⭐另一个 requestAnimationFrame 的优点是，它会自动处理浏览器标签页非激活或最小化的情况。当页面不可见时，requestAnimationFrame 会自动暂停，避免不必要的计算和功耗。

在动画循环中，可以更新元素的位置、改变 CSS 属性、渲染 Canvas 或 SVG 等操作。通过不断调用 requestAnimationFrame，可以创建一个连续而流畅的动画效果。

```
function animate() {
  // 动画逻辑和更新

  // 边界条件 决定何时停止执行 if(n>0){ n--;  requestAnimationFrame(animate); }
  requestAnimationFrame(animate);
}

// 启动动画
requestAnimationFrame(animate);
```
# 当使用 setInterval 或 setTimeout 来执行循环操作或动画时，存在以下问题：

1️⃣不稳定的帧率：setInterval 和 setTimeout 方法是按照指定的时间间隔执行回调函数。然而，浏览器的重绘率（屏幕刷新率）通常是固定的，例如 60 Hz（每秒 60 帧）。如果指定的时间间隔小于重绘率，那么某些帧可能会被跳过，导致动画不连续或不流畅。反之，如果时间间隔大于重绘率，动画可能会显得卡顿。

2️⃣不可预测的性能：使用 setInterval 或 setTimeout 无法准确控制每一帧的执行时间。由于 JavaScript 是单线程的，如果在某一帧执行的回调函数需要较长时间来完成，那么下一帧的回调函数可能会被延迟执行，从而导致不稳定的性能表现。这可能会导致动画的延迟、卡顿或者整体性能下降。

3️⃣响应性差：由于 setInterval 或 setTimeout 是通过定时器触发回调函数，它们不考虑浏览器的渲染过程。这意味着即使浏览器当前正在进行重绘，回调函数也会被触发。这可能导致在关键渲染时刻执行 JavaScript 代码，从而影响页面的响应性能。

⭐ 相比之下，requestAnimationFrame 是专门为动画优化而设计的方法，解决了上述问题：

1️⃣平滑的帧率：requestAnimationFrame 的回调函数会在每一帧开始绘制之前被调用，与浏览器的重绘率同步。这意味着动画将以流畅的 60 帧/秒（或其他重绘率）运行，产生连续而平滑的动画效果。

2️⃣更好的性能控制：requestAnimationFrame 的回调函数会在浏览器准备好绘制下一帧时被调用，确保每一帧的执行时间在可接受范围内。这有助于提供更稳定的性能，避免过长的回调导致的性能问题。

3️⃣更好的响应性能：requestAnimationFrame 会自动与浏览器的渲染过程同步。如果页面不可见或最小化，requestAnimationFrame 将自动暂停，避免不必要的计算和功耗。这对于提高页面的响应性能和用户体验非常重要。

