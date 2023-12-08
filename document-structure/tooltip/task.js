const links = document.querySelectorAll('.has-tooltip');
const tip = document.createElement('div');
tip.className = 'tooltip';
tip.style.top = '100%';
tip.style.left = 0;
tip.style.position = 'absolute';
let currentEl;

links.forEach(el => {
  el.insertAdjacentElement('beforeend', tip.cloneNode(true));

  el.addEventListener('click', e => {
    e.preventDefault();
    const allTips = document.querySelectorAll('.tooltip');
    allTips.forEach(elem => {
      elem.classList.remove('tooltip_active');
    });

    const text = el.title;
    const tipChild = el.querySelector('.tooltip');
    if (currentEl == el) {
      tipChild.classList.remove('tooltip_active');
      currentEl = null;
    } else {
      tipChild.classList.add('tooltip_active');
      currentEl = el;
    }
    
    tipChild.textContent = text;
  });
});