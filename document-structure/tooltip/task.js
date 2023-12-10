const links = document.querySelectorAll('.has-tooltip');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    removeAllTips();
    const linkPosition = link.getBoundingClientRect();

    const tip = document.createElement('div');
    tip.className = 'tooltip';
    tip.style.top = linkPosition.bottom + 'px';
    tip.style.left = linkPosition.left + 'px';
    tip.style.position = 'absolute';
    tip.textContent = link.title;
    link.insertAdjacentElement('afterend', tip);

    tip.style.display = "block";
  });
});

function removeAllTips() {
  const allTips = document.querySelectorAll('.tooltip');
  allTips.forEach(el => el.remove());
}