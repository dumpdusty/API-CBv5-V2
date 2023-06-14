import request from "supertest";
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
        // let vendorId = (await vendorHelper.createVendor()).body.payload
        // let serviceId = (await serviceHelper.createService(vendorId)).body.payload
        // let clientId = (await clientHelper.createClient()).body.payload
        //
        // request(process.env.BASE_URL)
        //     .post('/v5/order')
        //     .set('Authorization', process.env.TOKEN)
        //     .send({
        //         client: {
        //             _id: clientId
        //         },
        //         service: {
        //             _id: serviceId
        //         },
        //         clientPrice: chance.integer({min: 100, max: 999}),
        //         clientPaid: chance.integer({min: 100, max: 999}),
        //         vendorPrice: chance.integer({min: 100, max: 999}),
        //         vendorPaid: chance.integer({min: 100, max: 999})
        //     })
        return request(process.env.BASE_URL)
            .post('/v5/order/search')
            .set('Authorization', process.env.TOKEN)
    }

    async deleteOrder(orderId) {
        return request(process.env.BASE_URL)
            .delete('/v5/order/' + orderId)
            .set('Authorization', process.env.TOKEN)
    }
}

export default new OrderHelper()