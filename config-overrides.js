const {override, fixBabelImports} = require('customize-cra');

module.exports = override(
    // 启用ES7的修改器语法（babel 7）
    fixBabelImports('@babel/plugin-proposal-decorators', {'legacy': true}),

    // antd按需加载
    fixBabelImports('import', {libraryName: 'antd', libraryDirectory: 'es', style: true})
);
