// babel-plugin-my-prefix/index.js
// module.exports = function (babel) {
//     const { types: t } = babel;

//     return {
//         visitor: {
//             VariableDeclarator(path) {
//                 const { id } = path.node;
//                 if (t.isIdentifier(id)) {
//                     id.name = `myPrefix_${id.name}`;
//                 }
//             },
//         },
//     };
// };

module.exports = function (babel) {
    console.log(babel);
    const { types: t } = babel;

    return {
        visitor: {
            // 变量名
            VariableDeclarator(path, state) {
                const prefix = state.opts.prefix || 'myPrefix_';
                const { id } = path.node;
                if (t.isIdentifier(id)) {
                    id.name = `${prefix}${id.name}`;
                    // 将变量名转换为大写
                    // const newName = id.name.toUpperCase();
                    // path.scope.rename(id.name, newName);
                }
            },
            // 函数名
            FunctionDeclaration(path, state) {
                const prefix = state.opts.prefix || 'myPrefix_';
                const { id } = path.node;
                if (t.isIdentifier(id)) {
                    id.name = `${prefix}${id.name}`;
                }
            },
            // 属性名
            MemberExpression(path, state) {
                const prefix = state.opts.prefix || 'myPrefix_';
                const { object } = path.node;
                if (t.isIdentifier(object)) {
                    object.name = `${prefix}${object.name}`;
                }
            }
        }
    };
};
