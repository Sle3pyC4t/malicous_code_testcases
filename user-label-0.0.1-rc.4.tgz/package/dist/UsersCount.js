import { __rest, __awaiter, __generator, __assign } from 'tslib';
import { jsxs, jsx } from 'react/jsx-runtime';
import { postCommonUserLabelCount } from './api.js';
import { useRequest } from 'ahooks';
import { message, Space, Spin, Button } from 'antd';
import { forwardRef, useImperativeHandle, useEffect } from 'react';

var UsersCount = forwardRef(function (_a, ref) {
    var userLabels = _a.userLabels, restProps = __rest(_a, ["userLabels"]);
    var _b = useRequest(function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(userLabels === null || userLabels === void 0 ? void 0 : userLabels.length)) return [3 /*break*/, 2];
                    return [4 /*yield*/, postCommonUserLabelCount({
                            userLabelIds: userLabels,
                        })];
                case 1:
                    result = _a.sent();
                    if (result.code === 0) {
                        return [2 /*return*/, result.data];
                    }
                    else {
                        message.error(result.msg);
                        throw Error(result.msg);
                    }
                case 2: return [2 /*return*/, 0];
                case 3: return [2 /*return*/];
            }
        });
    }); }, { manual: true }), countError = _b.error, countLoading = _b.loading, _c = _b.data, count = _c === void 0 ? 0 : _c, runPostCount = _b.run;
    useImperativeHandle(ref, function () { return ({
        count: count,
    }); });
    useEffect(function () {
        runPostCount();
    }, [userLabels]);
    return (jsxs(Space, __assign({}, restProps, { children: [jsx(Spin, { spinning: countLoading, children: countError || "\u5DF2\u9009\u62E9\u7EA6".concat(count, "\u540D\u7528\u6237") }), jsx(Button, { type: "primary", onClick: function () {
                    runPostCount();
                }, size: "small", children: "\u5237\u65B0" })] })));
});
UsersCount.displayName = 'UsersCount';
var UsersCount$1 = UsersCount;

export { UsersCount$1 as default };
