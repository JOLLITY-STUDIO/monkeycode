"""Quick test runner for verification"""
import subprocess, sys

print("=" * 50)
print("  Running All Tests")
print("=" * 50)

# State test
r1 = subprocess.run(["python", "scripts/state_test.py"], capture_output=True, text=True)
ok = r1.stdout.count("[OK]")
fail = r1.stdout.count("[FAIL]")
print(f"\nState Test: {ok} OK, {fail} FAIL")

# Auto-play test
r2 = subprocess.run(["python", "scripts/auto_play_test.py", "--matches", "1", "--max-frames", "15000"], capture_output=True, text=True)
if "全部" in r2.stdout and "FAIL" not in r2.stdout:
    print("Auto-Play Test: PASSED")
else:
    print(f"Auto-Play Test: FAILED (rc={r2.returncode})")

print(f"\nOverall: {'ALL PASSED' if fail == 0 and r2.returncode == 0 else 'SOME FAILED'}")
sys.exit(0 if fail == 0 and r2.returncode == 0 else 1)
