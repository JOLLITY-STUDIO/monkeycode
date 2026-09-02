// components/scenes/menu-scene/menu-scene.ts — 主菜单场景组件
// V0.30: 重写为主视觉双宫格 (数独 + 图画谜题大卡片)
// 二级入口 (玩法/选项/人员/返回) 移到底部 4 列等宽
// 移除"SELECT MODE"小卡片标题 + 模式 (Number Puzzle) 副标题括号
// 不再使用任何 NBM 按键图片素材.

import { audioService } from '../../../utils/audio/audioService';

Component({
  data: {
    buildVersion: 'v0.35',
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
