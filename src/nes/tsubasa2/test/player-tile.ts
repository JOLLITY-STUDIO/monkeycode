/**
 * 球员 tile 素材浏览器 (PT1-PT3 验证页入口)
 *
 * 验证:
 *  - PLAYER_TABLE 45 明星 (0x01-0x2D) + 杂鱼 (0x2E-0xFF) 全部加载
 *  - findPlayerTilesById(playerId) 全部返回非 null
 *  - PlayerTileService.findPlayerTiles(playerId) 全部解析出 tileSequence + spriteAttr + palette
 *  - 渲染每球员: hair 模板、body tile、palette 4 色块、完整 tile 序列
 *  - 失败项标红
 */
import { PLAYER_TABLE, findPlayerById, PLAYER_COLOR_TABLE } from '../src/game/prg/data/tables/player-stats';
import {
  PLAYER_TILE_TABLE, findPlayerTilesById,
} from '../src/game/prg/data/tables/player-tile-table';
import { BANK19_SPRITE_FRAMES, findSpriteFrameById } from '../src/game/prg/data/tables/sprite-frame-table';
import { PlayerTileService } from '../src/game/prg/code/player/PlayerTileService';

// ───────────────────── NES 调色板 (api-test.ts 共享) ─────────────────────
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

// ───────────────────── 验证: 全部球员 ─────────────────────
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

// ───────────────────── 渲染列表 ─────────────────────
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

// ───────────────────── 详情面板 ─────────────────────
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

  // tile 序列
  const tileCellsHtml = resolved.tileSequence.map((t) => {
    const isZero = t === 0;
    return `<div class="tile-cell${isZero ? ' zero' : ''}">${isZero ? '·' : t.toString(16).padStart(2, '0')}</div>`;
  }).join('');

  // 4 帧动画预览
  const animHtml = resolved.animFrames.map((f, i) => {
    const cells = f.map((t) => {
      const isZero = t === 0;
      return `<div class="tile-cell${isZero ? ' zero' : ''}" style="width:18px;height:18px;font-size:9px">${isZero ? '·' : t.toString(16).padStart(2, '0')}</div>`;
    }).join('');
    return `<div style="margin-bottom:4px"><span style="color:#888;font-size:11px">F${i} </span><div class="tile-list" style="display:inline-flex;max-height:none;background:transparent">${cells}</div></div>`;
  }).join('');

  const frameTilesHtml = frame?.tiles.map((t) => {
    return `<div class="tile-cell" style="width:20px;height:20px">${t.toString(16).padStart(2, '0')}</div>`;
  }).join('') ?? '<span class="err">无 BANK19_SPRITE_FRAMES 匹配</span>';

  detailPane.innerHTML = `
    <div class="detail-row"><span class="k">ID</span><span class="v"><span class="id">0x${id.toString(16).padStart(2, '0')}</span></span></div>
    <div class="detail-row"><span class="k">名字</span><span class="v">${escapeHtml(player.name)} (club=${player.club}, pos=${player.position})</span></div>
    <div class="detail-row"><span class="k">Hair 模板</span><span class="v"><span class="hex">PLAYER_HAIR_TABLE[${id - 1}] = 0x${tile.hairTemplateId.toString(16).padStart(2, '0')}</span></span></div>
    <div class="detail-row"><span class="k">Body 基础 tile</span><span class="v"><span class="hex">0x${tile.bodyBaseTileIdx.toString(16).padStart(2, '0')}</span> (BANK19_SPRITE_FRAMES[${id % BANK19_SPRITE_FRAMES.length}].tiles[0])</span></div>
    <div class="detail-row"><span class="k">Palette 组</span><span class="v">${resolved.paletteSetId} (shirt 0x${(color?.shirt ?? 0).toString(16).padStart(2, '0')})</span></div>
    <div class="detail-row"><span class="k">调色板 4 色</span><span class="v">${swatches}</span></div>
    <div class="detail-row"><span class="k">Sprite attr</span><span class="v"><span class="hex">0x${attr.toString(16).padStart(2, '0')}</span> (pal=${palBits}, priority=${priority ? 'on' : 'off'}, flipX=${flipX}, flipY=${flipY})</span></div>
    <div class="detail-row"><span class="k">颜色 (明星)</span><span class="v">skin=<span class="hex">0x${(color?.skin ?? 0).toString(16).padStart(2, '0')}</span> hair=<span class="hex">0x${(color?.hair ?? 0).toString(16).padStart(2, '0')}</span> shirt=<span class="hex">0x${(color?.shirt ?? 0).toString(16).padStart(2, '0')}</span> shorts=<span class="hex">0x${(color?.shorts ?? 0).toString(16).padStart(2, '0')}</span></span></div>
    <div class="detail-row"><span class="k">Frame (BANK19)</span><span class="v">${frame ? `frameId 0x${frame.frameId.toString(16).padStart(2, '0')} (${frame.tiles.length} tiles)` : '无'}</span></div>
    <div class="detail-row"><span class="k">Frame tiles</span><span class="v"><div class="tile-list">${frameTilesHtml}</div></span></div>
    <div class="detail-row"><span class="k">完整 tile 序列 (head+body)</span><span class="v"><div class="tile-list">${tileCellsHtml}</div> (共 ${resolved.tileSequence.length} tiles)</span></div>
    <div class="detail-row"><span class="k">4 帧走位动画</span><span class="v">${animHtml}</span></div>
  `;
}

// ───────────────────── 事件 ─────────────────────
searchInput.addEventListener('input', renderTable);
posFilter.addEventListener('change', renderTable);

// ───────────────────── 启动 ─────────────────────
allRows = buildAllRows();
renderTable();
selectPlayer(0x01); // 默认 Tsubasa
