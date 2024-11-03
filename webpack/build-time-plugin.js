class BuildTimePlugin {
    apply(compiler) {
      // 绑定到 Webpack 的 'done' 钩子，表示构建完成
      compiler.hooks.done.tap('BuildTimePlugin', (stats) => {
        const buildTime = stats.endTime - stats.startTime;
        console.log(`Build completed in ${buildTime}ms`);
      });
    }
  }
  
  module.exports = BuildTimePlugin;
  