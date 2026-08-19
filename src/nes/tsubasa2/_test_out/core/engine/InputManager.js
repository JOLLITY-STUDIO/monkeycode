"use strict";
/**
 * 输入管理器
 *
 * 负责:
 *   1. 键盘事件监听 (HTML 环境)
 *   2. 触摸事件映射 (微信小程序环境)
 *   3. 按键状态缓存 (当前/上一帧/边沿)
 *
 * 小程序环境通过 Tsubasa2.setButtons() 直接驱动。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputManager = void 0;
const types_1 = require("../../core/types");
class InputManager {
    constructor() {
        /** 当前状态 */
        this.state = {
            current: 0,
            previous: 0,
            pressed: 0,
            released: 0,
        };
        /** 键盘 → NES 按键映射 */
        this._keyMap = new Map([
            ['ArrowUp', types_1.BUTTON.UP],
            ['ArrowDown', types_1.BUTTON.DOWN],
            ['ArrowLeft', types_1.BUTTON.LEFT],
            ['ArrowRight', types_1.BUTTON.RIGHT],
            ['z', types_1.BUTTON.A],
            ['Z', types_1.BUTTON.A],
            ['x', types_1.BUTTON.B],
            ['X', types_1.BUTTON.B],
            ['Enter', types_1.BUTTON.START],
            ['Shift', types_1.BUTTON.SELECT],
            [' ', types_1.BUTTON.START], // 空格也映射START
        ]);
        this._boundKeyDown = null;
        this._boundKeyUp = null;
    }
    // ── 键盘绑定 (HTML 环境) ──
    /** 绑定键盘事件到 window */
    bindKeyboard() {
        this._boundKeyDown = this._onKeyDown.bind(this);
        this._boundKeyUp = this._onKeyUp.bind(this);
        window.addEventListener('keydown', this._boundKeyDown);
        window.addEventListener('keyup', this._boundKeyUp);
    }
    /** 解绑 */
    unbind() {
        if (this._boundKeyDown) {
            window.removeEventListener('keydown', this._boundKeyDown);
        }
        if (this._boundKeyUp) {
            window.removeEventListener('keyup', this._boundKeyUp);
        }
    }
    /** 直接从外部设置按键 (小程序触摸映射) */
    setButtons(mask) {
        this.state.current = mask;
    }
    /** 按下单个按键 */
    press(btn) {
        this.state.current |= btn;
    }
    /** 释放单个按键 */
    release(btn) {
        this.state.current &= ~btn;
    }
    /** 每帧轮询 (计算边沿) */
    poll() {
        this.state.pressed =
            this.state.current & ~this.state.previous;
        this.state.released =
            this.state.previous & ~this.state.current;
        this.state.previous = this.state.current;
    }
    // ── 查询 ──
    /** 按键持续按住 */
    isHeld(btn) {
        return (this.state.current & btn) !== 0;
    }
    /** 本帧刚按下 */
    isPressed(btn) {
        return (this.state.pressed & btn) !== 0;
    }
    /** 本帧刚释放 */
    isReleased(btn) {
        return (this.state.released & btn) !== 0;
    }
    // ── 内部 ──
    _onKeyDown(e) {
        const btn = this._keyMap.get(e.key);
        if (btn != null) {
            e.preventDefault();
            this.state.current |= btn;
        }
    }
    _onKeyUp(e) {
        const btn = this._keyMap.get(e.key);
        if (btn != null) {
            e.preventDefault();
            this.state.current &= ~btn;
        }
    }
}
exports.InputManager = InputManager;
