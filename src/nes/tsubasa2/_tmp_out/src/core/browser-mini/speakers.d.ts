interface SpeakersOptions {
    onBufferUnderrun?: () => void;
}
export default class SpeakersMini {
    onBufferUnderrun?: () => void;
    audioCtx: any;
    node: any;
    batchL: Float32Array;
    batchR: Float32Array;
    batchPos: number;
    _started: boolean;
    constructor({ onBufferUnderrun }?: SpeakersOptions);
    getSampleRate(): number;
    /**
     * 启动音频。
     * 小程序环境: 尝试 wx.createWebAudioContext (基础库 2.19+), 失败则静音。
     * TODO: 真实音频输出待 Bank12AudioService 接入后补全。
     */
    start(): Promise<void>;
    stop(): void;
    /** 接收一个立体声样本 (与 browser 版接口一致)。当前 stub 为 no-op。 */
    writeSample: (left: number, right: number) => void;
    flush(): void;
}
export {};
