"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.useUserInfo = exports.useStatusBarHeight = exports.useIsOnline = exports.useAppInfo = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _react = require("react");
var _api = require("./api");
var useUserInfo = function useUserInfo() {
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    userInfo = _useState2[0],
    setUserInfo = _useState2[1];
  (0, _react.useEffect)(function () {
    (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var info;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              info = null;
              _context.next = 3;
              return (0, _api.getUserInfo)();
            case 3:
              info = _context.sent;
              setUserInfo(info);
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, []);
  return userInfo;
};
exports.useUserInfo = useUserInfo;
var useAppInfo = function useAppInfo() {
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    appInfo = _useState4[0],
    setAppInfo = _useState4[1];
  (0, _react.useEffect)(function () {
    (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var info;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              info = null;
              _context2.next = 3;
              return (0, _api.getAppInfo)();
            case 3:
              info = _context2.sent;
              setAppInfo(info);
            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }, []);
  return appInfo;
};
exports.useAppInfo = useAppInfo;
var useStatusBarHeight = function useStatusBarHeight() {
  var _useState5 = (0, _react.useState)(0),
    _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
    statusBarHeight = _useState6[0],
    setStatusBarHeight = _useState6[1];
  (0, _react.useEffect)(function () {
    (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var height;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _api.getStatusBarHeight)();
            case 2:
              height = _context3.sent;
              setStatusBarHeight(height);
            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }, []);
  return statusBarHeight;
};
exports.useStatusBarHeight = useStatusBarHeight;
var useIsOnline = function useIsOnline() {
  var _useState7 = (0, _react.useState)(0),
    _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
    isOn = _useState8[0],
    setIsOn = _useState8[1];
  (0, _react.useEffect)(function () {
    (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var ret;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              ret = null;
              _context4.next = 3;
              return (0, _api.isOnLine)();
            case 3:
              ret = _context4.sent;
              setIsOn(ret);
            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  }, []);
  return isOn;
};
exports.useIsOnline = useIsOnline;