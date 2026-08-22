/**
 * MatchTurnService — bank11 回合/滚动/精灵组 ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 11
 *
 * 职责:
 *   入口 $800C → $8083: 水平滚动状态机 (读 $05D4/$05D7/$05D8, 算滚动量, 写 $005A, 协程让出)
 *   入口 $8003 → $8083: 垂直滚动状态机 (类似水平, 算 $005A 含 NT 行偏移)
 *   入口 $8006 → $84A1: 精灵组写入 (从 data_tables.s 精灵描述符流写 OAM)
 *   入口 $8009 → $814C: 脚本处理 (读 $0524 索引, 查 $0052 指针, 执行描述符流)
 *   $810C: 取负坐标变正 (X/Y 取补)
 *   $812B: 查滚动表算 NT 偏移 ($8B64+0x64)
 *   $81BC: 精灵组描述符分派 ($81D5 表 + $832B)
 *   $82FE: 球场坐标→NT tile 索引 (X=$0637-0x50, Y=$0635-0x30)
 *
 * RAM 关键:
 *   $0052/$0053: 脚本/数据指针 (lo/hi)
 *   $0058/$0059: 数据流指针
 *   $005A: 当前滚动量 (列偏移)
 *   $005B: 滚动方向标志
 *   $005D: 当前精灵组 id
 *   $0524: 脚本索引 ($FF=无)
 *   $05D4/$05D5: 当前滚动 X/Y (有符号 16 位)
 *   $05D7: 滚动方向位 (bit7=垂直)
 *   $05D8: 目标滚动位置
 *   $05FB: 比赛阶段 ($0B=进攻方向基准)
 *
 * 命名规范: 旧名 Bank11Service → 新名 MatchTurnService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';

/** 4 位大写十六进制 RAM 键 */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class MatchTurnService {
  protected _store: DataStore;
  protected _system: GameSystemService;
  /** 模拟 6502 X 寄存器 (跨方法传递, 如 sub82FE → sub81CC) */
  protected _regX = 0;

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
  // 跳转表入口 (bank11 头 $8000-$800B)
  // $8000: JMP $800C (水平滚动)
  // $8003: JMP $8083 (垂直滚动)
  // $8006: JMP $84A1 (精灵组写入)
  // $8009: JMP $814C (脚本处理)
  // ════════════════════════════════════════════════

  /** $800C → $8083: 水平滚动状态机 */
  horizontalScroll(): void { this.scrollStateMachine(true); }

  /** $8003 → $8083: 垂直滚动状态机 */
  verticalScroll(): void { this.scrollStateMachine(false); }

  /** $8006 → $84A1: 精灵组写入 */
  spriteGroupWrite(): void { this.sub84A1(); }

  /** $8009 → $814C: 脚本处理 */
  scriptProcess(): void { this.sub814C(); }

  // ════════════════════════════════════════════════
  // $800C / $8083 滚动状态机
  // asm $800C-$8080 (水平) / $8083-$8109 (垂直)
  //
  // 水平 ($800C):
  //   $800E: LDA #$01; JSR $C515 (协程让出 1 帧)
  //   $8011: LDA $05D4 (当前滚动 X 低)
  //   $8014: BIT $05D7 (方向位)
  //   $8017: BPL $801E (正方向跳)
  //   $8019: EOR #$FF; CLC; ADC #$11 (负方向取补+0x11)
  //   $801E: AND #$E0 (取高 5 位=列对齐)
  //   $8020: CMP $05D8 (与目标比)
  //   $8023: BNE $8028 (不同则继续滚动)
  //   $8025: JMP $800C (相同则循环等下一帧)
  //   $8028: STA $05D8 (更新目标)
  //   $802B: JSR $810C (坐标取负变正)
  //   $802E: LDA $003B; AND #$FE; JSR $812B (查滚动表)
  //   $8035: LDA #$E0 (水平基准 $E0)
  //   $8037: BIT $05D7; BPL $803E; LDA #$A0 (垂直时 $A0)
  //   $803E: CLC; ADC $05D4; AND #$E0; LSR; LSR; ORA #$40
  //   $8048: STA $005A (滚动量 = 列号 | $40 标志)
  //   $804A: LDA #$04; PHA (外层循环 4 次)
  //   $804D: LDA #$01; JSR $C515 (每帧让出)
  //   $8052: LDA $0515; BNE $804D (等 $0515 清零)
  //   $8057: LDA #$01; STA $0515 (置滚动进行中)
  //   $805C: LDX #$00; LDA #$02; PHA (内层 2 列)
  //   $8061: LDA $005A; AND #$3F; TAY (取列号)
  //   $8066: LDA ($0058),Y (读数据流)
  //   $8068: LDY $005A; JSR $85C2 (写 NT 列)
  //   $806D: INC $005A (下一列)
  //   $806F-$8073: 内层计数
  //   $8075: LDA #$80; STA $0515 (滚动完成标志)
  //   $807A-$807E: 外层计数
  //   $8080: JMP $800C (回主循环)
  // ════════════════════════════════════════════════
  private scrollStateMachine(horizontal: boolean): void {
    // $800E/$8085: 协程让出 1 帧
    this._system.coroutineYield(1);
    // $8011/$8088: 读当前滚动坐标
    const scrollLo = this.rd(0x05D4);
    const dir = this.rd(0x05D7);
    // $8014/$808B: BIT $05D7 (bit7=方向)
    let aligned: number;
    if ((dir & 0x80) !== 0) {
      // $8019: 负方向取补
      aligned = ((scrollLo ^ 0xFF) + (horizontal ? 0x11 : 0x01)) & 0xFF;
    } else {
      aligned = scrollLo;
    }
    // $801E/$8095: AND #$E0 (列对齐)
    aligned = aligned & 0xE0;
    // $8020/$8097: CMP $05D8 (与目标比)
    const target = this.rd(0x05D8);
    if (aligned === target) {
      // $8025/$809C: 已对齐, 循环等下一帧
      return;
    }
    // $8028/$809F: 更新目标
    this.wr(0x05D8, aligned);
    // $802B/$80A2: 坐标取负变正
    this.sub810C();
    // $802E/$80A5: 查滚动表
    const nb = this.rd(0x003B) & 0xFE;
    this.sub812B(nb);
    // $8035/$80A5: 算滚动量基准
    let base = horizontal ? 0xE0 : 0xA0;
    // $803E: CLC; ADC $05D4; AND #$E0; LSR; LSR; ORA #$40
    let scroll = (base + this.rd(0x05D4)) & 0xE0;
    scroll = (scroll >> 2) | 0x40;
    // $8048: STA $005A
    this.wr(0x005A, scroll & 0xFF);
    // $804A-$807E: 外层 4 次 / 内层 2 列滚动循环
    for (let outer = 0; outer < 4; outer++) {
      // $804D: 每帧让出
      this._system.coroutineYield(1);
      // $8052: 等 $0515 清零
      while (this.rd(0x0515) !== 0) {
        this._system.coroutineYield(1);
      }
      // $8057: 置滚动进行中
      this.wr(0x0515, 0x01);
      // $805C-$8073: 内层 2 列
      for (let inner = 0; inner < 2; inner++) {
        const col = this.rd(0x005A) & 0x3F;
        const dataPtr = this.rdPtr(0x0058, 0x0059);
        const data = this.readMemByte(dataPtr + col);
        this.sub85C2(data, this.rd(0x005A));
        this.wr(0x005A, (this.rd(0x005A) + 1) & 0xFF);
      }
      // $8075: 滚动完成标志
      this.wr(0x0515, 0x80);
    }
  }

  // ════════════════════════════════════════════════
  // $810C: 坐标取负变正
  // asm: LDX $05D4; LDY $05D5; BPL $8120; TXA; EOR #$FF; TAX;
  //      TYA; EOR #$FF; TAY; INX; BNE $8120; INY
  // $8120: TXA; CLC; ADC #$E0; STA $003A; TYA; ADC #$01; STA $003B
  // ════════════════════════════════════════════════
  private sub810C(): void {
    let x = this.rd(0x05D4);
    let y = this.rd(0x05D5);
    if ((y & 0x80) !== 0) {
      // 负数取补
      x = (x ^ 0xFF) & 0xFF;
      y = (y ^ 0xFF) & 0xFF;
      x = (x + 1) & 0xFF;
      if (x === 0) y = (y + 1) & 0xFF;
    }
    // $8120: 算 NT 基址偏移
    this.wr(0x003A, (x + 0xE0) & 0xFF);
    this.wr(0x003B, (y + 0x01) & 0xFF);
  }

  // ════════════════════════════════════════════════
  // $812B: 查滚动表算 NT tile 偏移
  // asm: TAY; LDA ($005B),Y; JSR $86D3
  //   LDX #$00; STX $0058; LSR; ROR $0058 (×3 右移=除8)
  //   LSR; ROR $0058; LSR; ROR $0058; TAX
  //   LDA $0058; CLC; ADC #$64; STA $0058 (偏移 +0x64)
  //   TXA; ADC #$8B; STA $0059 (高字节 $8B → bank11 数据表 $8B64)
  // ════════════════════════════════════════════════
  private sub812B(a: number): void {
    const y = a;
    const tableBase = this.rdPtr(0x005B, 0x005C);
    const v = this.readMemByte(tableBase + y);
    this.sub86D3(v);
    // 除 8 算行号
    let q = v;
    let r = 0;
    for (let i = 0; i < 3; i++) {
      r = (r << 1) | (q & 1);
      q >>= 1;
    }
    this.wr(0x0058, (r + 0x64) & 0xFF);
    this.wr(0x0059, (q + 0x8B) & 0xFF);
  }

  // ════════════════════════════════════════════════
  // $814C → 脚本处理入口
  // asm $814C:
  //   $814E: LDA #$F6; STA $0052; LDA #$87; STA $0053 (指针=$87F6 脚本表)
  //   $8154: LDA $0524 (脚本索引)
  //   $8157: CMP #$FF; BEQ $819C ($FF=无脚本, 跳结束)
  //   $815B: ASL; BCC $8160; INC $0053 (×2, 进位加高字节)
  //   $8160: TAY; LDA ($0052),Y; TAX; INY; LDA ($0052),Y; STA $0053; STX $0052
  //     (查指针表得脚本入口, 存 $0052/$0053)
  //   $816B: LDA #$00; STA $05D1; STA $003A
  //   $8172: LDY $003A; LDA ($0052),Y (读脚本字节)
  //   $8176: CMP #$F0; BCC $8188 (< $F0 = 普通 tile, 写 NT)
  //   $817A: JSR $81BC (≥ $F0 = 命令, 分派)
  //   $817D: LDA #$02; STA $05D0; STA $0525 (设标志)
  //   $8185: JMP $819C
  //   $8188: STA $0525; TYA; CLC; ADC $0052; STA $0052 (指针前进)
  //   $8195: LDY #$01; LDA ($0052),Y; JSR $81A7 (读长度, 分派)
  //   $819C: LDA $0516; ORA #$10; STA $0516; JMP $C512 (设标志, 返回)
  // ════════════════════════════════════════════════
  private sub814C(): void {
    // $814E: 指针 = $87F6 (脚本索引表)
    this.wrPtr(0x0052, 0x0053, 0x87F6);
    // $8154: 读脚本索引
    const idx = this.rd(0x0524);
    // $8157: $FF = 无脚本
    if (idx === 0xFF) {
      this.endScriptProcess();
      return;
    }
    // $815B: ×2 查指针表
    let ptr = this.rdPtr(0x0052, 0x0053);
    const off = (idx * 2) & 0xFF;
    const lo = this.readMemByte(ptr + off);
    const hi = this.readMemByte(ptr + off + 1);
    ptr = (hi << 8) | lo;
    this.wrPtr(0x0052, 0x0053, ptr);
    // $816B: 清 $05D1/$003A
    this.wr(0x05D1, 0);
    this.wr(0x003A, 0);
    // $8172: 读脚本字节
    const y = this.rd(0x003A);
    const b = this.readMemByte(ptr + y);
    if (b < 0xF0) {
      // $8188: 普通 tile, 写 NT
      this.wr(0x0525, b);
      // 指针前进
      const adv = (y + ptr) & 0xFFFF;
      this.wrPtr(0x0052, 0x0053, adv);
      // $8195: 读长度分派
      const len = this.readMemByte(adv + 1);
      this.sub81A7(len);
    } else {
      // $817A: 命令分派
      this.sub81BC(b);
      // $817D: 设标志
      this.wr(0x05D0, 0x02);
      this.wr(0x0525, 0x02);
    }
    this.endScriptProcess();
  }

  /** $819C: 脚本处理结束 (设 $0516 bit4, 返回) */
  private endScriptProcess(): void {
    const v = this.rd(0x0516) | 0x10;
    this.wr(0x0516, v);
    // $81A4: JMP $C512 (返回调用方, H5 no-op)
  }

  // ════════════════════════════════════════════════
  // $81A7: 命令分派 (查 $81A8 跳转表)
  // asm: JSR $C509; .byte $27,$83,$E7,$83,$FF,$83,$58,$83,$77,$83,$64,$83,$D2,$83,$E7,$83,$EE,$83
  //   跳转表 9 项: $8327/$83E7/$83FF/$8358/$8377/$8364/$83D2/$83E7/$83EE
  // ════════════════════════════════════════════════
  private sub81A7(a: number): void {
    // 原 6502: JSR $C509 (A=cmd, $CB99 采样内联跳转表), cmd N → 表项 N
    const table = [0x8327, 0x83E7, 0x83FF, 0x8358, 0x8377, 0x8364, 0x83D2, 0x83E7, 0x83EE];
    const target = table[a & 0xFF] ?? 0x8327;
    switch (target) {
      case 0x8327: this.sub8327(); break;
      case 0x83E7: this.sub83E7(); break;
      case 0x83FF: this.sub83FF(); break;
      case 0x8358: this.sub8358(); break;
      case 0x8377: this.sub8377(); break;
      case 0x8364: this.sub8364(); break;
      case 0x83D2: this.sub83D2(); break;
      case 0x83EE: this.sub83EE(); break;
    }
  }

  // ════════════════════════════════════════════════
  // $81BC: 精灵组描述符分派
  // asm: LDX #$00; STX $0525; AND #$0F; JSR $C509
  //   跳转表: $81CC/$8276/$824D/$82F7 (4 路)
  //   $81D5 数据表: 精灵组 tile 偏移表
  //   JMP $832B
  // ════════════════════════════════════════════════
  private sub81BC(a: number): void {
    this.wr(0x0525, 0);
    // 原 6502: AND #$0F; JSR $C509 (cmd = a&0x0F, 4 路)
    const cmd = a & 0x0F;
    switch (cmd & 0x03) {
      case 0: this.sub81CC(); break;
      case 1: this.sub8276(); break;
      case 2: this.sub824D(); break;
      case 3: this.sub82F7(); break;
    }
    // $81D2: JMP $832B
    this.sub832B();
  }

  // ════════════════════════════════════════════════
  // $84A1: 精灵组写入入口
  // asm $84A1 (code_data.s):
  //   CMP #$80; BCS $84AD; DEX; CMP #$40; BCS $84AD; DEX
  //   LDY #$74; AND #$3F; CMP #$20; BCS $84BB; LDY #$E4
  //   TXA; EOR #$02; TAX
  //   $84BB: LDA $0020; AND #$FC; STA $0020; TXA; ORA $0020; STA $0020
  //   $84C6: STY $004B; LDA $05CB; STA $046B
  //   $84CE: RTS
  //   $84CF: JSR $84F4; STX $05DE; STY $05DF; RTS (写精灵坐标)
  //   $84D8: JSR $84F4; ... (带翻转的精灵坐标)
  // ════════════════════════════════════════════════
  // ════════════════════════════════════════════════
  // $85C2: 写 NT 列 (滚动用)
  // asm: 读数据 + NT 地址, 写一列 tile
  // TODO: 翻译 $85C2 完整实现
  // ════════════════════════════════════════════════
  private sub85C2(data: number, scrollInfo: number): void {
    void data; void scrollInfo;
    // TODO: 翻译 $85C2
  }


  // ════════════════════════════════════════════════
  // 命令分派目标 — 已翻译 ($81A7 跳转表)
  // ════════════════════════════════════════════════

  /** $8327: 命令0 — LDY #$02; LDA ($0052),Y; → sub832B */
  private sub8327(): void {
    const a = this.readScriptByte(2);
    this.sub832B(a);
  }

  /** $83E7: 命令1 — LDA #$C0; STA $05D1; → sub840A */
  private sub83E7(): void {
    this.wr(0x05D1, 0xC0);
    this.sub840A();
  }

  /** $83FF: 命令2 — LDA #$C2; STA $05D1; JSR $84CF; JSR $845C; → sub840A */
  private sub83FF(): void {
    this.wr(0x05D1, 0xC2);
    this.sub84CF();
    this.sub845C();
    this.sub840A();
  }

  /** $8358: 命令3 — JSR $84D9; LDA #$80; STA $05D1; LDY #$04; → $8329 */
  private sub8358(): void {
    this.sub84D9();
    this.wr(0x05D1, 0x80);
    const a = this.readScriptByte(4);
    this.sub832B(a);
  }

  /** $8377: 命令4 — JSR $84CF; 读脚本[4]→$05E2; $05E1=0; 复杂精灵组设置 */
  private sub8377(): void {
    this.sub84CF();
    this.wr(0x05E2, this.readScriptByte(4));
    this.wr(0x05E1, 0);
    this.wr(0x046B, 0x01);
    this.sub8525(this.rd(0x05CC), 0xA0);
    this.sub84A1(0xA0);
    this._system.coroutineYield(1);
    this.wr(0x05CE, 0);
    this.sub8525(this.readScriptByte(5), 0x00);
    this.sub8525(this.readScriptByte(6), 0x80);
    this.wr(0x05CB, 0);
    this.wr(0x05CD, 0x60);
    this.wr(0x05DB, 0);
    this.wr(0x05DC, 0);
    this.wr(0x05DD, 0);
    this.wr(0x05E0, 0);
    this.wr(0x05D1, 0x82);
    this.sub8493();
  }

  /** $8364: 命令5 — JSR $84D9; LDA #$80; STA $05D1; Y=4或5; → $8329 */
  private sub8364(): void {
    this.sub84D9();
    this.wr(0x05D1, 0x80);
    let y = 4;
    if ((this.rd(0x052A) & 0x40) !== 0) y = 5;
    const a = this.readScriptByte(y);
    this.sub832B(a);
  }

  /** $83D2: 命令6 — JSR $84D9; LDY #$04; LDA ($0052),Y; STA $05E2;
   *   LDA #$00; STA $05E1; JSR $847F; JMP $8386 */
  private sub83D2(): void {
    this.sub84D9();
    this.wr(0x05E2, this.readScriptByte(4));
    this.wr(0x05E1, 0);
    this.sub847F();
    this.sub8386Body();
  }

  /** $83EE: 命令8 — LDA #$C2; STA $05D1; JSR $84CF; JSR $845C;
   *   JSR $847F; JMP $840D */
  private sub83EE(): void {
    this.wr(0x05D1, 0xC2);
    this.sub84CF();
    this.sub845C();
    this.sub847F();
    this.sub840D();
  }

  // ════════════════════════════════════════════════
  // $840A/$840D 共享代码
  // ════════════════════════════════════════════════

  /** $840A: JSR $84CF; → $840D 共享 */
  private sub840A(): void {
    this.sub84CF();
    this.sub840D();
  }

  /** $840D: 精灵组后处理共享代码 */
  private sub840D(): void {
    this.wr(0x046B, 0x01);
    this.sub8525(this.rd(0x05CC), 0x00);
    this.sub84A1(0x00);
    this.sub8525(this.readScriptByte(5), 0x80);
    this.sub8525(this.readScriptByte(6), 0xA0);
    this.wr(0x05CB, 0);
    this.wr(0x05CE, 0x40);
    this.wr(0x05CD, 0);
    this.wr(0x05DB, 0);
    this.wr(0x05DC, 0xE0);
    this.wr(0x05DD, 0xFF);
    if ((this.rd(0x05DF) & 0x80) === 0) {
      this.wr(0x05E0, 0x20);
    }
    this.sub8493();
  }

  /** $8386: sub8377 从 $8386 开始的代码体 */
  private sub8386Body(): void {
    this.wr(0x046B, 0x01);
    this.sub8525(this.rd(0x05CC), 0xA0);
    this.sub84A1(0xA0);
    this._system.coroutineYield(1);
    this.wr(0x05CE, 0);
    this.sub8525(this.readScriptByte(5), 0x00);
    this.sub8525(this.readScriptByte(6), 0x80);
    this.wr(0x05CB, 0);
    this.wr(0x05CD, 0x60);
    this.wr(0x05DB, 0);
    this.wr(0x05DC, 0);
    this.wr(0x05DD, 0);
    this.wr(0x05E0, 0);
    this.wr(0x05D1, 0x82);
    this.sub8493();
  }

  // ════════════════════════════════════════════════
  // 精灵组描述符分派目标 — 已翻译 ($81BC)
  // ════════════════════════════════════════════════

  /** $81CC: 精灵组0 — JSR $82F7; LDA $81D5,X; JMP $832B */
  private sub81CC(): void {
    this.sub82F7();
    const a = this.readMemByte(0x81D5 + this._regX);
    this.sub832B(a);
  }

  /** $8276: 精灵组1 — JSR $82F7; LDA $827F,X; JMP $832B */
  private sub8276(): void {
    this.sub82F7();
    const a = this.readMemByte(0x827F + this._regX);
    this.sub832B(a);
  }

  /** $824D: 精灵组2 — 球员坐标查表 */
  private sub824D(): void {
    this._system.subC50C();
    let a = this.rd(0x0638);
    const ptr34 = this.rdPtr(0x0034, 0x0035);
    a = (a - this.readMemByte(ptr34 + 6)) & 0xFF;
    let y = this.rd(0x05FB);
    if (y !== 0) a = ((a ^ 0xFF) + 1) & 0xFF;
    let x = a;
    this._regX = x & 0xFF;
    if ((x & 0x80) !== 0) y = (y ^ 0x0B) & 0xFF;
    this._regX = this.sub82FE(y);
    const tileA = this.readMemByte(0x827F + this._regX);
    this.sub832B(tileA);
  }

  /** $82F7: 精灵组3 — LDY $05FB; JSR $82FE; RTS */
  private sub82F7(): void {
    const y = this.rd(0x05FB);
    this._regX = this.sub82FE(y);
  }

  /**
   * $832B: 精灵组后处理 — STA $05CC; LDY $05CD; JSR $8525;
   *   设 $05CB=1; $05CE; $05CD; 清 $05DB/$05DC/$05DD
   */
  private sub832B(a: number = 0): void {
    this.wr(0x05CC, a & 0xFF);
    const y = this.rd(0x05CD);
    this.sub8525(a, y);
    this.wr(0x05CB, 0x01);
    const cd = this.rd(0x05CD);
    let ce: number;
    if (cd !== 0) {
      ce = ((cd & 0x20) | 0x80) & 0xFF;
    } else {
      ce = 0;
    }
    this.wr(0x05CE, ce);
    this.wr(0x05CD, ((ce | 0x80) ^ 0x20) & 0xFF);
    this.wr(0x05DB, 0);
    this.wr(0x05DC, 0);
    this.wr(0x05DD, 0);
  }

  // ════════════════════════════════════════════════
  // 辅助子程
  // ════════════════════════════════════════════════

  /** 读脚本偏移 Y 处字节 */
  private readScriptByte(off: number): number {
    const ptr = this.rdPtr(0x0052, 0x0053);
    return this.readMemByte(ptr + off);
  }

  /** $84CF: 写精灵坐标 (无翻转) */
  private sub84CF(): void {
    const r = this.sub84F4();
    this.wr(0x05DE, r.x);
    this.wr(0x05DF, r.y);
  }

  /** $84D9: 写精灵坐标 (带翻转) */
  private sub84D9(): void {
    let { x, y } = this.sub84F4();
    if ((this.rd(0x052A) & 0x40) !== 0) {
      x = (x ^ 0xFF) & 0xFF;
      y = (y ^ 0xFF) & 0xFF;
      x = (x + 1) & 0xFF;
      if (x === 0) y = (y + 1) & 0xFF;
    }
    this.wr(0x05DE, x);
    this.wr(0x05DF, y);
  }

  /** $84F4: 读精灵坐标 */
  private sub84F4(): { x: number; y: number } {
    const ptr = this.rdPtr(0x0052, 0x0053);
    let x = this.readMemByte(ptr + 2);
    let y = this.readMemByte(ptr + 3);
    if (y === 0x80) {
      let lo = this.rd(0x061C);
      let hi = this.rd(0x061D);
      const shifts = (x === 1) ? 3 : 4;
      for (let i = 0; i < shifts; i++) {
        const carry = (lo >> 7) & 1;
        lo = (lo << 1) & 0xFF;
        hi = ((hi << 1) | carry) & 0xFF;
      }
      const sum = lo + 0xC0;
      x = sum & 0xFF;
      y = (hi + (sum > 0xFF ? 1 : 0)) & 0xFF;
    }
    return { x: x & 0xFF, y: y & 0xFF };
  }

  /** $845C: 精灵尺寸/属性计算 */
  private sub845C(): void {
    const ptr = this.rdPtr(0x0052, 0x0053);
    let a = this.readMemByte(ptr + 4);
    let x: number;
    if ((this.rd(0x05DF) & 0x80) !== 0) {
      x = 0x1C;
      const carry = a & 1;
      a = a >> 1;
      if (carry !== 0) x = 0x8C;
    } else {
      a = (a - 1) & 0xFF;
      x = 0x74;
      const carry = a & 1;
      a = a >> 1;
      if (carry !== 0) {
        x = 0xE4;
        if (a === 0) x = 0x1C;
      }
    }
    this.wr(0x05E1, x & 0xFF);
    this.wr(0x05E2, a & 0xFF);
  }

  /** $847F: 读脚本偏移跳转 (更新 $0052/$0053 指针) */
  private sub847F(): void {
    let y = 5;
    if ((this.rd(0x052A) & 0x40) !== 0) y = (y + 2) & 0xFF;
    const ptr = this.rdPtr(0x0052, 0x0053);
    const lo = this.readMemByte(ptr + y);
    const hi = this.readMemByte(ptr + y + 1);
    this.wrPtr(0x0052, 0x0053, (hi << 8) | lo);
  }

  /** $8493: 精灵组后处理 (计算 $005B/$005C = $0052/$0053 + 5) */
  private sub8493(): void {
    const lo = (5 + this.rd(0x0052)) & 0xFF;
    const carry = (5 + this.rd(0x0052)) > 0xFF ? 1 : 0;
    this.wr(0x005B, lo);
    this.wr(0x005C, (this.rd(0x0053) + carry) & 0xFF);
  }

  /** $82FE: 球场坐标→NT tile 索引 */
  private sub82FE(yParam: number): number {
    let a = (this.rd(0x0637) - 0x50) & 0xFF;
    a = a & 0xF0;
    let v = a >> 1;
    this.wr(0x003A, v & 0xFF);
    let a2 = v >> 2;
    a2 = (a2 + this.rd(0x003A)) & 0xFF;
    this.wr(0x003A, a2);
    let ay = (this.rd(0x0635) - 0x30) & 0xFF;
    ay = ay & 0xF0;
    ay = ay >> 4;
    ay = (ay + this.rd(0x003A)) & 0xFF;
    let x = ay;
    if (yParam !== 0) x = (x + 0x3C) & 0xFF;
    return x & 0xFF;
  }

  /** $8525: 精灵组写入 (从精灵描述符流写 OAM) */
  private sub8525(a: number, y: number): void {
    this.wr(0x05C8, y & 0xFF);
    const spriteId = a;
    this.wr(0x0054, 0xEE);
    this.wr(0x0055, 0x86);
    let idx = (spriteId << 1) & 0xFF;
    if (spriteId & 0x80) this.wr(0x0055, (this.rd(0x0055) + 1) & 0xFF);
    const ptr86EE = this.rdPtr(0x0054, 0x0055);
    this.wr(0x0526, (this.readMemByte(ptr86EE + idx) | 0x80) & 0xFF);
    this.wr(0x0527, this.readMemByte(ptr86EE + idx + 1));
    const retA = this.sub86D3(spriteId);
    let q = retA;
    let r = 0;
    for (let i = 0; i < 3; i++) {
      r = (r << 1) | (q & 1);
      q >>= 1;
    }
    this.wr(0x0054, (r + 0x64) & 0xFF);
    this.wr(0x0055, (q + 0x8B) & 0xFF);
    this.wr(0x05C9, 0x20);
    const savedCA = this.rd(0x05CA);
    this._system.coroutineYield(1);
    while (this.rd(0x0515) !== 0) this._system.coroutineYield(1);
    this.wr(0x0515, 0x01);
    this.wr(0x05C7, 0);
    this.wr(0x05CA, savedCA);
    for (let outer = 3; outer > 0; outer--) {
      const c9 = this.rd(0x05C9);
      if (c9 === 0) break;
      const off = (0x20 - c9) & 0xFF;
      const dataPtr = this.rdPtr(0x0054, 0x0055);
      const data = this.readMemByte(dataPtr + off);
      const xIdx = this.rd(0x05C7);
      const yIdx = this.rd(0x05C8);
      this.sub85C2(data, yIdx);
      this.wr(0x05C7, (xIdx + 4) & 0xFF);
      this.wr(0x05C8, (yIdx + 1) & 0xFF);
      const newC9 = (c9 - 1) & 0xFF;
      this.wr(0x05C9, newC9);
      if (newC9 === 0) {
        this.wr(0x0515, 0x80);
        break;
      }
      if (outer - 1 === 0) this.wr(0x0515, 0x80);
    }
    this.wr(0x0515, 0x80);
    this._system.coroutineYield(1);
  }

  /** $84A1: 精灵组写入入口 (写 $0020 标志 + $004B + $046B) */
  private sub84A1(a: number = 0): void {
    let x = 2;
    if (a < 0x80) {
      x--;
      if (a < 0x40) x--;
    }
    let y = 0x74;
    if ((a & 0x3F) < 0x20) {
      y = 0xE4;
      x = (x ^ 0x02) & 0xFF;
    }
    const v = this.rd(0x0020) & 0xFC;
    this.wr(0x0020, (x | v) & 0xFF);
    this.wr(0x004B, y & 0xFF);
    this.wr(0x046B, this.rd(0x05CB));
  }

  /** $86D3: 精灵组描述符解析 (查 $8B42 表, 写 $05CA) */
  private sub86D3(a: number): number {
    const x = a & 0x03;
    const y = a >> 2;
    let tbl = this.readMemByte(0x8B42 + y);
    for (let i = 0; i < x; i++) tbl = tbl >> 2;
    this.wr(0x05CA, tbl & 0x03);
    return a & 0xFF;
  }

  // ════════════════════════════════════════════════
  // 内存读取辅助
  // ════════════════════════════════════════════════
  private readMemByte(addr: number): number {
    if (addr < 0x0800) {
      // RAM 区
      return this.rd(addr);
    }
    // ROM 区: bank11 数据 (stub, 待 import bank11 数据表)
    // 临时返回 0
    return 0;
  }
}

export default MatchTurnService;
