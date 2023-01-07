import {expect} from 'chai'
import { login } from '../helpers/general-helper.js'

describe('Authentication Positive', () => {
    describe('login with valid credentials', () => {
        let res
        before(async () => {
            res = await login(process.env.EMAIL, process.env.PASSWORD)
        })

        it('check response status code', async () => {
            expect(res.statusCode).to.eq(200)
        })

        it('check response message', async () => {
            expect(res.body.message).to.eq('Auth success')
        })

        it('check the response has token', async () => {
            expect(res.body.payload.token).to.not.be.undefined
        })
    })
});
describe('Authentication Negative', () => {
    describe('login with invalid email', () => {
        let res
        before(async () => {
            res = await login('invalid@pirate.com', process.env.PASSWORD)
        })
        it('check response status code', async () => {
            expect(res.statusCode).to.eq(400)
        })

        it('check response message', async () => {
            expect(res.body.message).to.eq('Auth failed')
        })
    })

    describe('login with invalid password', () => {
        let res
        before(async () => {
            res = await login(process.env.EMAIL, 'invalid')
        })
        it('check response status code', async () => {
            expect(res.statusCode).to.eq(400)
        })

        it('check response message', async () => {
            expect(res.body.message).to.eq('Auth failed')
        })
    })

    describe('login with empty fields', () => {
        let res
        before(async () => {
            res = await login('', '')
        })
        it('check response status code', async () => {
            expect(res.statusCode).to.eq(400)
        })

        it('check response message', async () => {
            expect(res.body.message).to.eq('Auth failed')
        })
    })
})
