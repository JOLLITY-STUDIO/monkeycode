Page({
  data: {},

  onLoad() {
    // 可在此预加载后续页面资源
  },

  /** 进入数独玩法 (Number Puzzle): 先选题 */
  onOpenNumberPuzzle() {
    wx.navigateTo({ url: '/pages/select/select' });
  },

  /** 进入图画谜题玩法 (Picture Puzzle): 先选类别 */
  onOpenPicturePuzzle() {
    wx.navigateTo({ url: '/pages/pict_list/pict_list' });
  },

  /** 进入 Staff 制作人员页 */
  onOpenStaff() {
    wx.navigateTo({ url: '/pages/staff/staff' });
  },

  /** 进入玩法说明页 */
  onOpenTutorial() {
    wx.navigateTo({ url: '/pages/tutorial/tutorial' });
  },

  /** 返回标题页 (若在栈中则返回, 否则重新打开) */
  onBackTitle() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.navigateTo({ url: '/pages/title/title' });
    }
  },

  /** 进入选项页 (BGM/SE 音量、Clear、Credits) */
  onOpenOptions() {
    wx.navigateTo({ url: '/pages/options/options' });
  },
});