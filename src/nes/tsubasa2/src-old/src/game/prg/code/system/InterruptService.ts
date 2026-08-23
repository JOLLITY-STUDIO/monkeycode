/**
 * InterruptService �?NMI/IRQ 帧服�? * @bank 31 ($E000-$FFFF 固定窗口, �?Reset/NMI/IRQ 向量) + bank30 NMI 处理 $C500
 *
 * 真实向量: NMI=$C500 (�?C76E), RESET=$FFF0 (�?C503→bank30 $C64E), IRQ=$C506 (�?C821)�? * 翻译版无 CPU 中断: 帧循环直接调 nmi() 完成 NMI 语义的每帧更新�? *
 * 命名规范: 旧名 Bank31Service/InterruptService �?新名 InterruptService�? */
import { DataStore } from '../../data/store/DataStore';
import type { Bank00Service } from './Bank00Service';
import type { Bank02Service } from './Bank02Service';

/** bank 配置�?(结构化数�? �?MMC3 窗口映射) */
export interface BankConfig {
  bank: number;
  window: 'A000' | 'C000' | 'E000';
}

/** 4 位大写十六进�?RAM �?*/
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class InterruptService {
  protected _store: DataStore;
  protected _system: Bank00Service | null = null;
  /** bank02 NMI 渲染执行�?(Bank02Service.nmiRender, $8000-$8137) �?组合根注�?*/
  protected _router: Bank02Service | null = null;
  /** MMC3 mapper 引用 (CHR bank 切换 $C9E9, 组合根注�? */
  protected _mmap: any = null;
  protected _chrInitialized = false;

  /** 上一帧输入掩�?(用于计算按下�?ram_001E) */
  protected _prevInput = 0;

  constructor(store: DataStore, system?: Bank00Service) {
    this._store = store;
    this._system = system ?? null;
  }

  /** 挂接主循环服�?(组合根注�? */
  attachSystem(system: Bank00Service): void {
    this._system = system;
  }

  /** 挂接 bank02 NMI 渲染执行�?(组合根注�? */
  attachRouter(router: Bank02Service): void {
    this._router = router;
  }

  /** 挂接 MMC3 mapper (CHR bank 切换 $C9E9, 组合根注�? */
  attachMapper(mmap: any): void {
    this._mmap = mmap;
  }

  protected rd(addr: number): number {
    return this._store.read(ramKey(addr));
  }
  protected wr(addr: number, v: number): void {
    this._store.write(ramKey(addr), v);
  }

  // ════════════════════════════════════════════════
  // RESET 向量 ($FFF0) �?bank0 �?$8000 窗口 �?JMP $C503 �?bank30 init
  // ════════════════════════════════════════════════
  reset(): void {
    // $FFF0: LDA #$00; STA $8000 �?�?bank0 �?$8000 窗口 (MMC3 省略)
    // $FFF5: JMP $C503 �?bank30 主初始化 ($C64E)
    // 翻译�? 委托 HardwareInitService.init (组合根注�?�?  }

  // ════════════════════════════════════════════════
  // NMI ($C500�?C76E) �?每帧 NMI 语义
  // 对应 $C76E-$C820: 保存寄存�?�?OAM DMA �?VRAM 缓冲回放 �?调色�?回卷同步
  //                  �?输入读取 ($C982) �?帧完成标�?�?主逻辑帧推�?  // ════════════════════════════════════════════════
  nmi(frame: number): void {
    // $C77A-$C781: LDA $0020; AND #$7F; STA $2000; STA $0020 (NMI 期间�?NMI)
    this.wr(0x0020, this.rd(0x0020) & 0x7f);
    // $C78B-$C790: OAM DMA (STA $2003 / STA $4014) �?影子 OAM �?硬件 OAM
    this._store.oamShadow.copyToHw();
    // $C796: LDA $046B; STA $A000 (MMC3) �?省略并注�?    // $C799: JSR $C8FB �?$0498 VRAM 缓冲回放 (�?NT/属�?
    this._commitVramBuffer();
    // $C79F-$C7AC: 调色板地址 ($3F00) �?帧合成器消费 DataStore.paletteTable, 省略
    // $C7B7-$C7C2: 回卷: X = $004A + $0538; Y = $004B
    this._store.scrollX = (this.rd(0x004a) + this.rd(0x0538)) & 0xff;
    this._store.scrollY = this.rd(0x004b) & 0xff;
    // $C7CA: JSR $C9E9 �?MMC3 CHR bank 配置 (�?$0490-$0497 bank 表写 $8000/$8001)
    this._configureChrBanks();
    // $C7E4: JSR $C9C5 �?数值换算辅�? 翻译版由 PlayerQueryService 提供, 省略
    // $C7E7: JSR $C982 �?读取控制�?�?ram_001C / 按下�?ram_001E
    this._readInput();
    // $C7EA-$C7EE: LDA $001B; ORA #$80; STA $001B �?帧完成标�?    this.wr(0x001b, this.rd(0x001b) | 0x80);
    // $C808-$C81F: 恢复寄存�?+ RTI �?省略
    // ── bank02 NMI 渲染主程 ($8000-$815F) �?�?PPU 配置/NT buffer/调色�?滚动 ──
    // tsnes trace 实测: 开场每帧走 bank2 $8000 NMI 渲染 (Mesen 前缀 $01 = �?/3)
    // �?$2000/$2001/$2006/$2007 + OAM DMA + 调色板刷�?+ 滚动寄存器�?    // 翻译�? Bank02Service.nmiRender() 回放 $05E8 PPU buffer �?    //   NT �?($2000-$2FFF) 直写 DataStore writeNT, 调色板区 ($3F00) 直写 paletteTable
    //   (组合�?attachRouter 注入, 此前 _router �?null 导致本调�?no-op)�?    this._router?.nmiRender();
    // ── 主游戏逻辑每帧推进 (�?$C982 之后由调度器协程驱动) ──
    // bank00 协程调度�?($9EED/$9F0F) 每帧�?ram_00ED 分发场景帧处�?    // bank02 $8484 分发�? LDA ram_00ED; ASL; TAX; �?NMI_CALLBACK_TABLE �?跳转
    this._router?.update(frame);
    this._system?.update(frame);
  }

  // ════════════════════════════════════════════════
  // $C8FB �?$0498 VRAM 缓冲回放
  // 格式: [count][addrHi][addrLo][data×count] ... count==0 结束
  // 翻译�? OamManager �?VRAM 写缓�?(beginVramBuild/writeVramByte/endVramBuild)
  //         �?commitVramToNT() 提交�?NT 网格�?  // ════════════════════════════════════════════════
  protected _commitVramBuffer(): void {
    if (this._store.oam.busy === 0x80) {
      this._store.oam.commitVramToNT();
    }
  }

  // ════════════════════════════════════════════════
  // $C982 �?控制器读�?  // 对应: strobe $4016; 逐位�?8 bit �?ram_001C (当前按下);
  //       边沿 (上次无本次有) �?ram_001E (按下�?
  // 翻译�? 帧驱动把输入掩码写入 DataStore KV 'input_mask' (bit0=A,1=B,2=SEL,3=START,4=UP,5=DOWN,6=LEFT,7=RIGHT)
  // ════════════════════════════════════════════════
  protected _readInput(): void {
    // $C982: LDA #$01; STA $4016 (strobe on); LDA #$00; STA $4016 (strobe off)
    this.wr(0x4016, 0x01);
    this.wr(0x4016, 0x00);
    // 逐位�?$4016 �?ram_001C (当前按下)
    const mask = (this._store.get<number>('input_mask') ?? 0) & 0xff;
    this.wr(0x001c, mask);
    this.wr(0x001e, mask & ~this._prevInput & 0xff);
    this._prevInput = mask;
  }

  /**
   * $C9E9: MMC3 CHR bank 配置 �?�?$0490-$0497 bank �? 模拟 $8000/$8001 写入�?   * 原版: $0022�?8000(选slot), $0490,X�?8001(bank�?, mapper4 收到�?load1kVromBank�?   * $0490-$0497: 8 字节, �?2 字节�?R0/R1 (2KB pair), �?6 字节�?R2-R5 (1KB each)�?   * $C9E9 逻辑: X=0(SPR)�?(BG), �?$0490[X],X+1 作为 R0/R1, X^4 切换�?R2-R5�?   */
  protected _configureChrBanks(): void {
    if (!this._mmap) return;
    // $C9E9 CHR bank 配置: 原版通过 CPU �?$8000/$8001 切换 CHR bank
    // H5 不跑 CPU, 直接�?mapper4.load1kVromBank 设置 CHR ROM �?ptTile
    // CHR bank 映射 (tsnes frame10 dump): [0,1,2,3,252,113,82,83]
    // BG pattern table ($0000-$0FFF): bank 0,1,2,3
    // SPR pattern table ($1000-$1FFF): bank 252,113,82,83
    // TODO: 后续完整翻译 $C9E9 (�?$0490 + $0022, �?mapper4.write $8000/$8001)
    const chrBanks = [0, 1, 2, 3, 252, 113, 82, 83];
    const addresses = [0x0000, 0x0400, 0x0800, 0x0C00, 0x1000, 0x1400, 0x1800, 0x1C00];
    if (this._mmap.load1kVromBank) {
      for (let i = 0; i < 8; i++) {
        this._mmap.load1kVromBank(chrBanks[i], addresses[i]);
      }
    }
  }
}

export default InterruptService;
