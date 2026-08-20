"use strict";
/**
 * Bank 28 Service — 比赛对阵/阵型/等级配置服务
 *
 * 数据已直接 import `rom-data/prg-bank-28.ts` (Bank #0x1C = 28), 无 MMC3 切换。
 * PRG offset: 0x38010-0x3A00F
 *
 * 数据来自 `data/bank28-tables.ts`,
 * 本 service 直接翻译 bank_28 全部业务逻辑, 供 Bank30/Bank26/Bank31 调用。
 *
 * 原始入口 (bank_28.asm $8000 跳转表, 共 13 项, 本项目以 10 项语义化消费):
 *   [0] $8B22  场景/角色数据清零 + 名字区初始化
 *   [1] $8609  角色属性/位置查询
 *   [2] $8C06  比赛状态初始化
 *   [3] $8D58  等级/经验映射
 *   [4] $819D  主队对阵配置加载
 *   [5] $8224  客队对阵配置加载
 *   [6] $828F  阵型配置加载
 *   [7] $852E  队伍数据查询
 *   [8] $846A  区域/坐标检查
 *   [9] $82CA  OAM 初始化
 *
 * 说明: $8003 实际跳转表为 13 项 ($802D/$8B22/$8609/$8C06/$8D58/$8DA6/
 *       $819D/$8224/$828F/$852E/$846A/$8021(陷阱)/$82CA)。本项目沿用既有
 *       10 项语义化 dispatch (索引 0-9), 其余入口在覆盖清单中列出。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank28MatchService = void 0;
const bank28_tables_1 = require("../data/prg/bank28-tables");
// ── RAM 键 (语义化, 替代 NES ZP/内存地址) ──
const KEY_32 = 'ram_0032'; // 16bit 指针/临时 lo
const KEY_33 = 'ram_0033'; // 16bit 指针/临时 hi
const KEY_34 = 'ram_0034'; // 名字区指针 lo ($C50C 结果)
const KEY_35 = 'ram_0035'; // 名字区指针 hi
const KEY_38 = 'ram_0038'; // 间接指针 lo
const KEY_39 = 'ram_0039'; // 间接指针 hi
const KEY_3A = 'ram_003A'; // 间接指针 lo
const KEY_3B = 'ram_003B'; // 间接指针 hi
const KEY_3C = 'ram_003C'; // 临时 lo
const KEY_3D = 'ram_003D'; // 临时 hi
const KEY_3E = 'ram_003E'; // 临时
const KEY_3F = 'ram_003F'; // 临时
const KEY_40 = 'ram_0040'; // 临时
const KEY_45 = 'ram_0045'; // 临时
const KEY_46 = 'ram_0046'; // 临时
const KEY_47 = 'ram_0047'; // 临时
const KEY_48 = 'ram_0048'; // 指针 lo
const KEY_49 = 'ram_0049'; // 指针 hi
const KEY_61 = 'ram_0061'; // 指针 lo
const KEY_62 = 'ram_0062'; // 指针 hi
// $043B-$044E 比赛配置区
const KEY_043B = 'ram_043B'; // 主队/当前队伍索引
const KEY_043C = 'ram_043C'; // 主队阵型/场景参数
const KEY_043D = 'ram_043D'; // 客队/对手队伍索引
const KEY_043E = 'ram_043E'; // 客队阵型参数
const KEY_043F = 'ram_043F'; // 从配置块读取的 byte2
const KEY_0440 = 'ram_0440'; // 从配置块读取的 byte3 & 3
const KEY_0441 = 'ram_0441'; // 主队角色类型/属性参数
const KEY_0442 = 'ram_0442'; // 客队角色类型/属性参数
const KEY_0443 = 'ram_0443'; // 从配置块 byte3 高 5bit
const KEY_0444 = 'ram_0444'; // 从配置块读取的 byte0
const KEY_0445 = 'ram_0445'; // 从配置块读取的 byte0 (客队)
const KEY_0446 = 'ram_0446'; // 队伍校验标志
const KEY_044B = 'ram_044B'; // 初始化完成标志
const KEY_044C = 'ram_044C'; // 初始化完成标志2
const KEY_044E = 'ram_044E'; // 全局偏移/标志
// $05FB / $0628 状态标志 (OAM 忙标志 ram_0515 由 OamManager 统一管理)
const KEY_05FB = 'ram_05FB';
const KEY_0600 = 'ram_0600';
const KEY_0601 = 'ram_0601';
const KEY_0606 = 'ram_0606';
const KEY_060B = 'ram_060B';
const KEY_0612 = 'ram_0612';
const KEY_0615 = 'ram_0615';
const KEY_061E = 'ram_061E';
const KEY_0621 = 'ram_0621';
const KEY_0628 = 'ram_0628';
const KEY_062D = 'ram_062D';
const KEY_0635 = 'ram_0635';
const KEY_0637 = 'ram_0637';
const KEY_0638 = 'ram_0638';
const KEY_002B = 'ram_002B';
const KEY_002E = 'ram_002E';
const KEY_002F = 'ram_002F';
const KEY_0430 = 'ram_0430';
const KEY_0431 = 'ram_0431';
const KEY_00E2 = 'ram_00E2';
const KEY_00E3 = 'ram_00E3';
const KEY_00ED = 'ram_00ED';
const KEY_0384 = 'ram_0384';
const KEY_05FC = 'ram_05FC';
// 调用者传入的 X/Y 参数 (对应 NES X/Y 寄存器, 与 bank26 KEY_CALL_Y 一致)
const KEY_CALL_X = 'ram_call_x';
const KEY_CALL_Y = 'ram_call_y';
// ── 常量 ──
const SCENE_ENTRY_SIZE = 12; // 每个场景 12B 数据
// ═══════════════════════════════════════════════════════════════
// Bank 28 Service
// ═══════════════════════════════════════════════════════════════
class Bank28MatchService {
    constructor(_store) {
        this._store = _store;
    }
    // ──────────────────────────────────────────────
    // $8003: 入口跳转表 + 等级查询
    // ──────────────────────────────────────────────
    /**
     * 对应原始 $8000 跳转表分发 (10 项语义化)。
     * @param index 跳转表索引 0-9
     */
    dispatch(index) {
        switch (index) {
            case 0:
                this.entryScenePosition();
                break;
            case 1:
                this.entryRoleQuery();
                break;
            case 2:
                this.entryMatchInit();
                break;
            case 3:
                this.entryLevelMap();
                break;
            case 4:
                this.entryHomeMatchConfig();
                break;
            case 5:
                this.entryAwayMatchConfig();
                break;
            case 6:
                this.entryFormationConfig();
                break;
            case 7:
                this.entryTeamQuery();
                break;
            case 8:
                this.entryZoneCheck();
                break;
            case 9:
                this.entryOamInit();
                break;
        }
    }
    /**
     * $8030-$8039 尾部: 按经验值查等级表 $9E4E。
     * asm: LDA $9E4E,Y → ram_0032, ram_0033=0, RTS
     */
    lookupLevel(exp) {
        const y = exp & 0xFF;
        const level = bank28_tables_1.T_LEVEL_MAP[y];
        this._store.write(KEY_32, level);
        this._store.write(KEY_33, 0);
        return level;
    }
    // ──────────────────────────────────────────────
    // [4] $819D: 主队对阵配置加载
    // ──────────────────────────────────────────────
    /**
     * 对应 $819D-$8222: 加载主队比赛配置。
     */
    entryHomeMatchConfig() {
        const s = this._store;
        const teamIdx = s.read(KEY_043B);
        const add = s.read(KEY_044E);
        const sceneParam = s.read(KEY_043C);
        // $819D: LDA $043B; PHP; ASL; ADC $043B; ADC $044E; TAY; PLP
        let y = ((teamIdx * 3) & 0xFF) + add;
        y &= 0xFF;
        // PLP 恢复 flag, BNE $81BB (若 043B 高位? 原文 BNE 依据 ASL 进位)
        // $81AC-$81BA: 若 (043C & 0x7F) >= 3 则 Y -= 044E
        const org = teamIdx;
        if (((org << 1) & 0xFF) === 0) {
            // BNE not taken → 检查 (043C & 0x7F) >= 3
            if ((sceneParam & 0x7F) >= 3) {
                y = (y - add) & 0xFF;
            }
        }
        const pos = bank28_tables_1.T_POS_8206[y];
        if (pos === 0xFF) {
            this._skipTo8203();
            return;
        }
        s.write(KEY_CALL_X, pos); // NES X 寄存器
        s.write(KEY_0441, pos);
        this._queryRoleAttributes(pos);
        // $81C8: TYA; PHA (保存 Y)
        s.write(KEY_CALL_Y, y);
        // $81CA-$81D7: ptr = $9460[043B*2]
        const ptrIdx = teamIdx * 2;
        const cfgAddr = (0, bank28_tables_1.readB28U16)(0x9460 + ptrIdx);
        // $81D9-$81DE: Y = 043C * 4
        const y4 = (sceneParam * 4) & 0xFF;
        this._loadMatchConfigBlock(cfgAddr, y4, true);
        // $8278-$828E: 从 ram_0032 查等级表返回
        this._finalizeLevelFrom032();
    }
    // ──────────────────────────────────────────────
    // [5] $8224: 客队对阵配置加载
    // ──────────────────────────────────────────────
    /**
     * 对应 $8224-$8249 + $825B-$828E: 加载客队比赛配置。
     */
    entryAwayMatchConfig() {
        const s = this._store;
        const teamIdx = s.read(KEY_043D);
        const add = s.read(KEY_044E);
        // $8227-$822E: Y = 043D*2 + 043D + 044E = 043D*3 + 044E
        let y = ((teamIdx * 3) & 0xFF) + add;
        y &= 0xFF;
        const pos = bank28_tables_1.T_TEAM_824C[y];
        s.write(KEY_0442, pos);
        this._queryRoleAttributes(pos);
        s.write(KEY_CALL_Y, y);
        // $823A-$8247: ptr = $9554[043D*2]
        const ptrIdx = teamIdx * 2;
        const cfgAddr = (0, bank28_tables_1.readB28U16)(0x9554 + ptrIdx);
        // $825B: 读 4B 配置块 (Y = 043E*4)
        const y4 = (s.read(KEY_043E) * 4) & 0xFF;
        this._loadMatchConfigBlock(cfgAddr, y4, false);
        this._finalizeLevelFrom032();
    }
    // ──────────────────────────────────────────────
    // [6] $828F: 阵型配置加载
    // ──────────────────────────────────────────────
    /**
     * 对应 $828F-$82C9: 加载阵型相关配置。
     */
    entryFormationConfig() {
        const s = this._store;
        let teamIdx = s.read(KEY_043D);
        if (teamIdx === 3)
            teamIdx = 2; // $8292: CPY #$03 → DEY
        teamIdx = (teamIdx + 3) & 0xFF; // $8297: TYA; CLC; ADC #$03
        const pos = bank28_tables_1.T_TEAM_82C0[teamIdx];
        const style = s.read(KEY_05FB) ^ 0x0B;
        s.write(KEY_0442, pos);
        this._queryRoleAttributes(pos, style);
        s.write(KEY_CALL_Y, teamIdx);
        // $82A9-$82B6: ptr = $959E[043D*2]
        const ptrIdx = s.read(KEY_043D) * 2;
        const cfgAddr = (0, bank28_tables_1.readB28U16)(0x959E + ptrIdx);
        s.write(KEY_0445, 0);
        // $82B8-$82BA: LDA #$00; STA 0445; JMP $825B
        const y4 = (s.read(KEY_043E) * 4) & 0xFF;
        this._loadMatchConfigBlock(cfgAddr, y4, false);
        this._finalizeLevelFrom032();
    }
    // ──────────────────────────────────────────────
    // [1] $8609: 角色属性/位置查询
    // ──────────────────────────────────────────────
    /**
     * 对应 $8609-$875D + 跳转子表: 角色(球员)属性或位置查询。
     * 走 T_POS_8604 / T_POS_86B5 / T_POS_87C3 等真实分支。
     */
    entryRoleQuery() {
        const s = this._store;
        // $8609: LDA $05FB; BEQ $8611; JMP $875D
        if ((s.read(KEY_05FB) & 0xFF) !== 0) {
            this._roleQuery875D();
            return;
        }
        // $8611: LDA $0600; BEQ $863E (返回)
        const cnt = s.read(KEY_0600) & 0xFF;
        if (cnt === 0)
            return;
        // $8616-$863C: 循环处理每个角色
        let a = 0;
        for (;;) {
            // $8619: LDA #$01; JSR $C515 (渲染同步, H5 空)
            this._fixedC515();
            // $8620: STA $0040; TAX
            s.write(KEY_40, a);
            const x = a;
            // $8623: LDA $0601,X; JSR $863F
            const v = s.read(`${KEY_0601}+${x}`) & 0xFF;
            this._roleQuery863F(v);
            // $862A: PLA; TAX → a
            // $862B-$8634: $060B,a = 043D; $0606,a = 043E
            s.write(`${KEY_060B}+${a}`, s.read(KEY_043D) & 0xFF);
            s.write(`${KEY_0606}+${a}`, s.read(KEY_043E) & 0xFF);
            a = (a + 1) & 0xFF;
            if (a === cnt)
                break; // $8638-$863B: TXA; CMP $0600; BNE $8618
        }
    }
    /** $863F-$8650: 角色数据处理入口 */
    _roleQuery863F(a) {
        const s = this._store;
        // $863F: STA $0442; JSR $8A62
        s.write(KEY_0442, a & 0xFF);
        this._sub8A62(a);
        // $8647: LDA #$00; STA $003C
        s.write(KEY_3C, 0);
        // $8649-$8650: LDA $0442; CMP #$0B; BNE $8653; JMP $85B5
        if ((s.read(KEY_0442) & 0xFF) === 0x0B) {
            this._sub85B5();
            return;
        }
        // $8653-$8659: LDY $0621; LDA $86B5,Y; STA $003C
        const y = s.read(KEY_0621) & 0xFF;
        const v = bank28_tables_1.T_POS_86B5[y] ?? 0;
        s.write(KEY_3C, v);
        if (v === 0) {
            // $8663-$8673: 未命中 → 按像素/区域查询
            const idx = this._sub8663();
            this._sub868E(idx);
            return;
        }
        // $865D: JSR $8AB3; JMP $868E
        const idx2 = this._sub8AB3(v);
        this._sub868E(idx2);
    }
    /**
     * $85B5-$8603: 门将(角色类型 0x0B)特殊属性路径。
     * 从名字区读属性指针, 计算 v*12 + $BA2E, 经 $8B0B 取低半字节 → 043D,
     * 再调 $8DA6 等级映射, 依据 0430 决定是否把 0431 落到 043E。
     */
    _sub85B5() {
        const s = this._store;
        // $85B5: LDA #$00; STA $003D
        s.write(KEY_3D, 0);
        // $85B9-$85C2: LDX $0621; LDY $8604,X; TYA; ASL; ASL; STA $003E
        const x = s.read(KEY_0621) & 0xFF;
        const yBase = bank28_tables_1.T_POS_8604[x] ?? 0;
        s.write(KEY_3E, (yBase * 4) & 0xFF);
        // $85C4-$85C8: INY×4; LDA ($003A),Y → v
        const y = (yBase + 4) & 0xFF;
        const ptr = this._readIndirectPtr(KEY_3A, KEY_3B);
        const v = (0, bank28_tables_1.readB28)(ptr.lo + (ptr.hi << 8) + y);
        // $85CA-$85D9: v*12 (16bit) → 003C:003D
        const lo4 = (v << 2) & 0xFF;
        const hi4 = (v >> 6) & 0x03;
        const lo8 = (v << 3) & 0xFF;
        const hi8 = (v >> 5) & 0x07;
        const loSum = lo4 + lo8;
        let lo = loSum & 0xFF;
        let hi = (hi4 + hi8 + ((loSum >> 8) & 1)) & 0xFF;
        // $85DF-$85E9: 003C:003D += $BA2E
        const sum = lo + 0x2E;
        lo = sum & 0xFF;
        hi = (hi + 0xBA + ((sum >> 8) & 1)) & 0xFF;
        s.write(KEY_3C, lo);
        s.write(KEY_3D, hi);
        // $85EB: JSR $8B0B → A; STA $043D
        const a = this._sub8B0B();
        s.write(KEY_043D, a);
        // $85F1: TAX; $85F2: LDA $0442; $85F5: JSR $8DA6 (等级映射变体)
        s.write(KEY_CALL_X, a);
        s.write(KEY_32, s.read(KEY_0442) & 0xFF);
        this.entryMatchInit();
        // $85F8-$8600: LDA $0430; BEQ $8600; LDA $0431; STA $043E
        if ((s.read(KEY_0430) & 0xFF) !== 0) {
            s.write(KEY_043E, s.read(KEY_0431) & 0xFF);
        }
    }
    /** $8663-$8673: 像素转区域索引 (05FB 分支) */
    _sub8663() {
        const s = this._store;
        // $8663: LDA $0635; EOR #$FF; TAX
        const x = (~(s.read(KEY_0635) & 0xFF)) & 0xFF;
        // $8669: LDA #$14
        let idx = 0x14;
        if (x < 0xA0) {
            // $866F: LDA #$10
            idx = 0x10;
            if (x < 0x60) {
                // $8675-$867C: LDA $0637; BPL; EOR #$FF; TAY
                let yy = s.read(KEY_0637) & 0xFF;
                if (yy & 0x80)
                    yy = (~yy) & 0xFF;
                idx = this._pixelToZone(yy);
            }
        }
        return idx;
    }
    /** $867D-$868B: C539 + 在 $8BBE 中匹配区域 → 返回区域值 */
    _pixelToZone(y) {
        const x = this._store.read(KEY_0635) & 0xFF;
        const zoneIdx = this._fixedC539(x, y);
        return this._zoneAt(zoneIdx);
    }
    /** 在 $8BBE 区域表按像素索引查找 → 返回区域码 */
    _zoneAt(pixelIdx) {
        // asm: LDX #$00; CMP $8BBE,X; BEQ → LDA $8BBF,X; RTS; INX;INX; BNE 循环
        for (let i = 0; i + 1 < bank28_tables_1.T_ZONE_COORD.length; i += 2) {
            if (bank28_tables_1.T_ZONE_COORD[i] === pixelIdx) {
                return bank28_tables_1.T_ZONE_COORD[i + 1];
            }
        }
        return 0;
    }
    /** $868E: LDY #$07; JSR $8ADE; 计算指针 → JSR $8B0B → STA $043D */
    _sub868E(idx) {
        const s = this._store;
        // $8690: JSR $8ADE (Y=7 场景索引)
        this._sub8ADE(7, idx);
        // $8693-$869D: [003C:003D] = [003C:003D] + $B8AE
        const lo = (s.read(KEY_3C) + 0xAE) & 0xFF;
        const hi = (s.read(KEY_3D) + 0xB8 + ((s.read(KEY_3C) + 0xAE) >> 8)) & 0xFF;
        s.write(KEY_3C, lo);
        s.write(KEY_3D, hi);
        // $869F: JSR $8B0B → A; STA $043D
        const a = this._sub8B0B();
        s.write(KEY_043D, a);
        // $86A5: LDA #$00; STA $043E
        s.write(KEY_043E, 0);
        // $86AA: LDA $003F; JSR $C509 (表跳转, switch 语义化)
        const sel = s.read(KEY_3F) & 0xFF;
        this._roleQueryTable(sel);
    }
    /** $C509 表跳转 → $86AF 分支表 (0=$86BA,1=$86EB,2=$8710) */
    _roleQueryTable(sel) {
        switch (sel & 0xFF) {
            case 0:
                // $86BA: LDA $043D; JSR $C509 → $86C8 子表
                this._roleQueryTable_BA();
                break;
            case 1:
                this._roleQueryTable_EB();
                break;
            case 2:
                this._roleQueryTable_10();
                break;
        }
    }
    /** $86BD: (043D) 二次跳转 → $86C8 子表 */
    _roleQueryTable_BA() {
        const s = this._store;
        const v = s.read(KEY_043D) & 0xFF;
        switch (v) {
            case 0:
                // $86D0: LDA #$02; STA 043D; JMP $8732
                s.write(KEY_043D, 2);
                this._roleQuery8732();
                break;
            case 1:
                // $86D8: LDA #$00; STA 043D; JMP $8732
                s.write(KEY_043D, 0);
                this._roleQuery8732();
                break;
            case 2:
                // $86E2: LDA #$01; STA 043D; LDA #$05; STA 043E; RTS
                s.write(KEY_043D, 1);
                s.write(KEY_043E, 5);
                break;
            default:
                // $86CA: LDA #$01; STA 043D; JMP $8732
                s.write(KEY_043D, 1);
                this._roleQuery8732();
                break;
        }
    }
    /** $86EE: (043D) 跳转 → $86F9 子表 */
    _roleQueryTable_EB() {
        const s = this._store;
        const v = s.read(KEY_043D) & 0xFF;
        switch (v) {
            case 0:
                // $86FB: LDA #$05; STA 043D; RTS
                s.write(KEY_043D, 5);
                break;
            case 1:
                // $8701: LDA #$04; STA 043D; RTS
                s.write(KEY_043D, 4);
                break;
            case 2:
                // $8705: JMP $86D0
                s.write(KEY_043D, 2);
                this._roleQuery8732();
                break;
            default:
                // $870A: LDA #$01; STA 043E; JMP $86FF
                s.write(KEY_043E, 1);
                s.write(KEY_043D, 4);
                break;
        }
    }
    /** $8713: (043D) 跳转 → $871E 子表 */
    _roleQueryTable_10() {
        const s = this._store;
        const v = s.read(KEY_043D) & 0xFF;
        switch (v) {
            case 0:
                // $8721: A9 03; STA 043D; RTS
                s.write(KEY_043D, 3);
                break;
            case 1:
                // $8725: JMP $86D0
                s.write(KEY_043D, 2);
                this._roleQuery8732();
                break;
            case 2:
                // $872A: LDA #$01; STA 043E; JMP $8721
                s.write(KEY_043E, 1);
                s.write(KEY_043D, 3);
                break;
            default:
                // $871E: JMP $86F9
                s.write(KEY_043D, 5);
                break;
        }
    }
    /** $8732: LDA $0442; LDX $043D; JSR $8D58 (等级映射) */
    _roleQuery8732() {
        const s = this._store;
        s.write(KEY_32, s.read(KEY_0442) & 0xFF); // 入参给 $8D58
        s.write(KEY_CALL_X, s.read(KEY_043D) & 0xFF);
        this.entryLevelMap();
        // $873B: LDA $0430; BEQ $8743; LDA $0431; STA $043E
        if ((s.read(KEY_0430) & 0xFF) !== 0) {
            s.write(KEY_043E, s.read(KEY_0431) & 0xFF);
        }
    }
    /** $875D: LDA $0441; JSR $8A62; LDY $0621; LDA $87C3,Y; ... (真实位置分支) */
    _roleQuery875D() {
        const s = this._store;
        const a = s.read(KEY_0441) & 0xFF;
        // $8760: JSR $8A62
        this._sub8A62(a);
        // $8763-$8769: LDY $0621; LDA $87C3,Y; STA $003C; BEQ $8773
        const y = s.read(KEY_0621) & 0xFF;
        const v = bank28_tables_1.T_POS_87C3[y] ?? 0;
        s.write(KEY_3C, v);
        let idx;
        if (v === 0) {
            idx = this._sub8773();
        }
        else {
            // $876D: JSR $8AB3; JMP $879C
            idx = this._sub8AB3(v);
        }
        this._sub879C(idx);
    }
    /** $8773-$8780: 像素转区域索引 (875D 分支) */
    _sub8773() {
        const s = this._store;
        let idx = 0x14;
        const x = s.read(KEY_0635) & 0xFF;
        if (x < 0xA0) {
            idx = 0x10;
            if (x < 0x60) {
                let yy = s.read(KEY_0637) & 0xFF;
                if (yy & 0x80)
                    yy = (~yy) & 0xFF;
                idx = this._pixelToZone(yy);
            }
        }
        return idx;
    }
    /** $879C: LDY #$04; JSR $8ADE; 计算指针 → JSR $8B0B → STA $043B */
    _sub879C(idx) {
        const s = this._store;
        // $879E: JSR $8ADE (Y=4)
        this._sub8ADE(4, idx);
        // $87A1-$87AB: [003C:003D] = [003C:003D] + $B12E
        const lo = (s.read(KEY_3C) + 0x2E) & 0xFF;
        const hi = (s.read(KEY_3D) + 0xB1 + ((s.read(KEY_3C) + 0x2E) >> 8)) & 0xFF;
        s.write(KEY_3C, lo);
        s.write(KEY_3D, hi);
        // $87AD: JSR $8B0B → A; STA $043B
        const a = this._sub8B0B();
        s.write(KEY_043B, a);
        // $87B3: LDA #$00; STA $043C
        s.write(KEY_043C, 0);
        // $87B8: LDA $003F; JSR $C509 → $87C7 分支表
        const sel = s.read(KEY_3F) & 0xFF;
        this._roleQuery875DTable(sel);
    }
    /** $87CA: (043B) 跳转 → $87DF 子表 */
    _roleQuery875DTable(sel) {
        const s = this._store;
        const v = s.read(KEY_043B) & 0xFF;
        switch (sel) {
            case 0:
                // $87DF: LDA $00E2; AND #$20; BNE $87EC; JMP $8727?  → 简化: 走到 $8A3F
                if ((s.read(KEY_00E2) & 0x20) !== 0) {
                    this._sub8A3F();
                }
                else {
                    this._roleQuery875D_scan();
                }
                break;
            case 1:
                // $87F4: LDA #$02; STA $043B; JMP $8A3F
                s.write(KEY_043B, 2);
                this._sub8A3F();
                break;
            case 2:
                // $87FB: LDA #$03; STA $043B; JSR $8A3F
                s.write(KEY_043B, 3);
                this._sub8A3F();
                break;
            default:
                // $8802+: 扫描匹配场景 (复杂逻辑, 保持忠实)
                this._roleQuery875D_scan();
                break;
        }
    }
    /** $8802-$8849: 按 0635/0637 距离匹配场景扫描 */
    _roleQuery875D_scan() {
        const s = this._store;
        if ((s.read(KEY_043C) & 0xFF) !== 0)
            return; // BNE $8849
        let scene = 0x0C; // LDA #$0C; STA $003A
        for (;;) {
            if (scene === (s.read(KEY_0441) & 0xFF)) {
                this._writeScene05FC(scene);
                return;
            }
            // $8812: JSR $C50C; LDY #$06; LDA (0034),Y → 场景 X 坐标
            this._fixedC50C(scene);
            const ptr = this._readIndirectPtr(KEY_34, KEY_35);
            const sceneX = this._readRamAbs(ptr.lo + (ptr.hi << 8) + 6);
            let dx = (sceneX - (s.read(KEY_0635) & 0xFF)) & 0xFF;
            if ((dx & 0x80) !== 0)
                dx = (((~dx) & 0xFF) + 1) & 0xFF; // abs
            if (dx >= 0x14) {
                scene = (scene + 1) & 0xFF;
                continue;
            }
            const sceneY = this._readRamAbs(ptr.lo + (ptr.hi << 8) + 8);
            let dy = (sceneY - (s.read(KEY_0637) & 0xFF)) & 0xFF;
            if ((dy & 0x80) !== 0)
                dy = (((~dy) & 0xFF) + 1) & 0xFF;
            if (dy < 0x14) {
                this._writeScene05FC(scene);
                return;
            }
            scene = (scene + 1) & 0xFF;
            if (scene === 0x16) {
                this._sub8A3F();
                return;
            }
        }
    }
    /** $8846: JSR $8A09; RTS (把 scene 写入 05FC) */
    _writeScene05FC(scene) {
        this._store.write(KEY_05FC, scene & 0xFF);
        this._sub8A09();
    }
    /** $8A3F: 属性+等级 → 043C 汇总 */
    _sub8A3F() {
        const s = this._store;
        // $8A3F: LDA $0441; LDX $043B; JSR $8C06
        s.write(KEY_32, s.read(KEY_0441) & 0xFF);
        s.write(KEY_CALL_X, s.read(KEY_043B) & 0xFF);
        this.entryMatchInit();
        // $8A48: LDA $0430; BEQ $8A50; LDA $0431
        let v = (s.read(KEY_0430) & 0xFF) !== 0 ? (s.read(KEY_0431) & 0xFF) : 0;
        s.write(KEY_043C, v);
        // $8A53: TAX; BNE $8A61
        if (v === 0) {
            // $8A56: LDA $043B; BNE $8A61
            if ((s.read(KEY_043B) & 0xFF) === 0) {
                // $8A5B: LDA $044E; STA $043C
                s.write(KEY_043C, s.read(KEY_044E) & 0xFF);
            }
        }
    }
    /** $8A62: 角色属性解析 (名字区 → 属性指针 $9662 区) */
    _sub8A62(a) {
        const s = this._store;
        // $8A62: PHA; JSR $C50C
        this._fixedC50C(a);
        // $8A66-$8A6A: LDY #$00; LDA (0034),Y; BNE $8A74
        const ptr34 = this._readIndirectPtr(KEY_34, KEY_35);
        const name0 = this._readRamAbs(ptr34.lo + (ptr34.hi << 8));
        let v;
        if (name0 === 0) {
            // $8A6E: TAX; LDY $8A9D,X; LDA (0038),Y
            v = this._readIndirectBank8A9D(a);
        }
        else {
            v = name0;
        }
        // $8A74: TAX
        // $8A75: LDY #$01; LDA (0034),Y; BPL $8A7F
        const name1 = this._readRamAbs(ptr34.lo + (ptr34.hi << 8) + 1);
        if (name1 & 0x80) {
            // $8A7C: LDA (0034),Y (Y=2)
            v = this._readRamAbs(ptr34.lo + (ptr34.hi << 8) + 2);
        }
        // $8A7F-$8A84: TXA; SEC; SBC #$23 → 属性值
        let val = (v - 0x23) & 0xFF;
        // $8A85-$8AA4: 16bit *5 → + $9662
        let hi = 0;
        val = (val << 1) & 0xFF;
        hi = (hi << 1) | (val >> 8);
        val = (val << 1) & 0xFF;
        hi = (hi << 1) | (val >> 8);
        const lo2 = val;
        const hi2 = hi;
        val = (val << 1) & 0xFF;
        hi = (hi << 1) | (val >> 8);
        val = (val + lo2) & 0xFF;
        hi = (hi + hi2 + ((val - lo2) >> 8)) & 0xFF;
        // $8A9D: CLC; ADC #$62; STA $003A; TXA; ADC #$96; STA $003B
        val = (val + 0x62) & 0xFF;
        hi = (hi + 0x96) & 0xFF;
        s.write(KEY_3A, val);
        s.write(KEY_3B, hi);
    }
    /** $8A9D 表读取 (LDY $8A9D,X; LDA (0038),Y) */
    _readIndirectBank8A9D(x) {
        // $8A6F: LDY $8A9D,X (读 bank28 字节)
        const y = bank28_tables_1.T_ATTR_ROLE_8A9D[x & 0xFF] ?? 0;
        const ptr = this._readIndirectPtr(KEY_38, KEY_39);
        return (0, bank28_tables_1.readB28)(ptr.lo + (ptr.hi << 8) + y);
    }
    /** $8AB3: 距离/方向表 ($8B9E) 查询 */
    _sub8AB3(v) {
        const s = this._store;
        // $8AB3: LDA $0635; BPL; EOR #$FF; TAX
        let x = s.read(KEY_0635) & 0xFF;
        if (x & 0x80)
            x = (~x) & 0xFF;
        // $8ABB: LDA $0637; BPL; EOR #$FF; TAY
        let y = s.read(KEY_0637) & 0xFF;
        if (y & 0x80)
            y = (~y) & 0xFF;
        // $8AC3: JSR $C539 → A (像素索引)
        const a = this._fixedC539(x, y);
        // $8AC6-$8AD1: 在 $8B9E 表中匹配
        let result = 0;
        for (let i = 0; i + 1 < bank28_tables_1.T_DIST_DIR.length; i += 2) {
            if (bank28_tables_1.T_DIST_DIR[i] === a) {
                result = bank28_tables_1.T_DIST_DIR[i + 1];
                break;
            }
        }
        // $8AD4: LDX $003C; CPX #$01; BEQ $8ADD
        if (v !== 1) {
            result = (result + 0x0C) & 0xFF; // $8ADB: ADC #$0C
        }
        return result;
    }
    /** $8ADE: 把 A 存入 $003E, $003C→$003F, 计算场景索引 */
    _sub8ADE(y, a) {
        const s = this._store;
        // $8ADE: STA $003E
        s.write(KEY_3E, a & 0xFF);
        // $8AE0: LDA $003C; STA $003F
        s.write(KEY_3F, s.read(KEY_3C) & 0xFF);
        // $8AE4-$8AE9: TYA; CLC; ADC $003C; TAY; LDA ($003A),Y
        const base = this._readIndirectPtr(KEY_3A, KEY_3B);
        const yy = (y + (s.read(KEY_3C) & 0xFF)) & 0xFF;
        const v = (0, bank28_tables_1.readB28)(base.lo + (base.hi << 8) + yy);
        // $8AEB: JSR $8AEB (16bit 乘法 A*0x30) → [003C:003D]
        const [lo, hi] = this._sub8AEB(v);
        s.write(KEY_3C, lo);
        s.write(KEY_3D, hi);
    }
    /** $8AEB: A << 4 后 *3 → 16bit 结果 {lo,hi} */
    _sub8AEB(a) {
        let val = a & 0xFF;
        let hi = 0;
        // 4× (ASL; ROL $003D) → val<<4, hi
        for (let i = 0; i < 4; i++) {
            val = (val << 1) & 0xFF;
            hi = (hi << 1) | ((val >> 8) & 1);
        }
        const lo2 = val;
        const hi2 = hi;
        // 1× (ASL; ROL $003D) → val<<1
        val = (val << 1) & 0xFF;
        hi = (hi << 1) | ((val >> 8) & 1);
        // ADC $003C (低字节), TYA; ADC $003D (高字节)
        val = (val + lo2) & 0xFF;
        hi = (hi + hi2) & 0xFF;
        return [val, hi];
    }
    /** $8B0B: 读 (003C),Y 低半字节 */
    _sub8B0B() {
        const s = this._store;
        // $8B0B: LDA $00E2; AND #$07; LSR; PHP; CLC; ADC $003E; TAY
        const e2 = s.read(KEY_00E2) & 0xFF;
        let idx = (e2 & 0x07) >> 1;
        const carry = (e2 & 0x01) !== 0; // LSR 进位 = 原 bit0
        idx = (idx + (s.read(KEY_3E) & 0xFF)) & 0xFF;
        // $8B16: LDA ($003C),Y
        const ptr = this._readIndirectPtr(KEY_3C, KEY_3D);
        let v = (0, bank28_tables_1.readB28)(ptr.lo + (ptr.hi << 8) + idx);
        // $8B18: PLP; BCS $8B1F (进位=1 → 跳过 LSR×4)
        if (!carry) {
            v = (v >> 4) & 0x0F;
        }
        else {
            v = v & 0x0F;
        }
        return v;
    }
    // ──────────────────────────────────────────────
    // [0] $8B22: 场景/角色数据清零 + 名字区初始化
    // ──────────────────────────────────────────────
    /**
     * 对应 $8B22-$8B93: 角色数据清零循环 + 名字区指针装载。
     *
     * 原实现被误标为"场景位置缓存"。真实 asm:
     *  1) 对角色 ID $0B-$15 逐个 JSR $C50C (→名字区指针),
     *     清空 (0034),0 与 (0034),1 两字节 (角色数据清零)。
     *  2) 读 ram_002B → 查 $BAB2 指针表 (外部固定区) → (0038) 指针;
     *     解析首字节低/高半字节 → ram_002E/002F。
     *  3) 从 (0038),9 起循环写名字区字段 (数值 +$0A)。
     *  4) 队伍校验标志 ram_0446 更新。
     */
    entryScenePosition() {
        const s = this._store;
        // ── 1) 角色数据清零循环 ($8B22-$8B37) ──
        // $8B22: LDA #$0B
        for (let id = 0x0B; id < 0x16; id++) {
            // $8B25: JSR $C50C → (0034) = 名字区指针
            this._fixedC50C(id);
            const ptr = this._readIndirectPtr(KEY_34, KEY_35);
            const base = ptr.lo + (ptr.hi << 8);
            // $8B2C: STA (0034),Y (Y=0); INY; STA (0034),Y (Y=1)
            this._writeRamAbs(base, 0);
            this._writeRamAbs(base + 1, 0);
        }
        // ── 2) 名字区指针装载 ($8B39-$8B5A) ──
        // $8B3C: SBC #$03; ASL; TAX; LDA $BAB2,X → 0038; LDA $BAB3,X → 0039
        const idx2b = (((s.read(KEY_002B) & 0xFF) - 3) << 1) & 0xFF;
        const ptr2 = this._readBAB2(idx2b);
        s.write(KEY_38, ptr2 & 0xFF);
        s.write(KEY_39, (ptr2 >> 8) & 0xFF);
        // $8B4D: LDA ($0038),Y (Y=0)
        const b0 = (0, bank28_tables_1.readB28)(ptr2);
        s.write(KEY_002E, b0 & 0x0F); // AND #$0F → 002E
        s.write(KEY_002F, (b0 >> 4) & 0x0F); // LSR×4 → 002F
        // ── 3) 名字区字段循环写 ($8B5D-$8B7B) ──
        // $8B5F: STY $003A (Y=9)
        let yy = 9;
        // H5 防御: 真实 ROM 以 $0F 终止; 若 _readBAB2 stub 指向无 $0F 的数据, 限次避免死循环
        let guard = 0;
        for (;;) {
            // $8B63: LDA ($0038),Y
            const b = (0, bank28_tables_1.readB28)(ptr2 + yy);
            if (b === 0x0F)
                break; // BEQ $8B7E (CMP #$0F)
            // $8B6A: CLC; ADC #$0A; JSR $C50C
            const id2 = (b + 0x0A) & 0xFF;
            this._fixedC50C(id2);
            // $8B6F-$8B75: LDY $003A; INY; LDA ($0038),Y; INY; STY $003A
            const b2 = (0, bank28_tables_1.readB28)(ptr2 + yy + 1);
            yy = (yy + 2) & 0xFF;
            // $8B79: STA (0034),Y (Y=0)
            const p3 = this._readIndirectPtr(KEY_34, KEY_35);
            this._writeRamAbs(p3.lo + (p3.hi << 8), b2);
            if (++guard >= 64)
                break; // 限次保护 (stub $BAB2 TODO)
        }
        // ── 4) 队伍校验标志 ($8B7E-$8B93) ──
        // $8B81: CPX #$05; BEQ $8B90
        if ((s.read(KEY_0446) & 0xFF) === 5)
            return;
        // $8B87: LDA $0384; CMP #$26; BNE $8B90
        let flag = 0;
        if ((s.read(KEY_0384) & 0xFF) === 0x26) {
            flag = 2; // INX; INX
        }
        s.write(KEY_0446, flag);
    }
    /** $BAB2 指针表 (固定区, 外部 bank) — H5 以 PRG 方式读取 */
    _readBAB2(idx) {
        // $BAB2 位于固定区 (非 bank28), H5 无 MMC3 映射 → 返回安全默认
        // 真实游戏: 查 $BAB2 表 16bit LE 指针 → 队伍名字区数据
        void idx;
        return 0x8F07; // 默认指向场景数据区 (合理默认)
    }
    /** 读取某个场景第 slot 个 2B 数据 (兼容旧 API, 基于 T_SCENE_PTR) */
    readSceneData(sceneId, slot) {
        const ptrIdx = (sceneId & 0x1F) * 2;
        const dataAddr = (0, bank28_tables_1.readB28U16)(0x8E1B + ptrIdx);
        const base = dataAddr - bank28_tables_1.B28_CPU_BASE + (slot & 0x07) * 2;
        return bank28_tables_1.SCENE_DATA[base] | (bank28_tables_1.SCENE_DATA[base + 1] << 8);
    }
    // ──────────────────────────────────────────────
    // [2] $8C06: 比赛状态初始化
    // ──────────────────────────────────────────────
    /**
     * 对应 $8C06-$8C07: 简化版比赛状态初始化。
     * 完整 $8C06 涉及 (0048) 指针链 + $8DC9, 供 $8C13 等路径。
     */
    entryMatchInit() {
        const s = this._store;
        // $8C06: LDA #$00; CMP #... (原代码比较阶段)
        // 这里保留既有语义: 清理比赛状态区
        for (let i = 0x500; i <= 0x57F; i++) {
            s.write(`ram_${i.toString(16).toUpperCase().padStart(4, '0')}`, 0);
        }
        s.write('ram_0060', 0x00);
        s.write('ram_0061', 0x00);
        s.write(KEY_043B, 0);
    }
    // ──────────────────────────────────────────────
    // [3] $8D58: 等级/经验映射入口
    // ──────────────────────────────────────────────
    /**
     * 对应 $8D58-$8DA5: 经验 → 等级 主入口。
     * 通常从 Bank26/30 调用, 读取 ram_0032 中的经验值。
     */
    entryLevelMap() {
        const exp = this._store.read(KEY_32) & 0xFF;
        this.lookupLevel(exp);
    }
    // ──────────────────────────────────────────────
    // [7] $852E: 队伍数据查询
    // ──────────────────────────────────────────────
    /**
     * 对应 $852E-$85B4: 按队伍/角色查表。
     */
    entryTeamQuery() {
        const s = this._store;
        // $852E-$8530: LDA ($0038),Y (读名字区首字节)
        const ptr = this._readIndirectPtr(KEY_38, KEY_39);
        const v = (0, bank28_tables_1.readB28)(ptr.lo + (ptr.hi << 8));
        // $8532: AND #$01; ASL; ADC $061E; STA $061E
        let bit = ((v & 0x01) << 1) & 0xFF;
        s.write(KEY_061E, (bit + (s.read(KEY_061E) & 0xFF)) & 0xFF);
        // $853B-$8544: LSR×4; CLC; ADC #$0A → 0441
        const roleType = ((v >> 4) & 0x0F) + 0x0A;
        s.write(KEY_0441, roleType & 0xFF);
        // $8547: LDA #$00; STA $003C
        s.write(KEY_3C, 0);
        // $854B-$854D: LDY #$07; LDA ($0038),Y; JSR $8AEB
        const v7 = (0, bank28_tables_1.readB28)(ptr.lo + (ptr.hi << 8) + 7);
        const [lo, hi] = this._sub8AEB(v7);
        // $8553-$855C: CLC; LDA $003C; ADC #$2E; STA $003C; TXA; ADC #$B1; STA $003D
        const nlo = (lo + 0x2E) & 0xFF;
        const nhi = (hi + 0xB1) & 0xFF;
        s.write(KEY_3C, nlo);
        s.write(KEY_3D, nhi);
        // $855E: LDA #$00; STA $043C; STA $003E
        s.write(KEY_043C, 0);
        s.write(KEY_3E, 0);
        // $8565: JSR $8B0B → A; STA $043B
        const a = this._sub8B0B();
        s.write(KEY_043B, a);
        // $856E: JSR $C509 → 队伍分支表
        this._teamQueryBranch(s.read(KEY_043B) & 0xFF);
    }
    /** $8571 队伍分支表 (入口在 $856E 之后) */
    _teamQueryBranch(sel) {
        const s = this._store;
        switch (sel) {
            case 0:
                // $8585: LDY #$08; LDA ($0038),Y; JSR $895E
                {
                    const ptr = this._readIndirectPtr(KEY_38, KEY_39);
                    const v = (0, bank28_tables_1.readB28)(ptr.lo + (ptr.hi << 8) + 8);
                    this._sub895E(v);
                }
                break;
            default:
                // $858A: LSR; LSR; CMP #$0F; BNE $8596; JSR $8A20; JMP $8599
                {
                    const ptr = this._readIndirectPtr(KEY_38, KEY_39);
                    const v = (0, bank28_tables_1.readB28)(ptr.lo + (ptr.hi << 8) + 8);
                    let val = v;
                    this._sub895E(val);
                    val = (val >> 2) & 0xFF;
                    if (val === 0x0F) {
                        this._sub8A20();
                        this._teamQueryFinish(val);
                    }
                    else {
                        this._teamQueryFinish(val);
                    }
                }
                break;
        }
    }
    /** $8596-$85B4: 队伍查询收尾 */
    _teamQueryFinish(val) {
        const s = this._store;
        // $8596: CLC; ADC #$0A; CMP $0441
        let v = (val + 0x0A) & 0xFF;
        if (v === (s.read(KEY_0441) & 0xFF)) {
            // $859E: CLC; ADC #$01; CMP #$16; BCC $85A7
            v = (v + 1) & 0xFF;
            if (v >= 0x16) {
                v = 0x0C; // $85A5: LDA #$0C
            }
        }
        // $85A7: JSR $8A09
        this._sub8A09();
        // $85AA: LDA #$01; STA $043B; LDA #$00; STA $043C; RTS
        s.write(KEY_043B, 1);
        s.write(KEY_043C, 0);
    }
    /** $895E: 角色数据 ×$30 → 指针读取 */
    _sub895E(a) {
        const s = this._store;
        // $895E: LDX #$00; STX $003D; ASL×3 → 003C
        let val = a & 0xFF;
        let hi = 0;
        for (let i = 0; i < 3; i++) {
            val = (val << 1) & 0xFF;
            hi = (hi << 1) | ((val >> 8) & 1);
        }
        // $896B: ADC #$2E; STA $003C; LDA $003D; ADC #$B7; STA $003D
        val = (val + 0x2E) & 0xFF;
        hi = (hi + 0xB7) & 0xFF;
        s.write(KEY_3C, val);
        s.write(KEY_3D, hi);
        // $8975-$897B: LDA $00E2; AND #$07; TAY; LDA ($003C),Y
        const y = (s.read(KEY_00E2) & 0x07);
        const ptr = this._readIndirectPtr(KEY_3C, KEY_3D);
        s.write(KEY_3E, (0, bank28_tables_1.readB28)(ptr.lo + (ptr.hi << 8) + y));
    }
    /** $8A09: 场景坐标写入 (JSR $C50C; 读取 (0034),6/8; JSR $C539; STA $0638) */
    _sub8A09() {
        const s = this._store;
        // $8A0C: JSR $C50C (A=05FC 场景)
        const scene = s.read(KEY_05FC) & 0xFF;
        this._fixedC50C(scene);
        const ptr = this._readIndirectPtr(KEY_34, KEY_35);
        const x = this._readRamAbs(ptr.lo + (ptr.hi << 8) + 6); // (0034),6
        const y = this._readRamAbs(ptr.lo + (ptr.hi << 8) + 8); // (0034),8
        const idx = this._fixedC539(x, y);
        s.write(KEY_0638, idx);
    }
    /** $8A20: 场景字段扫描 */
    _sub8A20() {
        const s = this._store;
        // $8A20: LDA $00E2; ADC $00E3; AND #$0F
        let v = ((s.read(KEY_00E2) & 0xFF) + (s.read(KEY_00E3) & 0xFF)) & 0xFF;
        v &= 0x0F;
        if (v >= 0x0A)
            v = (v - 0x0A) & 0xFF; // SBC #$0A
        // $8A2E: CLC; ADC #$0C; CMP $0441
        v = (v + 0x0C) & 0xFF;
        if (v === (s.read(KEY_0441) & 0xFF)) {
            // $8A36: ADC #$01; CMP #$16; BCC $8A3E
            v = (v + 1) & 0xFF;
            if (v >= 0x16) {
                v = 0x0C; // $8A3C: LDA #$0C
            }
        }
        s.write(KEY_05FC, v);
    }
    // ──────────────────────────────────────────────
    // [8] $846A: 区域/坐标检查
    // ──────────────────────────────────────────────
    /**
     * 对应 $846A-$8498: 检查 (X,Y) 是否落在某个 T_ZONE_COORD 区域。
     */
    entryZoneCheck() {
        const s = this._store;
        s.write(KEY_0628, 0);
        const sceneParam = s.read(KEY_043C) & 0x3F;
        if (sceneParam !== 0)
            return;
        // $8476-$8479: LDX $0635; LDY $0637; JSR $8499
        const x = s.read(KEY_0635) & 0xFF;
        const y = s.read(KEY_0637) & 0xFF;
        const r = this._sub8499(x, y);
        // $847F: TAX; BNE $8498
        if (r !== 0)
            return;
        // $8482: LDA $0638; JSR $C536 (线性索引→坐标)
        const a = s.read(KEY_0638) & 0xFF;
        const xy = this._fixedC536(a);
        // $8488: JSR $8499
        const r2 = this._sub8499(xy.x, xy.y);
        // $848B: CMP #$00; BEQ $8498
        if (r2 === 0)
            return;
        // $848F: CMP #$04; BEQ $8498
        if (r2 === 4)
            return;
        s.write(KEY_0628, 0x80);
    }
    /** $8499: 区域匹配 (05FB 分支 + $C539 → $8BBE 表) */
    _sub8499(x, y) {
        const s = this._store;
        // $8499: LDA $05FB; BNE $84A2; TXA; EOR #$FF; TAX
        let xx = x;
        if ((s.read(KEY_05FB) & 0xFF) === 0) {
            xx = (~x) & 0xFF;
        }
        // $84A2: CPX #$60; BCS $84BE (返回 0xFF via PLA;PLA;RTS)
        if (xx >= 0x60)
            return 0xFF;
        // $84A6: TYA; BPL $84AB; EOR #$FF; TAY
        let yy = y;
        if (yy & 0x80)
            yy = (~yy) & 0xFF;
        // $84AC: JSR $C539 → 像素索引
        const idx = this._fixedC539(xx, yy);
        // $84B1: LDX #$00; CMP $8BBE,X; BEQ → LDA $8BBF,X
        for (let i = 0; i + 1 < bank28_tables_1.T_ZONE_COORD.length; i += 2) {
            if (bank28_tables_1.T_ZONE_COORD[i] === idx) {
                return bank28_tables_1.T_ZONE_COORD[i + 1];
            }
        }
        return 0xFF;
    }
    // ──────────────────────────────────────────────
    // [9] $82CA: OAM 初始化
    // ──────────────────────────────────────────────
    /**
     * 对应 $82CA-$8309: 初始化 OAM/精灵缓冲区 ram_04A5 区域。
     * $82CA 首指令为 JSR $C52D (清 OAM + 基础精灵组), 其后为 12 组循环复制。
     */
    entryOamInit() {
        const s = this._store;
        // $82CA: JSR $C52D (固定区, 清 OAM + 构建基础精灵组)
        this._fixedC52D();
        // $82CD: LDA #$00; STA $0011; STA $0012
        s.write('ram_0011', 0);
        s.write('ram_0012', 0);
        // $82D3: LDA #$4A; STA $0061; LDA #$83; STA $0062
        s.write(KEY_61, 0x4A);
        s.write(KEY_62, 0x83);
        // $82D8-$8307: 12 组 OAM 构建循环
        let a = 0;
        for (;;) {
            // $82DD: JSR $C515 (渲染同步, H5 空)
            this._fixedC515();
            // $82E0-$82E6: LDA $0515; BNE $82DD (忙等待)
            // H5 同步环境无渲染消费线程, busy 不会自动归零 → 跳过忙等待, 直接构建
            this._store.oam.beginBuild(); // LDA #$01; STA $0515
            // $82EE: LDX #$00; JSR $830A
            this._oamInitGroup(a);
            // $82F6: PLA; CLC; ADC #$01; JSR $830A
            a = (a + 1) & 0xFF;
            this._oamInitGroup(a);
            // $82FC: LDA #$80; STA $0515
            this._store.oam.endBuild();
            // $8301-$8305: PLA; CLC; ADC #$01; CMP #$0C; BNE $82DD
            a = (a + 1) & 0xFF;
            if (a === 0x0C)
                break;
        }
    }
    /** $830A-$8348: 单组 OAM 构建 */
    _oamInitGroup(a) {
        const s = this._store;
        const oam = s.oam;
        // $830A: PHA (A=组号)
        // $830D: LDA #$18; STA $04A5,X
        oam.writeByte(0, 0x18);
        // $8312: LDA #$40; STA $04A6,X
        oam.writeByte(1, 0x40);
        // $8315-$8327: PLA; CLC; ADC #$11; LSR×3 (ROR 04A6); ORA #$20; STA $04A7,X
        let v = (a + 0x11) & 0xFF;
        v = v >> 3;
        v |= 0x20;
        oam.writeByte(2, v);
        // $832A-$8338: INX×3; LDY #$00; 复制 (0061) 24B 到 $04A5,X
        const ptr = this._readIndirectPtr(KEY_61, KEY_62);
        const base = ptr.lo + (ptr.hi << 8);
        const block = [];
        for (let y = 0; y < 0x18; y++)
            block.push((0, bank28_tables_1.readB28)(base + y));
        oam.writeBlock(3, block);
        // $833A-$8348: LDA #$00; STA $04A5,X; TYA; CLC; ADC $0061; STA $0061; BCC; INC $0062
        oam.writeByte(3 + 0x18, 0);
        const newBase = base + 0x18;
        s.write(KEY_61, newBase & 0xFF);
        s.write(KEY_62, (newBase >> 8) & 0xFF);
    }
    // ════════════════════════════════════════════
    // 内部: $803A 属性查询 (完整翻译)
    // ════════════════════════════════════════════
    /**
     * 对应 $803A-$818D: 角色属性/能力指针查询 (完整).
     * 输入 A=角色类型/参数, X=场景索引. 输出 ram_0032:0033.
     */
    _queryRoleAttributes(roleType, paramA) {
        const s = this._store;
        const a = (paramA ?? roleType) & 0xFF;
        // $803A: PHA (保存 a)
        // $803B: JSR $C50C → (0034) = $0300 + a*12
        this._fixedC50C(a);
        // $803E-$8042: LDY #$00; LDA (0034),Y; BNE $8050
        const ptr34 = this._readIndirectPtr(KEY_34, KEY_35);
        let name0 = this._readRamAbs(ptr34.lo + (ptr34.hi << 8));
        let v;
        if (name0 === 0) {
            // $8044-$804E: PLA; PHA; SEC; SBC #$0B; TAY; LDA $818E,Y; TAY; LDA (0038),Y
            const y = (a - 0x0B) & 0xFF;
            const rt = bank28_tables_1.T_ROLE_TYPE[y] ?? 0;
            const ptr38 = this._readIndirectPtr(KEY_38, KEY_39);
            v = (0, bank28_tables_1.readB28)(ptr38.lo + (ptr38.hi << 8) + rt);
        }
        else {
            v = name0;
        }
        // $8050: CMP #$23
        const ge23 = v >= 0x23;
        if (ge23) {
            // $8055-$8062: PHA; LDY #$01; LDA (0034),Y; BPL $8061; PLA; INY; LDA (0034),Y; PHA; PLA
            const name1 = this._readRamAbs(ptr34.lo + (ptr34.hi << 8) + 1);
            if (name1 & 0x80) {
                // $805D-$805E: INY; LDA (0034),Y → name[2]
                v = this._readRamAbs(ptr34.lo + (ptr34.hi << 8) + 2);
            }
            // $8062: SBC #$23
            v = (v - 0x23) & 0xFF;
        }
        // $8064-$806E: LDY #$00; STY $0033; ASL; ROL $0033; ASL; ROL $0033; STA $0032
        let lo = (v << 2) & 0xFF;
        let hi = (v >> 6) & 0x03;
        // $8070: PLP (原 flag); BCC $8083 (若 v<0x23 跳过 *3)
        let yReg = 0; // $8064: LDY #$00
        if (ge23) {
            // $8073-$807F: LDY $0033; ASL; ROL $0033; ADC $0032; STA $0032; TYA; ADC $0033; STA $0033
            lo = ((lo << 1) & 0xFF) + (v << 2 & 0xFF);
            hi = (hi * 3) & 0xFF;
            yReg = 2; // $8081: LDY #$02
        }
        lo &= 0xFF;
        hi &= 0xFF;
        // $8083-$8090: CLC; LDA $0032; ADC $8199,Y; STA $0032; LDA $0033; ADC $819A,Y; STA $0033
        lo = (lo + bank28_tables_1.T_ATTR_BASE[yReg * 2]) & 0xFF;
        hi = (hi + bank28_tables_1.T_ATTR_BASE[yReg * 2 + 1]) & 0xFF;
        s.write(KEY_32, lo);
        s.write(KEY_33, hi);
        // $8092: PLA (恢复原 a)
        // $8093-$8097: CPX #$1F; BCC $809A; JMP $813F
        const x = s.read(KEY_CALL_X) & 0xFF;
        if (x >= 0x1F) {
            this._attributeHighRange(x);
            return;
        }
        // $809A-$80A6: 特殊 X 分支
        if (x === 0 || x === 0x0B || x === 0x1E || x === 0x1F) {
            this._attributeSpecial(x);
        }
    }
    /** $813F-$817D: X >= $1F 的高范围处理 */
    _attributeHighRange(x) {
        const s = this._store;
        if (x < 0x25) {
            // $8141-$817B
            let ptr = (s.read(KEY_32) | (s.read(KEY_33) << 8));
            // $8143-$8148: LDY #$01; LDA (0032),Y; DEY; STY $0033
            const v = (0, bank28_tables_1.readB28)(ptr + 1);
            // $814A-$815C: ASL; ROL $0033; ASL; ROL $0033; STA $0032; LDY $0033; ASL; ROL $0033; ADC $0032; STA $0032; TYA; ADC $0033; TAY
            let lo = (v << 2) & 0xFF;
            let hi = (v >> 6) & 0x03;
            const lo2 = lo;
            const hi2 = hi;
            lo = ((lo << 1) & 0xFF) + lo2;
            hi = (hi * 3) & 0xFF;
            // $815F-$8169: LDA $0032; CLC; ADC #$AE; STA $0032; TYA; ADC #$AF; STA $0033
            lo = (lo + 0xAE) & 0xFF;
            hi = (hi + 0xAF) & 0xFF;
            // $816B-$8170: TXA; SEC; SBC #$1F; ASL; TAY
            const idx = ((x - 0x1F) * 2) & 0xFF;
            // $8171-$8179: LDA (0032),Y; TAX; INY; LDA (0032),Y; STA $0033; STX $0032
            const xLo = (0, bank28_tables_1.readB28)(lo + (hi << 8) + idx);
            const xHi = (0, bank28_tables_1.readB28)(lo + (hi << 8) + idx + 1);
            s.write(KEY_32, xLo);
            s.write(KEY_33, xHi);
        }
        else {
            // $817E-$8189: TXA; SEC; SBC #$23; TAY; LDA (0032),Y; STA $0032; LDA #$00; STA $0033
            const ptr = (s.read(KEY_32) | (s.read(KEY_33) << 8));
            const y = (x - 0x23) & 0xFF;
            s.write(KEY_32, (0, bank28_tables_1.readB28)(ptr + y));
            s.write(KEY_33, 0);
        }
    }
    /** $80A8-$813C: 特殊属性处理 */
    _attributeSpecial(x) {
        const s = this._store;
        let ptr = s.read(KEY_32) | (s.read(KEY_33) << 8);
        let v = (0, bank28_tables_1.readB28)(ptr);
        let hi = 0;
        if (x !== 0) {
            // $80B2-$80C3: ASL×3; ADC #$86; STA $0032; LDA $0033; ADC #$AE; STA $0033
            v = (v << 3) & 0xFF;
            hi = (v >> 8) & 0x07;
            v = (v + 0x86) & 0xFF;
            hi = (hi + 0xAE) & 0xFF;
            // $80C5-$80CC: TXA; BEQ $80CB; SEC; SBC #$17; TAY; LDA (0032),Y
            const y = (x - 0x17) & 0xFF;
            v = (0, bank28_tables_1.readB28)(v + (hi << 8) + y);
            this._attrSpecialC(v, x);
            return;
        }
        // $80D1-$80F8: 全量 (LDA (0032),Y; ASL×3; *3 → +$9FCE; TXA; TAY; BEQ $8113)
        let lo = v;
        hi = 0;
        for (let i = 0; i < 3; i++) {
            lo = (lo << 1) & 0xFF;
            hi = (hi << 1) | ((lo >> 8) & 1);
        }
        const lo2 = lo;
        const hi2 = hi;
        lo = ((lo << 1) & 0xFF) + lo2;
        hi = (hi * 3) & 0xFF;
        lo = (lo + 0xCE) & 0xFF;
        hi = (hi + 0x9F) & 0xFF;
        // $80F9-$8112: BEQ $8113 (x=0) → LDA ($0032),Y; PHA; LDY #$03; LDA (0034),Y; ASL; STA $0032; PLA; ADC $0032; TAY; CPY #$C0; BCC; STY $0032
        const offset = this._readRamAbs(this._readIndirectPtr(KEY_34, KEY_35).lo + (this._readIndirectPtr(KEY_34, KEY_35).hi << 8) + 3);
        let result = ((0, bank28_tables_1.readB28)(lo + (hi << 8)) + ((offset << 1) & 0xFF)) & 0xFF;
        if (result >= 0xC0)
            result = 0xBF; // $8110: STY $0032 (Y=$BF)
        s.write(KEY_32, result);
        s.write(KEY_33, 0);
    }
    /** $80F9 (x!=0) 路径: (0034),3 偏移修正 */
    _attrSpecialC(v, x) {
        const s = this._store;
        // $80FE: PHA; LDY #$03; LDA (0034),Y; ASL; STA $0032; PLA; ADC $0032; TAY; CPY #$C0; BCC
        const ptr = this._readIndirectPtr(KEY_34, KEY_35);
        const offset = this._readRamAbs(ptr.lo + (ptr.hi << 8) + 3);
        let result = (v + ((offset << 1) & 0xFF)) & 0xFF;
        if (result >= 0xC0)
            result = 0xBF;
        s.write(KEY_32, result);
        s.write(KEY_33, 0);
        void x;
    }
    // ════════════════════════════════════════════
    // 内部: 配置块读取
    // ════════════════════════════════════════════
    /**
     * 读取 4B 对阵配置块 (Y = 043C/043E * 4):
     *   (ptr),Y → ram_0444/0445
     *   (ptr),Y+1 → X
     *   (ptr),Y+2 → ram_043F
     *   (ptr),Y+3 & 03 → ram_0440
     *   (ptr),Y+3 >> 3 → ram_0443
     */
    _loadMatchConfigBlock(cpuAddr, y4, isHome) {
        const s = this._store;
        const base = cpuAddr + y4;
        const b0 = (0, bank28_tables_1.readB28)(base);
        const b1 = (0, bank28_tables_1.readB28)(base + 1);
        const b2 = (0, bank28_tables_1.readB28)(base + 2);
        const b3 = (0, bank28_tables_1.readB28)(base + 3);
        s.write(isHome ? KEY_0444 : KEY_0445, b0);
        s.write(KEY_043F, b2);
        s.write(KEY_0440, b3 & 0x03);
        s.write(KEY_0443, (b3 & 0xF8) >> 3);
        s.write(KEY_32, b1); // X → 后续等级查询
    }
    /** $8278-$828E: 从 ram_0032 查等级表 */
    _finalizeLevelFrom032() {
        const s = this._store;
        // $827C: CLC; ADC $0032 (PLA 的 Y 值 + 0032)
        let x = (s.read(KEY_CALL_Y) & 0xFF) + (s.read(KEY_32) & 0xFF);
        x &= 0xFF;
        if (x >= 0xC0)
            x = 0xBF; // $8282: LDA #$BF
        const level = bank28_tables_1.T_LEVEL_MAP[x];
        s.write(KEY_32, level);
        s.write(KEY_33, 0);
    }
    /**
     * $8203 陷阱: 原 ROM 为 JMP $8203 死循环 (不可达保护)。
     * 在 H5 中到达表示队伍索引损坏, 记录警告而不是静默返回。
     */
    _skipTo8203() {
        // eslint-disable-next-line no-console
        console.warn('[Bank28] 到达 $8203 陷阱: 队伍配置索引无效 (原 ROM 死循环)');
    }
    // ════════════════════════════════════════════
    // 内部: 区域检查辅助
    // ════════════════════════════════════════════
    _coordinateTransform(x) {
        const s = this._store;
        if ((s.read(KEY_05FB) & 0xFF) === 0) {
            return (~x) & 0xFF;
        }
        return x;
    }
    _findZone(x, y) {
        for (let i = 0; i < bank28_tables_1.T_ZONE_COORD.length; i += 2) {
            if (bank28_tables_1.T_ZONE_COORD[i] === x && bank28_tables_1.T_ZONE_COORD[i + 1] === y) {
                return i >> 1;
            }
        }
        return 0xFF;
    }
    // ════════════════════════════════════════════
    // 内部: 固定区 helper (bank30, H5 语义化)
    // ════════════════════════════════════════════
    /** $C50C→$CD7C (bank30): A(ID) → (ram_0034) = $0300 + A*12 名字区指针 */
    _fixedC50C(id) {
        const ptr = 0x0300 + ((id & 0xFF) * 12);
        this._store.write(KEY_34, ptr & 0xFF);
        this._store.write(KEY_35, (ptr >> 8) & 0xFF);
    }
    /** $C536→$CDC9 (bank30): A 线性索引 → 场地坐标 */
    _fixedC536(a) {
        let rem = a & 0xFF;
        let q = 0;
        while (rem >= 0x0C) {
            rem = (rem - 0x0C) & 0xFF;
            q++;
        }
        return {
            x: (((q << 3) & 0xFF) + 0x34) & 0xFF,
            y: (((rem << 3) & 0xFF) + 0x54) & 0xFF,
        };
    }
    /** $C539→$CDE2 (bank30): (X,Y) 像素 → 精灵位置索引 */
    _fixedC539(x, y) {
        const a = (x & 0xFF) - 0x30;
        if (a < 0)
            return 0xFF;
        if (a >= 0xA0)
            return 0xFF;
        const column = a >> 3;
        const b = (y & 0xFF) - 0x50;
        if (b < 0)
            return 0xFF;
        if (b >= 0x60)
            return 0xFF;
        const row = b >> 3;
        return (row + 12 * column) & 0xFF;
    }
    /** $C52D→$CC46 (bank30): 清 OAM 并构建基础精灵组 */
    _fixedC52D() {
        const oam = this._store.oam;
        oam.setBusy(1); // ram_0515 = 1
        oam.clearRange(0, 0x50); // 清 $04A5-$04F4
        oam.writeSlot(0, 0x20, 0xe0, 0x23); // $CCAD: attr=$20, tileLo=$E0, tileHi=$23
        oam.clearRange(3, 0x21); // 清 $04A8-$04C8
        oam.endBuild(); // ram_0515 = $80
    }
    /** $C515: 渲染同步等待 — H5 同步由渲染层驱动 */
    _fixedC515() {
        // H5 空
    }
    /** $C509: 表跳转 — H5 已 switch 语义化 */
    _fixedC509(a) {
        void a;
    }
    // ════════════════════════════════════════════
    // 内部: 工具函数
    // ════════════════════════════════════════════
    _readIndirectPtr(loKey, hiKey) {
        return {
            lo: this._store.read(loKey) & 0xFF,
            hi: this._store.read(hiKey) & 0xFF,
        };
    }
    /** 读 RAM 绝对地址 (名字区 $0300+ 等) */
    _readRamAbs(addr) {
        return this._store.read(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`) & 0xFF;
    }
    /** 写 RAM 绝对地址 */
    _writeRamAbs(addr, v) {
        this._store.write(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`, v & 0xFF);
    }
    // ──────────────────────────────────────────────
    // 公共数据访问 (供其他 bank service 使用)
    // ──────────────────────────────────────────────
    /** 读 bank28 原始字节 */
    read(cpuAddr) {
        return (0, bank28_tables_1.readB28)(cpuAddr);
    }
    /** 读 bank28 16bit LE */
    read16(cpuAddr) {
        return (0, bank28_tables_1.readB28U16)(cpuAddr);
    }
    /** 查等级表 */
    getLevel(exp) {
        return bank28_tables_1.T_LEVEL_MAP[exp & 0xFF];
    }
    /** 按队伍索引读 T_POS_8206 */
    getPosition8206(index) {
        return bank28_tables_1.T_POS_8206[index & 0xFF] ?? 0xFF;
    }
    /** 按队伍索引读 T_TEAM_824C */
    getTeam824C(index) {
        return bank28_tables_1.T_TEAM_824C[index & 0xFF] ?? 0xFF;
    }
    /** 按队伍索引读 T_TEAM_82C0 */
    getTeam82C0(index) {
        return bank28_tables_1.T_TEAM_82C0[index & 0xFF] ?? 0xFF;
    }
    /** 按角色类型索引读 T_ROLE_TYPE */
    getRoleType(index) {
        return bank28_tables_1.T_ROLE_TYPE[index & 0xFF] ?? 0;
    }
    /** 按角色类型索引读 T_ROLE_TYPE2 */
    getRoleType2(index) {
        return bank28_tables_1.T_ROLE_TYPE2[index & 0xFF] ?? 0;
    }
    /** 按索引读 T_DIST_DIR (2B/项) */
    getDistDir(index) {
        const i = (index & 0x0F) * 2;
        return { dist: bank28_tables_1.T_DIST_DIR[i], flags: bank28_tables_1.T_DIST_DIR[i + 1] };
    }
    /** 按索引读 T_ZONE_COORD (2B/项) */
    getZoneCoord(index) {
        const i = (index & 0x1F) * 2;
        return { x: bank28_tables_1.T_ZONE_COORD[i], y: bank28_tables_1.T_ZONE_COORD[i + 1] };
    }
    /** 按场景 ID 读场景数据指针 */
    getSceneDataPtr(sceneId) {
        return (0, bank28_tables_1.readB28U16)(0x8E1B + (sceneId & 0x1F) * 2);
    }
}
exports.Bank28MatchService = Bank28MatchService;
