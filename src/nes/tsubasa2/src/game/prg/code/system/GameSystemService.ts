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
 */
import type { DataStore } from '../../data/store/DataStore';
import type { BootRouter } from './BootRouter';
import { RenderingPrimitivesService } from './RenderingPrimitivesService';

/**
 * 场景装载分段表：
 * - SCENE_LOAD_UP_BOUND：上界表，扫描到大于等于 s 的位置
 * - SCENE_LOAD_SUB：减法表，与上界表配对计算偏移
 * - SCENE_LOAD_PARAM：参数表（数据段参数）
 */
const SCENE_LOAD_UP_BOUND = [0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff];
const SCENE_LOAD_SUB = [0x00, 0x03, 0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff];
const SCENE_LOAD_PARAM = [0x03, 0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff];

export class GameSystemService {
  private readonly prim: RenderingPrimitivesService;
  private router: BootRouter | null = null;

  constructor(readonly store: DataStore) {
    this.prim = new RenderingPrimitivesService(store);
  }

  /** 注入场景路由 */
  attachRouter(router: BootRouter): void {
    this.router = router;
  }

  /**
   * 场景装载入口：
   * - Y=1 起扫描上界表 → $004D/$004E = (A - sub[Y])<<1 + $A0xx（场景数据段指针）
   * - $0056 = param[Y]（数据段参数）
   * - $00ED = $0025（数据段选择；H5 保留 RAM 视图）
   * - $0652 = 0
   * - $00E6/$00E7 = $23E0 → fillNametableRows(1 行, $55)
   * - 场景号写回 ram_00ED 并路由到对应场景控制器
   */
  sceneLoad(sceneId: number): void {
    const store = this.store;
    const s = sceneId & 0xff;
    let y = 1;
    while (y < SCENE_LOAD_UP_BOUND.length && s >= SCENE_LOAD_UP_BOUND[y]) y++;
    const a = (s - SCENE_LOAD_SUB[y]) & 0xff;
    store.writeByte(0x004d, (a << 1) & 0xff);
    store.writeByte(0x004e, (0xa0 + ((a << 1) >> 8)) & 0xff);
    store.writeByte(0x0056, SCENE_LOAD_PARAM[y] ?? 0);
    store.writeByte(0x00ed, store.readByte(0x0025));
    store.writeByte(0x0652, 0);
    store.writeByte(0x00e6, 0xe0);
    store.writeByte(0x00e7, 0x23);
    this.prim.fillNametableRows(0xe0, 0x23, 0x01, 0x20, 0x55);
    store.writeByte(0x00ed, s);
    this.router?.changeScene(s);
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
   * 写一个渲染缓冲条目：[count, addrLo, addrHi, data×count...]，由 NMI 渲染管线消费。
   */
  queueNtWrite(addr: number, data: ReadonlyArray<number>): void {
    const n = data.length & 0x3f;
    if (n === 0) return;
    let pos = this.prim.ntBufferEntry(n, addr & 0xff, (addr >> 8) & 0xff);
    pos = this.prim.ntBufferAppend(pos, data);
    this.prim.ntBufferEnd(pos);
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