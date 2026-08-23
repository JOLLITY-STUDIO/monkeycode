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
export declare class Bank12AudioPlayer {
    onSample: ((left: number, right: number) => void) | null;
    play(_seId: number): void;
    stop(): void;
    tickFrame(): void;
    getApuChannelStates(): ApuChannelState[];
    getProgress(): {
        current: number;
        total: number;
    } | null;
}
