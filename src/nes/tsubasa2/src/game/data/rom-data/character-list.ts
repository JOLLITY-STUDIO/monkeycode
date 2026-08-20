/**
 * 角色列表 (117 个明星角色 ID→名称映射)
 *
 * 来源: ROM修改参考.txt Character Digits + tools/tsubasa2-mod-nes
 * 真实 ROM 角色编号 0x01-0x75 (部分 2E-4C 是日本杯/世界杯重复队员)
 *
 * ID 映射 (与 ROM $0300+ 运行时槽位的 Player ID 一致):
 *   01 Tsubasa 大空翼 / 21 Wakabayashi 若林源三 / 1A Hyuga 日向小次郎 ...
 *
 * 数据来源文档: docs/rom-data-locations.md
 */

/** 角色单条定义 */
export interface CharacterEntry {
  /** ROM 角色 ID (0x01-0x75) */
  id: number;
  /** 英文名 */
  name: string;
  /** 中文名 */
  nameCn: string;
  /** 是否门将 (从名称后缀 {GK} 判断) */
  isGk: boolean;
}

/**
 * 117 角色完整列表 (真实 ROM 数据)
 * 顺序: 01-75 按 ROM修改参考.txt Character Digits 顺序
 */
export const CHARACTER_LIST: readonly CharacterEntry[] = [
  { id: 0x01, name: 'Tsubasa', nameCn: '大空翼', isGk: false },
  { id: 0x02, name: 'Lennart', nameCn: '雷纳托', isGk: true },
  { id: 0x03, name: 'Lima', nameCn: '利马', isGk: false },
  { id: 0x04, name: 'Marini', nameCn: '马里尼', isGk: false },
  { id: 0x05, name: 'Amaral', nameCn: '阿马拉尔', isGk: false },
  { id: 0x06, name: 'Dottil', nameCn: '杜托尔', isGk: false },
  { id: 0x07, name: 'Battista', nameCn: '巴蒂斯塔', isGk: false },
  { id: 0x08, name: 'Tahamata', nameCn: '塔哈马塔', isGk: false },
  { id: 0x09, name: 'Babinton', nameCn: '巴宾顿', isGk: false },
  { id: 0x0A, name: 'Gil', nameCn: '吉尔', isGk: false },
  { id: 0x0B, name: 'Platton', nameCn: '普拉顿', isGk: false },
  { id: 0x0C, name: 'Urabe', nameCn: '浦边反次', isGk: false },
  { id: 0x0D, name: 'Kishida', nameCn: '岸田猛', isGk: false },
  { id: 0x0E, name: 'Nakayama', nameCn: '中山政人', isGk: false },
  { id: 0x0F, name: 'Morisaki', nameCn: '森崎有三', isGk: true },
  { id: 0x10, name: 'Takasugu', nameCn: '高杉真吾', isGk: false },
  { id: 0x11, name: 'Misaki', nameCn: '岬太郎', isGk: false },
  { id: 0x12, name: 'Izawa', nameCn: '井泽守', isGk: false },
  { id: 0x13, name: 'Taki', nameCn: '泷一', isGk: false },
  { id: 0x14, name: 'Ishizaki', nameCn: '石崎了', isGk: false },
  { id: 0x15, name: 'Nitta', nameCn: '新田瞬', isGk: false },
  { id: 0x16, name: 'Kisugi', nameCn: '来生哲兵', isGk: false },
  { id: 0x17, name: 'Masao', nameCn: '立花政夫', isGk: false },
  { id: 0x18, name: 'Kazuo', nameCn: '立花和夫', isGk: false },
  { id: 0x19, name: 'Sano', nameCn: '佐野满', isGk: false },
  { id: 0x1A, name: 'Hyuga', nameCn: '日向小次郎', isGk: false },
  { id: 0x1B, name: 'Souta', nameCn: '早田诚', isGk: false },
  { id: 0x1C, name: 'Jitou', nameCn: '次藤洋', isGk: false },
  { id: 0x1D, name: 'Matsuyama', nameCn: '松山光', isGk: false },
  { id: 0x1E, name: 'Sorimachi', nameCn: '反町一树', isGk: false },
  { id: 0x1F, name: 'Sawada', nameCn: '泽田武志', isGk: false },
  { id: 0x20, name: 'Misugi', nameCn: '三杉淳', isGk: false },
  { id: 0x21, name: 'Wakabayashi', nameCn: '若林源三', isGk: true },
  { id: 0x22, name: 'Wakashimazu', nameCn: '若岛津健', isGk: true },
  { id: 0x23, name: 'Satilst', nameCn: '萨托斯泰吉', isGk: false },
  { id: 0x24, name: 'Riverio', nameCn: '里维里奥', isGk: false },
  { id: 0x25, name: 'Da Silva', nameCn: '达席尔瓦', isGk: false },
  { id: 0x26, name: 'Meon', nameCn: '梅昂', isGk: true },
  { id: 0x27, name: 'Toninho', nameCn: '托尼纽', isGk: false },
  { id: 0x28, name: 'Nei', nameCn: '内伊', isGk: false },
  { id: 0x29, name: 'Zagalo', nameCn: '扎加洛', isGk: false },
  { id: 0x2A, name: 'Dircil', nameCn: '迪尔修', isGk: false },
  { id: 0x2B, name: 'Carlos', nameCn: '卡洛斯·山塔拿', isGk: false },
  { id: 0x2C, name: 'Santamaria', nameCn: '圣马利亚', isGk: false },
  { id: 0x2D, name: 'Jethrio', nameCn: '杰特里奥', isGk: false },
  // 0x2E-0x4C: 日本杯/世界杯重复队员 (Jitou/Sano/Masao/Kazuo/Souta/Misugi/Matsuyama/Hyuga/Sorimachi/Sawada/Wakabayashi/Wakashimazu)
  { id: 0x2E, name: 'Jitou2', nameCn: '次藤洋(日本杯)', isGk: false },
  { id: 0x2F, name: 'Sano2', nameCn: '佐野满(日本杯)', isGk: false },
  { id: 0x30, name: 'Masao2', nameCn: '立花政夫(日本杯)', isGk: false },
  { id: 0x31, name: 'Kazuo2', nameCn: '立花和夫(日本杯)', isGk: false },
  { id: 0x32, name: 'Souta2', nameCn: '早田诚(日本杯)', isGk: false },
  { id: 0x33, name: 'Nakanishi', nameCn: '中西太一', isGk: true },
  { id: 0x34, name: 'Misugi2', nameCn: '三杉淳(日本杯)', isGk: false },
  { id: 0x35, name: 'Matsuyama2', nameCn: '松山光(日本杯)', isGk: false },
  { id: 0x36, name: 'Hyuga2', nameCn: '日向小次郎(日本杯)', isGk: false },
  { id: 0x37, name: 'Sorimachi2', nameCn: '反町一树(日本杯)', isGk: false },
  { id: 0x38, name: 'Sawada2', nameCn: '泽田武志(日本杯)', isGk: false },
  { id: 0x39, name: 'Wakashimazu2', nameCn: '若岛津健(日本杯)', isGk: true },
  { id: 0x3A, name: 'Rampion', nameCn: '兰皮翁', isGk: false },
  { id: 0x3B, name: 'Victor', nameCn: '维克多利诺', isGk: false },
  { id: 0x3C, name: 'DaSilva2', nameCn: '达席尔瓦(世界杯)', isGk: false },
  { id: 0x3D, name: 'Kapilman', nameCn: '卡培尔曼', isGk: false },
  { id: 0x3E, name: 'Kaltz', nameCn: '赫尔曼·卡尔兹', isGk: false },
  { id: 0x3F, name: 'Metzer', nameCn: '梅查', isGk: false },
  { id: 0x40, name: 'Wakabayashi2', nameCn: '若林源三(世界杯)', isGk: true },
  { id: 0x41, name: 'Hyuga3', nameCn: '日向小次郎(世界杯)', isGk: false },
  { id: 0x42, name: 'Nitta2', nameCn: '新田瞬(世界杯)', isGk: false },
  { id: 0x43, name: 'Sano3', nameCn: '佐野满(世界杯)', isGk: false },
  { id: 0x44, name: 'Misaki2', nameCn: '岬太郎(世界杯)', isGk: false },
  { id: 0x45, name: 'Misugi3', nameCn: '三杉淳(世界杯)', isGk: false },
  { id: 0x46, name: 'Masao3', nameCn: '立花政夫(世界杯)', isGk: false },
  { id: 0x47, name: 'Kazuo3', nameCn: '立花和夫(世界杯)', isGk: false },
  { id: 0x48, name: 'Jitou3', nameCn: '次藤洋(世界杯)', isGk: false },
  { id: 0x49, name: 'Ishizaki2', nameCn: '石崎了(世界杯)', isGk: false },
  { id: 0x4A, name: 'Souta3', nameCn: '早田诚(世界杯)', isGk: false },
  { id: 0x4B, name: 'Matsuyama3', nameCn: '松山光(世界杯)', isGk: false },
  { id: 0x4C, name: 'Wakashimazu3', nameCn: '若岛津健(世界杯)', isGk: true },
  { id: 0x4D, name: 'LiHan', nameCn: '李邦汉', isGk: false },
  { id: 0x4E, name: 'LiBa', nameCn: '李邦龙', isGk: false },
  { id: 0x4F, name: 'Sya', nameCn: '车仁天', isGk: false },
  { id: 0x50, name: 'Kim', nameCn: '金现代', isGk: false },
  { id: 0x51, name: 'Mach', nameCn: '马赫', isGk: false },
  { id: 0x52, name: 'Jaich', nameCn: '贾伊奇', isGk: true },
  { id: 0x53, name: 'Lorima', nameCn: '罗利马', isGk: false },
  { id: 0x54, name: 'Robson', nameCn: '罗宾逊', isGk: false },
  { id: 0x55, name: 'Belaef', nameCn: '贝拉耶夫', isGk: false },
  { id: 0x56, name: 'Lashin', nameCn: '拉辛', isGk: true },
  { id: 0x57, name: 'Napoleon', nameCn: '拿破仑', isGk: false },
  { id: 0x58, name: 'Pierr', nameCn: '皮埃尔', isGk: false },
  { id: 0x59, name: 'Espera', nameCn: '埃斯帕达', isGk: false },
  { id: 0x5A, name: 'Rampion2', nameCn: '兰皮翁(阿根廷)', isGk: false },
  { id: 0x5B, name: 'Hernandez', nameCn: '赫南德斯', isGk: true },
  { id: 0x5C, name: 'Islas', nameCn: '伊斯拉斯', isGk: false },
  { id: 0x5D, name: 'Ribla', nameCn: '里贝拉', isGk: false },
  { id: 0x5E, name: 'Pascal', nameCn: '帕斯卡', isGk: false },
  { id: 0x5F, name: 'Satilst2', nameCn: '萨托斯泰吉(世界杯)', isGk: false },
  { id: 0x60, name: 'Dias', nameCn: '迪亚斯', isGk: false },
  { id: 0x61, name: 'Babinton2', nameCn: '巴宾顿(阿根廷)', isGk: false },
  { id: 0x62, name: 'Galvin', nameCn: '加尔万', isGk: false },
  { id: 0x63, name: 'Schneider', nameCn: '施奈德', isGk: false },
  { id: 0x64, name: 'Margis', nameCn: '马加斯', isGk: false },
  { id: 0x65, name: 'Kaltz2', nameCn: '卡尔兹(德国)', isGk: false },
  { id: 0x66, name: 'Metzer2', nameCn: '梅查(德国)', isGk: false },
  { id: 0x67, name: 'Schister', nameCn: '席斯特', isGk: false },
  { id: 0x68, name: 'Kapilman2', nameCn: '卡培尔曼(德国)', isGk: false },
  { id: 0x69, name: 'Muller', nameCn: '穆勒', isGk: true },
  { id: 0x6A, name: 'Carlos2', nameCn: '卡洛斯(巴西)', isGk: false },
  { id: 0x6B, name: 'Zagalo2', nameCn: '扎加洛(巴西)', isGk: false },
  { id: 0x6C, name: 'Riverio2', nameCn: '里维里奥(巴西)', isGk: false },
  { id: 0x6D, name: 'Nei2', nameCn: '内伊(巴西)', isGk: false },
  { id: 0x6E, name: 'Santamaria2', nameCn: '圣马利亚(巴西)', isGk: false },
  { id: 0x6F, name: 'Toninho2', nameCn: '托尼纽(巴西)', isGk: false },
  { id: 0x70, name: 'Dottil2', nameCn: '杜托尔(巴西)', isGk: false },
  { id: 0x71, name: 'Amaral2', nameCn: '阿马拉尔(巴西)', isGk: false },
  { id: 0x72, name: 'Dircil2', nameCn: '迪尔修(巴西)', isGk: false },
  { id: 0x73, name: 'Jethrio2', nameCn: '杰特里奥(巴西)', isGk: false },
  { id: 0x74, name: 'Gertise', nameCn: '杰尔蒂斯', isGk: true },
  { id: 0x75, name: 'Coimbra', nameCn: '辛巴拉', isGk: false },
];

/** ID→角色定义映射 (快速查找) */
export const CHARACTER_BY_ID: ReadonlyMap<number, CharacterEntry> = new Map(
  CHARACTER_LIST.map(c => [c.id, c]),
);

/** 按 ID 获取角色名 (英) */
export function getCharacterName(id: number): string {
  return CHARACTER_BY_ID.get(id)?.name ?? `Unknown_${id.toString(16)}`;
}

/** 按 ID 获取角色名 (中) */
export function getCharacterNameCn(id: number): string {
  return CHARACTER_BY_ID.get(id)?.nameCn ?? `未知_${id.toString(16)}`;
}

/** 按 ID 判断是否门将 */
export function isGoalkeeper(id: number): boolean {
  return CHARACTER_BY_ID.get(id)?.isGk ?? false;
}
