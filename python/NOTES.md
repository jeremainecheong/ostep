# Teaching notes

- 20 lessons, three tracks; same components as the OSTEP course (OS.chrome directory drawer, notes drawer, quizzes with best-score persistence, flash cards, steppers) plus `OS.py()` runnable Python blocks (Pyodide).
- localStorage namespace `py313:` so notes/scores never collide with the OSTEP site on the same origin.
- Facts verified from source are listed in VERIFIED-FACTS.md; lessons cite file paths where a number matters (thresholds, DEFAULT_INTERVAL, list growth, specialization families).
- Track C runtime is pandas 2.x / Polars 1.18 (Pyodide 0.27.7) while the text follows pandas 3.0 docs; lessons 15 and 19 call out the differences (CoW default, string dtype, `us` resolution).
- Learner cadence: one lesson per sitting; retest after 2 days and 1 week; ask for mixed quizzes in chat.
