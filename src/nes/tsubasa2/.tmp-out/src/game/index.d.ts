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
import { DataStore, BootRouter, HardwareInitService, InterruptService, InputService, Bank00SchedulerService, Bank00MainLoopService, PpuTransferService, NtStreamLoaderService, SceneStateMachine, SkillService, SpriteService, AudioService } from './prg/index';
import type { FrameTarget } from './runtime/GameRuntime';
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
export declare class Tsubasa2 {
    readonly store: DataStore;
    readonly router: BootRouter;
    readonly interrupts: InterruptService;
    readonly input: InputService;
    readonly hardware: HardwareInitService;
    readonly skill: SkillService;
    readonly audio: AudioService;
    readonly sprite: SpriteService;
    readonly bank00Scheduler: Bank00SchedulerService;
    readonly bank00MainLoop: Bank00MainLoopService;
    readonly ppuTransfer: PpuTransferService;
    readonly ntStreamLoader: NtStreamLoaderService;
    readonly sceneStateMachine: SceneStateMachine;
    /** ֡������NMI ֡�ţ� */
    protected _frame: number;
    /** PAPU ʵ����NES APU ģ������ */
    protected _papu: any;
    /** WebAudio �����ģ�С���� wx.createWebAudioContext�� */
    protected _webAudio: any;
    /** ��Ƶ�������� */
    protected _audioSamples: number[];
    /** ����д��λ�� */
    protected _sampleOffset: number;
    constructor();
    /**
     * ��ʼ����Ƶ������ PAPU + WebAudio ���
     *
     * С������ wx.createWebAudioContext() ���� WebAudio API��
     * PAPU �� onAudioSample �ص��Ѳ������뻺�壬
     * ÿ֡�� ScriptProcessorNode �� AudioWorklet ���š�
     */
    protected _initAudio(): void;
    /**
     * ������RESET��$C64E���� RAM ��ʼ�� �� OAM ���� �� �������ȣ�$CEFE/$C400 �� $A200 ���� 0��
     *
     * @param target ��ѡ FrameTarget �� �ṩʱ����:
     *   1. װ�� boot �� CHR bank ��̬�� PPU ptTile (WBS_FRAME13 F6)
     *   2. װ�� boot palette + Tecmo logo OAM �� PPU �Ĵ��� (F4+F5)
     *   ����ֻ����Ϸ�߼���ʼ�� (�ⲿ�� lazy runtime ģʽ)
     */
    boot(target?: FrameTarget): void;
    /**
     * ÿ֡��NMI ��Ϸ�߼� �� ��Ⱦ�ύ �� PPU ɨ������Ⱦ
     * @param target �ṹ������ƽ̨��������״̬ + PPU ��ȾĿ�ꣻcore NES �� HeadlessRuntime ���ɣ�
     */
    frame(target: FrameTarget): void;
}
export default Tsubasa2;
