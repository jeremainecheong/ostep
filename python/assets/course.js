/* OSTEP course — shared components. Every page loads this file (inlined by build.py). */
window.OS = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ---------- persistent storage (localStorage on a real site; in-memory fallback in sandboxes) ---------- */
  const mem = {};
  const store = {
    get(k) { try { const v = localStorage.getItem('py313:' + k); return v === null ? (mem[k] ?? null) : JSON.parse(v); } catch (e) { return mem[k] ?? null; } },
    set(k, v) { mem[k] = v; try { localStorage.setItem('py313:' + k, JSON.stringify(v)); } catch (e) {} },
    del(k) { delete mem[k]; try { localStorage.removeItem('py313:' + k); } catch (e) {} },
    keys(prefix) { const out = new Set(Object.keys(mem).filter(k => k.startsWith(prefix))); try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith('py313:' + prefix)) out.add(k.slice(6)); } } catch (e) {} return [...out]; },
    available() { try { localStorage.setItem('py313:test', '1'); localStorage.removeItem('py313:test'); return true; } catch (e) { return false; } }
  };

  /* ---------- course structure ---------- */
  const PIECES = [
    ['spec', 'The language, as specified', [
      ['0001-objects-values-types', 'Objects, values and types', 'Ref §3.1–3.2'],
      ['0002-lexical-structure-and-expressions', 'Lexical structure & expressions', 'Ref §2, §6'],
      ['0003-execution-model', 'Execution model: names, scopes, closures', 'Ref §4'],
      ['0004-data-model-special-methods', 'Data model I: special methods', 'Ref §3.3'],
      ['0005-attribute-access-and-descriptors', 'Data model II: attributes & descriptors', 'Ref §3.3.2, HOWTO'],
      ['0006-classes-mro-metaclasses', 'Classes, MRO, metaclasses', 'Ref §3.3.3, HOWTO'],
      ['0007-functions-generators-coroutines', 'Functions, generators, coroutines', 'Ref §6.3, §3.4'],
      ['0008-statements-and-pattern-matching', 'Statements, exceptions, pattern matching', 'Ref §7–8'],
      ['0009-import-system', 'The import system', 'Ref §5'],
      ['0010-typing', 'Typing: the PEP 484 lineage to 3.13', 'PEPs 484…742']]],
    ['internals', 'CPython 3.13 internals', [
      ['0011-compiler-and-bytecode', 'From source to bytecode', 'InternalDocs compiler, dis'],
      ['0012-eval-loop-and-specialization', 'The eval loop, specialization, JIT', 'InternalDocs interpreter, PEPs 659/744'],
      ['0013-memory-refcounting-gc', 'Memory, refcounting, garbage collection', 'InternalDocs GC, PEP 683'],
      ['0014-gil-and-free-threading', 'The GIL and free-threaded Python', 'PEP 703, HOWTO']]],
    ['data', 'DataFrames: pandas vs Polars', [
      ['0015-dataframe-data-models', 'Two data models', 'pandas dsintro, Polars concepts'],
      ['0016-selection-and-indexing', 'Selecting, filtering, assigning', 'pandas indexing, Polars expressions'],
      ['0017-expressions-and-lazy', 'Expressions, contexts, lazy queries', 'Polars lazy, pandas chaining'],
      ['0018-groupby-joins-reshaping', 'Groupby, joins, reshaping', 'pandas groupby/merging, Polars transformations'],
      ['0019-time-series', 'Time series', 'pandas timeseries, Polars time-series'],
      ['0020-performance-and-scale', 'Performance, memory, scale', 'pandas enhancingperf/scale, Modern Polars']]]
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
      <a class="brand" href="${root}index.html"><span class="dot"></span>Python 3.13 course</a>
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


  /* ---------- runnable Python (Pyodide, loaded on first use) ---------- */
  const pyodideP = {};
  function loadPy(status, version) {
    version = version || '0.28.3';
    if (pyodideP[version]) return pyodideP[version];
    status('loading Python (Pyodide ' + version + ', ~10 MB, once per page)…');
    pyodideP[version] = new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/pyodide/v' + version + '/full/pyodide.js';
      s.onload = () => window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v' + version + '/full/' }).then(res, rej);
      s.onerror = () => rej(new Error('Could not load Pyodide (offline, or blocked by this preview).'));
      document.head.append(s);
    });
    return pyodideP[version];
  }
  function py(el, code, opts) {
    el = typeof el === 'string' ? document.getElementById(el) : el; opts = opts || {};
    el.classList.add('pyrun');
    el.innerHTML = `<div class="pyhead"><span>Python${opts.note ? ' · ' + esc(opts.note) : ''}</span><span class="pystatus"></span><button class="primary run">▶ Run</button><button class="reset">Reset</button></div><textarea spellcheck="false">${esc(code.trim())}</textarea><pre class="pyout" hidden></pre>`;
    const ta = el.querySelector('textarea'), out = el.querySelector('.pyout'), st = el.querySelector('.pystatus');
    const fit = () => { ta.style.height = 'auto'; ta.style.height = Math.min(480, ta.scrollHeight + 4) + 'px'; }; fit(); ta.addEventListener('input', fit);
    el.querySelector('.reset').onclick = () => { ta.value = code.trim(); fit(); out.hidden = true; };
    el.querySelector('.run').onclick = async () => {
      out.hidden = false; out.textContent = ''; st.textContent = '';
      try {
        const pyo = await loadPy(m => st.textContent = m, opts.pyodide || ((opts.packages||[]).includes('polars') ? '0.27.7' : '0.28.3'));
        if (opts.packages) { st.textContent = 'loading ' + opts.packages.join(', ') + '…'; await pyo.loadPackage(opts.packages).catch(() => {}); }
        st.textContent = 'running…';
        pyo.setStdout({ batched: s => out.textContent += s + '\n' }); pyo.setStderr({ batched: s => out.textContent += s + '\n' });
        const r = await pyo.runPythonAsync(ta.value);
        if (r !== undefined && r !== null && String(r) !== 'None') out.textContent += String(r);
        st.textContent = 'done · CPython ' + pyo.runPython('import sys; f"{sys.version_info.major}.{sys.version_info.minor}"') + ' in WebAssembly';
      } catch (e) { out.textContent += String(e); st.textContent = 'error'; }
    };
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

  return { chrome, quiz, cards, stepper, gantt, objectives, py, esc, store, LESSONS, PIECES, title };
})();
