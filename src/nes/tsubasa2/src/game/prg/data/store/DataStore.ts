/**
 * DataStore — 运行时数据中心（Redis 风格 Key-Value，替代 CPU 内存）
 *
 * @bank 全 bank 共享（数据总线）
 *
 * 职责：
 *  - 保存 2KB 工作 RAM（$0000-$07FF）字节，键为 4 位大写补零真实地址：'ram_0601'
 *  - 提供 16-bit 读写（高低字节序与 6502 一致：低地址=低字节）
 *  - NMI 渲染缓冲 $05E8 / 缓冲队列 $0498 / OAM $0200 全部是 RAM 上的普通字节
 *
 * 规则：
 *  - Service 只能通过本类读写运行时状态，禁止自建内存数组
 *  - 键必须是 4 位大写补零真实地址
 */
export class DataStore {
  /** 工作 RAM $0000-$07FF（含 OAM 缓冲 $0200、NMI 缓冲 $0498/$05E8） */
  private readonly ram: Uint8Array = new Uint8Array(0x800);

  /** 帧计数（NMI 帧号） */
  frame: number = 0;

  /** 全部清零（等价 6502 Reset 的 RAM 清零循环） */
  reset(): void {
    this.ram.fill(0);
    this.frame = 0;
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

  /** 写一个字节（直接地址，内部用） */
  writeByte(addr: number, value: number): void {
    if (addr < 0 || addr >= 0x800) return;
    this.ram[addr] = value & 0xff;
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
