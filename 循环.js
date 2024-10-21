// 在前端 JavaScript 中，通常认为普通的 for 循环比 forEach 高效的原因主要有以下几点：
// 作用域链和闭包：使用 forEach 时，对于每个元素都会创建一个函数作为回调，这可能导致额外的闭包和作用域链查找，影响性能。而普通的 for 循环中直接访问变量，不会涉及额外的闭包。
// 函数调用开销：forEach 方法会为数组中的每个元素调用传入的回调函数，而函数调用本身会有一定的性能开销。相比之下，for 循环中的逻辑直接执行，没有函数调用开销。
// 优化问题：在某些 JavaScript 引擎中，对于简单的 for 循环结构，引擎可能会进行更好的优化，提高执行效率。而 forEach 操作可能无法被同样程度地优化。

// https://blog.csdn.net/muzidigbig/article/details/123899753
// https://blog.csdn.net/Cwhat/article/details/136819531

// 数组长度为500以内，forEach比map快，超过就相反

// for > forEach ≈ map > for in
const arr = Array.from({length: 1}).fill(0);
console.time()
// for循环没有额外的函数调用栈和上下文，所以它的实现最为简单。
for(let i = 0, l = arr.length; i < l; i++) {
    console.log()
}
console.timeEnd()

console.time()
arr.forEach(v => {})
console.timeEnd()

console.time()
// map最慢的原因是因为map会返回一个新的数组，数组的创建和赋值会导致分配内存空间，因此会带来较大的性能开销。
arr.map(v => {})
console.timeEnd()


// for 与 forEach、map的区别

// 在固定长度或者长度不要计算的时候for循环效率高于foreach和map，for循环中可以通过break终止。
// 在不确定长度或者计算长度有损性能的时候用foreach和map比较方便

// forEach、map的区别
// 相同点：

// 都是循环遍历数组中的每一项
// forEach和map方法里每次执行匿名函数都支持3个参数，参数分别是item（当前每一项），index（索引值），arr（原数组）
// 循环匿名函数中的this都是指向window
// 循环只能遍历数组
// 循环都不会改变原数组

// 不同点：
// map方法返回一个新的数组，数组中的元素为原始数组调用函数处理后的值
// forEach方法不会返回新数组

// forEach导致的其他问题

// 不支持处理异步函数
// 无法捕获异步函数中的错误
// 除了抛出异常以外，没有办法中止或跳出 forEach() 循环
// forEach 删除自身元素，index不可被重置
// this指向问题
// 会跳过已删除或者未初始化的项

