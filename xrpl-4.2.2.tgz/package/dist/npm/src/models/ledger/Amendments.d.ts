import { BaseLedgerEntry, HasOptionalPreviousTxnID } from './BaseLedgerEntry';
export declare const AMENDMENTS_ID = "7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4";
export interface Majority {
    Majority: {
        Amendment: string;
        CloseTime: number;
    };
}
export default interface Amendments extends BaseLedgerEntry, HasOptionalPreviousTxnID {
    LedgerEntryType: 'Amendments';
    Amendments?: string[];
    Majorities?: Majority[];
    Flags: 0;
}
//# sourceMappingURL=Amendments.d.ts.map