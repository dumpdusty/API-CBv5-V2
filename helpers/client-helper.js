import request from 'supertest'
const chance = require('chance').Chance()

function createClient(){
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
        .send({limit: 500})
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

function updateClient(clientId){
    return request(process.env.BASE_URL)
        .patch('client/' + clientId)
        .set('Authorization', process.env.TOKEN)
        .send({name: 'updatedClient', phone: 'updatedPhone'})
}
function deleteClient(clientId){
    return request(process.env.BASE_URL)
        .delete('client/' + clientId)
        .set('Authorization', process.env.TOKEN)
}

export { createClient, getAll, getSingle, getByName, updateClient, deleteClient }
