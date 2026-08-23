"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterruptService = void 0;
/** 4 位大写十六进制 RAM 键 */
function ramKey(addr) {
    return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}
class InterruptService {
    constructor(store, system) {
        this._system = null;
        /** bank02 NMI 渲染执行器 (BootRouter.nmiRender, $8000-$8137) — 组合根注入 */
        this._router = null;
        /** MMC3 mapper 引用 (CHR bank 切换 $C9E9, 组合根注入) */
        this._mmap = null;
        this._chrInitialized = false;
        /** 上一帧输入掩码 (用于计算按下沿 ram_001E) */
        this._prevInput = 0;
        this._store = store;
        this._system = system ?? null;
    }
    /** 挂接主循环服务 (组合根注入) */
    attachSystem(system) {
        this._system = system;
    }
    /** 挂接 bank02 NMI 渲染执行器 (组合根注入) */
    attachRouter(router) {
        this._router = router;
    }
    /** 挂接 MMC3 mapper (CHR bank 切换 $C9E9, 组合根注入) */
    attachMapper(mmap) {
        this._mmap = mmap;
    }
    rd(addr) {
        return this._store.read(ramKey(addr));
    }
    wr(addr, v) {
        this._store.write(ramKey(addr), v);
    }
    // ════════════════════════════════════════════════
    // RESET 向量 ($FFF0) → bank0 进 $8000 窗口 → JMP $C503 → bank30 init
    // ════════════════════════════════════════════════
    reset() {
        // $FFF0: LDA #$00; STA $8000 — 选 bank0 进 $8000 窗口 (MMC3 省略)
        // $FFF5: JMP $C503 — bank30 主初始化 ($C64E)
        // 翻译版: 委托 HardwareInitService.init (组合根注入)。
    }
    // ════════════════════════════════════════════════
    // NMI ($C500→$C76E) — 每帧 NMI 语义
    // 对应 $C76E-$C820: 保存寄存器 → OAM DMA → VRAM 缓冲回放 → 调色板/回卷同步
    //                  → 输入读取 ($C982) → 帧完成标志 → 主逻辑帧推进
    // ════════════════════════════════════════════════
    nmi(frame) {
        // $C77A-$C781: LDA $0020; AND #$7F; STA $2000; STA $0020 (NMI 期间关 NMI)
        this.wr(0x0020, this.rd(0x0020) & 0x7f);
        // $C78B-$C790: OAM DMA (STA $2003 / STA $4014) — 影子 OAM → 硬件 OAM
        this._store.oamShadow.copyToHw();
        // $C796: LDA $046B; STA $A000 (MMC3) — 省略并注释
        // $C799: JSR $C8FB — $0498 VRAM 缓冲回放 (写 NT/属性)
        this._commitVramBuffer();
        // $C79F-$C7AC: 调色板地址 ($3F00) — 帧合成器消费 DataStore.paletteTable, 省略
        // $C7B7-$C7C2: 回卷: X = $004A + $0538; Y = $004B
        this._store.scrollX = (this.rd(0x004a) + this.rd(0x0538)) & 0xff;
        this._store.scrollY = this.rd(0x004b) & 0xff;
        // $C7CA: JSR $C9E9 — MMC3 CHR bank 配置 (读 $0490-$0497 bank 表写 $8000/$8001)
        this._configureChrBanks();
        // $C7E4: JSR $C9C5 — 数值换算辅助, 翻译版由 PlayerQueryService 提供, 省略
        // $C7E7: JSR $C982 — 读取控制器 → ram_001C / 按下沿 ram_001E
        this._readInput();
        // $C7EA-$C7EE: LDA $001B; ORA #$80; STA $001B — 帧完成标志
        this.wr(0x001b, this.rd(0x001b) | 0x80);
        // $C808-$C81F: 恢复寄存器 + RTI — 省略
        // ── bank02 NMI 渲染主程 ($8000-$815F) — 写 PPU 配置/NT buffer/调色板/滚动 ──
        // tsnes trace 实测: 开场每帧走 bank2 $8000 NMI 渲染 (Mesen 前缀 $01 = 块2/3)
        // 写 $2000/$2001/$2006/$2007 + OAM DMA + 调色板刷新 + 滚动寄存器。
        // 翻译版: BootRouter.nmiRender() 回放 $05E8 PPU buffer —
        //   NT 区 ($2000-$2FFF) 直写 DataStore writeNT, 调色板区 ($3F00) 直写 paletteTable
        //   (组合根 attachRouter 注入, 此前 _router 恒 null 导致本调用 no-op)。
        this._router?.nmiRender();
        // ── 主游戏逻辑每帧推进 (原 $C982 之后由调度器协程驱动) ──
        // bank00 协程调度器 ($9EED/$9F0F) 每帧按 ram_00ED 分发场景帧处理
        // bank02 $8484 分发器: LDA ram_00ED; ASL; TAX; 查 NMI_CALLBACK_TABLE → 跳转
        this._router?.update(frame);
        this._system?.update(frame);
    }
    // ════════════════════════════════════════════════
    // $C8FB — $0498 VRAM 缓冲回放
    // 格式: [count][addrHi][addrLo][data×count] ... count==0 结束
    // 翻译版: OamManager 的 VRAM 写缓冲 (beginVramBuild/writeVramByte/endVramBuild)
    //         由 commitVramToNT() 提交到 NT 网格。
    // ════════════════════════════════════════════════
    _commitVramBuffer() {
        if (this._store.oam.busy === 0x80) {
            this._store.oam.commitVramToNT();
        }
    }
    // ════════════════════════════════════════════════
    // $C982 — 控制器读取
    // 对应: strobe $4016; 逐位读 8 bit → ram_001C (当前按下);
    //       边沿 (上次无本次有) → ram_001E (按下沿)
    // 翻译版: 帧驱动把输入掩码写入 DataStore KV 'input_mask' (bit0=A,1=B,2=SEL,3=START,4=UP,5=DOWN,6=LEFT,7=RIGHT)
    // ════════════════════════════════════════════════
    _readInput() {
        // $C982: LDA #$01; STA $4016 (strobe on); LDA #$00; STA $4016 (strobe off)
        this.wr(0x4016, 0x01);
        this.wr(0x4016, 0x00);
        // 逐位读 $4016 → ram_001C (当前按下)
        const mask = (this._store.get('input_mask') ?? 0) & 0xff;
        this.wr(0x001c, mask);
        this.wr(0x001e, mask & ~this._prevInput & 0xff);
        this._prevInput = mask;
    }
    /**
     * $C9E9: MMC3 CHR bank 配置 — 读 $0490-$0497 bank 表, 写 $8000/$8001 切换 CHR bank。
     * 原版通过 CPU 写 MMC3 寄存器, H5 直接调 mapper4.load1kVromBank。
     * $0490-$0497: 8 个 1KB CHR bank 索引 (BG=0-3, SPR=4-7)。
     */
    _configureChrBanks() {
        if (!this._mmap)
            return;
        // 读 $0490-$0497 CHR bank 表
        const banks = [];
        for (let i = 0; i < 8; i++)
            banks.push(this.rd(0x0490 + i));
        // 首帧: $0490 全 0 (未初始化), 用 tsnes dump 的默认值 [0,1,2,3,252,113,82,83]
        if (!this._chrInitialized) {
            const defaultBanks = [0, 1, 2, 3, 252, 113, 82, 83];
            for (let i = 0; i < 8; i++) {
                if (banks[i] === 0)
                    banks[i] = defaultBanks[i];
            }
            this._chrInitialized = true;
        }
        // 调 mapper4.load1kVromBank(bank, address) 加载 CHR ROM 到 ptTile
        const addresses = [0x0000, 0x0400, 0x0800, 0x0C00, 0x1000, 0x1400, 0x1800, 0x1C00];
        if (this._mmap.load1kVromBank) {
            for (let i = 0; i < 8; i++) {
                this._mmap.load1kVromBank(banks[i], addresses[i]);
            }
        }
        if (this._mmap.chrBanks) {
            for (let i = 0; i < 8 && i < this._mmap.chrBanks.length; i++) {
                this._mmap.chrBanks[i] = banks[i];
            }
        }
    }
}
exports.InterruptService = InterruptService;
exports.default = InterruptService;
