"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootRouter = exports.TaskIndex = exports.NmiCallbackIndex = void 0;
const bank02_tables_1 = require("../../data/tables/bank02-tables");
const PasswordCallbackHandler_1 = require("../scene/PasswordCallbackHandler");
const BootBackgroundRenderer_1 = require("../scene/BootBackgroundRenderer");
/**
 * 标准 NES NTSC 64 色调色板 (0xRRGGBB)。
 * 与 BootBackgroundRenderer.NES_NTSC_RGB 一致, 用于 $3F00 buffer 回放:
 *   NES 调色板索引 ($05E8 buffer 数据) → RGB → DataStore.paletteTable → writePalettes → PPU
 */
const NES_NTSC_RGB = [
    0x525252, 0xB40000, 0xA00000, 0xB1003D, 0x740069, 0x00005B, 0x00005F, 0x001840,
    0x002F10, 0x084A08, 0x006700, 0x124200, 0x6D2800, 0x000000, 0x000000, 0x000000,
    0xC4D5E7, 0xFF4000, 0xDC0E22, 0xFF476B, 0xD7009F, 0x680AD7, 0x0019BC, 0x0054B1,
    0x006A5B, 0x008C03, 0x00AB00, 0x2C8800, 0xA47200, 0x000000, 0x000000, 0x000000,
    0xF8F8F8, 0xFFAB3C, 0xFF7981, 0xFF5BC5, 0xFF48F2, 0xDF49FF, 0x476DFF, 0x00B4F7,
    0x00E0FF, 0x00E375, 0x03F42B, 0x78B82E, 0xE5E218, 0x787878, 0x000000, 0x000000,
    0xFFFFFF, 0xFFF2BE, 0xF8B8B8, 0xF8B8D8, 0xFFB6FF, 0xFFC3FF, 0xC7D1FF, 0x9ADAFF,
    0x88EDF8, 0x83FFDD, 0xB8F8B8, 0xF5F8AC, 0xFFFFB0, 0xF8D8F8, 0x000000, 0x000000,
];
/**
 * NMI 回调索引 (对应 NMI_CALLBACK_TABLE 的 24 项入口)。
 *
 * 这些是 NMI 每帧按 ram_00ED 索引调用的子程, 不是游戏场景:
 *   - 渲染/NT 填充/OAM 清空/精灵属性设置
 *   - 阵容数据装载到 RAM
 *   - 密码界面绘制/续关/校验
 *   - bank 切换/标志置位
 *
 * 游戏场景 (标题/会议/比赛/结果) 由脚本引擎 OpSceneLoad (0xFA) 驱动,
 * 走 bank00 sceneLoad → 主循环调度, 与此表无关。
 *
 * 分发表存储的是"目标-1" (PHA/PHA/RTS 跳转, RTS 弹出后 +1), 实际执行 = 表值+1。
 */
var NmiCallbackIndex;
(function (NmiCallbackIndex) {
    /** idx 0 → 表值 $A4C0, 实际执行 $84C1: 密码界面初始化 (清屏+48 假名网格滚动+sceneLoad(0x17)) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_00_PASSWORD_INIT"] = 0] = "CALLBACK_00_PASSWORD_INIT";
    /** idx 1 → 表值 $A559, 实际执行 $855A: 角度计算 (ram_00EC>>2 → ram_0060/61, ram_0062 bit7=0 取补) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_01_ANGLE_CALC"] = 1] = "CALLBACK_01_ANGLE_CALC";
    /** idx 2 → 表值 $A57B, 实际执行 $857C: 辅助子程 (JSR $9B91) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_02_AUX_9B91"] = 2] = "CALLBACK_02_AUX_9B91";
    /** idx 3 → 表值 $A581, 实际执行 $8582: 双 NT 区填充 ($2000 0x10 行 + $2400 0x20 行, JSR $98EA) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_03_NT_FILL"] = 3] = "CALLBACK_03_NT_FILL";
    /** idx 4 → 表值 $A5A2, 实际执行 $85A3: OAM 清空 (JSR $9B7F) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_04_OAM_CLEAR"] = 4] = "CALLBACK_04_OAM_CLEAR";
    /** idx 5 → 表值 $A5A8, 实际执行 $85A9: 精灵辅助 (LDX #$09; JSR $9F96) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_05_SPRITE_9F96"] = 5] = "CALLBACK_05_SPRITE_9F96";
    /** idx 6 → 表值 $A5B0, 实际执行 $85B1: 精灵辅助 (LDX #$09; JSR $9F89) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_06_SPRITE_9F89"] = 6] = "CALLBACK_06_SPRITE_9F89";
    /** idx 7 → 表值 $A5B8, 实际执行 $85B9: 标志置位 (ram_0099 = $FF) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_07_FLAG_0099"] = 7] = "CALLBACK_07_FLAG_0099";
    /** idx 8 → 表值 $A5BF, 实际执行 $85C0: 切 PRG bank0 (MMC3) + ram_001B 清 bit6 */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_08_BIT6_CLEAR"] = 8] = "CALLBACK_08_BIT6_CLEAR";
    /** idx 9 → 表值 $A5CD, 实际执行 $85CE: 切 PRG bank1 (MMC3) + ram_001B 置 bit6 */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_09_BIT6_SET"] = 9] = "CALLBACK_09_BIT6_SET";
    /** idx 10 → 表值 $A5DB, 实际执行 $85DC: 阵容装载 0x00 + 帧绘制 5 */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_10_ROSTER_LOAD0"] = 10] = "CALLBACK_10_ROSTER_LOAD0";
    /** idx 11 → 表值 $A5E8, 实际执行 $85E9: 阵容装载 0x10 + 帧绘制 6 (ram_000D 分支) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_11_ROSTER_LOAD10"] = 11] = "CALLBACK_11_ROSTER_LOAD10";
    /** idx 12 → 表值 $A602, 实际执行 $8603: 阵容装载 0x30 + 帧绘制 8 (ram_000D 分支) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_12_ROSTER_LOAD30"] = 12] = "CALLBACK_12_ROSTER_LOAD30";
    /** idx 13 → 表值 $A61C, 实际执行 $861D: 阵容装载 0x20 + 帧绘制 7 */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_13_ROSTER_LOAD20"] = 13] = "CALLBACK_13_ROSTER_LOAD20";
    /** idx 14 → 表值 $A629, 实际执行 $862A: 精灵/滚动辅助 */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_14_SPRITE_SCROLL"] = 14] = "CALLBACK_14_SPRITE_SCROLL";
    /** idx 15 → 表值 $A650, 实际执行 $8651: 密码续关数据装载 ($AA97 表) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_15_CONTINUE_LOAD"] = 15] = "CALLBACK_15_CONTINUE_LOAD";
    /** idx 16 → 表值 $A69C, 实际执行 $869D: 比赛阵容装载 (ram_04E5 分支) */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_16_MATCH_ROSTER"] = 16] = "CALLBACK_16_MATCH_ROSTER";
    /** idx 17 → 表值 $A77A, 实际执行 $877B: 阵容装载 0x80 */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_17_ROSTER_LOAD80"] = 17] = "CALLBACK_17_ROSTER_LOAD80";
    /** idx 18 → 表值 $A782, 实际执行 $8783: 等待 + OAM 拷贝 $88FB */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_18_WAIT_OAM_COPY"] = 18] = "CALLBACK_18_WAIT_OAM_COPY";
    /** idx 19 → 表值 $A78D, 实际执行 $878E: 精灵属性置 bit3 + 转密码续关装载 */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_19_SPRITE_ATTR_BIT3"] = 19] = "CALLBACK_19_SPRITE_ATTR_BIT3";
    /** idx 20 → 表值 $A7BD, 实际执行 $87BE: 等待 + 精灵属性设置 */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_20_SPRITE_ATTR"] = 20] = "CALLBACK_20_SPRITE_ATTR";
    /** idx 21 → 表值 $A7CE, 实际执行 $87CF: 阵容装载 0x81 */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_21_ROSTER_LOAD81"] = 21] = "CALLBACK_21_ROSTER_LOAD81";
    /** idx 22 → 表值 $A7D6, 实际执行 $87D7: 精灵属性置 bit2 128 帧循环 */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_22_SPRITE_ATTR_BIT2"] = 22] = "CALLBACK_22_SPRITE_ATTR_BIT2";
    /** idx 23 (0x17) → 表值 $A7FA, 实际执行 $87FB: 密码校验/续关解码 */
    NmiCallbackIndex[NmiCallbackIndex["CALLBACK_23_PASSWORD_CHECK"] = 23] = "CALLBACK_23_PASSWORD_CHECK";
})(NmiCallbackIndex || (exports.NmiCallbackIndex = NmiCallbackIndex = {}));
/** @deprecated 旧名 TaskIndex, 等价于 NmiCallbackIndex */
exports.TaskIndex = NmiCallbackIndex;
class BootRouter {
    constructor(store) {
        /** BOOT 开场背景已渲染标志 (只在 BOOT 初始化时渲染一次) */
        this._bootBgRendered = false;
        this._store = store;
        this._password = new PasswordCallbackHandler_1.PasswordCallbackHandler(store);
        this._bgRenderer = new BootBackgroundRenderer_1.BootBackgroundRenderer(store);
    }
    // ════════════════════════════════════════════════
    // 零页读/写辅助
    // ════════════════════════════════════════════════
    /** 4 位大写十六进制 RAM 键 */
    rk(addr) {
        return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
    }
    rd(addr) {
        return this._store.read(this.rk(addr));
    }
    wr(addr, v) {
        this._store.write(this.rk(addr), v & 0xff);
    }
    rdPtr(lo, hi) {
        return this.rd(lo) | (this.rd(hi) << 8);
    }
    wrPtr(lo, hi, v) {
        this.wr(lo, v & 0xff);
        this.wr(hi, (v >> 8) & 0xff);
    }
    /**
     * NMI 回调分发 (resetEntry) — 依据 ram_00ED 索引分发到对应回调子程。
     * 对应原始 $8484 分发器 + resetEntry (asm $8281/$826D 区)。
     *
     * @param index 回调索引 (ram_00ED)
     */
    resetEntry(index) {
        const i = index & 0xff;
        this.wr(0x00ED, i);
        switch (i) {
            case NmiCallbackIndex.CALLBACK_00_PASSWORD_INIT:
            case NmiCallbackIndex.CALLBACK_02_AUX_9B91:
                // ram_00ED=2 = BOOT 开场 (tsnes trace 实测开场第一个画面 $ED=2)。
                // 之前 resetScene(2) 走 default → _initScene(2) 空实现 → BOOT 背景从不渲染
                // → nt0=0 黑屏。case 2 与 case 0 都挂 _initBoot (BOOT 开场初始化 + 背景渲染)。
                this._initBoot();
                break;
            case NmiCallbackIndex.CALLBACK_23_PASSWORD_CHECK:
                this._password.render();
                break;
            default:
                this._initScene(i);
                break;
        }
    }
    /** $8484 分发回调 (由 update 每帧调用) */
    onDispatched(index, _target) {
        this.resetEntry(index);
    }
    /** 密码校验 — 委托给 PasswordCallbackHandler.check (读 ram_0057 做解码) */
    verifyPassword() {
        return this._password.check();
    }
    /** idx 0 回调: BOOT 初始化 (对应原始 $821D-$8281) */
    _initBoot() {
        this.wr(0x001B, this.rd(0x001B) | 0x40);
        for (let i = 0; i < 0xe8; i++)
            this.wr(0xFF19 + i, 0);
        for (let i = 0; i < 0x20; i++)
            this.wr(0xFFE0 + i, 0);
        this.wr(0x004A, 0);
        this.wr(0x004B, 0);
        this.wr(0x008F, 2);
        this.wr(0x0091, 2);
        // BOOT 开场背景: SCENE_0x0A (bank07) + bank08 metatile + bank06 调色板
        // 走真实 ROM 数据链路, 不再使用模拟器 dump 快照 (boot-scene.ts 已删)
        // _initBoot 会被 update 每帧重入 (ram_00ED=2 每帧 resetEntry), 背景只渲染一次
        if (!this._bootBgRendered) {
            this._bgRenderer.render();
            this._bootBgRendered = true;
            console.log(`[BootRouter] _initBoot BOOT bg rendered. ram_00ED=${this.rd(0x00ED)}` +
                ` ram_004A=${this.rd(0x004A)} ram_0538=${this.rd(0x0538)}` +
                ` ram_0020=${this.rd(0x0020)} ram_0021=${this.rd(0x0021)}`);
        }
    }
    /** 通用回调处理 (其余索引由 §6 callbackNN 方法覆盖) */
    _initScene(_index) {
        // 各 NMI 回调由 §6 callbackNN 方法覆盖
    }
    /**
     * $8484 场景分发器 (对应原始 $8484:)。
     * LDA ram_00ED → ASL → TAX → 查 PASSWORD_DISPATCH_TABLE → 跳转。
     *
     * TS 版用 16 位数组索引替代 ASL + 字节查表 (ASL 是字节偏移, 数组索引已隐含)。
     *
     * @param index 场景索引 (ram_00ED 值, 0-23)
     * @returns 被分发到的目标地址 (16 位, $A000 窗口偏移), 或 -1 越界。
     */
    dispatchByIndex(index) {
        const t = index & 0xff;
        const table = bank02_tables_1.NMI_CALLBACK_TABLE;
        if (t >= table.length)
            return -1;
        return table[t];
    }
    /**
     * 场景分发主入口 (对应原始 $8484 的调用语义)。
     * 翻译版不执行 6502 的 PHA/RTS 跳转, 直接调 resetEntry 分发。
     */
    dispatchPassword(index) {
        return this.dispatchByIndex(index);
    }
    /** 每帧推进路由: 依据 ram_00ED 分发当前场景 */
    update(frame) {
        const idx = this._store.read('ram_00ED') & 0xff;
        const target = this.dispatchByIndex(idx);
        if (target >= 0) {
            this.onDispatched(idx, target);
        }
        void frame;
    }
    // ════════════════════════════════════════════════════════════════
    // §1 NMI 渲染主程 ($8000-$815F)
    // 对应 code_main.s:5-142
    // ════════════════════════════════════════════════════════════════
    /**
     * $8000-$815F NMI 渲染主程。
     *
     * asm 流程:
     *   $8000-$800D: OAM DMA (写 $2003/$4014, ram_0628 标志检查)
     *   $800F-$8046: NT buffer 写入 (ram_05E8 表 → $2006/$2007)
     *   $8048-$805A: 清 ram_0628 + $2006 复位
     *   $805D-$808E: 滚动寄存器写入 ($2000/$2001/$2005)
     *   $8091-$80AF: MMC3 IRQ 计数器设置 + bank 切换
     *   $80B1-$80D4: CHR bank 切换 ($8000/$8001 寄存器)
     *   $80D7-$8137: 手柄读取 (8 位循环, ram_001B 区)
     *   $8116-$8137: ram_00E1/E2/E3 累加 + ram_003A 递增
     *
     * 翻译版: PPU/OAM/滚动由 core/ppu + PpuSync 驱动, 手柄由 Controller 驱动,
     *         MMC3 bank 切换由 mapper4.prgBankMap 维护。
     *         此方法翻译 asm 语义, 硬件操作通过 DataStore 缓存状态。
     */
    nmiRender() {
        // ── $8000-$800D: OAM DMA ──
        // LDA #$00; STA $2003 (OAM 地址=0); LDA #$02; STA $4014 (OAM DMA, 源=$0200)
        // LDA $0628; BEQ $805D (无 NT buffer 更新则跳过)
        if (this.rd(0x0628) !== 0) {
            // BIT $0629; BVS $805D (bit6=1 跳过)
            if ((this.rd(0x0629) & 0x40) === 0) {
                // $8014: LDA #$00; STA $2001 (关渲染)
                // ── $800F-$8046: NT buffer 写入 ──
                // LDX #$00; 循环: LDA $05E8,X; BPL $8026; AND #$3F; LDY #$84
                //   STY $2000; TAY; LDA $05EA,X; STA $2006 (NT 地址高);
                //   LDA $05E9,X; STA $2006 (NT 地址低); LDA $05EB,X; STA $2007 (tile)
                //   INX; DEY; BNE $8036; INX×3; LDA $05E8,X; BNE $801B
                let x = 0;
                while (true) {
                    const ctrl = this.rd(0x05E8 + x);
                    let count;
                    if ((ctrl & 0x80) !== 0) {
                        // BPL 失败: AND #$3F; LDY #$84
                        count = ctrl & 0x3F;
                        // $2000 = $84 (NT 地址增量 32 + 基址)
                    }
                    else {
                        // BPL 成功: LDY #$80
                        count = ctrl;
                        // $2000 = $80
                    }
                    // $8026-$8034: LDA $05EA,X → $2006 (地址高); LDA $05E9,X → $2006 (地址低)
                    const vramAddr = (this.rd(0x05EA + x) << 8) | this.rd(0x05E9 + x);
                    // $8036-$803E: 循环 count 次, 每次 INX 后 LDA $05EB,X → STA $2007
                    //   (每迭代 INX 读不同字节写 PPU, PPU 地址自动递增 — 不是重复写同一 tile!)
                    // 翻译版: 直写 DataStore — NT 区 ($2000-$2FFF) 走 writeNT,
                    //         调色板区 ($3F00-$3FFF) 走 paletteTable (NES 索引 → RGB)
                    for (let i = 0; i < count; i++) {
                        const val = this.rd(0x05EB + x + i);
                        this.writeVramByte(vramAddr + i, val);
                    }
                    // INX ×count (数据循环内) + INX×3 (跳过 addrLo/addrHi) → 下一组 ctrl 位置
                    x = (x + count + 3) & 0xff;
                    if (this.rd(0x05E8 + x) === 0)
                        break;
                }
                // $8048: LDA #$00; STA $0628 (清 NT buffer 标志)
                this.wr(0x0628, 0);
                // $804D: LDA #$3F; STA $2006; LDA #$00; STA $2006×3 (复位 PPU 地址)
            }
        }
        // ── $805D-$808E: 滚动寄存器写入 ──
        // LDA $0021; STA $2001 (渲染开关)
        // LDA $0079; BPL $8073 (bit7=0 走简单滚动)
        //   bit7=1: LDA $007B; STA $2006; LDA $007A; STA $2006 (NT 选择)
        // bit7=0 ($8073): LSR $0020×2; LDA $0045; LSR; ROL $0020;
        //   LDA $007B; LSR; ROL $0020; LDA $0020; STA $2000;
        //   LDA $007A; STA $2005; LDX $0044; DEX; STX $2005
        const r79 = this.rd(0x0079);
        if ((r79 & 0x80) !== 0) {
            // bit7=1: 写 $2006 (NT 选择) — 翻译版由 PpuSync 处理
        }
        else {
            // bit7=0: 滚动位计算
            let g20 = (this.rd(0x0020) >> 2) & 0xff; // LSR×2
            const g45 = this.rd(0x0045);
            g20 = ((g20 << 1) | (g45 & 1)) & 0xff; // LDA $0045; LSR; ROL $0020
            const g7b = this.rd(0x007B);
            g20 = ((g20 << 1) | (g7b & 1)) & 0xff; // LDA $007B; LSR; ROL $0020
            this.wr(0x0020, g20);
            // $2000 = g20; $2005 = $007A; $2005 = $0044-1
        }
        // ── $8091-$80AF: MMC3 IRQ 计数器 ──
        // LDY #$16; JSR $A1CB (延迟)
        // LDA $0079; BEQ $80AA (关 IRQ)
        //   ASL; STA $C000 (IRQ 计数); STA $C001 (IRQ 重载); STA $E001 (IRQ 使能)
        //   LDA #$04; STA $0078; BPL $80AF
        // $80AA: STA $E000 (关 IRQ); STA $0078
        if (r79 !== 0) {
            // IRQ 计数 = r79 << 1
            this.wr(0x0078, 0x04);
        }
        else {
            this.wr(0x0078, 0x00);
        }
        // ── $80B1-$80D4: CHR bank 切换 ──
        // LDA #$02; STA $8000; LDA $009E; STA $8001 (CHR bank 2)
        // LDA #$03; STA $8000; LDA $009F; STA $8001 (CHR bank 3)
        // LDA #$04; STA $8000; LDA $00A0; STA $8001 (CHR bank 4)
        // LDA #$05; STA $8000; LDA $00A1; STA $8001 (CHR bank 5)
        this._store.set('chrBank2', this.rd(0x009E));
        this._store.set('chrBank3', this.rd(0x009F));
        this._store.set('chrBank4', this.rd(0x00A0));
        this._store.set('chrBank5', this.rd(0x00A1));
        // ── $80D7-$8137: 手柄读取 ──
        // LDX #$02; 循环 2 次手柄:
        //   LDA #$04; STA $0040; LDA $001B,X; STA $0041
        //   LDA #$01; STA $4016; LDA #$00; STA $4016 (手柄 strobe)
        //   LDY #$08; 循环 8 位: LDA $4015,X; LSR; ROL $003F; AND #$01; ORA $003F; STA $003F; DEY; BNE
        //   CMP $0041; BEQ $8107; DEC $0040; BNE $80DF (重试)
        //   $8107: LDA $001B,X; EOR $003F; AND $003F; STA $001D,X; LDA $003F; STA $001B,X; DEX; BNE $80DD
        // 翻译版: 手柄由 Controller 驱动, 此处读 DataStore 缓存 (由 InterruptService 写入)
        for (let ctrl = 2; ctrl >= 1; ctrl--) {
            const prev = this.rd(0x001B + ctrl);
            // 从 DataStore 读取手柄状态 (InterruptService 每帧写入 controller_1/controller_2)
            const cur = this._store.read(`controller_${ctrl}`) ?? 0;
            const diff = (prev ^ cur) & cur;
            this.wr(0x001D + ctrl, diff & 0xff);
            this.wr(0x001B + ctrl, cur & 0xff);
        }
        // ── $8116-$8137: ram_00E1/E2/E3 累加 + ram_003A 递增 ──
        // CLC; LDA $00E1; ADC #$83; STA $00E1
        this.wr(0x00E1, (this.rd(0x00E1) + 0x83) & 0xff);
        // LDA $00E2; ADC #$0D; STA $00E2
        this.wr(0x00E2, (this.rd(0x00E2) + 0x0D) & 0xff);
        // LDA $00E3; ADC #$11; STA $00E3
        this.wr(0x00E3, (this.rd(0x00E3) + 0x11) & 0xff);
        // LDA #$00; STA $0046; STA $0047
        this.wr(0x0046, 0);
        this.wr(0x0047, 0);
        // LDA $001B; ORA #$80; STA $001B
        this.wr(0x001B, this.rd(0x001B) | 0x80);
        // INC $003A
        this.wr(0x003A, (this.rd(0x003A) + 1) & 0xff);
    }
    /**
     * 写单个 VRAM 字节 ($2007 写语义, 原版 PPU 地址自动递增)。
     * 翻译版直写 DataStore (去 CPU 化, 无 PPU 寄存器):
     *   $2000-$2FFF (NT 区) → writeNT 网格 (nt0: $2000 基址 / nt1: $2800 基址,
     *                与 src/game/index.ts writeNameTable 的物理布局一致)
     *   $3F00-$3FFF (调色板区) → paletteTable (NES 调色板索引 → RGB)
     *   其他地址 (图案表/滚动寄存器等) → 由 CHR/滚动管线管理, 此处忽略
     */
    writeVramByte(vramAddr, val) {
        const addr = vramAddr & 0xffff;
        if (addr >= 0x3f00 && addr <= 0x3fff) {
            this.writePaletteIndex(addr & 0x1f, val);
            return;
        }
        if (addr >= 0x2000 && addr <= 0x2fff) {
            // 水平镜像布局 (ntable1=[0,0,1,1]): $2000-$27FF → 物理 NT A (nt0), $2800-$2FFF → 物理 NT B (nt1)
            let base = 0x2000;
            let nt = 0;
            if (addr >= 0x2800) {
                base = 0x2800;
                nt = 1;
            }
            const a = (addr - base) & 0x3ff;
            if (a < 0x3c0) {
                // 0x3c0 起是属性表字节 — 翻译版属性表由 writeNameTable 从 entry.palette 计算, 忽略原始属性字节
                const tx = a % 32;
                const ty = (a / 32) | 0;
                if (ty < 30) {
                    this._store.writeNT(nt, tx, ty, { tile: val, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
                }
            }
            return;
        }
        // 其他地址忽略
    }
    /**
     * 写单个调色板字节 ($3F00-$3F1F, NES 调色板索引 → DataStore.paletteTable RGB)。
     * $3F00-$3F0F = BG 4 组 (每 4 字节一组: 通用色+3 色), $3F10-$3F1F = SPR 4 组。
     * 镜像位 ($3F04/$3F08/$3F0C = $3F00, $3F14/$3F18/$3F1C = $3F10) 直接写同色值,
     * 与真实 PPU 镜像结果一致 (游戏整段写 $3F00 时该位本来就是通用色)。
     */
    writePaletteIndex(palByte, nesIdx) {
        const rgb = NES_NTSC_RGB[nesIdx & 0x3f] ?? 0;
        const color = {
            r: (rgb >> 16) & 0xff,
            g: (rgb >> 8) & 0xff,
            b: rgb & 0xff,
            a: 0xff,
        };
        const a = palByte & 0x1f;
        if (a >= 0x10) {
            const p = ((a - 0x10) >> 2) & 3;
            const c = (a - 0x10) & 3;
            this._store.writeSprColor(p, c, color);
        }
        else {
            const p = (a >> 2) & 3;
            const c = a & 3;
            this._store.writeBgColor(p, c, color);
        }
    }
    // ════════════════════════════════════════════════════════════════
    // §2 滚动/CHR bank 辅助 ($8160-$81E3)
    // 对应 code_main.s:146-205
    // ════════════════════════════════════════════════════════════════
    /**
     * $8160-$81BF 滚动设置 A。
     * asm: STA $E000/$E001 (MMC3 IRQ 关闭), LDX $0078; LDA $0078,X;
     *      BPL $818D (bit7=0 走简单滚动);
     *      bit7=1: 延迟 6 循环, LDA $0079,X (Y 滚动), LDY $007A,X (X 滚动),
     *              写 $2006 (NT 选择), $2000 &= $FC (清滚动位), $2005=0/0, JMP $A1A8;
     *      bit7=0 ($818D): 延迟 2 循环, LSR $0020, LDA $007A,X; LSR; ROL $0020,
     *              $2000=$0020, $2005=$0079,X, $2005=0。
     *
     * @param x ram_0078 索引
     */
    scrollSetupA(x) {
        // STA $E000/$E001 (关 MMC3 IRQ) — 翻译版 IRQ 由 mapper4 管理, 此处 no-op
        const x78 = this.rd(0x0078);
        const flag = this.rd(0x0078 + x78);
        if ((flag & 0x80) !== 0) {
            // bit7=1: 延迟 6 循环 (LDY #$06; DEY; BNE)
            // LDA $0079,X (Y 滚动); LDY $007A,X (X 滚动)
            const scrollY = this.rd(0x0079 + x78);
            const scrollX = this.rd(0x007A + x78);
            // 写 $2006 (NT 选择) — 翻译版由 PpuSync 处理
            void scrollY;
            void scrollX;
            // $2000 &= $FC (清滚动位)
            this.wr(0x0020, this.rd(0x0020) & 0xFC);
            // $2005=0/0 (X/Y 滚动归零)
            // JMP $A1A8 — 延迟子程后返回 (翻译版 no-op, 帧同步由外部驱动)
            void x;
        }
        else {
            // bit7=0 ($818D): 延迟 2 循环
            // LSR $0020
            this.wr(0x0020, (this.rd(0x0020) >> 1) & 0xff);
            // LDA $007A,X; LSR; ROL $0020
            const ax = this.rd(0x007A + x78);
            const carry = (ax >> 0) & 1; // LSR 产生 carry
            this.wr(0x0020, ((this.rd(0x0020) << 1) | carry) & 0xff);
            // $2000 = $0020
            this.wr(0x0020, this.rd(0x0020));
            // $2005 = $0079,X (Y 滚动)
            // $2005 = 0 (X 滚动)
            void x;
        }
    }
    /**
     * $81C0-$81CA 滚动设置 B。
     * asm: STA $E000 (关 IRQ), STA $0078 (设索引), LDY #$18, JSR $A1CB (延迟), RTS。
     */
    scrollSetupB() {
        // STA $E000 (关 IRQ) — no-op (mapper4 管理)
        // STA $0078 — 已由调用方设置 ram_0078
        // LDY #$18; JSR $A1CB (延迟 24 循环) — 翻译版 no-op (帧同步)
        void 0;
    }
    /**
     * $81CB-$81E3 MMC3 CHR bank 切换。
     * asm: LDX $0078,Y (X = ram[$0078+Y], 零页 Y 变址);
     *      LDA #$00; ORA $0022; STA $8000; STX $8001 (写 CHR bank 寄存器 0);
     *      LDX $0079,Y (X = ram[$0079+Y]);
     *      LDA #$01; ORA $0022; STA $8000; STX $8001 (写 CHR bank 寄存器 1)。
     *
     * 零页 $0078/$0079 是两个相邻的 CHR bank 值表 (每项 1 字节), Y 是索引。
     * 翻译版: 读 DataStore 零页区, 写 CHR bank 缓存供 mapper4 使用。
     *
     * @param y 索引 (Y 寄存器值, 读 ram[$0078+Y] 和 ram[$0079+Y])
     */
    chrBankSwitch(y) {
        const bank0 = this.rd(0x0078 + y); // X = ram[$0078+Y]
        const bank1 = this.rd(0x0079 + y); // X = ram[$0079+Y]
        this._store.set('chrBank0', bank0);
        this._store.set('chrBank1', bank1);
    }
    // ════════════════════════════════════════════════════════════════
    // §3 跳转表 + pre-main-loop ($820C-$82E5)
    // 对应 code_main.s:209-307
    // ════════════════════════════════════════════════════════════════
    /**
     * $820C-$8215 4 入口跳转表。
     * asm: JMP $A855 / $A86E / $A484 / $A8CE
     *
     * @param index 0-3 选择跳转目标
     * @returns 目标地址 (运行时 $A000 窗口)
     */
    jumpTable4(index) {
        const table = [0xA855, 0xA86E, 0xA484, 0xA8CE];
        return table[index & 3] ?? -1;
    }
    /**
     * $82AC-$82E5 pre-main-loop 初始化。
     * asm: JSR $99F0 (清屏), JSR $9B7F (oamClear), 关 NMI ($2000 &= $7F),
     *      清 $FF19-$FFFF 区 (0xE8 字节), 清 $FFE0-$FFFF 区 (0x20 字节),
     *      设 ram_00EC=$68, LDA #$98/LDX #$02/LDY #$04, JSR $AA06 (调色板),
     *      JMP $C557 (进入主循环)。
     */
    preMainLoopInit() {
        // $82AC: JSR $99F0 (清屏) — 翻译版由 ntClear/oamClear 替代
        this._store.clearOAM();
        // $82B2: JSR $98A0 (ntClear)
        // $82B5: JSR $9B7F (oamClear) — 已上面 clearOAM 覆盖
        // $82B8-$82BF: 关 NMI + 清 $2000 bit7
        this.wr(0x0020, this.rd(0x0020) & 0x7f);
        // $82C4-$82CC: 清 $FF19-$FFFF 区 (0xE8 字节循环)
        for (let i = 0; i < 0xE8; i++) {
            this.wr(0xFF19 + i, 0);
        }
        // $82CE-$82D6: 清 $FFE0-$FFFF 区 (0x20 字节循环, 与上面重叠但无害)
        for (let i = 0; i < 0x20; i++) {
            this.wr(0xFFE0 + i, 0);
        }
        // $82D8-$82E2: 设 ram_00EC=$68, LDA #$98/LDX #$02/LDY #$04, JSR $AA06 (调色板装载)
        this.wr(0x00EC, 0x68);
        // $AA06: 调色板装载 + NT 初始化 (翻译版由 DataStore.paletteTable 驱动)
        // LDA #$08; STA $2000 (开 NMI + NT 地址增量 32 + 基址 $2000)
        // LDA #$00; STA $2001; STA $2005×2 (关渲染 + 滚动归零)
        // LDA #$00; LDY #$01; 循环 STA $01FF,Y (清 $0200-$02FF OAM 区)
        for (let i = 0; i < 0x100; i++) {
            this.wr(0x0200 + i, 0);
        }
        // STA $2003; LDA #$02; STA $4014 (OAM DMA)
        // LDA #$00; STA $8000/$8001; LDA #$01; STA $8000; LDA #$02; STA $8001 (CHR bank 0/1)
        // LDA #$20; STA $2006; LDA #$00; STA $2006 (NT 基址 $2000)
        // LDX #$10; LDY #$00; 循环 STA $2007 (清 16×256 = 4096 字节 NT)
        for (let y = 0; y < 30; y++) {
            for (let xx = 0; xx < 32; xx++) {
                this._store.writeNT(0, xx, y, { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
                this._store.writeNT(1, xx, y, { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
            }
        }
        // 调色板装载: 读 ram_00E6/$00E7 指针, 循环 8 组 × 4 色
        // (翻译版由 paletteTable 数据驱动, 此处设默认调色板)
        // $82E5: JMP $C557 (进入主循环) — 翻译版由外部帧循环驱动
    }
    // ════════════════════════════════════════════════════════════════
    // §5 密码场景分支 ($8338-$83D5)
    // 对应 code_sub.s:35-112
    // ════════════════════════════════════════════════════════════════
    /**
     * $8338-$83D5 密码场景分支。
     * asm: CMP #$81 (ram_0057 bit7); BEQ $83A3;
     *      $833C: LDX #$67; LDA #$05; JSR $C4BD (切 bank5);
     *      $8343: 清 ram_00ED; 写精灵表 $0468-$0498 (9 球员, X 从 $78 步进 4 到 $FC);
     *      $8372: JSR $9FA8; 等级调节表 $AB1F/$AB21/$AB22;
     *      $83A3: ram_0568 |= $10; JSR $9FA8; ram_0044/0046=$08; ram_056D-=4;
     *             JSR $9FA8; ram_0044=0; ram_0046=$F8; ram_056D+=4; JMP $A3AB。
     *
     * @returns 下一帧分支号 (asm RTS 返回值, 此子程无 RTS 走 JMP)
     */
    passwordBranch() {
        const a = this.rd(0x0057);
        if ((a & 0x80) !== 0) {
            // CMP #$81; BEQ $83A3 → bit7=1 分支
            this.wr(0x0568, this.rd(0x0568) | 0x10);
            this.waitCounter();
            this.wr(0x0044, 0x08);
            this.wr(0x0046, 0x08);
            this.wr(0x056D, (this.rd(0x056D) - 4) & 0xff);
            this.waitCounter();
            this.wr(0x0044, 0x00);
            this.wr(0x0046, 0xF8);
            this.wr(0x056D, (this.rd(0x056D) + 4) & 0xff);
            // JMP $A3AB (跳到场景 14 帧处理, 返回 2)
            return 2;
        }
        // $833C: LDX #$67; LDA #$05; JSR $C4BD (切 bank5) — 翻译版 bank 切换由 ServiceLoader
        // $8343: 清 ram_00ED
        this.wr(0x00ED, 0x00);
        let y = 0;
        // $8348-$8370: 写精灵表 $0468-$0498 (X 从 $78 步进 4, CPX #$FC)
        for (let x = 0x78; x < 0xFC; x += 4) {
            const ec = this.rd(0x00EC);
            // LDA $00EC; AND #$01; ORA #$F2 → ram_0469,X
            this.wr(0x0469 + x, (ec & 0x01) | 0xF2);
            // LDA #$03 → ram_046A,X
            this.wr(0x046A + x, 0x03);
            // TYA → ram_0468,X
            this.wr(0x0468 + x, y & 0xff);
            // CLC; ADC #$03; TAY
            y = (y + 3) & 0xff;
            // LDA $00EC → ram_046B,X
            this.wr(0x046B + x, ec);
            // CLC; ADC #$0D; STA $00EC
            this.wr(0x00EC, (ec + 0x0D) & 0xff);
        }
        // $8372: JSR $9FA8
        this.waitCounter();
        // $8377-$839E: 等级调节循环 (X 从 $78 步进 4, CPX #$FC)
        for (let x = 0x78; x < 0xFC; x += 4) {
            const txa = x & 0x0C; // TXA; AND #$0C
            const ti = txa; // TAY → Y = X & 0x0C (0/4/8/12)
            // LDA $0468,X; CMP $AB1F,Y; BCC $8387
            const v = this.rd(0x0468 + x);
            const threshold = bank02_tables_1.PASSWORD_LEVEL_ADJ_TABLE[ti] ?? 0x20; // $AB1F,Y
            let acc = v;
            if (v >= threshold) {
                acc = 0; // LDA #$00; CLC
            }
            // ADC $AB21,Y → ram_0468,X
            const adj1 = bank02_tables_1.PASSWORD_LEVEL_ADJ_TABLE[ti + 2] ?? 0x00; // $AB21,Y
            this.wr(0x0468 + x, (acc + adj1) & 0xff);
            // LDA $046B,X; CLC; ADC $AB22,Y → ram_046B,X
            const v2 = this.rd(0x046B + x);
            const adj2 = bank02_tables_1.PASSWORD_LEVEL_ADJ_TABLE[ti + 3] ?? 0x20; // $AB22,Y
            this.wr(0x046B + x, (v2 + adj2) & 0xff);
        }
        // JMP $A372 (跳到场景帧处理, 返回 2)
        return 2;
    }
    // ════════════════════════════════════════════════════════════════
    // §6 24 入口场景帧处理 ($855A-$87FA)
    // 对应 code_sub.s:204-228 + code_data.s:1-228
    // 每个方法对应 $8484 分发表的一个入口, 返回下一帧主循环分支号。
    // ════════════════════════════════════════════════════════════════
    // ── 辅助子程 stub (被场景帧处理调用, 完整实现待后续翻译) ──
    /**
     * $8895 rosterLoadMain — 装载主力阵容到 $0408 区。
     * asm $8891: LDY #$00; 循环 LDA $AA47,X; STA $0408,Y; INX; TYA; CLC; ADC #$04;
     *            TAY; CMP #$28; BCC (10 球员循环, $0408 起每 4 字节 1 球员)。
     * @param teamIdx 球队索引 (X 寄存器, 指向 ROSTER_TABLE 偏移)
     */
    rosterLoadMain(teamIdx) {
        let x = teamIdx;
        let y = 0;
        for (let i = 0; i < 10; i++) {
            const playerId = bank02_tables_1.ROSTER_TABLE[x] ?? 0;
            this.wr(0x0408 + y, playerId);
            x = (x + 1) & 0xff;
            y = (y + 4) & 0xff;
            if (y >= 0x28)
                break; // CMP #$28; BCC
        }
    }
    /**
     * $8920 drawFrame — 画帧 (NT 填充 + OAM 清除)。
     * asm: LDA #$00; STA $00E6; LDA #$20; STA $00E7; LDY #$10; LDX #$20; JSR $98EA (ppuFill $2000 区 16×32);
     *      LDA #$00; STA $00E6; LDA #$24; STA $00E7; LDY #$20; LDX #$20; JSR $98EA (ppuFill $2400 区 32×32);
     *      JSR $9B7F (OAM 清除); RTS
     *
     * 入口 A 寄存器 (frameId) 未被子程使用 ($8920 第一条是 LDA #$00 覆盖 A)。
     */
    drawFrame(_frameId) {
        // 第一次 ppuFill: $2000 区, 填 0, 16 行 × 32 列
        this.wr(0x00E6, 0x00);
        this.wr(0x00E7, 0x20);
        this.ppuFill16x32(0x2000, 0x00);
        // 第二次 ppuFill: $2400 区, 填 0, 32 行 × 32 列
        this.wr(0x00E6, 0x00);
        this.wr(0x00E7, 0x24);
        this.ppuFill32x32(0x2400, 0x00);
        // JSR $9B7F (OAM 清除)
        this._store.clearOAM();
    }
    /** ppuFill 辅助: 填 NT 区 16 行 × 32 列 (对应 JSR $98EA, Y=0x10, X=0x20) */
    ppuFill16x32(baseAddr, fill) {
        for (let y = 0; y < 16; y++) {
            for (let x = 0; x < 32; x++) {
                const addr = baseAddr + y * 32 + x;
                const nt = addr < 0x2400 ? 0 : 1;
                const tx = (addr & 0x3ff) % 32;
                const ty = ((addr & 0x3ff) / 32) | 0;
                if (tx < 32 && ty < 30) {
                    this._store.writeNT(nt, tx, ty, { tile: fill, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
                }
            }
        }
    }
    /** ppuFill 辅助: 填 NT 区 32 行 × 32 列 (对应 JSR $98EA, Y=0x20, X=0x20) */
    ppuFill32x32(baseAddr, fill) {
        for (let y = 0; y < 30; y++) {
            for (let x = 0; x < 32; x++) {
                const addr = baseAddr + y * 32 + x;
                const nt = addr < 0x2400 ? 0 : 1;
                const tx = (addr & 0x3ff) % 32;
                const ty = ((addr & 0x3ff) / 32) | 0;
                if (tx < 32 && ty < 30) {
                    this._store.writeNT(nt, tx, ty, { tile: fill, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
                }
            }
        }
    }
    /**
     * $9B91 scene02Helper — 清 4 个状态字节 (bank00 $9B91)。
     * asm: LDA #$00; STA $0568; STA $0588; STA $05A8; STA $05C8; RTS
     */
    scene02Helper() {
        this.wr(0x0568, 0);
        this.wr(0x0588, 0);
        this.wr(0x05A8, 0);
        this.wr(0x05C8, 0);
    }
    /**
     * $9F96 scene04Helper — 检查协程槽 $0000,X 是否 $FF (bank00 $9F96)。
     * asm: LDA $0000,X; CMP #$FF; BNE $9FA1; LDA #$01; JSR $9FA8; LDA #$00; STA $0000,X; RTS
     * 入口 X=9 (LDX #$09), 检查协程槽 $0009。
     */
    scene04Helper() {
        const x = 0x09;
        if (this.rd(0x0000 + x) === 0xFF) {
            this.waitCounter();
            this.wr(0x0000 + x, 0);
        }
    }
    /**
     * $9F89 scene05Helper — 协程槽条件置位 (bank00 $9F89)。
     * asm: LDA $0001,X; BEQ $9F95; LDA $0000,X; BNE $9F95; LDA #$01; STA $0000,X; RTS
     * 入口 X=9, 若 $000A=0 或 $0009≠0 则跳过, 否则 $0009=1。
     */
    scene05Helper() {
        const x = 0x09;
        if (this.rd(0x0001 + x) === 0)
            return; // BEQ $9F95
        if (this.rd(0x0000 + x) !== 0)
            return; // BNE $9F95
        this.wr(0x0000 + x, 1);
    }
    /**
     * $9FA8 waitCounter — 等待 vblank 帧边界 (bank00 $9FA8)。
     * asm: STA $0019; 压栈 X/Y/ED/EC/EB/EA/E9/E8/E7/E6; 挂起协程 → 帧调度恢复。
     * 翻译版: 帧同步由外部帧循环驱动, 此处清 ram_0019 标志 (语义占位)。
     */
    waitCounter() {
        this.wr(0x0019, 0);
    }
    /**
     * $88FB oamCopy88FB — OAM 拷贝 ($88D0 的别名入口)。
     */
    oamCopy88FB() {
        this.oamCopy();
    }
    /**
     * $8976 scene14Helper — 场景 14 数据装载 (bank02 $8976, 被反汇编误标为 .byte)。
     * asm 调用: LDX #$BD; LDY #$23; JSR $8976 (参数 X=$BD, Y=$23)。
     * 功能: 按 X/Y 参数装载场景数据到 RAM (具体逻辑待反汇编修复后精确翻译)。
     */
    scene14Helper(x, y) {
        // $8976 被反汇编器误标为 .byte, 无法精确翻译。
        // 语义: 用 X=$BD/Y=$23 装载场景 14 数据 (可能是 NT 模板或脚本指针)。
        this.wr(0x00E6, x & 0xff);
        this.wr(0x00E7, y & 0xff);
    }
    /**
     * $9A35 scene14Helper2 — 渲染刷新 + 渐隐初始化 (bank00 $9A35)。
     * asm: JSR $9B07 (NT 刷新); JSR $9AB8 (OAM 刷新); JSR $9ADA (调色板刷新);
     *      LDX $00E9; JSR $C4B9 (切 bank); LDA #$0F; STA $004A; STA $004B; JMP $9A71 (渐隐)
     * 翻译版: 渐隐计数器设为 15, 帧循环驱动渐隐效果。
     */
    scene14Helper2() {
        // NT/OAM/调色板刷新由 PpuSync 驱动 (对应 $9B07/$9AB8/$9ADA)
        // 切 bank ($C4B9) 由 ServiceLoader 处理
        this.wr(0x004A, 0x0F);
        this.wr(0x004B, 0x0F);
        // JMP $9A71 (渐隐循环) — 翻译版由 fadeIn/fadeOut 驱动
    }
    /**
     * $A82F scene14Sprite — 精灵属性清除 (运行时 $A82F = asm $882F = spriteAttrClear)。
     * asm: STA $00EC (结束地址); STX $00ED (起始地址); LDY=循环次数;
     *      循环: LDA $0468,X; CMP #$82; BCS; LDA $046A,X; AND #$F3; STA $046A,X;
     *      INX×4; CPX $00EC; BNE; DEY; BNE。
     * @param yCycles 循环帧数 (Y 寄存器)
     * @param xStart 起始地址 (X 寄存器 → ram_00ED)
     * @param ecEnd 结束地址 (A 寄存器 → ram_00EC)
     */
    scene14Sprite(yCycles, xStart, ecEnd) {
        this.spriteAttrClear(ecEnd, xStart, yCycles);
    }
    // ── 场景帧处理实现 ──
    /**
     * $855A-$8579 场景 idx 1 帧处理 (角度计算)。
     * asm: LDA #$00; STA $0060; LDA $00EC; LSR; ROR $0060; LSR; ROR $0060;
     *      STA $0061; BIT $0062; BMI $8579;
     *      LDA #$00; SEC; SBC $0060; STA $0060; LDA #$00; SBC $0061; STA $0061;
     *      LDA #$03; RTS
     *
     * 计算 ram_00EC >> 2 → ram_0060/0061 (16 位), 若 ram_0062 bit7=0 则取补。
     */
    callback01() {
        this.wr(0x0060, 0);
        // LDA $00EC; LSR; ROR $0060; LSR; ROR $0060 → ram_00EC >> 2, 两次 ROR 进位
        let ec = this.rd(0x00EC);
        let g0 = 0;
        // 第一次 LSR; ROR $0060
        const carry1 = ec & 1;
        ec = (ec >> 1) & 0xff;
        g0 = ((g0 >> 1) | (carry1 << 7)) & 0xff;
        // 第二次 LSR; ROR $0060
        const carry2 = ec & 1;
        ec = (ec >> 1) & 0xff;
        g0 = ((g0 >> 1) | (carry2 << 7)) & 0xff;
        this.wr(0x0060, g0);
        this.wr(0x0061, ec);
        // BIT $0062; BMI $8579 → 若 bit7=1 跳过取补
        if ((this.rd(0x0062) & 0x80) === 0) {
            // 取补: 0 - ram_0060/0061 (16 位)
            const val = (this.rd(0x0061) << 8) | this.rd(0x0060);
            const neg = (-val) & 0xffff;
            this.wr(0x0060, neg & 0xff);
            this.wr(0x0061, (neg >> 8) & 0xff);
        }
        return 3;
    }
    /** $857C-$8580 场景 idx 2 帧处理。asm: JSR $9B91; LDA #$02; RTS */
    callback02() {
        this.scene02Helper();
        return 2;
    }
    /** $85A2-$85AF 场景 idx 4 帧处理。asm: LDX #$09; JSR $9F96; LDA #$02; RTS */
    callback04() {
        this.scene04Helper();
        return 2;
    }
    /** $85B1-$85B7 场景 idx 5 帧处理。asm: LDX #$09; JSR $9F89; LDA #$02; RTS */
    callback05() {
        this.scene05Helper();
        return 2;
    }
    /** $85DC-$85E7 场景 idx 8 帧处理。asm: LDA #$00; JSR $8895; LDA #$05; JSR $8920; LDA #$02; RTS */
    callback08() {
        this.rosterLoadMain(0x00);
        this.drawFrame(0x05);
        return 2;
    }
    /**
     * $85E9-$85F8 场景 idx 9 帧处理 (带 ram_000D 分支)。
     * asm: LDA $000D; BNE $85FA; LDA #$10; JSR $8895; LDA #$06; JSR $8920; LDA #$02; RTS
     */
    callback09() {
        if (this.rd(0x000D) !== 0) {
            return this.callback10();
        }
        this.rosterLoadMain(0x10);
        this.drawFrame(0x06);
        return 2;
    }
    /** $85FA-$8601 场景 idx 10 帧处理。asm: LDA #$00; STA $000D; STA $000E; LDA #$02; RTS */
    callback10() {
        this.wr(0x000D, 0);
        this.wr(0x000E, 0);
        return 2;
    }
    /**
     * $8603-$8612 场景 idx 11 帧处理 (带 ram_000D 分支)。
     * asm: LDA $000D; BNE $8614; LDA #$30; JSR $8895; LDA #$08; JSR $8920; LDA #$02; RTS
     */
    callback11() {
        if (this.rd(0x000D) !== 0) {
            return this.callback12();
        }
        this.rosterLoadMain(0x30);
        this.drawFrame(0x08);
        return 2;
    }
    /** $8614-$861B 场景 idx 12 帧处理。asm: LDA #$00; STA $000D; STA $000E; LDA #$02; RTS */
    callback12() {
        this.wr(0x000D, 0);
        this.wr(0x000E, 0);
        return 2;
    }
    /** $861D-$8628 场景 idx 13 帧处理。asm: LDA #$20; JSR $8895; LDA #$07; JSR $8920; LDA #$02; RTS */
    callback13() {
        this.rosterLoadMain(0x20);
        this.drawFrame(0x07);
        return 2;
    }
    /**
     * $862A-$864E 场景 idx 14 帧处理。
     * asm: LDX #$BD; LDY #$23; JSR $8976; JSR $9A35; LDA #$01; JSR $9FA8;
     *      ram_058F &= $7F; ram_004C=$82; LDY #$28; LDX #$20; LDA #$C8; JSR $A82F;
     *      LDA #$02; RTS
     */
    callback14() {
        this.scene14Helper(0xBD, 0x23);
        this.scene14Helper2();
        this.waitCounter();
        this.wr(0x058F, this.rd(0x058F) & 0x7f);
        this.wr(0x004C, 0x82);
        this.scene14Sprite(0x28, 0x20, 0xC8);
        return 2;
    }
    /**
     * $8651-$869A 场景 idx 15 帧处理 (密码续关数据装载)。
     * asm: LDA #$00; STA $00ED; LDY $00ED; LDA $AA97,Y → ram_00EA/00EB;
     *      ram_007B &1 <<2 | ram_00EB; TAX; INY; LDA $AA97,Y → ram_00EB; INY;
     *      LDA $AA97,Y; INY; STY $00ED; LDY $00EB; JSR $9B28; AND #$7F; STA $00EB;
     *      循环: LDA #$00; STA $05E8,X; INX; DEC $00EB; BNE (清 NT buffer);
     *      JSR $9B5E; BIT ram_00EA; BMI $869A; BVC $8655; JSR $9FA8; JMP $A655;
     *      LDA #$02; RTS
     */
    callback15() {
        this.wr(0x00ED, 0);
        // LDY $00ED ($A4,$ED = LDY 零页 $00ED)
        let y = this.rd(0x00ED);
        // 循环 $8655: LDA $AA97,Y → ram_00EA; AND #$7F → ram_00EB
        while (true) {
            const ea = bank02_tables_1.PASSWORD_CONTINUE_TABLE[y] ?? 0;
            this.wr(0x00EA, ea);
            this.wr(0x00EB, ea & 0x7F);
            // LDA $007B; AND #$01; ASL; ASL; ORA $00EB; TAX
            const teamBit = (this.rd(0x007B) & 0x01) << 2;
            let x = (teamBit | this.rd(0x00EB)) & 0xff;
            // INY; LDA $AA97,Y → ram_00EB; INY; LDA $AA97,Y; INY; STY $00ED
            y = (y + 1) & 0xff;
            const eb2 = bank02_tables_1.PASSWORD_CONTINUE_TABLE[y] ?? 0;
            this.wr(0x00EB, eb2);
            y = (y + 1) & 0xff;
            const cnt = bank02_tables_1.PASSWORD_CONTINUE_TABLE[y] ?? 0; // 循环次数
            y = (y + 1) & 0xff;
            this.wr(0x00ED, y);
            // LDY $00EB; JSR $9B28 (bank00 子程, 装载球员数据)
            // AND #$7F → ram_00EB
            this.wr(0x00EB, (cnt & 0x7F));
            // 循环: LDA #$00; STA $05E8,X; INX; DEC $00EB; BNE (清 NT buffer 区)
            let count = this.rd(0x00EB);
            while (count > 0) {
                this.wr(0x05E8 + x, 0);
                x = (x + 1) & 0xff;
                count = (count - 1) & 0xff;
            }
            // JSR $9B5E (bank00 子程, OAM 刷新)
            // BIT ram_00EA; BMI $869A (bit7=1 → 退出循环, 返回 2)
            if ((this.rd(0x00EA) & 0x80) !== 0) {
                return 2;
            }
            // BVC $8655 (bit6=0 → 继续循环)
            if ((this.rd(0x00EA) & 0x40) !== 0) {
                // bit6=1: JSR $9FA8; JMP $A655
                this.waitCounter();
                return 2; // JMP $A655 跳到场景帧处理
            }
            // bit6=0: 继续循环 (BVC $8655)
        }
    }
    /**
     * $869D-$86D2 场景 idx 16 帧处理 (比赛阵容装载 A)。
     * asm: LDA $04E5; CMP #$FF; BEQ $86D4; JSR $A767;
     *      LDY #$80; ram_00EA=0; LDX #$2F; ram_00ED=$FF; ram_00EC=$FE; ram_00EB=$07;
     *      LDA #$F7; JSR $A72C; LDY #$D8; LDX #$30; ram_00ED=$01; ram_00EC=$FF;
     *      ram_00EB=$FC; JSR $A72C; LDA #$02; RTS
     */
    callback16() {
        if (this.rd(0x04E5) === 0xFF) {
            return this.scene16b_frame();
        }
        // JSR $A767 (spriteTableCopy, 拷贝 PASSWORD_SPRITE_DATA 到 $03E8 区)
        this.spriteTableCopy();
        // LDY #$80; LDA #$00; STA $00EA; LDX #$2F; LDA #$FF; STA $00ED; LDA #$FE; STA $00EC; LDA #$07; STA $00EB; LDA #$F7
        this.wr(0x00EA, 0);
        this.wr(0x00ED, 0xFF);
        this.wr(0x00EC, 0xFE);
        this.wr(0x00EB, 0x07);
        // JSR $A72C (spriteBatchGen, 参数 Y=0x80, X=0x2F, A=0xF7 → count=0x2F)
        this.spriteBatchGen(0x2F);
        // LDY #$D8; LDX #$30; LDA #$01; STA $00ED; LDA #$FF; STA $00EC; LDA #$FC; STA $00EB
        this.wr(0x00ED, 0x01);
        this.wr(0x00EC, 0xFF);
        this.wr(0x00EB, 0xFC);
        // JSR $A72C (spriteBatchGen, 参数 X=0x30 → count=0x30)
        this.spriteBatchGen(0x30);
        return 2;
    }
    /**
     * $86D4-$872A 场景 idx 16b 帧处理 (比赛阵容装载 B)。
     * asm: JSR $A767; LDY #$80; LDX #$2F; ram_00EA=$02; ram_00ED=$FF; ram_00EC=$FE;
     *      ram_00EB=$07; LDA #$F7; JSR $A72C; LDX #$08; LDA #$FE; JSR $A72C;
     *      LDY #$FC; 拷贝 $A67B 表 → $0460; LDY #$B8; LDX #$1C; ram_00ED=$02;
     *      ram_00EC=$FF; ram_00EB=$03; LDA #$F6; JSR $A72C;
     *      LDY #$D8; $046A |= $02 循环; LDA #$02; RTS
     */
    scene16b_frame() {
        // JSR $A767 (spriteTableCopy)
        this.spriteTableCopy();
        // LDY #$80; LDX #$2F; LDA #$02; STA $00EA; LDA #$FF; STA $00ED; LDA #$FE; STA $00EC; LDA #$07; STA $00EB; LDA #$F7
        this.wr(0x00EA, 0x02);
        this.wr(0x00ED, 0xFF);
        this.wr(0x00EC, 0xFE);
        this.wr(0x00EB, 0x07);
        // JSR $A72C (spriteBatchGen, X=0x2F → count=0x2F)
        this.spriteBatchGen(0x2F);
        // LDX #$08; LDA #$FE; JSR $A72C (spriteBatchGen, X=0x08 → count=8)
        this.spriteBatchGen(0x08);
        // LDY #$FC; 循环: LDA $A67B,Y; STA $0460,Y; INY; BNE (拷贝 4 字节 $A67B 表 → $0460)
        // $A67B = PASSWORD_SPRITE_DATA 后 4 字节 ($79,$FF,$03,$C2 的 $FC-$FF 偏移)
        for (let i = 0; i < 4; i++) {
            const y = (0xFC + i) & 0xff;
            this.wr(0x0460 + y, bank02_tables_1.PASSWORD_SPRITE_DATA[i] ?? 0);
        }
        // LDY #$B8; LDX #$1C; LDA #$02; STA $00ED; LDA #$FF; STA $00EC; LDA #$03; STA $00EB; LDA #$F6; JSR $A72C
        this.wr(0x00ED, 0x02);
        this.wr(0x00EC, 0xFF);
        this.wr(0x00EB, 0x03);
        this.spriteBatchGen(0x1C);
        // LDY #$D8; 循环: LDA $046A,Y; ORA #$02; STA $046A,Y; INY×4; CPY #$F0; BCC
        for (let y = 0xD8; y < 0xF0; y = (y + 4) & 0xff) {
            const attr = this.rd(0x046A + y);
            this.wr(0x046A + y, attr | 0x02);
        }
        return 2;
    }
    /** $877B-$8780 场景 idx 17 帧处理。asm: LDA #$80; JSR $8895; LDA #$02; RTS */
    callback17() {
        this.rosterLoadMain(0x80);
        return 2;
    }
    /** $8783-$878C 场景 idx 18 帧处理。asm: LDA #$02; JSR $9FA8; JSR $88FB; LDA #$02; RTS */
    callback18() {
        this.waitCounter();
        this.oamCopy88FB();
        return 2;
    }
    /**
     * $87BE-$87CD 场景 idx 20 帧处理。
     * asm: LDA #$01; JSR $9FA8; LDY #$28; LDX #$64; LDA #$B0; JSR $A82F; LDA #$02; RTS
     */
    callback20() {
        this.waitCounter();
        this.scene14Sprite(0x28, 0x64, 0xB0);
        return 2;
    }
    /** $87CF-$87D5 场景 idx 21 帧处理。asm: LDA #$81; JSR $8895; LDA #$02; RTS */
    callback21() {
        this.rosterLoadMain(0x81);
        return 2;
    }
    /**
     * $87D7-$87F9 场景 idx 22 帧处理 (精灵属性批量设置)。
     * asm: LDY #$80; LDA #$01; JSR $9FA8; LDX #$20;
     *      循环: LDA $0468,X; BPL $87ED; LDA $046A,X; ORA #$04; STA $046A,X;
     *      INX×4; CPX #$C4; BNE; DEY; BNE; LDA #$02; RTS
     *
     * 128 帧 (Y=0x80) 循环, 每帧扫描 $0468-$04C4 工作精灵表 (X 从 0x20 步进 4),
     * 若精灵 Y 坐标 ($0468,X) < 0x80 (BPL), 则给属性字节 ($046A,X) 置 bit2。
     */
    callback22() {
        for (let y = 0x80; y > 0; y--) {
            this.waitCounter();
            for (let x = 0x20; x < 0xC4; x += 4) {
                const spriteY = this._store.read(this.rk(0x0468 + x));
                if ((spriteY & 0x80) === 0) {
                    // BPL: spriteY < 0x80 → 跳过 (BPL $87ED)
                    continue;
                }
                // spriteY >= 0x80: 给属性置 bit2
                const attr = this._store.read(this.rk(0x046A + x));
                this._store.write(this.rk(0x046A + x), attr | 0x04);
            }
        }
        return 2;
    }
    // ════════════════════════════════════════════════════════════════
    // §7 精灵/阵容辅助 ($872C-$88FD)
    // 对应 code_data.s:151-334
    // ════════════════════════════════════════════════════════════════
    /**
     * $872C-$8765 精灵批量生成。
     * asm: STA $00E9; 循环 X 次:
     *      ram_04E4 += ram_00ED; ram_04E7 += ram_00EC;
     *      if (ram_04E7 & ram_00EB == 0): 写 $0468-$046B,Y 4 字节;
     *      JSR $9FA8; DEX; BNE
     *
     * @param count 生成数量 (X 寄存器)
     */
    spriteBatchGen(count) {
        this.wr(0x00E9, 0); // STA $00E9 (asm 第一条)
        for (let x = count; x > 0; x--) {
            // ram_04E4 += ram_00ED
            this.wr(0x04E4, (this.rd(0x04E4) + this.rd(0x00ED)) & 0xff);
            // ram_04E7 += ram_00EC
            this.wr(0x04E7, (this.rd(0x04E7) + this.rd(0x00EC)) & 0xff);
            // if (ram_04E7 & ram_00EB == 0): 写 $0468-$046B,Y
            const y = this.rd(0x00E9);
            if ((this.rd(0x04E7) & this.rd(0x00EB)) === 0) {
                this.wr(0x0468 + y, this.rd(0x04E4));
                this.wr(0x0469 + y, this.rd(0x00E9));
                this.wr(0x046A + y, this.rd(0x00EA));
                this.wr(0x046B + y, this.rd(0x04E7));
            }
            this.waitCounter();
        }
    }
    /**
     * $8767-$8771 精灵表拷贝。
     * asm: LDY #$FC; 循环: LDA $A677,Y; STA $03E8,Y; INY; BNE
     * 把 $A677 表 (4 字节: $79,$FF,$03,$C2) 拷贝到 $03E8 区。
     * Y 从 $FC 开始, INY 到 $00 时 BNE 失败退出, 共拷 4 字节 ($FC/$FD/$FE/$FF → $03E4-$03E7)。
     */
    spriteTableCopy() {
        const table = [0x79, 0xFF, 0x03, 0xC2]; // asm $A677 表内容
        for (let i = 0; i < 4; i++) {
            const y = (0xFC + i) & 0xff;
            this.wr(0x03E8 + y, table[i]);
        }
    }
    /**
     * $882F-$8853 精灵属性清除。
     * asm: STA $00EC; STX $00ED; LDA #$01; JSR $9FA8;
     *      循环: LDA $0468,X; CMP #$82; BCS; LDA $046A,X; AND #$F3; STA $046A,X;
     *      INX×4; CPX $00EC; BNE; DEY; BNE
     *
     * @param ec 结束地址低字节 (ram_00EC, CPX 比较)
     * @param ed 起始地址高字节 (ram_00ED, 未直接使用)
     * @param yCycles 循环次数 (Y 寄存器, 外层帧数)
     */
    spriteAttrClear(ec, ed, yCycles) {
        void ed;
        this.wr(0x00EC, ec);
        for (let y = yCycles; y > 0; y--) {
            this.waitCounter();
            for (let x = this.rd(0x00ED); x !== ec; x = (x + 4) & 0xff) {
                const spriteY = this.rd(0x0468 + x);
                if (spriteY >= 0x82)
                    continue; // CMP #$82; BCS 跳过
                // AND #$F3 清除 bit2/bit3
                const attr = this.rd(0x046A + x);
                this.wr(0x046A + x, attr & 0xF3);
            }
        }
    }
    /**
     * $8857-$88B5 阵容装载。
     * asm: LDA $00E4; CMP $0026; BCS $88A8;
     *      $0026 分支: 0→$887C, 6→$8884, 0C→$887C, 10→$888C;
     *      $887C: LDX #$00; JSR $A8B7; JMP $A8A3;
     *      $8884: LDX #$0C; JSR $A8B7; JMP $A8A3;
     *      $888C: LDX #$18; JSR $A8B7;
     *      $8891: LDY #$00; LDA $AA47,X; STA $0408,Y; INX; TYA; CLC; ADC #$04;
     *             TAY; CMP #$28; BCC (10 球员循环);
     *      $88A3: LDA $AA75,X; STA $002A; ram_0026+3 → ram_002B
     *
     * 按 ram_0026 (球队索引) 选 ROSTER_TABLE 偏移, 装载 10 球员到 $0408 区。
     */
    rosterLoad() {
        const e4 = this.rd(0x00E4);
        const team = this.rd(0x0026);
        if (e4 >= team) {
            // BCS $88A8: 直接走属性装载
            this.rosterAttrLoad(team);
            return;
        }
        // 按 team 选偏移
        let x = 0;
        if (team === 0x00) {
            x = 0x00;
        }
        else if (team === 0x06) {
            x = 0x0C;
        }
        else if (team === 0x10) {
            x = 0x18;
        }
        else if (team >= 0x10) {
            x = 0x18;
        }
        else {
            x = 0x00;
        }
        // $8891: 装载 10 球员到 $0408 (每 4 字节 1 球员)
        this.rosterLoadMain(x);
        // $88A3: 属性装载
        this.rosterAttrLoad(team);
    }
    /** $88A3 属性装载: LDA $AA75,X; STA $002A; ram_0026+3 → ram_002B */
    rosterAttrLoad(team) {
        const attr = bank02_tables_1.ROSTER_ATTR_TABLE[team] ?? 0;
        this.wr(0x002A, attr);
        this.wr(0x002B, (this.rd(0x0026) + 3) & 0xff);
    }
    /**
     * $88B7-$88CC 阵容装载 B (替补席)。
     * asm: LDA #$0B; STA $00ED; LDY #$00;
     *      循环: LDA $AA47,X; STA $0300,Y; INX; TYA; CLC; ADC #$0C; TAY;
     *             CMP #$84; BCC (11 球员循环, 0x0C 字节步长);
     *      RTS
     *
     * @param xStart 起始索引 (X 寄存器, 指向 ROSTER_TABLE 偏移)
     */
    rosterLoadB(xStart) {
        this.wr(0x00ED, 0x0B);
        let x = xStart;
        let y = 0;
        for (let i = 0; i < 11; i++) {
            const playerId = bank02_tables_1.ROSTER_TABLE[x] ?? 0;
            this.wr(0x0300 + y, playerId);
            x = (x + 1) & 0xff;
            y = (y + 0x0C) & 0xff;
            if (y >= 0x84)
                break; // CMP #$84; BCC
        }
    }
    /**
     * $88D0-$88FD OAM 拷贝。
     * asm: LDA #$01; JSR $9FA8; LDY #$00;
     *      循环: LDX $0468,Y; LDA $046A,Y; AND #$0C; BEQ $88E1;
     *             LDX #$F8; (隐藏精灵);
     *      TXA; STA $0200,Y (OAM Y);
     *      LDA $0469,Y; STA $0201,Y (OAM tile);
     *      LDA $046A,Y; STA $0202,Y (OAM attr);
     *      LDA $046B,Y; STA $0203,Y (OAM X);
     *      INY×4; BNE (64 精灵循环)
     *
     * 把 $0468-$0467,FF 区 (工作精灵表) 拷贝到 $0200-$02FF (OAM)。
     * 隐藏条件: $046A,Y & $0C != 0 → Y = $F8 (屏幕外)
     */
    oamCopy() {
        this.waitCounter();
        for (let y = 0; y < 256; y += 4) {
            // LDX $0468,Y; LDA $046A,Y; AND #$0C; BEQ $88E1; LDX #$F8
            let spriteY = this.rd(0x0468 + y);
            const attr = this.rd(0x046A + y);
            if ((attr & 0x0C) !== 0) {
                spriteY = 0xF8; // 隐藏精灵 (移到屏幕外)
            }
            // TXA; STA $0200,Y (OAM Y)
            this.wr(0x0200 + y, spriteY);
            // LDA $0469,Y; STA $0201,Y (OAM tile)
            this.wr(0x0201 + y, this.rd(0x0469 + y));
            // LDA $046A,Y; STA $0202,Y (OAM attr)
            this.wr(0x0202 + y, this.rd(0x046A + y));
            // LDA $046B,Y; STA $0203,Y (OAM X)
            this.wr(0x0203 + y, this.rd(0x046B + y));
        }
    }
}
exports.BootRouter = BootRouter;
exports.default = BootRouter;
