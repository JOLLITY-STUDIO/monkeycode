/**
 * Bank00MainLoopService — bank00 $8000 主循环 5-mode dispatcher 翻译
 *
 * 翻译原则（v3，去 CPU 化）：
 *   - 不模拟 6502 `LDA $0027 / ASL TAX / LDA $800E,X / PHA / RTS` 间接跳转
 *   - bank 切换（JSR $C4B9 / STA $8000 / LDX #$XX）行为语义 = 直接调本域 service
 *   - `$0027` status mode（0..4）由 tickFrame() 每帧读取并派发到 5 个 handler
 *   - scene handler（A00C/A015/A012/A018/A20C/A006/A009/A203）通过 MainLoopHooks
 *     委托给 BootRouter/SceneController（Tsubasa2 组合根注入，默认 no-op）
 *   - 数据表（$8398/$83BA/$83DC/$83FE/$8420/$8442）全部从 asm 声明式提取
 *
 * 对应 PRG 段（docs/BANK00_ANALYSIS.md §2.1 + C.5，逐指令对照 code_main.s $8000-$8282）：
 *   $8000: LDA $0027; ASL; TAX; LDA $800E,X; PHA; LDA $800D,X; PHA; RTS
 *   $800D dispatcher table: $8165 / $818A / $81AD / $81B4 / $81DA（5 handler）
 *   mode 0 ($8165): $0027=1 → $C56C → $8285（等1帧+scene A00C）→
 *                   $0026 > $00E4 → $00E4=$0026 + $83FE[$0026] cfg load + 清输入
 *   mode 1 ($818A): $0028 vs $0029 比较（相等 → 查 $83BA[$0026]：0=advance / 1=mode4 / else mode2）
 *   mode 2 ($81AD): $0027 = 3
 *   mode 3 ($81B4): $0028 vs $0029（相等 → 查 $83BA[$0026]==3 → mode4；$0026==$20 → INC → tail）
 *   mode 4 ($81DA): $0028 vs $0029（相等/小于 → scene advance；大于 → $8206）
 *   $8206 (timer greater): 查 $8420/$8442 cfg + $0026 < $20 → INC + tail；≥ $20 → mode5 halt
 *   $81E6 (scene advance): A015 → cfg $60 → 清输入 → fade → $0026 = $8398[$0026] → tail
 *   $80FD (tail): 清零 $0028/$0029/$0027 → scene handlers → $0700 = 0x55/0x4C → 主循环
 *
 * boot 链（$801F-$80D3，供 Tsubasa2 接入）：
 *   pollBootStartButton() — $801F-$804A Start 键等待
 *   bootLogoLoad() — $8053-$8090 Tecmo/NTV logo 装载
 *   enterGame() — $80A2-$80D4 标题按键解码 + 进入游戏
 *
 * @bank 00 ($8000-$9FFF)
 */
import type { DataStore } from '../../data/store/DataStore';
import type { Bank00SchedulerService } from './Bank00SchedulerService';
import type { PpuTransferService } from './PpuTransferService';
/**
 * 主循环外部委托（bank02 scene handler / 渲染原语）。
 * 由 Tsubasa2 组合根通过 attachHooks() 注入；未注入时默认 no-op（帧循环仍推进状态机）。
 */
export interface MainLoopHooks {
    /** PRG $A203 主循环体（bank02 scene dispatch）→ 通常映射 BootRouter.update() */
    sceneMainLoopStep?: () => void;
    /** PRG $8285 JMP $A00C — mode0 每帧 scene handler */
    sceneHandlerA00C?: () => void;
    /** PRG $81EB JSR $A015 — scene advance handler */
    sceneHandlerA015?: () => void;
    /** PRG $820B JSR $A012 — timer greater handler */
    sceneHandlerA012?: () => void;
    /** PRG $8252 JSR $A018 — $8206 INC 后 handler */
    sceneHandlerA018?: () => void;
    /** PRG $80FD JSR $A20C — tail scene handler */
    sceneHandlerA20C?: () => void;
    /** PRG $811C JSR $A006 — tail scene handler */
    sceneHandlerA006?: () => void;
    /** PRG $8142 JSR $A009 — tail scene handler */
    sceneHandlerA009?: () => void;
    /** PRG $99F0 BG+SPR 渐隐 */
    fadeOutAll?: () => void;
    /** PRG $8920 loadSceneData（scrollFlag/$007B.. 装载） */
    loadSceneData?: (sceneId: number) => void;
    /** PRG $9B11 清 sprite/tile */
    clearSprites?: () => void;
    /** PRG $9B7F 隐藏 OAM */
    hideOam?: () => void;
    /** PRG $98A0 清 NT */
    clearNt?: () => void;
    /** PRG $8AF7 CHR cfg 装载 */
    loadChrConfig?: (cfgId: number) => void;
    /** PRG $890C 所有精灵 Y += delta */
    shiftSpriteY?: (delta: number) => void;
    /** PRG $88FB 所有精灵 attr ^= $20 */
    flipSpriteAttrs?: () => void;
    /** PRG $9A35 BG palette + fade 满亮 */
    loadBgPaletteFull?: () => void;
    /** PRG $98EA NT bulk fill（127 bytes @ $0A22） */
    writeTitleRow?: () => void;
    /** 音频初始化/请求（boot 期 BGM 装载） */
    prepareAudio?: () => void;
}
/**
 * Bank00MainLoopService — bank00 $8000 主循环 5-mode dispatcher（PRG $8000 翻译）
 *
 * 每帧调用链（InterruptService.nmi() 末尾）：
 *   tickFrame() → 读 $0027 → MainRouterService.dispatchByMode(mode) → 对应 handler
 */
export declare class Bank00MainLoopService {
    readonly store: DataStore;
    private readonly scheduler;
    private readonly ppuTransfer;
    /** 5-mode dispatch table（MainRouterService 内部持有，Tsubasa2 不暴露） */
    private readonly router;
    /** 外部委托（bank02 scene / 渲染原语），默认空实现 */
    private hooks;
    /** boot 完成标志 — start() 之前 tickFrame() 不派发（ROM $801F Start 等待前不跑主循环） */
    private booted;
    constructor(store: DataStore, scheduler: Bank00SchedulerService, ppuTransfer: PpuTransferService);
    /** 注入外部委托（bank02 scene handler / 渲染原语） */
    attachHooks(hooks: MainLoopHooks): void;
    /** 启动主循环（boot init 完成后调用） */
    start(): void;
    /** 暂停主循环 */
    pause(): void;
    /** 是否已启动 */
    isRunning(): boolean;
    /**
     * 每帧 NMI 调用（InterruptService.nmi() 末尾）。
     *
     * ROM 行为（$8000）：
     *   LDA $0027; ASL; TAX; LDA $800E,X; PHA; LDA $800D,X; PHA; RTS
     *   → 读 $0027 status mode（0..4），间接跳转到 5 个 handler。
     *
     * H5 语义：$0027 & 0x07 → MainRouterService.dispatchByMode（mode ≥ 5 按 0 处理）
     */
    tickFrame(): void;
    /**
     * 注册 5 个 mode handler（PRG $800D dispatcher table 翻译）。
     * 构造时自动调用；外部无需手动触发。
     */
    autoRegisterDispatchActions(): void;
    /**
     * mode 0（$8165）：
     *   $0027 = 1 → $C56C → $8285（$0700=1 + 等1帧 + scene A00C）
     *   → $0026 > $00E4：$00E4 = $0026；$83FE[$0026] 非 0 → loadCfg + 清输入
     *   → 主循环
     */
    private mode0;
    /**
     * mode 1（$818A）：
     *   $0028 vs $0029 比较：
     *     - 相等 → 查 $83BA[$0026]：0 → scene advance；1 → mode4；其他 → mode2 + $C56C + $8285
     *     - 大于 → $8206（timer greater）
     *     - 小于 → scene advance
     *   → 主循环
     */
    private mode1;
    /** mode 2（$81AD）：$0027 = 3 → 主循环 */
    private mode2;
    /**
     * mode 3（$81B4）：
     *   $0028 vs $0029 比较：
     *     - 相等 → 查 $83BA[$0026] == 3 → mode4；
     *       $0026 == $20 → INC $0026；→ tail
     *     - 大于 → $8206；小于 → scene advance
     */
    private mode3;
    /**
     * mode 4（$81DA）：
     *   $0028 vs $0029：相等/小于 → scene advance；大于 → $8206
     */
    private mode4;
    /**
     * $81D4 共享出口：$0027 = 4 → 主循环（mode1/3 表值 1/3 命中时）
     */
    private setMode4AndLoop;
    /**
     * scene advance（$81E6）：
     *   A015 handler → loadCfg($60) → 清输入($82B5) → fade($99F0)
     *   → $0026 = $8398[$0026] → $C578 → tail($80FD)
     */
    private sceneAdvance81E6;
    /**
     * timer greater（$8206）：
     *   A012 handler → $00E0 bit6 未置位时：
     *     $0026 > $00E5 → $00E5 = $0026；$8420[$0026] 非 0 → loadCfg + 清输入 + $00E0 &= ~$40
     *   → $8442[$0026] 非 0 → loadCfg + 等指针清($82A9)
     *   → $0026 < $20：$0700=1 → $C578 → INC $0026 → A018 handler
     *     → $0026 ≥ 3 → $0446 = 5 → tail
     *   → $0026 ≥ $20：mode5 halt（$0027 = 5）
     */
    private timerGreater8206;
    /**
     * tail（$80FD）：
     *   清零 $0028/$0029/$0027 → $0700=1 → A20C handler → loadSceneData(0)
     *   → A006 handler → $C572 → $0700 = ($0026 ≥ $20 ? $4C : $55)
     *   → $0450-$0453 = 0 → A009 handler → $00E0 bit7 未置位且 $0026 > $00E4：
     *     $83DC[$0026] 非 0 → loadCfg + 清输入 + $00E0 &= ~$80 → 主循环
     */
    private tail80FD;
    /**
     * $8285（mode0/timer 路径公共）：
     *   $0700 = 1 → 等 1 帧（$9FA8）→ scene A00C handler
     *
     * H5：等 1 帧由帧循环自然保证；$0700 写 + A00C 委托
     */
    private jump8285;
    /**
     * $82B5 清输入：
     *   ROM：$4D/$4E 非 0 时等 B 键（$001E bit5）→ 清零 $0005/$0006/$0009/$000A/$0011/$0012/$000D/$000E/$004C
     *   → $0700=1 → $9BA0（scheduler reset）→ 清零 $0044/$0045/$007A/$007B
     *
     * H5：不做阻塞等键（帧循环提供节奏），立即执行清零副作用；B 键门控由 hooks 层决定。
     */
    private clearInput82B5;
    /**
     * $82A9 等指针清：ROM 等 $4D/$4E 归零。
     * H5：立即返回（cfg 装载由 loadCfgBlock 同步完成，$4D/$4E 由消费方管理）。
     */
    private waitPtrClear82A9;
    /** 主循环步进（$8019 JSR $C4B9 + JMP $A203 → bank02 scene dispatch） */
    private mainLoopStep;
    /**
     * boot Start 键等待（$801F-$804A）：
     *   $9BA0（scheduler reset）→ loadCfg(0) → 每帧等 1 帧 → $001E & $10（Start）按下前循环
     *   → 清零 $0005/$0006/$0009/$000A/$0011/$0012/$000D/$000E/$004C/$005B
     *   → $0700 = 1 → $001B bit0 置位则跳过 logo（$807A）
     *
     * @returns true = Start 已按下（可继续 logo/进入游戏）；false = 仍在等待
     */
    pollBootStartButton(): boolean;
    /**
     * boot logo 装载（$8053-$8090）：
     *   clearSprites($9B11) → 等 2 帧 → hideOam($9B7F) → clearNt($98A0) → 等 13 帧
     *   → $007B = 0 → loadChrConfig($17)($8AF7) → shiftSpriteY($30)($890C)
     *   → flipSpriteAttrs($88FB) → loadBgPaletteFull($9A35) → loadSceneData(0)($8920)
     *   → $0090=0 / $0091=2 → $001B &= ~1 → $00ED=$0A / $00E6=$0A / $00E7=$22
     *   → writeTitleRow($98EA: 127 bytes @ $0A22)
     *
     * @returns true = logo 装载完成（可进标题按键等待）
     */
    bootLogoLoad(): boolean;
    /**
     * 标题按键解码 + 进入游戏（$80A2-$80D4 + $826A）：
     *   每帧等 1 帧 → $001E & $3C（A/B/Select/Start）任意按下：
     *     - B（bit5 反转两次后 bit7）→ $00ED ^= $40
     *     - A（bit6）→ $001C & $C0 == $C0 → 进入游戏（A209，boot 完成）
     *     - 其他 → $00E6=$00ED / $00E7=$22 / NT 3 行填充 → 回标题循环
     *
     * @returns true = 进入游戏（可 start() 主循环）；false = 标题等待中
     */
    enterGame(): boolean;
    /**
     * 进入游戏衔接（$826A → $80FD tail）：
     *   A003 → A20F → A01B scene handlers → tail（进入 5-mode 主循环）
     */
    enterGameFinalize(): void;
    /** 音频/APU 准备（boot 期 BGM 装载委托，默认 no-op） */
    prepareAudio(): void;
    /** 等 N 帧（PRG `LDA #$XX; JSR $9FA8` 翻译）— 返回当前是否已到点 */
    waitIntroFrames(n: number): boolean;
    /** 表取值（越界返回 0，与 ROM 越界读 $00 语义一致） */
    private tbl;
    /** $0028 vs $0029 比较（-1 小于 / 0 相等 / 1 大于） */
    private cmp0028vs0029;
    /** loadCfg（PRG $8464 翻译）— 委托 PpuTransferService */
    private loadCfg;
    private bootPendingStart;
    private bootPendingLogo;
    private bootLogoStep0;
    private bootPendingEnter;
    private introWaitRemaining;
}
