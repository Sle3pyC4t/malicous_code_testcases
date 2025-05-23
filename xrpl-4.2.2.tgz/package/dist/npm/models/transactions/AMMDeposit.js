"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAMMDeposit = exports.AMMDepositFlags = void 0;
const errors_1 = require("../../errors");
const common_1 = require("./common");
var AMMDepositFlags;
(function (AMMDepositFlags) {
    AMMDepositFlags[AMMDepositFlags["tfLPToken"] = 65536] = "tfLPToken";
    AMMDepositFlags[AMMDepositFlags["tfSingleAsset"] = 524288] = "tfSingleAsset";
    AMMDepositFlags[AMMDepositFlags["tfTwoAsset"] = 1048576] = "tfTwoAsset";
    AMMDepositFlags[AMMDepositFlags["tfOneAssetLPToken"] = 2097152] = "tfOneAssetLPToken";
    AMMDepositFlags[AMMDepositFlags["tfLimitLPToken"] = 4194304] = "tfLimitLPToken";
    AMMDepositFlags[AMMDepositFlags["tfTwoAssetIfEmpty"] = 8388608] = "tfTwoAssetIfEmpty";
})(AMMDepositFlags || (exports.AMMDepositFlags = AMMDepositFlags = {}));
function validateAMMDeposit(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Asset == null) {
        throw new errors_1.ValidationError('AMMDeposit: missing field Asset');
    }
    if (!(0, common_1.isCurrency)(tx.Asset)) {
        throw new errors_1.ValidationError('AMMDeposit: Asset must be a Currency');
    }
    if (tx.Asset2 == null) {
        throw new errors_1.ValidationError('AMMDeposit: missing field Asset2');
    }
    if (!(0, common_1.isCurrency)(tx.Asset2)) {
        throw new errors_1.ValidationError('AMMDeposit: Asset2 must be a Currency');
    }
    if (tx.Amount2 != null && tx.Amount == null) {
        throw new errors_1.ValidationError('AMMDeposit: must set Amount with Amount2');
    }
    else if (tx.EPrice != null && tx.Amount == null) {
        throw new errors_1.ValidationError('AMMDeposit: must set Amount with EPrice');
    }
    else if (tx.LPTokenOut == null && tx.Amount == null) {
        throw new errors_1.ValidationError('AMMDeposit: must set at least LPTokenOut or Amount');
    }
    if (tx.LPTokenOut != null && !(0, common_1.isIssuedCurrency)(tx.LPTokenOut)) {
        throw new errors_1.ValidationError('AMMDeposit: LPTokenOut must be an IssuedCurrencyAmount');
    }
    if (tx.Amount != null && !(0, common_1.isAmount)(tx.Amount)) {
        throw new errors_1.ValidationError('AMMDeposit: Amount must be an Amount');
    }
    if (tx.Amount2 != null && !(0, common_1.isAmount)(tx.Amount2)) {
        throw new errors_1.ValidationError('AMMDeposit: Amount2 must be an Amount');
    }
    if (tx.EPrice != null && !(0, common_1.isAmount)(tx.EPrice)) {
        throw new errors_1.ValidationError('AMMDeposit: EPrice must be an Amount');
    }
}
exports.validateAMMDeposit = validateAMMDeposit;
//# sourceMappingURL=AMMDeposit.js.map