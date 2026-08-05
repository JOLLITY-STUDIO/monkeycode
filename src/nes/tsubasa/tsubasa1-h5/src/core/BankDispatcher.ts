/**
 * 天使之翼1 — Bank调度器
 * 对应原 Bank 0: $84D2 (跨Bank函数调度)
 * 
 * 参数编码规则:
 *   LDA #$XY
 *   JSR $84D2
 *   
 *   其中:
 *     X (bit7-4) = PRG Bank 编号
 *     Y (bit3-0) = Sub-function 编号 (Bank内部的子入口)
 * 
 * 示例:
 *   LDA #$10 → Bank 1, Sub 0 (开场动画)
 *   LDA #$5D → Bank 5, Sub 13 (标题画面)
 *   LDA #$60 → Bank 6, Sub 0 (菜单)
 *   LDA #$63 → Bank 6, Sub 3 (事件)
 *   LDA #$61 → Bank 6, Sub 1 (结果)
 * 
 * MMC1 Bank切换:
 *   写入 $8000-$9FFF (偶地址): 连续5次写入，每次bit0组成5位命令
 *   PRG Mode 2: $8000-$BFFF 可切换, $C000-$FFFF 固定为Bank 7
 */

import { DataStore } from '../data/DataStore';

/** Bank模块接口 — 每个Bank实现此接口 */
export interface BankModule {
  /** Bank编号 */
  readonly bankId: number;
  /** 调用指定的Sub函数 */
  callSub(subId: number): void;
  /** 初始化Bank */
  init?(): void;
  /** Bank重置 */
  reset?(): void;
}

export class BankDispatcher {
  private ds: DataStore;
  private _banks: Map<number, BankModule> = new Map();
  private _currentBank: number = -1;
  
  constructor(ds: DataStore) {
    this.ds = ds;
  }
  
  /** 注册Bank模块 */
  registerBank(module: BankModule): void {
    this._banks.set(module.bankId, module);
  }
  
  /** 获取已注册的Bank模块 */
  getBank(bankId: number): BankModule | undefined {
    return this._banks.get(bankId);
  }
  
  /**
   * 调度到指定Bank的Sub
   * 对应原始: JSR $84D2 (入口在Bank 0)
   * 
   * 原始代码:
   *   $84D2: PHA           ; 保存参数
   *   $84D3: LDA ram_0093  ; bankLock
   *   $84D5: BNE $84E0     ; 锁定→跳过
   *   $84D7: PLA
   *   $84D8: PHA
   *   $84D9: AND #$0F      ; Sub编号
   *   $84DB: STA ram_03CB  ; → subState
   *   $84DD: JSR $83FD     ; → 写入MMC1 (PRG Bank切换)
   *   $84E0: PLA
   *   $84E1: AND #$0F      ; Sub编号
   *   $84E3: TAX
   *   $84E4: LDA $840B,X   ; 查跳转表
   *   $84E7: STA ram_0012
   *   $84E9: LDA $8412,X
   *   $84EC: STA ram_0013
   *   $84EE: JMP (ram_0012) ; 间接跳转到目标Bank的Sub入口
   */
  dispatch(param: number): void {
    const bankId = (param >> 4) & 0x0F;
    const subId = param & 0x0F;
    
    // 检查Bank锁定
    if (this.ds.bankLock !== 0) {
      // Bank被锁定，直接调用当前Bank的sub
      const bank = this._banks.get(this._currentBank);
      if (bank) {
        this.ds.subState = subId;
        bank.callSub(subId);
      }
      return;
    }
    
    // 切换Bank
    if (bankId !== this._currentBank) {
      this._switchPrgBank(bankId);
    }
    
    // 调用Sub
    this.ds.subState = subId;
    const bank = this._banks.get(bankId);
    if (bank) {
      bank.callSub(subId);
    } else {
      console.warn(`[BankDispatcher] Bank ${bankId} 未注册, Sub ${subId}`);
    }
  }
  
  /**
   * 直接调用指定Bank的Sub (不通过$84D2标准流程)
   * 用于State Machine中的直接入口
   */
  callDirect(bankId: number, subId: number): void {
    if (this.ds.bankLock !== 0) return;
    
    if (bankId !== this._currentBank) {
      this._switchPrgBank(bankId);
    }
    
    this.ds.subState = subId;
    const bank = this._banks.get(bankId);
    if (bank) {
      bank.callSub(subId);
    }
  }
  
  /**
   * 临时切换Bank执行操作，然后恢复
   * 对应原始: $8295 (BankSwitchAndRestore)
   */
  withBank(bankId: number, fn: () => void): void {
    const prevBank = this._currentBank;
    this._switchPrgBank(bankId);
    try {
      fn();
    } finally {
      if (prevBank >= 0) {
        this._switchPrgBank(prevBank);
      }
    }
  }
  
  // ==================== MMC1 Bank切换模拟 ====================
  
  /**
   * 模拟MMC1 PRG Bank切换
   * 对应原始: $83C7 (写入MMC1控制寄存器)
   * 
   * MMC1串行写入:
   *   写 $8000-$9FFF: 每次写bit0进入移位寄存器
   *   5次写入后: 移位寄存器满→写入目标寄存器→重置移位寄存器
   *   
   * 在TS中我们直接切换，无需模拟串行移位
   */
  private _switchPrgBank(bankId: number): void {
    // 确保bankId在有效范围 (0-6为可切换bank, 7为固定bank)
    if (bankId >= 0 && bankId <= 7) {
      this._currentBank = bankId;
      this.ds.currentPrgBank = bankId;
      this.ds.prgBank = bankId;
      
      // 初始化新Bank (如果需要)
      const bank = this._banks.get(bankId);
      if (bank?.init) {
        bank.init();
      }
    }
  }
  
  /** 切换CHR Bank (MMC1 CHR Bank 0寄存器) */
  switchChrBank0(bankId: number): void {
    this.ds.currentChrBank0 = bankId & 0x1F;  // 5位 → 最多32个4KB bank
    this.ds.chrBank0 = this.ds.currentChrBank0;
  }
  
  /** 切换CHR Bank (MMC1 CHR Bank 1寄存器) */
  switchChrBank1(bankId: number): void {
    this.ds.currentChrBank1 = bankId & 0x1F;
    this.ds.chrBank1 = this.ds.currentChrBank1;
  }
  
  // ==================== 状态查询 ====================
  
  getCurrentBank(): number { return this._currentBank; }
  
  /** 获取当前活跃的Bank模块列表 */
  getRegisteredBanks(): number[] {
    return Array.from(this._banks.keys()).sort((a, b) => a - b);
  }
}
