/** 微信小程序 API 型別宣告（最小集合） */

declare function Page(options: Record<string, unknown>): void;

declare function getApp(): Record<string, unknown>;

declare const wx: {
  createCanvasContext(canvasId: string, component?: unknown): WxCanvasContext;
  createSelectorQuery(): WxSelectorQuery;
  createWebAudioContext(): WxWebAudioContext;
  getSystemInfoSync(): WxSystemInfo;
  onTouchStart(cb: (e: WxTouchEvent) => void): void;
  onTouchMove(cb: (e: WxTouchEvent) => void): void;
  onTouchEnd(cb: (e: WxTouchEvent) => void): void;
  getFileSystemManager(): WxFileSystemManager;
  setStorageSync(key: string, value: unknown): void;
  getStorageSync(key: string): unknown;
  removeStorageSync(key: string): void;
};

/* ── Canvas ── */

interface WxCanvasContext {
  draw(reserve?: boolean, callback?: () => void): void;
  clearRect(x: number, y: number, width: number, height: number): void;
  drawImage(imageResource: unknown, dx: number, dy: number, dWidth?: number, dHeight?: number): void;
  setTransform(scaleX: number, _skewX: number, _skewY: number, scaleY: number, translateX: number, translateY: number): void;
  resetTransform(): void;
}

/* ── SelectorQuery ── */

interface WxSelectorQuery {
  select(selector: string): WxNodesRef;
}

interface WxNodesRef {
  fields(options: { node: boolean; size: boolean }): WxNodesRef;
  exec(cb: (res: Array<WxNodeInfo | null>) => void): void;
}

interface WxNodeInfo {
  node: unknown;
  width: number;
  height: number;
}

/* ── Web Audio ── */

interface WxAudioDestinationNode {
  /* AudioDestinationNode has no own methods used here */
}

interface WxWebAudioContext {
  readonly destination: WxAudioDestinationNode;
  createScriptProcessor(
    bufferSize: number,
    numInputChannels: number,
    numOutputChannels: number
  ): WxScriptProcessorNode;
  resume(): void;
}

interface WxScriptProcessorNode {
  connect(dest: WxAudioDestinationNode): void;
  onaudioprocess: ((e: WxAudioProcessEvent) => void) | null;
}

interface WxAudioProcessEvent {
  outputBuffer: {
    getChannelData(ch: number): Float32Array;
  };
}

/* ── Misc ── */

interface WxSystemInfo {
  windowWidth: number;
  windowHeight: number;
  pixelRatio: number;
  platform: string;
}

interface WxTouchEvent {
  touches: Array<{ x: number; y: number }>;
  changedTouches: Array<{ x: number; y: number }>;
}

interface WxFileSystemManager {
  readFileSync(path: string, encoding?: string): string | ArrayBuffer;
  writeFileSync(path: string, data: string | ArrayBuffer, encoding?: string): void;
}
