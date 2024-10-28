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
    const { types: t } = babel;

    return {
        visitor: {
            // 变量名
            VariableDeclarator(path, state) {
                const prefix = state.opts.prefix || 'myPrefix_';
                const { id } = path.node;
                if (t.isIdentifier(id)) {
                    id.name = `${prefix}${id.name}`;
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
