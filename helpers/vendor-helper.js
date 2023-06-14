import request from 'supertest'
const chance = require('chance').Chance()

function createVendor(){
    return request(process.env.BASE_URL)
        .post('/v5/vendor')
        .set('Authorization', process.env.TOKEN)
        .send({
            name: 'Vendor_' + Date.now(),
            phone: chance.phone(),
        })
}

function getAll(){
    return request(process.env.BASE_URL)
        .post('/v5/vendor/search')
        .set('Authorization', process.env.TOKEN)
        .send({limit: 30})
}


function getSingle(vendorId){
    return  request(process.env.BASE_URL)
        .get('/v5/vendor/' + vendorId)
        .set('Authorization', process.env.TOKEN)
}

function updateVendor(vendorId){
    return request(process.env.BASE_URL)
        .patch('/v5/vendor/' + vendorId)
        .set('Authorization', process.env.TOKEN)
        .send({name: 'updatedVendor', phone: 'updatedPhone'})
}

function deleteVendor(vendorId){
    return request(process.env.BASE_URL)
        .delete('/v5/vendor/' + vendorId)
        .set('Authorization', process.env.TOKEN)
}

export { createVendor, getAll, getSingle, updateVendor, deleteVendor }
