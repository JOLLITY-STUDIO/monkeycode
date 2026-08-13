// 页面接线 —— 严格按真实 ROM 状态机注册场景
// boot → title(0x11) → f_make命名 → mode select(0x12) → state select(0x0D)
//      → gaming(0x13) → achieve(0x14) → saving(0x10) → 回 state select(0x08→0x0D)
import { PicPicEngine, PuzzleData } from '../../engine/core/engine';
import { ROM_STATE } from '../../engine/core/rom-states';
import { BootScene } from '../../engine/scenes/boot-scene';
import { TitleScene } from '../../engine/scenes/title-scene';
import { ModeSelectScene } from '../../engine/scenes/mode-select-scene';
import { StateSelectScene } from '../../engine/scenes/state-select-scene';
import { GameScene } from '../../engine/scenes/game-scene';
import { AchieveScene } from '../../engine/scenes/achieve-scene';

Page({
  data: {},
  engine: null as PicPicEngine | null,
  gameScene: null as GameScene | null,
  currentPuzzle: null as PuzzleData | null,

  onReady() {
    const query = wx.createSelectorQuery();
    query.select('#gameCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const wxAny = wx as any;
        const dpr = (wxAny.getWindowInfo ? wxAny.getWindowInfo() : wxAny.getSystemInfoSync()).pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        const engine = new PicPicEngine(ctx);
        this.engine = engine;

        // ===== 真实状态注册 =====
        // STATE 0x0B 启动画面（boot 初始内容，播完自动进 title）
        engine.register(ROM_STATE.ST_PATH_BUILD, new BootScene());

        // STATE 0x11 标题 + 建档命名（title/ + f_make/）
        engine.register(ROM_STATE.ST_TITLE, new TitleScene());

        // STATE 0x12 模式选择（cinario_select/）
        engine.register(ROM_STATE.ST_MODE_SELECT, new ModeSelectScene());

        // STATE 0x0D 选关（select/ + No_window_map/lap/fap）
        engine.register(ROM_STATE.ST_STATE_SELECT, new StateSelectScene());

        // STATE 0x13 游玩（map/ lap/ fap/）—— 由选关场景动态装载
        engine.register(ROM_STATE.ST_GAMING, {
          update: (_dt, _st, _en) => {},
          render: (_ctx) => {},
        } as any);

        // STATE 0x14 完成画面（map_comp/ lap_comp/ fap_comp/）
        engine.register(ROM_STATE.ST_ACHIEVE, new AchieveScene());

        // STATE 0x10 / 0x0E / 0x0B / 0x0C / 0x08 均为引擎内部服务状态

        engine.start();
      });
  },

  onTouchStart(e: any) {
    const engine = this.engine;
    if (!engine) return;
    const t = e.touches[0];
    const handler = engine.getHandler(engine.state.rom.state);
    if (!handler || !handler.onTouch) return;
    handler.onTouch(t.x, t.y, engine.state, engine);

    // 游玩中绘制
    if (engine.state.rom.state === ROM_STATE.ST_GAMING && this.gameScene && this.currentPuzzle) {
      const target = this.gameScene.getPaintTarget();
      if (target) {
        engine.beginStroke();
        engine.paintCell(target.x, target.y, target.color);
        engine.checkComplete(this.currentPuzzle);
      }
    }
  },

  onTouchMove(e: any) {
    const engine = this.engine;
    if (!engine) return;
    const t = e.touches[0];
    const handler = engine.getHandler(engine.state.rom.state);
    if (!handler || !handler.onTouchMove) return;
    handler.onTouchMove(t.x, t.y, engine.state, engine);

    if (engine.state.rom.state === ROM_STATE.ST_GAMING && this.gameScene && this.currentPuzzle) {
      const target = this.gameScene.getPaintTarget();
      if (target) {
        engine.paintCell(target.x, target.y, target.color);
        engine.checkComplete(this.currentPuzzle);
      }
    }
  },

  onTouchEnd() {
    const engine = this.engine;
    if (!engine) return;
    const handler = engine.getHandler(engine.state.rom.state);
    if (handler && handler.onTouchEnd) {
      handler.onTouchEnd(engine.state, engine);
    }
  },

  onUnload() {
    this.engine?.stop();
  },
});
