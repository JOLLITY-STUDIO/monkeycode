/**
 * 随机数生成器 - 替代6502的软件RNG
 * 对应原始 ROM 中 $82AD-$82CB 的随机数生成逻辑
 *
 * 原始算法:
 *   INC $05BA
 *   LDX $05BA
 *   LDA $0300,X    ; 使用帧计数作为索引读取
 *   SEC
 *   ADC $05BB
 *   STA $05BB
 *   移位操作...
 */

export class RngGenerator {
  /** 随机数种子低字节 ($05BA) */
  private seedLo: number = 0;

  /** 随机数种子高字节 ($05BB) */
  private seedHi: number = 0;

  /** 帧计数引用 (外部提供) */
  private getFrameCount: () => number;

  /** 额外熵源 */
  private entropyPool: number[];

  constructor(getFrameCount: () => number) {
    this.getFrameCount = getFrameCount;
    this.entropyPool = [];
    this.seed();
  }

  /** 初始化种子 */
  seed(): void {
    this.seedLo = Date.now() & 0xFF;
    this.seedHi = (Date.now() >> 8) & 0xFF;
    // 用帧计数做额外混淆
    const fc = this.getFrameCount();
    this.seedLo ^= fc & 0xFF;
    this.seedHi ^= (fc >> 8) & 0xFF;
  }

  /** 添加熵 */
  addEntropy(value: number): void {
    this.entropyPool.push(value & 0xFF);
    if (this.entropyPool.length > 32) {
      this.entropyPool.shift();
    }
  }

  /**
   * 模拟每帧随机数更新
   * 返回新的随机字节
   */
  update(): number {
    this.seedLo = (this.seedLo + 1) & 0xFF;

    // 使用帧计数 + 熵池
    const fc = this.getFrameCount() & 0xFF;
    const entIdx = this.seedLo % this.entropyPool.length || 0;
    const entVal = this.entropyPool.length > 0 ? this.entropyPool[entIdx] : fc;

    // 混合: seedHi = seedHi + memory[seedLo] (使用帧计数和熵池混合)
    const memoryVal = (fc + entVal + this.seedLo) & 0xFF;
    this.seedHi = (this.seedHi + memoryVal) & 0xFF;

    // 执行原始移位操作
    let temp = this.seedHi;
    const bits = (temp - memoryVal) & 0x07;

    for (let i = 0; i <= bits; i++) {
      const carry = temp & 0x01;
      temp = ((temp >> 1) | (carry << 7)) & 0xFF;
    }

    return temp;
  }

  /** 获取范围 [0, max) 的随机整数 */
  nextInt(max: number): number {
    const val = this.update();
    return val % max;
  }

  /** 获取范围 [0, 1) 的随机浮点数 */
  nextFloat(): number {
    return this.update() / 256;
  }

  /** 获取当前种子状态 */
  getState(): { lo: number; hi: number } {
    return { lo: this.seedLo, hi: this.seedHi };
  }
}
