"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareInitService = void 0;
/** 4 位大写十六进制 RAM 键 */
function ramKey(addr) {
    return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}
class HardwareInitService {
    constructor(store, system, scene, skill) {
        this._store = store;
        this._system = system;
        this._scene = scene;
        this._skill = skill;
    }
    // ── 零页读/写辅助 ──
    rd(addr) {
        return this._store.read(ramKey(addr));
    }
    wr(addr, v) {
        this._store.write(ramKey(addr), v);
    }
    // ════════════════════════════════════════════════
    // $C64E RESET 主初始化链
    // 对应原始 $FFF0: LDA #$00; STA $8000 (选 bank0 进 $8000 窗口) → JMP $C503
    // $C503: JMP $C64E
    // ════════════════════════════════════════════════
    init() {
        // $C64E: LDA #$08; STA $2000 — PPU CTRL (NMI 关, 8×8 精灵) → ram_0020
        this.wr(0x0020, 0x08);
        // $C653-$C657: SEI / CLD / LDX #$FF / TXS — 无 CPU 指令, 省略
        // $C658-$C660: 等待 2 个 vblank — 帧驱动, 省略
        // $C662-$C664: LDA #$C0; STA $A001 (MMC3 PRG-RAM 写保护) — 省略并注释
        this._store.mem.fill(0, 0, 0x0800);
        this._store.zp.fill(0);
        // $C67A-$C682: 再次设 PPU 寄存器
        this.wr(0x0020, 0x08);
        this.wr(0x0021, 0x06);
        // $C685-$C68C: APU 初始化 (STA $4010 / STA $4017) — 由音频引擎接管, 省略
        // $C68F-$C69E: PPU 地址复位 ($2006 ×16) — 帧合成器管理, 省略
        // $C6A0: LDA #$00; STA $0022 — bank 基址
        this.wr(0x0022, 0x00);
        // $C6A5: JSR $CB35 — 清双名称表 + PPU 寄存器
        this.clearNameTables();
        // $C6A8: JSR $CB8B — OAM 全离屏填充
        this.fillOamOffscreen();
        // $C6AB-$C6B5: bank 状态清零 (STA $0469 ×2 / STA $E000)
        this.wr(0x0469, 0x00);
        this.wr(0x0469, 0x00);
        // $C6B8: CLI — 省略
        // $C6B9-$C6BB: LDA #$00 (场景 0 = BOOT); JMP $CEFE → 场景重置辅助
        this.resetScene(0);
    }
    // ════════════════════════════════════════════════
    // $CEFE 场景重置辅助 (软复位到指定场景)
    // 对应: PHA; 清 $0469/$E000; JSR $CB8B; JSR $CB35; 清 PPU CTRL NMI;
    //       PLA (场景 id); JMP $C400
    // ════════════════════════════════════════════════
    resetScene(sceneId) {
        this.wr(0x0469, 0x00);
        this.wr(0x0469, 0x00);
        this.fillOamOffscreen(); // JSR $CB8B
        this.clearNameTables(); // JSR $CB35
        // $CF12: LDA $0020; AND #$7F; STA $2000; STA $0020
        this.wr(0x0020, this.rd(0x0020) & 0x7f);
        this.bootScene(sceneId & 0xff); // JMP $C400
    }
    // ════════════════════════════════════════════════
    // $C400 bank 窗口配置 + 场景引导
    // 对应: PPU 寄存器; LDX #$00; JSR $C4B2 (bank0→$8000 窗口);
    //       LDX #$02; JSR $C4B9 (bank2→$A000 窗口); TYA; JMP $A200
    // ════════════════════════════════════════════════
    bootScene(sceneId) {
        // $C401-$C40C: PPU CTRL/MASK
        this.wr(0x0020, 0x08);
        this.wr(0x0021, 0x1e);
        // $C40F-$C411: bank 基址
        this.wr(0x0022, 0x00);
        // $C413-$C415: LDX #$00; JSR $C4B2 → ram_0024=bank0 ($8000 窗口, MMC3 省略)
        this.wr(0x0024, 0x00);
        // $C418-$C41A: LDX #$02; JSR $C4B9 → ram_0025=bank2 ($A000 窗口, MMC3 省略)
        this.wr(0x0025, 0x02);
        // $C41D-$C41E: TYA (场景 id); JMP $A200 → bank0 场景引导
        // 翻译版: bank0 = GameSystemService, 场景引导 = BootRouter.resetEntry
        this._scene.resetEntry(sceneId);
    }
    // ════════════════════════════════════════════════
    // $CB35 清双名称表 + PPU 寄存器
    // ════════════════════════════════════════════════
    clearNameTables() {
        // $CB35: LDA $0020; AND #$7F; STA $0020; STA $2000
        this.wr(0x0020, this.rd(0x0020) & 0x7f);
        // $CB3E: LDA #$06; STA $2001 — 帧合成器侧, 省略
        // $CB43/$CB48: LDA #$20 / #$24; JSR $CB5C — 清 NT0/NT1
        this.clearOneNameTable(0x2000);
        this.clearOneNameTable(0x2400);
        // $CB4D-$CB58: ppuMask=0x1E; LDA $0020; ORA #$80 → NMI 开
        this.wr(0x0020, this.rd(0x0020) | 0x80);
    }
    /** $CB5C: 清一个名称表 (0x300+0x40 字节) + 回卷 0,0 */
    clearOneNameTable(addr) {
        const nt = (addr < 0x2400 ? 0 : 1);
        for (let y = 0; y < 30; y++) {
            for (let x = 0; x < 32; x++) {
                this._store.writeNT(nt, x, y, {
                    tile: 0, palette: 0, bank: 0,
                    flipH: false, flipV: false, behindBg: false,
                });
            }
        }
        // $CB82-$CB87: STA $2005 ×2 → 回卷 0,0
        this._store.scrollX = 0;
        this._store.scrollY = 0;
    }
    // ════════════════════════════════════════════════
    // $CB8B OAM 全离屏填充
    // 对应: LDY #$00; LDA #$F8; 循环 STA $0200,Y (INY×4) → $0200-$02FF = $F8
    // ════════════════════════════════════════════════
    fillOamOffscreen() {
        this._store.oamShadow.clearAll(0xf8); // $0468 影子 OAM 表
        this._store.oamShadow.clearHw(0xf8); // $0200 硬件 OAM
    }
    // ════════════════════════════════════════════════
    // $CF1F 精灵区清理
    // 对应: 指针 $003A/$003B=$0468; 清 $0468-$05FF (2 页) + $0600-$0696;
    //       零页 $003A-$00DE 清零
    // ════════════════════════════════════════════════
    clearSpriteRam() {
        for (let i = 0x0468; i <= 0x0696; i++)
            this.wr(i, 0x00);
        for (let x = 0xa5; x > 0; x--)
            this.wr(0x003a + x, 0x00);
    }
    // ════════════════════════════════════════════════
    // $CA22 控制器/精灵初始化 (NMI 侧初始化入口之一)
    // 对应: ram_0021 |= 0x1E; ram_0490=0; ram_0491=2; ram_0087=2;
    //       ram_008E=0; ram_0469=1; ram_0543=0x23; ram_0544=0x45; ram_0545=0
    // ════════════════════════════════════════════════
    initControllerSprite() {
        this.wr(0x0021, this.rd(0x0021) | 0x1e);
        this.wr(0x0490, 0x00);
        this.wr(0x0491, 0x02);
        this.wr(0x0087, 0x02);
        this.wr(0x008e, 0x00);
        this.wr(0x0469, 0x01);
        this.wr(0x0543, 0x23);
        this.wr(0x0544, 0x45);
        this.wr(0x0545, 0x00);
        void this._system;
        void this._skill;
    }
}
exports.HardwareInitService = HardwareInitService;
exports.default = HardwareInitService;
