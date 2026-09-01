// components/scenes/menu-scene/menu-scene.ts — 主菜单场景组件
// title.nbm 横幅 + Number/Picture Puzzle 模式选择按钮 (纯标签实现)
// 按钮待机态/点击态 (阴影+颜色差异) 由 wxss 标准定义
// 跳转动作全部 triggerEvent 交给页面壳处理

/** 点击后跳转延迟 — 让按压反馈 (scale/阴影) 被肉眼看到. */
const NAV_DELAY_MS = 150;

Component({
  data: {},

  methods: {
    /** 点击数独玩法按钮 → 按压反馈后跳转 */
    onOpenNumberPuzzle() {
      setTimeout(() => this.triggerEvent('open-number'), NAV_DELAY_MS);
    },

    /** 点击图画谜题玩法按钮 → 按压反馈后跳转 */
    onOpenPicturePuzzle() {
      setTimeout(() => this.triggerEvent('open-picture'), NAV_DELAY_MS);
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
