/**
 * Web 浏览器平台实现
 *
 * 适配浏览器 Canvas 2D API:
 * - Canvas: 标准 HTML5 Canvas
 * - ROM: 用户通过 <input type=file> 选择
 * - 存档: localStorage
 * - 输入: 键盘事件
 */

import { IPlatform, TouchEvent, TouchEventType, KeyEvent } from './IPlatform';

export class WebPlatform implements IPlatform {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  private touchCallbacks: Map<TouchEventType, (e: TouchEvent[]) => void> = new Map();
  private keyCallbacks: ((e: KeyEvent) => void)[] = [];

  /** ROM 文件输入元素 */
  romFileInput: HTMLInputElement;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d')!;

    // 创建隐藏的 ROM 文件选择器
    this.romFileInput = document.createElement('input');
    this.romFileInput.type = 'file';
    this.romFileInput.accept = '.md,.bin,.gen,.smd';
    this.romFileInput.style.display = 'none';
    document.body.appendChild(this.romFileInput);
    this.setupKeyboard();
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get ctx(): CanvasRenderingContext2D {
    return this._ctx;
  }

  get displayWidth(): number {
    return 960; // 3x scale display
  }

  get displayHeight(): number {
    return 672; // 3x scale display
  }

  // ============================================================
  // 帧循环
  // ============================================================

  requestFrame(callback: () => void): number {
    return requestAnimationFrame(callback);
  }

  cancelFrame(id: number): void {
    cancelAnimationFrame(id);
  }

  // ============================================================
  // 触摸事件 (mobile)
  // ============================================================

  onTouch(type: TouchEventType, callback: (e: TouchEvent[]) => void): void {
    this.touchCallbacks.set(type, callback);
  }

  // ============================================================
  // 键盘输入
  // ============================================================

  private setupKeyboard(): void {
    const keyMap: Record<string, string> = {
      'ArrowUp':    'UP',
      'ArrowDown':  'DOWN',
      'ArrowLeft':  'LEFT',
      'ArrowRight': 'RIGHT',
      'Enter':      'START',
      ' ':          'START',
      'KeyA':       'A',
      'KeyS':       'B',
      'KeyZ':       'A',
      'KeyX':       'B',
      'KeyC':       'C',
      'KeyQ':       'X',
      'KeyW':       'Y',
      'KeyE':       'Z',
      'ShiftLeft':  'MODE',
      'ShiftRight': 'MODE',
    };

    window.addEventListener('keydown', (e) => {
      const mapped = keyMap[e.code];
      if (mapped) {
        e.preventDefault();
        for (const cb of this.keyCallbacks) {
          cb({ key: mapped, pressed: true });
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      const mapped = keyMap[e.code];
      if (mapped) {
        e.preventDefault();
        for (const cb of this.keyCallbacks) {
          cb({ key: mapped, pressed: false });
        }
      }
    });
  }

  onKey(callback: (e: KeyEvent) => void): void {
    this.keyCallbacks.push(callback);
  }

  // ============================================================
  // ROM 加载
  // ============================================================

  async loadRomBinary(): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const input = this.romFileInput;

      const onChange = () => {
        input.removeEventListener('change', onChange);
        const file = input.files?.[0];
        if (!file) {
          reject(new Error('未选择 ROM 文件'));
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as ArrayBuffer);
        };
        reader.onerror = () => {
          reject(new Error('读取 ROM 文件失败'));
        };
        reader.readAsArrayBuffer(file);
      };

      input.addEventListener('change', onChange);
      input.click();
    });
  }

  // ============================================================
  // 存档 (SRAM 16KB → localStorage)
  // ============================================================

  async saveData(key: string, data: Uint8Array): Promise<void> {
    const base64 = btoa(String.fromCharCode(...data));
    localStorage.setItem(`sram_${key}`, base64);
  }

  async loadData(key: string): Promise<Uint8Array | null> {
    const base64 = localStorage.getItem(`sram_${key}`);
    if (!base64) return null;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  // ============================================================
  // 音频
  // ============================================================

  createAudioContext(): AudioContext | null {
    try {
      return new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
}
