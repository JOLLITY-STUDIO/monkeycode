// pages/title/title.ts — 启动标题页 (组件壳, 逻辑在 title-scene)

Page({
  /** 标题场景点击 → 进入主菜单 (模式选择) */
  onStart() {
    wx.navigateTo({ url: '/pages/menu/menu' });
  },
});
