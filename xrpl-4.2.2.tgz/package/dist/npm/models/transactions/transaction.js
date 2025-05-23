"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const errors_1 = require("../../errors");
const utils_1 = require("../utils");
const flags_1 = require("../utils/flags");
const accountDelete_1 = require("./accountDelete");
const accountSet_1 = require("./accountSet");
const AMMBid_1 = require("./AMMBid");
const AMMClawback_1 = require("./AMMClawback");
const AMMCreate_1 = require("./AMMCreate");
const AMMDelete_1 = require("./AMMDelete");
const AMMDeposit_1 = require("./AMMDeposit");
const AMMVote_1 = require("./AMMVote");
const AMMWithdraw_1 = require("./AMMWithdraw");
const checkCancel_1 = require("./checkCancel");
const checkCash_1 = require("./checkCash");
const checkCreate_1 = require("./checkCreate");
const clawback_1 = require("./clawback");
const common_1 = require("./common");
const CredentialAccept_1 = require("./CredentialAccept");
const CredentialCreate_1 = require("./CredentialCreate");
const CredentialDelete_1 = require("./CredentialDelete");
const depositPreauth_1 = require("./depositPreauth");
const DIDDelete_1 = require("./DIDDelete");
const DIDSet_1 = require("./DIDSet");
const escrowCancel_1 = require("./escrowCancel");
const escrowCreate_1 = require("./escrowCreate");
const escrowFinish_1 = require("./escrowFinish");
const MPTokenAuthorize_1 = require("./MPTokenAuthorize");
const MPTokenIssuanceCreate_1 = require("./MPTokenIssuanceCreate");
const MPTokenIssuanceDestroy_1 = require("./MPTokenIssuanceDestroy");
const MPTokenIssuanceSet_1 = require("./MPTokenIssuanceSet");
const NFTokenAcceptOffer_1 = require("./NFTokenAcceptOffer");
const NFTokenBurn_1 = require("./NFTokenBurn");
const NFTokenCancelOffer_1 = require("./NFTokenCancelOffer");
const NFTokenCreateOffer_1 = require("./NFTokenCreateOffer");
const NFTokenMint_1 = require("./NFTokenMint");
const NFTokenModify_1 = require("./NFTokenModify");
const offerCancel_1 = require("./offerCancel");
const offerCreate_1 = require("./offerCreate");
const oracleDelete_1 = require("./oracleDelete");
const oracleSet_1 = require("./oracleSet");
const payment_1 = require("./payment");
const paymentChannelClaim_1 = require("./paymentChannelClaim");
const paymentChannelCreate_1 = require("./paymentChannelCreate");
const paymentChannelFund_1 = require("./paymentChannelFund");
const permissionedDomainDelete_1 = require("./permissionedDomainDelete");
const permissionedDomainSet_1 = require("./permissionedDomainSet");
const setRegularKey_1 = require("./setRegularKey");
const signerListSet_1 = require("./signerListSet");
const ticketCreate_1 = require("./ticketCreate");
const trustSet_1 = require("./trustSet");
const XChainAccountCreateCommit_1 = require("./XChainAccountCreateCommit");
const XChainAddAccountCreateAttestation_1 = require("./XChainAddAccountCreateAttestation");
const XChainAddClaimAttestation_1 = require("./XChainAddClaimAttestation");
const XChainClaim_1 = require("./XChainClaim");
const XChainCommit_1 = require("./XChainCommit");
const XChainCreateBridge_1 = require("./XChainCreateBridge");
const XChainCreateClaimID_1 = require("./XChainCreateClaimID");
const XChainModifyBridge_1 = require("./XChainModifyBridge");
function validate(transaction) {
    const tx = Object.assign({}, transaction);
    if (tx.TransactionType == null) {
        throw new errors_1.ValidationError('Object does not have a `TransactionType`');
    }
    if (typeof tx.TransactionType !== 'string') {
        throw new errors_1.ValidationError("Object's `TransactionType` is not a string");
    }
    if (tx.Memos != null && typeof tx.Memos !== 'object') {
        throw new errors_1.ValidationError('Memo must be array');
    }
    if (tx.Memos != null) {
        ;
        tx.Memos.forEach((memo) => {
            if ((memo === null || memo === void 0 ? void 0 : memo.Memo) == null) {
                throw new errors_1.ValidationError('Memo data must be in a `Memo` field');
            }
            if (memo.Memo.MemoData) {
                if (!(0, utils_1.isHex)(memo.Memo.MemoData)) {
                    throw new errors_1.ValidationError('MemoData field must be a hex value');
                }
            }
            if (memo.Memo.MemoType) {
                if (!(0, utils_1.isHex)(memo.Memo.MemoType)) {
                    throw new errors_1.ValidationError('MemoType field must be a hex value');
                }
            }
            if (memo.Memo.MemoFormat) {
                if (!(0, utils_1.isHex)(memo.Memo.MemoFormat)) {
                    throw new errors_1.ValidationError('MemoFormat field must be a hex value');
                }
            }
        });
    }
    Object.keys(tx).forEach((key) => {
        const standard_currency_code_len = 3;
        if (tx[key] && (0, common_1.isIssuedCurrency)(tx[key])) {
            const txCurrency = tx[key].currency;
            if (txCurrency.length === standard_currency_code_len &&
                txCurrency.toUpperCase() === 'XRP') {
                throw new errors_1.ValidationError(`Cannot have an issued currency with a similar standard code to XRP (received '${txCurrency}'). XRP is not an issued currency.`);
            }
        }
    });
    tx.Flags = (0, flags_1.convertTxFlagsToNumber)(tx);
    switch (tx.TransactionType) {
        case 'AMMBid':
            (0, AMMBid_1.validateAMMBid)(tx);
            break;
        case 'AMMClawback':
            (0, AMMClawback_1.validateAMMClawback)(tx);
            break;
        case 'AMMCreate':
            (0, AMMCreate_1.validateAMMCreate)(tx);
            break;
        case 'AMMDelete':
            (0, AMMDelete_1.validateAMMDelete)(tx);
            break;
        case 'AMMDeposit':
            (0, AMMDeposit_1.validateAMMDeposit)(tx);
            break;
        case 'AMMVote':
            (0, AMMVote_1.validateAMMVote)(tx);
            break;
        case 'AMMWithdraw':
            (0, AMMWithdraw_1.validateAMMWithdraw)(tx);
            break;
        case 'AccountDelete':
            (0, accountDelete_1.validateAccountDelete)(tx);
            break;
        case 'AccountSet':
            (0, accountSet_1.validateAccountSet)(tx);
            break;
        case 'CheckCancel':
            (0, checkCancel_1.validateCheckCancel)(tx);
            break;
        case 'CheckCash':
            (0, checkCash_1.validateCheckCash)(tx);
            break;
        case 'CheckCreate':
            (0, checkCreate_1.validateCheckCreate)(tx);
            break;
        case 'Clawback':
            (0, clawback_1.validateClawback)(tx);
            break;
        case 'CredentialAccept':
            (0, CredentialAccept_1.validateCredentialAccept)(tx);
            break;
        case 'CredentialCreate':
            (0, CredentialCreate_1.validateCredentialCreate)(tx);
            break;
        case 'CredentialDelete':
            (0, CredentialDelete_1.validateCredentialDelete)(tx);
            break;
        case 'DIDDelete':
            (0, DIDDelete_1.validateDIDDelete)(tx);
            break;
        case 'DIDSet':
            (0, DIDSet_1.validateDIDSet)(tx);
            break;
        case 'DepositPreauth':
            (0, depositPreauth_1.validateDepositPreauth)(tx);
            break;
        case 'EscrowCancel':
            (0, escrowCancel_1.validateEscrowCancel)(tx);
            break;
        case 'EscrowCreate':
            (0, escrowCreate_1.validateEscrowCreate)(tx);
            break;
        case 'EscrowFinish':
            (0, escrowFinish_1.validateEscrowFinish)(tx);
            break;
        case 'MPTokenAuthorize':
            (0, MPTokenAuthorize_1.validateMPTokenAuthorize)(tx);
            break;
        case 'MPTokenIssuanceCreate':
            (0, MPTokenIssuanceCreate_1.validateMPTokenIssuanceCreate)(tx);
            break;
        case 'MPTokenIssuanceDestroy':
            (0, MPTokenIssuanceDestroy_1.validateMPTokenIssuanceDestroy)(tx);
            break;
        case 'MPTokenIssuanceSet':
            (0, MPTokenIssuanceSet_1.validateMPTokenIssuanceSet)(tx);
            break;
        case 'NFTokenAcceptOffer':
            (0, NFTokenAcceptOffer_1.validateNFTokenAcceptOffer)(tx);
            break;
        case 'NFTokenBurn':
            (0, NFTokenBurn_1.validateNFTokenBurn)(tx);
            break;
        case 'NFTokenCancelOffer':
            (0, NFTokenCancelOffer_1.validateNFTokenCancelOffer)(tx);
            break;
        case 'NFTokenCreateOffer':
            (0, NFTokenCreateOffer_1.validateNFTokenCreateOffer)(tx);
            break;
        case 'NFTokenMint':
            (0, NFTokenMint_1.validateNFTokenMint)(tx);
            break;
        case 'NFTokenModify':
            (0, NFTokenModify_1.validateNFTokenModify)(tx);
            break;
        case 'OfferCancel':
            (0, offerCancel_1.validateOfferCancel)(tx);
            break;
        case 'OfferCreate':
            (0, offerCreate_1.validateOfferCreate)(tx);
            break;
        case 'OracleDelete':
            (0, oracleDelete_1.validateOracleDelete)(tx);
            break;
        case 'OracleSet':
            (0, oracleSet_1.validateOracleSet)(tx);
            break;
        case 'Payment':
            (0, payment_1.validatePayment)(tx);
            break;
        case 'PaymentChannelClaim':
            (0, paymentChannelClaim_1.validatePaymentChannelClaim)(tx);
            break;
        case 'PaymentChannelCreate':
            (0, paymentChannelCreate_1.validatePaymentChannelCreate)(tx);
            break;
        case 'PaymentChannelFund':
            (0, paymentChannelFund_1.validatePaymentChannelFund)(tx);
            break;
        case 'PermissionedDomainSet':
            (0, permissionedDomainSet_1.validatePermissionedDomainSet)(tx);
            break;
        case 'PermissionedDomainDelete':
            (0, permissionedDomainDelete_1.validatePermissionedDomainDelete)(tx);
            break;
        case 'SetRegularKey':
            (0, setRegularKey_1.validateSetRegularKey)(tx);
            break;
        case 'SignerListSet':
            (0, signerListSet_1.validateSignerListSet)(tx);
            break;
        case 'TicketCreate':
            (0, ticketCreate_1.validateTicketCreate)(tx);
            break;
        case 'TrustSet':
            (0, trustSet_1.validateTrustSet)(tx);
            break;
        case 'XChainAccountCreateCommit':
            (0, XChainAccountCreateCommit_1.validateXChainAccountCreateCommit)(tx);
            break;
        case 'XChainAddAccountCreateAttestation':
            (0, XChainAddAccountCreateAttestation_1.validateXChainAddAccountCreateAttestation)(tx);
            break;
        case 'XChainAddClaimAttestation':
            (0, XChainAddClaimAttestation_1.validateXChainAddClaimAttestation)(tx);
            break;
        case 'XChainClaim':
            (0, XChainClaim_1.validateXChainClaim)(tx);
            break;
        case 'XChainCommit':
            (0, XChainCommit_1.validateXChainCommit)(tx);
            break;
        case 'XChainCreateBridge':
            (0, XChainCreateBridge_1.validateXChainCreateBridge)(tx);
            break;
        case 'XChainCreateClaimID':
            (0, XChainCreateClaimID_1.validateXChainCreateClaimID)(tx);
            break;
        case 'XChainModifyBridge':
            (0, XChainModifyBridge_1.validateXChainModifyBridge)(tx);
            break;
        default:
            throw new errors_1.ValidationError(`Invalid field TransactionType: ${tx.TransactionType}`);
    }
}
exports.validate = validate;
//# sourceMappingURL=transaction.js.map