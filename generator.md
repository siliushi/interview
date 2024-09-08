# ES6 生成器
很可能你看到的其他多数 JavaScript 文档和代码中的生成器声明格式都是 function* foo() { .. }，而不是我这里使用的 function *foo() { .. }: 唯一区别是 * 位置的风格不同。这两种形式在功能和语法上都是等同的，还 有一种是function*foo(){ .. }(没有空格)也一样。两种风格，各有优 缺，但总体上我比较喜欢function *foo..的形式，因为这样在使用*foo() 来引用生成器的时候就会比较一致。如果只用 foo() 的形式，你就不会清楚 知道我指的是生成器还是常规函数。这完全是一个风格偏好问题。
var x = 1;
     function *foo() {
        x++;
		yield; // 暂停!
        console.log( "x:", x );
     }
    function bar() {
        x++;
  	}
// 构造一个迭代器it来控制这个生成器
var it = foo();
console.log(x) // 1
// 这里启动foo()! 
it.next();
x; // 2 
bar();
x; // 3 
it.next(); // x: 3

传递值
function *foo(x) {
  var y = x * (yield);
  return y;
}
var it = foo( 6 );
// 启动foo(..) it.next();
var res = it.next( 7 );
res.value;     // 42
问什么next会比yield多一个？
因为第一个 next(..) 总是启动一个生成器，并运行到第一个 yield 处。不过，是第二个 next(..) 调用完成第一个被暂停的 yield 表达式，第三个 next(..) 调用完成第二个 yield， 以此类推。

function *foo(x) {
    var y = x * (yield "Hello"); // <-- yield一个值!
    return y;
}
var it = foo( 6 );
var res = it.next();
res.value; // hello
res = it.next( 7 );
res.value; // 42

同一个生成器的多个实例可以同时运行，它们甚至可以彼此交互:
function *foo() {
    var x = yield 2;
    z++;
    var y = yield (x * z);
    console.log( x, y, z );
}
var z = 1;
var it1 = foo();
var it2 = foo();
var val1 = it1.next().value;
var val2 = it2.next().value;
val1 = it1.next( val2 * 10 ).value;
val2 = it2.next( val1 * 5 ).value;
it1.next( val2 / 2 );
it2.next( val1 / 4 );

循环迭代
while(var it; it = something.next() && !it.done) {
	if(it.value > 100) break;
}
for(let key of Object.keys(obj)) {}
for(let key in obj) {}

# 停止生成器
在前面的例子中，看起来似乎 *something() 生成器的迭代器实例在循环中的 break 调用之 后就永远留在了挂起状态。
其实有一个隐藏的特性会帮助你管理此事。for..of 循环的“异常结束”(也就是“提前终 止”)，通常由 break、return 或者未捕获异常引起，会向生成器的迭代器发送一个信号使 其终止。
严格地说，在循环正常结束之后，for..of 循环也会向迭代器发送这个信号。 对于生成器来说，这本质上是没有意义的操作，因为生成器的迭代器需要先 完成 for..of 循环才能结束。但是，自定义的迭代器可能会需要从 for..of 循环的消费者那里接收这个额外的信号。

可以在外部通过return(..) 手工终止生成器的迭代器实例
var it = something();
it.return( "Hello World" ).value
调用 it.return(..) 之后，它会立即终止生成器，这当然会运行 finally 语句。另外，它 还会把返回的value设置为传入return(..)的内容，这也就是"Hello World"被传出 去的过程。


通过生成器来表达同样的任务流程控制
function foo(x,y) {
    ajax(
        "http://some.url.1/?x=" + x + "&y=" + y,
        function(err,data){
			if (err) {
				// 向*main()抛出一个错误 
				it.throw( err );
			}
			else {
				// 用收到的data恢复*main()
                it.next( data );
            }
		}
	);
}
function *main() {
         try {
             var text = yield foo( 11, 31 );
             console.log( text );
         }
         catch (err) {
             console.error( err );
} }
var it = main();
// 这里启动! 
it.next();
上面是函数向生成器抛出错误，下面是生成器向函数抛出错误
function *main() {
    var x = yield "Hello World";
	yield x.toLowerCase(); // 引发一个异常! 
}
var it = main();
it.next().value;
try {
    it.next( 42 );
} catch (err) {
    console.log(err)
}

实现从 *bar() 调用 *foo()，称为 yield 委托。yield 委托 的具体语法是:yield * __(注意多出来的 *)。
function *foo() {
    console.log( "*foo() starting" );
    yield 3;
	yield 4;
	console.log( "*foo() finished" );
}
function *bar() {
    yield 1;
    yield 2;
    yield *foo(); // yield委托!
    yield 5;
}
var it = bar();
it.next().value; // 1
it.next().value; // 2
it.next().value; // *foo()启动 // 3
it.next().value; // 4
it.next().value; // *foo()完成 // 5
yield *暂停了迭代控制，而不是生成器控制。当你调用*foo()生成器 时，现在 yield 委托到了它的迭代器。但实际上，你可以 yield 委托到任意 iterable，yield *[1,2,3] 会消耗数组值 [1,2,3] 的默认迭代器。





