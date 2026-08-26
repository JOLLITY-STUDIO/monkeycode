/**
 * DataStoreVram — VRAM 写透目标契约（独立文件，避免 DataStore 循环依赖）
 */
/** VRAM 写透目标（原版 $2006/$2007 直写语义；core PPU 满足该结构） */
export interface VramTarget {
    writeMem(address: number, value: number): void;
}
