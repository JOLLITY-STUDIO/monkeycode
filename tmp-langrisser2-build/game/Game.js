"use strict";
/**
 * 游戏主入口 — Game 类
 *
 * 职责:
 * 1. 加载 ROM → 初始化硬件 → Boot 流程
 * 2. 管理场景状态机
 * 3. 60fps 主循环 (requestAnimationFrame)
 * 4. VDP 渲染 → Canvas putImageData
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const RomLoader_1 = require("./core/RomLoader");
const Ram_1 = require("./core/Ram");
const VdpChip_1 = require("./vdp/VdpChip");
const Renderer_1 = require("./vdp/Renderer");
const Memory_1 = require("./cpu/Memory");
const Cpu_1 = require("./cpu/Cpu");
const IScene_1 = require("./scene/IScene");
class Game {
    /** ROM 加载器 */
    rom;
    /** 68K 工作 RAM */
    ram;
    /** VDP 芯片 */
    vdp;
    /** 内存总线 */
    mem;
    /** 68K CPU */
    cpu;
    /** VDP 渲染器 */
    renderer;
    /** 场景管理器 */
    scenes;
    /** 平台适配器 */
    platform;
    /** 帧循环 ID */
    animFrameId = 0;
    /** 运行标志 */
    running = false;
    /** 每帧 CPU 步数 */
    stepsPerFrame = 10000;
    constructor(platform) {
        this.platform = platform;
        // 初始化核心
        this.rom = new RomLoader_1.RomLoader();
        this.ram = new Ram_1.Ram();
        this.vdp = new VdpChip_1.VdpChip();
        this.mem = new Memory_1.Memory(this.rom, this.ram, this.vdp);
        this.cpu = new Cpu_1.Cpu(this.mem);
        this.renderer = new Renderer_1.Renderer(this.vdp);
        this.scenes = new IScene_1.SceneManager();
    }
    /**
     * 启动游戏
     *
     * 流程:
     *   1. 加载 ROM 二进制
     *   2. CPU Reset → 从 ROM 向量表取 PC
     *   3. CPU 执行启动代码 (TMSS, VDP 初始化, RAM 清零, init 函数)
     *   4. 开始 60fps 主循环
     */
    async start() {
        // 1. 加载 ROM
        const romBuffer = await this.platform.loadRomBinary();
        this.rom.load(romBuffer);
        console.log(`[Game] ROM 加载成功: ${this.rom.size} 字节`);
        console.log(`[Game] 游戏名称: ${this.rom.readGameName()}`);
        const vector = this.rom.readInterruptVectors();
        console.log(`[Game] SSP: $${vector.ssp.toString(16)}`);
        console.log(`[Game] Reset PC: $${vector.reset.toString(16)}`);
        // 2. CPU Reset — PC 自动指向 ROM 启动代码
        this.cpu.reset();
        // 3. 执行启动序列 (CPU 自己会完成 TMSS → VDP → RAM → init)
        const maxBootSteps = 500000;
        let bootSteps = 0;
        while (!this.cpu.halted && bootSteps < maxBootSteps) {
            this.cpu.step();
            bootSteps++;
        }
        if (this.cpu.halted) {
            console.error(`[Game] CPU 在启动中停机 (${bootSteps} 步)`);
            return;
        }
        console.log(`[Game] 启动完成, 执行了 ${bootSteps} 条指令`);
        console.log(`[Game] VDP 寄存器:`, Array.from(this.vdp.reg).map((v, i) => `R${i}=${v.toString(16).padStart(2, '0')}`).join(' '));
        // 4. 开始主循环
        this.running = true;
        this.gameLoop();
    }
    /**
     * 60fps 主循环
     *
     * 每帧:
     *   1. CPU: 执行 N 条指令
     *   2. VDP: stepFrame()
     *   3. Renderer: renderFrame() → ImageData
     *   4. Canvas: putImageData()
     */
    gameLoop = () => {
        if (!this.running || this.cpu.halted)
            return;
        // 1. CPU 执行
        for (let i = 0; i < this.stepsPerFrame && !this.cpu.halted; i++) {
            this.cpu.step();
        }
        // 2. VDP 帧步进
        this.vdp.stepFrame();
        // 3. 渲染到 Canvas
        this.renderFrame();
        // 4. 请求下一帧
        this.animFrameId = this.platform.requestFrame(this.gameLoop);
    };
    /**
     * VDP → Canvas 渲染
     *
     * 渲染管线: VDP state → Renderer.renderFrame() → ImageData → Canvas
     */
    renderFrame() {
        const ctx = this.platform.ctx;
        // 清空画布
        ctx.clearRect(0, 0, this.platform.displayWidth, this.platform.displayHeight);
        // 渲染 VDP 帧 (使用 ctx 创建 ImageData, 兼容微信小程序)
        const imageData = this.renderer.renderFrame(ctx);
        ctx.putImageData(imageData, 0, 0);
    }
    /**
     * Canvas flip (如果需要额外的 UI 叠加)
     *
     * 当前阶段: 只做 VDP 输出
     */
    flip() {
        // 在此可以叠加 UI 控件 (cursor, menu, etc.)
        // 或处理缩放: 320×224 → 960×672
    }
    /** 启动主循环 (ROM 已在外部加载并完成 Boot) */
    startLoop() {
        if (this.running)
            return;
        this.running = true;
        this.gameLoop();
    }
    /**
     * 停止游戏
     */
    stop() {
        this.running = false;
        if (this.animFrameId) {
            this.platform.cancelFrame(this.animFrameId);
            this.animFrameId = 0;
        }
    }
    /** 是否正在运行 */
    get isRunning() {
        return this.running;
    }
    /**
     * 切换到场景
     */
    switchScene(scene) {
        this.scenes.switchTo(scene);
    }
    /**
     * 获取平台适配器
     */
    getPlatform() {
        return this.platform;
    }
}
exports.Game = Game;
