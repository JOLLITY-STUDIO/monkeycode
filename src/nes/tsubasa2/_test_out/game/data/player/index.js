"use strict";
/**
 * 球员目录表 (Data/Model 层) — 球员编号 → 名称/位置
 *
 * 来源: CaptainTsubasaVol.II-SuperStrikerROM.txt (ROM Hacking Guide by Whipon)
 *   - Character Digits (球员编号表 0x01-0x75)
 *   - Character Stats  (门将 {GK} 标记)
 *
 * 编号即 RAM 中 Player 字段 ($0300 起每 12 字节) 存储的值。
 * 仅供 DataQueryService / MatchService 使用 (bank=service, data=model)。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAYER_MAP = exports.PLAYERS = void 0;
exports.getPlayer = getPlayer;
// ═══════════════════════════════════════════════════════════════
// 球员目录 (Character Digits)
// 01-0B 圣保罗 (Brazil) | 0C-22 南葛/日本 | 23-2F 巴西国家队等
// 30-3F 全明星日本 | 40-4C 日本青年队 | 4D-56 亚洲 | 57-75 世界各队
// ═══════════════════════════════════════════════════════════════
exports.PLAYERS = [
    // ── 01-0B 圣保罗 (Sao Paulo) ──
    { id: 0x01, nameEn: 'Tsubasa', nameJa: '大空 翼', nameZh: '大空翼', role: 'field' },
    { id: 0x02, nameEn: 'Lennart', nameJa: 'レナート', nameZh: '雷納托', role: 'GK' },
    { id: 0x03, nameEn: 'Lima', nameJa: 'リマ', nameZh: '利馬', role: 'field' },
    { id: 0x04, nameEn: 'Marini', nameJa: 'マリーニ', nameZh: '馬里尼', role: 'field' },
    { id: 0x05, nameEn: 'Amaral', nameJa: 'アマラウ', nameZh: '阿馬拉爾', role: 'field' },
    { id: 0x06, nameEn: 'Dottil', nameJa: 'ドゥトール', nameZh: '杜托爾', role: 'field' },
    { id: 0x07, nameEn: 'Battista', nameJa: 'バチスタ', nameZh: '巴蒂斯塔', role: 'field' },
    { id: 0x08, nameEn: 'Tahamata', nameJa: 'タハマタ', nameZh: '塔哈馬塔', role: 'field' },
    { id: 0x09, nameEn: 'Babinton', nameJa: 'バビントン', nameZh: '巴賓頓', role: 'field' },
    { id: 0x0A, nameEn: 'Gil', nameJa: 'ジル', nameZh: '吉爾', role: 'field' },
    { id: 0x0B, nameEn: 'Platton', nameJa: 'プラトン', nameZh: '普拉頓', role: 'field' },
    // ── 0C-1B 南葛 (Nankatsu) ──
    { id: 0x0C, nameEn: 'Urabe', nameJa: '浦辺 反次', nameZh: '浦邊反次', role: 'field' },
    { id: 0x0D, nameEn: 'Kishida', nameJa: '岸田 猛', nameZh: '岸田猛', role: 'field' },
    { id: 0x0E, nameEn: 'Nakayama', nameJa: '中山 政人', nameZh: '中山政人', role: 'field' },
    { id: 0x0F, nameEn: 'Morisaki', nameJa: '森崎 有三', nameZh: '森崎有三', role: 'GK' },
    { id: 0x10, nameEn: 'Takasugu', nameJa: '高杉 真吾', nameZh: '高杉真吾', role: 'field' },
    { id: 0x11, nameEn: 'Misaki', nameJa: '岬 太郎', nameZh: '岬太郎', role: 'field' },
    { id: 0x12, nameEn: 'Izawa', nameJa: '井沢 守', nameZh: '井澤守', role: 'field' },
    { id: 0x13, nameEn: 'Taki', nameJa: '滝 一', nameZh: '瀧一', role: 'field' },
    { id: 0x14, nameEn: 'Ishizaki', nameJa: '石崎 了', nameZh: '石崎了', role: 'field' },
    { id: 0x15, nameEn: 'Nitta', nameJa: '新田 瞬', nameZh: '新田瞬', role: 'field' },
    { id: 0x16, nameEn: 'Kisugi', nameJa: '来生 哲兵', nameZh: '來生哲兵', role: 'field' },
    { id: 0x17, nameEn: 'Masao', nameJa: '立花 政夫', nameZh: '立花政夫', role: 'field' },
    { id: 0x18, nameEn: 'Kazuo', nameJa: '立花 和夫', nameZh: '立花和夫', role: 'field' },
    { id: 0x19, nameEn: 'Sano', nameJa: '佐野 満', nameZh: '佐野滿', role: 'field' },
    { id: 0x1A, nameEn: 'Hyuga', nameJa: '日向 小次郎', nameZh: '日向小次郎', role: 'field' },
    { id: 0x1B, nameEn: 'Souta', nameJa: '早田 誠', nameZh: '早田誠', role: 'field' },
    // ── 1C-22 日本国家队 ──
    { id: 0x1C, nameEn: 'Jitou', nameJa: '次藤 洋', nameZh: '次藤洋', role: 'field' },
    { id: 0x1D, nameEn: 'Matsuyama', nameJa: '松山 光', nameZh: '松山光', role: 'field' },
    { id: 0x1E, nameEn: 'Sorimachi', nameJa: '反町 一樹', nameZh: '反町一樹', role: 'field' },
    { id: 0x1F, nameEn: 'Sawada', nameJa: '沢田 タケシ', nameZh: '澤田武志', role: 'field' },
    { id: 0x20, nameEn: 'Misugi', nameJa: '三杉 淳', nameZh: '三杉淳', role: 'field' },
    { id: 0x21, nameEn: 'Wakabayashi', nameJa: '若林 源三', nameZh: '若林源三', role: 'GK' },
    { id: 0x22, nameEn: 'Wakashimazu', nameJa: '若島津 健', nameZh: '若島津健', role: 'GK' },
    // ── 23-2F 巴西队 ──
    { id: 0x23, nameEn: 'Satilst', nameJa: 'サトルステギ', nameZh: '薩托斯泰吉', role: 'field' },
    { id: 0x24, nameEn: 'Riverio', nameJa: 'リベリオ', nameZh: '里維里奧', role: 'field' },
    { id: 0x25, nameEn: 'Da Silva', nameJa: 'ダ・シルバ', nameZh: '達席爾瓦', role: 'field' },
    { id: 0x26, nameEn: 'Meon', nameJa: 'メオン', nameZh: '梅昂', role: 'GK' },
    { id: 0x27, nameEn: 'Toninho', nameJa: 'トニーニョ', nameZh: '托尼紐', role: 'field' },
    { id: 0x28, nameEn: 'Nei', nameJa: 'ネイ', nameZh: '內伊', role: 'field' },
    { id: 0x29, nameEn: 'Zagalo', nameJa: 'ザガロ', nameZh: '扎加洛', role: 'field' },
    { id: 0x2A, nameEn: 'Dircil', nameJa: 'ディルセウ', nameZh: '迪爾修', role: 'field' },
    { id: 0x2B, nameEn: 'Carlos', nameJa: 'カルロス・サンターナ', nameZh: '卡洛斯・山塔拿', role: 'field' },
    { id: 0x2C, nameEn: 'Santamaria', nameJa: 'サンタマリア', nameZh: '聖馬利亞', role: 'field' },
    { id: 0x2D, nameEn: 'Jethrio', nameJa: 'ジェットリオ', nameZh: '傑特里奧', role: 'field' },
    { id: 0x2E, nameEn: 'Jitou', nameJa: '次藤 洋', nameZh: '次藤洋', role: 'field' },
    { id: 0x2F, nameEn: 'Sano', nameJa: '佐野 満', nameZh: '佐野滿', role: 'field' },
    // ── 30-3F 全明星日本 ──
    { id: 0x30, nameEn: 'Masao', nameJa: '立花 政夫', nameZh: '立花政夫', role: 'field' },
    { id: 0x31, nameEn: 'Kazuo', nameJa: '立花 和夫', nameZh: '立花和夫', role: 'field' },
    { id: 0x32, nameEn: 'Souta', nameJa: '早田 誠', nameZh: '早田誠', role: 'field' },
    { id: 0x33, nameEn: 'Nakanishi', nameJa: '中西 太一', nameZh: '中西太一', role: 'GK' },
    { id: 0x34, nameEn: 'Misugi', nameJa: '三杉 淳', nameZh: '三杉淳', role: 'field' },
    { id: 0x35, nameEn: 'Matsuyama', nameJa: '松山 光', nameZh: '松山光', role: 'field' },
    { id: 0x36, nameEn: 'Hyuga', nameJa: '日向 小次郎', nameZh: '日向小次郎', role: 'field' },
    { id: 0x37, nameEn: 'Sorimachi', nameJa: '反町 一樹', nameZh: '反町一樹', role: 'field' },
    { id: 0x38, nameEn: 'Sawada', nameJa: '沢田 タケシ', nameZh: '澤田武志', role: 'field' },
    { id: 0x39, nameEn: 'Wakashimazu', nameJa: '若島津 健', nameZh: '若島津健', role: 'GK' },
    { id: 0x3A, nameEn: 'Rampion', nameJa: 'ランピオン', nameZh: '蘭皮翁', role: 'field' },
    { id: 0x3B, nameEn: 'Victor', nameJa: 'ビクトリーノ', nameZh: '維克多利諾', role: 'field' },
    { id: 0x3C, nameEn: 'Da Silva', nameJa: 'ダ・シルバ', nameZh: '達席爾瓦', role: 'field' },
    { id: 0x3D, nameEn: 'Kapilman', nameJa: 'カペロマン', nameZh: '卡培爾曼', role: 'field' },
    { id: 0x3E, nameEn: 'Kaltz', nameJa: 'ヘルマン・カルツ', nameZh: '赫爾曼・卡爾茲', role: 'field' },
    { id: 0x3F, nameEn: 'Metzer', nameJa: 'メッツァ', nameZh: '梅查', role: 'field' },
    // ── 40-4C 日本青年队 ──
    { id: 0x40, nameEn: 'WakaBayashi', nameJa: '若林 源三', nameZh: '若林源三', role: 'GK' },
    { id: 0x41, nameEn: 'Hyuga', nameJa: '日向 小次郎', nameZh: '日向小次郎', role: 'field' },
    { id: 0x42, nameEn: 'Nitta', nameJa: '新田 瞬', nameZh: '新田瞬', role: 'field' },
    { id: 0x43, nameEn: 'Sano', nameJa: '佐野 満', nameZh: '佐野滿', role: 'field' },
    { id: 0x44, nameEn: 'Misaki', nameJa: '岬 太郎', nameZh: '岬太郎', role: 'field' },
    { id: 0x45, nameEn: 'Misugi', nameJa: '三杉 淳', nameZh: '三杉淳', role: 'field' },
    { id: 0x46, nameEn: 'Masao', nameJa: '立花 政夫', nameZh: '立花政夫', role: 'field' },
    { id: 0x47, nameEn: 'Kazuo', nameJa: '立花 和夫', nameZh: '立花和夫', role: 'field' },
    { id: 0x48, nameEn: 'Jitou', nameJa: '次藤 洋', nameZh: '次藤洋', role: 'field' },
    { id: 0x49, nameEn: 'Ishzaki', nameJa: '石崎 了', nameZh: '石崎了', role: 'field' },
    { id: 0x4A, nameEn: 'Souta', nameJa: '早田 誠', nameZh: '早田誠', role: 'field' },
    { id: 0x4B, nameEn: 'Matsuyama', nameJa: '松山 光', nameZh: '松山光', role: 'field' },
    { id: 0x4C, nameEn: 'Wakashimazu', nameJa: '若島津 健', nameZh: '若島津健', role: 'GK' },
    // ── 4D-56 亚洲队 ──
    { id: 0x4D, nameEn: 'LiHan', nameJa: '李 邦漢', nameZh: '李邦漢', role: 'field' },
    { id: 0x4E, nameEn: 'Li Ba', nameJa: '李 邦竜', nameZh: '李邦龍', role: 'field' },
    { id: 0x4F, nameEn: 'Sya', nameJa: '車 仁天', nameZh: '車仁天', role: 'field' },
    { id: 0x50, nameEn: 'Kim', nameJa: '金 現代', nameZh: '金現代', role: 'field' },
    { id: 0x51, nameEn: 'Mach', nameJa: 'マッハ', nameZh: '馬赫', role: 'field' },
    { id: 0x52, nameEn: 'Jaich', nameJa: 'ジャイチ', nameZh: '賈伊奇', role: 'GK' },
    { id: 0x53, nameEn: 'Lorima', nameJa: 'ロリマー', nameZh: '羅利馬', role: 'field' },
    { id: 0x54, nameEn: 'Robson', nameJa: 'ロボソン', nameZh: '羅賓遜', role: 'field' },
    { id: 0x55, nameEn: 'Belaef', nameJa: 'ベラエフ', nameZh: '貝拉耶夫', role: 'field' },
    { id: 0x56, nameEn: 'Lashin', nameJa: 'ラシン', nameZh: '拉辛', role: 'GK' },
    // ── 57-75 世界各队 ──
    { id: 0x57, nameEn: 'Napoleon', nameJa: 'ルイ・ナポレオン', nameZh: '路易・拿破崙', role: 'field' },
    { id: 0x58, nameEn: 'Pierr', nameJa: 'エル・シド・ピエール', nameZh: '艾爾・西多・皮埃爾', role: 'field' },
    { id: 0x59, nameEn: 'Espera', nameJa: 'エスパダ', nameZh: '埃斯帕達', role: 'field' },
    { id: 0x5A, nameEn: 'Rampion', nameJa: 'ランピオン', nameZh: '蘭皮翁', role: 'field' },
    { id: 0x5B, nameEn: 'Hernandez', nameJa: 'ジノ・ヘルナンデス', nameZh: '狄諾・赫南德茲', role: 'GK' },
    { id: 0x5C, nameEn: 'Islas', nameJa: 'イスラス', nameZh: '伊斯拉斯', role: 'field' },
    { id: 0x5D, nameEn: 'Ribla', nameJa: 'リベラ', nameZh: '里貝拉', role: 'field' },
    { id: 0x5E, nameEn: 'Pascal', nameJa: 'アラン・パスカル', nameZh: '阿蘭・帕斯卡', role: 'field' },
    { id: 0x5F, nameEn: 'Satilst', nameJa: 'サトルステギ', nameZh: '薩托斯泰吉', role: 'field' },
    { id: 0x60, nameEn: 'Dias', nameJa: 'ファン・ディアス', nameZh: '胡安・迪亞斯', role: 'field' },
    { id: 0x61, nameEn: 'Babinton', nameJa: 'バビントン', nameZh: '巴賓頓', role: 'field' },
    { id: 0x62, nameEn: 'Galvin', nameJa: 'ガルバン', nameZh: '加爾萬', role: 'field' },
    { id: 0x63, nameEn: 'Schneider', nameJa: 'カール・ハインツ・シュナイダー', nameZh: '卡爾・海因茨・施奈德', role: 'field' },
    { id: 0x64, nameEn: 'Margis', nameJa: 'マーガス', nameZh: '馬加斯', role: 'field' },
    { id: 0x65, nameEn: 'Kaltz', nameJa: 'ヘルマン・カルツ', nameZh: '赫爾曼・卡爾茲', role: 'field' },
    { id: 0x66, nameEn: 'Metzer', nameJa: 'メッツァ', nameZh: '梅查', role: 'field' },
    { id: 0x67, nameEn: 'Schister', nameJa: 'フランツ・シェスター', nameZh: '弗朗茨・席斯特', role: 'field' },
    { id: 0x68, nameEn: 'Kapilman', nameJa: 'カペロマン', nameZh: '卡培爾曼', role: 'field' },
    { id: 0x69, nameEn: 'Muller', nameJa: 'デューター・ミューラー', nameZh: '迪特・穆勒', role: 'GK' },
    { id: 0x6A, nameEn: 'Carlos', nameJa: 'カルロス・サンターナ', nameZh: '卡洛斯・山塔拿', role: 'field' },
    { id: 0x6B, nameEn: 'Zagalo', nameJa: 'ザガロ', nameZh: '扎加洛', role: 'field' },
    { id: 0x6C, nameEn: 'Riverio', nameJa: 'リベリオ', nameZh: '里維里奧', role: 'field' },
    { id: 0x6D, nameEn: 'Nei', nameJa: 'ネイ', nameZh: '內伊', role: 'field' },
    { id: 0x6E, nameEn: 'Santamaria', nameJa: 'サンタマリア', nameZh: '聖馬利亞', role: 'field' },
    { id: 0x6F, nameEn: 'Toninho', nameJa: 'トニーニョ', nameZh: '托尼紐', role: 'field' },
    { id: 0x70, nameEn: 'Dottil', nameJa: 'ドゥトール', nameZh: '杜托爾', role: 'field' },
    { id: 0x71, nameEn: 'Amaral', nameJa: 'アマラウ', nameZh: '阿馬拉爾', role: 'field' },
    { id: 0x72, nameEn: 'Dircil', nameJa: 'ディルセウ', nameZh: '迪爾修', role: 'field' },
    { id: 0x73, nameEn: 'Jethrio', nameJa: 'ジェットリオ', nameZh: '傑特里奧', role: 'field' },
    { id: 0x74, nameEn: 'Gertise', nameJa: 'ゲルティス', nameZh: '傑爾蒂斯', role: 'GK' },
    { id: 0x75, nameEn: 'Coimbra', nameJa: 'コインブラ', nameZh: '辛巴拉', role: 'field' },
];
// ═══════════════════════════════════════════════════════════════
// 快速查找
// ═══════════════════════════════════════════════════════════════
/** 球员编号 → 条目 (快速查找) */
exports.PLAYER_MAP = new Map(exports.PLAYERS.map(p => [p.id, p]));
/** 按编号获取球员 */
function getPlayer(id) {
    return exports.PLAYER_MAP.get(id);
}
