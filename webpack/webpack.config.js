const BuildTimePlugin = require('./build-time-plugin');
const FileListPlugin = require('./file-list-plugin');

module.exports = {
  // 其他配置...
  plugins: [
    new BuildTimePlugin(),
    new FileListPlugin({})
  ]
};
