import { BANK19_SPRITE_FRAMES, BANK19_TILE_DATA, BANK19_SCENE_DATA } from '../../data/tables/sprite-frame-table';
export class SpriteFrameService {
    constructor(store) {
        this.store = store;
    }
    /**
     * 加载精灵帧到 OAM 缓冲：精灵序列 → 写入 OAM 属性表（步长 4）。
     * 序列通过 BANK19_SPRITE_FRAMES 查询。
     */
    loadSpriteFrame(frameId, baseAddr) {
        const frame = BANK19_SPRITE_FRAMES.find(f => f.frameId === frameId);
        if (!frame)
            return;
        let offset = baseAddr;
        for (const tile of frame.tiles) {
            this.store.write(`ram_${offset.toString(16).padStart(4, '0')}`, tile);
            offset += 4;
        }
        this.store.write('ram_0515', 0x80);
    }
    /**
     * 解析精灵序列段：$E0 终止；非终止则写入 OAM 并推进。
     */
    parseSpriteSegment() {
        let count = 0;
        let idx = this.store.read('ram_008A');
        while (true) {
            const tile = this.store.read(`ram_0088_${idx}`);
            if (tile >= 0xE0)
                break;
            idx++;
            count++;
            this.store.write('ram_0515', 1);
            if (this.store.read('ram_0515') !== 0) {
                this.store.write('ram_0515', 1);
            }
        }
        return count;
    }
    /** 装载场景 tile 数据：BANK19_SCENE_DATA 查表 */
    loadSceneTiles(sceneId) {
        return BANK19_SCENE_DATA[sceneId] ?? [];
    }
    /** 查询 tile 数据：BANK19_TILE_DATA 查表 */
    getTileData(tileId) {
        return BANK19_TILE_DATA[tileId] ?? 0;
    }
}
