// src/core/browser/TouchConfigPanel.ts
//
// 触屏配置面板 UI — 让玩家自定义 tap/double-tap/long-press/角点 → NES 按钮映射,
// 切换 trail 视觉, 调 dead-zone/grace/long-press 等灵敏度参数.
//
// 用法:
//   const panel = new TouchConfigPanel(storage);
//   document.body.appendChild(panel.element);

import {
  TOUCH_ACTION_OPTIONS,
  DEFAULT_TOUCH_CONFIG,
  type TouchConfig,
  type TouchConfigStorage,
  type TouchActionButton,
} from "../../option";

export interface TouchConfigPanelOptions {
  parent?: HTMLElement;
  initiallyCollapsed?: boolean;
}

export class TouchConfigPanel {
  readonly storage: TouchConfigStorage;
  readonly element: HTMLDivElement;
  private _unsub?: () => void;
  private _body!: HTMLDivElement;
  private _btnToggle!: HTMLButtonElement;
  private _btnReset!: HTMLButtonElement;

  // UI refs
  private _chkRightHanded!: HTMLInputElement;
  private _chkShowTrail!: HTMLInputElement;
  private _numTrailLength!: HTMLInputElement;
  private _numDeadZone!: HTMLInputElement;
  private _numMaxRadius!: HTMLInputElement;
  private _numGrace!: HTMLInputElement;
  private _numLongPress!: HTMLInputElement;
  private _numDoubleTap!: HTMLInputElement;
  private _selTapAction!: HTMLSelectElement;
  private _selDoubleTapAction!: HTMLSelectElement;
  private _selLongPressAction!: HTMLSelectElement;
  private _selLeftCorner!: HTMLSelectElement;
  private _selRightCorner!: HTMLSelectElement;

  constructor(storage: TouchConfigStorage, options: TouchConfigPanelOptions = {}) {
    this.storage = storage;
    this.element = document.createElement("div");
    this.element.className = "tsubasa2-touch-config-panel";
    this.element.style.cssText = PANEL_CSS;

    this.element.innerHTML = `
      <div class="tcp-header">
        <span class="tcp-title">📱 触屏配置 (Touch Config)</span>
        <button class="tcp-toggle" type="button">−</button>
      </div>
      <div class="tcp-body">
        <div class="tcp-section">
          <div class="tcp-section-title">布局</div>
          <div class="tcp-row">
            <label class="tcp-lbl">
              <input type="checkbox" class="tcp-chk-rh"> 右手模式 (摇杆在左, 动作在右)
            </label>
          </div>
        </div>

        <div class="tcp-section">
          <div class="tcp-section-title">手势 → 按钮</div>
          <div class="tcp-row">
            <label class="tcp-lbl">单击:</label>
            <select class="tcp-sel-tap"></select>
          </div>
          <div class="tcp-row">
            <label class="tcp-lbl">双击:</label>
            <select class="tcp-sel-doubletap"></select>
          </div>
          <div class="tcp-row">
            <label class="tcp-lbl">长按:</label>
            <select class="tcp-sel-longpress"></select>
          </div>
          <div class="tcp-row">
            <label class="tcp-lbl">顶左角短按:</label>
            <select class="tcp-sel-lc"></select>
          </div>
          <div class="tcp-row">
            <label class="tcp-lbl">顶右角短按:</label>
            <select class="tcp-sel-rc"></select>
          </div>
        </div>

        <div class="tcp-section">
          <div class="tcp-section-title">灵敏度</div>
          <div class="tcp-row">
            <label class="tcp-lbl">死区 (px):</label>
            <input type="number" class="tcp-num-dead" min="2" max="50" step="1">
          </div>
          <div class="tcp-row">
            <label class="tcp-lbl">最大半径 (px):</label>
            <input type="number" class="tcp-num-maxr" min="20" max="200" step="5">
          </div>
          <div class="tcp-row">
            <label class="tcp-lbl">方向 grace (ms):</label>
            <input type="number" class="tcp-num-grace" min="0" max="500" step="10">
          </div>
          <div class="tcp-row">
            <label class="tcp-lbl">长按 (ms):</label>
            <input type="number" class="tcp-num-long" min="200" max="1500" step="50">
          </div>
          <div class="tcp-row">
            <label class="tcp-lbl">双击间隔 (ms):</label>
            <input type="number" class="tcp-num-dt" min="100" max="600" step="10">
          </div>
        </div>

        <div class="tcp-section">
          <div class="tcp-section-title">视觉</div>
          <div class="tcp-row">
            <label class="tcp-lbl">
              <input type="checkbox" class="tcp-chk-trail"> 显示触摸轨迹 (滑动时画轨迹)
            </label>
          </div>
          <div class="tcp-row">
            <label class="tcp-lbl">轨迹长度 (点):</label>
            <input type="number" class="tcp-num-traillen" min="5" max="60" step="1">
          </div>
        </div>

        <div class="tcp-row">
          <button type="button" class="tcp-btn-reset">恢复默认</button>
        </div>
        <div class="tcp-row tcp-fineprint">
          <span>仅在触屏设备 (navigator.maxTouchPoints &gt; 0) 自动启用. 桌面浏览器无效.</span>
        </div>
      </div>
    `;

    const parent = options.parent || document.body;
    parent.appendChild(this.element);

    // 缓存 ref
    this._body = this.element.querySelector(".tcp-body")!;
    this._btnToggle = this.element.querySelector(".tcp-toggle")!;
    this._btnReset = this.element.querySelector(".tcp-btn-reset")!;
    this._chkRightHanded = this.element.querySelector(".tcp-chk-rh")!;
    this._chkShowTrail = this.element.querySelector(".tcp-chk-trail")!;
    this._numTrailLength = this.element.querySelector(".tcp-num-traillen")!;
    this._numDeadZone = this.element.querySelector(".tcp-num-dead")!;
    this._numMaxRadius = this.element.querySelector(".tcp-num-maxr")!;
    this._numGrace = this.element.querySelector(".tcp-num-grace")!;
    this._numLongPress = this.element.querySelector(".tcp-num-long")!;
    this._numDoubleTap = this.element.querySelector(".tcp-num-dt")!;
    this._selTapAction = this.element.querySelector(".tcp-sel-tap")!;
    this._selDoubleTapAction = this.element.querySelector(".tcp-sel-doubletap")!;
    this._selLongPressAction = this.element.querySelector(".tcp-sel-longpress")!;
    this._selLeftCorner = this.element.querySelector(".tcp-sel-lc")!;
    this._selRightCorner = this.element.querySelector(".tcp-sel-rc")!;

    // 填充下拉选项
    const fillAction = (sel: HTMLSelectElement, includeNone: boolean) => {
      sel.innerHTML = "";
      if (includeNone) {
        const opt = document.createElement("option");
        opt.value = "none";
        opt.textContent = "禁用";
        sel.appendChild(opt);
      }
      for (const o of TOUCH_ACTION_OPTIONS) {
        const opt = document.createElement("option");
        opt.value = String(o.value);
        opt.textContent = o.label;
        sel.appendChild(opt);
      }
    };
    fillAction(this._selTapAction, false);
    fillAction(this._selDoubleTapAction, false);
    fillAction(this._selLongPressAction, false);
    fillAction(this._selLeftCorner, true);
    fillAction(this._selRightCorner, true);

    // 初始同步
    this._applyToUI(storage.current);

    // 绑定事件
    this._chkRightHanded.addEventListener("change", () => {
      this.storage.update({ rightHanded: this._chkRightHanded.checked });
    });
    this._chkShowTrail.addEventListener("change", () => {
      this.storage.update({ showTrail: this._chkShowTrail.checked });
    });
    this._numTrailLength.addEventListener("change", () => {
      const v = parseInt(this._numTrailLength.value, 10);
      if (isFinite(v)) this.storage.update({ trailLength: v });
    });
    this._numDeadZone.addEventListener("change", () => {
      const v = parseInt(this._numDeadZone.value, 10);
      if (isFinite(v)) this.storage.update({ joystickDeadZone: v });
    });
    this._numMaxRadius.addEventListener("change", () => {
      const v = parseInt(this._numMaxRadius.value, 10);
      if (isFinite(v)) this.storage.update({ joystickMaxRadius: v });
    });
    this._numGrace.addEventListener("change", () => {
      const v = parseInt(this._numGrace.value, 10);
      if (isFinite(v)) this.storage.update({ directionGraceMs: v });
    });
    this._numLongPress.addEventListener("change", () => {
      const v = parseInt(this._numLongPress.value, 10);
      if (isFinite(v)) this.storage.update({ longPressMs: v });
    });
    this._numDoubleTap.addEventListener("change", () => {
      const v = parseInt(this._numDoubleTap.value, 10);
      if (isFinite(v)) this.storage.update({ doubleTapMs: v });
    });
    this._selTapAction.addEventListener("change", () => {
      this.storage.update({ tapAction: parseInt(this._selTapAction.value, 10) as TouchActionButton });
    });
    this._selDoubleTapAction.addEventListener("change", () => {
      this.storage.update({ doubleTapAction: parseInt(this._selDoubleTapAction.value, 10) as TouchActionButton });
    });
    this._selLongPressAction.addEventListener("change", () => {
      this.storage.update({ longPressAction: parseInt(this._selLongPressAction.value, 10) as TouchActionButton });
    });
    this._selLeftCorner.addEventListener("change", () => {
      const v = this._selLeftCorner.value;
      this.storage.update({ leftCornerAction: v === "none" ? "none" : (parseInt(v, 10) as TouchActionButton) });
    });
    this._selRightCorner.addEventListener("change", () => {
      const v = this._selRightCorner.value;
      this.storage.update({ rightCornerAction: v === "none" ? "none" : (parseInt(v, 10) as TouchActionButton) });
    });
    this._btnReset.addEventListener("click", () => {
      this.storage.set(DEFAULT_TOUCH_CONFIG);
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

    // 监听 storage 变化
    this._unsub = storage.onChange((cfg) => this._applyToUI(cfg));
  }

  private _applyToUI(cfg: TouchConfig): void {
    this._chkRightHanded.checked = cfg.rightHanded;
    this._chkShowTrail.checked = cfg.showTrail;
    this._numTrailLength.value = String(cfg.trailLength);
    this._numDeadZone.value = String(cfg.joystickDeadZone);
    this._numMaxRadius.value = String(cfg.joystickMaxRadius);
    this._numGrace.value = String(cfg.directionGraceMs);
    this._numLongPress.value = String(cfg.longPressMs);
    this._numDoubleTap.value = String(cfg.doubleTapMs);
    this._selTapAction.value = String(cfg.tapAction);
    this._selDoubleTapAction.value = String(cfg.doubleTapAction);
    this._selLongPressAction.value = String(cfg.longPressAction);
    this._selLeftCorner.value = String(cfg.leftCornerAction);
    this._selRightCorner.value = String(cfg.rightCornerAction);
  }

  destroy(): void {
    if (this._unsub) this._unsub();
    this.element.parentNode?.removeChild(this.element);
  }
}

const PANEL_CSS = `
.tsubasa2-touch-config-panel {
  position: fixed; top: 48px; left: 12px; z-index: 9999;
  width: 340px;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,.5);
  color: #c9d1d9;
  font-family: inherit;
  font-size: 12px;
}
.tsubasa2-touch-config-panel .tcp-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 10px;
  background: #161b22;
  border-bottom: 1px solid #30363d;
  border-radius: 6px 6px 0 0;
  cursor: move;
}
.tsubasa2-touch-config-panel .tcp-title { font-weight: 700; font-size: 13px; }
.tsubasa2-touch-config-panel .tcp-toggle {
  background: transparent; border: 1px solid #30363d; color: #8b949e;
  border-radius: 4px; width: 24px; height: 22px; cursor: pointer; font-size: 14px;
}
.tsubasa2-touch-config-panel .tcp-body { padding: 10px; max-height: 80vh; overflow-y: auto; }
.tsubasa2-touch-config-panel .tcp-section {
  margin-bottom: 12px; padding-bottom: 8px;
  border-bottom: 1px dashed #30363d;
}
.tsubasa2-touch-config-panel .tcp-section:last-of-type { border-bottom: none; }
.tsubasa2-touch-config-panel .tcp-section-title {
  font-weight: 700; font-size: 11px; color: #58a6ff;
  text-transform: uppercase; margin-bottom: 6px;
}
.tsubasa2-touch-config-panel .tcp-row {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 6px;
}
.tsubasa2-touch-config-panel .tcp-lbl {
  flex: 1; cursor: pointer; user-select: none;
  display: flex; align-items: center; gap: 6px;
}
.tsubasa2-touch-config-panel .tcp-lbl > input[type=number] {
  flex: 1; max-width: 80px;
  background: #010409; color: #c9d1d9;
  border: 1px solid #30363d; border-radius: 4px;
  padding: 2px 6px;
}
.tsubasa2-touch-config-panel .tcp-lbl > select {
  flex: 1;
  background: #010409; color: #c9d1d9;
  border: 1px solid #30363d; border-radius: 4px;
  padding: 2px 6px;
}
.tsubasa2-touch-config-panel input[type=checkbox] {
  margin-right: 6px; vertical-align: middle;
}
.tsubasa2-touch-config-panel .tcp-btn-reset {
  background: #21262d; border: 1px solid #30363d; color: #c9d1d9;
  border-radius: 4px; padding: 4px 10px; cursor: pointer;
}
.tsubasa2-touch-config-panel .tcp-btn-reset:hover { background: #30363d; }
.tsubasa2-touch-config-panel .tcp-fineprint {
  font-size: 10px; color: #6e7681; margin-top: 4px;
}
`;