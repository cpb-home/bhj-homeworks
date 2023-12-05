const taskDivs = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  taskDivs.forEach(el => {
    const {top, bottom} = el.getBoundingClientRect();

    if (bottom < 0 || top > window.innerHeight) {
      el.classList.remove('reveal_active');
    } else {
      el.classList.add('reveal_active');
    }
  });
})
