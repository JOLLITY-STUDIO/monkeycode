# RetroArch setup for Sexy Idol Mahjong (PC Engine CD-ROM2)

## Quick start

1. Double-click `d:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\run_pce_game.bat`
2. Game should load. Press **Enter** to start.

If white screen: try `run_pce_game_sdl.bat` (gl video driver).

## Controls (PC Engine -> keyboard)

| Button          | Key                |
| --------------- | ------------------ |
| A (RUN/Start)   | Enter / Z / Space  |
| B               | X                  |
| SELECT          | Shift              |
| D-Pad           | Arrow keys         |
| Take screenshot | F11                |
| Reset           | F12                |
| Quit RetroArch  | Esc                |

After F11, screenshot is saved to:
```
D:\studio\games\tools\RetroArch-Win64\screenshots\*.png
```

## Collect screenshots to project

Run after gaming session:
```
python d:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\collect_screenshots.py
```

Output:
```
d:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\extracted\screenshots\pce_YYYYMMDD_HHMMSS_xxxxxx.png
```

De-duplicates by content hash, names by mtime.

## BIOS / system card

Already in place:
```
D:\studio\games\tools\RetroArch-Win64\system\syscard3.pce   (304 KB)
```

If RetroArch says "BIOS not found": re-download syscard3.pce (Google "syscard3.pce" or grab from a TG-CD pack).

## Files

- `_tools\run_pce_game.bat`         launch with vulkan/gl default
- `_tools\run_pce_game_sdl.bat`     launch with --video-driver gl
- `_tools\collect_screenshots.py`   gather screenshots to project
- `_tools\RA_SETUP_README.md`       this file
