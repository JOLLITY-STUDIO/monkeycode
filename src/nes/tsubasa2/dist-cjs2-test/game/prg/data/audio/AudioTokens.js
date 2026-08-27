"use strict";
/**
 * AudioTokens — 音频命令流类型化（声明式 token 序列）
 *
 * 原 NES 音频命令流是一段连续字节：
 *   < $80           音名（低 4 位 = 半音索引，高 4 位 = 八度右移次数）
 *   $80-$AF         时值（& $3F 查 DURATION_TABLE）
 *   $B0-$DF         速度（跳过 1 个参数字节）
 *   >= $E0          命令（& $1F 查 COMMAND_TABLE）
 *
 * H5 直接翻译为具名 token 数组：
 *   NoteToken / DurationToken / SpeedToken / CommandToken
 *
 * 注意：保留字节 token 形态（AudioTokenByte）用于原 ROM 提取阶段
 *       尚未完成 token 化的中间表示；最终 SONGS 表项统一使用具名 token。
 */
Object.defineProperty(exports, "__esModule", { value: true });
