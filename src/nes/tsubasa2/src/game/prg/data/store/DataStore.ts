/**
 * DataStore — 运行时数据中心（Redis 风格 Key-Value，替代 CPU 内存）
 *
 * @bank 全 bank 共享（数据总线）
 *
 * 职责：
 *  - 保存 2KB 工作 RAM（$0000-$07FF）字节，键为 4 位大写补零真实地址：'ram_0601'
 *  - 提供 16-bit 读写（高低字节序与 6502 一致：低地址=低字节）
 *  - NMI 渲染缓冲 $05E8 / 缓冲队列 $0498 / OAM $0200 全部是 RAM 上的普通字节
 *  - VRAM 写透：$2000-$3FFF（NT/属性表/调色板）写透到 PPU 目标（write-through）；
 *    无目标时暂存 vram 缓冲，attach 后一次性 flush（等价原版 $2006/$2007 直写）。
 *
 * 规则：
 *  - Service 只能通过本类读写运行时状态，禁止自建内存数组
 *  - 键必须是 4 位大写补零真实地址
 */

/** VRAM 写透目标（原版 $2006/$2007 直写语义；core PPU 满足该结构） */
export interface VramTarget {
  writeMem(address: number, value: number): void;
}

export class DataStore {
  /** 工作 RAM $0000-$07FF（含 OAM 缓冲 $0200、NMI 缓冲 $0498/$05E8） */
  private readonly ram: Uint8Array = new Uint8Array(0x800);

  /** VRAM 暂存 $2000-$3FFF（无写透目标时的挂起写；attach 后 flush） */
  private readonly vram: Uint8Array = new Uint8Array(0x2000);

  /** VRAM 脏标记（$2000-$3FFF 相对偏移位图） */
  private vramDirty: Uint32Array = new Uint32Array(0x2000 / 32);

  /** VRAM 写透目标（由运行时 attach，见 setVramTarget） */
  private vramTarget: VramTarget | null = null;

  /** 帧计数（NMI 帧号） */
  frame: number = 0;

  /** 全部清零（等价 6502 Reset 的 RAM 清零循环） */
  reset(): void {
    this.ram.fill(0);
    this.vram.fill(0);
    this.vramDirty.fill(0);
    this.frame = 0;
  }

  /**
   * 附加 VRAM 写透目标（PPU）。
   * 此前无目标期间的挂起写（$2000-$3FFF）一次性 flush 到目标。
   */
  setVramTarget(target: VramTarget | null): void {
    if (this.vramTarget === target) return;
    if (target) this.flushVram(target);
    this.vramTarget = target;
  }

  /**
   * 将暂存的 VRAM 脏字节写透到目标并清脏。
   * 由渲染管线在每帧 renderCommit 调用（$2006/$2007 直写语义）。
   */
  flushVram(target?: VramTarget): void {
    const t = target ?? this.vramTarget;
    if (!t) return;
    for (let i = 0; i < this.vramDirty.length; i++) {
      const word = this.vramDirty[i];
      if (word === 0) continue;
      const base = i * 32;
      for (let b = 0; b < 32; b++) {
        if (word & (1 << b)) {
          const addr = 0x2000 + base + b;
          t.writeMem(addr & 0x3fff, this.vram[base + b]);
        }
      }
      this.vramDirty[i] = 0;
    }
  }

  // ──────────────────────────── 8-bit 读写 ────────────────────────────

  /** 读一个字节。key 形如 'ram_0601'；也兼容 'ram_FFFF' 之外的上层传参 */
  read(key: string): number {
    const addr = DataStore.keyToAddr(key);
    if (addr < 0 || addr >= 0x800) return 0;
    return this.ram[addr] & 0xff;
  }

  /** 写一个字节（自动 & 0xFF 截断，与 6502 STA 一致） */
  write(key: string, value: number): void {
    const addr = DataStore.keyToAddr(key);
    if (addr < 0 || addr >= 0x800) return;
    this.ram[addr] = value & 0xff;
  }

  /** 读一个字节（直接地址，内部用） */
  readByte(addr: number): number {
    if (addr < 0 || addr >= 0x800) return 0;
    return this.ram[addr] & 0xff;
  }

  /** 写一个字节（直接地址，内部用）。$2000-$3FFF 走 VRAM 写透。 */
  writeByte(addr: number, value: number): void {
    if (addr < 0) return;
    if (addr >= 0x2000 && addr < 0x4000) {
      this.vramWrite(addr, value);
      return;
    }
    if (addr >= 0x800) return;
    this.ram[addr] = value & 0xff;
  }

  /**
   * VRAM 写透：$2000-$3FFF（NT/属性表 $23C0-$23FF/调色板 $3F00-$3F1F）。
   * 有目标 → 立即写 PPU（原版 $2006/$2007 直写语义）；
   * 无目标 → 暂存脏区，attach/flush 时补写。
   */
  vramWrite(addr: number, value: number): void {
    if (addr < 0x2000 || addr >= 0x4000) return;
    const off = (addr - 0x2000) & 0x1fff;
    this.vram[off] = value & 0xff;
    this.vramDirty[off >> 5] |= 1 << (off & 31);
    if (this.vramTarget) {
      this.vramTarget.writeMem(addr & 0x3fff, value & 0xff);
    }
  }

  // ──────────────────────────── 16-bit 读写 ────────────────────────────

  /** 读 16-bit 小端（低字节在前，与 6502 一致） */
  readU16(addr: number): number {
    return this.readByte(addr) | (this.readByte(addr + 1) << 8);
  }

  /** 写 16-bit 小端 */
  writeU16(addr: number, value: number): void {
    this.writeByte(addr, value & 0xff);
    this.writeByte(addr + 1, (value >> 8) & 0xff);
  }

  // ──────────────────────────── 工具 ────────────────────────────

  /** 批量应用 RAM 初始化表 [{addr, value}] */
  loadInitTable(table: ReadonlyArray<{ addr: number; value: number }>): void {
    for (const e of table) this.writeByte(e.addr, e.value);
  }

  /** 'ram_XXXX' → 地址（小写/无前缀也兼容） */
  static keyToAddr(key: string): number {
    const m = /^ram[_0-9a-fA-F]*0x?([0-9a-fA-F]{1,4})$/.exec(key);
    if (m) return parseInt(m[1], 16);
    const n = key.replace(/^ram[_-]?/i, '');
    return parseInt(n, 16);
  }

  /** 地址 → 键（4 位大写补零） */
  static addrToKey(addr: number): string {
    return 'ram_' + addr.toString(16).toUpperCase().padStart(4, '0');
  }

  /** OAM 缓冲 $0200-$02FF 引用（只读视图） */
  get oamBuffer(): Uint8Array {
    return this.ram.subarray(0x200, 0x300);
  }

  /**
   * NMI 渲染缓冲 $05E8-$0627 视图（共 64 字节）。
   * 原版 $9B28 使用容量上限为 $0628（指针），忙标志 $0629，终止标 0。
   */
  get ntRenderBuffer(): Uint8Array {
    return this.ram.subarray(0x5e8, 0x628);
  }
}
