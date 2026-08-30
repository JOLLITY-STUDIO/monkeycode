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
    const t = uiStrings(lang);
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
        whenText: this.formatWhen(t, p.savedAt),
      });
    }
    this.setData({
      lang,
      items: records,
      empty: records.length === 0,
      t,
    });
  },

  /** 按 i18n 时间格式（"刚刚" / "5分前" / "3小时前" / "2天前"） */
  formatWhen(t: Record<string, any>, ts: number): string {
    const dt = Math.floor((Date.now() - ts) / 60000);
    if (dt < 1) return (t.progressJustNow as string) || "Just now";
    if (dt < 60) return (t.progressMinAgo as (n: number) => string)(dt);
    if (dt < 1440) return (t.progressHourAgo as (n: number) => string)(Math.floor(dt / 60));
    return (t.progressDayAgo as (n: number) => string)(Math.floor(dt / 1440));
  },

  onResume(e: any) {
    const id = parseInt(e.currentTarget.dataset.id, 10);
    wx.reLaunch({ url: `/pages/index/index?puzzle=${id}` });
  },

  onClear(e: any) {
    const id = parseInt(e.currentTarget.dataset.id, 10);
    const t = this.data.t as Record<string, any>;
    wx.showModal({
      title: (t.progressClearConfirmTitle as string) || "Delete progress?",
      content: ((t.progressClearOneMsg as (i: number) => string)(id)),
      confirmText: (t.progressDelete as string) || "Delete",
      cancelText: (t.progressCancel as string) || "Cancel",
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
    const t = this.data.t as Record<string, any>;
    const n = this.data.items.length;
    wx.showModal({
      title: (t.progressClearAllTitle as string) || "Clear all progress?",
      content: ((t.progressClearAllMsg as (i: number) => string)(n)),
      confirmText: (t.progressClearAll as string) || "Clear All",
      cancelText: (t.progressCancel as string) || "Cancel",
      success: (r) => {
        if (r.confirm) {
          for (const it of this.data.items) clearProgress(it.puzzleId);
          this.rebuild(this.data.lang);
        }
      },
    });
  },
});
