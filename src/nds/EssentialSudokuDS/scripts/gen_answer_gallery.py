# -*- coding: utf-8 -*-
"""
PICTURE-V0.26 — 生成图画谜题"答案成品图"画廊 HTML (纯静态, 双击即开).

数据源:
  - miniprogram/utils/sudoku/numclo_puzzles.ts   RAW 1401 题 (packed 150-hex, base-6)
  - miniprogram/utils/sudoku/numclo_answers.ts    numclo0-9 每题答案名 (100/文件)

产物:
  - build-test/answer-gallery.html (self-contained, 内嵌 JSON, 无外部依赖)

用法: python scripts/gen_answer_gallery.py
"""
import os
import re
import json

WORKSPACE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUZZLES_TS = os.path.join(WORKSPACE, 'miniprogram', 'utils', 'sudoku', 'numclo_puzzles.ts')
ANSWERS_TS = os.path.join(WORKSPACE, 'miniprogram', 'utils', 'sudoku', 'numclo_answers.ts')
OUT_HTML = os.path.join(WORKSPACE, 'build-test', 'answer-gallery.html')

# 与 picture-scene.ts 保持一致 (DS 原版 numclo_00.nbm palette 真值)
PALETTE_HEX = ['#ffffff', '#f80000', '#f8f800', '#4868f8', '#48b048', '#181818']

# 15 类别 (与 picture-scene.ts CATEGORIES 一致)
CATEGORIES = [
    ('numclo0.data', '动物'), ('numclo1.data', '科学'), ('numclo2.data', '地标'),
    ('numclo3.data', '家电'), ('numclo4.data', '玩具'), ('numclo5.data', '自然'),
    ('numclo6.data', '交通'), ('numclo7.data', '美食'), ('numclo8.data', '生活'),
    ('numclo9.data', '符号'), ('numclo_00.data', '附加1'), ('numclo_01.data', '附加2'),
    ('numclo_02.data', '附加3'), ('numclo_03.data', '附加4'), ('numclo_tu.data', '教程'),
]


def parse_puzzles():
    """解析 RAW 元组数组 -> {file: [(indexInFile, packed, rawName), ...]}

    每行固定格式: ['id', 'file', 'name', idx, 'hex'],
    name 可能含转义撇号 (如 Bees\\' Nest / Gentleman\\'s Shoes),
    正则 name 组用 (?:[^'\\\\]|\\\\.)* 支持转义字符。
    """
    text = open(PUZZLES_TS, encoding='utf-8').read()
    pat = re.compile(
        r"^\['(numclo[\w-]+\.data_\d+)',\s*'(numclo[\w-]+\.data)',\s*'((?:[^'\\]|\\.)*)',\s*(\d+),\s*'([0-9a-fA-F]+)'\],?$"
    )
    rows = {}
    for line in text.splitlines():
        m = pat.match(line.strip())
        if not m:
            continue
        _id, file_key, raw_name, idx_s, packed = m.groups()
        raw_name = raw_name.replace("\\'", "'")
        rows.setdefault(file_key, []).append((int(idx_s), packed, raw_name))
    return rows


def parse_answers():
    """解析 NUMCLO_ANSWERS -> {file: [name, ...]}"""
    text = open(ANSWERS_TS, encoding='utf-8').read()
    out = {}
    for m in re.finditer(r"'(numclo[\w-]+\.data)':\s*\[(.*?)\]", text, re.S):
        file_key = m.group(1)
        names = re.findall(r"'([^']*)'", m.group(2))
        out[file_key] = names
    return out


def build_payload():
    puzzles = parse_puzzles()
    answers = parse_answers()
    cats = []
    for file_key, label in CATEGORIES:
        entries = sorted(puzzles.get(file_key, []), key=lambda e: e[0])
        # packed 列表按 indexInFile 升序 (题 N = entries[N])
        packed_list = [e[1] for e in entries]
        names = answers.get(file_key, None)
        # 题目名: 优先 answers 表; 退回 RAW name 字段 (numclo_00-03/numclo_tu 常为空)
        name_list = []
        for e in entries:
            idx, _p, raw_name = e
            n = ''
            if names is not None and idx < len(names) and names[idx]:
                n = names[idx]
            elif raw_name:
                n = raw_name
            name_list.append(n)
        cats.append({
            'key': file_key,
            'label': label,
            'count': len(packed_list),
            'packed': packed_list,
            'names': name_list,
        })
    return {'cats': cats, 'palette': PALETTE_HEX}


HTML_HEAD = r'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Essential Sudoku DS · 图画谜题答案图库</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #0d1b2a; color: #e9eef3;
    font-family: -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif;
    min-height: 100vh;
  }
  header {
    padding: 18px 20px 8px;
    border-bottom: 1px solid rgba(255,255,255,.08);
    background: rgba(22,42,66,.6);
  }
  header h1 { font-size: 18px; color: #4db8ff; font-weight: 600; }
  header p { font-size: 12px; color: #9fb6d3; margin-top: 4px; }
  #cats {
    display: flex; flex-wrap: wrap; gap: 8px;
    padding: 12px 20px;
  }
  .chip {
    padding: 6px 14px; border-radius: 999px; cursor: pointer;
    background: rgba(22,42,66,.85); border: 1px solid rgba(255,255,255,.1);
    color: #c8d5e8; font-size: 13px; user-select: none;
    transition: all .15s;
  }
  .chip:hover { background: rgba(46,111,199,.5); }
  .chip.active { background: #2e6fc7; border-color: #4db8ff; color: #fff; }
  .chip small { opacity: .7; margin-left: 4px; }
  #gallery {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
    gap: 8px; padding: 16px 20px 30px;
  }
  .tile {
    background: rgba(22,42,66,.6); border: 1px solid rgba(255,255,255,.08);
    border-radius: 8px; padding: 6px; cursor: pointer; text-align: center;
    transition: all .15s; overflow: hidden;
  }
  .tile:hover { border-color: #4db8ff; transform: translateY(-1px); }
  .tile canvas { display: block; width: 100%; height: auto; image-rendering: pixelated; }
  .tile .lbl { font-size: 11px; color: #c8d5e8; margin-top: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tile .no { font-size: 10px; color: #9fb6d3; }
  #lightbox {
    position: fixed; inset: 0; background: rgba(5,10,18,.94);
    display: none; align-items: center; justify-content: center; z-index: 50;
  }
  #lightbox.open { display: flex; }
  .lb-card {
    background: #10223a; border: 1px solid rgba(255,255,255,.12);
    border-radius: 14px; padding: 18px; max-width: 92vw; text-align: center;
  }
  #lb-title { font-size: 20px; color: #fff; font-weight: 700; margin-bottom: 2px; }
  #lb-sub { font-size: 12px; color: #9fb6d3; margin-bottom: 12px; }
  #lb-canvas { image-rendering: pixelated; border-radius: 6px; background: #eef1f5; max-width: 92vw; }
  .lb-row { display: flex; gap: 10px; justify-content: center; margin-top: 14px; }
  .lb-btn {
    padding: 8px 22px; border-radius: 8px; cursor: pointer; user-select: none;
    background: #2e6fc7; color: #fff; font-size: 14px; border: none;
  }
  .lb-btn:hover { background: #4db8ff; }
  .lb-btn.ghost { background: rgba(255,255,255,.08); color: #c8d5e8; }
  .legend { display:flex; gap:6px; padding: 2px 20px 12px; align-items:center; }
  .legend .sw { width:16px; height:16px; border-radius:3px; display:inline-block; border:1px solid rgba(255,255,255,.2); }
  .legend span { font-size: 11px; color:#9fb6d3; margin-right: 6px; }
</style>
</head>
<body>
<header>
  <h1>Essential Sudoku DS · 图画谜题 答案成品图库</h1>
  <p>1401 题 · 15 类 · 15×15 彩色像素画 (点击缩略图放大 / 左右键翻题 / 可下载 PNG)</p>
</header>
<div id="cats"></div>
<div class="legend" id="legend"></div>
<div id="gallery"></div>

<div id="lightbox">
  <div class="lb-card">
    <div id="lb-title"></div>
    <div id="lb-sub"></div>
    <canvas id="lb-canvas" width="480" height="480"></canvas>
    <div class="lb-row">
      <button class="lb-btn ghost" id="lb-prev">◀ 上一题</button>
      <button class="lb-btn" id="lb-dl">下载 PNG</button>
      <button class="lb-btn" id="lb-next">下一题 ▶</button>
    </div>
  </div>
</div>

<script>
const DATA = __DATA__;
const PAL = DATA.palette;
const THUMB = 3;         // 缩略图 cell px
const BIG = 32;          // 大图 cell px
const N = 15;

/* ---- 解码 packed (150-hex) -> 225 CellColor ---- */
function unpack(hex) {
  const g = [];
  for (let i = 0; i < hex.length; i += 2) {
    const b = parseInt(hex.substr(i, 2), 16);
    g.push(b % 6);
    g.push(((b / 6) | 0) % 6);
    g.push(((b / 36) | 0) % 6);
  }
  return g;
}

/* ---- 画一幅答案图 ---- */
function drawGrid(canvas, grid, cellPx, gapPx, outline5) {
  const size = N * cellPx;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  // 0 = 空白: 浅纸底
  ctx.fillStyle = '#eef1f5';
  ctx.fillRect(0, 0, size, size);
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const v = grid[r * N + c];
      if (v === 0) continue;
      ctx.fillStyle = PAL[v] || '#000';
      const x = c * cellPx, y = r * cellPx;
      if (gapPx > 0) {
        ctx.fillRect(x, y, cellPx - gapPx, cellPx - gapPx);
      } else {
        ctx.fillRect(x, y, cellPx, cellPx);
      }
    }
  }
  // 5×5 块粗线 (模拟 DS numclo_waku)
  if (outline5) {
    ctx.strokeStyle = 'rgba(160,40,40,.9)';
    ctx.lineWidth = Math.max(2, cellPx * 0.18);
    ctx.beginPath();
    for (let i = 0; i <= N; i += 5) {
      const p = i * cellPx;
      ctx.moveTo(p, 0); ctx.lineTo(p, size);
      ctx.moveTo(0, p); ctx.lineTo(size, p);
    }
    ctx.stroke();
  }
}

/* ---- 状态 ---- */
let curCatIdx = 0;
let lbFile = null, lbIdx = 0;

const catsEl = document.getElementById('cats');
const galleryEl = document.getElementById('gallery');
const legendEl = document.getElementById('legend');
const lbEl = document.getElementById('lightbox');

/* 图例 */
(function buildLegend() {
  const row = document.createElement('span'); row.textContent = '0=空白   ';
  legendEl.appendChild(row);
  for (let i = 1; i <= 5; i++) {
    const sw = document.createElement('span'); sw.className = 'sw';
    sw.style.background = PAL[i]; legendEl.appendChild(sw);
  }
})();

/* 类别 chips */
DATA.cats.forEach((cat, ci) => {
  const chip = document.createElement('div');
  chip.className = 'chip' + (ci === 0 ? ' active' : '');
  chip.innerHTML = cat.label + '<small>' + cat.count + '</small>';
  chip.onclick = () => selectCat(ci);
  catsEl.appendChild(chip);
});

/* 渲染当前类别全部缩略图 (canvas DOM, cell 3px -> 45px) */
function selectCat(ci) {
  curCatIdx = ci;
  document.querySelectorAll('.chip').forEach((el, i) => el.classList.toggle('active', i === ci));
  galleryEl.innerHTML = '';
  const cat = DATA.cats[ci];
  const frag = document.createDocumentFragment();
  cat.packed.forEach((hex, idx) => {
    const grid = unpack(hex);
    const tile = document.createElement('div');
    tile.className = 'tile';
    const cv = document.createElement('canvas');
    drawGrid(cv, grid, THUMB, 1, false);
    const lbl = document.createElement('div');
    lbl.className = 'lbl';
    lbl.textContent = cat.names[idx] || ('#' + (idx + 1));
    const no = document.createElement('div');
    no.className = 'no';
    no.textContent = '第 ' + (idx + 1) + ' 题';
    tile.appendChild(cv); tile.appendChild(lbl); tile.appendChild(no);
    tile.onclick = () => openLb(ci, idx);
    frag.appendChild(tile);
  });
  galleryEl.appendChild(frag);
}

/* 大图 lightbox */
function openLb(ci, idx) {
  const cat = DATA.cats[ci];
  lbFile = ci; lbIdx = idx;
  const grid = unpack(cat.packed[idx]);
  const cv = document.getElementById('lb-canvas');
  drawGrid(cv, grid, BIG, 0, true);
  const name = cat.names[idx] || ('#' + (idx + 1));
  document.getElementById('lb-title').textContent = cat.label + ' · ' + name;
  document.getElementById('lb-sub').textContent =
    '第 ' + (idx + 1) + ' / ' + cat.count + ' 题  (file=' + cat.key + ')';
  lbEl.classList.add('open');
}

function closeLb() { lbEl.classList.remove('open'); }
function lbStep(d) {
  const cat = DATA.cats[lbFile];
  lbIdx = (lbIdx + d + cat.count) % cat.count;
  openLb(lbFile, lbIdx);
}

document.getElementById('lb-prev').onclick = () => lbStep(-1);
document.getElementById('lb-next').onclick = () => lbStep(1);
lbEl.onclick = (e) => { if (e.target === lbEl) closeLb(); };
document.getElementById('lb-dl').onclick = () => {
  const cv = document.getElementById('lb-canvas');
  const a = document.createElement('a');
  a.href = cv.toDataURL('image/png');
  a.download = 'numclo-answer-' + DATA.cats[lbFile].key + '-' + lbIdx + '.png';
  a.click();
};
window.addEventListener('keydown', (e) => {
  if (!lbEl.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  else if (e.key === 'ArrowLeft') lbStep(-1);
  else if (e.key === 'ArrowRight') lbStep(1);
});

/* 初始渲染 */
selectCat(0);
</script>
</body>
</html>
'''


def main():
    payload = build_payload()
    json_str = json.dumps(payload, ensure_ascii=False, separators=(',', ':'))
    html = HTML_HEAD.replace('__DATA__', json_str)
    os.makedirs(os.path.dirname(OUT_HTML), exist_ok=True)
    with open(OUT_HTML, 'w', encoding='utf-8') as f:
        f.write(html)
    total = sum(c['count'] for c in payload['cats'])
    print('OK  answer-gallery.html = %.1f KB' % (os.path.getsize(OUT_HTML) / 1024))
    print('    total puzzles = %d' % total)
    for c in payload['cats']:
        named = sum(1 for n in c['names'] if n)
        print('    %-16s %-4s count=%3d named=%3d' % (c['key'], c['label'], c['count'], named))


if __name__ == '__main__':
    main()
