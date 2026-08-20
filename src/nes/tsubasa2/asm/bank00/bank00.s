; ============================================================
; bank00/bank00.s - bank 00 switchable ($8000-$9FFF, 8KB)
;
; PRG bank 00, mapped at CPU $8000-$9FFF via MMC3 R6.
; Content split into partNN.s subfiles (500 lines each),
; merged via .include, PC flows from .org $8000.
; ============================================================

.segment "PRG_BANK00"
.org $8000

.include "part01.s"
.include "part02.s"
.include "part03.s"
.include "part04.s"
.include "part05.s"
.include "part06.s"
.include "part07.s"
.include "part08.s"
