import { BANK22_MOVE_TABLE, BANK22_DIRECTION_TABLE, findMoveById } from '../../data/tables/player-move-table';
export class PlayerMoveService {
    constructor(store) {
        this.store = store;
    }
    /**
     * 计算球员移动：方向标志 → 方向运算 → 更新坐标。
     * playerMove.flipX（directionFlag bit6）控制 X 翻转。
     */
    computeMove(req) {
        const move = this.store.playerMove;
        let dx = req.targetX;
        let dy = req.targetY;
        if (move.flipX) {
            dx = -dx;
        }
        const newX = (move.curX + dx) & 0xFF;
        const newY = (move.curY + dy) & 0xFF;
        const arrived = newX === req.targetX && newY === req.targetY;
        return {
            newPosX: newX,
            newPosY: newY,
            newDirection: req.direction,
            arrived,
        };
    }
    /** 解析移动序列段：间接读取移动数据 */
    parseMoveSegment() {
        const move = this.store.playerMove;
        const ptr = move.segmentPtr;
        const value = this.store.readByte((ptr + move.segmentCursor) & 0xff);
        move.segmentCursor = 0;
        return value;
    }
    /** 处理方向标志：directionFlag 位域 → 翻转判定 */
    processDirection() {
        return this.store.playerMove.flipX;
    }
    /** 查询移动模式：findMoveById → pattern */
    findMovePattern(moveId) {
        const entry = findMoveById(moveId);
        return entry ? entry.pattern : [];
    }
    /** 导出表供外部访问 */
    get table() { return BANK22_MOVE_TABLE; }
    get directionTable() { return BANK22_DIRECTION_TABLE; }
}
