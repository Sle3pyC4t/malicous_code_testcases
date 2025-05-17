import { type CommonApiPayload } from '@mx-admin/core';
export interface UserLabel {
    id: number;
    name: string;
    values?: UserLabel[];
}
export declare function getCommonUserLabel(): Promise<CommonApiPayload<UserLabel[]>>;
export declare function getCommonUserLabelValues(userLabelId: string): Promise<CommonApiPayload<string[]>>;
interface PostCommonUserLabelCountParams {
    userLabelIds: string[];
}
export declare function postCommonUserLabelCount(data: PostCommonUserLabelCountParams): Promise<CommonApiPayload<number>>;
export {};
