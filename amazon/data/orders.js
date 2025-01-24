import { getProduct } from "./products.js";
import { getDeliveryOption } from "./deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from './cart.js';   

export let orders;

// function updateCart() {

//     let cartQuantity = 0;
  
//     cart.forEach((cartItem) => {
//       cartQuantity += cartItem.quantity;
//     });

//     if(cartQuantity === 0) {
//         document.querySelector('.js-cart-quantity').textContent = `0`;
//         return;
//     }

//     document.querySelector('.cart-quantity').textContent = cartQuantity;
  
//   }

  // First check if the element exists before trying to update it
function updateCart() {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    const cartQuantityElement = document.querySelector('.cart-quantity');
    if (!cartQuantityElement) {
        return; // Exit if element not found
    }

    cartQuantityElement.textContent = cartQuantity || '0';
}

updateCart();

// updateCart();

loadFromStorageOrder();

export function loadFromStorageOrder() {
    orders = JSON.parse(localStorage.getItem('orders'));

    if (!orders) {
        orders = [];
    }
}

export function saveToStorageOrder() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Move the rendering code inside a function

let producthtml = ``;
let html = ``;
export function renderOrders() {

    updateCart();

    const today = dayjs();
    let totalprice = 0;
    let productPrice = 0;
    let shippingPrice = 0;


    orders.forEach((orderItem) => {

        const productId = orderItem.productId;
        let matchingProduct = getProduct(productId);
        const deliveryOptionId = orderItem.deliveryOptionId;
        let deliveryOption = getDeliveryOption(deliveryOptionId);

        
        productPrice += matchingProduct.price * orderItem.quantity;
        shippingPrice += deliveryOption.price;

        const totalBeforeTax = productPrice + shippingPrice;
        const tax = totalBeforeTax * 0.1;
        totalprice = totalBeforeTax + tax;


        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        producthtml += `
            <div class="product-image-container">
                <img src="${matchingProduct.image}" alt="${matchingProduct.name}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${dateString}
                </div>
                <div class="product-quantity">
                    Quantity: ${orderItem.quantity}
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png" alt="Buy Again Icon">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
        `;
    });


    if(orders.length != 0) {
    html += `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${today.format('MMMM D, YYYY')}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>${totalprice}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
                </div>
            </div>

            <div class="order-details-grid">
                ${producthtml}
            </div>
        </div>
    `;

    document.querySelector(".orders-grid").innerHTML = html;
    }
    else{
        document.querySelector(".orders-grid").innerHTML = `No orders found <br> <br> <a href="amazon.html">Shop Now</a>`;

    }
}

// Wait for DOM to load before rendering
document.addEventListener('DOMContentLoaded', renderOrders);

