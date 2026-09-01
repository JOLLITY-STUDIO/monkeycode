// pages/select/select.ts — 数独选题页 (select1 精灵 + 难度 + 题号 1-1000)
// 题库: numple0-9.data (1000 题, 每文件 100 题, 难度 numple0-2 easy / 3-5 medium / 6-7 hard / 8-9 expert)

import { getPuzzleById } from '../../utils/sudoku/numple_puzzles';

const DIFF_LABELS: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
  expert: '专家',
};

/** 难度 → 全局题号范围 (1-based, 闭区间) */
const DIFF_RANGE: Record<string, [number, number]> = {
  easy: [1, 300],
  medium: [301, 600],
  hard: [601, 800],
  expert: [801, 1000],
};

/** 全局题号 (1-1000) → numple 文件 + 文件内索引 */
function noToId(no: number): string {
  const clamped = Math.min(1000, Math.max(1, no));
  const file = Math.floor((clamped - 1) / 100);
  const idx = (clamped - 1) % 100;
  return `numple${file}.data_${String(idx).padStart(3, '0')}`;
}

Page({
  data: {
    difficulty: 'easy' as string,
    diffChips: ['easy', 'medium', 'hard', 'expert'],
    diffLabels: DIFF_LABELS,
    puzzleNo: 1 as number,
    previewText: '',
  },

  onLoad() {
    this._refreshPreview();
  },

  /** 切难度: 题号跳转到该难度范围起点 */
  onTapDiff(e: any) {
    const d = e.currentTarget.dataset.diff as string;
    const [lo] = DIFF_RANGE[d];
    this.setData({ difficulty: d, puzzleNo: lo });
    this._refreshPreview();
  },

  /** 题号输入 */
  onNoInput(e: any) {
    const v = Number(e.detail.value);
    this.setData({ puzzleNo: Number.isFinite(v) ? v : 1 });
    this._refreshPreview();
  },

  onNoDec() {
    const [lo] = DIFF_RANGE[this.data.difficulty];
    this.setData({ puzzleNo: Math.max(lo, (this.data.puzzleNo || 1) - 1) });
    this._refreshPreview();
  },

  onNoInc() {
    const [, hi] = DIFF_RANGE[this.data.difficulty];
    this.setData({ puzzleNo: Math.min(hi, (this.data.puzzleNo || 1) + 1) });
    this._refreshPreview();
  },

  _refreshPreview() {
    const no = this.data.puzzleNo || 1;
    const id = noToId(no);
    const puzzle = getPuzzleById(id);
    this.setData({
      puzzleNo: no,
      previewText: puzzle
        ? `题号 ${no} · ${DIFF_LABELS[puzzle.difficulty]} · 已给 ${puzzle.countFilled} 格`
        : `题号 ${no} 未找到`,
    });
  },

  /** 开始数独: redirectTo index 并携带 id */
  onStart() {
    const no = this.data.puzzleNo || 1;
    const id = noToId(no);
    const puzzle = getPuzzleById(id);
    if (!puzzle) {
      wx.showToast({ title: '题目不存在', icon: 'none' });
      return;
    }
    wx.redirectTo({ url: `/pages/index/index?id=${id}` });
  },
});