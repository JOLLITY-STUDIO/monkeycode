/**
 * SceneTable — 场景表（24 项）
 *
 * 组织原则：以「场景 ID」为键组织 24 个场景条目，**不按业务语义命名**。
 * 每个条目的 `behavior` 为原始行为摘要（用于未翻译场景的 stub 占位）。
 * 业务语义（开场/标题/菜单等）后续对照确认后再补充。
 */
import type { SceneController } from './SceneController';
/** 单个场景条目 */
export interface SceneEntry {
    /** 场景号 0-23 */
    id: number;
    /** 原始行为摘要（已脱敏，去除 asm 地址字面量） */
    behavior: string;
    /** 控制器类（未翻译为 null，BootRouter 用默认 stub） */
    controller?: new (store: import('../../data/store/DataStore').DataStore, input: import('../system/InputService').InputService) => SceneController;
}
/** 场景表：24 项 */
export declare const SCENE_TABLE: ReadonlyArray<SceneEntry>;
/** 按场景号取条目 */
export declare function getSceneEntry(sceneId: number): SceneEntry | undefined;
