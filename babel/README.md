遍历代码中的所有变量声明，并在每个变量名前加上 "myPrefix_"
安装 Babel 相关依赖： 首先，确保你已经安装了 Babel 相关的依赖。如果还没有，可以通过以下命令安装：

npm install --save-dev @babel/core @babel/cli
创建 Babel 插件： 在项目根目录下创建一个文件夹，例如 babel-plugin-my-prefix，并在其中创建一个文件 index.js。

// babel-plugin-my-prefix/index.js
module.exports = function (babel) {
    const { types: t } = babel;

    return {
        visitor: {
            VariableDeclarator(path) {
                const { id } = path.node;
                if (t.isIdentifier(id)) {
                    id.name = `myPrefix_${id.name}`;
                }
            },
        },
    };
};
配置 Babel： 在项目根目录下创建或修改 .babelrc 文件，添加你的插件：

{
    "plugins": [
        "./babel-plugin-my-prefix"
    ]
}
使用 Babel 转换代码： 创建一个示例文件 example.js：

let myVar = 1;
const anotherVar = 2;
然后运行 Babel 转换这个文件：

npx babel example.js --out-file output.js
查看输出结果： 在 output.js 中，你应该看到如下内容：

let myPrefix_myVar = 1;
const myPrefix_anotherVar = 2;
这个简单的插件展示了如何遍历 AST（抽象语法树），并修改变量名。你可以根据需要进一步扩展功能，比如处理不同类型的节点或实现更复杂的逻辑。