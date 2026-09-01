Page({
  data: {},

  onLoad() {
    // 可在此预加载后续页面资源
  },

  /** 进入数独玩法 (Number Puzzle) */
  onOpenNumberPuzzle() {
    wx.navigateTo({ url: '/pages/index/index' });
  },

  /** 进入图画谜题玩法 (Picture Puzzle) */
  onOpenPicturePuzzle() {
    wx.navigateTo({ url: '/pages/picture/picture' });
  },

  /** 进入 Staff 制作人员页 */
  onOpenStaff() {
    wx.navigateTo({ url: '/pages/staff/staff' });
  },

  /** 选项页占位 (后续可接入 BGM/SE 音量、难度等设置) */
  onOpenOptions() {
    wx.showToast({ title: '选项页开发中', icon: 'none' });
  },
});