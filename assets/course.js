/* OSTEP course — shared components. Every page loads this file (inlined by build.py). */
window.OS = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ---------- persistent storage (localStorage on a real site; in-memory fallback in sandboxes) ---------- */
  const mem = {};
  const store = {
    get(k) { try { const v = localStorage.getItem('ostep:' + k); return v === null ? (mem[k] ?? null) : JSON.parse(v); } catch (e) { return mem[k] ?? null; } },
    set(k, v) { mem[k] = v; try { localStorage.setItem('ostep:' + k, JSON.stringify(v)); } catch (e) {} },
    del(k) { delete mem[k]; try { localStorage.removeItem('ostep:' + k); } catch (e) {} },
    keys(prefix) { const out = new Set(Object.keys(mem).filter(k => k.startsWith(prefix))); try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith('ostep:' + prefix)) out.add(k.slice(6)); } } catch (e) {} return [...out]; },
    available() { try { localStorage.setItem('ostep:test', '1'); localStorage.removeItem('ostep:test'); return true; } catch (e) { return false; } }
  };

  /* ---------- course structure ---------- */
  const PIECES = [
    ['intro', 'Introduction', [['0001-three-easy-pieces', 'Three easy pieces', 'ch 1–2']]],
    ['virt', 'Virtualization', [
      ['0002-processes', 'Processes & the process API', 'ch 4–5'],
      ['0003-limited-direct-execution', 'Limited direct execution', 'ch 6'],
      ['0004-scheduling', 'Scheduling', 'ch 7–10'],
      ['0005-address-spaces', 'Address spaces & segments', 'ch 13–16'],
      ['0006-paging-and-tlbs', 'Paging & TLBs', 'ch 17–20'],
      ['0007-swapping', 'Swapping & policies', 'ch 21–23']]],
    ['conc', 'Concurrency', [
      ['0008-threads-and-locks', 'Threads & locks', 'ch 26–28'],
      ['0009-cvs-and-semaphores', 'CVs & semaphores', 'ch 29–31'],
      ['0010-bugs-and-events', 'Bugs & events', 'ch 32–33']]],
    ['pers', 'Persistence', [
      ['0011-devices-disks-raid', 'Devices, disks, RAID', 'ch 36–38'],
      ['0012-files-and-vsfs', 'Files & a simple FS', 'ch 39–40'],
      ['0013-ffs-journaling-lfs', 'FFS, journaling, LFS', 'ch 41–43'],
      ['0014-ssd-and-integrity', 'SSDs & integrity', 'ch 44–45'],
      ['0015-distributed-nfs-afs', 'Distributed FS', 'ch 48–50']]],
    ['sec', 'Security', [['0016-security-and-vmms', 'Security & VMMs', 'ch 53–57, App B']]]
  ];
  const LESSONS = PIECES.flatMap(p => p[2].map(l => [l[0], l[1], p[0], l[2]]));
  const title = id => (LESSONS.find(l => l[0] === id) || [])[1] || id;
  let pageId = null, root = '../';

  /* ---------- chrome: sticky header, slide-out directory, notes drawer, prev/next ---------- */
  function chrome(id, rootPath) {
    pageId = id; root = rootPath === undefined ? '../' : rootPath;
    const i = LESSONS.findIndex(l => l[0] === id);
    const isLesson = i >= 0;
    const top = document.createElement('header'); top.className = 'topbar';
    top.innerHTML = `<button class="menu" aria-label="Open directory" aria-expanded="false">☰<span>Directory</span></button>
      <a class="brand" href="${root}index.html"><span class="dot"></span>OSTEP course</a>
      <nav class="links"><a href="${root}reference/glossary.html">Glossary</a><a href="${root}reference/cheatsheets.html">Cheat sheets</a><a href="${root}notes.html">My notes</a></nav>
      ${isLesson ? `<span class="where">${i+1} / ${LESSONS.length}</span>` : ''}`;
    document.body.prepend(top);
    // directory drawer
    const drawer = document.createElement('aside'); drawer.className = 'drawer'; drawer.setAttribute('aria-label', 'Course directory');
    const scores = Object.fromEntries(LESSONS.map(l => [l[0], store.get('quiz:' + l[0])]));
    const notes = new Set(store.keys('notes:').map(k => k.slice(6)).filter(k => (store.get('notes:' + k) || {}).text));
    drawer.innerHTML = `<div class="dhead"><b>Directory</b><button class="close" aria-label="Close">×</button></div>
      <a class="ditem ${id === 'index' ? 'cur' : ''}" href="${root}index.html">Course hub</a>
      ${PIECES.map(([cls, name, ls]) => `<div class="dgroup piece-${cls}"><div class="dname">${name}</div>${ls.map(l => {
        const n = LESSONS.findIndex(x => x[0] === l[0]) + 1, s = scores[l[0]];
        return `<a class="ditem ${l[0] === id ? 'cur' : ''}" href="${root}lessons/${l[0]}.html"><span class="n">${n}</span><span class="t">${l[1]}<small>${l[3]}</small></span><span class="badges">${notes.has(l[0]) ? '<i title="you have notes">✎</i>' : ''}${s ? `<em title="best quiz score">${s.score}/${s.total}</em>` : ''}</span></a>`; }).join('')}</div>`).join('')}
      <div class="dgroup piece-intro"><div class="dname">Reference</div>
        <a class="ditem ${id === 'glossary' ? 'cur' : ''}" href="${root}reference/glossary.html"><span class="t">Glossary</span></a>
        <a class="ditem ${id === 'cheatsheets' ? 'cur' : ''}" href="${root}reference/cheatsheets.html"><span class="t">Cheat sheets</span></a>
        <a class="ditem ${id === 'notes' ? 'cur' : ''}" href="${root}notes.html"><span class="t">My notes &amp; progress</span></a></div>
      <div class="dfoot">${store.available() ? 'Notes and scores are saved in this browser.' : 'Notes and scores are kept for this session only (storage unavailable here).'}</div>`;
    document.body.append(drawer);
    const scrim = document.createElement('div'); scrim.className = 'scrim'; document.body.append(scrim);
    const open = o => { document.body.classList.toggle('drawer-open', o); top.querySelector('.menu').setAttribute('aria-expanded', o); if (o) drawer.querySelector('.cur, .ditem')?.focus(); };
    top.querySelector('.menu').onclick = () => open(!document.body.classList.contains('drawer-open'));
    drawer.querySelector('.close').onclick = () => open(false); scrim.onclick = () => open(false);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { open(false); notesOpen(false); } });
    // prev/next for lessons
    if (isLesson) {
      const nav = document.createElement('div'); nav.className = 'nav-bottom';
      const prev = LESSONS[i-1], next = LESSONS[i+1];
      nav.innerHTML = (prev ? `<a href="${prev[0]}.html">← ${i}. ${prev[1]}</a>` : '<span></span>') +
                      (next ? `<a href="${next[0]}.html">${i+2}. ${next[1]} →</a>` : `<a href="${root}index.html">Back to course hub →</a>`);
      document.querySelector('.wrap').append(nav);
    }
    // wrap tables so they scroll sideways on phones
    document.querySelectorAll('.wrap table').forEach(t => { if (t.parentElement.classList.contains('tw')) return; const w = document.createElement('div'); w.className = 'tw'; t.replaceWith(w); w.append(t); });
    // notes drawer (every page except the notes page itself)
    if (id !== 'notes') notesUI(id, isLesson ? `${i+1}. ${LESSONS[i][1]}` : (document.title.split(' — ')[0]));
  }

  /* ---------- notes: floating button + bottom sheet, autosaved ---------- */
  let notesOpen = () => {};
  function notesUI(id, label) {
    const btn = document.createElement('button'); btn.className = 'notes-fab'; btn.innerHTML = '✎ <span>Notes</span>'; btn.setAttribute('aria-label', 'Open notes');
    const sheet = document.createElement('section'); sheet.className = 'notes-sheet'; sheet.setAttribute('aria-label', 'Notes for this page');
    const saved = store.get('notes:' + id) || {};
    sheet.innerHTML = `<div class="nhead"><b>Notes · ${esc(label)}</b><span class="nstatus"></span><button class="close" aria-label="Close notes">×</button></div>
      <textarea placeholder="Your notes for this page. Markdown is fine. Saved automatically.">${esc(saved.text || '')}</textarea>
      <div class="nfoot"><span class="ncount"></span><a href="${root}notes.html">All notes &amp; export →</a></div>`;
    document.body.append(btn, sheet);
    const ta = sheet.querySelector('textarea'), status = sheet.querySelector('.nstatus'), count = sheet.querySelector('.ncount');
    const upd = () => { count.textContent = ta.value.trim() ? ta.value.trim().split(/\s+/).length + ' words' : ''; };
    let t; ta.addEventListener('input', () => { status.textContent = 'saving…'; clearTimeout(t); t = setTimeout(() => { store.set('notes:' + id, { text: ta.value, title: label, updated: new Date().toISOString() }); status.textContent = 'saved'; upd(); }, 400); });
    upd();
    notesOpen = o => { document.body.classList.toggle('notes-open', o); if (o) ta.focus(); };
    btn.onclick = () => notesOpen(!document.body.classList.contains('notes-open'));
    sheet.querySelector('.close').onclick = () => notesOpen(false);
  }

  /* ---------- quiz: immediate feedback; best score persisted ---------- */
  function quiz(el, qs) {
    el = typeof el === 'string' ? document.getElementById(el) : el;
    el.classList.add('quiz');
    let score = 0, answered = 0;
    const best = pageId ? store.get('quiz:' + pageId) : null;
    el.innerHTML = qs.map((q, i) => `<div class="q" data-i="${i}"><p>${i+1}. ${q.q}</p>
      <div class="opts">${q.o.map((o, j) => `<button class="opt" data-j="${j}">${esc(o)}</button>`).join('')}</div>
      <div class="why">${q.why}</div></div>`).join('') + `<div class="score">${best ? `Best so far: ${best.score}/${best.total} (${new Date(best.date).toLocaleDateString()})` : ''}</div>`;
    el.querySelectorAll('.q').forEach(qd => {
      const q = qs[+qd.dataset.i];
      qd.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
        if (qd.classList.contains('done')) return;
        qd.classList.add('done'); answered++;
        const j = +b.dataset.j;
        if (j === q.a) { b.classList.add('right'); score++; }
        else { b.classList.add('wrong'); qd.querySelectorAll('.opt')[q.a].classList.add('right'); }
        const s = el.querySelector('.score');
        s.textContent = `${score} / ${answered} correct`;
        if (answered === qs.length) {
          s.textContent += score === qs.length ? ' — all of them. Retry from memory in two days.' : ' — reread the sections you missed, then retry.';
          if (pageId && (!best || score >= best.score)) store.set('quiz:' + pageId, { score, total: qs.length, date: new Date().toISOString() });
        }
      }));
    });
  }

  /* ---------- flip cards ---------- */
  function cards(el, list) {
    el = typeof el === 'string' ? document.getElementById(el) : el;
    el.classList.add('cards');
    el.innerHTML = list.map(([f, b]) => `<div class="card" tabindex="0" role="button" aria-label="flip card"><div class="inner"><div class="face front">${f}</div><div class="face back">${b}</div></div></div>`).join('');
    el.querySelectorAll('.card').forEach(c => {
      const t = () => c.classList.toggle('flipped');
      c.addEventListener('click', t);
      c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); } });
    });
  }

  /* ---------- stepper ---------- */
  function stepper(el, steps, render) {
    el = typeof el === 'string' ? document.getElementById(el) : el;
    el.classList.add('stepper');
    let i = 0;
    el.innerHTML = `<div class="controls"><button class="prev">← Back</button><button class="next primary">Next step →</button><span class="idx"></span></div><div class="stage"></div><div class="extra"></div>`;
    const stage = el.querySelector('.stage'), idx = el.querySelector('.idx'), extra = el.querySelector('.extra');
    const draw = () => { stage.innerHTML = steps[i]; idx.textContent = `step ${i+1} / ${steps.length}`; if (render) render(i, extra); };
    el.querySelector('.prev').onclick = () => { i = Math.max(0, i-1); draw(); };
    el.querySelector('.next').onclick = () => { i = Math.min(steps.length-1, i+1); draw(); };
    draw();
  }

  /* ---------- gantt ---------- */
  function gantt(el, rows, total, colors) {
    el = typeof el === 'string' ? document.getElementById(el) : el;
    el.classList.add('gantt');
    const pal = colors || ['#e8b84a','#5bc8f5','#6bcb77','#f47fa0','#c9a8ff','#ffb86b'];
    el.innerHTML = rows.map((r, i) => `<div class="row"><span>${esc(r.name)}</span><div class="track">${r.segs.map(s =>
      `<div class="seg" style="left:${100*s.start/total}%;width:${100*(s.end-s.start)/total}%;background:${pal[i%pal.length]}" title="${s.start}–${s.end}">${(s.end-s.start)/total > .06 ? (s.end-s.start) : ''}</div>`).join('')}</div></div>`).join('') +
      `<div class="row"><span></span><div style="display:flex;justify-content:space-between;font-size:.75rem;color:var(--muted)"><span>0</span><span>${total}</span></div></div>`;
  }

  /* ---------- objectives checklist (persisted) ---------- */
  function objectives(el, items) {
    el = typeof el === 'string' ? document.getElementById(el) : el;
    el.classList.add('objectives');
    const saved = (pageId && store.get('obj:' + pageId)) || [];
    el.innerHTML = items.map((t, i) => `<li><label><input type="checkbox" data-i="${i}" ${saved.includes(i) ? 'checked' : ''}>${t}</label></li>`).join('');
    el.querySelectorAll('input').forEach(c => c.onchange = () => { const s = [...el.querySelectorAll('input:checked')].map(x => +x.dataset.i); if (pageId) store.set('obj:' + pageId, s); });
  }

  return { chrome, quiz, cards, stepper, gantt, objectives, esc, store, LESSONS, PIECES, title };
})();
