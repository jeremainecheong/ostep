# Notes

## Learner preferences (from the initial request)
- Visual + interactive learner: wants graphs/charts/diagrams, code blocks with examples, and clickable/interactive elements. Prose should be secondary and flowing.
- Wants the *whole* book covered ("everything that's important"), structured clearly, in order.
- Explicitly distrusts summaries from memory: "literally grep the entire pdf". All facts, numbers and figures in the lessons were extracted from the v1.10 chapter text (pdftotext + grep); see build notes below.

## Working notes
- Source texts: all 65 chapter PDFs (v1.10, mirror of ostep.org) converted with `pdftotext -layout`; extracted section skeleton, 68 crux boxes, 156 tip/aside titles, and every chapter's Summary before writing anything. Specific figures (MLFQ rules, CFS weights, stride example, segment tables, paging example, TLB trace, reference streams, disk specs, RAID table, vsfs layout, journaling protocols, SSD tables, NFS handle, Saltzer–Schroeder list, Lu et al. counts) were grep-verified.
- Content is paraphrased in our own words; code examples are re-written to match the book's experiments rather than copied.
- Pages are built self-contained (assets inlined by `build.py`) so they render in previews and offline; `assets/` remains the single source of truth.
- Lesson IDs are fixed in `assets/course.js` (LESSONS array) — the topbar and prev/next navigation depend on them.

## Ideas for next sessions
- Mixed cross-lesson quiz; spaced re-tests (2 days, 7 days) driven by learning records.
- Deeper dives on request: xv6 code walkthroughs (swtch, trap, vm.c), Linux CFS internals, ext4 journaling, an FTL simulator with wear counters.
- Fill-in-the-blank cheat sheets for recall practice.
