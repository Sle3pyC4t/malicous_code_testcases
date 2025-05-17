import { TEventName } from "./type";
/**
 * 前端事件收集
 * 简单的订阅发布模式实现
 * @param eventName 事件名，和app约定:"pageShow" | "pageHide" | "pageDestroy" | "onBackPressed"
 * @param handler 回调函数
 * @returns undefined
 */
export declare function addEvent(eventName: TEventName, handler: Function): void;
/**
 * 前端事件移除
 * @param eventName 事件名，和app约定:"pageShow" | "pageHide" | "pageDestroy" | "onBackPressed"
 * @param handler 回调函数，不传代表清除当前 eventName的所有回调
 * @returns undefined
 */
export declare function removeEvent(eventName: TEventName, handler?: Function): void;
/**
 * H5调用Native方法
 * @param method native协商的方法名
 * @param params
 * @param hasCallback 是否有回调，如果有需要准备回调函数给native回调
 * @returns undefined
 */
export declare function callNative(method: string, params: any, hasCallback?: boolean): Promise<any>;
/**
 * 生成callbackMethodName 并挂在在window上
 * @param fn
 * @returns undefined
 */
export declare function getCallbackMethodId(fn: Function): string;
