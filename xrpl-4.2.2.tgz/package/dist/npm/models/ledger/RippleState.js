"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RippleStateFlags = void 0;
var RippleStateFlags;
(function (RippleStateFlags) {
    RippleStateFlags[RippleStateFlags["lsfLowReserve"] = 65536] = "lsfLowReserve";
    RippleStateFlags[RippleStateFlags["lsfHighReserve"] = 131072] = "lsfHighReserve";
    RippleStateFlags[RippleStateFlags["lsfLowAuth"] = 262144] = "lsfLowAuth";
    RippleStateFlags[RippleStateFlags["lsfHighAuth"] = 524288] = "lsfHighAuth";
    RippleStateFlags[RippleStateFlags["lsfLowNoRipple"] = 1048576] = "lsfLowNoRipple";
    RippleStateFlags[RippleStateFlags["lsfHighNoRipple"] = 2097152] = "lsfHighNoRipple";
    RippleStateFlags[RippleStateFlags["lsfLowFreeze"] = 4194304] = "lsfLowFreeze";
    RippleStateFlags[RippleStateFlags["lsfHighFreeze"] = 8388608] = "lsfHighFreeze";
    RippleStateFlags[RippleStateFlags["lsfAMMNode"] = 16777216] = "lsfAMMNode";
    RippleStateFlags[RippleStateFlags["lsfLowDeepFreeze"] = 33554432] = "lsfLowDeepFreeze";
    RippleStateFlags[RippleStateFlags["lsfHighDeepFreeze"] = 67108864] = "lsfHighDeepFreeze";
})(RippleStateFlags || (exports.RippleStateFlags = RippleStateFlags = {}));
//# sourceMappingURL=RippleState.js.map