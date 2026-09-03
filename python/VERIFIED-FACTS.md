# Verified facts for the Python 3.13 course (grep'd from sources in /home/claude/py)
Sources: cpython (branch 3.13) Doc/reference, Doc/howto, Doc/whatsnew/3.13.rst, Doc/library; cpython-main/InternalDocs (3.15-dev docs; version-check anything numeric); devguide; peps/peps; pandas doc/source/user_guide; polars docs/source/user-guide; modern-polars/book.

## 3.13 headline (whatsnew/3.13.rst)
- Biggest changes: new interactive interpreter (color, multiline editing), experimental free-threaded mode (PEP 703), experimental JIT (PEP 744). Improved error messages.
- Free-threaded: separate executable `python3.13t`; experimental; "substantial single-threaded performance hit"; GIL can be re-enabled at runtime via PYTHON_GIL env or `-X gil=1`; C extensions must opt in via Py_mod_gil slot; GIL auto-enabled (with warning) when importing an extension not marked free-threading-safe.
- JIT: build with --enable-experimental-jit (values no / yes / yes-off / interpreter); PYTHON_JIT=0/1 at runtime. Pipeline: Tier 1 specialized bytecode → hot → Tier 2 IR (micro-ops/"uops") → optimization passes → Tier 2 interpreter (debugging) or machine code via copy-and-patch (build-time LLVM dependency, no runtime deps).

## Free-threading HOWTO (Doc/howto/free-threading-python.rst)
- sys.version contains "experimental free-threading build"; sys._is_gil_enabled().
- Thread safety: dict/list/set use internal locks behaving similarly to GIL; not a guarantee; recommend threading.Lock.
- Immortalization (3.13 free-threaded): when a second thread starts, immortalize module-level functions, method descriptors, code objects, modules + their dicts, type objects; numeric & string literals and sys.intern strings always immortal. Memory growth expected; to be addressed in 3.14.
- Frame objects unsafe across threads (sys._current_frames unsafe). Sharing an iterator across threads unsafe.
- Single-threaded overhead ~40% on pyperformance in 3.13, largest cause: specializing adaptive interpreter (PEP 659) disabled in FT build; target ≤10%.
- Tracking sites: py-free-threading.github.io/tracking, hugovk.github.io/free-threaded-wheels.

## PEP 703 design
- Three techniques to make refcounting scale: biased reference counting (owner thread fast path via ob_ref_local/ob_ref_shared; ob_tid), immortalization, limited deferred reference counting (for functions/code/modules/types — objects frequently accessed by many threads; deallocated only by the tracing GC).
- Per-object lock: ob_mutex, one byte. Critical sections (Py_BEGIN_CRITICAL_SECTION) protect dict/list internals; can be suspended when blocking to avoid deadlock.
- mimalloc as allocator (thread-safe; lets GC find all objects without gc linked lists). Stop-the-world GC in FT build; non-generational (InternalDocs GC note).

## Interpreter (InternalDocs/interpreter.md)
- Code unit = 16 bits: 8-bit opcode + 8-bit oparg; EXTENDED_ARG prefixes (≤3) build up to 32-bit oparg. Dispatch: switch generated from Python/bytecodes.c (DSL) → generated_cases.c.h; computed gotos where supported.
- Inline cache entries: 2-byte entries following instruction; size fixed per family; first entry is always the counter.
- Specialization (PEP 659): adaptive instruction counts executions, tries _Py_Specialize_XXX (Python/specialize.c); specialized instruction checks assumptions and de-optimizes to generic on failure. Family = adaptive + specialized forms, same cache size. Example: LOAD_GLOBAL → LOAD_GLOBAL_MODULE / LOAD_GLOBAL_BUILTIN. Also LOAD_ATTR_SLOT, LOAD_ATTR_MODULE.
- Evaluation stack; _PyOpcode_num_popped/num_pushed metadata. Zero-cost exceptions via exception table (3.11+).

## Frames & code objects
- _PyInterpreterFrame (internal, C-level, in per-thread data stack chunks); PyFrameObject created lazily only when Python code asks (sys._getframe, tracebacks); may outlive the interpreter frame (copied). Generators/coroutines embed their _PyInterpreterFrame.
- Code object: co_code_adaptive (mutable, quickened copy) vs co_code (immutable view); _PyCode_Quicken initializes adaptive caches at creation. co_linetable holds positions (co_positions()).

## Compiler (InternalDocs/compiler.md)
- Pipeline: tokenizer (Parser/lexer, Parser/tokenizer) → PEG parser on tokens (since 3.9, PEP 617; generated from Grammar/python.gram by Tools/peg_generator) → AST (ASDL, Parser/Python.asdl) → symbol table → instruction sequence (pseudo-instructions) → CFG + optimizations (Python/flowgraph.c) → assemble bytecode (Python/assemble.c) → code object; .pyc via marshal.

## Garbage collector (InternalDocs/garbage_collector.md; thresholds verified in 3.13 Include/internal/pycore_runtime_init.h)
- Primary: reference counting (ob_refcnt); fails on cycles → cyclic GC for container objects (tp_traverse; tp_clear unless provably acyclic/immutable).
- Cycle detection: copy refcounts to gc_refs, subtract internal references via tp_traverse, objects with gc_refs>0 are reachable roots, propagate reachability; unreachable = garbage. PEP 442: tp_finalize (__del__) called once, resurrection handled; weakrefs cleared; tp_clear breaks cycles.
- Generations: 3 (0,1,2); weak generational hypothesis; 3.13 thresholds (2000, 10, 10); gc.get_threshold(); permanent generation (gc.freeze). Free-threaded build: non-generational, whole heap each collection.
- Immortal objects (PEP 683): refcount never changes; None/True/False/small ints/interned strings.

## JIT (whatsnew 3.13 + PEP 744 + InternalDocs/jit.md [main describes newer trace recorder])
- Hot detection at JUMP_BACKWARD / RESUME via backoff counters; tier 2 uops; executors; invalidation. 3.13: off by default, experimental, copy-and-patch (Brandt Bucher).

## Data model / execution model — verify per lesson from Doc/reference/*.rst (datamodel.rst 19.5k words; executionmodel.rst; import.rst), howto/descriptor.rst, howto/mro.rst.

## pandas / Polars — verify per lesson from user guides; Modern Polars book/*.qmd (indexing, method_chaining, tidy, timeseries, performance, scaling).
