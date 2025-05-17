import { __awaiter, __generator, __read, __spreadArray } from 'tslib';
import { getCommonUserLabel, getCommonUserLabelValues } from './api.js';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useState, useMemo } from 'react';
import { getFlatLabels, leafPrefix, allKey, idPrefix } from './utils.js';

var directoryPrefix = 'directory-';
var userLabelMapper = function (userLabel) {
    var _a;
    return ({
        value: userLabel.values
            ? "".concat(directoryPrefix).concat(userLabel.id)
            : "".concat(idPrefix).concat(userLabel.id),
        label: userLabel.name,
        children: (_a = userLabel.values) === null || _a === void 0 ? void 0 : _a.map(userLabelMapper),
        isLeaf: false,
    });
};
var useUserLabels = function () {
    var _a = useRequest(function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCommonUserLabel()];
                case 1:
                    result = _a.sent();
                    if (result.code === 0) {
                        setUserLabelsWithValues(result.data.map(userLabelMapper));
                    }
                    else {
                        message.error(result.msg);
                        setUserLabelsWithValues([]);
                    }
                    return [2 /*return*/];
            }
        });
    }); }), loading = _a.loading, run = _a.run;
    var _b = __read(useState([]), 2), userLabelsWithValues = _b[0], setUserLabelsWithValues = _b[1];
    var flatUserLabels = useMemo(function () {
        return getFlatLabels(userLabelsWithValues);
    }, [userLabelsWithValues]);
    return {
        loading: loading,
        data: userLabelsWithValues,
        flatUserLabels: flatUserLabels,
        run: run,
        loadLeaves: function (id) { return __awaiter(void 0, void 0, void 0, function () {
            var targetOption, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        targetOption = (_a = flatUserLabels.find(function (item) { return item.value === id; })) === null || _a === void 0 ? void 0 : _a.ref;
                        if (!targetOption) return [3 /*break*/, 3];
                        if (!((!targetOption.children || targetOption.children.length === 0) &&
                            !targetOption.loading)) return [3 /*break*/, 2];
                        targetOption.loading = true;
                        return [4 /*yield*/, getCommonUserLabelValues(targetOption.value.match(new RegExp("^".concat(idPrefix, "(.*)$")))[1])];
                    case 1:
                        result = _b.sent();
                        targetOption.loading = false;
                        if (result.code === 0) {
                            if (result.data.length) {
                                targetOption.children = __spreadArray([
                                    {
                                        label: '全部',
                                        value: "".concat(targetOption.value).concat(leafPrefix).concat(allKey),
                                    }
                                ], __read(result.data.map(function (item) { return ({
                                    label: item,
                                    value: "".concat(targetOption.value).concat(leafPrefix).concat(item),
                                }); })), false);
                            }
                            else {
                                targetOption.isLeaf = true;
                            }
                            setUserLabelsWithValues(function (prevUserLabelsWithValues) { return __spreadArray([], __read(prevUserLabelsWithValues), false); });
                        }
                        else {
                            message.error(result.msg);
                            // 失敗後須設置children數值才能取消畫面loading展示
                            targetOption.children = [];
                            // 需在下個ui frame的時候將children移除才能再次讓使用者可以點擊畫面來嘗試載入資料
                            setTimeout(function () {
                                targetOption.children = undefined;
                                setUserLabelsWithValues(function (prevUserLabelsWithValues) { return __spreadArray([], __read(prevUserLabelsWithValues), false); });
                            });
                            setUserLabelsWithValues(function (prevUserLabelsWithValues) { return __spreadArray([], __read(prevUserLabelsWithValues), false); });
                            console.error("getCommonUserLabelValues failed, id: ".concat(id));
                        }
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        console.error("id: ".concat(JSON.stringify(id), " \u627E\u4E0D\u5230"));
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); },
    };
};

export { useUserLabels };
