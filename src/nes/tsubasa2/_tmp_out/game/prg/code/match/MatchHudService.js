"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchHudService = void 0;
/** 4 位大写十六进制 RAM 键 */
function ramKey(addr) {
    return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}
class MatchHudService {
    constructor(store, system) {
        /** 跨子程进位标志 (对应 6502 carry, 由 sub8513/sub8534 传递) */
        this._carry = false;
        /** 6502 A 寄存器 (跨子程传递) */
        this._ra = 0;
        /** 6502 X 寄存器 (跨子程传递) */
        this._rx = 0;
        /** 6502 Y 寄存器 (跨子程传递) */
        this._ry = 0;
        /** 6502 Z 标志 (sub8C9F 返回) */
        this._rz = 0;
        /** HUD 脚本流中止标志 (对应 asm 中 PLA PLA RTS 弹出返回地址的行为) */
        this._hudStop = false;
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
    // 跳转表入口 (bank24 头 $8000-$800D)
    // ════════════════════════════════════════════════
    /** $8000 → $800F: 主 HUD 渲染循环 */
    hudRenderLoop() { this.sub800F(); }
    /** $8003 → $86F8: HUD 初始化 */
    hudInit() { this.sub86F8(); }
    /** $8006 → $8779: 比分显示 */
    scoreDisplay() { this.sub8779(); }
    /** $8009 → $87E6: 时钟显示 */
    clockDisplay() { this.sub87E6(); }
    /** $800C → $8851: 体力条显示 */
    staminaBarDisplay() { this.sub8851(); }
    // ════════════════════════════════════════════════
    // 每帧推进 (由外部帧循环调用)
    // ════════════════════════════════════════════════
    render(frame) {
        void frame;
        this.sub800F();
    }
    // ════════════════════════════════════════════════
    // $800F 主 HUD 渲染循环
    // asm $800F-$8050:
    //   检查渲染开启 → 查 $9220 HUD 脚本表得入口 → 清状态 →
    //   协程让出 → 渲染分派 → 帧结束 → 循环
    // ════════════════════════════════════════════════
    sub800F() {
        // $8010: BIT $063F; BPL $8017 (检查渲染开启)
        if ((this.rd(0x063F) & 0x80) === 0) {
            // $8014: JMP $C512 (关闭则返回)
            return;
        }
        // $8017: 指针 = $9220 (HUD 脚本表)
        this.wr(0x005F, 0x20);
        this.wr(0x0060, 0x92);
        // $801F: LDA $05EA; ASL (×2 查表)
        const idx = this.rd(0x05EA);
        let off = (idx << 1) & 0xFF;
        if ((idx & 0x80) !== 0) {
            this.wr(0x0060, (this.rd(0x0060) + 1) & 0xFF);
        }
        // $8027: 查指针表得入口
        const ptr = this.rdPtr(0x005F, 0x0060);
        const lo = this.readMemByte(ptr + off);
        const hi = this.readMemByte(ptr + off + 1);
        this.wrPtr(0x005F, 0x0060, (hi << 8) | lo);
        // $8032: 清渲染状态
        this.wr(0x05E9, 0);
        this.wr(0x05E5, 0);
        this.wr(0x05E4, 0);
        this.wr(0x05F4, 0);
        // $8040: 设激活
        this.wr(0x05E3, 0x01);
        // $8045-$8050: 循环
        while (this.rd(0x05E3) !== 0) {
            // $8045: 协程让出 1 帧
            this._system.coroutineYield(1);
            // $804A: 渲染分派
            this.sub8053();
            // $804D: JSR $C560 (帧结束 — H5 no-op)
        }
    }
    // ════════════════════════════════════════════════
    // $8053 渲染分派
    // asm $8053-$8086:
    //   检查激活 → 递减延迟 → 查命令索引 → 读脚本字节 →
    //   < $F0 = 延迟值, ≥ $F0 = 命令分派
    // ════════════════════════════════════════════════
    sub8053() {
        // $8053: 激活检查
        if (this.rd(0x05E3) === 0)
            return;
        // $8059: 延迟计数
        if (this.rd(0x05E9) !== 0) {
            this.wr(0x05E9, (this.rd(0x05E9) - 1) & 0xFF);
            return;
        }
        // $8062: LDA $05E4; JSR $C509 — 跳转表 4 项: $806E/$82F2/$82AC/$E505
        // H5: 子模式分派 ($82F2/$82AC/$E505) 待翻译, 当前主流程直接读脚本字节
        const cmdIdx = this.rd(0x05E4);
        void cmdIdx;
        // $8071: INC $05E5; 读脚本字节
        this.wr(0x05E5, (this.rd(0x05E5) + 1) & 0xFF);
        const ptr = this.rdPtr(0x005F, 0x0060);
        const y = this.rd(0x05E5);
        const data = this.readMemByte(ptr + y);
        if (data < 0xF0) {
            // $8080: 延迟值
            this.wr(0x05E9, data);
            this.wr(0x05E4, (this.rd(0x05E4) + 1) & 0xFF);
        }
        else {
            // $807A: 命令分派
            this.sub8087(data);
        }
    }
    // ════════════════════════════════════════════════
    // $8087 命令分派 (查 $808B 跳转表)
    // asm: AND #$0F; JSR $C509; 跳转表 6 项
    //   $8098/$80A0/$80B5/$80B8/$80CB/$81FD
    // ════════════════════════════════════════════════
    sub8087(a) {
        var _a;
        const cmd = a & 0x0F;
        // 原 6502: AND #$0F; JSR $C509 (cmd N → 表项 N)
        const table = [0x8098, 0x80A0, 0x80B5, 0x80B8, 0x80CB, 0x81FD];
        const target = (_a = table[cmd]) !== null && _a !== void 0 ? _a : 0x8098;
        switch (target) {
            case 0x8098:
                this.sub8098();
                break; // 命令0: 结束渲染
            case 0x80A0:
                this.sub80A0();
                break; // 命令1
            case 0x80B5:
                this.sub80B5();
                break; // 命令2: 指针跳转
            case 0x80B8:
                this.sub80B8();
                break; // 命令3: 子程调用
            case 0x80CB:
                this.sub80CB();
                break; // 命令4
            case 0x81FD:
                this.sub81FD();
                break; // 命令5
        }
    }
    // ════════════════════════════════════════════════
    // HUD 命令 stub
    // ════════════════════════════════════════════════
    /** $8098: 命令0 — 结束渲染 (清 $05E3) */
    sub8098() {
        this.wr(0x05E3, 0);
    }
    /**
     * $80A0: 命令1 — 等待帧循环 (轮询 $001C bit7)
     * asm: LDA #$01; JSR $C515; LDA $001C; BPL $80A0; 清 $05E9; INC $05E4; PLA PLA RTS
     */
    sub80A0() {
        while ((this.rd(0x001C) & 0x80) === 0) {
            this._system.coroutineYield(1);
        }
        this.wr(0x05E9, 0);
        this.wr(0x05E4, (this.rd(0x05E4) + 1) & 0xFF);
    }
    /** $80B5: 命令2 — 尾调用 $C52D */
    sub80B5() {
        this._system.subC52D();
    }
    /**
     * $80B8: 命令3 — 指针跳转 (从脚本流读 2 字节指针)
     * asm: LDY $05E5; LDA ($005F),Y; TAX; INY; LDA ($005F),Y; STA $0060; STX $005F; 清 $05E5
     */
    sub80B8() {
        const y = this.rd(0x05E5);
        const ptr = this.rdPtr(0x005F, 0x0060);
        const lo = this.readMemByte(ptr + y);
        const hi = this.readMemByte(ptr + y + 1);
        this.wrPtr(0x005F, 0x0060, (hi << 8) | lo);
        this.wr(0x05E5, 0);
    }
    /**
     * $80CB: 命令4 — 子表跳转 (查 $80EA 子表后跳转)
     * asm: LDY $05E5; LDA ($005F),Y; JSR $80EA; TXA; ASL; SEC; ADC $05E5; TAY;
     *   读 2 字节指针; 设新指针; 清 $05E5
     */
    sub80CB() {
        const y0 = this.rd(0x05E5);
        const ptr0 = this.rdPtr(0x005F, 0x0060);
        const subIdx = this.readMemByte(ptr0 + y0);
        const type = this.sub80EA(subIdx);
        const off = ((type << 1) + y0) & 0xFF;
        const lo = this.readMemByte(ptr0 + off);
        const hi = this.readMemByte(ptr0 + off + 1);
        this.wrPtr(0x005F, 0x0060, (hi << 8) | lo);
        this.wr(0x05E5, 0);
    }
    /**
     * $80EA: 子表索引分派 (被 $80CB 调用, 返回 X)。
     * asm $80EA: JSR $C509; 跳转表 $80ED 8 项:
     *   $80FD/$8106/$810E/$811E/$8122/$8138/$81CE/$81E4
     * 各目标子程计算 X (精灵组/属性索引) 后 RTS, 调用方 TXA 取 X。
     */
    sub80EA(a) {
        const cmd = a & 0xFF;
        switch (cmd) {
            // $80FD: LDX #$00; BIT $043C; BPL→RTS; INX → X = ($043C bit7) ? 1 : 0
            case 0:
                return (this.rd(0x043C) & 0x80) !== 0 ? 1 : 0;
            // $8106: LDX $05FB; BEQ→RTS; LDX #$01 → X = ($05FB==0) ? 0 : 1
            case 1:
                return this.rd(0x05FB) === 0 ? 0 : 1;
            // $810E: X=$0600; ==0→3; DEX; X>=3→2, 否则保留 X-1
            case 2: {
                const v = this.rd(0x0600);
                if (v === 0)
                    return 3;
                const d = (v - 1) & 0xFF;
                return d < 3 ? d : 2;
            }
            // $811E: LDX $0629; RTS
            case 3:
                return this.rd(0x0629);
            // $8122: X=0; A=$0026; 查表 $8131 (05 0B 0F 15 16 1A 21), 首个表项 >= A
            case 4: {
                const a26 = this.rd(0x0026);
                const TABLE_8131 = [0x05, 0x0B, 0x0F, 0x15, 0x16, 0x1A, 0x21];
                let x = 0;
                while (x < TABLE_8131.length && a26 > TABLE_8131[x])
                    x++;
                return x;
            }
            // $8138: LDA $0027; JSR $C509 (5 项: $8147/$8156/$8147/$8156/$8156)
            case 5: {
                const a27 = this.rd(0x0027);
                const a28 = this.rd(0x0028);
                const a29 = this.rd(0x0029);
                if (a27 === 0 || a27 === 2) {
                    // $8147: X=2; A=$0028; CMP $0029 → 相等2 / 小于1 / 大于0
                    if (a28 === a29)
                        return 2;
                    return a28 < a29 ? 1 : 0;
                }
                // $8156: Y=$0026; LDA $81AC,Y → $0049
                const y = this.rd(0x0026);
                const v49 = this.readMemByte(0x81AC + y);
                this.wr(0x0049, v49);
                if (a28 !== a29) {
                    if (a28 < a29) {
                        // $818D: X=$0A; $0027==4 → $0B
                        return a27 === 4 ? 0x0B : 0x0A;
                    }
                    // $8197: X = ($0049&7)+3; X==3 && $0027==3 → $09
                    let x = ((v49 & 0x07) + 3) & 0xFF;
                    if (x === 3 && a27 === 3)
                        x = 9;
                    return x;
                }
                // $8165: X=$0D; $0027==1 → $817E
                if (a27 === 1) {
                    // $817E: X=$0C; BIT $0049; BMI→$0C; INX→$0D; BIT $0049; BVC→$0D; INX→$0E
                    if ((v49 & 0x80) !== 0)
                        return 0x0C;
                    return (v49 & 0x40) !== 0 ? 0x0E : 0x0D;
                }
                // $816E: BIT $0049; BVC $8174 (bit6 清) → $002B==$23 ? $0F : $0D; 否则 $0E
                if ((v49 & 0x40) === 0) {
                    return this.rd(0x002B) === 0x23 ? 0x0F : 0x0D;
                }
                return 0x0E;
            }
            // $81CE: A=$0616>>1; X: >=6→3 / >=5→2 / >=1→1 / 0
            case 6: {
                const v = (this.rd(0x0616) >> 1) & 0xFF;
                if (v >= 6)
                    return 3;
                if (v >= 5)
                    return 2;
                return v >= 1 ? 1 : 0;
            }
            // $81E4: A=$05FB^$0B; JSR $C50C; A=($0034)[7]; >=$36→2 / >=$19→1 / 0
            case 7: {
                this._system.subC50C();
                const ptr = this.rdPtr(0x0034, 0x0035);
                const a = this.readMemByte(ptr + 7);
                if (a >= 0x36)
                    return 2;
                return a >= 0x19 ? 1 : 0;
            }
            default:
                return 0;
        }
    }
    /**
     * $81FD: 命令5 — NT 填充 + 读延迟
     * asm: JSR $C52D; LDA #$0D; STA $05F3; LDA #$80; STA $05F4;
     *   LDY $05E5; LDA ($005F),Y; STA $05E9; INC $05E5; PLA PLA RTS
     */
    sub81FD() {
        this._system.subC52D();
        this.wr(0x05F3, 0x0D);
        this.wr(0x05F4, 0x80);
        const y = this.rd(0x05E5);
        const ptr = this.rdPtr(0x005F, 0x0060);
        const delay = this.readMemByte(ptr + y);
        this.wr(0x05E9, delay);
        this.wr(0x05E5, (this.rd(0x05E5) + 1) & 0xFF);
    }
    // ════════════════════════════════════════════════
    // 跳转表入口目标 — 已翻译
    // ════════════════════════════════════════════════
    /**
     * $86F8: HUD 初始化 — 读 $0532 标志, 查 $AD6E 指针表,
     *   处理精灵属性数据流 ($046F 区), 调 $C533 NT 刷新。
     */
    sub86F8() {
        const flag = this.rd(0x0532);
        if (flag === 0)
            return;
        if ((flag & 0x80) === 0) {
            const cnt = this.rd(0x0533);
            if (cnt === 0) {
                this.hudInitProcess();
            }
            else {
                this.wr(0x0533, (cnt - 1) & 0xFF);
            }
            return;
        }
        const idx = flag & 0x7F;
        this.wr(0x0532, idx);
        if (idx === 0)
            return;
        const off = ((idx - 1) << 1) & 0xFF;
        this.wr(0x0079, this.readRomByte(0xAD6E + off));
        this.wr(0x007A, this.readRomByte(0xAD6F + off));
        this.wr(0x0533, 0);
        this.hudInitProcess();
    }
    /** $8723-$8776: HUD 初始化数据处理循环 */
    hudInitProcess() {
        let y = 0;
        while (true) {
            const ptr = this.rdPtr(0x0079, 0x007A);
            const byte = this.readMemByte(ptr + y);
            const type = byte & 0x07;
            const count = byte >> 3;
            if (count !== 0) {
                this.wr(0x0533, count);
                this.wr(0x003A, byte & 0x07);
                y++;
                const writeCount = this.rd(0x003A);
                for (let i = 0; i < writeCount; i++) {
                    const offset = this.readMemByte(this.rdPtr(0x0079, 0x007A) + y);
                    y++;
                    const val = this.readMemByte(this.rdPtr(0x0079, 0x007A) + y);
                    this.wr(0x046F + offset, val);
                    y++;
                }
                const newPtr = (this.rdPtr(0x0079, 0x007A) + y) & 0xFFFF;
                this.wrPtr(0x0079, 0x007A, newPtr);
                this._system.subC533();
                return;
            }
            if (type === 0) {
                this.wr(0x0532, 0);
                return;
            }
            if (type === 1) {
                y++;
                const lo = this.readMemByte(this.rdPtr(0x0079, 0x007A) + y);
                y++;
                const hi = this.readMemByte(this.rdPtr(0x0079, 0x007A) + y);
                this.wrPtr(0x0079, 0x007A, (hi << 8) | lo);
                y = 0;
                continue;
            }
            y++;
        }
    }
    /**
     * $8779: 比分显示 — 读 $0534 标志, 查 $AD1C 指针表,
     *   处理比分数据 ($0490/$0491 VRAM 地址)。
     */
    sub8779() {
        const flag = this.rd(0x0534);
        if (flag === 0)
            return;
        if ((flag & 0x80) === 0) {
            const cnt = this.rd(0x0535);
            if (cnt === 0) {
                this.scoreDisplayProcess();
            }
            else {
                this.wr(0x0535, (cnt - 1) & 0xFF);
            }
            return;
        }
        const idx = flag & 0x7F;
        this.wr(0x0534, idx);
        if (idx === 0)
            return;
        const off = ((idx - 1) << 1) & 0xFF;
        this.wr(0x007B, this.readRomByte(0xAD1C + off));
        this.wr(0x007C, this.readRomByte(0xAD1D + off));
        this.wr(0x0535, 0);
        this.scoreDisplayProcess();
    }
    /** $87A4-$87E3: 比分显示数据处理循环 */
    scoreDisplayProcess() {
        let y = 0;
        while (true) {
            const ptr = this.rdPtr(0x007B, 0x007C);
            const byte = this.readMemByte(ptr + y);
            if (byte < 0xF0) {
                this.wr(0x0535, byte);
                y++;
                this.wr(0x0490, this.readMemByte(this.rdPtr(0x007B, 0x007C) + y));
                y++;
                this.wr(0x0491, this.readMemByte(this.rdPtr(0x007B, 0x007C) + y));
                y++;
                const newPtr = (this.rdPtr(0x007B, 0x007C) + y) & 0xFFFF;
                this.wrPtr(0x007B, 0x007C, newPtr);
                return;
            }
            if (byte === 0xF0) {
                this.wr(0x0534, 0);
                return;
            }
            if (byte === 0xF1) {
                y++;
                const lo = this.readMemByte(this.rdPtr(0x007B, 0x007C) + y);
                y++;
                const hi = this.readMemByte(this.rdPtr(0x007B, 0x007C) + y);
                this.wrPtr(0x007B, 0x007C, (hi << 8) | lo);
                y = 0;
                continue;
            }
            y++;
        }
    }
    /**
     * $87E6: 时钟显示 — 读 $0536 标志, 查 $AD54 指针表,
     *   处理时钟数据 ($0538 值)。
     */
    sub87E6() {
        const flag = this.rd(0x0536);
        if (flag === 0) {
            this.wr(0x0538, 0);
            return;
        }
        if ((flag & 0x80) === 0) {
            const cnt = this.rd(0x0537);
            if (cnt === 0) {
                this.clockDisplayProcess();
            }
            else {
                this.wr(0x0537, (cnt - 1) & 0xFF);
            }
            return;
        }
        const idx = flag & 0x7F;
        this.wr(0x0536, idx);
        if (idx === 0) {
            this.wr(0x0538, 0);
            return;
        }
        const off = ((idx - 1) << 1) & 0xFF;
        this.wr(0x007D, this.readRomByte(0xAD54 + off));
        this.wr(0x007E, this.readRomByte(0xAD55 + off));
        this.wr(0x0537, 0);
        this.clockDisplayProcess();
    }
    /** $8815-$884E: 时钟显示数据处理循环 */
    clockDisplayProcess() {
        let y = 0;
        while (true) {
            const ptr = this.rdPtr(0x007D, 0x007E);
            const byte = this.readMemByte(ptr + y);
            if (byte < 0xF0) {
                this.wr(0x0537, byte);
                y++;
                this.wr(0x0538, this.readMemByte(this.rdPtr(0x007D, 0x007E) + y));
                y++;
                const newPtr = (this.rdPtr(0x007D, 0x007E) + y) & 0xFFFF;
                this.wrPtr(0x007D, 0x007E, newPtr);
                return;
            }
            if (byte === 0xF0) {
                this.wr(0x0536, 0);
                return;
            }
            if (byte === 0xF1) {
                y++;
                const lo = this.readMemByte(this.rdPtr(0x007D, 0x007E) + y);
                y++;
                const hi = this.readMemByte(this.rdPtr(0x007D, 0x007E) + y);
                this.wrPtr(0x007D, 0x007E, (hi << 8) | lo);
                y = 0;
                continue;
            }
            y++;
        }
    }
    /**
     * $8851: 体力条显示 — 查 $B3CF/$B3BD 表, 渲染体力条精灵。
     */
    sub8851() {
        const param = this.rd(0x05C7);
        let y = param & 0xFF;
        const x0 = (y << 1) & 0xFF;
        this.wr(0x0050, this.readRomByte(0xB3CF + x0));
        this.wr(0x0051, this.readRomByte(0xB3D0 + x0));
        const x1 = y & 0x03;
        y = y >> 2;
        let cfg = this.readRomByte(0xB3BD + y);
        for (let i = x1; i > 0; i--) {
            if ((cfg & 0x80) !== 0)
                break;
            cfg >>= 1;
        }
        const c6 = cfg & 0x03;
        this.wr(0x05C6, ((c6 << 3) + c6) & 0xFF);
        this.wr(0x05C5, 0);
        while (this.rd(0x0515) !== 0) {
            this._system.coroutineYield(1);
        }
        this.wr(0x0515, 0x01);
        const ptr50 = this.rdPtr(0x0050, 0x0051);
        const tileW = this.readMemByte(ptr50 + 2);
        let x = ((tileW << 1) + 6) & 0xFF;
        for (let i = x; i >= 0; i--) {
            this.wr(0x04A5 + i, 0);
        }
        const result = this.sub88B9(0x00);
        if (result === 0)
            return;
        const tileW2 = this.readMemByte(this.rdPtr(0x0050, 0x0051) + 2);
        this.sub88B9((tileW2 + 3) & 0xFF);
    }
    /** $88B9: 体力条精灵渲染子程 */
    sub88B9(x) {
        this.wr(0x0045, 0xFF);
        const ptr50 = this.rdPtr(0x0050, 0x0051);
        this.wr(0x04A5 + x, this.readMemByte(ptr50 + 2));
        this.wr(0x003A, 0);
        let c5 = this.rd(0x05C5);
        let a3 = 0;
        for (let i = 0; i < 3; i++) {
            a3 = ((a3 >> 1) | ((c5 & 1) << 7)) & 0xFF;
            c5 >>= 1;
        }
        this.wr(0x003A, a3);
        this.wr(0x003B, c5);
        const yPos = (this.readMemByte(ptr50 + 0) + this.rd(0x003A)) & 0xFF;
        this.wr(0x04A6 + x, yPos);
        const xPos = (this.readMemByte(ptr50 + 1) + this.rd(0x003B)) & 0xFF;
        this.wr(0x04A7 + x, xPos);
        if (xPos < 0x22) {
            const pal = (this.rd(0x05CE) >> 4) & 0x0F;
            this.wr(0x04A7 + x, (this.rd(0x04A7 + x) | pal) & 0xFF);
        }
        this.wr(0x003A, x);
        const val05 = this.readMemByte(ptr50 + 5);
        if (val05 === this.rd(0x05C5)) {
            this.wr(0x0515, 0x80);
            this.wr(0x05C5, (this.rd(0x05C5) + 1) & 0xFF);
            const total = this.readMemByte(ptr50 + 3);
            return (this.rd(0x05C5) === total) ? 0 : 1;
        }
        this.wr(0x0515, 0x80);
        return 1;
    }
    // ════════════════════════════════════════════════
    // $82F2: NT 填充循环 (协程让出 + 清 $04A5 区 + 读脚本流)
    // ════════════════════════════════════════════════
    sub82F2() {
        // $82F2: LDA #$01; JSR $C515 (协程让出 1 帧)
        this._system.coroutineYield(1);
        // $82F7: LDA $0515; BNE $82F2 (等 $0515==0)
        while (this.rd(0x0515) !== 0) {
            this._system.coroutineYield(1);
        }
        // $82FC: LDA #$01; STA $0515
        this.wr(0x0515, 0x01);
        // $8301: LDA $05E6; ASL; CLC; ADC #$06; TAY; INY
        let y = (((this.rd(0x05E6) << 1) & 0xFF) + 6) & 0xFF;
        y = (y + 1) & 0xFF;
        // $830A: LDX #$00; 循环 TXA→$04A5,X; INX; DEY; BPL
        let x = 0;
        do {
            this.wr(0x04A5 + x, x & 0xFF);
            x = (x + 1) & 0xFF;
            y = (y - 1) & 0xFF;
        } while ((y & 0x80) === 0 && y !== 0);
        // $8314: LDA $05E6; CLC; ADC #$03; STA $003A; TAX
        const a3a = (this.rd(0x05E6) + 3) & 0xFF;
        this.wr(0x003A, a3a);
        let xx = a3a;
        // $831D: LDA $05E6; STA $04A5; STA $04A5,X
        this.wr(0x04A5, this.rd(0x05E6));
        this.wr(0x04A5 + xx, this.rd(0x05E6));
        // $8326: LDA $05E7; ASL; TAY
        const y2 = (this.rd(0x05E7) << 1) & 0xFF;
        // $832B: LDA $86E8,Y; STA $04A6
        const v1 = this.readRomByte(0x86E8 + y2);
        this.wr(0x04A6, v1);
        // $8331: CLC; ADC #$20; STA $04A6,X
        const v1Plus = (v1 + 0x20) & 0xFF;
        this.wr(0x04A6 + xx, v1Plus);
        // $8337: LDA $86E9,Y; STA $04A7
        const v2 = this.readRomByte(0x86E9 + y2);
        this.wr(0x04A7, v2);
        // $833D: ADC #$00 (v1 进位); STA $04A7,X
        const carry = (v1 + 0x20) > 0xFF ? 1 : 0;
        this.wr(0x04A7 + xx, (v2 + carry) & 0xFF);
        // $8342: LDA #$00; STA $003B
        this.wr(0x003B, 0);
        // $8346: 循环读脚本字节分派
        this._hudStop = false;
        while (!this._hudStop) {
            const ptr5f = this.rdPtr(0x005F, 0x0060);
            const yy = this.rd(0x05E5);
            this.wr(0x05E5, (yy + 1) & 0xFF);
            const data = this.readMemByte(ptr5f + yy);
            if (data < 0xE0) {
                this.sub8629(data);
            }
            else {
                this.sub835E(data);
            }
        }
    }
    // ════════════════════════════════════════════════
    // $835E: 命令分派 (SEC; SBC #$E0; 查 32 项跳转表)
    // ════════════════════════════════════════════════
    sub835E(a) {
        const cmd = (a - 0xE0) & 0xFF;
        switch (cmd) {
            case 0:
                this.hE0();
                break; // $83A4
            case 1:
                this.hE1();
                break; // $83CA
            case 2:
                this.hE2();
                break; // $83E2
            case 3:
                this.hE3();
                break; // $8443
            case 4:
                this.hE4_4467();
                break; // $8467
            case 5:
                this.hE5_846D();
                break; // $846D
            case 6:
                this.hE6_8475();
                break; // $8475
            case 7:
                this.hE7_848D();
                break; // $848D
            case 8:
                this.hE8_8493();
                break; // $8493
            case 9:
                this.hE9_8499();
                break; // $8499
            case 10:
                this.hE10_849F();
                break; // $849F
            case 11:
                this.hE11_84A5();
                break; // $84A5
            case 12:
                this.hE12_84AB();
                break; // $84AB
            case 13:
                this.hE13_84CE();
                break; // $84CE
            case 14:
                this.hE14_84D6();
                break; // $84D6
            case 15:
                this.hE15_84DC();
                break; // $84DC
            case 16:
                this.hE15_84DC();
                break; // $84DC (同15)
            case 17:
                this.hE17_84E6();
                break; // $84E6
            case 18:
                this.hE18_84EC();
                break; // $84EC
            case 19:
                this.hE19_84FB();
                break; // $84FB
            case 20:
                this.hE20_8507();
                break; // $8507
            case 21:
                this.sub863C(0xED);
                break; // $85B1
            case 22:
                this.sub863C(0xEE);
                break; // $85B6
            case 23:
                this.hE23_85BB();
                break; // $85BB
            case 24:
                this.sub863C(0xEF);
                break; // $85D0
            case 25: break; // $85D5 = RTS (no-op)
            case 26: break; // $85D5
            case 27: break; // $85D5
            case 28:
                this.hE28_85D6();
                break; // $85D6
            case 29: break; // $85FD = RTS (no-op)
            case 30:
                this.hE30_85FE();
                break; // $85FE
            case 31:
                this.hE31_8621();
                break; // $8621
        }
    }
    /** $83A4: cmd0 — 球员状态查表 (查 $83BF 表) */
    hE0() {
        const b3b = this.rd(0x043B);
        const x = (b3b === 1 && (this.rd(0x0628) & 0x80) !== 0) ? 0x0A : b3b;
        const v = ((this.rd(0x043C) & 0x7F) + this.readRomByte(0x83BF + x)) & 0xFF;
        this.sub863C(v);
    }
    /** $83CA: cmd1 — 球员方向查表 (查 $83DC 表) */
    hE1() {
        const x = this.rd(0x043D) & 0x1F;
        const v = ((this.rd(0x043E) & 0x7F) + this.readRomByte(0x83DC + x)) & 0xFF;
        this.sub863C(v);
    }
    /** $83E2: cmd2 — 球员状态条件写入 (复杂分支) */
    hE2() {
        const c3c = this.rd(0x043C);
        if ((c3c & 0x80) === 0) {
            this.hE2_8413();
            return;
        }
        const v = c3c & 0x7F;
        if (v === 0 || this.rd(0x043B) !== 0) {
            this.hE2_83FB();
            return;
        }
        if (v >= 3) {
            this.hE2_8413();
            return;
        }
        this.sub863C(this.readRomByte(0x8440 + v));
    }
    hE2_83FB() {
        const b3b = this.rd(0x043B);
        const x = (b3b === 1 && (this.rd(0x0628) & 0x80) !== 0) ? 0x0A : b3b;
        const a = this.readRomByte(0x8435 + x);
        if (a === 0xFF) {
            this.hE2_8413();
            return;
        }
        this.sub863C(a);
    }
    hE2_8413() {
        const b3b = this.rd(0x043B);
        const x = (b3b === 1 && (this.rd(0x0628) & 0x80) !== 0) ? 0x0A : b3b;
        const val = this.readRomByte(0x83BF + x);
        if (b3b !== 1) {
            this.sub863C(val);
            return;
        }
        const v = ((this.rd(0x043C) & 0x03) + val) & 0xFF;
        this.sub863C(v);
    }
    /** $8443: cmd3 — 球员方向条件写入 */
    hE3() {
        if ((this.rd(0x043E) & 0x80) !== 0) {
            const x = this.rd(0x043D);
            const a = this.readRomByte(0x8461 + x);
            if (a !== 0xFF) {
                this.sub863C(a);
                return;
            }
        }
        const x = this.rd(0x043D) & 0x3F;
        this.sub863C(this.readRomByte(0x83DC + x));
    }
    /** $8467: cmd4 — 球员1名字写入 */
    hE4_4467() { this.sub8653(this.rd(0x0441)); }
    /** $846D: cmd5 — 比赛阶段EOR写入 */
    hE5_846D() {
        const a = this.rd(0x05FB) ^ 0x0B;
        this.sub8478(a);
    }
    /** $8475: cmd6 — 比赛阶段+队伍写入 */
    hE6_8475() {
        let a = this.rd(0x05FB);
        const t2a = this.rd(0x002A);
        if (t2a !== 0) {
            a = this.rd(0x002B);
        }
        this.sub8478(a);
    }
    /** $8478: 通用 — 队伍分数+0x76 写入 */
    sub8478(a) {
        let y = a;
        if (y !== 0) {
            const v2b = this.rd(0x002B);
            if (v2b === 0x24)
                y = (y - 1) & 0xFF;
        }
        this.sub863C((y + 0x76) & 0xFF);
    }
    /** $848D: cmd7 — $0600 数字写入 */
    hE7_848D() { this.sub86B2(this.rd(0x0600)); }
    /** $8493: cmd8 — $0601 数字写入 */
    hE8_8493() { this.sub86B2(this.rd(0x0601)); }
    /** $8499: cmd9 — $0602 名字写入 */
    hE9_8499() { this.sub8653(this.rd(0x0602)); }
    /** $849F: cmd10 — $0603 名字写入 */
    hE10_849F() { this.sub8653(this.rd(0x0603)); }
    /** $84A5: cmd11 — $05FC 名字写入 */
    hE11_84A5() { this.sub8653(this.rd(0x05FC)); }
    /** $84AB: cmd12 — $043D 查 $84C7 表写入 */
    hE12_84AB() {
        const x = this.rd(0x043D);
        const a = this.readRomByte(0x84C7 + x);
        if (a === 0)
            return;
        if ((this.rd(0x043E) & 0x80) !== 0) {
            this.sub863C(0xE6);
        }
        this.sub863C(this.readRomByte(0x84C7 + this.rd(0x043D)));
    }
    /** $84CE: cmd13 — 比赛阶段EOR名字写入 */
    hE13_84CE() { this.sub8653(this.rd(0x05FB) ^ 0x0B); }
    /** $84D6: cmd14 — $0442 名字写入 */
    hE14_84D6() { this.sub8653(this.rd(0x0442)); }
    /** $84DC: cmd15/16 — $0616 右移+0x34 数字写入 */
    hE15_84DC() {
        const a = ((this.rd(0x0616) >> 1) + 0x34) & 0xFF;
        this.sub8629(a);
    }
    /** $84E6: cmd17 — $002A+0x76 (检查$24) */
    hE17_84E6() {
        let a = this.rd(0x002A);
        if (a === 0x24)
            a = 0x23;
        this.sub863C((a + 0x76) & 0xFF);
    }
    /** $84EC: cmd18 — $002B+0x76 (检查$24) */
    hE18_84EC() {
        let a = this.rd(0x002B);
        if (a === 0x24)
            a = 0x23;
        this.sub863C((a + 0x76) & 0xFF);
    }
    /** $84FB: cmd19 — 球员1查 $852C 表后调 $8534 */
    hE19_84FB() {
        this.sub8513(this.rd(0x0441));
        this.sub8534(this.rd(0x0442));
    }
    /** $8507: cmd20 — 球员2查 $852C 表后调 $8534 */
    hE20_8507() {
        this.sub8513(this.rd(0x0442));
        this.sub8534(this.rd(0x0441));
    }
    /** $85BB: cmd23 — 重复写 0x7C tile (N 次) */
    hE23_85BB() {
        const y = this.rd(0x05E5);
        this.wr(0x05E5, (y + 1) & 0xFF);
        const ptr = this.rdPtr(0x005F, 0x0060);
        let count = this.readMemByte(ptr + y);
        while (count !== 0) {
            this.sub8629(0x7C);
            count = (count - 1) & 0xFF;
        }
    }
    /** $85D6: cmd28 — 中止脚本流 (PLA PLA RTS) */
    hE28_85D6() {
        this.wr(0x0515, 0x80);
        if (this.rd(0x05E7) === this.rd(0x05E8)) {
            this.wr(0x05E4, 0);
            this.wr(0x05E9, 0x01);
        }
        else {
            this.wr(0x05E7, (this.rd(0x05E7) + 1) & 0xFF);
            this.wr(0x05E5, (this.rd(0x05E5) + 1) & 0xFF);
            this.wr(0x05E9, 0x01);
        }
        this._hudStop = true;
    }
    /** $85FE: cmd30 — 等待帧 (循环到 $05E3 bit7 置位) */
    hE30_85FE() {
        this.wr(0x0515, 0x80);
        this.wr(0x05E3, this.rd(0x05E3) & 0xBF);
        this._system.coroutineYield(1);
        while ((this.rd(0x05E3) & 0x80) === 0) {
            this._system.coroutineYield(1);
        }
        this.wr(0x05E3, this.rd(0x05E3) & 0xBF);
    }
    /** $8621: cmd31 — 停止 HUD (LDA #$00; STA $05E3; PLA PLA RTS) */
    hE31_8621() {
        this.wr(0x05E3, 0);
        this._hudStop = true;
    }
    // ════════════════════════════════════════════════
    // $8629-$86F7: NT 写入 + 字符串/球员名/数字辅助
    // ════════════════════════════════════════════════
    /** $8629: NT 写入 (LDX $003A; STA $04A8,X; LDX $003B; TYA; STA $04A8,X; INC $003A/$003B) */
    sub8629(a) {
        const xa = this.rd(0x003A);
        this.wr(0x04A8 + xa, a & 0xFF);
        const xb = this.rd(0x003B);
        this.wr(0x04A8 + xb, this._ry & 0xFF);
        this.wr(0x003A, (xa + 1) & 0xFF);
        this.wr(0x003B, (xb + 1) & 0xFF);
    }
    /** $863C: 字符串写入 (JSR $C53C 设 $0030; 循环读 ($0030),Y 写 NT) */
    sub863C(a) {
        this._ra = a;
        this._fixedC53C();
        this.wr(0x003C, 0);
        let y = 0;
        while (true) {
            const ptr = this.rdPtr(0x0030, 0x0031);
            const d = this.readMemByte(ptr + y);
            if (d >= 0xE0)
                break;
            this._ry = y;
            this.sub8629(d);
            y = (y + 1) & 0xFF;
            this.wr(0x003C, (this.rd(0x003C) + 1) & 0xFF);
        }
    }
    /** $8653: 球员名写入 (STA $003D; JSR $C50C; 读 ($0034),Y; BEQ→查 $8686 表) */
    sub8653(a) {
        this.wr(0x003D, a & 0xFF);
        this._system.subC50C();
        const ptr = this.rdPtr(0x0034, 0x0035);
        const v = this.readMemByte(ptr);
        if (v !== 0) {
            this.sub863C(v);
            this._ry = 0;
            this.sub8629(0x08);
            this.sub8629(0x2E);
            return;
        }
        // $866B: LDA $003D; SEC; SBC #$0B; ASL; ASL; TAX
        const x = ((this.rd(0x003D) - 0x0B) & 0xFF) << 2;
        for (let i = 0; i < 4; i++) {
            this.wr(0x05EE + i, this.readRomByte(0x8686 + x + i));
        }
        this.sub863C(0);
    }
    /** $86B2: 数字写入 (ADC #$33; JMP $8629) */
    sub86B2(a) {
        this._ry = 0;
        this.sub8629((a + 0x33) & 0xFF);
    }
    /** $C53C: 设 $0030/$0031 = $05EE (名字缓冲) — H5 port */
    _fixedC53C() {
        this.wrPtr(0x0030, 0x0031, 0x05EE);
    }
    // ════════════════════════════════════════════════
    // $8513/$8534: 球员 ID 查 $852C 表 + 字符串写入
    // ════════════════════════════════════════════════
    /** $8513: 球员 ID 查 $852C 表 (8项), 返回 carry + $003D */
    sub8513(a) {
        this._ra = a;
        this._system.subC50C();
        const ptr = this.rdPtr(0x0034, 0x0035);
        const id = this.readMemByte(ptr);
        for (let x = 0; x < 8; x++) {
            if (id === this.readRomByte(0x852C + x)) {
                this.wr(0x003D, x);
                this._carry = true;
                return;
            }
        }
        this._carry = false;
    }
    /** $8534: 球员名查 $8589 指针表 + 字符串写入 */
    sub8534(a) {
        this._ra = a;
        this._system.subC50C();
        if (!this._carry) {
            const ptr = this.rdPtr(0x0034, 0x0035);
            this.sub863C(this.readMemByte(ptr));
            return;
        }
        const x0 = (this.rd(0x003D) << 1) & 0xFF;
        this.wr(0x003E, this.readRomByte(0x8589 + x0));
        this.wr(0x003F, this.readRomByte(0x858A + x0));
        const val = this.readMemByte(this.rdPtr(0x0034, 0x0035));
        const strPtr = this.rdPtr(0x003E, 0x003F);
        let y = 0;
        while (true) {
            const c = this.readMemByte(strPtr + y);
            if (c === 0) {
                this.sub863C(this.readMemByte(this.rdPtr(0x0034, 0x0035)));
                return;
            }
            if (val === c) {
                this.sub863C(val);
                const x1 = (this.rd(0x003D) << 1) & 0xFF;
                const hi = this.readRomByte(0x857A + x1);
                const lo = this.readRomByte(0x8579 + x1);
                this._ry = 0;
                this.sub8629(lo);
                this.sub8629(hi);
                return;
            }
            y = (y + 1) & 0xFF;
        }
    }
    // ════════════════════════════════════════════════
    // $8914-$8D9D: 体力条精灵组渲染 + 命令分派
    // ════════════════════════════════════════════════
    /** $8918: 体力条精灵组渲染 (查 $8D9E/$8D9F/$8DA0 表写 $04A8) */
    sub8918() {
        const ptr50 = this.rdPtr(0x0050, 0x0051);
        this.wr(0x003B, (this.readMemByte(ptr50 + 6) - 2) & 0xFF);
        let y = (this.rd(0x003A) + this.readMemByte(ptr50 + 4)) & 0xFF;
        const x = (this._rx + this.rd(0x05C6)) & 0xFF;
        this.wr(0x04A8 + y, this.readRomByte(0x8D9E + x));
        y = (y + 1) & 0xFF;
        let count = this.rd(0x003B);
        while (count !== 0) {
            this.wr(0x04A8 + y, this.readRomByte(0x8D9F + x));
            y = (y + 1) & 0xFF;
            count = (count - 1) & 0xFF;
        }
        this.wr(0x04A8 + y, this.readRomByte(0x8DA0 + x));
    }
    /** $8949: 精灵属性循环 (读 ($0050),Y 分派 $8986) */
    sub8949() {
        const ptr50 = this.rdPtr(0x0050, 0x0051);
        let y = 8;
        let a = this.readMemByte(ptr50 + y);
        if (a === 0) {
            this.sub8949End();
            return;
        }
        this.wr(0x003B, a);
        y = 9;
        while (true) {
            this.wr(0x003C, 0);
            a = this.readMemByte(ptr50 + y);
            if (a === this.rd(0x05C5)) {
                this.wr(0x0048, y);
                this.sub8986(y);
                y = this.rd(0x0048);
            }
            else {
                a = (a - 1) & 0xFF;
                this.wr(0x003C, (this.rd(0x003C) + 1) & 0xFF);
                if (a === this.rd(0x05C5)) {
                    this.wr(0x0048, y);
                    this.sub8986(y);
                    y = this.rd(0x0048);
                }
            }
            y = (y + 4) & 0xFF;
            this.wr(0x003B, (this.rd(0x003B) - 1) & 0xFF);
            if (this.rd(0x003B) === 0)
                break;
        }
        this.sub8949End();
    }
    /** $8976: 精灵属性循环结束 */
    sub8949End() {
        this.wr(0x0515, 0x80);
        const old = this.rd(0x05C5);
        this.wr(0x05C5, (old + 1) & 0xFF);
        const total = this.readMemByte(this.rdPtr(0x0050, 0x0051) + 3);
        this._rz = (old === total) ? 0 : 1;
    }
    /** $8986: 精灵属性数据读取 (读 ($0050),Y 设 $003D/$003E/$003F; 循环 ($003E),Y) */
    sub8986(y0) {
        let y = (y0 + 1) & 0xFF;
        const ptr50 = this.rdPtr(0x0050, 0x0051);
        this.wr(0x003D, (this.readMemByte(ptr50 + y) + this.rd(0x003A)) & 0xFF);
        y = (y + 1) & 0xFF;
        this.wr(0x003E, this.readMemByte(ptr50 + y));
        y = (y + 1) & 0xFF;
        this.wr(0x003F, this.readMemByte(ptr50 + y));
        this.wr(0x0040, 0);
        while (true) {
            const y40 = this.rd(0x0040);
            this.wr(0x0040, (y40 + 1) & 0xFF);
            const a = this.readMemByte(this.rdPtr(0x003E, 0x003F) + y40);
            if (a < 0xE0) {
                this._system.subC524(a);
                this.sub8C9F();
                if (this._rz !== 0)
                    continue;
                break;
            }
            this.sub89B4(a);
        }
    }
    /** $89B4: 命令分派 (SEC; SBC #$E0; 查 ~60 项跳转表) */
    sub89B4(a) {
        var _a;
        const cmd = (a - 0xE0) & 0xFF;
        const table = [
            0x89FA, 0x8A00, 0x8A06, 0x8A0C, 0x8A12, 0x8A22, 0x8A2F, 0x8A36,
            0x8A3B, 0x8A40, 0x8A43, 0x8A58, 0x8A86, 0x8A90, 0x8A95, 0x8AAC,
            0x8AB2, 0x8ABB, 0x8AC2, 0x8AD6, 0x8ADC, 0x8AE4, 0x8AEB, 0x8B0A,
            0x8B31, 0x8B48, 0x8B87, 0x8BD6, 0x8BE1, 0x8BE7, 0x8BF0, 0x8C06,
            0x8C47, 0x8C4A, 0x8C55, 0x8CA5, 0x8CDC, 0x8D1A, 0x8D6C,
        ];
        const target = (_a = table[cmd]) !== null && _a !== void 0 ? _a : 0x89FA;
        switch (target) {
            case 0x89FA:
                this.hD0_89FA();
                break;
            case 0x8A00:
                this.hD1_8A00();
                break;
            case 0x8A06:
                this.hD2_8A06();
                break;
            case 0x8A0C:
                this.hD3_8A0C();
                break;
            case 0x8A12:
                this.hD4_8A12();
                break;
            case 0x8A22:
                this.hD5_8A22();
                break;
            case 0x8A2F:
                this.sub863C(0xC4);
                break;
            case 0x8A36:
                this.sub863C(0xBD);
                break;
            case 0x8A3B:
                this.sub863C(0xC8);
                break;
            case 0x8A40:
                this.hD9_8A40();
                break;
            case 0x8A43:
                this.hDA_8A43();
                break;
            case 0x8A58:
                this.hDB_8A58();
                break;
            case 0x8A86:
                this.hDC_8A86();
                break;
            case 0x8A90:
                this.hDD_8A90();
                break;
            case 0x8A95:
                this.hDE_8A95();
                break;
            case 0x8AAC:
                this.hDF_8AAC();
                break;
            case 0x8AB2:
                this.hE0_8AB2();
                break;
            case 0x8ABB:
                this.hE1_8ABB();
                break;
            case 0x8AC2:
                this.hE2_8AC2();
                break;
            case 0x8AD6:
                this.hE3_8AD6();
                break;
            case 0x8ADC:
                this.hE4_8ADC();
                break;
            case 0x8AE4:
                this.hE5_8AE4();
                break;
            case 0x8AEB:
                this.hE6_8AEB();
                break;
            case 0x8B0A:
                this.hE7_8B0A();
                break;
            case 0x8B31:
                this.hE8_8B31();
                break;
            case 0x8B48:
                this.hE9_8B48();
                break;
            case 0x8B87:
                this.hEA_8B87();
                break;
            case 0x8BD6:
                this.hEB_8BD6();
                break;
            case 0x8BE1:
                this.sub8D1A(this.rd(0x05FD));
                break;
            case 0x8BE7:
                this.sub8D1A(this.rd(0x05FD));
                break;
            case 0x8BF0:
                this.hEF_8BF0();
                break;
            case 0x8C06:
                this.hF0_8C06();
                break;
            case 0x8C47:
                this.hF1_8C47();
                break;
            case 0x8C4A:
                this.hF2_8C4A();
                break;
            case 0x8C55:
                this.sub8C55();
                break;
            case 0x8CA5:
                this.hF4_8CA5();
                break;
            case 0x8CDC:
                this.sub8CDC();
                break;
            case 0x8D1A:
                this.sub8D1A(this._ra);
                break;
            case 0x8D6C:
                this.sub8D6C();
                break;
        }
    }
    // $89B4 命令处理子程
    hD0_89FA() { this.sub8CDC(); }
    hD1_8A00() { this.sub8CA5(); }
    hD2_8A06() { this.sub8CDC(); }
    hD3_8A0C() { this.sub8CA5(); }
    hD4_8A12() {
        const a = this.rd(0x043B);
        this._system.subC509(a);
    }
    hD5_8A22() {
        const ptr3e = this.rdPtr(0x003E, 0x003F);
        const v = this.readMemByte(ptr3e + this.rd(0x0040));
        if (v !== 0) {
            const x = this.readMemByte(ptr3e + this.rd(0x0040) + 1);
            this._ra = (this._ra + this.rd(0x0430 + x)) & 0xFF;
        }
        else {
            this._ra = 0x9A;
        }
        this.sub8A43_8A56();
    }
    hD9_8A40() { this._rx = this._ra; this.sub8A43_8A56(); }
    sub8A43_8A56() {
        this.wr(0x0047, this._ra);
        this._system.subC53C();
        const v49 = this.rd(0x0047);
        this._ra = v49;
        let y = 9;
        if (v49 === 0xAA) {
            y = 0;
        }
        else {
            y = 0;
            const ptr30 = this.rdPtr(0x0030, 0x0031);
            while (true) {
                const c = this.readMemByte(ptr30 + y);
                if (c === 0xFC)
                    break;
                y = (y + 1) & 0xFF;
            }
        }
        this.wr(0x0049, y & 0xFF);
        this.wr(0x0046, 0);
        let cnt = this.rd(0x0049);
        while (cnt !== 0) {
            const ptr30 = this.rdPtr(0x0030, 0x0031);
            const v = this.readMemByte(ptr30 + this.rd(0x0046));
            this._system.subC524(v);
            this.sub8C9F();
            this.wr(0x0046, (this.rd(0x0046) + 1) & 0xFF);
            cnt = (cnt - 1) & 0xFF;
        }
    }
    hDA_8A43() { this.sub8A43_8A56(); }
    hDB_8A58() {
        const ptr3e = this.rdPtr(0x003E, 0x003F);
        const x = this.readMemByte(ptr3e + this.rd(0x0040));
        this._ra = this.rd(0x0601 + x);
        this.sub8D1A(this._ra);
    }
    hDC_8A86() {
        const x = this.rd(0x061E);
        this._ra = this.rd(0x060B + x);
        const y = this.readMemByte(this.rdPtr(0x003E, 0x003F) + this.rd(0x0040));
        this._ra = (this._ra + this.readRomByte(0x8AAC + y)) & 0xFF;
        this.sub8D6C();
    }
    hDD_8A90() {
        const x = this.rd(0x061E);
        this._ra = this.rd(0x0601 + x);
        this.sub8CDC();
    }
    hDE_8A95() {
        const x = this.rd(0x061E);
        this._ra = this.rd(0x0601 + x);
        this.sub8CA5();
    }
    hDF_8AAC() {
        const ptr3e = this.rdPtr(0x003E, 0x003F);
        const x = this.readMemByte(ptr3e + this.rd(0x0040));
        this._ra = this.rd(0x0431 + x);
        let xi = (x + 1) & 0xFF;
        if (xi >= this.rd(0x0430))
            return;
        this._rx = xi;
        this.sub8D1A(this._ra);
    }
    hE0_8AB2() {
        const x = this.rd(0x061E);
        this._ra = this.rd(0x0601 + x);
        this.sub8CDC();
    }
    hE1_8ABB() {
        const x = this.rd(0x061E);
        this._ra = this.rd(0x0601 + x);
        this.sub8CA5();
    }
    hE2_8AC2() {
        const ptr3e = this.rdPtr(0x003E, 0x003F);
        const x = this.readMemByte(ptr3e + this.rd(0x0040));
        this._ra = this.rd(0x0431 + x);
        let xi = (x + 1) & 0xFF;
        if (xi >= this.rd(0x0430))
            return;
        this._rx = xi;
        this.sub8D1A(this._ra);
    }
    hE3_8AD6() { this.sub8CDC(); }
    hE4_8ADC() { this.sub8CA5(); }
    hE5_8AE4() {
        const x = this.rd(0x002A);
        let a;
        const ptr3e = this.rdPtr(0x003E, 0x003F);
        const v = this.readMemByte(ptr3e + this.rd(0x0040));
        if (v === 0) {
            a = this.rd(0x002B);
        }
        else {
            a = this.rd(0x002A);
        }
        const idx = a;
        const off = this.readRomByte(0x8B0A + idx);
        this._ra = (a + 0x76) & 0xFF;
        if (this._ra >= 0x9A)
            this._ra = 0x99;
        this._system.subC53C();
        void off;
    }
    hE6_8AEB() {
        const ptr3e = this.rdPtr(0x003E, 0x003F);
        const x = this.readMemByte(ptr3e + this.rd(0x0040));
        this._ra = this.rd(0x0028 + x);
        const y = this.rd(0x0027);
        if (y === 4) {
            this._ra = this.rd(0x0610 + x);
        }
        this._rx = 0;
        this.sub8C55();
    }
    hE7_8B0A() {
        this.wr(0x0047, 0);
        let a27 = this.rd(0x0027);
        while (true) {
            const x = ((a27 << 2) + a27 + this.rd(0x0047)) & 0xFF;
            const v = this.readRomByte(0x8B72 + x);
            if (v === 0xFF) {
                this.wr(0x003D, (this.rd(0x003D) + 1) & 0xFF);
                this.wr(0x0047, (this.rd(0x0047) + 1) & 0xFF);
                if (this.rd(0x0047) === 5)
                    return;
                a27 = this.rd(0x0027);
                continue;
            }
            this._system.subC524(v);
            this.sub8C9F();
            this.wr(0x0047, (this.rd(0x0047) + 1) & 0xFF);
            if (this.rd(0x0047) === 5)
                return;
            a27 = this.rd(0x0027);
        }
    }
    hE8_8B31() {
        const ptr3e = this.rdPtr(0x003E, 0x003F);
        const x = this.readMemByte(ptr3e + this.rd(0x0040));
        this._ra = this.rd(0x0028 + x);
        this._rx = 0;
        this.sub8C55();
    }
    hE9_8B48() {
        this.wr(0x0047, 0);
        const a27 = this.rd(0x0027);
        const x = ((a27 << 2) + a27 + this.rd(0x0047)) & 0xFF;
        const v = this.readRomByte(0x8B72 + x);
        if (v !== 0xFF) {
            this._system.subC524(v);
            this.sub8C9F();
        }
    }
    hEA_8B87() {
        const f7 = this.rd(0x05F7);
        const f8 = this.rd(0x05F8);
        let lo = f7;
        let hi = f8;
        let x = 0;
        while (true) {
            lo = (lo - 6) & 0xFF;
            if (lo > 0xFF - 6) {
                hi = (hi - 1) & 0xFF;
                if ((hi & 0x80) !== 0)
                    break;
            }
            x = (x + 1) & 0xFF;
            if (x === 0)
                break;
        }
        const rem = lo;
        const off = (rem << 1) & 0xFF;
        this._rx = x;
        const a1 = this.readRomByte(0x8BC9 + off);
        const a2 = this.readRomByte(0x8BCA + off);
        this._ry = 0;
        this.sub8C85(a1);
        this.wr(0x003D, (this.rd(0x003D) - 1) & 0xFF);
        this._ry = 0;
        this.sub8C85(a2);
        this.wr(0x003D, (this.rd(0x003D) - 1) & 0xFF);
        this._ry = 0;
        this.sub8C85(0x77);
        this.wr(0x003D, (this.rd(0x003D) - 1) & 0xFF);
        this._rx = 0;
        this.sub8C55();
    }
    hEB_8BD6() {
        const ptr3e = this.rdPtr(0x003E, 0x003F);
        const v = this.readMemByte(ptr3e + this.rd(0x0040));
        this.sub8D1A(v);
    }
    hEF_8BF0() {
        const ptr3e = this.rdPtr(0x003E, 0x003F);
        const v = this.readMemByte(ptr3e + this.rd(0x0040));
        this._system.subC50C();
        const ptr34 = this.rdPtr(0x0034, 0x0035);
        const y2 = this.readMemByte(ptr34 + 2);
        const y1 = this.readMemByte(ptr34 + 1);
        this._rx = y2;
        this._ra = y1;
        this.sub8C55();
    }
    hF0_8C06() {
        const a = this.rd(0x0441);
        this.wr(0x0049, a);
        let v49 = this.rd(0x0049);
        if (v49 === 0x0B)
            return;
        while (v49 !== this.rd(0x0430 + this.rd(0x0430))) {
            v49 = (v49 + 1) & 0xFF;
            if (v49 === 0x0B)
                break;
        }
        if (v49 !== 0x0B) {
            this.wr(0x0049, v49);
            this.sub8D1A(this._ra);
        }
    }
    hF1_8C47() {
        const a = this.rd(0x05FD);
        this._rx = 0;
        this.sub8C55();
    }
    hF2_8C4A() { return; }
    hF4_8CA5() {
        const ptr3e = this.rdPtr(0x003E, 0x003F);
        const v = this.readMemByte(ptr3e + this.rd(0x0040));
        if (v === 0) {
            this._system.subC50C();
            const ptr34 = this.rdPtr(0x0034, 0x0035);
            const y2 = this.readMemByte(ptr34 + 2);
            const y1 = this.readMemByte(ptr34 + 1);
            this._rx = y2;
            this._ra = y1;
            this.sub8C55();
            return;
        }
        if (v < 7 || v >= 0x18) {
            const x4e = this.rd(0x044E);
            const d = (x4e - 1) & 0xFF;
            if (d === 0)
                return;
            this._ra = (v + 8) & 0xFF;
        }
        this._rx = v;
        this._system.subC527(this._ra);
        this._ra = this.rd(0x0032);
        this._rx = this.rd(0x0033);
        this.sub8C55();
    }
    /** $8C55: 数字→tile 写入 (16位除10循环) */
    sub8C55() {
        let y = this.rd(0x003C);
        y = (y - 1) & 0xFF;
        if (y === 0)
            return;
        this.wr(0x006F, this._ra);
        this.wr(0x0070, this._rx);
        this.wr(0x0071, 0x0A);
        this.wr(0x0074, 0);
        while (true) {
            this._fixedC51E();
            const rem = this.rd(0x0072);
            this.sub8C7A(rem);
            if (this.rd(0x0070) !== 0)
                continue;
            if (this.rd(0x006F) === 0)
                break;
            if (this.rd(0x006F) >= 0x0A)
                continue;
            break;
        }
    }
    /** $8C7A: 余数→tile (CLC; ADC #$33; JSR $8C85) */
    sub8C7A(a) {
        const v = (a + 0x33) & 0xFF;
        this._ry = 0;
        this.sub8C85(v);
        this.wr(0x003D, (this.rd(0x003D) - 1) & 0xFF);
    }
    /** $8C85: NT 写入 (LDX $003D; DEC $003C; BNE→STA $04A8,X; INC $003C) */
    sub8C85(a) {
        const x = this.rd(0x003D);
        let c = (this.rd(0x003C) - 1) & 0xFF;
        if (c !== 0) {
            this.wr(0x04A8 + x, a & 0xFF);
            this.wr(0x003C, (this.rd(0x003C) + 1) & 0xFF);
            return;
        }
        if (a !== 0) {
            const y5c6 = this.rd(0x05C6);
            if (y5c6 !== 0x1B) {
                const y45 = this.rd(0x0045);
                if (y45 !== 0) {
                    this.wr(0x04A8 + x, a & 0xFF);
                }
            }
        }
        this.wr(0x003C, (this.rd(0x003C) + 1) & 0xFF);
    }
    /** $8C9F: NT 写入 + INC $003D (JSR $8C85; INC $003D; RTS) */
    sub8C9F() {
        this.sub8C85(this._ra);
        this.wr(0x003D, (this.rd(0x003D) + 1) & 0xFF);
        this._rz = (this.rd(0x003D) !== 0) ? 1 : 0;
    }
    /** $8CA5: 球员名条件写入 (读 ($003E),Y; BNE→查表; BEQ→$C50C+$8C55) */
    sub8CA5() {
        const ptr3e = this.rdPtr(0x003E, 0x003F);
        const v = this.readMemByte(ptr3e + this.rd(0x0040));
        if (v !== 0) {
            this._system.subC50C();
            const ptr34 = this.rdPtr(0x0034, 0x0035);
            const y2 = this.readMemByte(ptr34 + 2);
            const y1 = this.readMemByte(ptr34 + 1);
            this._rx = y2;
            this._ra = y1;
            this.sub8C55();
            return;
        }
        if (v < 7 || v >= 0x18) {
            const x4e = this.rd(0x044E);
            const d = (x4e - 1) & 0xFF;
            if (d === 0)
                return;
            this._ra = (v + 8) & 0xFF;
        }
        this._rx = v;
        this._system.subC527(this._ra);
        this._ra = this.rd(0x0032);
        this._rx = this.rd(0x0033);
        this.sub8C55();
    }
    /** $8CDC: 球员名查 $8D04 表写入 (JSR $C50C; 读 ($0034),Y; BNE→$8D6C) */
    sub8CDC() {
        this._system.subC50C();
        const ptr34 = this.rdPtr(0x0034, 0x0035);
        const v = this.readMemByte(ptr34);
        if (v !== 0) {
            this.sub8D6C();
            return;
        }
        const x = ((this.rd(0x0047) - 0x0B) & 0xFF) << 2;
        for (let i = 0; i < 4; i++) {
            this.wr(0x05EE + i, this.readRomByte(0x8D40 + x + i));
        }
        this.sub8D6C();
    }
    /** $8D1A: 球员名写入 (JSR $C50C; 读 ($0034),Y; BNE→$8D6C; 查 $8D40 表) */
    sub8D1A(a) {
        this._ra = a;
        this._system.subC50C();
        const ptr34 = this.rdPtr(0x0034, 0x0035);
        const v = this.readMemByte(ptr34);
        if (v !== 0) {
            this.sub8D6C();
            return;
        }
        const x = ((this.rd(0x0047) - 0x0B) & 0xFF) << 2;
        for (let i = 0; i < 4; i++) {
            this.wr(0x05EE + i, this.readRomByte(0x8D40 + x + i));
        }
        this._ra = 0;
        this.sub8D6C();
    }
    /** $8D6C: 字符串写入循环 (JSR $C53C; 读 ($0030),Y; CMP #$E0; BCS→exit; JSR $C524; JSR $8C9F; INY) */
    sub8D6C() {
        this._fixedC53C();
        let y = 0;
        while (true) {
            const ptr30 = this.rdPtr(0x0030, 0x0031);
            const v = this.readMemByte(ptr30 + y);
            if (v >= 0xE0)
                break;
            this._system.subC524(v);
            this.sub8C9F();
            y = (y + 1) & 0xFF;
        }
        // $8D86: TYA; SEC; SBC #$05; BPL→exit; EOR #$FF; CLC; ADC #$01; STA $0047
        let diff = (y - 5) & 0xFF;
        if ((diff & 0x80) !== 0) {
            diff = ((diff ^ 0xFF) + 1) & 0xFF;
            this.wr(0x0047, diff);
            this._ra = 0;
            this._ry = 0;
            this.sub8C9F();
            let cnt = this.rd(0x0047);
            while (cnt !== 0) {
                this._ra = 0;
                this._ry = 0;
                this.sub8C9F();
                cnt = (cnt - 1) & 0xFF;
            }
        }
    }
    /** $C51E: 16位除法 ($006F/$0070 ÷ $0071, 商→$006F/$0070, 余数→$0072) — H5 port */
    _fixedC51E() {
        let lo = this.rd(0x006F);
        let hi = this.rd(0x0070);
        const div = this.rd(0x0071);
        let val = (hi << 8) | lo;
        const q = Math.floor(val / div);
        const r = val % div;
        this.wr(0x006F, q & 0xFF);
        this.wr(0x0070, (q >> 8) & 0xFF);
        this.wr(0x0072, r & 0xFF);
    }
    // ════════════════════════════════════════════════
    // 内存读取辅助
    // ════════════════════════════════════════════════
    readMemByte(addr) {
        if (addr < 0x0800) {
            return this.rd(addr);
        }
        return this.readRomByte(addr);
    }
    /** 读 bank24 ROM 数据字节 (通过 DataStore KV 'bank24_rom') */
    readRomByte(addr) {
        var _a;
        const rom = this._store.get('bank24_rom');
        if (rom) {
            const off = (addr - 0x8000) & 0xFFFF;
            return (_a = rom[off]) !== null && _a !== void 0 ? _a : 0;
        }
        return 0;
    }
}
exports.MatchHudService = MatchHudService;
exports.default = MatchHudService;
