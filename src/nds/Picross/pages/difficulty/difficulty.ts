/**
 * pages/difficulty —— Picross DS 主菜单
 * 3 个难度 + Tutorial 入口 + 进度入口
 */
import { loadSave } from "../../src/core/save";
import { PUZZLES } from "../../src/data/puzzles";
import { getLang, setLang, Lang, LANGS, LANG_LABELS, uiStrings, diffLabel } from "../../src/i18n/index";
import { bgm } from "../../src/audio/bgm";

Page({
  data: {
    lang: "tc" as Lang,
    langIdx: 0,
    langLabels: [] as string[],
    cleared: [0, 0, 0] as number[],
    totals: [0, 0, 0] as number[],
    /** 难度标签（按语言） */
    diffs: ["", "", ""] as string[],
    /** 各难度解锁题目数（用于 meta 显示） */
    unlocked: [0, 0, 0],
    t: {} as Record<string, string>,
  },
  onLoad() {
    const lang = getLang();
    this.setData({ langLabels: LANGS.map((l) => LANG_LABELS[l]) });
    this.rebuild(lang);
  },
  onShow() {
    const lang = getLang();
    this.rebuild(lang);
    bgm.start("title");
  },
  onHide() {
    bgm.stop();
  },
  rebuild(lang: Lang) {
    const records = loadSave().records;
    const cleared = [0, 0, 0];
    const totals = [0, 0, 0];
    for (const p of PUZZLES) {
      const d = p.difficulty;
      totals[d]++;
      if (records[p.id]) cleared[d]++;
    }
    this.setData({
      lang,
      langIdx: LANGS.indexOf(lang),
      cleared,
      totals,
      diffs: [0, 1, 2].map((d) => diffLabel(lang, d)),
      t: uiStrings(lang),
    });
  },
  onPick(e: any) {
    const d = parseInt(e.currentTarget.dataset.diff, 10) as 0 | 1 | 2;
    wx.navigateTo({ url: `/pages/select/select?difficulty=${d}` });
  },
  onTutorial() {
    wx.navigateTo({ url: "/pages/tutorial/tutorial" });
  },
  onProgress() {
    wx.navigateTo({ url: "/pages/progress/progress" });
  },
  onSwitchLang(e: any) {
    const idx = e.currentTarget.dataset.idx as number;
    const lang = LANGS[idx] || "tc";
    setLang(lang);
    this.rebuild(lang);
  },
});
