(() => {
  const C = window.CONTENT, lock = document.getElementById('lock');
  const target = new Date(C.unlockAt).getTime();
  const gate = on => { document.getElementById('stage').inert = on; document.querySelector('.nav').inert = on; };

  if (Date.now() >= target || new URLSearchParams(location.search).has('preview')) { lock.remove(); return; }
  gate(true);

  const pad = n => String(n).padStart(2, '0');
  const set = (k, v) => { document.getElementById('cd-' + k).textContent = v; };
  let timer;
  function open() {
    clearInterval(timer);
    gate(false);
    lock.classList.add('gone');
    setTimeout(() => lock.remove(), 1400);
    if (window.confetti) confetti({ particleCount: 100, spread: 80, origin: { y: .5 }, colors: ['#F6D5DA', '#D9CCEB', '#B7C4A8', '#C98B97'] });
  }
  function tick() {
    const s = Math.floor((target - Date.now()) / 1000);
    if (s <= 0) return open();
    set('d', Math.floor(s / 86400)); set('h', pad(Math.floor(s % 86400 / 3600)));
    set('m', pad(Math.floor(s % 3600 / 60))); set('s', pad(s % 60));
  }
  tick();
  timer = setInterval(tick, 1000);
})();
