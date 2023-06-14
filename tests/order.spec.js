import {expect} from 'chai'
import orderHelper from "../helpers/order-helper";
import * as vendorHelper from "../helpers/vendor-helper";
import * as serviceHelper from "../helpers/service-helper";
import * as clientHelper from "../helpers/client-helper";


describe('Orders', () => {
    describe('Create order', () => {
        let res, serviceId, clientId
        before(async () => {
            clientId = (await clientHelper.createClient()).body.payload
            let vendorId = (await vendorHelper.createVendor()).body.payload
            serviceId = (await serviceHelper.createService(vendorId)).body.payload

            res = await orderHelper.createOrder(clientId, serviceId)
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

    describe('Get all orders', () => {
        let res
        before(async() =>{
            res = await orderHelper.getAll()
        })
        it('check response status', () => {
            expect(res.statusCode).to.eq(200)
        });
        it('check the response contains array', () => {
            expect(res.body.payload.items).to.be.a('array')
        })
        it('check the array elements has id', () => {
            let clientsList = res.body.payload.items
            for (let i = 0; i < clientsList.length; i++) {
                expect(clientsList[i]).has.property('_id')
            }
        })
    });

    describe('Delete order', () => {
        let res, serviceId, clientId
        before(async() =>{
            clientId = (await clientHelper.createClient()).body.payload
            let vendorId = (await vendorHelper.createVendor()).body.payload
            serviceId = (await serviceHelper.createService(vendorId)).body.payload
           const orderId = (await orderHelper.createOrder(clientId, serviceId)).body.payload
            res = await orderHelper.deleteOrder(orderId)
        })

        it('check response status', () => {
            expect(res.statusCode).to.eq(200)
        });
        it('check the response message', () => {
            expect(res.body.message).to.eq('Order deleted')
        });
    });

    after('delete all orders', async()=>{
        let ordersList
        ordersList = (await orderHelper.getAll()).body.payload.items
        for(let i=0; i<ordersList.length; i++){
            await orderHelper.deleteOrder(ordersList[i]._id)
        }
    })
});