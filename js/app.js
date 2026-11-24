(() => {
  const S = window.SITE, ST = S.settings, $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const pop = (n = 110) => window.confetti && window.confetti({ particleCount: n, spread: 80, origin: { y: .6 }, colors: ['#F6D5DA', '#D9CCEB', '#B7C4A8', '#C98B97', '#FBF5EC'] });
  const img = f => f ? `<img src="${ST.photoDir}${esc(f)}" alt="" onerror="this.outerHTML='<div class=ph></div>'">` : '<div class="ph"></div>';
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  let api;

  /* ===== Musik (tombol disembunyikan otomatis jika file tidak ada) ===== */
  const audio = new Audio(ST.music), mbtn = $('#music');
  audio.loop = true; audio.volume = .5;
  audio.addEventListener('error', () => { mbtn.hidden = true; });
  ['play', 'pause'].forEach(e => audio.addEventListener(e, () => mbtn.setAttribute('aria-pressed', String(!audio.paused))));
  mbtn.onclick = () => audio.paused ? audio.play().catch(() => {}) : audio.pause();
  const play = () => audio.play().catch(() => {});

  /* ===== Layar (urutan = urutan tampil) ===== */
  const candle = (x, c) => `<g class="candle" tabindex="0" role="button" aria-label="Lilin"><rect x="${x - 14}" y="40" width="28" height="62" fill="transparent"/><rect x="${x - 4}" y="62" width="8" height="38" rx="3" fill="${c}"/><ellipse class="flame" cx="${x}" cy="52" rx="6" ry="10"/></g>`;
  const CAKE = `<svg class="cake" viewBox="0 0 240 230" role="group" aria-label="Kue ulang tahun"><ellipse cx="120" cy="208" rx="108" ry="13" fill="#D9CCEB"/><rect x="36" y="140" width="168" height="66" rx="16" fill="#D9CCEB"/><rect x="54" y="98" width="132" height="50" rx="14" fill="#F6D5DA"/><path d="M54 112c10 12 18 12 24 0 8 14 16 14 24 0 8 14 16 14 24 0 8 14 16 14 24 0 6 10 12 10 18 0v-6H54z" fill="#FBF5EC"/><path d="M40 158c12 12 20 12 28 0 9 14 19 14 28 0 9 14 19 14 28 0 9 14 19 14 28 0 9 14 18 14 28 0" fill="none" stroke="#FBF5EC" stroke-width="9" stroke-linecap="round"/><g fill="#B7C4A8"><ellipse cx="62" cy="188" rx="10" ry="5" transform="rotate(-20 62 188)"/><ellipse cx="178" cy="188" rx="10" ry="5" transform="rotate(20 178 188)"/></g><circle cx="120" cy="190" r="7" fill="#C98B97"/>${candle(90, '#C98B97')}${candle(120, '#B7C4A8')}${candle(150, '#C98B97')}</svg>`;

  const screens = [
    { id: 'welcome', gate: true, intro: true,
      html: () => `<h1>${esc(S.welcome.title)}</h1><p class="hand">${esc(S.welcome.tagline)}</p><button class="env" aria-label="Buka amplop"><i class="eb"></i><i class="ec"><em>Untuk ${esc(S.name)}</em></i><i class="ef"></i><i class="el"></i><i class="seal">&hearts;</i></button><p class="hint">${esc(S.welcome.hint)}</p>`,
      init(el) {
        const e = $('.env', el);
        e.onclick = async () => { if (e.classList.contains('open')) return; e.classList.add('open'); play(); await wait(1900); api.unlock('welcome'); api.go(1); };
      } },

    { id: 'birthday', gate: true,
      html: () => `<h2>${esc(S.birthday.title)}</h2>${CAKE}<p class="ask">${esc(S.birthday.ask)}</p><button class="solid blow">${esc(S.birthday.button)}</button>`,
      init(el) {
        const cs = [...el.querySelectorAll('.candle')]; let out = 0;
        const snuff = c => {
          if (c.classList.contains('out')) return;
          c.classList.add('out');
          if (++out === cs.length) setTimeout(() => { $('.ask', el).textContent = S.birthday.done; $('.blow', el).style.visibility = 'hidden'; pop(); api.unlock('birthday'); }, 350);
        };
        cs.forEach(c => { c.onclick = () => snuff(c); c.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); snuff(c); } }; });
        $('.blow', el).onclick = () => cs.forEach((c, n) => setTimeout(() => snuff(c), n * 220));
      } },

    { id: 'gallery',
      html: () => `<h2>${esc(S.gallery.title)}</h2><div class="stack">${S.gallery.items.map((m, n) => `<button class="pol" style="--t:${(n % 2 ? 1 : -1) * (1 + n % 3)}deg"><span class="pf"><i class="tape"></i>${img(m.photo)}<b>${esc(m.caption)}</b><small>${esc(m.date || '')}</small></span><span class="pb"><em>${esc(m.note)}</em></span></button>`).join('')}</div><p class="hint">${esc(S.gallery.hint)}</p>`,
      init(el) { el.querySelectorAll('.pol').forEach(p => p.onclick = () => p.classList.toggle('flip')); } },

    { id: 'letter',
      html: () => { const L = S.letter; return `<div class="sheet">${[L.greet, ...L.body, L.sign].map((t, n, a) => `<p class="${n === a.length - 1 ? 'sign' : ''}" style="--n:${n}">${esc(t)}</p>`).join('')}</div>`; } },

    { id: 'bucket',
<<<<<<< HEAD
      html: () => `<h2>${esc(S.bucket.title)}</h2><ul class="list"></ul><form class="add"><input maxlength="60" placeholder="${esc(S.bucket.placeholder)}" aria-label="${esc(S.bucket.placeholder)}"><button class="solid">Tambah</button></form>`,
      init(el) {
        const K = 'a-little-world-for-you', ul = $('.list', el);
=======
      html: () => `<h2>${esc(S.bucket.title)}</h2><ul class="list"></ul><form class="add"><input maxlength="60" placeholder="${esc(S.bucket.placeholder)}" aria-label="${esc(S.bucket.placeholder)}"><button class="solid">Tambah</button><button type="button" class="reset">Reset</button></form>`,
      init(el) {
        const K = 'lw-bucket-v2', ul = $('.list', el);
>>>>>>> 0365fcb9d2e61e8af38ecaa213bfe7a3c0714e1b
        let items = store.get(K, null) || S.bucket.items.map(([t, d]) => ({ t, d }));
        const draw = () => {
          ul.innerHTML = '';
          items.forEach(it => {
            const li = document.createElement('li');
            li.className = it.d ? 'done' : '';
            li.innerHTML = `<button aria-pressed="${it.d}" aria-label="Tandai selesai">${it.d ? '&#9829;' : '&#9825;'}</button><span></span>`;
            li.lastChild.textContent = it.t;
            li.firstChild.onclick = () => { it.d = !it.d; store.set(K, items); draw(); };
            ul.append(li);
          });
        };
        $('.add', el).onsubmit = e => {
          e.preventDefault();
          const i = $('input', el), v = i.value.trim();
          if (v) { items.push({ t: v, d: false }); i.value = ''; store.set(K, items); draw(); }
        };
<<<<<<< HEAD
=======
        $('.reset', el).onclick = () => {
          localStorage.removeItem(K);
          items = S.bucket.items.map(([t, d]) => ({ t, d }));
          draw();
        };
>>>>>>> 0365fcb9d2e61e8af38ecaa213bfe7a3c0714e1b
        draw();
      } },

    { id: 'things', gate: true,
      html: () => `<h2>${esc(S.things.title)}</h2><p class="count"></p><div class="grid">${S.things.items.map((t, n) => `<button class="card" style="--r:${n % 2 ? 1.2 : -1.2}deg"><span class="cf">&#9825;</span><span class="cb">${esc(t)}</span></button>`).join('')}</div>`,
      init(el) {
        const cs = [...el.querySelectorAll('.card')], c = $('.count', el); let n = 0;
        const upd = () => { c.textContent = `${n} dari ${cs.length} terbuka`; }; upd();
        cs.forEach(b => b.onclick = () => { if (b.classList.contains('open')) return; b.classList.add('open'); n++; upd(); if (n === cs.length) api.unlock('things'); });
      } },

    { id: 'finale', dusk: true,
      html: () => { const F = S.finale; return `<div class="reel">${F.moments.map((m, n) => `<div class="moment"><div class="photo" style="--t:${n % 2 ? 2 : -2}deg">${img(m.photo)}</div><p>${esc(m.line)}</p></div>`).join('')}</div><div class="closing"><h2>${esc(F.title)}</h2>${F.body.map(t => `<p class="fp">${esc(t)}</p>`).join('')}<p class="hand">${esc(F.sign)}</p><button class="solid">${esc(F.replay)}</button></div>`; },
      init(el) { $('.closing .solid', el).onclick = () => location.reload(); },
      async enter(el) {
        for (const m of el.querySelectorAll('.moment')) { await wait(500); m.classList.add('on'); await wait(4200); m.classList.remove('on'); await wait(1000); }
        $('.reel', el).remove(); $('.closing', el).classList.add('show'); pop(130);
      } }
  ];

  /* ===== Mesin navigasi ===== */
  const stage = $('#stage'), nextB = $('#next'), backB = $('#back'), bar = $('#bar');
  const secs = screens.map(s => {
    const el = document.createElement('section');
    el.className = 'screen'; el.id = s.id; el.innerHTML = s.html();
    s.init && s.init(el); stage.append(el); return el;
  });
  bar.innerHTML = '<i></i>'.repeat(screens.length);
  const done = new Set(), entered = new Set(); let cur = 0;

  function sync() {
    const s = screens[cur];
    nextB.disabled = cur === screens.length - 1 || (s.gate && !done.has(s.id));
    backB.style.visibility = cur > 1 ? 'visible' : 'hidden';
  }
  function go(n) {
    cur = Math.max(0, Math.min(screens.length - 1, n));
    const s = screens[cur];
    secs.forEach((el, k) => { el.classList.toggle('active', k === cur); el.inert = k !== cur; });
    [...bar.children].forEach((d, k) => d.classList.toggle('on', k <= cur));
    document.body.classList.toggle('intro', !!s.intro);
    document.body.classList.toggle('dusk', !!s.dusk);
    sync();
    if (s.enter && !entered.has(s.id)) { entered.add(s.id); s.enter(secs[cur]); }
  }
  api = { go, unlock: id => { done.add(id); sync(); } };
  nextB.onclick = () => go(cur + 1);
  backB.onclick = () => go(cur - 1);
  go(0);

  /* ===== Kunci countdown ===== */
  const lock = $('#lock'), target = new Date(ST.unlockAt).getTime(), q = new URLSearchParams(location.search);
  const local = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  const bypass = (local && q.has('preview')) || (ST.previewKey && q.get('preview') === ST.previewKey);
  if (Date.now() >= target || bypass) lock.remove();
  else {
    const L = S.lock, gate = on => { $('.app').inert = on; };
    lock.innerHTML = `<h2>${esc(L.title)}</h2><p>${esc(L.text)}</p><div class="cd">${['hari', 'jam', 'menit', 'detik'].map(u => `<div><b>0</b><small>${u}</small></div>`).join('')}</div><p class="hand">${esc(L.hand)}</p>`;
    gate(true);
    const b = [...lock.querySelectorAll('.cd b')], p = n => String(n).padStart(2, '0');
    const tick = () => {
      const s = Math.floor((target - Date.now()) / 1000);
      if (s <= 0) { clearInterval(t); gate(false); lock.classList.add('gone'); setTimeout(() => lock.remove(), 1400); pop(); return; }
      [Math.floor(s / 86400), p(Math.floor(s % 86400 / 3600)), p(Math.floor(s % 3600 / 60)), p(s % 60)].forEach((v, k) => { b[k].textContent = v; });
    };
    const t = setInterval(tick, 1000); tick();
  }
})();
