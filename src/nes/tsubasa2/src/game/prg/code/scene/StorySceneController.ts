/**
 * StorySceneController — 剧情场景主控制器
 * @bank 18 ($8000-$9FFF 窗口, 场景地图数据)
 *
 * 职责: 装载/推进章节剧情场景。bank18 为纯数据段 (无 6502 指令), 内容为场景/章节
 * 地图 tile 数据 (8192 字节)。本控制器负责把章节场景地图数据装载进 DataStore,
 * 并按帧推进场景显示。
 *
 * 剧情脚本指令流 (文本/对话) 由 bank19 场景主控 + ScriptEngine (bank00) 消费,
 * 本控制器只装载 bank18 场景地图数据供渲染层读取。
 *
 * 命名规范: 旧名 Bank18Service → 新名 StorySceneController。
 */
import { DataStore } from '../../data/store/DataStore';
import { CHAPTER_TABLE, CHAPTER_MAP_DATA, type ChapterMapRef } from '../../data/scene/chapter-table';

/** 场景地图数据注册 KV 键 (bank18 场景地图, 由渲染层读取) */
const SCENE_MAP_KEY = 'sceneMap_18';

/** 当前章节状态 KV 键 */
const CHAPTER_KEY = 'story_chapter';

/**
 * StoryChapter — 单章剧情场景的装载状态与地图引用。
 * 对应 bank18 章节场景地图 (chapter-table 章节指针表)。
 */
export class StoryChapter {
  readonly chapterId: number;
  readonly mapRef: ChapterMapRef;
  /** 已装载的地图字节 (bank18 场景地图片段) */
  readonly mapData: readonly number[];
  /** 每帧进度 (由 update 推进) */
  protected _frame = 0;

  constructor(chapterId: number, mapRef: ChapterMapRef, mapData: readonly number[]) {
    this.chapterId = chapterId;
    this.mapRef = mapRef;
    this.mapData = mapData;
  }

  /** 章节地图宽 (tile/行) */
  get width(): number {
    return this.mapRef.width;
  }

  /** 章节地图高 (tile/列 = 字节数 / 宽) */
  get height(): number {
    return Math.floor(this.mapData.length / this.mapRef.width);
  }

  /** 读取地图指定 tile (原银行内偏移寻址语义, 由章节指针表换算) */
  tile(x: number, y: number): number {
    return this.mapData[y * this.mapRef.width + x] ?? 0;
  }

  /** 当前帧进度 */
  get frame(): number {
    return this._frame;
  }

  /** 推进一帧 */
  advance(): void {
    this._frame++;
  }
}

export class StorySceneController {
  protected _store: DataStore;
  protected _chapter: StoryChapter | null = null;

  constructor(store: DataStore) {
    this._store = store;
  }

  /**
   * 装载剧情场景 (章节指针表查询)。
   * 依据 chapterId 从 CHAPTER_TABLE 取地图引用, 装载 bank18 场景地图数据到 DataStore,
   * 并登记当前章节状态。
   */
  load(chapterId: number): void {
    const id = chapterId & 0xff;
    const ref = CHAPTER_TABLE[id];
    if (!ref) {
      // 未登记章节 → 空章节 (无地图)
      this._chapter = null;
      this._store.set(CHAPTER_KEY, null);
      return;
    }
    // 从 bank18 地图数据块取本章节片段 (章节指针表引用 → 数据)
    const mapData = CHAPTER_MAP_DATA.slice(ref.offset, ref.offset + ref.length);
    this._chapter = new StoryChapter(id, ref, mapData);
    // 注册场景地图数据供渲染层读取 (DataStore KV)
    this._store.set(SCENE_MAP_KEY, mapData);
    this._store.set(CHAPTER_KEY, this._chapter);
  }

  /** 每帧推进剧情场景 */
  update(frame: number): void {
    void frame;
    if (this._chapter) {
      this._chapter.advance();
    }
  }

  /** 当前章节 (未装载为 null) */
  get chapter(): StoryChapter | null {
    return this._chapter;
  }

  /** 当前章节 ID (未装载为 -1) */
  get chapterId(): number {
    return this._chapter ? this._chapter.chapterId : -1;
  }
}

export default StorySceneController;
