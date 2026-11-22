(() => {
  const C = window.CONTENT;
  const $ = s => document.querySelector(s);
  const screens = [...document.querySelectorAll('.screen')];
  const next = $('#next'), back = $('#back'), dots = $('#dots'), music = $('#music');
  const unlocked = new Set();
  let i = 0;

  document.querySelectorAll('[data-bind]').forEach(el => { el.textContent = C[el.dataset.bind] || ''; });
  screens.forEach(() => dots.insertAdjacentHTML('beforeend', '<i></i>'));

  // Musik: taruh file di assets/audio/bgm.mp3. Tidak autoplay, mulai setelah amplop diketuk.
  const bgm = new Audio('assets/audio/bgm.mp3');
  bgm.loop = true; bgm.volume = 0.5;
  const paint = () => music.setAttribute('aria-pressed', String(!bgm.paused));
  ['play', 'pause'].forEach(e => bgm.addEventListener(e, paint));
  music.addEventListener('click', () => { bgm.paused ? bgm.play().catch(() => {}) : bgm.pause(); });

  function render() {
    screens.forEach((s, n) => { s.classList.toggle('active', n === i); s.inert = n !== i; });
    [...dots.children].forEach((d, n) => d.classList.toggle('on', n <= i));
    document.body.classList.toggle('intro', i === 0);
    back.style.visibility = i > 1 ? 'visible' : 'hidden';
    const s = screens[i];
    document.dispatchEvent(new CustomEvent('screen', { detail: s.id }));
    next.disabled = i === screens.length - 1 || (s.hasAttribute('data-gate') && !unlocked.has(s.id));
  }

  window.App = {
    go(n) { i = Math.max(0, Math.min(screens.length - 1, n)); render(); },
    unlock(id) { unlocked.add(id); render(); },
    play() { bgm.play().catch(() => {}); }
  };
  next.addEventListener('click', () => App.go(i + 1));
  back.addEventListener('click', () => App.go(i - 1));
  render();
})();
