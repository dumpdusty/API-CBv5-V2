import { expect } from 'chai'
import { register } from '../helpers/general-helper'

const chance = require('chance').Chance()

describe('User registration positive', () => {
    let res
    before(async ()=>{
        res = await register(chance.first(), chance.last(), chance.email(), process.env.PASSWORD)
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
