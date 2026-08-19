"use strict";
/**
 * Boot & Init Service — 场景路由器 / 任务调度器 (Control 层)
 *
 * 【真实 ROM 调度机制 — 2026-08 逆向确认】
 *
 * 原始 ROM 没有单一的 gameState 字（boot.ts 旧注释里的 $062B 是臆造，
 * 反汇编无引用）。真实场景调度靠 **A 寄存器(任务索引) + $C400 分发器 + bank2 跳转表**：
 *
 *   RESET $FFF0 (Bank31)
 *     → JMP $C503 → JMP $C64E  (Bank30 初始化: SEI/CLD/设栈/清RAM/CLI)
 *     → JMP $CEFE              (MMC3+PPU 重置)
 *     → JMP $C400              (场景分发器, A=任务索引)
 *
 *   $C400 (Bank30): TAY(A→Y); 切 bank R6=0($8000=bank0)/R7=2($A000=bank2); TYA; JMP $A200
 *   $A200 (bank2):  JMP $A21B (入口0)
 *   $A21B (bank2):  LDX#$FF;TXS;PHA(存A);清屏;初始化; PLA(取A);
 *                   BEQ $8281 (A==0 路径) / A≠0 → $826D 设任务参数 → JMP $A292 → JMP $ED9E
 *
 *   NMI $C500 → JMP $C76E: 每帧渲染服务 (OAM DMA/PPU滚动/bank恢复, RTI@$C820), 不含游戏逻辑
 *
 * 场景切换 = 当前场景代码完成后, 设 A=下一任务索引, JMP $C400 重新分发。
 *
 * H5 转写: 无 MMC3/bank 切换, 用 TaskIndex 枚举 + dispatch() 模拟 $C400。
 * SceneRoot 枚举值 = A 寄存器任务索引的语义映射 (非 ROM 状态字)。
 *
 * 路由表 (TaskIndex → Service):
 *   BOOT     → 开场动画 (OpeningSceneController)
 *   TITLE    → 标题菜单 (KICK OFF / CONTINUE)
 *   PASSWORD → 密码输入 (TODO: Bank 02 entryC 密码逻辑)
 *   MEETING  → DataQueryService (Bank 01 选项屏幕)
 *   STORY    → 剧情 (TODO: Bank 18/19)
 *   MATCH    → MatchEngineService (Bank 26)
 *   RESULT   → 赛果 (TODO)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootService = exports.BOOT_KEYS = void 0;
const index_1 = require("./data/scene/index");
const scene_opening_controller_1 = require("./service/bank00/scene_opening.controller");
const title_scene_controller_1 = require("./service/bank00/title_scene.controller");
const bank18_story_service_1 = require("./service/bank18_story.service");
const types_1 = require("../core/types");
const paletteManager_1 = require("./data/ppu/pallete/paletteManager");
const bank00_result_controller_1 = require("./service/bank00_result.controller");
const bank02_password_service_1 = require("./service/bank02_password.service");
const match_config_1 = require("./data/match-config");
/** 游戏根状态（存 DataStore.ram 中） */
exports.BOOT_KEYS = {
    /** 当前顶层场景 */
    ROOT: 'boot_root',
    /** 开场镜头 */
    SHOT: 'boot_shot',
    /** 标题光标 */
    TITLE_CURSOR: 'boot_title_cursor',
    /** 赛果场景已确认 */
    RESULT_DONE: 'boot_result_done',
};
/** 模拟比赛时长 (帧) — FIXME(占位): 原版由 Bank00 主循环检测终场哨/比赛时钟, 此处帧守卫待对齐真实条件 (todo: 抠 bank2/bank26 终场检测) */
const MATCH_DURATION_FRAMES = 60 * 90; // ~90 秒 @60fps (占位, 后续按原版时钟对齐)
/** 协程槽位数 (对应 ROM 6 槽: ram_0001-$0018) */
const COROUTINE_SLOT_COUNT = 6;
class BootService {
    /**
     * 胜负→关卡回退逻辑 (2026-08 确认):
     *   赢 → 场次+1 (下一场), 最大6=决赛后通关
     *   输 → 回到上一个奇数关卡 (1赢2输→回1, 3输→回3, 偶数场输→回前一个奇数场)
     *   即: 输偶数场N → 回 N-1 (奇数); 输奇数场N → 回 N (自回, 重打)
     */
    _advanceRound(win) {
        if (win) {
            this._matchRound++;
            if (this._matchRound > 6) {
                // 通关 (决赛获胜) → CREDITS
                return index_1.SceneRoot.CREDITS;
            }
            return index_1.SceneRoot.LEVELUP; // 赢 → 升级 → 下一场 STORY→MEETING→MATCH
        }
        else {
            // 输: 偶数场回前一场, 奇数场自回
            if (this._matchRound % 2 === 0) {
                this._matchRound--; // 偶数场输 → 回前一个奇数场
            }
            // 奇数场输 → 自回 (不改变 _matchRound)
            return index_1.SceneRoot.LEVELUP; // 输也显示升级(经验) → 重打本场
        }
    }
    constructor(_store, _dataQuery, _matchEngine, _bank19, _bank20, _bank18, 
    /** Bank02 场景服务 — 供 PASSWORD 场景执行真实 $A484/$A4C0 初始化链 (可选注入) */
    _bank02) {
        this._store = _store;
        this._dataQuery = _dataQuery;
        this._matchEngine = _matchEngine;
        this._bank19 = _bank19;
        this._bank20 = _bank20;
        this._bank18 = _bank18;
        this._bank02 = _bank02;
        /** 当前镜头已过帧数 */
        this._shotFrame = 0;
        /** 比赛已进行帧数 (MATCH 守卫) */
        this._matchFrame = 0;
        /**
         * 协程槽表 — 对应 ROM bank0 $9EED 主循环的 ram_0001-$0018 (6槽)。
         * 每帧 _runCoroutineLoop 轮转所有非空槽, 推进协程。
         */
        this._slots = Array.from({ length: COROUTINE_SLOT_COUNT }, () => ({ gen: null, scene: index_1.SceneRoot.BOOT }));
        /** 上一帧按键（边沿检测，防止按键穿透场景） */
        this._prevButtons = 0;
        /** 当前关卡 (里约杯场次 1-6, 初始1) */
        this._matchRound = 1;
    }
    // ── 公开接口 ──
    /**
     * 完整初始化（对应 RESET 向量执行的逻辑）。
     *
     * 注意: 硬件初始化 (RAM 清零/NT 清零/OAM 清零/PPU 配置) 由
     * Bank30Service.init() 完成，此处只设置场景路由状态。
     */
    init() {
        // 1. 对应 Bank 30 硬件初始化 — 设定 RAM 默认值
        this._initRamDefaults();
        // 2. 对应 Bank 30 PPU 初始化 — paletteRAM 加载默认调色板
        (0, paletteManager_1.palReset)();
        // 3. 创建控制器
        this._title = new title_scene_controller_1.TitleSceneController();
        this._opening = new scene_opening_controller_1.OpeningSceneController(this._store);
        this._result = new bank00_result_controller_1.ResultController(this._store);
        this._password = new bank02_password_service_1.PasswordController(this._store);
        // 4. 进入 BOOT 场景 — 等价 JMP $C400 (A=0) → bank2 $A21B 加载初始协程 → JMP $9EED 主循环
        // H5: 启动 BOOT 协程到槽0 (协程模型, 对应 ram_0001 初始任务)
        this._spawnCoroutine(index_1.SceneRoot.BOOT);
        // 标题默认光标
        this._store.write(exports.BOOT_KEYS.TITLE_CURSOR, index_1.TitleMenu.KICKOFF);
    }
    /**
     * 每帧更新 — 协程调度主循环, 等价 ROM bank0 $9EED。
     * 遍历 _slots (对应 ram_0001-$0018 6槽), 每个非空槽调 gen.next(pressed) 推进一步。
     * 协程 yield 返回 SceneRoot = 请求切换场景 (spawn 新协程, 终止旧协程)。
     * 6槽遍历完即一帧结束 (对应 $9F04 等 NMI 帧同步)。
     */
    update(buttons, _frameCount) {
        // 上升沿检测：只响应本帧新按下的按键
        const pressed = buttons & ~this._prevButtons;
        this._prevButtons = buttons;
        let stateChanged = false;
        for (let i = 0; i < this._slots.length; i++) {
            const slot = this._slots[i];
            if (slot.gen === null)
                continue; // 空槽, 跳过 (对应 $9EF1 BEQ)
            const r = slot.gen.next(pressed); // 推进协程一步 (对应 $9F0F 恢复+RTS)
            if (r.done) {
                // 协程结束 → 若返回新场景则 spawn (对应协程完成切场景)
                if (typeof r.value === 'number') {
                    this._spawnCoroutine(r.value);
                    stateChanged = true;
                }
                this._slots[i] = { gen: null, scene: index_1.SceneRoot.BOOT }; // 清空槽
            }
            else if (typeof r.value === 'number') {
                // 协程 yield 返回场景标签 = 请求切换 (对应 JSR $9F69 让出 + 切换)
                this._spawnCoroutine(r.value);
                this._slots[i] = { gen: null, scene: index_1.SceneRoot.BOOT }; // 终止旧协程, 新协程接管
                stateChanged = true;
            }
        }
        return stateChanged;
    }
    /** 读取根场景 */
    getRoot() {
        const v = this._store.read(exports.BOOT_KEYS.ROOT);
        return v;
    }
    /** 读取当前开场镜头 */
    getShot() {
        const v = this._store.read(exports.BOOT_KEYS.SHOT);
        return v;
    }
    /** 获取标题光标 */
    getTitleCursor() {
        const v = this._store.read(exports.BOOT_KEYS.TITLE_CURSOR);
        return v;
    }
    /** 获取标题菜单显示状态 (View 层消费) */
    getTitleDisplayState() {
        if (!this._title)
            return null;
        return this._title.getDisplayState();
    }
    /** 获取开场显示状态 (View 层消费) */
    getOpeningDisplayState() {
        if (!this._opening)
            return null;
        return this._opening.getDisplayState();
    }
    /** 获取密码界面显示状态 (View 层消费, 写 NT/OAM) */
    getPasswordDisplayState() {
        if (!this._password)
            return null;
        if (this.getRoot() !== index_1.SceneRoot.PASSWORD)
            return null;
        return this._password.getDisplayState();
    }
    // ── 内部 ──
    /** 初始化默认 RAM 值（对应 Bank 30 硬件初始化部分） */
    _initRamDefaults() {
        const s = this._store;
        // 比赛状态初始值 (对应真实 ram 地址, 2026-08 反汇编确认)
        // ram_0060/0061: 比赛时钟 (低位/高位), ram_005E: 回合倒计时, ram_0072: 阶段倒计时
        // ram_0062: 比赛控制标志 (bit5=终场标志, bit7=暂停)
        s.write('ram_0060', 0); // 比赛时钟低位
        s.write('ram_0061', 0); // 比赛时钟高位
        s.write('ram_005E', 0); // 回合倒计时 (DEC ram_005E 归零→下一阶段)
        s.write('ram_0072', 0); // 阶段倒计时 (DEC ram_0072 归零→终场检测)
        s.write('ram_0062', 0); // 比赛控制标志
        s.write('ram_00ED', 0x0A); // 比赛/场景索引 (初始$0A开场, 比赛时=里约杯场次0-5)
        s.write('scoreA', 0);
        s.write('scoreB', 0);
        s.write('ballOwner', 0);
        s.write('ballX', 0);
        s.write('ballY', 0);
        // Bank 31 核心 RAM 默认值（从 bank31_analysis 提取）
        s.write('nearCount', 0); // $0600
        s.write('roundCount', 0); // $0613
        s.write('actionClock', 0x0A); // $0614
        s.write('bpmCounter', 0); // $0618
        // 控制器默认值
        s.write('ctrlStatus', 0); // $0516
        s.write('scrollDir', 0); // $0517
        s.write('animLock', 0); // $0515
        s.write('zoneFlag', 0xFF); // $062A
        // 暂停/清场标志
        s.write('pauseFlag', 0); // $062D
        // ZP 零页全部清零（对应 Bank 30 init 中 A2 00 循环）
        this._store.zp.fill(0);
    }
    // ── 协程调度核心 (对应 ROM bank0 $9EED 主循环 + $9F0F/$9F69 协程恢复/yield) ──
    /**
     * 启动场景协程到空槽 — 等价 ROM $C400→bank2 $A21B 任务加载器 (JSR $699F)。
     * 真实 ROM: 写 [栈SP][R6bank][R7bank][计数] 到 ram_0001+ 空槽, 初始化协程现场。
     * H5: 找第一个空槽(gen===null), 创建场景 Generator 装入。
     * @returns 槽号, -1 表满
     */
    _spawnCoroutine(scene) {
        for (let i = 0; i < this._slots.length; i++) {
            if (this._slots[i].gen === null) {
                const gen = this._makeCoroutine(scene);
                if (gen) {
                    this._slots[i] = { gen, scene };
                    this._writeRoot(scene); // 同步根场景标签 (View 层消费)
                    return i;
                }
                return -1;
            }
        }
        return -1;
    }
    /**
     * 创建场景协程 — 对应 ROM 各场景处理代码。
     * 协程每次 yield 对应 JSR $9F69 (让出 CPU 回主循环)。
     * yield 返回 SceneRoot = 请求切换场景; return SceneRoot = 协程完成切下一场景。
     * @param _buttons 帧按键 (yield 接收值)
     */
    *_makeCoroutine(scene) {
        switch (scene) {
            case index_1.SceneRoot.BOOT:
                return yield* this._bootCoroutine();
            case index_1.SceneRoot.TITLE:
                return yield* this._titleCoroutine();
            case index_1.SceneRoot.MEETING:
                return yield* this._meetingCoroutine();
            case index_1.SceneRoot.STORY:
                return yield* this._storyCoroutine();
            case index_1.SceneRoot.MATCH:
                return yield* this._matchCoroutine();
            case index_1.SceneRoot.RESULT:
                return yield* this._resultCoroutine();
            case index_1.SceneRoot.LEVELUP:
                return yield* this._levelupCoroutine();
            case index_1.SceneRoot.PASSWORD:
                return yield* this._passwordCoroutine();
            default:
                return; // CREDITS — TODO
        }
    }
    /**
     * PASSWORD 协程 — 密码输入 (Bank02 $A484 分发 + $A4C0 主逻辑)。
     * 真实入口: $A200 跳转表第7项 → $A484 → 按 ram_00ED 索引分发 → idx0 $A4C0。
     * 密码确认后切 TITLE (回标题) 或 STORY (续关)。
     */
    *_passwordCoroutine() {
        this._password.init(0); // idx0 = $A4C0 密码输入主逻辑
        // 真实 $A4C0 初始化链 (bank02 翻译): 字符表加载 + Cut 0x17 背景 NT + 滚动 + 调色板 + NT 块填充
        // 对应 $A200 → $A484 分发 (ram_00ED=0) → $A4C0 场景动画初始化
        if (this._bank02)
            this._bank02.entryF(0);
        for (;;) {
            const buttons = yield;
            const r = this._password.update(buttons);
            if (r === 'success') {
                // 密码成功 → STORY(续关剧情) → MEETING: 设 ram_00ED=$0A (赛前STORY后进 MEETING)
                this._store.write('ram_00ED', 0x0A);
                return index_1.SceneRoot.STORY;
            }
            // r === 'fail' | 'continue' → 留在密码界面 (原版失败有错误反馈, 待抠 $A4C0 后续)
        }
    }
    /** BOOT 协程 — 开场占位过渡, START 或超时切换 TITLE */
    *_bootCoroutine() {
        this._opening.initBoot();
        this._writeShot(index_1.OpeningShot.LOGO);
        this._shotFrame = 0;
        for (;;) {
            const buttons = yield;
            this._shotFrame++;
            this._opening.syncBootFrame(this._shotFrame);
            if ((buttons & types_1.BUTTON.START) || this._shotFrame >= BootService.SHOT_DURATION) {
                return index_1.SceneRoot.TITLE; // 切换到 TITLE (Cut 0x17 标题菜单)
            }
        }
    }
    /** TITLE 协程 — 标题菜单, 选项确认后切 MEETING/STORY/PASSWORD */
    *_titleCoroutine() {
        this._opening.init(); // Cut 0x17 标题菜单背景
        this._title.init();
        for (;;) {
            const buttons = yield;
            const selected = this._title.update(buttons);
            this._store.write(exports.BOOT_KEYS.TITLE_CURSOR, this._title.cursor);
            if (selected !== null) {
                // 真实流程: KICKOFF=新游戏→STORY(赛前剧情)→MEETING; CONTINUE=续关→PASSWORD
                if (selected === index_1.TitleMenu.KICKOFF)
                    return index_1.SceneRoot.STORY;
                if (selected === index_1.TitleMenu.CONTINUE)
                    return index_1.SceneRoot.PASSWORD;
            }
        }
    }
    /**
     * MEETING 协程 — 赛前会议 (说明书 MeetingMenu: 情報/スコアメモ/チームデータ/キックオフ)
     * 上下移光标, A 确认, キックオフ→STORY(进比赛), チームデータ→子菜单
     */
    *_meetingCoroutine() {
        this._dataQuery.initOptionScreen();
        for (;;) {
            const buttons = yield;
            // 写按键到 ram_001C (DataQueryService 读取)
            this._store.write('ram_001C', buttons);
            this._dataQuery.update(buttons, 0);
            // 检查主菜单确认: キックオフ(MeetingMenu.KICKOFF=3) → 进比赛
            const confirmed = this._dataQuery.getConfirmedMenu?.() ?? -1;
            if (confirmed === 3) { // MeetingMenu.KICKOFF
                this._store.write('ram_00ED', 0);
                return index_1.SceneRoot.STORY;
            }
            // FIXME: 真实会议4分支菜单(情報/スコアメモ/チームデータ/キックオフ)待补
            // 当前简化: START 直跳 STORY(赛前剧情) → MATCH
            if ((buttons & (types_1.BUTTON.START | types_1.BUTTON.A)) !== 0) {
                this._store.write('ram_00ED', 0);
                return index_1.SceneRoot.STORY;
            }
        }
    }
    /**
     * STORY 协程 — 剧情场景 (Bank18 驱动 Bank19)。
     * 结束去向取决于来源: KICKOFF→STORY→MEETING; MEETING→STORY→MATCH; 密码→STORY→MEETING。
     * 用 ram_00ED 区分: ram_00ED=$0A(开场)→MEETING; 其他→MATCH。
     * A/START 跳过, 或数据流结束自动切下一场景。
     */
    *_storyCoroutine() {
        this._bank18.enterChapter(bank18_story_service_1.StoryChapter.OPENING);
        this._matchFrame = 0;
        // 判断 STORY 后去向: 开场(ram_00ED=$0A)→MEETING, 比赛前→MATCH
        const isOpening = this._store.read('ram_00ED') === 0x0A;
        const nextScene = isOpening ? index_1.SceneRoot.MEETING : index_1.SceneRoot.MATCH;
        for (;;) {
            const buttons = yield;
            if ((buttons & (types_1.BUTTON.A | types_1.BUTTON.START)) !== 0) {
                this._bank18.skip();
                return nextScene;
            }
            const done = this._bank18.update(0);
            if (done)
                return nextScene;
        }
    }
    /**
     * MATCH 协程 — 比赛 (Bank26 引擎 + Bank20 辅助), 终场切 RESULT。
     *
     * 真实终场检测 (2026-08 反汇编, bank0 $8D0A-$8DC8):
     *   - ram_005E (回合倒计时) DEC 归零 → 下一阶段 ($8D1B)
     *   - ram_0072 (阶段倒计时) DEC 归零 → $8DC8 终场检测 ($8D81)
     *   - ram_0062 bit5 置位 → BNE $8DFC (终场分支) ($8DC8)
     *
     * ram_005E/ram_0072 初始值是数据驱动的 (bank0 $8B55:
     *   LDA (ram_0063),Y; STA ram_005E — ram_0063 指针由 ram_00ED 比赛索引
     *   算出, 指向 bank2 $A000+ 区比赛配置数据表)。
     * 当前用占位初始值 ($80/$04), 待 bank2 比赛配置数据表建模后替换。
     */
    *_matchCoroutine() {
        this._matchFrame = 0;
        // 比赛配置加载 (对应 bank0 $8B1C-$8B6F: ram_00ED 索引→bank7 指针表→配置数据)
        const matchIdx = this._store.read('ram_00ED') || 0;
        const cfg = (0, match_config_1.getMatchConfig)(matchIdx); // 一级配置字节 (二级指针链待运行时解析)
        void cfg; // FIXME: 二级指针链解析后, 从 cfg 提取 ram_005E(二级数据[3])/ram_0072 等
        // ram_005E/ram_0072 真实值依赖运行时多级指针 (二级指针 ram_0063/ram_0070 动态设置),
        // 静态无法精确提取 — 字段偏移: ram_005E=二级数据[3], ram_0072=ram_0070指针[Y]
        // 当前用占位常量, 待运行时指针链完整解析或模拟器对照后替换
        const RAM_005E_INIT = 0x80; // FIXME: 二级指针链解析后从 cfg 动态取 (偏移二级数据[3])
        const RAM_0072_INIT = 0x04; // FIXME: ram_0070 指针链解析后从 cfg 动态取
        this._store.write('ram_005E', RAM_005E_INIT);
        this._store.write('ram_0072', RAM_0072_INIT);
        this._store.write('ram_0062', 0);
        for (;;) {
            const _buttons = yield;
            this._matchEngine.mainLoop();
            this._bank20.frameTick();
            this._matchFrame++;
            // 模拟 bank0 比赛协程倒计时 (对应 $8D1B DEC ram_005E / $8D81 DEC ram_0072)
            // FIXME: matchEngine/bank20 真实实现后移除此模拟, 由引擎内部 DEC
            const r5E = this._store.read('ram_005E') || 0;
            const r72 = this._store.read('ram_0072') || 0;
            if (r5E > 0)
                this._store.write('ram_005E', r5E - 1);
            else if (r72 > 0) {
                this._store.write('ram_0072', r72 - 1);
                this._store.write('ram_005E', 0x80);
            }
            const r62 = this._store.read('ram_0062') || 0;
            // 真实终场: ram_005E==0 && ram_0072==0, 或 ram_0062 bit5; 降级帧守卫兜底
            if ((r5E === 0 && r72 === 0) || (r62 & 0x20) !== 0 || this._matchFrame >= MATCH_DURATION_FRAMES) {
                return index_1.SceneRoot.RESULT;
            }
        }
    }
    /**
     * RESULT 协程 — 赛果画面, 确认后按胜负分支:
     *   赢 → LEVELUP(升级) → 下一场(STORY→MEETING→MATCH)
     *   输 → LEVELUP(升级) → 回退关卡(偶数场回前一场, 奇数场自回) → 重打
     *   通关(决赛赢) → CREDITS
     */
    *_resultCoroutine() {
        this._matchFrame = 0;
        this._result.init();
        for (;;) {
            const buttons = yield;
            if (this._result.update(buttons, 0)) {
                const win = this._result.isWin();
                return this._advanceRound(win);
            }
        }
    }
    /** LEVELUP 协程 — 升级界面(每场后选手经验/升级), 确认后切下一场 STORY 或重打 */
    *_levelupCoroutine() {
        for (;;) {
            const buttons = yield;
            if ((buttons & (types_1.BUTTON.A | types_1.BUTTON.START)) !== 0) {
                // 升级确认 → 进 STORY(赛前剧情) → MEETING → MATCH (重打本场或下一场)
                return index_1.SceneRoot.STORY;
            }
        }
    }
    // ── 读写辅助 ──
    _readRoot() {
        return this._store.read(exports.BOOT_KEYS.ROOT);
    }
    _writeRoot(root) {
        this._store.write(exports.BOOT_KEYS.ROOT, root);
    }
    _writeShot(shot) {
        this._store.write(exports.BOOT_KEYS.SHOT, shot);
    }
}
exports.BootService = BootService;
/** 开场每镜头持续帧数 (真实 ROM: 开场动画约 4-5 秒后才能跳过, ~280-300帧) */
BootService.SHOT_DURATION = 300; // ~5 秒 @60fps
