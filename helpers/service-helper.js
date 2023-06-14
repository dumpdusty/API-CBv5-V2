import request from 'supertest'
const chance = require('chance').Chance()
import * as vendorHelper from '../helpers/vendor-helper'


async function createService() {
    let vendorId = (await vendorHelper.createVendor()).body.payload
    return request(process.env.BASE_URL)
        .post('/v5/service')
        .set('Authorization', process.env.TOKEN)
        .send({
            name: 'BUBUBU', //`service_${Date.now()}`,
            vendor: vendorId,
            vendorPrice: chance.integer({min: 100, max: 999}),
            clientPrice: chance.integer({min: 100, max: 999})
        })
}

function getAll() {
    return request(process.env.BASE_URL)
        .post('/v5/service/search')
        .set('Authorization', process.env.TOKEN)
        .send({limit:50})
}

function getSingleById(serviceId) {
    return request(process.env.BASE_URL)
        .get(`/v5/service/`+ serviceId)
        .set('Authorization', process.env.TOKEN)
}

function getSingleByName(serviceName) {
    return request(process.env.BASE_URL)
        .post(`/v5/service/search`)
        .set('Authorization', process.env.TOKEN)
        .send({name: serviceName})
}

function updateService(serviceId, vendorId) {
    return request(process.env.BASE_URL)
        .patch(`/v5/service/` + serviceId)
        .set('Authorization', process.env.TOKEN)
        .send({service: serviceId, vendor: vendorId, clientPrice: 121, vendorPrice: 232})
}

function deleteService(serviceId) {
    return request(process.env.BASE_URL)
        .delete(`/v5/service/` + serviceId)
        .set('Authorization', process.env.TOKEN)
}




export {createService, getAll, getSingleById, getSingleByName, updateService, deleteService }
