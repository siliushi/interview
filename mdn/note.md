https://github.com/mdn/dom-examples

node.js方法
setImmediate：当前事件循环的末尾立即执行回调函数，将回调函数放置在当前事件循环的队列末尾，以确保它在下一个事件循环开始时尽快执行，而不会阻塞其他任务。
setImmediate 的执行优先级比 setTimeout 高，因为它是在当前事件循环的末尾执行的，而 setTimeout 则要等待一定的延迟时间。


offline浏览器失去网络连接时
online
pagehide
pageshow


python3 -m http.server port