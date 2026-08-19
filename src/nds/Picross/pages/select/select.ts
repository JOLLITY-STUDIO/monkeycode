/**
 * pages/select —— 拼图选择界面（E1 + E4 多语言）
 * 按难度分组展示 256 条真实拼图，名称按语言取 PUZZLE_NAMES（B3 提取）
 */
import { PUZZLES } from "../../src/data/puzzles";
import { loadSave, PuzzleRecord } from "../../src/core/save";
import { getLang, setLang, Lang, LANGS, LANG_LABELS, uiStrings, diffLabel, puzzleName } from "../../src/i18n/index";
import { bgm } from "../../src/audio/bgm";

interface SelectItem {
  id: number;
  name: string;
  w: number;
  h: number;
  stars: number; // 0 = 未通关
  bestTime: number;
  /** 缩略图（ROM 解法位图生成的 PNG） */
  thumb: string;
}

Page({
  data: {
    lang: "tc" as Lang,
    langIdx: 0,
    langLabels: [] as string[],
    groups: [] as { label: string; items: SelectItem[] }[],
    clearedCount: 0,
    totalCount: 0,
    t: {} as Record<string, string>,
  },

  onLoad() {
    const lang = getLang();
    this.setData({ langLabels: LANGS.map((l) => LANG_LABELS[l]) });
    this.rebuild(lang);
  },

  onShow() {
    // 返回本页时刷新通关标记（保留当前语言）
    this.refreshStars();
    bgm.start("title");
  },

  onHide() {
    bgm.stop();
  },

  onUnload() {
    bgm.stop();
  },

  /** 按语言重建分组 */
  rebuild(lang: Lang) {
    const groups = [0, 1, 2].map((diff) => ({
      label: diffLabel(lang, diff),
      items: PUZZLES.filter((p) => p.difficulty === diff).map((p) => {
        const rec = loadSave().records[p.id];
        return {
          id: p.id,
          name: puzzleName(lang, p.id),
          w: p.width,
          h: p.height,
          stars: rec ? rec.stars : 0,
          bestTime: rec ? rec.bestTime : 0,
          thumb: `/assets/thumbs/${p.id}.png`,
        };
      }),
    }));
    let clearedCount = 0;
    groups.forEach((g) => g.items.forEach((it) => { if (it.stars > 0) clearedCount++; }));
    this.setData({
      lang,
      langIdx: LANGS.indexOf(lang),
      groups,
      clearedCount,
      totalCount: PUZZLES.length,
      t: uiStrings(lang),
    });
  },

  refreshStars() {
    const records = loadSave().records;
    const groups = this.data.groups.map((g) => ({
      ...g,
      items: g.items.map((it) => {
        const rec: PuzzleRecord | undefined = records[it.id];
        return { ...it, stars: rec ? rec.stars : 0, bestTime: rec ? rec.bestTime : 0 };
      }),
    }));
    let clearedCount = 0;
    groups.forEach((g) => g.items.forEach((it) => { if (it.stars > 0) clearedCount++; }));
    this.setData({ groups, clearedCount });
  },

  onSwitchLang(e: any) {
    const idx = e.currentTarget.dataset.idx as number;
    const lang = LANGS[idx] || "tc";
    setLang(lang);
    this.rebuild(lang);
  },

  onPick(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/index/index?puzzle=${id}` });
  },

  onPlay() {
    // 从上次未通关的题目继续，全部通关则从第一题开始
    const save = loadSave();
    const next = PUZZLES.find((p) => !save.records[p.id]);
    const id = next ? next.id : PUZZLES[0].id;
    wx.reLaunch({ url: `/pages/index/index?puzzle=${id}` });
  },

  onTutorial() {
    // 重看 How to Play 教程
    wx.navigateTo({ url: "/pages/tutorial/tutorial" });
  },
});
