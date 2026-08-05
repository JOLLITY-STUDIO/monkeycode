/**
 * H5 游戏页面 — 双引擎对比：CPU 模拟器 vs Bank 翻译引擎
 *
 * canvas0: CPU 模拟器 (参考)
 * canvas1: Bank 翻译引擎 (TypeScript 直译)
 *
 * 本文件只做 Page 生命周期与事件分发，所有领域逻辑已分散至:
 *   game-engine/orchestrator.ts     — 双引擎协调、帧循环、音频、输入
 *   src/debug/debug-panel.ts        — 调试面板 (NT/PT/SPR/PAL/ASM)
 */

import { GameOrchestrator } from '../../game-engine/orchestrator';
import { DebugPanel } from '../../src/debug/debug-panel';
import type { DebugTab } from '../../src/debug/debug-panel';

Page({
  data: {
    status: 'initializing...',
    fps: '--',
    debugTab: '' as string,
    debugTabs: {
      '': '游戏',
      nametable: 'NT',
      patterntable: 'PT',
      sprite: '精灵',
      disasm: '汇编',
    } as Record<string, string>,
    debugLines: '',
    ntDataText: '',
    ptDataText: '',
    sptDataText: '',
    paletteStrips: [] as { type: string; tableAddr?: string; groups: { addr: string; colorIdx: string; color: string }[][] }[],
    debugCanvasStyle: '',
    paused: false,
    turboLevel: 0,
    showFpsBtn: false,
    // 录制
    sprRecording: false,
    sprRecordCount: 0,
    sprRecordDur: '',
  },

  // ── 协调器 ──
  _orch: null as GameOrchestrator | null,
  _debugPanel: null as DebugPanel | null,

  // ================================================================
  // 生命周期
  // ================================================================

  onLoad() {
    console.log('[h5game] onLoad');

    const pageUpdater = {
      setData: (d: any) => this.setData(d),
      getData: () => this.data,
    };

    this._orch = new GameOrchestrator(pageUpdater);
    this._debugPanel = new DebugPanel(pageUpdater);
    this._orch.debugPanel = this._debugPanel;
  },

  onReady() {
    console.log('[h5game] onReady');
    this._initCanvases();
  },

  onUnload() {
    this._orch?.stop();
    this._orch = null;
    this._debugPanel = null;
  },

  // ================================================================
  // Canvas 初始化 (微信 selector API)
  // ================================================================

  _initCanvases() {
    const query = wx.createSelectorQuery();
    query.select('#h5canvas')
      .fields({ node: true, size: true })
      .select('#h5canvas2')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        const c0 = res?.[0];
        const c1 = res?.[1];
        if (!c0?.node || !c1?.node) {
          setTimeout(() => this._initCanvases(), 300);
          return;
        }
        this._orch!.initCanvas(c0.node, c1.node);
        console.log('[h5game] Dual canvas ready');
        this._orch!.start();
      });
  },

  // ================================================================
  // Debug 标签切换
  // ================================================================

  onDebugTab(e: any) {
    const tab = (e.currentTarget.dataset.tab || '') as DebugTab;
    const prevTab = this.data.debugTab as DebugTab;
    this._debugPanel?.onTabSwitch(tab, prevTab);
  },

  // ── 复制 ──

  onCopyNTData()  { this._debugPanel?.copyData('ntDataText', 'NT 数据'); },
  onCopyPTData()  { this._debugPanel?.copyData('ptDataText', 'PT 数据'); },
  onCopySPRData() { this._debugPanel?.copyData('sptDataText', 'SPR 数据'); },

  // ── 保存到文件 ──

  onSaveNTData()  { this._debugPanel?.saveDataToFile('ntDataText', 'nt-debug.txt', 'NT 数据'); },
  onSavePTData()  { this._debugPanel?.saveDataToFile('ptDataText', 'pt-debug.txt', 'PT 数据'); },
  onSaveSPRData() { this._debugPanel?.saveDataToFile('sptDataText', 'spr-debug.txt', 'SPR 数据'); },

  // ── SPR 导出 ──

  async onExportSprite() {
    await this._debugPanel?.exportSprite((d: any) => this.setData(d));
  },

  // ── GIF 录制 ──

  onStartRecord() {
    if (!this._debugPanel) return;
    const durStr = this.data.sprRecordDur as string;
    const dur = parseFloat(durStr) || 0;
    this._debugPanel.startRecording(dur);
    this.setData({ sprRecording: true, sprRecordCount: 0 });
  },

  async onStopRecord() {
    if (!this._debugPanel) return;
    await this._debugPanel.stopRecording((d: any) => this.setData(d));
    this.setData({ sprRecording: false, sprRecordCount: 0 });
  },

  onRecordDurInput(e: any) {
    this.setData({ sprRecordDur: e.detail.value });
  },

  // 由帧循环调用，更新录制计数（限频）
  _lastRecordCountUpdate: 0,
  _refreshRecordUI() {
    if (!this._debugPanel?.recording) return;
    const count = this._debugPanel.recordFrameCount;
    // 每 5 帧更新一次 UI
    if (count - this._lastRecordCountUpdate >= 5) {
      this._lastRecordCountUpdate = count;
      this.setData({ sprRecordCount: count });
    }
  },

  // ================================================================
  // 游戏控制
  // ================================================================

  onPause() {
    this.setData({ paused: !this.data.paused });
  },

  onTurboToggle() {
    const next = (this.data.turboLevel + 1) % 3;
    this.setData({ turboLevel: next });
  },

  onFpsTap() {
    this.setData({ showFpsBtn: !this.data.showFpsBtn });
  },

  onReset() {
    const oldOrch = this._orch!;
    oldOrch.stop();
    const pageUpdater = {
      setData: (d: any) => this.setData(d),
      getData: () => this.data,
    };
    oldOrch.debugPanel = undefined;
    this._debugPanel = new DebugPanel(pageUpdater);
    this._orch = new GameOrchestrator(pageUpdater);
    this._orch.debugPanel = this._debugPanel;
    this.setData({ status: 'restarting...', paused: false, turboLevel: 0 });
    setTimeout(() => {
      this.onReady();
    }, 100);
  },

  // ================================================================
  // 输入
  // ================================================================

  onBtnDown(e: any) {
    const btn = e.currentTarget.dataset.btn as string;
    const input = this._orch?.input;
    if (!input) return;
    if (btn === 'up' || btn === 'down' || btn === 'left' || btn === 'right') {
      input.setDpad(btn, true);
    } else {
      input.setBtn(btn as any, true);
    }
  },

  onBtnUp(e: any) {
    const btn = e.currentTarget.dataset.btn as string;
    const input = this._orch?.input;
    if (!input) return;
    if (btn === 'up' || btn === 'down' || btn === 'left' || btn === 'right') {
      input.setDpad(btn, false);
    } else {
      input.setBtn(btn as any, false);
    }
  },
});
