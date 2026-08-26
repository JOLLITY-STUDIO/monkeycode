/**
 * RenderingPrimitivesService — 渲染原语集合（用具名视图）
 *
 * 翻译原则（v2）：
 *   - 所有数据通过 store.scene / store.palette / store.fade / store.oam 具名视图访问
 *   - 不再 readByte(0x062A) / writeByte(0x0079, ...) 当业务 API
 *   - NT 渲染缓冲通过 store.renderQueue.ntBuffer 视图访问
 *   - 数据查询走 OPENING_* 声明式表
 */
import type { DataStore } from '../../data/store/DataStore';
export declare class RenderingPrimitivesService {
    private readonly store;
    constructor(store: DataStore);
    multiplyU8(a: number, x: number): number;
    /** 追加 NT 渲染条目（类型化，由 RenderQueues.appendNtBuffer 统一管理缓冲） */
    ntBufferAppend(entry: {
        vertical: boolean;
        ntAddr: number;
        data: ReadonlyArray<number>;
    }): boolean;
    /** BG 调色板装载（16 字节 → palette.bg） */
    loadBgPalette(index: number): void;
    /** SPR 调色板装载（16 字节 → palette.spr） */
    loadSprPalette(index: number): void;
    /**
     * PRG $1DD1 翻译：装载 Tecmo boot palette 到 palette.bg / palette.spr。
     *
     * 直接用 PALETTE_TABLE[0..3] 强制覆盖 4 组×3 色 × bg/spr = 24 字节（12+12），
     * 每组首色清零为 $0F（背景透明）。装载后 fade.bg/spr = $0F → 后续 fadeWrite 直接
     * 显示满亮调色板，符合 ROM frame 30 bg/spr 显示状态。
     *
     * 不复用 loadBgPalette+loadSprPalette（OPENING_*_PALETTES 表更窄只有 16 项），
     * 直接从 PALETTE_TABLE 读前 4 项作为 boot 调色板底层。
     */
    loadBootPalette(): void;
    /**
     * 查渐显表计算单个颜色（模拟器逐帧 dump 反推的 ROM 语义）：
     *   fade = 0       → 全黑（$0F）
     *   fade >= 1      → new = OPENING_FADE_TABLE[(pal & $30) + (fade - 1)] | (pal & $0F)
     *
     * 关键：ROM 查表前 fade 已 DEC（emu f13 fade=3 → 表 idx = 0x30+2 = 0x32 输出 0x10；
     *       emu f5/f7/f10/f15 全部与 (fade-1) 查表吻合，H5 之前 fade 直查慢 1 步）。
     */
    fadeLookup(pal: number, fade: number): number;
    /**
     * 将 palette.bg / palette.spr 按当前 fade 渐显后写入 NT 缓冲。
     */
    fadeWrite(): void;
    /**
     * 装载 Tecmo logo 40 sprite 到 shadowOam（模拟器 f11 实证：NT 完整 + fade=1 同帧出现）。
     * 数据源 BOOT_TECMO_OAM_TABLE。boot 后承接 Scene0 的精灵下漂（$890C 全量遍历）。
     * 不能放 boot()——emu f1-f9 OAM 为空（y=0），f11 才装载 40 sprite。
     */
    loadScene0Oam(): void;
    /** 隐藏全部影子 OAM（store.oam.shaderOam / oam 写 $F8，并清零扩展表）
     *
     * BUG #012: 旧实现只填 y byte 字段 (i += 4 一次跳 4 字节)。
     * 但 ROM boot DMA 实际写全 256 byte = 0xF8 (emu frame 9 dump 验证
     *   所有 64 sprite 4 字节都是 0xF8)。改成每 sprite 4 字节都写 0xF8,
     * 对齐 boot DMA 行为。
     */
    hideOam(): void;
    /** 关闭 NMI/MASK，整屏清 0，再恢复。NT + 属性表（$2000-$27FF） */
    clearNametable(): void;
    /**
     * 填充 Y 行 × X 列（每行 32 字节）的 NT/ATTR 区域。
     */
    fillNametableRows(addrLo: number, addrHi: number, rows: number, cols: number, value: number): void;
    /** BG 渐隐一步：DEC fade.bg → 写满亮调色板 → 等 1 帧 */
    fadeBgStep(): boolean;
    /** BG+SPR 渐隐一步：DEC fade.bg/fade.spr → 写满亮调色板 → 等 1 帧 */
    fadeOutStep(): boolean;
    /**
     * BG 渐隐一步（bank00 $9A0D：仅 DEC fade.bg → fadeWrite；SPR 不变）。
     * @returns true = fade.bg 已到 0（BG 渐隐完成）
     */
    fadeBgOutStep(): boolean;
    /**
     * BG+SPR 渐显一步（对应 bank00 code_sub.s $998C-$99AD）：
     * INC fade.bg/fade.spr（到 $0F 停）→ fadeWrite 写渐显调色板 → 等 1 帧。
     * @returns true = 已满亮（fade 均到 $0F）
     */
    fadeInStep(): boolean;
    /** 装载 BG/SPR 调色板并设置 fade.bg = fade.spr = $0F 后写满亮调色板 */
    loadPalettesAndFade(bgIndex: number, sprIndex: number): void;
    /**
     * 场景 0（Tecmo logo）调色板装载（模拟器 f13/f25 逐帧 dump 实证）：
     *   BG  = OPENING_BG_PALETTES[1]（来自 loadChrConfig(0x17) 的 r48=cfg[2]&0x3f=1）
     *   SPR = PALETTE_TABLE[21] 经 loadPalette 展开（r49=21）
     * 装载后 fade.bg/spr = 0 → fadeWrite 写全黑（fade=0 → 0x0F），f1-f9 黑屏。
     * 之后由 fadeInStep() 每帧 INC（对应 $998C-$99AD）渐显到 f25 满亮。
     */
    loadScene0Palettes(): void;
    /**
     * 场景块装载（bank00 $8920 语义）：block[0]→scene.scrollFlag($0079)，
     * block[1..18]→$007B..$008C（18 字节），$007A=0。
     * ⚠ $007B bit0 被 InterruptService.applyScrollBank02 用于 PPU CTRL nametable select，
     *   必须从 $007B 起写（旧实现写 $007C 起导致 nametable 错乱）。
     */
    loadSceneData(sceneId: number): void;
    /**
     * 读取 CHR 配置（按 configId）
     */
    loadChrConfig(configId: number): void;
    /**
     * 场景 3 开场背景按行写入 NT 缓冲。
     */
    queueScene3NametableRows(fromRow: number, rows: number): void;
    /**
     * 场景 0 logo NT 分步加载（对齐模拟器 f9→f11 过程）：
     *   step=0（f9）: 每行前 step0Len 个 tile（行12/13 前7 + 行15 前2 = 16 tile）
     *   step=1（f11）: 每行剩余 tile（补齐至完整 25 tile）
     * 数据源 OPENING_SCENE0_LOGO_ROWS（模拟器 f11+ 稳定态精确行列）。
     */
    queueScene0LogoNt(step: number): void;
    /**
     * $9085 行构建器（对应 bank00 $8976 + $9085 流装载器主体）。
     *
     * ROM 行为（逐指令对照 code_render.s $9085-$9131）：
     *   1. 清 $0468-$04FF（精灵表）
     *   2. $0097 = 0；$00EC = 行数（ROM 读流头 byte@ptr+1）
     *   3. 每行：读流索引 byte →
     *        - < $6D：查 bank9 $A000 表（SCENE14_ROW_PTR_TABLE_B9）
     *        - ≥ $6D：减 $6D 后查 bank10 $A000 表（SCENE14_ROW_PTR_TABLE_B10）
     *   4. 复制 32 字节模板到目标行（$0568 起，行距 $20）
     *   5. dest[0] |= ($0025 - 9)；$0049 = 数据块 byte0；dest[2..3] = 块指针 + 1
     *
     * H5 调用方：Scene14（indices=[$BD,$23]），X/Y 参数经 $00E7/$00E8 已并入 indices。
     * 消费方：$9147 精灵场景处理器（bank00 流子系统，尚未翻译，见 SceneStateMachine）。
     */
    buildSceneRows(indices: ReadonlyArray<number>): void;
    /**
     * $A82F 精灵属性清位（单次外迭代，对应 ROM $882F 内循环体）。
     * 行为：X 从 start 到 end（步长 4）：若 $0468,X (y) < $82 → $046A,X &= ~$0C。
     * 调用方需自行按帧节奏驱动（ROM 每外迭代前 LDA #$01; JSR $9FA8 等 1 帧）。
     */
    a82fClearSpriteAttrIter(endIdx: number, startIdx: number): void;
    /**
     * $A72C 精灵压印（单次迭代，对应 ROM $A72C 内循环体）。
     * 行为：y 光标 += dy；x 光标 += dx；若 (x & mask) != 0 → 跳过写并保持索引；
     *       否则在 $0468+spriteIdx 写 [y, tile, attr, x]，索引 += 4。
     * @returns 下次精灵索引（跳过时不变）
     */
    a72cStampSprite(tile: number, spriteIdx: number, attr: number, dx: number, dy: number, mask: number): number;
    /**
     * 场景16 $A767 复制块：SCENE16_A677_BLOB → RAM $03E8（两分支均执行）；
     * branch=2 追加 SCENE16_A67B_BLOB → RAM $0460。
     */
    copyScene16Blobs(branch: 1 | 2): void;
    /**
     * $88CA 单 tile 写入 NT 缓冲（对应 ROM $88CA）。
     * 参数：tile（A）、addrHi（X=$0052）、addrLo（Y=$0053）。
     * tile < $A0 → 直接项 data=[0x00, tile]；≥ $A0 → 映射项 [0x94/0x95, TILE_MAP_HIGH[tile-$A0]]。
     */
    writeSingleTileToNt(tile: number, addrHi: number, addrLo: number): void;
    /**
     * $AC6D/$AC71 nibble→tile：nibble + $33；≥ $3D 再 +$44。
     * 0-9 → $33-$3C；A-F → $81-$86。
     */
    nibbleToTile(value: number, highNibble: boolean): number;
    /**
     * $9E7C BCD 打包（÷10 三次）：$00EC = (tens<<4)|ones；$00ED = hundreds。
     * 返回解包后的 {tens, ones, hundreds} 供调用方使用。
     */
    bcdConvert(value: number): {
        tens: number;
        ones: number;
        hundreds: number;
    };
}
