# Resources (free primary sources)

- JLS SE 21 — https://docs.oracle.com/javase/specs/jls/se21/html/ (ch 4, 5, 8, 9, 11, 12, 14, 15, 16, 17; ch 17 fetched in full).
- JVMS SE 21 — https://docs.oracle.com/javase/specs/jvms/se21/html/ (ch 2 and 5 fetched in full; ch 4, 6 referenced).
- JEPs — 444 Virtual Threads, 439 Generational ZGC, 441 Pattern Matching for switch (full text via bugs.openjdk.org), 440, 431, 446, 453, 430, 442, 443, 445, 448, 449, 451, 452 (summaries); JDK 21 GA announcement (jdk-dev list).
- JDK 21u sources (sparse clone at /home/claude/java/jdk21): java/lang/{Thread,VirtualThread,ThreadBuilders,ScopedValue,ThreadLocal,String,Record}.java, java/lang/ref/*, jdk/internal/vm/{Continuation,ContinuationScope}.java, jdk/internal/misc/CarrierThread.java, java/util/concurrent/{ForkJoinPool,Executors,ThreadPerTaskExecutor,StructuredTaskScope}.java + locks/*, java/util/{HashMap,ArrayList,SequencedCollection}.java; HotSpot: oops/{markWord,oop,klass}.hpp, runtime/{objectMonitor,safepoint,synchronizer,javaThread,continuation,deoptimization,globals}.hpp, runtime/{continuationFreezeThaw,os}.cpp, interpreter/bytecodes.hpp, classfile/classFileParser.{hpp,cpp}, compiler/{compilerDefinitions,compiler_globals,compilationPolicy}.*, opto/c2_globals.hpp, cpu/x86/{globals_x86,c2_globals_x86}.hpp, gc/shared/{gc_globals.hpp,gcConfig.cpp}.
- Oracle Java 21 docs: core-libs virtual threads guide; "Significant changes in JDK 21"; API javadoc for StructuredTaskScope, ScopedValue, Lock.
- Tools referenced: javap, jshell, jcmd, JFR, JOL, JMH.

Not used: non-free books.
