// components/scenes/menu-scene/menu-scene.ts — 主菜单场景组件
// title.nbm 横幅 + select4 Number/Picture Puzzle 模式选择 + menu_csol 箭头指针
// 跳转动作全部 triggerEvent 交给页面壳处理

import { NBM_MENU_CSOL } from '../../../utils/sudoku/nbmAssets';

const CURSOR_TOP: Record<'number' | 'picture', number> = {
  number: 24,
  picture: 108,
};

Component({
  data: {
    menuCursorUrl: NBM_MENU_CSOL,
    selectedMode: 'number' as 'number' | 'picture',
    cursorTop: CURSOR_TOP.number,
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
