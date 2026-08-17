/**
 * pages/select —— 拼图选择界面（E1）
 * 按难度分组展示 256 条真实拼图，名称优先取 PUZZLE_NAMES（B3 提取），无名称回退 Picross N
 */
import { PUZZLES } from "../../src/data/puzzles";
import { PUZZLE_NAMES } from "../../src/data/messages";

const DIFF_LABELS = ["简单", "普通", "困难"];

interface SelectItem {
  id: number;
  name: string;
  w: number;
  h: number;
}

Page({
  data: {
    groups: [] as { label: string; items: SelectItem[] }[],
  },

  onLoad() {
    const names = PUZZLE_NAMES.en;
    const groups = [0, 1, 2].map((diff) => ({
      label: DIFF_LABELS[diff],
      items: PUZZLES.filter((p) => p.difficulty === diff).map((p) => ({
        id: p.id,
        name: (names[p.id] && names[p.id].trim()) || `Picross ${p.id + 1}`,
        w: p.width,
        h: p.height,
      })),
    }));
    this.setData({ groups });
  },

  onPick(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/index/index?puzzle=${id}` });
  },
});
