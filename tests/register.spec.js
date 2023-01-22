import { expect } from 'chai'
import {login, register} from '../helpers/general-helper'
const chance = require('chance').Chance()

describe('User registration positive', () => {
    const newEmail = 'user_'+Date.now()+'@pirate.com'
    let res
    before(async ()=>{
        res = await register(chance.first(), chance.last(), newEmail, process.env.PASSWORD)
    })

    it('check response status code', () => {
      expect(res.statusCode).to.eq(201)
    })

    it('check response message',  () => {
      expect(res.body.message).to.eq('User created successfully. Please check your email and verify it'
      )
    })
})

describe('User registration negative', () => {
  describe('create a user without password', () => {
    let res

    before(async()=>{
      res = await register(chance.first(), chance.last(), chance.email(), '')
    })

    it('check response status code',  () => {
      expect(res.statusCode).to.eq(400)
    })

    it('check response message',  () => {
      expect(res.body.message).to.eq('Wrong password format')
    })
  })

  describe('create a user with existing email', () => {
    let res

    before(async()=>{
      res = await register(chance.first(), chance.last(), process.env.EMAIL, process.env.PASSWORD)
    })

    it('check response status code', () => {
      expect(res.statusCode).to.eq(409)
    })

    it('check response message',  () => {
      expect(res.body.message).to.eq('User with this e-mail exists')
    })
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
