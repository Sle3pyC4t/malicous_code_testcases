import { type Client } from '..';
import { Transaction } from '../models/transactions';
export declare function txNeedsNetworkID(client: Client): boolean;
export declare function setValidAddresses(tx: Transaction): void;
export declare function setNextValidSequenceNumber(client: Client, tx: Transaction): Promise<void>;
export declare function calculateFeePerTransactionType(client: Client, tx: Transaction, signersCount?: number): Promise<void>;
export declare function setLatestValidatedLedgerSequence(client: Client, tx: Transaction): Promise<void>;
export declare function checkAccountDeleteBlockers(client: Client, tx: Transaction): Promise<void>;
//# sourceMappingURL=autofill.d.ts.map