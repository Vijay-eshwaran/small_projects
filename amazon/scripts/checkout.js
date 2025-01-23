import { rendorOrderSummary } from "./checkout/orderSummary.js";
import { rendorPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/backend-practise.js';
// import '../data/cart-class.js'

new Promise( (resolve) => {
    loadProducts( () => {
        resolve();
    });
}).then( () => {
    rendorOrderSummary();
    rendorPaymentSummary();
})

// loadProducts(() => {
//     rendorOrderSummary();
//     rendorPaymentSummary();
// });
