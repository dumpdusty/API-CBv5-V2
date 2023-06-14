import {expect} from 'chai'
import orderHelper from "../helpers/order-helper";


describe('Orders', () => {
    describe('Create order', () => {
        let res
        before(async () => {
            res = await orderHelper.createOrder()
        })
        it('check response status', () => {
            expect(res.statusCode).to.eq(200)
        });
        it('check the response message', () => {
            expect(res.body.message).to.eq('Order created')
        });
        it('response order id', () => {
            expect(res.body.payload).to.be.a('string')
        });
    });
});