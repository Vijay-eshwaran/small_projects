import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';

updateCart();

let productsHtml = '';
let search = '';

document.querySelector('.search-button').addEventListener('click', () => {
  search = document.querySelector('.search-bar').value; 
  

  productsHtml = '';
  renderProducts();
});

document.querySelector('.search-bar').addEventListener("keydown", (event) => {
  if(event.key === 'Enter') {
    search = document.querySelector('.search-bar').value;
    productsHtml = '';
    renderProducts();
  }
});

renderProducts();



function renderProducts() {

  document.querySelector('.js-products-grid').innerHTML = '';

  products.forEach((product) => {

    if (product.keywords.includes(search) || search === '') {

      productsHtml += `
      <div class="product-container">
            <div class="product-image-container">
              <img
                class="product-image"
                src="${product.image}"
              />
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img
                class="product-rating-stars"
                src="${product.getStarsUrl()}"
              />
              <div class="product-rating-count link-primary">${product.rating.count
        }</div>
            </div>
  
            <div class="product-price">${product.getPrice()}</div> 
  
            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            ${product.extraInfoHtml()}
  
            <div class="product-spacer"></div>
            
            <div class="added-to-cart">
              <img src="images/icons/checkmark.png" />
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">Add to Cart</button>
          </div>
      `;
    }
  });


  document.querySelector('.js-products-grid').innerHTML = productsHtml;

  document.querySelectorAll('.js-add-to-cart').forEach(
    (button) => {
  
      button.addEventListener('click', () => {
  
        const productId = button.dataset.productId;
        const quantitySelect = button.parentElement.querySelector('select');
        const quantity = Number(quantitySelect.value);
  
        button.textContent = 'Added ✅';
        setTimeout(() => {
          button.textContent = 'Add to Cart';
        }, 1000);
  
        addToCart(productId, quantity);
        updateCart();
      })
    }
  )

}


function updateCart() {

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').textContent = cartQuantity;

}


// document.querySelectorAll('.js-add-to-cart').forEach(
//   (button) => {

//     button.addEventListener('click', () => {

//       console.log('Add to cart button clicked');

//       const productId = button.dataset.productId;
//       const quantitySelect = button.parentElement.querySelector('select');
//       const quantity = Number(quantitySelect.value);

//       addToCart(productId, quantity);
//       updateCart(quantity);
//     })
//   }
// )




