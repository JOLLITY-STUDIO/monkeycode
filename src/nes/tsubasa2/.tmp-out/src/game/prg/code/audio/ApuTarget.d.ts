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
export declare class LogApuTarget implements ApuTarget {
    readonly logs: Array<{
        addr: number;
        value: number;
        frame: number;
    }>;
    private frame;
    setFrame(f: number): void;
    writeRegister(addr: number, value: number): void;
    clear(): void;
    /** 导出日志摘要（按寄存器分组统计） */
    summary(): string;
}
/** NullApuTarget — 空实现（不输出任何声音，用于无音频环境） */
export declare class NullApuTarget implements ApuTarget {
    writeRegister(_addr: number, _value: number): void;
}
