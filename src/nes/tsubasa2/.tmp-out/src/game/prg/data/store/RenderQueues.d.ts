/**
 * RenderQueues — 类型化渲染队列（替代 InterruptService 字节流解析）
 *
 * 翻译原则（v2）：
 *   - 禁止 InterruptService 直接按字节解析 `[count|0x80][addrLo][addrHi][data×count]`
 *   - 队列条目应是类型化的：NtRowEntry / RleEntry 等结构
 *   - 内部仍可维护字节流形态（向后兼容），但消费侧通过类型化视图访问
 *
 * 历史：原 InterruptService.flushNtBuffer 把 $05E8 缓冲按位/字节解析，
 *       flushRenderQueue 按 LIFO 消费字节流队列，每条解析为 bank + ptr + RLE 流。
 *       这些都是 CPU 时代的"按 RAM 字节解码"残留，H5 应是类型化队列。
 */
import type { RenderQueueView } from './RamViews';
/** NT 渲染条目（按行写入） */
export interface NtRowEntry {
    /** 行模式（false）或列模式（true，原 bit7=1） */
    readonly vertical: boolean;
    /** 目标 NT 地址（$2000-$3FFF） */
    readonly ntAddr: number;
    /** 数据字节序列 */
    readonly data: ReadonlyArray<number>;
}
/** RLE 块条目（第一队列 / 第二队列） */
export interface RleEntry {
    /** 计数 */
    readonly count: number;
    /** 目标地址 */
    readonly addr: number;
    /** 数据 */
    readonly data: ReadonlyArray<number>;
}
/** 消费 NT 渲染缓冲：解析为具名条目数组 */
export declare function consumeNtBuffer(view: RenderQueueView): NtRowEntry[];
/** 追加 NT 渲染条目到缓冲（写入由 Scene0Controller / RenderingPrimitives 触发） */
export declare function appendNtBuffer(view: RenderQueueView, entry: NtRowEntry): boolean;
