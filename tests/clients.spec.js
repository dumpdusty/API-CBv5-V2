import { expect } from 'chai'
import * as clientHelper from '../helpers/client-helper'

describe('Clients tests', () => {
  let res
  before(async () => {
    res = await clientHelper.create()
  })
  it('check the response status', async () => {
    expect(res.statusCode).to.eq(200)
  })
  it('check the response message', () => {
    expect(res.body.message).to.eq('Client created')
  })
  it('check the response has client id', () => {
    expect(res.body.payload).not.to.be.empty
  })
  it('check the client id is a string', () => {
    expect(res.body.payload).to.be.a('string')
  })
})

