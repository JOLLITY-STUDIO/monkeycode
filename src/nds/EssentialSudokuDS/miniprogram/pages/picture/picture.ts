// pages/picture/picture.ts — 图画谜题页 (组件壳, 逻辑在 picture-scene)

Page({
  data: {
    fileKey: '',
    puzzleIdx: 0,
  },

  onLoad(query?: any) {
    // 支持列表页跳入 (query.file + query.idx)
    if (query && query.file) {
      this.setData({
        fileKey: String(query.file),
        puzzleIdx: Number(query.idx || 0),
      });
    }
  },

  /** 返回主菜单 */
  onBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.navigateTo({ url: '/pages/menu/menu' });
    }
  },
});
