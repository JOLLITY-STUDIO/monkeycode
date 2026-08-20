const fs = require('fs');
function grep(file, re, label) {
  if (!fs.existsSync(file)) { console.log(label + ': 文件不存在'); return; }
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const hits = [];
  lines.forEach((l, i) => { if (re.test(l)) hits.push('  L' + (i + 1) + ': ' + l.trim().slice(0, 140)); });
  console.log('== ' + label + ' (' + file + ') ' + hits.length + ' 命中');
  hits.slice(0, 15).forEach(x => console.log(x));
  console.log();
}
grep('src/game/service/bank01_data-query.service.ts', /TODO|stub|未翻译|entry2|entry3|entry4|entry5/, 'bank01 entry 现状');
grep('src/game/boot.ts', /TODO|STORY|PASSWORD|RESULT/, 'boot.ts 场景路由');
grep('src/game/service/bank02/', /TODO|stub|entryC|password|PASSWORD/i, 'bank02 现状');
grep('src/game/service/bank18', /TODO|stub|章节|chapter|指针/i, 'bank18 现状');
