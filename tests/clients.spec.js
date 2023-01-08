import { expect } from 'chai'
import * as clientHelper from '../helpers/client-helper'
import request from 'supertest'

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

describe('Get all clients', () => {
  let res
  before(async()=>{
    await clientHelper.create()
    res = await clientHelper.getAll()
  })
  it('check the response status', () => {
    expect(res.statusCode).to.eq(200)
  });
  it('check the response contains array', () => {
    expect(res.body.payload.items).to.be.a('array')
  });
  it('check the array elements has id', () => {
    let clientsList = res.body.payload.items
      for(let i=0; i<clientsList.length; i++ ){
        expect(clientsList[i]).has.property('_id')
      }
  });
});

describe('Get client by ID', () => {
  let res
  let clientId
  before(async()=>{
    clientId = (await clientHelper.create()).body.payload
    res = await clientHelper.getSingle(clientId)
  })
  it('check the response status',async() => {
    expect(res.statusCode).to.eq(200)
  });
  it('check the response message',async() => {
    expect(res.body.message).to.eq('Get Client by id ok')
  });
  it('check the response message',async() => {
    expect(res.body.payload._id).to.eq(`${clientId}`)
  });
});

describe('Get client by name', () => {
  let clientId
  let clientName
  let res
  before(async()=>{
    clientId = (await clientHelper.create()).body.payload
    clientName = (await clientHelper.getSingle(clientId)).body.payload.name
    res = await clientHelper.getByName(clientName)
  })
  it('check the response status', () => {
    expect(res.statusCode).to.eq(200)
  });
  it('check the response message', () => {
    expect(res.body.message).to.eq('ClientSearch ok')
  });
  it('check the client name', () => {
    expect((res.body.payload.items[0]).name).to.eq(clientName)
  });
});

