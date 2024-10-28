// ts
// webpack
// babel
// 简历
function myNew(constructor, ...args) {
    let obj  = {};
    Object.setPrototypeOf(obj, constructor.prototype)
    const result = constructor.apply(obj, args);
    return result instanceof Object ? result : obj;
}
function myCreate(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
}