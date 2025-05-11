// 今日任务：
// 正则
// 位运算

const { exec } = require("child_process");
const { on } = require("stream");

// 前端复习，基础+React+Vue+算法+数据结构

// go在看一遍
// webgl看一遍

// ts
// webpack、babel
// curry
// 1. 创建一个用于存储订阅者的类
// 网络架构：https://www.bilibili.com/video/BV1PV4y1y7e4/
// https://www.bilibili.com/video/BV1ULS4YHETT/
// 鸿蒙：https://juejin.cn/user/1591748568287463/posts
// VSCode插件：https://juejin.cn/post/7433074030473297957
// Rollup+TypeScript：https://juejin.cn/post/7085643889733795854
// rollup、vite、webpack
// sokect
// webAssembly、webtransport：https://zhuanlan.zhihu.com/p/351248426

// https://juejin.cn/post/7344290391988502538
// https://juejin.cn/post/7341239784735473705
// https://juejin.cn/post/7350107540327022601

// 内存泄漏：https://blog.csdn.net/bingyu1024/article/details/121985639
// https://blog.csdn.net/qq_42374676/article/details/115399967

// MyPromise和async,await区别

// GPU、Singularity

// go1.23:https://juejin.cn/post/7402781870659174451
// new的过程
// 冒泡、选择、快拍、插入、归并、希尔、桶、堆、基数、计数
// 列表、队列、栈、链表、散列、字典、树、图、堆
// text/plain application/x-www-urlencoded multipart/form-data query-string xml json binary
// post get put patch delete options head conncet trace copy link unlink move

// 单利模式、发布订阅
// docker缓存机制、compose
// k8s动态扩容

// 单利、策略、代理、迭代器、发布订阅、命令、组合、享元模式、职责链、装饰者、状态、适配器

// function createBinding(obj, element) {
//   const handler = {
//     get(target, prop) {
//       return prop in target ? target[prop] : "";
//     },
//     set(target, prop, value) {
//       target[prop] = value;
//       updateView();
//       return true;
//     },
//   };

//   const updateView = () => {
//     element.value = obj.text; // 假设我们绑定的是 `text` 属性
//   };

//   // 创建代理对象
//   const proxy = new Proxy(obj, handler);

//   // 当输入框内容发生变化时，更新数据
//   element.addEventListener("input", (event) => {
//     proxy.text = event.target.value; // 更新数据
//   });

//   // 初始化视图
//   updateView();

//   return proxy;
// }

// // 示例使用
// const data = { text: "Hello, world!" };
// const inputElement = document.querySelector("#input"); // 假设是一个输入框
// const proxyData = createBinding(data, inputElement);

// random5实现random7,random7实现random5
function random5() {}
// 实现正则切分千分位

class Promise {
  constructor(executor) {
    this.status = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "resolved";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    return new Promise((resolve, reject) => {
      if (this.status === "resolved") {
        try {
          let x = onFulfilled(this.value);
          resolve(x);
        } catch (err) {
          reject(err);
        }
      }
      if (this.status === "rejected") {
        try {
          let x = onRejected(this.reason);
          resolve(x);
        } catch (err) {
          reject(err);
        }
      }
      if (this.status === "pending") {
      }
    });
  }
}
