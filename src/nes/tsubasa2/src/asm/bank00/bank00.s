; ============================================================
; bank00/bank00.s - bank 00 switchable ($8000-$9FFF, 8KB)
;
; PRG bank 00, mapped to CPU $8000-$9FFF via MMC3 R6.
; Mainly code (small scattered data tables inline).
;
; Split into 5 sub-files (merged from 70+ func_XXXX.s):
;   code_main.s   - $8000-$8AB2  Main loop, input, menu logic
;   code_scene.s  - $8AB3-$8EEF  Scene data + large code block
;   code_render.s - $8EF0-$968F Tile render, sprite setup, map
;   code_util.s   - $9691-$9EA0 Jump tables, PPU, I/O, math
;   data_tail.s   - $9EEF-$9FFF Scheduler tail, stack, $FF pad
;
; PC flows continuously from .org $8000, gaps = $FF.
; ============================================================

.segment "PRG_BANK00"
.org $8000

; --- CODE: $8000-$8AB2 main routines ---
.include "code_main.s"

; --- CODE: $8AB3-$8EEF scene/data routines ---
.include "code_scene.s"

; --- CODE: $8EF0-$968F render routines ---
.include "code_render.s"

; --- CODE: $9691-$9EA0 utility routines ---
.include "code_util.s"

; --- DATA+CODE: $9EEF-$9FFF tail + padding ---
.include "data_tail.s"
