/**
 * SpriteAnimationService — 精灵动画推进
 *
 * 行为翻译（bank19/code_main.s 精灵动画/帧推进例程）：
 * - advance()  → 每帧调用：递增各精灵动画帧计数器；超区间时跳到下一帧
 * - tickAnimationSlot(slot, maxFrames)：单精灵动画推进
 * - flipSpriteAttr(slot, bitMask)：属性翻转（用于眨眼/方向翻转效果）
 *
 * 关键 RAM：
 *   ram_046C-$046F  4 精灵动画 tick 计数（每 4 字节位图）
 *   ram_0468+i*4 OAM 影子缓冲（4 字节 [y, tile, attr, x]）
 *   bank19 animation sequence 字节流（BANK19_SPRITE_FRAMES + animation slot 表）
 *
 * 翻译原则（v2）：
 *   - 禁止以 RAM 地址当业务字段
 *   - 通过 DataStore 具名视图（OamView.spriteY 等）操作
 *   - 行为镜像 asm $81-8A 区段（精灵闪烁 $84A1 / 帧切换 $8083 / pal 切换 $814C）
 *
 * 当前：V0.5 stub 实现已落地（基础 advance + attr 翻转）。
 */
import type { DataStore } from '../../data/store/DataStore';
export declare class SpriteAnimationService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /**
     * 推进所有精灵动画帧。
     * 简化策略：每帧 tick+1（由各 sprite 调用方控制具体翻转逻辑）。
     */
    advance(): void;
    /**
     * 推进单个精灵动画槽位 tick。
     *
     * @param slot      精灵 slot (0..63)
     * @param maxFrames 最大帧数（> maxFrames 时 tick 回 0）
     */
    tickAnimationSlot(slot: number, maxFrames: number): number;
    /**
     * 属性字节翻转（用于眨眼/方向切换/淡入淡出）。
     *
     * @param slot    精灵 slot
     * @param bitMask 要翻转的属性位（bit6=flipX, bit5=priority, bit3=ink）
     */
    flipSpriteAttr(slot: number, bitMask: number): void;
    /**
     * 设置精灵属性位（用于艺术状态切换：palette/priority/flip）。
     */
    orSpriteAttr(slot: number, bitMask: number): void;
    /**
     * 清除精灵属性位。
     */
    andSpriteAttr(slot: number, bitMask: number): void;
    /**
     * 闪烁效果：所有屏外精灵 attr |= $08，等待 1 帧。
     * 对应 asm $92A0-$92D4 例程（精灵 blink）。
     */
    blinkOffscreenSprites(): void;
}
