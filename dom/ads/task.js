const rotateEls = document.querySelectorAll('.rotator__case');
let speed = 1000;

function rotate () {
  rotateEls.forEach(el => {
    el.classList.remove('rotator__case_active');
  });
  const currentEl = rotateEls[Math.round(Math.random()*(rotateEls.length-1))];
  currentEl.classList.add('rotator__case_active');
  currentEl.style.color = currentEl.dataset.color;
  speed = currentEl.dataset.speed;
  setTimeout(rotate, speed);
}

rotate();