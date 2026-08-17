print("START")
import sys
print("import ok", file=sys.stderr)
x = sum(range(1000000))
print("sum done", x)
