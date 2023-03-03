import request from 'supertest'
const chance = require('chance').Chance()

function createService(vendorId) {
    return request(process.env.BASE_URL)
        .post('/v5/service')
        .set('Authorization', process.env.TOKEN)
        .send({
            name: `service_${Date.now()}`,
            vendor: vendorId,
            vendorPrice: chance.integer({min: 100, max: 999}),
            clientPrice: chance.integer({min: 100, max: 999})
        })
}

function getAll() {
    return request(process.env.BASE_URL)
        .post('/v5/service/search')
        .set('Authorization', process.env.TOKEN)
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




export {createService, getAll, getSingleById, getSingleByName }
