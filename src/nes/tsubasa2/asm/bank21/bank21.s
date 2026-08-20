; ============================================================
; bank21/bank21.s - bank 21 switchable ($8000-$9FFF, 8KB)
;
; PRG bank 21, mapped to CPU $8000-$9FFF via MMC3 R6.
; PC flows continuously from .org $8000, gaps = $FF.
; ============================================================

.segment "PRG_BANK21"
.org $8000

; --- data tables (part 1) ---
.include "data_tables.s"

; --- data tables (part 2) ---
.include "data_maps.s"

; --- data tables (tail) ---
.include "data_tail.s"

