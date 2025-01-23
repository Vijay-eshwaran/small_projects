import { cart, saveToStorage } from "../../data/cart.js";
import { getProduct } from "../../data/products.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js"

export function rendorPaymentSummary() {

  let productPrice = 0;
  let shippingPrice = 0;

  cart.forEach((cartItem) => {

    const product = getProduct(cartItem.productId);
    productPrice += product.price * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPrice += deliveryOption.price;

  })

  const totalBeforeTax = productPrice + shippingPrice;
  const tax = totalBeforeTax * 0.1;
  const totalprice = totalBeforeTax + tax;

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });


  const paymentSummaryHtml = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">₹${formatCurrency(productPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${formatCurrency(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">₹${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${formatCurrency(totalprice)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;


  document.querySelector('.js-place-order').addEventListener('click', () => {

    cart = [];
    
  })


//   document.querySelector('.button-primary').addEventListener('click', () => {
//     if (cart.length == 0) {
//       alert('Cart is empty');
//       return;
//     }
//     document.querySelector('.js-order-summary').innerHTML = `
//     <p style="color: #ff6600; font-size: 16px; font-weight: bold;">Cart is empty</p>
//     <a href="amazon.html" style="color: #0066cc; font-size: 14px; margin-top: 10px; display: inline-block;">
//         BUY MORE...
//     </a>
// `;
//     document.querySelector('.js-payment-summary').innerHTML = `
//     <span style="color: #666; font-size: 14px; font-family: Arial, sans-serif; text-align: center; display: inline-block;">
//         Shop now
//     </span>
// `;

//     cart.splice(0, cart.length);
//     saveToStorage();
    
//   })
}