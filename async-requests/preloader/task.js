const loader = document.getElementById('loader');
const itemsDiv = document.getElementById('items');
loader.classList.remove('loader_active');
const LS = window.localStorage;
if (LS.hasOwnProperty('currencyRate')) {
  const objFromLS =  JSON.parse(LS.getItem('currencyRate'));
  for (key in objFromLS) {
    createItem(key, objFromLS[key]);
  }
}

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === this.OPENED) {
    loader.classList.add('loader_active');
  }
  if (xhr.readyState === this.DONE) {
    loader.classList.remove('loader_active');
    const newData = JSON.parse(xhr.response);
    const newLSObj = {};
    itemsDiv.textContent = '';
    for (currency in newData.response.Valute) {
      currentCharcode = newData.response.Valute[currency].CharCode;
      currentValue = newData.response.Valute[currency].Value;
      newLSObj[currentCharcode] = currentValue;
      createItem(currentCharcode, currentValue);
    }
    delete window.localStorage.currencyRate;
    LS.currencyRate = JSON.stringify(newLSObj);
  }
};

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.send();

function createItem(code, value) {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'item';

  const itemCodeDiv = document.createElement('div');
  itemCodeDiv.className = 'item__code';
  itemCodeDiv.textContent = code;
  
  const itemValueDiv = document.createElement('div');
  itemValueDiv.className = 'item__value';
  itemValueDiv.textContent = value + ' ';

  const currencyDiv = document.createElement('div');
  currencyDiv.className = 'item__currency';
  currencyDiv.textContent = 'руб.'

  itemDiv.append(itemCodeDiv);
  itemDiv.append(itemValueDiv);
  itemDiv.append(currencyDiv);
  itemsDiv.append(itemDiv);
}