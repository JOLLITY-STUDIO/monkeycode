"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scriptIdLookup = scriptIdLookup;
exports.scriptIdToBank = scriptIdToBank;
const SCRIPT_ID_THRESHOLDS = [0x00, 0x10, 0x20, 0x60, 0xff];
const SCRIPT_ID_BANKS = [0x03, 0x04, 0x05, 0x06];
/** 脚本 id → (bank, 偏移) 映射 */
function scriptIdLookup(scriptId) {
    const id = scriptId & 0xff;
    for (let i = 0; i < SCRIPT_ID_BANKS.length; i++) {
        const lo = SCRIPT_ID_THRESHOLDS[i];
        const hi = SCRIPT_ID_THRESHOLDS[i + 1];
        if (id >= lo && id < hi) {
            return { bank: SCRIPT_ID_BANKS[i], offset: id - lo };
        }
    }
    return undefined;
}
/** 脚本 id → 判定 bank (<0x10→3 / <0x20→4 / <0x60→5 / else→6) */
function scriptIdToBank(scriptId) {
    const id = scriptId & 0xff;
    if (id < 0x10)
        return 3;
    if (id < 0x20)
        return 4;
    if (id < 0x60)
        return 5;
    return 6;
}
