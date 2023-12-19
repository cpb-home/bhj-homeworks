const 
  textarea = document.getElementById('editor'),
  resetArea = document.querySelector('.resetArea'),
  resetStorage = document.querySelector('.resetStorage'),
  cardMessage = document.querySelector('.cardMessage'),
  LS = window.localStorage;

if (LS.hasOwnProperty('textEditor')) {
  const textArr = JSON.parse(LS.textEditor);
  textarea.value = textArr.join('\n');
}

resetStorage.addEventListener('click', () => {
  const confirmation = confirm('Вы точно хотите удалить сохранённый текст? Это действие нельзя будет отменить.');
  if (confirmation) {
    LS.removeItem('textEditor');
    setMessage(true, 'Сохранённый текст удалён!');
  } else {
    setMessage(false, 'Удаление текста не подтверждено!');
  }
});

resetArea.addEventListener('click', () => {
  const confirmation = confirm('Вы точно хотите очистить поле?');
  if (confirmation) {
    textarea.value = '';
    textarea.focus();
    setMessage(true, 'Поле ввода очищено!');
  } else {
    setMessage(false, 'Очистка поля не была подтверждена!');
  }
});

textarea.addEventListener('input', () => {
  if (LS.hasOwnProperty('textEditor')) {
    LS.textEditor = makeText(textarea.value);
  } else {
    LS.setItem('textEditor', makeText(textarea.value));
  }
});

function setMessage(result, message) {
  if (result) {
    cardMessage.style.color = 'green';
    cardMessage.textContent = message;
    setTimeout(function() {
      cardMessage.textContent = '';
    }, 2000);
  } else {
    cardMessage.style.color = 'red';
    cardMessage.textContent = message;
    setTimeout(function() {
      cardMessage.textContent = '';
    }, 2000);
  }
}

function makeText(text) {
  let arrOfText = text.split('\n');
  return JSON.stringify(arrOfText);
}