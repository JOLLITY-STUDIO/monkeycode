@echo off
cd /d %~dp0
node _cmp_trace_vs_parse.cjs
if exist _cmp_result.txt (
    type _cmp_result.txt
) else (
    echo ERROR: No output file generated
)
