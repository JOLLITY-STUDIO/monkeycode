// 页面接线 —— 严格按真实 ROM 状态机注册场景
// boot → title(0x11) → f_make命名 → mode select(0x12) → state select(0x0D)
//      → gaming(0x13) → achieve(0x14) → saving(0x10) → 回 state select(0x08→0x0D)
// 所有 UI（按钮/面板/文本）均由场景在 canvas 内自绘，页面仅负责创建引擎 + 转发触摸
import { PicPicEngine, GameState } from '../../engine/core/engine';
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
  currentPuzzle: null as any,

  onReady() {
    const query = wx.createSelectorQuery();
    // NDS 双屏：上屏显示（canvasTop）/ 下屏交互（canvasMain），两个容器各控制一半
    query.select('#canvasTop').fields({ node: true, size: true });
    query.select('#canvasMain').fields({ node: true, size: true });
    query.exec((res) => {
      const wxAny = wx as any;
      const info = wxAny.getWindowInfo ? wxAny.getWindowInfo() : wxAny.getSystemInfoSync();
      const dpr = info.pixelRatio;
      const setupCanvas = (r: any): CanvasRenderingContext2D => {
        const canvas = r.node;
        canvas.width = r.width * dpr;
        canvas.height = r.height * dpr;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.scale(dpr, dpr);
        return ctx;
      };
      const topCtx = setupCanvas(res[0]);
      const mainCtx = setupCanvas(res[1]);

      // 主引擎渲染到下屏（交互屏），上屏作为副屏（显示目标/进度等）
      const engine = new PicPicEngine(mainCtx, { topCtx });
      // 竖屏上屏内容从导航栏（胶囊按钮）底部再往下 4px 开始，避开系统状态栏+胶囊按钮区域
      const menuRect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : { bottom: 0 };
      const topInset = (menuRect && menuRect.bottom > 0) ? menuRect.bottom + 4 : (info.statusBarHeight || 0) + 48;
      engine.topInset = topInset;
      this.engine = engine;

      // 状态变化回调：同步游玩场景引用（供涂色命中与完成判定），不发 setData
      engine.onStateChange = (state) => {
        if (state.rom.state === ROM_STATE.ST_GAMING) {
          const gs = engine.getHandler(ROM_STATE.ST_GAMING) as any;
          if (gs && typeof gs.getPuzzle === 'function') {
            if (gs !== this.gameScene) {
              this.gameScene = gs;
              this.currentPuzzle = gs.getPuzzle();
            }
          } else {
            // 迷宫场景无涂色接口（迷宫由场景内部处理滑动移动）
            this.gameScene = null;
            this.currentPuzzle = null;
          }
        }
      };

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
        update: (_dt: number, _st: GameState, _en: any) => {},
        render: (_ctx: CanvasRenderingContext2D) => {},
      } as any);

      // STATE 0x14 完成画面（map_comp/ lap_comp/ fap_comp/）
      engine.register(ROM_STATE.ST_ACHIEVE, new AchieveScene());

      // STATE 0x10 / 0x0E / 0x0B / 0x0C / 0x08 均为引擎内部服务状态

      engine.start();
    });
  },

  // ===== 画布触摸（转发给场景；游玩中处理涂色） =====
  onTouchStart(e: any) {
    const engine = this.engine;
    if (!engine || engine.isFading()) return;
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
    if (!engine || engine.isFading()) return;
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
    if (!engine || engine.isFading()) return;
    const handler = engine.getHandler(engine.state.rom.state);
    if (handler && handler.onTouchEnd) {
      handler.onTouchEnd(engine.state, engine);
    }
  },

  onUnload() {
    this.engine?.stop();
  },
});
