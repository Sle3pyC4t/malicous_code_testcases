import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { useState, useEffect } from "react";
import { getAppInfo, getUserInfo, getStatusBarHeight, isOnLine } from "./api";
export var useUserInfo = function useUserInfo() {
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    userInfo = _useState2[0],
    setUserInfo = _useState2[1];
  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var info;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              info = null;
              _context.next = 3;
              return getUserInfo();
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
export var useAppInfo = function useAppInfo() {
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    appInfo = _useState4[0],
    setAppInfo = _useState4[1];
  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var info;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              info = null;
              _context2.next = 3;
              return getAppInfo();
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
export var useStatusBarHeight = function useStatusBarHeight() {
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    statusBarHeight = _useState6[0],
    setStatusBarHeight = _useState6[1];
  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var height;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return getStatusBarHeight();
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
export var useIsOnline = function useIsOnline() {
  var _useState7 = useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    isOn = _useState8[0],
    setIsOn = _useState8[1];
  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
      var ret;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              ret = null;
              _context4.next = 3;
              return isOnLine();
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