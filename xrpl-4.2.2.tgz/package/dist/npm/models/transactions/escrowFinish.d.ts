import { Account, BaseTransaction } from './common';
export interface EscrowFinish extends BaseTransaction {
    TransactionType: 'EscrowFinish';
    Owner: Account;
    OfferSequence: number | string;
    Condition?: string;
    Fulfillment?: string;
    CredentialIDs?: string[];
}
export declare function validateEscrowFinish(tx: Record<string, unknown>): void;
//# sourceMappingURL=escrowFinish.d.ts.map