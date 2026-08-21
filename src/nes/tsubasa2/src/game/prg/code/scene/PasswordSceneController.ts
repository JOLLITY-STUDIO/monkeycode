/**
 * PasswordSceneController — 密码输入场景
 * @bank 02 ($A000-$BFFF 窗口)
 *
 * 职责: 密码界面渲染 (7×6 假名网格), 输入校验 (check), 续关载入。
 * 对应原始 $84C1-$8559 (密码界面初始化) 及 $82E8-$8335 (密码→数据解码)。
 *
 * 命名规范: 旧名 PasswordController → 新名 PasswordSceneController。
 */
import { DataStore } from '../../data/store/DataStore';
import {
  PASSWORD_KANA_CHARS,
  PASSWORD_GRID_TILES,
} from '../../data/tables/password-table';

/**
 * PASSWORD_DISPATCH_TABLE — 密码/场景分发地址表 (asm $A491)。
 * 由 $8484 分发器查表跳转, 24 个场景入口。
 * 单一数据源: data/tables/password-table.ts。
 */
export { PASSWORD_DISPATCH_TABLE } from '../../data/tables/password-table';

export class PasswordSceneController {
  protected _store: DataStore;

  /** 密码网格 7 列 × 6 行 */
  static readonly GRID_COLS = 7;
  static readonly GRID_ROWS = 6;

  constructor(store: DataStore) {
    this._store = store;
  }

  /**
   * 等待 N 帧 (对应原始 $9FA8 的 JSR 延迟调用语义)。
   * @param frames 等待帧数
   */
  protected _waitFrames(frames: number): void {
    void frames;
    // 翻译版无真实帧循环; 帧推进由外层 BootRouter/InterruptService 调度。
  }

  /** 清屏 (对应原始 $9A0D JSR) */
  protected _clearScreen(): void {
    this._store.oamShadow.clearAll();
    this._store.oam.reset();
  }

  /** 场景装载 (对应原始 $8AF7 JSR, sceneLoad 0x17) */
  protected _loadScene(sceneId: number): void {
    void sceneId;
    // TODO: 调用 bank00 GameSystemService.loadScene (跨域, 归 bank00 工程师)。
  }

  /**
   * 渲染密码界面 (对应原始 $84C1-$84E9)。
   * 1) 清屏 → 2) 0x10 帧延迟 → 3) 0x30 次循环 (闪烁延迟 + 精灵闪烁)
   * 4) 清 ram_005B/007B → 5) 装载密码界面 NT (scene 0x17)
   * 6) 设置 ram_0044 = 0x68 → 画 3 帧。
   */
  render(): void {
    this._clearScreen();
    this._waitFrames(0x10);

    // $84C9-$84D6: LDY #$30 循环
    for (let i = 0x30; i > 0; i--) {
      this._waitFrames(1);
      this._spriteBlink(1); // $84D0: JSR $890C
    }

    // $84D8-$84DC: 清 005B / 007B
    this._store.write('ram_005B', 0);
    this._store.write('ram_007B', 0);

    // $84DE: 装载密码界面 scene 0x17
    this._loadScene(0x17);

    // $84E3-$84E7
    this._store.write('ram_0044', 0x68);
    this._drawFrames(3); // $8920 画帧
  }

  /**
   * 精灵闪烁 (对应原始 $890C JSR)。
   * @param val 闪烁值
   */
  protected _spriteBlink(val: number): void {
    void val;
    // TODO: 翻译 $890C 精灵闪烁逻辑
  }

  /**
   * 画帧 (对应原始 $8920 JSR)。
   * @param n 帧数
   */
  protected _drawFrames(n: number): void {
    void n;
    // TODO: 翻译 $8920 逐帧绘制
  }

  /**
   * 校验密码 (对应原始 $82E8-$8335 密码→数据解码 + 校验)。
   *
   * 输入为密码字符串, 翻译版将每个字符映射为 PASSWORD_KANA_CHARS 索引,
   * 再按 asm $AADF/$AAE0 位置增量表做 16 位累加反算。
   *
   * @param input 输入的密码字符串
   * @returns 校验是否通过
   */
  check(input: string): boolean {
    const chars = input.split('').map((ch) => ch.charCodeAt(0) & 0xff);
    if (chars.length === 0) return false;

    // 映射输入字符 → 密码表索引
    const mapped: number[] = [];
    for (const c of chars) {
      const idx = PASSWORD_KANA_CHARS.indexOf(c);
      if (idx < 0) return false;
      mapped.push(idx);
    }

    // 对应原始 $82E8-$8335: 依 ram_00ED 累加解码
    // LDA ram_00ED; AND #$0F; LSR → 索引
    const seed = this._store.read('ram_00ED') & 0x0f;
    let accLo = 0; // 模拟 16 位累加的低字节
    let accHi = 0;
    for (const m of mapped) {
      // $AADF / $AAE0 位置增量表
      const addLo = (m + seed) & 0xff;
      const addHi = ((m + seed) >> 8) & 0xff;
      const sum = accLo + addLo;
      accLo = sum & 0xff;
      accHi = (accHi + addHi + ((sum >> 8) & 1)) & 0xff;
    }

    // 校验: 累加结果写入 ram_00E6 段, 后续与目标值比对
    this._store.write('ram_00E6', accLo & 0xff);
    this._store.write('ram_00E7', accHi & 0xff);

    // TODO: 翻译 $AADF/$AAE0 精确 16 位算术与目标比对, 当前为占位校验。
    return mapped.length === PASSWORD_GRID_TILES.length % 42;
  }
}

export default PasswordSceneController;
