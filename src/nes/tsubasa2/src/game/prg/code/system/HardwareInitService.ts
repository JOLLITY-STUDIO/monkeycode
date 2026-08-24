/**
 * HardwareInitService — 硬件初始化/系统引导（原 bank30）
 *
 * @bank 30 ($C000-$DFFF)
 *
 * 对应原始地址（逐指令对照 src/asm/bank30/code_main.s + code_sub.s）：
 *   $C64E: Reset 序列（PPU/APU 初始化、RAM 清零、CHR bank）
 *   $C6BE: 系统初始化入口（清游戏 RAM → 调色板装载 → 渲染队列 → 主循环）
 *   $CB35: 清空 NT0/NT1（$CB5C 清单个 NT）
 *   $CB8B: OAM 全部 $F8 隐藏
 *   $CC02: 调色板装载（$FBCC + A*12 表，16 字节 → $046F+X）
 *   $CCD2: $0498 渲染队列入队（参数 [bank, ptrLo, ptrHi]）
 *   $CF1F: 游戏 RAM 大块清零（$0468-$05FF / $0668-$06FE / $003A-$00DE）
 *   $CA97: 主循环（任务调度器，7 槽 × 4 字节）
 *   $CEFE/$C400: 场景切换前序
 */
import type { DataStore } from '../../data/store/DataStore';
import { RAM_INIT_TABLE, OAM_HIDE_VALUE } from '../../data/tables/ram-init-table';
import { loadPalette } from '../../data/tables/palette-table';

/** $C766 表：boot 时复制到 $05EB（8 字节） */
const BOOT_05EB_TABLE: ReadonlyArray<number> = [0x13, 0x07, 0x19, 0x00, 0x00, 0xaf, 0x2e, 0xfd];

/** $CD89 表：球员数据指针表（32 项，16bit LE，$0300-$042C 区间） */
const PLAYER_PTR_TABLE: ReadonlyArray<number> = [
  0x0300, 0x030c, 0x0318, 0x0324, 0x0330, 0x033c, 0x0348, 0x0354,
  0x0360, 0x036c, 0x0378, 0x0384, 0x0390, 0x039c, 0x03a8, 0x03b4,
  0x03c0, 0x03cc, 0x03d8, 0x03e4, 0x03f0, 0x03fc, 0x0408, 0x040c,
  0x0410, 0x0414, 0x0418, 0x041c, 0x0420, 0x0424, 0x0428, 0x042c,
];

export class HardwareInitService {
  constructor(readonly store: DataStore) {}

  /**
   * Reset 序列（$C64E-$C6BB + $C6BE 系统初始化）：
   * 1. RAM $0000-$07FF 清零（8 页 × 256）
   * 2. ram_0020=$08 / ram_0021=$06 / ram_0022=$00 / ram_0469=$00
   * 3. OAM 全部 $F8（$CB8B）
   * 4. $C6BE: 游戏 RAM 清零（$CF1F）→ 调色板装载（$CC02×2）→
   *    渲染队列入队（$CCD2）→ $05EB 表 → 开 NMI → 主循环
   * 5. 场景号 A=0 → 场景调度（$CEFE）
   */
  reset(): void {
    const store = this.store;
    store.reset();
    store.loadInitTable(RAM_INIT_TABLE);
    // $CB8B: OAM 隐藏
    for (let i = 0x200; i < 0x300; i++) store.writeByte(i, OAM_HIDE_VALUE);
    // $C6E5: JSR $CF1F — 游戏 RAM 大块清零
    this.clearGameRam();
    // $C6E8: ram_001B=$00 / ram_063F=$00
    store.writeByte(0x001b, 0x00);
    store.writeByte(0x063f, 0x00);
    // $C6EF: ram_0020=$08 / ram_0021=$1E
    store.writeByte(0x0020, 0x08);
    store.writeByte(0x0021, 0x1e);
    // $C6F7: $046C=$20 / $046D=$00 / $046E=$3F（调色板渲染流头）
    store.writeByte(0x046c, 0x20);
    store.writeByte(0x046d, 0x00);
    store.writeByte(0x046e, 0x3f);
    // $C706/$C70D: 调色板装载 BG($046F) + SPR($047F)
    this.loadPaletteAt(0x00, 0x12);
    this.loadPaletteAt(0x10, 0x12);
    // $C714: JSR $CCD2; .byte $00,$6C,$04 — 入队调色板渲染流 [$046C]
    this.queueRenderEntry(0x00, 0x046c);
    // $C717: $05EB 表复制（8 字节）
    for (let i = 0; i < BOOT_05EB_TABLE.length; i++) {
      store.writeByte(0x05eb + i, BOOT_05EB_TABLE[i]);
    }
    // $C725-$C755: 注册 boot 三个任务（原版入口 $21CA/$1DD1/$85EB，H5 回调由场景层注册）
    this.registerTask(0, 0x28, 0x21, 0xca);
    this.registerTask(1, 0x50, 0x1d, 0xd1);
    this.registerTask(2, 0x78, 0x85, 0xeb);
    // $C758: 开 NMI（ram_0020 |= $80, ram_0019 同步）
    const ctrl = store.readByte(0x0020) | 0x80;
    store.writeByte(0x0020, ctrl);
    store.writeByte(0x0019, ctrl);
    // asm $CA28: LDA #$00; STA $0490  ; req0 = 0
    // asm $CA2D: LDA #$02; STA $0491  ; req1 = 2
    store.writeByte(0x0022, 0x00); // ram_0022: cmd 基址 0, chrSel 0
    store.writeByte(0x0490, 0x00); // req0 = 0
    store.writeByte(0x0491, 0x02); // req1 = 2
    // 帧计数归零
    store.frame = 0;
  }

  /**
   * $CC02: 调色板装载。
   * 指针 = $FBCC + index*12（每项 12 字节 = 4 组×3 色，组首色强制 $0F）。
   * 写入 $046F+X 起 16 字节（X=0 → BG，X=$10 → SPR）。
   * 装载后 $046C=$20（流长度标记，供 $CCD2 队列）。
   * @param x  目标偏移（0 或 $10）
   * @param index 调色板表索引
   */
  loadPaletteAt(x: number, index: number): void {
    const store = this.store;
    const item = loadPalette(index & 0xff);
    for (let i = 0; i < 16; i++) {
      store.writeByte(0x046f + x + i, item[i]);
    }
    store.writeByte(0x046c, 0x20);
  }

  /**
   * $CCD2: $0498 渲染队列入队。
   * 条目 3 字节 [bank, ptrLo, ptrHi]，指向 RLE 流（$C8FB 消费）。
   * 流头：[count][addrLo][addrHi][data×count]，0 终止。
   * @param bank PRG bank 号（H5 已无 PRG 流读取，仅保留 RAM 视图）
   * @param ptr 流起始 CPU 地址（RAM 区读 store）
   */
  queueRenderEntry(bank: number, ptr: number): void {
    const store = this.store;
    const count = store.readByte(0x0498);
    if (count >= 0x54) return; // 队列上限（原版无显式上限，H5 保护）
    store.writeByte(0x0499 + count * 3, bank & 0xff);
    store.writeByte(0x049a + count * 3, ptr & 0xff);
    store.writeByte(0x049b + count * 3, (ptr >> 8) & 0xff);
    store.writeByte(0x0498, (count + 1) & 0xff);
  }

  /**
   * $CF1F: 游戏 RAM 大块清零。
   *   $0468-$05FF（2 页）、$0668-$06FE（$97 字节）、$003A-$00DE（$A5 字节）。
   */
  clearGameRam(): void {
    const store = this.store;
    for (let a = 0x0468; a <= 0x05ff; a++) store.writeByte(a, 0x00);
    for (let a = 0x0668; a <= 0x06fe; a++) store.writeByte(a, 0x00);
    for (let a = 0x003a; a <= 0x00de; a++) store.writeByte(a, 0x00);
  }

  /**
   * $CB35: 清空 NameTable 0/1（$CB5C ×2：$2000 与 $2400）。
   * $CB5C 语义：$2006 置基址 → 写 0x04C0 字节 → 再写 64 字节（属性区）→ 清滚动。
   * H5：经 DataStore VRAM 写透直接落地 PPU（$2006/$2007 语义等价）。
   */
  clearNameTables(): void {
    this.clearOneNameTable(0x20);
    this.clearOneNameTable(0x24);
  }

  /** $CB5C: 清单个 NT（基址高字节 0x20/0x24；写 $04C0 字节 + 64 属性） */
  clearOneNameTable(hi: number): void {
    const store = this.store;
    const base = hi << 8;
    for (let i = 0; i < 0x04c0; i++) store.writeByte(base + i, 0x00);
    for (let i = 0; i < 64; i++) store.writeByte(base + 0x04c0 + i, 0x00);
  }

  /**
   * $CEFE + $C400: 场景切换前序
   * - 关 IRQ（ram_0469=0）
   * - 隐藏 OAM
   * - 清 NT
   * - PPU CTRL=$08 / MASK=$1E
   * - bank 基址 $0022=0
   * @param sceneId 场景号（0-0x22）
   */
  prepareScene(sceneId: number): void {
    const store = this.store;
    store.writeByte(0x0469, 0x00); // IRQ 计数器
    for (let i = 0x200; i < 0x300; i++) store.writeByte(i, OAM_HIDE_VALUE);
    this.clearNameTables();
    store.writeByte(0x0020, 0x08); // PPU CTRL: NMI on / 精灵 8x8 / BG 表 0
    store.writeByte(0x0021, 0x1e); // PPU MASK: BG+SPR 可见
    store.writeByte(0x0022, 0x00); // MMC3 bank 基址 = 0
    void sceneId;
  }

  /** 任务槽基址（$CA97: LDX #$01; ...; CPX #$19） */
  private static readonly TASK_SLOTS: ReadonlyArray<number> = [0x0001, 0x0005, 0x0009, 0x000d, 0x0011, 0x0015, 0x0019];

  /** H5 任务回调表（原版 CPU 栈跳转 → 函数调用）；未注册回调的槽只做 RAM 状态推进 */
  private readonly taskCallbacks: Array<(() => void) | null> = new Array(7).fill(null);

  /**
   * $CA97: 主循环 tick（任务调度器，逐指令对照 code_main.s $CA97-$CB0F）。
   * 7 个任务槽 $0001/$0005/.../$0019，每槽 4 字节：
   *   [$00XX] 状态：0=空，$FF=就绪（首次启动），N=倒计时
   *   [$01XX] 栈指针（原版 $0101 区索引；H5 保留 RAM 视图）
   *   [$02XX]/[$03XX] 入口 bank 高低（MMC3，H5 省略）
   * 每帧：倒计时槽 -1；到 0 或 $FF → 执行（$CAB9/$CAD4 → H5 回调）；
   * 空槽跳过；全部槽处理完等 NMI 标志（$CAAE，H5 由外层帧循环驱动）。
   * H5：由 BootRouter 每帧调用（NMI 游戏逻辑路径）。
   */
  tick(): void {
    const store = this.store;
    const slots = HardwareInitService.TASK_SLOTS;
    for (let i = 0; i < slots.length; i++) {
      const x = slots[i];
      const st = store.readByte(x);
      if (st === 0) continue; // 空槽
      if (st === 0xff) {
        // $CAD4: $FF 就绪 → 启动任务
        this.dispatchTask(i, x);
        continue;
      }
      // $CAA1: DEC $0000,X；到 0 → $CAB9 执行
      const n = (st - 1) & 0xff;
      store.writeByte(x, n);
      if (n !== 0) continue;
      this.dispatchTask(i, x);
    }
  }

  /** $CAB9/$CAD4: 槽触发 → 执行 H5 回调（原版 RTS 弹栈跳入口） */
  private dispatchTask(i: number, x: number): void {
    const store = this.store;
    // $CAD4/$CAB9 的 MMC3 bank 写（H5 省略）
    const fn = this.taskCallbacks[i];
    store.writeByte(x, 0x00); // 槽状态清空（H5：回调自行决定是否重新挂起）
    this.lastFiredSlot = i;   // $CB0F 挂起目标
    if (fn) fn();
  }

  /**
   * $CB02: 触发任务（槽 sp≠0 且状态==0 → 状态=1，下一帧执行）。
   * 原版 X=槽基址；H5 以 slotIndex 参数化。
   */
  triggerTask(slotIndex: number): void {
    const store = this.store;
    const x = HardwareInitService.TASK_SLOTS[slotIndex] ?? 0x0001;
    if (store.readByte(x + 1) === 0) return; // BEQ $CB0C（sp==0 → 跳过）
    if (store.readByte(x) !== 0) return;     // BNE $CB0C（状态≠0 → 跳过）
    store.writeByte(x, 0x01);                // INC $0000,X
  }

  /**
   * $CBF1: 音频请求入队（$0700 起 5 槽，空槽写入 A）。
   * 消费方：AudioService（bank12 $80BA 每帧轮询 $0700）。
   */
  requestAudio(a: number): void {
    const store = this.store;
    for (let x = 0; x < 5; x++) {
      if (store.readByte(0x0700 + x) === 0) {
        store.writeByte(0x0700 + x, a & 0xff);
        return;
      }
    }
  }

  /**
   * $CBB0: SE 请求（$0518=SE id，$0516=$80 待消费标志，$0005 清槽）。
   * 消费方：AudioService。
   */
  playSe(seId: number): void {
    const store = this.store;
    store.writeByte(0x0518, seId);
    store.writeByte(0x0516, 0x80);
    store.writeByte(0x0005, 0x00);
  }

  /**
   * $CD77: 球员数据指针查表。
   * A = $05FB ^ $0B；A <<= 1；ptr = $CD89[A]（16bit LE）。
   * $05FB=0 → 索引 $16 → $03C0；$05FB=1 → 索引 $14 → $03A8。
   * 结果写入 $0034/$0035（原版间接指针），并返回。
   */
  resolvePlayerPointer(): number {
    const store = this.store;
    const a = ((store.readByte(0x05fb) ^ 0x0b) << 1) & 0xff;
    const ptr = PLAYER_PTR_TABLE[a >> 1] ?? 0;
    store.writeByte(0x0034, ptr & 0xff);
    store.writeByte(0x0035, (ptr >> 8) & 0xff);
    return ptr;
  }

  /**
   * $CDC9: 除 12 网格偏移（菜单 12 列布局）。
   * 入 A（0-255）；商 q=A/12、余 r=A%12。
   * 出 Y=r*8+$54（X 网格），X=q*8+$34（Y 网格）。
   */
  gridOffsetBy12(a: number): { x: number; y: number } {
    let v = a & 0xff;
    let q = 0;
    while (v >= 0x0c) {
      v -= 0x0c;
      q++;
    }
    return { x: ((v * 8 + 0x54) & 0xff), y: ((q * 8 + 0x34) & 0xff) };
  }

  /**
   * $CDE2: 场地像素坐标 → 瓦片网格换算（逐指令对照 $CDE2-$CE07）。
   * X=px-$30（0..$A0），Y=py-$50（0..$60）内才有效；
   * 循环 DEX/ADC#$0C 累积行偏移：col 递减至负 → 返回 A；
   * A 溢出回 0 → 返回 $FF（越界/网格线命中）。
   */
  fieldCoordToTile(px: number, py: number): number {
    // TXA; SEC; SBC #$30
    let x = px - 0x30;
    if (x < 0) return 0xff; // BCC → $CE05
    if (x >= 0xa0) return 0xff; // BCS → $CE05
    let col = x >>> 3; // LSR×3; TAX
    // TYA; SEC; SBC #$50
    let a = py - 0x50;
    if (a < 0) return 0xff; // BCC → $CE05
    if (a >= 0x60) return 0xff; // BCS → $CE05
    a >>>= 3; // LSR×3
    // $CDFD: DEX; BMI $CE07
    col--;
    if (col < 0) return a & 0xff;
    for (;;) {
      // CLC; ADC #$0C
      a = (a + 0x0c) & 0xff;
      if (a === 0) return 0xff; // BNE 跳出 → LDA #$FF
      col--; // DEX（回到 $CDFD）
      if (col < 0) return a & 0xff; // BMI $CE07
    }
  }

  /**
   * $CF4F: 清空球员数据（ID 0-$15，共 22 项）：
   *   逐项 JSR $CD7C（按 ID 查 $CD89 指针表）→ [ptr+$0A]=0；
   *   ID==0 或 ID==$0B 时额外 [ptr+$07]=0。
   */
  clearAllPlayers(): void {
    const store = this.store;
    for (let id = 0; id < 0x16; id++) {
      const ptr = PLAYER_PTR_TABLE[id] ?? 0x0300;
      store.writeByte(ptr + 0x0a, 0x00); // LDY #$0A; LDA #$00; STA ($0034),Y
      if (id === 0 || id === 0x0b) {
        store.writeByte(ptr + 0x07, 0x00); // $CF63: LDY #$07 分支
      }
    }
  }

  /**
   * $CD7C: 按 ID 查球员数据指针（$CD89 表，16bit LE）。
   * 与 $CD77 的差异：$CD77 从 $05FB 取索引，$CD7C 直接用 A（调用方已赋值）。
   * 结果写入 $0034/$0035（原版间接指针），并返回。
   */
  resolvePlayerPointerById(id: number): number {
    const store = this.store;
    const idx = ((id & 0xff) << 1) & 0xfe;
    const ptr = PLAYER_PTR_TABLE[idx >> 1] ?? 0x0300;
    store.writeByte(0x0034, ptr & 0xff);
    store.writeByte(0x0035, (ptr >> 8) & 0xff);
    return ptr;
  }

  /**
   * $CED6: 球员碰撞检测（逐指令对照 code_sub.s $CED6-$CEFD）。
   * 球员指针指向数据的 [y+6]（X 坐标）、[y+8]（Y 坐标）；
   * 与 $0635/$0637 差值的绝对值均 < $0047（半径）→ 碰撞（返回 true）。
   * @param ptr 球员数据指针（$0034/$0035 内容）
   */
  checkPlayerCollision(ptr: number): boolean {
    const store = this.store;
    const dx = Math.abs((store.readByte(ptr + 6) & 0xff) - store.readByte(0x0635));
    if (dx >= store.readByte(0x0047)) return false; // CMP $0047; BCS $CEFC
    const dy = Math.abs((store.readByte(ptr + 8) & 0xff) - store.readByte(0x0637));
    if (dy >= store.readByte(0x0047)) return false; // CMP $0047; BCS $CEFC
    return true; // SEC; RTS
  }

  /**
   * $CD0D: 16bit × 16bit 乘法（$0067/$0068 × $0069/$006A → $006B-$006E 32bit）。
   * 逐位 ROR 移位累加（ROR $0068 → ROR $0067 → 进位入累加器高位）。
   */
  mult16(): void {
    const store = this.store;
    let lo = store.readByte(0x0068); // 被乘数低
    let hi = store.readByte(0x0067); // 被乘数高
    const m = store.readByte(0x0069) | (store.readByte(0x006a) << 8); // 乘数 16bit
    let acc = 0; // 32bit 累加器 $006B-$006E
    for (let i = 0; i < 16; i++) {
      const bit = lo & 1; // ROR $0068 移出位
      lo = (lo >>> 1) | (hi << 7);
      hi >>>= 1;
      let carry = 0;
      if (bit === 1) {
        const sum = acc + m; // CLC; ADC $0069/$006A
        acc = sum & 0xffffffff;
        carry = (sum >>> 32) & 1;
      }
      // ROR $006E/$006D/$006C/$006B：进位入最高位
      acc = ((acc >>> 1) | (carry << 31)) & 0xffffffff;
    }
    store.writeByte(0x006b, acc & 0xff);
    store.writeByte(0x006c, (acc >>> 8) & 0xff);
    store.writeByte(0x006d, (acc >>> 16) & 0xff);
    store.writeByte(0x006e, (acc >>> 24) & 0xff);
  }

  /**
   * $CD3C: 16bit ÷ 16bit（$006F/$0070 ÷ $0071/$0074 → 商 $006F/$0070、余 $0072/$0073）。
   * 恢复除法：每次迭代余数左移并入被除数最高位，够减则减并置商位。
   */
  div16(): void {
    const store = this.store;
    let q = store.readByte(0x006f) | (store.readByte(0x0070) << 8); // 被除数/商
    const d = store.readByte(0x0071) | (store.readByte(0x0074) << 8); // 除数
    let r = 0; // 余数 $0072/$0073
    for (let i = 0; i < 16; i++) {
      const bit = (q >>> 15) & 1; // ROL $0070 移出位（进入余数低位）
      q = (q << 1) & 0xffff;
      r = ((r << 1) | bit) & 0xffff;
      if (r >= d) {
        r = (r - d) & 0xffff;
        q |= 1; // SEC; ROL $006F 置商位
      }
    }
    store.writeByte(0x006f, q & 0xff);
    store.writeByte(0x0070, (q >>> 8) & 0xff);
    store.writeByte(0x0072, r & 0xff);
    store.writeByte(0x0073, (r >>> 8) & 0xff);
  }

  /**
   * $CAE7: 注册任务（H5 回调版）。
   * 原版：入口地址写入 $0101+sp（hi@+0/lo@+1），槽状态置 $FF。
   * @param slotIndex 槽号 0-6
   * @param sp        $0101 区索引（原版栈指针，保留 RAM 视图）
   * @param entryHi   $21CA 的高字节
   * @param entryLo   低字节
   * @param fn        H5 回调（原版入口 $21CA 对应函数）
   */
  registerTask(slotIndex: number, sp: number, entryHi: number, entryLo: number, fn?: () => void): void {
    const store = this.store;
    const x = HardwareInitService.TASK_SLOTS[slotIndex] ?? 0x0001;
    store.writeByte(0x0101 + sp, entryHi);
    store.writeByte(0x0102 + sp, entryLo);
    store.writeByte(x, 0xff);
    if (fn) this.taskCallbacks[slotIndex] = fn;
  }

  /**
   * $CB0F: 挂起当前任务（原版 A=倒计时 → $007F → 槽状态；0=下一帧恢复）。
   * H5：当前槽为最近触发的槽（由 tick 记录），置 countdown。
   */
  suspendTask(countdown: number): void {
    const store = this.store;
    const x = HardwareInitService.TASK_SLOTS[this.lastFiredSlot] ?? 0x0001;
    store.writeByte(x, countdown & 0xff);
  }

  /** 最近触发槽（$CB0F 挂起目标） */
  private lastFiredSlot = 0;
}
