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
    const idx = this._system.subC509(cmd);
    const table = [
      0x80A2, 0x80AA, 0x802B, 0x8138, 0x8142,
      0x83AE, 0x83BD, 0x816F, 0x817C, 0x8195, 0x81A8,
    ];
    const target = table[idx & 0xFF] ?? 0x80A2;
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

  /** $80AA: 命令1 — 精灵组设置 (查 $88E4 表, 清 0x15 字节, 设精灵) */
  private sub80AA(): void { /* TODO: 翻译 $80AA 精灵组设置 */ }

  /** $802B: 命令2 — 指针跳转 */
  private sub802B(): void { /* TODO: 翻译 $802B */ }

  /** $8138: 命令3 — 计分板数据 */
  private sub8138(): void { /* TODO: 翻译 $8138 */ }

  /** $8142: 命令4 — 计分板渲染 */
  private sub8142(): void { /* TODO: 翻译 $8142 */ }

  /** $83AE: 命令5 */
  private sub83AE(): void { /* TODO: 翻译 $83AE */ }

  /** $83BD: 命令6 */
  private sub83BD(): void { /* TODO: 翻译 $83BD */ }

  /** $816F: 命令7 — NT 填充 (JSR $C530) */
  private sub816F(): void { /* TODO: 翻译 $816F */ }

  /** $817C: 命令8 — 指针前进 */
  private sub817C(): void { /* TODO: 翻译 $817C */ }

  /** $8195: 命令9 — 循环 (DEC $0542, 0 则前进, 否则回跳) */
  private sub8195(): void { /* TODO: 翻译 $8195 */ }

  /** $81A8: 命令10 — 参数设置 */
  private sub81A8(): void { /* TODO: 翻译 $81A8 */ }

  // ════════════════════════════════════════════════
  // 跳转表入口目标 stub
  // ════════════════════════════════════════════════

  /** $84DC: 计时器更新 */
  private sub84DC(): void { /* TODO: 翻译 $84DC 计时器更新 */ }

  /** $83D9: 计分板更新 */
  private sub83D9(): void { /* TODO: 翻译 $83D9 计分板更新 */ }

  /** $8624: 精灵渲染 */
  private sub8624(): void { /* TODO: 翻译 $8624 精灵渲染 */ }

  /** $8796: 其他辅助 */
  private sub8796(): void { /* TODO: 翻译 $8796 */ }

  // ════════════════════════════════════════════════
  // 内存读取辅助 (RAM 直接读, ROM 由 bank20 数据提供)
  // ════════════════════════════════════════════════
  private readMemByte(addr: number): number {
    if (addr < 0x0800) {
      return this.rd(addr);
    }
    // ROM 区: bank20 数据 (stub, 待 import bank20 数据表)
    return 0;
  }
}

export default MatchAuxService;
