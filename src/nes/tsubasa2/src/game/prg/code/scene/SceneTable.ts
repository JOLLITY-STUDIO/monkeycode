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
export const SCENE_TABLE: ReadonlyArray<SceneEntry> = [
  {
    id: 0,
    behavior:
      '开场序列：渐显 → 等16帧 → 精灵Y下漂0x30次 → CHR配置0x17 → 装载场景3 NT → 调色板装载+精灵翻转 → 滚动循环 → 装载场景0 → 等待240+60帧 → 渐隐 → 清NT → 装载场景1 → 返回 2',
    controller: undefined, // Scene0Controller（已翻译）
  },
  {
    id: 1,
    behavior:
      '数学工具：右移2位(LSR/ROR×2)；按标志取16bit补码；返回 3',
  },
  {
    id: 2,
    behavior: '清精灵扩展表；返回 2',
  },
  {
    id: 3,
    behavior:
      '清 NT0/NT1 全部填 0；返回 2',
  },
  {
    id: 4,
    behavior: '隐藏全部 OAM；返回 2',
  },
  {
    id: 5,
    behavior: '$0009 延迟计数器处理；返回 2',
  },
  {
    id: 6,
    behavior: '$0009 标志处理；返回 2',
  },
  {
    id: 7,
    behavior: '标记置 $FF；返回 2',
  },
  {
    id: 8,
    behavior: 'ram_001B 清 bit6；返回 2',
  },
  {
    id: 9,
    behavior: 'ram_001B 置 bit6；返回 2',
  },
  {
    id: 10,
    behavior: '装载 CHR 配置 0 + 装载场景数据 5；返回 2',
  },
  {
    id: 11,
    behavior:
      '若 $000D≠0：清 $000D/$000E；否则 装载 CHR 配置 + 装载场景数据 6；返回 2',
  },
  {
    id: 12,
    behavior:
      '若 $000D≠0：清 $000D/$000E；否则 装载 CHR 配置 + 装载场景数据 8；返回 2',
  },
  {
    id: 13,
    behavior: '装载 CHR 配置 + 装载场景数据 7；返回 2',
  },
  {
    id: 14,
    behavior:
      '装载 NT 属性表；调色板装载+满渐显；等1帧；清 bit7；$004C=$82；精灵装载；返回 2',
  },
  {
    id: 15,
    behavior:
      'NT 缓冲写入长场景：读数据表逐项经渲染缓冲写入，按结束/延时标志控制；返回 2',
  },
  {
    id: 16,
    behavior:
      '精灵放置场景：按标志复制精灵属性表 + 多组精灵放置；返回 2',
  },
  {
    id: 17,
    behavior: '装载 CHR 配置；返回 2',
  },
  {
    id: 18,
    behavior: '等 2 帧；精灵属性翻转；返回 2',
  },
  {
    id: 19,
    behavior:
      '精灵闪烁循环 0x40 次 {等1帧; 标记屏幕外精灵 attr |= $08}；清扩展表；等1帧；等待标志 → 回到场景 15',
  },
  {
    id: 20,
    behavior: '等 1 帧；精灵装载；返回 2',
  },
  {
    id: 21,
    behavior: '装载 CHR 配置；返回 2',
  },
  {
    id: 22,
    behavior:
      '循环 0x80 次 {等1帧; 标记屏幕外精灵 attr |= $04}；返回 2',
  },
  {
    id: 23,
    behavior:
      '数值显示：转 16bit；查表高/低4位 → 写 OAM；各等6帧；返回 2',
  },
];

/** 按场景号取条目 */
export function getSceneEntry(sceneId: number): SceneEntry | undefined {
  return SCENE_TABLE.find((e) => e.id === sceneId);
}