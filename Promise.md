# promise
我们用回调函数来封装程序中的 continuation，然后把回调交给第三方（甚至可能是外部代码），接着期待其能够调用回调，实现正确的功能。
如果我们能够把控制反转再反转回来，会怎样呢？如果我们不把自己程序的continuation 传给第三方，而是希望第三方给我们提供了解其任务何时结束的能力，然后由我们自己的代码来决定下一步做什么，那将会怎样呢？
这种范式就称为 Promise。

解决两个问题
1、回调嵌套
2、控制反转，信任问题

Promise 本身是与时间无关的，可以按照可预测的方式组成（组合），而不用关心时序或底层的结果。

promise instanceof Promise
不准去的原因：
1、promise可能是通过其他窗口传过来
2、一些第三方库自己实现了Promise

除了resolve、reject不需要return，其他传值需要用return

new Promise( function(..){ .. } )
传入的函数会立即执行


# 执行顺序问题
var p3 = new Promise( function(resolve,reject){ 
 resolve( "B" ); 
} ); 
var p1 = new Promise( function(resolve,reject){ 
 resolve( p3 );
} ); 
p2 = new Promise( function(resolve,reject){ 
 resolve( "A" );
} ); 
p1.then( function(v){ 
 console.log( v );
} );
p2.then( function(v){ 
 console.log( v ); 
} ); 
// A B

# 问什么promise.resolve既可以是常量也可以是promise
如果向 Promise.resolve(..) 传递一个非 Promise、非 thenable 的立即值，就会得到一个用这个值填充的 promise。
如果向 Promise.resolve(..) 传递了一个非Promise的thenable值，前者就会试图展开这个值，而且展开过程会持续到提取出一个具体的非类 Promise 的最终值。

Promise如果没有任何返回值，那么这个值就是 undefined，响应函数只会被调用一次
如果使用多个参数调用 resovle(..) 或者 reject(..)，第一个参数之 后的所有参数都会被默默忽略。如果要传递多个值，你就必须要把它们封装在单个值中传递，比如通过一个数组或对象。

var p = new Promise( function(resolve,reject){ 
	foo.bar(); // foo未定义，所以会出错! 
	resolve( 42 ); // 永远不会到达这里
})
p.then(
    function fulfilled(){
		// 永远不会到达这里
	},
	function rejected(err){
		// err将会是一个TypeError异常对象来自foo.bar()这一行
		return 1;
	}
)
.then(function(res) {
	console.log(res) // 1
})

var p = new Promise(resolve => resolve(21))
p.then( function(){
     p.then( function(){
         console.log( "C" );
     } );
     console.log( "A" );
});
p.then( function(){
    console.log( "B" );
});
// A B C

var p = new Promise(resolve => resolve(21))
 p.then( function(v){
     console.log( v );       // 21
	// 创建一个promise并将其返回
	return new Promise( function(resolve,reject){
			// 用值42填充
			resolve( v * 2 );
	});
	return new Promise( function(resolve,reject){
		// 引入异步! 
		setTimeout( function(){
			// 用值42填充
            resolve( v * 2 );
        }, 100 );
	});
}).then( function(v){
	console.log( v ); // 42
});

// 延迟执行
function delay(time) {
    return new Promise( function(resolve,reject){
        setTimeout( resolve, time );
    });
}
delay(1000).then(() => {console.log(1)}).then(() => {console.log(2)})

// Promise-aware ajax
function request(url) {
	return new Promise( function(resolve,reject){
		// ajax(..)回调应该是我们这个promise的resolve(..)函数
		ajax( url, resolve );
	}); 
}

# ajax
function request(url) { 
 return new Promise( function(resolve,reject){ 
 // ajax(..)回调应该是我们这个promise的resolve(..)函数
 ajax( url, resolve ); 
 } ); 
}
request( "http://some.url.1/" ) 
.then( function(response1){ 
 return request( "http://some.url.2/?v=" + response1 ); 
} ) 
.then( function(response2){ 
 console.log( response2 ); 
} );

默认拒绝函数
function(err) { 
	throw err; 
}

var p = Promise.resolve( 42 );
// 只处理拒绝(如果有的话)， 但又把完成值传递下去
p.then(
// 假设的完成处理函数，如果省略或者传入任何非函数值 // function(v) {
// return v;
// }
null, // 会有作为替代的一个默认处理函数
function rejected(err){
	
}
);

# Promise 固有特性
• 调用 Promise 的 then(..) 会自动创建一个新的 Promise 从调用返回。
• 在完成或拒绝处理函数内部，如果返回一个值或抛出一个异常，新返回的（可链接的）Promise 就相应地决议。
• 如果完成或拒绝处理函数返回一个 Promise，它将会被展开，这样一来，不管它的决议值是什么，都会成为当前 then(..) 返回的链接 Promise 的决议值。


 // 构造器的第一个参数回调会展开 thenable
var rejectedPr = new Promise( function(resolve,reject){ 
	// 用一个被拒绝的promise完成这个promise
	resolve( Promise.reject( "Oops" ) );
});
rejectedPr.then(
    function fulfilled(){
		// 永远不会到达这里
	},
    function rejected(err){
        console.log( err ); // "Oops"
    } 
);


try..catch只能处理同步任务错误，
function foo() {
         setTimeout( function(){
             baz.bar();
         }, 100 );
}
try {
	foo();
	// 后面从 `baz.bar()` 抛出全局错误 
} catch (err) {
	// 永远不会到达这里
}

为了避免丢失被忽略和抛弃的 Promise 错误，一些开发者表示，Promise 链的一个最佳实践 就是最后总以一个 catch(..) 结束
如果catch里也报错怎么办？
第一种，是定义一个某个时长的定时器，比如 3 秒钟，在拒绝的时刻启动。如果 Promise 被拒绝，而在定时器触发之前都没有错误处理函数被注册，那它就会假定你不会注册处理函数，进而就是未被捕获错误。
第二种，添加一个 done(..) 函数，done(..) 不会创建和返回 Promise，所以传递给 done(..) 的回调显然不会报告一个并不存在的链接 Promise 的问题。
var p = Promise.resolve( 42 ); 
p.then( 
 function fulfilled(msg){ 
 // 数字没有string函数，所以会抛出错误
 console.log( msg.toLowerCase() ); 
 } 
) 
.done( null, handleErrors ); 
// 如果handleErrors(..)引发了自身的异常，会被全局抛出到这里
第三种，借助浏览器的垃圾回收

第四种，
• 默认情况下，Promsie 在下一个任务或时间循环 tick 上（向开发者终端）报告所有拒绝，如果在这个时间点上该 Promise 上还没有注册错误处理函数。
• 如果想要一个被拒绝的 Promise 在查看之前的某个时间段内保持被拒绝状态，可以调用defer()，这个函数优先级高于该 Promise 的自动错误报告。

如果一个 Promise 被拒绝的话，默认情况下会向开发者终端报告这个事实（而不是默认为沉默）。可以选择隐式（在拒绝之前注册一个错误处理函数）或者显式（通过 defer()）禁止这种报告。
var p = Promise.reject( "Oops" ).defer(); 
// foo(..)是支持Promise的
foo( 42 ) 
.then( 
 function fulfilled(){ 
 return p; 
 }, 
 function rejected(err){ 
 // 处理foo(..)错误
 } 
); 
从 foo(..) 返回的 promise 立刻就被关联了一个错误处理函数，所以它也隐式消除了出错全局报告。
但是，从 then(..) 调用返回的 promise 没有调用 defer()，也没有关联错误处理函数，所以如果它（从内部或决议处理函数）拒绝的话，就会作为一个未捕获错误被报告到开发者终端。



# 链式流
• 每次你对 Promise 调用 then(..)，它都会创建并返回一个新的 Promise，我们可以将其
链接起来；
• 不管从 then(..) 调用的完成回调（第一个参数）返回的值是什么，它都会被自动设置
为被链接 Promise（第一点中的）的完成。


# Promise.all
所有的成员 promise 都完成后才会完成。任何一个被拒绝的话，Promise.all([ .. ])就会立即被拒绝，并丢弃来自其他所有 promise 的全部结果。
Promise.all([]).catch()
# Promise.race
“第一个跨过终点线的 Promise”，而抛弃其他 Promise。
传入了一个空数组，Promise.race会立即完成，但 Promise.race([ .. ]) 会挂住，且永远不会决议。
**可以实现超时竞赛**

# finally
finally(..) 还是会创建并返回一个新的Promise（以支持链接继续）

# new Promise(..) 构造器
提供一个函数回调。这个回调是同步的或立即调用的。


# 错误处理
如果promise链中发生错误，接下来的任意then没有reject处理就会到catch，如果有处理就到reject处理函数不会到catch
catch、finally只传一个函数，catch处理错误，finally一定会执行

# 嵌套promise
var p1 = new Promise(function(resolve, reject) {
	return new Promise(function(resolve, reject) {
		resolve(1)
	}).then(resolve)
});

# 缺陷
Promise 链中的错误很容易被无意中默默忽略掉。
单一值
无法取消的 Promise：一旦创建了一个 Promise 并为其注册了完成和 / 或拒绝处理函数，如果出现某种情况使得这个任务悬而未决的话，你也没有办法从外部停止它的进程。


用回调表达异步控制流程的两个关键缺陷：
• 基于回调的异步不符合大脑对任务步骤的规划方式；
• 由于控制反转，回调并不是可信任或可组合的。