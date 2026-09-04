# Teaching notes

- 17 lessons, three tracks; same components as the OSTEP/Python courses (directory drawer, notes drawer, quizzes, cards, steppers). No in-browser Java runtime: each lesson has annotated code to paste into jshell plus a JS simulator (conversion calculator, happens-before explorer, class-file hex, bytecode stepper, loader delegation, init-procedure state machine, method-selection cases, lambda lifecycle, tier warm-up, region GC, mark word, Little's Law, VirtualThread state machine, freeze/thaw, policy timelines, scoped-value tree, monitor simulator, switch dominance checker).
- localStorage namespace `java21:`; OSTEP uses `ostep:`, Python `py313:` — all three live on one origin.
- Lessons 1–6 were written first (JLS-cited); 7–17 after fetching JLS 17, JVMS 2/5, JEPs 444/439/441 and grepping JDK 21u sources; see VERIFIED-FACTS.md.
- Preview APIs (StructuredTaskScope, ScopedValue) documented as in 21; later JDKs renamed things (JEP 505 factories/Joiner).
