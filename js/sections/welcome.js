(() => {
  const btn = document.getElementById('envelope');
  const finish = () => { App.unlock('welcome'); App.go(1); };
  btn.addEventListener('click', () => {
    if (btn.dataset.open) return;
    btn.dataset.open = 1;
    btn.style.animation = 'none';
    App.play();
    if (!window.gsap) return finish();
    gsap.timeline({ onComplete: finish })
      .to('.seal', { opacity: 0, scale: .6, duration: .3 })
      .to('.env-flap', { rotationX: 180, duration: .7, ease: 'power2.inOut' }, '<')
      .set('.env-flap', { zIndex: 0 }, '-=.35')
      .to('.env-card', { yPercent: -62, duration: .8, ease: 'power2.out' })
      .to({}, { duration: .8 });
  });
})();
