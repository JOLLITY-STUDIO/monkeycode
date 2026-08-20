"use strict";
/**
 * Bank 18 Service — 剧情场景主控制器 (STORY 调度层)
 *
 * 【已查证 2026-08】asm/bank18/ 全部 4 个 .s (bank18.s + data_tables.s +
 * data_maps.s + data_tail.s) 完整反汇编审阅: Bank18 是「渲染数据 Bank」——
 * 全为背景 tile 图块 / 精灵对数据, 值集中在 $01/$0D/$1A/$50-$5F/$E8/$F0/
 * $1E/$34/$3C/$41/$44/$80-$99 等 tile 索引区间, 不含任何 .word 章节指针表 /
 * 章节目录 / streamOffset 偏移表。
 *
 * 章节→Bank19 streamOffset 映射为跨 bank 概念, 不在本 bank 内。经 bank00
 * (code_scene.s $8AB3-$8EEF 为背景图块解码例程, 非 STORY 章节映射) 与 bank02
 * (code_main/code_data/data_tables 为比赛/OAM/调色板数据) 审视, 确切映射表
 * 仍属「未反汇编/待 trace 的章节选择流程」, 需从 bank00/bank02 章节切换入口
 * (如 bank02 entryF 分派 / bank00 章节加载) 继续追踪。
 *
 * 职责:
 *   1. 持有 Bank18 渲染数据 (供 Bank19 读取渲染)
 *   2. 按章节选择 bank18 对应场景 tile-map 段 (真实 ROM 数据, 见 B18_SCENE_MAPS)
 *   3. 章节→Bank19 数据流偏移调度 (映射表待从 Bank00/Bank02 章节流程 trace)
 *   4. 由 Bank02/Bank00 选关后调用, 设置 Bank19 streamOffset 并启动
 *   5. 驱动 Bank19.update 推进剧情
 *
 * 数据层: 原始字节经 `data/prg/bank18-data.ts` (readB18/readB18U16/readB18Scene)
 * 访问。
 *
 * 后续补全: 见 CHAPTER_STREAM_OFFSET 注释 (待 trace 真实章节→offset 映射)。
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
 * 章节 → Bank19 数据流偏移映射。
 *
 * 【查证 2026-08】已确认 asm/bank18 无章节表 (纯渲染数据 Bank, 见文件头注释)。
 * 真实映射由 bank00/bank02 跨 bank 章节选择流程维护, 属未反汇编/待 trace 段,
 * 需从 bank02 entryF 分派 / bank00 章节加载入口继续追踪后才能给出每章真实值。
 * 当前所有章节暂指向 Bank19 内置数据流起点 (BANK19_STREAM_OFFSET=$1467),
 * 作为统一占位 — 覆盖全部章节走同一段开场流, 语义正确但不分章差异。
 *
 * 下一步: trace bank00/bank02 章节切换流程, 提取各 StoryChapter 对应
 * Bank19 streamOffset 后替换本表各键值。
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
/**
 * 章节 → bank18 场景 tile-map 段索引 (B18_SCENE_MAPS)。
 *
 * 【约束】bank18 无 .word 章节指针表 (纯渲染数据); B18_SCENE_MAPS 的 12 个
 * 段是「按全 $01/$00 padding 分隔」识别出的真实 tile 数据段 (ROM 原始边界,
 * 非臆造)。本章节→场景段关联为 H5 层调度映射: 真实章节→场景段由 bank00/
 * bank02 跨 bank 引用定位 (未反汇编), 此处先按章节枚举顺序线性映射到
 * B18_SCENE_MAPS 前 7 段 (每章对应不同场景段)。待 trace 章节选择流程后可
 * 按真实引用逐条校正各键值 (其余场景段 7-11 供未列章节/后续扩展引用)。
 */
const CHAPTER_SCENE_IDX = {
    [StoryChapter.OPENING]: 0, // 开场段 [0x0000-0x0140)
    [StoryChapter.CHAPTER_1]: 1, // 大场景段 [0x0150-0x06F0)
    [StoryChapter.CHAPTER_2]: 2, // 路沿/地砖段 [0x0700-0x0B70)
    [StoryChapter.CHAPTER_3]: 3, // 城门/门框段 [0x0B80-0x0C30)
    [StoryChapter.HALF_TIME]: 4, // 中场段 [0x0C40-0x0F60)
    [StoryChapter.EXTRA_TIME]: 5, // 加时门口段 [0x0F70-0x1000)
    [StoryChapter.CONTINUE]: 6, // 续关段 [0x1010-0x1140)
};
class Bank18Service {
    constructor(store, bank19) {
        /** 当前章节 */
        this._chapter = StoryChapter.OPENING;
        /** 当前章节对应 bank18 场景段索引 (B18_SCENE_MAPS) */
        this._sceneIdx = 0;
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
     * 选择 bank18 对应场景 tile-map 段 (真实 ROM 数据), 并设置 Bank19 的
     * 剧情流偏移启动渲染。
     */
    enterChapter(chapter) {
        this._chapter = chapter;
        // 章节 → bank18 场景段 (真实数据, 见 CHAPTER_SCENE_IDX / B18_SCENE_MAPS)
        const sceneIdx = CHAPTER_SCENE_IDX[chapter] ?? 0;
        this._sceneIdx = sceneIdx >= 0 && sceneIdx < bank18_data_1.B18_SCENE_COUNT ? sceneIdx : 0;
        // 章节 → Bank19 数据流偏移 (跨 bank 占位, 待 bank00/bank02 trace)
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
    /** 当前章节对应的 bank18 场景段索引 (B18_SCENE_MAPS) */
    get sceneIndex() {
        return this._sceneIdx;
    }
    /** 读指定场景段的原始 tile 字节 (真实 ROM 数据) */
    readScene(sceneIdx) {
        return (0, bank18_data_1.readB18Scene)(sceneIdx);
    }
    /** 读指定场景段的单行 tile (16 字节 = 4×4 bg 图块) */
    readSceneRow(sceneIdx, row) {
        return (0, bank18_data_1.readB18SceneRow)(sceneIdx, row);
    }
}
exports.Bank18Service = Bank18Service;
