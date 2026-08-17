/**
 * 拼图加载器 —— 将声明式拼图数据（PuzzleData）转换为引擎所需的 Puzzle
 * C4: 对应 WBS-C4（数据 → 引擎桥接）
 */
import { Puzzle } from "./types";
import { PuzzleData } from "../data/puzzles";

/** hex 字符串（1bpp 行主序）→ Uint8Array */
export function hexToBytes(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
}

/** PuzzleData → Puzzle（供引擎使用） */
export function puzzleFromData(d: PuzzleData): Puzzle {
  return {
    id: d.id,
    name: d.name,
    width: d.width,
    height: d.height,
    difficulty: d.difficulty,
    unlocked: d.unlocked,
    solution: hexToBytes(d.solutionHex),
  };
}
