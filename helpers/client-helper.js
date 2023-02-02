import request from 'supertest'
const chance = require('chance').Chance()

function createClient(){
    return request(process.env.BASE_URL)
        .post('/v5/client')
        .set('Authorization', process.env.TOKEN)
        .send({
            name: 'Client_' + Date.now(),
            phone: chance.phone()
        })
}
function getAll(){
    return request(process.env.BASE_URL)
        .post('/v5/client/search')
        .set('Authorization', process.env.TOKEN)
        .send({limit: 30})
}

function getSingle(clientId){
    return request(process.env.BASE_URL)
        .get('/v5/client/' + clientId)
        .set('Authorization', process.env.TOKEN)
}

function getByName(clientName){
    return request(process.env.BASE_URL)
        .post('/v5/client/search')
        .set('Authorization', process.env.TOKEN)
        .send({name: clientName})
}

function updateClient(clientId){
    return request(process.env.BASE_URL)
        .patch('/v5/client/' + clientId)
        .set('Authorization', process.env.TOKEN)
        .send({name: 'updatedClient', phone: 'updatedPhone'})
}
function deleteClient(clientId){
    return request(process.env.BASE_URL)
        .delete('/v5/client/' + clientId)
        .set('Authorization', process.env.TOKEN)
}

export { createClient, getAll, getSingle, getByName, updateClient, deleteClient }
