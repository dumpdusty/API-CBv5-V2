import supertest from 'supertest'
import { expect } from 'chai'

const chance = require('chance').Chance()

describe('User registration positive', () => {
  describe('create a user with valid credentials', () => {
    let res
    it('check response status code', async () => {
      res = await supertest(process.env.BASE_URL)
        .post('user')
        .send({
          companyName: chance.company(),
          firstName: chance.first(),
          lastName: chance.last(),
          email: chance.email({ domain: 'pirate.com' }),
          password: process.env.PASSWORD,
          version: 'v5',
        })
      expect(res.statusCode).to.eq(201)
    })

    it('check response message', async () => {
      res = await supertest(process.env.BASE_URL)
        .post('user')
        .send({
          companyName: chance.company(),
          firstName: chance.first(),
          lastName: chance.last(),
          email: chance.email({ domain: 'pirate.com' }),
          password: process.env.PASSWORD,
          version: 'v5',
        })
      expect(res.body.message).to.eq(
        'User created successfully. Please check your email and verify it'
      )
    })
  })

  describe('create a user with required fields only', () => {
    let res
    it('check response status code', async () => {
      res = await supertest(process.env.BASE_URL)
        .post('user')
        .send({
          firstName: chance.first(),
          lastName: chance.last(),
          email: chance.email(),
          password: process.env.PASSWORD,
        })
      expect(res.statusCode).to.eq(201)
    })

    it('check response message', async () => {
      res = await supertest(process.env.BASE_URL)
        .post('user')
        .send({
          firstName: chance.first(),
          lastName: chance.last(),
          email: chance.email({ domain: 'pirate.com' }),
          password: process.env.PASSWORD,
        })
      expect(res.body.message).to.eq(
        'User created successfully. Please check your email and verify it'
      )
    })
  })
})

describe('User registration negative', () => {
  describe('create a user without password', () => {
    let res
    it('check response status code', async () => {
      res = await supertest(process.env.BASE_URL).post('user').send({
        firstName: chance.first(),
        lastName: chance.last(),
        email: chance.email(),
        password: '',
      })
      expect(res.statusCode).to.eq(400)
    })

    it('check response message', async () => {
      res = await supertest(process.env.BASE_URL).post('user').send({
        firstName: chance.first(),
        lastName: chance.last(),
        email: chance.email(),
        password: '',
      })
      expect(res.body.message).to.eq('Wrong password format')
    })
  })

  describe('create a user with existing email', () => {
    let res
    it('check response status code', async () => {
      res = await supertest(process.env.BASE_URL).post('user').send({
        firstName: chance.first(),
        lastName: chance.last(),
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      })
      expect(res.statusCode).to.eq(409)
    })

    it('check response message', async () => {
      res = await supertest(process.env.BASE_URL).post('user').send({
        firstName: chance.first(),
        lastName: chance.last(),
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      })
      expect(res.body.message).to.eq('User with this e-mail exists')
    })
  })
})
