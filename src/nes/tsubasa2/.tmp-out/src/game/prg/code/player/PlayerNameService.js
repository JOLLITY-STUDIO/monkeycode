import { BANK27_NAME_TABLE, BANK27_TEXT_TABLE, findNameByPlayerId } from '../../data/tables/player-name-table';
export class PlayerNameService {
    constructor(store) {
        this.store = store;
    }
    /** 查询球员名字：findNameByPlayerId → PlayerName */
    getPlayerName(playerId) {
        const entry = findNameByPlayerId(playerId);
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
        return BANK27_TEXT_TABLE[textId] ?? '';
    }
    /** 导出表供外部访问 */
    get table() { return BANK27_NAME_TABLE; }
}
