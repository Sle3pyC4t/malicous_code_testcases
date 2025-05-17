// 测试导入dev-coverage包
console.log('开始测试导入dev-coverage包...');

try {
  // 导入dev-coverage包
  const devCoverage = require('dev-coverage');
  console.log('成功导入dev-coverage包');
  
  // 打印导出的所有函数
  console.log('导出的函数:', Object.keys(devCoverage));
  
  // 尝试访问每个导出的函数
  if (typeof devCoverage.setupManualSave === 'function') {
    console.log('setupManualSave是一个函数');
  }
  
  if (typeof devCoverage.startCoveragePolling === 'function') {
    console.log('startCoveragePolling是一个函数');
  }
  
  if (typeof devCoverage.stopCoveragePolling === 'function') {
    console.log('stopCoveragePolling是一个函数');
  }
  
  if (typeof devCoverage.collectFinalCoverage === 'function') {
    console.log('collectFinalCoverage是一个函数');
  }
  
  if (typeof devCoverage.getBabelConfig === 'function') {
    console.log('getBabelConfig是一个函数');
  }
  
  if (typeof devCoverage.getWebpackConfig === 'function') {
    console.log('getWebpackConfig是一个函数');
  }
} catch (error) {
  console.error('导入dev-coverage包时出错:', error);
}
