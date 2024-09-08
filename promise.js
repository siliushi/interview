// class Promise {
// 	constructor(executor) {
// 		this.status = 'pending'
// 		this.value = undefined
// 		this.reason = undefined
// 		this.onFulfilledCallbacks = []
// 		this.onRejectedCallbacks = []

// 		const resolve = value => {
// 			if(this.status === 'pending') {
// 				this.status = 'fulfilled'
// 				this.value = value
// 				this.onFulfilledCallbacks.forEach(fn => fn())
// 			}
// 		}
// 		const reject = reason => {
// 			if(this.status === 'pending') {
// 				this.status = 'rejected'
// 				this.reason = reason
// 				this.onRejectedCallbacks.forEach(fn => fn())
// 			}
// 		}

// 		try {
// 			executor(resolve, reject)
// 		} catch(err) {
// 			reject(err)
// 		}
// 	}
// 	then(onFulfilled, onRejected) {
// 		return new Promise((resolve, reject) => {
// 			if(this.status === 'fulfilled') {
// 				try {
// 					let x = onFulfilled(this.value)
// 					resolve(x)
// 				} catch(err) {
// 					reject(err)
// 				}
// 			} else if(this.status === 'rejected') {
// 				try {
// 					let x = onRejected()
// 					resolve(x)
// 				} catch(err) {
// 					reject(err)
// 				}
// 			} else if(this.status === 'pending') {
// 				this.onFulfilledCallbacks.push(() => {
// 					try {
// 						let x = onFulfilled(this.value)
// 						resolve(x)
// 					} catch(err) {
// 						reject(err)
// 					}
// 				})
// 				this.onRejectedCallbacks.push(() => {
// 					try {
// 						let x = onRejected()
// 						resolve(x)
// 					} catch(err) {
// 						reject(err)
// 					}
// 				})
// 			}
// 		})
// 	}
// }



var p1 = Promise.resolve( 42 );
var p2 = Promise.resolve( "Hello World" );
var p3 = Promise.reject( "Oops" );
Promise.race([p1,p2,p3])
.then( function(msg){
 console.log( msg ); // 42
});
Promise.all([p1,p2,p3])
.catch( function(err){
 console.error( err ); // "Oops"
});
Promise.all( [p1,p2] )
.then( function(msgs){
 	console.log( msgs ); // [42,"Hello World"]
});

var p1 = Promise.resolve( 42 );
p1.then(function() {
	console.log(4)
	return 2;
})
.then(function() {
	console.log(5)
	return 3
})
.catch(function(res) {
	console.log(1111)
	return 4
})