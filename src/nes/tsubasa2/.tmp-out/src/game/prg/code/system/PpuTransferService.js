import { appendNtBuffer } from '../../data/store/RenderQueues';
/**
 * Bank00 scene cfg table（PRG $8AEC-$8AEE 翻译）
 * 直接声明式翻译自 ROM 字节：
 *   - 上界表（找 ≤ cfgId 的边界，PRG $8AEE）：
 *     [0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff]
 *   - 减法表（cfgId - sub[Y]，PRG $8AEC）：
 *     [0x00, 0x03, 0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff]
 *   - 参数表（写到 $0056，PRG 同域）：
 *     [0x03, 0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff]
 */
const SCENE_CFG_UP_BOUND = [
    0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff,
];
const SCENE_CFG_SUB = [
    0x00, 0x03, 0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff,
];
const SCENE_CFG_PARAM = [
    0x03, 0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff,
];
/**
 * NT 16-byte base pattern（$9EA2）— fade BG/SPR 高 4-bit 查表基础
 * 实际数据表已在 opening-data.ts 中声明，本服务引用之。
 */
export class PpuTransferService {
    constructor(store, ppu = null) {
        this.store = store;
        this.ppu = ppu;
    }
    // ──────────────────────── $8464 cfg loader ────────────────────────
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
    resolveSceneCfg(cfgId) {
        const s = cfgId & 0xff;
        let y = 1;
        while (y < SCENE_CFG_UP_BOUND.length && s >= SCENE_CFG_UP_BOUND[y])
            y++;
        if (y >= SCENE_CFG_UP_BOUND.length)
            return null;
        const offset = (s - SCENE_CFG_SUB[y]) & 0xff;
        const ptr16 = (offset << 1) & 0xffff;
        const ptrLo = ptr16 & 0xff;
        const ptrHi = (0xa000 + (ptr16 >> 8)) & 0xff;
        return {
            cfgId: s,
            targetBank: y,
            ptrLo,
            ptrHi,
            paramByte: SCENE_CFG_PARAM[y] ?? 0,
            cfgRow: s,
        };
    }
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
    loadCfgBlock(cfgId) {
        const cfg = this.resolveSceneCfg(cfgId);
        if (!cfg)
            return null;
        const store = this.store;
        store.writeByte(0x004d, cfg.ptrLo);
        store.writeByte(0x004e, cfg.ptrHi);
        store.writeByte(0x0056, cfg.paramByte);
        store.writeByte(0x00ed, cfg.cfgRow);
        store.writeByte(0x0652, 0x00);
        // $00E6/$00E7 = $23E0 → PPU buffer fill 1 行 (H5 placeholder)
        store.writeByte(0x00e6, 0xe0);
        store.writeByte(0x00e7, 0x23);
        // 触发清 NT 第 0 行 (count=1, 32 bytes value=0x55)
        if (this.ppu) {
            this.ppu.writeMem(0x23e0, 0x55);
            for (let i = 1; i < 32; i++) {
                this.ppu.writeMem(0x23e0 + i, 0x55);
            }
        }
        return cfg;
    }
    // ──────────────────────── $96A1 palette alloc ────────────────────────
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
    allocPalette(bgIdx, sprIdx) {
        void bgIdx;
        void sprIdx;
        // TODO(B0-3.1): 接 PALETTE_TABLE 查表 → store.palette.bg/spr 装载
        // 参考 RenderingPrimitivesService.loadBootPalette() 的取数方式
    }
    // ──────────────────────── $97B6 PPU buffer write ────────────────────────
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
    writePpuBuffer(srcPtrLo, srcPtrHi, count) {
        const buf = this.store.ntRenderBuffer;
        const pos = this.store.readByte(0x0628) & 0x3f;
        const n = Math.min(count & 0x3f, buf.length - pos);
        let src = ((srcPtrHi & 0xff) << 8) | (srcPtrLo & 0xff);
        for (let i = 0; i < n; i++) {
            // H5 占位：实际从 PRG bank 取 src+i 字节；当前模拟给 RAM 字节
            buf[(pos + i) & 0x3f] = this.store.readByte(src & 0x7ff);
            src = (src + 1) & 0xffff;
        }
        this.store.writeByte(0x0628, (pos + n) & 0xff);
        return (pos + n) & 0xff;
    }
    // ──────────────────────── $97E7 sprite commit+alloc ────────────────────────
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
    commitSprite4(data) {
        if (data.length < 4)
            return;
        appendNtBuffer(this.store.renderQueue, {
            vertical: false,
            ntAddr: 0x2000 | (this.store.readByte(0x00e6) & 0xff) | ((this.store.readByte(0x00e7) & 0xff) << 8),
            data: [data[0] ?? 0, data[1] ?? 0, data[2] ?? 0, data[3] ?? 0],
        });
    }
    // ──────────────────────── $980A finalize buffer write ────────────────────────
    /** 终结缓冲写入（PRG $980A 翻译） — 调 $9B5E commit */
    finalizeBufferWrite() {
        // 占位：commit 当前 NT buffer 落到 queue，由 InterruptService.flushNtBuffer 消费
        this.store.writeByte(0x0629, 0x00);
    }
    // ──────────────────────── $98A0 clear NT ────────────────────────
    /**
     * 清 NT + disable/re-enable PPU（PRG $98A0 翻译）。
     *
     * H5 语义：通过 ppu.writeMem 一次性清 $2000-$23FF（NT + 属性表）。
     * 必须 disable 显示再清，否则屏幕闪烁（H5 强制在 PpuTransfer 层做）。
     */
    clearNt(ppu) {
        const savedMask = this.store.ppuState.mask;
        const savedCtrl = this.store.ppuState.ctrl;
        // disable 显示（清 bit3/spr-enable + bg-enable 保留强制 0）
        ppu.updateControlReg2(0);
        // 清 $2000-$23BF (NT 0/1/2/3)
        for (let addr = 0x2000; addr < 0x23c0; addr++) {
            ppu.writeMem(addr & 0x3fff, 0x00);
        }
        // 清属性表 $23C0-$23FF
        for (let addr = 0x23c0; addr < 0x2400; addr++) {
            ppu.writeMem(addr & 0x3fff, 0x00);
        }
        // re-enable 显示
        ppu.updateControlReg2(savedMask);
        ppu.updateControlReg1(savedCtrl | 0x80);
    }
    // ──────────────────────── $98EC bulk fill 16+ rows ────────────────────────
    /**
     * PPU 大块填充（PRG $98EC 翻译）。16+ 行连续 NT 写。
     *
     * ROM 行为：从 ($E6,$E7) 批量写 NTI 字（disable 显示 → 直写 → re-enable）
     *
     * @param ppu PPU target
     * @param ntHi NT 高位选择 (0=$2000, 1=$2400)
     * @param rows 写入行数（1 row = 32 bytes）
     */
    bulkFillRows(ppu, ntHi, rows) {
        const savedMask = this.store.ppuState.mask;
        ppu.updateControlReg2(0);
        const addr = 0x2000 + ((ntHi & 0x01) << 10);
        const n = Math.max(0, rows | 0) * 32;
        for (let i = 0; i < n && i < 0x400; i++) {
            ppu.writeMem((addr + i) & 0x3fff, 0x00);
        }
        ppu.updateControlReg2(savedMask);
    }
}
