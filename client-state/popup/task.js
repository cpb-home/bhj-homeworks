//            ВАРИАНТ ЧЕРЕЗ Cookie
const 
  modal = document.querySelector('.modal'),
  modalBtn = modal.querySelector('.modal__close');

const isCook = getCookie('modal');
if (!isCook) {
  modal.classList.add('modal_active');
  modalBtn.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    document.cookie = 'modal=1; max-age=60';
  });
}

function getCookie(name) {
  const allCookies = document.cookie.split(': ');

  if (allCookies.length > 0) {
    const cooka = allCookies.find(c => c.startsWith(name));
    return cooka ? cooka : null;
  }
  return null;
}


//            ВАРИАНТ ЧЕРЕЗ localStorage
/*
const 
  LS = window.localStorage,
  modal = document.querySelector('.modal'),
  modalBtn = modal.querySelector('.modal__close');

if (!LS.hasOwnProperty('modal') || LS.modal === '0') {
  modal.classList.add('modal_active');
  modalBtn.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    LS.setItem('modal', '1');
  });
}
*/

