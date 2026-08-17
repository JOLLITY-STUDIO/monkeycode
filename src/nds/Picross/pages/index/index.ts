/**
 * pages/index —— Picross DS 游戏页
 * 绑定 type=2d Canvas，接入 PicrossEngine + PicrossRenderer
 * 触摸：单点循环切换（涂黑→画叉→清除），拖动连续绘制
 */
import { PicrossEngine } from "../../src/core/engine";
import { PicrossRenderer } from "../../src/render/renderer";
import { PUZZLES } from "../../src/data/puzzles";
import { puzzleFromData } from "../../src/core/puzzle-loader";
import { recordPuzzle } from "../../src/core/save";
import { getLang, Lang, uiStrings, puzzleName } from "../../src/i18n";
import { Sfx } from "../../src/audio/sfx";

interface BoardNode {
  width: number;
  height: number;
  getContext(type: "2d"): CanvasRenderingContext2D;
  requestAnimationFrame(cb: () => void): number;
}

Page({
  data: {
    puzzleName: "",
    timeText: "0:00",
    mistakes: 0,
    maxMistakes: 5,
    progress: 0,
    solved: false,
    failed: false,
    stars: 0,
    markMode: "cycle" as "cycle" | "cross",
    flashError: false,
    t: {} as Record<string, string>,
  },

  // F1: 上次失误数（用于红闪反馈）
  lastMistakes: 0,
  flashTimer: null as any,

  // ---- 实例字段（挂载到页面对象，避免 setData 开销）----
  sfx: null as Sfx | null,
  engine: null as PicrossEngine | null,
  renderer: null as PicrossRenderer | null,
  board: null as BoardNode | null,
  rect: null as any,
  dpr: 2,
  puzzleIndex: 0,
  curPuzzleId: 0,
  lang: "zh" as Lang,
  lastCell: null as { x: number; y: number } | null,

  onLoad(options: any) {
    // 拼图 id 与数组索引不再一致（空拼图已过滤，保留原 ROM id），需按 id 定位
    const id = options && options.puzzle !== undefined ? parseInt(options.puzzle, 10) : NaN;
    const idx = isNaN(id) ? -1 : PUZZLES.findIndex((p) => p.id === id);
    this.puzzleIndex = idx >= 0 ? idx : 0;
    this.lang = getLang();
    this.lastCell = null;
    this.engine = null;
  },

  onReady() {
    this.sfx = new Sfx();
    this.dpr = (wx.getSystemInfoSync() && wx.getSystemInfoSync().pixelRatio) || 2;
    wx.createSelectorQuery()
      .select("#board")
      .fields({ node: true, size: true, rect: true })
      .exec((res: any[]) => {
        if (!res || !res[0] || !res[0].node) return;
        const { node, width, height, rect } = res[0];
        node.width = width * this.dpr;
        node.height = height * this.dpr;
        this.board = node;
        this.rect = rect;
        this.startPuzzle(this.puzzleIndex);
        const loop = () => {
          if (this.engine && this.renderer) {
            this.renderer.draw(this.engine.getState());
          }
          node.requestAnimationFrame(loop);
        };
        node.requestAnimationFrame(loop);
      });
  },

  /** 从 PuzzleData 构造 Puzzle（hex → Uint8Array） */
  private buildPuzzle(idx: number) {
    return puzzleFromData(PUZZLES[idx % PUZZLES.length]);
  },

  /** 拼图名：按语言取 ROM 提取名（B3），无则回退 Picross N */
  private puzzleTitle(idx: number): string {
    const p = PUZZLES[idx % PUZZLES.length];
    return puzzleName(this.lang, p.id);
  },

  startPuzzle(idx: number) {
    if (this.engine) this.engine.destroy();
    const puzzle = this.buildPuzzle(idx);
    this.lastMistakes = 0;
    if (this.flashTimer) {
      clearTimeout(this.flashTimer);
      this.flashTimer = null;
    }
    this.curPuzzleId = puzzle.id;
    this.engine = new PicrossEngine(puzzle, {
      onStateChange: (s) => this.syncState(s),
      onSolved: (s) => {
        const stars = this.starsFor(s);
        this.syncState(s);
        this.setData({ stars });
        recordPuzzle(puzzle.id, stars, s.elapsedSec);
        wx.vibrateShort && wx.vibrateShort({ type: "medium" });
        if (this.sfx) this.sfx.play("win");
      },
    });
    this.renderer = this.board ? new PicrossRenderer(this.board) : null;
    this.lastCell = null;
    this.engine.start();
    this.setData({
      puzzleName: this.puzzleTitle(this.puzzleIndex),
      solved: false,
      failed: false,
      stars: 0,
      t: uiStrings(this.lang),
    });
  },

  /** 结算星级：0 失误 3 星，1-2 失误 2 星，其余 1 星 */
  private starsFor(s: any): number {
    if (s.mistakes <= 0) return 3;
    if (s.mistakes <= 2) return 2;
    return 1;
  },

  syncState(s: any) {
    const mm = s.elapsedSec % 60;
    const tt = Math.floor(s.elapsedSec / 60);
    const flashError = s.mistakes > this.lastMistakes;
    this.lastMistakes = s.mistakes;
    if (flashError) {
      if (this.flashTimer) clearTimeout(this.flashTimer);
      this.flashTimer = setTimeout(() => this.setData({ flashError: false }), 500);
      if (this.sfx) this.sfx.play("mistake");
    }
    this.setData({
      timeText: `${tt}:${mm < 10 ? "0" : ""}${mm}`,
      mistakes: s.mistakes,
      maxMistakes: s.maxMistakes,
      progress: Math.min(100, Math.round((s.filledCount / s.totalFilled) * 100)),
      solved: s.solved,
      failed: s.failed,
      flashError: flashError || this.data.flashError,
    });
  },

  /** 触摸坐标 → 网格单元（CSS 像素 × dpr → 设备像素） */
  private cellFromTouch(e: any): { x: number; y: number } | null {
    if (!this.engine || !this.rect) return null;
    const t = e.touches && e.touches[0];
    if (!t) return null;
    const state = this.engine.getState();
    const h = this.renderer!.hitTest(
      (t.x - this.rect.left) * this.dpr,
      (t.y - this.rect.top) * this.dpr,
      state
    );
    return h.type === "cell" ? { x: h.x, y: h.y } : null;
  },

  onTouchStart(e: any) {
    const c = this.cellFromTouch(e);
    if (!c || !this.engine) return;
    this.lastCell = c;
    this.applyMark(c.x, c.y);
  },

  onTouchMove(e: any) {
    const c = this.cellFromTouch(e);
    if (!c || !this.engine || !this.lastCell) return;
    if (c.x === this.lastCell.x && c.y === this.lastCell.y) return;
    this.lastCell = c;
    this.applyMark(c.x, c.y);
  },

  onTouchEnd() {
    this.lastCell = null;
  },

  private applyMark(x: number, y: number) {
    if (!this.engine) return;
    const mode = this.data.markMode;
    if (mode === "cross") {
      this.engine.tapCell(x, y, "mark", "crossed");
      if (this.sfx) this.sfx.play("cross");
      return;
    }
    // cycle / fill：按当前格状态预判音效
    const st = this.engine.getState();
    const cur = st.marks[y * st.puzzle.width + x];
    if (mode === "cycle" && cur === "filled") {
      this.engine.tapCell(x, y, "cycle");
      if (this.sfx) this.sfx.play("cross");
      return;
    }
    this.engine.tapCell(x, y, mode === "cycle" ? "cycle" : "mark", "filled");
    if (this.sfx) this.sfx.play(cur === "crossed" ? "clear" : "tap");
  },

  onToggleMark() {
    this.setData({ markMode: this.data.markMode === "cross" ? "cycle" : "cross" });
  },

  onReset() {
    this.startPuzzle(this.puzzleIndex);
  },

  onPrev() {
    this.puzzleIndex = (this.puzzleIndex - 1 + PUZZLES.length) % PUZZLES.length;
    this.startPuzzle(this.puzzleIndex);
  },

  onNext() {
    this.puzzleIndex = (this.puzzleIndex + 1) % PUZZLES.length;
    this.startPuzzle(this.puzzleIndex);
  },

  onBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack({ delta: 1 });
    } else {
      wx.reLaunch({ url: "/pages/select/select" });
    }
  },

  onUnload() {
    if (this.engine) this.engine.destroy();
  },
});
