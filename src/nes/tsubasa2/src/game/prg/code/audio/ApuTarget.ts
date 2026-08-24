/**
 * ApuTarget — NES APU 寄存器写目标抽象
 *
 * AudioService 通过本接口输出 APU 寄存器写，由具体实现对接：
 *  - WebAudioApuTarget：用 OscillatorNode 合成 Pulse/Triangle，白噪声模拟 Noise
 *  - LogApuTarget：记录寄存器写日志（测试/差分验证用）
 *  - 模拟器 PAPU：直接写真实 APU 状态
 *
 * 通道分组（NES APU）：
 *   Pulse1/Pulse2 (SQ1/SQ2)：方波
 *   Triangle (TRI)：三角波
 *   Noise：白噪声
 *   DPCM：delta 调制采样
 */
export interface ApuTarget {
  /** 写 APU 寄存器 */
  writeRegister(addr: number, value: number): void;
}

/** LogApuTarget — 记录寄存器写日志（测试/差分验证用） */
export class LogApuTarget implements ApuTarget {
  readonly logs: Array<{ addr: number; value: number; frame: number }> = [];
  private frame = 0;

  setFrame(f: number): void { this.frame = f; }

  writeRegister(addr: number, value: number): void {
    this.logs.push({ addr, value, frame: this.frame });
  }

  clear(): void { this.logs.length = 0; }

  /** 导出日志摘要（按寄存器分组统计） */
  summary(): string {
    const counts: Record<string, number> = {};
    for (const l of this.logs) {
      const k = '$' + l.addr.toString(16);
      counts[k] = (counts[k] ?? 0) + 1;
    }
    return Object.entries(counts)
      .sort((a, b) => parseInt(a[0].slice(1), 16) - parseInt(b[0].slice(1), 16))
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
  }
}

/** NullApuTarget — 空实现（不输出任何声音，用于无音频环境） */
export class NullApuTarget implements ApuTarget {
  writeRegister(_addr: number, _value: number): void {}
}