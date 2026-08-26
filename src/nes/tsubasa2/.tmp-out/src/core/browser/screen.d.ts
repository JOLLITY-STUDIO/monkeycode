interface ScreenOptions {
    onMouseDown?: (x: number, y: number) => void;
    onMouseUp?: () => void;
}
export default class Screen {
    onMouseDown?: (x: number, y: number) => void;
    onMouseUp?: () => void;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    imageData: ImageData;
    buf: ArrayBuffer;
    buf8: Uint8ClampedArray;
    buf32: Uint32Array;
    _handleMouseDown: (e: MouseEvent) => void;
    _handleMouseUp: () => void;
    constructor(container: HTMLElement, options?: ScreenOptions);
    _initCanvas(): void;
    setBuffer: (buffer: Uint32Array) => void;
    writeBuffer: () => void;
    fitInParent: () => void;
    screenshot(): HTMLImageElement;
    destroy(): void;
}
export {};
