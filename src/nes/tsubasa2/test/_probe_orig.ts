/**
 * Ground truth 探针：用 core 模拟器跑真实 ROM 开场，dump CHR bank 映射 + pattern + NT
 * 目的：验证 H5 渲染的 CHR bank 配置是否与原版一致
 */
import NES from '../src/core/nes';
import * as fs from 'fs';
import * as path from 'path';

const romPath = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = new Uint8Array(fs.readFileSync(romPath));

const nes: any = new NES();
nes.loadROM(rom);

// 跑 30 帧（开场）
for (let i = 0; i < 30; i++) {
  nes.frame();
}

const mapper = nes.mmap;
const ppu = nes.ppu;

const out: string[] = [];
out.push('=== MMC3 chrBanks (8 × 1KB slot) ===');
out.push(Array.from(mapper.getChrBankMap() ?? []).join(', '));

out.push('=== Mapper4 internal (command/prgSelect/chrSelect) ===');
out.push('command=' + mapper.command + ' prgSel=' + mapper.prgAddressSelect + ' chrSel=' + mapper.chrAddressSelect);

out.push('=== ram $0490-$0497 (CHR bank 请求表) ===');
out.push(Array.from(nes.cpu.mem.slice(0x0490, 0x0498)).join(', '));

out.push('=== pattern table vramMem[0..0x7FF] (BG 前 2KB) 非零统计 ===');
let nz = 0;
for (let i = 0; i < 0x800; i++) if (ppu.vramMem[i] !== 0) nz++;
out.push('nonzero=' + nz);
out.push('vramMem[0..63]: ' + Array.from(ppu.vramMem.slice(0, 64)).join(','));

out.push('=== NT0 tile[0..63] ===');
out.push(Array.from(ppu.nameTable[0].tile.slice(0, 64)).join(','));

out.push('=== PPU 控制寄存器 ===');
out.push('f_bgPatternTable=' + ppu.f_bgPatternTable + ' f_spPatternTable=' + ppu.f_spPatternTable + ' f_nTblAddress=' + ppu.f_nTblAddress);
out.push('f_bgVisibility=' + ppu.f_bgVisibility + ' f_spVisibility=' + ppu.f_spVisibility);

// 帧缓冲非零像素统计
let bufNz = 0;
for (let i = 0; i < ppu.buffer.length; i++) if (ppu.buffer[i] !== 0) bufNz++;
out.push('buffer nonzero=' + bufNz);

fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/scripts/_probe_orig_out.txt', out.join('\n'));
console.log('DONE');
