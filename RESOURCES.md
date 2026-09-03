# OSTEP Resources

## Knowledge

- [Book: _Operating Systems: Three Easy Pieces_ (v1.10), Remzi & Andrea Arpaci-Dusseau; security chapters by Peter Reiher](https://pages.cs.wisc.edu/~remzi/OSTEP/)
  The primary source for every lesson. Free chapter-by-chapter PDFs; each lesson links its chapters. Use for: everything. Version news/errata: https://pages.cs.wisc.edu/~remzi/OSTEP/combined.html
  - Intro: [ch 2 intro.pdf](https://pages.cs.wisc.edu/~remzi/OSTEP/intro.pdf)
  - CPU virtualization: [cpu-intro](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf), [cpu-api](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf), [cpu-mechanisms](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf), [cpu-sched](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf), [cpu-sched-mlfq](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf), [cpu-sched-lottery](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf), [cpu-sched-multi](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-multi.pdf)
  - Memory virtualization: [vm-intro](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf), [vm-api](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-api.pdf), [vm-mechanism](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-mechanism.pdf), [vm-segmentation](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-segmentation.pdf), [vm-freespace](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf), [vm-paging](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf), [vm-tlbs](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf), [vm-smalltables](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-smalltables.pdf), [vm-beyondphys](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf), [vm-beyondphys-policy](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf), [vm-complete](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-complete.pdf)
  - Concurrency: [threads-intro](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf), [threads-api](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-api.pdf), [threads-locks](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf), [threads-locks-usage](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks-usage.pdf), [threads-cv](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf), [threads-sema](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf), [threads-bugs](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf), [threads-events](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-events.pdf)
  - Persistence: [file-devices](https://pages.cs.wisc.edu/~remzi/OSTEP/file-devices.pdf), [file-disks](https://pages.cs.wisc.edu/~remzi/OSTEP/file-disks.pdf), [file-raid](https://pages.cs.wisc.edu/~remzi/OSTEP/file-raid.pdf), [file-intro](https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf), [file-implementation](https://pages.cs.wisc.edu/~remzi/OSTEP/file-implementation.pdf), [file-ffs](https://pages.cs.wisc.edu/~remzi/OSTEP/file-ffs.pdf), [file-journaling](https://pages.cs.wisc.edu/~remzi/OSTEP/file-journaling.pdf), [file-lfs](https://pages.cs.wisc.edu/~remzi/OSTEP/file-lfs.pdf), [file-ssd](https://pages.cs.wisc.edu/~remzi/OSTEP/file-ssd.pdf), [file-integrity](https://pages.cs.wisc.edu/~remzi/OSTEP/file-integrity.pdf), [dist-intro](https://pages.cs.wisc.edu/~remzi/OSTEP/dist-intro.pdf), [dist-nfs](https://pages.cs.wisc.edu/~remzi/OSTEP/dist-nfs.pdf), [dist-afs](https://pages.cs.wisc.edu/~remzi/OSTEP/dist-afs.pdf)
  - Security: [security-intro](https://pages.cs.wisc.edu/~remzi/OSTEP/security-intro.pdf), [security-authentication](https://pages.cs.wisc.edu/~remzi/OSTEP/security-authentication.pdf), [security-access](https://pages.cs.wisc.edu/~remzi/OSTEP/security-access.pdf), [security-crypto](https://pages.cs.wisc.edu/~remzi/OSTEP/security-crypto.pdf), [security-distributed](https://pages.cs.wisc.edu/~remzi/OSTEP/security-distributed.pdf)
  - Appendices: [vmm-intro](https://pages.cs.wisc.edu/~remzi/OSTEP/vmm-intro.pdf), [lab-tutorial](https://pages.cs.wisc.edu/~remzi/OSTEP/lab-tutorial.pdf), [lab-projects-systems](https://pages.cs.wisc.edu/~remzi/OSTEP/lab-projects-systems.pdf), [lab-projects-xv6](https://pages.cs.wisc.edu/~remzi/OSTEP/lab-projects-xv6.pdf)
- [Code: ostep-code](https://github.com/remzi-arpacidusseau/ostep-code)
  The book's C examples (intro, cpu-api, threads-*, vm-intro …). Use for: typing in and running every program a lesson shows.
- [Homework: ostep-homework](https://github.com/remzi-arpacidusseau/ostep-homework) — index at https://pages.cs.wisc.edu/~remzi/OSTEP/Homework/homework.html
  Python simulators (scheduler.py, mlfq.py, lottery.py, relocation.py, paging-*.py, tlb.c, malloc.py, paging-policy.py, disk.py, raid.py, vsfs.py, fsck.py, lfs.py …). Use for: the highest-value practice — run with -c to check answers.
- [Projects: ostep-projects](https://github.com/remzi-arpacidusseau/ostep-projects)
  Shell, memory allocator, MapReduce, xv6 kernel projects. Use for: after the course, to turn knowledge into skill.
- [Stevens & Rago, _Advanced Programming in the UNIX Environment_](https://www.amazon.com/gp/product/0321637739)
  The book's repeated referral for process, file and signal APIs. Use for: depth on chapters 5, 14, 27, 39.
- Classic papers cited per lesson (all findable via the chapter reference lists): Levy & Lipman (VAX/VMS VM), Lu et al. "Learning from Mistakes" (concurrency bugs), Patterson–Gibson–Katz (RAID), McKusick et al. (FFS), Rosenblum & Ousterhout (LFS), Sandberg et al. (NFS), Howard et al. (AFS), Saltzer & Schroeder (security principles), Bugnion et al. (Disco).

## Wisdom (Communities)

- [r/osdev](https://reddit.com/r/osdev) and the [OSDev wiki/forums](https://wiki.osdev.org)
  Practitioners building real kernels. Use for: "how does Linux/xv6 actually do X" after a lesson.
- [xv6 (MIT 6.1810) course materials](https://pdos.csail.mit.edu/6.1810/)
  Labs on the teaching OS the book quotes. Use for: turning lessons 2–7 into working code.
- Local: an operating systems course or study group at your university, if available. Use for: exam-style problems and discussion of the homework simulators.

## Gaps
- No single interactive reference for the book's homework answers; check with the simulators' `-c` flag.
- Community preference not yet stated by the learner.
