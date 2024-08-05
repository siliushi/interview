// ??  如果给定变量值为 null 或者 undefined，则使用双问号后的默认值，否则使用该变量值
let text;
// 下面两个一样效果
console.log(text ?? '-')
console.log(text || '-')


// !! 判断某个变量是否存在。第一个 ! 作用于变量，使其转换为布尔类型，并且取反；第二个 ! 再次取反，得到真正的布尔值。空数组和空对象使用 !!， 返回 true

class Point {
    // 构造函数，可以在成员中加一个修饰符前缀，它会在类上自动声明，并且从构造器中复制过去。
    constructor(public x: number, public y: number) {}
    add(pointer: Point) {
        return new Point(this.x + pointer.x, this.y + pointer.y);
    }
}

const pointer1 = new Point(1, 1);
const pointer2 = new Point(2, 2);

console.log(pointer1.add(pointer2))
// 属性的类型可以用分号结尾，也可以用逗号结尾
// 删除类型声明中存在的属性会报错
// TypeScript 不区分对象自身的属性和继承的属性,类似toString
// 可选属性需要判断是否为undefined，可以用 属性 ?? b
// 如果属性值是一个对象，readonly修饰符并不禁止修改该对象的属性，只是禁止完全替换掉该对象。
// 如果希望属性值是只读的，除了声明时加上readonly关键字，还有一种方法，就是在赋值时，在对象后面加上只读断言as const
type IdIndex = {
    readonly id: string;
    display: string
}
// 对象类型可以使用方括号读取属性的类型
type Id = IdIndex['id'];
const list: IdIndex[] = [{
    id: '0',
    display: 'a'
}, {
    id: '1',
    display: '1'
}]
const list2: Array<IdIndex> = [{
    id: '0',
    display: 'a'
}, {
    id: '1',
    display: '1'
}]
const index = list.map(i => i.id).indexOf('1');
const content = list.filter(i => i.id === '0');
console.log(index);
console.log(content);

// 可选参数只能出现在参数列表的最后
function foo(x: number, y ?: number) {
    if(y) return {x, y}
    if(!y) return {x}
}
console.log(foo(1, 2));

// 返回值增加undefined
function toInit(str: string): {valid: boolean; int?: number} | undefined {
    const int = parseInt(str)
    if(isNaN(int)) return {valid: true, int}
    if(!isNaN(int)) return {valid: false}
}

// JSON支持null，不支持undefined，会把undefined删掉
console.log(JSON.parse(JSON.stringify({a: null, b: undefined})));


// extends
class Point3 extends Point {
    constructor(public x:number, public y:number, public z:number) {
        super(x, y);
    }
    add (point: Point3) {
        const point2 = super.add(point);
        return new Point3(point2.x, point2.y, this.z+point.z)
    }
}
const point3_1 = new Point3(1,2,3);
const point3_2 = new Point3(2,3,4);
console.log(point3_1.add(point3_2))

// 案例 interface 继承的实现
interface Istu  {
    name: string
    gender: string
    grade?: string | number
    height?: string | number
    study:(arr:string[])=>string[]
    play?:()=>void
}
interface Istud extends Istu {
    work:string
    hobby:[string,string,string]//元组
}
let study3: Istud = {
    name: '王五',
    gender: '男',
    work:'敲代码',
    study: (arr) => arr.map(it =>study3.work ),
    hobby:['抽烟','喝酒','烫头']
}
const newHobby = study3.study(study3.hobby)
console.log(newHobby) // [ '敲代码','敲代码','敲代码' ]




// static，静态属性或者静态函数，被所有实例共享，所以只能通过类取值，可以被子类继承
class Something {
    static instances = 0;
    constructor() {
        Something.instances++;
    }
}

const something1 =  new Something();
const something2 =  new Something();
console.log(Something.instances);


// abstract 可以用在类或类的成员，意味着该函数不能直接被调用，并且子类必须实现
// abstract类不能直接被实例化，用户必须创建一个类来继承abstract 类。 
// abstract成员不能直接被访问，子类必须实现这个功能。


// extends
var _extends : any = this._extends || function(d, b) {
    for(var p in b) {if(b.hasOwnProperty(p)) {d[p] = b[p]}}
    function _() {
        this.constructor = d;
    }
    _.prototype = b.prototype;
    d.prototype = new _();
}
// 赋值
// d.prototype.__proto__ =  b.prototype;
// 取值
// d.__proto__.__proto__.property

function f() {}
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




function Person(age: number) {
    this.age = age;
    var _this = this;
    this.add = function() {
        _this.age++;
    }
}
const person = new Person(1);
// 你使用setTimeout时，如果传递给它的是一个函数引用，那么在函数执行时，this将会指向全局对象（在浏览器中通常是window对象）。这是因为setTimeout函数会将函数作为一个独立的任务推迟执行，而不是在原始的上下文中执行。
// 然而，如果你将函数包裹在另一个函数中，那么this将会保持绑定到包裹函数的上下文。这是因为在包裹函数中，this的值是由调用方式决定的，而不是由setTimeout决定的。
// 或者箭头函数
// setTimeout(person.add, 1000);
// setTimeout(function() {console.log(person.age)}, 2000);


// 如果使用箭头函数，属性不能用super调用，只能用this
class Adder {
    constructor(public x: number) {}
    add = (y: number) : number => {
        return this.x + y
    }
}

class Child extends Adder {
    constructor(public x: number, public y: number) {
        super(x)
    }
    CallAdder() {
        return this.add(this.y);
    }
}

class Child2 extends Adder {
    CallAdder(y: number) {
        return this.add(y);
    }
}

const adder1 = new Child(1, 1);
const adder2 = new Child2(1);
console.log(adder1.CallAdder());
console.log(adder2.CallAdder(1));



var test = () => ({a:1})


// reset参数
const re = (a:number, b:number, ...c:number[]) => {
    console.log(c)
}
re(1,2);
re(1,2,3);


// 可以使用闭包解决
var funs: Function[] = []
for(let i = 0; i < 3; i++) {
    funs.push(function() {
        console.log(i);
    });
    // (function() {
    //     var j = i;
    //     funs.push(function() {
    //         console.log(j);
    //     });
    // })()
}
for(var k = 0; k < 3; k++) {
    funs[k]();
}

const a : number = 1; // 声明必须初始化，仍然允许对象的子属性改变
let b = 2; // 块级作用域
var c = 3; // 函数级作用域


// 对象和数组解构
const obj = {a1: {a11: 1}, b1: 2}
// const {a1: {a11}, b1} = obj;
const {b1, ...t} = obj;
console.log(t);

// 交换值
var m = 1; var n =2;
[m,n]=[n,m];


function foo1(x:number, y:number, z:number) {
    console.log(x, y, z);
}
const args = [0, 1, 2] as const
// A spread argument must either have a tuple type or be passed to a rest parameter.
foo1(...args); 

// 扩展运算符 --  后面的覆盖前面的
const object1 = {a:1, b: 2};
const object2 = {...object1, a: 5};
console.log(object2)

// for in 迭代对象，迭代数组的话返回的是数组的index
// for of 迭代数组、字符串



// 迭代器
interface IteratorResult<T> {
    done: boolean;
    value: T | null;
}
interface Iterator<T> {
    next(value: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e: any): IteratorResult<T>;
}
class Component {
    constructor(public name: string) {}
}
class Frame implements Iterator<Component> {
    private pointer = 0;
    constructor(public name: string, public components: Component[]){}
    public next(): IteratorResult<Component> {
        if(this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            }
        } else {
            return {
                done: true,
                value: null
            }
        }
    }
}

// 使用Symbol.iterator
class Frame1 extends Frame implements Iterator<Component> {
    private pointer1 = 0;
    constructor(public name: string, public components: Component[]) {
        super(name, components);
    }
    public next(): IteratorResult<Component> {
        if(this.pointer1 < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer1++]
            }
        } else {
            return {
                done: true,
                value: null
            }
        }
    }
    // [Symbol.iterator] (): IteratorResult<Component> {
    //     return this;
    // }
    // [Symbol.iterator] () {
    //     let pointer = 0;
    //     let components = this.components;
    //     return {
    //         next() : IteratorResult<Component> {
    //             if(pointer < components.length) {
    //                 return {
    //                     done: false,
    //                     value: components[pointer++]
    //                 }
    //             } else {
    //                 return {
    //                     done: true,
    //                     value: null
    //                 }
    //             }
    //         }
    //     }
    // } 
}

let frame = new Frame1('Door', [
    new Component('1'),
    new Component('2'),
    new Component('3'),
    new Component('4'),
])
const frame1 = frame.next();
const frame2 = frame.next();
const frame3 = frame.next();
const frame4 = frame.next();
console.log(frame1.value);
// for(let cmp of frame) {
//     console.log(cmp)
// }


// 模版字符串
var say = '123';
var html = `<div>${say}</div>`
console.log(html)


// import fs = require('fs');
// 加载文件并执行回调
function loadFile(filename: string, cb: (error: Error, data?: any) => void) {}


// promise，当reject、throw new Error都不会触发then
const promise = new Promise((resolve, reject): Promise<number> => {
    resolve(123);
    return new Promise((resolve, reject) => {resolve(1234)});
});

promise.then(res => {
    console.log(res)
    return 456;
}).then(res => {
    console.log(res)
    return new Promise((resolve, reject) => {
        resolve(789);
    })
}).then(res => {
    console.log(res);
})

// 模拟服务端掉用
function loadItem(id: number): Promise<{id: number}> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({id})
        }, 1000);
    });
}
loadItem(1).then(res => {
    console.log(res);
    return loadItem(2)
}).then(res => {
    console.log(res)
})

// 运行多个任务，返回一个list，包含结果
Promise.all([loadItem(1), loadItem(2)]).then(res => {
    console.log('aaa',res);
})


const task1 = new Promise(resolve => {
    setTimeout(resolve, 1000, 'one');
})
const task2 = new Promise(resolve => {
    setTimeout(resolve, 1000, 'two');
})

// 只要有一个返回就结速
Promise.race([task1, task2]).then(res => {
    console.log(res);
})


// 声明空间
// 类型声明空间，用来当作类型注解
// 变量声明空间

// 模块
// 全局模块、文件模块（又称外部模块），带有export import会被声明成文件模块

// AMD：不要使用它，它只能在浏览器上工作。 
// SystemJS：这是一个好的实验，已经被ES模块代替。 
// ES模块：它并没有准备好。import/export

// epxort {a as b}

// 默认导出 export default
// 变量、类、函数
// const adbc = 1;
// export default adbc;
// export default function t1() {}
// export default class T11 {};

// 声明模块
// “当把 JvaScript 迁移到 TypeScript 时，定义 declare module"some-library-you-dont-care-to-get-defs-for"能让你快速开始”
// module 不可以和 export 混用。去掉 export，这个错误即恢复正常。
// declare global{}
declare module foo1 {
    export var bar: number;
}

declare var $: {
    (select: string):any
}


// import a from ''
// import a = require('a')


// const _foo : typeof foo = require('foo');


// 命名空间
// module 后一般接一个路径，而 namespace 后一半是一个命名空间名字
export namespace Util {
    export function Log(str: string) {
        console.log(str);
    }
    export function Err(str: string) {
        console.error(str);
    }
}

Util.Log('log');
Util.Err('error');





import exportTest from './2';

exportTest()



// 基本类型注解
// 数组类型注解
// 接口注解，允许重复声明接口，会被合并
interface Name {
    first: string,
    second: string
}
interface Name {
    third: string
}
// 内连类型注解
// any 将会关闭类型检查
// null undefined void
// 泛型
function reverse<T>(iterms: T[]): T[] {
    const toreturn = [];
    for(let i = iterms.length - 1; i >= 0; i--) {
        toreturn.push(iterms[i]);
    }
    return toreturn;
}
const sample = [1, 2 ,3]
console.log(reverse<number>(sample));

interface Array<T> {
    reverse(): T[];
}
// 泛型类
class MyClass<T> {
	list:T[]=[]
	add(value:T):void{
		this.list.push(value)
	}
	get(index:number):T {
		return this.list[index]
	}
}

interface List1<T> {
    items: T[];
    push(item: T): void;
    pop(): T | undefined;
}
class Stack<T> implements List1<T> {
    items: T[] = [];
    push(item: T) {
        this.items.push(item);
    }
    pop(): T | undefined {
        return this.items.pop();
    }
    con() {
        console.log(this.items);
    }
}
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.pop(); // 2
stack.con();



// 联合类型
let uni: string | number;
// 交叉类型
function extend<T, U>(first: T, second: U): T & U {
    const result = <T & U> {} as any;
    for(let id in first) {
        (<T>result)[id] = first[id];
    }
    for(let id in second) {
        if(!result.hasOwnProperty(id)) {
            (<U>result)[id] = second[id];
        }
    }
    return result;
}
console.log(extend({a:1}, {b:2}));

// 元组类型，js并不支持但是ts支持
let tuple: [number, string];
// 类型别名，可以为任何类型注解提供类型别名
type alias = string | number;
let aliasValue : alias;
aliasValue = 1;
type Callback = (data: number) => void;

// 对象接口
interface FullName {
    firstName: string
    lastName: string
    age: number
}
function func(name: FullName): void {
    console.log(`${name.firstName} - ${name.lastName}`)
}
let obj1:{
    age: number,
    firstName: string,
    lastName: string
    nickName: string
} = {
    age: 20,
    firstName: 'p',
    lastName: 'r',
    nickName: 'q'
}
func(obj1) // 不报错
func({
    age: 1,
    firstName: 'p',
    lastName: 'r',
    nickName: 'q'
})
// 扩展接口
// 扩展并定义新接口
interface FullName2 extends FullName {
	middleName: string
}
// 声明合并，直接给接口增加属性
interface FullName {
	nickName: string
}

// 交叉类型

// 扩展并定义新类型
type FullName3 = FullName & {
	middleName: string
}
// 函数接口
interface func {
	(key:string, value:string):string
}
let func2:func = function(key:string,value:string):string{
	return ''
}
// 类接口
interface Animal1 {
	name:string
	eat(str:string):void
}
class Dog implements Animal1 {
	name:string
	constructor(name:string){}
	eat() { // 可以不写参数，但是不实现此函数会报错
		console.log(this.name)
	}
}
// 泛型接口
// 在函数调用时传递泛型参数
interface ConfigFn{
	<T>(value:T):T;
}
let getData:ConfigFn = function<T>(value:T):T{
	return value;
}
getData<string>('1234')
// 在接口实现时传递泛型参数
interface ConfigFn1<T>{
	(value:T):T;
}
let getData1:ConfigFn1<string> = function(value:string):string{
	return value;
}
getData('1234')





// 枚举
// 不同枚举的枚举变量，及时字面一样，也不想等
// 数字枚举
enum Enum {
    Clubs,
    Diamond,
    Hearts,
    Spads
}
console.log(Enum.Clubs); // 0
console.log(Enum[0]);
// Enum[Enum["Clubs"] = 0] = "Clubs";
// 赋值运算返回的是被赋予的值
let a1: number;
console.log(a1 = 1) // 输出1；

// 改变关联的起始数字
enum Numb {
    Red = 3,
    Blue,
    Black,
}
console.log(Numb.Black) // 5
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
enum AnimalFlag {
    None = 0,
    HasClaws = 1 << 0, // 0001 2
    CanFly = 1 << 1,   // 0010 4
    EatsFish = 1 << 2, // 0100 8
    Endangered = 1 << 3 // 1000 16
}

interface Animal {
    flags: AnimalFlag;
    [key: string]: any;
}
function printAnimalAbilities(animal: Animal) {
    console.log(animal.key)
    var animalFlags = animal.flags;
    console.log('aaa', ~2)
    if(animalFlags & AnimalFlag.HasClaws) {
        console.log('animal has claws');
    }
    if(animalFlags & AnimalFlag.CanFly) {
        console.log('animal can fly');
    }
}

// 使用|=来添加一个标记。 
// 组合使用&=和～来清理一个标记。 
// 使用|来合并标记
var animal = {flags: AnimalFlag.None, key: 'test'}
console.log(printAnimalAbilities(animal))
animal.flags |= AnimalFlag.HasClaws;
console.log(printAnimalAbilities(animal))
animal.flags &= ~AnimalFlag.HasClaws;
console.log(printAnimalAbilities(animal))
animal.flags |= AnimalFlag.CanFly | AnimalFlag.HasClaws;
console.log(printAnimalAbilities(animal))

// 字符串枚举
enum EnumStr {
    first = 'a',
    second = 'b',
    third = 'c',
}
// const value = something as EnumStr;


type Func = {
	description: string
	(name: string): string
}
function call(fn: Func){
	console.log(`${fn.description} returnd: ${fn('hello')}`)
}
function func1(name:string):string {
	return name
}
func1.description = 'func1'
call(func1);

// 枚举也可以当作类型

// 静态枚举
enum WeekDay {
    Monday,
    Tuseday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}
namespace Weekday {
    export function isBusinessDasy(day: WeekDay) {
        switch (day) {
            case WeekDay.Saturday:
            case WeekDay.Sunday:
                return false;
            default:
                return true;
        }
    }
}
const monday = WeekDay.Monday;
const sunday = WeekDay.Sunday;
console.log(Weekday.isBusinessDasy(monday));


// lib.d.ts
// “这个文件包含JavaScript运行时及DOM”

// 箭头函数使用{}和不使用的区别
// 1、不使用会自动return
// 2、使用的this指向这个箭头函数本身，不使用则会继承外层



// 函数
// 参数注解
function parm(spampleParameter:{bar:number}) {}

// 函数重载
function StringOrNumber(a: string): string;
function StringOrNumber(a: number): number;
function StringOrNumber(a: string | number): number | string {
    console.log(a)
    return a;
}
// 函数声明，两种方式
// 函数重载只能用第一种方式
type LongHand = {
    (a: number): number;
    (a: string): string;
}
type ShortHand = (a: number) => void;
type ShortHand1<T> = (a:T) => T;

const FuncT: LongHand = function(a) {console.log(a);return a;};
console.log(FuncT(1))

// 只有当返回值是void才可以用new
// declare const Fp: ShortHand;
// const fp = new Fp(1);


// “使用类型别名或接口来表示一个可被调用函数的类型注解”
// 可实例化，用new作为前缀
interface ReturnString {
   new () : string
}
// 接口声明的函数需要加new才可以实例化
// declare const Fp1: ReturnString;
// const fp1 = new Fp1();

// 内联声明函数
const overloaded : {
    (foo: string): string
    (foo: number): number
} = (foo: any): any => {return foo;}

// 箭头函数的类型注解
// “在一个以number类型为参数，以string类型为返回值的函数中”
const simple: (foo:number) => string = foo => foo.toString();



// 类型断言
interface Fm {
    bar: number;
    bas: string;
}
const fm = {} as Fm;

let foo2: any;
let bar =  <string>foo2;



// 声明对象健值对
// Record 是属于一个轻量级的 type 类型,Map 相对 Record 是重量级
// Map 不能像 Record 一样直接转换为普通的对象，来应对只有查询的实际问题，只是为了频繁的查询去 new 一个 Map 是一种不必要的浪费。
// 如果读取数据和显示数据频繁，就应该采用 Record，如果增删改比较多，那还是使用 Map
// Record
type RR = Record<string, number>;
const rr: RR = {'key': 1};
console.log(rr);
const map: Record<string, number> = {}
map.a = 2
console.log(map);
// Map， set\delete\has\clear\size
// for (let [key, value] of map)
// map.forEach((value, key) => {
type TT = Map<string, string>;
const  tt:Map<string, string> = new Map([
    ['1', 'A']
]);
const ttt: Map<string, string> = new Map();
tt.set('t', 'd');

let map1: Map<string, number> = new Map();
map1.set('t', 1);
map1.set('d', 2);
console.log('map1',map1);
// <>
// 类型断言放在前，泛型放在后
function heat<T>(food: T): T { return food; }
interface Cheese{
    test: string
}
const TP = {
    a: 1,
    b: {test: '1'} as Cheese
}
class Pizza<T, E extends Cheese> { toppingA: T; toppingB: E }
// 接口类型
const II = <Cheese>{
    test: 'aaaa'
}
const III : Cheese = {
    test: 'bbbb'
}
console.log(II, III);

function handler(event: Event) {
    const mouseEvent = event as MouseEvent;
}
// 如果断言错误，但仍想使用，可以使用双重断言
// const mouseEvent = (event as any) as MouseEvent;

// “当S类型是T类型的子集，或者T类型是S类型的子集时，S能被成功断言成 T。”

// 接受bar和之外的属性
let x: {bar: string, [x: string]: any}


// typeof instanceof in
let XX: string = '11';
console.log(typeof XX);

class Foo {
    a = 1;
    b = 2;
}
class Bar {
    c = 3;
    d = 4;
}
function doSome(arg: Foo | Bar) {
    if(arg instanceof Foo) {
        console.log('Foo', arg.a);
    }
    if(arg instanceof Bar) {
        console.log('Bar', arg.c)
    }
}
doSome(new Foo());
doSome(new Bar());
// 自定义类型保护
function isFoo(arg: Foo | Bar): arg is Foo {
    return (arg as Foo).a !== undefined;
}
console.log(isFoo(new Foo()));

// 函数外部变量使用安全，内部会报错：对象可能undefined
// “只需要把推断的安全值存放在本地的局部变量中，这可以自动确保它不会在外部被更改”


// 字面量类型
let Fooo: 'hello';
Fooo = 'hello';
// 组合创建实用的抽象概念
type Dir = 'West' | 'North' | 'East' | 'South';


// 基于字符串的枚举
function setEnum<T extends string>(o: string[]): {[key: string]: string} {
    return o.reduce((res, key) => {
        console.log(res);
        res[key] = key;
        return res;
    }, {});
}
const Direction = ['East', 'West', 'South', 'North']
type Direction = keyof typeof Direction;
let sampleDirection: Direction;
const setenum = setEnum(Direction)
console.log(setenum.East);


// readonly
// 可以用在 接口、类型别名、class属性
// export class Something2 extends React.Component<Props,State> {
//     someMethod() {
//         this.props.a = 1;
//     }
// }

// 类型映射需要大写
type FullName4 = Readonly<FullName3>;

// ReadonlyArray
const Arr :ReadonlyArray<number> = [0, 1,2]


// readonly 与 const 区别
// readonly用与属性，当你把这个属性交给其他并没有做出这种保证的使用者（出于类型兼容的原因而被允许）时，他们可以修改它（内联声明的）
const FR: {readonly bar: number} = {
    bar: 123
}
function iMutateFoo(foo: {bar: number}) {
    foo.bar = 345;
}
iMutateFoo(FR);
// const 用与变量


interface Fooo {
    x: number
}
interface Foooo {
    [key: number]: number
}
const AA : Fooo = {x:0}
const BB : Foooo = {0:0};
console.log(AA, BB);




// unknown 只能赋给 unknown，还有 any
// string[] 和 Array<string>




// infer
// Omit 在已经定义的对象中删除一些，留下剩下的
interface User {
    name: string;
    age: number;
    like: string;
  }
  type User1 = Omit<User, "name" | "age">;

// pick,在已经定义的对象中选取一些
interface Props1{
    id:string
    title:string
    children:number[]
}
type PickProps= Pick<Props1,'id'|'title'>

// Exclude<T,U> 从第一个联合类型参数中，将第二个联合类型中出现的联合项全部排除，只留下没有出现过的参数。
type A2 = "age" | "name";
type B2 = "like" | "name";
type C = Exclude<A2, B2>; //age

// Extract<T,U>提取Type中所有能够赋值给Union的属性,如果 T 是 U 的子类型则返回，不是则返回 never,
// type Extract<T, U> = T extends U ? T : never;
type A3 = "age" | "name";
type B3 = "like" | "eat";
type C3 = Extract<A3, B3>;
// 相当于 type C3 = nerver

// Partial 将类型中所有的项都调整为可选属性
type Partial<T> = {
    [P in keyof T]?: T[P];
}

// Required 将类型中所有的项都调整为必选属性
type Required<T> = {
    [P in keyof T]-?: T[P];
}

// ======================
// 变体
// 多态 “对简单的类型Base和Child来说，如果Child是Base的子类，则Child的实例能被赋值给Base类型的变量。”
// 协变、只在同一个方向兼容
// 逆变、只在逆向方向兼容
// 双向斜变、包括同一个方向和不同方向的兼容
// 不变、如果类型不完全相同则他们不兼容

// 比较两个函数：返回类型、参数数量、函数参数类型
// 可选参数与rest参数兼容


interface Event {
    timestamp: number
}
interface MouseEvent extends Event {
    x: number;
    y: number;
}
interface Keyboard extends Event {
    keyCode: number;
}
enum EventType {
    Mouse,
    Keyboard,
}
function addEventListener(eventType: EventType, hander: (n: Event)=>void){
    // if(eventType === EventType.Mouse) {
    //     hander(n)
    // }
}
addEventListener(EventType.Mouse, (e: MouseEvent)=> console.log(e.x, e.y));
addEventListener(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + '' + (<MouseEvent>e).y));
addEventListener(EventType.Mouse, <(e: Event)=> void>((e: MouseEvent)=> console.log(e.x, e.y)));


// 箭头函数，只返回一个值可以不用加任何，返回一个对象或者其他需要用（）包起来
const arr = () => ({x:0});
console.log('arr', arr());


// 类
// 只比较实例和方法，静态成员和构造函数不起作用
class Ani {
    feet: number;
    constructor(x: number, y: number) {}
}
class Size {
    feet: number;
    constructor(meets: number) {}
}
// let a11: Ani;
// let b11: Size;
let a11 = new Ani(1,1);
let b11 = new Size(1);
a11 = b11;
b11 = a11;

// 私有的和受保护的成员必须来自相同的类
class Ani1 {
    protected feet: number;
    private foot: number;
}
class Cat extends Ani1 {

}
class Size1 {
    protected feet: number;
    private foot: number;
    protected eat: string;
}
let dog: Ani1;
let cat!: Cat;
let duck: Size1;
dog = cat;
cat = dog;
// dog = duck;  报错


// 类型参数只有被成员使用时，才会影响兼容性
interface Empty<T> {}
let x1: Empty<number>;
let y1: Empty<string>
x1 = y1;

interface Empty1<T> {
    data: T

}
let x2: Empty1<number>;
let y2: Empty1<string>;
// x2 = y2; // 报错



class Animal1 {
    name: string
    constructor(name: string) {
        this.name = name;
    }
}
class Cat1 extends Animal1 {
    meow() {
        console.log(111);
    }
}

class List<T> {
    add(value: T) {}
}
let list1 = new List<Animal1>();
const animal1 = new Animal1('test')
console.log('test', animal1.name);
list1.add(animal1)

// 协变和逆变的例子
let x11 = new Animal1('dog');
let y11 = new Cat1('cat');
// Animal1 <= Cat 多态
// y11 = x11 会报错
x11 = y11;

let x11Arr: Animal1[] = [x11];
let y11Arr: Cat1[] = [y11];


// never，代表那些永远不会发生的事
// 一个从来不会有返回值的函数
// 一个总会抛出错误的函数
// never只能被赋值给另外一个never


// 联合类型
interface Square {
    kind: 'square';
    size: number;
}

interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
}

type Shape = Square | Rectangle;

function area(a: Shape) {
    if(a.kind === 'square') {

    } else {

    }
}
area({
    kind: 'square',
    size: 5
});


// 需要了解：Imutable.js


// 索引签名
let foo11: any = {}
foo11["hello"] = "world";
class Foo11 {
    constructor(public message: string) {}
    log () {
        console.log(this.message)
    }
}
foo11["hello"] = new Foo11("world");
let obj11 = {
    toString() {
        return "hello"
    }
}
// js在任何一个对象索引签名上都会隐式调用toString，ts不行，原因是默认执行toString非常糟糕，V8上会输出【object Object】
foo11[obj11.toString()] = "world";


console.log((1).toString());


type Index = | 'a' | 'b' | 'c';
type FromIndex = {[k in Index]: number}
const Good: FromIndex = {a: 1};

type FromSomeIndex<K extends string> = {[key in K]: number};
// 同时有string和number的索引签名
type StringNubmer =  {
    [X: string]: string;
    [Y: number]: string;
}

// type FieldState = {
//     color: string;
//     [width: string]: nubmer;
// }
type FieldState = {color: string} & {[width: string]: number}

// 类型移动和类型切片
// 复制类型和值
class Foo111 {}
const Bar111 = Foo111;
// let bar: Bar111; // 错误，因为const只是把Foo111复制了一个变量到Bar111，无法把Bar111当作类型；
// 正确的是通过import
namespace importing {
    export class Foo111 {}
}
import Bar11111 = importing.Foo111;
let bar1111: Bar11111;

let dar1111: typeof bar1111;

// 数字类型 注意const与let
let nu = 123
let nu1: typeof nu;
nu1 = 234;

// 字符串类型 注意const与let
const st = '123';
console.log('3333',typeof st);
let st1: typeof st;
st1 = '123';


// keyof捕获键的名称
 const arr111 = ['q', 'a', 'z'];
//  如果是对象用keyof typeof
// 如果是类型用keyof
 const obj111 = {"a": 1, "b": 2};
 type obj222 = {"a": 1, "b": 2};
 console.log(typeof arr111)
 console.log(typeof obj111)
 type Arr111 = typeof arr111[number]; // string
 type Obj111 = keyof typeof obj111;
 type Obj222 = keyof obj222;
 let a111: Arr111;
 a111 = '';
 let b111: Obj111;
 b111 = 'a';

interface Person {
    name: string;
    age: number;
    gender: 'male' | 'female';
}
type PersonKeys = keyof Person;

// 动态获取属性值
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}
const person1: Person = { name: 'Lucy', age: 18, gender: 'female' };
const name = getProperty(person1, 'name'); // 类型为string

// 限制对象的属性种类
// function createUser<Kyes extends keyof Person>(name: string, value: Person[Kyes]): Person {
//     const User:Person = {name, age: 14, gender: 'male'}
//     User[] = value;
//     return User;
// }
function createUser<Keys extends keyof Person>(name: string, value: Person[Keys]): Person {
    const user: Person = { name, age: 0, gender: 'male' };
    // user[key] = value; // 编译器知道key是Person的属性名之一，不会有任何错误
    return user;
}
  
const newUser = createUser('Tom', 'male'); // 类型为Person
const errorUser = createUser('Jack', 'unknown'); // 编译错误
  


class User {
    constructor(private data: Person) {}

    get<K extends keyof Person>(key: K): Person[K] {
        return this.data[key];
    }
}
const user = new User({ name: 'Lucy', age: 18, gender: 'female' });
const name111 = user.get('name'); // 类型为string
const age = user.get('age'); // 类型为number
const gender = user.get('gender'); // 类型为'male' | 'female'

function isArray(value: any): value is Array<any> {
    return typeof value === 'object' && value !== null && Array.isArray(value);
}

let arr1111 = [1, 2, 3];
if (isArray(arr1111)) {
    console.log('arr is an array');
}

const fruits = ['apple', 'banana', 'orange'];
type Fruit = typeof fruits[number]; // string
type Index1 = keyof typeof fruits; // number | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "reverse" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "map" | "filter" | "reduce" | "reduceRight" | "entries" | "forEach" | "keys" | "values"


// 获取元组数据
type Tuple = [string, number];

type First = Tuple[0]; // string
type Second = Tuple[1]; // number

const tuple1: Tuple = ['hello', 123];

function getTupleElement<T extends ReadonlyArray<any>, U extends keyof T>(
  tuple: T,
  index: U,
): T[U] {
  return tuple[index];
}

const first: string = getTupleElement(tuple1, 0); // 'hello'
const second: number = getTupleElement(tuple1, 1); // 123



// Error

// RangeError
// console.log.apply(console, new Array(1000000000000000000));

// ReferenceError

// SyntaxError

// TypeError

// URIError

try {

} catch(e) {
    if(e instanceof Error) {
        console.log(e);
    }
}



function Callback(callback: (e?:Error)=>void) {
    callback();
}


// 混合，“从可重用组件中构建类的另一种方式是，通过基类来构建它们，这种方式称为“混合”
// 混合是一个函数，传入一个构造函数，创建一个带有新功能，并且扩展构造函数的新类，返回这个类

type Constructor<T = {}> = new (...args: any) => T;

function TimesTamp<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        // 添加属性
        timestamp = Date.now();
    }
}
class User11 {}
const TUser1 = TimesTamp(User11);
const tuser = new TUser1();
console.log('123123', tuser.timestamp);



// JSX

// 注意大小写，函数组件首字母小写，类组件首字母大写

// 函数组件
type Props = {
    foo: string;
}
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
function foo1111<T> (x: T): T { return x;}
console.log(foo1111<number>(1));

const foo11111 = <T>(x: T): T => x;



// ! 赋值断言
let a2:number[];
let b2!:number[];
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
const {called} = new class {
    count = 0;
    called = () => {
        this.count++;
        console.log(this.count);
    }
}
called();
called();

// 柯里化
let add = (x: number) => (y:number) => {x+y}
add(1)(2);




// 条件类型
// 当T中的K属性为可选属性时，返回Partial类型；当K为必选属性时，返回T本身
type MyType<T, K extends keyof T> = K extends keyof T ? Partial<T> : T;
// 当T中的K属性的类型为U时，返回T本身；否则返回never类型
type MyType1<T, K extends keyof T, U> = T[K] extends U ? T : never;
// 当T为U的子类型时，返回T本身；否则返回never类型
type MyType2<T, U> = T extends U ? T : never;
// 当T为函数类型时，返回函数返回值的类型；否则返回never类型
type MyType3<T> = T extends (...args: any[]) => infer R ? R : never;
// 当T中含有名为K的属性时，返回T本身；否则返回never类型：
type MyType4<T, K> = keyof T extends K ? T : never;


// 类型推理，类型推理是一种自动推断变量类型的机制，根据变量的使用上下文以及其值的类型来推断变量的类型
// infer用来从已知类型中推断出未知类型，让类型推理更加灵活
// infer关键字通常在条件类型中使用，其中条件类型可以根据条件来决定返回的类型。infer用于捕获条件类型中的未知类型，然后可以用该类型来进行操作

// 从函数参数中推断类型，使用infer关键字来推断函数类型的参数类型
type ParameterType<T extends (...args: any) => any> = T extends ((arg: infer P) => any) ? P : never;
function foo111(param: string) {}
type ParamType = ParameterType<typeof foo111>; // string

// 从数组或元组中推断类型
type ArrayType<T> = T extends Array<infer U> ? U : never;
type TupleType<T> = T extends [infer U, ...infer U] ? U : never;

type A = ArrayType<number[]>;  // number
type B = TupleType<[number, string]>  // number, string

// 从Promise中推断类型
type PromiseType<T> = T extends Promise<infer U> ? U : never;

async function foo22(): Promise<string> {
    return 'h'
}
type promiseType = PromiseType<typeof foo22>;


// 分布式条件类型

type IfNumber<T> = T extends number ? 'yes' : 'no';
// 定义一个函数，用于获取对象的属性值。如果对象的属性值是数字，返回数字类型的对象，否则返回字符串类型的对象。
// 使用分布式条件类型ObjectWithType来定义一个新类型ObjectWithType<T, U>，它可以将T中每个属性值的类型做比较，只有当属性值的类型===U时才保留该属性。
// 同时，我们使用ObjectValue来辅助获取对象属性值的类型。
// 在getPropByType函数中，我们传入一个对象和一个类型参数U，函数会遍历对象的属性值，检查它们的类型是否等于U，并将符合条件的属性值保存在数组中后返回。
type ObjectValue<T> = T extends { [key: string]: infer U } ? U : never;
type ObjectWithType<T, U> = { [K in keyof T]: ObjectValue<T[K]> extends U ? T[K] : never };
type ExtractObject<O, U> = ObjectWithType<O, U>[keyof O];

function getPropByType<O, U>(obj: O, type: U): ExtractObject<O, U>[] {
  const result = [];
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === typeof type) {
      result.push(value);
    }
  }
  return result;
}

const obj1111 = {
  a: 1,
  b: '2',
  c: 3,
};
const result = getPropByType(obj1111, '2');

// 分布式条件类型还可以用于类型映射中
// 使用分布式条件类型，实现一个将对象中所有属性变成可选属性的函数
type Optionalize<T> =
  T extends any ? {
    [K in keyof T]?: Optionalize<T[K]>;
  } : never;

function optionalize<Key extends string, O extends { [K in Key]: any }> (obj: O): Optionalize<O> {
  let result: Optionalize<O> = {} as any;
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'object' && !Array.isArray(value)) {
    //   result[key] = optionalize(value);
    } else {
    //   result[key as keyof O] = value;
    }
  }
  return result;
}

const obj11111 = {
  a: {
    b: 1,
    c: {
      d: 2,
    },
  },
  e: '3',
};
const optionalObj = optionalize(obj11111);
console.log('asd', optionalObj);


// 对象a合并到对象box
// (Object.keys(a)).forEach(<K extends keyof Test>(k: K) => {
//     box[k] = a[k]
// })

function TT():string {
    return ''
}


// Error

// 类型
type ID<T extends string> = {
    type: T,
    value: string
}

type FooID = ID<'Foo'>
type BarID = ID<'Bar'>

const createFoo = (value: string): FooID => ({type: 'Foo', value});
const createBar = (value: string): BarID => ({type: 'Bar', value});


interface FooInter {
    bar: number,
    foo: Function
}
const foointer = {} as FooInter;
foointer.bar = 1111;


// 多个interface
interface PersonClass {
    get(type: boolean): boolean
}
 
interface PersonClass2 {
    set(): void,
    asd: string
}
 
class A1 {
    name: string;
    constructor(name: string){
        this.name = '123'
    }
}
 
class Person1 extends A1 implements PersonClass, PersonClass2 {
    asd: string
    constructor(){
        super(name)
        this.asd = '123'
    }
    get(type: boolean){
        return type
    }
    set(){}
}


// 抽象类
abstract class A11 {
    name: string
    constructor (name: string){
        this.name = name
    }
    print(): string{
        return this.name
    }
 
    abstract getName(): string
}
 
class B11 extends A11 {
    constructor(){
        super('小满')
    }
 
    getName(): string {
        return this.name
    }
}

let b1111 = new B11()
console.log(b1111.getName())



// setter getter
// getter 和 setter
class Person11 {
    // name为内部属性
    constructor(private _name: string) {}
    get name() {
        return this._name
    }
    // class 中如果不写对应的set关键字，表示get对应的属性不能被修改
    set name(value: string) {
        this._name = value
    }
}
let tom = new Person11('tom')
tom.name = 'tomtom' // 注释set会报错，name is read-only
console.log(tom.name)

// 单例模式：只允许特定类存在一个实例
class Demo {
    private static instance: Demo
    private constructor() { } // constructor前加private可以禁止new
    static getInstance() {
        if(!this.instance) this.instance = new Demo() // 但是可以在内部访问
        return this.instance
    }
}

let d1 = Demo.getInstance()
let d2 = Demo.getInstance()
console.log(d1 === d2)





// 动态导入
// const echart = await import('');

// 导出
// 输出常量时，需要先定义在导出
const aaa = 1;
// export default aaa;

// export default function test111() {}
// export default class test11 {}
// export default {}


class test11 {
    a: number
    set bar(value: number) {
        this.a = value;
    }
    get bar() {
        return this.a;
    }
}
const test111 = new test11()
test111.bar = 123;
console.log('set', test111.bar);



// 静态构造
class Static {
    static init() {

    }
}
Static.init();


// barrel, 用于导出其他多个模块
// export * from './1';

// 命名导出
import * as baz from './1'
export {baz}


// 数组
const str: string[] = new Array(2).fill('');


// 自定义事件
// 第一种：event emitter
// const emitter = new EventEmitter();
// emitter.emit('foo', foo)
// emitter.on('foo', foo => {

// })

// 第二种：create custom events
// const catFound = new CustomEvent('animalfound', {
//     detail: {
//         name: 'cat'
//     }
// })
// const dogFound = new CustomEvent('animalfound', {
//     detail: {
//         name: 'dog'
//     }
// })
// // add an appropriate event listener
// window.addEventListener('animalfound', (e:any) => console.log(e.detail.name))
// // dispatch the events
// window.dispatchEvent(catFound)
// window.dispatchEvent(dogFound)

// 第三种
// document.createEvent()，event.initEvent()，event.dispatchEvent()



// 实现一个事件监听
interface Listener<T> {
    (event: T): any
}
interface Disposeable<T> {
    dispose(): any
}

class TypedEvent<T> {
    private listener: Listener<T>[] = []
    private listenerOnce: Listener<T>[] = []
    public on = (listener: Listener<T>) : Disposeable<T> => {
        this.listener.push(listener);
        return {
            dispose: () => this.off(listener)
        }
    }
    public once = (listener: Listener<T>): void => {
        this.listenerOnce.push(listener);
    }

    public off = (listener: Listener<T>) => {
        const callbackIndex = this.listener.indexOf(listener);
        if(callbackIndex > -1) {
            this.listener.splice(callbackIndex,1);
        }
    }

    public emit = (event: T) => {
        this.listener.forEach(list => list(event));
        this.listenerOnce.forEach(list => list(event));
        this.listenerOnce = [];
    }

    public pipe = (te: TypedEvent<T>): Disposeable<T> => {
        return this.on(e => te.emit(e))
    }
}

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


