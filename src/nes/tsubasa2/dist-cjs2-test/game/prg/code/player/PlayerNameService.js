"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerNameService = void 0;
const player_name_table_1 = require("../../data/tables/player-name-table");
class PlayerNameService {
    constructor(store) {
        this.store = store;
    }
    /** 查询球员名字：findNameByPlayerId → PlayerName */
    getPlayerName(playerId) {
        const entry = (0, player_name_table_1.findNameByPlayerId)(playerId);
        if (!entry)
            return null;
        return {
            playerId: entry.playerId,
            name: entry.name,
            shortName: entry.shortName,
            teamId: entry.teamId,
        };
    }
    /**
     * 解析名字段：store.playerName.segmentIndex → 字节偏移
     * @returns 4 字节偏移
     */
    parseNameSegment() {
        return this.store.playerName.segmentIndex * 4;
    }
    /**
     * 装载名字地址：store.playerName.charIndex → 查表
     */
    loadNameAddress(charIdx) {
        void charIdx;
        return 0;
    }
    /** 查询文本段：BANK27_TEXT_TABLE 查表 */
    getTextSegment(textId) {
        return player_name_table_1.BANK27_TEXT_TABLE[textId] ?? '';
    }
    /** 导出表供外部访问 */
    get table() { return player_name_table_1.BANK27_NAME_TABLE; }
}
exports.PlayerNameService = PlayerNameService;
