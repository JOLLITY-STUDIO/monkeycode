// src/core/browser/VideoConfigPanel.ts
//
// 可注入的 video config UI panel — 把 HP3X scaler 等选项可视化.
// 用法:
//   const panel = new VideoConfigPanel(storage);
//   document.body.appendChild(panel.element);
//   // 自动绑事件到 storage, storage.update 时 panel UI 同步.
import {
  SCALER_OPTIONS,
  DEFAULT_VIDEO_CONFIG,
  type VideoConfig,
  type VideoConfigStorage,
} from "../../option";

export interface VideoConfigPanelOptions {
  /** 默认注入到 document.body. */
  parent?: HTMLElement;
  /** 隐藏面板 */
  initiallyCollapsed?: boolean;
}

export class VideoConfigPanel {
  readonly storage: VideoConfigStorage;
  readonly element: HTMLDivElement;
  private _unsub?: () => void;
  private _selScaler!: HTMLSelectElement;
  private _chkIntegerScale!: HTMLInputElement;
  private _chkAspectRatio!: HTMLInputElement;
  private _chkClipSides!: HTMLInputElement;
  private _chkShowFps!: HTMLInputElement;
  private _chkShowFrameCount!: HTMLInputElement;
  private _btnReset!: HTMLButtonElement;
  private _btnToggle!: HTMLButtonElement;
  private _body!: HTMLDivElement;

  constructor(storage: VideoConfigStorage, options: VideoConfigPanelOptions = {}) {
    this.storage = storage;
    this.element = document.createElement("div");
    this.element.className = "tsubasa2-video-config-panel";
    this.element.style.cssText = PANEL_CSS;

    this.element.innerHTML = `
      <div class="vcp-header">
        <span class="vcp-title">🎮 视频配置 (Video Config)</span>
        <button class="vcp-toggle" type="button">−</button>
      </div>
      <div class="vcp-body">
        <div class="vcp-row">
          <label class="vcp-lbl">Scaler:</label>
          <select class="vcp-sel-scaler">
            ${SCALER_OPTIONS.map(o => `<option value="${o.id}">${o.label}</option>`).join("")}
          </select>
          <span class="vcp-hint">HP3X = 高质量 3×</span>
        </div>
        <div class="vcp-row">
          <label class="vcp-lbl"><input type="checkbox" class="vcp-chk-integer"> 整数倍缩放 (无变形)</label>
        </div>
        <div class="vcp-row">
          <label class="vcp-lbl"><input type="checkbox" class="vcp-chk-aspect"> 强制 8:7 NES 原生宽高</label>
        </div>
        <div class="vcp-row">
          <label class="vcp-lbl"><input type="checkbox" class="vcp-chk-clip"> 裁剪左右 8 像素 (NTSC overscan)</label>
        </div>
        <div class="vcp-row">
          <label class="vcp-lbl"><input type="checkbox" class="vcp-chk-fps"> 显示 FPS</label>
        </div>
        <div class="vcp-row">
          <label class="vcp-lbl"><input type="checkbox" class="vcp-chk-frame"> 显示帧序号</label>
        </div>
        <div class="vcp-row">
          <button type="button" class="vcp-btn-reset">恢复默认</button>
        </div>
        <div class="vcp-row vcp-fineprint">
          <span>对应 fceux-2.6.6: <code>SDL.SpecialFilter=4 → hq3x</code>, 默认 = 1× (浏览器 nearest neighbor)</span>
        </div>
      </div>
    `;

    // 注入到 DOM
    const parent = options.parent || document.body;
    parent.appendChild(this.element);

    // 缓存子元素引用
    this._selScaler = this.element.querySelector(".vcp-sel-scaler")!;
    this._chkIntegerScale = this.element.querySelector(".vcp-chk-integer")!;
    this._chkAspectRatio = this.element.querySelector(".vcp-chk-aspect")!;
    this._chkClipSides = this.element.querySelector(".vcp-chk-clip")!;
    this._chkShowFps = this.element.querySelector(".vcp-chk-fps")!;
    this._chkShowFrameCount = this.element.querySelector(".vcp-chk-frame")!;
    this._btnReset = this.element.querySelector(".vcp-btn-reset")!;
    this._btnToggle = this.element.querySelector(".vcp-toggle")!;
    this._body = this.element.querySelector(".vcp-body")!;

    // 初始同步 UI ↔ storage
    this._applyToUI(storage.current);

    // 双向绑定
    this._selScaler.addEventListener("change", () => {
      this.storage.update({ scaler: this._selScaler.value as any });
    });
    this._chkIntegerScale.addEventListener("change", () => {
      this.storage.update({ fitWindow: this._chkIntegerScale.checked });
    });
    this._chkAspectRatio.addEventListener("change", () => {
      this.storage.update({ maintainAspectRatio: this._chkAspectRatio.checked });
    });
    this._chkClipSides.addEventListener("change", () => {
      this.storage.update({ clipSides: this._chkClipSides.checked });
    });
    this._chkShowFps.addEventListener("change", () => {
      this.storage.update({ showFps: this._chkShowFps.checked });
    });
    this._chkShowFrameCount.addEventListener("change", () => {
      this.storage.update({ showFrameCount: this._chkShowFrameCount.checked });
    });
    this._btnReset.addEventListener("click", () => {
      this.storage.set(DEFAULT_VIDEO_CONFIG);
    });
    this._btnToggle.addEventListener("click", () => {
      const collapsed = this._body.style.display === "none";
      this._body.style.display = collapsed ? "block" : "none";
      this._btnToggle.textContent = collapsed ? "−" : "+";
    });
    if (options.initiallyCollapsed) {
      this._body.style.display = "none";
      this._btnToggle.textContent = "+";
    }

    // 监听 storage 变化 (来自外部 / 多 panel 同步)
    this._unsub = storage.onChange((cfg) => this._applyToUI(cfg));
  }

  private _applyToUI(cfg: VideoConfig): void {
    this._selScaler.value = cfg.scaler;
    this._chkIntegerScale.checked = cfg.fitWindow;
    this._chkAspectRatio.checked = cfg.maintainAspectRatio;
    this._chkClipSides.checked = cfg.clipSides;
    this._chkShowFps.checked = cfg.showFps;
    this._chkShowFrameCount.checked = cfg.showFrameCount;
  }

  destroy(): void {
    if (this._unsub) this._unsub();
    this.element.parentNode?.removeChild(this.element);
  }
}

const PANEL_CSS = `
.tsubasa2-video-config-panel {
  position: fixed; top: 48px; right: 12px; z-index: 9999;
  width: 320px;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,.5);
  color: #c9d1d9;
  font-family: inherit;
  font-size: 12px;
}
.tsubasa2-video-config-panel .vcp-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 10px;
  background: #161b22;
  border-bottom: 1px solid #30363d;
  border-radius: 6px 6px 0 0;
  cursor: move;
}
.tsubasa2-video-config-panel .vcp-title {
  font-weight: 700; font-size: 13px;
}
.tsubasa2-video-config-panel .vcp-toggle {
  background: transparent; border: 1px solid #30363d; color: #8b949e;
  border-radius: 4px; width: 24px; height: 22px; cursor: pointer; font-size: 14px;
}
.tsubasa2-video-config-panel .vcp-body { padding: 10px; }
.tsubasa2-video-config-panel .vcp-row {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 8px;
}
.tsubasa2-video-config-panel .vcp-lbl {
  flex: 1; cursor: pointer; user-select: none;
}
.tsubasa2-video-config-panel select.vcp-sel-scaler {
  flex: 2;
  background: #010409; color: #c9d1d9;
  border: 1px solid #30363d; border-radius: 4px;
  padding: 4px;
}
.tsubasa2-video-config-panel input[type=checkbox] {
  margin-right: 6px; vertical-align: middle;
}
.tsubasa2-video-config-panel .vcp-hint {
  font-size: 10px; color: #6e7681;
}
.tsubasa2-video-config-panel .vcp-btn-reset {
  background: #21262d; border: 1px solid #30363d; color: #c9d1d9;
  border-radius: 4px; padding: 4px 10px; cursor: pointer;
}
.tsubasa2-video-config-panel .vcp-btn-reset:hover {
  background: #30363d;
}
.tsubasa2-video-config-panel .vcp-fineprint {
  font-size: 10px; color: #6e7681; margin-top: 4px;
}
.tsubasa2-video-config-panel .vcp-fineprint code {
  background: #161b22; padding: 1px 4px; border-radius: 3px; font-size: 10px;
}
`;
