declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(pointer: Point): Point;
}
declare const pointer1: Point;
declare const pointer2: Point;
type IdIndex = {
    id: string;
    display: string;
};
declare const list: IdIndex[];
declare const index: number;
declare const content: IdIndex[];
declare function foo(x: number, y?: number): {
    x: number;
    y: number;
} | {
    x: number;
    y?: undefined;
};
declare function toInit(str: string): {
    valid: boolean;
    int?: number;
} | undefined;
declare class Point3 extends Point {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    add(point: Point3): Point3;
}
declare const point3_1: Point3;
declare const point3_2: Point3;
declare class Something {
    static instances: number;
    constructor();
}
declare const something1: Something;
declare const something2: Something;
declare var _extends: any;
declare function f(): void;
declare function Person(age: number): void;
declare const person: any;
declare class Adder {
    x: number;
    constructor(x: number);
    add: (y: number) => number;
}
declare class Child extends Adder {
    x: number;
    y: number;
    constructor(x: number, y: number);
    CallAdder(): number;
}
declare class Child2 extends Adder {
    CallAdder(y: number): number;
}
declare const adder1: Child;
declare const adder2: Child2;
declare var test: () => {
    a: number;
};
declare const re: (a: number, b: number, ...c: number[]) => void;
declare var funs: Function[];
declare const a: number;
declare let b: number;
declare var c: number;
declare const obj: {
    a1: {
        a11: number;
    };
    b1: number;
};
declare const b1: number, t: {
    a1: {
        a11: number;
    };
};
declare var m: number;
declare var n: number;
declare function foo1(x: number, y: number, z: number): void;
declare const args: readonly [0, 1, 2];
declare const object1: {
    a: number;
    b: number;
};
declare const object2: {
    a: number;
    b: number;
};
interface IteratorResult<T> {
    done: boolean;
    value: T | null;
}
interface Iterator<T> {
    next(value: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e: any): IteratorResult<T>;
}
declare class Component {
    name: string;
    constructor(name: string);
}
declare class Frame implements Iterator<Component> {
    name: string;
    components: Component[];
    private pointer;
    constructor(name: string, components: Component[]);
    next(): IteratorResult<Component>;
}
declare class Frame1 implements Iterator<Component> {
    name: string;
    components: Component[];
    private pointer;
    constructor(name: string, components: Component[]);
    next(): IteratorResult<Component>;
}
declare let frame: Frame1;
declare const frame1: IteratorResult<Component>;
declare const frame2: IteratorResult<Component>;
declare const frame3: IteratorResult<Component>;
declare const frame4: IteratorResult<Component>;
declare var say: string;
declare var html: string;
declare function loadFile(filename: string, cb: (error: Error, data?: any) => void): void;
declare const promise: any;
declare function loadItem(id: number): Promise<{
    id: number;
}>;
declare const task1: any;
declare const task2: any;
