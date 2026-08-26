/**
 * TitleMenuPaletteInitService — bank00 palette/buffer init
 *
 * 原作 asm 来源 (bank00 $9B10-$9B23):
 *   $9B10: LDA #$00 / STA $0048 / STA $0049 / STA $004A / STA $004B
 *   $9B19: LDA #$0F / LDY #$E0
 *   $9B1D: STA $054A,Y
 *   $9B1F: INY
 *   $9B22: BNE $9B1F        (clear $054A..$0629 全置 #$0F; 224 bytes)
 *   $9B23: JMP $9A71        (build cursor sprite descriptor)
 *
 * H5 翻译落点:
 *   - initState(): 直接通过 store.writeByte 写 $0048/$0049/$004A/$004B 清零
 *                  + 清 $054A..$0629 全 $0F
 *   - 与 TitleMenuSpriteBuilderService 协作,build cursor descriptor 一次
 *
 * 范围限制 (避开 ROM data tables):
 *   - 不实现 $9A71 cursor descriptor build (依赖 ROM $B000+/B300+ 数据表)
 *   - 这些 ROM data tables 抽出后由另一个 service (待创建) 填充
 */
import type { DataStore } from '../../data/store/DataStore';

/** ROM $054A..$0629 RAM buffer 长度 */
const TITLE_NT_PALETTE_BUF_LEN = 224; // 0xE0

export class TitleMenuPaletteInitService {
  private readonly store: DataStore;

  constructor(store: DataStore) {
    this.store = store;
  }

  /**
   * Bank00 $9B10-$9B23 协议完整翻译:
   *   - $0048/$0049/$004A/$004B 清零 (cursor + palette state counters)
   *   - $054A..$0629 全 $0F (清 NT palette buffer)
   */
  initState(): void {
    this.store.writeByte(0x0048, 0x00);
    this.store.writeByte(0x0049, 0x00);
    this.store.writeByte(0x004a, 0x00);
    this.store.writeByte(0x004b, 0x00);
    for (let off = 0; off < TITLE_NT_PALETTE_BUF_LEN; off++) {
      this.store.writeByte(0x054a + off, 0x0f);
    }
  }
}
