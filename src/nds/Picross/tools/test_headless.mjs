#!/usr/bin/env node
/**
 * 无界面测试：验证引擎逻辑（先跑 tools/build_web.cjs 再执行）
 * 覆盖：错误计数、完成检测、清除、画叉、提示满足状态
 * 运行: node --experimental-specifier-resolution=node tools/test_headless.mjs
 */
import { PicrossEngine } from "../test-build/core/engine.js";
import { PUZZLES } from "../test-build/data/puzzles.js";

const solHexToBytes = (hex) => {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
};

let failures = 0;
const check = (name, cond) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) failures++;
};

// 使用 P2（fc631f80 = 空心方块）做完整流程测试
const d = PUZZLES[1];
const puzzle = {
  id: d.id, name: d.name, width: d.width, height: d.height,
  difficulty: d.difficulty, unlocked: d.unlocked,
  solution: solHexToBytes(d.solutionHex),
};

const sol = puzzle.solution;
const isCell = (x, y) => (sol[(y * 5 + x) >> 3] >> (7 - ((y * 5 + x) & 7))) & 1;

const engine = new PicrossEngine(puzzle, {
  onSolved: (s) => console.log("  [onSolved] elapsed=" + s.elapsedSec + " mistakes=" + s.mistakes),
});

check("初始未完成", !engine.getState().solved);
check("初始填充 0", engine.getState().filledCount === 0);
check("提示行数=5", engine.getState().rowHints.length === 5);
check("提示列数=5", engine.getState().colHints.length === 5);

// 1) 故意填错一个空单元格 → 失误 +1
engine.tapCell(2, 2, "mark", "filled");
check("误填失误计数=1", engine.getState().mistakes === 1);

// 2) 清除错误格，改填一个正确格 → 失误不增
engine.clearCell(2, 2);
engine.tapCell(0, 0, "mark", "filled");
check("清除+正确填不增失误", engine.getState().mistakes === 1);

// 3) 画叉再清除 → 失误不增
engine.tapCell(1, 1, "mark", "crossed");
engine.tapCell(1, 1, "mark", "empty");
check("画叉不增失误", engine.getState().mistakes === 1);

// 4) 按解法填充所有剩余格子 → 完成
for (let y = 0; y < 5; y++) {
  for (let x = 0; x < 5; x++) {
    if (isCell(x, y) && engine.getState().marks[y * 5 + x] !== "filled") {
      engine.tapCell(x, y, "mark", "filled");
    }
  }
}
const final = engine.getState();
check("全部正确后 solved", final.solved);
check("进度 100%", final.filledCount === final.totalFilled);
check("提示全部满足", final.rowHints.every((h) => h.satisfied) && final.colHints.every((h) => h.satisfied));
check("失误总数=1", final.mistakes === 1);

// 5) 完成后再操作被忽略（marks 不变）
const marksBefore = final.marks.slice();
engine.tapCell(0, 0, "cycle");
check("完成后操作忽略", engine.getState().marks.every((m, i) => m === marksBefore[i]));

engine.destroy();

// 6) 三题数据均合法且可解
for (const p of PUZZLES) {
  const pp = { ...p, solution: solHexToBytes(p.solutionHex) };
  const e2 = new PicrossEngine(pp, {});
  check(`数据 ${p.id} 合法(尺寸${p.width}x${p.height})`, e2.getState().totalFilled > 0);
  e2.destroy();
}

console.log(failures === 0 ? "\nALL PASS" : `\n${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
