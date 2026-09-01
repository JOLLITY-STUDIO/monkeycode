// components/scenes/pict-list-scene/pict-list-scene.ts — 图画谜题类别列表场景组件

/** 15 个类别 (与 picture 页 CATEGORIES 对齐, 题库已验证全部存在) */
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

Component({
  data: {
    categories: [] as typeof CATEGORIES,
    totalPuzzles: 0,
  },

  lifetimes: {
    attached() {
      const total = CATEGORIES.reduce((s, c) => s + c.count, 0);
      this.setData({ categories: CATEGORIES, totalPuzzles: total });
    },
  },

  methods: {
    /** 返回主菜单 */
    onBack() {
      this.triggerEvent('back');
    },

    /** 选择类别 → 通知页面打开 picture */
    onTapCategory(e: any) {
      const key = e.currentTarget.dataset.key as string;
      this.triggerEvent('open', { key });
    },
  },
});
