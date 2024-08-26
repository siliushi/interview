真随机：物理世界
计算机01的二进制，如果要在计算机里面实现真随机需要借助设备，比如光电、量子等
伪随机
- 种子
Java里的 new Random(种子)
JS：Math.random() // 浏览器自带种子
- 动态概率

用void 0代替undefined
null等关键字不能被当成变量使用，但是undefined可以被赋值，window下面是只读的，但是局部作用域是可写的


console.log显示的问题，当显示一个复杂数据，浏览器为了优化性能，折叠输出，当点击展开是才会真正读区变量
let obj = [{a: 1}, {b: 2}]
console.log(obj)
obj[0].a = 3
console.log(obj)

