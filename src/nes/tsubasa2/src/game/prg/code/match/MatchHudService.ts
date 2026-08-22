/**
 * MatchHudService — bank24 比赛 HUD 文本流渲染 + 精灵加载 ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 24
 *
 * 职责: 比赛 HUD (比分/时钟/体力条) 文本流渲染。
 *
 * 入口 (跳转表 $8000-$800D):
 *   $8000 → JMP $800F: 主 HUD 渲染循环
 *   $8003 → JMP $86F8: HUD 初始化
 *   $8006 → JMP $8779: 比分显示
 *   $8009 → JMP $87E6: 时钟显示
 *   $800C → JMP $8851: 体力条显示
 *
 * $800F 主渲染循环:
 *   $8010: BIT $063F; BPL $8017 (检查渲染开启)
 *   $8014: JMP $C512 (关闭则返回)
 *   $8017: LDA #$20; STA $005F; LDA #$92; STA $0060 (指针=$9220 HUD 脚本表)
 *   $801F: LDA $05EA; ASL; BCC $8027; INC $0060 (×2 查表, 进位加高字节)
 *   $8027: TAY; LDA ($005F),Y; TAX; INY; LDA ($005F),Y; STA $0060; STX $005F
 *     (查指针表得 HUD 脚本入口 → $005F/$0060)
 *   $8032: 清 $05E9/$05E5/$05E4/$05F4 (渲染状态)
 *   $8040: LDA #$01; STA $05E3 (设激活)
 *   $8045: LDA #$01; JSR $C515 (协程让出 1 帧)
 *   $804A: JSR $8053 (渲染分派)
 *   $804D: JSR $C560 (帧结束)
 *   $8050: JMP $8045 (循环)
 *
 * $8053 渲染分派:
 *   $8053: LDA $05E3; BNE $8059 (激活?)
 *   $8058: RTS (未激活返回)
 *   $8059: LDA $05E9; BEQ $8062 (延迟计数)
 *   $805E: DEC $05E9; RTS (递减延迟)
 *   $8062: LDA $05E4; JSR $C509 (查命令索引)
 *   $8068: 跳转表 4 项: $806E/$82F2/$82AC/$E505
 *   $8071: INC $05E5; LDA ($005F),Y (读脚本字节)
 *   $8076: CMP #$F0; BCC $8080 (< $F0 = 延迟值)
 *   $807A: JSR $8087 (≥ $F0 = 命令分派)
 *   $807D: JMP $806E (继续)
 *   $8080: STA $05E9 (存延迟); INC $05E4; RTS
 *
 * $8087 命令分派 (查 $808B 跳转表):
 *   AND #$0F; JSR $C509; 跳转表 6 项:
 *   $8098/$80A0/$80B5/$80B8/$80CB/$81FD
 *
 * RAM 关键:
 *   $005F/$0060: HUD 脚本指针
 *   $05E3: 激活标志
 *   $05E4: 命令索引
 *   $05E5: 字节计数
 *   $05E9: 延迟计数
 *   $05EA: HUD 索引 (查 $9220 表)
 *   $063F: 渲染开启标志 (bit7)
 *
 * 命名规范: 旧名 Bank24HudService → 新名 MatchHudService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';

/** 4 位大写十六进制 RAM 键 */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class MatchHudService {
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
  // 跳转表入口 (bank24 头 $8000-$800D)
  // ════════════════════════════════════════════════

  /** $8000 → $800F: 主 HUD 渲染循环 */
  hudRenderLoop(): void { this.sub800F(); }

  /** $8003 → $86F8: HUD 初始化 */
  hudInit(): void { this.sub86F8(); }

  /** $8006 → $8779: 比分显示 */
  scoreDisplay(): void { this.sub8779(); }

  /** $8009 → $87E6: 时钟显示 */
  clockDisplay(): void { this.sub87E6(); }

  /** $800C → $8851: 体力条显示 */
  staminaBarDisplay(): void { this.sub8851(); }

  // ════════════════════════════════════════════════
  // 每帧推进 (由外部帧循环调用)
  // ════════════════════════════════════════════════
  render(frame: number): void {
    void frame;
    this.sub800F();
  }

  // ════════════════════════════════════════════════
  // $800F 主 HUD 渲染循环
  // asm $800F-$8050:
  //   检查渲染开启 → 查 $9220 HUD 脚本表得入口 → 清状态 →
  //   协程让出 → 渲染分派 → 帧结束 → 循环
  // ════════════════════════════════════════════════
  private sub800F(): void {
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
  private sub8053(): void {
    // $8053: 激活检查
    if (this.rd(0x05E3) === 0) return;
    // $8059: 延迟计数
    if (this.rd(0x05E9) !== 0) {
      this.wr(0x05E9, (this.rd(0x05E9) - 1) & 0xFF);
      return;
    }
    // $8062: 查命令索引
    const cmdIdx = this.rd(0x05E4);
    const dispatched = this._system.subC509(cmdIdx);
    // 跳转表 4 项: $806E/$82F2/$82AC/$E505
    void dispatched;
    // $8071: INC $05E5; 读脚本字节
    this.wr(0x05E5, (this.rd(0x05E5) + 1) & 0xFF);
    const ptr = this.rdPtr(0x005F, 0x0060);
    const y = this.rd(0x05E5);
    const data = this.readMemByte(ptr + y);
    if (data < 0xF0) {
      // $8080: 延迟值
      this.wr(0x05E9, data);
      this.wr(0x05E4, (this.rd(0x05E4) + 1) & 0xFF);
    } else {
      // $807A: 命令分派
      this.sub8087(data);
    }
  }

  // ════════════════════════════════════════════════
  // $8087 命令分派 (查 $808B 跳转表)
  // asm: AND #$0F; JSR $C509; 跳转表 6 项
  //   $8098/$80A0/$80B5/$80B8/$80CB/$81FD
  // ════════════════════════════════════════════════
  private sub8087(a: number): void {
    const cmd = a & 0x0F;
    const idx = this._system.subC509(cmd);
    const table = [0x8098, 0x80A0, 0x80B5, 0x80B8, 0x80CB, 0x81FD];
    const target = table[idx & 0xFF] ?? 0x8098;
    switch (target) {
      case 0x8098: this.sub8098(); break;  // 命令0: 结束渲染
      case 0x80A0: this.sub80A0(); break;  // 命令1
      case 0x80B5: this.sub80B5(); break;  // 命令2: 指针跳转
      case 0x80B8: this.sub80B8(); break;  // 命令3: 子程调用
      case 0x80CB: this.sub80CB(); break;  // 命令4
      case 0x81FD: this.sub81FD(); break;  // 命令5
    }
  }

  // ════════════════════════════════════════════════
  // HUD 命令 stub
  // ════════════════════════════════════════════════

  /** $8098: 命令0 — 结束渲染 (清 $05E3) */
  private sub8098(): void {
    this.wr(0x05E3, 0);
  }

  /**
   * $80A0: 命令1 — 等待帧循环 (轮询 $001C bit7)
   * asm: LDA #$01; JSR $C515; LDA $001C; BPL $80A0; 清 $05E9; INC $05E4; PLA PLA RTS
   */
  private sub80A0(): void {
    while ((this.rd(0x001C) & 0x80) === 0) {
      this._system.coroutineYield(1);
    }
    this.wr(0x05E9, 0);
    this.wr(0x05E4, (this.rd(0x05E4) + 1) & 0xFF);
  }

  /** $80B5: 命令2 — 尾调用 $C52D */
  private sub80B5(): void {
    this._system.subC52D();
  }

  /**
   * $80B8: 命令3 — 指针跳转 (从脚本流读 2 字节指针)
   * asm: LDY $05E5; LDA ($005F),Y; TAX; INY; LDA ($005F),Y; STA $0060; STX $005F; 清 $05E5
   */
  private sub80B8(): void {
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
  private sub80CB(): void {
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

  /** $80EA: 子表查找 (被 $80CB 调用) */
  private sub80EA(a: number): number {
    return this._system.subC509(a) & 0xFF;
  }

  /**
   * $81FD: 命令5 — NT 填充 + 读延迟
   * asm: JSR $C52D; LDA #$0D; STA $05F3; LDA #$80; STA $05F4;
   *   LDY $05E5; LDA ($005F),Y; STA $05E9; INC $05E5; PLA PLA RTS
   */
  private sub81FD(): void {
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
  private sub86F8(): void {
    const flag = this.rd(0x0532);
    if (flag === 0) return;
    if ((flag & 0x80) === 0) {
      const cnt = this.rd(0x0533);
      if (cnt === 0) { this.hudInitProcess(); }
      else { this.wr(0x0533, (cnt - 1) & 0xFF); }
      return;
    }
    const idx = flag & 0x7F;
    this.wr(0x0532, idx);
    if (idx === 0) return;
    const off = ((idx - 1) << 1) & 0xFF;
    this.wr(0x0079, this.readRomByte(0xAD6E + off));
    this.wr(0x007A, this.readRomByte(0xAD6F + off));
    this.wr(0x0533, 0);
    this.hudInitProcess();
  }

  /** $8723-$8776: HUD 初始化数据处理循环 */
  private hudInitProcess(): void {
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
  private sub8779(): void {
    const flag = this.rd(0x0534);
    if (flag === 0) return;
    if ((flag & 0x80) === 0) {
      const cnt = this.rd(0x0535);
      if (cnt === 0) { this.scoreDisplayProcess(); }
      else { this.wr(0x0535, (cnt - 1) & 0xFF); }
      return;
    }
    const idx = flag & 0x7F;
    this.wr(0x0534, idx);
    if (idx === 0) return;
    const off = ((idx - 1) << 1) & 0xFF;
    this.wr(0x007B, this.readRomByte(0xAD1C + off));
    this.wr(0x007C, this.readRomByte(0xAD1D + off));
    this.wr(0x0535, 0);
    this.scoreDisplayProcess();
  }

  /** $87A4-$87E3: 比分显示数据处理循环 */
  private scoreDisplayProcess(): void {
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
  private sub87E6(): void {
    const flag = this.rd(0x0536);
    if (flag === 0) {
      this.wr(0x0538, 0);
      return;
    }
    if ((flag & 0x80) === 0) {
      const cnt = this.rd(0x0537);
      if (cnt === 0) { this.clockDisplayProcess(); }
      else { this.wr(0x0537, (cnt - 1) & 0xFF); }
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
  private clockDisplayProcess(): void {
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
  private sub8851(): void {
    const param = this.rd(0x05C7);
    let y = param & 0xFF;
    const x0 = (y << 1) & 0xFF;
    this.wr(0x0050, this.readRomByte(0xB3CF + x0));
    this.wr(0x0051, this.readRomByte(0xB3D0 + x0));
    const x1 = y & 0x03;
    y = y >> 2;
    let cfg = this.readRomByte(0xB3BD + y);
    for (let i = x1; i > 0; i--) {
      if ((cfg & 0x80) !== 0) break;
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
    if (result === 0) return;
    const tileW2 = this.readMemByte(this.rdPtr(0x0050, 0x0051) + 2);
    this.sub88B9((tileW2 + 3) & 0xFF);
  }

  /** $88B9: 体力条精灵渲染子程 */
  private sub88B9(x: number): number {
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
  // 内存读取辅助
  // ════════════════════════════════════════════════
  private readMemByte(addr: number): number {
    if (addr < 0x0800) {
      return this.rd(addr);
    }
    return this.readRomByte(addr);
  }

  /** 读 bank24 ROM 数据字节 (通过 DataStore KV 'bank24_rom') */
  private readRomByte(addr: number): number {
    const rom = this._store.get<Uint8Array | readonly number[]>('bank24_rom');
    if (rom) {
      const off = (addr - 0x8000) & 0xFFFF;
      return rom[off] ?? 0;
    }
    return 0;
  }
}

export default MatchHudService;
