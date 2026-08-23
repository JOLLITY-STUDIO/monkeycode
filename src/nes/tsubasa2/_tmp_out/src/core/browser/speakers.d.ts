interface SpeakersOptions {
    onBufferUnderrun?: () => void;
}
export default class Speakers {
    onBufferUnderrun?: () => void;
    audioCtx: AudioContext | null;
    node: AudioWorkletNode | null;
    batchL: Float32Array;
    batchR: Float32Array;
    batchPos: number;
    _resumeOnInteraction: (() => void) | null;
    constructor({ onBufferUnderrun }: SpeakersOptions);
    getSampleRate(): number;
    start(): Promise<void>;
    _removeResumeListeners(): void;
    stop(): void;
    writeSample: (left: number, right: number) => void;
    flush(): void;
}
export {};
