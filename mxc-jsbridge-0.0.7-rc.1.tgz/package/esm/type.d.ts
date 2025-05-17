/**
 * AppInfo数据结构定义
 */
export interface IAppInfo {
    appVersionCode: number;
    appVersionName: string;
    deviceId: string;
    language: string;
    brand: string;
    model: string;
    osVersionName: string;
    osVersionCode: number;
    themeDark: boolean;
    themeRedUp: boolean;
    pixelRatio: number;
    statusBarHeight: number;
    deviceOrientation: number;
    hasNavigationBar: boolean;
    navigationBarHeight: number;
}
export interface IUserInfo {
    memberId: string;
    digitalId: string;
    secondAuthType: number;
    account: string;
    status: number;
    email: string;
    mobile: string;
}
export declare type TToastType = "default" | "success" | "error";
export declare type TEventName = "pageShow" | "pageHide" | "pageDestroy" | "onBackPressed";
export interface INativeCallbackData {
    code: number;
    event?: TEventName;
    data?: any;
}
export interface IDialogParam {
    title?: string;
    content: string;
    positiveText?: string;
    positiveTextColor?: string;
    negativeText?: string;
    negativeTextColor?: string;
    cancelable?: boolean;
}
