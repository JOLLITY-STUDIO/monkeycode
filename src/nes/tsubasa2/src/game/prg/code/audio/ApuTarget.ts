/**
 * ApuTarget — NES APU 寄存器写目标抽象
 *
 * 原始地址：$4000-$4017（APU 寄存器）
 *
 * AudioService 通过本接口输出 APU 寄存器写，由具体实现对接：
 *  - WebAudioApuTarget：用 OscillatorNode 合成 Pulse/Triangle，白噪声模拟 Noise
 *  - LogApuTarget：记录寄存器写日志（测试/差分验证用）
 *  - 模拟器 PAPU：直接写真实 APU 状态
 *
 * 寄存器布局（NES APU）：
 *   $4000/$4004: Pulse1/Pulse2 控制（音量+包络+占空比）
 *   $4001/$4005: Pulse1/Pulse2 扫描
 *   $4002/$4006: Pulse1/Pulse2 频率低字节
 *   $4003/$4007: Pulse1/Pulse2 频率高字节+长度
 *   $4008: Triangle 控制
 *   $400A: Triangle 频率低字节
 *   $400B: Triangle 频率高字节+长度
 *   $400C: Noise 控制
 *   $400E: Noise 频率+模式
 *   $400F: Noise 长度
 *   $4010: DPCM 控制
 *   $4012: DPCM 采样地址
 *   $4013: DPCM 采样长度
 *   $4015: APU 通道使能（bit0=Pulse1, bit1=Pulse2, bit2=Triangle, bit3=Noise, bit4=DPCM）
 */
export interface ApuTarget {
  /** 写 APU 寄存器（地址范围 $4000-$4017） */
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
