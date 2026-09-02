// components/scenes/select-scene/select-scene.ts — 数独选题场景组件
// PICTURE-V0.29: 全部按钮改 select1.nbm 原版双态图片 (浅蓝 NORMAL + 深蓝 SELECTED)
// Difficulty A/B/C/D 常驻 active 态由 CSS 滤镜 + 描边表达 (NBM 仅切了 normal 帧)
// 上下箭头 / Start / Return 通过 touchstart/end 切 NORMAL ↔ SELECTED 图源

import { getPuzzleById } from '../../../utils/sudoku/numple_puzzles';
import { audioService } from '../../../utils/audio/audioService';
import {
  NBM_SELECT1_DIFF_A_NORMAL,
  NBM_SELECT1_DIFF_B_NORMAL,
  NBM_SELECT1_DIFF_C_NORMAL,
  NBM_SELECT1_DIFF_D_NORMAL,
  NBM_SELECT1_UP_NORMAL,
  NBM_SELECT1_UP_SELECTED,
  NBM_SELECT1_DOWN_NORMAL,
  NBM_SELECT1_DOWN_SELECTED,
  NBM_SELECT1_START_NORMAL,
  NBM_SELECT1_START_SELECTED,
  NBM_SELECT1_RETURN_NORMAL,
  NBM_SELECT1_RETURN_SELECTED,
} from '../../../utils/sudoku/nbmAssets';

/** 难度 → 全局题号范围 (1-based, 闭区间) */
const DIFF_RANGE: Record<string, [number, number]> = {
  easy: [1, 300],
  medium: [301, 600],
  hard: [601, 800],
  expert: [801, 1000],
};

const DIFF_LABELS: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
  expert: '专家',
};

/** 全局题号 (1-1000) → numple 文件 + 文件内索引 */
function noToId(no: number): string {
  const clamped = Math.min(1000, Math.max(1, no));
  const file = Math.floor((clamped - 1) / 100);
  const idx = (clamped - 1) % 100;
  return `numple${file}.data_${String(idx).padStart(3, '0')}`;
}

interface ImgButton {
  key: string;
  normalUrl: string;
  selectedUrl: string;
  /** selectedUrl === normalUrl 表示不切图 (由 CSS 表达 active) */
}

const DIFF_BUTTONS: ImgButton[] = [
  { key: 'easy',   normalUrl: NBM_SELECT1_DIFF_A_NORMAL, selectedUrl: NBM_SELECT1_DIFF_A_NORMAL },
  { key: 'medium', normalUrl: NBM_SELECT1_DIFF_B_NORMAL, selectedUrl: NBM_SELECT1_DIFF_B_NORMAL },
  { key: 'hard',   normalUrl: NBM_SELECT1_DIFF_C_NORMAL, selectedUrl: NBM_SELECT1_DIFF_C_NORMAL },
  { key: 'expert', normalUrl: NBM_SELECT1_DIFF_D_NORMAL, selectedUrl: NBM_SELECT1_DIFF_D_NORMAL },
];

const UP_BUTTON: ImgButton = {
  key: 'up', normalUrl: NBM_SELECT1_UP_NORMAL, selectedUrl: NBM_SELECT1_UP_SELECTED,
};

const DOWN_BUTTON: ImgButton = {
  key: 'down', normalUrl: NBM_SELECT1_DOWN_NORMAL, selectedUrl: NBM_SELECT1_DOWN_SELECTED,
};

const START_BUTTON: ImgButton = {
  key: 'start', normalUrl: NBM_SELECT1_START_NORMAL, selectedUrl: NBM_SELECT1_START_SELECTED,
};

const RETURN_BUTTON: ImgButton = {
  key: 'return', normalUrl: NBM_SELECT1_RETURN_NORMAL, selectedUrl: NBM_SELECT1_RETURN_SELECTED,
};

Component({
  data: {
    difficulty: 'easy' as string,
    diffButtons: DIFF_BUTTONS,
    diffLabels: DIFF_LABELS,
    puzzleNo: 1 as number,
    previewText: '',
    upButton: UP_BUTTON,
    downButton: DOWN_BUTTON,
    startButton: START_BUTTON,
    returnButton: RETURN_BUTTON,
    /** 按下中 → 显示 SELECTED 图源 (按 key 索引) */
    pressed: {} as Record<string, boolean>,
  },

  lifetimes: {
    attached() {
      this._refreshPreview();
    },
    detached() {
      // 清掉按下态残留 (防止切场景后 setData 报错)
      this.data.pressed = {};
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

    /** 减 1 (下箭头 / −) */
    onMinus() {
      audioService.playSe('slide');
      this._setNoClamped((this.data.puzzleNo || 1) - 1);
    },

    /** 加 1 (上箭头 / +) */
    onPlus() {
      audioService.playSe('slide');
      this._setNoClamped((this.data.puzzleNo || 1) + 1);
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
      const no = this.data.puzzleNo || 1;
      const id = noToId(no);
      const puzzle = getPuzzleById(id);
      if (!puzzle) {
        wx.showToast({ title: '题目不存在', icon: 'none' });
        return;
      }
      this.triggerEvent('start', { id, no });
    },

    /** 返回主菜单 */
    onBack() {
      audioService.playSe('back');
      this.triggerEvent('back');
    },

    /** 触摸按下 → 该按钮 selected 图源 */
    _onTouchStart(e: any) {
      const key = e.currentTarget.dataset.btnkey as string;
      if (!key) return;
      const next = { ...(this.data.pressed || {}), [key]: true };
      this.setData({ pressed: next });
    },

    /** 触摸松开/取消 → 还原 NORMAL 图源 */
    _onTouchEnd(e: any) {
      const key = e.currentTarget.dataset.btnkey as string;
      if (!key) return;
      const next = { ...(this.data.pressed || {}) };
      delete next[key];
      this.setData({ pressed: next });
    },
  },
});