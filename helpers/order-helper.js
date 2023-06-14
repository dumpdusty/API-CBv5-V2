import request from "supertest";
import * as clientHelper from '../helpers/client-helper'
import * as vendorHelper from '../helpers/vendor-helper'
import * as serviceHelper from '../helpers/service-helper'
const chance = require('chance').Chance()

class OrderHelper {
    async createOrder(){
        let vendorId = (await vendorHelper.createVendor()).body.payload
        let serviceId = (await serviceHelper.createService(vendorId)).body.payload
        let clientId = (await clientHelper.createClient()).body.payload

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