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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestFunding = exports.getStartingBalance = exports.generateWalletToFund = void 0;
const ripple_address_codec_1 = require("ripple-address-codec");
const errors_1 = require("../errors");
const defaultFaucets_1 = require("./defaultFaucets");
const _1 = require(".");
const INTERVAL_SECONDS = 1;
const MAX_ATTEMPTS = 20;
function generateWalletToFund(wallet) {
    if (wallet && (0, ripple_address_codec_1.isValidClassicAddress)(wallet.classicAddress)) {
        return wallet;
    }
    return _1.Wallet.generate();
}
exports.generateWalletToFund = generateWalletToFund;
function getStartingBalance(client, classicAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        let startingBalance = 0;
        try {
            startingBalance = Number(yield client.getXrpBalance(classicAddress));
        }
        catch (_a) {
        }
        return startingBalance;
    });
}
exports.getStartingBalance = getStartingBalance;
function requestFunding(options, client, startingBalance, walletToFund, postBody) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const hostname = (_a = options.faucetHost) !== null && _a !== void 0 ? _a : (0, defaultFaucets_1.getFaucetHost)(client);
        if (!hostname) {
            throw new errors_1.XRPLFaucetError('No faucet hostname could be derived');
        }
        const pathname = (_b = options.faucetPath) !== null && _b !== void 0 ? _b : (0, defaultFaucets_1.getDefaultFaucetPath)(hostname);
        const response = yield fetch(`https://${hostname}${pathname}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody),
        });
        const body = yield response.json();
        if (response.ok &&
            ((_c = response.headers.get('Content-Type')) === null || _c === void 0 ? void 0 : _c.startsWith('application/json'))) {
            const classicAddress = body.account.classicAddress;
            return processSuccessfulResponse(client, classicAddress, walletToFund, startingBalance);
        }
        return processError(response, body);
    });
}
exports.requestFunding = requestFunding;
function processSuccessfulResponse(client, classicAddress, walletToFund, startingBalance) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!classicAddress) {
            return Promise.reject(new errors_1.XRPLFaucetError(`The faucet account is undefined`));
        }
        try {
            const updatedBalance = yield getUpdatedBalance(client, classicAddress, startingBalance);
            if (updatedBalance > startingBalance) {
                return {
                    wallet: walletToFund,
                    balance: updatedBalance,
                };
            }
            throw new errors_1.XRPLFaucetError(`Unable to fund address with faucet after waiting ${INTERVAL_SECONDS * MAX_ATTEMPTS} seconds`);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new errors_1.XRPLFaucetError(err.message);
            }
            throw err;
        }
    });
}
function processError(response, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.reject(new errors_1.XRPLFaucetError(`Request failed: ${JSON.stringify({
            body: body || {},
            contentType: response.headers.get('Content-Type'),
            statusCode: response.status,
        })}`));
    });
}
function getUpdatedBalance(client, address, originalBalance) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let attempts = MAX_ATTEMPTS;
            const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                if (attempts < 0) {
                    clearInterval(interval);
                    resolve(originalBalance);
                }
                else {
                    attempts -= 1;
                }
                try {
                    let newBalance;
                    try {
                        newBalance = Number(yield client.getXrpBalance(address));
                    }
                    catch (_a) {
                    }
                    if (newBalance > originalBalance) {
                        clearInterval(interval);
                        resolve(newBalance);
                    }
                }
                catch (err) {
                    clearInterval(interval);
                    if (err instanceof Error) {
                        reject(new errors_1.XRPLFaucetError(`Unable to check if the address ${address} balance has increased. Error: ${err.message}`));
                    }
                    reject(err);
                }
            }), INTERVAL_SECONDS * 1000);
        });
    });
}
//# sourceMappingURL=fundWallet.js.map