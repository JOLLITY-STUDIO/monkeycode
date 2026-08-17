/**
 * pages/index —— Picross DS 游戏页
 * 绑定 type=2d Canvas，接入 PicrossEngine + PicrossRenderer
 * 触摸：单点循环切换（涂黑→画叉→清除），拖动连续绘制
 */
import { PicrossEngine } from "../../src/core/engine";
import { PicrossRenderer } from "../../src/render/renderer";
import { PUZZLES } from "../../src/data/puzzles";
import { puzzleFromData } from "../../src/core/puzzle-loader";

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
    markMode: "cycle" as "cycle" | "cross",
  },

  // ---- 实例字段（挂载到页面对象，避免 setData 开销）----
  engine: null as PicrossEngine | null,
  renderer: null as PicrossRenderer | null,
  board: null as BoardNode | null,
  rect: null as any,
  dpr: 2,
  puzzleIndex: 0,
  lastCell: null as { x: number; y: number } | null,

  onLoad() {
    this.puzzleIndex = 0;
    this.lastCell = null;
    this.engine = null;
  },

  onReady() {
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

  startPuzzle(idx: number) {
    if (this.engine) this.engine.destroy();
    const puzzle = this.buildPuzzle(idx);
    this.engine = new PicrossEngine(puzzle, {
      onStateChange: (s) => this.syncState(s),
      onSolved: (s) => {
        this.syncState(s);
        wx.vibrateShort && wx.vibrateShort({ type: "medium" });
      },
    });
    this.renderer = this.board ? new PicrossRenderer(this.board) : null;
    this.lastCell = null;
    this.engine.start();
    this.setData({
      puzzleName: puzzle.name,
      solved: false,
    });
  },

  syncState(s: any) {
    const mm = s.elapsedSec % 60;
    const tt = Math.floor(s.elapsedSec / 60);
    this.setData({
      timeText: `${tt}:${mm < 10 ? "0" : ""}${mm}`,
      mistakes: s.mistakes,
      maxMistakes: s.maxMistakes,
      progress: Math.min(100, Math.round((s.filledCount / s.totalFilled) * 100)),
      solved: s.solved,
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
    } else if (mode === "cycle") {
      this.engine.tapCell(x, y, "cycle");
    } else {
      this.engine.tapCell(x, y, "mark", "filled");
    }
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

  onUnload() {
    if (this.engine) this.engine.destroy();
  },
});
