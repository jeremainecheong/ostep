# Mission: Operating Systems: Three Easy Pieces (OSTEP)

## Why
Learn everything important in OSTEP — how an OS virtualizes the CPU and memory, makes concurrency safe, and stores data persistently — well enough that the ideas stay usable long after the course: reading kernel code, reasoning about performance, and answering OS questions from memory rather than by lookup.
_(Written from the request "summarize the whole book, everything important, structured and flowing, for a visual + interactive learner". Refine this with your actual end goal — an exam, a systems job, a project — and every later lesson will be steered by it.)_

## Success looks like
- Can explain each of the book's ~68 "crux" questions and the mechanism/policy that answers it.
- Can run the simulators by hand: schedulers (FIFO/SJF/STCF/RR/MLFQ/CFS), address translation (base/bounds, segments, linear and multi-level paging, TLB), page replacement (OPT/FIFO/LRU/clock), lock construction, journaling protocols, disk/RAID arithmetic.
- Can write correct producer/consumer code with CVs or semaphores from memory and diagnose atomicity/order violations and deadlock.
- Can compare NFS vs AFS, fsck vs journaling vs LFS, HDD vs SSD, ACLs vs capabilities on concrete criteria.
- Scores ≥ 90% on every lesson quiz when retaken a week later.

## Constraints
- Visual + interactive learner: diagrams, simulators, clickable examples first; prose second.
- Wants completeness ("everything that's important") in a structured, flowing order — follow the book's order.
- All content must be grounded in the v1.10 chapter texts, not recalled from memory.

## Out of scope
- Networking internals, graphics, and deep security beyond the book's five security chapters (the book itself excludes these).
- The lab appendices (tutorial, xv6/systems projects) — referenced, not taught, until asked.
- Deprecated monitors appendix.
