tree diff
react是怎么render一个 element 的

state数据改变页面不更新
1. 组件 render 渲染了一个对象, 当 state 已确定更新但视图未更新
2. 组件 render 渲染了一个列表, 当 state 改变视图更新异常
key不要用index
3. A 和 B 子组件共用一个父组件 state, 此时点击子组件 A 按钮更新了父组件 state, 但是子组件 B 视图不更新
key不要用index
4. 父子组件同时初始化, 子组件接收的值来自父组件异步获取的数据
5. 调用方法中 state 更新了, 但实时拿到的值还是旧的
可以在setstate回调里执行
6. 在 redux 中修改 state 页面未更新
不要直接修改原state。
7. 当列表循环渲染之后, 改变当前 item 页面数据不变


https://www.jianshu.com/p/6f16ec67bd25

react的执行步骤一般是：用state和jsx模板生成虚拟DOM，然后用虚拟DOM生成真实的 DOM，当我们state发生变化时,render函数执行，生成新的 虚拟DOM，然后比较新旧虚拟DOM的区别，找到区别，然后直接操作DOM，改变有区别的内容，
虚拟DOM其实就是一个JS对象(['div',{class:'app'},'item']),虚拟DOM核心之一是diff算法，diff算法的核心之一是同层对比，如果在第一层div时就有出现区别，那么对比结束，直接更新真实DOM中对应的当前节点，以此类推。。。