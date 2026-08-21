/**
 * InterruptService — NMI/中断帧服务
 * @bank 31 ($E000-$FFFF 固定窗口, 含 Reset/NMI/IRQ 向量)
 *
 * 职责: NMI→帧推进 (游戏逻辑每帧调用), Bank 配置表结构化数据。
 * 翻译版: 无 CPU 中断, 帧循环直接调 nmi() 语义等价物。
 *
 * 命名规范: 旧名 Bank31Service/InterruptService → 新名 InterruptService。
 *
 * TODO: 翻译 asm/bank31/code_main.s
 */
import { DataStore } from '../../data/store/DataStore';

export interface BankConfig {
  bank: number;
  window: 'A000' | 'C000' | 'E000';
}

export class InterruptService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 每帧 NMI 语义 (原 nmi) */
  nmi(frame: number): void {
    // TODO: 翻译 bank31 NMI 处理
    void frame;
  }

  /** Reset 语义 */
  reset(): void {
    // TODO: 翻译 bank31 Reset
  }
}

export default InterruptService;
