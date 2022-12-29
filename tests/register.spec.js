import supertest from 'supertest'
import { expect } from 'chai'
const chance = require('chance').Chance()

describe('User registration', () => {
  let res
  it.only('Create a user with valid credentials', async () => {
    res = await supertest(process.env.BASE_URL).post('user').send({
      firstName: chance.first(),
      lastName: chance.last(),
      email: chance.email({domain: "pirate.com"}),
      password: process.env.PASSWORD,
    })
    console.log(res.body)

    expect(res.statusCode).to.eq(201)
  })
})

