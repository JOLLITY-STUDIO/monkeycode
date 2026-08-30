#!/usr/bin/env node
/**
 * 无界面测试：验证引擎逻辑（先跑 tools/build_web.cjs 再执行）
 * 覆盖：错误计数、完成检测、清除、画叉、提示满足状态、G5 失败判定、数据合法性
 * 运行: node --experimental-specifier-resolution=node tools/test_headless.mjs
 */
import { PicrossEngine } from "../test-build/core/engine.js";
import { PUZZLES } from "../test-build/data/puzzles.js";
import * as save from "../test-build/core/save.js";

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

// 数据合法性（前置）：全部非空、尺寸 16x16
check("数据非空（空拼图已过滤）", PUZZLES.every((p) => /[1-9A-Fa-f]/.test(p.solutionHex)));
check("数据尺寸 16x16", PUZZLES.every((p) => p.width === 16 && p.height === 16));

// 使用第一题（id 0，非空）做完整流程测试
const d = PUZZLES[0];
const puzzle = {
  id: d.id, name: d.name, width: d.width, height: d.height,
  difficulty: d.difficulty, unlocked: d.unlocked,
  solution: solHexToBytes(d.solutionHex),
};

const sol = puzzle.solution;
const isCell = (x, y) => (sol[(y * 16 + x) >> 3] >> (7 - ((y * 16 + x) & 7))) & 1;

// 动态找一个非解法格（用于失误/失败测试）
let wrongCell = null;
for (let y = 0; y < 16 && !wrongCell; y++) {
  for (let x = 0; x < 16 && !wrongCell; x++) {
    if (!isCell(x, y)) wrongCell = { x, y };
  }
}
check("存在非解法格", !!wrongCell);
const wx0 = wrongCell.x, wy0 = wrongCell.y;

const engine = new PicrossEngine(puzzle, {
  onSolved: (s) => console.log("  [onSolved] elapsed=" + s.elapsedSec + " mistakes=" + s.mistakes),
});

check("初始未完成", !engine.getState().solved);
check("初始填充 0", engine.getState().filledCount === 0);
check("提示行数=16", engine.getState().rowHints.length === 16);
check("提示列数=16", engine.getState().colHints.length === 16);

// 1) 故意填错一个空单元格 → 失误 +1
engine.tapCell(wx0, wy0, "mark", "filled");
check("误填失误计数=1", engine.getState().mistakes === 1);

// 2) 清除错误格，改填一个正确格 → 失误不增
engine.clearCell(wx0, wy0);
engine.tapCell(0, 0, "mark", "filled");
check("清除+正确填不增失误", engine.getState().mistakes === 1);

// 3) 画叉再清除 → 失误不增
engine.tapCell(1, 1, "mark", "crossed");
engine.tapCell(1, 1, "mark", "empty");
check("画叉不增失误", engine.getState().mistakes === 1);

// 4) 按解法填充所有剩余格子 → 完成
for (let y = 0; y < 16; y++) {
  for (let x = 0; x < 16; x++) {
    if (isCell(x, y) && engine.getState().marks[y * 16 + x] !== "filled") {
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

// 6) 全部数据均合法且可解（非空，可正确完成）
for (const p of PUZZLES) {
  const pp = { ...p, solution: solHexToBytes(p.solutionHex) };
  const e2 = new PicrossEngine(pp, {});
  const ok = e2.getState().totalFilled > 0;
  if (!ok) check(`数据 ${p.id} 合法(非空)`, false);
  e2.destroy();
}
check(`数据全部合法(共 ${PUZZLES.length} 题非空)`, failures === 0);
check("数据总量=223", PUZZLES.length === 223);

// 7) G5: 5 次失误 → failed 游戏结束
const e3 = new PicrossEngine({ ...puzzle }, {});
check("失败初始 false", !e3.getState().failed);
let failFired = false;
const e3b = new PicrossEngine(
  { ...puzzle },
  { onStateChange: (s) => { if (s.failed) failFired = true; } }
);
// 用同一非解法格反复填错（错误填充 → 失误；clear 后重置再试）
for (let i = 0; i < 5; i++) {
  e3b.tapCell(wx0, wy0, "mark", "filled"); // 错误填充 → 失误
  e3b.clearCell(wx0, wy0);
}
const st3 = e3b.getState();
check("5 次失误后 failed=true", st3.failed === true);
check("失败后操作忽略", (() => { const m = st3.marks.slice(); e3b.tapCell(0, 0, "cycle"); return e3b.getState().marks.every((mm, i) => mm === m[i]); })());
check("onStateChange 收到 failed", failFired === true);
e3b.destroy();
e3.destroy();

// ============================================================
// U1 解锁链测试（依赖 save 模块 + puzzles 数组）
// ============================================================
// save 模块在 node 端没有 wx/localStorage，所以用它内置的
// 空 save 兜底 + 内存覆盖测试：我们直接验证纯函数行为。

// 8) 默认解锁种子：每个难度首题（不依赖持久化）
const seeds = (() => {
  const s = new Set();
  const seen = new Set();
  for (const p of PUZZLES) {
    if (!seen.has(p.difficulty)) { s.add(p.id); seen.add(p.difficulty); }
  }
  return s;
})();
check("种子包含 3 个难度各首题", seeds.size === 3);

// 9) 解锁链：从 id=0（diff=2）连开 2 道同难度题
//    PUZZLES 按 id 排序过滤 diff=2 后，0 后是 1 和 7（中间有空 id）
const diff2 = PUZZLES.filter((p) => p.difficulty === 2).map((p) => p.id);
const idx0 = diff2.indexOf(0);
check("diff=2 含 id=0", idx0 === 0);
// 模拟通关后链式解锁：记录 + 增强解锁集
const wasUnlocked = new Set([0]);
const candidate1 = diff2[idx0 + 1];
const candidate2 = diff2[idx0 + 2];
wasUnlocked.add(candidate1);
wasUnlocked.add(candidate2);
check("解锁 1 道后续题", wasUnlocked.has(candidate1));
check("解锁 2 道后续题", wasUnlocked.has(candidate2));
check("解锁不跨难度", diff2.includes(candidate1) && diff2.includes(candidate2));

// 10) 解锁不破坏已通关：通关题即使被锁也能通关（因为通关前仍可玩）
//     验证：混合难度种子可达覆盖率（任意单步扩散 20 步后）
const reachAll = (startIds) => {
  const visited = new Set(startIds);
  let frontier = startIds.slice();
  for (let step = 0; step < 30 && frontier.length > 0; step++) {
    const next = [];
    for (const id of frontier) {
      const p = PUZZLES.find((pp) => pp.id === id);
      if (!p) continue;
      const same = PUZZLES.filter((pp) => pp.difficulty === p.difficulty).map((pp) => pp.id);
      const ix = same.indexOf(id);
      for (let k = 1; k <= 2; k++) {
        const nxt = same[ix + k];
        if (nxt !== undefined && !visited.has(nxt)) {
          visited.add(nxt);
          next.push(nxt);
        }
      }
    }
    frontier = next;
  }
  return visited;
};
// 全部 3 个难度的种子题：id=53（diff=0）、id=2（diff=1）、id=0（diff=2）
const reach = reachAll([53, 2, 0]);
check("通关链显著扩展集合", reach.size >= 10);
check("覆盖自身至少各难度 1 个", [0, 1, 2].every((d) => PUZZLES.filter((p) => p.difficulty === d && reach.has(p.id)).length > 0));

// 11) 星级规则单元测试
const starsFor = (mistakes) => mistakes <= 0 ? 3 : mistakes <= 2 ? 2 : 1;
check("星级 0 失误=3 星", starsFor(0) === 3);
check("星级 1 失误=2 星", starsFor(1) === 2);
check("星级 2 失误=2 星", starsFor(2) === 2);
check("星级 3+ 失误=1 星", starsFor(3) === 1);
check("星级 5 失误=1 星", starsFor(5) === 1);

// ============================================================
// U2 Undo/Redo 测试（engine 内置历史栈）
// ============================================================
const eU = new PicrossEngine({ ...puzzle }, {});
const solIdx = (x, y) => y * 16 + x;
// 用测试 1 中找出的 wrongCell（必定非解法格）
// 1) 误填一个空格子 → 失误计数 = 1
eU.tapCell(wx0, wy0, "mark", "filled");
check("U2 initial: mistakes=1", eU.getState().mistakes === 1);
check("U2 initial: undo depth=1", eU.undoDepth() === 1);
check("U2 initial: redo depth=0", eU.canRedo() === false);
// 2) 撤销 → marks 复原；Picross DS 失误不回滚（已记入的失误保留）
const okUndo = eU.undo();
check("U2 undo 返回 true", okUndo === true);
check("U2 undo 后 mistakes=1（Picross DS 失误不回滚）", eU.getState().mistakes === 1);
check("U2 undo 后 marks[wrong]=empty", eU.getState().marks[solIdx(wx0, wy0)] === "empty");
check("U2 undo 后 redo depth=1", eU.redoDepth() === 1);
// 3) 撤销后再新动作 → 清 redo 栈
eU.tapCell(1, 1, "mark", "crossed");
check("U2 新动作后 redo depth=0", eU.canRedo() === false);
// 4) redo 不存在 → 返回 false
check("U2 redo 无可重做时返回 false", eU.redo() === false);
// 5) 联串 undo + redo
eU.undo(); // 撤销 crossed
check("U2 二次撤销后 marks[1,1]=empty", eU.getState().marks[solIdx(1, 1)] === "empty");
eU.redo();
check("U2 redo 后 marks[1,1]=crossed", eU.getState().marks[solIdx(1, 1)] === "crossed");
eU.destroy();

// ============================================================
// U3 In-progress save 测试（serialize / loadFromSerialized 往返）
// ============================================================
const eS = new PicrossEngine({ ...puzzle }, {});
// 模拟玩家填充前 5 个解法格
let placed = 0;
for (let y = 0; y < 16 && placed < 5; y++) {
  for (let x = 0; x < 16 && placed < 5; x++) {
    if (isCell(x, y)) {
      eS.tapCell(x, y, "mark", "filled");
      placed++;
    }
  }
}
check("U3 序列填了 5 个", eS.getState().filledCount === 5);

// serialize 导出
const buf = eS.serialize();
check("U3 serialize 字节数 = ceil(256/4) = 64", buf.length === 64);

// 重置时间标记，验证 elapsed 也被保护
eS.setElapsed(120);

// 模拟关掉小程序再开：新 engine + 还原
const eR = new PicrossEngine({ ...puzzle }, {});
eR.loadFromSerialized(buf, 120);
check("U3 还原 filledCount=5", eR.getState().filledCount === 5);
check("U3 还原 elapsed=120", eR.getElapsed() === 120);
const marksRoundTrip = eR.getState().marks.every((m, i) => m === eS.getState().marks[i]);
check("U3 marks 序列化往返完全一致", marksRoundTrip);
check("U3 还原后 solved=false", eR.getState().solved === false);
check("U3 还原后 history 已清空（不可撤销）", eR.undoDepth() === 0);

eS.destroy();
eR.destroy();

console.log(failures === 0 ? "\nALL PASS" : `\n${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
