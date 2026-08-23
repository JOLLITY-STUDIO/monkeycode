/**
 * GameSystemService — 游戏系统核心（原 bank00 主循环/场景装载/渲染原语）
 *
 * @bank 00 ($8000-$8AB2 主循环 / $8464 场景装载 / $9B28 缓冲 / $9FA8 挂起)
 *
 * 对应原始地址：
 *   $8000-$801C: 主循环跳转表（$0027 模式 0-4 → $8166/$818A/$81AD/$81B4/$81DA）
 *   $8166-$8285: 五个主循环子程序（场景步进/装载/音频切换/等按键）
 *   $8297-$82B5: 文本滚动装载 / 等待结束 / 等待按键
 *   $8464-$8504: 场景数据装载（$8AEE 分段表 → $A000 固定页指针 → 精灵/图块解码）
 *   $9B28/$9B5E: $05E8 NT 渲染缓冲写入/结束
 *   $9FA8: 任务挂起（等 N 帧，$0019）
 *
 * H5 语义：
 *   - 主循环（$8000 状态机 + $A203 场景循环）由外层帧驱动 + BootRouter 场景分发承担；
 *     update() 保留 $0027 模式机与场景装载桥接（不重复调度场景，避免与 NMI 双调）。
 *   - $8464 的 MMC3 切 bank（JSR $C4B9）省略；$A000 固定页数据改为声明式表/控制器。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { BootRouter } from './BootRouter';
import { RenderingPrimitivesService } from './RenderingPrimitivesService';

/**
 * $8464 场景装载分段表（dump 自 bank00 ROM，逐字节核对）：
 *   $8AE6: 场景帧延迟表 [01,0A,14,28,3C,50,78,F0]（$850C: LDA $8AE6,X）
 *   $8AEC: 减法表 A1 = [00,03,10,04,20,05,60,06,FF]（$846E: SBC $8AEC,Y）
 *   $8AED: 参数表 A2 = [03,10,04,20,05,60,06,FF]（$8471: LDX $8AED,Y）
 *   $8AEE: 上界表 A3 = [10,04,20,05,60,06,FF]（$8468: CMP $8AEE,Y）
 */
const SCENE_LOAD_UP_BOUND = [0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff]; // $8AEE 起
const SCENE_LOAD_SUB = [0x00, 0x03, 0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff]; // $8AEC 起
const SCENE_LOAD_PARAM = [0x03, 0x10, 0x04, 0x20, 0x05, 0x60, 0x06, 0xff]; // $8AED 起

export class GameSystemService {
  private readonly prim: RenderingPrimitivesService;
  private router: BootRouter | null = null;

  constructor(readonly store: DataStore) {
    this.prim = new RenderingPrimitivesService(store);
  }

  /** 注入场景路由（原版主循环 $8017 切 bank2 → JMP $A203 场景循环语义） */
  attachRouter(router: BootRouter): void {
    this.router = router;
  }

  /**
   * 场景装载入口（$8400 系列 + $8464）。
   *
   * 对应原始 $8464（逐指令对照 code_main.s $8464-$84BE）：
   *   $8464-$847D: Y=1 起扫描 $8AEE 上界表 → $004D/$004E = (A-$8AEC[Y])<<1 + $A0xx（场景数据指针）
   *   $847F: $0056 = $8AED[Y]（数据段参数）
   *   $8481: $00ED = $0025（数据 bank）
   *   $8488-$8492: 间接指针 ($004D) → $004D/$004E（表项指向的实际数据块）
   *   $849E: JSR $9F69 调度器挂起（H5 由场景状态机承担）
   *   $84AB: $0652 = 0（滚动/属性缓冲清零）
   *   $84B0-$84BE: $00E6/$00E7 = $23E0 → fillNametableRows($23E0, 1 行, $20 列, $55)
   * $84C6+ 的数据块解码（$84E9-$8504 精灵/tile 命令，含 $8545 跳转表 20 项）由
   * 具体场景控制器按需执行（如 Scene0Controller 的 queueScene3NametableRows）。
   *
   * H5 行为：MMC3 写省略；场景号写回 ram_00ED 并路由到对应场景控制器。
   * @param sceneId 场景号（0-23，跳转表 $A491 顺序）
   */
  sceneLoad(sceneId: number): void {
    const store = this.store;
    const s = sceneId & 0xff;
    // $8464-$847D: 扫描上界表计算场景数据指针（保留原表语义；H5 指针仅作 ram 视图）
    let y = 1;
    while (y < SCENE_LOAD_UP_BOUND.length && s >= SCENE_LOAD_UP_BOUND[y]) y++;
    const a = (s - SCENE_LOAD_SUB[y]) & 0xff;
    store.writeByte(0x004d, (a << 1) & 0xff);
    store.writeByte(0x004e, (0xa0 + ((a << 1) >> 8)) & 0xff);
    store.writeByte(0x0056, SCENE_LOAD_PARAM[y] ?? 0); // $847F
    // $8481: $00ED = $0025（原版为数据 bank；H5 保留 ram 视图，场景号由下方回写）
    store.writeByte(0x00ed, store.readByte(0x0025));
    // $84AB: $0652 = 0
    store.writeByte(0x0652, 0);
    // $84B0-$84BE: $00E6/$00E7 = $23E0; fillNametableRows(1 行 × $20 列, $55)
    store.writeByte(0x00e6, 0xe0);
    store.writeByte(0x00e7, 0x23);
    this.prim.fillNametableRows(0xe0, 0x23, 0x01, 0x20, 0x55);
    // 场景号写回并路由（对应原版装载完成后 STA $00ED; JMP $A200 场景入口）
    store.writeByte(0x00ed, s);
    this.router?.changeScene(s);
  }

  /**
   * 帧更新（主循环体，$8000 跳转表语义）。
   *
   * 对应原始 $8000-$801C（逐指令对照 code_main.s $8000-$801C）：
   *   $8000: LDA $0027; ASL; TAX; LDA $800E,X; PHA; LDA $800D,X; PHA; RTS
   *   跳转表 $800D = [$8166, $818A, $81AD, $81B4, $81DA]（$0027 模式 0-4）
   *   $8017: LDX #$02; JSR $C4B9; JMP $A203（场景主循环）
   *
   * 五个子程序（$8166/$818A/$81AD/$81B4/$81DA）执行系统状态推进：
   *   场景步进记录（$0026 vs $00E4/$00E5）、计时（$0028/$0029）、
   *   $8464 场景装载、$82B5 等按键、音频切换（bank02 固定页 $A003-$A01B）。
   *
   * H5 行为：帧驱动由外层循环承担（Tsubasa2.frame → InterruptService.nmi →
   * BootRouter.update）；此处保留 $0027 模式机与 ram 状态推进语义，
   * 并在 $0026 步进变化时桥接场景装载（不重复调用场景帧更新）。
   * @param frame 帧号
   * @param router 场景路由（仅用于场景装载桥接）
   */
  update(frame: number, router: BootRouter): void {
    const store = this.store;
    store.frame = frame;
    const mode = store.readByte(0x0027) & 0x07;
    // $8166: 模式 0 → 场景步进记录（$0026 ≥ $00E4 时推进，$83FE 表非零则装载）
    if (mode === 0) {
      const step = store.readByte(0x0026);
      if (step >= store.readByte(0x00e4)) {
        store.writeByte(0x00e4, step);
        this.sceneLoad(step); // $8182: JSR $8464 + $82B5（等按键由场景控制器承担）
      }
      return;
    }
    // $818A/$81B4: 模式 1/3 → 计时比较 $0028 vs $0029（$8206 路径：场景步进）
    if (mode === 1 || mode === 3) {
      const t = store.readByte(0x0028);
      const limit = store.readByte(0x0029);
      if (t > limit) {
        this.mainLoopStep(); // $8206: 步进 $0026，$8420/$8442 表装载场景
      }
      return;
    }
    // $81AD: 模式 2 → 步进场景（$81D4: $0027=4 场景完成标记）
    if (mode === 2) {
      this.mainLoopStep();
      return;
    }
    // $81DA: 模式 4 → 计时比较（$81E6: 切 bank + $8464(0x60) + 渐隐 + 场景步进）
    if (store.readByte(0x0028) !== store.readByte(0x0029)) {
      // $81E6: 装载数据 0x60 + 渐隐 + $8398 表场景步进（音频切换由 AudioService 承担）
      this.sceneLoad(0x60);
      this.prim.fadeOutStep();
    }
    store.writeByte(0x0027, 0); // $0027 回 0，主循环重新分发
  }

  /** $8206 场景步进路径（$0026++ → $8420/$8442 装载表 → $C578 调度） */
  private mainLoopStep(): void {
    const store = this.store;
    const step = (store.readByte(0x0026) + 1) & 0xff;
    store.writeByte(0x0026, step);
    store.writeByte(0x0027, 0);
    this.sceneLoad(step);
  }

  /**
   * 写一个渲染缓冲条目（$05E8 格式）：
   * [count|0x80, addrLo, addrHi, data×count...]，由 NMI 渲染管线消费。
   * 对应原始 $9B28（RenderingPrimitivesService.ntBufferEntry）。
   */
  queueNtWrite(addr: number, data: ReadonlyArray<number>): void {
    const n = data.length & 0x3f;
    if (n === 0) return;
    let pos = this.prim.ntBufferEntry(n, addr & 0xff, (addr >> 8) & 0xff);
    pos = this.prim.ntBufferAppend(pos, data);
    this.prim.ntBufferEnd(pos); // $9B5E: 0 终止 + $0628 指针更新
  }

  /**
   * 等待 N 帧（原版 $9FA8 挂起语义）。
   *
   * 对应原始 $9FA8（逐指令对照 code_sub.s $9FA8-$9FE2）：
   *   $9FA8: LDA #$00; STA $0019（清等待计数；调用方先 STA $0019 = N）
   *   $9FAA-$9FC5: 保存上下文 → $9FC6-$9FCA: 挂起到任务槽 $0000,X
   *   $9FD6-$9FE2: $0019==0 → $FE 无限挂起；否则保存等待计数 → JMP $9EFB 调度器
   *
   * H5 语义：同步阻塞挂起改为返回帧计数；场景控制器用状态机 counter 递减
   * 实现同样的"N 帧后继续"行为（见 Scene0Controller.counter）。
   * @returns 需要等待的帧数（写入 ram_0019 作为挂起语义视图）
   */
  waitFrames(n: number): number {
    const w = n & 0xff;
    this.store.writeByte(0x0019, w);
    return w;
  }
}
