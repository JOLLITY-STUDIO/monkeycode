/**
 * SpriteFrameService — 精灵帧/比赛场景数据
 *
 * 行为翻译（去 CPU 化）：
 * - 加载精灵帧到 OAM 缓冲：精灵序列 → 写入 OAM 属性表
 * - 解析精灵序列段：$E0 终止；非终止则写入 OAM 并推进
 * - 装载场景 tile 数据：BANK19_SCENE_DATA 查表
 * - 查询 tile 数据：BANK19_TILE_DATA 查表
 *
 * bank 切换 = import SpriteFrameService + 直接调用，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
/** 精灵帧定义 */
export interface SpriteFrame {
    readonly frameId: number;
    readonly tiles: ReadonlyArray<number>;
    readonly palette: number;
    readonly flipX: boolean;
    readonly flipY: boolean;
    readonly priority: number;
}
export declare class SpriteFrameService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /**
     * 加载精灵帧到 OAM 缓冲：精灵序列 → 写入 OAM 属性表（步长 4）。
     * 序列通过 BANK19_SPRITE_FRAMES 查询。
     */
    loadSpriteFrame(frameId: number, baseAddr: number): void;
    /**
     * 解析精灵序列段：$E0 终止；非终止则写入 OAM 并推进。
     */
    parseSpriteSegment(): number;
    /** 装载场景 tile 数据：BANK19_SCENE_DATA 查表 */
    loadSceneTiles(sceneId: number): ReadonlyArray<number>;
    /** 查询 tile 数据：BANK19_TILE_DATA 查表 */
    getTileData(tileId: number): number;
}
