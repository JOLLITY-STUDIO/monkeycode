/**
 * 天使之翼2 — game 层聚合出口 + Tsubasa2 主类（组合根）
 *
 * 组合约定: 主类就是 index 本身。page 只启动模拟器 (BrowserMini),
 * 本文件负责把 DataStore + 各 Service 组合成 Tsubasa2 主板, 每帧:
 *
 *   1. InterruptService.nmi(frame) — NMI 语义每帧更新 (OAM DMA / VRAM 缓冲
 *      回放 / 滚动 / 输入读取 / 主逻辑推进)
 *   2. writeStoreToPpu() — 把 DataStore 的 NT/调色板/OAM/滚动"直接写内存"
 *      进 PPU 渲染内存 (ppu.writeMem / oamStore / scrollStore)。
 *      去 CPU 化后不存在寄存器级同步, 不需要 PpuSync; 这就是直写。
 *   3. nes.frame() — PPU 扫描线渲染 (背景/精灵/调色板/滚动全在 PPU 内)
 *
 * 与模拟器模式 1:1: PPU 渲染读取源不变 (vramStore/nameTable/oamStore),
 * 只是灌入路径从"CPU 写 $2000-$2007 寄存器"变成"直写字节"。
 */
import type NES from '../core/nes';
import { GameSystemService } from './prg/code/system/GameSystemService';
import { BootRouter } from './prg/code/system/BootRouter';
import { InterruptService } from './prg/code/system/InterruptService';
import { HardwareInitService } from './prg/code/system/HardwareInitService';
import { PrgBankService } from './prg/code/system/PrgBankService';
import { SkillService } from './prg/code/skill/SkillService';
import { AudioService } from './prg/code/audio/AudioService';
import type { PaletteTable, NameTableEntry } from '../core/nes-ram';
import { HEADER, CONFIG, Mirroring } from './header';
import { NES_CHR_ROM, CHR_BANKS, CHR_BANK_SIZE, CHR_BANK_COUNT } from './chr/index';
import { PRG } from './rom';
import { DataStore } from './prg/data/store/DataStore';
export { HEADER, CONFIG, Mirroring };
export { NES_CHR_ROM, CHR_BANKS, CHR_BANK_SIZE, CHR_BANK_COUNT };
export { PRG };
export { DataStore };
/** 统计 NT 网格非零 tile 数 (调试用) */
export declare function countNtNonZero(nt: NameTableEntry[][]): number;
/** RGB → 最近 NTSC 索引 (0-63), 基于 ppu.palTable.curTable (0xRRGGBB) */
export declare function rgbToNearestIndex(curTable: Uint32Array, r: number, g: number, b: number): number;
/**
 * 直写调色板 — palWriteAll 语义 (原版 $9A7E):
 * 优先用 ram_062A (NES 索引, paletteLoadBG/paletteLoadSPR 写入) 经 fadePalette 查表后写 PPU $3F00。
 * 若 ram_062A 全 0 (调色板未装载), 用 paletteTable (RGB) fallback。
 *
 * 原版 $9A7E 渐显逻辑 (tsnes disasm dump 确认):
 *   X = (pal & 0x30) + fade; base = table[X]; result = (base | (pal & 0x0F)) & 0x3F
 *   fade=15 满渐显 → result = pal (原值); fade=0 全暗 → result = 0x0F (黑)
 */
export declare function writePalettes(store: any, ppu: any, paletteTable: PaletteTable): void;
export declare function writeOam(store: DataStore, ppu: any): void;
/**
 * 直写滚动: store.scrollX/Y (pixel) → PPU 滚动寄存器。
 * tsnes PPU 直接用 regHT/regFH/regH/regV/regVT/regFV 字段。
 * 注意: 这些是 tsnes PPU 的可写字段 (非只读 getter), 写入后 startVBlank 会复制到 cnt* 触发渲染。
 */
export declare function writeScroll(store: DataStore, ppu: any): void;
/**
 * 直写 BOOT 精灵 CHR pattern → PPU pattern table 1 (ptTile[0x100+tile])。
 * MMC3 映射 (去 CPU 化等价): SPR table=1, tile 0x40-0x7F → CHR bank 14,
 * tile 0xC0-0xFF → CHR bank 10。
 * 注意: BOOT_SPR_CHR_SEGMENTS 已删除 (模拟器 dump 数据), CHR pattern 由正常 CHR bank 切换管理。
 */
export declare function writeBootChrPatterns(_ppu: any): void;
/** 全量直写: DataStore → PPU 渲染内存 (CTRL/MASK/NT/调色板/OAM/滚动/精灵pattern) */
export declare function writeStoreToPpu(store: DataStore, ppu: any): void;
/** 直写 APU: DataStore apu_XXXX → tsnes PAPU writeReg */
export declare function writeApuToPapu(store: DataStore, papu: any): void;
export declare class Tsubasa2 {
    readonly store: DataStore;
    readonly system: GameSystemService;
    readonly router: BootRouter;
    readonly skill: SkillService;
    readonly interrupts: InterruptService;
    readonly hardware: HardwareInitService;
    readonly audio: AudioService;
    /** MMC3 PRG bank 切换服务 ($C4B9 H5 等价) */
    readonly prgBank: PrgBankService;
    /** 帧计数 (NMI 帧号) */
    protected _frame: number;
    constructor();
    /** 启动: RESET → 硬件初始化 → resetScene(0) → 进入场景 (走正常场景装载流程) */
    boot(): void;
    /** 每帧: NMI 推进游戏逻辑 → 直写 PPU 渲染内存 → PPU 扫描线渲染 */
    protected _mapperInjected: boolean;
    frame(nes: NES): void;
}
export default Tsubasa2;
