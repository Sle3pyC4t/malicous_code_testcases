import { BaseRequest, BaseResponse, LookupByLedgerRequest } from './baseMethod';
export interface Channel {
    account: string;
    amount: string;
    balance: string;
    channel_id: string;
    destination_account: string;
    settle_delay: number;
    public_key?: string;
    public_key_hex?: string;
    expiration?: number;
    cancel_after?: number;
    source_tag?: number;
    destination_tag?: number;
}
export interface AccountChannelsRequest extends BaseRequest, LookupByLedgerRequest {
    command: 'account_channels';
    account: string;
    destination_account?: string;
    limit?: number;
    marker?: unknown;
}
export interface AccountChannelsResponse extends BaseResponse {
    result: {
        account: string;
        channels: Channel[];
        ledger_hash: string;
        ledger_index: number;
        validated?: boolean;
        limit?: number;
        marker?: unknown;
    };
}
//# sourceMappingURL=accountChannels.d.ts.map