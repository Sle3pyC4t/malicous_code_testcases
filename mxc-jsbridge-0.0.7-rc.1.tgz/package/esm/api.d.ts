import { IAppInfo, IUserInfo, TToastType, TEventName, IDialogParam } from "./type";
export * from "./type";
export declare const canIUse: (fn: any) => Promise<boolean>;
export declare const getAppInfo: (useCache?: boolean) => Promise<null | IAppInfo>;
export declare const getUserInfo: (useCache?: boolean) => Promise<null | IUserInfo>;
export declare const login: (useCache?: boolean) => Promise<IUserInfo | null>;
export declare const reportLog: () => void;
export declare const fetch: () => void;
/**
 * 打开native路由 或者新开webview
 * @param route 页面路由scheme
 * @param closePageStack 关闭页面栈（0 - 不关闭当前页面，1 - 关闭当前页面，n - 关闭当前页面及前面n - 1个页面）
 * 目前支持的页面Scheme：https://cfn.mxcl.top/pages/viewpage.action?pageId=40898895
 */
export declare const openPage: (route: string, closePageStack: number) => Promise<any>;
export declare const closePage: () => void;
export declare const tel: (phone: string) => void;
export declare const showAlert: (content: string, okClick?: Function) => void;
export declare const showLoading: () => void;
export declare const hideLoading: () => void;
export declare const showToast: (content: string, type?: TToastType) => void;
export declare const share: () => void;
export declare const setTitle: (title: string) => void;
export declare const setTitleBarVisible: (visible: boolean) => void;
export declare const setCloseButtonVisible: (visible: boolean) => void;
export declare const getStatusBarHeight: (useCache?: boolean) => Promise<number>;
export declare const copyToClipboard: (content: string) => void;
export declare const setBackDisable: (disable: boolean) => void;
export declare const isOnLine: () => Promise<boolean>;
export declare const showDialog: (params: IDialogParam) => Promise<boolean>;
export declare const showShare: (img: string) => void;
export declare const addEventListener: (eventName: TEventName, cb: Function) => void;
export declare const removeEventListener: (eventName: TEventName, cb?: Function) => void;
