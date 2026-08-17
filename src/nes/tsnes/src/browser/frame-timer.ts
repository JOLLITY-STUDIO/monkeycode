// Debug logging, enabled via localStorage.jsnes_debug = 1
let debugEnabled = false;
try {
  debugEnabled = !!localStorage.getItem("jsnes_debug");
} catch {
  // localStorage not available
}

const FPS = 60.098;

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

  constructor(props: FrameTimerProps) {
    this.onGenerateFrame = props.onGenerateFrame;
    this.onWriteFrame = props.onWriteFrame;
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
    this.running = true;
    this.interval = 1e3 / FPS;
    this.lastFrameTime = false;
  }

  start(): void {
    this.running = true;
    this.requestAnimationFrame();
  }

  stop(): void {
    this.running = false;
    if (this._requestID) window.cancelAnimationFrame(this._requestID);
    this.lastFrameTime = false;
  }

  requestAnimationFrame(): void {
    this._requestID = window.requestAnimationFrame(this.onAnimationFrame);
  }

  generateFrame(): void {
    this.onGenerateFrame();
    this.lastFrameTime = (this.lastFrameTime as number) + this.interval;
  }

  onAnimationFrame = (time: number): void => {
    this.requestAnimationFrame();
    let excess = time % this.interval;
    let newFrameTime = time - excess;

    if (!this.lastFrameTime) {
      this.lastFrameTime = newFrameTime;
      return;
    }

    let numFrames = Math.round(
      (newFrameTime - (this.lastFrameTime as number)) / this.interval,
    );

    if (numFrames === 0) {
      return;
    }

    this.generateFrame();
    this.onWriteFrame();

    let timeToNextFrame = this.interval - excess;
    for (let i = 1; i < numFrames; i++) {
      setTimeout(
        () => {
          this.generateFrame();
        },
        (i * timeToNextFrame) / numFrames,
      );
    }
    if (numFrames > 1 && debugEnabled) {
      console.log("SKIP", numFrames - 1, this.lastFrameTime);
    }
  };
}
