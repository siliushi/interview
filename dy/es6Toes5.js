// es6
// class Product {
//     static count = 0;
//     constructor(name, unitPrice, number) {
//         this.name = name;
//         this.unitPrice = unitPrice;
//         this.number = number;
//         Product.count++;
//     }
//     get totalPrice() {
//         return this.number * this.unitPrice;
//     }
//     increase() {
//         this.number++;
//     }
// }

// es5
function Product(name, unitPrice, number) {
    this.name = name;
    this.unitPrice = unitPrice;
    this.number = number;
    Product.count++;
}
Product.count = 0;
Product.prototype.increase = function() {
    this.number++;
}

// 第一点：上面的代码会有函数提升，但是class没有提升，通过立即执行函数解决
// 第二点：class必须用new调用，es6可以通过new.target判断
// 第三点：es6访问器创建的属性出现在两个地方，一个在原型，一个在实例上
// 第四点：实例上的属性不可枚举
// 第五点：es6方法不可枚举
// 第六点：es6方法不可new
// 第七点：继承
var Product = (function() {
    function Product(name, unitPrice, number) {
        // 判断没有使用new调用，非官方的this.__proto__ !== Product.prototype
        if(Object.getPrototypeOf(this) !== Product.prototype) {
            throw new TypeError('Class constructor Product cannot be invoked without new ')
        }
        this.name = name;
        this.unitPrice = unitPrice;
        this.number = number;
        Product.count++;
    }

    // 实例上加访问器
    Object.defineProperty(this, 'totalPrice', {
        get() {
            return this.number * this.unitPrice
        },
        // 属性不可枚举
        enumerable: false
    })

    // 原型加访问器
    Object.defineProperty(Product.prototype, 'totalPrice', {
        get() {
            return this.number * this.unitPrice
        }
    })

    Product.count = 0;
    // 方法不可枚举
    Object.defineProperty(Product.prototype, 'increase', {
        value: function() {
            // 方法不可new
            if(Object.getPrototypeOf(this) === Product.prototype.increase.prototype) {
                throw new TypeError('increase is not a constructor')
            }
            this.number++;
        },
        enumerable: false
    })
    // Product.prototype.increase = function() {
    //     this.number++;
    // }
    return Product;
})()

const p = new Product('honor', 1, 1);
console.log(p)