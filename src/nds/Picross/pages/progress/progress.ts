/**
 * pages/progress —— 存档 / 进度面板
 * 显示所有 in-progress puzzles 列表 + 清除按钮
 */
import {
  getInProgressPuzzles,
  clearProgress,
  type PuzzleProgress,
} from "../../src/core/save";
import { PUZZLES } from "../../src/data/puzzles";
import { getLang, Lang, uiStrings, puzzleName, diffLabel } from "../../src/i18n/index";
import { bgm } from "../../src/audio/bgm";

interface ProgressItem {
  puzzleId: number;
  name: string;
  diff: number;
  diffLabel: string;
  marksCount: number;
  totalCount: number;
  elapsedText: string;
  savedAt: number;
  whenText: string;
}

Page({
  data: {
    lang: "tc" as Lang,
    items: [] as ProgressItem[],
    empty: true,
    t: {} as Record<string, string>,
  },

  onLoad() {
    const lang = getLang();
    this.rebuild(lang);
  },

  onShow() {
    this.rebuild(this.data.lang);
    bgm.stop(); // 进度页安静
  },

  rebuild(lang: Lang) {
    const all = getInProgressPuzzles();
    const records: ProgressItem[] = [];
    for (const p of all) {
      const puzzle = PUZZLES.find((pp) => pp.id === p.puzzleId);
      if (!puzzle) continue;
      let marksCount = 0;
      for (const _m of p.marks) {
        // 2-bit packed: high 2 bits of each byte
        marksCount += (_m & 0xc0) === 0xc0 ? 4 : (_m & 0xc0) === 0x80 ? 2 : (_m & 0x80) ? 1 : (_m & 0x40) ? 1 : 0;
      }
      records.push({
        puzzleId: p.puzzleId,
        name: puzzleName(lang, p.puzzleId),
        diff: puzzle.difficulty,
        diffLabel: diffLabel(lang, puzzle.difficulty),
        marksCount: Math.min(puzzle.width * puzzle.height, marksCount),
        totalCount: puzzle.width * puzzle.height,
        elapsedText: `${Math.floor(p.elapsedSec / 60)}:${(p.elapsedSec % 60).toString().padStart(2, "0")}`,
        savedAt: p.savedAt,
        whenText: this.formatWhen(p.savedAt),
      });
    }
    this.setData({
      lang,
      items: records,
      empty: records.length === 0,
      t: uiStrings(lang),
    });
  },

  /** 简单时间格式（"x 分钟前" / "x 小时前"） */
  formatWhen(t: number): string {
    const dt = Math.floor((Date.now() - t) / 60000);
    if (dt < 1) return "刚刚";
    if (dt < 60) return `${dt}m ago`;
    if (dt < 1440) return `${Math.floor(dt / 60)}h ago`;
    return `${Math.floor(dt / 1440)}d ago`;
  },

  onResume(e: any) {
    const id = parseInt(e.currentTarget.dataset.id, 10);
    wx.reLaunch({ url: `/pages/index/index?puzzle=${id}` });
  },

  onClear(e: any) {
    const id = parseInt(e.currentTarget.dataset.id, 10);
    wx.showModal({
      title: "确认清除进度",
      content: `题目 #${id} 当前进度会被清除。`,
      confirmText: "清除",
      cancelText: "取消",
      success: (r) => {
        if (r.confirm) {
          clearProgress(id);
          this.rebuild(this.data.lang);
        }
      },
    });
  },

  onClearAll() {
    if (!this.data.items.length) return;
    wx.showModal({
      title: "清空全部进度",
      content: `当前 ${this.data.items.length} 个题目进度将被清除。`,
      confirmText: "全部清空",
      cancelText: "取消",
      success: (r) => {
        if (r.confirm) {
          for (const it of this.data.items) clearProgress(it.puzzleId);
          this.rebuild(this.data.lang);
        }
      },
    });
  },
});
