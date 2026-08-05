/**
 * 天使之翼1 — ROM读取桥接器
 * 连接PRG Bank数据与游戏内核
 * 
 * CPU地址空间映射:
 *   $8000-$BFFF: 可切换PRG Bank (通过MMC1控制)
 *   $C000-$FFFF: 固定为Bank 7
 */
export class RomReader {
  /** PRG Bank数据 */
  private _banks: (Uint8Array | null)[] = [null, null, null, null, null, null, null, null];
  
  /** 当前活动的PRG Bank */
  private _currentBank: number = 0;
  
  /** 加载PRG Bank数据 */
  loadBank(bankId: number, data: Uint8Array): void {
    if (bankId >= 0 && bankId < 8) {
      this._banks[bankId] = data;
    }
  }
  
  /** 设置当前PRG Bank */
  setCurrentBank(bankId: number): void {
    this._currentBank = bankId & 0x07;
  }
  
  /**
   * 从CPU地址读取字节
   * @param cpuAddr CPU地址 ($8000-$FFFF)
   */
  read(cpuAddr: number): number {
    if (cpuAddr < 0x8000 || cpuAddr > 0xFFFF) {
      return 0;
    }
    
    const bankId = (cpuAddr >= 0xC000) ? 7 : this._currentBank;
    const offset = cpuAddr & 0x3FFF;
    const bank = this._banks[bankId];
    
    return bank?.[offset] ?? 0;
  }
  
  /**
   * 从CPU地址读取16位值 (little-endian)
   */
  read16(cpuAddr: number): number {
    const lo = this.read(cpuAddr);
    const hi = this.read(cpuAddr + 1);
    return lo | (hi << 8);
  }
  
  /**
   * 检查Bank是否已加载
   */
  isBankLoaded(bankId: number): boolean {
    return this._banks[bankId] !== null;
  }
  
  /**
   * 获取Bank原始数据 (用于内部读取)
   */
  getBankData(bankId: number): Uint8Array | null {
    return this._banks[bankId] ?? null;
  }
}

/** 全局RomReader单例 */
let _romReader: RomReader | null = null;

export function getRomReader(): RomReader {
  if (!_romReader) {
    _romReader = new RomReader();
  }
  return _romReader;
}
