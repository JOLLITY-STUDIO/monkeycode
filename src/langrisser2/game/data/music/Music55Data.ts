/**
 * Music55Data.ts — BGM 55 硬编码数据
 *
 * 由脚本生成: scripts/generate-music-data.mjs
 * 来源: Langrisser II (Japan) ROM
 *
 * 运行时不需要 ROM, 所有数据硬编码为 TS 常量
 */

/** Music data size */
export const MUSIC_55_SIZE = 162;

/** Music data (YM2612 command stream, Base64 encoded) */
export const MUSIC_55_DATA_BASE64 = 'AAEAmwCbAJsAmwCbAJv//QAFAAT/+wACAAkAIQAiACAAMAAwACMAJAAgADkAOf/7AAIADAB3AHUAegB/AHIAIAAgACAAIAAw//0AYwBj//sACQAGACcAJv/+//7//gAlACgAIAAgACAAPv/+ACUAJgAgACAAIP/+//4AIAB3AFsAcwBcAHL//gAhACsAIAAxACAAIwArACAAMf/7AAEAAf/9';

/** Decode Base64 to Uint8Array */
export function decodeMusic55Data(): Uint8Array {
  const binary = atob(MUSIC_55_DATA_BASE64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
