"use strict";
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
 *   2. InterruptService.nmi(frame) �� NMI ���壺���ֱ� �� �����߼��ƽ�
 *   3. AudioService.update() �� bank12 ��Ƶ�����ƽ�
 *   4. InterruptService.renderCommit(ppu) �� ��Ⱦ�ύ��CTRL/MASK/����/$05E8 ����/OAM/��ɫ��
 *   5. PPU ɨ������Ⱦ��startFrame �� advanceDots �� renderFramePartially �� endFrame��
 *
 * �� CPU���� MMC3 bank �л����� 6502 ָ�ȫ��Ϊ�߼�����ֱ�ӷ��롣
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
const index_2 = require("./prg/index");
Object.defineProperty(exports, "DataStore", { enumerable: true, get: function () { return index_2.DataStore; } });
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
        this.store = new index_2.DataStore();
        this.input = new index_2.InputService(this.store);
        this.system = new index_2.GameSystemService(this.store);
        // ������������������ ID ��֯�������� SceneTable ���� 24 ����Ϊ��
        const scene0 = new index_2.Scene0Controller(this.store, this.input);
        // ����ű���V0.4 ���룩
        const scriptLoader = new index_2.ScriptLoader(this.store);
        const scriptEngine = new index_2.ScriptEngine(this.store, scriptLoader);
        const charMap = new index_2.CharMap();
        void scriptEngine;
        void charMap;
        // ������V0.5 ���룩
        const matchEngine = new index_2.MatchEngineService(this.store);
        const matchTurn = new index_2.MatchTurnService(this.store);
        const matchAux = new index_2.MatchAuxService(this.store);
        const matchHud = new index_2.MatchHudService(this.store);
        const matchConfig = new index_2.MatchConfigService(this.store);
        void matchTurn;
        void matchAux;
        void matchHud;
        void matchConfig;
        // ���ݲ�ѯ��V0.2 ���룩
        const playerQuery = new index_2.PlayerQueryService(this.store);
        const teamRoster = new index_2.TeamRosterService(this.store);
        void playerQuery;
        void teamRoster;
        // ���� / ���� / ��Ƶ
        this.skill = new index_2.SkillService(this.store);
        const sprite = new index_2.SpriteService(this.store);
        const spriteAnim = new index_2.SpriteAnimationService(this.store);
        void sprite;
        void spriteAnim;
        this.audio = new index_2.AudioService(this.store);
        // ��Ƶע�루���� BGM/SE ���ţ�
        scene0.attachAudio(this.audio);
        // ·�ɣ�����������ע�ᣨδ���볡���Զ���Ĭ�� stub��
        this.router = new index_2.BootRouter(this.store, scene0);
        // Ӳ����ʼ�� + �жϹ���
        this.hardware = new index_2.HardwareInitService(this.store);
        this.interrupts = new index_2.InterruptService(this.store, this.input);
        this.interrupts.attachRouter(this.router);
        void matchEngine;
    }
    /**
     * ������RESET��$C64E���� RAM ��ʼ�� �� OAM ���� �� �������ȣ�$CEFE/$C400 �� $A200 ���� 0��
     */
    boot() {
        this._frame = 0;
        this.hardware.reset();
        // �������ȣ������� 0��ԭ�� Reset ĩβ LDA #$00; JMP $CEFE��
        this.router.changeScene(0 /* SceneId.Scene0 */);
    }
    /**
     * ÿ֡��NMI ��Ϸ�߼� �� ��Ⱦ�ύ �� PPU ɨ������Ⱦ
     * @param target �ṹ������ƽ̨��������״̬ + PPU ��ȾĿ�ꣻcore NES �� HeadlessRuntime ���ɣ�
     */
    frame(target) {
        const store = this.store;
        // 1. ע�������״̬��core Controller.state: 0x41=���� 0x40=�ɿ���
        this.input.setControllerState(1, target.controllers[1].state);
        this.input.setControllerState(2, target.controllers[2].state);
        // 2. NMI ���壺���ֱ� �� �����߼��ƽ� �� ram_001B bit7
        this.interrupts.nmi(this._frame);
        // 3. ��Ƶ�����ƽ���bank12 ���壩
        this.audio.update();
        // 4. ��Ⱦ�ύ��$C775 + bank02 $8000 ���壩
        try {
            this.interrupts.renderCommit(target.ppu);
        }
        catch (e) {
            console.error('renderCommit error at frame ' + this._frame + ': ' + e.message);
            throw e;
        }
        // 5. PPU ɨ������Ⱦ��H5 ���� CPU��ֱ���ƽ�һ֡��
        const ppu = target.ppu;
        try {
            ppu.startFrame();
            ppu.advanceDots(262 * 341);
            ppu.renderFramePartially(0, 240);
            ppu.endFrame();
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
