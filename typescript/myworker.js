// self 是一个预定义的全局变量，用于引用 WorkerGlobalScope 对象。它是固定的，不能更改或重新赋值。
// WorkerGlobalScope 对象表示 Web Worker 的全局作用域，类似于浏览器中的 window 对象。
// 因为 Web Worker 运行在独立的线程中，与主线程分离，所以它有自己的全局作用域。通过 self 可以访问 Web Worker 的全局属性和方法，
self.onmessage = function(ev) {
    console.log('123123',ev.data);
    self.postMessage('ho');
    const sharedbuffer = ev.data;
    // 在共享内存上建立视图
    const shardArray = new Int32Array(sharedbuffer);
}
