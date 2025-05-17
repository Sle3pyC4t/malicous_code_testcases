// CommonJS版本的devCoverage.js

// 定时器 ID
let coverageLogIntervalId = null;
const IS_DEVELOPMENT = ['development', 'test', 'uat'].includes(process.env.NODE_ENV);

/**
 * 设置手动保存覆盖率数据的全局函数 window.saveCoverage
 */
function setupManualSave() {
  console.log(
    '\n%c aomyh == process.env.NODE_ENV',
    'color: #fff; border-radius: 12px; padding: 3px 10px; background: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%)',
    '\n',
    '\n',
    process.env.NODE_ENV,
  );
  if (!IS_DEVELOPMENT) return;

  window.saveCoverage = () => {
    const coverageData = window.__coverage__;
    if (coverageData) {
      try {
        const blob = new Blob([JSON.stringify(coverageData)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `coverage-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log('Coverage data saved as JSON file via saveCoverage(). Please save it to the .nyc_output directory.');
      } catch (error) {
        console.error('Error saving coverage data:', error);
      }
    } else {
      console.log('No coverage data found (window.__coverage__) when calling saveCoverage(). Make sure babel-plugin-istanbul is active.');
    }
  };
}

/**
 * 启动覆盖率数据的定期轮询日志
 * @param {number} intervalMilliseconds - 轮询间隔（毫秒）
 */
function startCoveragePolling(intervalMilliseconds = 5000) {
  if (!IS_DEVELOPMENT) return;

  // 先清除可能存在的旧定时器
  if (coverageLogIntervalId) {
    clearInterval(coverageLogIntervalId);
  }

  coverageLogIntervalId = setInterval(() => {
    if (window.__coverage__) {
      console.log(`[Coverage Poll - ${new Date().toLocaleTimeString()}] Current coverage data snapshot:`, window.__coverage__);
      collectFinalCoverage();
    } else {
      // 在覆盖率数据尚未生成时保持安静或只打印一次提示
      // console.log(`[Coverage Poll - ${new Date().toLocaleTimeString()}] window.__coverage__ not found yet.`);
    }
  }, intervalMilliseconds);

  console.log(`Started periodic coverage logging every ${intervalMilliseconds / 1000} seconds.`);
}

/**
 * 停止覆盖率数据的定期轮询日志
 */
function stopCoveragePolling() {
  if (!IS_DEVELOPMENT) return;

  if (coverageLogIntervalId) {
    clearInterval(coverageLogIntervalId);
    coverageLogIntervalId = null;
    console.log('Stopped periodic coverage logging.');
  }
}

/**
 * 在卸载时收集并处理最终的覆盖率数据
 */
function collectFinalCoverage() {
  if (!IS_DEVELOPMENT) return;

  const coverageData = window.__coverage__;
  // 修改coverageData数据key 直接更改key 值删掉项目名

  if (coverageData) {
    fetch('http://10.66.103.58:3000/api/uat/coverage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        env: process.env.NODE_ENV
      },
      body: JSON.stringify(coverageData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Report generated:', data.urls.latest);
      })
      .catch(err => {
        console.error('Error sending coverage data:', err);
      });
  } else {
    console.log('No final coverage data found inside unmount.');
  }
}

module.exports = {
  setupManualSave,
  startCoveragePolling,
  stopCoveragePolling,
  collectFinalCoverage
};