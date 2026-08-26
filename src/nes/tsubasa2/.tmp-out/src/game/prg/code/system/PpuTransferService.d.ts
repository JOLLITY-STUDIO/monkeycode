/**
 * PpuTransferService — bank00 $8464 + $96A1-$97FE + $97B6-$9889 PPU transfer 翻译
 *
 * 翻译原则（v2）：
 *   - 不模拟 MMC3 / STA $2006 / STA $2007 / bank 切换
 *   - 直接用具名 DataStore read/write + PpuTarget 抽象
 *   - 多 bank cfg 装载：走 SceneLoadCfgTable 声明式表查 cfgId → (bank, ptr)
 *
 * 对应 PRG 段（docs/BANK00_ANALYSIS.md §2.4 + §2.5）：
 *   $8464: scene cfg 多 bank 装载入口（CMP $8AEE,Y 找 cfgId, 算偏移, 算 PTR=$A0xx）
 *   $96A1: palette update jump table 入口
 *   $97B6: PPU buffer write（多字节写 $05E8,X 缓冲）
 *   $97E7: sprite commit + alloc（4-byte entry 写 + alloc next slot）
 *   $980A: finalize buffer write（最终 commit）
 *   $988A: PPU direct write wrapper（直接写 $2007）
 *   $9897: PPU bulk wrapper（连续 bulk fill）
 *   $98A0: clear NT + disable display
 *   $98EC: PPU bulk buffer fill（16+ rows 一次写）
 *
 * 数据表（§5）：
 *   $8AEC: scene cfg lo byte table
 *   $8AED: scene cfg hi byte table
 *   $8AEE: scene cfg id table (boundary table)
 *   $9EA2: 16-byte NT base pattern
 *   $9EB2/$9EC2/$9ED2: 16-byte fade table progressive
 *   $9EE2: 13-byte input decode table
 */
import type { DataStore } from '../../data/store/DataStore';
import type { PpuTarget } from './InterruptService';
/**
 * Scene cfg entry（$8464 多 bank 装载的解析结果）
 * - cfgId: 0..N 配置 id（来自 $0025 = scene idx）
 * - targetBank: 装载到哪个 PRG bank (R6 select id 0/1/2/...)
 * - ptrLo: 目标指针低字节
 * - ptrHi: 目标指针高字节
 * - paramByte: 数据段参数（写到 $0056）
 * - cfgRow: 当前 NT row（写到 $00ED）
 */
export interface SceneLoadCfg {
    cfgId: number;
    targetBank: number;
    ptrLo: number;
    ptrHi: number;
    paramByte: number;
    cfgRow: number;
}
/**
 * NT 16-byte base pattern（$9EA2）— fade BG/SPR 高 4-bit 查表基础
 * 实际数据表已在 opening-data.ts 中声明，本服务引用之。
 */
export declare class PpuTransferService {
    readonly store: DataStore;
    private readonly ppu;
    constructor(store: DataStore, ppu?: PpuTarget | null);
    /**
     * 解析 scene cfg 多 bank 装载（PRG $8464 翻译）。
     *
     * ROM 行为：
     *   1. Y=0 起 CMP $8AEE,Y 找 cfgId 在上界表的位置
     *   2. cfgId - SCENE_CFG_SUB[Y] = offset
     *   3. $4D/$4E = (offset << 1) + $A0xx（PRG 装载段指针）
     *   4. $56 = SCENE_CFG_PARAM[Y]
     *   5. $ED = $0025 (current scene idx)
     *
     * H5 语义：返回结构化 cfg 给上层用，不直接 writeByte
     *
     * @param cfgId cfg id（rom $0025）
     * @returns SceneLoadCfg 或 null 表示未找到
     */
    resolveSceneCfg(cfgId: number): SceneLoadCfg | null;
    /**
     * 装载 cfg 到 DataStore（PRG $8464 + $8481-$84C5 完整流程翻译）。
     *
     * 完整流程（PRG 段）：
     *   1. 解析 cfg → 写 $004D/$004E (ptr lo/hi)
     *   2. 写 $0056 = param
     *   3. 写 $00ED = $0025 (current row)
     *   4. 调 $C4B9 bank select (H5 跳过，由调用方决定 dispatch 到哪个 module)
     *   5. 跳到 $A203 (bank2 main loop body)（H5 占位由 BootRouter 接管）
     *
     * H5 语义：
     *   - 写所有 cfg 字段到 DataStore
     *   - 0x23E0 NT 起始 1 行 32 字节 fill（ROM $849E-$84BE 段）
     *
     * @param cfgId 场景 cfg id (rom $0025)
     * @returns SceneLoadCfg 或 null 表示 cfgId 越界
     */
    loadCfgBlock(cfgId: number): SceneLoadCfg | null;
    /**
     * 调色板分配入口（PRG $96A5 翻译占位）。
     *
     * ROM 行为：从 $0094-Y 槽记录 → alloc palette slot
     *   - ($94)+$13 = alloc count
     *   - ($94)+$18+alloc = palette ptr lo/hi
     *
     * H5 语义：占位实现，等 SceneStateMachine 落地后接入
     *
     * @param bgIdx bg palette index 0..3
     * @param sprIdx spr palette index 0..3
     */
    allocPalette(bgIdx: number, sprIdx: number): void;
    /**
     * 多字节 PPU buffer 写（PRG $97B6 翻译）。
     *
     * ROM 行为：从 ($E6,$E7) 读 ptr 字节 → 写 $05E8,X NT 缓冲
     *   - $E6 += count-1（推进 ptr）
     *   - commit at $9B5E
     *
     * H5 语义：通过 store.ntRenderBuffer 直接写（64 字节环形缓冲）
     *
     * @param srcPtrLo 源 PRG 指针低字节
     * @param srcPtrHi 源 PRG 指针高字节
     * @param count 字节数（截断 0..63）
     * @returns 写入完成后的 NT buffer pos
     */
    writePpuBuffer(srcPtrLo: number, srcPtrHi: number, count: number): number;
    /**
     * 4-byte sprite commit (PRG $97E7 + $9B28 翻译)。
     *
     * ROM 行为：
     *   1. alloc next NT slot ($0628++ → 64-byte 环形)
     *   2. 从 ($E6,Y) 取 4 字节 → 写 ($E6,$E7) + commit
     *   3. INY×4 / DEX loop
     *
     * H5 语义：appendNtBuffer 走类型化队列，由 InterruptService.flushNtBuffer 落地
     *
     * @param data 4-byte sprite descriptor [tile, attr, x_lo, x_hi]
     */
    commitSprite4(data: ReadonlyArray<number>): void;
    /** 终结缓冲写入（PRG $980A 翻译） — 调 $9B5E commit */
    finalizeBufferWrite(): void;
    /**
     * 清 NT + disable/re-enable PPU（PRG $98A0 翻译）。
     *
     * H5 语义：通过 ppu.writeMem 一次性清 $2000-$23FF（NT + 属性表）。
     * 必须 disable 显示再清，否则屏幕闪烁（H5 强制在 PpuTransfer 层做）。
     */
    clearNt(ppu: PpuTarget): void;
    /**
     * PPU 大块填充（PRG $98EC 翻译）。16+ 行连续 NT 写。
     *
     * ROM 行为：从 ($E6,$E7) 批量写 NTI 字（disable 显示 → 直写 → re-enable）
     *
     * @param ppu PPU target
     * @param ntHi NT 高位选择 (0=$2000, 1=$2400)
     * @param rows 写入行数（1 row = 32 bytes）
     */
    bulkFillRows(ppu: PpuTarget, ntHi: number, rows: number): void;
}
