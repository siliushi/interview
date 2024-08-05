// 写一个hooks
// https://juejin.cn/post/7072761358277672974


// 冒泡
function bubbleSort(arr) {
    const len = arr.length;
    for(let i =0; i < len - 1; i++) {
        for(let j = 0; j < len - 1 -i; j++) {
            if(arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        }
    }
    return arr;
}
// 迭代：while循环
// 递归：重复调用方法

// 选择排序
function selectSort(arr) {
    const len = arr.length;
    let minIndex = 0;
    for(let i = 0; i < len; i++) {
        minIndex = i;
        for(let j = i + 1; j < len; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr;
}

// 快排
function quickSort(arr) {
    const len = arr.length;
    if(len <= 1) return arr;
    const piovt = arr[Math.floor(len/2)];
    let left = [], right = [], equal = [];
    for(let i = 0; i < len; i++) {
        if(arr[i] < piovt) left.push(arr[i])
        else if(arr[i] > piovt) right.push(arr[i])
        else equal.push(arr[i])
    }
    return quickSort(left).concat(equal, quickSort(right))
}
// 插入排序
function insertSort(arr) {
    const len = arr.length;
    let preIndex, current;
    for(let i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}
function mergeSort(arr) {
    const len = arr.length;
    if(len < 2) return arr;
    let left = arr.slice(0, len >> 1);
    let right = arr.slice(len >> 1);
    return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
    let result = [];
    while(left.length && right.length) {
        if(left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    if(left.length) result = result.concat(left);
    if(right.length) result = result.concat(right);
    return result;
}

console.log(bubbleSort([2,1,5,3,7,4]))
console.log(selectSort([2,1,5,3,7,4]))
console.log(quickSort([2,1,5,3,7,4]))
console.log(insertSort([2,1,1,5,3,7,4]))
console.log(mergeSort([2,1,1,5,3,7,4]))

// 给定一个数组
function sum(arr, target) {
    let map = new Map()
    for(let i = 0; i < arr.length; i++) {
        if(map.has(target - arr[i])) {
            return [map.get(target - arr[i]), i]
        }
        map.set(arr[i], i)
    }
    return [];
}
console.log(sum([9,1,2,3,7,5], 6))

// assign value in a condition
function assign() {
    const a = [1,2,3]
    for(let i = 0, str; str = a[i++];) {
        console.log(str);
    }
}
assign()

// deep clone
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}
// WeakMap 中的键是弱引用。如果键没有其他引用，它就会被垃圾回收机制回收，从而避免内存泄漏。这在处理循环引用时尤其重要，因为我们不想因为保留对对象的引用而导致内存无法释放。
// WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
// 在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
// 讲解的地方：https://juejin.cn/post/6844903929705136141
// JSON.stringify的缺点
// 1、日期会转成字符串
// 2、NaN、infinity会转成null
// 3、undefined、function、Symbol会丢失
// 4、循环依赖会报错
function deepClone(obj, map = new WeakMap()) {
    if(typeof obj !== 'object') return obj;
    if(obj === null || obj === undefined) return obj;
    if(obj instanceof Date) return new Date(obj.getTime());
    if(obj instanceof RegExp) return new RegExp(obj);
    let temp = Array.isArray(obj) ? [] : {}
    if(map.has(obj)) {
        return map.get(obj)
    }
    map.set(obj, temp);
    for(let key in obj) {
        temp[key] = deepClone(obj[key], map)
    }
    return temp;
}
// let a = {
//     b: 1,
//     c: {
//         d: new Date()
//     }
// }
// a.e = a;
// console.log(deepClone(a))

function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
}
console.log(getType(function a() {}))


// 数组去重
// const arr1 = [1,1,2]
// console.log([...new Set(arr1)])

// Function.prototype.myCall = function(context) {
//     context = context ? context : window ||global;
//     context.fn = this;
//     const args = arguments.slcie(1)
//     const result = context.fn(...args);
//     delete context.fn;
//     return result;
// };
// Function.prototype.myApply = function(context) {
//     context = context ? context : window || global;
//     context.fn = this;
//     const args = arguments[1];
//     const result = context.fn(...args);
//     delete context.fn;
//     return result;
// }
// Function.prototype.myBind = function(context) {
//     context = context ? context : window || global;
//     context.fn = this;
//     const args = arguments.slcie(1)
//     return function() {
//         return context.fn.apply()
//     }
// }


// 深度去重
function deepUnique(arr) {
    const seen = new Set();

    function traverse(item) {
        if (Array.isArray(item)) {
            const uniqueList = [];
            for (const subItem of item) {
                const uniqueResult = traverse(subItem);
                const uniqueResultString = JSON.stringify(uniqueResult); // 将结果转成字符串以便于比较
                if (!seen.has(uniqueResultString)) {
                    seen.add(uniqueResultString);
                    uniqueList.push(uniqueResult);
                }
            }
            return uniqueList;
        } else {
            return item;
        }
    }

    return traverse(arr);
}


// 数组扁平化+深度
// 数组去重
// 防抖截流
// call、apply、bind
// 柯里化函数

// 防抖-高频事件触发后，经过一段时间，只执行一次，防抖更注重于最后一次事件的有效性
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        timer ?? clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    }
    
}
// 截流-高频事件触发时，在一段时间内，只执行一次，节流则是在一定时间内限制函数的执行次数。
function throttle(fn, delay) {
    let time = 0;
    return function(...args) {
        const now = Date.now()
        if(now - time > delay) {
            fn.apply(this, args)
            time = now;
        }
    }
}
// 深拷贝
// function deepClone(target, map = new WeakMap()) {
//     if(typeof target !== 'object') return target;
//     if(target === null) return obj;
//     if(target instanceof Date) return new Date(target);
//     if(target instanceof RegExp) return new RegExp(target);

//     let cloneObj = target.constructor();
//     map.set(target, cloneObj)
//     for(let key in target) {
//         if(target.hasOwnProperty(key)) {
//             cloneObj[key] = deepClone(target[key])
//         }
//     }
//     return cloneObj;
// }
// call、bind、apply
Function.prototype.myCall = function(context, args) {
    // if(typeof )
}
// bind-在通过bind改变this指向的时候所传入的参数会拼接在调用返回函数所传参数之前，多余参数不起作用。

// promise
class MyPromise {
    // 主要组成部分解释：
    // 状态 (state): Promise 实例有三种状态：
    
    // 'pending'：初始状态，表示尚未解决（既未完成也未失败）。
    // 'fulfilled'：表示操作成功完成，并且有一个值。
    // 'rejected'：表示操作失败，并有一个失败原因。
    // 回调队列 (onFulfilledCallbacks, onRejectedCallbacks): 这些数组存储的是待执行的成功和失败回调函数。它们在 Promise 处于 pending 状态时会被推入，待状态改变时一并执行。
    
    // resolve 和 reject: 这两个函数用于改变 Promise 的状态并调用相应的回调队列。
    
    // then 方法: 用于注册成功和失败回调函数。根据当前 Promise 的状态，立即调用相应的回调函数，或者将其放入队列等待后续调用。
    constructor(executor) {
        // 初始状态为 pending
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        // resolve 函数
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn());
            }
        };

        // reject 函数
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };

        // 执行 executor，并捕获异常
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    // then 方法
    then(onFulfilled, onRejected) {
        // 返回一个新的 Promise
        return new MyPromise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                try {
                    const x = onFulfilled(this.value);
                    resolve(x);
                } catch (error) {
                    reject(error);
                }
            } else if (this.state === 'rejected') {
                try {
                    const x = onRejected(this.reason);
                    resolve(x);
                } catch (error) {
                    reject(error);
                }
            } else if (this.state === 'pending') {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolve(x);
                    } catch (error) {
                        reject(error);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolve(x);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        });
    }
}

// 柯里化函数
function curry(fn) {
    // 获取函数需要的参数个数
    const arity = fn.length;

    return function curried(...args) {
        // 如果传入的参数个数大于或等于函数需要的参数个数，则调用函数
        if (args.length >= arity) {
            return fn(...args);
        } else {
            // 否则返回一个新的函数，继续收集参数
            return function(...moreArgs) {
                return curried(...args, ...moreArgs);
            };
        }
    };
}


// 图片蓝加载完毕- IntersectionObserve
function lazyload(imglist, preloadHeight) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                // 设置图片src
                observer.unobserve(entry.target);
            }
        })
    }, {
        rootMargin: `0px 0px ${preloadHeight}px 0px`
    })
    imglist.forEach(img => {
        if(img.getAttribute('src')) return;
        observer.observe(img);
    })
}


// 栈用来判断回文 ada
function checkPalindrom(str) {
    return str.split('').reverse().join() === str;
}
// 栈用来判断括号不匹配

Function.prototype.myBind = function(context, ...args) {
    // 保存当前函数的引用
    const fn = this;

    // 返回一个新的函数
    return function(...newArgs) {
        // 合并绑定时传入的参数和调用时传入的参数
        // const finalArgs = args.concat(newArgs);

        // 使用指定的 context 调用原函数
        // return fn.apply(context, finalArgs);
        return fn.apply(context, [...args, ...newArgs])
    };
};
Function.prototype.myCall = function(context, ...args) {
    // 如果 context 是 null 或 undefined，则将其设置为全局对象（在浏览器中是 window，在 Node.js 中是 global）
    context = context || globalThis;
    
    // 为 context 创建一个唯一的属性来保存当前函数
    const fnSymbol = Symbol('fn');
    context[fnSymbol] = this;

    // 使用 context 调用函数，并传入参数
    const result = context[fnSymbol](...args);

    // 删除临时创建的属性
    delete context[fnSymbol];

    return result;
};

Function.prototype.myApply = function(context, args) {
    // 如果 context 是 null 或 undefined，则将其设置为全局对象（在浏览器中是 window，在 Node.js 中是 global）
    context = context || globalThis;
    
    // 为 context 创建一个唯一的属性来保存当前函数
    const fnSymbol = Symbol('fn');
    context[fnSymbol] = this;

    // 使用 context 调用函数，并传入参数数组
    let result;
    if (Array.isArray(args)) {
        result = context[fnSymbol](...args);
    } else {
        result = context[fnSymbol]();
    }

    // 删除临时创建的属性
    delete context[fnSymbol];

    return result;
};


function create(obj) {
    function F(){}
    F.prototype = obj
    return new F()
}

// instanceof
function myInstanceof(target, origin) {
    let proto = target.__proto__;
    while(proto !== origin.prototype) {
        proto = proto.__proto__;
        if(!proto) return false;
    }
    return true;
}
console.log(myInstanceof(1, String))


// JSON.stringify
// 1、undefined、function、symbol丢失
// 2、NaN、infinity变成null
// 3、循环引用会报错
// 4、时间类型会变成字符串


class LimitRequest {
    constructor(limit) {
        this.limit = limit;
        this.current = 0;
        this.task = [];
    }
    request(fn) {
        if(!fn || !(fn instanceof Function)) return false;
        this.task.push(fn)
        if(this.current < this.limit) {
            this.run();
        }
    }
    async run() {
        try{
            this.current--;
            const fn = this.tash.shift()
            await fn();
        }catch(err) {
            console.log(err)
        }
        finally{
            this.current--;
            if(this.current < this.limit) {
                this.run();
            }
        }
    }
}
console.log(Object.prototype.toString.call(1).slice(8, -1))

// 柯里化函数：又称部分求值（Partial Evaluation），是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
// 3个作用
// 参数复用
// 提前返回
// 延迟计算/运行
function curry(fn) {
    const arity = fn.length; // 获取函数的参数长度

    return function curried(...args) {
        if (args.length >= arity) {
            return fn.apply(this, args); // 如果参数已经足够，调用原函数
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs)); // 否则，返回一个新的函数，继续收集参数
            }
        }
    };
}
function uncurry(f) {
    return function (...args) {
        console.log(args);
        return args.reduce((acc, arg) => acc(arg), f);
    };
}
function uncurry1() {
    let self = this
    return function() {
        return Function.prototype.call.apply(self, arguments);
    }
}
// 示例函数
function add(a, b, c) {
    return a + b + c;
}
// 使用柯里化函数
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 输出 6
console.log(curriedAdd(1, 2)(3)); // 输出 6
console.log(curriedAdd(1)(2, 3)); // 输出 6

// 二叉树遍历
// 深度: LDR、DLR、LRD
function DLR(root, res) {
    if(!root) return ;
    res.push(root.val);
    root.left && DLR(root.left, res);
    root.right && DLR(roo.right, res);
    return res;
}
function LDR(root, res) {
    if(!root) return;
    root.left && LDR(root.left, res);
    res.push(root.val);
    root.right && LDR(root.right, res);
    return res;
}
function LRD(root, res) {
    if(!root) return;
    root.left && LRD(root.left, res);
    root.right && LRD(roo.right, res);
    res.push(root.val);
    return res;
}

// 深度非递归
function DLR1(root, res) {
    let s = [root];
    while(s.length) {
        const tmp = s.shift();
        res.push(tmp.val);
        tmp.left && tmp.unshift(tmp.left);
        tmp.right && tmp.unshift(tmp.right);
    }
    return res;
}
function LDR1(root, res) {

}
function LRD1(root, res) {

}

// 二叉树的遍历-层次遍历
// 从上往下，从左到右/从右到左
var levelOrder = function(root) {
    if(!root) return [];
     let res = [];
     let q = [root];
     while(q.length > 0){
         let tmp = [];
         let temp = [];
         for(let i in q){
             let p = q[i];
             temp.push(p.val);
             p.left && tmp.push(p.left);
             p.right && tmp.push(p.right);
         }
         q = tmp;
         res.push(temp);
     }
     return res;
 };

// 继承
// 原型继承

// 经典继承

// 组合继承

// 寄生组合继承

// 多重继承

// 如何实现私有属性-闭包
class Mail{
    constructor(name) {
        let _content = '111';
        return function() {
            return _content;
        }
    }
}
const mail = new Mail();
console.log(mail())

// 发布-订阅
class Publisher {
    constructor() {
        this.subList = []
    }

    // 以电话号码作为订阅的标识
    add(phoneNumber,cb) {
        this.subList.push({
            phoneNumber,
            cb
        })
    }

    // 取消订阅
    remove(phoneNumber) {
        const index = this.subList.findIndex(item => item.phoneNumber === phoneNumber)
        this.subList.splice(index, 1)
    }
    
    // 通知
    publish(msg) {
        this.subList.forEach(item => {
            item.cb(msg)
        })
    }

    getSubscriberList() {
        console.log(this.subList)
    }
}

const publisher = new Publisher()

publisher.add(12345678 ,function (msg) {
    console.log('第一个订阅者收到了消息：' + msg)
})

let i = 1

// // 通知
// setInterval(() => {
//     publisher.publish(i++)
//     publisher.getSubscriberList()
// }, 1000)

// setTimeout(() => {
//     publisher.add(999888, function (msg) {
//         console.log('第二个订阅者收到：' + msg)
//     })
// }, 1000 * 5)

// 1px
// 1、图片
// 2、阴影
// .box-shadow-1px {
// 	box-shadow: inset 0px -1px 1px -1px #c8c7cc;
// }
// 3、伪类：transform: scaleY(0.5)

function longstr(s) {
    const len = s.length;
    let str = '', l = 0;
    for(let i = 0; i < len; i++) {
        const item = s.charAt(i);
        const index = str.indexOf(item);
        if(index === -1) {
            // 临时字串没有这个字符
            str += item;
            l = str.length > l ? str.length : l;
        } else {
            str = str.substr(index + 1) + item;
        }
    }
    return l;
}
console.log(longstr('abcdaouritbjhlfcldfkmdf'))


function feibona(num) {
    if(num === 1 || num === 2) return 1;
    return feibona(num -1) + feibona(num -2);
}
console.log(feibona(3));

var findMedianSortedArrays = function(nums1, nums2) {
    const res = merge(nums1, nums2);
    const len = res.length;
    if(res.length%2 === 0) {
        return (res[len/2 -1] + res[len/2])/2
    } else {
        return res[len >> 1]
    }
};

function merge(arr1, arr2) {
    let result = [];
    while(arr1.length && arr2.length) {
        if(arr1[0] < arr2[0]) {
            result.push(arr1.shift())
        } else {
            result.push(arr2.shift())
        }
    }
    if(arr1.length) {
        result = result.concat(arr1);
    }
    if(arr2.length) {
        result = result.concat(arr2);
    }
    return result;
}
nums1 = [1,3], nums2 = [2]
console.log(findMedianSortedArrays(nums1, nums2))

// 二分查找：要求数据是排序的，数据结构存储在连续的内存位置中：https://blog.csdn.net/m0_75134766/article/details/136587926
// 左闭右闭、左闭右开
function search(nums, target) {
    const len = nums.length;
    let left = 0, mid = 0, right = len -1;
    while(left <= right) {
        mid = left + ((right - left) >> 1)
        if(nums[mid] < target) {
            left = mid + 1;
        } else if(nums[mid] > target) {
            right = mid -1;
        } else {
            return mid;
        }
    }
    return -1;
}

// rgb转十六进制
function rgb2hex(rgb) {
    rgb = rgb.match(/\d+/g);
    function hex(num) {
        return ('0' + Number(num).toString(16)).slice(-2);
    }
    return rgb.reduce((pre,cur) => pre + hex(cur), '#').toUpperCase()
}

console.log(rgb2hex('rgb(255,255,255)'))

// 数组扁平化
// [...new Set()] 只能扁平化一级
// [].flat(层级)
function flatten(arr) {
    // 第一种： reduce
    // return arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flatten(cur) : cur), [])
    // 第二种：[]
    // return Array.isArray(arr) ? [].concat(...arr.map(flatten)) : arr;
    // 第三种：迭代
    // let result = [];
    // while(arr.length) {
    //     const top = arr.pop();
    //     if(Array.isArray(top)) {
    //         arr.push(...top)
    //     } else {
    //         result.unshift(top)
    //     }
    // }
    // return result;
    // 第四种：栈
}
console.log(flatten([1,[2,[3]]]))
// 千位符
function toTousands(num) {
    let f = 1;
    if(num < 0) f = -1;
    let integer = 0, decimal = 0;
    num = Math.abs(num).toString();
    integer = num.split('.')[0];
    let res = '';
    if(num.indexOf('.') > -1) {
        // 有小数点
        decimal = num.split('.')[1]
    }
    while(integer.length > 3) {
        res = res + ',' + integer.substr(-3);
        integer = integer.substring(0, integer.length - 3);

    }
    return (f < 0 ? '-': '') + integer + res + (decimal && ('.' + decimal));
}
console.log(toTousands(-111123123.123))

// setTimeout实现setInterval
function myInterval(fn, tiem) {
    let timer;
    function executor() {
        timer = setTimeout(() => {
            fn();
            executor
        }, time)
    }
    executor();
    return timer;
}


function search(arr, target) {
    const len = arr;
    let left = 0, mid = 0, right= arr.length - 1;
    while(left <= right) {
        let mid = left + ((right -left) >> 1)
        if(arr[mid] < target) {
            left = mid + 1;
        } else if(arr[mid] > target) {
            right = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}


// 帕累托原则，80%的搜索是对20%数据处理
function searchQ(arr, target) {
    const len = arr.length;
    for(i = 0; i < len; i++) {
        if(arr[i] === target) {
            i > 0 && ([arr[i - 1], arr[i]] = [arr[i], arr[i - 1]])
            return true;
        }
    }
    return false;
}
const a = [1,2,3,4,5];
searchQ(a, 4)
searchQ(a, 4)
searchQ(a, 3)
searchQ(a, 3)
console.log(a)



const customInstanceof = (target, origin) => {
    let proto = target.__proto__
    while (proto !== origin.prototype) {
        proto = proto.__proto__
        if (!proto) {
            return false
        }
    }
    return true
}
console.log(customInstanceof(1, Number))


function myunshift(arr, n) {
    const len = arr.length;
    for(let i = len; i > 0; i--) {
        arr[i] = arr[i-1]
    }
    arr[0] = n;
    return arr;
}
console.log(myunshift([2,3], 1));

// [].splice(起始位置，删除元素个数，添加元素)

function matrixTest(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
    arr[i] = columns;
    }
    return arr;
}
console.log(matrixTest(3,4,3))

const bb = [
    [1,2,3],
    [1,2,3],
    [1,2,3],
]
// 按行计算平均
function rows(bb) {
    const len = bb.length;
    let total = 0;
    for(let row = 0; row < len; row++) {
        for(let col = 0; col < bb[row].length; col++) {
            total += bb[row][col]
        }
        console.log(`第${row}行的平均值为：`, total/bb[row].length);
        total = 0;
    }
}
console.log(rows(bb));
// 按列计算平均
function cols(bb) {
    const len = bb.length;
    let total = 0;
    for(let row = 0; row < len; row++) {
        for(let col = 0; col < bb[row].length; col++) {
            total += bb[col][row]
        }
        console.log(`第${row}列的平均值为：`, total/bb[row].length);
        total = 0;
    }
}
console.log(cols(bb));


// 列表
// 列表是一种线性数据结构，其中的元素可以按顺序存储，并且每个元素都有一个唯一的索引，可以按照索引访问。
// 频繁访问或修改任意位置元素的场景
function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataSource = [];
    this.clear = clear;
    this.find = find;
    this.toString = toString;
    this.insert = insert
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.length = length;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
    this.contains = contains;
}
function append(element) {
    this.dataSource[this.listSize++] = element;
}
function find(element) {
    for(let i = 0; i < this.listSize; i++) {
        if(this.dataSource[i] === element) return i;
    }
    return -1;
}
function remove(element) {
    const index = this.dataSource.find(element);
    if (index > -1) {
        this.dataSource.splice(index, 1)
    }
}
function length() {
    return this.dataSource.length;
}
function front() {
    this.pos = 0;
}
function end() {
    this.pos = this.dataSource.length - 1;
}
function prev() {
    if(this.pos > 0) {
        --this.pos;
    }
}
function next() {
    if(this.pos < this.length -1) {
        ++this.pos;
    }
}
function currPos() {
    return this.pos;
}
function moveTo(pos) {
    this.pos = pos;
}
function getElement() {
    return this.dataSource[this.pos];
}
function contains(e) {
    if(this.find(e) > -1) {
        return true;
    }
    return false;
}
function clear() {
    delete this.dataSource;
    this.dataSource = [];
    this.pos = 0;
    this.listSize = 0;
}
function insert(location, e) {
    this.dataSource.splice(location, 0 ,e);
}

let l = new List();
l.append(1)
l.append(2)
l.append(3)
l.append(4)
l.clear();
console.log(l)

// 10进制转2进制
function mulBase(num, base) {
    let temp = [];
    let str = '';
    while(num) {
        temp.unshift(num % base)
        num = Math.floor(num/base)
    }
    while(temp.length) {
        str += temp.shift();
    }
    return str;
}
console.log(mulBase(12, 8))

// 判断是否是回文
function isPalindrome(word) {
    // 不用reverse的话，用数组遍历
    return word.split().reverse().join() === word;
}
console.log(isPalindrome('www'))


// 栈
// 先进后出 LIFO
function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
    this.isEmpty = isEmpty;
    this.printStack = printStack;
 }
 function push(element) {
    this.dataStore[this.top++] = element;
 }
 function peek() {
    return this.dataStore[this.top-1];
 }
 function pop() {
    return this.dataStore[--this.top];
 }
 function clear() {
    this.top = 0;
    this.dataStore = [];
 }
 function length() {
    return this.top;
 }
 function isEmpty() {
    if(!this.length()) return true;
    return false;
 }
 function printStack() {
    return this.dataStore.join(' ');
}
// function findUnmatchedParenthesis(expression) {
//     const stack = [];
//     const positions = [];

//     for (let i = 0; i < expression.length; i++) {
//         if (expression[i] === '(') {
//             stack.push(i);
//         } else if (expression[i] === ')') {
//             if (stack.length === 0) {
//                 // Unmatched closing parenthesis
//                 return `Unmatched closing parenthesis at position ${i}`;
//             }
//             stack.pop();
//         }
//     }

//     if (stack.length > 0) {
//         // Unmatched opening parenthesis
//         const unmatchedPos = stack.pop();
//         return `Unmatched opening parenthesis at position ${unmatchedPos}`;
//     }

//     return 'All parentheses are matched';
// }

// // Example usage:
// const expression = "2.3+23) / 12 + (3.14159 * 0.24)";
// const result = findUnmatchedParenthesis(expression);
// console.log(result);  // Output: Unmatched opening parenthesis at position 18


// 判断一个算术表达式中的括号是否匹配
function findUnmatchedParenthesis(expression) {
    const stack = [];
    const matchingBrackets = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (char === '(' || char === '[' || char === '{') {
            stack.push({ char, index: i });
        } else if (char === ')' || char === ']' || char === '}') {
            if (stack.length === 0) {
                // Unmatched closing bracket
                return `Unmatched closing bracket '${char}' at position ${i}`;
            }
            const top = stack.pop();
            if (top.char !== matchingBrackets[char]) {
                // Mismatched brackets
                return `Mismatched brackets: '${top.char}' at position ${top.index} and '${char}' at position ${i}`;
            }
        }
    }

    if (stack.length > 0) {
        // Unmatched opening bracket
        const unmatched = stack.pop();
        return `Unmatched opening bracket '${unmatched.char}' at position ${unmatched.index}`;
    }

    return 'All brackets are matched';
}

// Example usage:
let expression = "2.3 + 23 / 12 + (3.14159 * [0.24]";
let result = findUnmatchedParenthesis(expression);
console.log(result);  // Output: Unmatched opening bracket '[' at position 20


// 佩茨糖果盒
function removeYellowCandies(candyStack) {
    let tempStack = new Stack()
    while(!candyStack.isEmpty()) {
        const top = candyStack.pop();
        if(top !== 'yellow') {
            tempStack.push(top);
        }
    }
    candyStack.clear();
    while(!tempStack.isEmpty()) {
        candyStack.push(tempStack.pop())
    }
}
const candyStack = new Stack();
candyStack.push('red');
candyStack.push('yellow');
candyStack.push('white');
candyStack.push('yellow');
candyStack.push('red');
removeYellowCandies(candyStack)
console.log(candyStack);


// 队列
// 队列是一种线性数据结构，遵循先进先出（FIFO，First In First Out）的原则
// 用于需要按顺序处理元素的场景
// 优先队列
// 双向队列
function Queue() {
    this.dataSource = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
}
function enqueue(v) {
    // 入队
    this.dataSource.push(v)
}
function dequeue() {
    // 出队
    this.dataSource.shift();
}
function front() {
    return this.dataSource[0];
}
function back() {
    return this.dataSource[this.dataSource.length -1]
}
function toString() {
    let str = '';
    for(let i = 0; i < this.dataSource.length; i++) {
        str += this.dataSource[i]
    }
    return str;
}
function empty() {
    this.dataSource = [];
}
const fs = require('fs');
const { Script } = require('vm');
let males = new Queue();
let females = new Queue();
function getDancer() {
    let dancer = fs.readFileSync('dancer.txt', 'utf-8')
    dancer = dancer.split('\n')
    for(let i = 0; i < dancer.length; i++) {
        const v = dancer[i].split(' ');
        if(v[0] === 'F') {
            females.enqueue(v[1])
        } else {
            males.enqueue(v[1]);
        }
    }
    console.log(males)
    console.log(females)
}
getDancer()

// 基数排序，先对个位数排序，再对十位数排序

// 双向队列判断单词是否是回文
function isH(s) {
    const temp = s.split('');
    let i = 0; j = temp.length - 1;
    while(i <= j) {
        if(temp[i] !== temp[j]) {
            return false;
        }
        i++;
        j--;
    }
    return true;
}
console.log(isH('wwww'));

// 链表
// 数组被js实现成了对象，效率低，用到数组的地方可以考虑链表
// 链表是由一组节点组成的集合。每个节点都使用一个对象的引用指向它的后继。指向另一个节点的引用叫做链。

// 头节点通常用来作为链表的接入点，尾节点通常指向null。

// 单向链表（SinglyLinkedList）、双向链表（DoublyLinkedList）
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    // 向链表末尾添加一个新节点
    append(value) {
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
    // 向链表任意位置插入一个新节点
    insert(value, item) {
        const newNode = new Node(value);
        const findNode = this.find(item);
        newNode.next = findNode.next;
        findNode.next = newNode;
    }
    // 查找链表中的某个值
    find(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null; // 未找到返回 null
    }
    display() {
        let head = this.head;
        while(head) {
            console.log(head.value)
            head = head.next;
        }
    }
    delete(val) {
        let head = this.head;
        while(head) {
            if(head.next && head.next.value === val) {
                head.next = head.next.next;
                head.next.next = null;
                return;
            }
            head = head.next;
        }
    }
}

// 示例用法
const list = new SinglyLinkedList();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.delete(3)
const foundNode = list.find(3);
if (foundNode !== null) {
    console.log(`Found node with value: ${foundNode.value}`); // 输出：Found node with value: 3
} else {
    console.log('Node not found');
}

const notFoundNode = list.find(5);
if (notFoundNode !== null) {
    console.log(`Found node with value: ${notFoundNode.value}`);
} else {
    console.log('Node not found'); // 输出：Node not found
}


// 双向链表
function Node1(val) {
    this.value = val;
    this.next = null;
    this.prev = null;
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // 向链表末尾添加一个新节点
    append(value) {
        const newNode = new Node1(value);
        if (this.head === null) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    // 查找链表中的某个值
    find(value) {
        let current = this.head;
        while (current !== null) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null; // 未找到返回 null
    }

    // 打印链表中的所有值
    printList() {
        let current = this.head;
        let result = [];
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        console.log(result.join(' <-> '));
    }
}

// 循环链表
// 某个节点的next指向了之前的
class CircularLinkedList {
    constructor() {
        this.head = null;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.head.next = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }
    }

    remove(node) {
        if (this.head === this.head.next) { // Only one node
            this.head = null;
            return;
        }
        let current = this.head;
        while (current.next !== node) {
            current = current.next;
        }
        current.next = node.next;
        if (node === this.head) {
            this.head = node.next;
        }
    }

    findSurvivors(m) {
        let current = this.head;
        while (current.next !== current) { // More than one node remains
            for (let i = 0; i < m - 1; i++) {
                current = current.next;
            }
            this.remove(current);
            current = current.next;
        }
        return current.value;
    }
    isCircle() {
        // 判断链表是否有环：龟兔赛跑法，定义一个快指针、一个慢指针
        let fast = slow = this.head;
        while(fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            if(fast == slow) return true;
        }
        return false;
    }
}

function josephusProblem(n, m) {
    const circle = new CircularLinkedList();
    for (let i = 1; i <= n; i++) {
        circle.append(i);
    }

    const lastSurvivor = circle.findSurvivors(m);

    // Since the problem states that two people survive, we assume they both stand in two positions
    // that when counting out, they happen to be the last two.
    // Adding back one to lastSurvivor position to start counting from the beginning
    const survivors = [lastSurvivor, (lastSurvivor % n) + 1];

    return survivors;
}

// Example usage
const n = 41;  // Total number of people
const m = 3;   // The count at which a person is killed
const survivors = josephusProblem(n, m);
console.log(`The positions of the last two survivors are: ${survivors}`);


// 字典
// 字典是一种以键-值对形式存储数据的数据结构
function Dictionary() {
    this.add = add3;
    this.datastore = new Array();
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.count = count;
    this.clear = clear;
    this.sort = sort;
}

function add3(key, value) {
    this.datastore[key] = value;
}

function find(key) {
    return this.datastore[key];
}

function remove(key) {
    delete this.datastore[key];
}

function showAll() {
    for(let key in this.datastore.sort()) {
        console.log(key + " -> " + this.datastore[key]);
    }
}
function count() {
    var n = 0;
    for(let key in this.datastore) {
        ++n;
    }
    return n;
}
function clear() {
    for(let key in this.datastore) {
        delete this.datastore[key];
    }
}
function sort() {
    for(let key of Object.keys(this.datastore).sort()) {
        console.log(key + " -> " + this.datastore[key]);
    }
}
const d = new Dictionary();
d.add('m', 1);
d.add('k', 2);
d.sort();
d.showAll();


// 散列 P199
// 散列后的数据可以快速地插入或取用。散列使用的数据结构叫做散列表
// 两个键映射成同一个值的可能，这种现象称为碰撞
function hashTable() {
    this.table = new Array(137);
    this.simpleHash = simpleHash;
    this.showDistro = showDistro;
}

// 集合
// 集合（set）是一种包含不同元素的数据结构，集合中的元素称为成员。
// 集合中的成员是无序的；集合中不允许相同成员存在。
// 不包含任何成员的集合称为空集，全集则是包含一切可能成员的集合。
// 如果两个集合的成员完全相同，则称两个集合相等。
// 如果一个集合中所有的成员都属于另外一个集合，则前一集合称为后一集合的子集。

// 集合操作：并集、交集、补集
function Set() {
    this.dataStore = [];
    this.add = add1;
    this.remove = remove1;
    this.size = size1;
    this.union = union1;
    this.intersect = intersect1;
    this.subset = subset1;
    this.difference = difference1;
    this.show = show1;
}
function add1(val) {
    if(this.dataStore.indexOf(val) > -1) {
        return false;
    }
    this.dataStore.push(val);
    this.dataStore.sort();
    return true;
}
function remove1(val) {
    const pos = this.dataStore.indexOf(val);
    if(pos > -1) {
        this.dataStore.splice(pos, 1);
        return true;
    }
    return false;
}
function size1() {
    return this.dataStore.length;
}
function show1() {
    return this.dataStore;
}
function union1() {
    // 并集
}
function intersect1() {
    // 交集
}
function difference1() {
    // 补集
}
function subset1(set) {
    // 是否是子集
}



// list queue stack linkedlist dictionary hashtable set tree

// 树tree
// 一种非线形的数据结构，以分层的方式存储数据。
// 树用来存储具有层级关系的数据
// 树还被用来存储有序列表

// 树是一组以边连接的节点组成

// 根结点、叶子结点
// 一个节点可以有0、1或多个子节点
// 从一个节点到另一个节点的这一组边称为路径，在图中用虚线表示。以某种特定顺序访问树中所有的节点称为树的遍历。
// 树可以分为几个层次，根节点是第0层，它的子节点是第1层，子节点的子节点是第2层，以此类推。
// 树中任何一层的节点可以都看做是子树的根，该子树包含根节点的子节点，子节点的子节点等。我们定义树的层数就是树的深度。
// 每个节点都有一个与之相关的值，该值有时被称为键

// 二叉树
// 二叉树是一种特殊的树，它的子节点个数不超过两个。二叉树具有一些特殊的计算性质，使得在它们之上的一些操作异常高效。
// 比链表查找快
// 比数组添加删除快

// 二叉查找树(BST)是一种特殊的二叉树，相对值小的在左侧，大的在右侧
function treeNode(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show2 = show2;
}
function show2() {
    return this.data;
}
function BST() {
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
    this.getMin = getMin;
    this.getMax = getMax;
    this.remove = remove;
    this.getCount = getCount;
    this.getLine = getLine;
}
function insert(data) {
    let n = new treeNode(data, null, null);
    if(this.root === null) {
        this.root = n;
        return;
    }
    let current = this.root;
    while(true) {
        if(data < current.data) {
            // 插入左侧
            if(current.left === null) {
                current.left = n;
                break;
            }
            current = current.left;
        } else {
            if(current.right === null) {
                current.right = n;
                break;
            }
            current = current.right;
        }
    }
    // var n = new treeNode(data, null, null)
    // if(!this.root) {
    //     this.root = n;
    // } else {
    //     let current = this.root;
    //     let parent
    //     while(true) {
    //         parent = current;
    //         if(data < current.data) {
    //             // 左侧插入
    //             current = current.left;
    //             if(!current) {
    //                 parent.left = n;
    //                 break;
    //             }
    //         } else {
    //             current = current.right;
    //             if(!current) {
    //                 parent.right = n;
    //                 break;
    //             }
    //         }
    //     }
    // }

}
function inOrder(root) {
    root = root || this.root;
    // 遍历二叉树
    if(!root) return
    // 中序
    root.left && inOrder(root.left);
    console.log(root.show2());
    root.right && inOrder(root.right);
    // 先序
    // console.log(root.show1());
    // root.left && inOrder(root.left);
    // root.right && inOrder(root.right);
    // 后序
    // root.left && inOrder(root.left);
    // root.right && inOrder(root.right);
    // console.log(root.show1());
}
function getMin() {
    let current = this.root;
    while(current.left) {
        current = current.left;
    }
    return current.data;
}
function getMax() {
    let current = this.root;
    while(current.right) {
        current = current.right;
    }
    return current.data;
}
function remove(data) {
    this.root = removeNode(this.root, data)
}
function removeNode(node, data) {
    if(node === null) {
        return null;
    }
    if(data < node.data) {
        // 左节点
        node.left = removeNode(node.left, data);
        return node;
    }
    if(data > node.data) {
        // 右节点
        node.right = removeNode(node.right, data);
        return node;
    }
    if(node.left === null && node.right === null) {
        // 叶子节点
        return null;
    }
    if(node.left === null) {
        return node.right;
    }
    if(node.right === null) {
        return node.left;
    }
    let tempNode = getMin(node.right);
    node.data = tempNode;
    node.right = removeNode(node.right, tempNode);
    return node;
}
function getCount() {
    return numNode(this.root)
}
function numNode(node) {
    if(node === null) return 0;
    return 1+numNode(node.left) + numNode(node.right);
}
function getLine() {
    return numEdge(this.root);
}
function numEdge(node) {
    // if(node === null) return 0;
    // let count = 0;
    // if(node.left) {
    //     count +=1 + numEdge(node.left);
    // }
    // if(node.right) {
    //     count += 1 + numEdge(node.right);
    // }
    // return count;
    
    // 可以通过节点返回边
    return numNode(node) - 1;
}
// var nums = new BST();
// nums.insert(23);
// nums.insert(45);
// nums.insert(16);
// nums.insert(37);
// nums.insert(3);
// nums.insert(99);
// nums.insert(22);
// inOrder(nums.root);
// console.log(getMin(bst.root));
let nums = new BST();
nums.insert(23);
nums.insert(13);
nums.insert(25);
nums.insert(3)
nums.insert(30);
nums.insert(37);
nums.insert(99);
nums.insert(22);
// console.log(nums)
var min = nums.getMin();
let max = nums.getMax();
// console.log(min)
// console.log(max)
console.log(nums.getLine())
// inOrder(nums.root);


// 图和图算法
// 图由边的集合及顶点的集合组成
// 顶点也有权重，也称为成本。
// 如果一个图的顶点对是有序的，则可以称之为有向图。如果是无序的，则称之为无序图，或无向图。
// 图中的一系列顶点构成路径，路径中所有的顶点都由边连接。路径的长度用路径中第一个顶点到最后一个顶点之间边的数量表示。由指向自身的顶点组成的路径称为环，环的长度为0。
// “圈是至少有一条边的路径，且路径的第一个顶点和最后一个顶点相同。
// 无论是有向图还是无向图，只要是没有重复边或重复顶点的圈，就是一个简单圈。
// 除了第一个和最后一个顶点以外，路径的其他顶点有重复的圈称为平凡圈。
// 如果两个顶点之间有路径，那么这两个顶点就是强连通的，反之亦然。如果有向图的所有的顶点都是强连通的，那么这个有向图也是强连通的。

// 圈是至少有一条边的路径，且路径的第一个顶点和最后一个顶点相同。

// 我们将表示图的边的方法称为邻接表
function Vertex() {
    this.lable = label;
}

function Graph() {

}


// 堆 heap
class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.getParentIndex(index) >= 0 && this.heap[this.getParentIndex(index)] > this.heap[index]) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    }

    remove() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return root;
    }

    heapifyDown() {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.getRightChildIndex(index) < this.heap.length && this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (this.heap[index] <= this.heap[smallerChildIndex]) break;
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }

    peek() {
        if (this.heap.length === 0) return null;
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }
}

// 测试
const minHeap = new MinHeap();
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
minHeap.insert(2);

console.log(minHeap.peek()); // 输出2
console.log(minHeap.remove()); // 输出2
console.log(minHeap.peek()); // 输出3



// 高级算法
// 动态规划有时被认为是一种与递归相反的技术。递归是从顶部开始将问题分解，通过解决掉所有分解出小问题的方式，来解决整个问题。
// 动态规划解决方案从底部开始解决问题，将所有小问题解决掉，然后合并成一个整体解决方案，从而解决掉整个大问题。
// “贪心算法是一种以寻找“优质解”为手段从而达成整体解决方案的算法。这些优质的解决方案称为局部最优解，将有希望得到正确的最终解决方案，也称为全局最优解。
// “贪心”这个术语来自于这些算法无论如何总是选择当前的最优解这个事实。通常，贪心算法会用于那些看起来近乎无法找到完整解决方案的问题，然而，出于时间和空间的考虑，次优解也是可以接受的。
// 贪心算法总是会选择当下的最优解，而不去考虑这一次的选择会不会对未来的选择造成影响。

// 动态规划：初始状态、状态转移方程、无后效性
// 用来解决多阶段决策过程相关问题的一种思想，一般简称为DP（Dynamic Programming）

// 使用递归解决的可以重写为动态规划

// 最优化问题：最优化问题要求每次做出的决策能够使得活动的最终结果达到最好。也可能有问题要求最终达到的结果最差，但本质上属于同一种问题。
// 决策方案数问题：决策方案数问题要求统计所有能成功到达最终状态的决策方案种数。

// 确定题目类型是最优化问题还是决策方案数问题；
// 从题干中提取有效信息，表示过程的状态；
// 找到所有可用的决策；
// 跟据无后效性原则对任意状态i分析其前一阶段的决策；
// 设计出状态转移方程，即递推式；
// 确定初始条件的结果；
// 确定递推顺序，计算递推式。

// 斐波那契函数
// 递归
function fb(n) {
    if(n == 1 || n === 2) return 1;
    return fb(n-1) + fb(n-2)
}
// 尾递归，显著减少递归函数调用的内存和时间开销。
// 栈帧复用，递归调用是函数执行的最后一步。这意味着在调用递归函数时，当前函数的栈帧不再需要保持，可以被复用。优化后的解释器或编译器可以在递归调用时直接复用当前栈帧，而不需要创建新的栈帧，从而减少内存开销。
// 减少栈深度：通过复用栈帧，尾递归消除了对每个递归调用创建新栈帧的需求
function wfb(n, a = 1, b = 1) {
    if (n === 1) return a;
    if (n === 2) return b;
    return wfb(n - 1, b, a + b);
  }
// 迭代
function iterfb(n) {
    let last = 1;
    let nextlast = 1;
    let result = 1;
    for(let i = 3; i <= n; i++) {
        result = last + nextlast;
        last = nextlast;
        nextlast = result;
    }
    return result;
}

// 动态规划，从底往上
function dyfb(n) {
    let arr = [0,1,1];
    for(let i = 3; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i-2]
    }
    return arr[n]
}
console.log(fb(5))
console.log(wfb(5))
console.log(iterfb(5))
console.log(dyfb(5))

// 寻找最长公共子串常用于遗传学中，用于使用核苷酸中碱基的首字母对DNA分子进行描述。
function long(word1, word2) {
    const len1 = word1.length;
    const len2 = word2.length;
    let row = new Array(len1 + 1);
    for(let i = 0; i < len1 + 1; i++) {
        row[i] = new Array(len2+1).fill(0)
    }
    let max = 0, index = 0;
    for(let i = 0; i < len1 + 1; i++) {
        for(let j = 0; j < len2 + 1; j++) {
            if(i === 0 && j === 0) {
                row[i][j] = 0;
            } else if(word1[i-1] === word2[j-1]) {
                row[i][j] = row[i-1][j-1] + 1;
            } else {
                row[i][j] = 0;
            }
            if(max < row[i][j]) {
                max = row[i][j]
                index = i;
            }
        }
    }
    let str = '';
    if(!max) return str;
    for(let i = index - max; i < index; i++) {
        str+=word1[i]
    }
    return str;
}
console.log(long('abcd', 'aabc'))

// 爬楼梯
function floor(n) {
    let row = [];
    row[0] = 0;
    row[1] = 1;
    row[2] = 2;
    for(let i = 3; i <= n; i++) {
        row[i] = row[i -1] + row[i - 2]
    }
    return row[n]
}
console.log(floor(10))

// 花费
function cost(n) {
    const len = n.length;
    let dp = [0, 0];
    for(let i = 2; i <= len; i++) {
        dp[i] = Math.min(dp[i-1] + n[i-1], dp[i-2]+n[i-2])
    }
    return dp[len];
}
console.log(cost([1,100,1,1,1,100,1,1,100,1]))

// 机器人
function robat(m, n) {
    let steps = [];
    for(let i = 0; i < m; i++) {
        steps[i] = [i];
    }
    for(let j = 0; j < n; j++) {
        steps[0][j] = j
    }
    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            steps[i][j] = steps[i-1][j] + steps[i][j-1];
        }
    }
    return steps[m-1][n-1]
}
console.log(robat(3,3))
// 求最短路径
function short(m, n) {
    let steps = [];
    for(let i = 0; i < m; i++) {
        steps[i] = [i];
    }
    for(let j = 0; j < n; j++) {
        steps[0][j] = j
    }
    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            steps[i][j] = Math.min(steps[i-1][j], steps[i][j-1]) + 1;
        }
    }
    return steps[m-1][n-1]
}
console.log(short(3,3))

// 背包问题
// var value = [4, 5, 10, 11, 13];
// var size = [3, 4, 7, 8, 9];
// var capacity = 16;
// var n = 5;
function bag() {
    let n = 5;
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {

        }
    }
}
// 贪心算法
// 先找先后顺序，比如找零，先用大的找零，在用小的，直到全部找零
// 再比如背包问题，先把物品按照比率（价格/尺寸）排序，先放比率高的，再放比率低的

// 找零
function makeChange(origAmt, coins) {
    var remainAmt = 0;
    if (origAmt % .25 < origAmt) {
          coins[3] = parseInt(origAmt / .25);
          remainAmt = origAmt % .25;
          origAmt = remainAmt;
    }
    if (origAmt % .1 < origAmt) {
          coins[2] = parseInt(origAmt / .1);
          remainAmt = origAmt % .1;
          origAmt = remainAmt;
    }
    if (origAmt % .05 < origAmt) {
          coins[1] = parseInt(origAmt / .05);
          remainAmt = origAmt % .05;
          origAmt = remainAmt;
    }
    
    coins[0] = parseInt(origAmt / .01);
}
    
function showChange(coins) {

    if (coins[3] > 0) {
        console.log("25美分的数量 - " + coins[3] + " - " + coins[3] * .25);
    }
    if (coins[2] > 0) {
        console.log("10美分的数量 - " + coins[2] + " - " + coins[2] * .10);
    }
    if (coins[1] > 0) {
        console.log("5美分的数量 - " + coins[1] + " - " + coins[1] * .05);
    }
    if (coins[0] > 0) {
        console.log("1美分的数量 - " + coins[0] + " - " + coins[0] * .01);
    }
}

var origAmt = .63;
var coins = [];

makeChange(origAmt, coins);
showChange(coins);

// 最长回文串-动态规划
// 初始化：创建一个二维数组 dp，其中 dp[i][j] 表示子串 s[i...j] 是否为回文。所有的长度为 1 的子串都是回文。
// 填充 dp 表：
// 遍历子串的长度 length 从 2 到 n。
// 对于每个子串的起始位置 i，计算结束位置 j = i + length - 1。
// 如果 s[i] === s[j]，则检查子串 s[i+1...j-1] 是否为回文。如果是，则 s[i...j] 也是回文。
// 更新最大长度 maxLength 和起始位置 start。
// 返回结果：使用 substring 方法从原字符串中提取最长回文子串。
// 初始化：所有单个字符的子串都是回文子串，因此 dp[i][i] 应该设为 true。
// 状态转移方程：
// 如果子串的第一个字符和最后一个字符相等，并且去掉这两个字符后的子串也是回文子串（即 dp[i+1][j-1] 为 true），那么该子串也是回文子串。
// 具体来说，如果 s[i] == s[j] 并且 j - i <= 2 或者 dp[i+1][j-1] == true，则 dp[i][j] = true。
// 记录最长的回文子串的起始位置和长度。
function longestPalindrome(s) {
    const n = s.length;
    if (n < 2) return s;

    // 初始化 DP 表
    const dp = Array.from({ length: n }, () => Array(n).fill(false));
    let maxLength = 1;
    let start = 0;

    // 每个长度为 1 的子串都是回文
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }

    // 填充 DP 表
    for (let m = 2; m <= n; m++) {
        for (let i = 0; i <= n - m; i++) {
            const j = i + m - 1;
            if (s[i] === s[j]) {
                if (m === 2) {
                    dp[i][j] = true; // 长度为 2 的子串且字符相同
                } else {
                    dp[i][j] = dp[i + 1][j - 1]; // 根据子问题的解
                }

                if (dp[i][j] && m > maxLength) {
                    maxLength = m;
                    start = i;
                }
            }
        }
    }

    return s.substring(start, start + maxLength);
}

const s = "adasdf";
console.log(`最长回文子串是: ${longestPalindrome(s)}`);




// 背包-动态规划
// 方法1:
function knapsack(weights, values, capacity) {
// 初始化：创建一个二维数组 dp，其中 dp[i][j] 表示前 i 个物品在容量为 j 的背包中的最大价值。数组初始化为全零。
// 填充dp数组：
// 遍历每个物品 i 和每个容量 w。
// 如果当前物品的重量 weights[i - 1] 小于等于当前容量 w，则计算不选择当前物品和选择当前物品的最大值，并将其存入 dp[i][w]。
// 如果当前物品的重量大于当前容量 w，则不能选择当前物品，直接将前 i-1 个物品在容量 w 的最大值存入 dp[i][w]。
// 返回结果：dp[n][capacity] 表示在给定容量下，前 n 个物品的最大价值。
    const n = weights.length;
    // 初始化dp数组
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

    // 填充dp数组
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][capacity];
}

// const weights = [3, 4, 7, 8, 9];
// const values = [4, 5, 10, 11, 13];
// const capacity = 15;

// const maxValue = knapsack(weights, values, capacity);
// console.log(`0-1背包的最大价值是: ${maxValue}`);

// 方法2:
function max1(a, b) {
    return (a > b) ? a : b;
}
function dKnapsack(capacity, size, value, n) {
    var K = [];
    for (var i = 0; i <= capacity + 1; i++) {
        K[i] = [];
    }
    for (var i = 0; i <= n; i++) {
        for (var w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) {
                K[i][w] = 0;
            } else if (size[i - 1] <= w) {
                K[i][w] = max1(value[i - 1] + K[i - 1][w - size[i - 1]],
                    K[i - 1][w]);
            } else {
                K[i][w] = K[i - 1][w];
            }
        }
    }
    return K[n][capacity];
}
// var value = [4, 5, 10, 11, 13];
// var size = [3, 4, 7, 8, 9];
// var capacity = 15;
// var n1 = 5;
// console.log(dKnapsack(capacity, size, value, n1));

// 贪心算法-不对
function fractionalKnapsack(weights, values, capacity) {
    // 创建一个数组存储物品的单位重量价值、重量和价值
    let items = weights.map((weight, index) => ({
        weight: weight,
        value: values[index],
        valuePerWeight: values[index] / weight
    }));

    // 按单位重量价值从高到低排序
    items.sort((a, b) => b.valuePerWeight - a.valuePerWeight);

    let totalValue = 0.0; // 背包中的总价值

    for (let item of items) {
        if (capacity === 0) break;
        
        // 选择当前物品
        if (item.weight <= capacity) {
            capacity -= item.weight;
            totalValue += item.value;
        }
    }
    return totalValue;
}

const weights = [3, 4, 7, 8, 9];
const values = [4, 5, 10, 11, 13];
const capacity = 15;
const maxValue = fractionalKnapsack(weights, values, capacity);
console.log(`分数背包的最大价值是: ${maxValue}`);





// 手写ajax
// ① readyState：xhr的状态码。
// ② status：http状态码。
// ③ statusText：http状态说明文本。
// ④ response：响应。（可通过xhr.response获取响应体数据）
// ⑤ responseType：响应类型。
// ⑥ responseURL：响应的URL路径。
// ⑦ responseText：响应的文本数据。
// ⑧ responseXML：响应的XML数据。
function ajax(url, method, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        // xhr.open(设置请求的方式,请求的路径, 同步/异步【布尔值true/false】)；
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhr.timeout = 5000
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                //  XHR.readyState == 状态（0，1，2，3，4），而且状态也是不可逆的：
                // 0：请求未初始化，还没有调用 open()。
                // 1：请求已经建立，但是还没有发送，还没有调用 send()。
                // 2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
                // 3：请求在处理中；通常响应中已有部分数据可用了，没有全部完成。
                // 4：响应已完成；您可以获取并使用服务器的响应了。
                if(xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr .responseText));
                } else{
                    reject(xhr.statusText);
                }
            }
        }
        xhr.onerror = function () {
            reject(xhr.statusText);
        };
        xhr.send(JSON.stringify(data))

        // xhr.onabort
        xhr.onload = function() {
            // 请求处理完成，相当于readystatechange的4
            resolve(xhr.responseText);
        }
        xhr.ontiemout = function() {

        }
    })
}





function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasownProperty(key)) {
            return false;
        }
    }
    return true;
}
console.log(isEmpty({}))


let ab = new Function()
ab.prototype.tosay = function() {}
console.log(ab.__proto__)
console.log(ab.prototype)
console.log(Object.getPrototypeOf(ab))
console.log(Object.prototype)


// new Object与Object.create的区别
// 1、所创建对象继承的原型不同，new的原型是内置对象Object，create的原型是被create对象


// new的执行过程
// 实现一个new
// 用new运算符来创建对象的过程，JavaScript是通过克隆Object.prototype来得到新的对象，但实际上并不是每次都真正地克隆了一个新的对象。从内存方面的考虑出发，JavaScript还做了一些额外的处理
// new的过程：


// __proto__指向该对象的原型（prototype）
// 定义构造函数
function Itbilu() {}

// 检查原型链关系
console.log(Itbilu.prototype.__proto__ === Object.prototype); // true
console.log(Itbilu.__proto__ === Function.prototype); // true
// 创建一个实例
const instance = new Itbilu();
// 实例的原型是构造函数的 prototype 属性
console.log(instance.__proto__ === Itbilu.prototype); // true



function Person( name ){
    this.name = name;
};
Person.prototype.getName = function(){
    return this.name;
};
var objectFactory = function(){
    var obj = new Object(),    // 从Object.prototype上克隆一个空的对象
        Constructor = [].shift.call( arguments );    // 取得外部传入的构造器，此例是Person
        
    obj.__proto__ = Constructor.prototype;    // 指向正确的原型
    var ret = Constructor.apply( obj, arguments );    // 借用外部传入的构造器给obj设置属性

    return typeof ret === 'object' ? ret : obj;     // 确保构造器总是会返回一个对象”
};

let obj = objectFactory( Person, 'sven' );

console.log( obj.name );  // 输出：sven
console.log( obj.getName() );  // 输出：sven
console.log( Object.getPrototypeOf( obj ) === Person.prototype );  // 输出：true
// 在 JavaScript 中，new 运算符并不真正克隆 Object.prototype 来创建新的对象。相反，它使用了原型链机制，这不仅节省了内存，还提升了性能。具体来说，JavaScript 使用了共享原型对象的方式来创建新对象，从而避免了对 Object.prototype 进行真正的克隆。以下是 JavaScript 中 new 运算符的详细工作过程，特别是内存方面的处理：
// 创建一个新的空对象：使用 {} 或者 Object.create(null) 创建一个新对象。
// 设置新对象的原型：将新对象的原型设置为构造函数的 prototype 属性。这里并没有克隆 prototype，而是将新对象的 __proto__ 指向构造函数的 prototype，从而实现原型链的共享。这一步骤通过 Object.setPrototypeOf 或 __proto__ 来实现。
// 绑定 this 并执行构造函数：将构造函数的 this 绑定到新对象上，并执行构造函数中的代码，为新对象添加属性和方法。
// 返回新对象：如果构造函数显式返回一个对象，则返回该对象；否则，返回新创建的对象。
// 这种机制的关键在于原型链的共享。通过将新对象的原型指向构造函数的 prototype，所有通过同一个构造函数创建的对象实例都共享同一个原型对象，从而避免了每次创建对象时都进行原型的复制。这不仅节省了内存空间，还提升了对象创建的效率。



function myNew(constructor, ...args) {
    // 1. 创建一个新的空对象
    const obj = {};

    // 2. 将新对象的原型设置为构造函数的 prototype 属性
    Object.setPrototypeOf(obj, constructor.prototype);

    // 3. 将构造函数中的 this 绑定到这个新对象，并执行构造函数
    const result = constructor.apply(obj, args);

    // 4. 如果构造函数返回一个对象，则返回这个对象；否则，返回新对象
    return result instanceof Object ? result : obj;
}

// 测试 myNew 函数
const person3 = myNew(Person, 'Charlie', 28);
console.log(person3); // 输出: Person { name: 'Charlie', age: 28 }



var Plane = function(){
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
};
var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;

var clonePlane = Object.create( plane);
// Object.getOwnPropertyNames(plane).forEach(name => {
//     Object.defineProperty(clonePlane, name, Object.getOwnPropertyDescriptor(plane, name))
// })
console.log( clonePlane );   // 输出：Object {blood: 500, attackLevel: 10, defenseLevel: 7}

// function creat(obj) {
//     const o = function() {};
//     o.prototype = obj;
//     return new o();
// }
// const b = {a: 1}
// console.log(create(b))

const aa= {bb:1};
console.log(Object.create(aa))

// 字符串压缩
function compressString(s) {
    if (s.length === 0) {
        return "";
    }
    
    let compressed = [];
    let count = 1;
    
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            count++;
        } else {
            compressed.push(s[i - 1] + count);
            count = 1;
        }
    }
    
    compressed.push(s[s.length - 1] + count);
    
    let compressedStr = compressed.join('');
    return compressedStr.length < s.length ? compressedStr : s;
}

// 示例
console.log(compressString("aaabbc"));  // 输出 "a3b2c1"
console.log(compressString("abcd"));    // 输出 "abcd"（未压缩，因为压缩后的字符串长度不变）

// 解压字符串
function uncompression(str) {
    const len = str.length;
    let res = '';
    for(let i = 0; i < len; i++) {
        // if(!isNaN(str[i+1])) {
        if(/\d/.test(str[i+1])) {
            res += str[i].repeat(Number(str[i+1]));
            i++
        } else {
            res += str[i]
        }
    }
    return res;
}
console.log(uncompression(compressString('aaadbbcc')))

// 显示混入Object.assign(A.prototype, B)，共享是通过显式的拷贝
// 显示混入是指显式地将一个对象或类的属性和方法拷贝到另一个对象或类中。这通常通过直接调用方法或者使用工具函数来实现。显示混入在代码中是明确的，通常通过某种形式的复制来共享行为。
// 隐士混入A.prototype = Object.create(B)，共享是通过原型链来实现的
// 隐式混入是指通过某种机制，让一个对象或类间接地访问另一个对象或类的属性和方法。通常，隐式混入是通过对象的委托或原型链来实现的。与显示混入不同，隐式混入并不直接拷贝属性或方法，而是通过关联关系访问它们。


// promisefy 解决异步的问题
function promisefy(fn) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}

// promise实现一个超时
function fetchWithTimeout(url, options, timeout = 7000) { // 默认超时时间为7000毫秒
    // 创建一个超时的promise
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out'));
      }, timeout);
    });
  
    // 使用Promise.race()来竞赛fetch请求和超时promise
    return Promise.race([
      fetch(url, options),
      timeoutPromise
    ]);
}
  
// 使用示例
// fetchWithTimeout('https://api.example.com/data')
// .then(response => response.json()) // 处理响应
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error)); // 处理错误，包括超时

/**
 * ajaxRetry - 具有最大重试次数的 AJAX 请求
 *
 * @param {string} url - 请求的 URL
 * @param {object} options - fetch 请求的配置选项
 * @param {number} maxRetries - 最大重试次数
 * @param {number} retryDelay - 每次重试之间的延迟（毫秒）
 * @returns {Promise} - 返回一个 Promise 对象
 */
async function ajaxRetry(url, options = {}, maxRetries = 3, retryDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            if (attempt < maxRetries) {
                console.log(`Attempt ${attempt} failed. Retrying in ${retryDelay}ms...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            } else {
                console.error(`Failed after ${maxRetries} attempts.`);
                throw error;
            }
        }
    }
}
// 示例使用
// ajaxRetry('https://api.example.com/data', {}, 3, 1000)
//     .then(data => console.log('Request succeeded:', data))
//     .catch(error => console.error('Request failed:', error));

// fetch
// 默认跨域请求不发送cookie：与XMLHttpRequest相比，fetch默认不会发送或接收cookies，除非你明确使用credentials选项。
// 流式响应体：fetch支持流式读取响应体，允许处理大型响应数据，如文件流。
// fetch只在请求网络错误时（如网络断开）才会拒绝（reject）Promise。如果服务器响应（即使是404或500等错误状态），fetch都会将Promise置为解决（resolve）状态，需要通过检查response.ok或response.status来处理HTTP错误状态。
// `fetch`API原生并不支持请求超时设置，使用`Promise.race()`与超时`Promise`一起
// `fetch`缺乏一些高级功能，如自动转换JSON响应、保护CSRF攻击

function fetchWithTimeout(url, options, timeout = 5000) {
    // 创建一个 AbortController 实例
    const controller = new AbortController();
    const { signal } = controller;
    
    // 创建一个超时的 promise
    const timeoutId = setTimeout(() => controller.abort(), timeout);
  
    // 使用 fetch 进行网络请求，并传入 signal
    return fetch(url, { ...options, signal })
      .then(response => {
        // 请求成功，清除超时
        clearTimeout(timeoutId);
        return response;
      })
      .catch(error => {
        // 请求失败，清除超时
        clearTimeout(timeoutId);
        // 如果错误是因为中止请求引起的，则抛出特定错误
        if (error.name === 'AbortError') {
          throw new Error('Request timed out');
        }
        // 其他错误正常抛出
        throw error;
      });
  }
  
  // 使用示例
//   fetchWithTimeout('https://example.com/data', {}, 3000)
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));
  


// 代理与反射
const obj1 = {
    _name:'cj',
    age:18,
    get name(){     //将存取描述符写入对象体内
        return this._name    //this === obj
    },
    set name(newValue){
        this._name = newValue
    }
}
 
const objProxy = new Proxy(obj1,{
    get:function(target,key){
        console.log(`监听到访问${key}属性`)
        return Reflect.get(target,key)
    },
    set:function(target,key,newValue){
        console.log(`监听到给${key}属性设置值`)
        Reflect.set(target,key,newValue)
    }
})
 
console.log(objProxy.name)

const obj2 = {
    _name:'cj',
    age:18,
    get name(){
        return this._name      //this === objProxy
    },
    set name(newValue){
        this._name = newValue
    }
}
 
const objProxy2 = new Proxy(obj2,{
    get:function(target,key,receiver){
        console.log(`监听到访问${key}属性`,target[key],target)
        return Reflect.get(target,key,receiver)    //将receiver传递给Reflect.get
    },
    set:function(target,key,newValue,receiver){
        console.log(`监听到给${key}属性设置值`,target[key],target)
        Reflect.set(target,key,newValue,receiver)
    }
})
 
console.log(objProxy2.name) 



// 构造器
// 第一步：父类
function Site() {
    this.name = 'Site';
    this.domain = 'domain';
  }

  Site.prototype.create = function(name, domain) {
    this.name = name;
    this.domain = domain;
  };
   
  // 第二步：子类
  function Itbilu() {
    Site.call(this); //调用基类的构造函数
  }
  // 第三步：继承父类，会影响子类的构造器指向
//   1、Object.setPrototypeOf(Itbilu.prototype, Site.prototype)
    // 2、Itbilu.prototype = Site.prototype
    Itbilu.prototype.__proto__ = Site.prototype
//   4、
    // Itbilu.prototype = Object.create(Site.prototype);
    // Itbilu.prototype.constructor = Itbilu
  // 创建类实例
  var itbilu = new Itbilu();
   
  itbilu instanceof Site;  // true
  itbilu instanceof Itbilu;  // true
   
  itbilu.create('IT笔录', 'itbilu.com');
  console.log(itbilu.name);    // 'IT笔录'
  itbilu.domain;  // 'itbilu.com'
  //上面的代码子类的构造器指向了父类，并没有指向自己
console.log(Itbilu.prototype.constructor);//Site {}


// this指向函数运行时的上下文

const obj11 = {
    name: 1,
    getName() {
        return this.name
    }
}
const getName = obj11.getName;
const getName1 = getName.bind(obj11);
console.log(getName1())

// 闭包
let extent = function() {
    let value = 0;
    return {
        call: function() {
            return value++;
        }
    }
}

// 解决临时变量被销毁的办法
// 1、new，也是结合对象
// 2、闭包
// 3、面向对象，变量存储在对象的属性上


// 高阶函数实现AOP面向切面编程
Function.prototype.before = function(beforefn) {
    let self = this;
    return function() {
        beforefn.apply(this, arguments);
        return self.apply(this, arguments);
    }
}
Function.prototype.after = function(afterfn) {
    let self = this;
    return function() {
        let result = self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return result;
    }
}
const aop = function() {
    console.log(2)
}
fun = aop.before(function() {
    console.log(1)
}).after(function() {
    console.log(3)
})
fun()

// 可以使用闭包来控制for循环里的变量
for(let i = 0; i < 1; i++) {
    (function(i) {
        console.log(i)
    })(i)
}

function isType(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1) === type
    }
}
const isString = isType('String')
console.log(isString('1')) // true

// return返回一个赋值语句，会把赋的值作为返回值
function returnTest() {
    return abc = 1;
}
console.log(returnTest()); // 1

// el.addEventListener(type, listener, {
//     capture: false, // === useCapture
//     once: false,    // 是否设置单次监听
//     passive: false  // 是否让阻止默认行为(preventDefault()) 失效
// })

// 添加事件函数
// function addEvent(elem, type, handler) {
//     if(window.addEventListener) {
//         return elem.addEventListener(type, handler)
//     }
//     if(window.attachEvent) {
//         return elem.attachEvent('on'+type, handler)
//     }
// }
// 上面方法有个缺点，就是每次调用方法都要执行条件判断，通过高阶函数返回
// let addEventPro = (function() {
//     if(window.addEventListener) {
//         return function(elem, type, handler) {
//             return elem.addEventListener(type, handler)
//         }
//     }
//     if(window.attachEvent) {
//         return function(elem, type, handler) {
//             return elem.attachEvent('on'+type, handler)
//         }
//     }
// })()
// 上面的函数还是不够好，如果一次也没用还是会执行。惰性载入函数
// var addEvent = function( elem, type, handler ){
//     if ( window.addEventListener ){
//         addEvent = function( elem, type, handler ){
//             elem.addEventListener( type, handler, false );
//         }
//      }else if ( window.attachEvent ){
//          addEvent = function( elem, type, handler ){
//              elem.attachEvent( 'on' + type, handler );
//          }
//      }

//      addEvent( elem, type, handler );
// };

// var div = document.getElementById( 'div1' );

// addEvent( div, 'click', function(){
//     alert (1);
// });

// addEvent( div, 'click', function(){
//     alert (2);
// });



// ======  设计模式 =====
// 面向对象编程：单一职责原则

// 1、单利模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
var Singleton = function( name ){
    this.name = name;
    this.instance = null;
};

Singleton.prototype.getName = function(){
    alert ( this.name );
};

Singleton.getInstance = function( name ){
    // 保证只有一个实例
    if ( !this.instance ){
        this.instance = new Singleton( name );
    }
    return this.instance;
};

var bbb = Singleton.getInstance( 'sven2' );
var aaa = Singleton.getInstance( 'sven1' );

console.log( aaa);

// 测试惰性载入函数
var fa = function() {
    fa = function() {
        console.log(111111)
    }
    console.log(123123)
    fa()
}
console.log(fa());

//代理模式实现单利
// var CreateDiv = function( html ){
//     this.html = html;
//     this.init();
// };

// CreateDiv.prototype.init = function(){
//     var div = document.createElement( 'div' );
//     div.innerHTML = this.html;
//     document.body.appendChild( div );
// };
// 代理函数
// var ProxySingletonCreateDiv = (function(){
//     var instance;
//     return function( html ){
//         if ( !instance ){
//             instance = new CreateDiv( html );
//         }
//         return instance;
//     }

// })();

// var aba = new ProxySingletonCreateDiv( 'sven1' );
// var bab = new ProxySingletonCreateDiv( 'sven2' );
// console.log( aba === bab );


// 避免全局变量污染
// 1、命名空间
// 2、闭包

// 惰性单利

// 通用的惰性单利
// 不变的抽离，fn是变的
// 如果有fn就用下面这种，没有的话改成自执行函数
let single = function(fn) {
    let result;
    return function() {
        return result || (result = fn.apply(this, arguments))
    }
}

// 2、策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。表单校验、年终绩效考核
// 解决众多if条件语句，消除条件语句
// 封装变化、委托和多态性
let strategies = {
    // 策略类
    'S': function(salary) {
        return salary * 4;
    },
    'A': function(salary) {
        return salary * 3;
    }
}
const calculateBonus = function(level, salary) {
    // 环境类
    return strategies[level](salary);
}
console.log(calculateBonus('S', 1000))



var tween = {
    // 动画已消耗的时间、小球原始位置、小球目标位置、动画持续的总时间，返回的值则是动画元素应该处在的当前位置。
    linear: function( t, b, c, d ){
        return c*t/d + b;
    },
    easeIn: function( t, b, c, d ){
        return c * ( t /= d ) * t + b;
    },
    strongEaseIn: function(t, b, c, d){
        return c * ( t /= d ) * t * t * t * t + b;
    },
    strongEaseOut: function(t, b, c, d){
        return c * ( ( t = t / d - 1) * t * t * t * t + 1 ) + b;
    },
    sineaseIn: function( t, b, c, d ){
        return c * ( t /= d) * t * t + b;
    },
    sineaseOut: function(t,b,c,d){
        return c * ( ( t = t / d - 1) * t * t + 1 ) + b;
    }
};

// 业务规则指向的目标一致，并且可以被替换使用，我们就可以用策略模式来封装它们。

// 策略模式优缺点
// 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
// 策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的strategy中，使得它们易于切换，易于理解，易于扩展。
// 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
// 在策略模式中利用组合和委托来让Context拥有执行算法的能力，这也是继承的一种更轻便的替代方案。


// 3、代理模式

// 保护代理：代理B可以帮助A过滤掉一些请求，比如送花的人中年龄太大的或者没有宝马的，这种请求就可以直接在代理B处被拒绝掉。
// 虚拟代理：假设现实中的花价格不菲，导致在程序世界里，new Flower也是一个代价昂贵的操作，那么我们可以把new Flower的操作交给代理B去执行，代理B会选择在A心情好时再执行new Flower，这是代理模式的另一种形式，叫作虚拟代理。虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建。

// 保护代理不容易实现，但是虚拟代理是常用的

// 使用虚拟代理实现图片加载，代理和实体方法同名
// var myImage = (function(){
//     var imgNode = document.createElement( 'img' );
//     document.body.appendChild( imgNode );

//     return function( src ){
//         imgNode.src = src;
//     }
// })();
// // 代理
// var proxyImage = (function(){
//     var img = new Image();

//     img.onload = function(){
//         myImage( this.src );
//     }

//     return function( src ){
//         myImage('file://C:/Users/svenzeng/Desktop/loading.gif');
//         img.src = src;
//     }
// })();
// proxyImage('http://imgcache.qq.com/music//N/k/000GGDys0yA0Nk.jpg');


// 虚拟代理在惰性加载中的应用
// 控制台日志

// 缓存代理：开销大的运算结果提供暂时的存储


// 4、迭代器模式：是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
// 迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

// 内部迭代器，内部定义好迭代规则，外部调用
var each = function( ary, callback ){
    for ( var i = 0, l = ary.length; i < l; i++ ){
        callback.call(this, i, ary[ i ] );  // 把下标和元素当作参数传给callback函数
    }
};

each( [ 1, 2, 3 ], function( i, n ){
    console.log( [ i, n ] );
});
// 外部迭代器，可以手工控制迭代的过程或者顺序
var Iterator = function( obj ){
    var current = 0;

    var next = function(){
        current += 1;
    };

    var isDone = function(){
        return current >= obj.length;
    };

    var getCurrItem = function(){
        return obj[ current ];
    };

    return {
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem
    }
};
var compare = function( iterator1, iterator2 ){
    while( !iterator1.isDone() && !iterator2.isDone() ){
        if ( iterator1.getCurrItem() !== iterator2.getCurrItem() ){
             throw new Error ( 'iterator1和iterator2不相等' );
        }
        iterator1.next();
        iterator2.next();
    }

    console.log( 'iterator1和iterator2相等' );
}

var iterator1 = Iterator( [ 1, 2, 3 ] );
var iterator2 = Iterator( [ 1, 2, 3 ] );

compare( iterator1, iterator2 );  // 输出：iterator1和iterator2相等”


// 优化代码
// 使用迭代器优化文件上传
var getActiveUploadObj = function(){
    try{
        return new ActiveXObject( "TXFTNActiveX.FTNUpload" );    // IE上传控件
    }catch(e){
        return false;
    }
};

var getFlashUploadObj = function(){
    if ( supportFlash() ){     // supportFlash函数未提供
        var str = '<object type="application/x-shockwave-flash"></object>';
        return $( str ).appendTo( $('body') );
    }
    return false;
};
var getFormUpladObj = function(){
    var str = '<input name="file" type="file" class="ui-file"/>';  // 表单上传
    return $( str ).appendTo( $('body') );
};


var iteratorUploadObj = function(){
    for ( var i = 0, fn; fn = arguments[ i++ ]; ){
        var uploadObj = fn();
        if ( uploadObj !== false ){
            return uploadObj;
        }
    }
};

// var uploadObj = iteratorUploadObj( getActiveUploadObj, getFlashUploadObj, getFormUpladObj );


// 5、发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
// 在异步编程中使用发布—订阅模式，我们就无需过多关注对象在异步运行期间的内部状态，而只需要订阅感兴趣的事件发生点。

// 手动触发事件更好的做法是IE下用fireEvent，标准浏览器下用dispatchEvent实现。

// 售楼处的发布订阅
var salesOffices = {};    // 定义售楼处

salesOffices.clientList = {};    // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function( key, fn ){
    if ( !this.clientList[ key ] ){    // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
        this.clientList[ key ] = [];
    }
    this.clientList[ key ].push( fn );    // 订阅的消息添加进消息缓存列表
};

salesOffices.trigger = function(){    // 发布消息
    var key = Array.prototype.shift.call( arguments ),    // 取出消息类型
        fns = this.clientList[ key ];    // 取出该消息对应的回调函数集合

    if ( !fns || fns.length === 0 ){    // 如果没有订阅该消息，则返回
        return false;
    }

    for( var i = 0, fn; fn = fns[ i++ ]; ){
        fn.apply( this, arguments );    // (2) // arguments是发布消息时附送的参数
    }
};

salesOffices.listen( 'squareMeter88', function( price ){    // 小明订阅88平方米房子的消息
    console.log( '价格= ' + price );    // 输出： 2000000
});
salesOffices.listen( 'squareMeter110', function( price ){     // 小红订阅110平方米房子的消息
    console.log( '价格= ' + price );    // 输出： 3000000
});

salesOffices.trigger( 'squareMeter88', 2000000 );     // 发布88平方米房子的价格
salesOffices.trigger( 'squareMeter110', 3000000 );    // 发布110平方米房子的价格

// 创建一个通用的发布-订阅
var event = {
    clientList: [],
    listen: function( key, fn ){
        if ( !this.clientList[ key ] ){
            this.clientList[ key ] = [];
        }
        this.clientList[ key ].push( fn );    // 订阅的消息添加进缓存列表
    },
    trigger: function(){
        var key = Array.prototype.shift.call( arguments ),    // (1);
            fns = this.clientList[ key ];

        if ( !fns || fns.length === 0 ){    // 如果没有绑定对应的消息
            return false;
        }

        for( var i = 0, fn; fn = fns[ i++ ]; ){
            fn.apply( this, arguments );    // (2) // arguments 是trigger时带上的参数
        }
    },
    remove: function(key, fn) {
        var fns = this.clientList[ key ];

        if ( !fns ){    // 如果key对应的消息没有被人订阅，则直接返回
            return false;
        }
        if ( !fn ){    // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
            fns && ( fns.length = 0 );
        }else{
            for ( var l = fns.length - 1; l >=0; l-- ){    // 反向遍历订阅的回调函数列表
                var _fn = fns[ l ];
                if ( _fn === fn ){
                    fns.splice( l, 1 );    // 删除订阅者的回调函数
                }
            }
        }
    }
};
var installEvent = function( obj ){
    for ( var i in event ){
        obj[ i ] = event[ i ];
    }
};
var salesOffices = {};
installEvent( salesOffices );


// 另外一个案例：登陆信息的同步，之前是回调，但是耦合业务，改成发布-订阅
// $.ajax( 'http:// xxx.com?login', function(data){    // 登录成功
//     login.trigger( 'loginSucc', data);    // 发布登录成功的消息
// });
// var header = (function(){        // header模块
//     login.listen( 'loginSucc', function( data){
//         header.setAvatar( data.avatar );
//     });
//     return {
//         setAvatar: function( data ){
//             console.log( '设置header模块的头像' );
//         }
//     }
// })();

// var nav = (function(){    // nav模块
//     login.listen( 'loginSucc', function( data ){
//         nav.setAvatar( data.avatar );
//     });
//     return {
//         setAvatar: function( avatar ){
//             console.log( '设置nav模块的头像' );
//         }
//     }
// })();

// 上面的例子还存在缺陷：
// 1、给每个对象添加发布、订阅，这是一种资源浪费
// 2、小明必须知道售楼处，才能订阅消息，存在一定的耦合

// 增加中介者，全局对象
var Event = (function(){

    var clientList = {},
        listen,
        trigger,
        remove;

    listen = function( key, fn ){
        if ( !clientList[ key ] ){
            clientList[ key ] = [];
        }
        clientList[ key ].push( fn );
    };

    trigger = function(){
        var key = Array.prototype.shift.call( arguments ),
            fns = clientList[ key ];
            if ( !fns || fns.length === 0 ){
                return false;
            }
            for( var i = 0, fn; fn = fns[ i++ ]; ){
                fn.apply( this, arguments );
}

    };

    remove = function( key, fn ){
        var fns = clientList[ key ];
        if ( !fns ){
            return false;
        }
        if ( !fn ){
            fns && ( fns.length = 0 );
        }else{
            for ( var l = fns.length - 1; l >=0; l-- ){
                var _fn = fns[ l ];
                if ( _fn === fn ){
                    fns.splice( l, 1 );
                }
            }
        }
    };

    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }

})();


Event.listen( 'squareMeter88', function( price ){     // 小红订阅消息
    console.log( '价格= ' + price );       // 输出：'价格=2000000'
});

Event.trigger( 'squareMeter88', 2000000 );    // 售楼处发布消息

// 发布订阅：为时间上的解耦（异步回调的问题），对象之间的解耦
// 缺点是订阅者一直会存在内存中

// 6、命令模式：命令是指一个执行某种特定事情的指令，解耦命令发送者和接收者之间的关系
// 有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么，此时希望用一种松耦合的方式来设计软件，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。
// 点餐，客户和厨师之间解耦


// 命令模式的意图是把请求封装为对象，从而分离请求的发起者和请求的接收者（执行者）之间的耦合关系。在命令被执行之前，可以预先往命令对象中植入命令的接收者。
let tv = {
    open: function() {console.log('open')},
    close: function() {console.log('close')}
}
function openTVCommand(receiver) {
    this.receiver = receiver;
}
openTVCommand.prototype.exectue = function() {
    this.receiver.open();
}
openTVCommand.prototype.undoe = function() {
    this.receiver.undo();
}
function closeTVComand(receiver) {
    this.receiver = receiver;
}
closeTVComand.prototype.exectue = function() {
    this.receiver.close();
}
closeTVComand.prototype.undoe = function() {
    this.receiver.undo();
}
let setCommand = function(commad) {
    document.getElementById('open').addEventListener('click', function() {
        commad.exectue();
    })
}
// setCommand(new openTVCommand(tv))

// 命令模式的由来，其实是回调（callback）函数的一个面向对象的替代品。
// 执行过的命令将被存放到堆栈中。播放录像的时候只需要从头开始依次执行这些命令便可

// 宏命令是一组命令的集合，通过执行宏命令的方式，可以一次执行一批命令。
// 宏命令是组合模式和命令模式的联用产物

// “命令模式都会在command对象中保存一个接收者来负责真正执行客户的请求，这种情况下命令对象是“傻瓜式”的，它只负责把客户的请求转交给接收者来执行，这种模式的好处是请求发起者和请求接收者之间尽可能地得到了解耦。”

// “聪明”的命令对象可以直接实现请求，这样一来就不再需要接收者的存在，这种“聪明”的命令对象也叫作智能命令。没有接收者的智能命令，退化到和策略模式非常相近，从代码结构上已经无法分辨它们，能分辨的只有它们意图的不同。策略模式指向的问题域更小，所有策略对象的目标总是一致的，它们只是达到这个目标的不同手段，它们的内部实现是针对“算法”而言的。而智能命令模式指向的问题域更广，command对象解决的目标更具发散性。命令模式还可以完成撤销、排队等功能。

var closeDoorCommand = {
    execute: function(){
        console.log( '关门' );
    }
};

var openPcCommand = {
    execute: function(){
        console.log( '开电脑' );
    }
};

var openQQCommand = {
    execute: function(){
        console.log( '登录QQ' );
    }
};
var MacroCommand = function(){
    return {
        commandsList: [],
        add: function( command ){
            this.commandsList.push( command );
        },
        execute: function(){
            for ( var i = 0, command; command = this.commandsList[ i++ ]; ){
               command.execute();
            }
        }
    }
};

var macroCommand = MacroCommand();
macroCommand.add( closeDoorCommand );
macroCommand.add( openPcCommand );
macroCommand.add( openQQCommand );

macroCommand.execute();


// 7、组合模式
// 组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更小的“孙对象”构成的。

// 组合模式将对象组合成树形结构，以表示“部分-整体”的层次结构。
// 组合模式的另一个好处是通过对象的多态性表现，使得用户对单个对象和组合对象的使用具有一致性。

// 以宏命令为例，请求从树最顶端的对象往下传递，如果当前处理请求的对象是叶对象（普通子命令），叶对象自身会对请求作出相应的处理；如果当前处理请求的对象是组合对象（宏命令），组合对象则会遍历它属下的子节点，将请求继续传递给这些子节点。

// 组合模式的透明性使得发起请求的客户不用去顾忌树中组合对象和叶对象的区别，但它们在本质上有是区别的，不能向叶子节点添加

// 组合模式例子：扫描文件夹

var Folder = function(name) {
    this.name = name;
    this.files = [];
}
Folder.prototype.add = function(file) {
    this.files.push(file);
}
Folder.prototype.scan = function() {
    for(let i = 0; i < this.files.length; i++) {
        this.files[i].scan();
    }
}
var File = function(name) {
    this.name = name;
}
File.prototype.add = function(name) {
    throw new Error('不能向文件添加文件')
}
File.prototype.scan = function() {
    console.log(this.name);
}
var folder = new Folder('a');
var folder1 = new Folder('b')
var file = new File('c')
var file1 = new File('d')
folder.add(file)
folder1.add(file1);
folder.scan();

// 组合模式不是父子关系，是一种HAS-A（聚合）的关系
// 对叶对象操作的一致性
// 用职责链模式提高组合模式性能：如果树的结构比较复杂，节点数量很多，在遍历树的过程中，性能方面也许表现得不够理想。

// 什么时候使用组合模式：
// 1、表示对象的部分-整体层次结构。
// 2、客户希望统一对待树中的所有对象。


// 8、模版方法模式：模板方法模式是一种只需使用继承就可以实现的非常简单的模式。
// 在JavaScript开发中用到继承的场景其实并不是很多，很多时候我们都喜欢用mix-in的方式给对象扩展属性。
// 模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。
// 通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

// 泡茶/泡咖啡
function A() {}
A.prototype.boilwater = function() {console.log('把水煮沸')}
A.prototype.brew = function() {throw new Error('需要在子类里实现具体方法')}
A.prototype.isZL = function() {return true} // 默认需要佐料，可以在
A.prototype.zl = function() {throw new Error('需要在子类里实现具体方法')}
A.prototype.init = function() {
    this.boilwater();
    this.brew();
    if(this.isZL) {
        this.zl();
    }
}
var coffee = function() {}
coffee.prototype = new A(); // A是模版
coffee.prototype.isZL = function() {
    return false; // 不需要佐料
}

// 抽象类/具体类
// “抽象类的主要作用就是为它的子类定义这些公共接口。”

// 如果有些人不喜欢加佐料，模版里的添加佐料方法就不需要调用，我们可以通过钩子方法解决这个问题
// “钩子方法（hook）可以用来解决这个问题，放置钩子是隔离变化的一种常见手段。

// 好莱坞原则
// 我们允许底层组件将自己挂钩到高层组件中，而高层组件会决定什么时候、以何种方式去使用这些底层组件，高层组件对待底层组件的方式，跟演艺公司对待新人演员一样，都是“别调用我们，我们会调用你”。


// 9、享元模式（flyweight）用于性能优化的模式，核心是运用共享技术来有效支持大量细粒度的对象。

// 内衣例子
var Model = function(sex) {
    this.sex = sex;
}
Model.prototype.takePhoto = function() {
    console.log(this.sex + this.underwear)
}
var male = new Model('male'),
    female = new Model('female')
function test() {
    for(let i = 0; i < 50; i++) {
        male.underwear = i;
        male.takePhoto();
    }
    for(let i = 0; i < 50; i++) {
        female.underwear = i;
        female.takePhoto();
    }
}

// 享元模式要求将对象的属性划分为内部状态与外部状态（状态在这里通常指属性）。享元模式的目标是尽量减少共享对象的数量
// 内部状态存储于对象内部。
// 内部状态可以被一些对象共享。
// 内部状态独立于具体的场景，通常不会改变。
// 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。

// 内部状态有多少种组合，系统中便最多存在多少个对象
// 实现享元模式的关键是把内部状态和外部状态分离开来


// 对象池：http连接/数据库连接
// 当取消操作时，之前生成的dom放到对象池里，下次可以直接使用
var toolTipFactory = (function(){
    var toolTipPool = [];    // toolTip对象池

    return {
        create: function(){
            if ( toolTipPool.length === 0 ){    // 如果对象池为空
                var div = document.createElement( 'div' );    // 创建一个dom
                document.body.appendChild( div );
                return div;
            }else{    // 如果对象池里不为空
                return toolTipPool.shift();  // 则从对象池中取出一个dom
            }
        },
        recover: function( tooltipDom ){
            return toolTipPool.push( tooltipDom );    // 对象池回收dom
        }
    }
})();



// 10、职责链：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
// 职责链模式的最大优点就是解耦了请求发送者和N个接收者之间的复杂关系
// 购买手机的例子
let order = function( orderType, pay, stock ){
    if ( orderType === 1 ){        // 500元定金购买模式
        if ( pay === true ){    // 已支付定金
            console.log( '500元定金预购, 得到100优惠券' );
        }else{    // 未支付定金，降级到普通购买模式
            if ( stock > 0 ){    // 用于普通购买的手机还有库存
                console.log( '普通购买, 无优惠券' );
            }else{
                console.log( '手机库存不足' );
            }
        }
    }

    else if ( orderType === 2 ){     // 200元定金购买模式
        if ( pay === true ){
            console.log( '200元定金预购, 得到50优惠券' );
        }else{
            if ( stock > 0 ){
                console.log( '普通购买, 无优惠券' );
            }else{
                console.log( '手机库存不足' );
            }
        }
    }

    else if ( orderType === 3 ){
        if ( stock > 0 ){
            console.log( '普通购买, 无优惠券' );
        }else{
            console.log( '手机库存不足' );
        }
    }
};

order( 1 , true, 500);  // 输出： 500元定金预购, 得到100优惠券

// 使用职责链优化上面代码，如果500不符合传给200，200符合传给普通
// 500元订单
var order500 = function( orderType, pay, stock ){
    if ( orderType === 1 && pay === true ){
        console.log( '500元定金预购, 得到100优惠券' );
    }else{
        order200( orderType, pay, stock );    // 将请求传递给200元订单
    }
};

// 200元订单
var order200 = function( orderType, pay, stock ){
    if ( orderType === 2 && pay === true ){
        console.log( '200元定金预购, 得到50优惠券' );
    }else{
        orderNormal( orderType, pay, stock );    // 将请求传递给普通订单
    }
};

// 普通购买订单
var orderNormal = function( orderType, pay, stock ){
    if ( stock > 0 ){
        console.log( '普通购买, 无优惠券' );
    }else{
        console.log( '手机库存不足' );
    }
};

// 测试结果：
order500( 1, true, 500);    // 输出：500元定金预购, 得到100优惠券
order500( 1, false, 500 );   // 输出：普通购买, 无优惠券
order500( 2, true, 500 );    // 输出：200元定金预购, 得到50优惠券
order500( 3, false, 500 );   // 输出：普通购买, 无优惠券
order500( 3, false, 0 );     // 输出：手机库存不足

// 上面的优化违反了开放-封闭原则，比如增加一种优惠券，需要修改代码逻辑
var order500 = function( orderType, pay, stock ){
    if ( orderType === 1 && pay === true ){
        console.log( '500元定金预购，得到100优惠券' );
    }else{
        return 'nextSuccessor';    // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};

var order200 = function( orderType, pay, stock ){
    if ( orderType === 2 && pay === true ){
        console.log( '200元定金预购，得到50优惠券' );
    }else{
        return 'nextSuccessor';    // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};
var orderNormal = function( orderType, pay, stock ){
    if ( stock > 0 ){
        console.log( '普通购买，无优惠券' );
    }else{
        console.log( '手机库存不足' );
    }
};
// 通过 nextsuccessor包装职责链节点
// Chain.prototype.setNextSuccessor  指定在链中的下一个节点
// Chain.prototype.passRequest  传递请求给某个节点
var Chain = function( fn ){
    this.fn = fn;
    this.successor = null;
};
Chain.prototype.setNextSuccessor = function( successor ){
    return this.successor = successor;
};
Chain.prototype.passRequest = function(){
    var ret = this.fn.apply( this, arguments );

    if ( ret === 'nextSuccessor' ){
        return this.successor && this.successor.passRequest.apply( this.successor, arguments );
    }

    return ret;
};
// 定义节点
var chainOrder500 = new Chain( order500 );
var chainOrder200 = new Chain( order200 );
var chainOrderNormal = new Chain( orderNormal );
// 定义职责链
chainOrder500.setNextSuccessor( chainOrder200 );
chainOrder200.setNextSuccessor( chainOrderNormal );


chainOrder500.passRequest( 1, true, 500 );    // 输出：500元定金预购，得到100优惠券
chainOrder500.passRequest( 2, true, 500 );    // 输出：200元定金预购，得到50优惠券
chainOrder500.passRequest( 3, true, 500 );    // 输出：普通购买，无优惠券
chainOrder500.passRequest( 1, false, 0 );     // 输出：手机库存不足


// 异步的职责链，比如ajax请求回调
Chain.prototype.next= function(){
    return this.successor && this.successor.passRequest.apply( this.successor, arguments );
};
var fn1 = new Chain(function(){
    console.log( 1 );
    return 'nextSuccessor';
});

var fn2 = new Chain(function(){
    console.log( 2 );
    var self = this;
    setTimeout(function(){
        self.next();
    }, 1000 );
});

var fn3 = new Chain(function(){
    console.log( 3 );
});

fn1.setNextSuccessor( fn2 ).setNextSuccessor( fn3 );
fn1.passRequest();


// 职责链缺点
// 1、存在没有一个节点处理数据
// 2、数据传递太浪费

// 用AOP面向切面编程实现职责链
Function.prototype.afterfn = function(fn) {
    let self = this;
    return function() {
        let ret = self.apply(this, arguments);
        if(ret === 'nextSuccessor') {
            return fn.apply(this, arguments);
        }
        return ret;
    }
}
let orderAOP = order500.afterfn(order200).afterfn(orderNormal);
orderAOP(1, true, 500)

// 用职责链替代迭代模式获取上传文件对象


// 11、中介者模式：作用就是解除对象与对象之间的紧耦合关系
// 中介者又叫调停者

// 购买手机的例子，选择颜色、数量，判断库存
var goods = {   // 手机库存
    "red|32G": 3,
    "red|16G": 0,
    "blue|32G": 1,
    "blue|16G": 6
};

var mediator = (function(){
    // var colorSelect = document.getElementById( 'colorSelect' ),
    //     memorySelect = document.getElementById( 'memorySelect' ),
    //     numberInput = document.getElementById( 'numberInput' ),
    //     colorInfo = document.getElementById( 'colorInfo' ),
    //     memoryInfo = document.getElementById( 'memoryInfo' ),
    //     numberInfo = document.getElementById( 'numberInfo' ),
    //     nextBtn = document.getElementById( 'nextBtn' );

    return {
        changed: function( obj ){
            var color = colorSelect.value,   // 颜色
                memory = memorySelect.value,// 内存
                number = numberInput.value,   // 数量
                stock = goods[ color + '|' + memory ];   // 颜色和内存对应的手机库存数量

            if ( obj === colorSelect ){     // 如果改变的是选择颜色下拉框
                colorInfo.innerHTML = color;
            }else if ( obj === memorySelect ){
                memoryInfo.innerHTML = memory;
            }else if ( obj === numberInput ){
                numberInfo.innerHTML = number;
            }

            if ( !color ){
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请选择手机颜色';
                return;
            }

            if ( !memory ){
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请选择内存大小';
                return;
            }

            if ( ( ( number - 0 ) | 0 ) !== number - 0 ){   // 输入购买数量是否为正整数
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请输入正确的购买数量';
                return;
            }

            nextBtn.disabled = false;
            nextBtn.innerHTML = '放入购物车';

        }
    }
})();

// 事件函数：
// colorSelect.onchange = function(){
//     mediator.changed( this );
// };
// memorySelect.onchange = function(){
//     mediator.changed( this );
// };
// numberInput.oninput = function(){
//     mediator.changed( this );
// };


// 12、装饰者模式：动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。
// 与继承不同
// 继承会导致超类和子类的强耦合性，当超类改变，子类也跟着改变
// 继承这种功能复用的方式被称为白箱复用
// 继承还会导致大量的子类

var Plane = function(){}

Plane.prototype.fire = function(){
    console.log( '发射普通子弹' );
}
var MissileDecorator = function( plane ){
    this.plane = plane;
}

MissileDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log( '发射导弹' );
}

var AtomDecorator = function( plane ){
    this.plane = plane;
}

AtomDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log( '发射原子弹' );
}
var plane = new Plane();
plane = new MissileDecorator( plane );
plane = new AtomDecorator( plane );
plane.fire();
// 分别输出： 发射普通子弹、发射导弹、发射原子弹


// 给函数增加功能
var aaa = function(){
    console.log(1);
}

var _a = aaa;

aaa = function(){
    _a();
    console.log(2);
}
aaa();
// 上面的例子可能会导致this指向的问题，可以用AOP实现装饰函数


// 13、状态模式：定义状态和行为之间的关系
// 状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。

// 电灯开关例子
var Light = function(){
    this.state = 'off';    // 给电灯设置初始状态off
    this.button = null;    // 电灯开关按钮
};
Light.prototype.init = function(){
    var button = document.createElement( 'button' ),
        self = this;

    button.innerHTML = '开关';
    this.button = document.body.appendChild( button );
    this.button.onclick = function(){
        self.buttonWasPressed();
    }
};
Light.prototype.buttonWasPressed = function(){
    if ( this.state === 'off' ){
        console.log( '开灯' );
        this.state = 'on';
    }else if ( this.state === 'on' ){
        console.log( '关灯' );
        this.state = 'off';
    }
};


// var light = new Light();
// light.init();

// 更复杂的状态
Light.prototype.buttonWasPressed = function(){
    if ( this.state === 'off' ){
        console.log( '弱光' );
        this.state = 'weakLight';
    }else if ( this.state === 'weakLight' ){
        console.log( '强光' );
        this.state = 'strongLight';
    }else if ( this.state === 'strongLight' ){
        console.log( '关灯' );
        this.state = 'off';
    }
};

// 上面的例子所有状态都封装在buttonWasPressed方法里，且状态切换不明显
// 优化，定义三种状态
// OffLightState：
var OffLightState = function( light ){
    this.light = light;
};
OffLightState.prototype.buttonWasPressed = function(){
    console.log( '弱光' );    // offLightState对应的行为
    this.light.setState( this.light.weakLightState );    // 切换状态到weakLightState
};
// WeakLightState：
var WeakLightState = function( light ){
    this.light = light;
};
WeakLightState.prototype.buttonWasPressed = function(){
    console.log( '强光' );    // weakLightState对应的行为
    this.light.setState( this.light.strongLightState );    // 切换状态到strongLightState
};
// StrongLightState：
var StrongLightState = function( light ){
    this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function(){
    console.log( '关灯' );    // strongLightState对应的行为
    this.light.setState( this.light.offLightState );    // 切换状态到offLightState
};

var Light = function(){
    this.offLightState = new OffLightState( this );
    this.weakLightState = new WeakLightState( this );
    this.strongLightState = new StrongLightState( this );
    this.button = null;
};

Light.prototype.init = function(){
    var button = document.createElement( 'button' ),
        self = this;


    this.button = document.body.appendChild( button );
    this.button.innerHTML = '开关';

    this.currState = this.offLightState;    // 设置当前状态

    this.button.onclick = function(){
        self.currState.buttonWasPressed();
    }
};
Light.prototype.setState = function( newState ){
    this.currState = newState;
};
// var light = new Light();
// light.init();


// 状态机
var Light = function(){
    this.currState = FSM.off;    // 设置当前状态
    this.button = null;
};

Light.prototype.init = function(){
       var button = document.createElement( 'button' ),
        self = this;

    button.innerHTML = '已关灯';
    this.button = document.body.appendChild( button );

    this.button.onclick = function(){
        self.currState.buttonWasPressed.call( self );    // 把请求委托给FSM状态机
    }
};

// 定义状态机
var FSM = {
    off: {
        buttonWasPressed: function(){
            console.log( '关灯' );
            this.button.innerHTML = '下一次按我是开灯';
            this.currState = FSM.on;
        }
    },
    on: {
        buttonWasPressed: function(){
            console.log( '开灯' );
            this.button.innerHTML = '下一次按我是关灯';
            this.currState = FSM.off;
        }
    }
};

// var light = new Light();
// light.init();




// 14、适配器模式：作用是解决两个软件实体间的接口不兼容的问题。
// 适配器又叫包装器

// 地图的例子
var googleMap = {
    show: function(){
        console.log( '开始渲染谷歌地图' );
    }
};

var baiduMap = {
    display: function(){
        console.log( '开始渲染百度地图' );
    }
};

// 地图适配器
var baiduMapAdapter = {
    show: function(){
        return baiduMap.display();
    }
};
var renderMap = function( map ){
    if ( map.show instanceof Function ){
        map.show();
    }
};

renderMap( googleMap );        // 输出：开始渲染谷歌地图
renderMap( baiduMapAdapter );    // 输出：开始渲染百度地图


// 设计原则-SRP
// 单一职责原则、里氏替换原则、依赖倒置原则、接口隔离原则、合成复用原则和最少知识原则


// 单一职责原则：一个对象只做一件事
// 单一职责被定义为引起变化的原因

// 最少知识原则：一个软件实体应当尽可能少地与其他实体发生相互作用。增加中介者

// 开放-封闭：软件实体（类、模块、函数）等应该是可以扩展的，但是不可修改。
// 思想：当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以使用增加代码的方式，但是不允许改动程序的源代码。
// 用对象的多态性消除条件分支
// 找出变化的地方：放置挂钩，或者使用回调函数


// 接口&面向接口编程
// 接口是对象能响应的请求的集合

// abstract抽象类 extends
// interface接口继承 implements

// 代码重构
// 1、提炼函数
// 2、合并重复的条件片段
// 3、把条件语句提炼成函数
// 4、合理使用循环
// 5、提前让函数退出代替嵌套条件分支
// 6、传递对象参数
// 7、减少参数数量
// 8、少用三目运算
// 9、合理使用链式调用
// 10、分解大型类
// 11、用return退出大型循环


// 如果在页面加载完成后执行 document.write，它实际上会重写我们所在的页面，而document.createElement则不会。

// 1．创建型设计模式
// 创建型设计模式专注于处理对象创建机制，以适合给定情况的方式来创建对象。创建对象的基本方法可能导致项目复杂性增加，而这些模式旨在通过控制创建过程来解决这种问题。
// 属于这个类别的模式包括：Constructor（构造器）、Factory（工厂）、Abstract（抽象）、Prototype（原型）、Singleton（单例）和Builder（生成器）。
// 2．结构型设计模式
// 结构型模式与对象组合有关，通常可以用于找出在不同对象之间建立关系的简单方法。这种模式有助于确保在系统某一部分发生变化时，系统的整个结构不需要同时改变。同时对于不适合因某一特定目的而改变的系统部分，这种模式也能够帮助它们完成重组。
// 属于这个类别的模式包括：Decorator（装饰者）、Facade（外观）、Flyweight（享元）、Adapter（适配器）和Proxy（代理）。
// 3．行为设计模式
// 行为模式专注于改善或简化系统中不同对象之间的通信。
// 行为模式包括：Iterator（迭代器）、Mediator（中介者）、Observer（观察者）和Visitor （访问者）。

// 给对象定义属性的四种方式
// 1、点
// 2、[]
// 3、Object.defineProperty(Object, key, desc)
// 4、Object.defineProperties(Object, {})



// 使用闭包实现一个私有属性
let privateProperty = function() {
    let a = 1;
    return {
        add: function() {
            a++;
        },
        getValue: function() {
            return a;
        }
    }
}()
console.log(privateProperty.getValue());


// 观察者模式：Observer（观察者）是一种设计模式，其中，一个对象（称为subject）维持一系列依赖于它（观察者）的对象，将有关状态的任何变更自动通知给它们。
// 当一个目标需要告诉观察者发生了什么有趣的事情，它会向观察者广播一个通知（可以包括与通知主题相关的特定数据）






