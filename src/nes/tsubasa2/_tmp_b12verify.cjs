const fs = require('fs');
// 1. dmc-samples.ts 导出检查
const d = fs.readFileSync('src/game/data/prg/audio/dmc-samples.ts', 'utf8');
const m = d.match(/export const (DMC_SAMPLE_[ABC])(?:[^=]*)= \[([\s\S]*?)\];/g) || d.match(/export const (DMC_SAMPLE_[ABC])[^=]*=[^[]*\[([\s\S]*?)\];/g);
console.log('dmc-samples.ts lines:', d.split('\n').length);
for (const name of ['DMC_SAMPLE_A', 'DMC_SAMPLE_B', 'DMC_SAMPLE_C', 'DMC_SAMPLES_BY_ADDR']) {
  const mm = d.match(new RegExp('export const ' + name + '[\\s\\S]*?\\[([\\s\\S]*?)\\];'));
  if (mm) {
    const n = (mm[1].match(/0x[0-9A-Fa-f]+/g) || []).length;
    console.log(name + ': ' + n + ' bytes');
  } else console.log(name + ': NOT FOUND');
}
// 2. bank12 service 无 PRG_BANK 依赖确认
for (const f of ['src/game/service/bank12_audio_engine.ts', 'src/game/service/bank12_audio.service.ts', 'src/game/data/prg/bank12_audio_tables.ts']) {
  const t = fs.readFileSync(f, 'utf8');
  const hit = t.split('\n').filter(l => /import.*PRG_BANK|from '\.\.?\/.*prg-bank/i.test(l));
  console.log('\n' + f + ': PRG_BANK import = ' + (hit.length ? hit.join('; ') : '无'));
}
// 3. 与 asm/bank30 数据对照: bank30 $C000-$C2BF
// 找 bank30-data.ts 或 _full.s 中 $C000 段
const b30 = fs.readFileSync('src/game/data/prg/bank30-data.ts', 'utf8');
const head = b30.split('\n').slice(0, 25);
console.log('\nbank30-data.ts 头部注释:');
head.forEach(l => console.log('  ' + l.trim().slice(0, 110)));
