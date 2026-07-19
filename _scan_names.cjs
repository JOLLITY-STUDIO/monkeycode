const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');

// CHR char mapping
const cmap = {
  176:'大',177:'小',178:'中',179:'上',180:'下',181:'左',182:'右',183:'前',184:'後',
  185:'空',186:'翼',187:'日',188:'向',189:'松',190:'山',191:'若',192:'林',193:'石',194:'崎',
  195:'三',196:'杉',197:'岬',198:'太',199:'郎',200:'沢',201:'田',202:'立',203:'花',204:'兄',
  205:'弟',206:'高',208:'一',209:'二',210:'四',211:'五',212:'六',213:'七',214:'八',
  215:'九',216:'十',217:'百',218:'千',
  219:'天',220:'地',221:'海',222:'王',223:'皇',
  224:'飛',225:'蹴',226:'球',228:'超',229:'必',230:'殺',231:'技',232:'守',233:'備',
  234:'攻',235:'力',236:'速',237:'度',238:'体',239:'枚',240:'数',241:'点',242:'回',243:'全',
  244:'部',245:'長',246:'主',247:'将',
  248:'東',249:'西',250:'南',251:'北',
  252:'国',253:'戦',254:'決',255:'勝',
  10:'あ',11:'い',12:'う',13:'え',14:'お',15:'か',16:'き',17:'く',18:'け',19:'こ',
  20:'さ',21:'し',22:'す',23:'せ',24:'そ',25:'た',26:'ち',27:'つ',28:'て',29:'と',
  30:'な',31:'に',32:'ぬ',33:'ね',34:'の',35:'は',36:'ひ',37:'ふ',38:'へ',39:'ほ',
  40:'ま',41:'み',42:'む',43:'め',44:'も',45:'や',46:'ゆ',47:'よ',
  48:'ら',49:'り',50:'る',51:'れ',52:'ろ',53:'わ',54:'を',55:'ん',
  56:'ア',57:'イ',58:'ウ',59:'エ',60:'オ',61:'カ',62:'キ',63:'ク',64:'ケ',65:'コ',
  66:'サ',67:'シ',68:'ス',69:'セ',70:'ソ',71:'タ',72:'チ',73:'ツ',74:'テ',75:'ト',
  76:'ナ',77:'ニ',78:'ヌ',79:'ネ',80:'ノ',81:'ハ',82:'ヒ',83:'フ',84:'ヘ',85:'ホ',
  86:'マ',87:'ミ',88:'ム',89:'メ',90:'モ',91:'ヤ',92:'ユ',93:'ヨ',
  94:'ラ',95:'リ',96:'ル',97:'レ',98:'ロ',99:'ワ',100:'ヲ',101:'ン',
  152:'ッ',153:'ャ',154:'ュ',155:'ョ',156:'ァ',157:'ィ',158:'ゥ',159:'ェ',160:'ー',
};

function hex(n){return n.toString(16).toUpperCase().padStart(2,'0');}

function decode(bytes, off, len){
  let s = '';
  for(let i=0;i<len;i++){
    const b = bytes[off+i];
    const ch = cmap[b];
    if(ch) s += ch; else s += '{'+hex(b)+'}';
  }
  return s;
}

let out = 'ROM: ' + rom.length + ' bytes\n';

// Search for known name byte sequences in PRG
const patterns = [
  {seq: [186], label: '翼'},
  {seq: [176,185,186], label: '大空翼'},
  {seq: [197,198,199], label: '岬太郎'},
  {seq: [187,188], label: '日向'},
  {seq: [189,190], label: '松山'},
  {seq: [191,192,193], label: '若林'},
  {seq: [193,194], label: '石崎'},
  {seq: [73,142,66], label: 'ツバサ'},
];

out += '\n=== Searching for kanji patterns ===\n';
for(const pat of patterns){
  const hits = [];
  for(let i=16;i<rom.length-pat.seq.length;i++){
    let ok=true;
    for(let j=0;j<pat.seq.length;j++) if(rom[i+j]!==pat.seq[j]){ok=false;break;}
    if(ok) hits.push(i);
  }
  out += pat.label + ' ['+pat.seq.map(hex).join(' ')+']: ' + (hits.length ? hits.slice(0,15).map(i=>'0x'+i.toString(16)).join(', ') : 'NOT FOUND') + '\n';
  if(hits.length > 0){
    const h = hits[0];
    out += '  context [-8..+8]: ';
    for(let d=-8;d<=8;d++) out += hex(rom[h+d])+' ';
    out += ' => ';
    out += decode(rom, h, Math.min(8, rom.length-h));
    out += '\n';
  }
}

// Now scan for player name table structure
// In many NES games, name tables are arrays of up to N bytes per player
// Try to find a region with kanji names at regular intervals
out += '\n=== Looking for name table structure in banks 06-0B ===\n';
for(let bk=0x06;bk<=0x0B;bk++){
  const base = 16 + bk * 16384;
  const end = Math.min(base + 16384, rom.length);
  let seqs = [];
  let inSeq = false, start = 0;
  for(let off=base;off<end;off++){
    if(cmap[rom[off]]){
      if(!inSeq){ inSeq=true; start=off; }
    } else {
      if(inSeq){
        const len = off-start;
        if(len >= 2 && len <= 8){
          const txt = decode(rom, start, len);
          const hasKanji = /[\u4e00-\u9fff]/.test(txt);
          if(hasKanji) seqs.push({off:start, len, txt});
        }
        inSeq=false;
      }
    }
  }
  if(seqs.length > 0){
    out += 'Bank '+hex(bk)+' (0x'+base.toString(16)+'): '+seqs.length+' text runs\n';
    for(const s of seqs.slice(0,25)){
      out += '  0x'+s.off.toString(16)+' ['+Array.from({length:s.len},(_,i)=>hex(rom[s.off+i])).join(',')+'] => '+s.txt+'\n';
    }
  }
}

fs.writeFileSync('d:/studio/github/monkeycode/_out_search.txt', out);
console.log('done');
