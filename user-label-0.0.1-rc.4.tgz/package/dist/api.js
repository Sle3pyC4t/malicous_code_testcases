import { request } from '@mx-admin/utils';

function getCommonUserLabel() {
    return request('/common/user_label');
}
function getCommonUserLabelValues(userLabelId) {
    return request("/common/user_label/".concat(userLabelId));
}
function postCommonUserLabelCount(data) {
    return request('/common/user_label/target_count', {
        method: 'POST',
        data: data,
    });
}

export { getCommonUserLabel, getCommonUserLabelValues, postCommonUserLabelCount };
