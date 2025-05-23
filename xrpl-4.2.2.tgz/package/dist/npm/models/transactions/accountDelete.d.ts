import { Account, BaseTransaction } from './common';
export interface AccountDelete extends BaseTransaction {
    TransactionType: 'AccountDelete';
    Destination: Account;
    DestinationTag?: number;
    CredentialIDs?: string[];
}
export declare function validateAccountDelete(tx: Record<string, unknown>): void;
//# sourceMappingURL=accountDelete.d.ts.map