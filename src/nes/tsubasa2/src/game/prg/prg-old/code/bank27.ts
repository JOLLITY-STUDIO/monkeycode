/**
 * Bank 27 Service — 精灵/场景动画数据加载 + 动画帧推进
 *
 * 数据已直接 import `rom-data/prg-bank-27.ts` (Bank #0x1B = 27), 无 MMC3 切换。
 * PRG offset: 0x036010-0x03800F (CPU $8000-$9FFF, 8KB, 数据亦经 $A000 窗口索引)。
 *
 * 逻辑直接翻译自 asm/bank27/_full.s (bank27.s → code_main.s / data_tables.s / data_tail.s),
 * 数据经 `data/bank27-data.ts` (原始 ROM 字节直读) 访问。
 *
 * code 段 (2):
 *   $8104-$81DB (216 B)  入口: 场景/精灵数据加载 (名字区 9 号槽输出)
 *   $81EB-$8291 (164 B)  入口: 动画帧推进 (OAM 影子缓冲构建)
 * 其余 ($8000-$8103 字串 + $A292-$A6FF 各表) 全部为数据, 已提取到 bank27-data.ts。
 *
 * 固定区辅助 (bank30 固定 $C000 区, 经 dispatch 表转跳):
 *   $C50C→$CD7C  A(ID) 查 $CD89 表 → (ram_0034) = $0300+ID*12 名字区
 *   $C515→$CB0F  渲染同步等待 (等 PPU/OAM 空闲, 见 entry_81EE 的忙等)
 *   $C527→$CE08  场景缓冲切换 (保存/装载 $0024/$0025 指针 → 调 $CE2D → 调 $8000 → 恢复)
 *   $C536→$CDC9  A 线性索引 → X/Y 场地坐标 (X=(A/12)*8+$34, Y=(A%12)*8+$54)
 *   $C539→$CDE2  (X,Y) 像素 → A 精灵位置 (行号+12*列号, 越界 $FF)
 */

import { RamStore } from '../../../core/ram';
import {
  readB27,
  readB27U16,
  readB27Decrement,
  readB27AnimScriptPtr,
  readB27AnimBlockPtr,
  readB27ScenePtr,
  readB27SceneDataPtr,
} from '../data/bank27-data';

// ═══════════════════════════════════════════════════════════════
// RAM 语义键 (替代 NES 内存地址)
// ═══════════════════════════════════════════════════════════════

const KEY_062A = 'ram_062A'; // 场景索引 (bit7 被 AND 屏蔽)
const KEY_05FB = 'ram_05FB'; // 状态标志 (表选择 / 坐标常量切换)
const KEY_00E2 = 'ram_00E2'; // 随机/阈值 lo (LSR 取 bit0 作奇偶选择)
const KEY_0032 = 'ram_0032'; // 阈值比较 (与 ram_00E2 比较决定是否二次写入)
const KEY_05F3 = 'ram_05F3'; // 动画脚本索引 (→ $A292 表)
const KEY_05F4 = 'ram_05F4'; // 动画状态标志 (0=停止, $01=运行, $80=重启)
const KEY_05F5 = 'ram_05F5'; // 帧延迟计数器
const KEY_05E3 = 'ram_05E3'; // 场景忙标志 (共享 bank24, 0=空闲 → 停止动画)

// 零页
const KEY_0034 = 'ram_0034'; // 名字区指针 lo ($C50C 结果)
const KEY_0035 = 'ram_0035'; // 名字区指针 hi
const KEY_003A = 'ram_003A'; // 数据指针 lo
const KEY_003B = 'ram_003B'; // 数据指针 hi
const KEY_003C = 'ram_003C'; // 场景子记录偏移 lo (Y*20)
const KEY_003D = 'ram_003D'; // 场景子记录偏移 hi (Y*20>>8)
const KEY_003E = 'ram_003E'; // 记录内字节偏移
const KEY_003F = 'ram_003F'; // 表选择 ($25=$A6AD 场景 / $26=$AB65 场景数据)
const KEY_0063 = 'ram_0063'; // 动画脚本指针 lo
const KEY_0064 = 'ram_0064'; // 动画脚本指针 hi

// 注: $04A5 精灵影子缓冲 / ram_0515 忙标志 由 OamManager 统一管理。

// ═══════════════════════════════════════════════════════════════
// Bank27Service
// ═══════════════════════════════════════════════════════════════

export class Bank27Service {
  constructor(private _store: RamStore) {}

  get store(): RamStore {
    return this._store;
  }

  // ── 数据访问 (原始字节) ──

  /** 读取本 bank 内地址 addr 的原始字节 (addr: $8000-$9FFF / $A000-$BFFF) */
  readByte(addr: number): number {
    return readB27(addr);
  }

  /** 读取本 bank 内 16bit 小端数值 */
  readU16(addr: number): number {
    return readB27U16(addr);
  }

  // ──────────────────────────────────────────────
  // $8104: 入口 — 场景/精灵数据加载
  // ──────────────────────────────────────────────

  /**
   * 对应 $8104-$81DB: 场景/精灵数据加载, 结果写入名字区 (ram_0034)+9。
   *
   * arg (A 寄存器): 参数 0-0x0A (≥$0B 时按减 $0B 处理, 同时启用坐标转换)。
   *
   * 流程:
   *   (ram_0034) = $C50C(arg) 名字区指针; Y = ram_062A&$7F 场景索引
   *   arg ≥ $0B → Y = $A1DC 递减表[Y], X=2 (读取 ram_002C/X 处参数对)
   *   ram_003C/003D = Y*20 (场景子记录 20B)
   *   ram_003E = (arg-1)*2 + (ram_00E2 bit0), 且 ram_00E2 >>= 1
   *   carry = (arg≥$0B) ^ (ram_05FB≠0)
   *     carry 清 → ram_003F=$25, 基址 = $A6AD[ram_002C[X]*2]  (场景指针表)
   *     carry 置 → ram_003F=$26, 基址 = $AB65[ram_002D[X]*2 + ram_002C[X]*6] (场景数据指针表)
   *   字节 = readB27(基址 + Y*20 + ram_003E)
   *   若 arg≥$0B 且 字节≠$F0 → $C536 坐标转换 → 取负 → $C539 精灵位置
   *   名字区[9] = 结果; $C527 场景缓冲切换
   *   ram_0032 ≥ ram_00E2 时: ram_003F≠$25 → 名字区[9]=$F0;
   *     ram_003F=$25 且 (arg 归约后)<5 → 名字区[9] = $C539(ram_05FB?$38:$C8, 名字区[8])
   */
  entry_8104(arg: number): void {
    const s = this._store;
    const a0 = arg & 0xff;

    // $8104: JSR $C50C (→$CD7C): (ram_0034) = $0300 + A*12
    const namePtr = this._queryNamePtr0034(a0);
    this._setPtr(KEY_0034, KEY_0035, namePtr);

    // $8107-$8110: X=0; ram_003D=0; Y = ram_062A & $7F
    let x = 0;
    s.write(KEY_003D, 0);
    let y = s.read(KEY_062A) & 0x7f;

    // $8113-$8121: carry = (arg ≥ $0B); arg ≥ $0B → A-=0x0B, Y=递减表[Y], X+=2
    const carryBig = a0 >= 0x0b;
    let a = a0;
    if (a0 >= 0x0b) {
      a = (a0 - 0x0b) & 0xff;
      y = readB27Decrement(y);
      x += 2;
    }

    // $8122-$812E: ram_003C/003D = Y*20 (16bit, 含 ASL 进位)
    {
      const y4 = (y << 2) & 0xff; // ASL ASL
      const y16 = (y4 << 2) & 0xff; // ASL ASL
      const carryFromAsl = (y * 8) & 0x80 ? 1 : 0; // 第 2 次 ASL 的进位 (bit7 of Y*8)
      const sum = y16 + y4 + carryFromAsl;
      s.write(KEY_003C, sum & 0xff);
      s.write(KEY_003D, sum > 0xff ? 1 : 0); // ROL ram_003D (原值 0)
    }

    // $8130-$8138: A = arg-1; LSR ram_00E2 → ROL → ram_003E
    {
      const e2 = s.read(KEY_00E2);
      s.write(KEY_00E2, e2 >> 1);
      const rol = (((a - 1) << 1) | (e2 & 1)) & 0xff;
      s.write(KEY_003E, rol);
    }

    // $813C-$8147: carry = (arg≥$0B) XOR (ram_05FB≠0)
    const carry = carryBig !== (s.read(KEY_05FB) !== 0);
    // (NES: ram_05FB==0 时保留 carry, ≠0 时 EOR#01 反转)

    let ptrBase: number;
    if (!carry) {
      // $8149-$8159: ram_003F=$25; X=ram_002C[X]*2; 基址 = $A6AD[X]
      s.write(KEY_003F, 0x25);
      const v = this._readRamByte(0x002c + x);
      const idx = (v << 1) & 0xff;
      ptrBase = readB27ScenePtr(idx);
    } else {
      // $815C-$8176: ram_003F=$26; X=ram_002D[X]*2 + ram_002C[X]*6; 基址 = $AB65[X]
      s.write(KEY_003F, 0x26);
      const v = this._readRamByte(0x002c + x);
      const w = this._readRamByte(0x002d + x);
      const idx = ((w << 1) + (v << 2) + (v << 1)) & 0xff; // w*2 + v*6
      ptrBase = readB27SceneDataPtr(idx);
    }

    // $8179-$8185: 目标地址 = 基址 + Y*20 + ram_003E; 读字节
    const off = this._read16(KEY_003C, KEY_003D);
    const addr = (ptrBase + off + s.read(KEY_003E)) & 0xffff;
    let byte = readB27(addr);

    // $8187-$819B: arg≥$0B 且 字节≠$F0 → 坐标转换
    if (carryBig && byte !== 0xf0) {
      const c = this._fixedC536(byte); // X=(byte/12)*8+$34, Y=(byte%12)*8+$54
      const nx = (~c.x + 1) & 0xff; // TXA EOR #$FF TAX INX
      const ny = (~c.y + 1) & 0xff; // TYA EOR #$FF TAY INY
      byte = this._fixedC539(nx, ny);
    }

    // $819E-$81A0: 名字区[9] = A
    this._writeRamByte(namePtr + 9, byte);

    // $81A2-$81A8: JSR $C527 (场景缓冲切换)
    this._fixedC527();

    // $81AA-$81B1: ram_0032 < ram_00E2 → 提前返回
    if (s.read(KEY_0032) < s.read(KEY_00E2)) return;

    // $81B2-$81DB: 二次写入
    if (s.read(KEY_003F) !== 0x25) {
      // $81B8-$81BA: A = $F0
      this._writeRamByte(namePtr + 9, 0xf0);
      return;
    }
    // $81BC-$81C4: 归约 arg, ≥5 → 直接 RTS
    const aReduced = a0 >= 0x0b ? a0 - 0x0b : a0;
    if (aReduced >= 0x05) return;
    // $81C6-$81D4: X = ram_05FB ? $38 : $C8; Y = 名字区[8]; A = $C539
    const px = s.read(KEY_05FB) !== 0 ? 0x38 : 0xc8;
    const py = this._readRamByte(namePtr + 8);
    this._writeRamByte(namePtr + 9, this._fixedC539(px, py));
  }

  // ──────────────────────────────────────────────
  // $81EB: 入口 — 动画帧推进 (OAM 构建)
  // ──────────────────────────────────────────────

  /**
   * 对应 $81EB-$8291: 每帧调用一次, 推进动画脚本并构建 OAM 影子缓冲。
   *
   * 状态:
   *   ram_05F4  0=停止 (直接返回); $80=重启 (重新加载 ram_05F3 脚本); 正数=运行
   *   ram_05F5  帧延迟计数器 (>0 时递减后返回)
   *
   * 脚本流 (ram_0063/0064 指向 $A292 表得到的脚本):
   *   非 $FF 字节 → 帧延迟 (ram_05F5); 下一字节 → $A42A 表索引*2 → 动画块指针;
   *     $A42A 块: [count, tileLo, tileHi, tile×count]... 0 终止, 逐组写入 OAM
   *   $FF → 跳转: 后 2B = 新脚本指针; ram_05E3==0 → 停止 (ram_05F4=0) 并继续
   * 结束: OAM 置完成 ($80), 脚本指针 += 2。
   */
  entry_81EE(): void {
    const s = this._store;
    const oam = s.oam;

    // $81EB-$81F0: flag==0 → 返回
    const flag = s.read(KEY_05F4);
    if (flag === 0) return;

    // $81F1: BPL $820C — bit7 清 (正数) → 跳过初始化; bit7 置 → 初始化
    if (flag & 0x80) {
      // $81F3-$820B: 初始化: flag=$01; (0063:64) = $A292[ram_05F3]; 帧计数=0
      s.write(KEY_05F4, 0x01);
      const scriptPtr = readB27AnimScriptPtr(s.read(KEY_05F3));
      this._setPtr(KEY_0063, KEY_0064, scriptPtr);
      s.write(KEY_05F5, 0);
    }

    // $820C-$8214: 帧延迟递减
    if (s.read(KEY_05F5) !== 0) {
      s.write(KEY_05F5, s.read(KEY_05F5) - 1);
      return;
    }

    // $8215-$8221: $C515 渲染同步等待 → 置忙
    this._fixedC515();
    let guard = 0;
    while (oam.isBusy() && guard++ < 100000) this._fixedC515();
    oam.beginBuild(); // ram_0515 = 1

    // $8224 脚本循环 (跳转/帧处理)
    let scriptPtr = this._getPtr(KEY_0063, KEY_0064);
    let frameGuard = 0;
    for (;;) {
      if (frameGuard++ > 4096) break; // 防呆 (正常数据不会触发)
      const b = readB27(scriptPtr);
      if (b === 0xff) {
        // $822C-$8241: 跳转 — 后 2B 新脚本指针
        scriptPtr = readB27U16(scriptPtr + 1);
        this._setPtr(KEY_0063, KEY_0064, scriptPtr);
        if (s.read(KEY_05E3) !== 0) continue; // BNE $8224 继续
        s.write(KEY_05F4, 0); // STA ram_05F4 (A=0) 停止
        continue; // JMP $8224
      }

      // $8242-$8244: 帧延迟
      s.write(KEY_05F5, b);

      // $8245-$8253: 下一字节 → $A42A 块指针
      const blockPtr = readB27AnimBlockPtr(readB27(scriptPtr + 1));

      // $8254-$827E: 构建 OAM 影子缓冲
      let y = 0;
      let x = 0;
      for (;;) {
        const c = readB27(blockPtr + y);
        if (c === 0) break; // 0 终止
        let count = c;
        oam.writeByte(x, c); // STA ram_04A5,X (组属性)
        y += 1;
        oam.writeByte(x + 1, readB27(blockPtr + y)); // STA ram_04A6,X (tileLo)
        y += 1;
        oam.writeByte(x + 2, readB27(blockPtr + y)); // STA ram_04A7,X (tileHi)
        y += 1;
        x += 3;
        for (let k = 0; k < count; k++) {
          oam.writeByte(x, readB27(blockPtr + y)); // 后续 tile 字节
          x += 1;
          y += 1;
        }
      }
      oam.writeByte(x, 0); // $827E: 终止符

      // $8281-$8285: OAM 完成
      oam.endBuild(); // ram_0515 = $80

      // $8286-$8291: 脚本指针 += 2
      scriptPtr = (scriptPtr + 2) & 0xffff;
      this._setPtr(KEY_0063, KEY_0064, scriptPtr);
      return;
    }
  }

  // ──────────────────────────────────────────────
  // 固定区辅助 (bank30 固定区, 按 asm 语义精确翻译)
  // ──────────────────────────────────────────────

  /**
   * $C50C→$CD7C (bank30): A(ID) 查 $CD89 表 → (ram_0034) = $0300+ID*12 名字区。
   * $CD89 表为 12B/项的地址对; 结果即 (ram_0034:35)。
   */
  private _queryNamePtr0034(id: number): number {
    return 0x0300 + (id & 0xff) * 12;
  }

  /**
   * $C536→$CDC9 (bank30): A 线性索引 → 场地坐标。
   *   X = (A/12)*8 + $34, Y = (A%12)*8 + $54
   */
  private _fixedC536(a: number): { x: number; y: number } {
    let q = 0;
    let r = a & 0xff;
    while (r >= 0x0c) {
      r -= 0x0c;
      q++;
    }
    return {
      x: ((q << 3) + 0x34) & 0xff,
      y: ((r << 3) + 0x54) & 0xff,
    };
  }

  /**
   * $C539→$CDE2 (bank30): (X,Y) 像素 → 精灵位置索引 (行号 + 12*列号)。
   *   X∈[$30,$D0), Y∈[$50,$B0) 有效; 越界返回 $FF。
   *   col = (X-$30)>>3; 结果 = ((Y-$50)>>3) + 12*col。
   *   循环中若 r+12 回绕到 0 → 返回 $FF (asm BNE 不跳 → LDA #$FF)。
   */
  private _fixedC539(x: number, y: number): number {
    if (x < 0x30) return 0xff;
    const ax = (x - 0x30) & 0xff;
    if (ax >= 0xa0) return 0xff;
    let col = ax >> 3;
    if (y < 0x50) return 0xff;
    const ay = (y - 0x50) & 0xff;
    if (ay >= 0x60) return 0xff;
    let r = ay >> 3;
    while (col > 0) {
      r = (r + 12) & 0xff;
      if (r === 0) return 0xff; // BNE 不跳 → LDA #$FF
      col--;
    }
    return r;
  }

  /**
   * $C515→$CB0F (bank30): 渲染同步等待。
   *
   * asm 语义: STA $7F → $CB11 保存寄存器 → 动态分派到 $CAA5 的任务调度,
   * 使当前 OAM/PPU 渲染任务完成、忙标志清空, 随后返回。
   * 在 H5 数据直读模型下, PPU 帧同步由渲染层驱动, OamManager 忙标志
   * (ram_0515) 即代表 OAM 影子缓冲的可用状态, 故本辅助的等待语义由
   * 调用方 (entry_81EE 的 oam.isBusy() 忙等) 完整承接。
   */
  private _fixedC515(): void {
    // 同步已由 RamStore.oam 忙标志 + 渲染层 RAF 承接, 无需空转。
  }

  /**
   * $C527→$CE08 (bank30): 场景缓冲切换。
   *
   * asm 语义: TAY 保存 A → 保存 $0024/$0025 → 置 $0024=$1C, $0025=$1D
   * (PPU 名字区指针上下文) → JSR $CE2D (属性/缓冲装载) → JSR $8000
   * (切换 bank 后的场景渲染) → 恢复 $0024/$0025 → JSR $CE2D。
   * 纯 MMC3/PPU 名字区缓冲操作, 对 ROM 字节数据与 OAM 无副作用;
   * H5 下名字区由 RamStore NT 网格直接持有, 无需物理缓冲切换。
   */
  private _fixedC527(): void {
    // 名字区缓冲已由 RamStore NT 网格持有, 无 MMC3 切换。
  }

  // ──────────────────────────────────────────────
  // 工具
  // ──────────────────────────────────────────────

  private _readRamByte(addr: number): number {
    const key = `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
    return this._store.read(key);
  }

  private _writeRamByte(addr: number, v: number): void {
    const key = `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
    this._store.write(key, v);
  }

  private _read16(loKey: string, hiKey: string): number {
    return (this._store.read(hiKey) << 8) | this._store.read(loKey);
  }

  private _setPtr(loKey: string, hiKey: string, ptr: number): void {
    this._store.write(loKey, ptr & 0xff);
    this._store.write(hiKey, (ptr >> 8) & 0xff);
  }

  private _getPtr(loKey: string, hiKey: string): number {
    return (this._store.read(hiKey) << 8) | this._store.read(loKey);
  }
}
