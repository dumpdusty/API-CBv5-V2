// Automated test for services
import {expect} from 'chai'
const chance = require('chance').Chance()
import * as vendorHelper from '../helpers/vendor-helper'
import * as serviceHelper from '../helpers/service-helper'

describe('Service Tests', () => {
    describe('Create a service', () => {
        let res, vendorId

        before(async () => {
            vendorId = (await vendorHelper.createVendor()).body.payload
            res = await serviceHelper.createService(vendorId)
        })

        it('check the status code', () => {
            expect(res.statusCode).to.eq(200)
        })
        it('check status message', () => {
            expect(res.body.message).to.eq('Service created')
        })
        it('check the service has and id', () => {
            expect(res.body.payload).not.to.be.empty
        })
    })

    describe('Get all services', () => {
        let res, vendorId

        before(async () => {
            vendorId = (await vendorHelper.createVendor()).body.payload
            await serviceHelper.createService(vendorId)
            res = await serviceHelper.getAll()
        })

        it('check the status code', () => {
            expect(res.statusCode).to.eq(200)
        })

        it('check the response message', () => {
            expect(res.body.message).to.eq('Service Search ok')
        })

        it('check the response contains array', () => {
            expect(res.body.payload.items).to.be.a('array')
        })
    })

    describe('Get service by ID', () => {
        let vendorId, res, serviceId

        before(async () => {
            vendorId = (await vendorHelper.createVendor()).body.payload
            serviceId = (await serviceHelper.createService(vendorId)).body.payload
            res = await serviceHelper.getSingleById(serviceId)
        })

        it('check the status code', () => {
            expect(res.statusCode).to.eq(200)
        })

        it('check the response message', () => {
            expect(res.body.message).to.eq('Get Service by id ok')
        })

        it('check the response contains serviceId', () => {
            expect(res.body.payload._id).to.eq(serviceId)
        })
    })

    describe('Get service by name', () => {
        let res, vendorId, serviceId, serviceName
        before(async () => {
            vendorId = (await vendorHelper.createVendor()).body.payload
            serviceId = (await serviceHelper.createService(vendorId)).body.payload
            serviceName = (await serviceHelper.getSingleById(serviceId)).body.payload.name
            res = await serviceHelper.getSingleByName(serviceName)
        })

        it('check the status code', () => {
            expect(res.statusCode).to.eq(200)
        })

        it('check the response message', () => {
            expect(res.body.message).to.eq(`Service Search ok`)
        })
        it('check the response service name', () => {
            expect(res.body.payload.items[0].name).to.eq(serviceName)
        })

    })

    describe('Update a service', () => {
        let res, vendorId, serviceId, updService
        const clientPrice = chance.integer({min: 100, max: 999})
        const vendorPrice = chance.integer({min: 100, max: 999})

        before(async () => {
            vendorId = (await vendorHelper.createVendor()).body.payload
            serviceId = (await serviceHelper.createService(vendorId)).body.payload
            res = await serviceHelper.updateService(serviceId, vendorId, clientPrice, vendorPrice)
            updService = await serviceHelper.getSingleById(serviceId)
        })

        it('check the status code', () => {
            expect(res.statusCode).to.eq(200)
        })

        it('check the response message', () => {
            expect(res.body.message).to.eq(`Service updated`)
        })

        it('check the client price and vendor price is updated', () => {
            expect(updService.body.payload.clientPrice).to.eq(clientPrice)
            expect(updService.body.payload.vendorPrice).to.eq(vendorPrice)

        })
    })

    describe('Delete a service', () => {
        let res, vendorId, serviceId, updService

        before(async ()=>{
            vendorId = (await vendorHelper.createVendor()).body.payload
            serviceId = (await serviceHelper.createService(vendorId)).body.payload
            res = await serviceHelper.deleteService(serviceId)
            updService = await serviceHelper.getSingleById(serviceId)
        })

        it('check the status code', () => {
            expect(res.statusCode).to.eq(200)
        })

        it('check the response message', () => {
            expect(res.body.message).to.eq(`Service deleted`)
        })

        it('check service was deleted', () => {
            expect(updService.body.message).to.eq(`No service for provided id`)
        });
    });

    after('delete all services', async()=> {
        let serviceList
        serviceList = (await serviceHelper.getAll()).body.payload.items
        for (let i = 0; i < serviceList.length; i++) {
            await serviceHelper.deleteService(serviceList[i]._id)
        }
    })
})

