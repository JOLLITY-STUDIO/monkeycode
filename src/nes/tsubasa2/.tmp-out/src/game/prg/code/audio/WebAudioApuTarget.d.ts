/**
 * WebAudioApuTarget — 用 WebAudio API 合成 NES APU 音频
 *
 * 对接 AudioService 的 APU 寄存器写，合成 4 个通道：
 *   - Pulse1/Pulse2: OscillatorNode（square 波）+ GainNode（音量/包）
 *   - Triangle: OscillatorNode（triangle 波）+ GainNode
 *   - Noise: 白噪声 BufferSource + 滤波器
 *   - DPCM: 预录制采样回放（V0.6 暂用静音，需提取 PCM 数据）
 *
 * 使用方式：
 *   const apu = new WebAudioApuTarget();
 *   await apu.init();
 *   audioService.attachApu(apu);
 *
 * 注：微信小程序环境无 AudioContext，需用 wx.createInnerAudioContext 替代
 *    本实现面向 HTML 测试台（index.html）。
 */
import type { ApuTarget } from './ApuTarget';
export declare class WebAudioApuTarget implements ApuTarget {
    private ctx;
    private pulse1;
    private pulse2;
    private triangle;
    private noiseSrc;
    private noiseGain;
    private masterGain;
    private enabled;
    /** 初始化（必须在用户交互后调用） */
    init(): Promise<void>;
    private createPulseChannel;
    private createNoiseSource;
    /** 写 APU 寄存器 */
    writeRegister(addr: number, value: number): void;
    private writePulseControl;
    private writePulseSweep;
    private writePulseFreqLo;
    private writePulseFreqHi;
    private updatePulseFreq;
    private writeTriangleControl;
    private writeNoiseControl;
    private writeNoiseFreq;
    private writeStatus;
    /** 暂停音频 */
    suspend(): void;
    /** 恢复音频 */
    resume(): Promise<void>;
    /** 销毁 */
    dispose(): void;
}
