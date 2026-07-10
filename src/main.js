import { NES, Controller } from 'jsnes';
import {
  capturePatternTable, captureNametable, captureSprites,
  captureSpriteVisualization, capturePalettes, captureAudioState,
  captureCpuState, disassembleAt,
  clusterSpritesIntoTiles, resetEntityTracking,
  startRecording, stopRecording, recordFrame, getRecordingSummary,
  exportSpriteSheet,
  getEntityTypeInfo, getAllEntityTypes, registerEntityType,
  analyzeScene, getCurrentSceneId, getAllScenes,
  captureAudioFingerprint, recordAudioFrame, flushAudioSamples,
  classifyAudio, getAudioPhrases, getAudioSamples,
} from './capture.js';
import { renderPatternTable, renderNametable, renderSpriteViz, drawColorSwatch } from './renderers.js';
import { AutoRunner } from './auto.js';

const SCREEN_W = 256, SCREEN_H = 240;
const KEY_MAP = {
  ArrowUp: 4, ArrowDown: 5, ArrowLeft: 6, ArrowRight: 7,
  KeyZ: 0, KeyX: 1, KeyA: 0, KeyB: 1,
  Enter: 3, Space: 2,
  ShiftRight: 2, ShiftLeft: 2,
};

// ---- Audio ----
let audioCtx = null, scriptNode = null, audioOn = false;
const audioBuf = [];
function initAudio() {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext||window.webkitAudioContext)({sampleRate:44100});
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch(e) { console.warn('Audio init failed:', e); }
}
function startAudio() {
  if (audioOn) return;
  if (!audioCtx) initAudio();
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  audioOn = true;
  audioBuf.length = 0;

  // 使用较大缓冲区减少卡顿
  try {
    scriptNode = audioCtx.createScriptProcessor(1024, 0, 1);
  } catch(e) {
    scriptNode = audioCtx.createScriptProcessor(2048, 0, 1);
  }
  scriptNode.onaudioprocess = (e) => {
    const out = e.outputBuffer.getChannelData(0);
    for (let i = 0; i < out.length; i++) {
      out[i] = audioBuf.length > 0 ? audioBuf.shift() / 32768 : 0;
    }
  };
  scriptNode.connect(audioCtx.destination);

  nes.opts.emulateSound = true;
  nes.opts.onAudioSample = (l, r) => {
    if (!audioOn) return;
    const avg = (l + r) / 2;
    audioBuf.push(avg);
    if (audioBuf.length > 16384) audioBuf.splice(0, 8192);
  };
  document.getElementById('audioStatus').textContent = '播放中';
}
function stopAudio() {
  audioOn = false;
  if (scriptNode) { scriptNode.disconnect(); scriptNode = null; }
  nes.opts.emulateSound = false;
  nes.opts.onAudioSample = null;
  audioBuf.length = 0;
  const el = document.getElementById('audioStatus'); if (el) el.textContent = '已停';
}

// ---- NES ----
const nes = new NES({
  onFrame: (b) => renderScreen(b),
  onAudioSample: null,
  onStatusUpdate: (m) => console.log('[NES]', m),
});

const gameCanvas = document.getElementById('gameCanvas');
const gameCtx = gameCanvas.getContext('2d');
const gameImg = gameCtx.createImageData(SCREEN_W, SCREEN_H);
const gameBuf = new Uint32Array(gameImg.data.buffer);
for (let i=0;i<SCREEN_W*SCREEN_H;i++) gameBuf[i]=0xFF000000;
gameCtx.putImageData(gameImg, 0, 0);

function renderScreen(b) {
  for (let i=0;i<SCREEN_W*SCREEN_H;i++) gameBuf[i]=0xFF000000|b[i];
  gameImg.data.set(new Uint8ClampedArray(gameImg.data.buffer));
  gameCtx.putImageData(gameImg, 0, 0);
}

// ---- State ----
const auto = new AutoRunner(nes);
let running = false, paused = false, animId = null;
let frameCount = 0, totalFrames = 0;
let framesPerTick = 1; // 加速倍率
let manualMode = false;
let lastCapture = 0;
let newFramesThisSecond = 0, newFramesLastSec = 0;
let entitiesLastSample = 0;

const $ = (id) => document.getElementById(id);

function setButtons(loaded) {
  ['btnStop','btnExport','btnFaster','btnTakeover','btnDownload'].forEach(id => $(id).disabled = !loaded);
  $('btnDownload').disabled = true;
}

// ---- ROM Load → Auto Start ----
$('romFile').addEventListener('change', (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      nes.loadROM(new Uint8Array(r.result));
      setButtons(true);
      resetEntityTracking();
      nes.frame();
      console.log('[ROM]', f.name);
      // 自动开始
      startAutoMode();
    } catch(err) { console.error(err); alert('ROM fail: '+err.message); }
  };
  r.readAsArrayBuffer(f);
});

function startAutoMode() {
  manualMode = false;
  totalFrames = 0;
  newFramesThisSecond = 0;
  lastCapture = performance.now();
  resetEntityTracking();
  startRecording();
  auto.reset();
  auto.start();
  running = true;
  paused = false;
  $('statStatus').textContent = '自动探索中...';
  $('statStatus').style.color = '#0f0';
  frameCount = 0;
  initAudio();
  startAudio();
  frameLoop();
}

$('btnStop').addEventListener('click', () => {
  running = false;
  auto.stop();
  if (animId) { cancelAnimationFrame(animId); animId = null; }
  flushAudioSamples(totalFrames);
  classifyAudio();
  $('statStatus').textContent = '已停止';
  $('statStatus').style.color = '#e94560';
  exportCurrentSheet();
});

$('btnFaster').addEventListener('click', () => {
  framesPerTick = framesPerTick >= 8 ? 1 : framesPerTick * 2;
  $('btnFaster').textContent = `加速 x${framesPerTick}`;
});

$('btnTakeover').addEventListener('click', () => {
  manualMode = !manualMode;
  if (manualMode) {
    auto.stop();
    $('btnTakeover').textContent = '交还自动';
    $('btnTakeover').classList.add('active');
    $('statStatus').textContent = '手动控制';
    $('statStatus').style.color = '#ff0';
  } else {
    auto.reset();
    auto.start();
    $('btnTakeover').textContent = '接管控制';
    $('btnTakeover').classList.remove('active');
    $('statStatus').textContent = '自动探索中...';
    $('statStatus').style.color = '#0f0';
  }
});

$('btnExport').addEventListener('click', exportCurrentSheet);

$('btnAudio').addEventListener('click', () => {
  if (audioOn) { stopAudio(); $('btnAudio').textContent = '启用音频'; }
  else { initAudio(); startAudio(); $('btnAudio').textContent = '停止音频'; }
});

// ---- Frame Loop ----
function frameLoop() {
  if (!running) return;
  try {
    for (let i = 0; i < framesPerTick && running; i++) {
      if (!manualMode) auto.tick();
      nes.frame();
      totalFrames++;

      // 每 6 帧采样音频指纹
      if (totalFrames % 6 === 0) {
        const ah = captureAudioFingerprint(nes);
        recordAudioFrame(ah, totalFrames);
      }
    }
    frameCount++;
    if (frameCount % 10 === 0) captureAndUpdate();
  } catch(e) {
    console.error('[Frame]', e);
    running = false;
    $('statStatus').textContent = '错误: '+e.message;
    $('statStatus').style.color = '#f00';
    return;
  }
  animId = requestAnimationFrame(frameLoop);
}

// ---- Capture & Update ----
function captureAndUpdate() {
  const now = performance.now();
  $('statFrames').textContent = totalFrames;

  try {
    const sprites = captureSprites(nes);
    if (sprites) {
      const ppu = nes.ppu;
      if (ppu) {
        const entities = clusterSpritesIntoTiles(sprites, ppu);
        recordFrame(entities);
        $('statEntities').textContent = entities.length;

        // 场景分类
        const scene = analyzeScene(nes);
        if (scene) {
          $('statScene').textContent = scene.id > 0 ? `#${scene.id} ${scene.type}` : '--';
          if (scene.isNew) {
            $('statScene').style.color = '#ff0';
            setTimeout(() => { $('statScene').style.color = '#0f0'; }, 2000);
          } else {
            $('statScene').style.color = '#0f0';
          }
        }

        // 统计新模式
        const summary = getRecordingSummary();
        let sf = 0;
        for (const s of summary) sf += s.frameCount;
        $('statSframes').textContent = sf;
        newFramesThisSecond += (sf - entitiesLastSample);
        entitiesLastSample = sf;
      }
    }
  } catch(e) {}

  // 每秒统计
  if (now - lastCapture >= 1000) {
    $('statPattern').textContent = auto.currentPatternName || '--';
    $('statPattern').style.color = '#0f0';
    newFramesLastSec = newFramesThisSecond;
    newFramesThisSecond = 0;
    lastCapture = now;
    updateAllPanels();

    // 连续 5 秒无新模式 → 自动导出
    if (newFramesLastSec === 0 && totalFrames > 300) {
      const lastSheet = $('sheetInfo').textContent;
      if (!lastSheet.includes('自动导出')) {
        flushAudioSamples(totalFrames);
        classifyAudio();
        exportCurrentSheet();
        $('sheetInfo').textContent += ' [自动导出]';
      }
    }
  }

  // 每 30 帧更新当前活动 tab
  if (frameCount % 30 === 0) {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
      switch (activeTab.id) {
        case 'tab-entities': updateEntityPanel(); break;
        case 'tab-cpu': updateCpuPanel(); break;
        case 'tab-audio': updateAudioPanel(); break;
        case 'tab-debug': updateDebugPanel(); break;
        case 'tab-sheet': updateSheetPanel(); break;
      }
    }
  }
}

function updateAllPanels() {
  updateSheetPanel();
  updateProgress();
}

function updateProgress() {
  const summary = getRecordingSummary();
  let total = 0, maxFrames = 50;
  for (const s of summary) total += s.frameCount;
  const pct = Math.min(100, Math.round((total / maxFrames) * 100));
  $('progressBar').style.width = pct + '%';
}

const CAT_LABELS_CN = { character: '角色', object: '物件', tile: '瓦片' };

// ---- Sheet Panel ----
function updateSheetPanel() {
  updateProgress();
  const summary = getRecordingSummary();
  if (summary.length === 0) return;

  const list = $('entityAnimList');
  list.innerHTML = summary.map(s =>
    `<div class="entity-card" style="margin-bottom:3px;padding:3px;">
      <span style="font-size:10px;color:#e94560">Entity #${s.entityId}</span>
      <span style="font-size:9px;color:#ff0">[${s.typeName || '?'}]</span>
      <span style="font-size:9px;color:#0f0">[${CAT_LABELS_CN[s.category] || '物件'}]</span>
      <span style="font-size:9px;color:#888"> ${s.frameCount}帧</span>
    </div>`).join('');

  // 场景列表
  const scenes = getAllScenes();
  if (scenes.length > 0) {
    $('sceneList').innerHTML = scenes.map(s =>
      `<div class="entity-card" style="margin-bottom:2px;padding:2px;border-left:3px solid ${s.id === getCurrentSceneId() ? '#0f0' : '#444'};">
        <span style="font-size:9px;color:#4fc3f7">#${s.id} ${s.type}</span>
        <span style="font-size:8px;color:#888"> 精灵:${s.spriteCount} 瓦片:${s.tileVariety}种 出现:${s.visits}次</span>
      </div>`).join('');
  } else {
    $('sceneList').innerHTML = '';
  }

  // BGM/SFX 摘要
  const phrases = getAudioPhrases();
  if (phrases.length > 0) {
    const el = $('audioPhrasesSheet');
    if (el) el.innerHTML = phrases.map(p =>
      `<div style="font-size:9px;padding:2px;border-left:3px solid ${p.type==='BGM'?'#4fc3f7':'#ffb74d'};margin-bottom:2px">
        <b>${p.name}</b> [${p.type}] x${p.occurrences} 场景:${p.scenes.map(s=>`#${s}`).join(',')}
      </div>`).join('');
  } else {
    const el = $('audioPhrasesSheet');
    if (el) el.innerHTML = '';
  }
}

function exportCurrentSheet() {
  const sheet = exportSpriteSheet();
  if (!sheet) { $('sheetInfo').textContent = '无数据'; return; }
  const cv = $('sheetCanvas');
  cv.width = sheet.width;
  cv.height = sheet.height;
  const ctx = cv.getContext('2d');
  const img = ctx.createImageData(sheet.width, sheet.height);
  for (let i=0;i<sheet.width*sheet.height;i++) {
    const v = sheet.buffer[i];
    img.data[i*4]=(v>>16)&0xFF; img.data[i*4+1]=(v>>8)&0xFF;
    img.data[i*4+2]=v&0xFF; img.data[i*4+3]=v>>>24;
  }
  ctx.putImageData(img, 0, 0);
  const cats = sheet.sections.map(s => `${s.label}x${s.frames.length}`).join(' ');
  const info = `${sheet.frameCount}帧 | ${sheet.frameW}x${sheet.frameH}px | ${cats}`;
  $('sheetInfo').textContent = info;
  $('btnDownload').disabled = false;

  const base64 = cv.toDataURL('image/png').split(',')[1];
  const ts = Date.now();

  // 保存 PNG 图集
  fetch('/api/save-png', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: `sprites-${ts}.png`, data: base64 }),
  }).then(r => r.json()).then(j => {
    if (j.ok) $('sheetInfo').textContent = info + ` | 已保存: output/sprites-${ts}.png`;
  }).catch(() => {});

  // 保存 JSON 元数据（场景 + 实体类型 + 音频）
  const scenes = getAllScenes().map(s => ({
    id: s.id, type: s.type, spriteCount: s.spriteCount,
    tileVariety: s.tileVariety, visits: s.visits,
  }));
  const entityTypes = getAllEntityTypes().map(t => ({
    id: t.typeId, name: t.name, spriteCount: t.spriteCount,
    width: t.width, height: t.height,
    entityCount: t.entityCount, frameCount: t.frameCount,
  }));
  const audio = classifyAudio().map(a => ({
    id: a.id, type: a.type, name: a.name,
    occurrences: a.occurrences, totalDuration: a.totalDuration,
    scenes: a.scenes,
  }));
  const metadata = {
    game: '半熟英雄',
    totalFrames,
    spriteFrames: sheet.frameCount,
    scenes,
    entityTypes,
    audio,
    exportedAt: new Date().toISOString(),
  };
  fetch('/api/save-png', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `metadata-${ts}.json`,
      data: btoa(unescape(encodeURIComponent(JSON.stringify(metadata, null, 2)))),
    }),
  }).catch(() => {});
}

$('btnDownload').addEventListener('click', () => {
  const cv = $('sheetCanvas');
  const base64 = cv.toDataURL('image/png').split(',')[1];
  const fname = `sprites-${Date.now()}.png`;
  fetch('/api/save-png', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: fname, data: base64 }),
  }).then(r => r.json()).then(j => {
    if (j.ok) $('sheetInfo').textContent += ` | 已保存: output/${fname}`;
  }).catch(() => {});
});

// ---- Entity Panel ----
function updateEntityPanel() {
  const sprites = captureSprites(nes);
  if (!sprites) return;
  const ppu = nes.ppu;
  if (!ppu) return;
  const entities = clusterSpritesIntoTiles(sprites, ppu);
  const container = $('entityList');

  if (entities.length === 0) {
    container.innerHTML = '<div class="no-data">当前帧无可见精灵</div>';
    return;
  }

  container.innerHTML = entities.slice(0, 16).map(e => {
    const cid = 'ec-'+e.id+'-'+Date.now();
    setTimeout(() => {
      const cv = document.getElementById(cid);
      if (!cv) return;
      cv.width = Math.max(e.width, 1);
      cv.height = Math.max(e.height, 1);
      const ctx = cv.getContext('2d');
      const img = ctx.createImageData(cv.width, cv.height);
      for (let i=0;i<e.width*e.height;i++) {
        const v=e.buffer[i];
        img.data[i*4]=(v>>16)&0xFF; img.data[i*4+1]=(v>>8)&0xFF;
        img.data[i*4+2]=v&0xFF; img.data[i*4+3]=v?0xFF:0;
      }
      ctx.putImageData(img, 0, 0);
    }, 0);
    const tinfo = getEntityTypeInfo(e.id);
    const scale = Math.max(e.width, e.height) > 32 ? 2 : 3;
    return `<div class="entity-card">
      <h4>#${e.id} <span style="color:#0f0;font-size:9px">${tinfo ? tinfo.name : '?'}</span> (${e.spriteCount} tiles)</h4>
      <div class="meta">${e.width}x${e.height} @ (${e.x},${e.y}) Pal:${e.palette}</div>
      <canvas id="${cid}" width="${Math.max(e.width,1)}" height="${Math.max(e.height,1)}"
        class="pixel" style="transform:scale(${scale});transform-origin:top left;margin:4px 0"></canvas>
      <div class="meta">Tiles: ${e.sprites.map(s=>'$'+s.tileIndex.toString(16).padStart(2,'0')).join(' ')}</div>
    </div>`;
  }).join('');
}

// ---- CPU Panel ----
function updateCpuPanel() {
  const s = captureCpuState(nes);
  if (!s) return;
  const pc = s.pc!=null?s.pc:0;
  $('cpuPC').textContent = '$'+(pc&0xFFFF).toString(16).padStart(4,'0').toUpperCase();
  $('cpuA').textContent = '$'+(s.a&0xFF).toString(16).padStart(2,'0').toUpperCase();
  $('cpuX').textContent = '$'+(s.x&0xFF).toString(16).padStart(2,'0').toUpperCase();
  $('cpuY').textContent = '$'+(s.y&0xFF).toString(16).padStart(2,'0').toUpperCase();
  $('cpuSP').textContent = '$'+(s.sp&0xFF).toString(16).padStart(2,'0').toUpperCase();
  const fl = [s.p&0x80?'N':'n',s.p&0x40?'V':'v',s.p&0x10?'B':'b',s.p&0x08?'D':'d',s.p&0x04?'I':'i',s.p&0x02?'Z':'z',s.p&0x01?'C':'c'];
  $('cpuP').textContent = fl.join(' ');

  try {
    const lines = disassembleAt(nes, pc, 18);
    $('disasmBox').innerHTML = lines.map(l =>
      `<div class="disasm-line${l.isCurrent?' current':''}">
        <span class="addr">${l.marker} $${l.addr.toString(16).padStart(4,'0')}</span>
        <span class="bytes">${l.bytes}</span>
        <span class="mnemonic">${l.name}</span>
        <span class="operand">${l.operand||''}</span>
      </div>`).join('');
  } catch(e) {}
}

// ---- Audio Panel ----
function updateAudioPanel() {
  const s = captureAudioState(nes);
  if (!s) return;
  const ch = (el,n,ch,en) => {
    const e = $(el); if(!e)return;
    e.innerHTML=`<h4>${n} <span style="color:${en?'#0f0':'#f00'}">[${en?'ON':'OFF'}]</span></h4>
      <div>Len:${ch.lengthCounter} Timer:${ch.progTimerMax} Vol:${ch.masterVolume} Env:${ch.envVolume??'--'}</div>`;
  };
  ch('chSq1','方波1',s.square1,s.channelEnable&1);
  ch('chSq2','方波2',s.square2,s.channelEnable&2);
  ch('chTri','三角波',s.triangle,s.channelEnable&4);
  ch('chNoi','噪声',s.noise,s.channelEnable&8);
  ch('chDmc','DMC',s.dmc,s.channelEnable&16);

  const phrases = getAudioPhrases();
  if (phrases.length > 0) {
    const el = $('audioPhrases');
    if (el) el.innerHTML = phrases.slice(0, 8).map(p =>
      `<div style="font-size:9px;padding:2px;border-left:3px solid ${p.type==='BGM'?'#4fc3f7':'#ffb74d'}">
        <b>${p.name}</b> [${p.type}] 出现${p.occurrences}次 场景:${p.scenes.join(',')}
      </div>`).join('');
  }
}

// ---- Debug Panel ----
function updateDebugPanel() {
  const ppu = nes.ppu;
  if (!ppu||!ppu.vramMem) return;
  renderPatternTable($('ptCanvas0'), capturePatternTable(ppu.vramMem, 0x0000, ppu.palTable.curTable));
  renderPatternTable($('ptCanvas1'), capturePatternTable(ppu.vramMem, 0x1000, ppu.palTable.curTable));
  renderNametable($('ntCanvas0'), captureNametable(nes, 0));
  renderSpriteViz($('spriteVizCanvas'), captureSpriteVisualization(nes));
}

// ---- Tabs ----
document.querySelectorAll('.tab-btn').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const tab = $('tab-'+b.dataset.tab);
    tab.classList.add('active');
    // 立即更新当前 tab
    switch(tab.id) {
      case 'tab-entities': updateEntityPanel(); break;
      case 'tab-cpu': updateCpuPanel(); break;
      case 'tab-audio': updateAudioPanel(); break;
      case 'tab-debug': updateDebugPanel(); break;
      case 'tab-sheet': updateSheetPanel(); break;
    }
  });
});

// ---- Manual Keyboard (接管模式) ----
window.addEventListener('keydown', (e) => {
  if (!manualMode) return;
  const btn = KEY_MAP[e.code];
  if (btn != null) { e.preventDefault(); nes.buttonDown(1, btn); }
});
window.addEventListener('keyup', (e) => {
  if (!manualMode) return;
  const btn = KEY_MAP[e.code];
  if (btn != null) { e.preventDefault(); nes.buttonUp(1, btn); }
});

setButtons(false);
