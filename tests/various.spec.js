import {emailSearch, login, register} from "../helpers/general-helper";
import supertest from "supertest";
import {expect} from "chai";
const chance = require('chance').Chance()

describe('Email confirmation', () => {

    // create unique email
    const testEmail = 'user_' + Date.now() + '@pirate.com'

    let str, endPoint, res, check
    before(async () => {
        // register user with unique email
        await register(chance.first(), chance.last(), testEmail, process.env.PASSWORD)

        // get email text
        str = await emailSearch(testEmail)

        // extract end point
        endPoint = str.body.payload.items[0].message.split('\n')[4].split('https://clientbase.us')[1]

        // send confirmation request
        res = await supertest(process.env.BASE_URL).get(endPoint).send()

        // login with confirmed unique email
        check = await login(testEmail, process.env.PASSWORD)
    })

    it('check the response status', () => {
        expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
        expect(res.body.message).to.include('confirmed')
    })

    it('check the role', () => {
        expect(check.body.payload.user.roles).to.include('verified')
    })
})


describe('Space trimming test', () => {
    let untrimmedEmail = ' james_' + Date.now() + '@pirate.com   '
    let res
    let result

    before(async()=>{
        result = await register(chance.first(), chance.last(), untrimmedEmail, process.env.PASSWORD)
        res = await login((untrimmedEmail.trim()), process.env.PASSWORD)

        // console.log(untrimmedEmail)
        // console.log(untrimmedEmail.trim())
        // console.log(res.body.payload.user.email)
    })
    it('check response status', () => {
        expect(res.statusCode).to.eq(200)
    });
    it('check response message', () => {
        expect(res.body.message).to.eq('Auth success')
    });
    it('check the email in response is equal to trimmed email', () => {
        expect(res.body.payload.user.email).to.eq(untrimmedEmail.trim())
    });
});
