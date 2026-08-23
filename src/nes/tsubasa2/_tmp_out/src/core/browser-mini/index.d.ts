/**
 * BrowserMini — 微信小程序版 NES 主板外壳
 *
 * 启动链路: BrowserMini → new NES → nes.loadTsROM(game/index ROM) → nes.reset()
 *   → 每帧 nes.frame() (PPU 扫描线渲染)
 *   → onFrame 回调输出 Uint32Array 帧缓冲 → ScreenMini 写 Canvas
 *
 * page 只需:
 *   const bm = new BrowserMini({ canvas });
 *   bm.start();
 *   bm.input.press(BUTTON_A);
 */
import NES from '../nes';
import { Tsubasa2 } from '../../game/index';
import ScreenMini from './screen';
import SpeakersMini from './speakers';
import FrameTimerMini from './frame-timer';
import InputMini, { BUTTON_A, BUTTON_B, BUTTON_SELECT, BUTTON_START, BUTTON_UP, BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT } from './input';
export { BUTTON_A, BUTTON_B, BUTTON_SELECT, BUTTON_START, BUTTON_UP, BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT };
export type { ButtonId } from './input';
export interface BrowserMiniOptions {
    /** 小程序 Canvas 2D 节点 (wx.createSelectorQuery 获取的 node) */
    canvas: any;
    /** 运行模式 (h5=纯浏览器 / mini=小程序) */
    mode?: 'h5' | 'mini';
    /** 帧回调 (调试/统计用) */
    onFrame?: (frameIndex: number) => void;
    /** 错误回调 */
    onError?: (e: Error) => void;
    /** 状态回调 */
    onStatus?: (status: string) => void;
}
export default class BrowserMini {
    _options: BrowserMiniOptions;
    _screen: ScreenMini;
    _speakers: SpeakersMini;
    _frameTimer: FrameTimerMini;
    _input: InputMini;
    _fpsInterval?: number;
    _frameIndex: number;
    _fpsFrameCount: number;
    _fpsLastTime: number;
    _fps: number;
    _running: boolean;
    /** NES 主板实例 (去 CPU 化, 持有 PPU/PAPU/mmap/rom) */
    _nes: NES | null;
    /** 组合根 (Tsubasa2 主类, index 层): 每帧驱动游戏逻辑 + 直写 PPU 内存 */
    _tsubasa2: Tsubasa2 | null;
    /** 当前按键掩码 (每帧 nes.frame() 前写入 NES controllers) */
    _buttons: number;
    constructor(options: BrowserMiniOptions);
    get input(): InputMini;
    get screen(): ScreenMini;
    get nes(): NES | null;
    get fps(): number;
    get frameIndex(): number;
    /**
     * 启动游戏: new NES → loadTsROM(game ROM) → reset → 帧循环
     *
     * ROM 定义来自 src/game/index (HEADER + NES_CHR_ROM + PRG bank 类)。
     * NES.loadTsROM 内部调 reset() 触发 reset 向量, 进入游戏主循环。
     */
    start(): Promise<void>;
    stop(): void;
    /**
     * 每帧生成 (由 FrameTimer 调用):
     * 1. 写入当前按键到 NES controllers
     * 2. nes.frame() (PPU 扫描线渲染, 内部触发 onFrame 回调)
     * 3. speakers.flush()
     */
    private _generateFrame;
    private _onButtonChange;
    fitInParent(containerW: number, containerH: number): {
        w: number;
        h: number;
    };
    destroy(): void;
}
