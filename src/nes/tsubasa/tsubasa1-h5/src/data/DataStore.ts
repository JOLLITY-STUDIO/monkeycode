/**
 * 天使之翼1 — 数据中心 (替代NES RAM/OAM/VRAM)
 * 
 * 类似Redis Key-Value结构，统一管理所有游戏状态
 * 映射自原6502内存布局:
 *   $0000-$00FF: 零页变量 (Zero Page)
 *   $0100-$01FF: 堆栈 (Stack)
 *   $0200-$02FF: OAM DMA缓冲区
 *   $0300-$03FF: 系统变量区
 *   $0400-$05FF: 游戏逻辑区
 *   $0600-$07FF: Bank 6 专属区
 * 
 * 额外: VRAM Nametable (4×1024B), 调色板 (32B)
 */

import {
  GameState, BUTTON, SpriteEntry,
  SCREEN_WIDTH, SCREEN_HEIGHT,
  NT_WIDTH, NT_HEIGHT, TILE_SIZE,
  SPRITE_COUNT, PALETTE_SIZE,
} from '../core/types';

/** 初始化后的OAM条目 (用于填充未使用精灵) */
const EMPTY_SPRITE: SpriteEntry = { y: 0xFF, tileIndex: 0xFF, attr: 0xFF, x: 0xFF };

export class DataStore {
  // ==================== 零页指针 ($0000-$000F) ====================
  /** 通用16位指针 ram_0000-0001 */
  ptr00L: number = 0;
  ptr00H: number = 0;
  /** 通用16位指针 ram_0002-0003 */
  ptr02L: number = 0;
  ptr02H: number = 0;
  /** 通用16位指针 ram_0004-0005 */
  ptr04L: number = 0;
  ptr04H: number = 0;
  /** 通用16位指针 ram_0006-0007 */
  ptr06L: number = 0;
  ptr06H: number = 0;
  /** 通用计数器 ram_0008-000F */
  counter08: number = 0;
  counter09: number = 0;
  counter0A: number = 0;
  counter0B: number = 0;
  counter0C: number = 0;
  counter0D: number = 0;
  counter0E: number = 0;
  counter0F: number = 0;

  // ==================== PPU寄存器镜像 ($0010-$001F) ====================
  ppuAddrL: number = 0;     // $0010: PPU地址低字节
  ppuAddrH: number = 0;     // $0011: PPU地址高字节
  ppuPtrL: number = 0;      // $0012: PPU数据指针低
  ppuPtrH: number = 0;      // $0013: PPU数据指针高
  ppuPtr2L: number = 0;     // $0014: 第二PPU指针低
  ppuPtr2H: number = 0;     // $0015: 第二PPU指针高
  scrollX: number = 0;      // $0016: PPU滚动X
  scrollY: number = 0;      // $0017: PPU滚动Y
  ppuMask: number = 0x06;   // $0018: PPU $2001 镜像 (初始=$06)
  ppuCtrl: number = 0x10;   // $0019: PPU $2000 镜像 (初始=$10)
  chrBank0: number = 0;     // $001A: CHR Bank 0 选择
  chrBank1: number = 0;     // $001B: CHR Bank 1 选择
  prgBank: number = 0;      // $001C: PRG Bank 选择
  mmcCtrl: number = 0;      // $001D: MMC1控制寄存器
  temp1E: number = 0;       // $001E: 临时变量
  temp1F: number = 0;       // $001F: 临时变量

  // ==================== 通用零页工作区 ($0020-$007F) ====================
  private _zpWork: Uint8Array = new Uint8Array(0x60);  // $0020-$007F (96B)
  
  getZP(addr: number): number {
    const idx = addr - 0x20;
    return (idx >= 0 && idx < this._zpWork.length) ? this._zpWork[idx] : 0;
  }
  setZP(addr: number, val: number): void {
    const idx = addr - 0x20;
    if (idx >= 0 && idx < this._zpWork.length) {
      this._zpWork[idx] = val & 0xFF;
    }
  }

  // ==================== Bank切换锁 ($0093) ====================
  bankLock: number = 0;  // 0=允许切换, 非0=锁定

  // ==================== 堆栈 ($0100-$01FF) ====================
  stackPointer: number = 0xFF;  // SP初始=$FF
  private _stack: Uint8Array = new Uint8Array(0x100);
  
  pushStack(val: number): void {
    this._stack[this.stackPointer] = val & 0xFF;
    this.stackPointer = (this.stackPointer - 1) & 0xFF;
  }
  popStack(): number {
    this.stackPointer = (this.stackPointer + 1) & 0xFF;
    return this._stack[this.stackPointer];
  }

  // ==================== OAM缓冲区 ($0200-$02FF) ====================
  private _oamRaw: Uint8Array = new Uint8Array(256);
  
  /** 获取OAM条目 (按4字节分组) */
  getSprite(index: number): SpriteEntry {
    const offset = index * 4;
    return {
      y: this._oamRaw[offset],
      tileIndex: this._oamRaw[offset + 1],
      attr: this._oamRaw[offset + 2],
      x: this._oamRaw[offset + 3],
    };
  }
  
  /** 设置OAM条目 */
  setSprite(index: number, entry: SpriteEntry): void {
    const offset = index * 4;
    this._oamRaw[offset]     = entry.y & 0xFF;
    this._oamRaw[offset + 1] = entry.tileIndex & 0xFF;
    this._oamRaw[offset + 2] = entry.attr & 0xFF;
    this._oamRaw[offset + 3] = entry.x & 0xFF;
  }
  
  /** 清除所有OAM (填充$FF) */
  clearOam(): void {
    this._oamRaw.fill(0xFF);
  }
  
  /** 获取原始OAM字节数组 */
  getOamRaw(): Uint8Array {
    return this._oamRaw;
  }
  
  /** OAM DMA写入 (从指定偏移写入256字节) */
  oamDma(data: Uint8Array): void {
    for (let i = 0; i < 256; i++) {
      this._oamRaw[i] = data[i] ?? 0xFF;
    }
  }

  // ==================== 系统变量区 ($0300-$03FF) ====================
  frameCounter: number = 0;     // $0300: NMI帧计数
  joy1Cur: number = 0;          // $0301: Joy1当前帧
  joy2Cur: number = 0;          // $0302: Joy2当前帧
  joy1Prev: number = 0;         // $0303: Joy1前一帧
  joy2Prev: number = 0;         // $0304: Joy2前一帧
  ppuQueueCount: number = 0;    // $0305: PPU队列条目数
  private _ppuQueue: Uint8Array = new Uint8Array(0x33);  // $0306-$0338 (51B)
  vramBufferFlag: number = 0;   // $0339: VRAM缓冲区活动标志
  private _vramBuffer: Uint8Array = new Uint8Array(0xC7); // $033A-$03FF (199B)
  
  /** 调色板缓冲区 ($0318-$0337, 32B) */
  paletteBuffer: Uint8Array = new Uint8Array(32);
  
  /** 获取PPU队列条目数据 */
  getPpuQueueData(): Uint8Array { return this._ppuQueue; }
  setPpuQueueByte(offset: number, val: number): void {
    if (offset < this._ppuQueue.length) this._ppuQueue[offset] = val & 0xFF;
  }
  getPpuQueueByte(offset: number): number {
    return (offset < this._ppuQueue.length) ? this._ppuQueue[offset] : 0;
  }
  
  /** VRAM缓冲区操作 */
  getVramBuffer(): Uint8Array { return this._vramBuffer; }
  setVramBufferByte(offset: number, val: number): void {
    if (offset < this._vramBuffer.length) this._vramBuffer[offset] = val & 0xFF;
  }
  getVramBufferByte(offset: number): number {
    return (offset < this._vramBuffer.length) ? this._vramBuffer[offset] : 0;
  }

  // ==================== 游戏状态变量 ($03C0-$03FF) ====================
  gameState: GameState = GameState.OPENING;  // $03CA: 主状态
  subState: number = 0;                      // $03CB: 子状态
  subState2: number = 0;                     // $03CC: 子状态2
  matchSubState: number = 0;                 // $03E3: 比赛子状态
  matchSubState2: number = 0;                // $03E4: 比赛子状态2
  transCounter: number = 0;                  // $03E5: 状态转换计数器
  
  private _ram03xx: Uint8Array = new Uint8Array(0x40); // $03C0-$03FF
  
  get03xx(addr: number): number {
    const idx = addr - 0x3C0;
    return (idx >= 0 && idx < this._ram03xx.length) ? this._ram03xx[idx] : 0;
  }
  set03xx(addr: number, val: number): void {
    const idx = addr - 0x3C0;
    if (idx >= 0 && idx < this._ram03xx.length) {
      this._ram03xx[idx] = val & 0xFF;
    }
  }
  
  /** 便捷读写 $03xx 映射到高优先级字段 */
  read03xx(addr: number): number {
    switch (addr) {
      case 0x3CA: return this.gameState;
      case 0x3CB: return this.subState;
      case 0x3CC: return this.subState2;
      case 0x3E3: return this.matchSubState;
      case 0x3E4: return this.matchSubState2;
      case 0x3E5: return this.transCounter;
      default: return this.get03xx(addr);
    }
  }
  write03xx(addr: number, val: number): void {
    switch (addr) {
      case 0x3CA: this.gameState = val; break;
      case 0x3CB: this.subState = val; break;
      case 0x3CC: this.subState2 = val; break;
      case 0x3E3: this.matchSubState = val; break;
      case 0x3E4: this.matchSubState2 = val; break;
      case 0x3E5: this.transCounter = val; break;
      default: this.set03xx(addr, val);
    }
  }

  // ==================== 游戏逻辑区 ($0400-$05FF) ====================
  private _ram04xx: Uint8Array = new Uint8Array(0x200); // $0400-$05FF (512B)
  
  get04xx(addr: number): number {
    const idx = addr - 0x400;
    return (idx >= 0 && idx < this._ram04xx.length) ? this._ram04xx[idx] : 0;
  }
  set04xx(addr: number, val: number): void {
    const idx = addr - 0x400;
    if (idx >= 0 && idx < this._ram04xx.length) {
      this._ram04xx[idx] = val & 0xFF;
    }
  }
  
  // 比赛关键变量
  get scoreA(): number { return this.get04xx(0x5E0); }
  set scoreA(v: number) { this.set04xx(0x5E0, v); }
  get scoreB(): number { return this.get04xx(0x5E1); }
  set scoreB(v: number) { this.set04xx(0x5E1, v); }
  get matchFlags(): number { return this.get04xx(0x5EF); }
  set matchFlags(v: number) { this.set04xx(0x5EF, v); }

  // ==================== Bank 6 专属区 ($0600-$07FF) ====================
  private _ram06xx: Uint8Array = new Uint8Array(0x200); // $0600-$07FF (512B)
  
  get06xx(addr: number): number {
    const idx = addr - 0x600;
    return (idx >= 0 && idx < this._ram06xx.length) ? this._ram06xx[idx] : 0;
  }
  set06xx(addr: number, val: number): void {
    const idx = addr - 0x600;
    if (idx >= 0 && idx < this._ram06xx.length) {
      this._ram06xx[idx] = val & 0xFF;
    }
  }
  
  get matchPhase(): number { return this.get06xx(0x64F); }
  set matchPhase(v: number) { this.set06xx(0x64F, v); }

  // ==================== VRAM Nametables ====================
  /** Nametable 0 ($2000-$23FF): 960B tiles + 64B attribute */
  nametable0: Uint8Array = new Uint8Array(1024);
  /** Nametable 1 ($2400-$27FF) */
  nametable1: Uint8Array = new Uint8Array(1024);
  /** Nametable 2 ($2800-$2BFF) */
  nametable2: Uint8Array = new Uint8Array(1024);
  /** Nametable 3 ($2C00-$2FFF) */
  nametable3: Uint8Array = new Uint8Array(1024);
  
  /** 调色板RAM ($3F00-$3F1F) */
  paletteRam: Uint8Array = new Uint8Array(32);

  // ==================== MMC1 Bank 状态 ====================
  currentPrgBank: number = 0;   // 当前PRG Bank (0-7)
  currentChrBank0: number = 0;  // 当前CHR Bank 0 ($0000-$0FFF)
  currentChrBank1: number = 0;  // 当前CHR Bank 1 ($1000-$1FFF)
  mmcShiftReg: number = 0x10;   // MMC1移位寄存器
  
  // ==================== 随机数发生器 ====================
  randomSeed: number = 0;
  
  // ==================== 初始化方法 ====================

  /** 完全重置 (模拟RESET) */
  reset(): void {
    // 零页清零
    this.ptr00L = this.ptr00H = 0;
    this.ptr02L = this.ptr02H = 0;
    this.ptr04L = this.ptr04H = 0;
    this.ptr06L = this.ptr06H = 0;
    for (let i = 8; i <= 0xF; i++) this._setCounter(i, 0);
    
    // PPU镜像
    this.ppuMask = 0x06;
    this.ppuCtrl = 0x10;
    this.scrollX = this.scrollY = 0;
    this.chrBank0 = this.chrBank1 = 0;
    this.prgBank = 0;
    
    // 零页工作区
    this._zpWork.fill(0);
    this._zpWork[0x80 - 0x20] = 0xFF;  // 某些初始化特定值
    
    // 堆栈
    this.stackPointer = 0xFF;
    this._stack.fill(0);
    
    // OAM
    this.clearOam();
    
    // 系统变量
    this.frameCounter = 0;
    this.joy1Cur = this.joy2Cur = 0;
    this.joy1Prev = this.joy2Prev = 0;
    this.ppuQueueCount = 0;
    this._ppuQueue.fill(0);
    this.vramBufferFlag = 0;
    this._vramBuffer.fill(0);
    this.paletteBuffer.fill(0);
    
    // 游戏状态
    this.gameState = GameState.OPENING;
    this.subState = 0;
    this.subState2 = 0;
    this.matchSubState = 0;
    this.matchSubState2 = 0;
    this.transCounter = 0;
    this._ram03xx.fill(0);
    this._ram04xx.fill(0);
    this._ram06xx.fill(0);
    this.bankLock = 0;
    
    // VRAM
    this.nametable0.fill(0);
    this.nametable1.fill(0);
    this.nametable2.fill(0);
    this.nametable3.fill(0);
    this.paletteRam.fill(0);
    
    // MMC1
    this.currentPrgBank = 0;
    this.currentChrBank0 = 0;
    this.currentChrBank1 = 0;
    this.mmcShiftReg = 0x10;
    
    // 随机数
    this.randomSeed = 0;
  }

  // ==================== 便捷方法 ====================

  /** 获取16位指针值 (ram_0000/0001) */
  getPtr00(): number { return this.ptr00L | (this.ptr00H << 8); }
  setPtr00(val: number): void {
    this.ptr00L = val & 0xFF;
    this.ptr00H = (val >> 8) & 0xFF;
  }
  
  /** 获取16位指针值 (ram_0002/0003) */
  getPtr02(): number { return this.ptr02L | (this.ptr02H << 8); }
  setPtr02(val: number): void {
    this.ptr02L = val & 0xFF;
    this.ptr02H = (val >> 8) & 0xFF;
  }
  
  /** 获取16位指针值 (ram_0004/0005) */
  getPtr04(): number { return this.ptr04L | (this.ptr04H << 8); }
  setPtr04(val: number): void {
    this.ptr04L = val & 0xFF;
    this.ptr04H = (val >> 8) & 0xFF;
  }
  
  /** 获取PPU地址 (ram_0010/0011) */
  getPpuAddr(): number { return this.ppuAddrL | (this.ppuAddrH << 8); }
  
  /** 获取PPU指针 (ram_0012/0013) */
  getPpuPtr(): number { return this.ppuPtrL | (this.ppuPtrH << 8); }
  setPpuPtr(val: number): void {
    this.ppuPtrL = val & 0xFF;
    this.ppuPtrH = (val >> 8) & 0xFF;
  }
  
  /** 获取第二个PPU指针 (ram_0014/0015) */
  getPpuPtr2(): number { return this.ppuPtr2L | (this.ppuPtr2H << 8); }
  
  /** 获取当前按键的边沿检测值 (按下的瞬间) */
  get joy1Edge(): number { return this.joy1Cur & (~this.joy1Prev & 0xFF); }
  get joy2Edge(): number { return this.joy2Cur & (~this.joy2Prev & 0xFF); }
  
  /** 保存当前帧手柄状态到前一帧 */
  latchInput(): void {
    this.joy1Prev = this.joy1Cur;
    this.joy2Prev = this.joy2Cur;
  }

  // ==================== 调试辅助 ====================

  /** 获取调试快照 */
  getDebugSnapshot(): import('../core/types').DebugSnapshot {
    return {
      frame: this.frameCounter,
      gameState: this.gameState,
      gameStateName: GameState[this.gameState] ?? 'UNKNOWN',
      subState: this.subState,
      scoreA: this.scoreA,
      scoreB: this.scoreB,
      matchPhase: this.matchPhase,
      ppuQueueEntries: this.ppuQueueCount,
      oamSprites: this.getActiveSpriteCount(),
      joy1: this.joy1Cur,
      joy2: this.joy2Cur,
    };
  }
  
  /** 获取活跃精灵数量 (Y != $FF) */
  getActiveSpriteCount(): number {
    let count = 0;
    for (let i = 0; i < SPRITE_COUNT; i++) {
      if (this._oamRaw[i * 4] !== 0xFF) count++;
    }
    return count;
  }

  // ==================== 内部辅助 ====================
  
  private _setCounter(idx: number, val: number): void {
    switch (idx) {
      case 8: this.counter08 = val; break;
      case 9: this.counter09 = val; break;
      case 0xA: this.counter0A = val; break;
      case 0xB: this.counter0B = val; break;
      case 0xC: this.counter0C = val; break;
      case 0xD: this.counter0D = val; break;
      case 0xE: this.counter0E = val; break;
      case 0xF: this.counter0F = val; break;
    }
  }
}
