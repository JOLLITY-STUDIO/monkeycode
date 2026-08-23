"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
/**
 * Bank 详情页 — 支持 HEX / 柱状图 / 记录视图 / CHR 图块画廊
 * 自动检测数据类型：游戏数据 vs 渲染数据
 */
const index_1 = require("../../../src/game/prg/data/rom-data/index");
const prg_bank_07_1 = __importDefault(require("../../../src/game/prg/data/prg-bank-07"));
const bank02_analysis_1 = __importDefault(require("../bank-detail/bank02_analysis"));
const bank12_analysis_1 = __importDefault(require("../bank-detail/bank12_analysis"));
const bank30_analysis_1 = __importDefault(require("../bank-detail/bank30_analysis"));
const bank31_analysis_1 = __importDefault(require("../bank-detail/bank31_analysis"));
const bank12_audio_player_1 = require("../bank-detail/bank12-audio-player");
const bank02_data_schema_1 = require("../bank-detail/bank02_data_schema");
const BANK_SIZE = 8192;
// CHR 参数: 每个 tile 16 bytes, 8×8 pixel, bank 有 512 tiles
const CHR_TILES = 512;
const CHR_PT_TILES = 256; // PT0 / PT1 各 256 tiles
const CHR_BYTES_PER_TILE = 16;
const CHR_PT_BYTES = CHR_PT_TILES * CHR_BYTES_PER_TILE; // 4KB
const TILE_PX = 8; // 原始 8×8 像素
const TILE_COLS_FULL = 32;
const TILE_ROWS_FULL = 16;
const TILE_COLS_PT = 16; // PT0/PT1 用 16×16 网格
const TILE_ROWS_PT = 16;
const TILE_SCALE = 1; // 保持原始比例，不放大
const CHR_CANVAS_W_FULL = TILE_COLS_FULL * TILE_PX; // 256
const CHR_CANVAS_H_FULL = TILE_ROWS_FULL * TILE_PX; // 128
const CHR_CANVAS_W_PT = TILE_COLS_PT * TILE_PX; // 128
const CHR_CANVAS_H_PT = TILE_ROWS_PT * TILE_PX; // 128
const CHR_BANK_COUNT = 16;
/** 判定当前 Bank 的数据类型 */
function classifyBank(bankId, type) {
    if (type === 'CHR')
        return 'render'; // CHR = 肯定是渲染数据
    // PRG banks: 根据 ROM_REFERENCE 描述
    const renderBanks = [13, 14, 15]; // 动画/过场帧 → 直接写 OAM
    const textBanks = [3, 4, 6, 8, 9]; // 文本/对话 → 直接写 NT（Bank 03/04/06=解说/旁白 typewriter）
    const mixedBanks = [10, 17, 18]; // 场景/地图 → 部分写 NT
    if (renderBanks.includes(bankId))
        return 'render';
    if (textBanks.includes(bankId))
        return 'text';
    if (mixedBanks.includes(bankId))
        return 'text'; // 也尝试文本解读
    return 'game'; // 其余都是游戏数据
}
function byteHex(b) {
    return b.toString(16).toUpperCase().padStart(2, '0');
}
function toAscii(b) {
    return (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.';
}
Page({
    data: {
        // Bank 元数据
        bankType: '',
        bankId: -1,
        bankLabel: '',
        bankName: '',
        description: '',
        cpuMap: '',
        codeBytes: 0,
        dataBytes: 0,
        unaccessed: 0,
        // 视图控制
        viewMode: 'hex',
        isCHR: false,
        // 数据类型
        dataClass: 'unknown',
        dataClassLabel: '',
        dataClassHint: '',
        // Hex dump 数据
        hexLines: [],
        hexAddr: [],
        // Histogram 数据
        histogramReady: false,
        // ── Record View 数据 ──
        recordMode: 'auto',
        recordAutoMethod: '', // 自动检测到的方法
        records: [],
        recordStats: {
            $00count: 0,
            $FCcount: 0,
            $FDcount: 0,
            $FFcount: 0,
            $00A0count: 0,
            avgBlockSize: 0,
            totalBlocks: 0,
        },
        recordsReady: false,
        bank07PtrCount: 0, // Bank 07 指针表条目数
        // ── Bank 07 / Bank 02 场地视图 ──
        fieldCanvasW: 0,
        fieldCanvasH: 0,
        fieldRecordCount: 0,
        fieldBlockCount: 0, // Bank 02 专用: Bank07 解析出的 metatile 块总数
        fieldPlacedCount: 0, // Bank 02 专用: 实际贴到 A72C 坐标上的块数
        fieldReady: false,
        fieldImageSrc: '',
        // ── Bank 02 结构分析 ──
        b02StructureReady: false,
        b02StructureSrc: '',
        b02Subroutines: [],
        b02DataTables: [],
        b02SelectedFunc: null,
        // ── Bank 02 调试 ──
        debugMode: 'metatile',
        debugInput: { param: 'F7', iterations: '2F', deltaLo: 'FF', deltaHi: 'FE', mask: '07', bankId: 'F7', flags: '00', ntLo: '79', ntHi: 'C2' },
        debugResult: '',
        debugTableIdx: 0, // 选中的数据表索引
        debugTableHex: '', // 数据表 hex 内容
        a72cPreset: 'branchA', // A72C 预设选择
        a72cNTLayoutSrc: '', // NT 版面可视化图片
        a72cNTCanvasW: 192,
        a72cNTCanvasH: 360,
        // ── PPU Buffer 调试 ──
        ppuBufHex: '21 80 00 48 45 4C 4C 4F 00', // 输入 hex
        ppuBufParsed: [], // 解析后的条目
        ppuBufDiagramSrc: '', // 结构图
        ppuBufFuncPreset: 'palette_init', // 函数预设
        ppuBufFnTrace: '', // 函数追踪输出
        // ── Bank 31 结构分析 ──
        b31StructureReady: false,
        b31StructureSrc: '',
        b31Subroutines: [],
        b31DataTables: [],
        b31SelectedFunc: null,
        b31Deps: {},
        // ── Bank 31 调试 ──
        b31DebugMode: 'vector',
        b31DebugInput: { angle: '0', animId: '0', x: '80', y: '70', px: '80', py: '70', tx: 'A0', ty: '80', threshold: '07', bpm: '00', valLo: '50', valHi: '02' },
        b31DebugResult: '',
        // ── Bank 30 核心系统库 ──
        b30StructureReady: false,
        b30StructureSrc: '',
        b30Subroutines: [],
        b30DataTables: [],
        b30JumpTable: [],
        b30SelectedFunc: null,
        b30InterruptVectors: null,
        b30ResetFlow: [],
        b30Architecture: null,
        b30Deps: {},
        // ── Bank 12 音频引擎 ──
        b12Subroutines: [],
        b12DataTables: [],
        b12AudioCommands: [],
        b12SoundEffectMap: [],
        b12RamLayout: [],
        b12CallFlow: [],
        b12SelectedFunc: null,
        b12MusicTrackIdx: 0, // 当前选的音效/音乐编号
        b12TrackHex: '', // 选中的音轨hex数据
        b12PlayerSpeed: 1, // 播放速度(帧步进)
        b12PlayerFrame: 0, // 当前帧
        b12PlayerRunning: false, // 播放状态
        b12ApuChannels: [], // 5 APU 通道实时状态
        // ── 结构化数据视图 ──
        dataViewTables: [], // 结构化解析后的数据表
        dataViewReady: false,
        dataViewNote: '',
        // CHR 常量
        TILE_COLS: TILE_COLS_FULL,
        TILE_ROWS: TILE_ROWS_FULL,
        // ── CHR 图块映射 ──
        tileViewMode: 'mapped', // 查看图块 / 数据映射
        chrBankIdx: 0, // 当前映射的 CHR Bank (0–15)
        ptMode: 'pt0', // PT0=0-255 / PT1=256-511 / all
        tileCanvasWidth: 128, // 图块画布逻辑宽度（px，原始比例）
        tileCanvasHeight: 128, // 图块画布逻辑高度（px）
        tileCanvasHint: '', // 图块视图底部提示
    },
    _bankData: [],
    _chrBankData: [], // 当前选中的 CHR bank 数据
    // ── 生命周期 ──
    onLoad(_options) {
        const type = 'PRG';
        const id = 30;
        const isCHR = type === 'CHR';
        const label = `${type} Bank ${String(id).padStart(2, '0')}`;
        const name = this._getName(type, id);
        const desc = this._getDescription(type, id);
        const dClass = classifyBank(id, type);
        // 读取 Bank 数据
        const src = isCHR ? index_1.NES_CHR_ROM : index_1.NES_PRG_ROM;
        const offset = id * BANK_SIZE;
        const bankData = [];
        for (let i = 0; i < BANK_SIZE; i++) {
            bankData.push(src[offset + i]);
        }
        this._bankData = bankData;
        // 预加载默认 CHR bank (00) 供图块视图使用
        this._loadCHRBank(0);
        // 统计
        const stats = this._getStats(type, id);
        const cpuMap = isCHR
            ? `PPU $${(id * 0x2000).toString(16).toUpperCase().padStart(4, '0')}`
            : stats.cpu;
        const classLabels = {
            render: '🎨 渲染数据',
            game: '📦 游戏数据',
            text: '📝 文本/地图数据',
            unknown: '❓ 未知',
        };
        const classHints = {
            render: '此数据直接写入 PPU OAM/VRAM → 可模拟渲染环境查看',
            game: '此数据为游戏逻辑数据（球员/关卡/剧情） → 不需 VRAM 模拟',
            text: '此数据用于 Nametable 文本/地图 ← 可搭配 NT+PAL 渲染',
            unknown: '',
        };
        this.setData({
            bankType: type,
            bankId: id,
            bankLabel: label,
            bankName: name,
            description: desc,
            cpuMap,
            codeBytes: stats.code,
            dataBytes: stats.data,
            unaccessed: stats.unacc,
            isCHR,
            viewMode: isCHR ? 'hex' : 'hex',
            dataClass: dClass,
            dataClassLabel: classLabels[dClass],
            dataClassHint: classHints[dClass],
        });
        // 生成 hex dump + 预解析记录
        this._buildHexDump(bankData);
        this._parseRecords(bankData, 'auto');
    },
    onReady() {
        // 默认: PT0 模式，CHR bank 00，256 tiles
        // 所有 bank 都可以切换到图块视图
    },
    // ── 视图切换 ──
    onViewHex() {
        this.setData({ viewMode: 'hex' });
    },
    onViewHistogram() {
        this.setData({ viewMode: 'histogram' });
        if (!this.data.histogramReady) {
            setTimeout(() => this._renderHistogram(), 300);
        }
    },
    onViewRecords() {
        this.setData({ viewMode: 'records' });
        if (!this.data.recordsReady) {
            this._parseRecords(this._bankData, this.data.recordMode);
        }
    },
    onViewField() {
        this.setData({ viewMode: 'field', fieldImageSrc: '' });
        if (this.data.bankId === 2) {
            // Bank 02: 组装视图，消费 Bank 07 数据
            this.setData({ fieldReady: false });
            setTimeout(() => this._renderFieldAssembled(), 300);
        }
        else {
            // Bank 07: 原始 metatile 块视图
            if (!this.data.fieldReady) {
                setTimeout(() => this._renderFieldMetatiles(), 300);
            }
            else {
                this.setData({ fieldReady: false, fieldImageSrc: '' });
                setTimeout(() => this._renderFieldMetatiles(), 200);
            }
        }
    },
    onViewCHRTiles() {
        // PRG bank 默认进入"数据映射"模式，CHR bank 默认"查看图块"
        const defaultMode = this.data.isCHR ? 'direct' : 'mapped';
        this.setData({ viewMode: 'tiles', tileViewMode: defaultMode });
        setTimeout(() => this._renderCHRGallery(), 300);
    },
    onViewStructure() {
        this.setData({ viewMode: 'structure' });
        if (this.data.bankId === 2 && !this.data.b02StructureReady) {
            setTimeout(() => this._renderStructureMap(), 300);
        }
        else if (this.data.bankId === 12) {
            this._loadBank12Analysis();
        }
        else if (this.data.bankId === 30 && !this.data.b30StructureReady) {
            setTimeout(() => this._renderBank30StructureMap(), 300);
        }
        else if (this.data.bankId === 31 && !this.data.b31StructureReady) {
            setTimeout(() => this._renderBank31StructureMap(), 300);
        }
    },
    onViewFunctions() {
        this.setData({ viewMode: 'functions' });
        if (this.data.bankId === 2)
            this._loadBank02Analysis();
        if (this.data.bankId === 12)
            this._loadBank12Analysis();
        if (this.data.bankId === 30)
            this._loadBank30Analysis();
        if (this.data.bankId === 31)
            this._loadBank31Analysis();
    },
    onViewMusic() {
        this.setData({ viewMode: 'music' });
        this._loadBank12Analysis();
    },
    onViewDebug() {
        this.setData({ viewMode: 'debug' });
        if (this.data.bankId === 2)
            this._loadBank02Analysis();
        if (this.data.bankId === 12)
            this._loadBank12Analysis();
        if (this.data.bankId === 30)
            this._loadBank30Analysis();
        if (this.data.bankId === 31)
            this._loadBank31Analysis();
    },
    onViewData() {
        this.setData({ viewMode: 'data', dataViewReady: false, dataViewNote: '' });
        if (this.data.bankId === 2) {
            this._loadBank02Analysis();
            setTimeout(() => this._parseDataTables(), 100);
        }
        else if (this.data.bankId === 12) {
            this._loadBank12Analysis();
        }
        else if (this.data.bankId === 30) {
            this._loadBank30Analysis();
        }
        else if (this.data.bankId === 31) {
            this._loadBank31Analysis();
        }
    },
    _loadBank02Analysis() {
        const subs = bank02_analysis_1.default.subroutines || [];
        const tables = bank02_analysis_1.default.dataTables || [];
        this.setData({
            b02Subroutines: subs,
            b02DataTables: tables,
        });
    },
    _loadBank31Analysis() {
        const subs = bank31_analysis_1.default.subroutines || [];
        const tables = bank31_analysis_1.default.dataTables || [];
        const deps = {
            dependsOn: bank31_analysis_1.default.deps?.dependsOn || [],
            usedBy: bank31_analysis_1.default.deps?.usedBy || [],
            ramMap: bank31_analysis_1.default.ramMap || [],
            crossRefs: bank31_analysis_1.default.crossRefs || [],
        };
        this.setData({
            b31Subroutines: subs,
            b31DataTables: tables,
            b31Deps: deps,
        });
    },
    _loadBank12Analysis() {
        const analysis = bank12_analysis_1.default;
        const subs = analysis.subroutines || [];
        const tables = analysis.dataTables || [];
        const cmds = analysis.audioCommands?.list || [];
        const seMap = analysis.soundEffectMap?.entries || [];
        const ramSects = analysis.ramLayout?.sections || [];
        const flowSteps = analysis.callFlow?.steps || [];
        this.setData({
            b12Subroutines: subs,
            b12DataTables: tables,
            b12AudioCommands: cmds,
            b12SoundEffectMap: seMap,
            b12RamLayout: ramSects,
            b12CallFlow: flowSteps,
        });
    },
    _loadBank30Analysis() {
        const analysis = bank30_analysis_1.default;
        const subs = analysis.subroutines || [];
        const tables = analysis.dataTables || [];
        const jumpTable = analysis.jumpTable || [];
        const resetFlow = analysis.resetFlow || [];
        const arch = analysis.architecture || null;
        const interrupts = analysis.interruptVectors || null;
        const deps = {
            ramMap: analysis.ramMap || [],
            crossRefs: analysis.crossRefs || [],
        };
        this.setData({
            b30Subroutines: subs,
            b30DataTables: tables,
            b30JumpTable: jumpTable,
            b30ResetFlow: resetFlow,
            b30Architecture: arch,
            b30InterruptVectors: interrupts,
            b30Deps: deps,
        });
    },
    /** 将 PRG Bank 02 的数据按 schema 结构化解析 */
    _parseDataTables() {
        const prg02 = index_1.NES_PRG_ROM.slice(0x02 * BANK_SIZE, 0x03 * BANK_SIZE);
        const prgBase = 0x02 * BANK_SIZE; // 0x4000
        const results = [];
        for (const def of bank02_data_schema_1.DATA_TABLES) {
            const off = def.addr - prgBase;
            if (off < 0 || off >= BANK_SIZE)
                continue;
            const raw = Array.from(prg02.slice(off, off + def.length));
            // 解析字段
            const fieldValues = [];
            for (const f of def.fields) {
                const bytes = raw.slice(f.offset, f.offset + f.size);
                const hex = bytes.map((b) => byteHex(b)).join(' ');
                let decoded = '';
                if (f.size === 1) {
                    const s8 = (0, bank02_data_schema_1.S8)(bytes[0]);
                    const u8 = bytes[0];
                    decoded = `${u8} (0x${byteHex(u8)})`;
                    if (s8 !== u8)
                        decoded += ` signed=${s8}`;
                }
                else if (f.size === 2) {
                    const u16 = (0, bank02_data_schema_1.U16LE)(bytes[0], bytes[1]);
                    const s16 = (0, bank02_data_schema_1.S16LE)(bytes[0], bytes[1]);
                    decoded = `${u16} (0x${byteHex(bytes[1])}${byteHex(bytes[0])})`;
                    if (s16 !== u16)
                        decoded += ` signed=${s16}`;
                }
                else {
                    decoded = `[${bytes.length}B]`;
                    // For larger fields, show first few and total count
                    if (bytes.length <= 16) {
                        decoded = bytes.map((b) => byteHex(b)).join(' ');
                    }
                    else {
                        const preview = bytes.slice(0, 16).map((b) => byteHex(b)).join(' ');
                        decoded = `${preview} … (${bytes.length}B total)`;
                    }
                }
                fieldValues.push({
                    name: f.name,
                    desc: f.desc,
                    hex,
                    decoded,
                });
            }
            // 如果 recordSize>0，按记录拆分
            let records = [];
            if (def.recordSize > 0) {
                for (let i = 0; i + def.recordSize <= raw.length; i += def.recordSize) {
                    const rec = raw.slice(i, i + def.recordSize);
                    const vals = [];
                    for (const f of def.fields) {
                        if (f.offset >= rec.length)
                            continue;
                        const bytes = rec.slice(f.offset, f.offset + f.size);
                        if (f.size === 1) {
                            vals.push(`${byteHex(bytes[0])}`);
                        }
                        else if (f.size === 2) {
                            vals.push(`${byteHex(bytes[1])}${byteHex(bytes[0])}`);
                        }
                    }
                    records.push({
                        idx: Math.floor(i / def.recordSize),
                        hex: rec.map((b) => byteHex(b)).join(' '),
                        fields: vals,
                    });
                }
            }
            results.push({
                name: def.name,
                addrHex: byteHex(def.addr),
                totalLen: raw.length,
                recordSize: def.recordSize,
                note: def.note || '',
                fieldValues,
                records,
                rawHex: raw.map((b) => byteHex(b)).join(' '),
            });
        }
        this.setData({
            dataViewTables: results,
            dataViewReady: true,
            dataViewNote: `共 ${results.length} 张已解析数据表`,
        });
    },
    // 切换「查看图块」/「数据映射」
    onTileViewModeSwitch(e) {
        const mode = e.currentTarget.dataset.mode;
        this.setData({ tileViewMode: mode });
        setTimeout(() => this._renderCHRGallery(), 200);
    },
    // 切换 CHR Bank (图块数据源)
    onCHRBankSelect(e) {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        if (isNaN(idx) || idx < 0 || idx >= CHR_BANK_COUNT)
            return;
        this._loadCHRBank(idx);
        this.setData({ chrBankIdx: idx });
        setTimeout(() => this._renderCHRGallery(), 200);
    },
    // 切换 PT0 / PT1 / 全部
    onPTModeSwitch(e) {
        const mode = e.currentTarget.dataset.mode;
        this.setData({ ptMode: mode });
        setTimeout(() => this._renderCHRGallery(), 200);
    },
    // 从 NES_CHR_ROM 加载指定 CHR bank 到 _chrBankData
    _loadCHRBank(idx) {
        const offset = idx * BANK_SIZE;
        const data = [];
        for (let i = 0; i < BANK_SIZE; i++) {
            data.push(index_1.NES_CHR_ROM[offset + i]);
        }
        this._chrBankData = data;
    },
    // 记录视图内切换解析方式
    onRecordModeSwitch(e) {
        const mode = e.currentTarget.dataset.mode;
        this.setData({ recordMode: mode });
        this._parseRecords(this._bankData, mode);
    },
    // ── 记录解析（核心逻辑) ──
    /** 用多种方式解析 Record 并填充 data */
    _parseRecords(data, mode) {
        const stats = {
            $00count: 0, $FCcount: 0, $FDcount: 0, $FFcount: 0,
            $00A0count: 0, avgBlockSize: 0, totalBlocks: 0,
        };
        for (const b of data) {
            if (b === 0x00)
                stats.$00count++;
            if (b === 0xFC)
                stats.$FCcount++;
            if (b === 0xFD)
                stats.$FDcount++;
            if (b === 0xFF)
                stats.$FFcount++;
        }
        // 统计 $00 $A0 序列数
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i] === 0x00 && data[i + 1] === 0xA0)
                stats.$00A0count++;
        }
        let records;
        let autoMethod = '';
        let bank07PtrCount = 0;
        // Bank 07 特殊检测
        const isBank07 = this.data.bankType === 'PRG' && this.data.bankId === 7;
        if (mode === 'auto') {
            if (isBank07 && stats.$00A0count > 50) {
                // Bank 07 专有格式: 指针表 + $00 $A0 分隔记录
                autoMethod = 'Bank 07 格式 (指针表 + $00 $A0 分隔)';
                const result = this._parseByBank07(data);
                records = result.records;
                bank07PtrCount = result.ptrCount;
            }
            else if (stats.$FCcount > 200) {
                autoMethod = '$FC 分隔 (检测到分隔符)';
                records = this._parseByFC(data);
            }
            else if (this.data.isCHR) {
                autoMethod = '16-byte tiles (CHR 2bpp)';
                records = this._parseBySize(data, 16);
            }
            else {
                // 默认 4-byte（$A72C 格式）
                autoMethod = '4-byte 记录 ($A72C 默认格式)';
                records = this._parseBySize(data, 4);
            }
        }
        else {
            autoMethod = `${mode} 手动模式`;
            if (mode === 'fc')
                records = this._parseByFC(data);
            else if (mode === '8byte')
                records = this._parseBySize(data, 8);
            else if (mode === '16byte')
                records = this._parseBySize(data, 16);
            else if (mode === 'bank07') {
                const result = this._parseByBank07(data);
                records = result.records;
                bank07PtrCount = result.ptrCount;
            }
            else
                records = this._parseBySize(data, 4); // 默认 4-byte
        }
        const blockSizes = records.map(r => r.len);
        stats.totalBlocks = records.length;
        stats.avgBlockSize = records.length > 0
            ? Math.round(blockSizes.reduce((a, b) => a + b, 0) / records.length)
            : 0;
        this.setData({
            recordAutoMethod: autoMethod,
            records: records.slice(0, 120), // 最多展示 120 条
            recordStats: stats,
            recordsReady: true,
            bank07PtrCount,
        });
    },
    /** 按 $FC 字节切分 */
    _parseByFC(data) {
        const out = [];
        let start = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 0xFC) {
                if (i > start + 1) {
                    const chunk = data.slice(start, i);
                    out.push(this._makeRecord(start, chunk));
                }
                start = i + 1;
            }
        }
        if (data.length > start + 1) {
            out.push(this._makeRecord(start, data.slice(start)));
        }
        return out;
    },
    /** Bank 07 专用: $00 $A0 分隔记录 */
    _parseByBank07(data) {
        const out = [];
        // 直接按 $00 $A0 分隔解析记录（Bank 07 无指针表，直接从记录开始）
        let recStart = 0;
        let recIdx = 0;
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i] === 0x00 && data[i + 1] === 0xA0) {
                const chunk = data.slice(recStart, i);
                if (chunk.length > 0) {
                    out.push(this._makeBank07Record(recStart, chunk, recIdx));
                    recIdx++;
                }
                recStart = i + 2; // 跳过 $00 $A0
                // 如果遇到连续 $FF，说明到了未使用区域
                if (recStart < data.length && data[recStart] === 0xFF)
                    break;
            }
        }
        // 尾部剩余（跳过 $FF 填充）
        if (recStart < data.length) {
            const tail = [];
            for (let j = recStart; j < data.length; j++) {
                if (data[j] === 0xFF)
                    break;
                tail.push(data[j]);
            }
            if (tail.length > 0) {
                out.push(this._makeBank07Record(recStart, tail, recIdx));
            }
        }
        return { records: out, ptrCount: 0 };
    },
    /** 构建 Bank 07 记录（含记录头解析） */
    _makeBank07Record(offset, chunk, recIdx) {
        const rec = this._makeRecord(offset, chunk);
        // 记录头分类
        let header = '';
        const h0 = chunk[0], h1 = chunk[1];
        if (chunk.length >= 2) {
            if (h0 === 0x3C && h1 === 0x3E)
                header = `标准区域(h=${chunk.length >= 5 ? chunk[4] : '?'}, w=${chunk.length >= 6 ? chunk[5] : '?'})`;
            else if (h0 === 0x5C && h1 === 0x5E)
                header = `扩展区域`;
            else if (h0 === 0x3A && h1 === 0x00)
                header = `小尺寸`;
            else if (h0 === 0x64 && h1 === 0x66)
                header = `屏幕索引(${chunk.length >= 3 ? '$' + byteHex(chunk[2]) : '?'})`;
            else if (h0 === 0x7C && h1 === 0x7E)
                header = `宽结构(${chunk.length >= 3 ? '$' + byteHex(chunk[2]) : '?'})`;
            else if (h0 === 0x60 && h1 === 0x62)
                header = `填充区域`;
            else if (h0 === 0x68 && h1 === 0x6A)
                header = `纯色填充`;
            else if (h0 === 0x76 && h1 === 0x7E)
                header = `宽体结构`;
            else if (h0 === 0x44 && h1 === 0x46)
                header = `次要区域`;
            else if (h0 === 0x3C && h1 === 0x4C)
                header = `带扩展字段`;
            else if (h0 === 0x3C && h1 === 0x66)
                header = `棋盘格变体`;
            else if (h0 === 0x3C && h1 === 0x6A)
                header = `填充变体`;
            else if (h0 === 0x3C && h1 === 0x62)
                header = `窄区域`;
            else if (h0 === 0x3C && h1 === 0x02)
                header = `小宽区域`;
            else if (h0 === 0x3C && h1 === 0x2C)
                header = `草地纹理`;
            else if (h0 === 0x34 && h1 === 0x36)
                header = `边界区域`;
            else if (h0 === 0x56 && h1 === 0x46)
                header = `填充扩展`;
            else if (h0 === 0x66 && h1 === 0x5E)
                header = `填充变体2`;
            else if (h0 === 0x00 && h1 === 0x02)
                header = `空填充`;
            else if (h0 === 0x06 && h1 === 0x00)
                header = `纯零`;
            else
                header = `${byteHex(h0)} ${byteHex(h1)}`;
        }
        // 统计 metatile 值分布
        const tileMap = new Map();
        for (const b of chunk)
            tileMap.set(b, (tileMap.get(b) || 0) + 1);
        const topTiles = Array.from(tileMap.entries())
            .filter(([k]) => k !== 0x00 && k !== 0x01) // skip padding
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([k, v]) => `$${byteHex(k)}×${v}`)
            .join(' ');
        rec._header = header;
        rec._topTiles = topTiles;
        rec._recIdx = recIdx;
        rec._ptrLabel = '';
        return rec;
    },
    /** 按固定字节切分 */
    _parseBySize(data, size) {
        const out = [];
        for (let off = 0; off + size <= data.length; off += size) {
            out.push(this._makeRecord(off, data.slice(off, off + size)));
        }
        return out;
    },
    /** 构建单条记录 */
    _makeRecord(offset, chunk) {
        const vals16 = [];
        for (let i = 0; i + 1 < chunk.length; i += 2) {
            vals16.push(chunk[i] | (chunk[i + 1] << 8));
        }
        return {
            offset,
            len: chunk.length,
            hex: chunk.map(b => byteHex(b)).join(' '),
            vals16,
            vals8: [...chunk],
            ascii: chunk.map(b => toAscii(b)).join(''),
        };
    },
    // ── HEX DUMP ──
    _buildHexDump(data) {
        const hexLines = [];
        const hexAddr = [];
        for (let addr = 0; addr < data.length; addr += 16) {
            const row = data.slice(addr, addr + 16);
            const hexPart = row.map(b => byteHex(b)).join(' ');
            const asciiPart = row.map(b => toAscii(b)).join('');
            hexLines.push(`${hexPart.padEnd(48)} ${asciiPart}`);
            hexAddr.push(byteHex(addr >> 8) + byteHex(addr & 0xFF));
        }
        this.setData({ hexLines, hexAddr });
    },
    // ── 字节柱状图 (Canvas) ──
    _renderHistogram() {
        const that = this;
        const query = wx.createSelectorQuery();
        query.select('#histoCvs')
            .fields({ node: true, size: true })
            .exec((res) => {
            const canvas = res?.[0]?.node;
            if (!canvas) {
                setTimeout(() => that._renderHistogram(), 300);
                return;
            }
            const w = res[0].width;
            const h = res[0].height;
            const dpr = wx.getSystemInfoSync().pixelRatio;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
            const freq = new Array(256).fill(0);
            for (const b of that._bankData)
                freq[b]++;
            const maxFreq = Math.max(...freq);
            const barW = (w - 2) / 256;
            const chartH = h - 20;
            ctx.fillStyle = '#0d1117';
            ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = '#161b22';
            ctx.lineWidth = 0.5;
            for (let i = 0; i <= 4; i++) {
                const y = chartH - (chartH * i / 4);
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
            for (let i = 0; i < 256; i++) {
                const barH = maxFreq > 0 ? (freq[i] / maxFreq) * chartH : 0;
                const x = 1 + i * barW;
                const y = chartH - barH;
                const r = i & 0x80 ? 88 : 63;
                const g = i & 0x40 ? 166 : 251;
                const b = i & 0x20 ? 255 : 149;
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillRect(x, y, barW - 1, barH);
            }
            ctx.fillStyle = '#484f58';
            ctx.font = '10px monospace';
            for (let i = 0; i < 256; i += 32) {
                ctx.fillText(byteHex(i), 1 + i * barW, h - 2);
            }
            that.setData({ histogramReady: true });
        });
    },
    // ── Bank 07 场地 Metatile 渲染 ──
    _renderFieldMetatiles() {
        const that = this;
        const data = this._bankData;
        // 1. 按 $00 $A0 切分记录
        const records = [];
        let rs = 0;
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i] === 0x00 && data[i + 1] === 0xA0) {
                const chunk = data.slice(rs, i);
                if (chunk.length > 0)
                    records.push(chunk);
                rs = i + 2;
                if (rs < data.length && data[rs] === 0xFF)
                    break;
            }
        }
        // 2. 排除 #0（指针表）
        const fieldRecs = records.slice(1).filter(r => r.length >= 4);
        const PX = 3; // metatile pixel size
        const GAP = 8; // gap between records
        const LABEL_H = 16; // label height
        const COLS = 3; // records per row
        const REC_W = 170; // record card width
        const infos = [];
        for (const rec of fieldRecs) {
            const h0 = rec[0], h1 = rec[1];
            const header = byteHex(h0) + ' ' + byteHex(h1);
            let w = 0, h = 0, ok = false;
            // byte[4] = width, remaining = data
            if (rec.length >= 5) {
                w = rec[4];
                const payload = rec.slice(6);
                if (w > 0 && w <= 64 && payload.length % w === 0) {
                    h = payload.length / w;
                    ok = true;
                }
                else {
                    // treat whole record as single row
                    w = Math.min(rec.length - 2, 64);
                    h = 1;
                    ok = false;
                }
            }
            else {
                w = rec.length - 2;
                h = 1;
            }
            const label = `#${infos.length + 1} ${header} ${w}×${h}${ok ? '' : '?'}`;
            infos.push({ chunk: rec, header, w, h, ok, label });
        }
        // 3. 计算 canvas 尺寸（按每行实际最大高度）
        const rows = Math.ceil(infos.length / COLS);
        const canvasW = COLS * REC_W;
        const rowHeights = [];
        for (let r = 0; r < rows; r++) {
            let rh = 0;
            for (let c = 0; c < COLS; c++) {
                const idx = r * COLS + c;
                if (idx >= infos.length)
                    break;
                rh = Math.max(rh, LABEL_H + infos[idx].h * PX + 6);
            }
            rowHeights.push(rh);
        }
        const canvasH = rowHeights.reduce((a, b) => a + b + GAP, 0) + GAP;
        this.setData({
            fieldCanvasW: canvasW,
            fieldCanvasH: canvasH,
            fieldRecordCount: infos.length,
            fieldReady: true,
        });
        // 4. 延迟等待 canvas 创建，绘制后导出为图片
        setTimeout(() => {
            const query = wx.createSelectorQuery();
            query.select('#fieldCanvas')
                .fields({ node: true, size: true })
                .exec((res) => {
                const canvas = res?.[0]?.node;
                if (!canvas) {
                    setTimeout(() => that._renderFieldMetatiles(), 300);
                    return;
                }
                canvas.width = canvasW;
                canvas.height = canvasH;
                const ctx = canvas.getContext('2d');
                // 背景
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(0, 0, canvasW, canvasH);
                let yCursor = GAP;
                for (let i = 0; i < infos.length; i++) {
                    const info = infos[i];
                    const col = i % COLS;
                    const row = Math.floor(i / COLS);
                    const ox = col * REC_W;
                    if (col === 0 && row > 0)
                        yCursor += rowHeights[row - 1] + GAP;
                    const oy = yCursor;
                    const cardH = LABEL_H + info.h * PX + 6;
                    // 卡片背景
                    ctx.fillStyle = '#161b22';
                    ctx.fillRect(ox + 2, oy, REC_W - 4, cardH);
                    // 标签
                    ctx.fillStyle = info.ok ? '#58a6ff' : '#8b949e';
                    ctx.font = '9px monospace';
                    ctx.fillText(info.label, ox + 6, oy + 11);
                    // 画 metatile 网格
                    const payload = info.ok ? info.chunk.slice(6) : info.chunk.slice(2);
                    for (let y = 0; y < info.h && y < 80; y++) {
                        for (let x = 0; x < info.w && x < 80; x++) {
                            const idx = y * info.w + x;
                            if (idx >= payload.length)
                                break;
                            const mt = payload[idx];
                            // 伪彩色: hue 基于 metatile 值
                            const hue = (mt * 17 + 40) % 360;
                            const sat = 60 + (mt % 3) * 12;
                            const lit = 40 + (mt % 5) * 8;
                            ctx.fillStyle = `hsl(${hue},${sat}%,${lit}%)`;
                            ctx.fillRect(ox + 4 + x * PX, oy + LABEL_H + y * PX, PX, PX);
                        }
                    }
                }
                // 导出 canvas 为图片
                wx.canvasToTempFilePath({
                    canvas,
                    success: (res2) => {
                        that.setData({ fieldImageSrc: res2.tempFilePath });
                    },
                    fail: () => {
                        // 降级：尝试直接用 toDataURL
                        try {
                            const dataUrl = canvas.toDataURL?.();
                            if (dataUrl)
                                that.setData({ fieldImageSrc: dataUrl });
                        }
                        catch (_e) { /* ignore */ }
                    },
                });
            });
        }, 200);
    },
    // ── Bank 02 场地组装视图 ──
    /**
     * 模拟 $A72C 子程序 — 生成 NT 坐标记录表
     * 每条记录 4 字节: [NT_lo, bankId, flags, NT_hi]
     */
    _a72cStep(lo, hi, iterations, deltaLo, deltaHi, mask, bankId, flags) {
        const records = [];
        for (let x = 0; x < iterations; x++) {
            // 模拟 6502: ADC $04E4 (lo+=deltaLo, 进位), ADC $04E7 (hi+=deltaHi+carry)
            const sumLo = lo + deltaLo;
            const carry = sumLo > 0xFF ? 1 : 0;
            lo = sumLo & 0xFF;
            hi = (hi + deltaHi + carry) & 0xFF;
            // mask 检查用原始 hi 值（A72C 的真实行为）
            if ((hi & mask) === 0) {
                records.push([lo, bankId, flags, hi]);
            }
        }
        return { records, endLo: lo, endHi: hi };
    },
    /** 从 Bank 07 解析 metatile 块 */
    _parseBank07Blocks(data) {
        const blocks = [];
        let rs = 0;
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i] === 0x00 && data[i + 1] === 0xA0) {
                const chunk = data.slice(rs, i);
                if (chunk.length > 0)
                    blocks.push(chunk);
                rs = i + 2;
                if (rs < data.length && data[rs] === 0xFF)
                    break;
            }
        }
        // Skip pointer table (block #0)
        return blocks.slice(1).filter(b => b.length >= 4);
    },
    /** NT地址(hilo) → canvas X,Y — MMC3 水平镜像: NT2→NT0, NT3→NT1 */
    _ntToXY(ntLo, ntHi) {
        // 构造 16-bit PPU 地址
        const addr = ((ntHi & 0xFF) << 8) | (ntLo & 0xFF);
        // NT select: 位10-11 → 水平镜像只取低1位 (0=NT0, 1=NT1)
        const ntSel = (addr >> 10) & 0x01;
        // 1024 字节内偏移
        const off = addr & 0x3FF;
        const tx = off & 0x1F; // 列 0-31
        const ty = (off >> 5) & 0x1F; // 行 0-31
        const cy = ntSel * 30 + Math.min(ty, 29);
        return { cx: tx, cy };
    },
    // ── Bank 02 结构图 ──
    _renderStructureMap() {
        const that = this;
        const analysis = bank02_analysis_1.default;
        const blocks = analysis.blocks || [];
        const query = wx.createSelectorQuery();
        query.select('#structCanvas')
            .fields({ node: true, size: true })
            .exec((res) => {
            const canvas = res?.[0]?.node;
            if (!canvas) {
                setTimeout(() => that._renderStructureMap(), 300);
                return;
            }
            const w = 360;
            const h = 120;
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#0d1117';
            ctx.fillRect(0, 0, w, h);
            const total = 8192;
            const barY = 34;
            const barH = 28;
            // 上层：按 CDL 统计比例的理想分布条
            const codeW = (analysis.stats.codeBytes / total) * w;
            const dataW = (analysis.stats.dataBytes / total) * w;
            const unaccW = (analysis.stats.unaccessedBytes / total) * w;
            let cx = 0;
            ctx.fillStyle = '#58a6ff';
            ctx.fillRect(cx, barY, codeW, barH);
            cx += codeW;
            ctx.fillStyle = '#3fb950';
            ctx.fillRect(cx, barY, dataW, barH);
            cx += dataW;
            ctx.fillStyle = '#6e7681';
            ctx.fillRect(cx, barY, unaccW, barH);
            // 下层：按 asm 实际 block 的真实分布（细条）
            const detailY = barY + barH + 6;
            const detailH = 14;
            for (const b of blocks) {
                const bx = ((b.startAddr - 0x4010) / total) * w;
                const bw = (b.length / total) * w;
                ctx.fillStyle = b.type === 'code' ? '#58a6ff' : (b.type === 'data' ? '#3fb950' : '#6e7681');
                ctx.fillRect(bx, detailY, Math.max(bw, 1), detailH);
            }
            // 地址刻度（基于 Bank 02 窗口 $8000-$9FFF）
            ctx.fillStyle = '#6e7681';
            ctx.font = '10px monospace';
            for (let bankAddr = 0x8000; bankAddr <= 0xA000; bankAddr += 0x800) {
                const x = ((bankAddr - 0x8000) / total) * w;
                ctx.fillText('$' + bankAddr.toString(16).toUpperCase(), x + 2, h - 4);
                ctx.strokeStyle = '#21262d';
                ctx.beginPath();
                ctx.moveTo(x, barY);
                ctx.lineTo(x, detailY + detailH);
                ctx.stroke();
            }
            // 图例
            const legend = [
                { c: '#58a6ff', t: `代码 ${analysis.stats.codeBytes}B` },
                { c: '#3fb950', t: `数据 ${analysis.stats.dataBytes}B` },
                { c: '#6e7681', t: `未访问 ${analysis.stats.unaccessedBytes}B` },
            ];
            let lx = 6, ly = 16;
            for (const l of legend) {
                ctx.fillStyle = l.c;
                ctx.fillRect(lx, ly - 8, 10, 10);
                ctx.fillStyle = '#c9d1d9';
                ctx.font = '11px monospace';
                ctx.fillText(l.t, lx + 14, ly);
                lx += 110;
            }
            wx.canvasToTempFilePath({
                canvas,
                success: (r) => { that.setData({ b02StructureSrc: r.tempFilePath, b02StructureReady: true }); },
                fail: () => {
                    try {
                        const url = canvas.toDataURL?.();
                        if (url)
                            that.setData({ b02StructureSrc: url, b02StructureReady: true });
                    }
                    catch (_e) { }
                },
            });
        });
    },
    // ── $AA47 metatile→tile 展开表 ──
    // 实际数据: Bank 02 PRG offset 0x4A5F-0x4AA6，Bank 窗口 $8A4F-$8A96
    // ASM 8855 用法: LDA $AA47,X  (X=0x00, 0x0C, 或 0x18)
    // 每组读 10 bytes (tile 索引) → buf[$0408+Y], Y+=4, 循环到 Y=$28
    // 最后多读 1 byte → $002C (属性字节)
    // 另外 $8A75 处读 $AA75,X → $002A (镜头/滚动索引)
    _buildAA47Table() {
        const prg02 = index_1.NES_PRG_ROM.slice(0x02 * BANK_SIZE, 0x03 * BANK_SIZE);
        // PRG 数据在 offset 0x4A57 (CPU 窗口 $8A57 via $8000-$9FFF)
        // 代码实际用 $AA47 访问 (A000-BFFF 窗口可能映射了相同数据)
        const off = 0x4A57 - 0x4000; // PRG Bank 02 offset = 0x0A57
        // 实际数据: 79 bytes ($4A57-$4AA5)，但 8895 只读 36 bytes (3×12)
        const table = [];
        for (let group = 0; group < 3; group++) {
            const start = off + group * 12;
            table.push(Array.from(prg02.slice(start, start + 12)));
        }
        return table;
    },
    /** $8895 metatile 展开：X(0x00/0x0C/0x18) → AA47 → 10 tile 索引 + 1 属性字节 */
    _expandMetatile(param, mtGroup) {
        // ASM 8855-88A2: 根据 ram_0026 (上半/下半) 选 X
        // $887C: X=0x00 (上半场), $8884: X=0x0C (中场), $888C: X=0x18 (下半场)
        // mtGroup: 0=上半, 1=中场, 2=下半
        const aa47 = this._buildAA47Table();
        const row = aa47[mtGroup] || aa47[0];
        const tiles = [];
        // 读 10 个 tile 索引 (Y=0 → $28, Y+=4)
        for (let i = 0; i < 10; i++) {
            tiles.push(row[i] || 0);
        }
        return tiles;
    },
    _renderFieldAssembled() {
        const that = this;
        const bank07Data = prg_bank_07_1.default;
        // 1. A72C NT 坐标生成 — 严格对照 asm $869D-$872B
        // $A767 初始化: $04E4=$79, $04E5=$FF, $04E7=$C2
        // 首次进 $869D: $04E5≠$FF → Branch A; 之后 $04E5=$FF → Branch B
        // 两分支都先调 $A767 重置计数器
        const INIT_LO = 0x79, INIT_HI = 0xC2;
        const allRecords = [];
        // ── Branch A: $04E5 != $FF ──
        // $86AD-$86BD: X=0x2F, $ED=$FF, $EC=$FE, $EB=$07, A=$F7
        const r1 = this._a72cStep(INIT_LO, INIT_HI, 0x2F, 0xFF, 0xFE, 0x07, 0xF7, 0x00);
        allRecords.push(...r1.records);
        // $86C2-$86CE: Y=$D8, X=0x30, $ED=$01, $EC=$FF, $EB 未改(=$07), A=$FC
        const r2 = this._a72cStep(r1.endLo, r1.endHi, 0x30, 0x01, 0xFF, 0x07, 0xFC, 0x00);
        allRecords.push(...r2.records);
        // ── Branch B: $04E5 == $FF ──
        // $86D9-$86ED: Y=$80, X=0x2F, $EA=2, $ED=$FF, $EC=$FE, $EB=$07, A=$F7
        const r3 = this._a72cStep(INIT_LO, INIT_HI, 0x2F, 0xFF, 0xFE, 0x07, 0xF7, 0x02);
        allRecords.push(...r3.records);
        // $86F0-$86F4: X=0x08, $ED/$EC/$EB 继承 Call3, A=$FE
        const r4 = this._a72cStep(r3.endLo, r3.endHi, 0x08, 0xFF, 0xFE, 0x07, 0xFE, 0x02);
        allRecords.push(...r4.records);
        // $8702-$8714: Y=$B8, X=0x1C, $ED=$02, $EC=$FF, $EB=$03, A=$F6
        const r5 = this._a72cStep(r4.endLo, r4.endHi, 0x1C, 0x02, 0xFF, 0x03, 0xF6, 0x00);
        allRecords.push(...r5.records);
        // 去重 (NT 坐标唯一)
        const seen = new Set();
        const deduped = allRecords.filter(r => {
            const key = `${r[0]}_${r[3]}`;
            if (seen.has(key))
                return false;
            seen.add(key);
            return true;
        });
        // 3. 按 param 分类着色
        const paramColors = {
            0xF7: '#2d8a3e', // 草地绿
            0xFC: '#f0f0f0', // 白线
            0xFE: '#c4a84d', // 浅褐
            0xF6: '#e8e0c8', // 浅灰
        };
        const paramNames = {
            0xF7: '草地', 0xFC: '白线', 0xFE: '边缘', 0xF6: '球门',
        };
        // 4. Canvas — 水平镜像: 2-NT (32×60 tiles)
        const PX = 6;
        const TILES_X = 32; // 1 个 NT 宽
        const TILES_Y = 60; // 2 个 NT 高 (垂直拼接)
        const cvsW = TILES_X * PX;
        const cvsH = TILES_Y * PX;
        this.setData({
            fieldCanvasW: cvsW,
            fieldCanvasH: cvsH,
            fieldRecordCount: deduped.length,
            fieldBlockCount: 0,
            fieldPlacedCount: deduped.length,
            fieldReady: true,
        });
        setTimeout(() => {
            const query = wx.createSelectorQuery();
            query.select('#fieldCanvas')
                .fields({ node: true, size: true })
                .exec((res) => {
                const canvas = res?.[0]?.node;
                if (!canvas) {
                    setTimeout(() => that._renderFieldAssembled(), 300);
                    return;
                }
                canvas.width = cvsW;
                canvas.height = cvsH;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#1a5c2a'; // 球场底色
                ctx.fillRect(0, 0, cvsW, cvsH);
                // NameTable 分界线: NT0/NT1 水平分隔线
                ctx.strokeStyle = 'rgba(255,255,255,0.2)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, 30 * PX);
                ctx.lineTo(cvsW, 30 * PX);
                ctx.stroke();
                for (const [rLo, param, _flags, rHi] of deduped) {
                    const { cx, cy } = that._ntToXY(rLo, rHi);
                    // AA47 展开 metatile→10 tiles（默认上半场 group=0）
                    const tiles = that._expandMetatile(param, 0);
                    const color = paramColors[param] || '#888';
                    // 画 10-tile 列（2 宽 × 5 高）
                    for (let ti = 0; ti < 10; ti++) {
                        const tx = (cx + (ti % 2)) * PX;
                        const ty = (cy + Math.floor(ti / 2)) * PX;
                        if (tx >= 0 && ty >= 0 && tx < cvsW - PX && ty < cvsH - PX) {
                            // 根据 tile 索引微调色调
                            const tileIdx = tiles[ti];
                            const r = parseInt(color.slice(1, 3), 16);
                            const g = parseInt(color.slice(3, 5), 16);
                            const b = parseInt(color.slice(5, 7), 16);
                            const v = 0.75 + (tileIdx % 16) * 0.015;
                            ctx.fillStyle = `rgb(${Math.floor(r * v)},${Math.floor(g * v)},${Math.floor(b * v)})`;
                            ctx.fillRect(tx + 0.5, ty + 0.5, PX - 1, PX - 1);
                        }
                    }
                }
                // 图例
                let lx = 4, ly = cvsH - 20;
                for (const [p, color] of Object.entries(paramColors)) {
                    ctx.fillStyle = color;
                    ctx.fillRect(lx, ly, 10, 10);
                    ctx.fillStyle = '#fff';
                    ctx.font = '9px monospace';
                    ctx.fillText(`${paramNames[parseInt(p)] || p}`, lx + 12, ly + 9);
                    lx += 56;
                }
                wx.canvasToTempFilePath({
                    canvas,
                    success: (res2) => {
                        that.setData({ fieldImageSrc: res2.tempFilePath });
                    },
                    fail: () => {
                        try {
                            const dataUrl = canvas.toDataURL?.();
                            if (dataUrl)
                                that.setData({ fieldImageSrc: dataUrl });
                        }
                        catch (_e) { /* ignore */ }
                    },
                });
            });
        }, 200);
    },
    // ── 图块渲染入口（分发）─
    _renderCHRGallery() {
        if (this.data.tileViewMode === 'mapped' && !this.data.isCHR) {
            this._renderDataAsTiles();
        }
        else {
            this._renderCHRDirect();
        }
    },
    // ── 模式 A：直接展示 CHR Bank 图块 ──
    _renderCHRDirect() {
        const that = this;
        const query = wx.createSelectorQuery();
        query.select('#chrCanvas')
            .fields({ node: true, size: true })
            .exec((res) => {
            const canvas = res?.[0]?.node;
            if (!canvas) {
                setTimeout(() => that._renderCHRGallery(), 300);
                return;
            }
            const isPT = that.data.ptMode !== 'all';
            const cw = isPT ? CHR_CANVAS_W_PT : CHR_CANVAS_W_FULL;
            const ch = isPT ? CHR_CANVAS_H_PT : CHR_CANVAS_H_FULL;
            canvas.width = cw;
            canvas.height = ch;
            const hint = `CHR Bank ${that.data.chrBankIdx} · ${that.data.ptMode === 'pt0' ? 'PT0 0–255' : that.data.ptMode === 'pt1' ? 'PT1 256–511' : '全部 0–511'} · ${cw}×${ch}px · 8×8px 原始比例`;
            that.setData({ tileCanvasWidth: cw, tileCanvasHeight: ch, tileCanvasHint: hint });
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#0d1117';
            ctx.fillRect(0, 0, cw, ch);
            const palette = ['#010409', '#484f58', '#8b949e', '#e6edf3'];
            const data = that._chrBankData;
            const tcw = TILE_PX; // 原始 8px
            const cols = isPT ? TILE_COLS_PT : TILE_COLS_FULL;
            let tileStart = 0, tileCount = CHR_TILES;
            if (that.data.ptMode === 'pt0') {
                tileStart = 0;
                tileCount = CHR_PT_TILES;
            }
            else if (that.data.ptMode === 'pt1') {
                tileStart = CHR_PT_TILES;
                tileCount = CHR_PT_TILES;
            }
            for (let ti = 0; ti < tileCount; ti++) {
                const absTile = tileStart + ti;
                const col = ti % cols, row = Math.floor(ti / cols);
                const base = absTile * CHR_BYTES_PER_TILE;
                const ox = col * tcw, oy = row * tcw;
                if (base + 16 > data.length)
                    continue;
                for (let py = 0; py < TILE_PX; py++) {
                    const p0 = data[base + py], p1 = data[base + py + 8];
                    for (let px = 0; px < TILE_PX; px++) {
                        const bit = 7 - px;
                        const ci = ((p1 >> bit) & 1) << 1 | ((p0 >> bit) & 1);
                        ctx.fillStyle = palette[ci];
                        ctx.fillRect(ox + px, oy + py, 1, 1);
                    }
                }
            }
        });
    },
    // ── 模式 B：数据映射 → PRG 字节当作 tile 索引渲染 ──
    // 调色板 RGBA uint32 (little-endian 即 ABGR)
    _mappedPalette: [0xFF090401, 0xFF58504F, 0xFF9E948B, 0xFFF3EDE6],
    _tileCache: null,
    _renderDataAsTiles() {
        const that = this;
        const query = wx.createSelectorQuery();
        query.select('#chrCanvas')
            .fields({ node: true, size: true })
            .exec((res) => {
            const canvas = res?.[0]?.node;
            if (!canvas) {
                setTimeout(() => that._renderCHRGallery(), 300);
                return;
            }
            const TPR = 16; // tiles per row
            const tilePx = TILE_PX; // 原始 8px
            const totalBytes = that._bankData.length;
            const rows = Math.ceil(totalBytes / TPR);
            const cw = TPR * tilePx; // 128
            const ch = rows * tilePx;
            canvas.width = cw;
            canvas.height = ch;
            const hint = `映射: ${that.data.bankLabel} → CHR Bank ${that.data.chrBankIdx} (${that.data.ptMode === 'pt0' ? 'PT0' : 'PT1'}) · ${totalBytes}B · ${rows}行 · 16 tiles/row · 8×8px 原始比例`;
            that.setData({ tileCanvasWidth: cw, tileCanvasHeight: ch, tileCanvasHint: hint });
            const ctx = canvas.getContext('2d');
            // 清空 + 背景色
            const imgData = ctx.createImageData(cw, ch);
            const buf = new Uint32Array(imgData.data.buffer);
            buf.fill(0xFF07090D); // dark bg
            const chr = that._chrBankData;
            const ptMode = that.data.ptMode;
            const pal = that._mappedPalette;
            const maxTile = ptMode === 'pt1' ? 511 : 255;
            const ptOffset = ptMode === 'pt1' ? 256 : 0;
            // 预渲染 tile 缓存（避免重复解码同一 tile）
            that._tileCache = new Map();
            for (let i = 0; i < totalBytes; i++) {
                const rawByte = that._bankData[i];
                const tileIdx = rawByte + ptOffset;
                if (tileIdx > maxTile)
                    continue;
                // 从缓存或预渲染中获取 tile 像素
                let tileBuf = that._tileCache.get(tileIdx);
                if (!tileBuf) {
                    tileBuf = that._buildTilePixels(chr, tileIdx, pal, 1);
                    that._tileCache.set(tileIdx, tileBuf);
                }
                const col = i % TPR;
                const row = Math.floor(i / TPR);
                const ox = col * tilePx;
                const oy = row * tilePx;
                that._blitTileToBuffer(buf, cw, ox, oy, tileBuf, tilePx);
            }
            ctx.putImageData(imgData, 0, 0);
            that._tileCache = null; // 释放
        });
    },
    /** 解码一个 CHR tile 为原始比例的 Uint32Array (scale×8 × scale×8 pixels) */
    _buildTilePixels(chr, tileIdx, pal, scale) {
        const size = TILE_PX * scale;
        const out = new Uint32Array(size * size);
        const base = tileIdx * CHR_BYTES_PER_TILE;
        for (let py = 0; py < TILE_PX; py++) {
            const p0 = chr[base + py];
            const p1 = chr[base + py + 8];
            for (let px = 0; px < TILE_PX; px++) {
                const bit = 7 - px;
                const ci = ((p1 >> bit) & 1) << 1 | ((p0 >> bit) & 1);
                const color = pal[ci] >>> 0;
                const sx = px * scale, sy = py * scale;
                for (let dy = 0; dy < scale; dy++) {
                    const rowOff = (sy + dy) * size + sx;
                    for (let dx = 0; dx < scale; dx++) {
                        out[rowOff + dx] = color;
                    }
                }
            }
        }
        return out;
    },
    /** 将 tile 像素 blit 到大画布 buffer 的 (ox, oy) 位置 */
    _blitTileToBuffer(dst, dstW, ox, oy, tile, tileSize) {
        for (let ry = 0; ry < tileSize; ry++) {
            const dstOff = (oy + ry) * dstW + ox;
            const srcOff = ry * tileSize;
            for (let rx = 0; rx < tileSize; rx++) {
                dst[dstOff + rx] = tile[srcOff + rx];
            }
        }
    },
    // ── Bank 02 调试调用接口 ──
    onDebugModeSwitch(e) {
        const mode = e.currentTarget.dataset.mode;
        this.setData({ debugMode: mode, debugResult: '' });
        if (mode === 'dtable') {
            this._loadBank02Analysis();
        }
        if (mode === 'ppubuf') {
            this._loadBank02Analysis();
            this._parsePpuBuf();
        }
        if (mode === 'ppufns') {
            this._loadBank02Analysis();
        }
    },
    onDebugInput(e) {
        const { field } = e.currentTarget.dataset;
        const value = e.detail.value;
        this.setData({ debugInput: { ...this.data.debugInput, [field]: value } });
    },
    onDebugRun() {
        const mode = this.data.debugMode;
        const input = this.data.debugInput;
        let result = '';
        try {
            if (mode === 'metatile') {
                const param = parseInt(input.param || 'F7', 16);
                const mg = parseInt(input.flags || '0', 10); // group: 0=上半 1=中场 2=下半
                const tiles = this._expandMetatile(param, mg);
                result = `AA47 展开: param=$${byteHex(param)} group=${mg}\ntiles=[${tiles.map(byteHex).join(', ')}]`;
            }
            else if (mode === 'a72c') {
                const lo = parseInt(input.ntLo || '79', 16);
                const hi = parseInt(input.ntHi || 'C2', 16);
                const it = parseInt(input.iterations || '2F', 16);
                const dLo = parseInt(input.deltaLo || 'FF', 16);
                const dHi = parseInt(input.deltaHi || 'FE', 16);
                const mask = parseInt(input.mask || '07', 16);
                const bankId = parseInt(input.bankId || 'F7', 16);
                const flags = parseInt(input.flags || '00', 16);
                const step = this._a72cStep(lo, hi, it, dLo, dHi, mask, bankId, flags);
                result = `A72C: 输入 lo=$${byteHex(lo)} hi=$${byteHex(hi)}\n迭代 ${it} 次 → 产生 ${step.records.length} 条 NT 记录\n首条: ${step.records[0]?.map(byteHex).join(' ')}\n末条: ${step.records[step.records.length - 1]?.map(byteHex).join(' ')}\n结束 lo=$${byteHex(step.endLo)} hi=$${byteHex(step.endHi)}`;
                // 追加解读
                const defDt = {
                    0xF7: '→ Bank 03/04 脚本文字', 0xFC: '→ Bank 07 白线',
                    0xFE: '→ Bank 07 边界', 0xF6: '→ Bank 07 球门',
                };
                const meaning = defDt[bankId];
                if (meaning)
                    result += `\n\nbankId=$${byteHex(bankId)} ${meaning}\nmask=$${byteHex(mask)} → 每 ${(mask + 1)} 迭代生成 1 条记录（间距 ${(mask + 1) * 8} px）`;
                // 触发 NT 版面可视化
                const allRecords = step.records;
                this.setData({ debugResult: result }, () => {
                    this._renderA72CNTLayout(allRecords);
                });
                return;
            }
            else if (mode === 'ntxy') {
                const lo = parseInt(input.ntLo || '79', 16);
                const hi = parseInt(input.ntHi || 'C2', 16);
                const xy = this._ntToXY(lo, hi);
                result = `NT($${byteHex(hi)}${byteHex(lo)}) → tile 坐标 (${xy.cx}, ${xy.cy})`;
            }
        }
        catch (err) {
            result = '错误: ' + err.message;
        }
        this.setData({ debugResult: result });
    },
    onA72cPreset(e) {
        const preset = e.currentTarget.dataset.preset;
        if (preset === 'branchA') {
            this.setData({
                a72cPreset: 'branchA',
                debugInput: { ...this.data.debugInput,
                    ntLo: '79', ntHi: 'C2', iterations: '2F',
                    deltaLo: 'FF', deltaHi: 'FE', mask: '07',
                    bankId: 'F7', flags: '00',
                },
                debugResult: '',
                a72cNTLayoutSrc: '',
            });
        }
        else if (preset === 'branchB') {
            this.setData({
                a72cPreset: 'branchB',
                debugInput: { ...this.data.debugInput,
                    ntLo: '79', ntHi: 'C2', iterations: '2F',
                    deltaLo: 'FF', deltaHi: 'FE', mask: '07',
                    bankId: 'F7', flags: '02',
                },
                debugResult: '',
                a72cNTLayoutSrc: '',
            });
        }
        else {
            this.setData({ a72cPreset: 'manual' });
        }
    },
    /**
     * 渲染 A72C NT 版面可视化 — 32×60 tile 网格
     * 每个 record 的 NT 坐标映射到 canvas 位置，按 bankId 着色
     * 连线显示轨迹路径
     */
    _renderA72CNTLayout(records) {
        const that = this;
        const PX = 4; // 每个 tile 4px
        const TILES_X = 32, TILES_Y = 60;
        const cvsW = TILES_X * PX; // 128
        const cvsH = TILES_Y * PX; // 240
        this.setData({ a72cNTCanvasW: cvsW, a72cNTCanvasH: cvsH });
        // 调色板：按 bankId/param 着色
        const paramColors = {
            0xF7: '#2d8a3e', // 草地绿→脚本
            0xFC: '#f0f0f0', // 白线
            0xFE: '#c4a84d', // 边缘
            0xF6: '#e8e0c8', // 球门
        };
        const cntColors = {};
        setTimeout(() => {
            const query = wx.createSelectorQuery();
            query.select('#a72cNTCanvas')
                .fields({ node: true, size: true })
                .exec((res) => {
                const canvas = res?.[0]?.node;
                if (!canvas) {
                    setTimeout(() => that._renderA72CNTLayout(records), 200);
                    return;
                }
                canvas.width = cvsW;
                canvas.height = cvsH;
                const ctx = canvas.getContext('2d');
                // 背景：深绿（球场底色）
                ctx.fillStyle = '#1a3a1a';
                ctx.fillRect(0, 0, cvsW, cvsH);
                // NT0/NT1 分隔线
                ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, 30 * PX);
                ctx.lineTo(cvsW, 30 * PX);
                ctx.stroke();
                // 绘制网格（淡线）
                ctx.strokeStyle = 'rgba(0,0,0,0.2)';
                ctx.lineWidth = 0.5;
                for (let tx = 0; tx <= TILES_X; tx += 4) {
                    ctx.beginPath();
                    ctx.moveTo(tx * PX, 0);
                    ctx.lineTo(tx * PX, cvsH);
                    ctx.stroke();
                }
                for (let ty = 0; ty <= TILES_Y; ty += 4) {
                    ctx.beginPath();
                    ctx.moveTo(0, ty * PX);
                    ctx.lineTo(cvsW, ty * PX);
                    ctx.stroke();
                }
                // 绘制每个 record 对应的位置
                for (const [rLo, param, _flags, rHi] of records) {
                    const { cx, cy } = that._ntToXY(rLo, rHi);
                    if (cx < 0 || cx >= TILES_X || cy < 0 || cy >= TILES_Y)
                        continue;
                    const x = cx * PX, y = cy * PX;
                    const color = paramColors[param] || '#888';
                    ctx.fillStyle = color;
                    ctx.fillRect(x + 0.5, y + 0.5, PX - 1, PX - 1);
                    // 计数
                    const key = `${param}`;
                    cntColors[key] = (cntColors[key] || 0) + 1;
                }
                // 连线（按顺序走一遍 trajectory）
                ctx.strokeStyle = 'rgba(255,255,100,0.35)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                let started = false;
                for (const [rLo, _, _f, rHi] of records) {
                    const { cx, cy } = that._ntToXY(rLo, rHi);
                    if (cx < 0 || cx >= TILES_X || cy < 0 || cy >= TILES_Y)
                        continue;
                    const x = cx * PX + PX / 2, y = cy * PX + PX / 2;
                    if (!started) {
                        ctx.moveTo(x, y);
                        started = true;
                    }
                    else
                        ctx.lineTo(x, y);
                }
                ctx.stroke();
                // 图例
                const paramNames = {
                    0xF7: '$F7 脚本', 0xFC: '$FC 白线', 0xFE: '$FE 边缘', 0xF6: '$F6 球门',
                };
                let lx = 2, ly = cvsH - 16;
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(0, ly - 2, cvsW, 18);
                for (const [pStr, color] of Object.entries(paramColors)) {
                    const p = parseInt(pStr);
                    ctx.fillStyle = color;
                    ctx.fillRect(lx, ly, 8, 8);
                    ctx.fillStyle = '#fff';
                    ctx.font = '8px monospace';
                    const label = paramNames[p] || `$${byteHex(p)}`;
                    ctx.fillText(label, lx + 10, ly + 8);
                    lx += 48;
                }
                wx.canvasToTempFilePath({
                    canvas,
                    success: (r) => {
                        that.setData({ a72cNTLayoutSrc: r.tempFilePath });
                    },
                    fail: () => {
                        try {
                            const url = canvas.toDataURL?.();
                            if (url)
                                that.setData({ a72cNTLayoutSrc: url });
                        }
                        catch (_e) { /* ignore */ }
                    },
                });
            });
        }, 100);
    },
    onSelectFunction(e) {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        const func = this.data.b02Subroutines[idx];
        const startAddrHex = func.startAddr.toString(16).toUpperCase();
        this.setData({
            b02SelectedFunc: {
                ...func,
                startAddrHex,
            },
        });
    },
    // ── 数据表 hex 浏览器 ──
    onDebugTableSelect(e) {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        if (isNaN(idx))
            return;
        this.setData({ debugTableIdx: idx });
        this._loadTableHex(idx);
    },
    _loadTableHex(idx) {
        const tables = this.data.b02DataTables;
        if (idx < 0 || idx >= tables.length)
            return;
        const table = tables[idx];
        const prg02 = index_1.NES_PRG_ROM.slice(0x02 * BANK_SIZE, 0x03 * BANK_SIZE);
        // table.startAddr 是 PRG 文件绝对偏移（如 0x4A57 = 19031）
        const prgBase = 0x02 * BANK_SIZE; // Bank 02 PRG 基准 = 0x4000
        const prgOffset = table.startAddr - prgBase;
        const count = Math.min(table.length, 512); // 最多显示 512 字节
        const bytes = [];
        for (let i = 0; i < count; i++) {
            bytes.push(prg02[prgOffset + i]);
        }
        // 格式化为 hex dump
        const lines = [];
        for (let i = 0; i < bytes.length; i += 16) {
            const addrHex = (table.startAddr + i).toString(16).toUpperCase().padStart(4, '0');
            const hexPart = bytes.slice(i, i + 16).map(b => byteHex(b)).join(' ');
            const asciiPart = bytes.slice(i, i + 16).map(b => toAscii(b)).join('');
            lines.push(`$${addrHex}: ${hexPart.padEnd(48)} ${asciiPart}`);
        }
        this.setData({ debugTableHex: lines.join('\n') });
    },
    // ═══════════════════════════════════════════════
    // PPU Buffer 数据流调试
    // ═══════════════════════════════════════════════
    /** PPU Buffer hex 输入变化 */
    onPpuBufInput(e) {
        this.setData({ ppuBufHex: e.detail.value });
    },
    /** PPU Buffer 函数预设选择 */
    onPpuBufPreset(e) {
        const preset = e.currentTarget.dataset.preset;
        const presets = {
            palette_init: '21 3F 00 0F 30 21 12 0F 30 21 12 0F 30 21 12 0F 30 21 12 00',
            nt_clear: '21 20 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00',
            scene_layout: '21 20 80 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 00',
            vram_addr: '21 20 60 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00',
            custom: this.data.ppuBufHex,
        };
        this.setData({ ppuBufFuncPreset: preset, ppuBufHex: presets[preset] || this.data.ppuBufHex });
        this._parsePpuBuf();
    },
    /** 解析 PPU Buffer hex → 结构化条目 */
    onPpuBufRun() {
        this._parsePpuBuf();
        if (this.data.ppuBufParsed.length > 0) {
            setTimeout(() => this._renderPpuBufDiagram(), 300);
        }
    },
    /** 运行 PPU Buffer 函数追踪 */
    onPpuBufFnRun() {
        const preset = this.data.ppuBufFuncPreset;
        this._tracePpuBufFn(preset);
    },
    /** 核心：解析 PPU Buffer hex 字符串 */
    _parsePpuBuf() {
        const hexStr = this.data.ppuBufHex.replace(/\s+/g, ' ').trim();
        const bytes = hexStr.split(/[\s,]+/).map((s) => parseInt(s, 16)).filter((b) => !isNaN(b));
        if (bytes.length === 0) {
            this.setData({ ppuBufParsed: [] });
            return;
        }
        const entries = [];
        let i = 0;
        let entryIdx = 0;
        while (i < bytes.length) {
            const ctrl = bytes[i];
            if (ctrl === 0x00) {
                i++;
                entryIdx++;
                continue;
            } // 结束标记或填充
            // 检查：至少需要 ctrl + 2 addr bytes + 1 data
            if (i + 3 > bytes.length)
                break;
            const addrLo = bytes[i + 1];
            const addrHi = bytes[i + 2];
            const ppuAddr = ((addrHi & 0xFF) << 8) | (addrLo & 0xFF);
            // 确定数据长度（control byte bit6-0 或 最大可用字节）
            let dataLen = ctrl & 0x3F;
            const hasBank = !!(ctrl & 0x80);
            const useFlag = !!(ctrl & 0x40);
            // 智能检测：如果 ctrl 看起来像普通数据而非控制字节
            if (dataLen === 0 && (addrHi < 0x20 || addrHi >= 0x40)) {
                // 可能是普通字节串，按单字节-无格式处理
                dataLen = 1;
            }
            if (dataLen === 0)
                dataLen = 1;
            // 试作简化的条目：假设 control byte 为 dataLen（实际格式更复杂）
            // 智能解析：看字节模式
            const actualDataLen = Math.min(dataLen, bytes.length - i - 3);
            if (actualDataLen <= 0) {
                i++;
                continue;
            }
            const dataBytes = bytes.slice(i + 3, i + 3 + actualDataLen);
            const entrySize = 3 + actualDataLen;
            // 解码 PPU 地址目标
            const ppuTarget = this._decodePpuAddr(ppuAddr);
            entries.push({
                idx: entryIdx,
                ctrlHex: byteHex(ctrl),
                ctrlBits: `B7=${hasBank ? 1 : 0} B6=${useFlag ? 1 : 0} len=${dataLen}`,
                addrLoHex: byteHex(addrLo),
                addrHiHex: byteHex(addrHi),
                ppuAddr: '$' + ppuAddr.toString(16).toUpperCase().padStart(4, '0'),
                ppuTarget,
                dataHex: dataBytes.map(byteHex).join(' '),
                dataLen: actualDataLen,
                isEnd: ctrl === 0x00,
            });
            entryIdx++;
            i += entrySize;
        }
        this.setData({ ppuBufParsed: entries });
    },
    /** 解码 PPU 地址 → 人类可读目标 */
    _decodePpuAddr(addr) {
        const a = addr & 0x3FFF;
        if (a >= 0x3F00 && a <= 0x3FFF) {
            const sub = a >= 0x3F10 ? 'Sprite Palette' : 'BG Palette';
            return { name: '🎨 调色板', color: '#d29922', desc: `${sub} @ $${a.toString(16).toUpperCase()}` };
        }
        if (a >= 0x2000 && a <= 0x23FF) {
            const off = a - 0x2000;
            const row = Math.floor(off / 32);
            const col = off % 32;
            return { name: '🗺️ NT0', color: '#58a6ff', desc: `NameTable 0 (${row},${col})` };
        }
        if (a >= 0x2400 && a <= 0x27FF) {
            const off = a - 0x2400;
            const row = Math.floor(off / 32);
            const col = off % 32;
            return { name: '🗺️ NT1', color: '#3fb950', desc: `NameTable 1 (${row},${col})` };
        }
        if (a >= 0x2800 && a <= 0x2BFF) {
            return { name: '🗺️ NT2', color: '#a371f7', desc: `NameTable 2 (镜像)` };
        }
        if (a >= 0x2C00 && a <= 0x2FFF) {
            return { name: '🗺️ NT3', color: '#f0883e', desc: `NameTable 3 (镜像)` };
        }
        // PPU registers
        if (addr === 0x2000)
            return { name: '⚙️ PPUCTRL', color: '#f85149', desc: 'PPU 控制寄存器' };
        if (addr === 0x2001)
            return { name: '⚙️ PPUMASK', color: '#f85149', desc: 'PPU 遮罩寄存器' };
        if (addr === 0x2005)
            return { name: '📐 PPUSCROLL', color: '#f85149', desc: '滚动寄存器' };
        if (addr === 0x2006)
            return { name: '📍 PPUADDR', color: '#f85149', desc: 'VRAM 地址寄存器' };
        if (addr === 0x2007)
            return { name: '✏️ PPUDATA', color: '#f85149', desc: 'VRAM 数据寄存器' };
        // Pattern tables
        if (a >= 0x0000 && a <= 0x0FFF) {
            return { name: '🖼️ PT0', color: '#7ee787', desc: `Pattern Table 0 @ $${a.toString(16).toUpperCase()}` };
        }
        if (a >= 0x1000 && a <= 0x1FFF) {
            return { name: '🖼️ PT1', color: '#7ee787', desc: `Pattern Table 1 @ $${a.toString(16).toUpperCase()}` };
        }
        return { name: '❓ 未知', color: '#6e7681', desc: `0x$${a.toString(16).toUpperCase()}` };
    },
    /** 渲染 PPU Buffer 结构图 */
    _renderPpuBufDiagram() {
        const that = this;
        const entries = this.data.ppuBufParsed;
        if (entries.length === 0)
            return;
        const PX = 4;
        const ROW_H = 28;
        const HEADER_H = 36;
        const cvsW = 360;
        const cvsH = HEADER_H + entries.length * ROW_H + 60;
        setTimeout(() => {
            const query = wx.createSelectorQuery();
            query.select('#ppuBufCanvas')
                .fields({ node: true, size: true })
                .exec((res) => {
                const canvas = res?.[0]?.node;
                if (!canvas) {
                    setTimeout(() => that._renderPpuBufDiagram(), 300);
                    return;
                }
                canvas.width = cvsW;
                canvas.height = cvsH;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(0, 0, cvsW, cvsH);
                // RAM 布局头
                ctx.fillStyle = '#6e7681';
                ctx.font = '10px monospace';
                ctx.fillText('RAM $05E8–$0628  PPU Buffer 数据流结构', 8, 16);
                ctx.fillText('$0628=写指针  $0629=控制标志  → Bank 02 NMI 消费', 8, 32);
                // 绘制每个条目
                for (let ei = 0; ei < entries.length; ei++) {
                    const ent = entries[ei];
                    const y = HEADER_H + ei * ROW_H;
                    const barColor = ent.ppuTarget?.color || '#6e7681';
                    // 条目背景
                    ctx.fillStyle = ent.isEnd ? '#1a0a0a' : '#161b22';
                    ctx.fillRect(2, y, cvsW - 4, ROW_H - 2);
                    // 左侧颜色条
                    ctx.fillStyle = barColor;
                    ctx.fillRect(2, y, 4, ROW_H - 2);
                    // 条目编号
                    ctx.fillStyle = '#484f58';
                    ctx.font = '9px monospace';
                    ctx.fillText(`#${ent.idx}`, 10, y + 16);
                    // 控制字节
                    ctx.fillStyle = '#f0883e';
                    ctx.fillText(`CTRL=$${ent.ctrlHex}`, 34, y + 12);
                    ctx.fillStyle = '#6e7681';
                    ctx.font = '8px monospace';
                    ctx.fillText(ent.ctrlBits, 34, y + 22);
                    // PPU 地址
                    ctx.fillStyle = '#58a6ff';
                    ctx.font = '10px monospace';
                    ctx.fillText(`→ ${ent.ppuAddr}`, 130, y + 14);
                    // 目标描述
                    ctx.fillStyle = barColor;
                    ctx.font = '9px monospace';
                    ctx.fillText(ent.ppuTarget?.name || '', 220, y + 12);
                    ctx.fillStyle = '#6e7681';
                    ctx.font = '8px monospace';
                    ctx.fillText(ent.ppuTarget?.desc || '', 220, y + 22);
                    // 数据
                    if (ent.dataHex && ent.dataHex.length < 60) {
                        ctx.fillStyle = '#7ee787';
                        ctx.font = '8px monospace';
                        ctx.fillText(`data[${ent.dataLen}B]`, 340, y + 10);
                    }
                    // 如果条目可视化范围足够，绘制数据字节方块
                    if (ent.dataLen > 0 && ent.dataLen <= 8) {
                        const dataBytes = ent.dataHex.split(' ').map((s) => parseInt(s, 16));
                        for (let di = 0; di < dataBytes.length && di < 8; di++) {
                            const bx = 310 - di * 14;
                            const by = y + 2;
                            const hue = (dataBytes[di] * 17) % 360;
                            ctx.fillStyle = `hsl(${hue},60%,50%)`;
                            ctx.fillRect(bx, by, 12, 12);
                            ctx.fillStyle = '#fff';
                            ctx.font = '6px monospace';
                            ctx.fillText(byteHex(dataBytes[di]), bx + 1, by + 10);
                        }
                    }
                }
                // 图例
                const ly = HEADER_H + entries.length * ROW_H + 10;
                ctx.fillStyle = '#6e7681';
                ctx.font = '10px monospace';
                ctx.fillText('图例:', 8, ly + 12);
                const legend = [
                    { c: '#d29922', t: '调色板' },
                    { c: '#58a6ff', t: 'NT0' },
                    { c: '#3fb950', t: 'NT1' },
                    { c: '#7ee787', t: 'PT' },
                    { c: '#f0883e', t: '控制字节' },
                ];
                let lx = 56;
                for (const l of legend) {
                    ctx.fillStyle = l.c;
                    ctx.fillRect(lx, ly + 4, 10, 10);
                    ctx.fillStyle = '#c9d1d9';
                    ctx.font = '9px monospace';
                    ctx.fillText(l.t, lx + 12, ly + 14);
                    lx += 54;
                }
                wx.canvasToTempFilePath({
                    canvas,
                    success: (r) => { that.setData({ ppuBufDiagramSrc: r.tempFilePath }); },
                    fail: () => {
                        try {
                            const url = canvas.toDataURL?.();
                            if (url)
                                that.setData({ ppuBufDiagramSrc: url });
                        }
                        catch (_e) { }
                    },
                });
            });
        }, 100);
    },
    /** 追踪特定 bank_00 函数的 PPU 缓冲区写入 */
    _tracePpuBufFn(preset) {
        const fns = {
            palette_init: {
                name: '$9B7F / $8297 — 调色板初始化',
                addr: 'bank_00 $8297 (A=0x0D) → bank_00 $9B7F',
                desc: '标题画面初始化时，Bank 00 将 32 字节调色板数据打包成多个 buffer 条目',
                sourceBank: 'Bank 00 内置数据 + 部分从 Bank 30 复制',
                dataExplained: 'BG调色板+Sprite调色板，每 4 色一组(BG0/BG1/BG2/BG3 + 镜像)，共 32 字节 → $3F00',
                ppuTarget: '$3F00 (PPU 调色板 RAM)',
                flow: [
                    '① Bank 00 $8297: 从内置表读取调色板数据指针',
                    '② Bank 00 $9B28: 分配 buffer 空间 → X = $0628 当前指针',
                    '③ 写入: [control=0x20] [$3F] [$00] [0F] [30] [21] [12] ... → $05E8+X',
                    '④ 继续写入: [control=0x10] [$3F] [$10] [0F] [16] [2A] [18] ... → $05E8+X+10',
                    '⑤ Bank 00 $9B5E: 写结束标记 0x00 → 更新 $0628 指针',
                    '⑥ NMI 触发: Bank 02 $8000 读取 $0628≠0 → 处理 buffer',
                    '⑦ Bank 02 NMI: 设 PPUADDR=$3F00 → 循环写 PPUDATA',
                    '⑧ Bank 02 NMI: 写完后清零 $0628',
                ],
            },
            nt_clear: {
                name: '$9B7F / $9B11 — Nametable 清零',
                addr: 'bank_00 $9B7F (NT清零) → bank_00 $9B11 (全零填充)',
                desc: '初始化时清除整个 NameTable（写 $00 tile → 空白画面）',
                sourceBank: 'Bank 00 代码内联（不读数据 bank，直接用 #0x00 填充）',
                dataExplained: '32×30 = 960 个 0x00 tile → 分批写入 NT0+NT1+NT0属性 → $2000-$23FF + $2400-$27FF',
                ppuTarget: '$2000 (Nametable 0) / $2400 (Nametable 1)',
                flow: [
                    '① Bank 00 $9B7F: 初始化 VRAM 写任务指针',
                    '② Bank 00 $9B11: 设置 PPU 地址 = $2000 (NT0 起始)',
                    '③ 循环: 向 buffer 写入 [control=0x00 或其他] [$00] [$20] [00] × N',
                    '④ 每轮写入 buffer 后立即触发 NMI 推送到 PPU',
                    '⑤ Bank 02 NMI: 写 PPUDATA=$00 重复多次 (VRAM 自增)',
                    '⑥ Bank 02 NMI: 完成一批后继续下一批',
                    '⑦ 重复直到 NT0+NT1 全部清零',
                ],
            },
            scene_layout: {
                name: '$98A0 / $8AF7 — 场景布局数据加载',
                addr: 'bank_00 $98A0 → bank_10 (Scene Map) / $8AF7(场景布局描述符)',
                desc: '从 Bank 10 读取场景 metatile 布局数据，转换为 NT tile 序列写入 buffer',
                sourceBank: 'Bank 10 (Scene Map & Location)',
                dataExplained: 'Bank 10 包含预编译的场景数据，Bank 00 $98A0→Bank 02 $8895 展开 metatile → 生成 NT tile 序列',
                ppuTarget: '$2000 (Nametable 0) 场景区域',
                flow: [
                    '① Bank 00 $98A0: 根据场景号从 Bank 10 读取布局指针',
                    '② Bank 00 $9800: 遍历布局记录(2x2 metatile → 4× NT tiles)',
                    '③ 每个 metatile 调用 Bank 02 $AA47 查表展开 → 10+1 tile',
                    '④ Bank 00 $9B28: 分配 buffer 空间',
                    '⑤ 写入: [control] [NT addr lo] [NT addr hi] [tile0] [tile1] ...',
                    '⑥ Bank 00 $9B5E: 写结束标记 → 更新 $0628',
                    '⑦ Bank 02 NMI: 消费 buffer → 写 PPUDATA',
                ],
            },
            vram_addr: {
                name: '$890C — VRAM 地址/滚动设置',
                addr: 'bank_00 $890C (index=0x30 → 从 Bank 30 读滚动偏移)',
                desc: '设置 PPU VRAM 地址指针（通过 $2006）以控制渲染窗口和滚动位置',
                sourceBank: 'Bank 30 (Core System Library → 滚动偏移数据)',
                dataExplained: '读取滚动偏移量(优先从 Bank 30, 否则当前 bank) → 写入 $2006 设定 VRAM 起始地址',
                ppuTarget: '$2006 (VRAM Address Register)',
                flow: [
                    '① Bank 00 $890C: 查表读取 VRAM 地址偏移 (hi/lo)',
                    '② Bank 00 $9B28: 分配 buffer 空间',
                    '③ 写入: [control] [$06] [$20] [addr_hi] [addr_lo]',
                    '④ Bank 02 NMI: 识别 $2006 → 设 PPUADDR',
                ],
            },
        };
        const fn = fns[preset];
        if (!fn) {
            this.setData({ ppuBufFnTrace: '未知预设: ' + preset });
            return;
        }
        let trace = '';
        trace += `═══ PPU Buffer 函数追踪 ═══\n\n`;
        trace += `函数: ${fn.name}\n`;
        trace += `位置: ${fn.addr}\n`;
        trace += `数据源: ${fn.sourceBank}\n`;
        trace += `PPU 目标: ${fn.ppuTarget}\n\n`;
        trace += `说明: ${fn.desc}\n\n`;
        trace += `数据结构: ${fn.dataExplained}\n\n`;
        trace += `── 完整数据流 ──\n\n`;
        for (const step of fn.flow) {
            trace += `${step}\n`;
        }
        trace += `\n── 关键 RAM 变量 ──\n`;
        trace += `$0628 = 写指针 (非零 = 有待写数据)\n`;
        trace += `$0629 = bit7=溢出标记 bit6=使用 Bank84 映射\n`;
        trace += `$05E8 = buffer 起始 (每条: ctrl+addr_lo+addr_hi+data...)\n`;
        trace += `\n── Bank 02 NMI 消费流程 ──\n`;
        trace += `$800A: LDA $0628 → BEQ skip (无数据则跳过)\n`;
        trace += `$801F: BIT $0629 → BVS skip (溢出则跳过)\n`;
        trace += `$8026: STY $2000 (设 PPU 命名空间)\n`;
        trace += `$8030: LDA $05EA,X → STA $2006 (PPU addr hi)\n`;
        trace += `$8036: LDA $05E9,X → STA $2006 (PPU addr lo)\n`;
        trace += `$803C: INX → DEY → BNE loop (循环写 PPUDATA)\n`;
        trace += `$804A: 清零 $0628 (buffer 已消费)\n`;
        this.setData({ ppuBufFnTrace: trace });
    },
    // ── Bank 31 调试调用接口 ──
    onB31DebugModeSwitch(e) {
        const mode = e.currentTarget.dataset.mode;
        this.setData({ b31DebugMode: mode, b31DebugResult: '' });
    },
    onB31DebugInput(e) {
        const { field } = e.currentTarget.dataset;
        const value = e.detail.value;
        this.setData({ b31DebugInput: { ...this.data.b31DebugInput, [field]: value } });
    },
    onB31DebugRun() {
        const mode = this.data.b31DebugMode;
        const input = this.data.b31DebugInput;
        let result = '';
        try {
            if (mode === 'vector') {
                result = this._b31ReadVectors();
            }
            else if (mode === 'direction') {
                result = this._b31LookupDirection(parseInt(input.angle || '0', 16));
            }
            else if (mode === 'sprite_ptr') {
                result = this._b31LookupSpriteAnim(parseInt(input.animId || '0', 16));
            }
            else if (mode === 'zone') {
                result = this._b31CalcZone(parseInt(input.x || '80', 16), parseInt(input.y || '70', 16));
            }
            else if (mode === 'near_player') {
                result = this._b31SimNearPlayer(parseInt(input.px || '80', 16), parseInt(input.py || '70', 16), parseInt(input.tx || 'A0', 16), parseInt(input.ty || '80', 16), parseInt(input.threshold || '07', 16));
            }
            else if (mode === 'bpm_update') {
                result = this._b31SimBpmUpdate(parseInt(input.bpm || '00', 16), parseInt(input.valLo || '50', 16), parseInt(input.valHi || '02', 16));
            }
        }
        catch (err) {
            result = '错误: ' + err.message;
        }
        this.setData({ b31DebugResult: result });
    },
    /** 读取中断向量表 */
    _b31ReadVectors() {
        const prg31 = index_1.NES_PRG_ROM.slice(0x1F * BANK_SIZE, 0x20 * BANK_SIZE);
        // $9FF0-$9FFF → PRG offset 0x3FFF0-0x3FFFF
        const off = 0x1FF0;
        const vec = prg31.slice(off, off + 16);
        const nmiLo = vec[0x0A], nmiHi = vec[0x0B];
        const resetLo = vec[0x0C], resetHi = vec[0x0D];
        const irqLo = vec[0x0E], irqHi = vec[0x0F];
        const nmi = (nmiHi << 8) | nmiLo;
        const reset = (resetHi << 8) | resetLo;
        const irq = (irqHi << 8) | irqLo;
        let out = 'Bank 31 中断向量表 ($FFFA-$FFFF)\n';
        out += '═══════════════════════════════\n';
        out += `NMI   = $${nmi.toString(16).toUpperCase().padStart(4, '0')} → Bank 30 NMI handler\n`;
        out += `RESET = $${reset.toString(16).toUpperCase().padStart(4, '0')} → Boot/Reset entry\n`;
        out += `IRQ   = $${irq.toString(16).toUpperCase().padStart(4, '0')} → Bank 30 IRQ handler\n`;
        out += '\nIRQ 入口代码 ($9FF0-$9FF7):\n';
        const irqEntry = prg31.slice(off, off + 8);
        out += '  LDA #$00; STA $8000; JMP $C503\n';
        out += `  原始 hex: ${irqEntry.map(byteHex).join(' ')}\n`;
        out += '\nFIXED Bank ($E000-$FFFF) 永远映射在 CPU 最高地址空间\n';
        out += 'Bank 31 不被 MMC3 Bank 切换影响，作为系统核心常驻';
        return out;
    },
    /** 查 8 方向速度向量表 $E6CF */
    _b31LookupDirection(angle) {
        const prg31 = index_1.NES_PRG_ROM.slice(0x1F * BANK_SIZE, 0x20 * BANK_SIZE);
        const idx = angle & 0x07;
        // $E6CF → PRG offset 0x1E6CF
        const base = 0x1E6CF - 0x1E000;
        const vectors = [];
        for (let i = 0; i < 8; i++) {
            const x = prg31[base + i * 2];
            const y = prg31[base + i * 2 + 1];
            vectors.push({ x, y });
        }
        let out = `8方向速度向量表 ($E6CF-$E6DE)\n`;
        out += '═══════════════════════════════\n';
        for (let i = 0; i < 8; i++) {
            const v = vectors[i];
            const mark = i === idx ? ' ← 选中' : '';
            out += `[${i}] X=$${byteHex(v.x)}(${v.x}) Y=$${byteHex(v.y)}(${v.y})${mark}\n`;
        }
        out += '\n说明: $E688 通过 ($00E2 & 7) 索引此表\n';
        out += '每个方向 2 字节(X速度,Y速度) → 有符号速度分量';
        return out;
    },
    /** 查精灵动画指针表 $E9DA */
    _b31LookupSpriteAnim(animId) {
        const prg31 = index_1.NES_PRG_ROM.slice(0x1F * BANK_SIZE, 0x20 * BANK_SIZE);
        const idx = Math.min(animId, 21);
        // $E9DA → PRG offset 0x1E9DA
        const ptrBase = 0x1E9DA - 0x1E000;
        const lo = prg31[ptrBase + idx * 2];
        const hi = prg31[ptrBase + idx * 2 + 1];
        const frameAddr = ((hi << 8) | lo) & 0xFFFF;
        // 指针表中所有条目
        const allPtrs = [];
        for (let i = 0; i <= 21; i++) {
            const pl = prg31[ptrBase + i * 2];
            const ph = prg31[ptrBase + i * 2 + 1];
            const pa = ((ph << 8) | pl) & 0xFFFF;
            allPtrs.push({ id: i, addr: pa, bankAddr: '$' + pa.toString(16).toUpperCase() });
        }
        let out = `精灵动画指针表 ($E9DA-$EA0B)\n`;
        out += `═══════════════════════════════\n`;
        out += `共 22 条指针 (动画 #0-#21)\n\n`;
        out += `选中的动画 #${idx}:\n`;
        out += `  指针: $${lo.toString(16).toUpperCase().padStart(2, '0')} $${hi.toString(16).toUpperCase().padStart(2, '0')}\n`;
        out += `  目标地址: $${frameAddr.toString(16).toUpperCase()}\n`;
        out += `  对应 Bank 窗口: $${(frameAddr & 0xFFFF).toString(16).toUpperCase()}\n`;
        // 尝试解析帧数据头部
        if (frameAddr >= 0xE000 && frameAddr < 0xF000) {
            const frameOff = (frameAddr - 0xE000) + 0x1E000;
            if (frameOff < prg31.length) {
                const b = prg31.slice(frameOff, Math.min(frameOff + 10, prg31.length));
                out += `  帧数据头部 (10B): ${b.map(byteHex).join(' ')}\n`;
                // 解析控制字节
                if (b.length >= 3) {
                    const ctrl = b[2];
                    const cols = (ctrl >> 2) & 0x3F || 1;
                    const rows = ctrl & 0x03 || 1;
                    out += `  控制字节: $${byteHex(ctrl)} → ${cols}列 × ${rows}行\n`;
                }
            }
        }
        out += '\n完整指针表:\n';
        for (const p of allPtrs) {
            const mark = p.id === idx ? ' ←' : '';
            out += `  #${p.id.toString().padStart(2, '0')}: ${p.bankAddr}${mark}\n`;
        }
        return out;
    },
    /** 场地 Zone 计算 */
    _b31CalcZone(x, y) {
        // 模拟 $E6EC → $E709
        // Zone = ((Y-0x50)&0xE0)>>3 + ((X-0x30)&0xE0)>>5
        const x16 = x & 0xFFFF;
        const y16 = y & 0xFFFF;
        const yOff = (y16 - 0x50) & 0xFFFF; // 减去场地 Y 偏移
        const xOff = (x16 - 0x30) & 0xFFFF; // 减去场地 X 偏移
        const yRow = (yOff & 0xFFE0) >>> 3; // Y 行分量
        const xCol = (xOff & 0xFFE0) >>> 5; // X 列分量
        const zone = (yRow + xCol) & 0xFF;
        let out = `场地 Zone 计算 (模拟 $E709)\n`;
        out += `═══════════════════════════════\n`;
        out += `输入: X=$${byteHex((x16 >> 8) & 0xFF)}${byteHex(x16 & 0xFF)}(${x16}) Y=$${byteHex((y16 >> 8) & 0xFF)}${byteHex(y16 & 0xFF)}(${y16})\n\n`;
        out += `步骤:\n`;
        out += `  1. Y - $50 = $${yOff.toString(16).toUpperCase().padStart(4, '0')}\n`;
        out += `  2. X - $30 = $${xOff.toString(16).toUpperCase().padStart(4, '0')}\n`;
        out += `  3. AND $E0 → Y行: $${(yOff & 0xFFE0).toString(16).toUpperCase().padStart(4, '0')}, X列: $${(xOff & 0xFFE0).toString(16).toUpperCase().padStart(4, '0')}\n`;
        out += `  4. Y行>>3 = ${yRow}, X列>>5 = ${xCol}\n\n`;
        out += `Zone = ${yRow} + ${xCol} = $${byteHex(zone)}(${zone})\n`;
        out += `\n$062A bit7 改变标志: ${zone !== 0 ? '会触发 $EB86 重新排版' : '无变化'}`;
        return out;
    },
    /** 近距球员筛选模拟 */
    _b31SimNearPlayer(px, py, tx, ty, threshold) {
        // 曼哈顿距离: |dx| + |dy|
        const dx = Math.abs(px - tx);
        const dy = Math.abs(py - ty);
        const dist = dx + dy;
        const within = dist <= threshold ? '是 ✅' : '否 ❌';
        let out = `近距球员筛选 (模拟 $E501)\n`;
        out += `═══════════════════════════════\n`;
        out += `球员位置: ($${byteHex(px & 0xFF)}(${px}), $${byteHex(py & 0xFF)}(${py}))\n`;
        out += `目标/球位: ($${byteHex(tx & 0xFF)}(${tx}), $${byteHex(ty & 0xFF)}(${ty}))\n`;
        out += `阈值: $${byteHex(threshold)}(${threshold})\n\n`;
        out += `|dx| = ${dx}, |dy| = ${dy}\n`;
        out += `曼哈顿距离 = ${dx} + ${dy} = ${dist}\n`;
        out += `距离 ≤ 阈值? ${within}\n\n`;
        if (within === '是 ✅') {
            out += '此球员会被加入 $0601 缓冲区\n';
            out += '最多保存 5 名(MY TEAM) 或 4 名(OPP TEAM)\n';
            out += '后续 $E54C AI 会从此缓冲筛选可用球员';
        }
        else {
            out += '距离太远, 不加入缓冲区';
        }
        return out;
    },
    /** BPM 计数器模拟 */
    _b31SimBpmUpdate(bpm, valLo, valHi) {
        bpm = (bpm + 1) % 12; // 满 12 循环 (实际 ASM 上限 11)
        // 数据减法: val = val - $0A (ASM SBC #$0A)
        const val = ((valHi << 8) | valLo) & 0xFFFF;
        const newVal = (val - 0x0A) & 0xFFFF;
        // 下限保护
        const protectedVal = Math.max(newVal, 5);
        let out = `BPM 计数器模拟 (模拟 $E2BC)\n`;
        out += `═══════════════════════════════\n`;
        out += `原始 BPM: $${byteHex((bpm - 1 + 12) % 12)} → 新 BPM: $${byteHex(bpm)}\n`;
        out += `球员数据: $${val.toString(16).toUpperCase().padStart(4, '0')}(${val})\n`;
        out += `扣除 $0A → $${newVal.toString(16).toUpperCase().padStart(4, '0')}(${newVal})\n`;
        out += `下限保护($5) → $${protectedVal.toString(16).toUpperCase().padStart(4, '0')}(${protectedVal})\n\n`;
        out += '说明: 每帧 BPM++ → 满 11 循环 → 球员数据按 $0A 递减 →\n';
        out += '下限 $0005, 上限 $FFFF → $062A bit7 改变时重新加载';
        return out;
    },
    onB31SelectFunction(e) {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        const func = this.data.b31Subroutines[idx];
        const startAddrHex = func.startBankAddr;
        this.setData({
            b31SelectedFunc: {
                ...func,
                startAddrHex,
            },
        });
    },
    // ── Bank 12 音频引擎 ──
    onB12SelectFunction(e) {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        const func = this.data.b12Subroutines[idx];
        this.setData({ b12SelectedFunc: func });
    },
    /** 选择一条音效/音乐, 读取对应的音轨 hex 数据 */
    onB12SelectMusic(e) {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        if (isNaN(idx))
            return;
        this.setData({ b12MusicTrackIdx: idx });
        this._loadB12TrackHex(idx);
    },
    /** 上一首 */
    onB12PrevTrack() {
        const total = this.data.b12SoundEffectMap.length;
        if (total === 0)
            return;
        const newIdx = (this.data.b12MusicTrackIdx - 1 + total) % total;
        this.setData({ b12MusicTrackIdx: newIdx });
        this._loadB12TrackHex(newIdx);
        // 如果正在播放，自动切到新曲目
        if (this.data.b12PlayerRunning) {
            this._switchToTrack(newIdx);
        }
    },
    /** 下一首 */
    onB12NextTrack() {
        const total = this.data.b12SoundEffectMap.length;
        if (total === 0)
            return;
        const newIdx = (this.data.b12MusicTrackIdx + 1) % total;
        this.setData({ b12MusicTrackIdx: newIdx });
        this._loadB12TrackHex(newIdx);
        // 如果正在播放，自动切到新曲目
        if (this.data.b12PlayerRunning) {
            this._switchToTrack(newIdx);
        }
    },
    /** 切换到指定 track 播放（复用播放流程） */
    _switchToTrack(idx) {
        const seEntries = this.data.b12SoundEffectMap;
        if (idx < 0 || idx >= seEntries.length)
            return;
        const entry = seEntries[idx];
        if (this._audioPlayer) {
            this._audioPlayer.stop();
            this._audioPlayer.play(entry.seId || (idx + 1));
        }
        wx.showToast({ title: `切换: SE $0${(entry.seId || (idx + 1)).toString(16).toUpperCase()}`, icon: 'none', duration: 1000 });
    },
    _loadB12TrackHex(idx) {
        const seEntries = this.data.b12SoundEffectMap;
        if (idx < 0 || idx >= seEntries.length) {
            this.setData({ b12TrackHex: '' });
            return;
        }
        const entry = seEntries[idx];
        // 解析描述中的地址: "SQ1:$8E42, SQ2:$8E5B, TRI:$8E68"
        const desc = entry.desc || '';
        const ptrMatch = desc.matchAll(/\$([0-9A-Fa-f]{4})/g);
        const ptrs = [];
        for (const m of ptrMatch) {
            const addr = parseInt(m[1], 16);
            if (!isNaN(addr) && addr >= 0x8000 && addr < 0xA000) {
                const chName = desc.slice(Math.max(0, (m.index || 0) - 3), m.index).trim().replace(':', '').trim();
                ptrs.push({ channel: chName || `$${addr.toString(16)}`, addr });
            }
        }
        let result = '';
        result += `═══ 音效 #${idx} (seId=0x${entry.seId?.toString(16).toUpperCase() || '?'}) ═══\n`;
        result += `Bank: ${entry.bank || '?'}  ·  描述: ${entry.desc || '?'}\n`;
        result += `\n`;
        // 从 PRG ROM 读取对应 bank 的数据
        for (const p of ptrs) {
            result += `── ${p.channel} ──\n`;
            const bankId = entry.bank ? parseInt(entry.bank, 16) : 0x0D;
            const prgOffset = (bankId * BANK_SIZE) + (p.addr - 0x8000);
            const maxRead = 200;
            const bytes = [];
            for (let i = 0; i < maxRead && prgOffset + i < index_1.NES_PRG_ROM.length; i++) {
                bytes.push(index_1.NES_PRG_ROM[prgOffset + i]);
            }
            // 格式化为彩色 hex dump
            const lines = [];
            for (let i = 0; i < bytes.length; i += 16) {
                const addrHex = (p.addr + i).toString(16).toUpperCase().padStart(4, '0');
                let hexPart = '';
                for (let j = 0; j < 16 && i + j < bytes.length; j++) {
                    const b = bytes[i + j];
                    const h = byteHex(b);
                    if (b >= 0xE0 && b < 0xFF) {
                        hexPart += `[${h}]`;
                    }
                    else if (b >= 0xA0 && b < 0xE0) {
                        hexPart += `(${h})`;
                    }
                    else if (b === 0x00) {
                        hexPart += `<${h}>`;
                    }
                    else if (b === 0xFF) {
                        hexPart += `!${h}!`;
                    }
                    else {
                        hexPart += ` ${h} `;
                    }
                }
                lines.push(`$${addrHex}: ${hexPart}`);
            }
            result += lines.join('\n') + '\n\n';
        }
        result += `── 图例 ──\n`;
        result += ` [XX] = 命令  (XX) = 音符  <XX> = 休止/结束  !XX! = 序列尾\n`;
        this.setData({ b12TrackHex: result });
    },
    // ── PAPU + 音序器 合成 & 播放 ──
    _audioPlayer: null,
    _audioCtx: null,
    _audioNode: null,
    _animId: -1,
    _sampleRate: 48000,
    // 环形缓冲区 (~200ms)
    _ring: new Float32Array(48000 * 4),
    _ringW: 0,
    _ringR: 0,
    /** 创建 Bank12AudioPlayer 并启动音频上下文 */
    _initAudioPlayer() {
        if (this._audioPlayer)
            return;
        this._audioPlayer = new bank12_audio_player_1.Bank12AudioPlayer();
        this._audioPlayer.onSample = (left, right) => {
            this._writeRing(left, right);
        };
    },
    /** 启动 WebAudioContext 和 ScriptProcessorNode */
    _startAudio() {
        try {
            this._audioCtx = wx.createWebAudioContext();
            // ScriptProcessorNode buffer
            const SCRIPT_BUF = 2048;
            const node = this._audioCtx.createScriptProcessor(SCRIPT_BUF, 0, 2);
            node.onaudioprocess = (e) => {
                const L = e.outputBuffer.getChannelData(0);
                const R = e.outputBuffer.getChannelData(1);
                for (let i = 0; i < SCRIPT_BUF; i++) {
                    const s = this._readRing();
                    L[i] = s.l;
                    R[i] = s.r;
                }
            };
            node.connect(this._audioCtx.destination);
            this._audioNode = node;
        }
        catch (e) {
            console.error('[audio] 启动音频失败:', e?.message);
        }
    },
    /** 停止音频 */
    _stopAudio() {
        if (this._audioNode) {
            try {
                this._audioNode.disconnect();
            }
            catch (_) { }
            this._audioNode = null;
        }
        if (this._audioCtx) {
            try {
                this._audioCtx.close();
            }
            catch (_) { }
            this._audioCtx = null;
        }
        this._ringW = 0;
        this._ringR = 0;
    },
    /** 写入环形缓冲区 */
    _writeRing(l, r) {
        const cap = this._ring.length;
        const next = (this._ringW + 2) % cap;
        if (next === this._ringR)
            return; // 缓冲区满, 丢帧
        this._ring[this._ringW] = Math.max(-1, Math.min(1, l));
        this._ring[this._ringW + 1] = Math.max(-1, Math.min(1, r));
        this._ringW = next;
    },
    /** 从环形缓冲区读取 */
    _readRing() {
        const cap = this._ring.length;
        if (this._ringR === this._ringW)
            return { l: 0, r: 0 };
        const l = this._ring[this._ringR];
        const r = this._ring[this._ringR + 1];
        this._ringR = (this._ringR + 2) % cap;
        return { l, r };
    },
    /** 播放选中的音轨 — 使用 PAPU + 音序器 (Bank12AudioPlayer) */
    onB12PlayTrack() {
        const idx = this.data.b12MusicTrackIdx;
        const seEntries = this.data.b12SoundEffectMap;
        if (idx < 0 || idx >= seEntries.length) {
            wx.showToast({ title: '请先选择一首', icon: 'none' });
            return;
        }
        const entry = seEntries[idx];
        this._initAudioPlayer();
        if (this._audioPlayer) {
            this._audioPlayer.stop();
            this._audioPlayer.play(entry.seId || (idx + 1));
        }
        // ★ 修复: 预填充环形缓冲区, 避免 ScriptProcessor 启动后读空缓冲
        if (this._audioPlayer) {
            for (let i = 0; i < 30; i++) {
                this._audioPlayer.tickFrame();
            }
        }
        this._startAudio();
        // 初始采集一次通道状态
        if (this._audioPlayer) {
            this.setData({
                b12ApuChannels: this._audioPlayer.getApuChannelStates(),
                b12Progress: this._audioPlayer.getProgress(),
            });
        }
        this.setData({ b12PlayerRunning: true });
        wx.showToast({ title: `播放中: SE $0${(entry.seId || (idx + 1)).toString(16).toUpperCase()}`, icon: 'none', duration: 1500 });
        // 启动帧循环 (~60fps)
        this._startFrameLoop();
    },
    /** 停止播放 */
    onB12StopTrack() {
        this._stopFrameLoop();
        if (this._audioPlayer) {
            this._audioPlayer.stop();
        }
        this._stopAudio();
        this.setData({ b12ApuChannels: [], b12PlayerRunning: false, b12Progress: null });
        wx.showToast({ title: '已停止', icon: 'none', duration: 800 });
    },
    /** 帧循环: 每 1/60s tick 音序器 + PAPU */
    _startFrameLoop() {
        if (this._animId >= 0)
            return;
        const FRAME_MS = 17; // ~60fps
        let tickCount = 0;
        const tick = () => {
            if (!this._audioPlayer)
                return;
            // tick 1 帧 (~16.67ms)
            this._audioPlayer.tickFrame();
            tickCount++;
            // 每 4 帧更新一次通道状态+进度 (避免 setData 过于频繁，同时让进度更实时)
            if (tickCount % 4 === 0) {
                this.setData({
                    b12ApuChannels: this._audioPlayer.getApuChannelStates(),
                    b12Progress: this._audioPlayer.getProgress(),
                });
            }
            this._animId = setTimeout(tick, FRAME_MS);
        };
        this._animId = setTimeout(tick, FRAME_MS);
    },
    _stopFrameLoop() {
        if (this._animId >= 0) {
            clearTimeout(this._animId);
            this._animId = -1;
        }
    },
    // ── Bank 30 选择函数 ──
    onB30SelectFunction(e) {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        const func = this.data.b30Subroutines[idx];
        this.setData({
            b30SelectedFunc: {
                ...func,
            },
        });
    },
    /** Bank 30 结构图渲染 */
    _renderBank30StructureMap() {
        const that = this;
        const query = wx.createSelectorQuery();
        query.select('#structCanvas')
            .fields({ node: true, size: true })
            .exec((res) => {
            const canvas = res?.[0]?.node;
            if (!canvas) {
                setTimeout(() => that._renderBank30StructureMap(), 300);
                return;
            }
            const w = 360;
            const h = 180;
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#0d1117';
            ctx.fillRect(0, 0, w, h);
            const total = 8192;
            const barY = 28;
            const barH = 30;
            // 统计: 代码 ~2100B, 数据 ~1700B, 未访问 ~1035B, 其余为填充
            const codeW = (2100 / total) * w;
            const dataW = (1700 / total) * w;
            const unaccW = (1035 / total) * w;
            const padW = (total - 2100 - 1700 - 1035) / total * w;
            let bx = 0;
            // 代码区
            ctx.fillStyle = '#3fb950';
            ctx.fillRect(bx, barY, codeW, barH);
            ctx.fillStyle = '#fff';
            ctx.font = '10px monospace';
            ctx.fillText('代码 ~2100B', bx + 4, barY + 20);
            bx += codeW;
            // 数据区
            ctx.fillStyle = '#58a6ff';
            ctx.fillRect(bx, barY, dataW, barH);
            ctx.fillText('数据 ~1700B', bx + 4, barY + 20);
            bx += dataW;
            // 未访问区
            if (unaccW > 0) {
                ctx.fillStyle = '#6e7681';
                ctx.fillRect(bx, barY, unaccW, barH);
                ctx.fillText('未访问 ~1035B', bx + 4, barY + 20);
                bx += unaccW;
            }
            // 填充/其他
            ctx.fillStyle = '#21262d';
            ctx.fillRect(bx, barY, padW, barH);
            // 功能标注行
            const features = [
                { name: '系统数据', x: 0, w: 0.16, color: '#d2a8ff' },
                { name: '跳转表', x: 0.16, w: 0.045, color: '#ffa657' },
                { name: '中断处理', x: 0.205, w: 0.08, color: '#f85149' },
                { name: '核心服务层', x: 0.285, w: 0.30, color: '#3fb950' },
                { name: '物理/速度表', x: 0.585, w: 0.12, color: '#58a6ff' },
                { name: '场景/音频', x: 0.705, w: 0.15, color: '#a5d6ff' },
                { name: 'OAM/PPU缓冲', x: 0.855, w: 0.145, color: '#7ee787' },
            ];
            const featY = barY + barH + 12;
            ctx.font = '9px monospace';
            features.forEach(f => {
                const fx = f.x * w;
                const fw = f.w * w;
                ctx.fillStyle = f.color + '30';
                ctx.fillRect(fx, featY, fw, 24);
                ctx.fillStyle = f.color;
                if (fw > 50)
                    ctx.fillText(f.name, fx + 2, featY + 16);
            });
            // 中断向量标注
            const ivY = featY + 36;
            ctx.fillStyle = '#f85149';
            ctx.fillText('NMI $C500→$C76E', 4, ivY);
            ctx.fillText('RESET $C503→$C64E', 120, ivY);
            ctx.fillText('IRQ $C506→$C821', 248, ivY);
            // 图例
            const legY = ivY + 16;
            ctx.fillStyle = '#58a6ff';
            ctx.fillRect(4, legY, 12, 12);
            ctx.fillStyle = '#3fb950';
            ctx.fillRect(70, legY, 12, 12);
            ctx.fillStyle = '#ffa657';
            ctx.fillRect(136, legY, 12, 12);
            ctx.fillStyle = '#d2a8ff';
            ctx.fillRect(202, legY, 12, 12);
            ctx.fillStyle = '#6e7681';
            ctx.font = '9px monospace';
            ctx.fillText('数据 数据表', 20, legY + 10);
            ctx.fillText('代码 服务', 86, legY + 10);
            ctx.fillText('跳转表', 152, legY + 10);
            ctx.fillText('参数区', 218, legY + 10);
            // 地址刻度
            const scaleY = legY + 22;
            ctx.fillStyle = '#6e7681';
            ctx.font = '8px monospace';
            for (let addr = 0xC000; addr <= 0xE000; addr += 0x1000) {
                const x = ((addr - 0xC000) / total) * w;
                ctx.fillText('$' + addr.toString(16).toUpperCase(), x + 2, scaleY);
            }
            that.setData({ b30StructureReady: true, b30StructureSrc: 'rendered' });
        });
    },
    /** Bank 31 结构图渲染 */
    _renderBank31StructureMap() {
        const that = this;
        const analysis = bank31_analysis_1.default;
        const query = wx.createSelectorQuery();
        query.select('#structCanvas')
            .fields({ node: true, size: true })
            .exec((res) => {
            const canvas = res?.[0]?.node;
            if (!canvas) {
                setTimeout(() => that._renderBank31StructureMap(), 300);
                return;
            }
            const w = 360;
            const h = 160;
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#0d1117';
            ctx.fillRect(0, 0, w, h);
            const total = 8192;
            const barY = 34;
            const barH = 28;
            // 代码/数据/未访问 比例条
            const codeW = (analysis.stats.codeBytes / total) * w;
            const dataW = (analysis.stats.dataBytes / total) * w;
            const unaccW = (analysis.stats.unaccessedBytes / total) * w;
            let cx = 0;
            ctx.fillStyle = '#58a6ff';
            ctx.fillRect(cx, barY, codeW, barH);
            cx += codeW;
            ctx.fillStyle = '#3fb950';
            ctx.fillRect(cx, barY, dataW, barH);
            cx += dataW;
            ctx.fillStyle = '#6e7681';
            ctx.fillRect(cx, barY, unaccW, barH);
            // 按功能区域画分布
            const sections = [
                { name: '比赛入口+主循环', start: 0xE002, end: 0xE854, color: '#58a6ff', pct: 0.42 },
                { name: 'AI/筛选', start: 0xE4D7, end: 0xE54C, color: '#d29922', pct: 0.06 },
                { name: '进球+半场', start: 0xE596, end: 0xE688, color: '#da3633', pct: 0.05 },
                { name: '方向/寻路', start: 0xE688, end: 0xE7D0, color: '#a371f7', pct: 0.06 },
                { name: '动画排版', start: 0xE893, end: 0xEB86, color: '#3fb950', pct: 0.10 },
                { name: 'Tick/暂停', start: 0xEB86, end: 0xEE00, color: '#f0883e', pct: 0.08 },
                { name: '数据表', start: 0xE6CF, end: 0x9FFF, color: '#6e7681', pct: 0.23 },
            ];
            const detailY = barY + barH + 6;
            const detailH = 20;
            for (const s of sections) {
                const sx = ((s.start - 0xE000) / total) * w;
                const sw = Math.max(((s.end - s.start) / total) * w, 2);
                ctx.fillStyle = s.color;
                ctx.fillRect(sx, detailY, sw, detailH);
                ctx.fillStyle = '#e6edf3';
                ctx.font = '8px monospace';
                if (sw > 30)
                    ctx.fillText(s.name, sx + 2, detailY + detailH - 5);
            }
            // 地址刻度
            ctx.fillStyle = '#6e7681';
            ctx.font = '9px monospace';
            for (let addr = 0xE000; addr <= 0x10000; addr += 0x800) {
                const x = ((addr - 0xE000) / total) * w;
                ctx.fillText('$' + addr.toString(16).toUpperCase(), x + 2, h - 4);
                ctx.strokeStyle = '#21262d';
                ctx.beginPath();
                ctx.moveTo(x, barY);
                ctx.lineTo(x, detailY + detailH + 4);
                ctx.stroke();
            }
            // 图例
            const legend = [
                { c: '#58a6ff', t: `代码 ${analysis.stats.codeBytes}B` },
                { c: '#3fb950', t: `数据 ${analysis.stats.dataBytes}B` },
                { c: '#6e7681', t: `未访问 ${analysis.stats.unaccessedBytes}B` },
            ];
            let lx = 6, ly = 14;
            for (const l of legend) {
                ctx.fillStyle = l.c;
                ctx.fillRect(lx, ly - 8, 10, 10);
                ctx.fillStyle = '#c9d1d9';
                ctx.font = '10px monospace';
                ctx.fillText(l.t, lx + 14, ly);
                lx += 110;
            }
            wx.canvasToTempFilePath({
                canvas,
                success: (r) => { that.setData({ b31StructureSrc: r.tempFilePath, b31StructureReady: true }); },
                fail: () => {
                    try {
                        const url = canvas.toDataURL?.();
                        if (url)
                            that.setData({ b31StructureSrc: url, b31StructureReady: true });
                    }
                    catch (_e) { }
                },
            });
        });
    },
    _getStats(type, id) {
        if (type === 'CHR') {
            return { code: 0, data: 8192, unacc: 0, cpu: `PPU` };
        }
        /** CDL 来源: _tmp_bzk_out/Captain Tsubasa II - Super Striker (Japan).cdl (FCEUX 录制) */
        const stats = {
            0: { code: 7272, data: 531, unacc: 471, cpu: '$8000' },
            1: { code: 4282, data: 3652, unacc: 288, cpu: '$8000' },
            2: { code: 1836, data: 261, unacc: 6111, cpu: '$8000' },
            3: { code: 0, data: 8186, unacc: 6, cpu: '$8000' },
            4: { code: 0, data: 8158, unacc: 34, cpu: '$8000' },
            5: { code: 0, data: 8162, unacc: 30, cpu: '$8000' },
            6: { code: 0, data: 3345, unacc: 4847, cpu: '$8000' },
            7: { code: 0, data: 3908, unacc: 4284, cpu: '$8000' },
            8: { code: 0, data: 6358, unacc: 1834, cpu: '$8000' },
            9: { code: 0, data: 6645, unacc: 1547, cpu: '$8000' },
            10: { code: 0, data: 7039, unacc: 1153, cpu: '$8000' },
            11: { code: 1475, data: 5978, unacc: 752, cpu: '$8000' },
            12: { code: 1672, data: 6100, unacc: 432, cpu: '$8000' },
            13: { code: 0, data: 8176, unacc: 16, cpu: '$8000' },
            14: { code: 0, data: 8177, unacc: 15, cpu: '$8000' },
            15: { code: 0, data: 8134, unacc: 58, cpu: '$8000' },
            16: { code: 1860, data: 4883, unacc: 1457, cpu: '$8000' },
            17: { code: 0, data: 7496, unacc: 696, cpu: '$8000' },
            18: { code: 0, data: 7615, unacc: 577, cpu: '$8000' },
            19: { code: 877, data: 5020, unacc: 2295, cpu: '$8000' },
            20: { code: 2000, data: 6100, unacc: 114, cpu: '$8000' },
            21: { code: 0, data: 6933, unacc: 1259, cpu: '$8000' },
            22: { code: 451, data: 7393, unacc: 353, cpu: '$8000' },
            23: { code: 0, data: 8060, unacc: 132, cpu: '$8000' },
            24: { code: 2774, data: 4776, unacc: 674, cpu: '$8000' },
            25: { code: 0, data: 7724, unacc: 468, cpu: '$8000' },
            26: { code: 7362, data: 669, unacc: 228, cpu: '$8000' },
            27: { code: 384, data: 6070, unacc: 1742, cpu: '$8000' },
            28: { code: 2871, data: 4544, unacc: 815, cpu: '$8000' },
            29: { code: 0, data: 4635, unacc: 3557, cpu: '$8000' },
            30: { code: 6350, data: 1596, unacc: 341, cpu: '$C000' },
            31: { code: 3949, data: 3415, unacc: 856, cpu: '$E000' },
        };
        return stats[id] || { code: 0, data: 0, unacc: BANK_SIZE, cpu: '$8000' };
    },
    _getName(type, id) {
        if (type === 'CHR') {
            return `Pattern Table ${String(id).padStart(2, '0')}`;
        }
        const names = {
            0: 'System Service & Main Loop',
            1: 'Data Query Service',
            2: 'Scene Controller',
            3: 'Narration Text I',
            4: 'Narration Text II',
            5: 'Team Formation & Tactics',
            6: 'Narration Text III',
            7: 'Field Metatile Layout',
            8: 'Dialog Text I',
            9: 'Dialog Text II',
            10: 'Scene Map & Location',
            11: 'Match Turn Logic I',
            12: 'Audio Engine',
            13: 'Animation Frames I',
            14: 'Animation Data II',
            15: 'Animation Data III',
            16: 'Special Moves & Skills',
            17: 'Large Data Block I',
            18: 'Large Data Block II',
            19: 'Auxiliary Logic & Data',
            20: 'Match Auxiliary Logic',
            21: 'Extended Data I',
            22: 'Data-Code Hybrid',
            23: 'Extended Data II',
            24: 'AI & Decision Logic',
            25: 'Extended Data III',
            26: 'Match Core Engine',
            27: 'Data + Minimal Code',
            28: 'Auxiliary Logic & Data',
            29: 'Extended Data (Low Use)',
            30: 'Core System Library',
            31: 'Interrupt Vectors',
        };
        return names[id] || 'Unknown';
    },
    _getDescription(type, id) {
        if (type === 'CHR') {
            return `图块数据 ${8 * id}–${8 * id + 8}KB (tile #${512 * id}–#${512 * (id + 1) - 1})`;
        }
        const descs = {
            0: 'System Service & Main Loop ($9EED) — 系统服务+主循环引擎：PPU/VRAM/定时器 — 被Bank30映射、Bank02调用',
            1: 'Data Query Service — 球员/队伍数据查询 → 调用 Bank 02 $A72C',
            2: 'Scene Controller ($A200) — 场景控制器：初始化密集调Bank00 → JMP $9EED 进入主循环 — 读 Bank 03/04/07',
            3: 'Narration Text (PT1) — 解说/过场打字机文本（CHR tile序列，含浊点/半浊点复合tile）',
            4: 'Narration Text (PT2) — 解说/过场打字机文本（续）',
            5: 'Team Formation & Tactics — 队伍阵型/策略数据',
            6: 'Narration Text (PT3) — 解说/过场打字机文本（$FC分隔）',
            7: 'Field Metatile Layout — 足球场地 Metatile 布局 — mask=$07',
            8: 'Dialog Text (PT1) — 对话文本数据',
            9: 'Dialog Text (PT2) — 对话文本数据',
            10: 'Scene Map & Location — 场景描述/地图定位',
            11: 'Match Turn Logic (PT1) — 比赛回合逻辑 & 行动数据',
            12: 'Audio Engine ($8000-$9FFF) — NES APU 音频驱动核心 — 音乐/音效播放引擎 · 代码 1672B · 数据 6100B · $0700-$07FF 工作区',
            13: 'Animation Frames (PT1) — 动画/过场帧数据',
            14: 'Animation Data (PT2) — 动画/演出数据',
            15: 'Animation Data (PT3) — 动画/演出数据',
            16: 'Special Moves & Skills — 特殊动作/技能 (1860B code, 4883B data)',
            17: 'Large Data Block (PT1) — 大型数据块 (7496B data, 新CDL增加257B)',
            18: 'Large Data Block (PT2) — 大型数据块',
            19: 'Auxiliary Logic & Data — 辅助逻辑 & 数据',
            20: 'Match Auxiliary Logic — 比赛辅助逻辑 & 数据 (2000B code, 6100B data)',
            21: 'Extended Data (PT1) — 扩展数据 (6933B data, 新CDL增加32B)',
            22: 'Data+Code Hybrid — 数据+代码混合',
            23: 'Extended Data (PT2) — 扩展数据 (8060B data)',
            24: 'AI & Decision Logic — AI/决策逻辑 & 数据 (4776B data, 新CDL增加90B)',
            25: 'Extended Data (PT3) — 扩展数据 (7724B data, 新CDL增加204B)',
            26: 'Match Core Engine — 比赛核心引擎 (7362B code, 最大代码Bank)',
            27: 'Data + Minimal Code — 数据(极少量代码)',
            28: 'Auxiliary Logic & Data — 辅助逻辑 & 数据',
            29: 'Extended Data (Low Usage) — 扩展数据(低利用率)',
            30: 'Core System Library (FIXED $C000) — HW初始化 + Bank31唯一对外接口 — JMP跳转表API | NMI/IRQ/Bank切换 | PPU/APU/控制器/数学',
            31: 'Interrupt Vectors (FIXED $E000) — 仅依赖Bank30(JMP跳转表) — 不直接调$8000-$BFFF — RESET→Bank30 $C64E',
        };
        return descs[id] || '未知';
    },
});
