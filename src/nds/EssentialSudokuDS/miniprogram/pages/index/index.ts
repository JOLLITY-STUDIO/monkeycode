// pages/index/index.ts — V0.16 数独玩法 UI (接 SudokuGameService + NumpleCatalog)
// 9x9 grid 渲染 / 选中 / 数字键盘 / 清除 / 提示 / 计时 / 完成检测 / 难度切换

import { SudokuGameService } from '../../utils/sudoku/game_service';
import { Coord, Value } from '../../utils/sudoku/board';
import { Difficulty } from '../../utils/sudoku/numple_puzzles';

interface ViewCell {
  r: number;      // 行
  c: number;      // 列
  v: number;      // 显示值 0=空
  given: boolean; // 给定格 (不可改, 加粗)
  err: boolean;   // 冲突错误
  sel: boolean;   // 当前选中
  same: boolean;  // 与选中格同值高亮
}

const DIFF_LABELS: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
  expert: '专家',
  daily: '每日一题',
};

const DIFF_ORDER: Array<Difficulty | 'daily'> = ['easy', 'medium', 'hard', 'expert', 'daily'];

const service = new SudokuGameService();

Page({
  data: {
    grid: [] as ViewCell[][],
    selected: null as Coord | null,
    selectedValue: 0,
    difficulty: 'easy' as Difficulty | 'daily',
    difficultyLabel: '简单',
    timerText: '00:00',
    moves: 0,
    complete: false,
    diffChips: DIFF_ORDER,
    diffLabels: DIFF_LABELS,
  },

  _timer: 0 as number,

  onLoad() {
    this._startGame('easy');
  },

  onUnload() {
    this._stopTimer();
  },

  /** 跳转图画谜题玩法 (Picture Logic / numclo) */
  onOpenPicture() {
    wx.navigateTo({ url: '/pages/picture/picture' });
  },

  /** 开始新一局 (difficulty 或 daily) */
  _startGame(diff: Difficulty | 'daily') {
    const ok = diff === 'daily'
      ? service.startNewGame()
      : service.startNewGame(diff);
    if (!ok) {
      wx.showToast({ title: '题目加载失败', icon: 'none' });
      return;
    }
    this.setData({
      difficulty: diff,
      difficultyLabel: diff === 'daily' ? '每日一题' : DIFF_LABELS[diff],
      moves: 0,
      complete: false,
    });
    this._sync();
    this._startTimer();
  },

  /** 从 board 同步到 wxml grid */
  _sync() {
    const board = service.getBoard();
    if (!board) return;
    const grid: ViewCell[][] = [];
    const sel = board.selected;
    let selValue = 0;
    for (let r = 0; r < 9; r++) {
      const row: ViewCell[] = [];
      for (let c = 0; c < 9; c++) {
        const cell = board.cells[r][c];
        const isSel = sel != null && sel.row === r && sel.col === c;
        row.push({
          r,
          c,
          v: cell.value,
          given: cell.given,
          err: cell.isError,
          sel: isSel,
          same: false,
        });
        if (isSel) selValue = cell.value;
      }
      grid.push(row);
    }
    // 第二遍: 同值高亮 (需要 selValue 已知)
    if (sel && selValue !== 0) {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (r === sel.row && c === sel.col) continue;
          if (grid[r][c].v === selValue && grid[r][c].v !== 0) {
            grid[r][c].same = true;
          }
        }
      }
    }
    this.setData({ grid, selected: sel, selectedValue: selValue });
  },

  /** 点击格子选中 */
  onTapCell(e: any) {
    const { r, c } = e.currentTarget.dataset;
    service.selectCell({ row: r, col: c });
    this._sync();
  },

  /** 数字键盘 1-9 */
  onTapNumber(e: any) {
    const num = Number(e.currentTarget.dataset.num) as Value;
    const sel = this.data.selected;
    if (!sel) {
      wx.showToast({ title: '先点选一个格子', icon: 'none' });
      return;
    }
    const board = service.getBoard();
    if (!board) return;
    const cell = board.cells[sel.row][sel.col];
    if (cell.given) {
      wx.showToast({ title: '给定格不可修改', icon: 'none' });
      return;
    }
    service.inputValue(sel.row, sel.col, num);
    this.setData({ moves: service.getSessionInfo()?.moves ?? 0 });
    this._sync();
    this._checkComplete();
  },

  /** 清除选中格 */
  onTapClear() {
    const sel = this.data.selected;
    if (!sel) return;
    service.clearAt(sel.row, sel.col);
    this.setData({ moves: service.getSessionInfo()?.moves ?? 0 });
    this._sync();
  },

  /** 提示: 自动填入下一空/错格 */
  onTapHint() {
    const h = service.hint();
    if (!h) {
      wx.showToast({ title: '已无空格或全部正确', icon: 'none' });
      return;
    }
    service.selectCell({ row: h.row, col: h.col });
    service.inputValue(h.row, h.col, h.value);
    this.setData({ moves: service.getSessionInfo()?.moves ?? 0 });
    this._sync();
    this._checkComplete();
  },

  /** 难度切换 */
  onTapDifficulty(e: any) {
    const d = e.currentTarget.dataset.diff as Difficulty | 'daily';
    this._startGame(d);
  },

  /** 完成检测 */
  _checkComplete() {
    const res = service.checkCompletion();
    if (res.complete) {
      this._stopTimer();
      this.setData({ complete: true });
      const info = service.getSessionInfo();
      wx.showModal({
        title: '🎉 完成!',
        content: `用时 ${this.data.timerText}，步数 ${info?.moves ?? 0}。再来一局?`,
        confirmText: '再来一局',
        cancelText: '关闭',
        success: (r) => {
          if (r.confirm) this._startGame(this.data.difficulty);
        },
      });
    } else if (res.valid) {
      // 无错误但未完成: 静默
    } else {
      wx.showToast({ title: `有 ${res.errors} 处冲突`, icon: 'none' });
    }
  },

  /** 计时器 */
  _startTimer() {
    this._stopTimer();
    this._timer = setInterval(() => {
      const info = service.getSessionInfo();
      if (!info) return;
      const sec = Math.floor(info.elapsedMs / 1000);
      const mm = String(Math.floor(sec / 60)).padStart(2, '0');
      const ss = String(sec % 60).padStart(2, '0');
      this.setData({ timerText: `${mm}:${ss}` });
    }, 1000);
  },

  _stopTimer() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = 0;
    }
  },
});
