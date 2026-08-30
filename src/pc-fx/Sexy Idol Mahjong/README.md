# Sexy Idol Mahjong - Yakyuuken no Uta (Japan)

PC Engine CD-ROM² 经典作品。源 ROM:
`D:\studio\games\roms\NEC-TurboGrafx-CD\Sexy Idol Mahjong - Yakyuuken no Uta (Japan).chd`

## 项目里有什么

- `_tools/extracted/` — 从 CHD 解出来的
  - `Sexy Idol Mahjong - Yakyuuken no Uta (Japan).bin` (360 MB)
  - `Sexy Idol Mahjong - Yakyuuken no Uta (Japan).cue` (26 轨 TOC)
  - `audio/track_*.wav` — 24 个原声音轨 (CDDA 44.1 kHz 16-bit stereo)
  - `track_data/track_02/`、`track_data/track_26/` — PC Engine 自身的两条
    MODE1/2352 数据轨，含 IP.BIN 头 + 整个 user_data.bin
- `_tools/pcejs-player/` — 浏览器跑游戏的最小页 (`index.html`)
- `_tools/mame-scripts/dump_vram.lua` — MAME 0.255+ lua plugin,
  每 30 帧抓调色板/VDC 寄存器变化, 输出到 `mame_vram_dump/`。
- `_tools/split_tracks.py` — `_tools/extracted/` 的再生脚本
- `_tools/chdman.exe` — MAME 的 CHD 处理工具
- `miniprogram/` — 微信小程序入口 (无云开发)

## 微信小程序 (`miniprogram/`)

要在开发者工具里跑：
1. 用 `微信开发者工具` 打开本仓库根目录 (有 `project.config.json` 自动识别)
2. 默认指向 `pages/index/index`
3. 主页列出三个分类: 提取产物 / 模拟器 / CG / 角色图
4. 点 "PCE.js 浏览器运行" 会跳到 `pages/pce/index`
5. `pages/pce/index` 默认显示 "PCE.js Player 未配置"。
   想实际玩：先按 `_tools/pcejs-player/README.md` 部署到 COS，
   然后填 `miniprogram/pce-config.js` 里的 URL，开发者工具点 **重新编译**。

> 注意: 微信小程序单包 16 MB 上限, 所以 PC Engine 模拟器必须在 COS / 静态网站托管。
> 我们没有配置任何云开发接入，直接读项目里的二进制即可。

## 在 PC 上手工提取 / 再生成

```cmd
:: 1. 把 CHD 解成 .bin/.cue (如果 _tools/extracted/ 下没有)
_tools\chdman.exe extractcd -i "D:\studio\games\roms\NEC-TurboGrafx-CD\Sexy Idol Mahjong*.chd" -o _tools\extracted\Sexy\ Idol\ Mahjong.cue

:: 2. 拆音轨 + 抽 IP.BIN
python _tools\split_tracks.py _tools\extracted\Sexy\ Idol\ Mahjong.cue _tools\extracted
```
输出一组 `audio/track_NN_AUDIO_NNN.Ns.wav` 和 `track_data/track_NN/` 目录。

## MAME 截图

提取游戏 CGs/角色图不能用周期性截图 — 必须 hook MAME lua：

```cmd
:: 安装 MAME 0.255+ 后 (chdman.exe 同一个项目里就有 mame.sym)
mame pce_cd ^
   -cd "_tools\extracted\Sexy Idol Mahjong - Yakyuuken no Uta (Japan).cue" ^
   -window ^
   -norecord -nosound ^
   -seconds_to_run 600 ^
   -autoboot_delay 6 ^
   -autoboot_script "_tools\mame-scripts\dump_vram.lua"
```

每 30 帧 (≈ 0.5s) 输出:
- `_tools/extracted/mame_vram_dump/frames.jsonl` —— 帧状态行
- `_tools/extracted/mame_vram_dump/vram_changes.jsonl` —— 调色板哈希变化
- 屏幕状态显示在 MAME console 末尾 (status bar)

注意: `dump_vram.lua` 只抓 VDC 寄存器 / 调色板哈希比对, 不会写 PNG;
要拿真截图请用 MAME 自带的 `<F12>` 截图 hotkey 输出到 `snap/`。

## 状态 / TODO

- ✅ CHD 提取 (.bin / .cue)
- ✅ 24 轨音频 → WAV
- ✅ IP.BIN 头分析 (Hudson Soft 256 字节 metadata)
- ⏳ CG / 角色图自动抽取 (MAME lua hook 已就绪, 需要人工跑)
- ⏳ PCE.js COS 部署 (本项目无法直接执行, 用户需自己上传 + 填 URL)

## 资源

- ROM md5 参考: `D:\studio\games\roms\NEC-TurboGrafx-CD\Sexy Idol Mahjong*.chd`
- MAME 0.289 docs: https://docs.mamedev.org/
- PC Engine CD-ROM² spec:
  https://github.com/mamedev/mame/blob/master/src/mame/pce_cd.cpp
- 微信小程序 docs: https://developers.weixin.qq.com/miniprogram/dev/framework/
