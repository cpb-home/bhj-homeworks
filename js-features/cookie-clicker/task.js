const cook = document.getElementById('cookie');


cook.onclick = function() {
  const counterSpan = document.getElementById('clicker__counter');
  let counter = Number(counterSpan.textContent);
  counterSpan.textContent = ++counter;

  cook.width = counter % 2 === 0 ? cook.width + 20 : cook.width - 20;
};