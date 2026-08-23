/**
 * SpriteAnimationService — 动画数据加载 + 动画帧推进
 * @bank 27 ($8000-$9FFF; CPU 窗口 $A000-$BFFF, 物理偏移 = addr - $A000)
 *
 * 翻译自 asm/bank27/code_main.s:
 *   $8104 动画数据加载 (INDEX_A1DC → PTR_A6AD/PTR_AB65 指针链)
 *   $81DC 动画帧推进 (ANIM_PTR_A292 流解码 + ANIM_FRAME_PTR_A42A 帧写 OAM 缓冲)
 *
 * 依赖共享子程 (bank30 固定区):
 *   $C50C ($CD7C) 球员记录指针查表 ($0300 + idx*0x0C)
 *   $C536 ($CDC9) 坐标→tile 网格 (12 格坐标除/余)
 *   $C539 ($CDE2) 像素坐标→OAM 槽索引 (越界 $FF)
 *   $C527 ($CE08) 跨 bank 调用 bank28 (比赛域) — H5 由 MatchEngineService 负责
 *
 * 命名规范: 旧名 Bank27Service → 新名 SpriteAnimationService。
 */
import { DataStore } from '../../data/store/DataStore';
export declare class SpriteAnimationService {
    protected _store: DataStore;
    /** 动画定义流指针 (原 $0063/$0064, CPU $A000-$BFFF 地址) */
    protected _animPtr: number;
    constructor(store: DataStore);
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    protected rdPtr(lo: number, hi: number): number;
    /** 读 bank27 数据字节 (addr = CPU $A000-$BFFF) */
    private _read27;
    /** $CD7C (JSR $C50C) — 球员记录指针: $0034/$0035 = $0300 + idx*0x0C */
    private _playerRecordPtr;
    /** $CDC9 (JSR $C536) — 坐标→tile 网格: A=12 格坐标, X=0x34+8*商, Y=0x54+8*余 */
    private _coordToTile;
    /** $CDE2 (JSR $C539) — 像素坐标→OAM 槽索引 (越界返回 $FF) */
    private _coordToOamSlot;
    /** $CE08 (JSR $C527) — 跨 bank 调用 (bank28 比赛域精灵构建)。H5 由 MatchEngineService 接线 */
    protected _invokeMatchBuild(_bankId: number): void;
    loadAnim(returnAddrLo: number, idx: number): void;
    update(frame: number): void;
    /** 读动画定义流字节 (相对 $0063 指针) */
    private _readAnimByte;
    /** 读帧数据字节 (相对帧指针) */
    private _readFrameByte;
    /** 写球员记录字节 (记录基址 = $0034/$0035) */
    private _writeRecordByte;
    /** 读球员记录字节 */
    private _readRecordByte;
    /** $8254-$827E — 帧写循环: 流 (首字节=精灵数N, N×3B 精灵, 0 终止) → $04A5+X */
    private _writeFrame;
}
export default SpriteAnimationService;
