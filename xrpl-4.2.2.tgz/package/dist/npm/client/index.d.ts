import { EventEmitter } from 'eventemitter3';
import { APIVersion, LedgerIndex, DEFAULT_API_VERSION } from '../models/common';
import { Request, AccountChannelsRequest, AccountChannelsResponse, AccountLinesRequest, AccountLinesResponse, AccountObjectsRequest, AccountObjectsResponse, AccountOffersRequest, AccountOffersResponse, AccountTxRequest, AccountTxResponse, LedgerDataRequest, LedgerDataResponse, TxResponse } from '../models/methods';
import type { RequestResponseMap, RequestAllResponseMap, MarkerRequest, SubmitResponse } from '../models/methods';
import type { BookOffer, BookOfferCurrency } from '../models/methods/bookOffers';
import { SimulateBinaryResponse, SimulateJsonResponse } from '../models/methods/simulate';
import type { EventTypes, OnEventToListenerMap } from '../models/methods/subscribe';
import type { SubmittableTransaction } from '../models/transactions';
import { Wallet } from '../Wallet';
import { FundingOptions } from '../Wallet/fundWallet';
import { Connection, ConnectionUserOptions } from './connection';
export interface ClientOptions extends ConnectionUserOptions {
    feeCushion?: number;
    maxFeeXRP?: string;
    timeout?: number;
}
type RequestNextPageType = AccountChannelsRequest | AccountLinesRequest | AccountObjectsRequest | AccountOffersRequest | AccountTxRequest | LedgerDataRequest;
type RequestNextPageReturnMap<T> = T extends AccountChannelsRequest ? AccountChannelsResponse : T extends AccountLinesRequest ? AccountLinesResponse : T extends AccountObjectsRequest ? AccountObjectsResponse : T extends AccountOffersRequest ? AccountOffersResponse : T extends AccountTxRequest ? AccountTxResponse : T extends LedgerDataRequest ? LedgerDataResponse : never;
declare class Client extends EventEmitter<EventTypes> {
    readonly connection: Connection;
    readonly feeCushion: number;
    readonly maxFeeXRP: string;
    networkID: number | undefined;
    buildVersion: string | undefined;
    apiVersion: APIVersion;
    constructor(server: string, options?: ClientOptions);
    get url(): string;
    request<R extends Request, V extends APIVersion = typeof DEFAULT_API_VERSION, T = RequestResponseMap<R, V>>(req: R): Promise<T>;
    requestNextPage<T extends RequestNextPageType, U extends RequestNextPageReturnMap<T>>(req: T, resp: U): Promise<RequestNextPageReturnMap<T>>;
    on<T extends EventTypes, U extends (...args: any[]) => void = OnEventToListenerMap<T>>(eventName: T, listener: U): this;
    requestAll<T extends MarkerRequest, U = RequestAllResponseMap<T, APIVersion>>(request: T, collect?: string): Promise<U[]>;
    getServerInfo(): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): boolean;
    autofill<T extends SubmittableTransaction>(transaction: T, signersCount?: number): Promise<T>;
    submit(transaction: SubmittableTransaction | string, opts?: {
        autofill?: boolean;
        failHard?: boolean;
        wallet?: Wallet;
    }): Promise<SubmitResponse>;
    simulate<Binary extends boolean = false>(transaction: SubmittableTransaction | string, opts?: {
        binary?: Binary;
    }): Promise<Binary extends true ? SimulateBinaryResponse : SimulateJsonResponse>;
    submitAndWait<T extends SubmittableTransaction = SubmittableTransaction>(transaction: T | string, opts?: {
        autofill?: boolean;
        failHard?: boolean;
        wallet?: Wallet;
    }): Promise<TxResponse<T>>;
    prepareTransaction(transaction: SubmittableTransaction, signersCount?: number): ReturnType<Client['autofill']>;
    getXrpBalance(address: string, options?: {
        ledger_hash?: string;
        ledger_index?: LedgerIndex;
    }): Promise<number>;
    getBalances(address: string, options?: {
        ledger_hash?: string;
        ledger_index?: LedgerIndex;
        peer?: string;
        limit?: number;
    }): Promise<Array<{
        value: string;
        currency: string;
        issuer?: string | undefined;
    }>>;
    getOrderbook(currency1: BookOfferCurrency, currency2: BookOfferCurrency, options?: {
        limit?: number;
        ledger_index?: LedgerIndex;
        ledger_hash?: string | null;
        taker?: string | null;
    }): Promise<{
        buy: BookOffer[];
        sell: BookOffer[];
    }>;
    getLedgerIndex(): Promise<number>;
    fundWallet(this: Client, wallet?: Wallet | null, options?: FundingOptions): Promise<{
        wallet: Wallet;
        balance: number;
    }>;
}
export { Client };
//# sourceMappingURL=index.d.ts.map