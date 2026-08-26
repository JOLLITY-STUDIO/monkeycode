import { MainRouterService } from './MainRouterService';
// ──────────────────────────── 数据表（PRG bank00 声明式提取） ────────────────────────────
/**
 * PRG $8398：scene advance 目标表（$81FB `LDA $8398,X / STA $0026`）
 * 32 项，索引 = 当前 scene id（$0026）→ 下一 scene id
 */
const TABLE_8398 = [
    0x00, 0x00, 0x02, 0x02, 0x04, 0x04, 0x06, 0x06, 0x08, 0x08, 0x0a, 0x0a, 0x0c, 0x0c, 0x0e, 0x0e,
    0x10, 0x10, 0x12, 0x12, 0x14, 0x14, 0x16, 0x17, 0x17, 0x19, 0x19, 0x1b, 0x1b, 0x1d, 0x1d, 0x1f,
];
/**
 * PRG $83BA：scene display cmd 表（mode1 $8198 / mode3 $81C2 判定）
 * 0 = scene advance；1 = mode4；3 = mode4（mode3 分支）；其他 = mode2
 */
const TABLE_83BA = [
    0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x01, 0x01, 0x01, 0x01, 0x01, 0x03, 0x03, 0x03, 0x03, 0x03,
    0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x00, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03,
];
/**
 * PRG $83DC：tail cfg 表（$814F `LDA $83DC,X`，非 0 → loadCfg）
 */
const TABLE_83DC = [
    0x02, 0x00, 0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00, 0x0c, 0x0e, 0x00, 0x00, 0x10, 0x12,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x00, 0x00, 0x00, 0x00, 0x1e,
    0x20, 0x00, 0x00, 0x00,
];
/**
 * PRG $83FE：mode0 cfg 表（$817D `LDA $83FE,X`，非 0 → loadCfg）
 */
const TABLE_83FE = [
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0a, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x21, 0x00,
    0x03, 0x04, 0x05, 0x00,
];
/**
 * PRG $8420：$8206 首段 cfg 表（$821E `LDA $8420,X`，非 0 → loadCfg + 清输入）
 */
const TABLE_8420 = [
    0x05, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00, 0x0b, 0x0d, 0x00, 0x00, 0x00, 0x11, 0x00, 0x00, 0x14,
    0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x17, 0x00, 0x00, 0x1a, 0x1b, 0x1c, 0x1d, 0x1f, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
];
/**
 * PRG $8442：$8206 二段 cfg 表（$8232 `LDA $8442,X`，非 0 → loadCfg + $82A9 等指针清）
 */
const TABLE_8442 = [
    0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0x00, 0x00, 0x00, 0x13,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x15, 0x00, 0x00, 0x00, 0x00, 0x19, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x22, 0x22,
];
/**
 * Bank00MainLoopService — bank00 $8000 主循环 5-mode dispatcher（PRG $8000 翻译）
 *
 * 每帧调用链（InterruptService.nmi() 末尾）：
 *   tickFrame() → 读 $0027 → MainRouterService.dispatchByMode(mode) → 对应 handler
 */
export class Bank00MainLoopService {
    constructor(store, scheduler, ppuTransfer) {
        this.store = store;
        this.scheduler = scheduler;
        this.ppuTransfer = ppuTransfer;
        /** 外部委托（bank02 scene / 渲染原语），默认空实现 */
        this.hooks = {};
        /** boot 完成标志 — start() 之前 tickFrame() 不派发（ROM $801F Start 等待前不跑主循环） */
        this.booted = false;
        // ──────────────────────── boot 状态（内部） ────────────────────────
        this.bootPendingStart = false;
        this.bootPendingLogo = false;
        this.bootLogoStep0 = false;
        this.bootPendingEnter = false;
        this.introWaitRemaining = -1;
        this.router = new MainRouterService(store);
        this.autoRegisterDispatchActions();
    }
    // ──────────────────────── 生命周期 ────────────────────────
    /** 注入外部委托（bank02 scene handler / 渲染原语） */
    attachHooks(hooks) {
        this.hooks = { ...this.hooks, ...hooks };
    }
    /** 启动主循环（boot init 完成后调用） */
    start() {
        this.booted = true;
    }
    /** 暂停主循环 */
    pause() {
        this.booted = false;
    }
    /** 是否已启动 */
    isRunning() {
        return this.booted;
    }
    /**
     * 每帧 NMI 调用（InterruptService.nmi() 末尾）。
     *
     * ROM 行为（$8000）：
     *   LDA $0027; ASL; TAX; LDA $800E,X; PHA; LDA $800D,X; PHA; RTS
     *   → 读 $0027 status mode（0..4），间接跳转到 5 个 handler。
     *
     * H5 语义：$0027 & 0x07 → MainRouterService.dispatchByMode（mode ≥ 5 按 0 处理）
     */
    tickFrame() {
        if (!this.booted)
            return;
        const mode = this.store.readByte(0x0027) & 0x07;
        this.router.dispatchByMode((mode <= 4 ? mode : 0));
    }
    // ──────────────────────── dispatcher 表注册（$800D 5-entry） ────────────────────────
    /**
     * 注册 5 个 mode handler（PRG $800D dispatcher table 翻译）。
     * 构造时自动调用；外部无需手动触发。
     */
    autoRegisterDispatchActions() {
        this.router.registerDispatchAction(0, () => this.mode0());
        this.router.registerDispatchAction(1, () => this.mode1());
        this.router.registerDispatchAction(2, () => this.mode2());
        this.router.registerDispatchAction(3, () => this.mode3());
        this.router.registerDispatchAction(4, () => this.mode4());
    }
    // ──────────────────────── 5-mode handlers（$8165/$818A/$81AD/$81B4/$81DA） ────────────────────────
    /**
     * mode 0（$8165）：
     *   $0027 = 1 → $C56C → $8285（$0700=1 + 等1帧 + scene A00C）
     *   → $0026 > $00E4：$00E4 = $0026；$83FE[$0026] 非 0 → loadCfg + 清输入
     *   → 主循环
     */
    mode0() {
        const store = this.store;
        store.writeByte(0x0027, 0x01);
        // $C56C（IRQ helper）— H5 无 CPU 中断，省略
        this.jump8285();
        const s26 = store.readByte(0x0026);
        if (s26 > store.readByte(0x00e4)) {
            store.writeByte(0x00e4, s26);
            const cfg = this.tbl(TABLE_83FE, s26);
            if (cfg !== 0) {
                this.loadCfg(cfg);
                this.clearInput82B5();
            }
        }
        this.mainLoopStep();
    }
    /**
     * mode 1（$818A）：
     *   $0028 vs $0029 比较：
     *     - 相等 → 查 $83BA[$0026]：0 → scene advance；1 → mode4；其他 → mode2 + $C56C + $8285
     *     - 大于 → $8206（timer greater）
     *     - 小于 → scene advance
     *   → 主循环
     */
    mode1() {
        const store = this.store;
        const cmp = this.cmp0028vs0029();
        if (cmp === 0) {
            const v = this.tbl(TABLE_83BA, store.readByte(0x0026));
            if (v === 0) {
                this.sceneAdvance81E6();
            }
            else if (v === 1) {
                this.setMode4AndLoop();
            }
            else {
                store.writeByte(0x0027, 0x02);
                // $C56C — 省略
                this.jump8285();
                this.mainLoopStep();
            }
        }
        else if (cmp > 0) {
            this.timerGreater8206();
        }
        else {
            this.sceneAdvance81E6();
        }
    }
    /** mode 2（$81AD）：$0027 = 3 → 主循环 */
    mode2() {
        this.store.writeByte(0x0027, 0x03);
        this.mainLoopStep();
    }
    /**
     * mode 3（$81B4）：
     *   $0028 vs $0029 比较：
     *     - 相等 → 查 $83BA[$0026] == 3 → mode4；
     *       $0026 == $20 → INC $0026；→ tail
     *     - 大于 → $8206；小于 → scene advance
     */
    mode3() {
        const store = this.store;
        const cmp = this.cmp0028vs0029();
        if (cmp === 0) {
            const v = this.tbl(TABLE_83BA, store.readByte(0x0026));
            if (v === 3) {
                this.setMode4AndLoop();
            }
            else {
                if (store.readByte(0x0026) === 0x20) {
                    store.writeByte(0x0026, (store.readByte(0x0026) + 1) & 0xff);
                }
                this.tail80FD();
            }
        }
        else if (cmp > 0) {
            this.timerGreater8206();
        }
        else {
            this.sceneAdvance81E6();
        }
    }
    /**
     * mode 4（$81DA）：
     *   $0028 vs $0029：相等/小于 → scene advance；大于 → $8206
     */
    mode4() {
        const cmp = this.cmp0028vs0029();
        if (cmp > 0) {
            this.timerGreater8206();
        }
        else {
            this.sceneAdvance81E6();
        }
    }
    // ──────────────────────── 子流程（$81E6 advance / $8206 / $80FD tail / $8285 / $82B5） ────────────────────────
    /**
     * $81D4 共享出口：$0027 = 4 → 主循环（mode1/3 表值 1/3 命中时）
     */
    setMode4AndLoop() {
        this.store.writeByte(0x0027, 0x04);
        this.mainLoopStep();
    }
    /**
     * scene advance（$81E6）：
     *   A015 handler → loadCfg($60) → 清输入($82B5) → fade($99F0)
     *   → $0026 = $8398[$0026] → $C578 → tail($80FD)
     */
    sceneAdvance81E6() {
        const store = this.store;
        this.hooks.sceneHandlerA015?.();
        this.loadCfg(0x60);
        this.clearInput82B5();
        this.hooks.fadeOutAll?.();
        store.writeByte(0x0026, this.tbl(TABLE_8398, store.readByte(0x0026)) & 0xff);
        // $C578（IRQ helper）— H5 省略
        this.tail80FD();
    }
    /**
     * timer greater（$8206）：
     *   A012 handler → $00E0 bit6 未置位时：
     *     $0026 > $00E5 → $00E5 = $0026；$8420[$0026] 非 0 → loadCfg + 清输入 + $00E0 &= ~$40
     *   → $8442[$0026] 非 0 → loadCfg + 等指针清($82A9)
     *   → $0026 < $20：$0700=1 → $C578 → INC $0026 → A018 handler
     *     → $0026 ≥ 3 → $0446 = 5 → tail
     *   → $0026 ≥ $20：mode5 halt（$0027 = 5）
     */
    timerGreater8206() {
        const store = this.store;
        this.hooks.sceneHandlerA012?.();
        if ((store.readByte(0x00e0) & 0x40) === 0) {
            const s26 = store.readByte(0x0026);
            if (s26 > store.readByte(0x00e5)) {
                store.writeByte(0x00e5, s26);
                const cfg = this.tbl(TABLE_8420, s26);
                if (cfg !== 0) {
                    this.loadCfg(cfg);
                    this.clearInput82B5();
                    store.writeByte(0x00e0, store.readByte(0x00e0) & 0xbf);
                }
            }
        }
        const cfg2 = this.tbl(TABLE_8442, store.readByte(0x0026));
        if (cfg2 !== 0) {
            this.loadCfg(cfg2);
            this.waitPtrClear82A9();
        }
        if (store.readByte(0x0026) < 0x20) {
            store.writeByte(0x0700, 0x01);
            // $C578 — 省略
            store.writeByte(0x0026, (store.readByte(0x0026) + 1) & 0xff);
            this.hooks.sceneHandlerA018?.();
            if (store.readByte(0x0026) >= 0x03) {
                store.writeByte(0x0446, 0x05);
            }
            this.tail80FD();
        }
        else {
            // $8263: LDA #$05; STA $0027; JMP $C57B（mode5 halt — 等待外部 reset）
            store.writeByte(0x0027, 0x05);
        }
    }
    /**
     * tail（$80FD）：
     *   清零 $0028/$0029/$0027 → $0700=1 → A20C handler → loadSceneData(0)
     *   → A006 handler → $C572 → $0700 = ($0026 ≥ $20 ? $4C : $55)
     *   → $0450-$0453 = 0 → A009 handler → $00E0 bit7 未置位且 $0026 > $00E4：
     *     $83DC[$0026] 非 0 → loadCfg + 清输入 + $00E0 &= ~$80 → 主循环
     */
    tail80FD() {
        const store = this.store;
        store.writeByte(0x0028, 0x00);
        store.writeByte(0x0029, 0x00);
        store.writeByte(0x0027, 0x00);
        store.writeByte(0x0700, 0x01);
        this.hooks.sceneHandlerA20C?.();
        this.hooks.loadSceneData?.(0);
        this.hooks.sceneHandlerA006?.();
        // $C572 — 省略
        const s26 = store.readByte(0x0026);
        store.writeByte(0x0700, s26 >= 0x20 ? 0x4c : 0x55);
        store.writeByte(0x0450, 0x00);
        store.writeByte(0x0451, 0x00);
        store.writeByte(0x0452, 0x00);
        store.writeByte(0x0453, 0x00);
        this.hooks.sceneHandlerA009?.();
        if ((store.readByte(0x00e0) & 0x80) === 0) {
            const cfg = this.tbl(TABLE_83DC, s26);
            if (cfg !== 0) {
                this.loadCfg(cfg);
                this.clearInput82B5();
                store.writeByte(0x00e0, store.readByte(0x00e0) & 0x7f);
            }
        }
        this.mainLoopStep();
    }
    /**
     * $8285（mode0/timer 路径公共）：
     *   $0700 = 1 → 等 1 帧（$9FA8）→ scene A00C handler
     *
     * H5：等 1 帧由帧循环自然保证；$0700 写 + A00C 委托
     */
    jump8285() {
        this.store.writeByte(0x0700, 0x01);
        this.hooks.sceneHandlerA00C?.();
    }
    /**
     * $82B5 清输入：
     *   ROM：$4D/$4E 非 0 时等 B 键（$001E bit5）→ 清零 $0005/$0006/$0009/$000A/$0011/$0012/$000D/$000E/$004C
     *   → $0700=1 → $9BA0（scheduler reset）→ 清零 $0044/$0045/$007A/$007B
     *
     * H5：不做阻塞等键（帧循环提供节奏），立即执行清零副作用；B 键门控由 hooks 层决定。
     */
    clearInput82B5() {
        const store = this.store;
        store.writeByte(0x0005, 0x00);
        store.writeByte(0x0006, 0x00);
        store.writeByte(0x0009, 0x00);
        store.writeByte(0x000a, 0x00);
        store.writeByte(0x0011, 0x00);
        store.writeByte(0x0012, 0x00);
        store.writeByte(0x000d, 0x00);
        store.writeByte(0x000e, 0x00);
        store.writeByte(0x004c, 0x00);
        store.writeByte(0x0700, 0x01);
        this.scheduler.clearAll();
        store.writeByte(0x0044, 0x00);
        store.writeByte(0x0045, 0x00);
        store.writeByte(0x007a, 0x00);
        store.writeByte(0x007b, 0x00);
    }
    /**
     * $82A9 等指针清：ROM 等 $4D/$4E 归零。
     * H5：立即返回（cfg 装载由 loadCfgBlock 同步完成，$4D/$4E 由消费方管理）。
     */
    waitPtrClear82A9() {
        // $4D/$4E 指针由 cfg 消费方（PpuTransferService.loadCfgBlock）同步管理，无需阻塞
    }
    /** 主循环步进（$8019 JSR $C4B9 + JMP $A203 → bank02 scene dispatch） */
    mainLoopStep() {
        this.hooks.sceneMainLoopStep?.();
    }
    // ──────────────────────── boot 链（$801F-$80D3，供 Tsubasa2 接入） ────────────────────────
    /**
     * boot Start 键等待（$801F-$804A）：
     *   $9BA0（scheduler reset）→ loadCfg(0) → 每帧等 1 帧 → $001E & $10（Start）按下前循环
     *   → 清零 $0005/$0006/$0009/$000A/$0011/$0012/$000D/$000E/$004C/$005B
     *   → $0700 = 1 → $001B bit0 置位则跳过 logo（$807A）
     *
     * @returns true = Start 已按下（可继续 logo/进入游戏）；false = 仍在等待
     */
    pollBootStartButton() {
        const store = this.store;
        if (!this.bootPendingStart) {
            this.scheduler.clearAll();
            this.loadCfg(0);
            this.bootPendingStart = true;
        }
        if ((store.readByte(0x001e) & 0x10) === 0)
            return false;
        this.bootPendingStart = false;
        store.writeByte(0x0005, 0x00);
        store.writeByte(0x0006, 0x00);
        store.writeByte(0x0009, 0x00);
        store.writeByte(0x000a, 0x00);
        store.writeByte(0x0011, 0x00);
        store.writeByte(0x0012, 0x00);
        store.writeByte(0x000d, 0x00);
        store.writeByte(0x000e, 0x00);
        store.writeByte(0x004c, 0x00);
        store.writeByte(0x005b, 0x00);
        store.writeByte(0x0700, 0x01);
        this.bootPendingLogo = (store.readByte(0x001b) & 0x01) === 0;
        return true;
    }
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
    bootLogoLoad() {
        const store = this.store;
        if (!this.bootPendingLogo)
            return true;
        if (!this.bootLogoStep0) {
            this.bootLogoStep0 = true;
            this.hooks.clearSprites?.();
            this.hooks.hideOam?.();
            this.hooks.clearNt?.();
            this.hooks.loadChrConfig?.(0x17);
            this.hooks.shiftSpriteY?.(0x30);
            this.hooks.flipSpriteAttrs?.();
            this.hooks.loadBgPaletteFull?.();
        }
        this.hooks.loadSceneData?.(0);
        store.writeByte(0x0090, 0x00);
        store.writeByte(0x0091, 0x02);
        store.writeByte(0x001b, store.readByte(0x001b) & 0xfe);
        store.writeByte(0x00ed, 0x0a);
        store.writeByte(0x00e6, 0x0a);
        store.writeByte(0x00e7, 0x22);
        this.hooks.writeTitleRow?.();
        this.bootPendingLogo = false;
        return true;
    }
    /**
     * 标题按键解码 + 进入游戏（$80A2-$80D4 + $826A）：
     *   每帧等 1 帧 → $001E & $3C（A/B/Select/Start）任意按下：
     *     - B（bit5 反转两次后 bit7）→ $00ED ^= $40
     *     - A（bit6）→ $001C & $C0 == $C0 → 进入游戏（A209，boot 完成）
     *     - 其他 → $00E6=$00ED / $00E7=$22 / NT 3 行填充 → 回标题循环
     *
     * @returns true = 进入游戏（可 start() 主循环）；false = 标题等待中
     */
    enterGame() {
        const store = this.store;
        const buttons = store.readByte(0x001e) & 0x3c;
        if (buttons === 0)
            return false;
        let decoded = buttons;
        decoded = (decoded << 2) & 0xff;
        if ((decoded & 0x80) !== 0) {
            // B 按下 → 标题翻转（$00ED ^= $40）+ 3 行 NT 填充 → 回标题
            store.writeByte(0x00ed, store.readByte(0x00ed) ^ 0x40);
            store.writeByte(0x00e6, store.readByte(0x00ed));
            store.writeByte(0x00e7, 0x22);
            // $98E8 NT fill（3 行 @ $0A22）— 委托渲染原语
            this.hooks.writeTitleRow?.();
            return false;
        }
        decoded = (decoded << 1) & 0xff;
        if ((decoded & 0x80) !== 0) {
            // A 按下 → 检查 $001C & $C0 == $C0 → 进入游戏（$A209）
            if ((store.readByte(0x001c) & 0xc0) === 0xc0) {
                this.bootPendingEnter = true;
                return true;
            }
        }
        store.writeByte(0x00e6, store.readByte(0x00ed));
        store.writeByte(0x00e7, 0x22);
        this.hooks.writeTitleRow?.();
        return false;
    }
    /**
     * 进入游戏衔接（$826A → $80FD tail）：
     *   A003 → A20F → A01B scene handlers → tail（进入 5-mode 主循环）
     */
    enterGameFinalize() {
        this.hooks.sceneHandlerA006?.();
        this.hooks.sceneHandlerA20C?.();
        this.hooks.sceneHandlerA009?.();
        this.tail80FD();
    }
    /** 音频/APU 准备（boot 期 BGM 装载委托，默认 no-op） */
    prepareAudio() {
        this.hooks.prepareAudio?.();
    }
    /** 等 N 帧（PRG `LDA #$XX; JSR $9FA8` 翻译）— 返回当前是否已到点 */
    waitIntroFrames(n) {
        if (this.introWaitRemaining < 0) {
            this.introWaitRemaining = n & 0xff;
            return false;
        }
        if (this.introWaitRemaining > 0) {
            this.introWaitRemaining = (this.introWaitRemaining - 1) & 0xff;
            return this.introWaitRemaining === 0;
        }
        return true;
    }
    // ──────────────────────── 内部工具 ────────────────────────
    /** 表取值（越界返回 0，与 ROM 越界读 $00 语义一致） */
    tbl(table, idx) {
        return (table[idx & 0xff] ?? 0) & 0xff;
    }
    /** $0028 vs $0029 比较（-1 小于 / 0 相等 / 1 大于） */
    cmp0028vs0029() {
        const a = this.store.readByte(0x0028);
        const b = this.store.readByte(0x0029);
        if (a === b)
            return 0;
        return a > b ? 1 : -1;
    }
    /** loadCfg（PRG $8464 翻译）— 委托 PpuTransferService */
    loadCfg(cfgId) {
        this.ppuTransfer.loadCfgBlock(cfgId & 0xff);
    }
}
