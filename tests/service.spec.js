// Automated tests for services
import request from "supertest";
describe('Service Tests', () => {
    describe('Create a service', () => {
        let res
        before(async ()=>{
            res = await request(process.env.BASE_URL)
                .post('/service')
                .set('Authorisation', process.env.TOKEN)
                .send({})

        })
    });
});
