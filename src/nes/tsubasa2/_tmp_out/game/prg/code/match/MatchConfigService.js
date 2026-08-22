"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchConfigService = void 0;
const bank28_tables_1 = require("../../data/tables/bank28-tables");
/** 4 位大写十六进制 RAM 键 */
function ramKey(addr) {
    return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}
class MatchConfigService {
    constructor(store, system) {
        this._store = store;
        this._system = system;
    }
    rd(addr) {
        return this._store.read(ramKey(addr));
    }
    wr(addr, v) {
        this._store.write(ramKey(addr), v);
    }
    rdPtr(lo, hi) {
        return this.rd(lo) | (this.rd(hi) << 8);
    }
    wrPtr(lo, hi, v) {
        this.wr(lo, v & 0xff);
        this.wr(hi, (v >> 8) & 0xff);
    }
    // ════════════════════════════════════════════════
    // 跳转表入口 (bank28 头 $8000-$800D)
    // ════════════════════════════════════════════════
    /** $8000 → $802D: 主配置查询 (比赛索引 → 队伍索引 → 配置指针) */
    configQuery(matchIndex) { this.sub802D(matchIndex); }
    /** $8003 → $8B22: 队伍数据加载 */
    teamDataLoad() { this.sub8B22(); }
    /** $8006 → $8609: 阵型数据加载 */
    formationLoad() { this.sub8609(); }
    /** $8009 → $8C06: 等级/属性设置 */
    levelStatsSet() { this.sub8C06(); }
    /** $800C → $8D58: OAM/精灵配置 */
    oamConfig() { this.sub8D58(); }
    // ════════════════════════════════════════════════
    // 读取比赛配置 (原 readMatchConfig)
    // ════════════════════════════════════════════════
    getConfig(matchIndex) {
        // 查 $9E4E 队伍索引表得队伍 id, 返回配置
        this.sub802D(matchIndex);
        const teamId = this.rd(0x0032);
        return { teamId, matchIndex };
    }
    // ════════════════════════════════════════════════
    // $802D: 主配置查询
    // asm: LDA $9E4E,Y; STA $0032; LDA #$00; STA $0033; RTS
    // 查 $9E4E 队伍索引表 (Y=比赛索引), 结果存 $0032/$0033
    // ════════════════════════════════════════════════
    sub802D(matchIndex) {
        const teamId = this.readMemByte(0x9E4E + matchIndex);
        this.wr(0x0032, teamId);
        this.wr(0x0033, 0);
    }
    // ════════════════════════════════════════════════
    // $8039/$803A: 球员数据查询 (属性查表)
    // asm $8039-$818D (已按 ROM 原始字节逐指令核对, 含 $813F 特殊路径)
    //   入口 A=属性请求值(球员id/$0441/$0442/$05FB^$0B), X=位置索引(调用点查表值)
    //   $803A: JSR $C50C → $0034/$0035 = 球员数据指针 (C=ASL进位=(phase^$0B)bit7)
    //   $003E: LDA ($0034),Y; ≠0 → 直接用 RAM 值; =0 → 查 $818E 偏移表取 $0038 属性
    //   ≥$23 扩展路径: 用 playerData[1]/[2] 覆盖属性值, -$23
    //   ×4 (或 ×12) + $8199 基址 → $0032/$0033 = 属性表指针
    //   特殊 id {0,$0B,$1E,$1F} → $AE86(×8) GK 属性表
    //   普通 id → $9FCE(×12) 属性表; X≥$1F → $AFAE+base[1]×12 指针表
    // ════════════════════════════════════════════════
    playerDataQuery(playerId, posX = 0) {
        const x = posX & 0xFF;
        // $803A: JSR $C50C (读 $05FB 设 $0034/$0035 球员数据指针)
        this._system.subC50C();
        const ptr34 = this.rdPtr(0x0034, 0x0035);
        // $803B/$803E: LDY #$00; LDA ($0034),Y — 球员 RAM 数据[0]
        let a = this.readIndirect(ptr34, 0);
        if (a === 0) {
            // $8042-$804D: A = playerId-$0B; Y=$818E[Y]; A=($0038),Y (属性)
            const y = this.readMemByte(0x818E + ((playerId - 0x0B) & 0xFF));
            a = this.readIndirect(this.rdPtr(0x0038, 0x0039), y);
        }
        // $8050: CMP #$23 → C = (A >= $23) (PHP/PLP 保存, 用于 ×12 扩展)
        const carryGe23 = a >= 0x23;
        if (carryGe23) {
            // $8053-$8061: p1≥0 用 p1, 否则用 p2; SBC #$23 (C=1 保持)
            const p1 = this.readIndirect(ptr34, 1);
            if ((p1 & 0x80) === 0) {
                a = p1;
            }
            else {
                a = this.readIndirect(ptr34, 2);
            }
            a = (a - 0x23) & 0xFF;
        }
        // $8064-$808D: base16 = (A×4 或 A×12) + $8199 表基址 (Y=0 → $95D6; Y=2 → $9662)
        const base16 = (((a * 4) * (carryGe23 ? 3 : 1)) + (carryGe23 ? 0x9662 : 0x95D6)) & 0xFFFF;
        this.wrPtr(0x0032, 0x0033, base16);
        // $8092: CPX #$1F; BCC $809A — X ≥ $1F → $813F 指针表路径
        if (x >= 0x1F) {
            return this.sub813F(playerId, x, base16);
        }
        // $809B-$80A6: 特殊 id 判定 (0/$0B/$1E/$1F → Z=1)
        const special = playerId === 0 || playerId === 0x0B || playerId === 0x1E || playerId === 0x1F;
        // $80A8: LDY #$00; LDA ($0032),Y; STY $0033 — base0 = base16[0]
        const base0 = this.readIndirect(base16, 0);
        if (!special) {
            // $80D1-$80F3 (非 special): ptr = $9FCE + base0×24 (3×ASL/ROL 后第 4 次 ASL 加 ×8 = ×24)
            const ptr = (0x9FCE + base0 * 24) & 0xFFFF;
            this.wrPtr(0x0032, 0x0033, ptr);
            // $80F5-$80F9: TXA; TAY; TXA; BEQ $8113 (X==0 → 尾路径)
            return this.readAttrTail(ptr, x);
        }
        // $80B0-$80C1 (special): ptr = $AE86 + base0×8 (GK 属性表)
        const ptr = (0xAE86 + base0 * 8) & 0xFFFF;
        this.wrPtr(0x0032, 0x0033, ptr);
        // $80C3-$80CB: Y = X==0 ? 0 : X-$17; LDA ($0032),Y; JMP $80F9
        const y = x === 0 ? 0 : (x - 0x17) & 0xFF;
        return this.readAttrTail(ptr, x, y);
    }
    /**
     * $80F9 公共尾 (普通路径 Y=X; special 路径 Y=presetY):
     *   X≠0: val = 表[Y] + p3×2, 上限 $BF → $0032 = val
     *   X==0: val = 表[0] + p3, 上限 $5F; 经 ($0032)=$0E ($0033)=$9F/$A0
     *     读 RAM $069F+val 16bit 表 → ($0032,$0033)
     */
    readAttrTail(ptr, x, presetY) {
        const y = presetY !== null && presetY !== void 0 ? presetY : x;
        const base = this.readIndirect(ptr, y);
        if (x === 0) {
            // $8113: val = 表[0] + p3, 上限 $5F
            const p3 = this.readIndirect(this.rdPtr(0x0034, 0x0035), 3);
            let val = (base + p3) & 0xFF;
            if (val > 0x5F)
                val = 0x5F;
            // $8125: LDY #$9F; ASL; BCC $812B; INY → $0033=$9F/$A0; $0032=$0E
            this.wr(0x0033, 0x9F + ((val >> 7) & 1));
            this.wr(0x0032, 0x0E);
            // $8131-$813C: 指针 $0E9F+val → RAM 镜像 $069F+val, 读 16bit
            const ra = (0x0E9F + val) & 0x07FF;
            const v16 = this.readMemByte(ra) | (this.readMemByte((ra + 1) & 0x07FF) << 8);
            this.wrPtr(0x0032, 0x0033, v16);
            return v16 & 0xFF;
        }
        // $80FC-$8107: val = 表[Y] + p3×2 (ASL 进位 = p3 bit7)
        const p3 = this.readIndirect(this.rdPtr(0x0034, 0x0035), 3);
        let val = (base + ((p3 << 1) & 0xFF) + ((p3 >> 7) & 1)) & 0xFF;
        // $810A-$8110: 上限 $BF → $0032 (CPY #$C0; BCC → 保持; ≥$C0 → $BF)
        if (val >= 0xC0)
            val = 0xBF;
        this.wr(0x0032, val);
        return val;
    }
    /**
     * $8ADE-$8B09: 属性索引计算。
     * asm (ROM 字节精确对位, 反汇编器 $8ADE 有 1 字节错位):
     *   $8ADE: STA $003E      — 入口 A(表值) 存 $003E
     *   $8AE0: LDA $003C; STA $003F — $003F = $003C (调用前值)
     *   $8AE4: TYA; CLC; ADC $003C; TAY — Y = Y + $003C
     *   $8AE9: LDA ($003A),Y — v = 指针 $003A 读
     *   $8AEB-$8AF9: 4× (ASL; ROL $003D) — v×16 (16bit)
     *   $8AFB: STA $003C; $8AFD: LDX $003D
     *   $8AFF: ASL; ROL $003D — v×32 (16bit)
     *   ADC $003C; STA $003C — 低字节 = ×32低 + ×16低 + C
     *   TXA; ADC $003D; TAX — 高字节 = ×16高 + ×32高 + carry
     *   → 结果: $003C/$003D = v×48 (16bit), 返回 X = 高字节
     * @param y 入口 Y 索引
     * @param aIn 入口 A 表值 (存 $003E)
     * @returns X = 16bit 结果高字节
     */
    sub8ADE(y, aIn) {
        this.wr(0x003E, aIn & 0xFF); // $8ADE: STA $003E
        this.wr(0x003F, this.rd(0x003C)); // $8AE0-$8AE2: $003F = $003C
        const y2 = (y + this.rd(0x003C)) & 0xFF; // $8AE4-$8AE8: Y = Y + $003C
        let v = this.readIndirect(this.rdPtr(0x003A, 0x003B), y2); // $8AE9
        let d3d = 0; // $8AEB: STY $003D (Y=0)
        for (let i = 0; i < 4; i++) { // $8AEF-$8AF9: v×16
            const c = (v >> 7) & 1;
            v = (v << 1) & 0xFF;
            d3d = ((d3d << 1) | c) & 0xFF;
        }
        this.wr(0x003C, v); // $8AFB: STA $003C (×16 低)
        const x = d3d; // $8AFD: LDX $003D (×16 高)
        const c2 = (v >> 7) & 1; // $8AFF: ASL
        v = (v << 1) & 0xFF;
        d3d = ((d3d << 1) | c2) & 0xFF; // ROL $003D (×32 高)
        const sum = v + this.rd(0x003C); // ADC $003C: ×32低 + ×16低 + C
        v = sum & 0xFF;
        this.wr(0x003C, v); // STA $003C
        const hi = (x + d3d + (sum > 0xFF ? 1 : 0)) & 0xFF; // TXA; ADC $003D; TAX
        return hi;
    }
    /**
     * $8B0B-$8B1F: 读 ($003C),Y 取属性位。
     * asm:
     *   $8B0A: LDA $00E2; AND #$07; LSR — C = bit0
     *   $8B10: PHP (压 C); CLC; ADC $003E; TAY
     *   $8B15: LDA ($003C),Y; PLP; BCS $8B1F — C=1 原样返回
     *   $8B19-$8B1E: LSR×4; AND #$0F — C=0 取高 4 位
     */
    sub8B0B() {
        const e2 = this.rd(0x00E2);
        const carry = e2 & 0x01; // LSR 移出的 bit0
        const y = (((e2 & 0x07) >> 1) + this.rd(0x003E)) & 0xFF;
        const v = this.readIndirect(this.rdPtr(0x003C, 0x003D), y);
        return carry === 1 ? v : (v >> 4) & 0x0F;
    }
    /**
     * $8732-$8743: sub868E 收尾 — LDA $0442; LDX $043D; JSR $8D58;
     * $0430≠0 → $043E = $0431
     */
    sub8732() {
        this.sub8D58();
        if (this.rd(0x0430) !== 0) {
            this.wr(0x043E, this.rd(0x0431));
        }
    }
    /** $86BA (cmd0 分派): LDA $043D; JSR $C509 → 表 $86C0 */
    sub86BA() {
        const cmd = this.rd(0x043D);
        switch (cmd) {
            case 0:
                this.wr(0x043D, 0x01);
                this.sub8732();
                break; // $86C8
            case 1:
                this.wr(0x043D, 0x02);
                this.sub8732();
                break; // $86D0
            case 2:
                this.wr(0x043D, 0x00);
                this.sub8732();
                break; // $86D8
            case 3:
                this.wr(0x043D, 0x01);
                this.wr(0x043E, 0x05);
                break; // $86E0: RTS
        }
    }
    /** $86EB (cmd1 分派): LDA $043D; JSR $C509 → 表 $86EE */
    sub86EB() {
        const cmd = this.rd(0x043D);
        switch (cmd) {
            case 0:
                this.wr(0x043D, 0x05);
                break; // $86F9: RTS
            case 1:
                this.wr(0x043D, 0x04);
                break; // $86FF: RTS
            case 2:
                this.wr(0x043D, 0x02);
                this.sub8732();
                break; // $8705: JMP $86D0
            case 3:
                this.wr(0x043E, 0x01);
                this.wr(0x043D, 0x04);
                break; // $8708: JMP $86FF
        }
    }
    /** $8710 (cmd2 分派): LDA $043D; JSR $C509 → 表 $8713 */
    sub8710() {
        const cmd = this.rd(0x043D);
        switch (cmd) {
            case 0:
                this.wr(0x043D, 0x05);
                break; // $871E: JMP $86F9
            case 1:
                this.wr(0x043D, 0x03);
                break; // $8721: RTS
            case 2:
                this.wr(0x043D, 0x02);
                this.sub8732();
                break; // $8727: JMP $86D0
            case 3:
                this.wr(0x043E, 0x01);
                this.wr(0x043D, 0x03);
                break; // $872A: JMP $8721
        }
    }
    /** $813F: X ≥ $1F 特殊路径 — base[1]×12 + $AFAE 指针表, 返回 16bit 指针 */
    sub813F(playerId, x, base16) {
        // $813F: CPX #$25; BCS $817E (X ≥ $25 → 表直读)
        if (x >= 0x25) {
            // $817E: TXA; SEC; SBC #$23; TAY; LDA ($0032),Y; STA $0032; LDA #$00; STA $0033
            const y = (x - 0x23) & 0xFF;
            const v = this.readIndirect(base16, y);
            this.wrPtr(0x0032, 0x0033, v);
            return v;
        }
        // $8143-$8169: ptr = $AFAE + base[1]×12
        const b1 = this.readIndirect(base16, 1);
        const ptr = (0xAFAE + b1 * 12) & 0xFFFF;
        // $816B-$817B: Y = (X-$1F)*2; ($0032,$0033) = 指针表 16bit 项
        const y = ((x - 0x1F) * 2) & 0xFF;
        const lo = this.readIndirect(ptr, y);
        const hiB = this.readIndirect(ptr, (y + 1) & 0xFF);
        const p = (hiB << 8) | lo;
        this.wrPtr(0x0032, 0x0033, p);
        void playerId;
        return p;
    }
    // ════════════════════════════════════════════════
    // 跳转表入口目标 — 已翻译
    // ════════════════════════════════════════════════
    /**
     * $8B22: 队伍数据加载
     * asm $8B22-$8B93: 循环 $0B→$15 清零球员数据; 查 $BAB2 表得队伍
     * 数据指针; 读阵型/球员数; 循环配置球员数据; 调整 $0446
     */
    sub8B22() {
        // $8B22-$8B37: 循环清零球员数据 ($0B→$15)
        for (let a = 0x0B; a < 0x16; a++) {
            this._system.subC50C(); // 读 $05FB 设 $0034/$0035
            const pp = this.rdPtr(0x0034, 0x0035);
            this.writeIndirect(pp, 0, 0);
            this.writeIndirect(pp, 1, 0);
        }
        // $8B39-$8B49: 队伍数据指针
        const ti = ((this.rd(0x002B) - 3) & 0xFF) << 1;
        const lo = this.readMemByte(0xBAB2 + ti);
        const hi = this.readMemByte(0xBAB3 + ti);
        this.wrPtr(0x0038, 0x0039, (hi << 8) | lo);
        // $8B4D-$8B5A: 读[0] 低4位→$002E, 高4位→$002F
        const tp = this.rdPtr(0x0038, 0x0039);
        const b0 = this.readIndirect(tp, 0);
        this.wr(0x002E, b0 & 0x0F);
        this.wr(0x002F, (b0 >> 4) & 0x0F);
        // $8B5D-$8B7B: 循环读队伍数据 (Y=9 起)
        this.wr(0x003A, 9);
        for (let i = 0; i < 64; i++) {
            const y = this.rd(0x003A);
            const val = this.readIndirect(tp, y);
            if (val === 0x0F)
                break; // 结束标记
            this._system.subC50C();
            const pd = this.readIndirect(tp, (y + 1) & 0xFF);
            this.wr(0x003A, (y + 2) & 0xFF);
            this.writeIndirect(this.rdPtr(0x0034, 0x0035), 0, pd);
        }
        // $8B7E-$8B93: 调整 $0446
        let dx = this.rd(0x0446);
        if (dx !== 0x05) {
            dx = 0;
            if (this.rd(0x0384) === 0x26)
                dx = 2;
        }
        this.wr(0x0446, dx);
    }
    /**
     * $8609: 阵型数据加载
     * asm $8609-$863E: 检查 $05FB; =0 则遍历 $0600 项阵型列表
     */
    sub8609() {
        if (this.rd(0x05FB) !== 0) {
            this.sub875D();
            return;
        }
        const cnt = this.rd(0x0600);
        if (cnt === 0)
            return;
        for (let x = 0; x < cnt; x++) {
            this._system.coroutineYield(1);
            this.sub863F(this.rd(0x0601 + x));
            this.wr(0x060B + x, this.rd(0x043D));
            this.wr(0x0606 + x, this.rd(0x043E));
        }
    }
    /**
     * $8C06: 等级/属性设置
     * asm $8C06-$8C7E: 入口 A=$0441, X=$043B;
     * 检查阵型类型/队伍侧; 调 $8DC9 获取指针;
     * 读两字节判断; 遍历属性表
     */
    sub8C06() {
        const pid = this.rd(0x0441);
        const side = this.rd(0x043B);
        if (this.rd(0x044E) !== 0 && side >= 2) {
            this.wr(0x0430, 0);
            return;
        }
        this.sub8DC9(pid, side);
        const slot = this.rd(0x0430);
        const y = (slot << 1) & 0xFF;
        const p = this.rdPtr(0x0048, 0x0049);
        const v0 = this.readIndirect(p, y);
        const v1 = this.readIndirect(p, (y + 1) & 0xFF);
        if (v0 === v1 && v0 === 0) {
            this.wr(0x0430, 0);
            return;
        }
        if (v0 !== v1) {
            this.wr(0x0048, v0);
            this.wr(0x0049, v1);
        }
        this.wr(0x0430, 0);
        // $8C31: LDA $0430 (slot); $8C38: JSR $C509; 表 $8C3B: $8C46/$8D41/$8D4E/$8D55
        //   cmd0 → $8C46: 跳过 LDA#$00;STA$0046 ($0046 保留原值) 直接进主循环
        //   cmd1/2/3 → $8D41/$8D4E/$8D55 (其他阵型处理, TODO)
        if (slot !== 0) {
            void slot;
        }
        // $8C46 起: LDY $0046; 主循环 ($0046 保留)
        let ai = this.rd(0x0046);
        for (let i = 0; i < 64; i++) {
            const ab = this.readIndirect(this.rdPtr(0x0048, 0x0049), ai);
            this.wr(0x0047, (ab >> 2) & 0x3F);
            const st = ab & 0x03;
            if (st === 0x03)
                return;
            if (st !== this.rd(0x044E))
                this.sub8C7F();
            ai = (ai + 1) & 0xFF;
            this.wr(0x0046, ai);
            const ck = this.rd(0x0047);
            if (ck === 0x08 || ck === 0x09 || ck === 0x0A ||
                ck === 0x11 || ck === 0x13) {
                ai = (ai + 1) & 0xFF;
                this.wr(0x0046, ai);
            }
        }
    }
    /**
     * $8D58: OAM/精灵配置
     * asm $8D58-$8DC8: 入口 A=$0442, X=$043D;
     * A=0/$0B→$8DA6 路径; 否则按队伍侧/阵型类型分支
     */
    sub8D58() {
        const fid = this.rd(0x0442);
        const side = this.rd(0x043D);
        if (fid === 0 || fid === 0x0B) {
            this.sub8DA6Path(fid, side);
            return;
        }
        if (side >= 3) {
            this.wr(0x0430, 0);
            return;
        }
        if (this.rd(0x044E) !== 0 && side !== 2) {
            this.wr(0x0430, 0);
            return;
        }
        this.sub8DC9(fid, side);
        const slot = this.rd(0x0430);
        const y = (((slot + 4) & 0xFF) << 1) & 0xFF;
        const p = this.rdPtr(0x0048, 0x0049);
        const v0 = this.readIndirect(p, y);
        const v1 = this.readIndirect(p, (y + 1) & 0xFF);
        if (v0 === v1 && v0 === 0) {
            this.wr(0x0430, 0);
            return;
        }
        if (v0 !== v1) {
            this.wr(0x0048, v0);
            this.wr(0x0049, v1);
        }
        this.wr(0x0430, 0);
        // JSR $C509 (cmd=fid 原值) 分派 — 目标子程待翻译
        void fid;
    }
    /** $8DA6 路径 (A=0 或 A=$0B): 获取指针, 比较两字节 */
    sub8DA6Path(fid, side) {
        this.sub8DC9(fid, side);
        const p = this.rdPtr(0x0048, 0x0049);
        const v0 = this.readIndirect(p, 0);
        const v1 = this.readIndirect(p, 1);
        if (v0 === v1 && v0 === 0) {
            this.wr(0x0430, 0);
            return;
        }
        this.wr(0x0431, v0);
        this.wr(0x0430, 1);
    }
    /** $8DC9: 获取阵型数据指针 (公共子程) */
    sub8DC9(pid, side) {
        this.wr(0x0430, side);
        this.wr(0x0047, pid);
        this._system.subC50C();
        const pd = this.readIndirect(this.rdPtr(0x0034, 0x0035), 0);
        const x = (pd << 1) & 0xFF;
        this.wr(0x0048, this.readMemByte(0x8E1B + x));
        this.wr(0x0049, this.readMemByte(0x8E1C + x));
    }
    /** $8C7F: 属性调整 — LDA $0047; SEC; SBC #$03; JSR $C509 (表 $8C84 32 项, 待翻译) */
    sub8C7F() {
        void ((this.rd(0x0047) - 3) & 0xFF);
    }
    /** $863F: 阵型子程 — STA $0442; JSR $8A62; 查阵型表 */
    sub863F(fid) {
        this.wr(0x0442, fid);
        this.sub8A62();
        this.wr(0x003C, 0);
        if (fid === 0x0B) {
            this.sub85B5();
            return;
        }
        const y = this.rd(0x0621);
        const v = this.readMemByte(0x86B5 + y);
        this.wr(0x003C, v);
        if (v === 0) {
            this.sub8663();
        }
        else {
            this.sub868E(this.sub8AB3());
        } // $865D: JSR $8AB3; $8660: JMP $868E
    }
    /**
     * $8A62: 查球员属性指针 (入口部分)。
     * asm $8A62-$8AA7: JSR $C50C; 读球员数据[0]; ≠0 则查 $8A9D 表算属性索引。
     */
    sub8A62() {
        this._system.subC50C();
        const ptr = this.rdPtr(0x0034, 0x0035);
        const d0 = this.readIndirect(ptr, 0);
        if (d0 === 0)
            return;
        // $8A6C: 查 $8A9D 属性角色表
        const x = this.rd(0x0441) & 0xFF;
        const y = this.readMemByte(0x8A9D + x);
        const teamPtr = this.rdPtr(0x0038, 0x0039);
        const attrVal = this.readIndirect(teamPtr, y);
        // 算属性索引 (SBC #$23; ASL×2; ADC)
        let a = (attrVal - 0x23) & 0xFF;
        let lo = a, hi = 0;
        for (let i = 0; i < 2; i++) {
            hi = ((hi << 1) | (lo >> 7)) & 0xFF;
            lo = (lo << 1) & 0xFF;
        }
        this.wr(0x003A, lo);
        hi = ((hi << 1) | (lo >> 7)) & 0xFF;
        lo = (lo << 1) & 0xFF;
        lo = (lo + this.rd(0x003A)) & 0xFF;
    }
    /**
     * $8663: 位置属性计算 (v===0 路径)。
     * asm $8663-$868D:
     *   LDA $0635; EOR #$FF; TAX (X = ~$0635)
     *   LDA #$14; CPX #$A0; BCS $868E (≥$A0 → $868E)
     *   LDA #$10; CPX #$60; BCS $868E (≥$60 → $868E)
     *   LDA $0637; BPL $867C; EOR #$FF; TAY (Y = ~$0637 if neg)
     *   JSR $C539 (角度计算)
     *   LDX #$00; CMP $8BBE,X; BEQ $868B; INX; INX; BNE (查表)
     *   LDA $8BBF,X (取结果)
     *   → fall through $868E
     */
    sub8663() {
        // $8663: LDA $0635; EOR #$FF; TAX (X = ~$0635)
        const x = (this.rd(0x0635) ^ 0xFF) & 0xFF;
        // $8669: LDA #$14; $866B: CPX #$A0; $866D: BCS $868E (A=$14)
        if (x >= 0xA0) {
            this.sub868E(0x14);
            return;
        }
        // $866F: LDA #$10; $8671: CPX #$60; $8673: BCS $868E (A=$10)
        if (x >= 0x60) {
            this.sub868E(0x10);
            return;
        }
        // $8675: LDA $0637; BPL $867C; EOR #$FF; TAY
        let y = this.rd(0x0637);
        if ((y & 0x80) !== 0)
            y = (y ^ 0xFF) & 0xFF;
        // $867D: JSR $C539 (角度计算 — bank30, stub)
        // $8680: LDX #$00; CMP $8BBE,X; BEQ $868B; INX; INX; BNE (查表)
        let xi = 0;
        const cmpVal = 0; // $C539 返回值 stub
        while (xi < 0x100) {
            if (cmpVal === this.readMemByte(0x8BBE + xi))
                break;
            xi = (xi + 2) & 0xFF;
            if (xi === 0)
                break;
        }
        // $868B: LDA $8BBF,X → fall through $868E (LDY #$07; JSR $8ADE)
        this.sub868E(this.readMemByte(0x8BBF + xi));
    }
    /**
     * $868E: 阵型后续处理 — 入口是 $868E: LDY #$07 指令 (非 JSR 目标)。
     * asm $868E-$86B0:
     *   $868E: LDY #$07; $8690: JSR $8ADE  — sub8ADE(7, a), 返回 X=16bit 结果高字节
     *   $8693: CLC; LDA $003C; ADC #$AE; STA $003C
     *   $869A: TXA; ADC #$B8; STA $003D   — X 来自 sub8ADE 返回 (非调用方)
     *   $869F: JSR $8B0B; STA $043D; LDA #$00; STA $043E
     *   $86AA: LDA $003F; JSR $C509
     * @param a 入口 A (来自 $8AB3 返回值 / $8BBF 表值 / #$14 / #$10)
     */
    sub868E(a) {
        const xHi = this.sub8ADE(7, a); // $868E: LDY #$07; $8690: JSR $8ADE
        const c = (this.rd(0x003C) + 0xAE) & 0xFF; // $8693-$8698: CLC; LDA $003C; ADC #$AE
        this.wr(0x003C, c);
        this.wr(0x003D, (xHi + 0xB8) & 0xFF); // $869A-$869D: TXA; ADC #$B8
        this.wr(0x043D, this.sub8B0B()); // $869F-$86A2: JSR $8B0B; STA $043D
        this.wr(0x043E, 0x00); // $86A5-$86A7: LDA #$00; STA $043E
        void this.rd(0x003F); // $86AA-$86AC: LDA $003F; JSR $C509 分派待翻译
    }
    /**
     * $8AB3: 阵型属性设置 (查 $8B9E 表)。
     * asm (ROM 字节精确对位, 参考反汇编器错位 1 字节: $8ADD 是 RTS 非 STA $003E):
     *   LDA $0635; BPL $8ABA; EOR #$FF; TAX (X = ~$0635 if neg)
     *   LDA $0637; BPL $8AC2; EOR #$FF; TAY (Y = ~$0637 if neg)
     *   JSR $C539 (角度计算)
     *   LDX #$00; CMP $8B9E,X; BEQ $8AD1; INX; INX; BNE (查表)
     *   $8AD1: LDA $8B9F,X     — A = 表值
     *   $8AD4: LDX $003C; $8AD6: CPX #$01; $8AD8: BEQ $8ADD
     *   $8ADD: RTS             — X==$01 → A 原样返回 (BEQ 直达 RTS)
     *   $8ADA: CLC; $8ADB: ADC #$0C; RTS — X!=$01 → A+$0C 返回
     * 两条路径均 RTS 返回 A, 本子程不写 $003E。
     * $8ADE: STA $003E 是独立子程入口; 本子程返回的 A 被调用方
     * 用作 JSR $8ADE 的 aIn (sub868E/sub879C 内部 STA $003E)。
     * @returns A 值 ($8BBF,X 表值 或 +$0C)
     */
    sub8AB3() {
        let x = this.rd(0x0635);
        if ((x & 0x80) !== 0)
            x = (x ^ 0xFF) & 0xFF;
        let y = this.rd(0x0637);
        if ((y & 0x80) !== 0)
            y = (y ^ 0xFF) & 0xFF;
        // JSR $C539 (角度计算 — bank30, stub)
        const cmpVal = 0; // stub
        // 查 $8B9E 表 (2 字节步长)
        let xi = 0;
        while (xi < 0x100) {
            if (cmpVal === this.readMemByte(0x8B9E + xi))
                break;
            xi = (xi + 2) & 0xFF;
            if (xi === 0)
                break;
        }
        const a = this.readMemByte(0x8B9F + xi); // $8AD1: LDA $8B9F,X
        // $8AD4: LDX $003C; $8AD6: CPX #$01; $8AD8: BEQ $8ADD (RTS — A 原样)
        if (this.rd(0x003C) === 0x01) {
            return a;
        }
        // $8ADA: CLC; $8ADB: ADC #$0C; $8ADD: RTS
        return (a + 0x0C) & 0xFF;
    }
    /**
     * $85B5: 阵型特殊路径 (fid===$0B)。
     * asm $85B5-$8603: 与 $863F 类似但用 $8604 表代替 $86B5。
     *   LDA #$00; STA $003D
     *   LDX $0621; LDY $8604,X; TYA; ASL; ASL; STA $003E
     *   INY×4; LDA ($003A),Y; ASL; ROL $003D; ASL; ROL $003D; STA $003C
     *   LDX $003D; ASL; ROL $003D; ADC $003C; STA $003C; TXA; ADC $003D; TAX
     *   LDA $003C; CLC; ADC #$2E; STA $003C; TXA; ADC #$BA; STA $003D
     *   JSR $8B0B; STA $043D; TAX; LDA $0442; JSR $8DA6
     *   LDA $0430; BEQ $8600; LDA $0431; $8600: STA $043E; RTS
     */
    sub85B5() {
        this.wr(0x003D, 0x00);
        const x = this.rd(0x0621);
        let y = this.readMemByte(0x8604 + x);
        // TYA; ASL; ASL; STA $003E
        this.wr(0x003E, (y << 2) & 0xFF);
        // INY×4
        y = (y + 4) & 0xFF;
        // LDA ($003A),Y
        const ptr3A = this.rdPtr(0x003A, 0x003B);
        let lo = this.readIndirect(ptr3A, y);
        // ASL; ROL $003D; ASL; ROL $003D
        let hi = this.rd(0x003D);
        for (let i = 0; i < 2; i++) {
            hi = ((hi << 1) | (lo >> 7)) & 0xFF;
            lo = (lo << 1) & 0xFF;
        }
        this.wr(0x003C, lo);
        // LDX $003D; ASL; ROL $003D; ADC $003C; STA $003C; TXA; ADC $003D; TAX
        let hi2 = hi;
        hi2 = ((hi2 << 1) | (lo >> 7)) & 0xFF;
        lo = (lo << 1) & 0xFF;
        lo = (lo + this.rd(0x003C)) & 0xFF;
        let x2 = (hi + hi2) & 0xFF;
        // LDA $003C; CLC; ADC #$2E; STA $003C
        const c = (lo + 0x2E) & 0xFF;
        this.wr(0x003C, c);
        // TXA; ADC #$BA; STA $003D
        this.wr(0x003D, (x2 + 0xBA) & 0xFF);
        // JSR $8B0B; STA $043D; TAX
        // LDA $0442; JSR $8DA6
        // LDA $0430; BEQ $8600; LDA $0431; STA $043E; RTS
        this.wr(0x043D, c);
        if (this.rd(0x0430) !== 0) {
            this.wr(0x043E, this.rd(0x0431));
        }
        else {
            this.wr(0x043E, this.rd(0x0431));
        }
    }
    /**
     * $875D: $05FB≠0 路径 (阵型其他处理)。
     * asm $875D-$87EC: 与 sub863F 结构相同但用 $87C3 表代替 $86B5。
     *   LDA $0441; JSR $8A62
     *   LDY $0621; LDA $87C3,Y; STA $003C; BEQ $8773
     *   JSR $8AB3; JMP $879C
     *   $8773: LDA #$14; LDX $0635; CPX #$A0; BCS $879C
     *   LDA #$10; CPX #$60; BCS $879C
     *   LDY $0637; BPL $878B; TYA; EOR #$FF; TAY; JSR $C539
     *   LDX #$00; CMP $8BBE,X; BEQ $8799; INX; INX; BNE
     *   LDA $8BBF,X; LDY #$04; JSR $8ADE
     *   CLC; LDA $003C; ADC #$2E; STA $003C; TXA; ADC #$B1; STA $003D
     *   JSR $8B0B; STA $043B; LDA #$00; STA $043C; LDA $003F; JSR $C509
     *   JMP $8A3F (跳转后续处理)
     */
    sub875D() {
        // $875D: LDA $0441; JSR $8A62
        this.sub8A62();
        // $8763: LDY $0621; LDA $87C3,Y; STA $003C; BEQ $8773
        const y0 = this.rd(0x0621);
        const v = this.readMemByte(0x87C3 + y0);
        this.wr(0x003C, v);
        if (v !== 0) {
            // $876D: JSR $8AB3; $8770: JMP $879C
            this.sub879C(this.sub8AB3());
        }
        else {
            // $8773: LDA #$14; LDX $0635; CPX #$A0; BCS $879C (A=$14)
            const x = this.rd(0x0635);
            if (x >= 0xA0) {
                this.sub879C(0x14);
                return;
            }
            // $877C: LDA #$10; CPX #$60; BCS $879C (A=$10)
            if (x >= 0x60) {
                this.sub879C(0x10);
                return;
            }
            // $8782: LDY $0637; BPL $878B; TYA; EOR #$FF; TAY
            let y = this.rd(0x0637);
            if ((y & 0x80) !== 0)
                y = (y ^ 0xFF) & 0xFF;
            // $878B: JSR $C539 (角度计算 — bank30, stub)
            // $878E: LDX #$00; CMP $8BBE,X; BEQ $8799; INX; INX; BNE (查表)
            const cmpVal = 0; // stub
            let xi = 0;
            while (xi < 0x100) {
                if (cmpVal === this.readMemByte(0x8BBE + xi))
                    break;
                xi = (xi + 2) & 0xFF;
                if (xi === 0)
                    break;
            }
            // $8799: LDA $8BBF,X → $879C: LDY #$04; JSR $8ADE
            this.sub879C(this.readMemByte(0x8BBF + xi));
            // $87EC: JMP $8A3F — 后续处理 (stub)
        }
    }
    /**
     * $879C: $875D 的 $8AB3 后续路径 — 入口是 $879C: LDY #$04 指令。
     * asm $879C-$87BA (与 $868E 同构, Y=4, 偏移 $2E/$B1):
     *   $879C: LDY #$04; $879E: JSR $8ADE  — sub8ADE(4, a), 返回 X=16bit 结果高字节
     *   $87A1: CLC; LDA $003C; ADC #$2E; STA $003C
     *   $87A8: TXA; ADC #$B1; STA $003D   — X 来自 sub8ADE 返回
     *   $87AD: JSR $8B0B; STA $043B; LDA #$00; STA $043C
     *   $87B8: LDA $003F; JSR $C509
     * @param a 入口 A (来自 $8AB3 返回值 / $8BBF 表值 / #$14 / #$10)
     */
    sub879C(a) {
        const xHi = this.sub8ADE(4, a); // $879C: LDY #$04; $879E: JSR $8ADE
        const c = (this.rd(0x003C) + 0x2E) & 0xFF; // $87A1-$87A6: CLC; LDA $003C; ADC #$2E
        this.wr(0x003C, c);
        this.wr(0x003D, (xHi + 0xB1) & 0xFF); // $87A8-$87AB: TXA; ADC #$B1
        this.wr(0x043B, this.sub8B0B()); // $87AD-$87B0: JSR $8B0B; STA $043B
        this.wr(0x043C, 0x00); // $87B3-$87B5: LDA #$00; STA $043C
        void this.rd(0x003F); // $87B8-$87BA: LDA $003F; JSR $C509 分派待翻译
    }
    // ════════════════════════════════════════════════
    // 间接读写辅助 (RAM 间接寻址)
    // ════════════════════════════════════════════════
    readIndirect(ptr, offset) {
        const addr = (ptr + offset) & 0xFFFF;
        return this.readMemByte(addr);
    }
    writeIndirect(ptr, offset, v) {
        const addr = (ptr + offset) & 0xFFFF;
        if (addr < 0x0800) {
            this.wr(addr, v & 0xFF);
        }
    }
    readMemByte(addr) {
        if (addr < 0x0800) {
            return this.rd(addr);
        }
        for (const t of MatchConfigService.ROM_TABLES) {
            const off = addr - t.base;
            if (off >= 0 && off < t.data.length)
                return t.data[off];
        }
        return 0;
    }
}
exports.MatchConfigService = MatchConfigService;
// ════════════════════════════════════════════════
// 内存读取辅助
// ════════════════════════════════════════════════
/** ROM 数据表映射: addr 落在表范围内 → 读具名表 (重叠区具体表优先) */
MatchConfigService.ROM_TABLES = [
    // $8000-$9FFF 窗口 (bank28)
    { base: 0x818E, data: bank28_tables_1.TBL_818E },
    { base: 0x8199, data: bank28_tables_1.TBL_8199 },
    { base: 0x8206, data: bank28_tables_1.TBL_8206 },
    { base: 0x824C, data: bank28_tables_1.TBL_824C },
    { base: 0x82C0, data: bank28_tables_1.TBL_82C0 },
    { base: 0x834A, data: bank28_tables_1.DATA_LINEUP_834A },
    { base: 0x8528, data: bank28_tables_1.TBL_8528 },
    { base: 0x8604, data: bank28_tables_1.TBL_8604 },
    { base: 0x86AF, data: bank28_tables_1.TBL_86AF },
    { base: 0x86B5, data: bank28_tables_1.TBL_86B5 },
    { base: 0x86C0, data: bank28_tables_1.TBL_86C0 },
    { base: 0x86F1, data: bank28_tables_1.TBL_86F1 },
    { base: 0x8716, data: bank28_tables_1.TBL_8716 },
    { base: 0x87BD, data: bank28_tables_1.TBL_87BD },
    { base: 0x87C3, data: bank28_tables_1.TBL_87C3 },
    { base: 0x87CD, data: bank28_tables_1.TBL_87CD },
    { base: 0x88DD, data: bank28_tables_1.TBL_88DD },
    { base: 0x8900, data: bank28_tables_1.TBL_8900 },
    { base: 0x8956, data: bank28_tables_1.TBL_8956 },
    { base: 0x8A9D, data: bank28_tables_1.TBL_8A9D },
    { base: 0x8B9E, data: bank28_tables_1.TBL_8B9E },
    { base: 0x8BBE, data: bank28_tables_1.TBL_8BBE },
    { base: 0x8C3B, data: bank28_tables_1.TBL_8C3B },
    { base: 0x8C84, data: bank28_tables_1.TBL_8C84 },
    { base: 0x8D9D, data: bank28_tables_1.TBL_8D9D },
    { base: 0x8E1B, data: bank28_tables_1.TBL_8E1B },
    { base: 0x9460, data: bank28_tables_1.TBL_9460 },
    { base: 0x8E2B, data: bank28_tables_1.DATA_FPTR_8E2B },
    { base: 0x9554, data: bank28_tables_1.TBL_9554 },
    { base: 0x959E, data: bank28_tables_1.TBL_959E },
    { base: 0x9474, data: bank28_tables_1.DATA_FORM_9474 },
    { base: 0x95D6, data: bank28_tables_1.DATA_ATTR_95D6 },
    { base: 0x9E4E, data: bank28_tables_1.TBL_9E4E },
    { base: 0x9FCE, data: bank28_tables_1.DATA_9FCE },
    // $A000-$BFFF 窗口 (bank29)
    { base: 0xAE86, data: bank28_tables_1.DATA_AE86 },
    { base: 0xBAB2, data: bank28_tables_1.TBL_BAB2 },
];
exports.default = MatchConfigService;
