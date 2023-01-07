import request from 'supertest'
const chance = require('chance').Chance()

function create(){
    return request(process.env.BASE_URL)
        .post('client')
        .set('Authorization', process.env.TOKEN)
        .send({
            name: chance.name(),
            phone: chance.phone(),
            email: chance.email()
        })
}

export { create }
