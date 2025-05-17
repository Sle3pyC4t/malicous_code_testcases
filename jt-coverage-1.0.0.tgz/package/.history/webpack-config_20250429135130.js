// 在您的包中添加一个配置生成器文件 webpack-config.js
const CoverageSourceMapTracePlugin = require("coverage-source-map-trace-plugin");

function getWebpackConfig(options = {}) {
  return {
    configureWebpack: {
      plugins: [new CoverageSourceMapTracePlugin(options.pluginOptions || {})],
      devtool: "source-map", // 或其他适合的 sourcemap 配置
    },
  };
}

module.exports = {
  getWebpackConfig,
  CoverageSourceMapTracePlugin,
};
