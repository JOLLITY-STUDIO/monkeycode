const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

interface ScreenOptions {
  onMouseDown?: (x: number, y: number) => void;
  onMouseUp?: () => void;
}

export default class Screen {
  onMouseDown?: (x: number, y: number) => void;
  onMouseUp?: () => void;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  imageData!: ImageData;
  buf!: ArrayBuffer;
  buf8!: Uint8ClampedArray;
  buf32!: Uint32Array;
  _handleMouseDown!: (e: MouseEvent) => void;
  _handleMouseUp!: () => void;

  constructor(container: HTMLElement, options: ScreenOptions = {}) {
    this.onMouseDown = options.onMouseDown;
    this.onMouseUp = options.onMouseUp;

    // Create canvas element
    this.canvas = document.createElement("canvas");
    this.canvas.width = SCREEN_WIDTH;
    this.canvas.height = SCREEN_HEIGHT;
    (this.canvas.style as any).imageRendering = "pixelated";
    (this.canvas.style as any).imageRendering = "crisp-edges";
    container.appendChild(this.canvas);

    // Mouse events for Zapper support
    this._handleMouseDown = (e: MouseEvent) => {
      if (!this.onMouseDown) return;
      let scale = SCREEN_WIDTH / parseFloat(this.canvas.style.width);
      let rect = this.canvas.getBoundingClientRect();
      let x = Math.round((e.clientX - rect.left) * scale);
      let y = Math.round((e.clientY - rect.top) * scale);
      this.onMouseDown(x, y);
    };
    this._handleMouseUp = () => {
      if (this.onMouseUp) this.onMouseUp();
    };
    this.canvas.addEventListener("mousedown", this._handleMouseDown);
    this.canvas.addEventListener("mouseup", this._handleMouseUp);

    this._initCanvas();
  }

  _initCanvas(): void {
    this.context = this.canvas.getContext("2d")!;
    this.imageData = this.context.getImageData(
      0,
      0,
      SCREEN_WIDTH,
      SCREEN_HEIGHT,
    );

    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // buffer to write on next animation frame
    this.buf = new ArrayBuffer(this.imageData.data.length);
    this.buf8 = new Uint8ClampedArray(this.buf);
    this.buf32 = new Uint32Array(this.buf);

    // Set alpha
    for (var i = 0; i < this.buf32.length; ++i) {
      this.buf32[i] = 0xff000000;
    }
  }

  setBuffer = (buffer: Uint32Array): void => {
    for (var y = 0; y < SCREEN_HEIGHT; ++y) {
      for (var x = 0; x < SCREEN_WIDTH; ++x) {
        var i = y * 256 + x;
        this.buf32[i] = 0xff000000 | buffer[i]; // Full alpha
      }
    }
  };

  writeBuffer = (): void => {
    this.imageData.data.set(this.buf8);
    this.context.putImageData(this.imageData, 0, 0);
  };

  fitInParent = (): void => {
    let parent = this.canvas.parentNode as HTMLElement;
    let parentWidth = parent.clientWidth;
    let parentHeight = parent.clientHeight;
    let parentRatio = parentWidth / parentHeight;
    let desiredRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
    if (desiredRatio < parentRatio) {
      this.canvas.style.width = `${Math.round(parentHeight * desiredRatio)}px`;
      this.canvas.style.height = `${parentHeight}px`;
    } else {
      this.canvas.style.width = `${parentWidth}px`;
      this.canvas.style.height = `${Math.round(parentWidth / desiredRatio)}px`;
    }
  };

  screenshot(): HTMLImageElement {
    var img = new Image();
    img.src = this.canvas.toDataURL("image/png");
    return img;
  }

  destroy(): void {
    this.canvas.removeEventListener("mousedown", this._handleMouseDown);
    this.canvas.removeEventListener("mouseup", this._handleMouseUp);
    this.canvas.parentNode!.removeChild(this.canvas);
  }
}
