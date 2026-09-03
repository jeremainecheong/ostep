# OSTEP course — Operating Systems: Three Easy Pieces, taught interactively

Sixteen mobile-friendly, self-contained lessons covering every chapter of
[OSTEP v1.10](https://pages.cs.wisc.edu/~remzi/OSTEP/) (plus the VMM appendix),
with simulators, diagrams, flip cards, quizzes, a glossary, printable cheat sheets,
and built-in note-taking. All facts were extracted from the chapter PDFs, not recalled.

## Publish it as a website (GitHub Pages, ~2 minutes)

1. Create a new GitHub repository (public), e.g. `ostep`.
2. Upload the contents of this folder to the repository root (drag-and-drop in the
   GitHub web UI works; `index.html` must be at the top level).
3. In the repository: **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**,
   branch `main`, folder `/ (root)`. Save.

After a minute your course is live at `https://<your-username>.github.io/ostep/`.
Open it on your phone and tap **☰ Directory** to navigate, **✎ Notes** to write.

(Alternatives that work identically because the site is plain static files:
Netlify Drop, Cloudflare Pages, Vercel, or just open `index.html` locally.)

## Notes and progress

Notes, quiz scores and checked objectives are saved in the browser's `localStorage`
of the device you're using — they never leave your device. Use **My notes & progress**
to export a Markdown copy or a JSON backup, and to restore it on another device.

## Layout (follows the `teach` skill workspace convention)

```
index.html              course hub / directory
notes.html              my notes & progress (export / import)
lessons/0001-… .html    the sixteen lessons
reference/glossary.html, reference/cheatsheets.html
assets/course.css, assets/course.js   shared design + components (source of truth)
build.py                inlines assets into every page (makes each file standalone)
MISSION.md RESOURCES.md NOTES.md learning-records/   teaching workspace files
```

To edit: change `assets/*` or a page, then run `python3 build.py out/` and publish `out/`.
(The published pages already have the assets inlined, so editing them directly also works.)

## Source

Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau, *Operating Systems: Three Easy Pieces*,
Arpaci-Dusseau Books, v1.10 (2023); security chapters by Peter Reiher. The book is free at
https://pages.cs.wisc.edu/~remzi/OSTEP/ — this course paraphrases and teaches it; it is not a copy.
