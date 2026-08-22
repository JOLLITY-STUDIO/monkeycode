"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = exports.Mirroring = exports.HEADER = void 0;
/**
 * 真实 iNES header — Captain Tsubasa II: Super Striker (Japan)
 *
 *   prg16k=16  chr8k=16  mapper=4 (MMC3)  mirroring=0 (Horizontal)
 */
exports.HEADER = new Uint8Array([
    0x4e, 0x45, 0x53, 0x1a, // "NES\x1a"
    0x10, // PRG ROM: 16 × 16KB = 256KB
    0x10, // CHR ROM: 16 × 8KB = 128KB
    0x40, // mapper 4 (MMC3) | mirroring Horizontal(0)
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
]);
// ═══════════════════════════════════════════
// NameTable 拼接方式 (渲染参数, 保留)
// ═══════════════════════════════════════════
var Mirroring;
(function (Mirroring) {
    Mirroring[Mirroring["Horizontal"] = 0] = "Horizontal";
    Mirroring[Mirroring["Vertical"] = 1] = "Vertical";
})(Mirroring || (exports.Mirroring = Mirroring = {}));
exports.CONFIG = {
    mirroring: Mirroring.Horizontal,
};
