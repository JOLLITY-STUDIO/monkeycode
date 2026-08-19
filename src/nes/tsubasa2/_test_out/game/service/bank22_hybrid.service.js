"use strict";
/**
 * Bank 22 Service — 精灵生成器 (完整翻译)
 *
 * 数据已直接 import `rom-data/prg-bank-22.ts` (Bank #0x16 = 22), 无 MMC3 切换。
 * PRG offset: 0x02C010-0x02E00F, 映射地址 $8000-$9FFF。
 *
 * 来源: _tmp_bzk_out/bank_22.asm (CDL C 标记), 按原执行流 1:1 转写。
 *
 * 功能: 由场景脚本数据 (ram_003C:003D 指向) 生成 NES 标准 OAM 精灵
 * (每精灵 4B: Y / tile / attr / X), 写入 $0200 影子缓冲。
 *
 * code 段 (2):
 *   $8003-$80B5 (入口, 含 $C509 分派循环)
 *   $80C0-$81D1 (精灵写入 + 偏移调整)
 *
 * $C509→$CB99 (bank30 固定区) 语义化: 表跳转 → 直接 switch 分派。
 *   分派表基址 = JSR 返回地址 $80B7, 表项 = $80B8 + A*2:
 *     A=1 → $8161 直接返回    A=2 → $8164 更新指针    A=3 → $8175 计算指针
 *
 * OAM $0200 (NES 硬件 OAM 区) → 本 service 内部 256B 缓冲, 由 emitSprites()
 * 同步为 DataStore.sprites 供渲染器消费。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank22Service = void 0;
const bank22_data_1 = require("../data/bank22-data");
// ═══════════════════════════════════════════════════════════════
// RAM 语义键 (替代 NES 内存地址)
// ═══════════════════════════════════════════════════════════════
// 零页
const KEY_003B = 'ram_003B'; // $0200 OAM 缓冲写游标 (4B/精灵)
const KEY_003C = 'ram_003C'; // 场景脚本数据指针 lo
const KEY_003D = 'ram_003D'; // 场景脚本数据指针 hi
const KEY_003E = 'ram_003E'; // X 坐标 (16bit lo, 随脚本流调整)
const KEY_003F = 'ram_003F'; // X 坐标 (16bit hi)
const KEY_0040 = 'ram_0040'; // Y 坐标 (16bit lo)
const KEY_0041 = 'ram_0041'; // Y 坐标 (16bit hi)
const KEY_0042 = 'ram_0042'; // 精灵数据指针 lo (初始 $80, 经 $8164/$8175 更新)
const KEY_0043 = 'ram_0043'; // 精灵数据指针 hi (初始 $82 → $8280)
const KEY_0044 = 'ram_0044'; // 当前数据偏移 (精灵数据流游标)
const KEY_0045 = 'ram_0045'; // sprite 计数 (每 sprite 3bit, 由 byte>>3 提取)
const KEY_0046 = 'ram_0046'; // 计算后 X 坐标 lo (待写入 OAM)
const KEY_0047 = 'ram_0047'; // 计算后 Y 坐标 lo (待写入 OAM)
const KEY_0048 = 'ram_0048'; // 已生成精灵计数
const KEY_0049 = 'ram_0049'; // 方向/翻转标志 (bit7=垂直镜像, bit6=水平镜像)
const KEY_0517 = 'ram_0517'; // 滚动方向标志 (BIT: bit6/bit7 影响镜像与符号)
const KEY_0538 = 'ram_0538'; // 场景偏移 (取补后加到 X 坐标)
const KEY_0540 = 'ram_0540'; // X 边界下限 (屏幕裁剪)
const KEY_0541 = 'ram_0541'; // X 边界上限 (屏幕裁剪)
const KEY_0546 = 'ram_0546'; // $8175 指针计算表索引 (mod $0C)
// ═══════════════════════════════════════════════════════════════
// Bank22Service
// ═══════════════════════════════════════════════════════════════
class Bank22Service {
    constructor(_store) {
        this._store = _store;
        /** $0200 OAM 影子缓冲 (256B, NES 硬件 OAM: 每精灵 4B = Y,tile,attr,X) */
        this._oam0200 = new Uint8Array(256);
    }
    // ── 数据访问 (原始字节, 经 bank22-data 层) ──
    /** 读取本 bank 内地址 addr 的原始字节 (addr: $8000-$9FFF) */
    readByte(addr) {
        return (0, bank22_data_1.readB22)(addr);
    }
    /** 读取本 bank 内 16bit 小端数值 */
    readU16(addr) {
        return (0, bank22_data_1.readB22U16)(addr);
    }
    get store() {
        return this._store;
    }
    // ──────────────────────────────────────────────
    // $8005: 入口 — 场景脚本 → OAM 精灵生成
    // ──────────────────────────────────────────────
    /**
     * $8005 — 主入口。由调用方设置:
     *   (003C:003D) = 场景脚本数据指针
     *   ram_0517 = 滚动方向标志   ram_0538 = 场景偏移
     *   ram_0540/0541 = X 边界     ram_0546 = 指针表索引
     *   ram_003B = OAM 写游标      ram_0048 = 精灵计数
     * 生成精灵写入 $0200 缓冲。
     */
    entry_8005() {
        const s = this._store;
        let y = 0;
        let a = 0;
        let x = 0;
        // $8003: LDY #$00; $8005: STY ram_003F; $8007: STY ram_0041
        s.write(KEY_003F, 0);
        s.write(KEY_0041, 0);
        // $8009: LDA (ram_003C),Y → $800B LSR; $800C ROL ram_003F; $800E LSR; $800F ROL ram_0041
        // 语义: 003F.bit0 = byte0.bit0, 0041.bit0 = byte0.bit1 (符号扩展辅助)
        const b0 = this._indirectRead(0);
        s.write(KEY_003F, b0 & 1);
        s.write(KEY_0041, (b0 >> 1) & 1);
        // $8011-$8019: A = ((byte0 & $60) << 1) ^ ram_0517 → ram_0049 (方向/翻转标志)
        a = (((b0 & 0x60) << 1) & 0xff) ^ s.read(KEY_0517);
        s.write(KEY_0049, a);
        // $801B-$8027: X:Y = (byte[8] - $80) : (003F - 借位)  (16 位有符号减法)
        const b8 = this._indirectRead(8);
        const borrow = b8 < 0x80 ? 1 : 0;
        x = (b8 - 0x80) & 0xff;
        y = (s.read(KEY_003F) - borrow) & 0xff;
        // $8028-$8038: ram_003F = 0; A = ~ram_0538 + 1; 若 A 负则 DEC 003F; ram_003E = A
        s.write(KEY_003F, 0);
        let neg0538 = (~s.read(KEY_0538)) & 0xff;
        a = (neg0538 + 1) & 0xff;
        if (a & 0x80)
            s.write(KEY_003F, (s.read(KEY_003F) - 1) & 0xff);
        s.write(KEY_003E, a);
        // $803A-$8042: X:Y += 003F:003E (16 位加法)
        let sum = x + s.read(KEY_003E);
        x = sum & 0xff;
        const carry = sum > 0xff ? 1 : 0;
        y = (y + s.read(KEY_003F) + carry) & 0xff;
        // $8043-$8054: BIT ram_0517; BVC $8055 → 若 0517.bit6=1 则 X:Y 取补 + 1
        if (s.read(KEY_0517) & 0x40) {
            x = (~x) & 0xff;
            y = (~y) & 0xff;
            x = (x + 1) & 0xff;
            if (x === 0)
                y = (y + 1) & 0xff;
            y = (y + 1) & 0xff;
        }
        // $8055-$8061: BIT ram_0049; BVC $8062 → 若 0049.bit6=1 则 X:Y -= 8
        if (s.read(KEY_0049) & 0x40) {
            const under = x < 8 ? 1 : 0;
            x = (x - 8) & 0xff;
            y = (y - under) & 0xff;
        }
        // $8062-$8064: ram_003E = X; ram_003F = Y (X 坐标 16 位)
        s.write(KEY_003E, x);
        s.write(KEY_003F, y);
        // $8066-$807A: Y 坐标基准
        //   A = (003C)[$0C]; 0049.bit7=1 → A -= $88, 否则 A -= $80 (BPL 跳入 BIT 中段)
        //   carry 参与后续 0041 SBC #$00
        let b12 = this._indirectRead(0x0c);
        let sub = 0x80;
        if (s.read(KEY_0049) & 0x80) {
            sub = 0x88;
            // $8071: BIT $80E9 — 读 ROM 字节仅设置 flags (N=$80E9.bit7=0), 无分支依赖
            this._peek(0x80e9);
        }
        const borrow12 = b12 < sub ? 1 : 0;
        s.write(KEY_0040, (b12 - sub) & 0xff);
        // $8076-$807A: LDA 0041; SBC #$00 → 0041 -= 借位
        s.write(KEY_0041, (s.read(KEY_0041) - borrow12) & 0xff);
        // $807C-$8096: 0042:0043 = $8280 + (byte[$12] << 1) 处 16 位指针
        //   (指向精灵数据流; byte[$12].bit7 进位 → 高位 +1)
        s.write(KEY_0042, 0x80);
        s.write(KEY_0043, 0x82);
        let b12v = this._indirectRead(0x12);
        const hiCarry = (b12v & 0x80) ? 1 : 0;
        if (hiCarry)
            s.write(KEY_0043, (s.read(KEY_0043) + 1) & 0xff);
        y = (b12v << 1) & 0xff;
        const plo = this._ptrRead(y);
        const phi = this._ptrRead(y + 1);
        s.write(KEY_0043, phi);
        s.write(KEY_0042, plo);
        // $8098: JSR $8187 — 按 003C[13]/003C[14] 调整 X/Y 坐标
        this.fn_8187();
        // $809B-$80B0: 主循环 — 遍历精灵数据流
        //   (0042)[0044] & $07 == 0 → entry_80C0 (写入精灵)
        //   (0042)[0044] & $07 != 0 → fn_80B3 (控制分派)
        //   终止: fn_80B3 分派 A=1 → $8161 PLA;PLA;RTS 弹出两层返回地址直接退出
        s.write(KEY_0044, 0);
        // eslint-disable-next-line no-constant-condition
        for (;;) {
            const code = this._ptrRead(s.read(KEY_0044));
            if ((code & 0x07) === 0) {
                this.entry_80C0();
            }
            else {
                if (this.fn_80B3(code & 0x07))
                    break;
            }
        }
    }
    // ──────────────────────────────────────────────
    // $80B3: 内部 — 控制码分派 (INC 0044 + $C509 表跳转)
    // ──────────────────────────────────────────────
    /**
     * $80B3 — sprite 描述字节 & $07 ≠ 0 时的控制分派。
     *   INC ram_0044 后 JSR $C509 (→$CB99 表跳转):
     *     A=1 → $8161 (PLA;PLA;RTS 直接退出生成器, 返回 true)
     *     A=2 → $8164 (更新 0042:0043)
     *     A=3 → $8175 (计算指针后更新)
     * @returns true=生成结束 (对应 $8161 双 PLA 退出)
     */
    fn_80B3(a) {
        const s = this._store;
        s.write(KEY_0044, (s.read(KEY_0044) + 1) & 0xff);
        const dst = (0, bank22_data_1.readB22Dispatch)(a & 0xff);
        switch (dst) {
            case 0x8161: // PLA; PLA; RTS — 弹出 JSR $80B3 + JSR 入口 两层返回地址
                return true;
            case 0x8164:
                this.fn_8164();
                return false;
            case 0x8175:
                this.fn_8175();
                return false;
            default:
                // A=0 → $0000 (原始设计不触发); A≥4 → 越界 (数据损坏)
                return false;
        }
    }
    // ──────────────────────────────────────────────
    // $80C0: 内部 — 精灵写入 (单 sprite, 循环逐 tile)
    // ──────────────────────────────────────────────
    /**
     * $80C0 — 写入一个精灵组 (计数 = byte>>3 & $07)。
     *   出界 sprite 跳过; 界内写入 $0200 OAM 缓冲。
     */
    entry_80C0() {
        const s = this._store;
        let y = s.read(KEY_0044);
        let a = 0;
        let x = 0;
        // $80C2-$80C9: 计数 = ((0042)[0044] & $38) >> 3
        let cnt = (this._ptrRead(y) & 0x38) >> 3;
        s.write(KEY_0045, cnt);
        // $80CB-$80D2: X 偏移 = $81D2[byte]; X=0
        y = (y + 1) & 0xff;
        a = (0, bank22_data_1.readB22OffX)(this._ptrRead(y));
        x = 0;
        // $80D4-$80E8: A = ±偏移 (0049.bit7=1 取负), 加 0040:0041 → 0046:X 高位
        if (s.read(KEY_0049) & 0x80)
            a = ((~a) + 1) & 0xff;
        if (a & 0x80)
            x = 0xff;
        let sum = a + s.read(KEY_0040);
        s.write(KEY_0046, sum & 0xff);
        const carry = sum > 0xff ? 1 : 0;
        const hi = (x + s.read(KEY_0041) + carry) & 0xff;
        // $80EA-$80FA: X 边界检查 — 界内条件: hi==0 且 0540 <= X <= 0541
        const xv = sum & 0xff;
        const inside = hi === 0 && xv >= s.read(KEY_0540) && xv <= s.read(KEY_0541);
        if (!inside) {
            // $80FD-$8106: 出界 — 跳过 sprite 数据 (Y += 1 + 2*(cnt+1), 0045 → -1)
            y = (y + 1 + 2 * (cnt + 1)) & 0xff;
            s.write(KEY_0045, 0xff);
            s.write(KEY_0044, y);
            return;
        }
        // $8109: 界内 — 逐 tile 写入 OAM
        y = (y + 1) & 0xff;
        // eslint-disable-next-line no-constant-condition
        for (;;) {
            // $810A-$810F: Y 偏移 = $81FA[(byte >> 2) & $3F]; X=0
            let b = this._ptrRead(y);
            a = (0, bank22_data_1.readB22OffY)((b >> 2) & 0x3f);
            x = 0;
            // $8114-$8128: A = ±偏移 (0049.bit6=1 取负), 加 003E:003F → 0047:高位
            if (s.read(KEY_0049) & 0x40)
                a = ((~a) + 1) & 0xff;
            if (a & 0x80)
                x = 0xff;
            let sum2 = a + s.read(KEY_003E);
            s.write(KEY_0047, sum2 & 0xff);
            const carry2 = sum2 > 0xff ? 1 : 0;
            const hi2 = (x + s.read(KEY_003F) + carry2) & 0xff;
            if (hi2 !== 0) {
                // $812C-$8134: 垂直出界 → 写隐藏精灵 (Y=$F8) 并跳过 tile 对
                let xw = s.read(KEY_003B);
                this._oam0200[xw] = 0xf8;
                y = (y + 1) & 0xff;
                // $8134: BNE $8159 — Y 溢出(0)时继续写, 正常数据不会触发
                if (y !== 0) {
                    y = (y + 1) & 0xff; // $8159
                    cnt = (s.read(KEY_0045) - 1) & 0xff;
                    s.write(KEY_0045, cnt);
                    if ((cnt & 0x80) === 0)
                        continue; // $815C BPL $810A
                    s.write(KEY_0044, y);
                    return;
                }
                // Y==0 (罕见): 继续 $8136 走正常写入
            }
            // $8136-$8157: 写 OAM 槽 (Y,tile,attr,X)
            let xw = s.read(KEY_003B);
            this._oam0200[xw] = s.read(KEY_0046); // Y 坐标
            this._oam0200[xw + 3] = s.read(KEY_0047); // X 坐标
            let b2 = this._ptrRead(y);
            this._oam0200[xw + 2] = ((b2 & 0x03) | s.read(KEY_0049)) & 0xff; // attr
            y = (y + 1) & 0xff;
            this._oam0200[xw + 1] = this._ptrRead(y); // tile
            xw = (xw + 4) & 0xff;
            s.write(KEY_003B, xw);
            s.write(KEY_0048, (s.read(KEY_0048) + 1) & 0xff);
            // $8159-$815C: Y++; DEC 0045; BPL $810A — 循环直到计数耗尽
            y = (y + 1) & 0xff;
            cnt = (s.read(KEY_0045) - 1) & 0xff;
            s.write(KEY_0045, cnt);
            if ((cnt & 0x80) === 0)
                continue;
            break;
        }
        // $815E-$8160: STY ram_0044; RTS
        s.write(KEY_0044, y);
    }
    // ──────────────────────────────────────────────
    // $8187: 内部 — 按脚本偏移 0x13/0x14 调整 X/Y 坐标
    // ──────────────────────────────────────────────
    /**
     * $8187 — 16 位符号加法调整:
     *   偏移 $13 → 调整 003E:003F (X);  偏移 $14 → 调整 0040:0041 (Y)。
     *   符号位取决于 (003C)[0] ^ ram_0517 的 bit6。
     */
    fn_8187() {
        const s = this._store;
        const b0 = this._indirectRead(0);
        // $818B-$818E: flag = (b0 ^ 0517) & $40; PHP (Z: 是否为 0)
        const flagZ = ((b0 ^ s.read(KEY_0517)) & 0x40) === 0;
        // ── 偏移 $13 → X 坐标 (003E:003F) ──
        let v13 = this._indirectRead(0x13);
        if (v13 !== 0) {
            if (!flagZ)
                v13 = ((~v13) + 1) & 0xff; // $819B BEQ $81A2 不成立 → 取补
            // $81A2-$81AF: X 高位符号 = v13.bit7; 16 位加法
            const sx = v13 & 0x80 ? 0xff : 0;
            let sum = v13 + s.read(KEY_003E);
            s.write(KEY_003E, sum & 0xff);
            const carry = sum > 0xff ? 1 : 0;
            s.write(KEY_003F, (sx + s.read(KEY_003F) + carry) & 0xff);
        }
        // ── 偏移 $14 → Y 坐标 (0040:0041) ──
        // $81BA BPL $81C1 — N flag 恒 0 (AND #$40 后 bit7=0), $81BC 取补为死代码
        const v14 = this._indirectRead(0x14);
        if (v14 !== 0) {
            // $81C1-$81CE: Y 高位符号 = v14.bit7; 16 位加法
            const sy = v14 & 0x80 ? 0xff : 0;
            let sum2 = v14 + s.read(KEY_0040);
            s.write(KEY_0040, sum2 & 0xff);
            const carry2 = sum2 > 0xff ? 1 : 0;
            s.write(KEY_0041, (sy + s.read(KEY_0041) + carry2) & 0xff);
        }
    }
    // ──────────────────────────────────────────────
    // $8164 / $8175: 精灵数据指针更新
    // ──────────────────────────────────────────────
    /** $8164 — 0042:0043 = (0042)[0044] 处 16 位指针; 0044 = 0 */
    fn_8164() {
        const s = this._store;
        const off = s.read(KEY_0044);
        const plo = this._ptrRead(off);
        const phi = this._ptrRead(off + 1);
        s.write(KEY_0043, phi);
        s.write(KEY_0042, plo);
        s.write(KEY_0044, 0);
    }
    /** $8175 — 0044 = (0546 mod $0C)*2 + 0044; 尾调 $8164 */
    fn_8175() {
        const s = this._store;
        let a = s.read(KEY_0546);
        if (a >= 0x0c)
            a = (a - 0x0c) & 0xff; // $817A BCC; $817C SBC #$0C
        a = (a << 1) & 0xff; // $817E ASL
        s.write(KEY_0044, (a + s.read(KEY_0044)) & 0xff);
        this.fn_8164(); // $8184 JMP $8164
    }
    // ── 辅助 ──
    /** (ram_003C:003D) 间接读 — 场景脚本数据 */
    _indirectRead(off) {
        const ptr = (this._store.read(KEY_003D) << 8) | this._store.read(KEY_003C);
        return (0, bank22_data_1.readB22)(ptr + off);
    }
    /** (ram_0042:0043) 间接读 — 精灵数据流 (bank 22 ROM 内) */
    _ptrRead(off) {
        const ptr = (this._store.read(KEY_0043) << 8) | this._store.read(KEY_0042);
        return (0, bank22_data_1.readB22)(ptr + off);
    }
    /** 读 ROM 字节 (仅为设置 flags 的 BIT 目标, 无副作用) */
    _peek(addr) {
        return (0, bank22_data_1.readB22)(addr);
    }
    // ── OAM 输出接口 ──
    /** 获取 $0200 OAM 缓冲 (256B, 每精灵 4B: Y,tile,attr,X) */
    getOamBuffer() {
        return this._oam0200;
    }
    /** 清空 $0200 缓冲 (对应 NES 主 DMA 前的 OAM 初始化) */
    clearOam() {
        this._oam0200.fill(0xf8); // Y=$F8 全部屏幕外
    }
    /**
     * 把 $0200 缓冲解析为 SpriteEntry[] 写入 DataStore.sprites (渲染出口)。
     * $0200 属性字节: bit0-1=palette, bit5=flipH, bit6=flipV, bit7=priority。
     */
    emitSprites() {
        const out = [];
        for (let i = 0; i < 64; i++) {
            const y = this._oam0200[i * 4];
            const x = this._oam0200[i * 4 + 3];
            const attr = this._oam0200[i * 4 + 2];
            out.push({
                active: y !== 0xf8,
                x,
                y,
                tile: this._oam0200[i * 4 + 1],
                palette: attr & 0x03,
                priority: (attr & 0x80) !== 0,
                flipH: (attr & 0x20) !== 0,
                flipV: (attr & 0x40) !== 0,
                bank: 0,
            });
        }
        this._store.sprites = out;
    }
}
exports.Bank22Service = Bank22Service;
