import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { addEvent, removeEvent, callNative, getCallbackMethodId } from "./jsbridge";
var CachedAppInfo = null;
var CachedUserInfo = null;
var CachedStatusBarHeight;
var CachedCanIUse = {};
var MethodNameMap = new WeakMap();
export * from "./type";
export var canIUse = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(fn) {
    var method, result;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            method = MethodNameMap.get(fn) || fn;
            if (method) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return", false);
          case 3:
            if (!(typeof CachedCanIUse[method] !== "undefined")) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return", CachedCanIUse[method]);
          case 5:
            _context.next = 7;
            return callNative("caniuse", {
              method: method
            }, true);
          case 7:
            result = _context.sent;
            CachedCanIUse[method] = (result === null || result === void 0 ? void 0 : result.code) === 0;
            return _context.abrupt("return", CachedCanIUse[method]);
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function canIUse(_x) {
    return _ref.apply(this, arguments);
  };
}();
export var getAppInfo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var useCache,
      result,
      _args2 = arguments;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            useCache = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : true;
            if (!(useCache && CachedAppInfo)) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return", CachedAppInfo);
          case 3:
            _context2.next = 5;
            return callNative("getAppInfo", null, true);
          case 5:
            result = _context2.sent;
            CachedAppInfo = (result === null || result === void 0 ? void 0 : result.code) === 0 ? result === null || result === void 0 ? void 0 : result.data : null;
            return _context2.abrupt("return", CachedAppInfo);
          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getAppInfo() {
    return _ref2.apply(this, arguments);
  };
}();
export var getUserInfo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var useCache,
      result,
      _args3 = arguments;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            useCache = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : true;
            if (!(useCache && CachedUserInfo)) {
              _context3.next = 3;
              break;
            }
            return _context3.abrupt("return", CachedUserInfo);
          case 3:
            _context3.next = 5;
            return callNative("getUserInfo", null, true);
          case 5:
            result = _context3.sent;
            CachedUserInfo = (result === null || result === void 0 ? void 0 : result.code) === 0 ? result === null || result === void 0 ? void 0 : result.data : null;
            return _context3.abrupt("return", CachedUserInfo);
          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function getUserInfo() {
    return _ref3.apply(this, arguments);
  };
}();
export var login = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
    var useCache,
      result,
      _args4 = arguments;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            useCache = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : true;
            if (!(useCache && CachedUserInfo)) {
              _context4.next = 3;
              break;
            }
            return _context4.abrupt("return", CachedUserInfo);
          case 3:
            _context4.next = 5;
            return callNative("login", null, true);
          case 5:
            result = _context4.sent;
            CachedUserInfo = (result === null || result === void 0 ? void 0 : result.code) === 0 ? result === null || result === void 0 ? void 0 : result.data : null;
            return _context4.abrupt("return", CachedUserInfo);
          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function login() {
    return _ref4.apply(this, arguments);
  };
}();
export var reportLog = function reportLog() {};
export var fetch = function fetch() {};

/**
 * 打开native路由 或者新开webview
 * @param route 页面路由scheme
 * @param closePageStack 关闭页面栈（0 - 不关闭当前页面，1 - 关闭当前页面，n - 关闭当前页面及前面n - 1个页面）
 * 目前支持的页面Scheme：https://cfn.mxcl.top/pages/viewpage.action?pageId=40898895
 */
export var openPage = function openPage(route, closePageStack) {
  var callbackMethodName;
  var promise = new Promise(function (resolve) {
    callbackMethodName = getCallbackMethodId(resolve);
  });
  callNative("openPage", {
    route: route,
    callbackMethod: callbackMethodName,
    closePageStack: closePageStack
  });
  return promise;
};
export var closePage = function closePage() {
  callNative("closePage", null);
};
export var tel = function tel(phone) {
  callNative("tel", {
    number: phone
  });
};
export var showAlert = function showAlert(content, okClick) {
  callNative("alert", {
    content: content
  }, true).then(function (data) {
    if ((data === null || data === void 0 ? void 0 : data.code) === 0) {
      okClick === null || okClick === void 0 ? void 0 : okClick();
    }
  });
};
export var showLoading = function showLoading() {
  callNative("showLoading", null);
};
export var hideLoading = function hideLoading() {
  callNative("hideLoading", null);
};
export var showToast = function showToast(content) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
  var typeValue = {
    "default": 0,
    success: 1,
    error: 2
  }[type];
  callNative("showToast", {
    content: content,
    type: typeValue
  });
};
export var share = function share() {
  callNative("share", null);
};
export var setTitle = function setTitle(title) {
  callNative("setTitle", {
    title: title
  });
};
export var setTitleBarVisible = function setTitleBarVisible(visible) {
  callNative("setTitleBarVisible", {
    visible: visible
  });
};
export var setCloseButtonVisible = function setCloseButtonVisible(visible) {
  callNative("setCloseButtonVisible", {
    visible: visible
  });
};
export var getStatusBarHeight = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
    var _result$data;
    var useCache,
      result,
      _args5 = arguments;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            useCache = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : true;
            if (!(useCache && typeof CachedStatusBarHeight === "number")) {
              _context5.next = 3;
              break;
            }
            return _context5.abrupt("return", CachedStatusBarHeight);
          case 3:
            _context5.next = 5;
            return callNative("getStatusBarHeight", null, true);
          case 5:
            result = _context5.sent;
            CachedStatusBarHeight = (result === null || result === void 0 ? void 0 : result.code) === 0 ? result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.height : null;
            return _context5.abrupt("return", CachedStatusBarHeight);
          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function getStatusBarHeight() {
    return _ref5.apply(this, arguments);
  };
}();
export var copyToClipboard = function copyToClipboard(content) {
  callNative("copyToClipboard", {
    content: content
  });
};
export var setBackDisable = function setBackDisable(disable) {
  callNative(disable ? "disableBack" : "enableBack", null);
};
export var isOnLine = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return canIUse(isOnLine);
          case 2:
            if (_context6.sent) {
              _context6.next = 4;
              break;
            }
            return _context6.abrupt("return", true);
          case 4:
            return _context6.abrupt("return", callNative("checkNetAvailable", null, true).then(function (data) {
              return (data === null || data === void 0 ? void 0 : data.code) === 0;
            }));
          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function isOnLine() {
    return _ref6.apply(this, arguments);
  };
}();
export var showDialog = function showDialog(params) {
  var config = _objectSpread({
    title: "Confirm",
    positiveText: "Ok",
    negativeText: "Cancel",
    cancelable: true
  }, params);
  return callNative("alert", config, true).then(function (data) {
    return Promise.resolve((data === null || data === void 0 ? void 0 : data.code) === 0);
  });
};
export var showShare = function showShare(img) {
  callNative("showShare", {
    img: img
  });
};
export var addEventListener = function addEventListener(eventName, cb) {
  addEvent(eventName, cb);
};
export var removeEventListener = function removeEventListener(eventName, cb) {
  removeEvent(eventName, cb);
};
MethodNameMap.set(getAppInfo, "getAppInfo");
MethodNameMap.set(getUserInfo, "getUserInfo");
MethodNameMap.set(login, "login");
MethodNameMap.set(openPage, "openPage");
MethodNameMap.set(closePage, "closePage");
MethodNameMap.set(tel, "tel");
MethodNameMap.set(showAlert, "alert");
MethodNameMap.set(showLoading, "showLoading");
MethodNameMap.set(hideLoading, "hideLoading");
MethodNameMap.set(showToast, "showToast");
MethodNameMap.set(share, "share");
MethodNameMap.set(setTitle, "setTitle");
MethodNameMap.set(setTitleBarVisible, "setTitleBarVisible");
MethodNameMap.set(setCloseButtonVisible, "setCloseButtonVisible");
MethodNameMap.set(getStatusBarHeight, "getStatusBarHeight");
MethodNameMap.set(copyToClipboard, "copyToClipboard");
MethodNameMap.set(setBackDisable, "disableBack");
MethodNameMap.set(isOnLine, "checkNetAvailable");
MethodNameMap.set(showDialog, "alert");
MethodNameMap.set(showDialog, "showShare");