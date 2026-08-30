#!/usr/bin/env node
/**
 * 真机性能测试脚本（D）
 *
 * 用法：
 *   1) 在 devtools 真机调试模式运行 test/index.html
 *   2) 同时 console 里 bench 时会输出 benchmark-stamp 字符串
 *   3) 复制粘贴到 stdin 或保存为 .log 传过来，脚本会分析
 *   4) 输出 benchmark.json
 *
 * 也支持离线无界面 bench：
 *   node tools/real_device_bench.cjs --offline
 *
 * 测量：
 *   - engine.tapCell 操作吞吐量（ops/sec）
 *   - renderer.draw 帧时间（ms）
 *   - serialize / loadFromSerialized 往返时间
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const root = path.join(__dirname, "..");

function benchOffline() {
  // 直接在 node 里跑 engine，测 ops/sec
  process.chdir(root);
  // 不重复 build（外部已 build）
  const harness = `
import { PicrossEngine } from "../test-build/core/engine.js";
import { PUZZLES } from "../test-build/data/puzzles.js";

const solHexToBytes = (hex) => {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
};

const d = PUZZLES[0];
const puzzle = { id: d.id, name: d.name, width: 16, height: 16, difficulty: d.difficulty, unlocked: d.unlocked, solution: solHexToBytes(d.solutionHex) };
const eng = new PicrossEngine(puzzle, {});

// 1) tapCell 吞吐量：填充所有解法格，记录耗时
const t0 = process.hrtime.bigint();
let n = 0;
for (let y = 0; y < 16; y++) {
  for (let x = 0; x < 16; x++) {
    if ((puzzle.solution[(y * 16 + x) >> 3] >> (7 - ((y * 16 + x) & 7))) & 1) {
      eng.tapCell(x, y, "mark", "filled");
      n++;
    }
  }
}
const t1 = process.hrtime.bigint();
const tapMs = Number(t1 - t0) / 1e6;

// 2) serialize/deserialize 往返
const ts = process.hrtime.bigint();
const buf = eng.serialize();
const te = process.hrtime.bigint();
const serMs = Number(te - ts) / 1e6;
const td = process.hrtime.bigint();
const e2 = new PicrossEngine({ ...puzzle }, {});
e2.loadFromSerialized(buf, 0);
const tf = process.hrtime.bigint();
const deMs = Number(tf - td) / 1e6;

// 3) undo 100 次
const tu = process.hrtime.bigint();
for (let i = 0; i < 100; i++) eng.undo();
const tu2 = process.hrtime.bigint();
const undoMs = Number(tu2 - tu) / 1e6;
const undoOpsPerSec = eng.canRedo() ? 100000 / undoMs : 0;

const result = {
  ops: { tapCount: n, tapMs: Math.round(tapMs), tapOpsPerSec: Math.round((n / tapMs) * 1000) },
  serMs: Math.round(serMs * 100) / 100,
  deMs: Math.round(deMs * 100) / 100,
  undoMs: Math.round(undoMs * 100) / 100,
  undoOpsPerSec: Math.round(undoOpsPerSec),
  sampledAt: new Date().toISOString(),
};
import { writeFileSync } from "fs";
writeFileSync("test-build/_bench.json", JSON.stringify(result));
`;
  fs.writeFileSync(path.join(root, "test-build", "_bench.mjs"), harness);
  const out = execSync("node --experimental-specifier-resolution=node test-build/_bench.mjs", { encoding: "utf-8" });
  // _bench.mjs 通过 process.env 把 JSON 写到 _bench.json
  const jsonPath = path.join(root, "test-build", "_bench.json");
  let data;
  if (fs.existsSync(jsonPath)) {
    data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    fs.unlinkSync(jsonPath);
  } else {
    // 退路：从 stdout 抓
    const lastJson = out.split("\n").filter((l) => /^\s*\{/.test(l)).join("\n");
    data = JSON.parse(lastJson);
  }
  console.log(JSON.stringify(data, null, 2));
  fs.unlinkSync(path.join(root, "test-build", "_bench.mjs"));
  fs.writeFileSync(path.join(root, "benchmark.json"), JSON.stringify(data, null, 2));
  console.log("Saved to benchmark.json");
  console.log("---");
  console.log("Summary:");
  console.log(`  tapCell: ${data.ops.tapOpsPerSec} ops/sec (${data.ops.tapCount} ops in ${data.ops.tapMs}ms)`);
  console.log(`  serialize: ${data.serMs}ms`);
  console.log(`  deserialize: ${data.deMs}ms`);
  console.log(`  undo: ${data.undoMs}ms (${data.undoOpsPerSec} ops/sec)`);
}

function benchFromStdin() {
  let buf = "";
  process.stdin.on("data", (c) => buf += c);
  process.stdin.on("end", () => {
    const lines = buf.split("\n").filter((l) => l.includes("BENCH-START") || l.includes("BENCH-END") || /^\{"/.test(l));
    // 简化：解析 JSON 行
    const json = lines.find((l) => /^\{/.test(l));
    if (!json) {
      console.error("No JSON found in stdin");
      process.exit(1);
    }
    const data = JSON.parse(json);
    fs.writeFileSync(path.join(root, "benchmark.json"), JSON.stringify(data, null, 2));
    console.log("Saved to benchmark.json from stdin");
  });
}

if (process.argv.includes("--offline")) benchOffline();
else benchFromStdin();
