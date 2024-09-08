var res = [];
// response(..)从Ajax调用中取得结果数组
function response(data) {
  // 一次处理1000个
  var chunk = data.splice(0, 1000);
  // 添加到已有的res组
  res = res.concat(
    // 创建一个新的数组把chunk中所有值加倍
    chunk.map(function (val) {
      return val * 2;
    })
  );
  // 还有剩下的需要处理吗？
  if (data.length > 0) {
    // 异步调度下一次批处理
    setTimeout(function () {
      response(data);
    }, 0);
  }
}
// ajax(..)是某个库中提供的某个Ajax函数
ajax("http://some.url.1", response);
ajax("http://some.url.2", response);
