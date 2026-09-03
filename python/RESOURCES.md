# Resources (all free primary sources; local copies under /home/claude/py)

## Track A
- The Python Language Reference 3.13 — `cpython/Doc/reference/*.rst` (branch 3.13): lexical_analysis, datamodel, executionmodel, expressions, simple_stmts, compound_stmts, import. https://docs.python.org/3.13/reference/
- HOWTOs: descriptor.rst, mro.rst, free-threading-python.rst. Library docs: typing, dis, sys, gc, threading, importlib, functions.
- PEPs (peps repo): 484, 526, 544, 585, 604, 612, 646, 649, 659, 683, 695, 696, 701, 702, 703, 705, 742, 744, 3119 and others. https://peps.python.org/
- What's New in Python 3.13 — `Doc/whatsnew/3.13.rst`.

## Track B
- CPython 3.13 sources: Python/ceval.c, ceval_gil.c, bytecodes.c, specialize.c, gc.c, gc_free_threading.c, optimizer.c; Objects/dictobject.c, listobject.c, object.c; Include/internal/pycore_runtime_init.h, pycore_gil.h.
- InternalDocs (main branch): compiler.md, code_objects.md, interpreter.md, frames.md, generators.md, garbage_collector.md, exception_handling.md, jit.md. https://github.com/python/cpython/tree/main/InternalDocs
- Python Developer's Guide (devguide repo).

## Track C
- pandas user guide (3.0 docs, `pandas/doc/source/user_guide/*.rst`): dsintro, indexing, missing_data, pyarrow, migration (Copy-on-Write), text, groupby, merging, reshaping, timeseries, enhancingperf, scale, user_defined_functions. https://pandas.pydata.org/docs/user_guide/
- Polars user guide (`polars/docs/source/user-guide/**/*.md`): concepts, expressions, lazy, transformations (joins, concat, pivot, unpivot, time-series), misc (comparison, multiprocessing), migration/pandas. https://docs.pola.rs/user-guide/
- Modern Polars (Kevin Heavey), `modern-polars/book/*.qmd`. https://kevinheavey.github.io/modern-polars/

## Runtime
- Pyodide 0.28.3 (CPython 3.13) for tracks A/B; Pyodide 0.27.7 (CPython 3.12, last release bundling Polars 1.x + pandas 2.x) for track C.

Not used: any non-free book (a pirated PDF offered by the learner was declined).
