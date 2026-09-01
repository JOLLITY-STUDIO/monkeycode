// pages/options/options.ts — 选项页 (组件壳, 逻辑在 options-scene)

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

  /** 制作人员 */
  onOpenStaff() {
    wx.navigateTo({ url: '/pages/staff/staff' });
  },

  /** 关于页 */
  onOpenAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  },
});
