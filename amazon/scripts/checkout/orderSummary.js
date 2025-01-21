import { cart, removeFromCart, updateDeliveryDate } from "../../data/cart.js";
import { getProduct } from "../../data/products.js"
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js"
import { rendorPaymentSummary } from "./paymentSummary.js";


export function rendorOrderSummary() {

  let cartSummaryHtml = ``;

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <!--<span class="update-quantity-link link-primary">
                    Update
                  </span>-->
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${cartItem.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHtml(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
    `;
  });

  function deliveryOptionsHtml(matchingProduct, cartItem) {

    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.price === 0 ? 'FREEE' : `₹${deliveryOption.price}`

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>
    `
    })
    return html;
  }



  document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      if(cart.length === 0) { 
        document.querySelector('.js-order-summary').innerHTML = `
        <div class="cart-item-container">
            <div class="cart-item-details-grid">
              <div class="cart-item-details">
                <div class="product-name">
                  Cart is Empty
                </div>
              </div>              
            </div>
          </div>
        `
    }
      rendorPaymentSummary();
    })
  });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryDate(productId, deliveryOptionId);
        rendorOrderSummary();
        rendorPaymentSummary();
      })
    })

    if(cart.length === 0) { 
        document.querySelector('.js-order-summary').innerHTML = `
        <div class="cart-item-container">
            <div class="cart-item-details-grid">
              <div class="cart-item-details">
                <div class="product-name">
                  Cart is Empty
                </div>
              </div>              
            </div>
          </div>
        `
    }


}


