import { formatCurrency } from "../scripts/utils/money.js"

console.log('test suite: formatCurrency');

console.log('normal test case');
if (formatCurrency(2000) === '2000.00'){
    console.log('passed');
}
else{
    console.log('failed');
}

console.log('entering zero test case');
if (formatCurrency(0) === '0.00'){
    console.log('passed');
}
else{
    console.log('failed');
}

console.log('entering decimal test case');
if (formatCurrency(10.00) === '10.00'){
    console.log('passed');
}
else{
    console.log('failed');
}