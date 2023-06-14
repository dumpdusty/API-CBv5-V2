import request from "supertest";
import * as clientHelper from "./client-helper";
import * as vendorHelper from "./vendor-helper";
import * as serviceHelper from "./service-helper";

const chance = require('chance').Chance()

class OrderHelper {
    async createOrder(clientId, serviceId) {
        return request(process.env.BASE_URL)
            .post('/v5/order')
            .set('Authorization', process.env.TOKEN)
            .send({
                client: {
                    _id: clientId
                },
                service: {
                    _id: serviceId
                },
                clientPrice: chance.integer({min: 100, max: 999}),
                clientPaid: chance.integer({min: 100, max: 999}),
                vendorPrice: chance.integer({min: 100, max: 999}),
                vendorPaid: chance.integer({min: 100, max: 999})
            })
    }

    async getAll() {
        return request(process.env.BASE_URL)
            .post('/v5/order/search')
            .set('Authorization', process.env.TOKEN)
    }

    async getOrderById(orderId){
        return request(process.env.BASE_URL)
            .get('/v5/order/' + orderId)
            .set('Authorization', process.env.TOKEN)
    }

    async deleteOrder(orderId) {
        return request(process.env.BASE_URL)
            .delete('/v5/order/' + orderId)
            .set('Authorization', process.env.TOKEN)
    }

    async createTestOrder() {
        const clientId = (await clientHelper.createClient()).body.payload
        const vendorId = (await vendorHelper.createVendor()).body.payload
        const serviceId = (await serviceHelper.createService(vendorId)).body.payload
        return request(process.env.BASE_URL)
            .post('/v5/order')
            .set('Authorization', process.env.TOKEN)
            .send({
                client: {
                    _id: clientId
                },
                service: {
                    _id: serviceId
                },
                clientPrice: chance.integer({min: 100, max: 999}),
                clientPaid: chance.integer({min: 100, max: 999}),
                vendorPrice: chance.integer({min: 100, max: 999}),
                vendorPaid: chance.integer({min: 100, max: 999})
            })
    }
}

export default new OrderHelper()