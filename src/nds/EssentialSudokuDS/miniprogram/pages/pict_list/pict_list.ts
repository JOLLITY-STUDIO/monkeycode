// pages/pict_list/pict_list.ts — 图画谜题列表页 (15 类别, 共 1525 题)
// 类别与 picture 页保持一致; 点击进入 picture 并带 file+idx

/** 15 个类别 (与 picture.ts CATEGORIES 对齐, 题库已验证全部存在) */
const CATEGORIES: Array<{ key: string; label: string; count: number }> = [
  { key: 'numclo0.data', label: '动物', count: 100 },
  { key: 'numclo1.data', label: '科学', count: 100 },
  { key: 'numclo2.data', label: '地标', count: 100 },
  { key: 'numclo3.data', label: '家电', count: 100 },
  { key: 'numclo4.data', label: '玩具', count: 100 },
  { key: 'numclo5.data', label: '自然', count: 100 },
  { key: 'numclo6.data', label: '交通', count: 100 },
  { key: 'numclo7.data', label: '美食', count: 100 },
  { key: 'numclo8.data', label: '生活', count: 100 },
  { key: 'numclo9.data', label: '符号', count: 100 },
  { key: 'numclo_00.data', label: '附加1', count: 100 },
  { key: 'numclo_01.data', label: '附加2', count: 100 },
  { key: 'numclo_02.data', label: '附加3', count: 100 },
  { key: 'numclo_03.data', label: '附加4', count: 100 },
  { key: 'numclo_tu.data', label: '教程', count: 1 },
];

Page({
  data: {
    categories: [] as typeof CATEGORIES,
    totalPuzzles: 0,
  },

  onLoad() {
    const total = CATEGORIES.reduce((s, c) => s + c.count, 0);
    this.setData({ categories: CATEGORIES, totalPuzzles: total });
  },

  onTapCategory(e: any) {
    const key = e.currentTarget.dataset.key as string;
    wx.navigateTo({ url: `/pages/picture/picture?file=${key}&idx=0` });
  },
});