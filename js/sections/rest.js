(() => {
  const C = window.CONTENT, $ = s => document.querySelector(s);
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };

  // 3. Galeri
  C.memories.forEach((m, n) => {
    const p = el('button', 'pol');
    p.style.setProperty('--tilt', (n % 2 ? 1 : -1) * (1 + n % 3) + 'deg');
    const img = m.photo
      ? `<img src="assets/images/memories/${m.photo}" alt="${m.caption}" onerror="this.outerHTML='<div class=ph></div>'">`
      : '<div class="ph"></div>';
    p.innerHTML = `<span class="pf"><span class="tape"></span>${img}<b>${m.caption}</b><small>${m.date}</small></span><span class="pb"><em>${m.note}</em></span>`;
    p.onclick = () => p.classList.toggle('flip');
    $('#stack').append(p);
  });

  // 4. Surat
  $('#sheet').append(el('p', 'greet', C.letter.greet), ...C.letter.body.map(t => el('p', '', t)), el('p', 'sign', C.letter.sign));

  // 5. Bucket list (tersimpan di perangkat)
  let items; try { items = JSON.parse(localStorage.getItem('lw-bucket')); } catch {}
  items = items || C.bucket.map(([t, d]) => ({ t, d }));
  const save = () => { try { localStorage.setItem('lw-bucket', JSON.stringify(items)); } catch {} };
  const draw = () => {
    const ul = $('#bucketList'); ul.innerHTML = '';
    items.forEach(it => {
      const li = el('li', it.d ? 'done' : '', `<button aria-pressed="${it.d}" aria-label="Tandai selesai">${it.d ? '&#9829;' : '&#9825;'}</button><span></span>`);
      li.querySelector('span').textContent = it.t;
      li.firstChild.onclick = () => { it.d = !it.d; save(); draw(); };
      ul.append(li);
    });
  };
  $('#add').onsubmit = e => {
    e.preventDefault();
    const v = $('#addIn').value.trim();
    if (v) { items.push({ t: v, d: false }); $('#addIn').value = ''; save(); draw(); }
  };
  draw();

  // 6. Hal-hal kecil
  let opened = 0; const total = C.things.length, cnt = $('#count');
  cnt.textContent = `0 dari ${total} terbuka`;
  C.things.forEach((t, n) => {
    const c = el('button', 'card', `<span class="cf">&#9825;</span><span class="cb"></span>`);
    c.querySelector('.cb').textContent = t;
    c.style.setProperty('--r', (n % 2 ? 1.2 : -1.2) + 'deg');
    c.onclick = () => {
      if (c.classList.contains('open')) return;
      c.classList.add('open');
      cnt.textContent = `${++opened} dari ${total} terbuka`;
      if (opened === total) App.unlock('things');
    };
    $('#cards').append(c);
  });

  // 7. Penutup
  const re = el('button', 'btn', 'Putar ulang'); re.onclick = () => location.reload();
  $('#fin').append(el('h2', '', C.final.title), ...C.final.body.map(t => el('p', 'fp', t)), el('p', 'hand', C.final.sign), re);

  // Animasi saat layar dibuka (sekali saja)
  const seen = {};
  document.addEventListener('screen', e => {
    const id = e.detail;
    document.body.classList.toggle('dusk', id === 'finale');
    if (!window.gsap || seen[id]) return;
    if (id === 'letter') { seen[id] = 1; gsap.from('#sheet p', { opacity: 0, y: 10, stagger: .7, duration: .9, delay: .4 }); }
    if (id === 'finale') {
      seen[id] = 1;
      gsap.from('#fin > *', { opacity: 0, y: 14, stagger: 1.1, duration: 1.4, delay: .6 });
      if (window.confetti) setTimeout(() => confetti({ particleCount: 140, spread: 90, origin: { y: .5 }, colors: ['#F6D5DA', '#D9CCEB', '#B7C4A8', '#C98B97'] }), 4200);
    }
  });
})();
