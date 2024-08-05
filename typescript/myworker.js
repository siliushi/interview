self.onmessage = function(ev) {
    console.log('123123',ev.data);
    self.postMessage('ho');
    const sharedbuffer = ev.data;
    // 在共享内存上建立视图
    const shardArray = new Int32Array(sharedbuffer);
}