(() => {
  const C = window.CONTENT;
  const candles = [...document.querySelectorAll('#birthday .candle')];
  const blow = document.getElementById('blow');
  let out = 0;

  function done() {
    document.getElementById('b-text').textContent = C.birthdayDone;
    blow.hidden = true;
    if (window.confetti) {
      confetti({ particleCount: 110, spread: 75, origin: { y: .6 },
        colors: ['#F6D5DA', '#D9CCEB', '#B7C4A8', '#C98B97', '#FBF5EC'] });
    }
    App.unlock('birthday');
  }
  function snuff(c) {
    if (c.classList.contains('out')) return;
    c.classList.add('out');
    if (++out === candles.length) setTimeout(done, 350);
  }
  candles.forEach(c => {
    c.addEventListener('click', () => snuff(c));
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); snuff(c); } });
  });
  blow.addEventListener('click', () => candles.forEach((c, n) => setTimeout(() => snuff(c), n * 220)));
})();
