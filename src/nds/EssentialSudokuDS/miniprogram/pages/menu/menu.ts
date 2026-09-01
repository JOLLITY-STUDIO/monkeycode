// pages/menu/menu.ts — 主菜单页 (组件壳, 逻辑在 menu-scene)

Page({
  /** 数独玩法 (先选题) */
  onOpenNumber() {
    wx.navigateTo({ url: '/pages/select/select' });
  },

  /** 图画谜题玩法 (先选类别) */
  onOpenPicture() {
    wx.navigateTo({ url: '/pages/pict_list/pict_list' });
  },

  /** 玩法说明 */
  onOpenTutorial() {
    wx.navigateTo({ url: '/pages/tutorial/tutorial' });
  },

  /** 制作人员 */
  onOpenStaff() {
    wx.navigateTo({ url: '/pages/staff/staff' });
  },

  /** 返回标题 (若在栈中则返回, 否则重新打开) */
  onBackTitle() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.navigateTo({ url: '/pages/title/title' });
    }
  },

  /** 选项 */
  onOpenOptions() {
    wx.navigateTo({ url: '/pages/options/options' });
  },
});
