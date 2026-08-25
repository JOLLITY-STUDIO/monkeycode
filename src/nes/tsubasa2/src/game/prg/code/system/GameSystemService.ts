/**
 * GameSystemService — 游戏系统核心（场景装载 / 主循环 / 渲染缓冲 / 挂起）
 *
 * 行为翻译（去 CPU 化）：
 * - 场景装载：场景号 × 19 → 基表 → 拷贝 19 字节到 [ram_0079, ram_007C..ram_008D]
 * - 主循环状态机：$0027 模式 0-4 分发（场景步进/计时/装载/等待）
 * - 渲染缓冲写入：[count, addrLo, addrHi, data×count...]（由 InterruptService 消费）
 * - 帧挂起：原版同步阻塞 → 返回帧计数（场景状态机 counter 递减）
 *
 * 帧驱动由外层循环承担（Tsubasa2.frame → InterruptService.nmi → BootRouter.update）；
 * 此处保留 $0027 模式机与 RAM 状态推进语义。
 *
 * 注：场景 cfg 表已委托给 PpuTransferService.resolveSceneCfg()（PRG $8464 翻译）。
 *     本类只保留 mode 0/1/2/3/4 主循环推进 + 帧挂起抽象。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { BootRouter } from './BootRouter';
import { RenderingPrimitivesService } from './RenderingPrimitivesService';
import { PpuTransferService } from './PpuTransferService';

export class GameSystemService {
  private readonly prim: RenderingPrimitivesService;
  private ppuTransfer: PpuTransferService | null = null;
  private router: BootRouter | null = null;

  constructor(readonly store: DataStore) {
    this.prim = new RenderingPrimitivesService(store);
  }

  /** 注入场景路由 */
  attachRouter(router: BootRouter): void {
    this.router = router;
  }

  /**
   * 场景装载入口。
   *
   * 已委托给 PpuTransferService.loadCfgBlock(sceneId)（PRG $8464 翻译），
   * 写所有 cfg 字段到 DataStore: $004D/$004E/$0056/$00ED/$0652/$00E6/$00E7 + NT fill。
   * 然后调度到对应 scene controller。
   */
  sceneLoad(sceneId: number): void {
    // 委托给 PpuTransferService 处理 cfg 表查找（PRG $8464 翻译）
    // GameSystemService 自身持有 PpuTransferService 实例以保持 push-down 行为一致
    if (!this.ppuTransfer) {
      this.ppuTransfer = new PpuTransferService(this.store, null);
    }
    this.ppuTransfer.loadCfgBlock(sceneId);
    this.router?.changeScene(sceneId);
  }

  /**
   * 帧更新（主循环体）：
   * - $0027 模式 0：场景步进记录（$0026 ≥ $00E4 时推进）
   * - $0027 模式 1/3：计时比较（$0028 vs $0029）→ 步进
   * - $0027 模式 2：步进场景
   * - $0027 模式 4：计时比较 → 装载数据 0x60 + 渐隐
   * 帧驱动由外层循环承担。
   */
  update(frame: number, router: BootRouter): void {
    const store = this.store;
    store.frame = frame;
    const mode = store.readByte(0x0027) & 0x07;
    if (mode === 0) {
      const step = store.readByte(0x0026);
      if (step >= store.readByte(0x00e4)) {
        store.writeByte(0x00e4, step);
        this.sceneLoad(step);
      }
      return;
    }
    if (mode === 1 || mode === 3) {
      const t = store.readByte(0x0028);
      const limit = store.readByte(0x0029);
      if (t > limit) {
        this.mainLoopStep();
      }
      return;
    }
    if (mode === 2) {
      this.mainLoopStep();
      return;
    }
    if (store.readByte(0x0028) !== store.readByte(0x0029)) {
      this.sceneLoad(0x60);
      this.prim.fadeOutStep();
    }
    store.writeByte(0x0027, 0);
  }

  /** 场景步进：$0026++ → $0027=0 → 装载场景 */
  private mainLoopStep(): void {
    const store = this.store;
    const step = (store.readByte(0x0026) + 1) & 0xff;
    store.writeByte(0x0026, step);
    store.writeByte(0x0027, 0);
    this.sceneLoad(step);
  }

  /**
   * 写一个渲染缓冲条目：data → NT[addr]，由 NMI 渲染管线消费。
   * (count 截断保留 6-bit 兼容原版写入格式)
   */
  queueNtWrite(addr: number, data: ReadonlyArray<number>): void {
    const n = data.length & 0x3f;
    if (n === 0) return;
    this.prim.ntBufferAppend({ vertical: false, ntAddr: addr, data });
  }

  /**
   * 等待 N 帧（原版 $9FA8 挂起语义）。
   * H5 语义：同步阻塞挂起改为返回帧计数；场景控制器用状态机 counter 递减。
   * @returns 需要等待的帧数（写入 ram_0019 作为挂起语义视图）
   */
  waitFrames(n: number): number {
    const w = n & 0xff;
    this.store.writeByte(0x0019, w);
    return w;
  }
}