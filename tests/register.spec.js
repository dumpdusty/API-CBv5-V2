import supertest from 'supertest'
import { expect } from 'chai'
const chance = require('chance').Chance()

describe.only('User registration', () => {
    let res
    it('Create a user with valid credentials', async () => {
        res = await supertest(process.env.BASE_URL).post('user').send({
            firstName: chance.first(),
            lastName: chance.last(),
            email: chance.email({domain: "pirate.com"}),
            password: process.env.PASSWORD,
        })
        expect(res.statusCode).to.eq(201)
    })

    it('return correct message', async () => {
        res = await supertest(process.env.BASE_URL).post('user').send({
            firstName: chance.first(),
            lastName: chance.last(),
            email: chance.email({domain: "pirate.com"}),
            password: process.env.PASSWORD,
        })
        expect(res.body.message).to.eq('User created successfully. Please check your email and verify it')
    })

    it('Create a user without password', async () => {
        res = await supertest(process.env.BASE_URL).post('user').send({
            firstName: chance.first(),
            lastName: chance.last(),
            email: chance.email(),
            password: '',
        })
        expect(res.statusCode).to.eq(400)
    })

    it('return correct message', async () => {
        res = await supertest(process.env.BASE_URL).post('user').send({
            firstName: chance.first(),
            lastName: chance.last(),
            email: chance.email(),
            password: '',
        })
        expect(res.body.message).to.eq('Wrong password format')
    })
})

