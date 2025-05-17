// const jsBridgeInited = false;
var isMexcApp = false;
var isAndroid = false;
/**
 * Android是挂在 window.mexcAppJsBridge
 * IOS是注入到 window.webkit.messageHandlers.mexcAppJsBridge
 * @returns
 */
var init = function init() {
  var _window$top$webkit, _window$top$webkit$me, _window$webkit, _window$webkit$messag;
  // 服务端渲染不处理
  if (typeof window === "undefined") {
    return;
  }
  // 如果是iframe，引用顶层mexcAppJsBridge, todo：跨域问题怎么处理
  if (window.top.mexcAppJsBridge || window.mexcAppJsBridge) {
    if (window !== window.top) {
      window.mexcAppJsBridge = window.top.mexcAppJsBridge;
    }
    isMexcApp = true;
    isAndroid = true;
  }
  if ((_window$top$webkit = window.top.webkit) !== null && _window$top$webkit !== void 0 && (_window$top$webkit$me = _window$top$webkit.messageHandlers) !== null && _window$top$webkit$me !== void 0 && _window$top$webkit$me.mexcAppJsBridge || (_window$webkit = window.webkit) !== null && _window$webkit !== void 0 && (_window$webkit$messag = _window$webkit.messageHandlers) !== null && _window$webkit$messag !== void 0 && _window$webkit$messag.mexcAppJsBridge) {
    //IOS处理
    window.mexcAppJsBridge = window.mexcAppJsBridge || {};
    if (window !== window.top) {
      window.webkit = window.top.webkit;
      window.top.mexcAppJsBridge = window.mexcAppJsBridge;
    }
    isMexcApp = true;
  }

  // 未注册或者浏览器环境
  if (!isMexcApp) {
    return;
  }

  // 如果顶层window初始化过了，此处就不要再赋值了。 IOS也需要单独处理
  window.mexcAppJsBridge.events = window.mexcAppJsBridge.events || {};
  window.mexcAppJsBridge.handleEventFromApp = window.mexcAppJsBridge.handleEventFromApp || handleEventFromApp;
  window.mexcAppJsBridge.callbackMethodId = window.mexcAppJsBridge.callbackMethodId || 1; // 生成callbackMethod值
};

init();

/**
 * 供Native主动调用H5方法的
 * 主要使用场景是事件如pageShow
 * TODO时机确认: 测试主动调用时，h5是否已经创建完毕。
 * @param data
 * @returns undefined
 */
function handleEventFromApp(data) {
  if (!data.event) {
    return;
  }
  var events = window.mexcAppJsBridge.events;
  var handlers = events[data.event];
  if (handlers && handlers.length) {
    // 避免分发时，前端业务还未注册上事件
    setTimeout(function () {
      handlers.forEach(function (fn) {
        return fn === null || fn === void 0 ? void 0 : fn(data.data);
      });
    });
  }
}

/**
 * 前端事件收集
 * 简单的订阅发布模式实现
 * @param eventName 事件名，和app约定:"pageShow" | "pageHide" | "pageDestroy" | "onBackPressed"
 * @param handler 回调函数
 * @returns undefined
 */
export function addEvent(eventName, handler) {
  var _events$eventName, _events$eventName$pus;
  if (!window.mexcAppJsBridge) {
    return;
  }
  window.mexcAppJsBridge.events = window.mexcAppJsBridge.events || {};
  var events = window.mexcAppJsBridge.events;
  events[eventName] = events[eventName] || [];
  (_events$eventName = events[eventName]) === null || _events$eventName === void 0 ? void 0 : (_events$eventName$pus = _events$eventName.push) === null || _events$eventName$pus === void 0 ? void 0 : _events$eventName$pus.call(_events$eventName, handler);
}

/**
 * 前端事件移除
 * @param eventName 事件名，和app约定:"pageShow" | "pageHide" | "pageDestroy" | "onBackPressed"
 * @param handler 回调函数，不传代表清除当前 eventName的所有回调
 * @returns undefined
 */
export function removeEvent(eventName, handler) {
  var _window$mexcAppJsBrid, _window$mexcAppJsBrid2;
  if (!window.mexcAppJsBridge) {
    return;
  }
  var events = (_window$mexcAppJsBrid = window.mexcAppJsBridge) === null || _window$mexcAppJsBrid === void 0 ? void 0 : (_window$mexcAppJsBrid2 = _window$mexcAppJsBrid.events) === null || _window$mexcAppJsBrid2 === void 0 ? void 0 : _window$mexcAppJsBrid2[eventName];
  if (!events) {
    return;
  }
  if (!handler) {
    window.mexcAppJsBridge.events[eventName] = [];
  } else {
    window.mexcAppJsBridge.events[eventName] = events.filter(function (fn) {
      return fn !== handler;
    });
  }
}

/**
 * H5调用Native方法
 * @param method native协商的方法名
 * @param params
 * @param hasCallback 是否有回调，如果有需要准备回调函数给native回调
 * @returns undefined
 */
export function callNative(method, params) {
  var hasCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!isMexcApp) {
    return Promise.resolve(null);
  }
  var promise;
  var callbackMethodName;
  if (hasCallback) {
    promise = new Promise(function (resolver) {
      callbackMethodName = getCallbackMethodId(resolver);
    });
  } else {
    promise = Promise.resolve(null);
  }
  try {
    if (isAndroid) {
      window.mexcAppJsBridge.callNative(method, !params ? "" : JSON.stringify(params), callbackMethodName);
    } else {
      window.webkit.messageHandlers.mexcAppJsBridge.postMessage(JSON.stringify({
        method: method,
        param: params,
        callbackMethod: callbackMethodName
      }));
    }
  } catch (e) {
    console.warn(e);
  }
  return promise;
}

/**
 * 生成callbackMethodName 并挂在在window上
 * @param fn
 * @returns undefined
 */
export function getCallbackMethodId(fn) {
  // eslint-disable-next-line prettier/prettier
  var callbackMethodName = "__mexc_native_call_h5_fn".concat(window.mexcAppJsBridge.callbackMethodId++, "__");
  window.mexcAppJsBridge[callbackMethodName] = function (data) {
    // ios只能回传string类型
    var result = isAndroid ? data : JSON.parse(data);
    // native回调后，删除全局方法
    window.mexcAppJsBridge[callbackMethodName] = undefined;
    delete window.mexcAppJsBridge[callbackMethodName];
    fn === null || fn === void 0 ? void 0 : fn(result);
  };
  return callbackMethodName;
}