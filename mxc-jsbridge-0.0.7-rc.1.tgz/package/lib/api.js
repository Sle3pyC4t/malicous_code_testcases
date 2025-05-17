"use strict";

var _context9;
var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  canIUse: true,
  getAppInfo: true,
  getUserInfo: true,
  login: true,
  reportLog: true,
  fetch: true,
  openPage: true,
  closePage: true,
  tel: true,
  showAlert: true,
  showLoading: true,
  hideLoading: true,
  showToast: true,
  share: true,
  setTitle: true,
  setTitleBarVisible: true,
  setCloseButtonVisible: true,
  getStatusBarHeight: true,
  copyToClipboard: true,
  setBackDisable: true,
  isOnLine: true,
  showDialog: true,
  showShare: true,
  addEventListener: true,
  removeEventListener: true
};
exports.tel = exports.showToast = exports.showShare = exports.showLoading = exports.showDialog = exports.showAlert = exports.share = exports.setTitleBarVisible = exports.setTitle = exports.setCloseButtonVisible = exports.setBackDisable = exports.reportLog = exports.removeEventListener = exports.openPage = exports.login = exports.isOnLine = exports.hideLoading = exports.getUserInfo = exports.getStatusBarHeight = exports.getAppInfo = exports.fetch = exports.copyToClipboard = exports.closePage = exports.canIUse = exports.addEventListener = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _weakMap = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/weak-map"));
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
var _jsbridge = require("./jsbridge");
var _type = require("./type");
_forEachInstanceProperty(_context9 = _Object$keys(_type)).call(_context9, function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _type[key]) return;
  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _type[key];
    }
  });
});
function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context7, _context8; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context7 = ownKeys(Object(source), !0)).call(_context7, function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context8 = ownKeys(Object(source))).call(_context8, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
var CachedAppInfo = null;
var CachedUserInfo = null;
var CachedStatusBarHeight;
var CachedCanIUse = {};
var MethodNameMap = new _weakMap["default"]();
var canIUse = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(fn) {
    var method, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
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
            return (0, _jsbridge.callNative)("caniuse", {
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
exports.canIUse = canIUse;
var getAppInfo = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var useCache,
      result,
      _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
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
            return (0, _jsbridge.callNative)("getAppInfo", null, true);
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
exports.getAppInfo = getAppInfo;
var getUserInfo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var useCache,
      result,
      _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
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
            return (0, _jsbridge.callNative)("getUserInfo", null, true);
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
exports.getUserInfo = getUserInfo;
var login = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var useCache,
      result,
      _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
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
            return (0, _jsbridge.callNative)("login", null, true);
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
exports.login = login;
var reportLog = function reportLog() {};
exports.reportLog = reportLog;
var fetch = function fetch() {};

/**
 * 打开native路由 或者新开webview
 * @param route 页面路由scheme
 * @param closePageStack 关闭页面栈（0 - 不关闭当前页面，1 - 关闭当前页面，n - 关闭当前页面及前面n - 1个页面）
 * 目前支持的页面Scheme：https://cfn.mxcl.top/pages/viewpage.action?pageId=40898895
 */
exports.fetch = fetch;
var openPage = function openPage(route, closePageStack) {
  var callbackMethodName;
  var promise = new _promise["default"](function (resolve) {
    callbackMethodName = (0, _jsbridge.getCallbackMethodId)(resolve);
  });
  (0, _jsbridge.callNative)("openPage", {
    route: route,
    callbackMethod: callbackMethodName,
    closePageStack: closePageStack
  });
  return promise;
};
exports.openPage = openPage;
var closePage = function closePage() {
  (0, _jsbridge.callNative)("closePage", null);
};
exports.closePage = closePage;
var tel = function tel(phone) {
  (0, _jsbridge.callNative)("tel", {
    number: phone
  });
};
exports.tel = tel;
var showAlert = function showAlert(content, okClick) {
  (0, _jsbridge.callNative)("alert", {
    content: content
  }, true).then(function (data) {
    if ((data === null || data === void 0 ? void 0 : data.code) === 0) {
      okClick === null || okClick === void 0 ? void 0 : okClick();
    }
  });
};
exports.showAlert = showAlert;
var showLoading = function showLoading() {
  (0, _jsbridge.callNative)("showLoading", null);
};
exports.showLoading = showLoading;
var hideLoading = function hideLoading() {
  (0, _jsbridge.callNative)("hideLoading", null);
};
exports.hideLoading = hideLoading;
var showToast = function showToast(content) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
  var typeValue = {
    "default": 0,
    success: 1,
    error: 2
  }[type];
  (0, _jsbridge.callNative)("showToast", {
    content: content,
    type: typeValue
  });
};
exports.showToast = showToast;
var share = function share() {
  (0, _jsbridge.callNative)("share", null);
};
exports.share = share;
var setTitle = function setTitle(title) {
  (0, _jsbridge.callNative)("setTitle", {
    title: title
  });
};
exports.setTitle = setTitle;
var setTitleBarVisible = function setTitleBarVisible(visible) {
  (0, _jsbridge.callNative)("setTitleBarVisible", {
    visible: visible
  });
};
exports.setTitleBarVisible = setTitleBarVisible;
var setCloseButtonVisible = function setCloseButtonVisible(visible) {
  (0, _jsbridge.callNative)("setCloseButtonVisible", {
    visible: visible
  });
};
exports.setCloseButtonVisible = setCloseButtonVisible;
var getStatusBarHeight = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var _result$data;
    var useCache,
      result,
      _args5 = arguments;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
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
            return (0, _jsbridge.callNative)("getStatusBarHeight", null, true);
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
exports.getStatusBarHeight = getStatusBarHeight;
var copyToClipboard = function copyToClipboard(content) {
  (0, _jsbridge.callNative)("copyToClipboard", {
    content: content
  });
};
exports.copyToClipboard = copyToClipboard;
var setBackDisable = function setBackDisable(disable) {
  (0, _jsbridge.callNative)(disable ? "disableBack" : "enableBack", null);
};
exports.setBackDisable = setBackDisable;
var isOnLine = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
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
            return _context6.abrupt("return", (0, _jsbridge.callNative)("checkNetAvailable", null, true).then(function (data) {
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
exports.isOnLine = isOnLine;
var showDialog = function showDialog(params) {
  var config = _objectSpread({
    title: "Confirm",
    positiveText: "Ok",
    negativeText: "Cancel",
    cancelable: true
  }, params);
  return (0, _jsbridge.callNative)("alert", config, true).then(function (data) {
    return _promise["default"].resolve((data === null || data === void 0 ? void 0 : data.code) === 0);
  });
};
exports.showDialog = showDialog;
var showShare = function showShare(img) {
  (0, _jsbridge.callNative)("showShare", {
    img: img
  });
};
exports.showShare = showShare;
var addEventListener = function addEventListener(eventName, cb) {
  (0, _jsbridge.addEvent)(eventName, cb);
};
exports.addEventListener = addEventListener;
var removeEventListener = function removeEventListener(eventName, cb) {
  (0, _jsbridge.removeEvent)(eventName, cb);
};
exports.removeEventListener = removeEventListener;
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