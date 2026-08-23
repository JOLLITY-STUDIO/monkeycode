"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ground truth 探针：用 core 模拟器跑真实 ROM 开场，dump CHR bank 映射 + pattern + NT
 * 目的：验证 H5 渲染的 CHR bank 配置是否与原版一致
 */
const nes_1 = __importDefault(require("../src/core/nes"));
const fs = __importStar(require("fs"));
const romPath = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = new Uint8Array(fs.readFileSync(romPath));
const nes = new nes_1.default();
nes.loadROM(rom);
// 跑 30 帧（开场）
for (let i = 0; i < 30; i++) {
    nes.frame();
}
const mapper = nes.mmap;
const ppu = nes.ppu;
const out = [];
out.push('=== MMC3 chrBanks (8 × 1KB slot) ===');
out.push(Array.from((_a = mapper.getChrBankMap()) !== null && _a !== void 0 ? _a : []).join(', '));
out.push('=== Mapper4 internal (command/prgSelect/chrSelect) ===');
out.push('command=' + mapper.command + ' prgSel=' + mapper.prgAddressSelect + ' chrSel=' + mapper.chrAddressSelect);
out.push('=== ram $0490-$0497 (CHR bank 请求表) ===');
out.push(Array.from(nes.cpu.mem.slice(0x0490, 0x0498)).join(', '));
out.push('=== pattern table vramMem[0..0x7FF] (BG 前 2KB) 非零统计 ===');
let nz = 0;
for (let i = 0; i < 0x800; i++)
    if (ppu.vramMem[i] !== 0)
        nz++;
out.push('nonzero=' + nz);
out.push('vramMem[0..63]: ' + Array.from(ppu.vramMem.slice(0, 64)).join(','));
out.push('=== NT0 tile[0..63] ===');
out.push(Array.from(ppu.nameTable[0].tile.slice(0, 64)).join(','));
out.push('=== PPU 控制寄存器 ===');
out.push('f_bgPatternTable=' + ppu.f_bgPatternTable + ' f_spPatternTable=' + ppu.f_spPatternTable + ' f_nTblAddress=' + ppu.f_nTblAddress);
out.push('f_bgVisibility=' + ppu.f_bgVisibility + ' f_spVisibility=' + ppu.f_spVisibility);
// 帧缓冲非零像素统计
let bufNz = 0;
for (let i = 0; i < ppu.buffer.length; i++)
    if (ppu.buffer[i] !== 0)
        bufNz++;
out.push('buffer nonzero=' + bufNz);
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/scripts/_probe_orig_out.txt', out.join('\n'));
console.log('DONE');
