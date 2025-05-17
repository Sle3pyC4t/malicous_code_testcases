import { __read, __spreadArray, __values, __assign } from 'tslib';

var idPrefix = 'id-';
var leafPrefix = 'value-';
var allKey = 'all';
var getFlatLabels = function (labels, parent) {
    var e_1, _a;
    var flatLabels = [];
    try {
        for (var labels_1 = __values(labels), labels_1_1 = labels_1.next(); !labels_1_1.done; labels_1_1 = labels_1.next()) {
            var label = labels_1_1.value;
            flatLabels.push(__assign(__assign({}, label), { parent: parent, ref: label }));
            if (label.children) {
                flatLabels.push.apply(flatLabels, __spreadArray([], __read(getFlatLabels(label.children, label)), false));
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (labels_1_1 && !labels_1_1.done && (_a = labels_1.return)) _a.call(labels_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return flatLabels;
};
var toCascaderValue = function (value, flatLabels) {
    var label = flatLabels.find(function (item) { return item.value === value; });
    return (label === null || label === void 0 ? void 0 : label.parent)
        ? __spreadArray(__spreadArray([], __read(toCascaderValue(label.parent.value, flatLabels)), false), [value], false) : [value];
};
var toCascaderValues = function (valueParam, flatLabels) {
    var _a = __read(valueParam.split('#')), id = _a[0], values = _a.slice(1);
    var cascaderId = "".concat(idPrefix).concat(id);
    if (values.length)
        return values.map(function (value) { return __spreadArray(__spreadArray([], __read(toCascaderValue(cascaderId, flatLabels)), false), [
            "".concat(cascaderId).concat(leafPrefix).concat(value),
        ], false); });
    else {
        return [toCascaderValue(cascaderId, flatLabels)];
    }
};
var toCascaderIdAndValues = function (valueParam, flatLabels) {
    var _a = __read(valueParam.split('#')), id = _a[0], values = _a.slice(1);
    var cascaderId = "".concat(idPrefix).concat(id);
    return { ids: toCascaderValue(cascaderId, flatLabels), values: values };
};

export { allKey, getFlatLabels, idPrefix, leafPrefix, toCascaderIdAndValues, toCascaderValues };
