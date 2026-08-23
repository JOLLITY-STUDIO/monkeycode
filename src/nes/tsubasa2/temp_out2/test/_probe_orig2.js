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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ground truth 探针2：逐帧段 dump 原版开场 CHR bank 时序
 */
const nes_1 = __importDefault(require("../src/core/nes"));
const fs = __importStar(require("fs"));
const romPath = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = new Uint8Array(fs.readFileSync(romPath));
const nes = new nes_1.default();
nes.loadROM(rom);
const out = [];
const checkpoints = [0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120];
let last = 0;
for (const f of checkpoints) {
    for (let i = last; i < f; i++)
        nes.frame();
    last = f;
    const mapper = nes.mmap;
    const ppu = nes.ppu;
    let bufNz = 0;
    for (let i = 0; i < ppu.buffer.length; i++)
        if (ppu.buffer[i] !== 0)
            bufNz++;
    out.push('frame=' + f +
        ' chrBanks=[' + Array.from(mapper.getChrBankMap()).join(',') + ']' +
        ' ram0490=[' + Array.from(nes.cpu.mem.slice(0x0490, 0x0498)).join(',') + ']' +
        ' bufNz=' + bufNz +
        ' bgVis=' + ppu.f_bgVisibility + ' spVis=' + ppu.f_spVisibility +
        ' bgPat=' + ppu.f_bgPatternTable + ' spPat=' + ppu.f_spPatternTable +
        ' nTbl=' + ppu.f_nTblAddress);
}
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/scripts/_probe_orig2_out.txt', out.join('\n'));
console.log('DONE');
