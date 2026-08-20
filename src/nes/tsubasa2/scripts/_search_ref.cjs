// 在 ROM 参考文件中搜索字符/文本相关章节
const fs = require('fs');
const s = fs.readFileSync('_tmp_bzk_out/CaptainTsubasaVol.II-SuperStrikerROM修改参考.txt','utf8');
const lines = s.split('\n');
const kws = ['char','charac','text','font','tile','kana','kata','hira','japanese','jap','字','假名','字符','字母','table','A0','D7','88CA','8A14','character'];
for(let i=0;i<lines.length;i++){
  const l = lines[i];
  if(/char|text|font|kana|kata|hira|jap|字|假名|字符|字母/.test(l)){
    console.log(`L${i}: ${l.trim()}`);
  }
}
