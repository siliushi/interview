type JSTypeMap = {
    'string': string,
    'number': number,
    'boolean': boolean
}
// type JSTypeName = 'string' | 'number' | 'boolean'
type JSTypeName = keyof JSTypeMap;

type ArgsType<T extends JSTypeName[]> = {
    [I in keyof T]: JSTypeMap[T[I]]
}
declare function addImpl<T extends JSTypeName[]>(
    ...args: [
        ...T,
        (...args: ArgsType<T>) => any
    ]) : void

// 前面参数不定量 a-string b-boolean c-number
addImpl('string', 'boolean', 'number', (a,b,c) => {});