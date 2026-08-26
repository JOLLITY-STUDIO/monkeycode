interface FrameTimerProps {
    onGenerateFrame: () => void;
    onWriteFrame: () => void;
}
export default class FrameTimer {
    onGenerateFrame: () => void;
    onWriteFrame: () => void;
    onAnimationFrame: (time: number) => void;
    running: boolean;
    interval: number;
    lastFrameTime: number | false;
    _requestID?: number;
    constructor(props: FrameTimerProps);
    start(): void;
    stop(): void;
    requestAnimationFrame(): void;
    generateFrame(): void;
    onAnimationFrame: (time: number) => void;
}
export {};
