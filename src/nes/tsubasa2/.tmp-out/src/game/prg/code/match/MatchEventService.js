import { BANK20_EVENT_TABLE, BANK20_EVENT_POINTER_TABLE, findEventById } from '../../data/tables/match-event-table';
/** 比赛事件类型 */
export var MatchEventType;
(function (MatchEventType) {
    /** 射门 */
    MatchEventType[MatchEventType["SHOT"] = 0] = "SHOT";
    /** 传球 */
    MatchEventType[MatchEventType["PASS"] = 1] = "PASS";
    /** 必杀技 */
    MatchEventType[MatchEventType["SPECIAL"] = 2] = "SPECIAL";
    /** 对峙 */
    MatchEventType[MatchEventType["CONFRONT"] = 3] = "CONFRONT";
})(MatchEventType || (MatchEventType = {}));
export class MatchEventService {
    constructor(store) {
        this.store = store;
    }
    /**
     * 启动比赛事件：事件类型 → 计数器 → 装载事件参数 → 目标坐标。
     * 步长 0x15 清零 0x 0x7E 范围事件参数区。
     */
    startEvent(req) {
        const entry = findEventById(req.eventId);
        const evt = this.store.matchEvent;
        evt.typeId = req.type & 0xff;
        evt.counter = 1;
        for (let x = 0; x < 0x7E; x += 0x15) {
            this.store.writeByte(0x0547 + x, 0);
        }
        evt.phase = 0;
        evt.flag0 = 0;
        evt.flag1 = 0xFF;
        evt.counter3 = 1;
        evt.paramLo = 0x23;
        evt.paramHi = 0x45;
        evt.targetX = req.targetX & 0xFF;
        evt.targetY = req.targetY & 0xFF;
        return {
            eventId: req.eventId,
            success: true,
            nextEventId: entry?.nextEventId ?? 0,
        };
    }
    /** 事件状态机更新：计数器递减 → 0 时读取下一段 */
    updateEvent() {
        const evt = this.store.matchEvent;
        if (evt.counter > 0) {
            evt.counter = (evt.counter - 1) & 0xff;
            return true;
        }
        return false;
    }
    /** 解析事件段：$F0+ 扩展标记 → 标记分发 */
    parseEventSegment() {
        const ptr = this.store.readByte(0x004c);
        const y = this.store.readByte(0x004d);
        const value = this.store.readByte((ptr + y) & 0xff);
        if (value >= 0xF0) {
            return value - 0xF0;
        }
        this.store.matchEvent.counter = value;
        return value;
    }
    /** 事件标记解析：SEC; SBC #$F0 */
    resolveEventFlag(flag) {
        return flag - 0xF0;
    }
    /** 查询事件动作脚本偏移：BANK20_EVENT_POINTER_TABLE 查表（已消除 lo/hi 拆分） */
    findEventPointer(eventId) {
        const entry = BANK20_EVENT_POINTER_TABLE.find(p => p.eventId === eventId);
        return entry ? entry.target : 0;
    }
    /** 导出表供外部访问 */
    get table() { return BANK20_EVENT_TABLE; }
}
