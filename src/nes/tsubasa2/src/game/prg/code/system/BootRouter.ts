/**
 * BootRouter — $8484 场景分发器
 * @bank 02 ($A000-$BFFF 窗口)
 *
 * 职责:
 *   $8484 分发器 (asm bank02 $8484-$8490):
 *     LDA ram_00ED; ASL; TAX; 查 PASSWORD_DISPATCH_TABLE ($A491) → PHA/PHA/RTS 跳转。
 *   ram_00ED = 场景索引 (0-23), 由 GameSystemService.sceneLoad / 脚本 OpSceneLoad (0xFA) 写入。
 *   分发表共 24 项 16 位入口地址, 索引即 ram_00ED 值。
 *   每个入口是"场景每帧处理子程", 返回值 = 下一帧主循环分支号。
 *
 * 注意: 这是"场景帧处理分发", 与 bank0 $8AF7 sceneLoad (场景装载/初始化) 是两个不同概念:
 *   - sceneLoad(sceneId) (bank0 $8AF7): 装载场景, 写 ram_00ED, 清状态, 切 bank
 *   - $8484 dispatcher (bank02): 每帧按 ram_00ED 分发到场景帧处理子程
 *
 * 命名规范: 旧名 DispatchService → 新名 BootRouter。
 */
import { DataStore } from '../../data/store/DataStore';
import { PASSWORD_DISPATCH_TABLE } from '../../data/tables/password-table';
import type { SceneController } from '../scene/SceneController';

/**
 * 已知场景索引语义化命名 (对应 PASSWORD_DISPATCH_TABLE 的 24 项入口)。
 *
 * 注意:
 *   1. 这不是 asm 中的状态机枚举, 不存在"线性 +1 推进"。
 *   2. 真实场景跳转由 GameSystemService.sceneLoad(sceneId) 或脚本 OpSceneLoad
 *      显式指定 sceneId (0-23 任意值), 可任意跳转。
 *   3. 每个索引对应 asm bank02 中的一段场景帧处理子程 (入口地址见下)。
 *   4. 命名分两类:
 *      - 已确认语义: 有调用点佐证 (HardwareInitService.resetScene / PasswordSceneController._loadScene)
 *      - 待确认 (ADDR_xxxx): 仅知 asm 入口地址, 具体场景类型待逐个对照 asm 代码确认
 */
export enum TaskIndex {
  /** idx 0 → $A4C0: 初始场景 (HardwareInitService.resetScene(0) 装载) */
  SCENE_00_INIT = 0,
  /** idx 1 → $A559: 待确认 (asm $8559) */
  SCENE_01_ADDR_8559 = 1,
  /** idx 2 → $A57B: 待确认 (asm $857B) */
  SCENE_02_ADDR_857B = 2,
  /** idx 3 → $A581: 待确认 (asm $8581) */
  SCENE_03_ADDR_8581 = 3,
  /** idx 4 → $A5A2: 待确认 (asm $85A2) */
  SCENE_04_ADDR_85A2 = 4,
  /** idx 5 → $A5A8: 待确认 (asm $85A8) */
  SCENE_05_ADDR_85A8 = 5,
  /** idx 6 → $A5B0: 待确认 (asm $85B0) */
  SCENE_06_ADDR_85B0 = 6,
  /** idx 7 → $A5B8: 待确认 (asm $85B8) */
  SCENE_07_ADDR_85B8 = 7,
  /** idx 8 → $A5BF: 待确认 (asm $85BF) */
  SCENE_08_ADDR_85BF = 8,
  /** idx 9 → $A5CD: 待确认 (asm $85CD) */
  SCENE_09_ADDR_85CD = 9,
  /** idx 10 → $A5DB: 待确认 (asm $85DB) */
  SCENE_10_ADDR_85DB = 10,
  /** idx 11 → $A5E8: 待确认 (asm $85E8) */
  SCENE_11_ADDR_85E8 = 11,
  /** idx 12 → $A602: 待确认 (asm $8602) */
  SCENE_12_ADDR_8602 = 12,
  /** idx 13 → $A61C: 待确认 (asm $861C) */
  SCENE_13_ADDR_861C = 13,
  /** idx 14 → $A629: 待确认 (asm $8629) */
  SCENE_14_ADDR_8629 = 14,
  /** idx 15 → $A650: 待确认 (asm $8650) */
  SCENE_15_ADDR_8650 = 15,
  /** idx 16 → $A69C: 待确认 (asm $869C) */
  SCENE_16_ADDR_869C = 16,
  /** idx 17 → $A77A: 待确认 (asm $877A) */
  SCENE_17_ADDR_877A = 17,
  /** idx 18 → $A782: 待确认 (asm $8782) */
  SCENE_18_ADDR_8782 = 18,
  /** idx 19 → $A78D: 待确认 (asm $878D) */
  SCENE_19_ADDR_878D = 19,
  /** idx 20 → $A7BD: 待确认 (asm $87BD) */
  SCENE_20_ADDR_87BD = 20,
  /** idx 21 → $A7CE: 待确认 (asm $87CE) */
  SCENE_21_ADDR_87CE = 21,
  /** idx 22 → $A7D6: 待确认 (asm $87D6) */
  SCENE_22_ADDR_87D6 = 22,
  /** idx 23 (0x17) → $A7FA: 密码场景 (PasswordSceneController._loadScene(0x17)) */
  SCENE_23_PASSWORD = 23,
}

export class BootRouter {
  protected _store: DataStore;
  protected _scene: SceneController | null = null;

  constructor(store: DataStore, scene?: SceneController) {
    this._store = store;
    this._scene = scene ?? null;
  }

  /** 挂接场景控制器 (由外层组合根注入) */
  attachScene(scene: SceneController): void {
    this._scene = scene;
  }

  /**
   * $8484 场景分发器 (对应原始 $8484:)。
   * LDA ram_00ED → ASL → TAX → 查 PASSWORD_DISPATCH_TABLE → 跳转。
   *
   * TS 版用 16 位数组索引替代 ASL + 字节查表 (ASL 是字节偏移, 数组索引已隐含)。
   *
   * @param index 场景索引 (ram_00ED 值, 0-23)
   * @returns 被分发到的目标地址 (16 位, $A000 窗口偏移), 或 -1 越界。
   */
  dispatchByIndex(index: number): number {
    const t = index & 0xff;
    const table = PASSWORD_DISPATCH_TABLE;
    if (t >= table.length) return -1;
    return table[t];
  }

  /**
   * 场景分发主入口 (对应原始 $8484 的调用语义)。
   * 翻译版不执行 6502 的 PHA/RTS 跳转, 直接返回目标地址交给 SceneController。
   */
  dispatchPassword(index: number): number {
    return this.dispatchByIndex(index);
  }

  /** 每帧推进路由: 依据 ram_00ED 分发当前场景 */
  update(frame: number): void {
    const idx = this._store.read('ram_00ED') & 0xff;
    const target = this.dispatchByIndex(idx);
    if (target >= 0) {
      this._scene?.onDispatched(idx, target);
    }
    void frame;
  }
}

export default BootRouter;
