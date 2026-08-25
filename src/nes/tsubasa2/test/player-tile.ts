/**
 * 球员 tile 素材浏览器 (PT1-PT3 验证页入口)
 *
 * 验证 + 渲染:
 *  - PLAYER_TABLE 255 项全部加载
 *  - findPlayerTilesById(playerId) / PlayerTileService.findPlayerTiles(playerId) 全部非 null
 *  - 用 NES_CHR_ROM + NES palette 实际渲染 head/body 8x8 tile 像素到 canvas
 *  - 失败项标红
 */
import { PLAYER_TABLE, findPlayerById, PLAYER_COLOR_TABLE } from '../src/game/prg/data/tables/player-stats';
import {
  PLAYER_TILE_TABLE, findPlayerTilesById,
} from '../src/game/prg/data/tables/player-tile-table';
import { BANK19_SPRITE_FRAMES, findSpriteFrameById } from '../src/game/prg/data/tables/sprite-frame-table';
import { PlayerTileService } from '../src/game/prg/code/player/PlayerTileService';
import { NES_CHR_ROM, CHR_BANK_COUNT, CHR_BANK_SIZE } from '../src/game/chr/index';

// ───────────────────── NES 调色板 (NES PPU master palette 64 色) ─────────────────────
const NES_PALETTE: ReadonlyArray<readonly [number, number, number]> = [
  [0x54, 0x54, 0x54], [0x00, 0x1E, 0x74], [0x08, 0x10, 0x90], [0x30, 0x00, 0x88],
  [0x44, 0x00, 0x64], [0x5C, 0x00, 0x30], [0x54, 0x04, 0x00], [0x3C, 0x18, 0x00],
  [0x20, 0x2A, 0x00], [0x08, 0x3A, 0x00], [0x00, 0x40, 0x00], [0x00, 0x3C, 0x00],
  [0x00, 0x32, 0x3C], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00],
  [0x98, 0x96, 0x98], [0x08, 0x4C, 0xC4], [0x30, 0x32, 0xEC], [0x5C, 0x1E, 0xE4],
  [0x88, 0x14, 0xB0], [0xA0, 0x14, 0x64], [0x98, 0x22, 0x20], [0x78, 0x3C, 0x00],
  [0x54, 0x5A, 0x00], [0x28, 0x72, 0x00], [0x08, 0x7C, 0x00], [0x00, 0x76, 0x28],
  [0x00, 0x66, 0x78], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00],
  [0xEC, 0xEE, 0xEC], [0x4C, 0x9A, 0xEC], [0x78, 0x7C, 0xEC], [0xB0, 0x62, 0xEC],
  [0xE4, 0x54, 0xEC], [0xEC, 0x58, 0xB4], [0xEC, 0x6A, 0x64], [0xD4, 0x88, 0x20],
  [0xA0, 0xAA, 0x00], [0x74, 0xC4, 0x00], [0x4C, 0xD0, 0x20], [0x38, 0xCC, 0x6C],
  [0x38, 0xB4, 0xCC], [0x3C, 0x3C, 0x3C], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00],
  [0xEC, 0xEE, 0xEC], [0xA8, 0xCC, 0xEC], [0xBC, 0xBC, 0xEC], [0xD4, 0xB2, 0xEC],
  [0xEC, 0xAE, 0xEC], [0xEC, 0xAE, 0xD4], [0xEC, 0xB4, 0xB0], [0xE4, 0xC4, 0x90],
  [0xCC, 0xD2, 0x78], [0xB4, 0xDE, 0x78], [0xA8, 0xE2, 0x90], [0x98, 0xE2, 0xB4],
  [0xA0, 0xD6, 0xE4], [0xA0, 0xA2, 0xA0], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00],
];
const colorHex = (idx: number): string => {
  const [r, g, b] = NES_PALETTE[idx & 0x3f];
  return `rgb(${r},${g},${b})`;
};

// ───────────────────── 渲染: tile 字节 → canvas 像素 ─────────────────────
// NES tile: 16 字节 = 8 行 × 2 bit plane (plane0 在前 8 字节, plane1 在后 8 字节)
// sprite pattern table 基址可由 PPUCTRL ($2000) bit3 切换:
//   bit3=0 → 基址 $0000 (常用于 BG); bit3=1 → 基址 $1000 (常用于 sprite)
// 天使之翼2 的 sprite 通常落在 $1000-$1FFF 区段; 此处默认试 $1000
const SPRITE_PATTERN_BASE = 0x1000;
function getTileByte(tileIndex: number, byteOffset: number): number {
  // sprite pattern table 基址 + tile 偏移 (每 tile 16 字节), 限制在 8KB CHR bank 内
  const chrOffset = (SPRITE_PATTERN_BASE + ((tileIndex & 0x3ff) * 16) + (byteOffset & 0x0f)) & 0x1FFF;
  return NES_CHR_ROM[chrOffset] ?? 0;
}

/** 把单个 8x8 NES tile 画到 canvas, 缩放 scale 倍, palette = 4 个 NES palette 索引 */
function renderTileToCanvas(
  canvas: HTMLCanvasElement,
  tileIndex: number,
  palette: readonly number[],
  scale: number = 4,
  transparent: number = 0,
): void {
  const w = 8 * scale;
  const h = 8 * scale;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, w, h);

  // 透明色 (palette[transparent]) 用棋盘格背景
  const transpColor = NES_PALETTE[palette[transparent & 0x03] & 0x3f];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (((x + y) & 1) === 0) {
        ctx.fillStyle = `rgba(${transpColor[0]},${transpColor[1]},${transpColor[2]},0.3)`;
      } else {
        ctx.fillStyle = `rgba(${transpColor[0]},${transpColor[1]},${transpColor[2]},0.1)`;
      }
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }

  for (let y = 0; y < 8; y++) {
    const p0 = getTileByte(tileIndex, y);     // plane 0
    const p1 = getTileByte(tileIndex, y + 8); // plane 1
    for (let x = 0; x < 8; x++) {
      const bit0 = (p0 >> (7 - x)) & 1;
      const bit1 = (p1 >> (7 - x)) & 1;
      const colorIdx = bit0 | (bit1 << 1); // 0..3
      if (colorIdx === 0) continue; // 透明
      const c = NES_PALETTE[palette[colorIdx] & 0x3f];
      ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}

/** 把多个 tile 拼成 1 张大 canvas (2D 排布) */
function renderTilesGrid(
  tileIndices: readonly number[],
  palette: readonly number[],
  cols: number,
  scale: number = 4,
): HTMLCanvasElement {
  const rows = Math.ceil(tileIndices.length / cols);
  const w = cols * 8 * scale;
  const h = rows * 8 * scale;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.imageSmoothingEnabled = false;
  // 棋盘格背景
  const transpColor = NES_PALETTE[palette[0] & 0x3f];
  ctx.fillStyle = `rgba(${transpColor[0]},${transpColor[1]},${transpColor[2]},0.15)`;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < tileIndices.length; i++) {
    const t = tileIndices[i];
    const offX = (i % cols) * 8 * scale;
    const offY = Math.floor(i / cols) * 8 * scale;
    for (let y = 0; y < 8; y++) {
      const p0 = getTileByte(t, y);
      const p1 = getTileByte(t, y + 8);
      for (let x = 0; x < 8; x++) {
        const colorIdx = ((p0 >> (7 - x)) & 1) | (((p1 >> (7 - x)) & 1) << 1);
        if (colorIdx === 0) continue;
        const c = NES_PALETTE[palette[colorIdx] & 0x3f];
        ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        ctx.fillRect(offX + x * scale, offY + y * scale, scale, scale);
      }
    }
  }
  // 画 tile 索引标签
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = `${Math.max(7, scale * 1.5)}px monospace`;
  ctx.textBaseline = 'top';
  for (let i = 0; i < tileIndices.length; i++) {
    const offX = (i % cols) * 8 * scale;
    const offY = Math.floor(i / cols) * 8 * scale;
    ctx.fillText('$' + tileIndices[i].toString(16).padStart(2, '0'), offX + 1, offY + 1);
  }
  return canvas;
}

// ───────────────────── 初始化 ─────────────────────
const $ = (id: string): HTMLElement => document.getElementById(id)!;
const tbody = $('playerTbody');
const detailPane = $('detailPane');
const detailBadge = $('detailBadge');
const listCount = $('listCount');
const statTotal = $('statTotal');
const searchInput = $('searchInput') as HTMLInputElement;
const posFilter = $('posFilter') as HTMLSelectElement;

const tileService = new PlayerTileService();
let allRows: PlayerRow[] = [];
let selectedId: number | null = null;

interface PlayerRow {
  id: number;
  name: string;
  position: number;
  hairTemplateId: number;
  bodyBaseTileIdx: number;
  paletteSetId: number;
  tileCount: number;
  status: 'ok' | 'err';
  errMsg?: string;
}

function buildAllRows(): PlayerRow[] {
  const rows: PlayerRow[] = [];
  for (const p of PLAYER_TABLE) {
    const tile = findPlayerTilesById(p.id);
    const resolved = tileService.findPlayerTiles(p.id);
    let status: 'ok' | 'err' = 'ok';
    let errMsg: string | undefined;
    if (!tile) { status = 'err'; errMsg = 'PT2 not found'; }
    else if (!resolved) { status = 'err'; errMsg = 'PT3 not resolved'; }
    else if (resolved.tileSequence.length === 0) { status = 'err'; errMsg = 'empty tileSequence'; }
    rows.push({
      id: p.id,
      name: p.name,
      position: p.position,
      hairTemplateId: tile?.hairTemplateId ?? -1,
      bodyBaseTileIdx: tile?.bodyBaseTileIdx ?? -1,
      paletteSetId: tile?.paletteSetId ?? -1,
      tileCount: resolved?.tileSequence.length ?? 0,
      status,
      errMsg,
    });
  }
  return rows;
}

function renderTable(): void {
  const q = searchInput.value.trim().toLowerCase();
  const pos = posFilter.value;
  const filtered = allRows.filter((r) => {
    if (pos !== '' && r.position !== parseInt(pos, 10)) return false;
    if (!q) return true;
    const hex = r.id.toString(16).padStart(2, '0');
    if (hex.includes(q)) return true;
    if (r.name.toLowerCase().includes(q)) return true;
    return false;
  });

  tbody.innerHTML = '';
  for (const r of filtered) {
    const tr = document.createElement('tr');
    tr.className = r.status === 'err' ? 'err' : '';
    if (r.id === selectedId) tr.classList.add('selected');
    tr.dataset.id = String(r.id);
    tr.innerHTML = `
      <td class="id">0x${r.id.toString(16).padStart(2, '0')}</td>
      <td>${escapeHtml(r.name)}</td>
      <td class="${r.position === 1 ? 'pos-gk' : 'pos-fw'}">${r.position === 1 ? 'GK' : 'FW'}</td>
      <td class="hex">0x${r.hairTemplateId.toString(16).padStart(2, '0')}</td>
      <td class="hex">0x${r.bodyBaseTileIdx.toString(16).padStart(2, '0')}</td>
      <td class="hex">${r.paletteSetId}</td>
      <td class="hex">${r.tileCount}</td>
    `;
    tr.addEventListener('click', () => selectPlayer(r.id));
    tbody.appendChild(tr);
  }
  listCount.textContent = String(filtered.length);

  const okCount = allRows.filter((r) => r.status === 'ok').length;
  const errCount = allRows.filter((r) => r.status === 'err').length;
  statTotal.innerHTML = `总 <b>${allRows.length}</b> · 通过 <b class="ok">${okCount}</b> · 失败 <b class="err">${errCount}</b>`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ───────────────────── 详情面板 (含渲染) ─────────────────────
function selectPlayer(id: number): void {
  selectedId = id;
  renderTable();

  const player = findPlayerById(id);
  const tile = findPlayerTilesById(id);
  const resolved = tileService.findPlayerTiles(id);
  const color = PLAYER_COLOR_TABLE.find((c) => c.id === id);
  const frame = findSpriteFrameById(id);

  if (!player || !tile || !resolved) {
    detailPane.innerHTML = `<div class="err">解析失败: 球员 0x${id.toString(16)} 数据缺失</div>`;
    detailBadge.textContent = '错误';
    return;
  }

  detailBadge.textContent = `0x${id.toString(16).padStart(2, '0')} ${player.name}`;

  // sprite attr bit 解析
  const attr = resolved.spriteAttr;
  const palBits = attr & 0x03;
  const priority = !!(attr & 0x20);
  const flipX = !!(attr & 0x40);
  const flipY = !!(attr & 0x80);

  // 4 调色板色块
  const pal = resolved.palette.slice(0, 4);
  const swatches = pal.map((c) =>
    `<span class="swatch" style="background:${colorHex(c)}"></span><span class="hex">0x${c.toString(16).padStart(2, '0')}</span>`
  ).join(' &nbsp; ');

  // 渲染 head tiles (4 个 8x8 tile 拼 16x16) - 头型 4 tile (注: hair 实际 base 在 sprite 数据内, 这里尝试常见 base)
  const headTileBase = 0x100 + (tile.hairTemplateId & 0x0f) * 4;
  const headTiles = [headTileBase, headTileBase + 1, headTileBase + 2, headTileBase + 3];
  const headCanvas = renderTilesGrid(headTiles, pal, 2, 8);

  // 渲染 body 帧: 4 列多行, 这样立绘显示为完整人物轮廓 (32px 宽 × N 行)
  const bodyTiles = frame?.tiles ?? [tile.bodyBaseTileIdx];
  const bodyCols = 4;
  const bodyCanvas = renderTilesGrid(bodyTiles, pal, bodyCols, 4);

  // 4 帧走位动画: 各动画帧用 2D 排布
  const animCanvases = resolved.animFrames.map((f, i) => {
    const c = renderTilesGrid(f, pal, 4, 3);
    return `<div style="display:inline-block;margin:4px;text-align:center"><div style="color:#888;font-size:10px">F${i} (${f.length} tile)</div>${c.outerHTML}</div>`;
  }).join('');

  detailPane.innerHTML = `
    <div class="detail-row"><span class="k">ID</span><span class="v"><span class="id">0x${id.toString(16).padStart(2, '0')}</span></span></div>
    <div class="detail-row"><span class="k">名字</span><span class="v">${escapeHtml(player.name)} (club=${player.club}, pos=${player.position})</span></div>
    <div class="detail-row"><span class="k">Hair 模板</span><span class="v"><span class="hex">PLAYER_HAIR_TABLE[${id - 1}] = 0x${tile.hairTemplateId.toString(16).padStart(2, '0')}</span></span></div>
    <div class="detail-row"><span class="k">Body 基础 tile</span><span class="v"><span class="hex">0x${tile.bodyBaseTileIdx.toString(16).padStart(2, '0')}</span> (BANK19_SPRITE_FRAMES[${id % BANK19_SPRITE_FRAMES.length}].tiles[0])</span></div>
    <div class="detail-row"><span class="k">Palette 组</span><span class="v">${resolved.paletteSetId} (shirt 0x${(color?.shirt ?? 0).toString(16).padStart(2, '0')})</span></div>
    <div class="detail-row"><span class="k">调色板 4 色</span><span class="v">${swatches}</span></div>
    <div class="detail-row"><span class="k">Sprite attr</span><span class="v"><span class="hex">0x${attr.toString(16).padStart(2, '0')}</span> (pal=${palBits}, priority=${priority ? 'on' : 'off'}, flipX=${flipX}, flipY=${flipY})</span></div>
    <div class="detail-row"><span class="k">颜色 (明星)</span><span class="v">skin=<span class="hex">0x${(color?.skin ?? 0).toString(16).padStart(2, '0')}</span> hair=<span class="hex">0x${(color?.hair ?? 0).toString(16).padStart(2, '0')}</span> shirt=<span class="hex">0x${(color?.shirt ?? 0).toString(16).padStart(2, '0')}</span> shorts=<span class="hex">0x${(color?.shorts ?? 0).toString(16).padStart(2, '0')}</span></span></div>

    <div class="section-title">头型渲染 (PLAYER_HAIR_TABLE[${id - 1}] = 0x${tile.hairTemplateId.toString(16).padStart(2, '0')}, 4 tile)</div>
    <div class="render-box" id="renderHead"></div>

    <div class="section-title">身体帧渲染 (BANK19_SPRITE_FRAMES[0x${(id % BANK19_SPRITE_FRAMES.length).toString(16).padStart(2, '0')}], ${bodyTiles.length} tile)</div>
    <div class="render-box" id="renderBody"></div>

    <div class="section-title">4 帧走位动画</div>
    <div class="render-box" id="renderAnim"></div>

    <div class="section-title">完整 tile 序列 (${resolved.tileSequence.length} tiles)</div>
    <div class="tile-list">${resolved.tileSequence.map((t) => {
      const isZero = t === 0;
      return `<div class="tile-cell${isZero ? ' zero' : ''}">${isZero ? '·' : t.toString(16).padStart(2, '0')}</div>`;
    }).join('')}</div>

    <div class="section-title">帧 byte 字节流 (data)</div>
    <div class="byte-flow">${(frame?.tiles ?? []).map(t => t.toString(16).padStart(2, '0').toUpperCase()).join(' ')}</div>

    <div class="render-note">来源: NES_CHR_ROM[${CHR_BANK_COUNT}×${CHR_BANK_SIZE}B = ${(CHR_BANK_COUNT * CHR_BANK_SIZE / 1024).toFixed(0)}KB], sprite pattern table @ $0000</div>
  `;

  // canvas 用 appendChild 注入 (innerHTML 字符串化的 canvas 会丢绘制数据)
  document.getElementById('renderHead')!.appendChild(headCanvas);
  document.getElementById('renderBody')!.appendChild(bodyCanvas);
  const animHost = document.getElementById('renderAnim')!;
  resolved.animFrames.forEach((f, i) => {
    const c = renderTilesGrid(f, pal, 8, 2);
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:inline-block;margin:2px;text-align:center';
    const lbl = document.createElement('div');
    lbl.style.cssText = 'color:#888;font-size:10px';
    lbl.textContent = 'F' + i;
    wrap.appendChild(lbl);
    wrap.appendChild(c);
    animHost.appendChild(wrap);
  });
}

searchInput.addEventListener('input', renderTable);
posFilter.addEventListener('change', renderTable);

allRows = buildAllRows();
renderTable();
selectPlayer(0x01);
