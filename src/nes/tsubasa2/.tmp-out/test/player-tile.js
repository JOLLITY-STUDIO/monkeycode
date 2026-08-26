/**
 * 球员 tile 素材浏览器 (PT 验证页 + 真实 OAM sprite 渲染)
 *
 * 关键修正 (PT1 v3 — BUG #001 v3 修复):
 *   BANK19_TILE_DATA 不是纯 tile 索引流, 而是 **NES OAM sprite 命令序列**:
 *     $E0 = 帧终止
 *     $E1, X = 设 Y 偏移
 *     $E4, X = 设 X 偏移
 *     $E5, $XX = slot 操作 (00=reset, 02=count=2, 03=next)
 *     $FC = 终止 x-row
 *     普通 byte 配对: (tile_index, attr_byte)
 *
 * 验证 + 渲染:
 *   - PLAYER_TABLE 255 项, 显示 hair/body/palette tile 桥接
 *   - 详情面板用 sprite-frame-table 模块的 BANK19_OAM_FRAMES[i] 真实像素绘制
 *   - (v3 fix): 解析器从 sprite-frame-table 导入, 不再本地维护
 */
import { PLAYER_TABLE, findPlayerById, PLAYER_COLOR_TABLE } from '../src/game/prg/data/tables/player-stats';
import { findPlayerTilesById, } from '../src/game/prg/data/tables/player-tile-table';
import { BANK19_OAM_FRAMES, } from '../src/game/prg/data/tables/sprite-frame-table';
import { PlayerTileService } from '../src/game/prg/code/player/PlayerTileService';
import { NES_CHR_ROM } from '../src/game/chr/index';
// ───────────── NES 调色板 ─────────────
const NES_PALETTE = [
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
// NES PPU sprite palette ($3F11-$3F1F) 4 组, 每组 4 色
// 这些是真实 PPU palette RAM 默认值, sprite 4 组共用一个 master palette
const NES_SPRITE_PALETTES = [
    [0x0F, 0x11, 0x21, 0x30],
    [0x0F, 0x29, 0x19, 0x09],
    [0x0F, 0x30, 0x27, 0x16],
    [0x0F, 0x36, 0x17, 0x00],
];
function attrPalette(attr) {
    return NES_SPRITE_PALETTES[attr & 0x03] ?? NES_SPRITE_PALETTES[0];
}
// ───────────── CHR tile 读取 (8x8 NES 2bpp) ─────────────
// sprite pattern table 默认 $0000 (PPUCTRL bit3=0)
const SPRITE_PATTERN_BASE = 0x0000;
function getTileByte(tileIndex, byteOffset) {
    const chrOffset = (SPRITE_PATTERN_BASE + ((tileIndex & 0x3ff) * 16) + (byteOffset & 0x0f)) & 0x1FFF;
    return NES_CHR_ROM[chrOffset] ?? 0;
}
// ───────────── 单 tile 渲染 ─────────────
function renderOneTile(ctx, tileIdx, palette, scale, offX, offY) {
    for (let yy = 0; yy < 8; yy++) {
        const p0 = getTileByte(tileIdx, yy);
        const p1 = getTileByte(tileIdx, yy + 8);
        for (let xx = 0; xx < 8; xx++) {
            const colorIdx = ((p0 >> (7 - xx)) & 1) | (((p1 >> (7 - xx)) & 1) << 1);
            if (colorIdx === 0)
                continue;
            const pi = palette[colorIdx & 0x03] & 0x3f;
            const c = NES_PALETTE[pi];
            if (!c)
                continue;
            ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
            ctx.fillRect(offX + xx * scale, offY + yy * scale, scale, scale);
        }
    }
}
const colorHex = (idx) => {
    const [r, g, b] = NES_PALETTE[idx & 0x3f];
    return `rgb(${r},${g},${b})`;
};
// ───────────── OAM stream 解析器 (v3 fix: 改用 sprite-frame-table 共享模块) ─────────────
console.log('[player-tile] OAM frames loaded:', BANK19_OAM_FRAMES.length, 'total sprites:', BANK19_OAM_FRAMES.reduce((s, f) => s + f.sprites.length, 0));
/** 渲染 1 个 sprite frame 实际像素 (按 OAM sprite + attr palette) */
function renderOamFrame(frame, scale = 4) {
    if (frame.sprites.length === 0) {
        const c = document.createElement('canvas');
        c.width = c.height = 1;
        return c;
    }
    // 计算 sprite 整体 bounding box
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const s of frame.sprites) {
        if (s.x < minX)
            minX = s.x;
        if (s.y < minY)
            minY = s.y;
        if (s.x + 8 > maxX)
            maxX = s.x + 8;
        if (s.y + 8 > maxY)
            maxY = s.y + 8;
    }
    const w = (maxX - minX) * scale + 8; // +8 padding
    const h = (maxY - minY) * scale + 8;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return canvas;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, w, h);
    // 画每个 sprite
    for (const s of frame.sprites) {
        const pal = attrPalette(s.attr);
        renderOneTile(ctx, s.tile, pal, scale, (s.x - minX) * scale + 4, (s.y - minY) * scale + 4);
    }
    return canvas;
}
// ───────────── 初始化 ─────────────
const $ = (id) => document.getElementById(id);
const tbody = $('playerTbody');
const detailPane = $('detailPane');
const detailBadge = $('detailBadge');
const listCount = $('listCount');
const statTotal = $('statTotal');
const searchInput = $('searchInput');
const posFilter = $('posFilter');
const tileService = new PlayerTileService();
let allRows = [];
let selectedId = null;
function buildAllRows() {
    const rows = [];
    for (const p of PLAYER_TABLE) {
        const tile = findPlayerTilesById(p.id);
        const resolved = tileService.findPlayerTiles(p.id);
        let status = 'ok';
        let errMsg;
        if (!tile) {
            status = 'err';
            errMsg = 'PT2 not found';
        }
        else if (!resolved) {
            status = 'err';
            errMsg = 'PT3 not resolved';
        }
        else if (resolved.tileSequence.length === 0) {
            status = 'err';
            errMsg = 'empty tileSequence';
        }
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
function renderTable() {
    const q = searchInput.value.trim().toLowerCase();
    const pos = posFilter.value;
    const filtered = allRows.filter((r) => {
        if (pos !== '' && r.position !== parseInt(pos, 10))
            return false;
        if (!q)
            return true;
        const hex = r.id.toString(16).padStart(2, '0');
        if (hex.includes(q))
            return true;
        if (r.name.toLowerCase().includes(q))
            return true;
        return false;
    });
    tbody.innerHTML = '';
    for (const r of filtered) {
        const tr = document.createElement('tr');
        tr.className = r.status === 'err' ? 'err' : '';
        if (r.id === selectedId)
            tr.classList.add('selected');
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
function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
// ───────────── 详情 (含 OAM sprite 真实渲染) ─────────────
function selectPlayer(id) {
    selectedId = id;
    renderTable();
    const player = findPlayerById(id);
    const tile = findPlayerTilesById(id);
    const resolved = tileService.findPlayerTiles(id);
    const color = PLAYER_COLOR_TABLE.find((c) => c.id === id);
    if (!player || !tile || !resolved) {
        detailPane.innerHTML = `<div class="err">解析失败: 球员 0x${id.toString(16)} 数据缺失</div>`;
        detailBadge.textContent = '错误';
        return;
    }
    detailBadge.textContent = `0x${id.toString(16).padStart(2, '0')} ${player.name}`;
    // 找此球员对应的 OAM frame (按 playerId → frameId)
    // 暂用 playerId 直接索引 OAM frames (BANK19_SPRITE_FRAMES 也是按这个约定)
    let frameIdx = id;
    if (frameIdx >= BANK19_OAM_FRAMES.length)
        frameIdx = 0;
    const oamFrame = BANK19_OAM_FRAMES[frameIdx] ?? BANK19_OAM_FRAMES[0];
    // 4 个调色板色块 (用 sprite attr 默认 palette 0 来显示)
    const pal = attrPalette(0);
    const swatches = pal.map((c) => `<span class="swatch" style="background:${colorHex(c)}"></span><span class="hex">0x${c.toString(16).padStart(2, '0')}</span>`).join(' &nbsp; ');
    // 真实 sprite 渲染
    const oamCanvas = renderOamFrame(oamFrame, 6);
    detailPane.innerHTML = `
    <div class="detail-row"><span class="k">ID</span><span class="v"><span class="id">0x${id.toString(16).padStart(2, '0')}</span></span></div>
    <div class="detail-row"><span class="k">名字</span><span class="v">${escapeHtml(player.name)} (club=${player.club}, pos=${player.position})</span></div>
    <div class="detail-row"><span class="k">Hair 模板</span><span class="v"><span class="hex">PLAYER_HAIR_TABLE[${id - 1}] = 0x${tile.hairTemplateId.toString(16).padStart(2, '0')}</span></span></div>
    <div class="detail-row"><span class="k">Body 基础 tile</span><span class="v"><span class="hex">0x${tile.bodyBaseTileIdx.toString(16).padStart(2, '0')}</span></span></div>
    <div class="detail-row"><span class="k">Sprite palette 0 4 色</span><span class="v">${swatches}</span></div>

    <div class="section-title">球员立绘 (OAM_FRAMES[${frameIdx}], ${oamFrame.sprites.length} sprite)</div>
    <div class="render-box" id="renderOam"></div>

    <div class="section-title">OAM sprite 列表 (${oamFrame.sprites.length} 个)</div>
    <div class="byte-flow">${oamFrame.sprites.map((s, i) => `S${i}: tile=0x${s.tile.toString(16).padStart(2, '0')} attr=0x${s.attr.toString(16).padStart(2, '0')} pos=(${s.x},${s.y})`).join('  ')}</div>

    <div class="render-note">OAM stream 解析: parseBank19Stream() · sprite pattern table @ $0000 · palette 从 sprite attr 低 2 bit 选 PPU $3F11-$3F1F 4 组</div>
  `;
    document.getElementById('renderOam').appendChild(oamCanvas);
}
searchInput.addEventListener('input', renderTable);
posFilter.addEventListener('change', renderTable);
allRows = buildAllRows();
renderTable();
selectPlayer(0x01);
