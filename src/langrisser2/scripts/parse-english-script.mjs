/**
 * parse-english-script.mjs — 解析 fan translation → DialogueData.ts
 *
 * 输入: english-script.txt (Renolan 整理的英文主线文本)
 * 输出: game/data/DialogueData.ts
 *
 * 用法: node scripts/parse-english-script.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const INPUT = resolve(ROOT, 'english-script.txt');
const OUTPUT = resolve(ROOT, 'game', 'data', 'DialogueData.ts');

// ============================================================================
// Normalize name variants to consistent English names
// ============================================================================
const NAME_MAP = {
  'Hain': 'Hein', 'Scott': 'Scott', 'Riana': 'Liana',
  'Larna': 'Lana', 'Lester': 'Lester', 'Cherie': 'Cherie',
  'Elwin': 'Elwin', 'Leon': 'Leon', 'Baldo': 'Baldo',
  'Laird': 'Laird', 'Zolm': 'Zolm', 'Vargas': 'Vargas',
  'Morgan': 'Morgan', 'Rolan': 'Rolan', 'Aaron': 'Aaron',
  'Sherry': 'Cherie', 'Keith': 'Keith',
};

function normalizeName(s) {
  return NAME_MAP[s] || s;
}

// ============================================================================
function parseScript(raw) {
  const lines = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const scenarios = [];
  let sc = null;          // current scenario
  let seq = [];           // current dialogue sequence
  let speaker = null;
  let textBuf = [];
  let phase = 'search';   // search | prologue | prologue_text | dialogue

  function commitLine() {
    if (speaker && textBuf.length) {
      const txt = textBuf.join(' ').replace(/\s+/g, ' ').trim();
      if (txt) seq.push({ speaker: normalizeName(speaker), text: txt });
      textBuf = [];
      speaker = null;
    }
  }

  function commitSequence() {
    if (seq.length) {
      if (!sc.dialogues) sc.dialogues = [];
      sc.dialogues.push({
        trigger: seq[0]._trigger || '',
        lines: seq.filter(d => !d._trigger).map(d => ({ speaker: d.speaker, text: d.text })),
      });
      seq = [];
    }
  }

  function newScenario(id, title) {
    commitLine();
    commitSequence();
    scenarios.push({ id, title, prologue: '', dialogues: [] });
    sc = scenarios[scenarios.length - 1];
    seq = [];
    speaker = null;
    textBuf = [];
    phase = 'search';
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();
    if (!line && phase !== 'prologue_text') continue;

    // ── Scenario boundary (tolerate trailing spaces/manual typos) ──
    const scMatch = rawLine.match(/^Scenario (\?)?(\d+)\s+"(.+)"\s*$/);
    if (scMatch) {
      newScenario(scMatch[1] ? `?${scMatch[2]}` : scMatch[2], scMatch[3]);
      continue;
    }
    if (!sc) continue;

    // ── Prologue start: "Prologue:", "*Prologue:", "Prologue*:" ──
    if (phase === 'search' && line.match(/^\*?Prologue\*?:/)) {
      commitLine();
      commitSequence();
      phase = 'prologue';
      continue;
    }

    // ── Prologue → prologue_text transition ──
    if (phase === 'prologue') {
      // Empty pr skip conditions
      if (!line) continue;
      if (line.startsWith('X Win') || line.startsWith('X Lose')) continue;
      // Opening quote on separate line → skip it
      if (line === '"') { phase = 'prologue_text'; continue; }
      // Text starts (with or without opening quote, maybe with * prefix)
      phase = 'prologue_text';
      // Fall through to prologue_text handler below
    }

    // ── Prologue text ──
    if (phase === 'prologue_text') {
      // Safety: if we encounter a new scenario heading, force-close prologue
      if (rawLine.match(/^Scenario (\?)?(\d+)\s+"/)) {
        phase = 'search';
        // Reprocess this line as scenario boundary
        const sm = rawLine.match(/^Scenario (\?)?(\d+)\s+"(.+)"\s*$/);
        if (sm) {
          newScenario(sm[1] ? `?${sm[2]}` : sm[2], sm[3]);
          continue;
        }
      }
      // Prologue terminators (in priority order):
      // 1. ">> " dialogue trigger → end prologue, continue to dialogue handler
      if (line.startsWith('>> ')) {
        phase = 'search';
        // Fall through to dialogue handler below
      }
      // 2. Closing quote alone or at end of condition line
      else if (line === '"' || line.endsWith('"')) {
        const txt = line === '"' ? '' : line.slice(0, -1).trim();
        if (txt && !txt.startsWith('X Win') && !txt.startsWith('X Lose')) {
          sc.prologue += (sc.prologue ? ' ' : '') + txt;
        }
        phase = 'search';
        continue;
      }
      // 3. Continue collecting prologue text
      else if (line) {
        if (line.startsWith('X Win') || line.startsWith('X Lose')) continue;
        const txt = line.replace(/^["*]/, '').trim();
        if (txt) sc.prologue += (sc.prologue ? ' ' : '') + txt;
        continue;
      } else {
        continue; // skip empty lines in prologue
      }
    }

    // ── After prologue_text → dialogue handling ──
    if (phase === 'search') {
      // Skip menu sections entirely
      if (line.match(/^(Hiring\/Equipping|General Post|Hero Command|Options Menu|Introduction|Contents:)/)) {
        phase = 'skip';
        continue;
      }
      if (phase === 'skip' && !line.match(/^Scenario (\d+)/)) continue;

      // Dialogue trigger point
      if (line.startsWith('>> ')) {
        commitLine();
        commitSequence();
        const trigger = line.replace(/^>>\s*/, '');
        seq = [{ speaker: '', text: '', _trigger: trigger }];
        speaker = null;
        textBuf = [];
        continue;
      }

      // Skip condition / meta lines
      if (line.startsWith('X Win') || line.startsWith('X Lose')) continue;
      if (line.match(/^(---{3,}|={3,})/)) continue;

      // Bracket descriptions → narrator
      if (line.startsWith('(') && line.endsWith(')')) {
        commitLine();
        seq.push({ speaker: 'Narrator', text: line.replace(/^\(/, '').replace(/\)$/, '').trim() });
        continue;
      }

      // Speaker: text detection
      const spMatch = line.match(/^(\*?)([A-Z][A-Za-z '’\-.()]*?):\s*(.*)/);
      if (spMatch) {
        commitLine();
        speaker = spMatch[2].trim();
        textBuf = [spMatch[3]];
        continue;
      }

      // Continuation of speaker text  
      if (speaker && line) {
        textBuf.push(line);
        continue;
      }

      // Blank line with active speaker → commit
      if (!line && speaker) {
        commitLine();
        continue;
      }
    }
  }

  // Final flush
  commitLine();
  commitSequence();
  return scenarios;
}

// ============================================================================
function cleanPrologue(t) {
  return t.replace(/\s+/g, ' ').trim();
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// ============================================================================
function generateTS(scenarios) {
  const L = [];
  L.push(`/**`);
  L.push(` * DialogueData.ts — 关卡对话数据 (auto-generated)`);
  L.push(` * 来源: english-script.txt (Renolan fan translation)`);
  L.push(` * 生成: node scripts/parse-english-script.mjs`);
  L.push(` */`);
  L.push(``);
  L.push(`export interface DialogueLine { speaker: string; text: string; }`);
  L.push(`export interface DialogueSequence { trigger: string; lines: DialogueLine[]; }`);
  L.push(`export interface ScenarioDialogue {`);
  L.push(`  id: string; title: string; prologue: string; dialogues: DialogueSequence[];`);
  L.push(`}`);
  L.push(``);
  L.push(`export const SCENARIO_DIALOGUES: Record<string, ScenarioDialogue> = {`);

  for (const s of scenarios) {
    const key = s.id.replace('?', 's');
    L.push(`  '${key}': { id: '${key}', title: '${esc(s.title)}',`);
    L.push(`    prologue: '${esc(cleanPrologue(s.prologue))}',`);
    L.push(`    dialogues: [`);
    for (const d of s.dialogues) {
      if (!d.lines.length) continue;
      L.push(`      { trigger: '${esc(d.trigger)}', lines: [`);
      for (const l of d.lines) {
        L.push(`        { speaker: '${esc(l.speaker)}', text: '${esc(l.text)}' },`);
      }
      L.push(`      ] },`);
    }
    L.push(`    ],`);
    L.push(`  },`);
  }
  L.push(`};`);
  L.push(``);
  L.push(`export function getPrologue(id: number|string): string {`);
  L.push(`  return SCENARIO_DIALOGUES[String(id)]?.prologue || '';`);
  L.push(`}`);
  L.push(`export function getScenarioTitle(id: number|string): string {`);
  L.push(`  return SCENARIO_DIALOGUES[String(id)]?.title || \`Scenario \${id}\`;`);
  L.push(`}`);
  L.push(`export function getDialogueLines(id: number|string): DialogueLine[] {`);
  L.push(`  const sc = SCENARIO_DIALOGUES[String(id)];`);
  L.push(`  if (!sc) return [];`);
  L.push(`  const r: DialogueLine[] = [];`);
  L.push(`  for (const seq of sc.dialogues) for (const l of seq.lines) r.push(l);`);
  L.push(`  return r;`);
  L.push(`}`);

  return L.join('\n');
}

// ============================================================================
const raw = readFileSync(INPUT, 'utf-8');
const scenarios = parseScript(raw);

console.log(`Parsed ${scenarios.length} scenarios:`);
for (const s of scenarios) {
  const dc = s.dialogues.reduce((a, d) => a + d.lines.length, 0);
  console.log(`  Scenario ${s.id}: "${s.title}" — ${s.prologue.length}c prologue, ${dc} lines`);
}

const code = generateTS(scenarios);
writeFileSync(OUTPUT, code, 'utf-8');
console.log(`\nGenerated: ${OUTPUT}  (${(code.length/1024).toFixed(1)} KB)`);
