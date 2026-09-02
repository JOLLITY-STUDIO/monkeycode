// components/scenes/select-scene/select-scene.ts — 数独选题场景组件
// V0.20: select1.nbm 原版按钮全部改文本标签双态 (ds-buttons.wxss 统一规范)
// 难度 A/B/C/D → 简单/中等/困难/专家; 上下箭头 → −/+; Start/Return → 开始/返回
// 标题横幅 → 文本头部 (不再使用 NBM 图)

import { getPuzzleById } from '../../../utils/sudoku/numple_puzzles';
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
}

const DIFF_BUTTONS: DifficultyButton[] = [
  { key: 'easy', label: '简单' },
  { key: 'medium', label: '中等' },
  { key: 'hard', label: '困难' },
  { key: 'expert', label: '专家' },
];

Component({
  data: {
    difficulty: 'easy' as string,
    diffButtons: DIFF_BUTTONS,
    diffLabels: DIFF_LABELS,
    puzzleNo: 1 as number,
    previewText: '',
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
  },
});
