"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultFaucetPath = exports.getFaucetHost = exports.FaucetNetworkPaths = exports.FaucetNetwork = void 0;
const errors_1 = require("../errors");
var FaucetNetwork;
(function (FaucetNetwork) {
    FaucetNetwork["Testnet"] = "faucet.altnet.rippletest.net";
    FaucetNetwork["Devnet"] = "faucet.devnet.rippletest.net";
})(FaucetNetwork || (exports.FaucetNetwork = FaucetNetwork = {}));
exports.FaucetNetworkPaths = {
    [FaucetNetwork.Testnet]: '/accounts',
    [FaucetNetwork.Devnet]: '/accounts',
};
function getFaucetHost(client) {
    const connectionUrl = client.url;
    if (connectionUrl.includes('altnet') || connectionUrl.includes('testnet')) {
        return FaucetNetwork.Testnet;
    }
    if (connectionUrl.includes('sidechain-net2')) {
        throw new errors_1.XRPLFaucetError('Cannot fund an account on an issuing chain. Accounts must be created via the bridge.');
    }
    if (connectionUrl.includes('devnet')) {
        return FaucetNetwork.Devnet;
    }
    throw new errors_1.XRPLFaucetError('Faucet URL is not defined or inferrable.');
}
exports.getFaucetHost = getFaucetHost;
function getDefaultFaucetPath(hostname) {
    if (hostname === undefined) {
        return '/accounts';
    }
    return exports.FaucetNetworkPaths[hostname] || '/accounts';
}
exports.getDefaultFaucetPath = getDefaultFaucetPath;
//# sourceMappingURL=defaultFaucets.js.map