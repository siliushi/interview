// 1、正确的重载签名和函数实现
function debounce<A extends any[], R>(
    fn: (...args: A) => R,
    duration?: number
  ): (...args: A) => void;
  
// 函数实现
function debounce<A extends any[], R>(
fn: (...args: A) => R,
duration: number = 300 // 默认延迟时间为 300ms
): (...args: A) => void {
    let timeoutId: number | null;
    return (...args: A) => {
        if (timeoutId) {
        clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
        fn(...args);
        }, duration);
    };
}

// 示例用法
function handler(a: number, b: number) {
    console.log(a + b);
    return a+b;
}

const dHandler = debounce(handler, 1000); // 防抖延迟 1 秒
dHandler(3, 4); // 1 秒后输出 7



// 2、不可变类型
interface Obj {
    a: number;
    b: string;
    c: {
        d: boolean;
    }
}
let obj : DeepReadonly<Obj> = {
    a: 1,
    b: '2',
    c: {
        d: true
    }
}
// obj.a不可修改
// Readonly是浅的不可修改，内部对象还是可以修改的
obj.c.d = false;
type DeepReadonly<T extends Record<string|symbol, any>> = {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
}

// 3、实现optional
interface Article {
    title: string;
    content: string;
    author: string;
    date: Date;
    readCount: number;
}

interface CreateArticleOptional {
    title: string;
    content: string;
    author?: string;
    date?: Date;
    readCount?: number;
}
// 但是optional与上面的类型有很多重复，所以实现一个options
type CreateArticleOptional1 = Optional<Article, 'author' | 'date' | 'readCount'>;

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
// & intersection交叉，取全部不重复的
// Omit 排除
// Pick 挑选
// Partial 可选

function createArticle(options: CreateArticleOptional) {

}

// 交叉
interface obj1 {
    a: string;
    b: string;
}
interface obj2 {
    c: string;
    d: string;
}
type obj3 = obj1 & obj2;
// {
//     a: 'a',
//     b: 'b',
//     c: 'c',
//     d: 'd'
// }

// Omit 排除
interface Todo {
    title: string;
    description: string;
    complete: boolean;
    createAt: number;
}
type TodoOmit = Omit<Todo, 'description' | 'complete'>
// {
//     title: '',
//     createAt: 1
// }

// Pick挑选
type TodoPick = Pick<Todo, 'description' | 'complete'>
// {
//     description: '',
//     complete: true
// }

// Partial部分,所有都是可选的
type TodoPartial = Partial<Todo>


// 4、协变与逆变
// 类型安全，保证成员始终可用
// 子类型不能赋值给父类型
// 给的是小类型，收的是大类型
interface fans {
    call: any
}
interface Ikun extends fans {
    sing: string;
    dance: any;
    basketball: any;
}
interface SuperIkun extends Ikun {
    rap: any
}

let fans = {
    call: 'call'
}

let ikun:Ikun = {
    call: 'call',
    sing: 'sing',
    dance: 'dance',
    basketball: true
}
// ikun = fans; // 报错，收的得是小的类型

type Transform = (x: Ikun) => Ikun;
type SubTransform = (x: SuperIkun) => SuperIkun;

const subTransform: SubTransform = (x) => {
    return x as any;
}

// const ransform: Transform = subTransform;


// 5、infer 推断
// 第一个例子
type sum = (a:number, b:number) => number;
type concat = (a: any[], b: any[]) => any[];
// type Return<T> = T是一个函数 ？ 函数的返回类型：T
type Return<T> = T extends (...args: any[]) => infer R ? R : T;
// let sumResult: ReturnType<sum>;
let sumResult: Return<sum>;
let concatResult: Return<concat>;

// 第二个例子
type PromiseType<T> = T extends Promise<infer R> ? PromiseType<R> : T;
type pt = PromiseType<Promise<string>>

// 第三个例子
type FirstArg<T> = T extends (first: infer R, ...args: any[]) => any ? R : T; 
type fa = FirstArg<(name: number, age: number) => void>; //string

// 第四个例子
type ArrayType<T> = T extends (infer I)[] ? I : T;
type ItemType1 = ArrayType<[string, number]>; // string | number
type ItemType2 = ArrayType<string[]>; // string



// 6、从字段到函数的推导
type Watcher<T> = {
    on<K extends string & keyof T>(
        // eventName: string,
        // eventName: `${'firstName' | 'lastName' | 'age'}Changed`,
        // eventName: `${string & keyof T}Changed`, // 属性有可能是symbol，所以要用string约束下
        eventName: `${K}Changed`,
        callback: (oldValue:T[K], newValue:T[K]) => void
    ) : void;
}
declare function watch<T>(obj: T): Watcher<T>;

const personWatcher = watch({
    firstName: 'Saoirse',
    lastName: 'Ronan',
    age: 26
})

personWatcher.on(
    'ageChanged',
    (oldValue, newValue) => {

    }
)


// 7、联合类型/交叉类型===交集/并集
// 交集并集并不是属性的交和并
// 并集
type U = {
    a: number;
    b: number;
} | {
    a: number;
    c: number;
}
const u: U = {
    a: 1,
    b: 2,
    c: 3
};
u.c // 报错，只能用相同的属性

// 交集
type I = {
    a: number;
    b: number;
} & {
    a: number;
    c: number;
}

const i:I = {
    a: 2,
    b: 2,
    c: 2
}
i.c


type test1 = 'a' | 'b' | 1 & string;
type test2 = ('a' & string) | ('b' & string) | (1 & string)
//  'a' | 'b' | never  => 'a' | 'b'

// 把联合类型转换为交叉类型，
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;