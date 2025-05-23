import { Currency, XChainBridge } from '../common';
import { LedgerEntry } from '../ledger';
import { BaseRequest, BaseResponse, LookupByLedgerRequest } from './baseMethod';
export interface LedgerEntryRequest extends BaseRequest, LookupByLedgerRequest {
    command: 'ledger_entry';
    mpt_issuance?: string;
    mptoken?: {
        mpt_issuance_id: string;
        account: string;
    } | string;
    amm?: {
        asset: {
            currency: string;
            issuer?: string;
        };
        asset2: {
            currency: string;
            issuer?: string;
        };
    };
    include_deleted?: boolean;
    binary?: boolean;
    index?: string;
    account_root?: string;
    check?: string;
    credential?: {
        subject: string;
        issuer: string;
        credentialType: string;
    } | string;
    deposit_preauth?: {
        owner: string;
        authorized: string;
    } | string;
    did?: string;
    directory?: {
        sub_index?: number;
        dir_root?: string;
        owner?: string;
    } | string;
    escrow?: {
        owner: string;
        seq: number;
    } | string;
    offer?: {
        account: string;
        seq: number;
    } | string;
    payment_channel?: string;
    ripple_state?: {
        accounts: string[];
        currency: string;
    };
    ticket?: {
        owner: string;
        ticket_sequence: number;
    } | string;
    nft_page?: string;
    bridge_account?: string;
    bridge?: XChainBridge;
    xchain_owned_claim_id?: {
        locking_chain_door: string;
        locking_chain_issue: Currency;
        issuing_chain_door: string;
        issuing_chain_issue: Currency;
        xchain_owned_claim_id: string | number;
    } | string;
    xchain_owned_create_account_claim_id?: {
        locking_chain_door: string;
        locking_chain_issue: Currency;
        issuing_chain_door: string;
        issuing_chain_issue: Currency;
        xchain_owned_create_account_claim_id: string | number;
    } | string;
}
export interface LedgerEntryResponse<T = LedgerEntry> extends BaseResponse {
    result: {
        index: string;
        ledger_current_index: number;
        node?: T;
        node_binary?: string;
        validated?: boolean;
        deleted_ledger_index?: number;
    };
}
//# sourceMappingURL=ledgerEntry.d.ts.map