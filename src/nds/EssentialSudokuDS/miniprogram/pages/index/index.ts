// pages/index/index.ts — 数独玩法页 (组件壳, 逻辑在 sudoku-scene)

Page({
  data: {
    puzzleId: '',
  },

  onLoad(query?: any) {
    // 支持选题页跳入 (query.id = numpleX.data_NNN)
    if (query && query.id) {
      this.setData({ puzzleId: String(query.id) });
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
