/**
 * 球员属性数据提取脚本 (CommonJS, write to file)
 * 用法: node src/nes/tsubasa/data/_x_dump_players.cjs
 */
var fs = require('fs');
var path = require('path');

var ROM_PATH = path.resolve(__dirname, '../romdata/Captain Tsubasa II - Super Striker (Japan).nes');
var OUT_DIR = __dirname;
var LOG_PATH = path.join(OUT_DIR, '_x_dump_log.txt');

function log(msg) {
  fs.appendFileSync(LOG_PATH, msg + '\n');
}

log('=== Starting extraction ===');
log('ROM path: ' + ROM_PATH);
log('Exists: ' + fs.existsSync(ROM_PATH));

var HEADER_SIZE = 16;
var BANK_SIZE = 16384;
var BANK_ADDR_OFFSET = 0x8000;

function bankOffset(bank, addr) {
  return HEADER_SIZE + bank * BANK_SIZE + (addr - BANK_ADDR_OFFSET);
}

function extractRosterTable(rom) {
  // CORRECTED: $AA47 ($A000-$BFFF) = MMC3 Bank 3, not Bank 1
  var rosterStart = bankOffset(3, 0xAA47);
  var rosterEnd = rosterStart + 16384;
  var matchSize = 128;
  var matches = [];
  for (var off = rosterStart; off + matchSize <= rosterEnd; off += matchSize) {
    var buf = rom.subarray(off, off + matchSize);
    var allFF = true;
    for (var j = 0; j < buf.length; j++) { if (buf[j] !== 0xFF) { allFF = false; break; } }
    if (allFF) break;
    var formation = [];
    for (var i = 0; i < 10; i++)
      formation.push(Array.from(buf.subarray(0x18 + i * 4, 0x18 + i * 4 + 4)));
    matches.push({
      teamA: Array.from(buf.subarray(0, 11)),
      teamB: Array.from(buf.subarray(0x0C, 0x17)),
      formation: formation,
      controlByte2C: buf[0x40],
      aa75: Array.from(buf.subarray(0x41, 0x41 + 64)),
    });
  }
  return matches;
}

function extractPointerTable(rom) {
  var start = bankOffset(0x0C, 0x8DC2);
  var count = 80;
  var ptrs = [];
  for (var i = 0; i < count; i++) {
    var lo = rom[start + i * 2];
    var hi = rom[start + i * 2 + 1];
    ptrs.push({ lo: lo, hi: hi, addr: lo | (hi << 8) });
  }
  return ptrs;
}

function extractClassTypeTable(rom) {
  var start = bankOffset(0x0C, 0x86B8);
  return Array.from(rom.subarray(start, start + 64));
}

function extractStatBlock05(rom) {
  var start = bankOffset(0x05, 0xABDC);
  var len = 344;
  var raw = Array.from(rom.subarray(start, start + len));
  var records = [];
  for (var i = 0; i + 8 <= raw.length; i += 8) records.push(raw.slice(i, i + 8));
  return { raw: raw, records: records };
}

function extractStatBlock03(rom) {
  var start = bankOffset(0x03, 0x951B);
  var len = 316;
  var raw = Array.from(rom.subarray(start, start + len));
  var records = [];
  for (var i = 0; i + 6 <= raw.length; i += 6) records.push(raw.slice(i, i + 6));
  return { raw: raw, records: records };
}

function extractTypeMarkers09_1360(rom) {
  var start = bankOffset(0x09, 0x9360);
  var len = 392;
  var raw = Array.from(rom.subarray(start, start + len));
  var records = [];
  for (var i = 0; i + 6 <= raw.length; i += 6) records.push(raw.slice(i, i + 6));
  return { raw: raw, records: records };
}

function extractSkillBlock09_1620(rom) {
  var start = bankOffset(0x09, 0x9620);
  var len = 228;
  var raw = Array.from(rom.subarray(start, start + len));
  var records = [];
  for (var i = 0; i + 6 <= raw.length; i += 6) records.push(raw.slice(i, i + 6));
  return { raw: raw, records: records };
}

function extractActionTable09_1720(rom) {
  var start = bankOffset(0x09, 0x9720);
  var len = 512;
  var raw = Array.from(rom.subarray(start, start + len));
  var records = [];
  for (var i = 0; i + 2 <= raw.length; i += 2) records.push(raw.slice(i, i + 2));
  return { raw: raw, records: records };
}

function extractAttrBlocks(rom, ptrs) {
  var blocks = [];
  for (var i = 8; i < 25; i++) {
    var addr = ptrs[i].addr;
    if (addr < 0x8000 || addr >= 0xC000) continue;
    var fileOff = bankOffset(0x0C, addr);
    var header = Array.from(rom.subarray(fileOff, fileOff + 3));
    var bodyLen = 0;
    while (bodyLen < 32 && rom[fileOff + 3 + bodyLen] !== 0) bodyLen++;
    var body = Array.from(rom.subarray(fileOff + 3, fileOff + 3 + bodyLen));
    blocks.push({ ptrIndex: i, addr: addr, header: header, body: body });
  }
  return blocks;
}

// ===================== MAIN =====================
var rom = fs.readFileSync(ROM_PATH);
log('ROM size: ' + rom.length + ' bytes');

var ptrs = extractPointerTable(rom);

var data = {
  description: 'Player attribute data from Captain Tsubasa II ROM',
  extractedAt: new Date().toISOString(),
  constants: { HEADER_SIZE: HEADER_SIZE, BANK_SIZE: BANK_SIZE, BANK_ADDR_OFFSET: BANK_ADDR_OFFSET },
  rosterMatches: extractRosterTable(rom),
  pointerTable: ptrs,
  classTypeTable: extractClassTypeTable(rom),
  statBlock05: extractStatBlock05(rom),
  statBlock03: extractStatBlock03(rom),
  typeMarkers09_1360: extractTypeMarkers09_1360(rom),
  skillBlock09_1620: extractSkillBlock09_1620(rom),
  actionTable09_1720: extractActionTable09_1720(rom),
  attrBlocks_Bank0C: extractAttrBlocks(rom, ptrs),
};

// Write JSON
var jsonPath = path.join(OUT_DIR, '_player_data.json');
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
log('JSON: ' + jsonPath + ' (' + Math.round(fs.statSync(jsonPath).size / 1024) + ' KB)');

// Generate TS
var tsPath = path.join(OUT_DIR, '_player_data.ts');
var tsContent = '/**\n * 天使之翼2 — 球员初始数据表\n * AUTO-GENERATED by _x_dump_players.cjs\n * Extracted: ' + data.extractedAt + '\n * Source: Captain Tsubasa II - Super Striker (Japan).nes\n */\n\n';
tsContent += 'export const PLAYER_DATA = ' + JSON.stringify(data, null, 2) + ' as const;\n';
fs.writeFileSync(tsPath, tsContent);
log('TS: ' + tsPath + ' (' + Math.round(fs.statSync(tsPath).size / 1024) + ' KB)');

log('\n=== Summary ===');
log('Roster matches: ' + data.rosterMatches.length);
log('Pointer table: ' + data.pointerTable.length + ' entries');
log('Class/type: ' + data.classTypeTable.length + ' bytes');
log('Bank $05: ' + data.statBlock05.records.length + ' recs / ' + data.statBlock05.raw.length + ' bytes');
log('Bank $03: ' + data.statBlock03.records.length + ' recs / ' + data.statBlock03.raw.length + ' bytes');
log('Type markers: ' + data.typeMarkers09_1360.records.length + ' recs / ' + data.typeMarkers09_1360.raw.length + ' bytes');
log('Skills: ' + data.skillBlock09_1620.records.length + ' recs / ' + data.skillBlock09_1620.raw.length + ' bytes');
log('Action: ' + data.actionTable09_1720.records.length + ' recs / ' + data.actionTable09_1720.raw.length + ' bytes');
log('Attr blocks: ' + data.attrBlocks_Bank0C.length);
log('=== DONE ===');
