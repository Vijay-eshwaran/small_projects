import { cart, saveToStorage } from "../../data/cart.js";
import { getProduct } from "../../data/products.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js"
import { rendorOrderSummary } from "./orderSummary.js";
import { orders, saveToStorageOrder,renderOrders} from "../../data/orders.js";
// import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const totalprice=0;

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

          <a href="orders.html">
          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
          </a>
    `

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;


  document.querySelector('.js-place-order').addEventListener('click', () => {


    cart.forEach( (cartItem) => {
      orders.push(cartItem);
    })
    cart.splice(0, cart.length);
    saveToStorage();
    saveToStorageOrder();

    console.log(orders);

    rendorOrderSummary();
    rendorPaymentSummary();

    renderOrders();

    orders.splice(0, orders.length);
    
  });
}
