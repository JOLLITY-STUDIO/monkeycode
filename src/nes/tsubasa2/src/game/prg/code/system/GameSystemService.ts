/**
 * GameSystemService — 游戏系统核心（原 bank00 主循环/渲染原语）
 *
 * @bank 00 ($8000-$9FFF)
 *
 * 对应原始地址（待 V0.2+ 逐段核对 asm/bank00/*.s 后覆盖）：
 *   $8000-$81FF: 主循环 / 帧同步
 *   $8400-$87FF: 场景加载与渲染原语
 *   $8800-$8BFF: 文本 / 精灵工具
 *   $9A00-$9FFF: 调色板 / 滚动 / 渲染辅助
 *
 * V0.1 仅提供契约签名（stub），逻辑在后续版本按业务域逐个覆盖。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { BootRouter } from './BootRouter';

export class GameSystemService {
  constructor(readonly store: DataStore) {}

  /**
   * 场景装载入口（$8400 系列）：装载场景数据 → 初始化场景状态
   * @param sceneId 场景号（0-23）
   */
  sceneLoad(sceneId: number): void {
    // TODO V0.2: 翻译 $8400-$87FF 场景装载流程
    void sceneId;
  }

  /**
   * 帧更新（主循环体）：由 BootRouter 每帧调度当前场景
   */
  update(frame: number, router: BootRouter): void {
    // TODO V0.2: 翻译 $8000 主循环 / NMI 回调分发
    void frame;
    void router;
  }

  /**
   * 写一个渲染缓冲条目（$05E8 格式）：
   * [count|0x80, addrLo, addrHi, data×count...]，由 NMI 渲染管线消费
   */
  queueNtWrite(addr: number, data: ReadonlyArray<number>): void {
    // TODO V0.2: 翻译 $05E8 缓冲写入（含 0 终止符）
    void addr;
    void data;
  }

  /** 等待 N 帧（原版帧同步循环，H5 下由外层帧循环驱动） */
  waitFrames(n: number): void {
    // TODO V0.2: 翻译等待帧逻辑（WAIT_FRAME_TABLE 语义）
    void n;
  }
}
