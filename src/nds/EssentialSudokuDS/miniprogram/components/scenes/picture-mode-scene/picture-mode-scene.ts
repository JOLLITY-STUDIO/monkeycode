// components/scenes/picture-mode-scene/picture-mode-scene.ts — 图画谜题子模式选择菜单
// 只保留真实可玩的模式 (逻辑链路闭环, 无死按钮):
//   图案填字 → 进入类别列表 (numclo0-9 + numclo_00-03, 全部 15x15 彩色计数填字题)
//   入门教程 → 直接开始教程题 (numclo_tu.data)
// 原 DS pazl_select 上的 ヌクロ/カード/ポピュレーション 没有独立数据文件,
// 不再占位 (避免"模式数据尚未解析"这种断头路)。
// 纯中文 UI (V0.30 规范): 按钮一律文本标签, 不用 NBM 图.

import { audioService } from '../../../utils/audio/audioService';
import { NUMCLO_CATALOG } from '../../../utils/sudoku/numclo_puzzles';

interface ModeItem {
  id: string;
  label: string;
  desc: string;
}

/** 主模式题数 = 除 numclo_tu.data 外全部文件 (numclo0-9 + numclo_00-03) */
const NANKURO_COUNT = NUMCLO_CATALOG.filter((p) => p.file !== 'numclo_tu.data').length;
/** 教程文件题数 */
const TUTORIAL_COUNT = NUMCLO_CATALOG.filter((p) => p.file === 'numclo_tu.data').length;

const MODES: ModeItem[] = [
  { id: 'nankuro', label: '图案填字', desc: `${NANKURO_COUNT} 道彩色填字题 · 选择类别开始` },
  { id: 'tutorial', label: '入门教程', desc: `${TUTORIAL_COUNT} 道教学题 · 直接开涂` },
];

Component({
  data: {
    modes: MODES,
    selectedId: 'nankuro',
  },

  methods: {
    /** 返回主菜单 */
    onBack() {
      audioService.playSe('back');
      this.triggerEvent('back');
    },

    /** 选择子模式 (仅两个真实入口) */
    onTapMode(e: any) {
      const id = String(e.currentTarget.dataset.id || '');
      const mode = MODES.find((m) => m.id === id);
      if (!mode) return;

      this.setData({ selectedId: id });
      audioService.playSe('decide');

      if (id === 'nankuro') {
        this.triggerEvent('open-nankuro');
      } else if (id === 'tutorial') {
        this.triggerEvent('open-tutorial');
      }
    },
  },
});
