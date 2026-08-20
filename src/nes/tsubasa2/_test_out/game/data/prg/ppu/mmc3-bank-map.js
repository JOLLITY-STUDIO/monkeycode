"use strict";
/**
 * MMC3 Bank 映射解析工具 (翻译辅助)
 *
 * 沿用 tsnes `src/core/mappers/mapper4.ts` 的 prgBankMap 语义，不依赖 CPU/nes 实例：
 *
 *   PRG 窗口 (8KB 每窗):
 *     $8000 窗口 → R6 寄存器 (可切, 默认 bank 0)
 *     $A000 窗口 → R7 寄存器 (可切, 默认 bank 1)
 *     $C000 窗口 → 固定 (romCount-2) 号 bank
 *     $E000 窗口 → 固定 (romCount-1) 号 bank (含 Reset/NMI 向量)
 *   32-bank ROM: $C000→30, $E000→31
 *
 *   CHR 窗口 (8 个 1KB slot, chrBanks[0..7]):
 *     PPU $0000-$07FF → chrBanks[0..1] (bank pair, A12 反相时映射到 $1000-$17FF)
 *     PPU $0800-$0FFF → chrBanks[2..3]
 *     PPU $1000-$17FF → chrBanks[4..5]
 *     PPU $1800-$1FFF → chrBanks[6..7]
 *
 * 用法 (翻译 bank 代码时):
 *   const loc = resolvePrgAddr(0x8AF7, { r6: 0 });      // → { bank: 0, offset: 0x0AF7 }
 *   const ch  = resolveChrAddr(0x0400, chrBanks);       // → { chrBank: N, offset: 0x0000 }
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_BANK_SIZE = exports.CHR_SLOT_SIZE = exports.DEFAULT_PRG_STATE = exports.PRG_FIXED_E000 = exports.PRG_FIXED_C000 = exports.PRG_WINDOW_SIZE = exports.PRG_WINDOW_E000 = exports.PRG_WINDOW_C000 = exports.PRG_WINDOW_A000 = exports.PRG_WINDOW_8000 = void 0;
exports.resolvePrgAddr = resolvePrgAddr;
exports.prgAddrToBank = prgAddrToBank;
exports.ppuAddrToSlot = ppuAddrToSlot;
exports.resolveChrAddr = resolveChrAddr;
exports.defaultChrBanks = defaultChrBanks;
// ── PRG 窗口常量 ──
exports.PRG_WINDOW_8000 = 0x8000;
exports.PRG_WINDOW_A000 = 0xa000;
exports.PRG_WINDOW_C000 = 0xc000;
exports.PRG_WINDOW_E000 = 0xe000;
exports.PRG_WINDOW_SIZE = 0x2000; // 8KB
/** 固定窗口 bank (32-bank PRG: 最后两 bank 固定) */
exports.PRG_FIXED_C000 = 30;
exports.PRG_FIXED_E000 = 31;
/** 默认 PRG 状态 (对应 mapper4.loadROM 初始值: $8000=bank0, $A000=bank1) */
exports.DEFAULT_PRG_STATE = { r6: 0, r7: 1 };
/**
 * 解析 CPU 地址 → (PRG bank, bank 内偏移)。
 * 对应 mapper4.prgBankMap: {0x8000:R6, 0xA000:R7, 0xC000:30, 0xE000:31}。
 */
function resolvePrgAddr(cpuAddr, state = {}) {
    const addr = cpuAddr & 0xffff;
    const s = { ...exports.DEFAULT_PRG_STATE, ...state };
    if (addr >= exports.PRG_WINDOW_E000) {
        return { bank: exports.PRG_FIXED_E000, offset: addr - exports.PRG_WINDOW_E000, window: exports.PRG_WINDOW_E000 };
    }
    if (addr >= exports.PRG_WINDOW_C000) {
        return { bank: exports.PRG_FIXED_C000, offset: addr - exports.PRG_WINDOW_C000, window: exports.PRG_WINDOW_C000 };
    }
    if (addr >= exports.PRG_WINDOW_A000) {
        return { bank: s.r7, offset: addr - exports.PRG_WINDOW_A000, window: exports.PRG_WINDOW_A000 };
    }
    if (addr >= exports.PRG_WINDOW_8000) {
        return { bank: s.r6, offset: addr - exports.PRG_WINDOW_8000, window: exports.PRG_WINDOW_8000 };
    }
    // RAM 区 (低于 $8000 不是 PRG)
    return { bank: -1, offset: addr, window: 0 };
}
/**
 * 解析 CPU 地址 → 该地址所在 bank 的运行时地址 (供反汇编标注: 运行时 $A4C0 反汇编标 $84C0 等场景)。
 * 与 resolvePrgAddr 相同, 仅语义别名。
 */
function prgAddrToBank(cpuAddr, state = {}) {
    return resolvePrgAddr(cpuAddr, state);
}
// ── CHR 窗口常量 ──
exports.CHR_SLOT_SIZE = 0x0400; // 1KB
exports.CHR_BANK_SIZE = 0x2000; // 8KB (1 个 CHR bank = 8 个 1KB slot)
/** PPU 地址 → slot 索引 (PPU_ADDR_TO_SLOT) */
function ppuAddrToSlot(ppuAddr) {
    const addr = ppuAddr & 0x1fff;
    return (addr / exports.CHR_SLOT_SIZE) | 0;
}
/**
 * 解析 PPU 地址 → (CHR 1KB slot, chrBanks 值, slot 内偏移)。
 * chrBanks 需传入 MMC3 当前 CHR 选择状态 (8 个 1KB bank 号)。
 */
function resolveChrAddr(ppuAddr, chrBanks) {
    const addr = ppuAddr & 0x1fff;
    const slot = ppuAddrToSlot(addr);
    const chrBank = slot < chrBanks.length ? chrBanks[slot] : 0;
    return { slot, chrBank, offset: addr & (exports.CHR_SLOT_SIZE - 1) };
}
/** 生成默认 chrBanks (0..7, 对应 mapper4 初始未切换状态) */
function defaultChrBanks() {
    return [0, 1, 2, 3, 4, 5, 6, 7];
}
