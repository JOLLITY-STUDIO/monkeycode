"use strict";
/**
 * Bank 18 Service — 剧情场景主控制器 (STORY 调度层)
 *
 * Bank18 经数据 dump 分析 (2026-08): 是「渲染数据 Bank」(精灵图+NT tile 数据),
 * 数据为 $01/$0d/$1a/$50-$5f 等 tile 索引和精灵对, 非章节指针表。
 * 章节→Bank19 streamOffset 映射由 Bank00/Bank02 代码维护 (跨 bank, 待提取)。
 *
 * 职责:
 *   1. 持有 Bank18 渲染数据 (供 Bank19 读取渲染)
 *   2. 章节→Bank19 数据流偏移调度 (映射表待从 Bank00/Bank02 抠)
 *   3. 由 Bank02/Bank00 选关后调用, 设置 Bank19 streamOffset 并启动
 *   4. 驱动 Bank19.update 推进剧情
 *
 * 数据层: 原始字节经 `data/prg/bank18-data.ts` (readB18/readB18U16) 访问。
 *
 * 后续补全: 从 Bank00/Bank02 代码提取真实章节→offset 映射, 替换占位。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank18Service = exports.StoryChapter = void 0;
const bank18_data_1 = require("../data/prg/bank18-data");
const bank19_auxiliary_service_1 = require("./bank19_auxiliary.service");
/** 章节枚举 (剧情进度, 对应原版 STORY 选关/章节推进) */
var StoryChapter;
(function (StoryChapter) {
    StoryChapter[StoryChapter["OPENING"] = 0] = "OPENING";
    StoryChapter[StoryChapter["CHAPTER_1"] = 1] = "CHAPTER_1";
    StoryChapter[StoryChapter["CHAPTER_2"] = 2] = "CHAPTER_2";
    StoryChapter[StoryChapter["CHAPTER_3"] = 3] = "CHAPTER_3";
    StoryChapter[StoryChapter["HALF_TIME"] = 4] = "HALF_TIME";
    StoryChapter[StoryChapter["EXTRA_TIME"] = 5] = "EXTRA_TIME";
    StoryChapter[StoryChapter["CONTINUE"] = 255] = "CONTINUE";
})(StoryChapter || (exports.StoryChapter = StoryChapter = {}));
/**
 * 章节 → Bank19 数据流偏移映射 (TODO: 从 Bank18 数据表精确提取)。
 * 默认全部指向 Bank19 内置起点, 后续按 Bank18 数据修正。
 */
const CHAPTER_STREAM_OFFSET = {
    [StoryChapter.OPENING]: bank19_auxiliary_service_1.BANK19_STREAM_OFFSET,
    [StoryChapter.CHAPTER_1]: bank19_auxiliary_service_1.BANK19_STREAM_OFFSET,
    [StoryChapter.CHAPTER_2]: bank19_auxiliary_service_1.BANK19_STREAM_OFFSET,
    [StoryChapter.CHAPTER_3]: bank19_auxiliary_service_1.BANK19_STREAM_OFFSET,
    [StoryChapter.HALF_TIME]: bank19_auxiliary_service_1.BANK19_STREAM_OFFSET,
    [StoryChapter.EXTRA_TIME]: bank19_auxiliary_service_1.BANK19_STREAM_OFFSET,
    [StoryChapter.CONTINUE]: bank19_auxiliary_service_1.BANK19_STREAM_OFFSET,
};
class Bank18Service {
    constructor(store, bank19) {
        /** 当前章节 */
        this._chapter = StoryChapter.OPENING;
        /** 剧情是否进行中 */
        this._active = false;
        this._store = store;
        this._bank19 = bank19;
    }
    get store() { return this._store; }
    get isActive() { return this._active; }
    get chapter() { return this._chapter; }
    /**
     * 进入指定章节的剧情场景 — 选关后由 Bank02/Bank00 调用。
     * 设置 Bank19 的剧情流偏移并启动渲染。
     */
    enterChapter(chapter) {
        this._chapter = chapter;
        const offset = CHAPTER_STREAM_OFFSET[chapter] ?? bank19_auxiliary_service_1.BANK19_STREAM_OFFSET;
        this._active = true;
        this._bank19.start(offset);
    }
    /**
     * 每帧驱动剧情 — 由 boot STORY 路由调用。
     * 返回 true 表示剧情播放完毕 (应流转到 MATCH)。
     */
    update(_frameCount) {
        if (!this._active)
            return false;
        const done = this._bank19.update(0);
        if (done) {
            this._active = false;
            return true;
        }
        return false;
    }
    /** 跳过当前剧情 — 直接进入下一场景 */
    skip() {
        this._active = false;
    }
    // ──────────────────────────────────────────────
    // Bank18 渲染数据访问 (供 Bank19 读取渲染)
    // ──────────────────────────────────────────────
    /** 读本 bank 内 cpuAddr ($8000-$9FFF) 原始字节 */
    readByte(cpuAddr) {
        return (0, bank18_data_1.readB18)(cpuAddr);
    }
    /** 读本 bank 内 16bit LE */
    readU16(cpuAddr) {
        return (0, bank18_data_1.readB18U16)(cpuAddr);
    }
    /** 读背景 tile 图块行 (row 索引, 每行 16 字节 = 4×4 tile) */
    readTileRow(row) {
        return (0, bank18_data_1.readB18TileRow)(row);
    }
}
exports.Bank18Service = Bank18Service;
