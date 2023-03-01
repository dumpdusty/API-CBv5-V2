// Automated tests for services
import request from "supertest";
import {expect} from "chai";
import * as vendorHelper from '../helpers/vendor-helper'

describe('Service Tests', () => {
    describe.only('Create a service', () => {
        let res
        let vendorId
        before(async ()=>{
            vendorId = await vendorHelper.createVendor()
            res = await request(process.env.BASE_URL)
                .post('/v5/service')
                .set('Authorization', process.env.TOKEN)
                .send({name:`service_${Date.now()}`, vendor:`63fe9c1ac1c60ba19649b252`, vendorPrice: 222, clientPrice: 444})

            console.log(vendorId.body.payload)
        })

        it('check the status code', () => {
            expect(res.statusCode).to.eq(200)
        });
        it('check status message', () => {
            expect(res.body.message).to.eq('Service created')
        })
    });
});
