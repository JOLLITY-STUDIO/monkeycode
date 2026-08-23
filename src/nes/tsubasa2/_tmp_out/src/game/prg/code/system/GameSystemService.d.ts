/**
 * GameSystemService — 游戏主循环 / 场景调度 / 渲染原语 / 地图画面绘制
 * @bank 00 ($8000-$9FFF)
 *
 * 职责: mainLoop 主循环 $9EED、场景装载 $8AF7 sceneLoad、脚本分派入口、
 * 共享渲染原语 (ntClear/ntAttrClear/ppuBufAlloc/oamFlagClear/ppuFill/
 * paletteLoad/fade 等)。渲染原语直接作为方法写 DataStore
 * (NT/调色板/OAM/PPU buffer 区域), 不再有独立 RenderView。
 *
 * 含 $8EF0 地图画面绘制子程 (code_render.s):
 *   入口 A = metatile 索引; 切 bank8; LDA($00EA),Y 读 bank8 metatile 字典;
 *   画到 NT/OAM; 切回 bank7. 全项目仅此 1 处切 bank8 (读 bank08-map-metatile.ts).
 *   注意: 只管"地图画面绘制"(球场/比赛背景), 不管"界面渲染"(标题/密码/菜单
 *   走 bank02 NMI 回调, 不读 bank8).
 *
 * 调色板动态控制 (bank00 决定用哪组, bank06 提供数据):
 *   调色板索引由脚本指令/场景数据运行时决定, 非固定写死:
 *   - 脚本指令 $F3 palette(idx): ScriptEngine.opPalette() (asm $8681) 读 operand 设 ram_0048/0049
 *   - 场景描述符 ctrl 字段: code_scene.s:56-59 (asm $8B47) LDA($0063),Y; AND #$3F; STA $0048
 *   - bank28/bank30 也会写 ram_0048 (比赛配置/其他)
 *   索引设定后调 paletteLoadBG/paletteLoadSPR, 从 bank06 的 PALETTE_BG_06/PALETTE_SPR_06
 *   按索引×16 取 16 字节 → RAM $062A(BG)/$063A(SPR), 再 paletteWriteAll → PPU.
 *   PALETTE_BG_06/PALETTE_SPR_06 各 8 组×16B (bank06-palette.ts), 静态表, 直接 import 不切 bank.
 *
 * 命名规范: 旧名 Bank00Service → 新名 GameSystemService。
 */
import { DataStore } from '../../data/store/DataStore';
import { ScriptEngine } from '../story/ScriptEngine';
export declare class GameSystemService {
    protected _store: DataStore;
    /** bank30 (HardwareInitService) 引用 — 用于 $C5xx 派发表转发 */
    protected _hw: import('./HardwareInitService').default | null;
    /** PrgBankService 引用 — MMC3 PRG bank 切换 ($C4B9 H5 等价), 组合根注入 */
    protected _pb: import('./PrgBankService').default | null;
    protected _scriptPtr: number;
    protected _scriptBank: number;
    protected _textBufPtr: number;
    protected _textVramPtr: number;
    protected _textPos: number;
    protected _textLineLen: number;
    protected _lineCount: number;
    /** 协程工厂表: 索引 → 工厂函数 (返回新 generator, 替代 $0101+Y 回调指针) */
    protected _coroutines: Array<(() => Generator<void>) | null>;
    /** 活跃 generator 实例表: 槽位 → 正在执行的 generator */
    protected _coroutineGens: Array<Generator<void> | null>;
    /** 协程上下文: $E6-$ED (8字节, 替代 6502 栈压栈/弹栈) */
    protected _coroutineCtx: Array<{
        e6: number;
        e7: number;
        e8: number;
        e9: number;
        ea: number;
        eb: number;
        ec: number;
        ed: number;
        y: number;
        x: number;
    }>;
    /** 当前协程槽索引 (对应 $0000 存的 X 值) */
    protected _currentSlot: number;
    /** 协程让出时的等待帧数 (对应 $0019) */
    protected _yieldWait: number;
    /** 脚本引擎 (等价 $84C5 脚本 VM 回调, 由 slot $05 协程驱动) */
    protected _scriptEngine: ScriptEngine;
    constructor(store: DataStore);
    /** 注入 bank30 (HardwareInitService) 引用, 供 $C5xx 派发表转发 */
    setHardwareInit(hw: import('./HardwareInitService').default): void;
    /** 注入 PrgBankService (MMC3 PRG bank 切换), 组合根注入 */
    setPrgBank(pb: import('./PrgBankService').default): void;
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    protected rdPtr(lo: number, hi: number): number;
    protected wrPtr(lo: number, hi: number, v: number): void;
    waitCounter(): void;
    ppuFill(fill: number, vramAddr: number, cols: number, rows: number): void;
    /** $98F2-$9929 缓冲模式 (PPU buffer) */
    private ppuFillBuffered;
    /** $992C-$9979 直接模式 (不建 PPU buffer, 直写 NT) */
    private ppuFillDirect;
    /** $98E8 — ppuFill 入口别名 (A 已置好, ram_00E6/00E7/00E9/X/Y) */
    ppuFill98E8(): void;
    /** 写单个 NT 字节 (地址 → 网格坐标) */
    writeNTByte(vramAddr: number, val: number): void;
    ntClear(): void;
    ntAttrClear(): void;
    ppuBufAlloc(ctrl: number, len: number, dst: number): number;
    /** $9B5E ppuBufEnd — 结束 PPU buffer (写终止符) */
    ppuBufEnd(x: number): void;
    /** 写 PPU buffer 字节 $05E8+X */
    writePpuBuf(x: number, v: number): void;
    readPpuBuf(x: number): number;
    oamFlagClear(): void;
    initHelper(): void;
    paletteWriteAll(): void;
    /** $9AA2 paletteWriteByte — 写单个调色板字节到 buffer */
    private paletteWriteByte;
    paletteLoadBG(): void;
    paletteLoadSPR(): void;
    /** 从调色板组表复制一组 (16 字节) 到指定 RAM 区 (索引 → 组) */
    private paletteCopy16;
    paletteSetFull(): void;
    mainInitParam(bgIdx: number, sprIdx: number): void;
    mainLoopInit2(bgIdx: number): void;
    /** $9A4C mainInitParamBgOnly — 仅 BG 置满 */
    mainInitParamBgOnly(bgIdx: number): void;
    /** $9A60 mainInitParamSprOnly — 仅 SPR 置满 */
    mainInitParamSprOnly(sprIdx: number): void;
    /**
     * 切 R7 bank ($A000 窗口). 原版 $9B07 + $C4B9 语义。
     * @param bank 8KB bank 索引 (0-31)
     */
    bankSwitchR7(bank: number): void;
    /**
     * 切 R6 bank ($8000 窗口). 原版 JSR $C4B9 with cmd 6 语义。
     * @param bank 8KB bank 索引 (0-31)
     */
    bankSwitchR6(bank: number): void;
    /**
     * 查当前 R7 bank ($A000 窗口映射的 bank 索引)
     * 用于 service 层读 PRG 数据时按 prgBankMap 动态取 bank。
     */
    currentR7Bank(): number;
    /** 查当前 R6 bank ($8000 窗口映射的 bank 索引) */
    currentR6Bank(): number;
    /**
     * 渐隐单步 (由脚本引擎每帧驱动): ram_004A/004B 各 -1 → paletteWriteAll。
     * 每帧一步, 避免同步循环写爆 PPU buffer (0x3D 容量限制)。
     * @returns true = 已全部归 0 (渐隐完成)
     */
    fadeStepOut(): boolean;
    /** @deprecated 同步循环会写爆 PPU buffer, 用 fadeStepOut 由帧循环驱动 */
    fadeOut(): void;
    /**
     * 渐显单步 (由脚本引擎每帧驱动): ram_004A/004B 各 +1 → paletteWriteAll。
     * @returns true = 已满 (渐显完成)
     */
    fadeStepIn(): boolean;
    /** @deprecated 同步循环会写爆 PPU buffer, 用 fadeStepIn 由帧循环驱动 */
    fadeIn(): void;
    fadeInSpr(): void;
    waitVBlank(): void;
    dataWriteHelper(a: number, y: number, x: number): void;
    tableLoad(a: number): void;
    sceneLoad(sceneId: number): void;
    /**
     * 从 bank07 场景表读场景数据 (原 asm $8B1C-$8B6B)。
     * 查 SCENE_PTR_TABLE 得入口地址, 读前 6 字节解析为 SceneData。
     */
    private getSceneData;
    /** 获取场景原始字节 (从 bank07 完整 8KB 数据按指针表提取) */
    private getSceneRawBytes;
    /** 应用场景数据 (从 bank07 场景表) */
    private applySceneData;
    update(frame: number): void;
    /** $9EEF-$9FFF 调度器单步 (协程调度器主循环) */
    private scheduleStep;
    /**
     * $9F0F/$9F52: 恢复协程上下文并执行
     * H5 generator 版: 恢复上下文 → 调 gen.next() 推进 generator
     * @param slot 协程槽基址 ($0000+X)
     * @param light true=$9F52 轻量恢复 (不恢复 E6-ED), false=$9F0F 完整恢复
     */
    private _resumeCoroutine;
    /**
     * $9FA8: 协程让出 (yield)
     * asm: 存 A→$0019; 压栈 X/Y/$ED-$E6; 存栈指针/R6/R7 到槽; 设计数器; JMP $9EFB
     * H5 generator 版: 只设 RAM 计数器, 由 generator yield 真正挂起
     * ctx 恢复由 generator 自带状态, 不需 _coroutineCtx
     * @param a 让出参数 (1=等1帧, $FF=特殊等1帧, 0=等$FE帧)
     * @returns generator yield 值 (undefined, 仅为语法)
     */
    private _coroutineYieldImpl;
    /**
     * $9F69: 注册协程
     * @param slot 协程槽基址 ($0000+X)
     * @param r6bank R6 bank 号
     * @param callbackIdx 回调索引 (对应 $0101+Y)
     * @param ctx 初始上下文 ($E6-$ED)
     */
    registerCoroutine(slot: number, r6bank: number, callbackIdx: number, ctx?: Partial<{
        e6: number;
        e7: number;
        e8: number;
        e9: number;
        ea: number;
        eb: number;
        ec: number;
        ed: number;
        y: number;
        x: number;
    }>): void;
    /**
     * $9F7E: 清协程槽
     * @param slot 协程槽基址
     */
    clearCoroutine(slot: number): void;
    /**
     * $9F89: 检查协程槽状态
     * @returns 0=空, 1=忙, 2=就绪
     */
    checkCoroutine(slot: number): number;
    /** $801E: 首次运行协程回调 (generator 版, 真正挂起/恢复) */
    private sub801EGen;
    /** $807A: 公共输入驱动循环 (选场景/切换) */
    private sub807A;
    /** $8091: 场景选择循环 (标题菜单: 输入切换 $00ED 场景位) */
    private sub8091;
    /**
     * $8297: 装载场景数据 (A → $00E7 段类型; $00E6=1 段数; $004D=$00E5; JSR $9085)
     * asm: STA $00E7; LDA #$01; STA $00E6; LDA #$E5; STA $004D; LDA #$00; STA $004E;
     *      JSR $9085; RTS
     */
    sub8297(a: number): void;
    /** $82EC: 场景数据装载器协程回调 (generator 版) */
    private sub82ECGen;
    /**
     * $838A: 切 bank2 调 $A215 再切回 bank6 (纯 bank 切换辅助子程)
     * asm: LDX #$02; JSR $C4B9 (切 R7=bank2); JSR $A215; LDX #$06; JSR $C4B9 (切回 R7=bank6); RTS
     * H5: 通过 PrgBankService 切 R7, $A215 本体 = JMP $A8CE (bank2 精灵 OAM 刷新)
     */
    private sub838A;
    /** $A215 ($A8CE) — 精灵 OAM 刷新 (影子 $0468 → 硬件 $0200, attr bit2-3≠0 隐藏)
     *  tsnes disasm dump 确认, 语义等价 ShadowOam.copyToHw() */
    private subA215_stub;
    /** $8306-$8380 BG 路径: 调色板动画流 → $062A RAM 调色板 */
    private palAnimBg;
    /** $8355-$8380 SPR 路径: 精灵数据流 → $008E+X */
    private palAnimSpr;
    /** $9085: 场景数据装载器 */
    sub9085(): void;
    /** $9147: 场景数据消费协程前缀 (slot $11 回调, 让出一帧后进入 sub9148) (generator 版) */
    private _sub9147Armed;
    private sub9147Gen;
    /** $88FB: oamCopy — 所有精灵属性 $046A,X ^= $20 (X 步长 4) */
    sub88FB(): void;
    /** $890C: 所有精灵 $0468,X += A (X 步长 4, 整体平移) */
    sub890C(a: number): void;
    /** $9A35: mainLoopInit2 — paletteLoadBG + paletteLoadSPR + 置满 (用当前 $0048/$0049) */
    sub9A35(): void;
    /** $9148: 场景初始化协程回调 (generator 版) */
    private sub9148Gen;
    /** $974A: 读场景数据 ($0094),Y → $009A/$009B */
    private sub974A;
    /** $975B: 读场景数据 ($0094),Y → $009C/$009D */
    private sub975B;
    /** $91A6: 精灵位置设置 (bit4 路径) (generator 版) */
    private sub91A6Gen;
    /** $91B4: 精灵数据循环 (读 ($0094),Y 写 $0468 区) (generator 版) */
    private sub91B4Gen;
    /** $91F3: 场景数据后续处理 (generator 版) */
    private sub91F3Gen;
    /** $94C1: 推进场景段指针 + 递减计数器 (generator 版) */
    private sub94C1Gen;
    /** 读 RAM 字节 (addr < 0x0800) */
    private rdMemByte;
    /** 写 RAM 字节 */
    private wrMemByte;
    /** $C515 协程让出 — 转发到协程调度器实现 */
    coroutineYield(a?: number): void;
    /** $C50C 比赛阶段→RAM指针查表 — 转发 bank30 */
    subC50C(): void;
    /**
     * $C509 比赛阶段→RAM指针查表 (带 A 参数)
     * TODO: 真实实现 — bank30 $C509, 读 ram_00ED×2 查指针表返回 RAM 玩家数据指针
     * @returns 查表索引 (stub 返回 0)
     */
    subC509(a: number): number;
    /**
     * $C527 数值→图案转换入口 (via $C524)
     * TODO: 真实实现 — bank30 $C527, 调 $CE08 把数值转成图案字节写 NT buffer
     */
    subC527(a: number): number;
    /**
     * $C53C 数值→图案转换 (via $C527)
     * TODO: 真实实现 — bank30 $C53C
     */
    subC53C(): void;
    /** $C524 坐标变换 — 转发 bank30 */
    subC524(a: number): number;
    /** $C52D 精灵批初始化 — 转发 bank30 */
    subC52D(): void;
    /** $C530 NT 填充 — 转发 bank30 */
    subC530(x: number, a: number): void;
    /** $C533 NT 刷新 — 转发 bank30 */
    subC533(): void;
    /** $C54E 读数据+设精灵 — 转发 bank30 */
    subC54E(a: number): void;
    /**
     * $8464 脚本装载
     * asm: LDX #$05; LDA #$C5; STA $0000,X; LDA #$84; STA $0001,X; LDY #$50; LDA #$00; JSR $9F69
     * H5: ScriptLoader.load 装载脚本 (设 $004D/$004E 指针 + $0056 bank) + 注册 slot $05 协程 (回调工厂 idx 4 = sub84C5Gen)
     */
    private loadScript8464;
    /**
     * $84C5 脚本 VM 回调 (协程 slot $05)
     * asm: $84C6 切脚本 bank; $84CB-$84E5 文本位置重置; $84E7 分派循环读脚本流 ($004D),Y;
     *      字符/等待/行编辑/长指令处理均 JMP $8879 (推进指针后回 $84E7 继续), 等待指令经 $9FA8 让出。
     * H5: generator 首次执行文本位置重置, 之后每帧 ScriptEngine.update() 推进一条指令, yield 让出一帧;
     *      脚本指针 $004D/$004E 与文本位置 $0051-$0055 由 generator 状态天然跨帧保持。
     */
    private sub84C5Gen;
}
/** 场景数据结构 (bank07 提供) */
export interface SceneData {
    ptrLo: number;
    ptrHi: number;
    palette: number;
    dir: number;
    w: number;
    h: number;
    pos: number;
    ctrl: number;
}
export default GameSystemService;
