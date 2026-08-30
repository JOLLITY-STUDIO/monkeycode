/**
 * pages/select —— 拼图选择界面（E1 + E4 多语言 + U1 解锁链）
 * 按难度分组展示 223 条真实拼图，名称按语言取 PUZZLE_NAMES（B3 提取）
 * U1 真实解锁链：默认解锁每难度首题；通关后自动链式开 2 题；
 *               锁定题显示锁图标，无法点击。
 */
import { PUZZLES } from "../../src/data/puzzles";
import {
  loadSave,
  PuzzleRecord,
  isPuzzleUnlocked,
  getUnlockedSet,
  getInProgressPuzzles,
  type SaveData,
} from "../../src/core/save";
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
  /** 是否已解锁（U1：默认首题解锁 + 通关链式解锁） */
  unlocked: boolean;
  /** 卡片锁定时显示的遮罩文本 */
  lockText: string;
}

interface Group {
  label: string;
  items: SelectItem[];
  cleared: number;
  total: number;
}

/**
 * U1：默认解锁集。每个难度首题 + 每个难度序号 0 的题目（Picross DS 入门用）
 *   —— 实际可由 ROM 解锁表替代（V1.5）
 */
function defaultSeeds(all: { id: number; difficulty: number }[]): number[] {
  const seeds = new Set<number>();
  const seenDiff = new Set<number>();
  for (const p of all) {
    if (!seenDiff.has(p.difficulty)) {
      seeds.add(p.id);
      seenDiff.add(p.difficulty);
    }
  }
  return Array.from(seeds);
}

Page({
  data: {
    lang: "tc" as Lang,
    langIdx: 0,
    langLabels: [] as string[],
    groups: [] as Group[],
    clearedCount: 0,
    totalCount: 0,
    t: {} as Record<string, string>,
    /** 全局解锁种子（默认首题解锁），用于离线首次启动 */
    seedCount: 0,
    /** U3: 是否有进行中的题目可恢复 */
    resumeId: 0,
    /** 当前选中 difficulty（来自 URL ?difficulty=N；不传为 null 表示全显） */
    currentDiff: 0 as number | null,
    /** Stage 总数（按 STAGES_PER_DIFF） */
    stageCount: 5,
    /** 当前 stage 索引（0..stageCount-1，-1 显示全部） */
    currentStage: -1,
    /** Stage 对应题目 id 数组（按 difficulty 当前） */
    stageIds: [0] as number[],
  },

  onLoad(opts: any) {
    const lang = getLang();
    this.setData({ langLabels: LANGS.map((l) => LANG_LABELS[l]) });
    // 从 URL 参数读取 difficulty；如果传了则只显示该难度
    if (opts && opts.difficulty !== undefined) {
      const d = parseInt(opts.difficulty, 10);
      if (d === 0 || d === 1 || d === 2) {
        this.setData({ currentDiff: d });
      }
    }
    this.rebuild(lang);
  },

  onShow() {
    // 返回本页时刷新通关标记 + 解锁状态（保留当前语言）
    this.refreshFromSave();
    bgm.start("title");
  },

  onHide() {
    bgm.stop();
  },

  onUnload() {
    bgm.stop();
  },

  /** B: Stages per difficulty（Picross DS 的 5 关 Stage 切分规则）
 *  Easy/Normal 各 5 stages × N puzzles/stage = total / 5 = stagePuzzles
 *  Free 难度跨越其余题库（无 stage 分页，全部一页）
 */
const STAGES_PER_DIFF: Record<number, number> = { 0: 5, 1: 5, 2: 1 };
function puzzlesForStage(diff: number, stage: number): number[] {
  const same = PUZZLES.filter((p) => p.difficulty === diff).map((p) => p.id);
  const stages = STAGES_PER_DIFF[diff] || 1;
  if (stages <= 1) return same;
  const perStage = Math.ceil(same.length / stages);
  const start = stage * perStage;
  return same.slice(start, start + perStage);
}

/** 按语言重建分组（U1：叠加解锁状态，B：按 Stage 切分） */
  rebuild(lang: Lang) {
    const seeds = defaultSeeds(PUZZLES);
    const unlocked = getUnlockedSet(seeds);
    const records = loadSave().records;
    // B: Stage 切分
    const dFilter = this.data.currentDiff;
    const sFilter = this.data.currentStage;
    let displayDiff: number[] = [];
    if (dFilter !== null && dFilter !== undefined) {
      displayDiff = [dFilter];
      if (sFilter >= 0) {
        // 仅显示当前 stage 的题目
        const stagePuzz = puzzlesForStage(dFilter, sFilter);
        const inStage = new Set(stagePuzz);
        displayDiff = [dFilter];
        // 这里 patches: 重写下面的 groups 构建
        this.setData({
          groups: [{
            label: `Stage ${sFilter + 1}`,
            items: stagePuzz.map((pid) => {
              const p = PUZZLES.find((pp) => pp.id === pid)!;
              const rec = records[p.id];
              return {
                id: p.id,
                name: puzzleName(lang, p.id),
                w: p.width,
                h: p.height,
                stars: rec ? rec.stars : 0,
                bestTime: rec ? rec.bestTime : 0,
                thumb: `/assets/thumbs/${p.id}.png`,
                unlocked: unlocked.has(p.id),
                lockText: "🔒",
              };
            }),
            cleared: stagePuzz.filter((pid) => records[pid]).length,
            total: stagePuzz.length,
          }],
        });
        // 单 stage 显示后直接 return
        let clearedCount = 0;
        this.data.groups.forEach((g) => g.items.forEach((it) => { if (it.stars > 0) clearedCount++; }));
        const inProg = getInProgressPuzzles();
        const resumeId = inProg.length > 0 ? inProg[0].puzzleId : 0;
        this.setData({
          lang,
          langIdx: LANGS.indexOf(lang),
          clearedCount,
          totalCount: stagePuzz.length,
          seedCount: seeds.length,
          resumeId,
          stageIds: stagePuzz,
          t: uiStrings(lang),
        });
        return;
      }
    } else {
      displayDiff = [0, 1, 2];
    }
    const groups: Group[] = displayDiff.map((diff) => {
      const items: SelectItem[] = PUZZLES.filter((p) => p.difficulty === diff).map((p) => {
        const rec = records[p.id];
        const isUnlocked = unlocked.has(p.id);
        return {
          id: p.id,
          name: puzzleName(lang, p.id),
          w: p.width,
          h: p.height,
          stars: rec ? rec.stars : 0,
          bestTime: rec ? rec.bestTime : 0,
          thumb: `/assets/thumbs/${p.id}.png`,
          unlocked: isUnlocked,
          lockText: "🔒",
        };
      });
      let cleared = 0;
      items.forEach((it) => { if (it.stars > 0) cleared++; });
      return { label: diffLabel(lang, diff), items, cleared, total: items.length };
    });
    let clearedCount = 0;
    groups.forEach((g) => g.items.forEach((it) => { if (it.stars > 0) clearedCount++; }));
    // U3: 取出最近一个进度题 id（如果有）
    const inProg = getInProgressPuzzles();
    const resumeId = inProg.length > 0 ? inProg[0].puzzleId : 0;
    this.setData({
      lang,
      langIdx: LANGS.indexOf(lang),
      groups,
      clearedCount,
      totalCount: PUZZLES.length,
      seedCount: seeds.length,
      resumeId,
      t: uiStrings(lang),
    });
  },

  /** B: 切到指定 stage */
  onStageTab(e: any) {
    const idx = parseInt(e.currentTarget.dataset.idx, 10);
    this.setData({ currentStage: idx });
    this.rebuild(this.data.lang);
  },

  /** B: 返回难度菜单 */
  onBackDifficulty() {
    wx.navigateBack({ delta: 1 });
  },

  /** 重新从 save 拉数据（通关返回时调用，UI 增量更新） */
  refreshFromSave() {
    const seeds = defaultSeeds(PUZZLES);
    const unlocked = getUnlockedSet(seeds);
    const records = loadSave().records;
    const groups = this.data.groups.map((g) => ({
      ...g,
      items: g.items.map((it) => {
        const rec: PuzzleRecord | undefined = records[it.id];
        const isUnlocked = unlocked.has(it.id);
        return {
          ...it,
          stars: rec ? rec.stars : 0,
          bestTime: rec ? rec.bestTime : 0,
          unlocked: isUnlocked,
          lockText: isUnlocked ? it.lockText : "🔒",
        };
      }),
    }));
    let clearedCount = 0;
    groups.forEach((g) => g.items.forEach((it) => { if (it.stars > 0) clearedCount++; }));
    // 整组通关进度也更新
    groups.forEach((g) => {
      g.cleared = g.items.filter((it) => it.stars > 0).length;
    });
    this.setData({ groups, clearedCount });
  },

  onSwitchLang(e: any) {
    const idx = e.currentTarget.dataset.idx as number;
    const lang = LANGS[idx] || "tc";
    setLang(lang);
    this.rebuild(lang);
  },

  onPick(e: any) {
    const id = parseInt(e.currentTarget.dataset.id, 10);
    const item = this.findItem(id);
    // U1：锁定题不可点击（弹 toast 提示）
    if (!item || !item.unlocked) {
      wx.showToast({ title: "未解锁：通关前置题", icon: "none", duration: 1200 });
      return;
    }
    wx.navigateTo({ url: `/pages/index/index?puzzle=${id}` });
  },

  findItem(id: number): SelectItem | undefined {
    for (const g of this.data.groups) {
      for (const it of g.items) {
        if (it.id === id) return it;
      }
    }
    return undefined;
  },

  onPlay() {
    // U1：从第一个已解锁且未通关的题目开始；全通关则取第一个已解锁题
    const seeds = defaultSeeds(PUZZLES);
    const unlocked = getUnlockedSet(seeds);
    const records = loadSave().records;
    const next = PUZZLES.find((p) => unlocked.has(p.id) && !records[p.id]);
    const id = next ? next.id : PUZZLES.find((p) => unlocked.has(p.id))!.id;
    wx.reLaunch({ url: `/pages/index/index?puzzle=${id}` });
  },

  /** U3: 直接跳到上次未完成的题 */
  onResume() {
    if (!this.data.resumeId) return;
    wx.reLaunch({ url: `/pages/index/index?puzzle=${this.data.resumeId}` });
  },

  onTutorial() {
    // 重看 How to Play 教程
    wx.navigateTo({ url: "/pages/tutorial/tutorial" });
  },
});
