/**
 * Music28Data.ts — BGM 28 硬编码数据
 *
 * 由脚本生成: scripts/generate-music-data.mjs
 * 来源: Langrisser II (Japan) ROM
 *
 * 运行时不需要 ROM, 所有数据硬编码为 TS 常量
 */

/** Music data size */
export const MUSIC_28_SIZE = 211;

/** Music data (YM2612 command stream, Base64 encoded) */
export const MUSIC_28_DATA_BASE64 = 'vr/AwcLDxMrLzM3OysvMzc6zLD+lsKeoqaqrrK2uryAxMjM0NTY3ODkw19243tivu7D/sdnKu96wxN7//wLGAyYAYQGwAsMAdQBs//8ANwA4ADn//gA6ADv//v//////+QAA//oAAP/8AAH/+AAA//sAAAAA//0ACAABAJcAmACYAJgAmACYAJgAmf/7AAAABwCcAJ0AnQCdAJ0AnQCdAJ7//QABAAb/+wAAAAEAmgCaAJoAmgCaAJr/+wAHAAEAmwCbAJsAmwCbAJv/+wABAAH//Q==';

/** Decode Base64 to Uint8Array */
export function decodeMusic28Data(): Uint8Array {
  const binary = atob(MUSIC_28_DATA_BASE64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
