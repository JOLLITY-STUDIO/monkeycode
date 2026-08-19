/**
 * 教程拼图数据（How to Play）—— 原版 Picross DS 教程 5x5 拼图
 * 由 ROM 教程文本（MESSAGES[37]~[89]）复原：
 *
 *   ###.#   行提示 3,1
 *   #####          5
 *   #####          5
 *   #####          5
 *   #....          1
 *  列提示: 5 4 4 3 4
 *
 * 教学流程（原版逐步）：
 *   1) 列 0 提示 5 → 整列涂满
 *   2) 行 0 提示 3,1 → 涂前 3 格 + 最后 1 格，中间留空
 *   3) X Mode → 在 (3,0) 画 X
 *   4) 列 3 提示 3 → 填 X 下方 3 格
 *   5) X Mode → (3,4) 画 X（列 3 上下已确认空格）
 *   6) 行 0 → 填 X 右侧格 (4,0)
 *   7) 行 1 单数字 5 → 连接已填格，填 (1,1),(2,1)
 *   8) 列 4 提示 4 → 填中间 3 格 (4,1),(4,2),(4,3)
 *   9) 自行推理完成剩余 4 格
 *
 * solution 位图: 1bpp 行主序连续位流，MSB-first（引擎 isSolutionCell）
 *   线性位 11101 11111 11111 11111 10000 → 字节 EF FF F8 00
 */
import { PuzzleData } from "./puzzles";

export const TUTORIAL_PUZZLE: PuzzleData = {
  id: -1,
  name: "How to Play",
  width: 5,
  height: 5,
  difficulty: 0, // Tutorial
  unlocked: true,
  solutionHex: "EFFFF800",
};
