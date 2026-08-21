/**
 * SceneController — 场景分发器 + 场景初始化
 * @bank 02 ($A000-$BFFF 窗口)
 *
 * 职责: RESET 场景入口 (resetEntry), 场景分发/初始化, 密码校验 (verifyPassword)。
 *
 * 命名规范: 旧名 Bank02Service → 新名 SceneController。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';
import { PASSWORD_DISPATCH_TABLE } from '../../data/tables/password-table';
import { PasswordSceneController } from './PasswordSceneController';

export class SceneController {
  protected _store: DataStore;
  protected _system: GameSystemService;
  protected _password: PasswordSceneController;

  constructor(store: DataStore, system: GameSystemService) {
    this._store = store;
    this._system = system;
    this._password = new PasswordSceneController(store);
  }

  /**
   * 场景入口 (resetEntry) — 依据场景索引分发并初始化。
   * 对应原始 resetEntry 场景分发 (asm $8281/$826D 区)。
   *
   * @param index 场景索引 (ram_00ED)
   */
  resetEntry(index: number): void {
    const i = index & 0xff;
    this._store.write('ram_00ED', i);

    switch (i) {
      case 0: // BOOT 开场
        this._initBoot();
        break;
      case 4: // PASSWORD
        this._password.render();
        break;
      default:
        // 其余场景 (TITLE/MEETING/STORY/MATCH/RESULT) 由各自域控制器接管。
        this._initScene(i);
        break;
    }
  }

  /** BootRouter 分发回调 (由 $8484 分发器命中后调用) */
  onDispatched(index: number, target: number): void {
    void target;
    this.resetEntry(index);
  }

  /**
   * 密码校验 (原 entryC_passwordPath) — 委托给 PasswordSceneController.check。
   * @param input 输入的密码字符串
   */
  verifyPassword(input: string): boolean {
    return this._password.check(input);
  }

  /** BOOT 场景初始化 (对应原始 $821D-$8281) */
  protected _initBoot(): void {
    // $821F: LDA #$00; STA $A000 (MMC3 寄存器, 省略并注释)
    // $8224: LDA $001B; ORA #$40; STA $001B
    this._store.write('ram_001B', this._store.read('ram_001B') | 0x40);

    // $822A-$8233: 清零 $FF19-$FFFF 区 (0xE8 字节)
    // $8234-$823D: 清零 $FFE0-$FFFF 区 (0x20 字节)
    for (let i = 0; i < 0xe8; i++) this._store.write(0xff19 + i, 0);
    for (let i = 0; i < 0x20; i++) this._store.write(0xffe0 + i, 0);

    // $823E-$824A: 调色板/回卷初始化 (JSR $AA06, 翻译版由渲染层消费)
    // $8258-$825D: 清 ram_004A/004B
    this._store.write('ram_004A', 0);
    this._store.write('ram_004B', 0);

    // $8264-$8269: 清屏 + 设定 008F/0091 = 2
    this._store.write('ram_008F', 2);
    this._store.write('ram_0091', 2);

    // TODO: 翻译 $826D-$8281 分支 (PLA 标志 → 装载开场/标题脚本)。
  }

  /** 通用场景初始化 (对应 resetEntry 分发到各场景) */
  protected _initScene(index: number): void {
    void index;
    // TODO: 各场景初始化 (TITLE/MEETING/STORY/MATCH/RESULT) 归各自域。
  }
}

export default SceneController;
