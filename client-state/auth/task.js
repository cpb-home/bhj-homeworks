const 
  signInForm = document.getElementById('signin__form'),
  signInBlock = document.getElementById('signin'),
  welcomeBlock = document.getElementById('welcome'),
  login = document.querySelector('[name=login]'),
  pass = document.querySelector('[name=password]'),
  LS = window.localStorage;

let 
  userID,
  exitBtn;

if (LS.hasOwnProperty('userId')) {
  afterAuth(LS.userId);
}

if (signInBlock.classList.contains('signin_active')) {
  signInForm.addEventListener('submit', event => {
    event.preventDefault();

    if (checkFields()) {
      auth();
    } else {
      alert('Должны быть заполнены оба поля');
    }
    
  });
}

function auth() {
  const url = 'https://students.netoservices.ru/nestjs-backend/auth';
  const method = 'POST';
  const xhr = new XMLHttpRequest();
  const formData = new FormData(signInForm);

  xhr.open(method, url);
  xhr.send(formData);

  xhr.onload = () => {
    const reply = JSON.parse(xhr.response);
    if (reply.success) {
      LS.setItem('userId', reply.user_id);
      afterAuth(reply.user_id);
    } else {
      alert('Пользователя с такими данными не существует. Попробуйте снова.');
    }
  };
}

function checkFields() {
  return login.value != '' && pass.value != '';
}

function afterAuth(user_id) {
  signInBlock.classList.remove('signin_active');
  welcomeBlock.classList.add('welcome_active');
  userID = document.getElementById('user_id');
  userID.textContent = user_id;
  exitBtn = document.querySelector('.welcome_out>button');
  if (exitBtn) {
    exitBtn.addEventListener('click', exit);
  }
}

function exit() {
  signInBlock.classList.add('signin_active');
  welcomeBlock.classList.remove('welcome_active');
  LS.removeItem('userId');
  exitBtn.removeEventListener('click', exit);
}