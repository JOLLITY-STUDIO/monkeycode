/**
 * Bank12 Audio Player — 最小 stub
 * (原文件被删除, 保留类型和空实现使 bank-detail 页面可编译)
 */

export interface ApuChannelState {
  ch: number;
  name: string;
  enabled: boolean;
  freq: number;
  volume: number;
  duty?: number;
  waveform?: string;
}

export class Bank12AudioPlayer {
  onSample: ((left: number, right: number) => void) | null = null;

  play(_seId: number): void { /* stub */ }
  stop(): void { /* stub */ }
  tickFrame(): void { /* stub */ }

  getApuChannelStates(): ApuChannelState[] {
    return [];
  }

  getProgress(): { current: number; total: number } | null {
    return null;
  }
}
