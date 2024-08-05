"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.baz = exports.Util = void 0;
// ??  如果给定变量值为 null 或者 undefined，则使用双问号后的默认值，否则使用该变量值
var text;
// 下面两个一样效果
console.log(text !== null && text !== void 0 ? text : '-');
console.log(text || '-');
// !! 判断某个变量是否存在。第一个 ! 作用于变量，使其转换为布尔类型，并且取反；第二个 ! 再次取反，得到真正的布尔值。空数组和空对象使用 !!， 返回 true
var Point = /** @class */ (function () {
    // 构造函数，可以在成员中加一个修饰符前缀，它会在类上自动声明，并且从构造器中复制过去。
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (pointer) {
        return new Point(this.x + pointer.x, this.y + pointer.y);
    };
    return Point;
}());
var pointer1 = new Point(1, 1);
var pointer2 = new Point(2, 2);
console.log(pointer1.add(pointer2));
var list = [{
        id: '0',
        display: 'a'
    }, {
        id: '1',
        display: '1'
    }];
var list2 = [{
        id: '0',
        display: 'a'
    }, {
        id: '1',
        display: '1'
    }];
var index = list.map(function (i) { return i.id; }).indexOf('1');
var content = list.filter(function (i) { return i.id === '0'; });
console.log(index);
console.log(content);
// 可选参数只能出现在参数列表的最后
function foo(x, y) {
    if (y)
        return { x: x, y: y };
    if (!y)
        return { x: x };
}
console.log(foo(1, 2));
// 返回值增加undefined
function toInit(str) {
    var int = parseInt(str);
    if (isNaN(int))
        return { valid: true, int: int };
    if (!isNaN(int))
        return { valid: false };
}
// JSON支持null，不支持undefined，会把undefined删掉
console.log(JSON.parse(JSON.stringify({ a: null, b: undefined })));
// extends
var Point3 = /** @class */ (function (_super) {
    __extends(Point3, _super);
    function Point3(x, y, z) {
        var _this_1 = _super.call(this, x, y) || this;
        _this_1.x = x;
        _this_1.y = y;
        _this_1.z = z;
        return _this_1;
    }
    Point3.prototype.add = function (point) {
        var point2 = _super.prototype.add.call(this, point);
        return new Point3(point2.x, point2.y, this.z + point.z);
    };
    return Point3;
}(Point));
var point3_1 = new Point3(1, 2, 3);
var point3_2 = new Point3(2, 3, 4);
console.log(point3_1.add(point3_2));
var study3 = {
    name: '王五',
    gender: '男',
    work: '敲代码',
    study: function (arr) { return arr.map(function (it) { return study3.work; }); },
    hobby: ['抽烟', '喝酒', '烫头']
};
var newHobby = study3.study(study3.hobby);
console.log(newHobby); // [ '敲代码','敲代码','敲代码' ]
// static，静态属性或者静态函数，被所有实例共享，所以只能通过类取值，可以被子类继承
var Something = /** @class */ (function () {
    function Something() {
        Something.instances++;
    }
    Something.instances = 0;
    return Something;
}());
var something1 = new Something();
var something2 = new Something();
console.log(Something.instances);
// abstract 可以用在类或类的成员，意味着该函数不能直接被调用，并且子类必须实现
// abstract类不能直接被实例化，用户必须创建一个类来继承abstract 类。 
// abstract成员不能直接被访问，子类必须实现这个功能。
// extends
var _extends = this._extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) {
            d[p] = b[p];
        }
    }
    function _() {
        this.constructor = d;
    }
    _.prototype = b.prototype;
    d.prototype = new _();
};
// 赋值
// d.prototype.__proto__ =  b.prototype;
// 取值
// d.__proto__.__proto__.property
function f() { }
console.log(f.prototype.__proto__.property);
// ●__proto__. 
// ● prototype. 
// ● new在函数调用时对其内部this的影响。 创建一个新的空对象，将新创建的对象设置为函数的this值。不实用new，this指向全局对象
// ● new对__proto__和prototype的影响。
// 在 JavaScript 中，__proto__ 和 prototype 是两个相关但不同的概念。
// __proto__ 是一个非标准的属性，它存在于对象实例中，并指向该对象的原型。它可以用于获取或设置对象的原型。然而，由于它不是标准属性，不建议在生产环境中使用它，而是使用标准的 Object.getPrototypeOf() 和 Object.setPrototypeOf() 方法来操作对象的原型。
// prototype 是一个标准的属性，它只存在于函数对象中。当一个函数被用作构造函数创建对象时，该函数的 prototype 属性将被用作新对象的原型。也就是说，通过 new 关键字创建的对象的 __proto__ 属性将指向构造函数的 prototype 属性。
// 下面是 new 关键字对 __proto__ 和 prototype 的影响：
// __proto__ 的影响：通过 new 关键字创建的对象的 __proto__ 属性将指向构造函数的 prototype 属性。这意味着新对象将继承构造函数的原型链，可以访问原型链上的属性和方法。
// prototype 的影响：prototype 属性只存在于函数对象中，而不是对象实例中。通过 new 关键字创建的对象将继承构造函数的 prototype 属性作为其原型。这意味着新对象将继承构造函数原型上定义的属性和方法。
// 总结起来，通过 new 关键字创建的对象将继承构造函数的原型链，其中 __proto__ 属性指向构造函数的 prototype 属性。这使得新对象可以访问构造函数原型上定义的属性和方法。
function Person(age) {
    this.age = age;
    var _this = this;
    this.add = function () {
        _this.age++;
    };
}
var person = new Person(1);
// 你使用setTimeout时，如果传递给它的是一个函数引用，那么在函数执行时，this将会指向全局对象（在浏览器中通常是window对象）。这是因为setTimeout函数会将函数作为一个独立的任务推迟执行，而不是在原始的上下文中执行。
// 然而，如果你将函数包裹在另一个函数中，那么this将会保持绑定到包裹函数的上下文。这是因为在包裹函数中，this的值是由调用方式决定的，而不是由setTimeout决定的。
// 或者箭头函数
// setTimeout(person.add, 1000);
// setTimeout(function() {console.log(person.age)}, 2000);
// 如果使用箭头函数，属性不能用super调用，只能用this
var Adder = /** @class */ (function () {
    function Adder(x) {
        var _this_1 = this;
        this.x = x;
        this.add = function (y) {
            return _this_1.x + y;
        };
    }
    return Adder;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(x, y) {
        var _this_1 = _super.call(this, x) || this;
        _this_1.x = x;
        _this_1.y = y;
        return _this_1;
    }
    Child.prototype.CallAdder = function () {
        return this.add(this.y);
    };
    return Child;
}(Adder));
var Child2 = /** @class */ (function (_super) {
    __extends(Child2, _super);
    function Child2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child2.prototype.CallAdder = function (y) {
        return this.add(y);
    };
    return Child2;
}(Adder));
var adder1 = new Child(1, 1);
var adder2 = new Child2(1);
console.log(adder1.CallAdder());
console.log(adder2.CallAdder(1));
var test = function () { return ({ a: 1 }); };
// reset参数
var re = function (a, b) {
    var c = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        c[_i - 2] = arguments[_i];
    }
    console.log(c);
};
re(1, 2);
re(1, 2, 3);
// 可以使用闭包解决
var funs = [];
var _loop_1 = function (i) {
    funs.push(function () {
        console.log(i);
    });
};
for (var i = 0; i < 3; i++) {
    _loop_1(i);
}
for (var k = 0; k < 3; k++) {
    funs[k]();
}
var a = 1; // 声明必须初始化，仍然允许对象的子属性改变
var b = 2; // 块级作用域
var c = 3; // 函数级作用域
// 对象和数组解构
var obj = { a1: { a11: 1 }, b1: 2 };
// const {a1: {a11}, b1} = obj;
var b1 = obj.b1, t = __rest(obj, ["b1"]);
console.log(t);
// 交换值
var m = 1;
var n = 2;
_a = [n, m], m = _a[0], n = _a[1];
function foo1(x, y, z) {
    console.log(x, y, z);
}
var args = [0, 1, 2];
// A spread argument must either have a tuple type or be passed to a rest parameter.
foo1.apply(void 0, args);
// 扩展运算符 --  后面的覆盖前面的
var object1 = { a: 1, b: 2 };
var object2 = __assign(__assign({}, object1), { a: 5 });
console.log(object2);
var Component = /** @class */ (function () {
    function Component(name) {
        this.name = name;
    }
    return Component;
}());
var Frame = /** @class */ (function () {
    function Frame(name, components) {
        this.name = name;
        this.components = components;
        this.pointer = 0;
    }
    Frame.prototype.next = function () {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            };
        }
        else {
            return {
                done: true,
                value: null
            };
        }
    };
    return Frame;
}());
// 使用Symbol.iterator
var Frame1 = /** @class */ (function (_super) {
    __extends(Frame1, _super);
    function Frame1(name, components) {
        var _this_1 = _super.call(this, name, components) || this;
        _this_1.name = name;
        _this_1.components = components;
        _this_1.pointer1 = 0;
        return _this_1;
    }
    Frame1.prototype.next = function () {
        if (this.pointer1 < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer1++]
            };
        }
        else {
            return {
                done: true,
                value: null
            };
        }
    };
    return Frame1;
}(Frame));
var frame = new Frame1('Door', [
    new Component('1'),
    new Component('2'),
    new Component('3'),
    new Component('4'),
]);
var frame1 = frame.next();
var frame2 = frame.next();
var frame3 = frame.next();
var frame4 = frame.next();
console.log(frame1.value);
// for(let cmp of frame) {
//     console.log(cmp)
// }
// 模版字符串
var say = '123';
var html = "<div>".concat(say, "</div>");
console.log(html);
// import fs = require('fs');
// 加载文件并执行回调
function loadFile(filename, cb) { }
// promise，当reject、throw new Error都不会触发then
var promise = new Promise(function (resolve, reject) {
    resolve(123);
    return new Promise(function (resolve, reject) { resolve(1234); });
});
promise.then(function (res) {
    console.log(res);
    return 456;
}).then(function (res) {
    console.log(res);
    return new Promise(function (resolve, reject) {
        resolve(789);
    });
}).then(function (res) {
    console.log(res);
});
// 模拟服务端掉用
function loadItem(id) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve({ id: id });
        }, 1000);
    });
}
loadItem(1).then(function (res) {
    console.log(res);
    return loadItem(2);
}).then(function (res) {
    console.log(res);
});
// 运行多个任务，返回一个list，包含结果
Promise.all([loadItem(1), loadItem(2)]).then(function (res) {
    console.log('aaa', res);
});
var task1 = new Promise(function (resolve) {
    setTimeout(resolve, 1000, 'one');
});
var task2 = new Promise(function (resolve) {
    setTimeout(resolve, 1000, 'two');
});
// 只要有一个返回就结速
Promise.race([task1, task2]).then(function (res) {
    console.log(res);
});
// import a from ''
// import a = require('a')
// const _foo : typeof foo = require('foo');
// 命名空间
// module 后一般接一个路径，而 namespace 后一半是一个命名空间名字
var Util;
(function (Util) {
    function Log(str) {
        console.log(str);
    }
    Util.Log = Log;
    function Err(str) {
        console.error(str);
    }
    Util.Err = Err;
})(Util || (exports.Util = Util = {}));
Util.Log('log');
Util.Err('error');
var _2_1 = require("./2");
(0, _2_1.default)();
// 内连类型注解
// any 将会关闭类型检查
// null undefined void
// 泛型
function reverse(iterms) {
    var toreturn = [];
    for (var i = iterms.length - 1; i >= 0; i--) {
        toreturn.push(iterms[i]);
    }
    return toreturn;
}
var sample = [1, 2, 3];
console.log(reverse(sample));
// 泛型类
var MyClass = /** @class */ (function () {
    function MyClass() {
        this.list = [];
    }
    MyClass.prototype.add = function (value) {
        this.list.push(value);
    };
    MyClass.prototype.get = function (index) {
        return this.list[index];
    };
    return MyClass;
}());
var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    Stack.prototype.con = function () {
        console.log(this.items);
    };
    return Stack;
}());
var stack = new Stack();
stack.push(1);
stack.push(2);
stack.pop(); // 2
stack.con();
// 联合类型
var uni;
// 交叉类型
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
console.log(extend({ a: 1 }, { b: 2 }));
// 元组类型，js并不支持但是ts支持
var tuple;
var aliasValue;
aliasValue = 1;
function func(name) {
    console.log("".concat(name.firstName, " - ").concat(name.lastName));
}
var obj1 = {
    age: 20,
    firstName: 'p',
    lastName: 'r',
    nickName: 'q'
};
func(obj1); // 不报错
func({
    age: 1,
    firstName: 'p',
    lastName: 'r',
    nickName: 'q'
});
var func2 = function (key, value) {
    return '';
};
var Dog = /** @class */ (function () {
    function Dog(name) {
    }
    Dog.prototype.eat = function () {
        console.log(this.name);
    };
    return Dog;
}());
var getData = function (value) {
    return value;
};
getData('1234');
var getData1 = function (value) {
    return value;
};
getData('1234');
// 枚举
// 不同枚举的枚举变量，及时字面一样，也不想等
// 数字枚举
var Enum;
(function (Enum) {
    Enum[Enum["Clubs"] = 0] = "Clubs";
    Enum[Enum["Diamond"] = 1] = "Diamond";
    Enum[Enum["Hearts"] = 2] = "Hearts";
    Enum[Enum["Spads"] = 3] = "Spads";
})(Enum || (Enum = {}));
console.log(Enum.Clubs); // 0
console.log(Enum[0]);
// Enum[Enum["Clubs"] = 0] = "Clubs";
// 赋值运算返回的是被赋予的值
var a1;
console.log(a1 = 1); // 输出1；
// 改变关联的起始数字
var Numb;
(function (Numb) {
    Numb[Numb["Red"] = 3] = "Red";
    Numb[Numb["Blue"] = 4] = "Blue";
    Numb[Numb["Black"] = 5] = "Black";
})(Numb || (Numb = {}));
console.log(Numb.Black); // 5
// 负数采用2的补码，将对应的正数值进行否运算，然后加1
// 使用枚举做标记
// “枚举标记时，这些位运算符|（或）、&（与）、～（非）^(异或)”
// JavaScript 将数字存储为 64 位浮点数，但所有按位运算都以 32 位二进制数执行。
// 有符号整数都是用补码来表示二进制数，在补码表示中，最高位是符号位：0-正数，1-负数，补码规则为：正数最高位是0，其余的各位表示其数值本身；负数是该数值的绝对值的补码按位取反+1所得
// 负数的二进制是正数的补码
// 十进制正数取非
// 1、先取反得到正负
// 2、求补码，补码=反码+1
// 十进制负数取非
// 1、负数绝对值的补码
// 2、按位取反
var AnimalFlag;
(function (AnimalFlag) {
    AnimalFlag[AnimalFlag["None"] = 0] = "None";
    AnimalFlag[AnimalFlag["HasClaws"] = 1] = "HasClaws";
    AnimalFlag[AnimalFlag["CanFly"] = 2] = "CanFly";
    AnimalFlag[AnimalFlag["EatsFish"] = 4] = "EatsFish";
    AnimalFlag[AnimalFlag["Endangered"] = 8] = "Endangered"; // 1000 16
})(AnimalFlag || (AnimalFlag = {}));
function printAnimalAbilities(animal) {
    console.log(animal.key);
    var animalFlags = animal.flags;
    console.log('aaa', ~2);
    if (animalFlags & AnimalFlag.HasClaws) {
        console.log('animal has claws');
    }
    if (animalFlags & AnimalFlag.CanFly) {
        console.log('animal can fly');
    }
}
// 使用|=来添加一个标记。 
// 组合使用&=和～来清理一个标记。 
// 使用|来合并标记
var animal = { flags: AnimalFlag.None, key: 'test' };
console.log(printAnimalAbilities(animal));
animal.flags |= AnimalFlag.HasClaws;
console.log(printAnimalAbilities(animal));
animal.flags &= ~AnimalFlag.HasClaws;
console.log(printAnimalAbilities(animal));
animal.flags |= AnimalFlag.CanFly | AnimalFlag.HasClaws;
console.log(printAnimalAbilities(animal));
// 字符串枚举
var EnumStr;
(function (EnumStr) {
    EnumStr["first"] = "a";
    EnumStr["second"] = "b";
    EnumStr["third"] = "c";
})(EnumStr || (EnumStr = {}));
function call(fn) {
    console.log("".concat(fn.description, " returnd: ").concat(fn('hello')));
}
function func1(name) {
    return name;
}
func1.description = 'func1';
call(func1);
// 枚举也可以当作类型
// 静态枚举
var WeekDay;
(function (WeekDay) {
    WeekDay[WeekDay["Monday"] = 0] = "Monday";
    WeekDay[WeekDay["Tuseday"] = 1] = "Tuseday";
    WeekDay[WeekDay["Wednesday"] = 2] = "Wednesday";
    WeekDay[WeekDay["Thursday"] = 3] = "Thursday";
    WeekDay[WeekDay["Friday"] = 4] = "Friday";
    WeekDay[WeekDay["Saturday"] = 5] = "Saturday";
    WeekDay[WeekDay["Sunday"] = 6] = "Sunday";
})(WeekDay || (WeekDay = {}));
var Weekday;
(function (Weekday) {
    function isBusinessDasy(day) {
        switch (day) {
            case WeekDay.Saturday:
            case WeekDay.Sunday:
                return false;
            default:
                return true;
        }
    }
    Weekday.isBusinessDasy = isBusinessDasy;
})(Weekday || (Weekday = {}));
var monday = WeekDay.Monday;
var sunday = WeekDay.Sunday;
console.log(Weekday.isBusinessDasy(monday));
// lib.d.ts
// “这个文件包含JavaScript运行时及DOM”
// 箭头函数使用{}和不使用的区别
// 1、不使用会自动return
// 2、使用的this指向这个箭头函数本身，不使用则会继承外层
// 函数
// 参数注解
function parm(spampleParameter) { }
function StringOrNumber(a) {
    console.log(a);
    return a;
}
var FuncT = function (a) { console.log(a); return a; };
console.log(FuncT(1));
// 接口声明的函数需要加new才可以实例化
// declare const Fp1: ReturnString;
// const fp1 = new Fp1();
// 内联声明函数
var overloaded = function (foo) { return foo; };
// 箭头函数的类型注解
// “在一个以number类型为参数，以string类型为返回值的函数中”
var simple = function (foo) { return foo.toString(); };
var fm = {};
var foo2;
var bar = foo2;
var rr = { 'key': 1 };
console.log(rr);
var map = {};
map.a = 2;
console.log(map);
var tt = new Map([
    ['1', 'A']
]);
var ttt = new Map();
tt.set('t', 'd');
var map1 = new Map();
map1.set('t', 1);
map1.set('d', 2);
console.log('map1', map1);
// <>
// 类型断言放在前，泛型放在后
function heat(food) { return food; }
var TP = {
    a: 1,
    b: { test: '1' }
};
var Pizza = /** @class */ (function () {
    function Pizza() {
    }
    return Pizza;
}());
// 接口类型
var II = {
    test: 'aaaa'
};
var III = {
    test: 'bbbb'
};
console.log(II, III);
function handler(event) {
    var mouseEvent = event;
}
// 如果断言错误，但仍想使用，可以使用双重断言
// const mouseEvent = (event as any) as MouseEvent;
// “当S类型是T类型的子集，或者T类型是S类型的子集时，S能被成功断言成 T。”
// 接受bar和之外的属性
var x;
// typeof instanceof in
var XX = '11';
console.log(typeof XX);
var Foo = /** @class */ (function () {
    function Foo() {
        this.a = 1;
        this.b = 2;
    }
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar() {
        this.c = 3;
        this.d = 4;
    }
    return Bar;
}());
function doSome(arg) {
    if (arg instanceof Foo) {
        console.log('Foo', arg.a);
    }
    if (arg instanceof Bar) {
        console.log('Bar', arg.c);
    }
}
doSome(new Foo());
doSome(new Bar());
// 自定义类型保护
function isFoo(arg) {
    return arg.a !== undefined;
}
console.log(isFoo(new Foo()));
// 函数外部变量使用安全，内部会报错：对象可能undefined
// “只需要把推断的安全值存放在本地的局部变量中，这可以自动确保它不会在外部被更改”
// 字面量类型
var Fooo;
Fooo = 'hello';
// 基于字符串的枚举
function setEnum(o) {
    return o.reduce(function (res, key) {
        console.log(res);
        res[key] = key;
        return res;
    }, {});
}
var Direction = ['East', 'West', 'South', 'North'];
var sampleDirection;
var setenum = setEnum(Direction);
console.log(setenum.East);
// ReadonlyArray
var Arr = [0, 1, 2];
// readonly 与 const 区别
// readonly用与属性，当你把这个属性交给其他并没有做出这种保证的使用者（出于类型兼容的原因而被允许）时，他们可以修改它（内联声明的）
var FR = {
    bar: 123
};
function iMutateFoo(foo) {
    foo.bar = 345;
}
iMutateFoo(FR);
var AA = { x: 0 };
var BB = { 0: 0 };
console.log(AA, BB);
var EventType;
(function (EventType) {
    EventType[EventType["Mouse"] = 0] = "Mouse";
    EventType[EventType["Keyboard"] = 1] = "Keyboard";
})(EventType || (EventType = {}));
function addEventListener(eventType, hander) {
    // if(eventType === EventType.Mouse) {
    //     hander(n)
    // }
}
addEventListener(EventType.Mouse, function (e) { return console.log(e.x, e.y); });
addEventListener(EventType.Mouse, function (e) { return console.log(e.x + '' + e.y); });
addEventListener(EventType.Mouse, (function (e) { return console.log(e.x, e.y); }));
// 箭头函数，只返回一个值可以不用加任何，返回一个对象或者其他需要用（）包起来
var arr = function () { return ({ x: 0 }); };
console.log('arr', arr());
// 类
// 只比较实例和方法，静态成员和构造函数不起作用
var Ani = /** @class */ (function () {
    function Ani(x, y) {
    }
    return Ani;
}());
var Size = /** @class */ (function () {
    function Size(meets) {
    }
    return Size;
}());
// let a11: Ani;
// let b11: Size;
var a11 = new Ani(1, 1);
var b11 = new Size(1);
a11 = b11;
b11 = a11;
// 私有的和受保护的成员必须来自相同的类
var Ani1 = /** @class */ (function () {
    function Ani1() {
    }
    return Ani1;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Cat;
}(Ani1));
var Size1 = /** @class */ (function () {
    function Size1() {
    }
    return Size1;
}());
var dog;
var cat;
var duck;
dog = cat;
cat = dog;
var x1;
var y1;
x1 = y1;
var x2;
var y2;
// x2 = y2; // 报错
var Animal1 = /** @class */ (function () {
    function Animal1(name) {
        this.name = name;
    }
    return Animal1;
}());
var Cat1 = /** @class */ (function (_super) {
    __extends(Cat1, _super);
    function Cat1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat1.prototype.meow = function () {
        console.log(111);
    };
    return Cat1;
}(Animal1));
var List = /** @class */ (function () {
    function List() {
    }
    List.prototype.add = function (value) { };
    return List;
}());
var list1 = new List();
var animal1 = new Animal1('test');
console.log('test', animal1.name);
list1.add(animal1);
// 协变和逆变的例子
var x11 = new Animal1('dog');
var y11 = new Cat1('cat');
// Animal1 <= Cat 多态
// y11 = x11 会报错
x11 = y11;
var x11Arr = [x11];
var y11Arr = [y11];
function area(a) {
    if (a.kind === 'square') {
    }
    else {
    }
}
area({
    kind: 'square',
    size: 5
});
// 需要了解：Imutable.js
// 索引签名
var foo11 = {};
foo11["hello"] = "world";
var Foo11 = /** @class */ (function () {
    function Foo11(message) {
        this.message = message;
    }
    Foo11.prototype.log = function () {
        console.log(this.message);
    };
    return Foo11;
}());
foo11["hello"] = new Foo11("world");
var obj11 = {
    toString: function () {
        return "hello";
    }
};
// js在任何一个对象索引签名上都会隐式调用toString，ts不行，原因是默认执行toString非常糟糕，V8上会输出【object Object】
foo11[obj11.toString()] = "world";
console.log((1).toString());
var Good = { a: 1 };
// 类型移动和类型切片
// 复制类型和值
var Foo111 = /** @class */ (function () {
    function Foo111() {
    }
    return Foo111;
}());
var Bar111 = Foo111;
// let bar: Bar111; // 错误，因为const只是把Foo111复制了一个变量到Bar111，无法把Bar111当作类型；
// 正确的是通过import
var importing;
(function (importing) {
    var Foo111 = /** @class */ (function () {
        function Foo111() {
        }
        return Foo111;
    }());
    importing.Foo111 = Foo111;
})(importing || (importing = {}));
var bar1111;
var dar1111;
// 数字类型 注意const与let
var nu = 123;
var nu1;
nu1 = 234;
// 字符串类型 注意const与let
var st = '123';
console.log('3333', typeof st);
var st1;
st1 = '123';
// keyof捕获键的名称
var arr111 = ['q', 'a', 'z'];
//  如果是对象用keyof typeof
// 如果是类型用keyof
var obj111 = { "a": 1, "b": 2 };
console.log(typeof arr111);
console.log(typeof obj111);
var a111;
a111 = '';
var b111;
b111 = 'a';
// 动态获取属性值
function getProperty(obj, key) {
    return obj[key];
}
var person1 = { name: 'Lucy', age: 18, gender: 'female' };
var name = getProperty(person1, 'name'); // 类型为string
// 限制对象的属性种类
// function createUser<Kyes extends keyof Person>(name: string, value: Person[Kyes]): Person {
//     const User:Person = {name, age: 14, gender: 'male'}
//     User[] = value;
//     return User;
// }
function createUser(name, value) {
    var user = { name: name, age: 0, gender: 'male' };
    // user[key] = value; // 编译器知道key是Person的属性名之一，不会有任何错误
    return user;
}
var newUser = createUser('Tom', 'male'); // 类型为Person
var errorUser = createUser('Jack', 'unknown'); // 编译错误
var User = /** @class */ (function () {
    function User(data) {
        this.data = data;
    }
    User.prototype.get = function (key) {
        return this.data[key];
    };
    return User;
}());
var user = new User({ name: 'Lucy', age: 18, gender: 'female' });
var name111 = user.get('name'); // 类型为string
var age = user.get('age'); // 类型为number
var gender = user.get('gender'); // 类型为'male' | 'female'
function isArray(value) {
    return typeof value === 'object' && value !== null && Array.isArray(value);
}
var arr1111 = [1, 2, 3];
if (isArray(arr1111)) {
    console.log('arr is an array');
}
var fruits = ['apple', 'banana', 'orange'];
var tuple1 = ['hello', 123];
function getTupleElement(tuple, index) {
    return tuple[index];
}
var first = getTupleElement(tuple1, 0); // 'hello'
var second = getTupleElement(tuple1, 1); // 123
// Error
// RangeError
// console.log.apply(console, new Array(1000000000000000000));
// ReferenceError
// SyntaxError
// TypeError
// URIError
try {
}
catch (e) {
    if (e instanceof Error) {
        console.log(e);
    }
}
function Callback(callback) {
    callback();
}
function TimesTamp(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this_1 = _super !== null && _super.apply(this, arguments) || this;
            // 添加属性
            _this_1.timestamp = Date.now();
            return _this_1;
        }
        return class_1;
    }(Base));
}
var User11 = /** @class */ (function () {
    function User11() {
    }
    return User11;
}());
var TUser1 = TimesTamp(User11);
var tuser = new TUser1();
console.log('123123', tuser.timestamp);
// const myComponent: React.FunctionComponent<Props> = props => {
//     return <div>{props.foo}</div>
// }
// 类组件
// class MyComponent1 extends React.Component<Props, {}> {
//     render () {
//         return <span>{this.props.foo}</span>
//     }
// }
// 接受组件实例，React.ReactElement＜T＞
// const myComponent11: React.ReactElement＜myComponent1＞ = <MyComponent1/>
// const myComponent111: React.Component<MyComponent1> = <MyComponent1/>
// 泛型组件
// type SelectProps<T> = { items: T[]};
// class Select<T> extends React.Component<SelectProps<T>, any> {}
// // 用例
// const Form = () => <Select<string> items={['a', 'b']} />
// 泛型函数
function foo1111(x) { return x; }
console.log(foo1111(1));
var foo11111 = function (x) { return x; };
// ! 赋值断言
var a2;
var b2;
// a2.push(1111); // 错误：变量在赋值之前被调用
// b2.push(2222); // 可以：因为被断言
// export class checkboxWithLabel extends React.Component<{
//     labelOn: string,
//     labelOff: string
// }, {
//     isChecked: boolean
// }> {
//     constructor(props) {
//         super(props);
//     }
//     onChange = () => {
//     }
//     render() {
//         return ''
//     }
// }
// 工具 P440
// 状态函数
var called = (new /** @class */ (function () {
    function class_2() {
        var _this_1 = this;
        this.count = 0;
        this.called = function () {
            _this_1.count++;
            console.log(_this_1.count);
        };
    }
    return class_2;
}())).called;
called();
called();
// 柯里化
var add = function (x) { return function (y) { x + y; }; };
add(1)(2);
function foo111(param) { }
function foo22() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, 'h'];
        });
    });
}
function getPropByType(obj, type) {
    var result = [];
    for (var key in obj) {
        var value = obj[key];
        if (typeof value === typeof type) {
            result.push(value);
        }
    }
    return result;
}
var obj1111 = {
    a: 1,
    b: '2',
    c: 3,
};
var result = getPropByType(obj1111, '2');
function optionalize(obj) {
    var result = {};
    for (var key in obj) {
        var value = obj[key];
        if (typeof value === 'object' && !Array.isArray(value)) {
            //   result[key] = optionalize(value);
        }
        else {
            //   result[key as keyof O] = value;
        }
    }
    return result;
}
var obj11111 = {
    a: {
        b: 1,
        c: {
            d: 2,
        },
    },
    e: '3',
};
var optionalObj = optionalize(obj11111);
console.log('asd', optionalObj);
// 对象a合并到对象box
// (Object.keys(a)).forEach(<K extends keyof Test>(k: K) => {
//     box[k] = a[k]
// })
function TT() {
    return '';
}
var createFoo = function (value) { return ({ type: 'Foo', value: value }); };
var createBar = function (value) { return ({ type: 'Bar', value: value }); };
var foointer = {};
foointer.bar = 1111;
var A1 = /** @class */ (function () {
    function A1(name) {
        this.name = '123';
    }
    return A1;
}());
var Person1 = /** @class */ (function (_super) {
    __extends(Person1, _super);
    function Person1() {
        var _this_1 = _super.call(this, name) || this;
        _this_1.asd = '123';
        return _this_1;
    }
    Person1.prototype.get = function (type) {
        return type;
    };
    Person1.prototype.set = function () { };
    return Person1;
}(A1));
// 抽象类
var A11 = /** @class */ (function () {
    function A11(name) {
        this.name = name;
    }
    A11.prototype.print = function () {
        return this.name;
    };
    return A11;
}());
var B11 = /** @class */ (function (_super) {
    __extends(B11, _super);
    function B11() {
        return _super.call(this, '小满') || this;
    }
    B11.prototype.getName = function () {
        return this.name;
    };
    return B11;
}(A11));
var b1111 = new B11();
console.log(b1111.getName());
// setter getter
// getter 和 setter
var Person11 = /** @class */ (function () {
    // name为内部属性
    function Person11(_name) {
        this._name = _name;
    }
    Object.defineProperty(Person11.prototype, "name", {
        get: function () {
            return this._name;
        },
        // class 中如果不写对应的set关键字，表示get对应的属性不能被修改
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    return Person11;
}());
var tom = new Person11('tom');
tom.name = 'tomtom'; // 注释set会报错，name is read-only
console.log(tom.name);
// 单例模式：只允许特定类存在一个实例
var Demo = /** @class */ (function () {
    function Demo() {
    } // constructor前加private可以禁止new
    Demo.getInstance = function () {
        if (!this.instance)
            this.instance = new Demo(); // 但是可以在内部访问
        return this.instance;
    };
    return Demo;
}());
var d1 = Demo.getInstance();
var d2 = Demo.getInstance();
console.log(d1 === d2);
// 动态导入
// const echart = await import('');
// 导出
// 输出常量时，需要先定义在导出
var aaa = 1;
// export default aaa;
// export default function test111() {}
// export default class test11 {}
// export default {}
var test11 = /** @class */ (function () {
    function test11() {
    }
    Object.defineProperty(test11.prototype, "bar", {
        get: function () {
            return this.a;
        },
        set: function (value) {
            this.a = value;
        },
        enumerable: false,
        configurable: true
    });
    return test11;
}());
var test111 = new test11();
test111.bar = 123;
console.log('set', test111.bar);
// 静态构造
var Static = /** @class */ (function () {
    function Static() {
    }
    Static.init = function () {
    };
    return Static;
}());
Static.init();
// barrel, 用于导出其他多个模块
// export * from './1';
// 命名导出
var baz = require("./1");
exports.baz = baz;
// 数组
var str = new Array(2).fill('');
var TypedEvent = /** @class */ (function () {
    function TypedEvent() {
        var _this_1 = this;
        this.listener = [];
        this.listenerOnce = [];
        this.on = function (listener) {
            _this_1.listener.push(listener);
            return {
                dispose: function () { return _this_1.off(listener); }
            };
        };
        this.once = function (listener) {
            _this_1.listenerOnce.push(listener);
        };
        this.off = function (listener) {
            var callbackIndex = _this_1.listener.indexOf(listener);
            if (callbackIndex > -1) {
                _this_1.listener.splice(callbackIndex, 1);
            }
        };
        this.emit = function (event) {
            _this_1.listener.forEach(function (list) { return list(event); });
            _this_1.listenerOnce.forEach(function (list) { return list(event); });
            _this_1.listenerOnce = [];
        };
        this.pipe = function (te) {
            return _this_1.on(function (e) { return te.emit(e); });
        };
    }
    return TypedEvent;
}());
// P488
// refect metadata,用于在运行时访问和操作装饰器的元数据,是用于对元数据进行定义、修改、查询的一组API
// “主要用来在声明时添加和读取元数据”
// 代码风格
// 变量和函数  camelCase
// 类、接口、类型别名、命名空间、枚举  CamelCase
// “需要联合类型或交叉类型，建议使用type”
// 编译原理
// ● Scanner扫描器（scanner.ts）。 token流
// ● Parser解析器（parser.ts）。 AST语法树
// ● Binder绑定器（binder.ts）。 Symbol
// ● Checker检查器（checker.ts）。 类型检查（AST+Symbol）
// ● Emitter发射器（emitter.ts）。输出javascript
// const [scenario, setScenario] =
//     useState<Map<'key', { scenario_name: string }>>(); 
// export const getMarkets = async (): Promise<IGetMarketsRes | undefined> => {
//     try {
//       const nomicsUSD = prepHeaders('USD');
//       const marketUSD = await nomicsUSD.get(exchangeMarketPrices);
//       const nomicsUSDC = prepHeaders('USDC');
//       const marketUSDC = await nomicsUSDC.get(exchangeMarketPrices);
//       const nomicsUSDT = prepHeaders('USDT');
//       const marketUSDT = await nomicsUSDT.get(exchangeMarketPrices);
//       console.log('marketUSD', marketUSD);
//       return {
//         marketUSD: marketUSD.data,
//         marketUSDC: marketUSDC.data,
//         marketUSDT: marketUSDT.data
//       }
//     } catch (err) {
//       console.error(err);
//     }
// }
// export const fetchMarketPrices = (asset: string) => (dispatch: any) => {
//     dispatch(actionGetMarketPrices);
//     return getMarkets().then((res) => {
//       const { marketUSD, marketUSDC, marketUSDT } = res;
//       const combinedExchanges = marketUSD.concat(marketUSDC).concat(marketUSDT);
//       const exchangesForAsset = combinedExchanges.filter((marketAsset: IMarketAsset) =>
//         marketAsset.base === asset);
//       return dispatch(actionSetMarketPrices(exchangesForAsset));
//     });
//   }
