"use strict";
/**
 * Dispatch Service — 真实 RESET 分发链 (替代 boot.ts 人工路由层)
 *
 * 【真实 ROM 调度机制 — 按 asm 逐条翻译, 禁止编造】
 *
 *   RESET $FFF0 (bank31/vectors.s):
 *     LDA #$00; STA $8000          ; 选 bank0 到 $8000 窗口 (MMC3 R6)
 *     JMP $C503                    ; → bank30
 *
 *   $C503 (bank30/code_main.s):
 *     JMP $C64E                    ; 硬件初始化
 *
 *   $C64E (bank30): 硬件初始化
 *     STA $2000 = $08              ; PPUCTRL 镜像
 *     SEI / CLD / LDX #$FF; TXS    ; 禁止中断/十进制/设栈
 *     等待 PPU VBlank ×2
 *     LDA #$C0; STA $A001          ; MMC3 PRG-RAM protect (H5: no-op)
 *     清零 $0000-$07FF (8 页)
 *     $20=$08, $21=$06, $2001=$06  ; PPU 镜像
 *     $4010=0, $4017=$40           ; APU (H5: no-op)
 *     等待 VBlank; 清 VRAM ($2006 循环)
 *     $22=0
 *     JSR $CB35 (NT/VRAM 清零)     ; → bank00.ntClear()
 *     JSR $CB8B (OAM 清零)         ; → store.oam.reset()
 *     $0469=0; STA $E000; CLI
 *     LDA #$00; JMP $CEFE          ; A=任务索引=0
 *
 *   $CEFE (bank30/code_sub.s): MMC3+PPU 重置
 *     PHA                          ; 保存任务索引
 *     $0469=0; STA $E000           ; MMC3 R6=bank0 (H5: no-op)
 *     JSR $CB8B (OAM 清零)         ; → store.oam.reset()
 *     JSR $CB35 (NT/VRAM 清零)     ; → bank00.ntClear()
 *     $2000 = ram_0020 & $7F       ; NMI off
 *     PLA                          ; 恢复任务索引
 *     JMP $C400                    ; → 分发器
 *
 *   $C400 (bank30): 场景分发器 (A=任务索引)
 *     TAY                          ; A→Y 暂存
 *     $2000=$08, $2001=$1E         ; NMI on, BG+SPR on
 *     $22=0                        ; 清零 MMC3 bank 选择状态
 *     LDX #$00; JSR $C4B2          ; R6=$8000 窗口 = bank0
 *     LDX #$02; JSR $C4B9          ; R7=$A000 窗口 = bank2
 *     TYA                          ; 恢复任务索引
 *     JMP $A200                    ; → bank2
 *
 *   $A200 (bank2/code_main.s): 跳板 JMP $A21B
 *     → $A21B 按任务索引 A 分发 (Bank02Service.resetEntry)
 *        A==0 → 快速初始化路径; A≠0 → 完整初始化路径
 *
 * H5 转写: 无 MMC3/bank 切换/中断/APU/VRAM, 硬件写为 no-op。
 * 用 taskIndex (对应 A 寄存器) + DispatchService.dispatch() 模拟 $C400。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchService = exports.TaskIndex = void 0;
const paletteManager_1 = require("./data/prg/ppu/pallete/paletteManager");
// ── RAM 语义键 (对应真实 ram 地址) ──
const KEY_0020 = 'ram_0020'; // PPUCTRL 镜像
const KEY_0021 = 'ram_0021'; // PPUMASK 镜像
const KEY_0022 = 'ram_0022'; // MMC3 bank 选择状态 (位组合)
const KEY_0023 = 'ram_0023'; // 当前 MMC3 选择寄存器 (已写入 $8000 的值)
const KEY_0024 = 'ram_0024'; // R6 窗口 bank 编号 ($8000-$9FFF)
const KEY_0025 = 'ram_0025'; // R7 窗口 bank 编号 ($A000-$BFFF)
const KEY_0469 = 'ram_0469'; // MMC3 R6 写入影子 (bank 状态)
/**
 * 任务索引 (对应 RESET/$C400 时 A 寄存器的值)。
 * 真实 ROM 中 A 由调用方写入后 JMP $C400 重新分发。
 */
var TaskIndex;
(function (TaskIndex) {
    /** 初始启动 (RESET A=0) → 走 $A21B 快速初始化路径 */
    TaskIndex[TaskIndex["BOOT"] = 0] = "BOOT";
})(TaskIndex || (exports.TaskIndex = TaskIndex = {}));
/**
 * Dispatch Service — 真实 RESET 分发链。
 * 暴露与 boot.ts 兼容的 init()/update() 接口, 供 src/index.ts 等引用方逐步迁移。
 */
class DispatchService {
    constructor(_store, _bank00, _bank02, 
    /** 场景路由器 (SceneRouter 接口, 兼容 BootService 的 init/update 语义) */
    _sceneRouter) {
        this._store = _store;
        this._bank00 = _bank00;
        this._bank02 = _bank02;
        this._sceneRouter = _sceneRouter;
    }
    // ══════════════════════════════════════════════════════════════
    // 公开接口 (与 boot.ts 兼容)
    // ══════════════════════════════════════════════════════════════
    /**
     * 完整 RESET 初始化 — 对应:
     *   RESET $FFF0 → $C503 → $C64E (硬件初始化) → $CEFE (MMC3+PPU 重置) → $C400 (分发器)
     *
     * @param taskIndex 任务索引 (对应 $C400 时的 A 寄存器, 默认 0)
     */
    init(taskIndex = TaskIndex.BOOT) {
        this._resetC64E();
        this._resetCEFE(taskIndex);
    }
    /**
     * 每帧更新 — 委托给场景路由器 (等价 boot.ts update 语义)。
     * 真实 ROM: $A21B 初始化后 JMP $9EED 进入 Bank00 主循环, 每帧推进。
     *
     * @returns 是否有状态变化 (兼容 boot.ts)
     */
    update(buttons, frameCount) {
        if (this._sceneRouter) {
            return this._sceneRouter.update(buttons, frameCount);
        }
        // 无场景路由器: 仍推进 Bank00 主循环 (对应 JMP $9EED)
        this._bank00.mainLoop();
        return false;
    }
    /**
     * $C400 分发器重入 — 场景代码完成后设 A=任务索引再分发。
     * 对应真实: 设 A → JMP $C400 → JMP $A200 → $A21B。
     */
    dispatch(taskIndex) {
        this._c400(taskIndex);
    }
    // ══════════════════════════════════════════════════════════════
    // $C64E: 硬件初始化
    // ══════════════════════════════════════════════════════════════
    /**
     * 对应原始 $C64E-$C6BB (RESET 硬件初始化):
     *   $C64E LDA #$08; STA $2000   ; PPUCTRL 镜像 = $08
     *   $C653 SEI / CLD / TXS        ; H5: no-op (无 CPU 中断/十进制/栈)
     *   $C658-$C661 等待 PPU VBlank ×2 ; H5: no-op (无 PPU 硬件轮询)
     *   $C662 LDA #$C0; STA $A001    ; MMC3 PRG-RAM protect (H5: no-op)
     *   $C667-$C678 清零 $0000-$07FF ; store.zp/ram 重置
     *   $C67A $20=$08 / $C67E $21=$06, $2001=$06 ; PPU 镜像
     *   $C685 $4010=0 / $C68A $4017=$40 ; APU (H5: no-op)
     *   $C692-$C69E 清 VRAM          ; store.ntClear()
     *   $C6A0 $22=0
     *   $C6A5 JSR $CB35 (NT 清零)    ; → bank00.ntClear()
     *   $C6A8 JSR $CB8B (OAM 清零)   ; → store.oam.reset()
     *   $C6AB $0469=0; STA $E000; CLI ; MMC3 + 开中断 (H5: no-op)
     *   $C6B9 LDA #$00               ; A = 任务索引 = 0
     *   $C6BB JMP $CEFE
     */
    _resetC64E() {
        const s = this._store;
        // $C64E-$C650: LDA #$08; STA $2000 (PPUCTRL: NMI on, 使用 NT0)
        s.write('ppuctrl', 0x08);
        // $C653-$C657: SEI / CLD / LDX #$FF; TXS → H5: no-op (无 CPU 状态)
        // $C658-$C661: 等待 PPU VBlank ×2 → H5: no-op
        // $C662-$C666: LDA #$C0; STA $A001 (MMC3 PRG-RAM protect) → H5: no-op
        // $C667-$C678: 清零 $0000-$07FF (8 页) → store 重置
        s.zp.fill(0);
        s.ram.clear();
        // $C67A-$C67C: LDA #$08; STA $0020 (ram_0020 = PPUCTRL 镜像)
        s.write(KEY_0020, 0x08);
        // $C67E-$C682: LDA #$06; STA $0021; STA $2001 (PPU 镜像: NMI on, 禁渲染)
        s.write(KEY_0021, 0x06);
        s.write('ppumask', 0x06);
        // $4010=0 / $4017=$40 (APU) → H5: no-op
        // 等待 VBlank + 清 VRAM ($2006 循环) → 对应 NT 清零
        // JSR $CB35 (NT/VRAM 清零)
        this._bank00.ntClear();
        // JSR $CB8B (OAM 清零, LDA #$F8 填充)
        s.oam.reset();
        // 调色板初始化 (H5 渲染层加载默认调色板)
        (0, paletteManager_1.palReset)();
        // $22=0 (MMC3 bank 选择状态清零)
        s.write(KEY_0022, 0);
        // $0469=0; STA $E000 (MMC3 R6=bank0); CLI → H5: no-op
        s.write(KEY_0469, 0);
        // LDA #$00 → 由调用方作为 taskIndex 传给 $CEFE
    }
    // ══════════════════════════════════════════════════════════════
    // $CEFE: MMC3+PPU 重置
    // ══════════════════════════════════════════════════════════════
    /**
     * 对应原始 $CEFE-$CF1C:
     *   PHA                          ; 保存任务索引 A
     *   $0469=0; STA $E000           ; MMC3 R6=bank0 (H5: no-op)
     *   JSR $CB8B (OAM 清零)         ; store.oam.reset()
     *   JSR $CB35 (NT/VRAM 清零)     ; bank00.ntClear()
     *   $2000 = ram_0020 & $7F       ; NMI off
     *   PLA                          ; 恢复任务索引 A
     *   JMP $C400                    ; 分发
     */
    _resetCEFE(taskIndex) {
        const s = this._store;
        // $0469=0; STA $E000 (MMC3) → H5: no-op, 记录影子
        s.write(KEY_0469, 0);
        // JSR $CB8B — OAM 清零
        s.oam.reset();
        // JSR $CB35 — NT/VRAM 清零
        this._bank00.ntClear();
        // $2000 = ram_0020 & $7F (NMI off)
        const ctrl = (s.read(KEY_0020) & 0x7F) & 0xFF;
        s.write(KEY_0020, ctrl);
        s.write('ppuctrl', ctrl);
        // PLA (恢复任务索引) → 传给 $C400
        this._c400(taskIndex);
    }
    // ══════════════════════════════════════════════════════════════
    // $C400: 场景分发器
    // ══════════════════════════════════════════════════════════════
    /**
     * 对应原始 $C400-$C41E:
     *   TAY                          ; A(任务索引)→Y 暂存
     *   $2000=$08, $2001=$1E         ; NMI on, BG+SPR on
     *   $22=0                        ; 清零 MMC3 bank 选择状态
     *   LDX #$00; JSR $C4B2          ; R6($8000)=bank0
     *   LDX #$02; JSR $C4B9          ; R7($A000)=bank2
     *   TYA                          ; 恢复任务索引
     *   JMP $A200                    ; → bank2 分发
     */
    _c400(taskIndex) {
        const s = this._store;
        // $2000=$08 (NMI on, NT0), $2001=$1E (BG+SPR on, 允许左8px)
        s.write('ppuctrl', 0x08);
        s.write('ppumask', 0x1E);
        // $22=0 (MMC3 bank 选择状态清零)
        s.write(KEY_0022, 0);
        // LDX #$00; JSR $C4B2 → R6 = bank0 ($8000 窗口)
        this._bankSelectR6(0x00);
        // LDX #$02; JSR $C4B9 → R7 = bank2 ($A000 窗口)
        this._bankSelectR7(0x02);
        // TYA; JMP $A200 → bank2 $A21B 分发 (按任务索引 A)
        this._a200Dispatch(taskIndex);
    }
    // ══════════════════════════════════════════════════════════════
    // $C4B2/$C4B9/$C4BD: MMC3 bank 窗口选择写入
    // ══════════════════════════════════════════════════════════════
    /**
     * $C4B2: STX ram_0024; LDA #$06; JMP $C4BD — 记录 R6, 选 $8000 窗口寄存器
     */
    _bankSelectR6(x) {
        const s = this._store;
        s.write(KEY_0024, x & 0xFF); // STX ram_0024
        this._bankSelectWrite(0x06, x); // LDA #$06; JMP $C4BD
    }
    /**
     * $C4B9: STX ram_0025; LDA #$07; JMP $C4BD — 记录 R7, 选 $A000 窗口寄存器
     */
    _bankSelectR7(x) {
        const s = this._store;
        s.write(KEY_0025, x & 0xFF); // STX ram_0025
        this._bankSelectWrite(0x07, x); // LDA #$07; JMP $C4BD
    }
    /**
     * $C4BD: ORA ram_0022 → ram_0023; STA $8000; STX $8001; RTS
     *   ram_0023 = (A | ram_0022) & 0xFF    // MMC3 bank select 值
     *   $8000 写入选择寄存器, $8001 写入 bank 编号 (H5: no-op)
     */
    _bankSelectWrite(a, x) {
        const s = this._store;
        const v = ((a | s.read(KEY_0022)) & 0xFF);
        s.write(KEY_0023, v); // STA ram_0023
        void x; // $8001 bank 编号 — H5 no-op
    }
    // ══════════════════════════════════════════════════════════════
    // $A200 → $A21B: bank2 场景分发
    // ══════════════════════════════════════════════════════════════
    /**
     * 对应原始 $A200 (bank2): JMP $A21B → RESET 后首个业务入口。
     * $A21B 按任务索引 A 分发 (Bank02Service.resetEntry 已翻译):
     *   A==0 → 快速初始化路径; A≠0 → 完整初始化路径。
     */
    _a200Dispatch(taskIndex) {
        this._bank02.resetEntry(taskIndex & 0xFF);
    }
}
exports.DispatchService = DispatchService;
