import { expect } from 'chai'
import { emailSearch, login, register } from '../helpers/general-helper.js'
import supertest from 'supertest'

const chance = require('chance').Chance()
let report = require('automation.report').default

describe('Authentication Positive', () => {
  describe('login with valid credentials', () => {
    let res
    before(async () => {
      res = await login(process.env.EMAIL, process.env.PASSWORD)
    })

    it('check response status code', () => {
      report.startTest('Login with valid creds', 'First Test')
      report.endTest()
      expect(res.statusCode).to.eq(200)
    })

    it('check response message', () => {
      expect(res.body.message).to.eq('Auth success')
    })

    it('check the response has token', () => {
      expect(res.body.payload.token).to.not.be.undefined
    })
  })
})
describe('Authentication Negative', () => {
  describe('login with invalid email', () => {
    let res
    before(async () => {
      res = await login('invalid@pirate.com', process.env.PASSWORD)
    })
    it('check response status code', () => {
      expect(res.statusCode).to.eq(400)
    })

    it('check response message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })

  describe('login with invalid password', () => {
    let res
    before(async () => {
      res = await login(process.env.EMAIL, 'invalid')
    })
    it('check response status code', () => {
      expect(res.statusCode).to.eq(400)
    })

    it('check response message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })

  describe('login with empty fields', () => {
    let res
    before(async () => {
      res = await login('', '')
    })
    it('check response status code', () => {
      expect(res.statusCode).to.eq(400)
    })

    it('check response message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })
})

describe('Email verification', () => {
  const testEmail = 'user_' + Date.now() + '@pirate.com'
  let str, endPoint, res, check
  before(async () => {
    await register(chance.first(), chance.last(), testEmail, process.env.PASSWORD)
    str = await emailSearch(testEmail)

    endPoint = str.body.payload.items[0].message.split('\n')[4].split('https://clientbase.us')[1]

    res = await supertest(process.env.BASE_URL).get(endPoint).send()

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
