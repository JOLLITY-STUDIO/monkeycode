/**
 * InterruptService — 每帧中断/渲染管线（用具名视图 + 类型化队列）
 *
 * 翻译原则（v2）：
 *   - 队列操作用具名 RamView（store.renderQueue.ntBuffer / queue1Count / ...）
 *   - NT 缓冲解析通过 RenderQueues.consumeNtBuffer 返回类型化条目（无字节流手解）
 *   - CHR 装载走 PpuTarget.loadChrBank 抽象（无 MMC3 寄存器直读）
 *   - 所有数据通过具名视图 store.ppuState / store.scene / store.fade 访问
 *
 * 流水线按原版 NMI 顺序提交，bank 切换寄存器写已彻底省略。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from './InputService';
import type { BootRouter } from './BootRouter';
import type { AudioService } from '../audio/AudioService';
import type { Bank00SchedulerService } from './Bank00SchedulerService';
import type { Bank00MainLoopService } from './Bank00MainLoopService';
/** 渲染目标抽象 */
export interface PpuTarget {
    writeMem(address: number, value: number): void;
    spriteMem: Uint8Array;
    updateControlReg1(value: number): void;
    updateControlReg2(value: number): void;
    /** 滚动寄存器（可直接写） */
    regHT: number;
    regFH: number;
    regH: number;
    regV: number;
    regVT: number;
    regFV: number;
    /**
     * 装载 CHR 1KB bank 到 pattern table 指定 slot。
     * slot: 0-7 → PPU 地址 slot*$0400（$0000/$0400/.../$1C00）。
     * 由 runtime 实现（声明式 slot map；未提供时跳过动态装载）。
     */
    loadChrBank?(slot: number, bank1k: number): void;
}
export declare class InterruptService {
    readonly store: DataStore;
    readonly input: InputService;
    private router;
    private audio;
    private scheduler;
    private bank00MainLoop;
    /** CHR 8 slot 已装载 bank1k 缓存（变更检测） */
    private readonly chrSlots;
    constructor(store: DataStore, input: InputService);
    /** 注入场景路由 */
    attachRouter(router: BootRouter): void;
    /** 注入音频服务（每帧推进音频引擎） */
    attachAudio(audio: AudioService): void;
    /**
     * 注入 bank00 6-slot dispatcher（PRG $9085 scheduler tick entry 翻译）。
     * 在 nmi() 末尾调 scheduler.tickDispatch()，自动派发所有 timer→0 的 slot。
     * 由 Tsubasa2 组合根在 boot() 时接线。
     */
    attachScheduler(scheduler: Bank00SchedulerService): void;
    /**
     * 注入 bank00 主循环（PRG $8000 5-mode dispatch 翻译）。
     * 在 nmi() 末尾 router.update() 之后调 bank00MainLoop.tickFrame(),
     * 按 $0027 mode 派发对应 callback.
     */
    attachBank00MainLoop(loop: Bank00MainLoopService): void;
    /**
     * 每帧 NMI：
     * 1. 手柄读取
     * 2. 音频引擎帧推进
     * 3. 场景帧更新（游戏逻辑路径）
     * 4. bank00 scheduler tick（PRG $9085 翻译入口）
     * 5. 主渲染路径标志置位
     */
    nmi(frame: number): void;
    /**
     * 渲染提交：
     * 1. flush VRAM（游戏逻辑期的 VRAM 直写落地）
     * 2. 关 NMI 并应用 CTRL
     * 3. OAM DMA（影子 → spriteMem）
     * 4. 渲染队列消费（LIFO）
     * 5. 主滚动
     * 6. MASK + CHR 装载
     * 7. 续段
     * 8. 恢复 NMI + 调色板兜底
     */
    renderCommit(ppu: PpuTarget, frame?: number): void;
    /**
     * OAM DMA（影子 → spriteMem）。
     *
     * Byte order: NES 标准 [Y, tile, attr, X] (PPU.spriteRamWriteUpdate 按此解)。
     * 之前的 [X, tile, attr, Y] 是反了, 现在修正.
     *
     * ⚠ attr mask 检查：
     *   原来 `(attr & 0x0c) !== 0 → X=0xF8` 是错的（0x0c 是 palette group 位），
     *   实际 NES 隐藏条件是 Y >= 0xEF；attr bit 不参与 X 隐藏。
     *   emu-reference frame 30 OAM idx 1-24 都是 attr=2 但 x 正常 → 验证此 mask 错。
     */
    private oamDma;
    /** 主滚动：X = ppuState.scrollTempX, Y = ppuState.scrollTempY */
    private applyScrollC7B7;
    /**
     * 滚动路径（最终生效）：
     * - scene.scrollFlag bit7 → 文本滚动路径
     * - 否则：CTRL bit2 ← $0045 bit0 ← $007B bit0 → PPU CTRL
     * - X=scene.scrollX, Y=scene.scrollY-1
     */
    private applyScrollBank02;
    /** 滚动值 → PPU 滚动寄存器 */
    private setScroll;
    /** 帧计数器更新（具名视图访问） */
    private frameCounters;
    /**
     * NT 渲染缓冲消费（类型化 RenderQueues.consumeNtBuffer）
     * 渲染期间临时 MASK=0，完成后由后续 MASK 步骤恢复。
     */
    private flushNtBuffer;
    /**
     * 第一渲染队列消费（LIFO，每帧消费队尾一项）
     * 流格式：RLE 块 [count][addrLo][addrHi][data×count]，0 终止
     */
    private flushRenderQueue;
    /**
     * 流字节读取（仅指向工作 RAM）。
     * - $0000-$07FF: 工作 RAM
     */
    private readStreamByte;
    /**
     * 第二渲染队列消费：
     * - renderQueue.queue2Pending 置位（待消费）→ 清标志；$04A5 起 RLE 块
     */
    private flushSecondQueue;
    /**
     * 调色板：palette.bg → $3F00；palette.spr → $3F10。
     *
     * 渐显/渐隐处理：写前经 fadeLookup（对应 $998C-$99AD 的 fadeWrite 语义）。
     *   ROM 每帧写调色板都带 fade 计算，H5 必须一致——否则 fadeWrite 通过 NT 缓冲
     *   写的渐显值会被 step 8 无条件覆盖为"未渐显的满亮值"，黑屏 fade-in 失效
     *   （模拟器 f13 palBg=[15,6,0,16,...] 是 fade=3 渐显值，不是满亮值）。
     */
    private flushPalette;
    /**
     * 渐显表查色（与 RenderingPrimitivesService.fadeLookup 同语义，emu dump 反推）：
     *   fade = 0 → 全黑 $0F；fade >= 1 → OPENING_FADE_TABLE[(pal & $30) + (fade - 1)] | (pal & $0F)
     */
    private fadeLookup;
    /**
     * Boot 期 primeBootState — WBS_FRAME13 F4 + F5
     *
     * 把 boot 时已经计算好的 shadow OAM 与 调色板强制推到 PPU, 不等 renderCommit.
     * 替代方案: 等 frame 1 renderCommit 自然跑 (但 OAM DMA boot 顺序与 sprite count == 0
     * 时机冲突 — frame 1 早期 PPU 仍 0).
     *
     * ⚠ OAM 写入必须逐字节调 spriteRamWriteUpdate(), 让 PPU 同步 unpack sprY/sprTile/sprCol/sprX;
     * 直接写 spriteMem 不会触发 unpack (PPU dumpOam/sprY 仍 0).
     *
     * @param ppu PPU 渲染目标
     */
    primeBootState(ppu: PpuTarget): void;
    /**
     * CHR 装载（基于 loadChrConfig 写入的 6 字节 cfg → 8 slot bank1k 推算）：
     * - $0075 (cfg[0]) = BG 区域 slot 0 bank1k 起始（slot 0-3 连续 4 个）
     * - $0076 (cfg[1]) = SPR 区域 slot 4 bank1k 起始（slot 4-7 连续 4 个）
     * - 其他 4 字节 cfg[2..5] 是参数（flip/width/offset），不直接映射 bank
     * - chrSel 由 $005D bit 2 决定（切高位 4-7 还是低位 0-3）
     *
     * 注：ROM 真实行为是 VBlank 期间多次切 bank（frame 30 切 276 次），
     *     此处只用 cfg 字节做"单次声明式"装载（每帧调一次）。
     *     后续若需要 mid-frame 切换，需翻译 ROM $8BAB 之后那段循环。
     */
    private applyChrRequest;
    /**
     * bank02 CHR：cmd 2-5 ← $009E-$00A1（chrSel=0 → slots 4-7）。
     * WBS L6：扩展到 cmd 0/1 (高 bank slots 0-3) + 跳过 cmd 6/7（PRG ROM page，H5 忽略）。
     */
    private applyChrFrom009e;
    /**
     * PRG $8BAB+ 翻译（V2）：mid-frame CHR switch 主入口。
     *
     * 在 renderCommit 时机从 $005E/$005F 读 stream 指针, 按 (cmdHi, arg)
     * 字节流解析 cmd 0..5 全部命令, 对每条调 chrWrite。当前粒度为单次推进 (不细化 per-scanline)。
     *
     * 关键观察：EMU 在同一 frame 中多次调用 writePrgBank8000/8001,
     *   一组 bankWrite 写入 4 个 slot (e.g. slot 0-3), 然后再写另一组 (slot 4-7)。
     *   H5 在 renderCommit 末尾一次性把 frame 内所有写入 applied,
     *   应用顺序 = 数组顺序, 最后一组 win。
     *
     * @param scanline  当前正在绘制的 scanline（0..240；0=刚进入 VBlank 写结束）
     * @returns 本次解析消耗的 entry 数量（用于调试 / 限流）
     */
    midFrameChrSwitch(ppu: PpuTarget, scanline: number): number;
    /**
     * WBS L5: 由 InterruptService 内部在 renderCommit 后触发 per-scanline 调度。
     * 默认按每 4 条 scanline 推进一次（L5 实现粒度可根据 emulator 观察调整）。
     */
    private triggerPerScanlineDispatch;
    /**
     * WBS L4 V2：per-scene end-of-frame CHR bank 强制覆盖。
     *
     * 替代 mid-frame stream parser 的不确定性, 直接按 scene 锁定终态 8 slot bank。
     * 在 renderCommit step 7 末尾调, 覆盖 applyChrFrom009e + midFrameChrSwitch 写的状态。
     *
     * 数据来源：scripts/_emu_reference.cjs 跑 ROM 各 scene, 取 state.json.chrBanks。
     * 每次新增 scene 终止 bank 时, 在 scene-end-bank-table.ts 加一行即可。
     */
    applySceneEndBankOverride(ppu: PpuTarget, frame: number): void;
    /** CHR 写解码：cmd 0-5 选择 slot，cmd 6/7 为 PRG ROM page（H5 无语义） */
    private chrWrite;
    /** 装载单个 1KB CHR slot（值未变化时跳过） */
    private loadChrSlot;
}
