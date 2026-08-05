/**
 * 天使之翼1 — PPU更新队列系统
 * 对应原 Bank 0: $812F-$81B8 (ProcessPpuQueue)
 * 
 * 双缓冲架构:
 *   1. 动态队列 ($0306-$0338): 每帧处理，格式 [ptr_L][ptr_H] 指向数据
 *   2. 静态缓冲区 ($033A-$03FF): 格式 [count][addrH][addrL][data...][0=end]
 * 
 * 数据格式 (队列条目指向的数据):
 *   [count][addrL][addrH][data1][data2]...[dataN]...[0=end]
 *   多个块连续存放，遇到 count=0 表示结束
 */

import { DataStore } from '../data/DataStore';

export interface VramWrite {
  addr: number;        // VRAM地址 ($0000-$3FFF)
  data: number[];      // 写入的字节
}

export class PpuQueue {
  private ds: DataStore;
  
  /** 收集到的本帧VRAM写入操作 (调试用) */
  private _pendingWrites: VramWrite[] = [];
  
  constructor(ds: DataStore) {
    this.ds = ds;
  }
  
  // ==================== 队列添加 (对应 $8471 QueuePpuUpdate) ====================
  
  /**
   * 将数据加入PPU更新队列
   * 对应原始: $8471 (QueuePpuUpdate)
   * 输入: ram_0012/0013 → 数据地址 (在ROM中)
   * 功能: 将指针加入 $0306-$0338 队列
   */
  queueUpdate(dataAddrL: number, dataAddrH: number): void {
    const count = this.ds.ppuQueueCount;
    if (count >= 0x19) return; // 队列满 (最多25个条目, 每个2字节 → 50字节)
    
    this.ds.setPpuQueueByte(count * 2, dataAddrL);
    this.ds.setPpuQueueByte(count * 2 + 1, dataAddrH);
    this.ds.ppuQueueCount = count + 1;
  }
  
  // ==================== 静态缓冲区添加 (对应 $84A3 QueueStaticVram) ====================
  
  /**
   * 将数据加入静态VRAM缓冲区
   * 对应原始: $84A3 (QueueStaticVram)
   * 输入: ram_033A-$03FF 已有数据，追加新块
   */
  queueStaticVram(count: number, addrHi: number, addrLo: number, data: number[]): void {
    // 找到缓冲区末尾 (下一个count=0的位置)
    let offset = 0;
    const buf = this.ds.getVramBuffer();
    
    // 跳过已有的块
    while (offset < buf.length - 4) {
      const cnt = buf[offset];
      if (cnt === 0) break;
      // 跳过: count(1) + addrH(1) + addrL(1) + data(cnt)
      offset += 3 + cnt;
    }
    
    if (offset + 3 + count > buf.length) {
      console.warn('[PpuQueue] 静态缓冲区溢出');
      return;
    }
    
    // 写入块头
    buf[offset] = count & 0xFF;
    buf[offset + 1] = addrHi & 0xFF;
    buf[offset + 2] = addrLo & 0xFF;
    
    // 写入数据
    for (let i = 0; i < count; i++) {
      buf[offset + 3 + i] = data[i] & 0xFF;
    }
    
    // 写入结束标记
    if (offset + 3 + count < buf.length) {
      buf[offset + 3 + count] = 0;
    }
    
    this.ds.vramBufferFlag = 1; // 标记有数据待处理
  }
  
  // ==================== 队列处理 (对应 $812F ProcessPpuQueue) ====================
  
  /**
   * 处理PPU更新队列
   * 每帧NMI中调用，从动态队列和静态缓冲区中取出数据写入VRAM
   * 
   * 对应原始:
   *   $812F: LDX ram_0305 → BEQ $8154 (处理动态队列)
   *   $8154: LDA ram_0339 → BEQ $8189 (处理静态缓冲区)
   *   $8150: JSR $833A (设置PPU滚动)
   */
  processFrame(romReader: (addr: number) => number): VramWrite[] {
    this._pendingWrites = [];
    
    // 1. 处理动态队列
    this._processDynamicQueue(romReader);
    
    // 2. 处理静态缓冲区
    this._processStaticBuffer();
    
    // 3. 设置滚动 (由调用方处理，这里只做VRAM写入)
    
    return this._pendingWrites;
  }
  
  /**
   * 处理动态队列条目
   * 对应原始: $8134-$8153
   */
  private _processDynamicQueue(romReader: (addr: number) => number): void {
    while (this.ds.ppuQueueCount > 0) {
      this.ds.ppuQueueCount--;
      const idx = this.ds.ppuQueueCount;
      
      // 读取指针
      const ptrL = this.ds.getPpuQueueByte(idx * 2);
      const ptrH = this.ds.getPpuQueueByte(idx * 2 + 1);
      const dataAddr = ptrL | (ptrH << 8);
      
      // 从ROM读取数据块
      this._processDataBlock(dataAddr, romReader);
    }
  }
  
  /**
   * 处理静态缓冲区
   * 对应原始: $8154-$818C
   */
  private _processStaticBuffer(): void {
    if (this.ds.vramBufferFlag === 0) return;
    
    const buf = this.ds.getVramBuffer();
    let offset = 0;
    
    while (offset < buf.length) {
      const count = buf[offset];
      if (count === 0) break;
      
      const addrLo = buf[offset + 1];
      const addrHi = buf[offset + 2];
      const vramAddr = addrLo | (addrHi << 8);
      
      const data: number[] = [];
      for (let i = 0; i < count; i++) {
        data.push(buf[offset + 3 + i]);
      }
      
      this._writeToVram(vramAddr, data);
      
      // 清零count (标记已处理)
      buf[offset] = 0;
      offset += 3 + count;
    }
    
    this.ds.vramBufferFlag = 0;
  }
  
  /**
   * 处理一个数据块
   * 格式: [count][addrL][addrH][data...][0=end]
   */
  private _processDataBlock(startAddr: number, romReader: (addr: number) => number): void {
    let addr = startAddr;
    
    while (true) {
      const count = romReader(addr);
      if (count === 0) break;
      
      addr++;
      const addrLo = romReader(addr);
      addr++;
      const addrHi = romReader(addr);
      addr++;
      
      const vramAddr = addrLo | (addrHi << 8);
      
      const data: number[] = [];
      for (let i = 0; i < count; i++) {
        data.push(romReader(addr));
        addr++;
      }
      
      this._writeToVram(vramAddr, data);
    }
  }
  
  /**
   * 写入VRAM (Nametable 或 Palette)
   */
  private _writeToVram(vramAddr: number, data: number[]): void {
    // 记录写入操作
    this._pendingWrites.push({ addr: vramAddr, data: [...data] });
    
    const addr = vramAddr & 0x3FFF;
    
    // 判断目标
    if (addr >= 0x3F00 && addr < 0x3F20) {
      // 调色板RAM
      const palOffset = addr & 0x1F;
      for (let i = 0; i < data.length; i++) {
        const idx = palOffset + i;
        if (idx < 32) {
          this.ds.paletteRam[idx] = data[i];
        }
      }
      // 镜像 (背景色的镜像地址)
      if ((palOffset & 0x03) === 0) {
        for (let i = 0; i < data.length; i++) {
          const idx = palOffset + i;
          if ((idx & 0x03) === 0 && idx >= 0x10) {
            this.ds.paletteRam[idx - 0x10] = data[i];
          }
        }
      }
    } else if (addr < 0x2000) {
      // Pattern Table (CHR写入 — 本游戏使用CHR ROM，通常不写)
      // 忽略 (但为CHR-RAM情况预留)
    } else {
      // Nametable ($2000-$2FFF)
      let nt: Uint8Array;
      const ntIndex = (addr >> 10) & 0x03;
      switch (ntIndex) {
        case 0: nt = this.ds.nametable0; break;
        case 1: nt = this.ds.nametable1; break;
        case 2: nt = this.ds.nametable2; break;
        case 3: nt = this.ds.nametable3; break;
        default: return;
      }
      
      const ntOffset = addr & 0x3FF;
      for (let i = 0; i < data.length; i++) {
        if (ntOffset + i < nt.length) {
          nt[ntOffset + i] = data[i];
        }
      }
    }
  }
  
  // ==================== 便捷API ====================
  
  /**
   * 加载32字节调色板数据
   * 对应原始: $841F (LoadPaletteData)
   * 从数据表加载32字节到 paletteBuffer ($0318)
   */
  loadPaletteData(dataAddr: number, romReader: (addr: number) => number): void {
    for (let i = 0; i < 32; i++) {
      this.ds.paletteBuffer[i] = romReader(dataAddr + i);
    }
  }
  
  /**
   * 将 paletteBuffer 的数据写入 PPU Palette RAM
   * 对应原始: $8468 (LoadPalette)
   */
  loadPaletteToPpu(): void {
    // Palette写入 $3F00
    this._writeToVram(0x3F00, Array.from(this.ds.paletteBuffer));
  }
  
  /**
   * 设置PPU滚动寄存器
   * 对应原始: $833A
   */
  setScroll(): void {
    // 在真实NES中写 $2005 两次和 $2000 一次
    // 在我们的Canvas渲染中，直接使用 ds.scrollX/ds.scrollY
    // 不需要模拟硬件寄存器写入
    
    // 为了保持兼容性，可以读 PPU status
    // (原始代码: LDA $2002 → LDA scrollY → STA $2005 → LDA scrollX → STA $2005 → LDA ppuCtrl → STA $2000)
  }
  
  /** 获取本帧的VRAM写入列表 (调试用) */
  getPendingWrites(): VramWrite[] {
    return this._pendingWrites;
  }
}
