// сразу предусмотрим пункт 3 задания - на случай нескольких кнопок и соберём всех родителей для делегирования:
const menuBlock = document.querySelectorAll('.dropdown');

// перебираем каждого родителя и в нём берём кнопку и меню
menuBlock.forEach(element => {
  const button = element.querySelector('.dropdown__value');
  const list = element.querySelector('.dropdown__list');

  // слушатель на кнопку
  button.addEventListener('click', e => {
    list.classList.toggle('dropdown__list_active');
  });
  
  // слушатель на меню и пользуемся погружением, получая нажатый пункт меню
  list.addEventListener('click', e => {
    e.preventDefault();
    button.textContent = e.target.textContent;
    list.classList.remove('dropdown__list_active');
  });
});