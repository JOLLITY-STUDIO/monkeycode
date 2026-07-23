@echo off
cd /d "%~dp0"
call ..\emsdk\emsdk_env.bat >nul 2>&1

python ..\emsdk\upstream\emscripten\emcc.py ^
  -I. ^
  -O2 ^
  -s WASM=0 ^
  --no-entry ^
  -s EXPORTED_FUNCTIONS="['_update_frame','_load','_store']" ^
  -s EXPORTED_RUNTIME_METHODS="['ccall','getValue','setValue','HEAPU8']" ^
  -o _prg_output\core.cjs ^
  _prg_output\runner_3bank.c

if %ERRORLEVEL% equ 0 (
  echo SUCCESS: core.js generated
) else (
  echo FAILED with error %ERRORLEVEL%
)
