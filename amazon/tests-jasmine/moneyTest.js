import { formatCurrency } from "../scripts/utils/money.js"

describe('test suite: formatCurrency', () => {

    it('adding two decimal points', () => {
        expect(formatCurrency(2000)).toEqual('2000.00');
    })

    it('works with zero', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    })

    it('works with deciaml points', () => {
        expect(formatCurrency(10.0)).toEqual('10.00');
    })
})
