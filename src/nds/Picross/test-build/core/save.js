const KEY = "picross_save_v1";
function hasWx() {
    const g = globalThis;
    return typeof g.wx !== "undefined" && !!g.wx.getStorageSync;
}
function empty() {
    return { records: {}, unlock: { unlocked: [] } };
}
export function loadSave() {
    try {
        if (hasWx()) {
            const s = wx.getStorageSync(KEY);
            if (s && s.records) {
                if (!s.unlock)
                    s.unlock = { unlocked: [] };
                return s;
            }
        }
        else {
            const raw = localStorage.getItem(KEY);
            if (raw) {
                const d = JSON.parse(raw);
                if (d && d.records) {
                    if (!d.unlock)
                        d.unlock = { unlocked: [] };
                    return d;
                }
            }
        }
    }
    catch (e) {
        /* ignore */
    }
    return empty();
}
function persist(data) {
    try {
        if (hasWx())
            wx.setStorageSync(KEY, data);
        else
            localStorage.setItem(KEY, JSON.stringify(data));
    }
    catch (e) {
        /* ignore */
    }
}
/** 记录通关：星级更高或同星更快则覆盖 */
export function recordPuzzle(id, stars, timeSec) {
    const data = loadSave();
    const prev = data.records[id];
    if (!prev || stars > prev.stars || (stars === prev.stars && timeSec < prev.bestTime)) {
        data.records[id] = { stars, bestTime: timeSec, solvedAt: Date.now() };
        persist(data);
    }
    return data;
}
export function getRecord(id) {
    return loadSave().records[id] || null;
}
/** 显式解锁（U1：手动/奖励解锁入口） */
export function unlockPuzzle(id) {
    const data = loadSave();
    if (data.unlock.unlocked.indexOf(id) === -1) {
        data.unlock.unlocked.push(id);
        persist(data);
    }
    return data;
}
/** 查询解锁状态 */
export function isPuzzleUnlocked(id, seedUnlocked = []) {
    const data = loadSave();
    return data.unlock.unlocked.indexOf(id) !== -1 || seedUnlocked.indexOf(id) !== -1;
}
/** 已解锁拼图 id 集合（含 ROM 默认种子） */
export function getUnlockedSet(seed = []) {
    const data = loadSave();
    const s = new Set(data.unlock.unlocked);
    for (const id of seed)
        s.add(id);
    return s;
}
/**
 * U1 解锁链：完成 id 后按 difficulty 分组顺序解锁下一题（按 puzzles 数组顺序）。
 * 返回新增解锁的 id 列表（用于 UI 反馈）。
 */
export function unlockNextInChain(id, difficulty, allPuzzles) {
    const data = loadSave();
    const same = allPuzzles.filter((p) => p.difficulty === difficulty).map((p) => p.id);
    const idx = same.indexOf(id);
    if (idx < 0)
        return [];
    const newOnes = [];
    // 解锁同难度链上紧邻的 2 道（向后兼容 Picross DS "通一题开两题" 模式）
    for (let i = 1; i <= 2; i++) {
        const nxt = same[idx + i];
        if (nxt === undefined)
            break;
        if (data.unlock.unlocked.indexOf(nxt) === -1) {
            data.unlock.unlocked.push(nxt);
            newOnes.push(nxt);
        }
    }
    // 完成最后一题 → 整组已通关，无后续可解锁
    if (newOnes.length)
        persist(data);
    return newOnes;
}
/** 清空存档（含解锁状态）—— 调试/重置 */
export function clearSave() {
    try {
        if (hasWx())
            wx.removeStorageSync(KEY);
        else
            localStorage.removeItem(KEY);
    }
    catch (e) {
        /* ignore */
    }
}
