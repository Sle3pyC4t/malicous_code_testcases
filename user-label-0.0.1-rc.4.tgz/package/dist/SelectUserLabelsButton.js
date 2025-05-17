import { __read, __spreadArray, __awaiter, __generator, __assign } from 'tslib';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { postCommonUserLabelCount } from './api.js';
import { useRequest } from 'ahooks';
import { Form, message, Modal, Button, Spin } from 'antd';
import { useState, useEffect, cloneElement } from 'react';
import { toCascaderValues, allKey, leafPrefix, idPrefix } from './utils.js';
import { InlineCascader } from '@mx-admin/components';

var toApiValues = function (userLabels) {
    return Object.values((userLabels === null || userLabels === void 0 ? void 0 : userLabels.map(function (value) {
        return value[value.length - 1].includes(leafPrefix)
            ? {
                id: value[value.length - 2].match(new RegExp("^".concat(idPrefix, "(.*)$")))[1],
                leaf: value[value.length - 1].match(new RegExp("^".concat(value[value.length - 2]).concat(leafPrefix, "(.*)$")))[1],
            }
            : value[value.length - 1].includes(idPrefix)
                ? {
                    id: value[value.length - 1].match(new RegExp("^".concat(idPrefix, "(.*)$")))[1],
                }
                : null;
    }).reduce(function (storage, item) {
        var _a;
        return item
            ? __assign(__assign({}, storage), (_a = {}, _a[item.id] = storage[item.id]
                ? storage[item.id].includes('#') && item.leaf !== allKey
                    ? "".concat(storage[item.id], "#").concat(item.leaf)
                    : item.id
                : item.leaf && item.leaf !== allKey
                    ? "".concat(item.id, "#").concat(item.leaf)
                    : item.id, _a)) : storage;
    }, {})) || {});
};
var selectedPathsFormatter = function (selectedPaths) {
    return Object.values((selectedPaths === null || selectedPaths === void 0 ? void 0 : selectedPaths.map(function (value) {
        return value[value.length - 1].includes(leafPrefix)
            ? {
                id: value[value.length - 2].match(new RegExp("^".concat(idPrefix, "(.*)$")))[1],
                leaf: value[value.length - 1].match(new RegExp("^".concat(value[value.length - 2]).concat(leafPrefix, "(.*)$")))[1],
                parents: value.slice(0, value.length - 2),
            }
            : value[value.length - 1].includes(idPrefix)
                ? {
                    id: value[value.length - 1].match(new RegExp("^".concat(idPrefix, "(.*)$")))[1],
                    parents: value.slice(0, value.length - 1),
                }
                : null;
    }).reduce(function (storage, item) {
        var _a;
        return item
            ? __assign(__assign({}, storage), (_a = {}, _a[item.id] = storage[item.id]
                ? storage[item.id].key.includes('#') && item.leaf !== allKey
                    ? {
                        key: "".concat(storage[item.id].key, "#").concat(item.leaf),
                        parents: item.parents,
                    }
                    : { key: item.id, parents: item.parents }
                : item.leaf && item.leaf !== allKey
                    ? { key: "".concat(item.id, "#").concat(item.leaf), parents: item.parents }
                    : { key: item.id, parents: item.parents }, _a)) : storage;
    }, {})) || {})
        .map(function (item) {
        var _a = __read(item.key.split('#')), id = _a[0], values = _a.slice(1);
        return values.length
            ? values.map(function (value) { return __spreadArray(__spreadArray([], __read(item.parents), false), [
                "".concat(idPrefix).concat(id),
                "".concat(idPrefix).concat(id).concat(leafPrefix).concat(value),
            ], false); })
            : [__spreadArray(__spreadArray([], __read(item.parents), false), ["".concat(idPrefix).concat(id)], false)];
    })
        .reduce(function (storage, item) { return __spreadArray(__spreadArray([], __read(storage), false), __read(item), false); }, []);
};
var userLabelFormId = 'userLabelForm';
var SelectUserLabelsButton = function (_a) {
    var children = _a.children, onClick = _a.onClick, userLabels = _a.userLabels, flatUserLabels = _a.flatUserLabels, _b = _a.value, _c = _b === void 0 ? {} : _b, selectedUserLabelsParam = _c.selectedUserLabels, onChange = _a.onChange, onVisibleChange = _a.onVisibleChange, readOnly = _a.readOnly, loadLeaves = _a.loadLeaves;
    var _d = __read(useState(false), 2), visible = _d[0], setVisible = _d[1];
    var _e = __read(Form.useForm(), 1), form = _e[0];
    useEffect(function () {
        if (visible) {
            form.setFieldsValue({
                userLabels: selectedUserLabelsParam === null || selectedUserLabelsParam === void 0 ? void 0 : selectedUserLabelsParam.map(function (value) { return toCascaderValues(value, flatUserLabels); }).reduce(function (storage, item) { return __spreadArray(__spreadArray([], __read(storage), false), __read(item), false); }, []),
            });
        }
    }, [visible, selectedUserLabelsParam]);
    var selectedUserLabels = Form.useWatch('userLabels', form);
    var _f = __read(useState(false), 2), leavesLoading = _f[0], setLeavesLoading = _f[1];
    var _g = __read(useState(false), 2), leavesFirstLoadFinished = _g[0], setLeavesFirstLoadFinished = _g[1];
    useEffect(function () {
        var abort = false;
        var runLoadLeaves = function () { return __awaiter(void 0, void 0, void 0, function () {
            var loadLeavesPromises_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!visible) return [3 /*break*/, 5];
                        setLeavesLoading(true);
                        loadLeavesPromises_1 = [];
                        selectedUserLabels === null || selectedUserLabels === void 0 ? void 0 : selectedUserLabels.forEach(function (item) {
                            if (item[item.length - 1].includes(leafPrefix)) {
                                loadLeavesPromises_1.push(loadLeaves(item[item.length - 2]));
                            }
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, Promise.all(loadLeavesPromises_1)];
                    case 2:
                        _a.sent();
                        if (!abort) {
                            setLeavesFirstLoadFinished(true);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 4:
                        if (!abort) {
                            setLeavesLoading(false);
                        }
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        runLoadLeaves();
        return function () {
            abort = true;
        };
    }, [visible, selectedUserLabels]);
    useEffect(function () {
        if (visible && !leavesFirstLoadFinished && selectedUserLabels) {
            var set_1 = new Set(flatUserLabels.map(function (item) { return item.value; }));
            var reducedSelectedUserLabels = selectedUserLabels.filter(function (item) {
                return set_1.has(item[item.length - 1]);
            });
            if (reducedSelectedUserLabels.length < selectedUserLabels.length) {
                form.setFieldsValue({
                    userLabels: reducedSelectedUserLabels,
                });
            }
        }
    }, [leavesFirstLoadFinished]);
    var _h = useRequest(function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postCommonUserLabelCount({
                        userLabelIds: toApiValues(selectedUserLabels),
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
            }
        });
    }); }, { manual: true }), countError = _h.error, countLoading = _h.loading, _j = _h.data, count = _j === void 0 ? 0 : _j, runPostCount = _h.run, resetCount = _h.cancel;
    useEffect(function () {
        if (visible && (selectedUserLabels === null || selectedUserLabels === void 0 ? void 0 : selectedUserLabels.length)) {
            runPostCount();
        }
        else {
            resetCount();
        }
    }, [visible, selectedUserLabels]);
    useEffect(function () {
        if (onVisibleChange)
            onVisibleChange(visible);
    }, [visible]);
    return (jsxs(Fragment, { children: [cloneElement(children, {
                onClick: function () {
                    setVisible(true);
                    onClick === null || onClick === void 0 ? void 0 : onClick();
                },
            }), jsx(Modal, { title: "\u9009\u62E9\u7528\u6237\u6807\u7B7E", visible: visible, footer: readOnly
                    ? [
                        // eslint-disable-next-line react/jsx-key
                        jsx(Button, { onClick: function () {
                                setVisible(false);
                            }, children: "\u5173\u95ED" }),
                    ]
                    : undefined, okText: "\u63D0\u4EA4", okButtonProps: {
                    form: userLabelFormId,
                    htmlType: 'submit',
                }, onCancel: function () {
                    setVisible(false);
                }, afterClose: function () {
                    resetCount();
                }, destroyOnClose: true, children: jsx(Form, { id: userLabelFormId, form: form, layout: "horizontal", onFinish: function (_a) {
                        var resultUserLabels = _a.userLabels;
                        onChange === null || onChange === void 0 ? void 0 : onChange({
                            selectedUserLabels: toApiValues(resultUserLabels),
                        });
                        setVisible(false);
                    }, children: jsx(Spin, { spinning: leavesLoading, children: jsx(Form.Item, { name: "userLabels", extra: jsx(Spin, { spinning: countLoading, children: countError
                                    ? countError
                                    : "\u5DF2\u9009\u62E9\u7EA6".concat(count ? count : 0, "\u540D\u7528\u6237") }), rules: [{ required: true, message: '请选择用户标签' }], children: jsx(InlineCascader, { tagsPlacement: "bottom", placeholder: "\u8BF7\u8F93\u5165\u6807\u7B7E\u540D\u79F0", multiple: true, options: userLabels, showSearch: function (_a) {
                                    var inputValue = _a.inputValue, path = _a.path;
                                    return path.some(function (option) {
                                        return option.label
                                            .toLowerCase()
                                            .indexOf(inputValue.toLowerCase()) > -1;
                                    });
                                }, onChange: function (newSelectedUserLabels) {
                                    var getSelectedLabelsMap = function (labels) {
                                        if (labels === void 0) { labels = []; }
                                        var labelsMap = {};
                                        labels.forEach(function (item) {
                                            var idIndex, id, value;
                                            if (item[item.length - 1].includes(leafPrefix)) {
                                                idIndex = item.length - 2;
                                                id = item[idIndex];
                                                value = item[item.length - 1];
                                            }
                                            else {
                                                idIndex = item.length - 1;
                                                id = item[idIndex];
                                            }
                                            if (!labelsMap[id]) {
                                                labelsMap[id] = {
                                                    parents: item.slice(0, idIndex),
                                                    values: [],
                                                };
                                            }
                                            if (value) {
                                                labelsMap[id].values.push(value);
                                            }
                                        });
                                        return labelsMap;
                                    };
                                    var newSelectedLabelsMap = getSelectedLabelsMap(newSelectedUserLabels);
                                    var selectedLabelsMap = getSelectedLabelsMap(selectedUserLabels);
                                    var finalSelectedUserLabels = [];
                                    Object.entries(newSelectedLabelsMap).forEach(function (_a) {
                                        var _b, _c;
                                        var _d = __read(_a, 2), id = _d[0], _e = _d[1], parents = _e.parents, values = _e.values;
                                        if (values.length) {
                                            var parentLabel = flatUserLabels.find(function (item) { return item.value === id; });
                                            if (parentLabel) {
                                                var oldAllSelected = ((_b = selectedLabelsMap[id]) === null || _b === void 0 ? void 0 : _b.values.length) === 0 ||
                                                    ((_c = selectedLabelsMap[id]) === null || _c === void 0 ? void 0 : _c.values.some(function (value) {
                                                        return value.includes(allKey);
                                                    }));
                                                if (values.some(function (value) { return value.includes(allKey); })) {
                                                    if (oldAllSelected &&
                                                        parentLabel.children.length !== values.length) {
                                                        finalSelectedUserLabels.push.apply(finalSelectedUserLabels, __spreadArray([], __read(values
                                                            .filter(function (value) { return !value.includes(allKey); })
                                                            .map(function (value) { return __spreadArray(__spreadArray([], __read(parents), false), [id, value], false); })), false));
                                                    }
                                                    else {
                                                        finalSelectedUserLabels.push.apply(finalSelectedUserLabels, __spreadArray([], __read(parentLabel.children.map(function (item) { return __spreadArray(__spreadArray([], __read(parents), false), [
                                                            id,
                                                            item.value,
                                                        ], false); })), false));
                                                    }
                                                }
                                                else if (!oldAllSelected) {
                                                    finalSelectedUserLabels.push.apply(finalSelectedUserLabels, __spreadArray([], __read(values.map(function (value) { return __spreadArray(__spreadArray([], __read(parents), false), [id, value], false); })), false));
                                                }
                                            }
                                            else {
                                                finalSelectedUserLabels.push.apply(finalSelectedUserLabels, __spreadArray([], __read(values.map(function (value) { return __spreadArray(__spreadArray([], __read(parents), false), [id, value], false); })), false));
                                            }
                                        }
                                        else {
                                            finalSelectedUserLabels.push(__spreadArray(__spreadArray([], __read(parents), false), [id], false));
                                        }
                                    });
                                    form.setFieldsValue({
                                        userLabels: finalSelectedUserLabels,
                                    });
                                }, showCheckedStrategy: "SHOW_CHILD", displayRender: function (label) { return label.join('-'); }, selectedPathsFormatter: selectedPathsFormatter, loadData: function (selectedOptions) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        try {
                                            loadLeaves(selectedOptions[selectedOptions.length - 1].value);
                                        }
                                        catch (e) {
                                            console.error(e);
                                        }
                                        return [2 /*return*/];
                                    });
                                }); } }) }) }) }) })] }));
};
var SelectUserLabelsButton$1 = SelectUserLabelsButton;

export { SelectUserLabelsButton$1 as default };
