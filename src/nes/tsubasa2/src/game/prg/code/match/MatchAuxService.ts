/**
 * MatchAuxService — bank20 比赛辅助 (计时状态机/计分板/精灵渲染) ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 20
 *
 * 职责: 4 路 dispatch (计时/计分板/精灵渲染), 15 code 段, 16 内部函数。
 *
 * 入口 (跳转表 $8000-$800D):
 *   $8000 → JMP $800F: 主 dispatch (读 $053A 分派)
 *   $8003 → JMP $84DC: 计时器更新
 *   $8006 → JMP $83D9: 计分板更新
 *   $8009 → JMP $8624: 精灵渲染
 *   $800C → JMP $8796: 其他辅助
 *
 * $800F 主 dispatch:
 *   $800F: LDA $053A (dispatch 索引)
 *   $8012: BEQ $8083 (0=结束)
 *   $8014: BPL $8067 (正数=递减计数)
 *   $8016: LDX #$01; STX $053A (负数=启动新计时)
 *   $801B: LDA $053C (计时器 id)
 *   $801E-$8034: 查 $8968 指针表得计时数据入口 → $004C/$004D
 *   $8036-$8044: 清 $0547-$05C6 (计时缓冲区, 0x15 步长)
 *   $8046: LDA #$01; STA $053B (设激活标志)
 *   $804B-$8064: 初始化 $053D/$0540-$0545 (计时参数)
 *   $8067: DEC $053B; BEQ $806D (递减激活标志)
 *   $806C: RTS (仍激活则返回)
 *   $806D: LDY #$00; LDA ($004C),Y (读计时数据)
 *   $8071: CMP #$F0; BCC $807B (< $F0 = 延迟值)
 *   $8075: JSR $8084 (≥ $F0 = 命令分派)
 *   $8078: JMP $806D (继续)
 *   $807B: STA $053B (存延迟)
 *   $807E: LDA #$01; JSR $83CF (设 dispatch)
 *   $8083: RTS
 *
 * $8084 命令分派 (查 $8088 跳转表):
 *   SEC; SBC #$F0; JSR $C509; 跳转表 9 项:
 *   $80A2/$80AA/$802B/$8138/$8142/$83AE/$83BD/$816F/$817C/$8195/$81A8
 *
 * RAM 关键:
 *   $004C/$004D: 计时数据指针
 *   $053A: dispatch 索引 (0=结束, 正=递减, 负=启动)
 *   $053B: 激活标志/延迟计数
 *   $053C: 计时器 id
 *   $053D/$0540-$0545: 计时参数
 *   $0547-$05C6: 计时缓冲区 (0x15 步长 × 8 组)
 *
 * 命名规范: 旧名 Bank20Service → 新名 MatchAuxService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';

/** 4 位大写十六进制 RAM 键 */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class MatchAuxService {
  protected _store: DataStore;
  protected _system: GameSystemService;

  constructor(store: DataStore, system: GameSystemService) {
    this._store = store;
    this._system = system;
  }

  protected rd(addr: number): number {
    return this._store.read(ramKey(addr));
  }
  protected wr(addr: number, v: number): void {
    this._store.write(ramKey(addr), v);
  }
  protected rdPtr(lo: number, hi: number): number {
    return this.rd(lo) | (this.rd(hi) << 8);
  }
  protected wrPtr(lo: number, hi: number, v: number): void {
    this.wr(lo, v & 0xff);
    this.wr(hi, (v >> 8) & 0xff);
  }

  // ════════════════════════════════════════════════
  // 跳转表入口 (bank20 头 $8000-$800D)
  // ════════════════════════════════════════════════

  /** $8000 → $800F: 主 dispatch (计时状态机) */
  timerDispatch(): void { this.sub800F(); }

  /** $8003 → $84DC: 计时器更新 */
  timerUpdate(): void { this.sub84DC(); }

  /** $8006 → $83D9: 计分板更新 */
  scoreboardUpdate(): void { this.sub83D9(); }

  /** $8009 → $8624: 精灵渲染 */
  spriteRender(): void { this.sub8624(); }

  /** $800C → $8796: 其他辅助 */
  auxMisc(): void { this.sub8796(); }

  // ════════════════════════════════════════════════
  // 每帧推进 (原 dispatch 4 路, 由外部帧循环调用)
  // ════════════════════════════════════════════════
  update(frame: number): void {
    void frame;
    this.sub800F();
  }

  // ════════════════════════════════════════════════
  // $800F 主 dispatch (计时状态机)
  // asm $800F-$8083:
  //   读 $053A dispatch 索引:
  //   - 0: 结束 (RTS)
  //   - 正数: 递减 $053B 激活标志, 0 时读下一计时字节
  //   - 负数: 启动新计时器 (查 $8968 指针表, 清缓冲区, 初始化参数)
  //   读到 < $F0 = 延迟值, ≥ $F0 = 命令分派 ($8084)
  // ════════════════════════════════════════════════
  private sub800F(): void {
    const idx = this.rd(0x053A);
    // $8012: BEQ $8083 (0=结束)
    if (idx === 0) return;
    // $8014: BPL $8067 (正数=递减)
    if ((idx & 0x80) === 0) {
      this.sub8067();
      return;
    }
    // $8016: 负数=启动新计时
    this.wr(0x053A, 0x01);
    // $801B: LDA $053C (计时器 id)
    const timerId = this.rd(0x053C);
    // $801E-$8034: 查 $8968 指针表得计时数据入口 → $004C/$004D
    this.wr(0x004C, 0x68);
    this.wr(0x004D, 0x89);
    let off = timerId << 1;
    if ((timerId & 0x80) !== 0) {
      this.wr(0x004D, (this.rd(0x004D) + 1) & 0xFF);
    }
    const ptr = this.rdPtr(0x004C, 0x004D);
    const lo = this.readMemByte(ptr + (off & 0xFF));
    const hi = this.readMemByte(ptr + (off & 0xFF) + 1);
    this.wrPtr(0x004C, 0x004D, (hi << 8) | lo);
    // $8036-$8044: 清 $0547-$05C6 (计时缓冲区)
    for (let x = 0; x < 0x7E; x += 0x15) {
      this.wr(0x0547 + x, 0);
    }
    // $8046: 设激活标志
    this.wr(0x053B, 0x01);
    // $804B-$8064: 初始化计时参数
    this.wr(0x053D, 0);
    this.wr(0x0540, 0);
    this.wr(0x0541, 0xFF);
    this.wr(0x0543, 0x01);
    this.wr(0x0544, 0x23);
    this.wr(0x0545, 0x45);
    // $8067: DEC $053B
    this.sub8067();
  }

  /** $8067: 递减激活标志, 0 时读下一计时字节 */
  private sub8067(): void {
    const b = (this.rd(0x053B) - 1) & 0xFF;
    this.wr(0x053B, b);
    if (b !== 0) return;
    // $806D: 读下一字节
    const ptr = this.rdPtr(0x004C, 0x004D);
    const y = 0;
    const data = this.readMemByte(ptr + y);
    if (data < 0xF0) {
      // $807B: 延迟值
      this.wr(0x053B, data);
      // $807E: 设 dispatch
      this.sub83CF(0x01);
    } else {
      // $8075: 命令分派
      this.sub8084(data);
      // $8078: 继续读
      this.sub8067();
    }
  }

  // ════════════════════════════════════════════════
  // $8084: 命令分派 (查 $8088 跳转表)
  // asm: SEC; SBC #$F0; JSR $C509; 跳转表
  //   跳转表项: $80A2/$80AA/$802B/$8138/$8142/$83AE/$83BD/$816F/$817C/$8195/$81A8
  // ════════════════════════════════════════════════
  private sub8084(a: number): void {
    const cmd = (a - 0xF0) & 0xFF;
    // 原 6502: SEC; SBC #$F0; JSR $C509 (cmd N → 表项 N)
    const table = [
      0x80A2, 0x80AA, 0x802B, 0x8138, 0x8142,
      0x83AE, 0x83BD, 0x816F, 0x817C, 0x8195, 0x81A8,
    ];
    const target = table[cmd] ?? 0x80A2;
    switch (target) {
      case 0x80A2: this.sub80A2(); break;  // 命令0: 结束计时
      case 0x80AA: this.sub80AA(); break;  // 命令1: 精灵组设置
      case 0x802B: this.sub802B(); break;  // 命令2: 指针跳转
      case 0x8138: this.sub8138(); break;  // 命令3: 计分板数据
      case 0x8142: this.sub8142(); break;  // 命令4: 计分板渲染
      case 0x83AE: this.sub83AE(); break;  // 命令5
      case 0x83BD: this.sub83BD(); break;  // 命令6
      case 0x816F: this.sub816F(); break;  // 命令7: NT 填充
      case 0x817C: this.sub817C(); break;  // 命令8: 指针前进
      case 0x8195: this.sub8195(); break;  // 命令9: 循环
      case 0x81A8: this.sub81A8(); break;  // 命令10: 参数设置
    }
  }

  /** $83CF: 设 dispatch 索引 */
  private sub83CF(a: number): void {
    this.wr(0x053D, a);
    this.wr(0x053A, 0x01);
    // $83D5: RTS (原 JMP $83CF 链)
  }

  // ════════════════════════════════════════════════
  // 计时命令 stub (逐个覆盖)
  // ════════════════════════════════════════════════

  /** $80A2: 命令0 — 结束计时 (清 $053A, 返回) */
  private sub80A2(): void {
    this.wr(0x053A, 0);
  }

  /** $80AA: 命令1 — 精灵组设置 */
  private sub80AA(): void {
    const ptr = this.rdPtr(0x004C, 0x004D);
    const param5 = this.readMemByte(ptr + 5);
    const x = (param5 & 0x1C) >> 1;
    this.wr(0x003A, this.readMemByte(0x88E4 + x));
    this.wr(0x003B, this.readMemByte(0x88E5 + x));
    for (let i = 0; i < 0x15; i++) this.wrInd(0x003A, i, 0);
    const param1 = this.readMemByte(ptr + 1);
    this.wr(0x003E, 0xB4);
    this.wr(0x003F, (param1 & 0x80) ? 0xA2 : 0xA1);
    const y1 = (param1 << 1) & 0xFF;
    const tbl1 = this.rdPtr(0x003E, 0x003F);
    const tileLo = this.readMemByte(tbl1 + y1);
    const tileHi = this.readMemByte(tbl1 + y1 + 1);
    this.wrInd(0x003A, 2, tileHi);
    this.wrInd(0x003A, 1, tileLo);
    const param2 = this.readMemByte(ptr + 2);
    this.wr(0x003E, 0x47);
    this.wr(0x003F, (param2 & 0x80) ? 0xAD : 0xAC);
    const y2 = (param2 << 1) & 0xFF;
    const tbl2 = this.rdPtr(0x003E, 0x003F);
    const coordLo = this.readMemByte(tbl2 + y2);
    const coordHi = this.readMemByte(tbl2 + y2 + 1);
    this.wrInd(0x003A, 4, coordHi);
    this.wrInd(0x003A, 3, coordLo);
    this.wrInd(0x003A, 8, this.readMemByte(ptr + 3));
    this.wrInd(0x003A, 0x0C, this.readMemByte(ptr + 4));
    this.wr(0x003C, param5 & 0x03);
    this.wrInd(0x003A, 0, (param5 & 0x03) | 0x80);
    this.sub83CF(0x06);
  }

  /** $802B: 命令2 — 读新指针 + 重新初始化计时器 */
  private sub802B(): void {
    const y = 2;
    const ptr = this.rdPtr(0x004C, 0x004D);
    const lo = this.readMemByte(ptr + y);
    const hi = this.readMemByte(ptr + y + 1);
    this.wrPtr(0x004C, 0x004D, (hi << 8) | lo);
    for (let x = 0; x < 0x7E; x += 0x15) this.wr(0x0547 + x, 0);
    this.wr(0x053B, 0x01);
    this.wr(0x053D, 0);
    this.wr(0x0540, 0);
    this.wr(0x0541, 0xFF);
    this.wr(0x0543, 0x01);
    this.wr(0x0544, 0x23);
    this.wr(0x0545, 0x45);
    this.sub8067();
  }

  /** $8138: 命令3 — 重置 dispatch=1 */
  private sub8138(): void {
    this.wr(0x053D, 0x00);
    this.sub83CF(0x01);
  }

  /** $8142: 命令4 — 写计分板数据到 $0494-$0497 */
  private sub8142(): void {
    const ptr = this.rdPtr(0x004C, 0x004D);
    for (let y = 1; y < 5; y++) {
      this.wr(0x0493 + y, this.readMemByte(ptr + y));
    }
    this.sub83CF(0x05);
  }

  /** $83AE: 命令5 — 清计时缓冲区项 */
  private sub83AE(): void {
    const ptr = this.rdPtr(0x004C, 0x004D);
    const x = this.readMemByte(ptr + 1);
    this.wr(0x0547 + (x & 0xFF), 0x00);
    this.sub83CF(0x02);
  }

  /** $83BD: 命令6 — 设 $0540/$0541 */
  private sub83BD(): void {
    const ptr = this.rdPtr(0x004C, 0x004D);
    this.wr(0x0540, this.readMemByte(ptr + 1));
    this.wr(0x0541, this.readMemByte(ptr + 2));
    this.sub83CF(0x03);
  }

  /** $816F: 命令7 — 读新指针 (不重新初始化) */
  private sub816F(): void {
    const ptr = this.rdPtr(0x004C, 0x004D);
    const lo = this.readMemByte(ptr + 1);
    const hi = this.readMemByte(ptr + 2);
    this.wrPtr(0x004C, 0x004D, (hi << 8) | lo);
  }

  /** $817C: 命令8 — 设循环计数 + 计算回跳指针 */
  private sub817C(): void {
    const ptr = this.rdPtr(0x004C, 0x004D);
    this.wr(0x0542, this.readMemByte(ptr + 1));
    this.wrPtr(0x004E, 0x004F, (ptr + 2) & 0xFFFF);
    this.sub83CF(0x02);
  }

  /** $8195: 命令9 — 循环 (DEC $0542, 0 则前进, 否则回跳) */
  private sub8195(): void {
    const count = (this.rd(0x0542) - 1) & 0xFF;
    this.wr(0x0542, count);
    if (count === 0) {
      this.sub83CF(0x01);
    } else {
      this.wrPtr(0x004C, 0x004D, this.rdPtr(0x004E, 0x004F));
      this.sub83CF(0x00);
    }
  }

  /** $81A8: 命令10 — 设 $0543-$0545 */
  private sub81A8(): void {
    const ptr = this.rdPtr(0x004C, 0x004D);
    for (let y = 1; y < 4; y++) {
      this.wr(0x0542 + y, this.readMemByte(ptr + y));
    }
    this.sub83CF(0x04);
  }

  // ════════════════════════════════════════════════
  // 跳转表入口目标 — 已翻译
  // ════════════════════════════════════════════════

  /** $84DC: 计时器更新 — 递减精灵组[$11]计数, 更新位置 */
  private sub84DC(): void {
    const cnt = this.rdInd(0x003C, 0x11);
    if (cnt === 0) {
      this.wr(0x0040, 0);
      this.wr(0x003E, this.rdInd(0x003C, 1));
      this.wr(0x003F, this.rdInd(0x003C, 2));
      const ctrl = this.rdInd(0x003C, 0);
      if (ctrl & 0x10) {
        let e = this.rd(0x003E) + 4;
        this.wr(0x003E, e & 0xFF);
        if (e > 0xFF) this.wr(0x003F, (this.rd(0x003F) + 1) & 0xFF);
      }
      this.wrInd(0x003C, 0, ctrl & 0xEF);
      this.sub857A();
      const newOff = (this.rd(0x003E) + this.rd(0x0040)) & 0xFF;
      this.wrInd(0x003C, 1, newOff);
      const carry = (this.rd(0x003E) + this.rd(0x0040)) > 0xFF ? 1 : 0;
      this.wrInd(0x003C, 2, (this.rd(0x003F) + carry) & 0xFF);
    } else if (cnt === 0xFF) {
      return;
    } else {
      this.wrInd(0x003C, 0x11, (cnt - 1) & 0xFF);
    }
    this.sub852A();
  }

  /** $852A: 更新精灵位置 */
  private sub852A(): void {
    this.wr(0x0042, 0);
    this.wr(0x0043, 0);
    const ctrl = this.rdInd(0x003C, 0);
    this.wr(0x0041, ctrl & 0xFC);
    let w42 = 0, w43 = 0;
    let a = ctrl;
    a >>= 1; if (a & 0x80) w42 = (w42 | 1) & 0xFF;
    a >>= 1; if (a & 0x80) w43 = (w43 | 1) & 0xFF;
    this.wr(0x0042, w42);
    this.wr(0x0043, w43);
    this.sub85F2(0, 5);
    this.sub85F2(1, 9);
    let acc = 0;
    const b43 = this.rd(0x0043);
    acc = ((b43 & 1) << 7);
    this.wr(0x0043, b43 >> 1);
    const b42 = this.rd(0x0042);
    acc = (acc >> 1) | ((b42 & 1) << 7);
    this.wr(0x0042, b42 >> 1);
    acc = (acc | this.rd(0x0041)) & 0xFF;
    this.wrInd(0x003C, 0, acc);
    if (acc & 0x10) {
      this.wr(0x003E, this.rdInd(0x003C, 1));
      this.wr(0x003F, this.rdInd(0x003C, 2));
      this.sub860D(5, 1);
      this.sub860D(9, 3);
    }
  }

  /** $85F2: 坐标累加 */
  private sub85F2(xIdx: number, yOff: number): void {
    let carry = 0;
    let a = this.rdInd(0x003C, yOff);
    a = (a + this.rdInd(0x003C, yOff + 1) + carry) & 0xFF;
    carry = a > 0xFF ? 1 : 0;
    this.wrInd(0x003C, yOff + 1, a);
    let hi = this.rdInd(0x003C, yOff + 2);
    if (hi & 0x80) this.wr(0x0042 + xIdx, (this.rd(0x0042 + xIdx) - 1) & 0xFF);
    hi = (hi + this.rdInd(0x003C, yOff + 3) + carry) & 0xFF;
    carry = hi > 0xFF ? 1 : 0;
    this.wrInd(0x003C, yOff + 3, hi);
    this.wr(0x0042 + xIdx, (this.rd(0x0042 + xIdx) + carry) & 0xFF);
  }

  /** $860D: 坐标累加 (从 $003E 指针) */
  private sub860D(xOff: number, yOff: number): void {
    const hi = this.rdInd(0x003E, yOff);
    const lo = this.rdInd(0x003E, yOff - 1);
    let a = (lo + this.rdInd(0x003C, xOff)) & 0xFF;
    const carry = a > 0xFF ? 1 : 0;
    this.wrInd(0x003C, xOff, a);
    a = (hi + this.rdInd(0x003C, xOff + 2) + carry) & 0xFF;
    this.wrInd(0x003C, xOff + 2, a);
  }

  /** $857A: 读数据命令 */
  private sub857A(): void {
    const y = this.rd(0x0040);
    this.wr(0x0040, (y + 1) & 0xFF);
    const data = this.rdInd(0x003E, y);
    if (data < 0xF0) {
      this.wrInd(0x003C, 0x11, data);
      return;
    }
    const cmd = (data - 0xF0) & 0xFF;
    // JSR $C509 (cmd=命令号) 分派, 目标子程待翻译
    void cmd;
  }

  /** $83D9: 计分板更新 */
  private sub83D9(): void {
    const cnt = this.rdInd(0x003C, 0x11);
    if (cnt === 0) {
      const ctrl = this.rdInd(0x003C, 0);
      this.wrInd(0x003C, 0, ctrl & 0x9F);
      this.wrInd(0x003C, 0x13, 0);
      this.wrInd(0x003C, 0x14, 0);
      this.wr(0x003E, this.rdInd(0x003C, 3));
      this.wr(0x003F, this.rdInd(0x003C, 4));
      this.wr(0x0040, 0);
      this.sub8409Loop();
    } else if (cnt === 0xFF) {
      return;
    } else {
      this.wrInd(0x003C, 0x11, (cnt - 1) & 0xFF);
    }
  }

  /** $8409: 计分板数据循环 */
  private sub8409Loop(): void {
    while (true) {
      this.wr(0x0040, (this.rd(0x0040) + 1) & 0xFF);
      const y = this.rd(0x0040);
      const data = this.rdInd(0x003E, y);
      if (data < 0xF0) {
        this.wr(0x0040, (y + 1) & 0xFF);
        const spriteData = this.rdInd(0x003E, y + 1);
        this.wrInd(0x003C, 0x12, spriteData);
        this.wrInd(0x003C, 0x10, data);
        const newLo = (this.rd(0x003E) + y + 1) & 0xFF;
        const carry = (this.rd(0x003E) + y + 1) > 0xFF ? 1 : 0;
        this.wrInd(0x003C, 3, newLo);
        this.wrInd(0x003C, 4, (this.rd(0x003F) + carry) & 0xFF);
        return;
      }
      this.sub8438(data);
    }
  }

  /** $8438: 计分板命令分派 */
  private sub8438(data: number): void {
    const cmd = (data - 0xF0) & 0xFF;
    // JSR $C509 (cmd=命令号) 分派, 目标子程待翻译
    void cmd;
  }

  /** $8624: 精灵渲染 — 遍历精灵组写 OAM */
  private sub8624(): void {
    const mode = this.rd(0x062D) & 0x0F;
    if (mode === 5) return;
    this._system.subC50C();
    this.wr(0x0046, 0);
    while (true) {
      const sp = this.rd(0x0046);
      if (sp === 0 || sp === 0x0B) break;
      const x = this.rd(0x003B);
      let sprX = this.rdInd(0x0034, 6);
      if (sprX < 0x34) sprX = 0x34;
      if (sprX >= 0xCC) sprX = 0xCC;
      const offIdx = this.rd(0x062D) & 0x0F;
      const xOffset = this.readMemByte(0x88DA + offIdx);
      this.wr(0x0203 + x, (sprX + xOffset) & 0xFF);
      let sprY = this.rdInd(0x0034, 8);
      if (sprY < 0x54) sprY = 0x54;
      if (sprY >= 0xAC) sprY = 0xAC;
      const yOffset = this.readMemByte(0x88DF + offIdx);
      this.wr(0x0200 + x, (sprY + yOffset) & 0xFF);
      this.wr(0x0202 + x, 0x03);
      let tile = sp;
      if (tile < 0x0B) {
        tile = (tile + 0x11) & 0xFF;
        if (tile >= 0x20) tile = (tile + 0x0F) & 0xFF;
      }
      this.wr(0x0201 + x, tile);
      this.wr(0x003B, (x + 4) & 0xFF);
      this.wr(0x0048, (this.rd(0x0048) + 1) & 0xFF);
      this.wr(0x0046, (this.rd(0x0046) + 1) & 0xFF);
      if (this.rd(0x0046) === 0x16) break;
    }
  }

  /** $8796: 设 $0635/$0637 (坐标偏移) */
  private sub8796(): void {
    this.wr(0x0635, this.sub87A7(0x10));
    this.wr(0x0637, this.sub87C7(0x10));
  }

  /** $87A7: 坐标计算循环 */
  private sub87A7(len: number): number {
    this.wr(0x003E, len);
    let x = this.rd(0x0639);
    let y = this.rd(0x0635);
    const baseLo = this.rd(0x003C);
    const baseHi = this.rd(0x003D);
    let carry = 0;
    let e = len;
    do {
      const sum1 = x + baseLo + carry;
      x = sum1 & 0xFF;
      carry = sum1 > 0xFF ? 1 : 0;
      const sum2 = y + baseHi + carry;
      y = sum2 & 0xFF;
      carry = sum2 > 0xFF ? 1 : 0;
      e = (e - 1) & 0xFF;
    } while ((e & 0x80) === 0);
    return y;
  }

  /** $87C7: 坐标计算循环 */
  private sub87C7(len: number): number {
    this.wr(0x003E, len);
    let x = this.rd(0x063B);
    let y = this.rd(0x0637);
    const baseLo = this.rd(0x003C);
    const baseHi = this.rd(0x003D);
    let carry = 0;
    let e = len;
    do {
      const sum1 = x + baseLo + carry;
      x = sum1 & 0xFF;
      carry = sum1 > 0xFF ? 1 : 0;
      const sum2 = y + baseHi + carry;
      y = sum2 & 0xFF;
      carry = sum2 > 0xFF ? 1 : 0;
      e = (e - 1) & 0xFF;
    } while ((e & 0x80) === 0);
    return y;
  }

  // ════════════════════════════════════════════════
  // 间接读写辅助
  // ════════════════════════════════════════════════
  protected wrInd(ptrLo: number, offset: number, val: number): void {
    const addr = (this.rdPtr(ptrLo, ptrLo + 1) + offset) & 0xFFFF;
    this.wr(addr, val);
  }
  protected rdInd(ptrLo: number, offset: number): number {
    const addr = (this.rdPtr(ptrLo, ptrLo + 1) + offset) & 0xFFFF;
    return this.rd(addr);
  }

  // ════════════════════════════════════════════════
  // 内存读取辅助
  // ════════════════════════════════════════════════
  private readMemByte(addr: number): number {
    if (addr < 0x0800) {
      return this.rd(addr);
    }
    return 0;
  }
}

export default MatchAuxService;
