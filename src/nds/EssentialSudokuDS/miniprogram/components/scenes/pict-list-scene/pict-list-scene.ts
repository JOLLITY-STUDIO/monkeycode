// components/scenes/pict-list-scene/pict-list-scene.ts — 图画谜题类别列表场景组件
// V0.16: DS 化 — 原版 pazl_select.nbm 标题 + pazl_yajirusi 箭头 + pazl_select2b.nbm Return 按钮
// 题目数为实际解析值, 行尾显示通关进度 ✓ n/m.

import {
  NBM_PAZL_SELECT,
  NBM_PAZL_YAJIRUSI,
  NBM_PAZL_SELECT2B_RETURN_NORMAL,
  NBM_PAZL_SELECT2B_RETURN_SELECTED,
} from '../../../utils/sudoku/nbmAssets';
import { PictureGameService } from '../../../utils/sudoku/picture_game_service';
import { audioService } from '../../../utils/audio/audioService';
import { countCompletedInFile } from '../../../utils/sudoku/picture_progress';

const service = new PictureGameService();

/** 15 个类别 (与 picture 页 CATEGORIES 对齐, 题库已验证全部存在) */
const CATEGORIES: Array<{ key: string; label: string }> = [
  { key: 'numclo0.data', label: '动物' },
  { key: 'numclo1.data', label: '科学' },
  { key: 'numclo2.data', label: '地标' },
  { key: 'numclo3.data', label: '家电' },
  { key: 'numclo4.data', label: '玩具' },
  { key: 'numclo5.data', label: '自然' },
  { key: 'numclo6.data', label: '交通' },
  { key: 'numclo7.data', label: '美食' },
  { key: 'numclo8.data', label: '生活' },
  { key: 'numclo9.data', label: '符号' },
  { key: 'numclo_00.data', label: '附加1' },
  { key: 'numclo_01.data', label: '附加2' },
  { key: 'numclo_02.data', label: '附加3' },
  { key: 'numclo_03.data', label: '附加4' },
  { key: 'numclo_tu.data', label: '教程' },
];

interface CategoryItem {
  key: string;
  label: string;
  count: number;
  /** 本类别已通关题数 (完成标记) */
  completed: number;
}

Component({
  data: {
    bannerUrl: NBM_PAZL_SELECT,
    arrowUrl: NBM_PAZL_YAJIRUSI,
    returnNormalUrl: NBM_PAZL_SELECT2B_RETURN_NORMAL,
    returnSelectedUrl: NBM_PAZL_SELECT2B_RETURN_SELECTED,
    returnPressed: false,
    categories: [] as CategoryItem[],
    selectedKey: '',
    totalPuzzles: 0,
    totalCompleted: 0,
  },

  lifetimes: {
    attached() {
      const items: CategoryItem[] = CATEGORIES.map((c) => {
        const count = service.listFilePuzzleIds(c.key).length;
        return {
          key: c.key,
          label: c.label,
          count,
          completed: countCompletedInFile(c.key),
        };
      });
      const total = items.reduce((s, c) => s + c.count, 0);
      const done = items.reduce((s, c) => s + c.completed, 0);
      this.setData({
        categories: items,
        totalPuzzles: total,
        totalCompleted: done,
        selectedKey: items[0]?.key || '',
      });
    },
  },

  methods: {
    /** 返回主菜单 */
    onBack() {
      audioService.playSe('back');
      this.setData({ returnPressed: true });
      setTimeout(() => {
        this.setData({ returnPressed: false });
        this.triggerEvent('back');
      }, 120);
    },

    onReturnTouchStart() {
      this.setData({ returnPressed: true });
    },

    onReturnTouchEnd() {
      this.setData({ returnPressed: false });
    },

    /** 选择类别 → 通知页面打开 picture */
    onTapCategory(e: any) {
      const key = e.currentTarget.dataset.key as string;
      this.setData({ selectedKey: key });
      audioService.playSe('start');
      this.triggerEvent('open', { key });
    },
  },
});
