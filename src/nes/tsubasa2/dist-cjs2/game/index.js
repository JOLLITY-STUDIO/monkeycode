"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tsubasa2 = exports.DataStore = exports.CHR_BANK_COUNT = exports.CHR_BANK_SIZE = exports.CHR_BANKS = exports.NES_CHR_ROM = exports.Mirroring = exports.CONFIG = exports.HEADER = void 0;
/**
 * ��ʹ֮��2 �� game ����ϸ���Tsubasa2 ���ࣩ
 *
 * MVC �ṹ��
 *   code/ = Service��ҵ���߼���    data/ = Table������ģ�ͣ�
 *
 * ÿ֡���̣���ʵ��Ϸ��Ϊ����
 *   1. InputService ע�� core ������״̬
 *   2. InterruptService.nmi(frame) �� ���壺���ֱ� �� �����߼��ƽ�
 *   3. AudioService.update() �� ��Ƶ�����ƽ�
 *   4. InterruptService.renderCommit(ppu) �� ��Ⱦ�ύ��CTRL/MASK/����/��Ⱦ����/OAM/��ɫ��
 *   5. PPU ɨ������Ⱦ��startFrame �� advanceDots �� renderFramePartially �� endFrame��
 *
 * ����ԭ��ȫ��Ϊ�߼�����ֱ�ӷ��룬�� CPU���� bank �л����档
 */
const header_1 = require("./header");
Object.defineProperty(exports, "HEADER", { enumerable: true, get: function () { return header_1.HEADER; } });
Object.defineProperty(exports, "CONFIG", { enumerable: true, get: function () { return header_1.CONFIG; } });
Object.defineProperty(exports, "Mirroring", { enumerable: true, get: function () { return header_1.Mirroring; } });
const index_1 = require("./chr/index");
Object.defineProperty(exports, "NES_CHR_ROM", { enumerable: true, get: function () { return index_1.NES_CHR_ROM; } });
Object.defineProperty(exports, "CHR_BANKS", { enumerable: true, get: function () { return index_1.CHR_BANKS; } });
Object.defineProperty(exports, "CHR_BANK_SIZE", { enumerable: true, get: function () { return index_1.CHR_BANK_SIZE; } });
Object.defineProperty(exports, "CHR_BANK_COUNT", { enumerable: true, get: function () { return index_1.CHR_BANK_COUNT; } });
const opening_data_1 = require("./prg/data/scene/opening-data");
const index_2 = require("./prg/data/index");
const index_3 = require("./prg/index");
Object.defineProperty(exports, "DataStore", { enumerable: true, get: function () { return index_3.DataStore; } });
// PAPU������ NES APU ģ������
// @ts-ignore �� tsnes ��ֲ���룬��ɢ����
const index_4 = __importDefault(require("../core/papu/index"));
/**
 * Tsubasa2 �� ��ϸ������弴�ã�
 *
 * �÷���
 *   const game = new Tsubasa2();
 *   game.boot();             // Reset �� �������ȣ�������
 *   game.frame(nes);         // ÿ֡������� 60fps ѭ�����ã�
 */
class Tsubasa2 {
    constructor() {
        /** ֡������NMI ֡�ţ� */
        this._frame = 0;
        /** PAPU ʵ����NES APU ģ������ */
        this._papu = null;
        /** WebAudio �����ģ�С���� wx.createWebAudioContext�� */
        this._webAudio = null;
        /** ��Ƶ�������� */
        this._audioSamples = [];
        /** ����д��λ�� */
        this._sampleOffset = 0;
        this.store = new index_3.DataStore();
        this.input = new index_3.InputService(this.store);
        // bank00 ���������ϸ�ʵ������
        // PRG $9EEF-$9FA8 scheduler tail / $9FA8 push trampoline / $9085 tick entry
        this.bank00Scheduler = new index_3.Bank00SchedulerService(this.store);
        // PRG $8464 cfg loader���� bank װ�أ� �� ע�� PpuTransferService ��Ҫ PPU target��
        // ��ʱ target ��δ attach��boot() ʱ���� attach������ѡ null
        this.ppuTransfer = new index_3.PpuTransferService(this.store, null);
        // PRG $82ED NT stream loader
        this.ntStreamLoader = new index_3.NtStreamLoaderService(this.store, this.ppuTransfer);
        // PRG $8AF7 scene handler loader + $8E15 NT copy/tile decoder
        this.sceneStateMachine = new index_3.SceneStateMachine(this.store, this.ppuTransfer);
        // ע: TileBuilderService �� Scene0/Scene18 �ڲ��Խ���Tsubasa2 ����¶��
        // ������������BootRouter �Զ�ͳһ register Scene0-23��BootRouter �ڲ����� MainRouterService��
        // ����ű���V0.4 ���룩�� meeting ��һ�ξ���
        const scriptLoader = new index_3.ScriptLoader(this.store);
        const scriptEngine = new index_3.ScriptEngine(this.store, scriptLoader);
        const charMap = new index_3.CharMap();
        this.scriptEngine = scriptEngine;
        // ����ĸ tile id ӳ��� (PRG bank08 ͷע�ͳ�, �滻 initDefault ASCII fallback)
        //   A=0x03 B=0x0B C=0x0C D=0x0D E=0x07 F=0x0F G=0x10 H=0x0A I=0x13 J=0x14 K=0x15 L=0x16
        //   M=0x17 N=0x18 O=0x19 P=0x05 Q=0x11 R=0x12 S=0x0E T=0x14 U=0x1B V=0x1C W=0x1D X=0x1E
        //   Y=0x1F Z=0x20 �ո�=0x3C ͸��=0x00
        //
        // V0.6 CHR bank 124-127 (0x7C-0x7F) ���� vs LetterMapping ��֤ ��
        //   �� J(0x4A) �� 0x14 �� T(0x54) �� 0x14 ��ͻ ��
        //   prg-bank-08.ts ͷע����ȷд J=0x14 & T=0x14 �� ������ͬʱ��ȷ, ����һ����λ
        //   "THEATER" trace (bank-08 PRG ������) ����֤ T=0x14 ��ȷ (T H E A T E R �� 14 0A 07 03 14 07 12)
        //   �� J Ӧ��Ϊ 0x21 �� 0x24 (�� PNG ֱ�Ӷ�ȡ chr-bank-7c.ts �� tile 0x03 ��֤��ĸ A ����)
        //   �� Ŀǰ���� J=0x14 ռλ: meeting �ı����� J/T (���ļ��� + ���� + ���� ASCII), ��Ӱ����ʾ
        charMap.registerTable([
            [0x20, 0x3c], [0x41, 0x03], [0x42, 0x0b], [0x43, 0x0c], [0x44, 0x0d],
            [0x45, 0x07], [0x46, 0x0f], [0x47, 0x10], [0x48, 0x0a], [0x49, 0x13],
            [0x4a, 0x14], [0x4b, 0x15], [0x4c, 0x16], [0x4d, 0x17], [0x4e, 0x18],
            [0x4f, 0x19], [0x50, 0x05], [0x51, 0x11], [0x52, 0x12], [0x53, 0x0e],
            [0x54, 0x14], [0x55, 0x1b], [0x56, 0x1c], [0x57, 0x1d], [0x58, 0x1e],
            [0x59, 0x1f], [0x5a, 0x20], [0x00, 0x00],
            // ���� 0-9 (bank08 ע�� 0x16..0x1f ��Χ, �� ASCII fallback ���� - δȷ�Ͼ�ȷ)
            [0x30, 0x16], [0x31, 0x17], [0x32, 0x18], [0x33, 0x19], [0x34, 0x1a],
        ]);
        // V0.6 ��֤ trace: dump ��ǰ��ĸӳ�� + У�� THEATER ������ȷ����
        //   THEATER = T(0x54)��0x14 H(0x48)��0x0A E(0x45)��0x07 A(0x41)��0x03 T��0x14 E��0x07 R(0x52)��0x12
        //   ���� tile ����: 14 0A 07 03 14 07 12 �� �� prg-bank-08 ͷע�� THEATER sample ��ȫһ��
        const THEATER_TILES = [0x14, 0x0a, 0x07, 0x03, 0x14, 0x07, 0x12];
        const THEATER_CHARS = 'THEATER';
        const theaterDecoded = THEATER_CHARS.split('').map(c => charMap.toTile(c.charCodeAt(0)));
        const theaterMatch = theaterDecoded.every((t, i) => t === THEATER_TILES[i]);
        console.log(`[LetterMapping] A��0x${charMap.toTile(0x41).toString(16)} ` +
            `THEATER decoded=[${theaterDecoded.map(t => '0x' + t.toString(16)).join(',')}] ` +
            `match=${theaterMatch}`);
        // ��ɫ��� (PRG $96A5 palette alloc ���� - �� opening-data.ts ��� 16+16 �ֽ� palette)
        // OPENING_BG_PALETTES = 16 �� �� 16 �ֽ� (4 palette �� 4 �ֽ�)
        // OPENING_SPR_PALETTES = 16 �� �� 16 �ֽ�
        // PRG $9AB8: BG = $B000 + $0048*16 �� ram_062A (16 bytes)
        // PRG $9AD8: SPR = $B000 + $0049*16 �� ram_063A (16 bytes)
        // CharMap ע��ű�����ʱ��0x94/0x95 ��������ӳ�乩 ScriptOpcode.TextChar ʹ��
        // NT cursor: $05E7 ���ֽ� (mod 0x40 = 64 cells wrap), NT ��� $2000 (32x30 NT)
        // writeTextChar: PRG $9AA2 NT cell writer ���� - �� CharMap tile ��д NT ��ǰ cursor λ��
        const NT_BASE = 0x2000;
        const NT_CURSOR_KEY = 0x05e7;
        (0, index_3.setScriptRuntime)({
            charMap,
            readRam: (addr) => this.store.readByte(addr),
            writeRam: (addr, value) => this.store.writeByte(addr, value),
            writeTextChar: (tile) => {
                const cursor = this.store.readByte(NT_CURSOR_KEY) & 0x3f;
                // PRG $9AA2 NT cell writer ����: tile | base_pattern[cursor] ��Ϊ���� tile id
                // base_pattern[0] = 0x0F, ���� = 0x00
                const finalTile = (tile & 0xff) | (0, index_2.ntBasePattern)(cursor);
                // д tile �� NT (VRAM д͸�� setVramTarget ����, ֱ���䵽 PPU)
                this.store.writeByte(NT_BASE + cursor, finalTile & 0xff);
                // �ƽ� cursor (mod 64 wrap)
                this.store.writeByte(NT_CURSOR_KEY, (cursor + 1) & 0x3f);
            },
            // playBgm(0x0A): ί�� AudioService ���� BGM
            playBgm: (id) => this.audio.playBgm(id & 0xff),
            // playSe(0x0B): ί�� AudioService ���� SE
            playSe: (id) => this.audio.playSe(id & 0xff),
            // setPalette(0x08): PRG $96A5 palette alloc ����
            //   �� OPENING_BG_PALETTES[bgIdx] (16 �ֽ� BG palette) װ�ص� store.palette.bg ($062A-$0639)
            //   �� OPENING_SPR_PALETTES[sprIdx] (16 �ֽ� SPR palette) װ�ص� store.palette.spr ($063A-$0649)
            //   ���� renderCommit �� InterruptService.flushPalette �� PPU $3F00 (fadeLookup Ӧ��)
            //
            // V0.6: $062A palette stream F (= flushPalette ����) ���� ��
            //   - setPalette д�� store.palette.bg (RAM $062A-$0639, �� "BG palette stream 16 bytes")
            //   - renderCommit flushPalette ÿ֡�� $062A �� + fadeLookup �� writeMem PPU $3F00
            //   - sprite palette ͬ�� ($063A �� $3F10)
            //
            //   Emu trace ��֤ÿ֡ $3F00+ �� fade ֵ��� �� ��ǰ�� OPENING_*_PALETTES ����,
            //   meeting ����Ӧ�� BANK06 palette_table (�� V0.7 �� BANK06 palette ���ݸ���)
            setPalette: (bgIdx, sprIdx) => {
                const sceneId = this.store.scene.currentSceneId;
                const bgBi = bgIdx & 0x0f;
                const spSi = sprIdx & 0x0f;
                // meeting/title menu �ȷ� opening ����: ���� OPENING_*_PALETTES ����
                // (meeting/Scene0/TitleMenu/Meeting ʵ�� palette �� V0.7 �� BANK06 ����)
                const bg = opening_data_1.OPENING_BG_PALETTES[bgBi] ?? opening_data_1.OPENING_BG_PALETTES[0];
                const spr = opening_data_1.OPENING_SPR_PALETTES[spSi] ?? opening_data_1.OPENING_SPR_PALETTES[0];
                this.store.palette.loadBg(bg);
                this.store.palette.loadSpr(spr);
                // һ���� trace: �� console ��һ�� "stream F" д����ձ��� emu �ȶ�
                if (this._frame < 5 || this._frame % 600 === 0) {
                    console.log(`[setPalette] sceneId=0x${sceneId.toString(16)} bgIdx=${bgBi} sprIdx=${spSi} ` +
                        `bg0=0x${bg[0].toString(16)} spr0=0x${spr[0].toString(16)} frame=${this._frame}`);
                }
            },
            // loadSprite(0x09): ί�� SpriteService װ�� OAM ����
            //   ǩ��: putSprite(slot, tile, x, y, attr?) �� slot �� id �� slot; tile �� id �� tile ����
            loadSprite: (id, x, y, attr) => {
                this.sprite.putSprite(id & 0x3f, id & 0xff, x & 0xff, y & 0xff, attr & 0xff);
            },
        });
        // ������V0.5 ���룻V0.6 ע�뵽 MatchStart ��������
        const matchEngine = new index_3.MatchEngineService(this.store);
        const matchTurn = new index_3.MatchTurnService(this.store);
        const matchAux = new index_3.MatchAuxService(this.store);
        const matchHud = new index_3.MatchHudService(this.store);
        const matchConfig = new index_3.MatchConfigService(this.store);
        void matchAux;
        void matchConfig;
        // ���ݲ�ѯ��V0.2 ���룩
        const playerQuery = new index_3.PlayerQueryService(this.store);
        const teamRoster = new index_3.TeamRosterService(this.store);
        void playerQuery;
        void teamRoster;
        // ���� / ���� / ��Ƶ
        this.skill = new index_3.SkillService(this.store);
        const sprite = new index_3.SpriteService(this.store);
        this.sprite = sprite;
        const spriteAnim = new index_3.SpriteAnimationService(this.store);
        void sprite;
        void spriteAnim;
        this.audio = new index_3.AudioService(this.store);
        // ��Ƶ��������� PAPU + WebAudio��С���� wx.createWebAudioContext��
        this._initAudio();
        // ���� ·�����: bank00 vs bank02 ְ�������з� ����
        //   1) Bank00MainLoopService = bank00 ���� (PRG $8000 ���: 5-mode dispatch + scheduler tail + boot + audio req)
        //   2) BootRouter            = bank02 ���� (PRG $A000 ���: scene0+ ·�� + changeScene + ��ǰ scene ����)
        //   3) PpuTransferService   = PRG $8464 cfg loader (bank00 + bank02 ����)
        this.bank00MainLoop = new index_3.Bank00MainLoopService(this.store, this.bank00Scheduler, this.ppuTransfer);
        // ·��: ����������ע�� Scene0-23 (������ѭ�� register)
        this.router = new index_3.BootRouter(this.store, this.input);
        // ע�� bank00 PRG $8464 cfg loader �� BootRouter,
        // changeScene() �Զ�װ cfg (��� GameSystemService.sceneLoad Ӳ���� stub ��)
        this.router.attachPpuTransfer(this.ppuTransfer);
        // ע�� bank00 scheduler ������ Scene0-23 (PRG $9FA8 pushState ����)
        // ����� Scene �Լ�д�� this.wait/counter �Լ�ģʽ
        this.router.attachScheduler(this.bank00Scheduler);
        // ��Ƶע�� (���� 0 BGM/SE ���� �� BootRouter Ĭ����ע�� Scene0Controller ʵ��)
        this.router.getController(0 /* SceneId.Scene0 */).attachAudio(this.audio);
        // Ƭͷ���У�OpeningScene����Ƶע�루���� tecmo_logo �� BGM 0x01��
        this.router.getController(100 /* SceneId.Opening */).attachAudio(this.audio);
        // ��һ�� meeting ҳ�棨Scene14-23 chain ��·�յ㣩ע�� ScriptEngine �ܾ����һ��
        this.router.getController(index_3.MEETING_SCENE_ID).attachScriptEngine(this.scriptEngine);
        // MatchStart ������ڣ�Meeting �����һվ��ע�� MatchEngineService �ð� START ��������
        this.router.getController(index_3.MATCH_START_SCENE_ID).attachMatchEngine(matchEngine);
        // V0.6: MatchStart sprite ������· �� ����������ÿ֡�ƽ� game logic + HUD + turn
        this.router.getController(index_3.MATCH_START_SCENE_ID).attachMatchHud(matchHud);
        this.router.getController(index_3.MATCH_START_SCENE_ID).attachMatchTurn(matchTurn);
        // bank00 scene state machine + NT stream loader ע�� Scene0
        // (PRG $8AF7 scene handler loader + $82ED NT stream loader)
        this.router.getController(0 /* SceneId.Scene0 */).attachNtStreamLoader(this.ntStreamLoader);
        this.router.getController(0 /* SceneId.Scene0 */).attachSceneStateMachine(this.sceneStateMachine);
        // Ӳ����ʼ�� + �жϹ���
        this.hardware = new index_3.HardwareInitService(this.store);
        this.interrupts = new index_3.InterruptService(this.store, this.input);
        this.interrupts.attachRouter(this.router);
        this.interrupts.attachScheduler(this.bank00Scheduler);
        this.interrupts.attachBank00MainLoop(this.bank00MainLoop);
        // ���� bank00 5-mode dispatcher ���루$8000 ��ѭ�����룩����
        // sceneMainLoopStep ��Ϊ no-op����Ҫ�������ٵ� router.update():
        //   InterruptService.nmi() line 96 �Ѿ������� router.update() һ�Σ�
        //   dispatcher �ڲ��ٵ�һ�λ��� SceneController.onUpdate() �����飬counter �ӱ���
        // sceneHandlerA20C/A006/A009/A015/A012/A018/A00C �ݲ��� �� no-op��
        //   ���� dispatcher ������ $0026 �� router.changeScene ���
        //   ���� Scene0-23 ����Ϊ store �������ٽӣ�
        // ���� dispatcher ��ʵ�����壺�� mode0/1/2/3/4 5-mode state machine ��������
        //   д $0027/$0026/$0700/$0028/$0029 �� store �ֽڣ����� ROM ��ʵ��Ϊ��
        //   Scene0-23 ��ǰ������Щ�ֽڣ����Ը�������ʱ��Ӱ����Ϸ���̡�
        this.bank00MainLoop.attachHooks({
            sceneMainLoopStep: () => { },
        });
        this.bank00MainLoop.start();
        void matchEngine;
    }
    /**
     * ��ʼ����Ƶ������ PAPU + WebAudio ���
     *
     * С������ wx.createWebAudioContext() ���� WebAudio API��
     * PAPU �� onAudioSample �ص��Ѳ������뻺�壬
     * ÿ֡�� ScriptProcessorNode �� AudioWorklet ���š�
     */
    _initAudio() {
        try {
            // ���� WebAudio ������
            const wac = (typeof wx !== 'undefined' && wx.createWebAudioContext)
                ? wx.createWebAudioContext()
                : (typeof AudioContext !== 'undefined' ? new AudioContext() : null);
            if (!wac) {
                console.log('[tsubasa] WebAudio �����ã���Ƶ����');
                return;
            }
            this._webAudio = wac;
            // ���� PAPU��nes �������
            const nes = {
                opts: {
                    sampleRate: 44100,
                    onAudioSample: (l, r) => {
                        this._audioSamples.push((l + r) / 2);
                    },
                },
            };
            this._papu = new index_4.default(nes);
            // ע�뵽 AudioService
            this.audio.attachPapu(this._papu);
            // ���� ScriptProcessorNode ����ʵʱ����
            // ������ 4096 ������������
            const sampleRate = 44100;
            const processor = wac.createScriptProcessor(4096, 0, 1);
            const buffer = new Float32Array(4096);
            processor.onaudioprocess = (e) => {
                const out = e.outputBuffer.getChannelData(0);
                const n = Math.min(this._audioSamples.length - this._sampleOffset, out.length);
                for (let i = 0; i < n; i++) {
                    out[i] = this._audioSamples[this._sampleOffset + i];
                }
                // ���ʣ��Ϊ����
                for (let i = n; i < out.length; i++)
                    out[i] = 0;
                this._sampleOffset += n;
                // ���������ѵĲ���
                if (this._sampleOffset > 44100) {
                    this._audioSamples = this._audioSamples.slice(this._sampleOffset);
                    this._sampleOffset = 0;
                }
            };
            processor.connect(wac.destination);
            console.log('[tsubasa] ��Ƶ��ʼ�����: PAPU + WebAudio');
        }
        catch (e) {
            console.log('[tsubasa] ��Ƶ��ʼ��ʧ��:', e.message);
        }
    }
    /**
     * ������RESET��$C64E���� RAM ��ʼ�� �� OAM ���� �� �������ȣ�$CEFE/$C400 �� $A200 ���� 0��
     *
     * @param target ��ѡ FrameTarget �� �ṩʱ����:
     *   1. װ�� boot �� CHR bank ��̬�� PPU ptTile (WBS_FRAME13 F6)
     *   2. װ�� boot palette + Tecmo logo OAM �� PPU �Ĵ��� (F4+F5)
     *   ����ֻ����Ϸ�߼���ʼ�� (�ⲿ�� lazy runtime ģʽ)
     */
    boot(target) {
        this._frame = 0;
        this.hardware.reset();
        // �������ȣ��Ƚ��� OpeningScene��Ƭͷ���� NES f10-f3599��Tecmo logo �� NTV
        // �� 10 ����Ļ���� �� story_cup���������ڲ� changeScene(Scene0)����
        // Scene0 ����ʵ���� f3600 ��BgFadeOut ���� story_cup �� Drift30 �� ����˵�����
        // ԭ boot logo װ�أ�PRG $8053-$8090 �� H5 �ȼۣ��� OpeningSceneController ����
        // ��tecmo_logo��NES f10-280���� GT ���ݱ����������ٵ��� _mountBootLogo��
        this.router.changeScene(100 /* SceneId.Opening */);
        // WBS_FRAME13 F4+F5+F6: ���� target, ������ boot ״̬ prime �� PPU
        if (target) {
            // F6: CHR bank ��̬װ�� (frame 0)
            const runtimeAny = target;
            if (typeof runtimeAny.bootInitialChrBanks === 'function') {
                runtimeAny.bootInitialChrBanks();
            }
            // F4+F5: ��ɫ�� + shadow OAM �Ƶ� PPU
            this.interrupts.primeBootState(target.ppu);
        }
    }
    /**
     * ÿ֡��NMI ��Ϸ�߼� �� ��Ⱦ�ύ �� PPU ɨ������Ⱦ
     * @param target �ṹ������ƽ̨��������״̬ + PPU ��ȾĿ�ꣻcore NES �� HeadlessRuntime ���ɣ�
     */
    frame(target) {
        const store = this.store;
        // 0. ע�� VRAM д͸Ŀ�꣨$2006/$2007 ֱд���壻Ŀ���ÿ֡�仯��
        store.setVramTarget(target.ppu);
        // 1. ע�������״̬��core Controller.state: 0x41=���� 0x40=�ɿ���
        this.input.setControllerState(1, target.controllers[1].state);
        this.input.setControllerState(2, target.controllers[2].state);
        // 2. NMI ���壺���ֱ� �� �����߼��ƽ� �� ram_001B bit7
        this.interrupts.nmi(this._frame);
        // 2.5 bank30 $CA97 ��ѭ��������� tick
        this.hardware.tick();
        // 3. ��Ƶ�����ƽ���bank12 ���壩
        this.audio.update();
        // 4. ��Ⱦ�ύ��$C775 + bank02 $8000 ���壩
        try {
            this.interrupts.renderCommit(target.ppu, this._frame);
        }
        catch (e) {
            console.error('renderCommit error at frame ' + this._frame + ': ' + e.message);
            throw e;
        }
        // 4.5 OpeningScene / TitleMenuScene ��֡ GT ������per-scanline CHR �ƻ� + NT PPU ��Ⱦǰͬ��
        //   ͨ�� duck typing: �κ� controller �� getChrPlan()/applyNtToPpu() ���߸�·��
        //   (Opening/TitleMenu ��ʵ��, ���� Scene14..Meeting �ɸ���)
        const ppu = target.ppu;
        const current = this.router.current;
        if (current && typeof current.getChrPlan === 'function') {
            const plan = current.getChrPlan();
            if (Array.isArray(plan) && plan.length > 0 && typeof target.setPerScanlineChrPlan === 'function') {
                target.setPerScanlineChrPlan(plan);
            }
        }
        if (current && typeof current.applyNtToPpu === 'function') {
            current.applyNtToPpu(target.ppu);
        }
        // 5. PPU ɨ������Ⱦ��H5 ���� CPU��ֱ���ƽ�һ֡��
        // �� core NES.frame() ����һ�£�startFrame + advanceDots ֱ�� VBlank��
        // �� startVBlank -> renderFramePartially -> endFrame ��ɵ�֡�����
        try {
            ppu.startFrame();
            ppu.advanceDots(262 * 341);
            // �����ֶ����� renderFramePartially/endFrame�������� startVBlank ��Ƕ��
            // ��Ⱦ·������˫�غϳ�/�ü����졣
        }
        catch (e) {
            console.error('PPU render error at frame ' + this._frame + ': ' + e.message);
            throw e;
        }
        this._frame++;
        // ������־��ÿ 60 ֡����ؼ� RAM ״̬
        if (this._frame % 60 === 0) {
            const buf = ppu.buffer;
            let nz = 0;
            for (let i = 0; i < buf.length; i++)
                if (buf[i] !== 0)
                    nz++;
            console.log(`[Tsubasa2] frame=${this._frame} scene=${store.readByte(0x00ed)}` +
                ` ram_001B=${store.readByte(0x001b).toString(16)}` +
                ` ram_0628=${store.readByte(0x0628).toString(16)}` +
                ` bufNonZero=${nz}`);
        }
    }
}
exports.Tsubasa2 = Tsubasa2;
exports.default = Tsubasa2;
