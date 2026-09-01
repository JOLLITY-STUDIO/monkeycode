// pages/select/select.ts — 数独选题页 (组件壳, 逻辑在 select-scene)

Page({
  /** 返回主菜单 */
  onBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.navigateTo({ url: '/pages/menu/menu' });
    }
  },

  /** 开始数独: redirectTo index 并携带 id */
  onStart(e: any) {
    const id = e.detail && e.detail.id;
    if (!id) return;
    wx.redirectTo({ url: `/pages/index/index?id=${id}` });
  },
});
