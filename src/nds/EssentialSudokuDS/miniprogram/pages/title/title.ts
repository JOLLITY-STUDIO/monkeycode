Page({
  data: {
    pulse: false,
  },

  onLoad() {
    // 1s 后开始脉冲提示动画
    setTimeout(() => {
      this.setData({ pulse: true });
    }, 1000);
  },

  /** 点击任意处进入主菜单 (模式选择) */
  onTapStart() {
    wx.navigateTo({ url: '/pages/menu/menu' });
  },
});