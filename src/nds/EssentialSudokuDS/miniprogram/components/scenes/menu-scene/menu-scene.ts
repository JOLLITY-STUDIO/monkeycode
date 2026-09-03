// components/scenes/menu-scene/menu-scene.ts — 主菜单场景组件
// V0.30: 重写为两行大蓝胶囊主入口 (数独 / 图画谜题) + 底部 4 列辅助入口
// V0.35: 明亮天空 bg-fx 之上深色玻璃按钮可读性优化
// 移除"SELECT MODE"小卡片标题 + 模式 (Number Puzzle) 副标题括号
// 不再使用任何 NBM 按键图片素材.

import { audioService } from '../../../utils/audio/audioService';

Component({
  data: {
    buildVersion: 'v0.35.2',
  },

  methods: {
    onOpenNumberPuzzle() {
      audioService.playSe('decide');
      this.triggerEvent('open-number');
    },

    onOpenPicturePuzzle() {
      audioService.playSe('decide');
      this.triggerEvent('open-picture');
    },

    onOpenTutorial() {
      audioService.playSe('tap');
      this.triggerEvent('open-tutorial');
    },

    onOpenStaff() {
      audioService.playSe('tap');
      this.triggerEvent('open-staff');
    },

    onBackTitle() {
      audioService.playSe('back');
      this.triggerEvent('back-title');
    },

    onOpenOptions() {
      audioService.playSe('tap');
      this.triggerEvent('open-options');
    },
  },
});
