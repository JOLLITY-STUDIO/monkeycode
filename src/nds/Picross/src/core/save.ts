/**
 * 存档模块 —— 进度/星级/最佳时间（E3）
 * 平台无关：微信小程序用 wx.storage，其余环境回退 localStorage
 */
export interface PuzzleRecord {
  stars: number; // 1-3
  bestTime: number; // 秒
  solvedAt: number; // 时间戳
}

export interface SaveData {
  records: Record<number, PuzzleRecord>;
}

const KEY = "picross_save_v1";

function hasWx(): boolean {
  const g = globalThis as any;
  return typeof g.wx !== "undefined" && !!g.wx.getStorageSync;
}

export function loadSave(): SaveData {
  try {
    if (hasWx()) {
      const s = wx.getStorageSync(KEY);
      if (s && s.records) return s as SaveData;
    } else {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && d.records) return d as SaveData;
      }
    }
  } catch (e) {
    /* ignore */
  }
  return { records: {} };
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
