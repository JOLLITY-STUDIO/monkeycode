// Debug logging, enabled via localStorage.jsnes_debug = 1
// @ts-nocheck  // tsnes 移植核心，非翻译层，跳过类型检查
let debugEnabled = false;
try {
    debugEnabled = !!localStorage.getItem("jsnes_debug");
}
catch {
    // localStorage not available
}
const FPS = 60.098;
export default class FrameTimer {
    constructor(props) {
        this.onAnimationFrame = (time) => {
            this.requestAnimationFrame();
            let excess = time % this.interval;
            let newFrameTime = time - excess;
            if (!this.lastFrameTime) {
                this.lastFrameTime = newFrameTime;
                return;
            }
            let numFrames = Math.round((newFrameTime - this.lastFrameTime) / this.interval);
            if (numFrames === 0) {
                return;
            }
            this.generateFrame();
            this.onWriteFrame();
            let timeToNextFrame = this.interval - excess;
            for (let i = 1; i < numFrames; i++) {
                setTimeout(() => {
                    this.generateFrame();
                }, (i * timeToNextFrame) / numFrames);
            }
            if (numFrames > 1 && debugEnabled) {
                console.log("SKIP", numFrames - 1, this.lastFrameTime);
            }
        };
        this.onGenerateFrame = props.onGenerateFrame;
        this.onWriteFrame = props.onWriteFrame;
        this.onAnimationFrame = this.onAnimationFrame.bind(this);
        this.running = true;
        this.interval = 1e3 / FPS;
        this.lastFrameTime = false;
    }
    start() {
        this.running = true;
        this.requestAnimationFrame();
    }
    stop() {
        this.running = false;
        if (this._requestID)
            window.cancelAnimationFrame(this._requestID);
        this.lastFrameTime = false;
    }
    requestAnimationFrame() {
        this._requestID = window.requestAnimationFrame(this.onAnimationFrame);
    }
    generateFrame() {
        this.onGenerateFrame();
        this.lastFrameTime = this.lastFrameTime + this.interval;
    }
}
