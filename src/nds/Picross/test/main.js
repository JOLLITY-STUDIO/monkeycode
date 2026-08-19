/**
 * HTML5 测试环境入口 —— 复用与小程序完全相同的 core/render 逻辑
 * 运行: node tools/build_web.cjs 后浏览器打开 test/index.html
 */
import { PicrossEngine } from "../test-build/core/engine.js";
import { PicrossRenderer } from "../test-build/render/renderer.js";
import { PUZZLES } from "../test-build/data/puzzles.js";

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const DPR = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * DPR;
canvas.height = canvas.clientHeight * DPR;

let puzzleIndex = 0;
let engine = null;
let renderer = null;
let lastCell = null;
let markMode = "cycle"; // cycle | cross | fill
const digitsImg = new Image();
const tilesImg = new Image();

const solHexToBytes = (hex) => {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
};

function startPuzzle(idx) {
  if (engine) engine.destroy();
  const d = PUZZLES[idx % PUZZLES.length];
  const puzzle = {
    id: d.id,
    name: d.name,
    width: d.width,
    height: d.height,
    difficulty: d.difficulty,
    unlocked: d.unlocked,
    solution: solHexToBytes(d.solutionHex),
  };
  engine = new PicrossEngine(puzzle, {
    onStateChange: (s) => syncState(s),
    onSolved: (s) => syncState(s),
  });
  renderer = new PicrossRenderer(canvas, { digits: digitsImg, tiles: tilesImg });
  lastCell = null;
  engine.start();
  syncState(engine.getState());
}

function syncState(s) {
  const mm = s.elapsedSec % 60;
  const tt = Math.floor(s.elapsedSec / 60);
  document.getElementById("puzzle-name").textContent = s.puzzle.name;
  document.getElementById("time").textContent = `${tt}:${mm < 10 ? "0" : ""}${mm}`;
  document.getElementById("mistakes").textContent = `✕ ${s.mistakes}/${s.maxMistakes}`;
  const pct = Math.min(100, Math.round((s.filledCount / s.totalFilled) * 100));
  const bar = document.getElementById("progress-bar");
  bar.style.width = pct + "%";
  bar.style.background = s.solved ? "#4caf50" : "#3b6fd4";
  document.getElementById("solved-mask").style.display = s.solved ? "flex" : "none";
}

function cellFromEvent(e) {
  if (!engine) return null;
  const rect = canvas.getBoundingClientRect();
  const pt = e.touches ? e.touches[0] : e;
  const h = renderer.hitTest((pt.clientX - rect.left) * DPR, (pt.clientY - rect.top) * DPR, engine.getState());
  if (h.type === "cell") {
    renderer.setCursor(h.x, h.y);
    return { x: h.x, y: h.y };
  }
  renderer.setCursor(-1, -1);
  return null;
}

function applyMark(x, y) {
  if (markMode === "cross") engine.tapCell(x, y, "mark", "crossed");
  else if (markMode === "cycle") engine.tapCell(x, y, "cycle");
  else engine.tapCell(x, y, "mark", "filled");
}

function setMarkMode(mode) {
  markMode = mode;
  document.getElementById("btn-mark").textContent = markMode === "cross" ? "✕ 画叉" : "● 循环";
}

canvas.addEventListener("mousedown", (e) => {
  const c = cellFromEvent(e);
  if (!c) return;
  lastCell = c;
  applyMark(c.x, c.y);
});
canvas.addEventListener("mousemove", (e) => {
  if (!lastCell) return;
  const c = cellFromEvent(e);
  if (c && (c.x !== lastCell.x || c.y !== lastCell.y)) {
    lastCell = c;
    applyMark(c.x, c.y);
  }
});
window.addEventListener("mouseup", () => {
  lastCell = null;
  if (renderer) renderer.setCursor(-1, -1);
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const c = cellFromEvent(e);
  if (!c) return;
  lastCell = c;
  applyMark(c.x, c.y);
});
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!lastCell) return;
  const c = cellFromEvent(e);
  if (c && (c.x !== lastCell.x || c.y !== lastCell.y)) {
    lastCell = c;
    applyMark(c.x, c.y);
  }
});
canvas.addEventListener("touchend", () => {
  lastCell = null;
  if (renderer) renderer.setCursor(-1, -1);
});

document.getElementById("btn-prev").addEventListener("click", () => {
  puzzleIndex = (puzzleIndex - 1 + PUZZLES.length) % PUZZLES.length;
  startPuzzle(puzzleIndex);
});
document.getElementById("btn-next").addEventListener("click", () => {
  puzzleIndex = (puzzleIndex + 1) % PUZZLES.length;
  startPuzzle(puzzleIndex);
});
document.getElementById("btn-reset").addEventListener("click", () => startPuzzle(puzzleIndex));
document.getElementById("btn-mark").addEventListener("click", () => {
  setMarkMode(markMode === "cross" ? "cycle" : "cross");
});

function loop() {
  if (engine && renderer) renderer.draw(engine.getState());
  requestAnimationFrame(loop);
}
let assetsReady = 0;
function onAssetReady() {
  assetsReady++;
  if (assetsReady >= 2) {
    startPuzzle(0);
    loop();
  }
}
digitsImg.onload = onAssetReady;
digitsImg.onerror = () => {
  console.warn("[test] digits.png load failed, fallback to canvas text");
  onAssetReady();
};
digitsImg.src = "../assets/digits.png";
tilesImg.onload = onAssetReady;
tilesImg.onerror = () => {
  console.warn("[test] nds_tiles.png load failed");
  onAssetReady();
};
tilesImg.src = "../assets/nds_tiles.png";
// 若图片已缓存，onload 可能在赋值前触发，需补一次 ready 检测
if (digitsImg.complete && digitsImg.naturalWidth > 0) onAssetReady();
if (tilesImg.complete && tilesImg.naturalWidth > 0) onAssetReady();
