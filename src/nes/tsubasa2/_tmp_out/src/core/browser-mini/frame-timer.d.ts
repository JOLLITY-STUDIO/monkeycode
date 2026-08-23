interface FrameTimerProps {
    onGenerateFrame: () => void;
    onWriteFrame: () => void;
}
export default class FrameTimerMini {
    onGenerateFrame: () => void;
    onWriteFrame: () => void;
    running: boolean;
    interval: number;
    lastFrameTime: number | false;
    _requestID?: number;
    _canvas: any;
    constructor(props: FrameTimerProps, canvas?: any);
    /** 注入 canvas 节点 (供 requestAnimationFrame 使用) */
    setCanvas(canvas: any): void;
    start(): void;
    stop(): void;
    requestAnimationFrame(): void;
    generateFrame(): void;
    onAnimationFrame: (time: number) => void;
}
export {};
