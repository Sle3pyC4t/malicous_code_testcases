// 模拟的coverage-source-map-trace-plugin模块
function CoverageSourceMapTracePlugin(options) {
  this.options = options || {};
}

CoverageSourceMapTracePlugin.prototype.apply = function(compiler) {
  // 模拟插件的apply方法
  console.log('CoverageSourceMapTracePlugin应用于编译器');
};

module.exports = CoverageSourceMapTracePlugin;