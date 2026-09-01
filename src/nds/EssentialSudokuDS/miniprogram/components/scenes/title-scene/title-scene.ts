// components/scenes/title-scene/title-scene.ts — 启动标题场景组件
// 全屏 title.nbm + TAP TO START 脉冲提示
// 点击 → triggerEvent('start') → 页面壳 navigateTo 主菜单

Component({
  data: {
    pulse: false,
  },

  lifetimes: {
    attached() {
      // 1s 后开始脉冲提示动画
      this._pulseTimer = setTimeout(() => {
        this.setData({ pulse: true });
      }, 1000);
    },
    detached() {
      if (this._pulseTimer) {
        clearTimeout(this._pulseTimer);
        this._pulseTimer = 0;
      }
    },
  },

  methods: {
    /** 点击任意处 → 通知页面进入主菜单 */
    onTapStart() {
      this.triggerEvent('start');
    },
  },
});
