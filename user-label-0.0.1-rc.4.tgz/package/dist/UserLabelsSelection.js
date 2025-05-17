import { __read } from 'tslib';
import { jsx, jsxs } from 'react/jsx-runtime';
import { PlusOutlined } from '@ant-design/icons';
import { Spin, Tag } from 'antd';
import { useState, useEffect } from 'react';
import { toCascaderIdAndValues } from './utils.js';
import { useUserLabels } from './hooks.js';
import SelectUserLabelsButton from './SelectUserLabelsButton.js';

var UserLabelsSelection = function (_a) {
    var valueParam = _a.value, onChange = _a.onChange, readOnly = _a.readOnly;
    var _b = __read(useState(valueParam), 2), value = _b[0], setValue = _b[1];
    useEffect(function () {
        setValue(valueParam);
    }, [valueParam]);
    var _c = useUserLabels(), loading = _c.loading, userLabels = _c.data, flatUserLabels = _c.flatUserLabels, loadLeaves = _c.loadLeaves;
    return (jsx(Spin, { spinning: loading, children: jsxs("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px 0' }, children: [value === null || value === void 0 ? void 0 : value.map(function (id) { return (jsx(Tag, { style: { whiteSpace: 'normal', wordBreak: 'break-word' }, closable: !readOnly, onClose: function (e) {
                        e.preventDefault();
                        setValue(function (currentValue) {
                            var newValue = currentValue.filter(function (currentId) { return currentId !== id; });
                            onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
                            return newValue;
                        });
                    }, children: (function () {
                        var _a = toCascaderIdAndValues(id, flatUserLabels), ids = _a.ids, values = _a.values;
                        return "".concat(ids
                            .map(function (currentId) {
                            var _a, _b;
                            return (_b = (_a = flatUserLabels.find(function (item) { return item.value === currentId; })) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : currentId;
                        })
                            .join('-')).concat(values.length ? "#".concat(values.join('#')) : '');
                    })() }, id)); }), jsx(SelectUserLabelsButton, { userLabels: userLabels, flatUserLabels: flatUserLabels, value: {
                        selectedUserLabels: value,
                    }, onChange: function (_a) {
                        var selectedUserLabels = _a.selectedUserLabels;
                        setValue(selectedUserLabels);
                        onChange === null || onChange === void 0 ? void 0 : onChange(selectedUserLabels);
                    }, readOnly: readOnly, loadLeaves: loadLeaves, children: jsxs(Tag, { color: "processing", children: [jsx(PlusOutlined, {}), " \u6807\u7B7E"] }) })] }) }));
};
var UserLabelsSelection$1 = UserLabelsSelection;

export { UserLabelsSelection$1 as default };
