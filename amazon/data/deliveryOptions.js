export function getDeliveryOption(deliveryOptionId) {

    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (deliveryOptionId === option.id) {
            deliveryOption = option;
        }
    })

    return deliveryOption || deliveryOption[0];
}


export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        price: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        price: 20
    },
    {
        id: '3',
        deliveryDays: 1,
        price: 60
    }
]