// components/scenes/picture-mode-scene/picture-mode-scene.ts — 原 DS 图画谜题子模式选择菜单
// pazl_select.nbm 为竖向菜单: ナンクロ / ヌクロ / カード / ポピュレーション / チュートリアル
// ナンクロ → 进入类别列表 (numclo0-9 + 附加); チュートリアル → 直接开始教程题.

import { NBM_PAZL_SELECT } from '../../../utils/sudoku/nbmAssets';
import { audioService } from '../../../utils/audio/audioService';

interface ModeItem {
  id: string;
  label: string;
}

const MODES: ModeItem[] = [
  { id: 'nankuro', label: 'ナンクロ' },
  { id: 'nukuro', label: 'ヌクロ' },
  { id: 'card', label: 'カード' },
  { id: 'population', label: 'ポピュレーション' },
  { id: 'tutorial', label: 'チュートリアル' },
];

Component({
  data: {
    menuUrl: NBM_PAZL_SELECT,
    modes: MODES,
  },

  methods: {
    /** 返回主菜单 */
    onBack() {
      audioService.playSe('back');
      this.triggerEvent('back');
    },

    /** 选择子模式 */
    onTapMode(e: any) {
      const id = String(e.currentTarget.dataset.id || '');
      const mode = MODES.find((m) => m.id === id);
      if (!mode) return;

      if (id === 'nankuro') {
        audioService.playSe('decide');
        this.triggerEvent('open-nankuro');
      } else if (id === 'tutorial') {
        audioService.playSe('decide');
        this.triggerEvent('open-tutorial');
      } else {
        audioService.playSe('decide');
        wx.showToast({ title: `${mode.label} 模式数据尚未解析`, icon: 'none' });
      }
    },
  },
});
