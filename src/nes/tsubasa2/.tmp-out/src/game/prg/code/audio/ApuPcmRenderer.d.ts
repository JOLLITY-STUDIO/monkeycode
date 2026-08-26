/**
 * ApuPcmRenderer — NES APU PCM 波形合成器
 *
 * 把 ApuTarget 的寄存器写合成为 PCM 采样，用于 WAV 渲染。
 * 模拟 NES APU 的 4 个通道：
 *   Pulse1/Pulse2: 方波，频率 = 1789773 / (16 * (freq+1))
 *   Triangle: 三角波，频率 = 1789773 / (32 * (freq+1))
 *   Noise: 伪随机噪声
 *   DPCM: delta 调制采样（暂未实现）
 *
 * 每个 CPU 周期产生一个采样，60fps × 29780 周期/帧
 */
export interface ApuPcmRenderer {
    /** 处理一个 APU 寄存器写 */
    writeRegister(addr: number, value: number): void;
    /** 生成一帧（1/60 秒）的 PCM 采样 */
    renderFrame(): Float32Array;
}
export declare class ApuPcmRendererImpl implements ApuPcmRenderer {
    private pulse1;
    private pulse2;
    private triangle;
    private noise;
    private statusReg;
    private createPulse;
    writeRegister(addr: number, value: number): void;
    private writePulseCtrl;
    private writePulseSweep;
    renderFrame(): Float32Array;
    private renderPulse;
    private renderTriangle;
    private renderNoise;
}
