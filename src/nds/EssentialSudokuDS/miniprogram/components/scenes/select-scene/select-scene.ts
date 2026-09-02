// components/scenes/select-scene/select-scene.ts — 数独选题场景组件
// V0.16: 改用 select1.nbm 原版按钮: Difficulty A-D + 上下箭头 + Start + Return
// 难度 A/B/C/D → easy/medium/hard/expert; E 按钮当前不启用

import { getPuzzleById } from '../../../utils/sudoku/numple_puzzles';
import {
  NBM_SELECT1,
  NBM_SELECT1_START_NORMAL,
  NBM_SELECT1_START_SELECTED,
  NBM_SELECT1_RETURN_NORMAL,
  NBM_SELECT1_RETURN_SELECTED,
  NBM_SELECT1_DIFF_A_NORMAL,
  NBM_SELECT1_DIFF_B_NORMAL,
  NBM_SELECT1_DIFF_C_NORMAL,
  NBM_SELECT1_DIFF_D_NORMAL,
  NBM_SELECT1_UP_NORMAL,
  NBM_SELECT1_UP_SELECTED,
  NBM_SELECT1_DOWN_NORMAL,
  NBM_SELECT1_DOWN_SELECTED,
} from '../../../utils/sudoku/nbmAssets';
import { audioService } from '../../../utils/audio/audioService';

const DIFF_LABELS: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
  expert: '专家',
};

const DIFF_ORDER: string[] = ['easy', 'medium', 'hard', 'expert'];

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

interface DifficultyButton {
  key: string;
  label: string;
  iconUrl: string;
}

const DIFF_BUTTONS: DifficultyButton[] = [
  { key: 'easy', label: 'A', iconUrl: NBM_SELECT1_DIFF_A_NORMAL },
  { key: 'medium', label: 'B', iconUrl: NBM_SELECT1_DIFF_B_NORMAL },
  { key: 'hard', label: 'C', iconUrl: NBM_SELECT1_DIFF_C_NORMAL },
  { key: 'expert', label: 'D', iconUrl: NBM_SELECT1_DIFF_D_NORMAL },
];

Component({
  data: {
    bannerUrl: NBM_SELECT1,
    difficulty: 'easy' as string,
    diffButtons: DIFF_BUTTONS,
    diffLabels: DIFF_LABELS,
    puzzleNo: 1 as number,
    previewText: '',
    startNormalUrl: NBM_SELECT1_START_NORMAL,
    startSelectedUrl: NBM_SELECT1_START_SELECTED,
    returnNormalUrl: NBM_SELECT1_RETURN_NORMAL,
    returnSelectedUrl: NBM_SELECT1_RETURN_SELECTED,
    upNormalUrl: NBM_SELECT1_UP_NORMAL,
    upSelectedUrl: NBM_SELECT1_UP_SELECTED,
    downNormalUrl: NBM_SELECT1_DOWN_NORMAL,
    downSelectedUrl: NBM_SELECT1_DOWN_SELECTED,
    startPressed: false,
    returnPressed: false,
    upPressed: false,
    downPressed: false,
  },

  lifetimes: {
    attached() {
      this._refreshPreview();
    },
  },

  methods: {
    /** 切难度: 题号跳转到该难度范围起点 */
    onTapDiff(e: any) {
      audioService.playSe('tap');
      const d = e.currentTarget.dataset.diff as string;
      const [lo] = DIFF_RANGE[d];
      this.setData({ difficulty: d, puzzleNo: lo });
      this._refreshPreview();
    },

    /** 题号输入 */
    onNoInput(e: any) {
      const v = Number(e.detail.value);
      const no = Number.isFinite(v) ? v : 1;
      this._setNoClamped(no);
    },

    /** 减 1 (点按下压 120ms 后恢复) */
    onDecStart() {
      this.setData({ downPressed: true });
      this._adjustNo(-1);
      setTimeout(() => this.setData({ downPressed: false }), 120);
    },

    /** 加 1 */
    onIncStart() {
      this.setData({ upPressed: true });
      this._adjustNo(1);
      setTimeout(() => this.setData({ upPressed: false }), 120);
    },

    _adjustNo(delta: number) {
      audioService.playSe('slide');
      this._setNoClamped((this.data.puzzleNo || 1) + delta);
    },

    _setNoClamped(no: number) {
      const [lo, hi] = DIFF_RANGE[this.data.difficulty];
      const clamped = Math.min(hi, Math.max(lo, Math.round(no)));
      this.setData({ puzzleNo: clamped });
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

    /** 开始数独 */
    onStart() {
      audioService.playSe('start');
      this.setData({ startPressed: true });
      setTimeout(() => {
        this.setData({ startPressed: false });
        const no = this.data.puzzleNo || 1;
        const id = noToId(no);
        const puzzle = getPuzzleById(id);
        if (!puzzle) {
          wx.showToast({ title: '题目不存在', icon: 'none' });
          return;
        }
        this.triggerEvent('start', { id, no });
      }, 120);
    },

    /** 返回主菜单 */
    onBack() {
      audioService.playSe('back');
      this.setData({ returnPressed: true });
      setTimeout(() => {
        this.setData({ returnPressed: false });
        this.triggerEvent('back');
      }, 120);
    },

    onStartTouchStart() { this.setData({ startPressed: true }); },
    onStartTouchEnd() { this.setData({ startPressed: false }); },
    onReturnTouchStart() { this.setData({ returnPressed: true }); },
    onReturnTouchEnd() { this.setData({ returnPressed: false }); },
    onUpTouchStart() { this.setData({ upPressed: true }); this._adjustNo(1); },
    onUpTouchEnd() { this.setData({ upPressed: false }); },
    onDownTouchStart() { this.setData({ downPressed: true }); this._adjustNo(-1); },
    onDownTouchEnd() { this.setData({ downPressed: false }); },
  },
});
