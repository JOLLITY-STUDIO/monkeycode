"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteAnimationService = void 0;
const sprite_animation_table_1 = require("../../data/tables/sprite-animation-table");
/** 4 位大写十六进制 RAM 键 */
function ramKey(addr) {
    return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}
class SpriteAnimationService {
    constructor(store) {
        /** 动画定义流指针 (原 $0063/$0064, CPU $A000-$BFFF 地址) */
        this._animPtr = 0;
        this._store = store;
    }
    // ════════════════════════════════════════════════
    // 零页/内存读写辅助
    // ════════════════════════════════════════════════
    rd(addr) {
        return this._store.read(ramKey(addr));
    }
    wr(addr, v) {
        this._store.write(ramKey(addr), v);
    }
    rdPtr(lo, hi) {
        return this.rd(lo) | (this.rd(hi) << 8);
    }
    /** 读 bank27 数据字节 (addr = CPU $A000-$BFFF) */
    _read27(addr) {
        var _a;
        const off = (addr - 0xa000) & 0x1fff;
        return (_a = sprite_animation_table_1.SPRITE_ANIM_DATA_27[off]) !== null && _a !== void 0 ? _a : 0;
    }
    // ════════════════════════════════════════════════
    // 共享子程 (bank30 $CD7C / $CDC9 / $CDE2)
    // ════════════════════════════════════════════════
    /** $CD7C (JSR $C50C) — 球员记录指针: $0034/$0035 = $0300 + idx*0x0C */
    _playerRecordPtr(idx) {
        const p = 0x0300 + ((idx & 0xff) * 0x0c);
        this.wr(0x0034, p & 0xff);
        this.wr(0x0035, (p >> 8) & 0xff);
    }
    /** $CDC9 (JSR $C536) — 坐标→tile 网格: A=12 格坐标, X=0x34+8*商, Y=0x54+8*余 */
    _coordToTile(a) {
        let v = a & 0xff;
        let q = 0;
        while (v >= 0x0c) {
            v -= 0x0c;
            q++;
        }
        return {
            x: ((q << 3) + 0x34) & 0xff,
            y: ((v << 3) + 0x54) & 0xff,
        };
    }
    /** $CDE2 (JSR $C539) — 像素坐标→OAM 槽索引 (越界返回 $FF) */
    _coordToOamSlot(x, y) {
        const cx = (x & 0xff) - 0x30;
        if (cx < 0 || cx >= 0xa0)
            return 0xff;
        const col = cx >> 3;
        const cy = (y & 0xff) - 0x50;
        if (cy < 0 || cy >= 0x60)
            return 0xff;
        const row = cy >> 3;
        return (row + col * 0x0c) & 0xff;
    }
    /** $CE08 (JSR $C527) — 跨 bank 调用 (bank28 比赛域精灵构建)。H5 由 MatchEngineService 接线 */
    _invokeMatchBuild(_bankId) {
        // 翻译版: MMC3 bank 切换省略; bank28 $8000 (JMP $8B22) 属比赛域, 外部注入。
        void _bankId;
    }
    // ════════════════════════════════════════════════
    // $8104 动画数据加载
    // 入口: returnAddrLo = 调用点返回地址低字节 (决定 PTR_A6AD/PTR_AB65 分支),
    //       idx = 球员索引 (→ $C50C 查球员记录指针 $0034/$0035)
    // ════════════════════════════════════════════════
    loadAnim(returnAddrLo, idx) {
        // $8104: JSR $C50C — 球员记录指针
        this._playerRecordPtr(idx);
        // $8107-$8109: LDX #$00; STX $003D
        let x = 0;
        this.wr(0x003D, 0);
        // $810B-$8110: LDA $062A; AND #$7F; TAY (动画类型)
        let y = this.rd(0x062A) & 0x7f;
        // $8111-$8116: CMP #$0B (返回地址低字节); PHP 保存进位
        const ge0B = returnAddrLo >= 0x0b;
        if (ge0B) {
            // $8118-$8120: SBC #$0B; LDA $A1DC,Y; TAY; INX; INX
            y = sprite_animation_table_1.INDEX_A1DC[y & 0xff];
            x = 2;
        }
        // $8123-$812E: $003C = Y*20 (16bit, $003D 为进位)
        const base = (y * 20) & 0xffff;
        this.wr(0x003C, base & 0xff);
        this.wr(0x003D, (base >> 8) & 0xff);
        // $8130-$8138: LSR $00E2 (bit0 进进位); ROL → $003E = ((ret-1)<<1)|E2bit0
        const e2 = this.rd(0x00E2);
        this.wr(0x00E2, (e2 >> 1) & 0xff);
        this.wr(0x003E, ((((returnAddrLo - 1) & 0xff) << 1) | (e2 & 1)) & 0xff);
        // $813A-$8146: 进位取反当 ram_05FB != 0
        let flag = ge0B;
        if (this.rd(0x05FB) !== 0)
            flag = !flag;
        // $8147: BCS $815C — flag 走 PTR_AB65, 否则 PTR_A6AD
        let animPtr;
        if (flag) {
            // $815C-$816F: $003F = 0x26; 索引 = $002C*6 + $002D*2
            this.wr(0x003F, 0x26);
            const c = this.rd(0x002C + x);
            const d = this.rd(0x002D + x);
            const t = ((c * 6 + d * 2)) & 0xff;
            // $8172-$8176: PTR_AB65[t] (u16 LE)
            animPtr = (sprite_animation_table_1.PTR_AB65[t] | (sprite_animation_table_1.PTR_AB65[(t + 1) & 0xff] << 8)) & 0xffff;
        }
        else {
            // $8149-$8156: $003F = 0x25; 索引 = $002C*2; PTR_A6AD
            this.wr(0x003F, 0x25);
            const c = this.rd(0x002C + x);
            const t = (c * 2) & 0xff;
            animPtr = (sprite_animation_table_1.PTR_A6AD[t] | (sprite_animation_table_1.PTR_A6AD[(t + 1) & 0xff] << 8)) & 0xffff;
        }
        // $817A-$8181: animPtr += base (16bit)
        animPtr = (animPtr + base) & 0xffff;
        // $8183-$8185: A = [animPtr + $003E] (动画类型字节)
        const a = this._read27((animPtr + this.rd(0x003E)) & 0xffff);
        // $8188-$818C: 进位(flag) && A != $F0 时做坐标变换
        let oamSlot = a;
        if (flag && a !== 0xf0) {
            // $818E: JSR $C536 坐标→tile
            const tile = this._coordToTile(a);
            // $8191-$819A: 8bit 取补+1
            const tx = ((~tile.x) + 1) & 0xff;
            const ty = ((~tile.y) + 1) & 0xff;
            // $819B: JSR $C539 坐标→OAM 槽
            oamSlot = this._coordToOamSlot(tx, ty);
        }
        // $819E-$81A0: 球员记录[9] = 槽索引
        this._writeRecordByte(9, oamSlot);
        // $81A4-$81A6: LDX $003F; JSR $C527 (跨 bank 调用)
        this._invokeMatchBuild(this.rd(0x003F));
        // $81AA-$81B1: LDX $0032; CPX $00E2; BCS $81B2 else RTS
        if (this.rd(0x0032) < this.rd(0x00E2))
            return;
        // $81B2-$81BA: LDX $003F; CPX #$25; BEQ $81BC else 记录[9]=$F0
        if (this.rd(0x003F) !== 0x25) {
            this._writeRecordByte(9, 0xf0);
            return;
        }
        // $81BC-$81C4: A=ret-0x0B(if>=); CMP #$05; BCS RTS
        let rr = returnAddrLo;
        if (rr >= 0x0b)
            rr -= 0x0b;
        if (rr >= 0x05)
            return;
        // $81C6-$81CD: X = $05FB!=0 ? $38 : $C8
        const cx = this.rd(0x05FB) !== 0 ? 0x38 : 0xc8;
        // $81CF-$81D3: Y = 球员记录[8]; JSR $C539
        const slot = this._coordToOamSlot(cx, this._readRecordByte(8));
        // $81D7-$81D9: 球员记录[9] = 槽
        this._writeRecordByte(9, slot);
    }
    // ════════════════════════════════════════════════
    // $81DC 动画帧推进 (每帧由外部帧循环调用)
    // ════════════════════════════════════════════════
    update(frame) {
        void frame;
        // $81EE-$81F0: LDA $05F4; BNE 继续; RTS
        const f4 = this.rd(0x05F4);
        if (f4 === 0)
            return;
        // $81F1: BPL $820C — bit7 清时跳过初始化
        if ((f4 & 0x80) === 0) {
            // $820C-$8214: LDA $05F5; BEQ → 下一帧处理; 否则递减返回
            const f5 = this.rd(0x05F5);
            if (f5 !== 0) {
                this.wr(0x05F5, (f5 - 1) & 0xff);
                return;
            }
        }
        else {
            // $81F3-$8209: 初始化: $05F4=1; $0063/$0064 = ANIM_PTR_A292[$05F3*2]; $05F5=0
            this.wr(0x05F4, 0x01);
            const t = (this.rd(0x05F3) * 2) & 0xff;
            this._animPtr = (sprite_animation_table_1.ANIM_PTR_A292[t] | (sprite_animation_table_1.ANIM_PTR_A292[(t + 1) & 0xff] << 8)) & 0xffff;
            this.wr(0x05F5, 0);
        }
        // $8215-$821D: JSR $C515 (等一帧); LDA $0515; BNE 重试 — H5: OAM 忙则等下一帧
        if (this._store.oam.isBusy())
            return;
        // $821F-$8221: $0515 = 1 (beginBuild)
        this._store.oam.beginBuild();
        // $8224-$8226: LDY #$00; LDA ($0063),Y
        let y = 0;
        for (;;) {
            const v = this._readAnimByte(y);
            if (v === 0xff) {
                // $822C-$8235: 跳转 — 下 2 字节为新指针
                const lo = this._readAnimByte(y + 1);
                const hi = this._readAnimByte(y + 2);
                this._animPtr = (hi << 8) | lo;
                // $8237-$823F: $05E3 != 0 → 重新循环; 否则 $05F4=0
                if (this.rd(0x05E3) === 0)
                    this.wr(0x05F4, 0);
                y = 0;
                continue;
            }
            // $8242-$8246: $05F5 = 时长; Y+1 = 帧码
            this.wr(0x05F5, v);
            const frameCode = this._readAnimByte(y + 1);
            // $8248-$8252: ANIM_FRAME_PTR_A42A[帧码*2] → 帧数据指针
            const t = (frameCode * 2) & 0xff;
            const framePtr = (sprite_animation_table_1.ANIM_FRAME_PTR_A42A[t] | (sprite_animation_table_1.ANIM_FRAME_PTR_A42A[(t + 1) & 0xff] << 8)) & 0xffff;
            // $8254-$827E: 帧写 $04A5+X (OAM 影子缓冲)
            this._writeFrame(framePtr);
            break;
        }
        // $8281-$8283: $0515 = $80 (endBuild)
        this._store.oam.endBuild();
        // $8286-$828F: $0063 += 2
        this._animPtr = (this._animPtr + 2) & 0xffff;
    }
    // ════════════════════════════════════════════════
    // 内部辅助
    // ════════════════════════════════════════════════
    /** 读动画定义流字节 (相对 $0063 指针) */
    _readAnimByte(off) {
        return this._read27((this._animPtr + (off & 0xff)) & 0xffff);
    }
    /** 读帧数据字节 (相对帧指针) */
    _readFrameByte(framePtr, off) {
        return this._read27((framePtr + (off & 0xff)) & 0xffff);
    }
    /** 写球员记录字节 (记录基址 = $0034/$0035) */
    _writeRecordByte(off, v) {
        const p = this.rdPtr(0x0034, 0x0035);
        this._store.write(ramKey(p + off), v & 0xff);
    }
    /** 读球员记录字节 */
    _readRecordByte(off) {
        const p = this.rdPtr(0x0034, 0x0035);
        return this._store.read(ramKey(p + off));
    }
    /** $8254-$827E — 帧写循环: 流 (首字节=精灵数N, N×3B 精灵, 0 终止) → $04A5+X */
    _writeFrame(framePtr) {
        let y = 0;
        let x = 0;
        for (;;) {
            // $8258: LDA ($003A),Y; BEQ $827E
            const n = this._readFrameByte(framePtr, y);
            if (n === 0)
                break;
            // $825C-$826A: 写 3 字节: 计数/attr + tileLo + tileHi
            this._store.oam.writeByte(x, n);
            this._store.oam.writeByte(x + 1, this._readFrameByte(framePtr, y + 1));
            this._store.oam.writeByte(x + 2, this._readFrameByte(framePtr, y + 2));
            y += 3;
            x += 3;
            // $8271-$827A: 内层循环写 N 字节连续
            let cnt = n;
            while (cnt > 0) {
                this._store.oam.writeByte(x, this._readFrameByte(framePtr, y));
                x++;
                y++;
                cnt--;
            }
        }
        // $827E: STA $04A5,X — 写终止 $00
        this._store.oam.writeByte(x, 0);
    }
}
exports.SpriteAnimationService = SpriteAnimationService;
exports.default = SpriteAnimationService;
