// components/scenes/menu-scene/menu-scene.ts — 主菜单场景组件
// V0.20: 模式按钮由 select4.nbm 双帧图片改文本标签双态 (ds-buttons.wxss 统一规范)
// 不再使用任何 NBM 按键图片素材.

import { audioService } from '../../../utils/audio/audioService';

Component({
  data: {},

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
