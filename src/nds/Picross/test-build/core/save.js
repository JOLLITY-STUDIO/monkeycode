const KEY = "picross_save_v1";
function hasWx() {
    const g = globalThis;
    return typeof g.wx !== "undefined" && !!g.wx.getStorageSync;
}
export function loadSave() {
    try {
        if (hasWx()) {
            const s = wx.getStorageSync(KEY);
            if (s && s.records)
                return s;
        }
        else {
            const raw = localStorage.getItem(KEY);
            if (raw) {
                const d = JSON.parse(raw);
                if (d && d.records)
                    return d;
            }
        }
    }
    catch (e) {
        /* ignore */
    }
    return { records: {} };
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
