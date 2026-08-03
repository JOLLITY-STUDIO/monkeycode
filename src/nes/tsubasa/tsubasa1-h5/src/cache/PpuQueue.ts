/**
 * PPU 写入队列 - 管理延迟的VRAM写入
 * 对应原NES在VBlank期间的批量PPU更新
 *
 * 两种队列:
 *   A. 帧队列 ($0305-$032F): 由 $0305 计数管理
 *   B. 静态队列 ($0339-$0399): 由 $0339 标志管理
 */

import { PpuWriteCmd } from '../core/types';

const MAX_QUEUE_ENTRIES = 256;

export class PpuQueue {
  /** 帧队列是否激活 */
  frameQueueActive: boolean = false;

  /** 帧队列条目 */
  private frameQueue: PpuWriteCmd[] = [];

  /** 静态写入队列 */
  private staticQueue: PpuWriteCmd[] = [];

  /** 静态队列激活标志 */
  staticQueueActive: boolean = false;

  constructor() {
    this.clear();
  }

  /** 清空所有队列 */
  clear(): void {
    this.frameQueue = [];
    this.staticQueue = [];
    this.frameQueueActive = false;
    this.staticQueueActive = false;
  }

  /** 添加帧队列条目 */
  addFrameEntry(cmd: PpuWriteCmd): void {
    if (this.frameQueue.length >= MAX_QUEUE_ENTRIES) {
      console.warn('PPU frame queue overflow');
      return;
    }
    this.frameQueue.push(cmd);
  }

  /** 添加静态队列条目 */
  addStaticEntry(cmd: PpuWriteCmd): void {
    if (this.staticQueue.length >= MAX_QUEUE_ENTRIES) {
      console.warn('PPU static queue overflow');
      return;
    }
    this.staticQueue.push(cmd);
  }

  /** 获取并清空帧队列 */
  consumeFrameQueue(): PpuWriteCmd[] {
    const items = [...this.frameQueue];
    this.frameQueue = [];
    this.frameQueueActive = false;
    return items;
  }

  /** 获取并清空静态队列 */
  consumeStaticQueue(): PpuWriteCmd[] {
    const items = [...this.staticQueue];
    this.staticQueue = [];
    this.staticQueueActive = false;
    return items;
  }

  /** 获取所有待处理命令 */
  consumeAll(): PpuWriteCmd[] {
    const frame = this.consumeFrameQueue();
    const stat = this.consumeStaticQueue();
    return [...frame, ...stat];
  }

  /** 是否有待处理命令 */
  hasPending(): boolean {
    return this.frameQueue.length > 0 || this.staticQueue.length > 0;
  }
}
