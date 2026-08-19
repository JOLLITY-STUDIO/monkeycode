"use strict";
/**
 * Match Engine Service — Bank 26 (数据已直接 import, 无 MMC3 切换)
 *
 * 比赛核心引擎: 主循环、球员 AI、开球/门球/角球、球员替换、
 * 事件分发、数值计算、经验/能力计算、任意球、射门、必杀技、战术/阵型菜单。
 *
 * 逻辑直接翻译自 bank_26.asm,
 * 数据来自 `data/bank26-tables.ts`。
 *
 * 原始入口跳转表 ($8000):
 *   [0]  $803C  主比赛循环
 *   [1]  $84F8  开球/边线球
 *   [2]  $86F6  门球/角球
 *   [3]  $82FC  球员 AI 决策 (防守方)
 *   [4]  $83A2  球员 AI 决策 (进攻方)
 *   [5]  $8835  球员替换 (主队)
 *   [6]  $888D  球员替换 (客队)
 *   [7]  $88F3  比赛状态初始化
 *   [8]  $8978  阶段处理
 *   [9]  $8BDF  事件处理
 *   [10] $8CA4  球位置调整
 *   [11] $8D06  数值计算
 *   [12] $8EE9  经验计算
 *   [13] $8F72  能力计算
 *   [14] $911C  任意球/掷球
 *   [15] $92EE  射门
 *   [16] $9470  操作选择菜单
 *   [17] $95E1  战术调整
 *   [18] $9731  阵型编辑
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchEngineService = exports.PHASE_CORNER = exports.PHASE_GOAL = exports.PHASE_PLAY = exports.PHASE_KICKOFF = void 0;
const bank26_tables_1 = require("../data/bank26-tables");
// ═══════════════════════════════════════════════════════════════
// RAM 语义键 (替代 NES 内存地址)
// ═══════════════════════════════════════════════════════════════
// $043B-$044E 比赛配置区
const KEY_043B = 'ram_043B'; // 当前模式/阶段
const KEY_043C = 'ram_043C'; // 子状态
const KEY_043D = 'ram_043D'; // 球员位置/阵型索引
const KEY_043E = 'ram_043E'; // 球员状态
const KEY_0441 = 'ram_0441'; // 当前球员 ID (0-21)
const KEY_0442 = 'ram_0442'; // 当前球员 ID (带偏移)
const KEY_044E = 'ram_044E'; // 全局偏移/标志
// $05FB-$0638 比赛运行区
const KEY_05FB = 'ram_05FB'; // 控球方/进攻方向 (0=home, 11=away)
const KEY_05FC = 'ram_05FC'; // 目标球员 ID
const KEY_05FE = 'ram_05FE'; // 区域编码
const KEY_0600 = 'ram_0600'; // 场上活跃球员数
const KEY_0601 = 'ram_0601'; // 球员 ID 数组基址
const KEY_0606 = 'ram_0606'; // 球员状态数组基址
const KEY_060B = 'ram_060B'; // 球员位置数组基址
const KEY_0612 = 'ram_0612'; // 事件/动作 ID
const KEY_0616 = 'ram_0616'; // 当前处理索引
const KEY_0617 = 'ram_0617'; // 处理标志
const KEY_0619 = 'ram_0619'; // 经验值
const KEY_061A = 'ram_061A'; // 随机数/时限
const KEY_061B = 'ram_061B'; // 阶段标志
const KEY_061C = 'ram_061C'; // 16bit 值 lo (经验)
const KEY_061D = 'ram_061D'; // 16bit 值 hi
const KEY_061E = 'ram_061E'; // 区域索引
const KEY_0621 = 'ram_0621'; // 比赛模式
const KEY_0624 = 'ram_0624'; // 菜单/光标状态 1
const KEY_0625 = 'ram_0625'; // 菜单/光标状态 2
const KEY_0626 = 'ram_0626'; // 菜单/光标状态 3
const KEY_0627 = 'ram_0627'; // 菜单/光标状态 4
const KEY_0628 = 'ram_0628'; // 区域检查结果
const KEY_062B = 'ram_062B'; // 数值 A
const KEY_062C = 'ram_062C'; // 数值 B
const KEY_062D = 'ram_062D'; // 暂停/锁定标志
const KEY_0635 = 'ram_0635'; // 球坐标 X (带符号)
const KEY_0637 = 'ram_0637'; // 球坐标 Y (带符号)
const KEY_0638 = 'ram_0638'; // 区域编码
// 零页
const KEY_001C = 'ram_001C'; // 输入状态 1
const KEY_001E = 'ram_001E'; // 输入状态 2
const KEY_0028 = 'ram_0028'; // 菜单/选择状态
const KEY_0029 = 'ram_0029';
const KEY_002A = 'ram_002A';
const KEY_002B = 'ram_002B';
const KEY_002C = 'ram_002C';
const KEY_002D = 'ram_002D';
const KEY_0032 = 'ram_0032'; // 临时/指针 lo
const KEY_0033 = 'ram_0033'; // 临时/指针 hi
const KEY_0034 = 'ram_0034'; // 间接指针 lo
const KEY_0035 = 'ram_0035'; // 间接指针 hi
const KEY_00E2 = 'ram_00E2'; // 随机数 lo
const KEY_00E3 = 'ram_00E3'; // 随机数 hi
// 调用者传入参数 (对应 NES X/Y 寄存器)
const KEY_CALL_X = 'ram_call_x';
const KEY_CALL_Y = 'ram_call_y';
// ═══════════════════════════════════════════════════════════════
// 常量
// ═══════════════════════════════════════════════════════════════
/** 场上球员槽位大小 (ID/状态/位置各一字节) */
const SLOT_COUNT = 11;
/** 球员数据记录长度 (Bank29 球员属性表, 每球员 7B) */
const PLAYER_REC_SIZE = 7;
/** 阵型表 $9EB7: 每阵型 8B */
const FORMATION_SIZE = 8;
/** 比赛阶段 */
exports.PHASE_KICKOFF = 0;
exports.PHASE_PLAY = 1;
exports.PHASE_GOAL = 2;
exports.PHASE_CORNER = 3;
// ═══════════════════════════════════════════════════════════════
// Match Engine Service
// ═══════════════════════════════════════════════════════════════
class MatchEngineService {
    constructor(_store) {
        this._store = _store;
    }
    // ──────────────────────────────────────────────
    // $8000: 入口跳转表
    // ──────────────────────────────────────────────
    /** 对应原始 $8000 跳转表 (19 个入口) */
    dispatch(index) {
        switch (index) {
            case 0:
                this.mainLoop();
                break; // $803C
            case 1:
                this.kickoff();
                break; // $84F8
            case 2:
                this.goalkeeperAction();
                break; // $86F6
            case 3:
                this.playerAIDefend();
                break; // $82FC
            case 4:
                this.playerAIAttack();
                break; // $83A2
            case 5:
                this.substituteHome();
                break; // $8835
            case 6:
                this.substituteAway();
                break; // $888D
            case 7:
                this.initMatchState();
                break; // $88F3
            case 8:
                this.matchPhaseHandler();
                break; // $8978
            case 9:
                this.dispatchEvent();
                break; // $8BDF
            case 10:
                this.adjustBallPosition();
                break; // $8CA4
            case 11:
                this.calculateValue();
                break; // $8D06
            case 12:
                this.calculateExp();
                break; // $8EE9
            case 13:
                this.calculateAbility();
                break; // $8F72
            case 14:
                this.freeKick();
                break; // $911C
            case 15:
                this.shootStart();
                break; // $92EE
            case 16:
                this.actionSelect();
                break; // $9470
            case 17:
                this.tacticsAdjust();
                break; // $95E1
            case 18:
                this.formationEdit();
                break; // $9731
        }
    }
    // ──────────────────────────────────────────────
    // $803C: 主比赛循环
    // ──────────────────────────────────────────────
    /** 对应 $803C-$81DC: 每帧主循环 */
    mainLoop() {
        const s = this._store;
        // $803C: 初始化阶段标志
        s.write(KEY_0621, 0);
        s.write(KEY_044E, 0);
        // 清除比赛状态
        this._clearMatchFlags();
        // 等待/同步 (H5: 直接执行)
        this._waitSync(0);
        // 处理场上每个球员
        const count = s.read(KEY_0600) & 0xFF;
        for (let i = 0; i < count && i < 44; i++) {
            s.write(KEY_0616, i);
            s.write(KEY_0441, this._readArr(KEY_0601, i));
            this._processPlayer(i);
        }
        // 事件分发
        const eventId = s.read(KEY_0612) & 0xFF;
        if (eventId !== 0) {
            this.dispatchEvent();
        }
        // 检查阶段切换
        this._checkPhaseChange();
    }
    /**
     * 比赛是否结束 (供 boot MATCH 守卫调用)。
     * 原版由 Bank00 主循环检测终场哨/比赛时钟; 此 stub 返回 false,
     * 实际结束由 boot 的帧计数守卫触发 (后续按原版时钟对齐此处)。
     */
    isMatchOver() {
        return false;
    }
    /** $8045 附近: 处理单个球员 */
    _processPlayer(idx) {
        const s = this._store;
        const id = this._readArr(KEY_0601, idx);
        const state = this._readArr(KEY_0606, idx);
        // 跳过空槽位
        if (id === 0)
            return;
        // 根据状态选择行为
        switch (state & 0x07) {
            case 0:
                this._idleBehavior(idx);
                break;
            case 1:
                this._moveToBall(idx);
                break;
            case 2:
                this._chasePlayer(idx);
                break;
            case 3:
                this._holdAndDribble(idx);
                break;
            case 4:
                this._passBall(idx);
                break;
            case 5:
                this._shootTry(idx);
                break;
            default:
                this._idleBehavior(idx);
                break;
        }
        // 位置更新
        this._updatePosition(idx);
    }
    // ──────────────────────────────────────────────
    // $82FC / $83A2: 球员 AI 决策
    // ──────────────────────────────────────────────
    /** 对应 $82FC-$83A1: 防守方 AI */
    playerAIDefend() {
        const s = this._store;
        const id = this._readArr(KEY_0601, s.read(KEY_0616) & 0xFF);
        s.write(KEY_0441, id);
        // 检查是否控球方
        const ballOwner = s.read(KEY_05FC) & 0xFF;
        if (id === ballOwner) {
            this._holdAndDribble(s.read(KEY_0616) & 0xFF);
            return;
        }
        // 朝球方向移动
        this._moveToBall(s.read(KEY_0616) & 0xFF);
        // 靠近后尝试抢断
        const dist = this._distanceToBall(id);
        if (dist < 0x20) {
            this._tackleAttempt(id);
        }
    }
    /** 对应 $83A2-$83F4: 进攻方 AI */
    playerAIAttack() {
        const s = this._store;
        const id = this._readArr(KEY_0601, s.read(KEY_0616) & 0xFF);
        s.write(KEY_0441, id);
        const ballOwner = s.read(KEY_05FC) & 0xFF;
        if (id === ballOwner) {
            // 控球: 评估射门/传球
            const zone = this._coordToZone(s.read(KEY_0635) & 0xFF, s.read(KEY_0637) & 0xFF);
            if (zone >= 0x10) {
                this._shootTry(s.read(KEY_0616) & 0xFF);
            }
            else {
                // 找空位队友传球
                this._findOpenTeammate(id);
            }
            return;
        }
        // 无球跑位
        this._moveToOpen(id);
    }
    /** 控球/盘带 */
    _holdAndDribble(idx) {
        const s = this._store;
        const id = this._readArr(KEY_0601, idx);
        // 更新控球标记
        s.write(KEY_05FC, id);
        // 盘带方向: 朝对方球门
        const dir = (s.read(KEY_05FB) & 0xFF) === 0 ? 1 : 5;
        const bx = s.read(KEY_0635) & 0xFF;
        const by = s.read(KEY_0637) & 0xFF;
        s.write(KEY_0635, (bx + this._dirDx(dir)) & 0xFF);
        s.write(KEY_0637, (by + this._dirDy(dir)) & 0xFF);
    }
    /** 朝球移动 */
    _moveToBall(idx) {
        const s = this._store;
        const id = this._readArr(KEY_0601, idx);
        const px = this._readArr(KEY_060B, idx * 2);
        const py = this._readArr(KEY_060B, idx * 2 + 1);
        const bx = s.read(KEY_0635) & 0xFF;
        const by = s.read(KEY_0637) & 0xFF;
        const dx = (bx - px) & 0xFF;
        const dy = (by - py) & 0xFF;
        // 简单追逐: 每次移动 1 格
        this._writeArr(KEY_060B, idx * 2, (px + Math.sign(this._signed(dx))) & 0xFF);
        this._writeArr(KEY_060B, idx * 2 + 1, (py + Math.sign(this._signed(dy))) & 0xFF);
        void id;
    }
    /** 追踪指定球员 */
    _chasePlayer(idx) {
        const s = this._store;
        const target = s.read(KEY_05FC) & 0xFF;
        const tIdx = this._findPlayerIndex(target);
        if (tIdx < 0) {
            this._idleBehavior(idx);
            return;
        }
        this._moveToBall(tIdx);
    }
    /** 传球 */
    _passBall(idx) {
        const s = this._store;
        const id = this._readArr(KEY_0601, idx);
        const target = s.read(KEY_05FC) & 0xFF;
        // 移动球朝向目标
        const tIdx = this._findPlayerIndex(target);
        if (tIdx < 0)
            return;
        const tx = this._readArr(KEY_060B, tIdx * 2);
        const ty = this._readArr(KEY_060B, tIdx * 2 + 1);
        const bx = s.read(KEY_0635) & 0xFF;
        const by = s.read(KEY_0637) & 0xFF;
        const dx = (tx - bx) & 0xFF;
        const dy = (ty - by) & 0xFF;
        s.write(KEY_0635, (bx + Math.sign(this._signed(dx))) & 0xFF);
        s.write(KEY_0637, (by + Math.sign(this._signed(dy))) & 0xFF);
        // 到达目标则转移控球
        if (Math.abs(this._signed(dx)) <= 1 && Math.abs(this._signed(dy)) <= 1) {
            s.write(KEY_05FC, target);
            s.write(KEY_0612, 2); // 传球事件
        }
        void id;
    }
    /** 射门尝试 */
    _shootTry(idx) {
        const s = this._store;
        s.write(KEY_0612, 5); // 射门事件
        this.shootStart();
    }
    /** 空闲行为 */
    _idleBehavior(idx) {
        // 返回阵型位置附近
        const s = this._store;
        const id = this._readArr(KEY_0601, idx);
        const home = this._formationSlotFor(id);
        if (home < 0)
            return;
        const hx = this._readArr(KEY_060B, home * 2);
        const hy = this._readArr(KEY_060B, home * 2 + 1);
        const px = this._readArr(KEY_060B, idx * 2);
        const py = this._readArr(KEY_060B, idx * 2 + 1);
        const dx = (hx - px) & 0xFF;
        const dy = (hy - py) & 0xFF;
        if (Math.abs(this._signed(dx)) > 4 || Math.abs(this._signed(dy)) > 4) {
            this._writeArr(KEY_060B, idx * 2, (px + Math.sign(this._signed(dx))) & 0xFF);
            this._writeArr(KEY_060B, idx * 2 + 1, (py + Math.sign(this._signed(dy))) & 0xFF);
        }
    }
    /** 寻找空位跑位 */
    _moveToOpen(id) {
        const s = this._store;
        const idx = this._findPlayerIndex(id);
        if (idx < 0)
            return;
        // 向进攻方向移动
        const dir = (s.read(KEY_05FB) & 0xFF) === 0 ? 1 : 5;
        const px = this._readArr(KEY_060B, idx * 2);
        const py = this._readArr(KEY_060B, idx * 2 + 1);
        this._writeArr(KEY_060B, idx * 2, (px + this._dirDx(dir)) & 0xFF);
        this._writeArr(KEY_060B, idx * 2 + 1, (py + this._dirDy(dir)) & 0xFF);
    }
    /** 抢断尝试 */
    _tackleAttempt(id) {
        const s = this._store;
        const rnd = this._rand();
        const ability = this._playerStat(id, 3); // 抢断能力
        if ((rnd & 0x7F) < (ability & 0x7F)) {
            s.write(KEY_05FC, id); // 抢断成功
            s.write(KEY_0612, 3); // 抢断事件
        }
    }
    /** 找空位队友 */
    _findOpenTeammate(id) {
        const s = this._store;
        const count = s.read(KEY_0600) & 0xFF;
        const side = this._sideOf(id);
        let best = -1;
        let bestScore = 0;
        for (let i = 0; i < count && i < 44; i++) {
            const pid = this._readArr(KEY_0601, i);
            if (pid === 0 || pid === id)
                continue;
            if (this._sideOf(pid) !== side)
                continue;
            const px = this._readArr(KEY_060B, i * 2);
            const py = this._readArr(KEY_060B, i * 2 + 1);
            // 进攻方向上的队友优先
            const score = side === 0 ? px : (255 - px);
            if (score > bestScore) {
                bestScore = score;
                best = pid;
            }
            void py;
        }
        if (best > 0) {
            s.write(KEY_05FC, best);
            s.write(KEY_0612, 1); // 传球意向
        }
    }
    // ──────────────────────────────────────────────
    // $84F8: 开球/边线球
    // ──────────────────────────────────────────────
    /** 对应 $84F8-$85AB: 开球/边线球 */
    kickoff() {
        const s = this._store;
        const x = s.read(KEY_CALL_X) & 0xFF;
        // 根据 X 参数选择开球模式
        // 0: 中圈开球, 1: 边线掷球
        if (x === 1) {
            this._throwIn();
            return;
        }
        // 开球: 将球放到中圈, 指定控球方
        const side = s.read(KEY_05FB) & 0xFF;
        s.write(KEY_0635, 0x40);
        s.write(KEY_0637, 0x30);
        s.write(KEY_05FC, this._kickoffTaker(side));
        s.write(KEY_0612, 0);
        s.write(KEY_043B, exports.PHASE_PLAY);
    }
    /** 边线掷球 ($858A 附近) */
    _throwIn() {
        const s = this._store;
        const side = s.read(KEY_05FB) & 0xFF;
        const id = s.read(KEY_0441) & 0xFF;
        // 掷球球员持球, 稍后传球
        s.write(KEY_05FC, id);
        s.write(KEY_0612, 1);
        const bx = s.read(KEY_0635) & 0xFF;
        const by = s.read(KEY_0637) & 0xFF;
        s.write(KEY_0635, bx);
        s.write(KEY_0637, by);
        s.write(KEY_043B, exports.PHASE_PLAY);
    }
    // ──────────────────────────────────────────────
    // $86F6: 门球/角球
    // ──────────────────────────────────────────────
    /** 对应 $86F6-$882E: 门将处理/门球 */
    goalkeeperAction() {
        const s = this._store;
        const x = s.read(KEY_CALL_X) & 0xFF;
        // 门将接球后开大脚
        const side = s.read(KEY_05FB) & 0xFF;
        const gk = this._goalkeeperOf(side);
        s.write(KEY_05FC, gk);
        // 门球目标: 前场球员
        const target = this._forwardOf(side);
        s.write(KEY_05FC, target);
        s.write(KEY_0612, 1); // 传球
        s.write(KEY_043B, exports.PHASE_PLAY);
        void x;
    }
    // ──────────────────────────────────────────────
    // $8835 / $888D: 球员替换
    // ──────────────────────────────────────────────
    /** 对应 $8835-$888C: 主队球员替换 */
    substituteHome() {
        const s = this._store;
        const out = s.read(KEY_0441) & 0xFF;
        const inn = s.read(KEY_0442) & 0xFF;
        this._swapPlayers(out, inn);
        s.write(KEY_043B, exports.PHASE_PLAY);
    }
    /** 对应 $888D-$88F2: 客队球员替换 */
    substituteAway() {
        const s = this._store;
        const out = s.read(KEY_0441) & 0xFF;
        const inn = s.read(KEY_0442) & 0xFF;
        this._swapPlayers(out + 11, inn + 11);
        s.write(KEY_043B, exports.PHASE_PLAY);
    }
    /** 交换两名球员的场上槽位 */
    _swapPlayers(a, b) {
        const s = this._store;
        const count = s.read(KEY_0600) & 0xFF;
        let idxA = this._findPlayerIndex(a);
        let idxB = this._findPlayerIndex(b);
        // 若目标在场, 交换 ID
        if (idxA >= 0 && idxB >= 0) {
            this._writeArr(KEY_0601, idxA, b);
            this._writeArr(KEY_0601, idxB, a);
            return;
        }
        // 若新球员不在场, 顶替离场球员
        if (idxA >= 0 && idxB < 0) {
            this._writeArr(KEY_0601, idxA, b);
        }
        void count;
    }
    // ──────────────────────────────────────────────
    // $88F3: 比赛状态初始化
    // ──────────────────────────────────────────────
    /** 对应 $88F3-$8977: 初始化比赛状态 */
    initMatchState() {
        const s = this._store;
        const side = s.read(KEY_05FB) & 0xFF;
        // 场上球员列表初始化
        const base = side === 0 ? 0 : 11;
        for (let i = 0; i < SLOT_COUNT; i++) {
            this._writeArr(KEY_0601, i + base, i + 1);
            this._writeArr(KEY_0606, i + base, 0);
        }
        s.write(KEY_0600, 22);
        // 初始阵型
        this._applyFormation(0, side);
        this._applyFormation(0, side === 0 ? 11 : 0);
        // 球位置
        s.write(KEY_0635, 0x40);
        s.write(KEY_0637, 0x30);
        s.write(KEY_05FC, this._kickoffTaker(side));
        s.write(KEY_0612, 0);
        s.write(KEY_043B, exports.PHASE_PLAY);
        s.write(KEY_0621, 1);
    }
    // ──────────────────────────────────────────────
    // $8978: 比赛阶段处理
    // ──────────────────────────────────────────────
    /** 对应 $8978-$8A6F: 阶段处理 */
    matchPhaseHandler() {
        const s = this._store;
        const phase = s.read(KEY_043B) & 0xFF;
        switch (phase) {
            case exports.PHASE_KICKOFF:
                this.kickoff();
                break;
            case exports.PHASE_PLAY:
                this.mainLoop();
                break;
            case exports.PHASE_GOAL:
                this._handleGoal();
                break;
            case exports.PHASE_CORNER:
                this._handleCorner();
                break;
            default:
                this.mainLoop();
                break;
        }
    }
    /** 进球处理 */
    _handleGoal() {
        const s = this._store;
        // 加分
        const scoring = s.read(KEY_05FB) & 0xFF;
        if (scoring === 0) {
            this._addScore(0, 1);
        }
        else {
            this._addScore(1, 1);
        }
        // 回中圈开球
        s.write(KEY_043B, exports.PHASE_KICKOFF);
        s.write(KEY_0612, 0);
    }
    /** 角球处理 */
    _handleCorner() {
        const s = this._store;
        // 球放到角旗区
        const side = s.read(KEY_05FB) & 0xFF;
        const dir = bank26_tables_1.T_92EA[side === 0 ? 0 : 1] ?? 1;
        const cx = side === 0 ? 0x08 : 0x78;
        const cy = dir === 1 ? 0x08 : 0x58;
        s.write(KEY_0635, cx);
        s.write(KEY_0637, cy);
        s.write(KEY_05FC, this._kickoffTaker(side));
        s.write(KEY_0612, 1);
        s.write(KEY_043B, exports.PHASE_PLAY);
    }
    // ──────────────────────────────────────────────
    // $8BDF: 事件处理
    // ──────────────────────────────────────────────
    /** 对应 $8BDF-$8CA3: 事件分发 */
    dispatchEvent() {
        const s = this._store;
        const eventId = s.read(KEY_0612) & 0xFF;
        switch (eventId) {
            case 1:
                this._eventPass();
                break;
            case 2:
                this._eventTackle();
                break;
            case 3:
                this._eventShot();
                break;
            case 4:
                this._eventOut();
                break;
            case 5:
                this._eventGoal();
                break;
            default:
                // 事件后处理
                this._postEventHandler();
                break;
        }
    }
    /** 传球事件 */
    _eventPass() {
        const s = this._store;
        const from = s.read(KEY_05FC) & 0xFF;
        const to = this._findOpenTeammateId(from);
        if (to > 0) {
            s.write(KEY_05FC, to);
            this._passBall(this._findPlayerIndex(from));
        }
        s.write(KEY_0612, 0);
    }
    /** 抢断事件 */
    _eventTackle() {
        const s = this._store;
        // 控球权转移
        s.write(KEY_0612, 0);
    }
    /** 射门事件 */
    _eventShot() {
        const s = this._store;
        const shooter = s.read(KEY_05FC) & 0xFF;
        const side = this._sideOf(shooter);
        const gk = this._goalkeeperOf(side === 0 ? 11 : 0);
        // 门将扑救判定
        const ability = this._playerStat(shooter, 4);
        const gkAbility = this._playerStat(gk, 2);
        if ((ability & 0x7F) > (gkAbility & 0x7F)) {
            s.write(KEY_0612, 5); // 进球
        }
        else {
            s.write(KEY_05FC, gk); // 门将没收
            s.write(KEY_0612, 0);
        }
    }
    /** 出界事件 */
    _eventOut() {
        const s = this._store;
        s.write(KEY_043B, exports.PHASE_CORNER);
        s.write(KEY_0612, 0);
    }
    /** 进球事件 */
    _eventGoal() {
        const s = this._store;
        s.write(KEY_043B, exports.PHASE_GOAL);
        s.write(KEY_0612, 0);
    }
    /** 事件后处理 ($8A6F-$8B3A) */
    _postEventHandler() {
        const s = this._store;
        s.write(KEY_0612, 0);
        s.write(KEY_0617, 0);
    }
    // ──────────────────────────────────────────────
    // $8CA4: 球位置调整
    // ──────────────────────────────────────────────
    /** 对应 $8CA4-$8D05: 出界检查/球位置调整 */
    adjustBallPosition() {
        const s = this._store;
        const bx = s.read(KEY_0635) & 0xFF;
        const by = s.read(KEY_0637) & 0xFF;
        // 检查是否出界 (场地 0x00-0x7F)
        if (bx >= 0x80 || by >= 0x60) {
            s.write(KEY_0612, 4); // 出界事件
            return;
        }
        // 球位置四舍五入到区域
        const zone = this._coordToZone(bx, by);
        s.write(KEY_05FE, zone);
        s.write(KEY_0638, zone);
    }
    // ──────────────────────────────────────────────
    // $8D06: 数值计算
    // ──────────────────────────────────────────────
    /** 对应 $8D06-$8EE8: 数值计算/球员状态检查 */
    calculateValue() {
        const s = this._store;
        const x = s.read(KEY_CALL_X) & 0xFF;
        switch (x) {
            case 0:
                this._calcTotalAbility();
                break;
            case 1:
                this._checkPlayerState();
                break;
            case 2:
                this._handleTouch();
                break;
            default:
                this._calcDistance();
                break;
        }
    }
    /** 能力总值计算 */
    _calcTotalAbility() {
        const s = this._store;
        const id = s.read(KEY_0441) & 0xFF;
        let total = 0;
        for (let i = 0; i < 6; i++) {
            total = (total + this._playerStat(id, i)) & 0xFF;
        }
        s.write(KEY_062B, total & 0xFF);
        s.write(KEY_062C, (total >> 8) & 0xFF);
    }
    /** 球员状态检查 ($8E33) */
    _checkPlayerState() {
        const s = this._store;
        const id = s.read(KEY_0441) & 0xFF;
        const state = this._playerState(id);
        s.write(KEY_0628, state);
    }
    /** 触球处理 ($8E86) */
    _handleTouch() {
        const s = this._store;
        const id = s.read(KEY_0441) & 0xFF;
        // 最近触球者
        s.write('ram_05FD', id);
        // 经验+1
        this._addExp(id, 1);
    }
    /** 距离计算 */
    _calcDistance() {
        const s = this._store;
        const id = s.read(KEY_0441) & 0xFF;
        const idx = this._findPlayerIndex(id);
        const dist = this._distanceToBall(id);
        s.write(KEY_062B, dist);
        void idx;
    }
    // ──────────────────────────────────────────────
    // $8EE9: 经验计算
    // ──────────────────────────────────────────────
    /** 对应 $8EE9-$8F71: 经验值计算 */
    calculateExp() {
        const s = this._store;
        const id = s.read(KEY_0441) & 0xFF;
        const x = s.read(KEY_CALL_X) & 0xFF;
        // 根据事件类型加分
        let gain = 0;
        switch (x) {
            case 0:
                gain = 1;
                break; // 触球
            case 1:
                gain = 2;
                break; // 传球
            case 2:
                gain = 3;
                break; // 抢断
            case 3:
                gain = 5;
                break; // 射门
            case 4:
                gain = 10;
                break; // 进球
            default:
                gain = 1;
                break;
        }
        this._addExp(id, gain);
        // 16bit 经验值更新
        const lo = s.read(KEY_061C) & 0xFF;
        const hi = s.read(KEY_061D) & 0xFF;
        const total = lo + (hi << 8) + gain;
        s.write(KEY_061C, total & 0xFF);
        s.write(KEY_061D, (total >> 8) & 0xFF);
        s.write(KEY_0619, total & 0xFF);
    }
    /** 给指定球员加经验 */
    _addExp(id, gain) {
        const s = this._store;
        const base = this._playerDataAddr(id);
        if (base < 0)
            return;
        const exp = (0, bank26_tables_1.readB26)(base + 5) & 0xFF;
        const next = (exp + gain) & 0xFF;
        // 写入球员数据 (通过 Bank29 数据窗口)
        this._writePlayerData(base + 5, next);
    }
    // ──────────────────────────────────────────────
    // $8F72: 能力计算
    // ──────────────────────────────────────────────
    /** 对应 $8F72-$8FF2: 能力值计算 */
    calculateAbility() {
        const s = this._store;
        const id = s.read(KEY_0441) & 0xFF;
        const x = s.read(KEY_CALL_X) & 0xFF;
        // 读基础能力
        const base = this._playerStat(id, x & 0x07);
        // 加上等级加成
        const level = this._levelOf(id);
        const bonus = (level * 2) & 0xFF;
        const result = (base + bonus) & 0xFF;
        s.write(KEY_062B, result);
        s.write(KEY_044E, result);
    }
    /** 球员等级 (查 $9E4E 类似映射) */
    _levelOf(id) {
        const exp = this._playerStat(id, 5);
        if (exp >= 0x9A)
            return 3;
        if (exp >= 0x60)
            return 2;
        if (exp >= 0x30)
            return 1;
        return 0;
    }
    // ──────────────────────────────────────────────
    // $911C: 任意球/掷球
    // ──────────────────────────────────────────────
    /** 对应 $911C-$9297: 任意球/掷球/定位球 */
    freeKick() {
        const s = this._store;
        const x = s.read(KEY_CALL_X) & 0xFF;
        switch (x) {
            case 0:
                this._freeKickNormal();
                break;
            case 1:
                this._freeKickIndirect();
                break;
            case 2:
                this._penaltyKick();
                break;
            default:
                this._throwIn();
                break;
        }
    }
    /** 任意球 */
    _freeKickNormal() {
        const s = this._store;
        const side = s.read(KEY_05FB) & 0xFF;
        const taker = this._kickoffTaker(side);
        s.write(KEY_05FC, taker);
        // 选择传球或直接射门
        const zone = this._coordToZone(s.read(KEY_0635) & 0xFF, s.read(KEY_0637) & 0xFF);
        if (zone >= 0x10) {
            s.write(KEY_0612, 5); // 直接射门
        }
        else {
            s.write(KEY_0612, 1); // 传球
        }
        s.write(KEY_043B, exports.PHASE_PLAY);
    }
    /** 间接任意球 */
    _freeKickIndirect() {
        this._freeKickNormal();
    }
    /** 点球 */
    _penaltyKick() {
        const s = this._store;
        const side = s.read(KEY_05FB) & 0xFF;
        const taker = this._kickoffTaker(side);
        s.write(KEY_05FC, taker);
        s.write(KEY_0635, 0x40);
        s.write(KEY_0637, 0x30);
        s.write(KEY_0612, 5); // 射门
        s.write(KEY_043B, exports.PHASE_PLAY);
    }
    // ──────────────────────────────────────────────
    // $92EE: 射门
    // ──────────────────────────────────────────────
    /** 对应 $92EE-$9365: 射门开始 */
    shootStart() {
        const s = this._store;
        const id = s.read(KEY_05FC) & 0xFF;
        s.write(KEY_0441, id);
        // 射门力量 = 能力 * 随机系数
        const power = this._playerStat(id, 4) & 0x7F;
        const rnd = this._rand() & 0x07;
        const force = (power + rnd) & 0xFF;
        s.write(KEY_062B, force);
        // 触发射门事件
        s.write(KEY_0612, 5);
        this._eventShot();
    }
    // ──────────────────────────────────────────────
    // $9366-$946F: 必杀技/防守
    // ──────────────────────────────────────────────
    /** 必杀技判定 */
    specialMoveCheck(playerId, moveId) {
        const s = this._store;
        s.write(KEY_0441, playerId);
        // 体力检查
        const stamina = this._playerStat(playerId, 0);
        if ((stamina & 0x80) !== 0)
            return false;
        // 成功率: 基础 50% + 能力加成
        const ability = this._playerStat(playerId, 4) & 0x7F;
        const chance = 0x40 + ((ability * 2) & 0x3F);
        const rnd = this._rand() & 0xFF;
        void moveId;
        return rnd < chance;
    }
    /** 防守/扑救判定 */
    defend(defenderId) {
        const s = this._store;
        s.write(KEY_0441, defenderId);
        const ability = this._playerStat(defenderId, 2) & 0x7F;
        const rnd = this._rand() & 0x7F;
        return rnd < ability;
    }
    /** 射门处理 (H5 语义: 计算射门结果) */
    handleShoot(attackerId, power) {
        const s = this._store;
        const side = this._sideOf(attackerId);
        const gk = this._goalkeeperOf(side === 0 ? 11 : 0);
        s.write(KEY_0441, attackerId);
        s.write(KEY_062B, power & 0xFF);
        // 门将扑救
        if (this.defend(gk)) {
            s.write(KEY_05FC, gk);
            s.write(KEY_0612, 0);
        }
        else {
            s.write(KEY_0612, 5);
            this._eventGoal();
        }
    }
    // ──────────────────────────────────────────────
    // $9470: 操作选择菜单
    // ──────────────────────────────────────────────
    /** 对应 $9470-$95E0: 操作选择 */
    actionSelect() {
        const s = this._store;
        const input = s.read(KEY_001C) & 0xFF;
        const cur = s.read(KEY_0624) & 0xFF;
        // 方向键改变选择
        if ((input & 0x0F) !== 0) {
            let next = cur;
            if ((input & 0x01) !== 0)
                next = (cur - 1) & 0xFF; // 上
            if ((input & 0x02) !== 0)
                next = (cur + 1) & 0xFF; // 下
            if ((input & 0x04) !== 0)
                next = (cur - 1) & 0xFF; // 左
            if ((input & 0x08) !== 0)
                next = (cur + 1) & 0xFF; // 右
            s.write(KEY_0624, next & 0x03);
            return;
        }
        // A 键确认
        if ((input & 0x80) !== 0) {
            s.write(KEY_0625, cur);
            this._menuConfirm(cur);
        }
    }
    /** 菜单确认分发 */
    _menuConfirm(sel) {
        const s = this._store;
        switch (sel) {
            case 0:
                s.write(KEY_0612, 1);
                break; // 传球
            case 1:
                s.write(KEY_0612, 5);
                break; // 射门
            case 2:
                this.tacticsAdjust();
                break; // 战术
            case 3:
                s.write(KEY_0612, 0);
                break; // 取消
        }
    }
    // ──────────────────────────────────────────────
    // $95E1: 战术调整
    // ──────────────────────────────────────────────
    /** 对应 $95E1-$96CB: 战术调整 */
    tacticsAdjust() {
        const s = this._store;
        const side = s.read(KEY_05FB) & 0xFF;
        const tactics = s.read(KEY_0627) & 0xFF;
        // 切换战术编号
        const input = s.read(KEY_001C) & 0xFF;
        if ((input & 0x01) !== 0) {
            s.write(KEY_0627, (tactics - 1) & 0x07);
        }
        else if ((input & 0x02) !== 0) {
            s.write(KEY_0627, (tactics + 1) & 0x07);
        }
        // 应用战术表 $9F0F
        this._applyTactics(tactics & 0x07, side);
    }
    /** 应用战术 (T_9F0F, 每战术 5 项) */
    _applyTactics(tactic, side) {
        const s = this._store;
        const base = (tactic & 0x07) * 5;
        for (let i = 0; i < 5; i++) {
            const slot = bank26_tables_1.T_9F0F[base + i] ?? 0;
            if (slot === 0)
                continue;
            const pid = slot + (side === 0 ? 0 : 11);
            const newIdx = this._formationSlotFor(pid);
            // 调整位置权重
            s.write(`tactic_slot_${i}`, newIdx);
        }
    }
    // ──────────────────────────────────────────────
    // $9731: 阵型编辑
    // ──────────────────────────────────────────────
    /** 对应 $9731-$97F8: 阵型编辑 */
    formationEdit() {
        const s = this._store;
        const side = s.read(KEY_05FB) & 0xFF;
        const formation = s.read(KEY_0626) & 0xFF;
        // 应用阵型表 $9EB7
        this._applyFormation(formation & 0x08, side);
        s.write(KEY_043B, exports.PHASE_PLAY);
    }
    /** 应用阵型 (T_9EB7, 每阵型 8B) */
    _applyFormation(formation, side) {
        const s = this._store;
        const base = (formation & 0x0F) * FORMATION_SIZE;
        for (let i = 0; i < 8; i++) {
            const slot = bank26_tables_1.T_9EB7[base + i] ?? 0;
            if (slot === 0 || slot === 0xFF)
                continue;
            const pid = slot + (side === 0 ? 0 : 11);
            // 阵型位置: 简化映射
            this._writeArr(KEY_060B, (pid - 1) * 2, this._formationX(i));
            this._writeArr(KEY_060B, (pid - 1) * 2 + 1, this._formationY(i));
        }
    }
    /** 阵型槽位 X 坐标 (简化) */
    _formationX(slot) {
        const cols = [0x10, 0x30, 0x50, 0x70];
        return cols[slot & 0x03] ?? 0x40;
    }
    /** 阵型槽位 Y 坐标 (简化) */
    _formationY(slot) {
        const rows = [0x0C, 0x24, 0x3C, 0x54];
        return rows[(slot >> 2) & 0x03] ?? 0x30;
    }
    // ──────────────────────────────────────────────
    // 内部: 数据访问
    // ──────────────────────────────────────────────
    /** 读数组 (模拟内存数组读取) */
    _readArr(baseKey, offset) {
        return this._store.read(`${baseKey}_${offset.toString(16)}`) & 0xFF;
    }
    /** 写数组 */
    _writeArr(baseKey, offset, value) {
        this._store.write(`${baseKey}_${offset.toString(16)}`, value & 0xFF);
    }
    /** 球员数据基址 (通过 T_9FF0 → Bank29 $A000) */
    _playerDataAddr(id) {
        const side = id >= 11 ? 1 : 0;
        const slot = id % 11;
        if (slot >= 8)
            return -1;
        const ptr = bank26_tables_1.T_9FF0[slot * 2] | (bank26_tables_1.T_9FF0[slot * 2 + 1] << 8);
        // Bank29 CPU 基址 $A000
        return ptr - 0xA000 + (side === 0 ? 0 : 0x4C);
    }
    /** 读球员属性 (0-6 项能力) */
    _playerStat(id, statIdx) {
        const base = this._playerDataAddr(id);
        if (base < 0)
            return 0;
        return (0, bank26_tables_1.readB26)(base + (statIdx & 0x07)) & 0xFF;
    }
    /** 写球员数据 */
    _writePlayerData(offset, value) {
        // H5: 球员数据为只读 ROM 时, 写入内存缓存
        this._store.write(`player_data_${offset.toString(16)}`, value & 0xFF);
    }
    /** 球员状态 */
    _playerState(id) {
        const s = this._store;
        const idx = this._findPlayerIndex(id);
        if (idx < 0)
            return 0;
        return this._readArr(KEY_0606, idx);
    }
    /** 找球员所在槽位索引 */
    _findPlayerIndex(id) {
        const s = this._store;
        const count = s.read(KEY_0600) & 0xFF;
        for (let i = 0; i < count && i < 44; i++) {
            if ((this._readArr(KEY_0601, i) & 0xFF) === id)
                return i;
        }
        return -1;
    }
    /** 球员所属队伍 (0=主队, 1=客队) */
    _sideOf(id) {
        return id >= 11 ? 1 : 0;
    }
    /** 找指定队伍的传球目标 */
    _findOpenTeammateId(id) {
        const s = this._store;
        const count = s.read(KEY_0600) & 0xFF;
        const side = this._sideOf(id);
        let best = -1;
        let bestScore = -1;
        for (let i = 0; i < count && i < 44; i++) {
            const pid = this._readArr(KEY_0601, i);
            if (pid === 0 || pid === id)
                continue;
            if (this._sideOf(pid) !== side)
                continue;
            const px = this._readArr(KEY_060B, i * 2);
            const score = side === 0 ? px : (255 - px);
            if (score > bestScore) {
                bestScore = score;
                best = pid;
            }
        }
        return best;
    }
    /** 指定队伍的阵型槽位 (简化) */
    _formationSlotFor(id) {
        return id % 11;
    }
    /** 开球球员 */
    _kickoffTaker(side) {
        return side === 0 ? 10 : 21;
    }
    /** 门将 */
    _goalkeeperOf(side) {
        return side === 0 ? 1 : 12;
    }
    /** 前锋 */
    _forwardOf(side) {
        return side === 0 ? 10 : 21;
    }
    /** 到球距离 */
    _distanceToBall(id) {
        const s = this._store;
        const idx = this._findPlayerIndex(id);
        if (idx < 0)
            return 0xFF;
        const px = this._readArr(KEY_060B, idx * 2);
        const py = this._readArr(KEY_060B, idx * 2 + 1);
        const bx = s.read(KEY_0635) & 0xFF;
        const by = s.read(KEY_0637) & 0xFF;
        const dx = Math.abs(this._signed((px - bx) & 0xFF));
        const dy = Math.abs(this._signed((py - by) & 0xFF));
        return Math.min(255, dx + dy);
    }
    /** 坐标 → 区域编码 */
    _coordToZone(x, y) {
        const zx = (x >> 4) & 0x0F;
        const zy = (y >> 4) & 0x0F;
        return (zy << 4) | zx;
    }
    /** 区域 → 索引 */
    _zoneToIndex(zone) {
        return zone & 0x3F;
    }
    /** 8bit 有符号解释 */
    _signed(v) {
        const b = v & 0xFF;
        return b >= 0x80 ? b - 0x100 : b;
    }
    /** 方向表: X 增量 */
    _dirDx(dir) {
        switch (dir & 0x07) {
            case 1:
            case 8: return 1; // 右
            case 2: return 1; // 右下
            case 3: return 0; // 下
            case 4: return 0xFF; // 左下
            case 5: return 0xFF; // 左
            case 6: return 0xFF; // 左上
            case 7: return 0; // 上
            default: return 0;
        }
    }
    /** 方向表: Y 增量 */
    _dirDy(dir) {
        switch (dir & 0x07) {
            case 1: return 0xFF; // 上
            case 2: return 1; // 右下
            case 3: return 1; // 下
            case 4: return 1; // 左下
            case 5: return 0; // 左
            case 6: return 0xFF; // 左上
            case 7: return 0xFF; // 上
            case 8: return 0; // 右
            default: return 0;
        }
    }
    /** 随机数 (近似 6502 PRNG) */
    _rand() {
        const s = this._store;
        let lo = s.read(KEY_00E2) & 0xFF;
        let hi = s.read(KEY_00E3) & 0xFF;
        lo = (lo * 3 + 1) & 0xFF;
        hi = (hi + (lo >> 7)) & 0xFF;
        s.write(KEY_00E2, lo);
        s.write(KEY_00E3, hi);
        return (hi << 8) | lo;
    }
    /** 记分 */
    _addScore(side, points) {
        const s = this._store;
        const key = side === 0 ? 'score_home' : 'score_away';
        const cur = s.read(key) & 0xFF;
        s.write(key, (cur + points) & 0xFF);
    }
    /** 比赛标志清除 ($81ED 附近) */
    _clearMatchFlags() {
        const s = this._store;
        s.write(KEY_0617, 0);
        s.write(KEY_061A, 0);
        s.write(KEY_061B, 0);
        s.write(KEY_061E, 0);
    }
    /** 阶段切换检查 */
    _checkPhaseChange() {
        const s = this._store;
        const eventId = s.read(KEY_0612) & 0xFF;
        if (eventId === 5) {
            s.write(KEY_043B, exports.PHASE_GOAL);
        }
    }
    /** 位置更新 (简化) */
    _updatePosition(idx) {
        // H5: 位置由 AI 动作直接更新, 无需额外处理
        void idx;
    }
    /** 等待/同步 (对应固定区 $C515) */
    _waitSync(_frames) {
        // H5: 同步由渲染层驱动
    }
    /** 当前球员指针 (对应固定区 $C551) */
    getPlayerPtr() {
        const s = this._store;
        return (s.read(KEY_0032) & 0xFF) | ((s.read(KEY_0033) & 0xFF) << 8);
    }
    // ──────────────────────────────────────────────
    // 公共数据访问 (供其他 bank service 调用)
    // ──────────────────────────────────────────────
    /** 读 bank26 原始字节 */
    read(cpuAddr) {
        return (0, bank26_tables_1.readB26)(cpuAddr);
    }
    /** 读 bank26 16bit LE */
    read16(cpuAddr) {
        return (0, bank26_tables_1.readB26U16)(cpuAddr);
    }
    /** 获取比赛状态快照 */
    getState() {
        const s = this._store;
        return {
            phase: s.read(KEY_043B) & 0xFF,
            scoreHome: s.read('score_home') & 0xFF,
            scoreAway: s.read('score_away') & 0xFF,
            ballX: s.read(KEY_0635) & 0xFF,
            ballY: s.read(KEY_0637) & 0xFF,
            ballOwner: s.read(KEY_05FC) & 0xFF,
            playerCount: s.read(KEY_0600) & 0xFF,
        };
    }
    /** 获取球员属性 (供 AI/UI 查询) */
    getPlayerStat(playerId, statIdx) {
        return this._playerStat(playerId, statIdx);
    }
    /** 获取阵型表条目 */
    getFormationEntry(formation) {
        const base = (formation & 0x0F) * FORMATION_SIZE;
        return bank26_tables_1.T_9EB7.slice(base, base + FORMATION_SIZE);
    }
    /** 获取战术表条目 */
    getTacticsEntry(tactic) {
        const base = (tactic & 0x07) * 5;
        return bank26_tables_1.T_9F0F.slice(base, base + 5);
    }
    /** 获取球员数据指针 (T_9FF0) */
    getPlayerDataPtr(slot) {
        const i = (slot & 0x07) * 2;
        return (bank26_tables_1.T_9FF0[i] | (bank26_tables_1.T_9FF0[i + 1] << 8)) - 0xA000;
    }
}
exports.MatchEngineService = MatchEngineService;
