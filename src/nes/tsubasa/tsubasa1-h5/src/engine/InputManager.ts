/**
 * 天使之翼1 — 手柄输入管理
 * 对应原 Bank 0: $81B9-$81ED (读取手柄输入)
 * 
 * 手柄按键位 (标准NES手柄):
 *   bit7=A, bit6=B, bit5=Select, bit4=Start
 *   bit3=↑, bit2=↓, bit1=←, bit0=→
 */

import { DataStore } from '../data/DataStore';
import { BUTTON } from '../core/types';

/** 单个手柄的16次移位读取结果 */
interface JoypadState {
  strobe: boolean;       // 锁存状态
  readIndex: number;     // 当前读取位 (0-7)
  buttons: number;       // 当前按键状态 (8位)
}

export class InputManager {
  private ds: DataStore;
  
  /** 物理按键状态 (由外部设置) */
  private _joy1Physical: number = 0;
  private _joy2Physical: number = 0;
  
  /** 模拟 $4016/$4017 串行读取状态 */
  private _joy1Strobe: JoypadState = { strobe: false, readIndex: 0, buttons: 0 };
  private _joy2Strobe: JoypadState = { strobe: false, readIndex: 0, buttons: 0 };
  
  /** 是否为AI自动模式 */
  private _aiMode: boolean = false;
  /** AI设置的按键值 */
  private _aiJoy1: number = 0;
  private _aiJoy2: number = 0;
  
  constructor(ds: DataStore) {
    this.ds = ds;
  }
  
  // ==================== 外部API (供页面/键盘/触摸调用) ====================
  
  /** 设置1P按键 (位掩码) */
  setJoy1Buttons(buttons: number): void {
    this._joy1Physical = buttons & 0xFF;
  }
  
  /** 设置2P按键 (位掩码) */
  setJoy2Buttons(buttons: number): void {
    this._joy2Physical = buttons & 0xFF;
  }
  
  /** 按下单个按键 */
  pressJoy1(button: keyof typeof BUTTON): void {
    this._joy1Physical |= BUTTON[button];
  }
  
  /** 释放单个按键 */
  releaseJoy1(button: keyof typeof BUTTON): void {
    this._joy1Physical &= ~BUTTON[button];
  }
  
  /** 清空所有按键 */
  clearAll(): void {
    this._joy1Physical = 0;
    this._joy2Physical = 0;
  }
  
  // ==================== AI模式 ====================
  
  /** 开启AI自动模式 */
  enableAi(): void { this._aiMode = true; }
  
  /** 关闭AI自动模式 */
  disableAi(): void { this._aiMode = false; }
  
  /** AI设置虚拟按键 */
  setAiButtons(joy1: number, joy2: number = 0): void {
    this._aiJoy1 = joy1 & 0xFF;
    this._aiJoy2 = joy2 & 0xFF;
  }
  
  /** 获取当前生效的1P按键 (根据模式返回物理或AI按键) */
  private get effectiveJoy1(): number {
    return this._aiMode ? this._aiJoy1 : this._joy1Physical;
  }
  
  private get effectiveJoy2(): number {
    return this._aiMode ? this._aiJoy2 : this._joy2Physical;
  }
  
  // ==================== 模拟 $4016/$4017 读取 ====================
  
  /**
   * 写入 $4016 (手柄锁存)
   * 写入1→锁存，写入0→释放锁存开始读取
   */
  write4016(val: number): void {
    const strobe = (val & 1) !== 0;
    
    if (strobe) {
      // 锁存: 捕获当前按键状态
      this._joy1Strobe.strobe = true;
      this._joy1Strobe.readIndex = 0;
      this._joy1Strobe.buttons = this.effectiveJoy1;
      
      this._joy2Strobe.strobe = true;
      this._joy2Strobe.readIndex = 0;
      this._joy2Strobe.buttons = this.effectiveJoy2;
    } else {
      this._joy1Strobe.strobe = false;
      this._joy2Strobe.strobe = false;
    }
  }
  
  /**
   * 读取 $4016 (Joy1) 或 $4017 (Joy2)
   * 每次读取返回当前位的值 (bit0)
   */
  readJoypad(port: 0 | 1): number {
    const state = port === 0 ? this._joy1Strobe : this._joy2Strobe;
    
    if (state.strobe) {
      // 锁存期间持续返回 A 按钮状态
      return (state.buttons >> 7) & 1;  // bit7 = A
    }
    
    // 正常读取: 每次读取一位
    const bit = (state.buttons >> state.readIndex) & 1;
    
    if (state.readIndex < 7) {
      state.readIndex++;
    }
    // 读满8位后保持返回0
    
    return bit;
  }
  
  // ==================== 每帧处理 (对应 $81B9-$81ED) ====================
  
  /**
   * 标准手柄读取流程
   * 对应原始代码:
   *   LDA ram_0301 → PHA
   *   LDA ram_0302 → PHA
   *   LDX #$01 → STX $4016  (锁存)
   *   DEX → STX $4016       (释放)
   *   JSR ReadJoy1 (X=0)
   *   INX → JSR ReadJoy2 (X=1)
   *   交换 Prev/Cur
   */
  processFrame(): void {
    // 保存前一帧状态
    this.ds.joy1Prev = this.ds.joy1Cur;
    this.ds.joy2Prev = this.ds.joy2Cur;
    
    // 锁存+释放
    this.write4016(1);
    this.write4016(0);
    
    // 读取 Joy1 (8次)
    let joy1Val = 0;
    for (let i = 0; i < 8; i++) {
      const bit = this.readJoypad(0);
      joy1Val = (joy1Val >> 1) | (bit << 7);
    }
    // NES原始读取顺序是 bit0→bit1→...→bit7 通过 ROL 构建
    // 但我们直接赋值
    this.ds.joy1Cur = joy1Val & 0xFF;
    
    // 读取 Joy2 (8次)
    let joy2Val = 0;
    for (let i = 0; i < 8; i++) {
      const bit = this.readJoypad(1);
      joy2Val = (joy2Val >> 1) | (bit << 7);
    }
    this.ds.joy2Cur = joy2Val & 0xFF;
    
    // 注意: 原始代码中读取的字节直接存入 ram_0301/0302
    // 然后交换 Prev/Cur。这里我们保留 Cur 作为当前值。
  }
  
  // ==================== 便捷按键检测 ====================
  
  /** 检测按键是否被按下 (当前帧) */
  isPressed(button: number): boolean {
    return (this.effectiveJoy1 & button) !== 0;
  }
  
  /** 检测按键边沿 (刚按下的瞬间) */
  isPressedEdge(button: number): boolean {
    const cur = this.effectiveJoy1 & button;
    const prev = this.ds.joy1Prev & button;
    return cur !== 0 && prev === 0;
  }
  
  /** 检测任意方向键 */
  isAnyDirection(): boolean {
    return (this.effectiveJoy1 & (BUTTON.UP | BUTTON.DOWN | BUTTON.LEFT | BUTTON.RIGHT)) !== 0;
  }
}
