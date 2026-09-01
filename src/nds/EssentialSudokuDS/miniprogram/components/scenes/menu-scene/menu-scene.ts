// components/scenes/menu-scene/menu-scene.ts — 主菜单场景组件
// title.nbm 横幅 + select4 Number/Picture Puzzle 模式选择 + menu_csol 箭头指针
// 跳转动作全部 triggerEvent 交给页面壳处理

import {
  NBM_MENU_CSOL,
  NBM_SELECT4_NUMBER_A,
  NBM_SELECT4_NUMBER_B,
  NBM_SELECT4_PICTURE_A,
  NBM_SELECT4_PICTURE_B,
} from '../../../utils/sudoku/nbmAssets';

const CURSOR_TOP: Record<'number' | 'picture', number> = {
  number: 24,
  picture: 108,
};

/** select4 按钮双帧动画间隔 (原版菜单按钮微闪). */
const ANIM_INTERVAL_MS = 600;

Component({
  data: {
    menuCursorUrl: NBM_MENU_CSOL,
    numberBtnUrl: NBM_SELECT4_NUMBER_A,
    pictureBtnUrl: NBM_SELECT4_PICTURE_A,
    selectedMode: 'number' as 'number' | 'picture',
    cursorTop: CURSOR_TOP.number,
    /** TS 私有字段声明 (非渲染数据): 动画帧状态 + 定时器句柄 */
    _frameA: true,
    _animTimer: 0,
  },

  lifetimes: {
    attached() {
      this.data._animTimer = setInterval(() => {
        const frameA = !this.data._frameA;
        this.setData({
          _frameA: frameA,
          numberBtnUrl: frameA ? NBM_SELECT4_NUMBER_A : NBM_SELECT4_NUMBER_B,
          pictureBtnUrl: frameA ? NBM_SELECT4_PICTURE_A : NBM_SELECT4_PICTURE_B,
        });
      }, ANIM_INTERVAL_MS);
    },
    detached() {
      if (this.data._animTimer) {
        clearInterval(this.data._animTimer as unknown as number);
        this.data._animTimer = 0;
      }
    },
  },

  methods: {
    /** 选中数独玩法并跳转 */
    onOpenNumberPuzzle() {
      this.setData({ selectedMode: 'number', cursorTop: CURSOR_TOP.number });
      setTimeout(() => this.triggerEvent('open-number'), 120);
    },

    /** 选中图画谜题玩法并跳转 */
    onOpenPicturePuzzle() {
      this.setData({ selectedMode: 'picture', cursorTop: CURSOR_TOP.picture });
      setTimeout(() => this.triggerEvent('open-picture'), 120);
    },

    /** 玩法说明 */
    onOpenTutorial() {
      this.triggerEvent('open-tutorial');
    },

    /** 制作人员 */
    onOpenStaff() {
      this.triggerEvent('open-staff');
    },

    /** 返回标题 */
    onBackTitle() {
      this.triggerEvent('back-title');
    },

    /** 选项 */
    onOpenOptions() {
      this.triggerEvent('open-options');
    },
  },
});
