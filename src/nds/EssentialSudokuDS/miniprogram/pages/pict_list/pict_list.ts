// pages/pict_list/pict_list.ts — 图画谜题列表页 (组件壳, 逻辑在 pict-list-scene)

Page({
  /** 选择类别 → 打开 picture 页 */
  onOpen(e: any) {
    const key = e.detail.key as string;
    wx.navigateTo({ url: `/pages/picture/picture?file=${key}&idx=0` });
  },

  onBack() {
    wx.navigateBack();
  },
});
