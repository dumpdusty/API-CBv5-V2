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
function getAll(){
    return request(process.env.BASE_URL)
        .post('client/search')
        .set('Authorization', process.env.TOKEN)
}

function getSingle(clientId){
    return request(process.env.BASE_URL)
        .get('client/' + clientId)
        .set('Authorization', process.env.TOKEN)
}

function getByName(clientName){
    return request(process.env.BASE_URL)
        .post('client/search')
        .set('Authorization', process.env.TOKEN)
        .send({name: clientName})
}

function update(clientId){
    return request(process.env.BASE_URL)
        .patch('client/' + clientId)
        .set('Authorization', process.env.TOKEN)
        .send({name: 'updatedClient', phone: 'updatedPhone'})
}

export { create, getAll, getSingle, getByName, update }
