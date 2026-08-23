; ============================================================
; bank27/bank27.s - bank 27 switchable ($8000-$9FFF, 8KB)
;
; PRG bank 27, mapped to CPU $8000-$9FFF via MMC3 R6.
; PC flows continuously from .org $8000, gaps = $FF.
; ============================================================

.segment "PRG_BANK27"
.org $8000

; --- main routines ---
.include "code_main.s"

; --- data tables (part 1) ---
.include "data_tables.s"

; --- data tables (part 2) ---
.include "data_tail.s"

