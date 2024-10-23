## use
- 使用 use 读取 context
- 将数据从服务器流式传递给客户端
- 处理 rejected Promise
在 try-catch 块中调用 use，请将组件包裹在错误边界中，或者使用 Promise 的 catch 方法来捕获错误并提供给替代值。

## useDeferredValue
延迟更新UI的某些部分
延迟渲染的组件需要包裹在memo里，memo(function component() {})

## useCallback
传递空依赖项数组，仅在 初始渲染后 运行。
没有依赖数组，会在组件的每次单独渲染（和重新渲染）之后 运行，useCallback每一次都将返回一个新的函数

## useEffect
将组件与外部系统同步
每次依赖项变更重新渲染后，React 将首先使用旧值运行 cleanup 函数（如果你提供了该函数），然后使用新值运行 setup 函数。
如果你的 Effect 正在做一些视觉相关的事情（例如，定位一个 tooltip），并且有显著的延迟（例如，它会闪烁），那么将 useEffect 替换为 useLayoutEffect。

为了 帮助你发现 bug，在开发环境下，React 在运行 setup 之前会额外运行一次setup 和 cleanup。这是一个压力测试，用于验证 Effect 逻辑是否正确实现。

## useImperativeHandle
自定义由 ref 暴露出来的句柄。
为了父组件访问子组件的ref
父组件创建const ref = useRef(null);
子组件 forwardRef((props, ref) => {
    useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);
})

不要滥用 ref。 你应当仅在你没法通过 prop 来表达 命令式 行为的时候才使用 ref：例如，滚动到指定节点、聚焦某个节点、触发一次动画，以及选择文本等等。

如果可以通过 prop 实现，那就不应该使用 ref。例如，你不应该从一个 Model 组件暴露出 {open, close} 这样的命令式句柄，最好是像 <Modal isOpen={isOpen} /> 这样，将 isOpen 作为一个 prop。副作用 可以帮你通过 prop 来暴露一些命令式的行为。



## useInsertionEffect
在布局副作用触发之前将元素插入到 DOM 中。
useInsertionEffect 比在 useLayoutEffect 或 useEffect 期间注入样式更好。因为它会确保 <style> 标签在其它 Effect 运行前被注入。否则，正常的 Effect 中的布局计算将由于过时的样式而出错。
if (typeof window === 'undefined') {
  collectedRulesSet.add(rule);
}
## useLayoutEffect
useLayoutEffect 可能会影响性能。尽可能使用 useEffect。
useLayoutEffect 是 useEffect 的一个版本，在浏览器重新绘制屏幕之前触发。

## useMemo
在每次重新渲染的时候能够缓存计算的结果。
要缓存计算值的函数。它应该是一个没有任何参数的纯函数，并且可以返回任意类型。

## useOptimistic
更乐观地更新用户界面


## useReducer
useReducer 和 useState 非常相似，但是它可以让你把状态更新逻辑从事件处理函数中移动到组件外部。
const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 });
state 是只读的。即使是对象或数组也不要尝试修改它：

## useRef
帮助引用一个不需要渲染的值。可以是intervalId等
ref不会触发重新渲染

## useState
同一事件中进行多次更新，如果直接修改变量只会执行一次，因为不会更新已经运行代码中的状态，可以使用更新函数

## useSyncExternalStore
useSyncExternalStore是一个让你订阅外部 store 

## useTransition
在不阻塞 UI 的情况下更新状态

cache 也推荐用于 记忆化数据获取，而 useMemo 只应用于计算。应该使用 memo 防止组件在其 props 未更改时重新渲染。

## lazy
const component = lazy(() => import('component'))
在组件第一次渲染前延迟加载这个组件的代码，组件将被缓存


## startTransition
在不阻塞UI的情况下更新state，函数必须是同步的
startTransition(() => {
  setTab(nextTab);
});


指针事件包含鼠标事件


forwardRef 允许组件使用 ref 将 DOM 节点暴露给父组件。

useAsyncEffect



# 为什么类组件的渲染方法返回 ReactNode，而函数组件返回 ReactElement？

在React开发中，JSX.Element、ReactNode 和 ReactElement 这三个类型分别代表不同级别的React组件树中的元素，它们在不同的上下文中有着各自的用途。
以下是它们的区别及使用场景的概述：

JSX.Element

定义：
JSX.Element 是当你编写 JSX 语法时，编译器（如Babel）将这些语法转化为等效的 React.createElement() 调用所返回的对象类型。例如，以下 JSX 代码：

const myElement = <div>Hello, World!</div>;
在编译后实际上会变为：

const myElement = React.createElement("div", null, "Hello, World!");
这里的 myElement 类型就是 JSX.Element。

使用场景：

作为组件的返回值：在React组件中，当你直接返回一个JSX表达式（如 <div>...</div>），该组件的返回类型就是 JSX.Element。
作为函数参数：当某个函数接受一个React元素作为参数时，可以将其类型声明为 JSX.Element。例如，一个负责渲染特定元素的高阶组件（HOC）可能有这样的签名：
function withSomeEnhancement(WrappedComponent: React.ComponentType): (props: Props) => JSX.Element { ... }
作为数组元素或对象属性：当需要存储或传递一系列React元素（如在数组中存储多个子组件，或在对象字面量中作为属性值）时，这些元素的类型应为 JSX.Element。
ReactNode

定义：
ReactNode 是一个更宽泛的类型，它包含了所有React认为合法的“节点”，不仅包括 JSX.Element，还包括以下几种类型：

字符串（string）
数字（number）
布尔值（boolean）
null 或 undefined
ReactFragment（由数组或<>...</>语法创建的多个并列子元素）
ReactPortal（用于将子元素插入到DOM的其他位置，如ReactDOM.createPortal()返回的类型）
使用场景：

作为组件的children属性：当一个组件允许接收任意类型的子元素（不仅仅是单一的React元素）时，其 children 属性类型通常被声明为 ReactNode。
这样可以接收字符串、数字、布尔值、空值、React元素数组、Fragments等。
泛型约束：在需要处理可能包含多种React节点类型的集合或结构时，可以使用 ReactNode 作为泛型约束，确保这些结构只包含React认可的节点类型。
ReactElement

定义：
ReactElement 是React组件树中的基础构建块，是一个JavaScript对象，表示一个具体的React组件实例及其相关的属性和子元素。它的结构通常如下：

interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
  type: T;
  props: P;
  key?: Key | null;
}
其中：

type：表示组件类型，可以是字符串（HTML标签名）或一个React组件构造函数。
props：一个对象，包含传递给组件的所有属性和方法。
key：可选的，用于React内部的高效更新和排序。
使用场景：

低级别操作：直接操作React组件树（如在自定义的shouldComponentUpdate、React.Children.map等方法中）时，可能会遇到 ReactElement 对象。
类型细化：在需要确保变量或参数具体为React组件实例（而非其他ReactNode类型）时，可以使用 ReactElement 类型。
尽管在大多数情况下，JSX.Element 已足够，但在某些涉及更底层React API或高级类型技巧的场景中，可能需要明确使用 ReactElement。
总结来说：

JSX.Element：用于表示由JSX编译出的单个React元素，常用于组件返回值、函数参数和数据结构。
ReactNode：涵盖所有React允许的节点类型，包括但不限于React元素、基本类型值、Fragments和Portals，常用于组件的children属性和需要处理多种节点类型的情况。
ReactElement：最底层的React组件实例表示，用于直接操作组件树或在需要精确类型控制时使用。
在实际编码中，通常较少直接指定为 ReactElement 类型，更多使用 JSX.Element。
回到顶部
为什么类组件的渲染方法返回 ReactNode，而函数组件返回 ReactElement？
事实上，他们确实返回了不同的东西。组件返回：
render(): ReactNode;

函数是“无状态组件”：

 interface StatelessComponent<P = {}> {
    (props: P & { children?: ReactNode }, context?: any): ReactElement | null;
    // ... doesn't matter
}


# 副作用函数
‌副作用函数‌是指函数在执行过程中除了返回函数值外，还对外部环境产生额外的影响。这种影响可能包括修改全局变量、修改传入的参数或其他外部数据等。


# state
随着时间的推移而变化，并且无法从任何东西中计算出来。