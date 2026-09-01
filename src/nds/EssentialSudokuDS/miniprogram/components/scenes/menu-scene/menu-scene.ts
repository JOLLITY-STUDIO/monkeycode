// components/scenes/menu-scene/menu-scene.ts — 主菜单场景组件
// title.nbm 横幅 + select4 Number/Picture Puzzle 模式选择 + menu_csol 箭头指针
// 跳转动作全部 triggerEvent 交给页面壳处理

import { NBM_MENU_CSOL } from '../../../utils/sudoku/nbmAssets';

Component({
  data: {
    menuCursorUrl: NBM_MENU_CSOL,
  },

  methods: {
    /** 数独玩法 (先选题) */
    onOpenNumberPuzzle() {
      this.triggerEvent('open-number');
    },

    /** 图画谜题玩法 (先选类别) */
    onOpenPicturePuzzle() {
      this.triggerEvent('open-picture');
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
