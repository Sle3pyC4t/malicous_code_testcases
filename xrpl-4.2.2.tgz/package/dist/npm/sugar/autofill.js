"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccountDeleteBlockers = exports.setLatestValidatedLedgerSequence = exports.calculateFeePerTransactionType = exports.setNextValidSequenceNumber = exports.setValidAddresses = exports.txNeedsNetworkID = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const ripple_address_codec_1 = require("ripple-address-codec");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const getFeeXrp_1 = __importDefault(require("./getFeeXrp"));
const LEDGER_OFFSET = 20;
const RESTRICTED_NETWORKS = 1024;
const REQUIRED_NETWORKID_VERSION = '1.11.0';
function isNotLaterRippledVersion(source, target) {
    if (source === target) {
        return true;
    }
    const sourceDecomp = source.split('.');
    const targetDecomp = target.split('.');
    const sourceMajor = parseInt(sourceDecomp[0], 10);
    const sourceMinor = parseInt(sourceDecomp[1], 10);
    const targetMajor = parseInt(targetDecomp[0], 10);
    const targetMinor = parseInt(targetDecomp[1], 10);
    if (sourceMajor !== targetMajor) {
        return sourceMajor < targetMajor;
    }
    if (sourceMinor !== targetMinor) {
        return sourceMinor < targetMinor;
    }
    const sourcePatch = sourceDecomp[2].split('-');
    const targetPatch = targetDecomp[2].split('-');
    const sourcePatchVersion = parseInt(sourcePatch[0], 10);
    const targetPatchVersion = parseInt(targetPatch[0], 10);
    if (sourcePatchVersion !== targetPatchVersion) {
        return sourcePatchVersion < targetPatchVersion;
    }
    if (sourcePatch.length !== targetPatch.length) {
        return sourcePatch.length > targetPatch.length;
    }
    if (sourcePatch.length === 2) {
        if (!sourcePatch[1][0].startsWith(targetPatch[1][0])) {
            return sourcePatch[1] < targetPatch[1];
        }
        if (sourcePatch[1].startsWith('b')) {
            return (parseInt(sourcePatch[1].slice(1), 10) <
                parseInt(targetPatch[1].slice(1), 10));
        }
        return (parseInt(sourcePatch[1].slice(2), 10) <
            parseInt(targetPatch[1].slice(2), 10));
    }
    return false;
}
function txNeedsNetworkID(client) {
    if (client.networkID !== undefined &&
        client.networkID > RESTRICTED_NETWORKS) {
        if (client.buildVersion &&
            isNotLaterRippledVersion(REQUIRED_NETWORKID_VERSION, client.buildVersion)) {
            return true;
        }
    }
    return false;
}
exports.txNeedsNetworkID = txNeedsNetworkID;
function setValidAddresses(tx) {
    validateAccountAddress(tx, 'Account', 'SourceTag');
    if (tx['Destination'] != null) {
        validateAccountAddress(tx, 'Destination', 'DestinationTag');
    }
    convertToClassicAddress(tx, 'Authorize');
    convertToClassicAddress(tx, 'Unauthorize');
    convertToClassicAddress(tx, 'Owner');
    convertToClassicAddress(tx, 'RegularKey');
}
exports.setValidAddresses = setValidAddresses;
function validateAccountAddress(tx, accountField, tagField) {
    const { classicAccount, tag } = getClassicAccountAndTag(tx[accountField]);
    tx[accountField] = classicAccount;
    if (tag != null && tag !== false) {
        if (tx[tagField] && tx[tagField] !== tag) {
            throw new errors_1.ValidationError(`The ${tagField}, if present, must match the tag of the ${accountField} X-address`);
        }
        tx[tagField] = tag;
    }
}
function getClassicAccountAndTag(Account, expectedTag) {
    if ((0, ripple_address_codec_1.isValidXAddress)(Account)) {
        const classic = (0, ripple_address_codec_1.xAddressToClassicAddress)(Account);
        if (expectedTag != null && classic.tag !== expectedTag) {
            throw new errors_1.ValidationError('address includes a tag that does not match the tag specified in the transaction');
        }
        return {
            classicAccount: classic.classicAddress,
            tag: classic.tag,
        };
    }
    return {
        classicAccount: Account,
        tag: expectedTag,
    };
}
function convertToClassicAddress(tx, fieldName) {
    const account = tx[fieldName];
    if (typeof account === 'string') {
        const { classicAccount } = getClassicAccountAndTag(account);
        tx[fieldName] = classicAccount;
    }
}
function setNextValidSequenceNumber(client, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = {
            command: 'account_info',
            account: tx.Account,
            ledger_index: 'current',
        };
        const data = yield client.request(request);
        tx.Sequence = data.result.account_data.Sequence;
    });
}
exports.setNextValidSequenceNumber = setNextValidSequenceNumber;
function fetchAccountDeleteFee(client) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield client.request({ command: 'server_state' });
        const fee = (_a = response.result.state.validated_ledger) === null || _a === void 0 ? void 0 : _a.reserve_inc;
        if (fee == null) {
            return Promise.reject(new Error('Could not fetch Owner Reserve.'));
        }
        return new bignumber_js_1.default(fee);
    });
}
function calculateFeePerTransactionType(client, tx, signersCount = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const netFeeXRP = yield (0, getFeeXrp_1.default)(client);
        const netFeeDrops = (0, utils_1.xrpToDrops)(netFeeXRP);
        let baseFee = new bignumber_js_1.default(netFeeDrops);
        if (tx.TransactionType === 'EscrowFinish' && tx.Fulfillment != null) {
            const fulfillmentBytesSize = Math.ceil(tx.Fulfillment.length / 2);
            const product = new bignumber_js_1.default(scaleValue(netFeeDrops, 33 + fulfillmentBytesSize / 16));
            baseFee = product.dp(0, bignumber_js_1.default.ROUND_CEIL);
        }
        if (tx.TransactionType === 'AccountDelete' ||
            tx.TransactionType === 'AMMCreate') {
            baseFee = yield fetchAccountDeleteFee(client);
        }
        if (signersCount > 0) {
            baseFee = bignumber_js_1.default.sum(baseFee, scaleValue(netFeeDrops, 1 + signersCount));
        }
        const maxFeeDrops = (0, utils_1.xrpToDrops)(client.maxFeeXRP);
        const totalFee = tx.TransactionType === 'AccountDelete'
            ? baseFee
            : bignumber_js_1.default.min(baseFee, maxFeeDrops);
        tx.Fee = totalFee.dp(0, bignumber_js_1.default.ROUND_CEIL).toString(10);
    });
}
exports.calculateFeePerTransactionType = calculateFeePerTransactionType;
function scaleValue(value, multiplier) {
    return new bignumber_js_1.default(value).times(multiplier).toString();
}
function setLatestValidatedLedgerSequence(client, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        const ledgerSequence = yield client.getLedgerIndex();
        tx.LastLedgerSequence = ledgerSequence + LEDGER_OFFSET;
    });
}
exports.setLatestValidatedLedgerSequence = setLatestValidatedLedgerSequence;
function checkAccountDeleteBlockers(client, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = {
            command: 'account_objects',
            account: tx.Account,
            ledger_index: 'validated',
            deletion_blockers_only: true,
        };
        const response = yield client.request(request);
        return new Promise((resolve, reject) => {
            if (response.result.account_objects.length > 0) {
                reject(new errors_1.XrplError(`Account ${tx.Account} cannot be deleted; there are Escrows, PayChannels, RippleStates, or Checks associated with the account.`, response.result.account_objects));
            }
            resolve();
        });
    });
}
exports.checkAccountDeleteBlockers = checkAccountDeleteBlockers;
//# sourceMappingURL=autofill.js.map