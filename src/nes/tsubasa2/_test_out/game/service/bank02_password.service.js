"use strict";
/**
 * Bank 02 PASSWORD 场景 — 密码输入/验证。
 *
 * 对应真实 ROM (2026-08 逆向, bank2 运行时 $A000 窗口, ROM 文件偏移 0x4010 基址):
 *   入口: bank2 $A200 跳转表第7项 $8212: JMP $A484
 *   $A484 ($8484): 间接跳转分发器
 *     LDA ram_00ED; ASL; TAX; LDA $A492,X; PHA; LDA $A491,X; PHA; RTS
 *     地址表 @ $A491 (反汇编$8491), 每项2字节小端, 索引=ram_00ED
 *   idx0 ($A4C0): 密码输入主逻辑 (初始化链已翻译在 Bank02Service.entryF(0)):
 *     JSR $9A0D (帧等待/让出); LDA #$10; JSR $9FA8 (让出 0x10 帧)
 *     LDY #$30; 循环 48 次 { JSR $9FA8(1) 让出 + JSR $890C 写 NT 字符 } → 48 字符网格
 *     LDA #$17; JSR $8AF7 (Cut 0x17 标题背景); LDA #$68; STA ram_0044 (滚动)
 *     后续: 调色板/PPU/清屏/块填充
 *
 *   密码模式入口 (真实调度): bank0 $82E8 读 ram_0057; BMI $8338 (bit7=密码模式)
 *     $8338: CMP #$81; BEQ $83A3 (校验通过续关载入路径)
 *     $833C (输入模式): 33 槽位初始化 (ram_0468 起, 步长4, Y步长3, X步长13,
 *       tile=(ram_00EC&1)|$F2, attr=3) + $8372 字符集钳制动画循环
 *       (CMP $AB1F,Y / ADC $AB21,Y / ADC $AB22,Y, Y=槽位&$0C → 4组字符集上限)
 *     $83A3 (续关载入): ram_0568 |= $10; 滚动动画 ram_0044/0046/056D
 *
 *   AB1F 字符集表 (ROM 0x4B2F, 16字节, 每4字节一组 [上限, tile增量, X增量, ?]):
 *     [6c 00 04 fc] [6e 00 05 fc] [70 00 06 fa] [74 00 07 fa]
 *   AB1F+0x10: 光栅/字母映射 "XEQUSGFRTWZ HIKLM" (16字符)
 *
 * H5 转写: PasswordController 管理 ram_00ED 索引分发 + 密码输入循环。
 * 输入模型 (对齐 ROM 48 字符网格 + 16 槽位 2×8):
 *   - 16 个密码槽位按 2 行 × 8 列网格排布, 方向键在槽位间移动
 *   - A 循环递增当前槽位字符 (0-9 + A-Z, 36 字符集), B 递减
 *   - START 确认 → 三态结果 (success/fail/continue)
 *   FIXME: 真实输入是 33 槽位假名网格光标选择 (AB1F 表驱动字符集钳制动画),
 *          16 槽位 A/B 增量模型是 H5 简化, 待假名网格输入 trace 后替换。
 *
 * 真实密码验证算法 (校验通过→ram_0057=$81→$83A3 续关载入) 待从 ROM
 * 校验子程序 + 模拟器 trace 抠出 (TODO, 不编造数据)。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordController = exports.PASSWORD_SLOT_X_STEP = exports.PASSWORD_SLOT_Y_STEP = exports.PASSWORD_SLOT_STEP = exports.PASSWORD_SLOT_COUNT = exports.PASSWORD_ALPHA_MAP = exports.PASSWORD_AB1F_CHARSET = exports.PASSWORD_CHARSET = exports.PASSWORD_GRID_LEN = exports.PASSWORD_COLS = exports.PASSWORD_CHAR_COUNT = exports.PASSWORD_DISPATCH_TABLE = void 0;
exports.passwordCharToTile = passwordCharToTile;
const types_1 = require("../../core/types");
/** $A491 地址表 (idx→运行时$A4xx目标, 16项) — 对应 $8484 分发器 */
exports.PASSWORD_DISPATCH_TABLE = [
    0xA4C0, 0xA559, 0xA57B, 0xA581, 0xA5A2, 0xA5A8, 0xA5B0, 0xA5B8,
    0xA5BF, 0xA5CD, 0xA5DB, 0xA5E8, 0xA602, 0xA61C, 0xA629, 0xA650,
];
/** 密码字符槽位数 (idx0: LDA #$10 → 16 槽) */
exports.PASSWORD_CHAR_COUNT = 0x10;
/** 每行槽位数 (2 行 × 8 列) */
exports.PASSWORD_COLS = 8;
/** 密码字符数据长度 (idx0: LDY #$30 → 48 字节 字符网格) */
exports.PASSWORD_GRID_LEN = 0x30;
/**
 * 密码字符集 (0-35) → 显示字符:
 *   0-9   → '0'-'9' (CHR tile $02-$0B)
 *   10-35 → 'A'-'Z' (CHR tile $41-$5A)
 * 对应 char-map.ts $88CA 文本字符规则 (单 tile 直接映射)。
 */
exports.PASSWORD_CHARSET = (() => {
    const t = [];
    for (let i = 0; i < 10; i++)
        t.push(String.fromCharCode(0x30 + i)); // 0-9
    for (let i = 0; i < 26; i++)
        t.push(String.fromCharCode(0x41 + i)); // A-Z
    return t;
})();
/** 字符值 (0-35) → CHR tile 索引 ($02-$0B / $41-$5A) */
function passwordCharToTile(ch) {
    if (ch >= 0 && ch < 10)
        return 0x02 + ch;
    if (ch >= 10 && ch < 36)
        return 0x41 + (ch - 10);
    return 0;
}
/**
 * 真实 ROM $AB1F 字符集钳制表 (ROM 偏移 0x4B2F, 16 字节, 每 4 字节一组):
 *   [字符集上限, tile 增量, X 增量, ?]
 * 槽位索引 & $0C → 组号 (0/4/8/12), 驱动 $8372 字符集钳制动画循环:
 *   LDA ram_0468,X; CMP $AB1F,Y; BCC skip; LDA #$00
 *   CLC; ADC $AB21,Y; STA ram_0468,X (tile 钳制+增量)
 *   LDA ram_046B,X; CLC; ADC $AB22,Y; STA ram_046B,X (X 位移增量)
 */
exports.PASSWORD_AB1F_CHARSET = [
    0x6c, 0x00, 0x04, 0xfc,
    0x6e, 0x00, 0x05, 0xfc,
    0x70, 0x00, 0x06, 0xfa,
    0x74, 0x00, 0x07, 0xfa,
];
/** 真实 ROM $AB1F+0x10 光栅/字母映射 (16 字符: "XEQUSGFRTWZ HIKLM") */
exports.PASSWORD_ALPHA_MAP = 'XEQUSGFRTWZ HIKLM'.split('');
/**
 * 真实 ROM 密码输入槽位布局 ($833C 初始化, ram_0468 起):
 *   - 槽位地址步长 4 (Y/tile/attr/X), X 从 $78 到 $FC (33 槽)
 *   - Y 坐标步长 3 (0,3,6,...,96), X 坐标步长 13 (0,13,26,...,&$FF 回绕)
 *   - tile = (ram_00EC & 1) | $F2, attr = $03
 */
exports.PASSWORD_SLOT_COUNT = 33;
exports.PASSWORD_SLOT_STEP = 4;
exports.PASSWORD_SLOT_Y_STEP = 3;
exports.PASSWORD_SLOT_X_STEP = 13;
/**
 * 密码输入控制器 — 对应 bank2 $A484 分发 + idx0 $A4C0 主逻辑。
 */
class PasswordController {
    constructor(_store) {
        this._store = _store;
        /** 当前密码槽位索引 (0-15) */
        this._charIdx = 0;
        /** 已输入字符 (16个, 每个0-35) */
        this._chars = new Array(exports.PASSWORD_CHAR_COUNT).fill(0);
        /** 是否已完成 (START 确认) */
        this._done = false;
        /** 最近确认结果 (0=未确认 1=成功 2=失败) */
        this._result = 0;
        /** 帧计数 (驱动光标闪烁) */
        this._frame = 0;
    }
    /**
     * 初始化密码输入场景 — 对应 $A4C0:
     *   加载字符网格 + Cut 0x17 背景 + 滚动 + ram_00ED 分发。
     *
     * 注: 真实 $A4C0 初始化链 (字符网格 NT/背景/调色板/滚动) 已完整翻译在
     * Bank02Service.entryF(0) (_jumpHandler_00_A4C0), 由 boot._passwordCoroutine
     * 在 init() 之后委派执行; 此处只负责输入状态与 ram_00ED 分发索引。
     *
     * @param matchIdx ram_00ED 值 (决定 $A484 分发目标, 密码输入通常 idx0)
     */
    init(matchIdx = 0) {
        // ram_00ED 设为密码场景索引 (idx0 = $A4C0 密码输入主逻辑)
        this._store.write('ram_00ED', matchIdx);
        this._charIdx = 0;
        this._chars = new Array(exports.PASSWORD_CHAR_COUNT).fill(0);
        this._done = false;
        this._result = 0;
        this._frame = 0;
    }
    /**
     * 每帧更新密码输入 — 对应 $A4C0 主循环。
     *
     * 输入模型 (H5 转写, ROM 语义): 16 槽位 2×8 网格,
     *   LEFT/RIGHT 水平移动, UP/DOWN 垂直换行, A 递增字符, B 递减字符,
     *   START 确认 → 校验 → success / fail。
     *
     * @param pressed 本帧按下 (边沿, boot.update 已做上升沿检测)
     * @returns 确认结果三态
     */
    update(pressed) {
        this._frame++;
        if (this._done)
            return 'continue';
        // 槽位光标移动 (2 行 × 8 列网格, 循环)
        if (pressed & types_1.BUTTON.LEFT) {
            this._charIdx = (this._charIdx + exports.PASSWORD_COLS - 1) % exports.PASSWORD_COLS
                + Math.floor(this._charIdx / exports.PASSWORD_COLS) * exports.PASSWORD_COLS;
        }
        if (pressed & types_1.BUTTON.RIGHT) {
            const row = Math.floor(this._charIdx / exports.PASSWORD_COLS);
            this._charIdx = ((this._charIdx + 1) % exports.PASSWORD_COLS) + row * exports.PASSWORD_COLS;
        }
        if (pressed & types_1.BUTTON.UP) {
            this._charIdx = ((this._charIdx + exports.PASSWORD_COLS - exports.PASSWORD_CHAR_COUNT) % exports.PASSWORD_CHAR_COUNT + exports.PASSWORD_CHAR_COUNT) % exports.PASSWORD_CHAR_COUNT;
        }
        if (pressed & types_1.BUTTON.DOWN) {
            this._charIdx = (this._charIdx + exports.PASSWORD_COLS) % exports.PASSWORD_CHAR_COUNT;
        }
        // 字符选择: A 递增 / B 递减 (0-35 循环)
        if (pressed & types_1.BUTTON.A) {
            this._chars[this._charIdx] = (this._chars[this._charIdx] + 1) % exports.PASSWORD_CHARSET.length;
        }
        if (pressed & types_1.BUTTON.B) {
            this._chars[this._charIdx] = (this._chars[this._charIdx] + exports.PASSWORD_CHARSET.length - 1) % exports.PASSWORD_CHARSET.length;
        }
        // START 确认 → 校验
        if (pressed & types_1.BUTTON.START) {
            this._done = true;
            if (this._verifyPassword()) {
                this._result = 1;
                return 'success';
            }
            this._result = 2;
            return 'fail';
        }
        return 'continue';
    }
    /**
     * 密码校验 — 对应 ROM 密码验证子程序。
     *
     * 真实流程 (已确认): 校验通过 → ram_0057=$81 → $82E8 BMI $8338 → CMP #$81
     * BEQ $83A3 (续关载入动画: ram_0568|=0x10 + 滚动)。校验子程序本体尚未定位
     * (需模拟器 trace START 确认帧), 待抠出后替换。
     *
     * TODO(占位实现): 天使之翼2 密码为 16 字符, 每字符映射 5-bit 值
     * (80 bit = 10 字节续关数据 + 校验和)。当前占位:
     *   校验和 = Σ(字符值) & 0x3F == 末位字符值 → 通过。
     * 待 ROM 校验子程序定位后替换为真实算法 (不编造数据)。
     */
    _verifyPassword() {
        // 16 槽位必须全部输入过 (非初始 0) 才可确认
        for (let i = 0; i < exports.PASSWORD_CHAR_COUNT; i++) {
            if (this._chars[i] === 0)
                return false;
        }
        // 占位校验: 前 15 字符值和 & 0x3F == 第 16 字符值
        let sum = 0;
        for (let i = 0; i < exports.PASSWORD_CHAR_COUNT - 1; i++) {
            sum = (sum + this._chars[i]) & 0x3F;
        }
        return sum === this._chars[exports.PASSWORD_CHAR_COUNT - 1];
    }
    /** 是否已完成 */
    isDone() { return this._done; }
    /** 当前槽位索引 */
    getCharIdx() { return this._charIdx; }
    /** 已输入字符 */
    getChars() { return this._chars.slice(); }
    /** 当前显示状态快照 (View 层消费, 写 NT/OAM) */
    getDisplayState() {
        return {
            charIdx: this._charIdx,
            chars: this._chars.slice(),
            done: this._done,
            charCount: exports.PASSWORD_CHAR_COUNT,
            cols: exports.PASSWORD_COLS,
            charset: exports.PASSWORD_CHARSET,
            result: this._result,
        };
    }
}
exports.PasswordController = PasswordController;
