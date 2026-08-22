"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorySceneController = exports.StoryChapter = void 0;
const chapter_table_1 = require("../../data/scene/chapter-table");
/** 场景地图数据注册 KV 键 (bank18 场景地图, 由渲染层读取) */
const SCENE_MAP_KEY = 'sceneMap_18';
/** 当前章节状态 KV 键 */
const CHAPTER_KEY = 'story_chapter';
/**
 * StoryChapter — 单章剧情场景的装载状态与地图引用。
 * 对应 bank18 章节场景地图 (chapter-table 章节指针表)。
 */
class StoryChapter {
    constructor(chapterId, mapRef, mapData) {
        /** 每帧进度 (由 update 推进) */
        this._frame = 0;
        this.chapterId = chapterId;
        this.mapRef = mapRef;
        this.mapData = mapData;
    }
    /** 章节地图宽 (tile/行) */
    get width() {
        return this.mapRef.width;
    }
    /** 章节地图高 (tile/列 = 字节数 / 宽) */
    get height() {
        return Math.floor(this.mapData.length / this.mapRef.width);
    }
    /** 读取地图指定 tile (原银行内偏移寻址语义, 由章节指针表换算) */
    tile(x, y) {
        return this.mapData[y * this.mapRef.width + x] ?? 0;
    }
    /** 当前帧进度 */
    get frame() {
        return this._frame;
    }
    /** 推进一帧 */
    advance() {
        this._frame++;
    }
}
exports.StoryChapter = StoryChapter;
class StorySceneController {
    constructor(store) {
        this._chapter = null;
        this._store = store;
    }
    /**
     * 装载剧情场景 (章节指针表查询)。
     * 依据 chapterId 从 CHAPTER_TABLE 取地图引用, 装载 bank18 场景地图数据到 DataStore,
     * 并登记当前章节状态。
     */
    load(chapterId) {
        const id = chapterId & 0xff;
        const ref = chapter_table_1.CHAPTER_TABLE[id];
        if (!ref) {
            // 未登记章节 → 空章节 (无地图)
            this._chapter = null;
            this._store.set(CHAPTER_KEY, null);
            return;
        }
        // 从 bank18 地图数据块取本章节片段 (章节指针表引用 → 数据)
        const mapData = chapter_table_1.CHAPTER_MAP_DATA.slice(ref.offset, ref.offset + ref.length);
        this._chapter = new StoryChapter(id, ref, mapData);
        // 注册场景地图数据供渲染层读取 (DataStore KV)
        this._store.set(SCENE_MAP_KEY, mapData);
        this._store.set(CHAPTER_KEY, this._chapter);
    }
    /** 每帧推进剧情场景 */
    update(frame) {
        void frame;
        if (this._chapter) {
            this._chapter.advance();
        }
    }
    /** 当前章节 (未装载为 null) */
    get chapter() {
        return this._chapter;
    }
    /** 当前章节 ID (未装载为 -1) */
    get chapterId() {
        return this._chapter ? this._chapter.chapterId : -1;
    }
}
exports.StorySceneController = StorySceneController;
exports.default = StorySceneController;
