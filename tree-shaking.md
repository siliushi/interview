Tree-shaking 是一种在构建 JavaScript 应用程序时用于优化代码的技术，它通过消除未使用的代码（即“死代码”）来减少最终打包文件的大小，从而提高性能。这个术语主要与 JavaScript 模块化打包工具（如 Webpack、Rollup 等）相关联。

# 工作原理
Tree-shaking 的核心思想是分析代码的依赖关系，找出哪些模块、函数或变量没有被使用，然后将这些未使用的部分从最终的打包文件中移除。它依赖于 ES6 模块系统（import 和 export）的静态结构，因为这些语法在编译时可以被静态分析。

# 关键点
1. 静态导入：
Tree-shaking 只对使用 ES6 模块语法的代码有效，因为 ES6 的 import 和 export 是静态的，编译器可以在构建时进行静态分析。而 CommonJS 的 require 是动态的，不能在编译时分析出所有依赖。
2. 纯函数：
Tree-shaking 对“纯函数”最有效。纯函数是指没有副作用且只依赖于输入参数的函数。如果某个函数没有被调用且没有副作用，Tree-shaking 可以安全地移除它。
3. 副作用：
如果模块中有副作用（比如执行一些全局操作或修改全局状态），Tree-shaking 可能不会移除这些模块，因为即使没有显式调用它们，它们仍然可能对应用程序的运行有影响。
4. 配置：
在一些打包工具中，如 Webpack，需要特定的配置来启用 Tree-shaking。比如在 Webpack 中，需要设置 mode 为 production，或者使用类似于 TerserPlugin 的插件来移除死代码。
# 实现 Tree-shaking 的工具
Webpack：支持 Tree-shaking，但需要正确的配置，如启用 mode: 'production'。Webpack 的 Tree-shaking 依赖于 TerserPlugin，这个插件会在生产环境中自动启用。
Rollup：天生支持 Tree-shaking，因其以 ES 模块为中心的设计，非常适合进行代码优化。
Parcel：作为“零配置”打包工具，Parcel 也内置了 Tree-shaking 功能，用户不需要进行额外配置。