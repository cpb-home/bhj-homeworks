const controlsBlock = document.querySelector('.book__controls');
const reader = document.getElementById('book');
let currentControl;
let addClass = '';
let classes = [];
let currentClasses = reader.classList;

controlsBlock.addEventListener('click', event => {
  event.preventDefault();
  currentControl = event.currentTarget;

  if (event.target.closest('.book__control_font-size')) {
    currentControl.querySelectorAll('a').forEach(el => {
      el.classList.remove('font-size_active');
      if (event.target.dataset.size) {
        addClass = 'book_fs-' + event.target.dataset.size;
      }
      
      currentClasses.forEach(elem => {
        if (!elem.includes('book_fs')) classes.push(elem);
      });
      
    });
    event.target.classList.add('font-size_active');
  } else if (event.target.closest('.book__control_color')) {
      currentControl.querySelectorAll('a').forEach(el => {
      el.classList.remove('color_active');
      if (event.target.dataset.textColor) {
        addClass = 'book_color-' + event.target.dataset.textColor;
      }
      
      currentClasses.forEach(elem => {
        if (!elem.includes('book_color-')) classes.push(elem);
      });
    });
    event.target.classList.add('color_active');
  } else if (event.target.closest('.book__control_background')) {
    currentControl.querySelectorAll('a').forEach(el => {
      el.classList.remove('color_active');
      if (event.target.dataset.bgColor) {
        addClass = 'book_bg-' + event.target.dataset.bgColor;
      }
      
      currentClasses.forEach(elem => {
        if (!elem.includes('book_bg-')) classes.push(elem);
      });
    });
    event.target.classList.add('color_active');
  }

  if (addClass != '') {
    classes.push(addClass);
  }

  reader.className = classes.join(' ');
  classes = [];
  addClass = '';
});