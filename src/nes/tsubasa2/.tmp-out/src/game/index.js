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
import { HEADER, CONFIG, Mirroring } from './header';
import { NES_CHR_ROM, CHR_BANKS, CHR_BANK_SIZE, CHR_BANK_COUNT } from './chr/index';
import { DataStore, BootRouter, HardwareInitService, InterruptService, InputService, Bank00SchedulerService, Bank00MainLoopService, PpuTransferService, NtStreamLoaderService, SceneStateMachine, ScriptEngine, ScriptLoader, CharMap, setScriptRuntime, PlayerQueryService, TeamRosterService, MatchEngineService, MatchTurnService, MatchAuxService, MatchHudService, MatchConfigService, SkillService, SpriteService, SpriteAnimationService, AudioService, } from './prg/index';
// PAPU������ NES APU ģ������
// @ts-ignore �� tsnes ��ֲ���룬��ɢ����
import PAPU from '../core/papu/index';
export { HEADER, CONFIG, Mirroring };
export { NES_CHR_ROM, CHR_BANKS, CHR_BANK_SIZE, CHR_BANK_COUNT };
export { DataStore };
/**
 * Tsubasa2 �� ��ϸ������弴�ã�
 *
 * �÷���
 *   const game = new Tsubasa2();
 *   game.boot();             // Reset �� �������ȣ�������
 *   game.frame(nes);         // ÿ֡������� 60fps ѭ�����ã�
 */
export class Tsubasa2 {
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
        this.store = new DataStore();
        this.input = new InputService(this.store);
        // bank00 ���������ϸ�ʵ������
        // PRG $9EEF-$9FA8 scheduler tail / $9FA8 push trampoline / $9085 tick entry
        this.bank00Scheduler = new Bank00SchedulerService(this.store);
        // PRG $8464 cfg loader���� bank װ�أ� �� ע�� PpuTransferService ��Ҫ PPU target��
        // ��ʱ target ��δ attach��boot() ʱ���� attach������ѡ null
        this.ppuTransfer = new PpuTransferService(this.store, null);
        // PRG $82ED NT stream loader
        this.ntStreamLoader = new NtStreamLoaderService(this.store, this.ppuTransfer);
        // PRG $8AF7 scene handler loader + $8E15 NT copy/tile decoder
        this.sceneStateMachine = new SceneStateMachine(this.store, this.ppuTransfer);
        // ע: TileBuilderService �� Scene0/Scene18 �ڲ��Խ���Tsubasa2 ����¶��
        // ������������BootRouter �Զ�ͳһ register Scene0-23��BootRouter �ڲ����� MainRouterService��
        // ����ű���V0.4 ���룩
        const scriptLoader = new ScriptLoader(this.store);
        const scriptEngine = new ScriptEngine(this.store, scriptLoader);
        const charMap = new CharMap();
        void scriptEngine;
        // CharMap ע��ű�����ʱ��0x94/0x95 ��������ӳ�乩 ScriptOpcode.TextChar ʹ��
        setScriptRuntime({
            charMap,
            readRam: (addr) => this.store.readByte(addr),
            writeRam: (addr, value) => this.store.writeByte(addr, value),
        });
        // ������V0.5 ���룩
        const matchEngine = new MatchEngineService(this.store);
        const matchTurn = new MatchTurnService(this.store);
        const matchAux = new MatchAuxService(this.store);
        const matchHud = new MatchHudService(this.store);
        const matchConfig = new MatchConfigService(this.store);
        void matchTurn;
        void matchAux;
        void matchHud;
        void matchConfig;
        // ���ݲ�ѯ��V0.2 ���룩
        const playerQuery = new PlayerQueryService(this.store);
        const teamRoster = new TeamRosterService(this.store);
        void playerQuery;
        void teamRoster;
        // ���� / ���� / ��Ƶ
        this.skill = new SkillService(this.store);
        const sprite = new SpriteService(this.store);
        this.sprite = sprite;
        const spriteAnim = new SpriteAnimationService(this.store);
        void sprite;
        void spriteAnim;
        this.audio = new AudioService(this.store);
        // ��Ƶ��������� PAPU + WebAudio��С���� wx.createWebAudioContext��
        this._initAudio();
        // ���� ·�����: bank00 vs bank02 ְ�������з� ����
        //   1) Bank00MainLoopService = bank00 ���� (PRG $8000 ���: 5-mode dispatch + scheduler tail + boot + audio req)
        //   2) BootRouter            = bank02 ���� (PRG $A000 ���: scene0+ ·�� + changeScene + ��ǰ scene ����)
        //   3) PpuTransferService   = PRG $8464 cfg loader (bank00 + bank02 ����)
        this.bank00MainLoop = new Bank00MainLoopService(this.store, this.bank00Scheduler, this.ppuTransfer);
        // ·��: ����������ע�� Scene0-23 (������ѭ�� register)
        this.router = new BootRouter(this.store, this.input);
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
        // bank00 scene state machine + NT stream loader ע�� Scene0
        // (PRG $8AF7 scene handler loader + $82ED NT stream loader)
        this.router.getController(0 /* SceneId.Scene0 */).attachNtStreamLoader(this.ntStreamLoader);
        this.router.getController(0 /* SceneId.Scene0 */).attachSceneStateMachine(this.sceneStateMachine);
        // Ӳ����ʼ�� + �жϹ���
        this.hardware = new HardwareInitService(this.store);
        this.interrupts = new InterruptService(this.store, this.input);
        this.interrupts.attachRouter(this.router);
        this.interrupts.attachScheduler(this.bank00Scheduler);
        this.interrupts.attachBank00MainLoop(this.bank00MainLoop);
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
            this._papu = new PAPU(nes);
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
        // 4.5 OpeningScene ��֡ GT ������per-scanline CHR �ƻ� + ֱ��д NT �� PPU
        if ((store.scene.currentSceneId & 0xff) === 100 /* SceneId.Opening */) {
            const opening = this.router.getController(100 /* SceneId.Opening */);
            const plan = opening.getChrPlan();
            if (plan.length > 0 && typeof target.setPerScanlineChrPlan === 'function') {
                target.setPerScanlineChrPlan(plan);
            }
            opening.applyNtToPpu(target.ppu);
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
export default Tsubasa2;
