/**
 * 存档模块 —— 进度/星级/最佳时间/解锁状态（E3 + U1 解锁链）
 * 平台无关：微信小程序用 wx.storage，其余环境回退 localStorage
 */
export interface PuzzleRecord {
  stars: number; // 1-3
  bestTime: number; // 秒
  solvedAt: number; // 时间戳
}

/** 拼图解锁状态（U1：手动/链式解锁） */
export interface UnlockState {
  /** 已解锁拼图 id 集合（不论是否通关） */
  unlocked: number[];
}

export interface SaveData {
  records: Record<number, PuzzleRecord>;
  unlock: UnlockState;
}

const KEY = "picross_save_v1";

function hasWx(): boolean {
  const g = globalThis as any;
  return typeof g.wx !== "undefined" && !!g.wx.getStorageSync;
}

function empty(): SaveData {
  return { records: {}, unlock: { unlocked: [] } };
}

export function loadSave(): SaveData {
  try {
    if (hasWx()) {
      const s = wx.getStorageSync(KEY);
      if (s && s.records) {
        if (!s.unlock) s.unlock = { unlocked: [] };
        return s as SaveData;
      }
    } else {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && d.records) {
          if (!d.unlock) d.unlock = { unlocked: [] };
          return d as SaveData;
        }
      }
    }
  } catch (e) {
    /* ignore */
  }
  return empty();
}

function persist(data: SaveData) {
  try {
    if (hasWx()) wx.setStorageSync(KEY, data);
    else localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    /* ignore */
  }
}

/** 记录通关：星级更高或同星更快则覆盖 */
export function recordPuzzle(id: number, stars: number, timeSec: number): SaveData {
  const data = loadSave();
  const prev = data.records[id];
  if (!prev || stars > prev.stars || (stars === prev.stars && timeSec < prev.bestTime)) {
    data.records[id] = { stars, bestTime: timeSec, solvedAt: Date.now() };
    persist(data);
  }
  return data;
}

export function getRecord(id: number): PuzzleRecord | null {
  return loadSave().records[id] || null;
}

/** 显式解锁（U1：手动/奖励解锁入口） */
export function unlockPuzzle(id: number): SaveData {
  const data = loadSave();
  if (data.unlock.unlocked.indexOf(id) === -1) {
    data.unlock.unlocked.push(id);
    persist(data);
  }
  return data;
}

/** 查询解锁状态 */
export function isPuzzleUnlocked(id: number, seedUnlocked: number[] = []): boolean {
  const data = loadSave();
  return data.unlock.unlocked.indexOf(id) !== -1 || seedUnlocked.indexOf(id) !== -1;
}

/** 已解锁拼图 id 集合（含 ROM 默认种子） */
export function getUnlockedSet(seed: number[] = []): Set<number> {
  const data = loadSave();
  const s = new Set<number>(data.unlock.unlocked);
  for (const id of seed) s.add(id);
  return s;
}

/**
 * U1 解锁链：完成 id 后按 difficulty 分组顺序解锁下一题（按 puzzles 数组顺序）。
 * 返回新增解锁的 id 列表（用于 UI 反馈）。
 */
export function unlockNextInChain(id: number, difficulty: number, allPuzzles: { id: number; difficulty: number }[]): number[] {
  const data = loadSave();
  const same = allPuzzles.filter((p) => p.difficulty === difficulty).map((p) => p.id);
  const idx = same.indexOf(id);
  if (idx < 0) return [];
  const newOnes: number[] = [];
  // 解锁同难度链上紧邻的 2 道（向后兼容 Picross DS "通一题开两题" 模式）
  for (let i = 1; i <= 2; i++) {
    const nxt = same[idx + i];
    if (nxt === undefined) break;
    if (data.unlock.unlocked.indexOf(nxt) === -1) {
      data.unlock.unlocked.push(nxt);
      newOnes.push(nxt);
    }
  }
  // 完成最后一题 → 整组已通关，无后续可解锁
  if (newOnes.length) persist(data);
  return newOnes;
}

/** 清空存档（含解锁状态）—— 调试/重置 */
export function clearSave(): void {
  try {
    if (hasWx()) wx.removeStorageSync(KEY);
    else localStorage.removeItem(KEY);
  } catch (e) {
    /* ignore */
  }
}

// ===========================================================
// U3: 中途进度存档（用于关掉小程序后 resume）
// ===========================================================

/** 中途进度（marks 序列化为 2bit/cell，已存在的入口：sets/resumes） */
export interface PuzzleProgress {
  puzzleId: number;
  /** 序列化 marks（2 bit/cell） */
  marks: Uint8Array;
  /** 已消耗时间（秒） */
  elapsedSec: number;
  /** 最近保存时间戳 */
  savedAt: number;
}

const PROGRESS_KEY = "picross_progress_v1";

function loadAllProgress(): Record<number, PuzzleProgress> {
  try {
    if (hasWx()) {
      const s = wx.getStorageSync(PROGRESS_KEY);
      if (s && typeof s === "object") return s as Record<number, PuzzleProgress>;
    } else {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && typeof d === "object") return d as Record<number, PuzzleProgress>;
      }
    }
  } catch (e) {}
  return {};
}

function persistAllProgress(map: Record<number, PuzzleProgress>) {
  try {
    // Uint8Array 不可 JSON.stringify，需先 base64
    const out: Record<string, any> = {};
    for (const id in map) {
      const p = map[id];
      out[id] = {
        puzzleId: p.puzzleId,
        marksB64: bytesToB64(p.marks),
        elapsedSec: p.elapsedSec,
        savedAt: p.savedAt,
      };
    }
    if (hasWx()) wx.setStorageSync(PROGRESS_KEY, out);
    else localStorage.setItem(PROGRESS_KEY, JSON.stringify(out));
  } catch (e) {}
}

function bytesToB64(arr: Uint8Array): string {
  // 浏览器/小程序环境兼容
  if (typeof btoa !== "undefined") {
    let s = "";
    for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
    return btoa(s);
  }
  // wx 环境
  return wx.arrayBufferToBase64(arr.buffer);
}

function b64ToBytes(s: string): Uint8Array {
  if (typeof atob !== "undefined") {
    const bin = atob(s);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  const buf = wx.base64ToArrayBuffer(s);
  return new Uint8Array(buf);
}

/** 保存中途进度（覆盖） */
export function saveProgress(puzzleId: number, marks: Uint8Array, elapsedSec: number): PuzzleProgress {
  const all = loadAllProgress();
  const p: PuzzleProgress = { puzzleId, marks, elapsedSec, savedAt: Date.now() };
  all[puzzleId] = p;
  persistAllProgress(all);
  return p;
}

/** 读取某题的进度（不存在返回 null） */
export function loadProgress(puzzleId: number): PuzzleProgress | null {
  const all = loadAllProgress();
  const p = all[puzzleId];
  if (!p) return null;
  // 还原 marks Uint8Array
  if (!(p.marks instanceof Uint8Array)) {
    try { p.marks = b64ToBytes((p.marks as any).marksB64 || (p.marks as any)); }
    catch { return null; }
  }
  return p;
}

/** 清掉某题进度（通关后或主动 reset） */
export function clearProgress(puzzleId: number): void {
  const all = loadAllProgress();
  if (all[puzzleId]) { delete all[puzzleId]; persistAllProgress(all); }
}

/** 找出有进度的题目（按最近保存时间倒序） */
export function getInProgressPuzzles(): PuzzleProgress[] {
  const all = loadAllProgress();
  return Object.values(all).sort((a, b) => b.savedAt - a.savedAt);
}

/** 是否有指定题的进度（用于 select 页 “Resume” 按钮） */
export function hasProgress(puzzleId: number): boolean {
  return !!loadAllProgress()[puzzleId];
}
