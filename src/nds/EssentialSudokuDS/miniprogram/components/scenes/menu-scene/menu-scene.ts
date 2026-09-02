// components/scenes/menu-scene/menu-scene.ts — 主菜单场景组件
// V0.17: 改用 select4.nbm 原版模式按钮 (Number/Picture Puzzle 双帧按钮)
//
// select4.nbm 双帧语义: 第 1 帧为默认态(Number 亮蓝 / Picture 深蓝),
//                       第 2 帧为按压态(Number 深蓝 / Picture 亮蓝).
// 这样按压哪个按钮, 哪个按钮就切到对应高亮帧, 复刻 DS 主菜单的选中闪光.

import { audioService } from '../../../utils/audio/audioService';
import {
  NBM_SELECT4_NUMBER_A,
  NBM_SELECT4_NUMBER_B,
  NBM_SELECT4_PICTURE_A,
  NBM_SELECT4_PICTURE_B,
} from '../../../utils/sudoku/nbmAssets';

const PRESS_FEEDBACK_MS = 150;

Component({
  data: {
    numberNormalUrl: NBM_SELECT4_NUMBER_A,
    numberPressedUrl: NBM_SELECT4_NUMBER_B,
    pictureNormalUrl: NBM_SELECT4_PICTURE_A,
    picturePressedUrl: NBM_SELECT4_PICTURE_B,
    numberPressed: false,
    picturePressed: false,
  },

  methods: {
    onOpenNumberPuzzle() {
      audioService.playSe('decide');
      this.setData({ numberPressed: true });
      setTimeout(() => {
        this.setData({ numberPressed: false });
        this.triggerEvent('open-number');
      }, PRESS_FEEDBACK_MS);
    },

    onOpenPicturePuzzle() {
      audioService.playSe('decide');
      this.setData({ picturePressed: true });
      setTimeout(() => {
        this.setData({ picturePressed: false });
        this.triggerEvent('open-picture');
      }, PRESS_FEEDBACK_MS);
    },

    onNumberTouchStart() { this.setData({ numberPressed: true }); },
    onNumberTouchEnd() { this.setData({ numberPressed: false }); },
    onPictureTouchStart() { this.setData({ picturePressed: true }); },
    onPictureTouchEnd() { this.setData({ picturePressed: false }); },

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
