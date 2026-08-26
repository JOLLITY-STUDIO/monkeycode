import { BANK18_DATA_TABLES } from '../../data/scene/bank18-data';
const SEGMENT_SIZE = 0x1000; // 每段 4KB
/** 预分割段：按 SEGMENT_SIZE 切分 BANK18_DATA_TABLES */
const SEGMENT_BYTES = (() => {
    const out = [];
    for (let i = 0; i < BANK18_DATA_TABLES.length; i += SEGMENT_SIZE) {
        out.push(BANK18_DATA_TABLES.slice(i, i + SEGMENT_SIZE));
    }
    return out;
})();
export class ScriptLoader {
    constructor(store) {
        this.store = store;
    }
    /** 按段 ID 装载（V0.4 已实现：返回 BANK18 切分段） */
    loadSegment(scriptId) {
        const id = scriptId & 0xff;
        const seg = SEGMENT_BYTES[id];
        if (!seg)
            return null;
        return { id, bytes: seg };
    }
    /** 全部段清单（按 BANK18 切片） */
    listSegments() {
        const ids = [];
        for (let i = 0; i < SEGMENT_BYTES.length; i++) {
            if (SEGMENT_BYTES[i].length > 0)
                ids.push(i);
        }
        return ids;
    }
    /** 段字节长度 */
    segmentLength(scriptId) {
        return SEGMENT_BYTES[scriptId & 0xff]?.length ?? 0;
    }
}
