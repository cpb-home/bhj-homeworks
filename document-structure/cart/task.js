const products = document.querySelectorAll('.product');
const cartProducts = document.querySelector('.cart__products');
const cart = document.querySelector('.cart');

checkCartInner() ? cart.style.display = 'block': cart.style.display = 'none';

products.forEach(product => {
  product.addEventListener('click', event => cartControl(product, event));
});

function cartControl(product, event) {
  const currentQuantityEl = product.querySelector('.product__quantity-value');
  let currentQuantity = Number(currentQuantityEl.textContent);
  if (event.target.classList.contains('product__add')) {
    addToCart(product, currentQuantity);
  } else if (event.target.classList.contains('product__quantity-control_dec')) {
    currentQuantity > 0 ? currentQuantity -= 1 : currentQuantity;

  } else if (event.target.classList.contains('product__quantity-control_inc')) {
    currentQuantity += 1;
  }
  currentQuantityEl.textContent = currentQuantity;
}

function addToCart(product, currentQuantity) {
  const itemId = product.dataset.id;
  const cartProductsList = Array.from(cartProducts.querySelectorAll('.cart__product'));

  if (cartProductsList.find(prod => prod.dataset.id === product.dataset.id)) {
    addMore(itemId, currentQuantity);
  } else {
    if (currentQuantity != 0) {
      const itemSrc = product.querySelector('.product__image').src;

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
      cartDeleteBtn.onclick = (e) => deleteFromCart(e);

      cartDeleteBtnCont.appendChild(cartDeleteBtn);
      cartProduct.appendChild(cartProductImg);
      cartProduct.appendChild(cartProductCount);
      cartProduct.appendChild(cartDeleteBtnCont);

      cart.style.display = 'block'
      cartProducts.appendChild(cartProduct);
    }
  }


  //console.log(itemId, itemImg);
}

function checkCartInner() {
  return document.querySelectorAll('.cart__product').length > 0;
}

function deleteFromCart(e) {
  const prods = document.querySelectorAll('.cart__product');
  prods.forEach(product => {
    if (product.dataset.id == e.target.value) {
      product.remove();
      checkCartInner() ? cart.style.display = 'block': cart.style.display = 'none';
    }
  });
}

function addMore(itemId, currentQuantity) {
  const prods = document.querySelectorAll('.cart__product');
  prods.forEach(product => {
    const quantityEl = product.querySelector('.cart__product-count');
    if (product.dataset.id == itemId) {
      quantityEl.textContent = Number(quantityEl.textContent) + currentQuantity;
    }
  });
}