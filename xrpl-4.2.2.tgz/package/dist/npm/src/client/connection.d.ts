/// <reference types="node" />
import type { Agent } from 'http';
import { EventEmitter } from 'eventemitter3';
import type { APIVersion, RequestResponseMap } from '../models';
import { BaseRequest } from '../models/methods/baseMethod';
interface ConnectionOptions {
    trace?: boolean | ((id: string, message: string) => void);
    headers?: {
        [key: string]: string;
    };
    agent?: Agent;
    authorization?: string;
    connectionTimeout: number;
    timeout: number;
}
export type ConnectionUserOptions = Partial<ConnectionOptions>;
export declare const INTENTIONAL_DISCONNECT_CODE = 4000;
export declare class Connection extends EventEmitter {
    private readonly url;
    private ws;
    private reconnectTimeoutID;
    private heartbeatIntervalID;
    private readonly retryConnectionBackoff;
    private readonly config;
    private readonly requestManager;
    private readonly connectionManager;
    constructor(url?: string, options?: ConnectionUserOptions);
    private get state();
    private get shouldBeConnected();
    isConnected(): boolean;
    connect(): Promise<void>;
    disconnect(): Promise<number | undefined>;
    reconnect(): Promise<void>;
    request<R extends BaseRequest, T = RequestResponseMap<R, APIVersion>>(request: R, timeout?: number): Promise<T>;
    getUrl(): string;
    readonly trace: (id: string, message: string) => void;
    private onMessage;
    private onceOpen;
    private intentionalDisconnect;
    private clearHeartbeatInterval;
    private startHeartbeatInterval;
    private heartbeat;
    private onConnectionFailed;
}
export {};
//# sourceMappingURL=connection.d.ts.map