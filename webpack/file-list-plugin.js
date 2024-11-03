class FileListPlugin {
    constructor(options) {
      // 接收配置选项
      this.options = options || {};
    }
  
    apply(compiler) {
      // 绑定到 'emit' 钩子，表示生成文件之前
      compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
        let fileList = 'In this build:\n\n';
        
        // 遍历生成的文件
        for (let filename in compilation.assets) {
          fileList += `- ${filename}\n`;
        }
  
        // 将文件列表写入到一个新的文件中
        compilation.assets['filelist.txt'] = {
          source: function() {
            return fileList;
          },
          size: function() {
            return fileList.length;
          }
        };
  
        // 完成异步钩子，继续构建过程
        callback();
      });
    }
  }
  
  module.exports = FileListPlugin;
  