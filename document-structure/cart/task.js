const products = document.querySelectorAll('.product');
const cartProducts = document.querySelector('.cart__products');
const cart = document.querySelector('.cart');

loadfromLS();
cart.style.display = checkCartInner() ?  'block': 'none';

products.forEach(product => {
  product.addEventListener('click', event => cartControl(product, event));
});

function cartControl(product, event) {
  const currentQuantityEl = product.querySelector('.product__quantity-value');
  let currentQuantity = Number(currentQuantityEl.textContent);
  if (event.target.classList.contains('product__add')) {
    addToCart(product, currentQuantity);
  } else if (event.target.classList.contains('product__quantity-control_dec')) {
    currentQuantity = currentQuantity > 0 ? currentQuantity - 1 : 0;

  } else if (event.target.classList.contains('product__quantity-control_inc')) {
    currentQuantity += 1;
  }
  currentQuantityEl.textContent = currentQuantity;
}

function addToCart(product, currentQuantity) {
  const itemId = product.dataset.id;
  const cartProductsList = Array.from(cartProducts.querySelectorAll('.cart__product'));

  const existEl = cartProductsList.find(prod => prod.dataset.id === product.dataset.id);
  if (existEl) {
    addMore(existEl, currentQuantity);
    addToLS(itemId, '', currentQuantity);
  } else {
    if (currentQuantity != 0) {
      const itemSrc = product.querySelector('.product__image').src;

      addEls(itemId, itemSrc, currentQuantity);
      addToLS(itemId, itemSrc, currentQuantity);
    }
  }
}

function checkCartInner() {
  return document.querySelectorAll('.cart__product').length > 0;
}

function deleteFromCart(cartProduct) {
  const prods = document.querySelectorAll('.cart__product');
  let ArrProductsLS = JSON.parse(localStorage.cart);

  prods.forEach(product => {
    if (product.dataset.id == cartProduct.dataset.id) {
      product.remove();
      
      ArrProductsLS = ArrProductsLS.filter(productLS => productLS.id != cartProduct.dataset.id);

      if (ArrProductsLS.length === 0) {
        localStorage.removeItem('cart');
      } else {
        localStorage.setItem('cart', JSON.stringify(ArrProductsLS));
      }

      cart.style.display = checkCartInner() ? 'block' : 'none';
    }
  });
}

function addMore(existEl, currentQuantity) {
  let quantityEl = existEl.querySelector('.cart__product-count');
  quantityEl.textContent = Number(quantityEl.textContent) + currentQuantity;
}

function addToLS(itemId, itemSrc, currentQuantity) {
  let arrLS = localStorage.cart ? JSON.parse(localStorage.cart) : [];

  const alreadyInCart = arrLS.findIndex(el => el.id == itemId);
  if (alreadyInCart != -1) {
    arrLS[alreadyInCart].quantity += 1;
  } else {
    arrLS.push({id: itemId, img: itemSrc, quantity: currentQuantity});
  }
  
  localStorage.setItem('cart', JSON.stringify(arrLS));
}

function loadfromLS() {
  if (localStorage.cart) {
    const arrLS = JSON.parse(localStorage.cart);

    arrLS.forEach(el => {
      addEls(el.id, el.img, el.quantity);
    });
  }
}

function addEls(itemId, itemSrc, currentQuantity) {
  const 
    cartProduct = document.createElement('div'),
    cartProductImg = document.createElement('img'),
    cartProductCount = document.createElement('div'),
    cartDeleteBtnCont = document.createElement('div'),
    cartDeleteBtn = document.createElement('button');

  cartProduct.className = 'cart__product';
  cartProduct.dataset.id = itemId;
  cartProductImg.className = 'cart__product-image';
  cartProductImg.src = itemSrc;
  cartProductCount.className = 'cart__product-count';
  cartProductCount.textContent = currentQuantity;
  cartDeleteBtnCont.className = 'cart__product__buttonCont';
  cartDeleteBtn.value = itemId;
  cartDeleteBtn.textContent = 'Удалить';
  cartDeleteBtn.addEventListener('click', () => deleteFromCart(cartProduct));

  cartDeleteBtnCont.append(cartDeleteBtn);
  cartProduct.append(cartProductImg);
  cartProduct.append(cartProductCount);
  cartProduct.append(cartDeleteBtnCont);

  cart.style.display = 'block'
  cartProducts.append(cartProduct);
}