export let cart;

loadFromStorage();


export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [];
}
}

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId,quantity) {

    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    })

    if (matchingItem) {
        matchingItem.quantity+=quantity;
    }
    else {
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1'
        })
    }

    saveToStorage();

}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (productId !== cartItem.productId) {
            newCart.push(cartItem);
        }
    })

    cart = newCart;
    saveToStorage();
}

export function updateDeliveryDate(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}