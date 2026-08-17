/**
 * 拼图数据 —— 由 tools/extract_puzzles.py 生成
 *
 * TODO(B1): file_94 记录格式确认后，将 STUB 替换为真实解析数据。
 * 当前为 3 个 5x5 教程拼图（打通渲染/交互链路用）。
 * 格式：solution 为 1bpp 行主序位图（hex 字符串），1=填充，MSB 优先。
 */
export interface PuzzleData {
  id: number;
  name: string;
  width: number;
  height: number;
  difficulty: number;
  unlocked: boolean;
  solutionHex: string;
}

export const PUZZLES: PuzzleData[] = [
  {
    id: 0,
    name: "Tutorial 1",
    width: 5,
    height: 5,
    difficulty: 0,
    unlocked: true,
    solutionHex: "ffffff80",
  },
  {
    id: 1,
    name: "Tutorial 2",
    width: 5,
    height: 5,
    difficulty: 0,
    unlocked: true,
    solutionHex: "fc631f80",
  },
  {
    id: 2,
    name: "Tutorial 3",
    width: 5,
    height: 5,
    difficulty: 0,
    unlocked: true,
    solutionHex: "fc6b1f80",
  },
];
