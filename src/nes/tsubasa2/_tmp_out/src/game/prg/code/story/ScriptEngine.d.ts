/**
 * ScriptEngine — 剧情脚本虚拟机
 * @bank 00 (脚本分派器 $84E7, 等待帧表 $8AE6, 长指令表 $8545)
 *
 * 职责: 逐帧执行文本脚本指令流, 驱动对话/剧情场景。
 *
 * 分派器 $84E7:
 *   < 0xD8    普通字符 → 字符处理 $88CA
 *   0xD8-0xDF 等待帧 (查 $8AE6 表)
 *   0xE1-0xE7 行编辑
 *   0xE8-0xFF 长指令 (查 $8545 表)
 *
 * 脚本流指针: ram_004D/004E; 文本位置: ram_0051/0052 (VRAM), 0053/0054 (字符位置)。
 *
 * 命名规范: 旧名 ScriptVM → 新名 ScriptEngine。
 */
import { DataStore } from '../../data/store/DataStore';
export declare class ScriptEngine {
    protected _store: DataStore;
    /** GameSystemService 引用 (调色板加载/tableLoad 等委托 system) */
    protected _system: import('../system/GameSystemService').GameSystemService | null;
    /** PPU buffer 写入位置指针 (原 asm $0000 in $9B28 context, H5 用类成员避免与协程槽冲突) */
    protected _bufWritePos: number;
    /** 让帧标志 — 等待类指令 (waitFrame/fadeIn/fadeOut/waitAnim/spriteFlip) 置位, update 返回 true */
    protected _yieldFrame: boolean;
    /** 脚本流指针 (ram_004D/004E) */
    protected get scriptPtr(): number;
    protected set scriptPtr(v: number);
    constructor(store: DataStore);
    /** 注入 GameSystemService (调色板加载/tableLoad 委托) */
    setSystem(sys: import('../system/GameSystemService').GameSystemService): void;
    /** 装载脚本 id (原 $8464 scriptLoader) */
    loadScript(scriptId: number): void;
    /** 填充属性区 (原 $84B0-$84BE ppuFill) */
    private fillAttribute;
    /**
     * 每帧推进脚本 (原脚本分派器 $84E7)。
     * 普通指令同帧连续执行, 遇等待类指令 (waitFrame/fadeIn/fadeOut/waitAnim 等) 返回 true 让帧。
     * 用 ram_0056 (脚本 bank) 判断是否已装载 (ScriptLoader.load 设 ptr=0 是合法值, 不能用 ptr===0 判断)。
     *
     * @returns true = 本帧需让出 (等待类指令已执行, 下帧继续), false = 可同帧继续执行
     */
    update(frame: number): boolean;
    /** 分派一步 (原 $84E7) */
    step(): void;
    /** 读脚本流当前字节 (不推进指针) */
    private readScriptByte;
    /** 当前脚本流 (来自 ScriptLoader 装载的 flatten 场景段字节流, 缓存在 DataStore) */
    private scriptStream;
    /** 推进脚本指针 A 字节并返回 (原 $8879) */
    private advancePtr;
    /** 读脚本流当前字节并推进 (原读取序列) */
    private readByteAdvance;
    /** 普通字符 (原 $84EF 字符分支 + $88CA) */
    private handleChar;
    /** 写字符 tile (原 $88CA) */
    private writeCharTiles;
    /** 行换行处理 (原 $895D) */
    private handleLineWrap;
    /** 等待帧指令 0xD8-0xDF (原 $8504 分支) */
    private handleWaitFrame;
    /** $899A 设精灵标志 */
    private setSpriteFlag;
    /** 行编辑指令 0xE1-0xE7 (原 $851C 分支) */
    private handleLineEdit;
    /** 长指令 0xE8-0xFF (原 $8537 分支 → 跳处理器) */
    private handleLongOp;
    /** $E8 $8574: tableLoad — 读参数并加载场景表, 推进 2 */
    private opTableLoad;
    /** $E9 $857F: fadeIn */
    private opFadeIn;
    /** $EA $858C: fadeOut + 清屏 */
    private opFadeOutClear;
    /** $EB $85C3: 动画序列 */
    private opAnimSeq;
    /** $EC $85D1: 文本字符序列 */
    private opTextSeq;
    /** $ED $85EB: 查找空场景槽 ($0700-X) */
    private opFindSlot;
    /** $EE $8603: 清文本区 */
    private opClearText;
    /** $EF $8617: 精灵翻转标志 */
    private opSpriteFlip;
    /** $F0 $862B: 文本位置设置 (读 2 字节到 $004F/$0050) */
    private opTextPos;
    /** $F1 $8649: 文本指针 (bank06) */
    private opTextPtr;
    /** $F2 $8677: 行长度设置 */
    private opLineLen;
    /** $F3 $8681: 调色板设置 */
    private opPalette;
    /** $F4 $86B7: 子指令分发 */
    private opSubDispatch;
    /** $F5 $87B7: 脚本指针设置 */
    private opSetPtr;
    /** $F6 $87CA: 等待+动画 */
    private opWaitAnim;
    /** $F7 $87D8: 标志切换 */
    private opToggle;
    /** $F8 $87F7: 外部调用 (bank02) */
    private opExternal;
    /** $F9 $8813: $005B 位操作 (读 1 字节操作数, bit7 决定 set/clear bit2) */
    private opFlagBit;
    /** $FA $881A: sceneLoad */
    private opSceneLoad;
    /** $FB $8830: 清文本 buffer + sub9085 场景数据装载 + 继续 */
    private opClearBuf;
    /** $FC $8836: 等待 + 文本 VRAM 前进 */
    private opVramAdvance;
    /** $FD $8854: 填充 + 等待 */
    private opFillWait;
    /** $FE $8861: 跳转 (读 2 字节指针) */
    private opJump;
    /** $FF $886F: 脚本结束 */
    private opEnd;
    private subFadeInBg;
    private subFadeInSpr;
    private subWait;
    private subPalAnim;
    private subClearSprites;
    private tableLoad;
    private fadeIn;
    private fadeInSpr;
    private fadeOut;
    private initHelper;
    private ntClear;
    private mainLoopInit2;
    private mainInitParam;
    private mainInitParamBgOnly;
    private mainInitParamSprOnly;
    private animateSprites;
    private fillText;
    private clearTextRegion;
    private clearTextBuffer;
    private callExternal;
    private sceneLoad;
    /** 帧等待 (原 JSR $9FA8 语义) */
    private waitCounter;
}
export default ScriptEngine;
