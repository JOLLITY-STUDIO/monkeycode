// Boot 启动场景 —— STATE 0x0B PATH_BUILD
// 对应 ROM 启动初始画面：播放开场内容（LOGO/标题画面）
// 播完自动或点按进入 title(0x11)
import { SceneHandler, GameState, PicPicEngine } from '../core/engine';
import { ROM_STATE, ROM_SUBSTATE } from '../core/rom-states';
import { canvasSize } from '../core/canvas-util';

export class BootScene implements SceneHandler {
  private time = 0;
  private BOOT_DURATION = 2.2; // 秒，播完自动进 title

  onEnter(_state: GameState, engine: PicPicEngine): void {
    this.time = 0;
    // 0x0B 初始化：读取存档槽（对应 0x2051D5C 5 slots 初始化）
    engine.loadSlotsFromStorageSafe();
  }

  update(dt: number, _state: GameState, engine: PicPicEngine): void {
    this.time += dt;
    if (this.time >= this.BOOT_DURATION) {
      this.gotoTitle(engine);
    }
  }

  render(ctx: CanvasRenderingContext2D, _state: GameState): void {
    const W = canvasSize(ctx).w;
    const H = canvasSize(ctx).h;

    // 深紫背景（仿 NDS 启动画面）
    ctx.fillStyle = '#150a30';
    ctx.fillRect(0, 0, W, H);

    // 顶部装饰条
    ctx.fillStyle = '#3a1d6e';
    ctx.fillRect(0, H * 0.16, W, 2);
    ctx.fillRect(0, H * 0.84, W, 2);

    // 主 LOGO
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd23f';
    ctx.font = `bold ${Math.min(W * 0.13, 58)}px sans-serif`;
    ctx.fillText('Pic Pic', W / 2, H * 0.42);

    // 副标题
    ctx.fillStyle = '#cfc3ff';
    ctx.font = `${Math.min(W * 0.045, 18)}px sans-serif`;
    ctx.fillText('トクと絵になる3つのパズル', W / 2, H * 0.42 + 42);

    // 底部提示（闪烁）
    if (Math.floor(this.time * 2) % 2 === 0) {
      ctx.fillStyle = '#9a8fc9';
      ctx.font = '14px sans-serif';
      ctx.fillText('Touch to Start', W / 2, H * 0.9);
    }
  }

  onTouch(_x: number, _y: number, _state: GameState, engine: PicPicEngine): void {
    this.gotoTitle(engine);
  }

  private gotoTitle(engine: PicPicEngine) {
    engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
    engine.setState(ROM_STATE.ST_TITLE);
  }
}
