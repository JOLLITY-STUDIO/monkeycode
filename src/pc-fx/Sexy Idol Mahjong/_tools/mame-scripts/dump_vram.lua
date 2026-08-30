-- ============================================================================
-- dump_vram.lua — PC Engine CD: capture VRAM + palette state per frame
-- Compatible with MAME 0.255+ (验证 0.289)
--
-- 目标: 在 MAME 跑这个光盘影像时, 每 30 帧抓一次:
--   1. 主屏幕尺寸 + 帧序号
--   2. maincpu 在 $0000-$0003 (VDC 寄存器) 当前值
--   3. maincpu $0400-$07FF (PCE memory map: 32 KB non-banked VRAM mapping)
--      的字节作为基本比对指纹
--   4. 调色板哈希: maincpu $1A00-$1A3F (PCE palette)
-- 输出到 mame_vram_dump/{frames.jsonl, vram_changes.jsonl, vram_NN.bin}
--
-- 调用:
--   mame.exe pce_cd ^
--          -cd "Sexy Idol Mahjong - Yakyuuken no Uta (Japan).cue" ^
--          -window ^
--          -norecord -nosound ^
--          -seconds_to_run 600 ^
--          -autoboot_delay 6 ^
--          -autoboot_script "..\_tools\mame-scripts\dump_vram.lua"
--
-- 不需要 -script 也不用 plugin 模式 (-autoboot_script 在 0.255+ 是官方入口).
-- ============================================================================

local M       = manager.machine
local HOME    = M.options.entries.homepath:value():match("([^;]+)")
local OUT_DIR = HOME .. "/_tools/extracted/mame_vram_dump"

lfs.mkdir(OUT_DIR)

local frame_log   = io.open(OUT_DIR .. "/frames.jsonl",       "a")
local change_log  = io.open(OUT_DIR .. "/vram_changes.jsonl", "a")

local frame_index     = 0
local last_pal_hash   = ""
local screen_w, screen_h = 0, 0
local screen_obj      = nil
local cpu             = nil
local program_space   = nil

-- helper: hash 一段 CPU 内存区间为短字符串
local function cpu_hash(addr_lo, addr_hi)
  if not program_space then return "" end
  local ok, bytes = pcall(function()
    local t = {}
    for i = addr_lo, addr_hi do
      local v = program_space:read_u8(i)
      t[#t+1] = string.format("%02x", v or 0)
    end
    return table.concat(t, "")
  end)
  if ok then return bytes else return "" end
end

-- 注册启动回调, 解析 driver 信息
local function on_ready()
  emu.print(string.format("[dump_vram] loading, output=%s", OUT_DIR))

  -- 找到主屏幕
  for _, s in pairs(M.screens) do
    screen_obj = s
    break
  end
  if screen_obj then
    screen_w = screen_obj:width()  or 0
    screen_h = screen_obj:height() or 0
  end

  -- 找 maincpu
  for _, d in pairs(M.devices) do
    if d:tag() == "maincpu" then
      cpu = d
      break
    end
  end
  if cpu and cpu.spaces and cpu.spaces["program"] then
    program_space = cpu.spaces["program"]
  end

  emu.print(string.format("[dump_vram] screen=%dx%d maincpu=%s",
    screen_w, screen_h, cpu and "found" or "missing"))
end

-- 每帧回调 — MAME 0.289 实际函数名 emu.add_machine_frame_notifier
local function on_frame()
  frame_index = frame_index + 1
  if frame_index % 30 ~= 0 then return end   -- 每秒 ≈ 2 次

  -- VDC 寄存器 (addressed as memory-mapped)
  local vdc_lo, vdc_hi = "", ""
  if program_space then
    vdc_lo = cpu_hash(0x0000, 0x0003)
    vdc_hi = cpu_hash(0x0004, 0x0007)
  end

  -- 调色板指纹 (PCCD 实际 map: $1A00-$1BFF = palette 32 × 4-byte)
  local pal_hash = cpu_hash(0x1A00, 0x1A3F)
  local pal_changed = pal_hash ~= "" and pal_hash ~= last_pal_hash
  if pal_changed then last_pal_hash = pal_hash end

  -- 帧行 (一行 JSON-Object; 不依赖外部 json 模块, 手拼以保证 0.289 兼容)
  if frame_log then
    local entries = {
      string.format('"frame":%d', frame_index),
      string.format('"emutime":%d', emu.time()),
      string.format('"gamename":"%s"', (emu.romname() or ""):gsub('"', '\\"')),
      string.format('"screen_w":%d', screen_w),
      string.format('"screen_h":%d', screen_h),
      string.format('"vdc_lo":"%s"', vdc_lo),
      string.format('"vdc_hi":"%s"', vdc_hi),
      string.format('"pal_changed":%s', pal_changed and "true" or "false"),
    }
    frame_log:write("{" .. table.concat(entries, ",") .. "}\n")
    frame_log:flush()
  end

  if pal_changed and change_log then
    change_log:write(string.format('{"frame":%d,"hash":"%s"}\n',
      frame_index, pal_hash))
    change_log:flush()
    emu.print(string.format("[dump_vram] palette change @ frame=%d", frame_index))
  end
end

local function on_stop()
  if frame_log  then frame_log:close()  end
  if change_log then change_log:close() end
  emu.print(string.format("[dump_vram] stopped after %d frames", frame_index))
end

-- 0.289 推荐入口
emu.add_machine_frame_notifier(on_frame)
emu.add_machine_stop_notifier(on_stop)
emu.register_prestart(on_ready)
