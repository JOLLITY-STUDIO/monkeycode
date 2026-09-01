// pages/picture/picture.ts — 图画谜题玩法 (Picture Logic / numclo) V0.17.11
// 15x15 彩色网格 / 调色板 / 完成检测 / 类别切换 / 上/下/随机导航
// 数据: miniprogram/utils/sudoku/numclo_puzzles.ts (1525 puzzles) + numclo_answers.ts

import { PictureGameService } from '../../utils/sudoku/picture_game_service';
import { CellColor } from '../../utils/sudoku/numclo_puzzles';
import { NUMCLO_ANSWERS } from '../../utils/sudoku/numclo_answers';

const GRID = 15;
const TOTAL_CELLS = GRID * GRID;

/** 6 色调色板: 0=擦除(白底), 1..5=画笔色 */
const PALETTE_HEX = ['#ffffff', '#e53935', '#fdd835', '#1e88e5', '#43a047', '#8e24aa'];
const PALETTE_LABELS = ['擦除', '', '', '', '', ''];
const PALETTE_BORDERS = ['#c8d0d8', '#c62828', '#f9a825', '#1565c0', '#2e7d32', '#6a1b9a'];

/** 15 个类别 (numclo0-9 主题库 + numclo_00-03 附加 + numclo_tu 教程) */
const CATEGORIES: Array<{ key: string; label: string }> = [
  { key: 'numclo0.data', label: '动物' },
  { key: 'numclo1.data', label: '科学' },
  { key: 'numclo2.data', label: '地标' },
  { key: 'numclo3.data', label: '家电' },
  { key: 'numclo4.data', label: '玩具' },
  { key: 'numclo5.data', label: '自然' },
  { key: 'numclo6.data', label: '交通' },
  { key: 'numclo7.data', label: '美食' },
  { key: 'numclo8.data', label: '生活' },
  { key: 'numclo9.data', label: '符号' },
  { key: 'numclo_00.data', label: '附加1' },
  { key: 'numclo_01.data', label: '附加2' },
  { key: 'numclo_02.data', label: '附加3' },
  { key: 'numclo_03.data', label: '附加4' },
  { key: 'numclo_tu.data', label: '教程' },
];

interface PictureCell {
  i: number;       // 展平索引
  r: number;       // 行 0..14
  c: number;       // 列 0..14
  v: number;       // 玩家当前颜色 0..5
  t: number;       // 目标颜色 0..5
  bg: string;      // 背景色 hex
  border: string;  // 边框色 hex
}

/** 行列提示: 一条连续同色块 (Nonogram run)。color 0 = 占位(空行/列)。 */
interface ClueRun {
  color: number;
  count: number;
  key: number; // 列内唯一 key (wx:key)
}

/**
 * 从目标网格计算 15 行 + 15 列的颜色 runs (Nonogram-style clues)。
 * 忽略背景色 0; 连续同色合并为一个 run; 全空行/列返回 [{color:0,count:0}] 占位。
 */
function computeClues(target: CellColor[]): { rows: ClueRun[][]; cols: ClueRun[][] } {
  const rows: ClueRun[][] = [];
  const cols: ClueRun[][] = [];
  for (let r = 0; r < GRID; r++) {
    rows.push(runsOf(target.slice(r * GRID, r * GRID + GRID)));
  }
  for (let c = 0; c < GRID; c++) {
    const col: number[] = [];
    for (let r = 0; r < GRID; r++) col.push(target[r * GRID + c]);
    cols.push(runsOf(col));
  }
  return { rows, cols };
}

function runsOf(seq: number[]): ClueRun[] {
  const runs: ClueRun[] = [];
  let cur = 0;
  let count = 0;
  for (const v of seq) {
    if (v === cur) {
      if (cur !== 0) count += 1;
      continue;
    }
    if (cur !== 0) runs.push({ color: cur, count, key: runs.length });
    cur = v;
    count = v !== 0 ? 1 : 0;
  }
  if (cur !== 0) runs.push({ color: cur, count, key: runs.length });
  return runs.length ? runs : [{ color: 0, count: 0, key: 0 }];
}

const service = new PictureGameService();

Page({
  data: {
    cells: [] as PictureCell[],
    categories: CATEGORIES,
    currentFile: 'numclo0.data',
    puzzleName: '',
    puzzleIndex: 0,      // 文件内索引 0-based
    puzzleCount: 100,
    palette: PALETTE_HEX.map((color, id) => ({
      id,
      color,
      label: PALETTE_LABELS[id],
      border: PALETTE_BORDERS[id],
    })),
    selectedColor: 1 as number,
    timerText: '00:00',
    moves: 0,
    complete: false,
    showingAnswer: false,
    correctCount: 0,           // 已正确格数 (进度)
    rowClues: [] as ClueRun[][],
    colClues: [] as ClueRun[][],
  },

  _timer: 0 as number,

  onLoad(query?: any) {
    // V0.18.7: 支持列表页跳入 (query.file + query.idx)
    if (query && query.file) {
      const key = String(query.file);
      const idx = Number(query.idx || 0);
      if (CATEGORIES.some((c) => c.key === key)) {
        this._startPuzzle(key, idx);
        return;
      }
    }
    // 默认打开动物类第 1 题
    this._startPuzzle('numclo0.data', 0);
  },

  onUnload() {
    this._stopTimer();
  },

  /** 开一题: fileKey + indexInFile */
  _startPuzzle(fileKey: string, indexInFile: number) {
    const res = service.startPuzzleInFile(fileKey, indexInFile);
    if (!res.ok) {
      wx.showToast({ title: '题目加载失败', icon: 'none' });
      return;
    }
    const info = service.getPuzzleInfo();
    const answers = NUMCLO_ANSWERS[fileKey] || [];
    const name = info?.name || answers[indexInFile] || '第 ' + (indexInFile + 1) + ' 题';
    const list = service.listFilePuzzleIds(fileKey);
    const target = service.getTarget();
    const clues = computeClues(target);
    const cells: PictureCell[] = [];
    for (let i = 0; i < TOTAL_CELLS; i++) {
      const t = target[i];
      cells.push({
        i,
        r: Math.floor(i / GRID),
        c: i % GRID,
        v: 0,
        t,
        bg: PALETTE_HEX[0],
        border: PALETTE_BORDERS[0],
      });
    }
    this.setData({
      cells,
      currentFile: fileKey,
      puzzleName: name,
      puzzleIndex: indexInFile,
      puzzleCount: list.length,
      moves: 0,
      complete: false,
      showingAnswer: false,
      correctCount: 0,
      rowClues: clues.rows,
      colClues: clues.cols,
    });
    this._startTimer();
  },

  /** 类别切换 */
  onTapCategory(e: any) {
    const key = e.currentTarget.dataset.key as string;
    if (key === this.data.currentFile) return;
    this._startPuzzle(key, 0);
  },

  /** 上一题 */
  onPrev() {
    const { currentFile, puzzleIndex, puzzleCount } = this.data;
    const idx = (puzzleIndex - 1 + puzzleCount) % puzzleCount;
    this._startPuzzle(currentFile, idx);
  },

  /** 下一题 */
  onNext() {
    const { currentFile, puzzleIndex, puzzleCount } = this.data;
    const idx = (puzzleIndex + 1) % puzzleCount;
    this._startPuzzle(currentFile, idx);
  },

  /** 随机一题 (当前类别) */
  onRandom() {
    const { currentFile, puzzleCount } = this.data;
    let idx = Math.floor(Math.random() * puzzleCount);
    if (puzzleCount > 1 && idx === this.data.puzzleIndex) {
      idx = (idx + 1) % puzzleCount;
    }
    this._startPuzzle(currentFile, idx);
  },

  /** 点格子涂色 */
  onTapCell(e: any) {
    if (this.data.showingAnswer || this.data.complete) return;
    const i = Number(e.currentTarget.dataset.i);
    const color = this.data.selectedColor as CellColor;
    const cells = this.data.cells.slice();
    const cell = cells[i];
    if (!cell) return;
    // 同一格再点一次当前色 = 擦除
    const next = cell.v === color ? 0 : color;
    service.paint(cell.r, cell.c, next as CellColor);
    cell.v = next;
    cell.bg = PALETTE_HEX[next];
    cell.border = PALETTE_BORDERS[next];
    this.setData({ cells });
    this._checkComplete();
  },

  /** 调色板选色 */
  onTapPalette(e: any) {
    if (this.data.showingAnswer) return;
    const id = Number(e.currentTarget.dataset.id);
    this.setData({ selectedColor: id });
  },

  /** 显示/隐藏答案 */
  onToggleAnswer() {
    const showing = !this.data.showingAnswer;
    const cells = this.data.cells.slice();
    if (showing) {
      for (const cell of cells) {
        cell.bg = PALETTE_HEX[cell.t];
        cell.border = PALETTE_BORDERS[cell.t];
      }
    } else {
      for (const cell of cells) {
        cell.bg = PALETTE_HEX[cell.v];
        cell.border = PALETTE_BORDERS[cell.v];
      }
    }
    this.setData({ showingAnswer: showing, cells });
  },

  /** 清空画板 */
  onClearAll() {
    if (this.data.showingAnswer) return;
    const cells = this.data.cells.slice();
    for (const cell of cells) {
      cell.v = 0;
      cell.bg = PALETTE_HEX[0];
      cell.border = PALETTE_BORDERS[0];
    }
    this.setData({ cells, moves: 0 });
  },

  /** 提示 run 颜色 hex (color 0 占位灰) */
  clueColor(color: number): string {
    return PALETTE_HEX[color] || '#9aa7b4';
  },

  /** 完成检测 */
  _checkComplete() {
    const info = service.getSessionInfo();
    const res = service.checkComplete();
    this.setData({ moves: info?.moves ?? 0, correctCount: TOTAL_CELLS - res.wrong });
    if (res.complete) {
      this._stopTimer();
      this.setData({ complete: true });
      wx.showModal({
        title: '🎉 完成!',
        content: `${this.data.puzzleName} 用时 ${this.data.timerText}，${info?.moves ?? 0} 步。下一题?`,
        confirmText: '下一题',
        cancelText: '关闭',
        success: (r) => {
          if (r.confirm) this.onNext();
        },
      });
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
