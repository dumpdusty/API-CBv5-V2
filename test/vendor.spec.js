import { expect } from 'chai'
import * as vendorHelper from '../helpers/vendor-helper'

describe('Vendors Test', () => {
    describe('Create a vendor', () => {
        let res
        before(async () => {
            res = await vendorHelper.createVendor()
        })

        it('check the response status', () => {
            expect(res.statusCode).to.eq(200)
        })
        it('check the response message', () => {
            expect(res.body.message).to.eq('Vendor created')
        })
        it('check the response has vendor id', () => {
            expect(res.body.payload).to.be.a('string')
        })
    })

    describe('Get all vendors', () => {
        let res
        before(async () => {
            for (let i = 0; i < 3; i++) {
                await vendorHelper.createVendor()
            }
            res = await vendorHelper.getAll()
        })

        it('check the response status', () => {
            expect(res.statusCode).to.eq(200)
        })
    })

    describe('Get vendor by ID', () => {
        let res, vendorId
        before(async()=>{
            vendorId = (await vendorHelper.createVendor()).body.payload
            res = await vendorHelper.getSingle(vendorId)

        })
        it('check the response status', () => {
            expect(res.statusCode).to.eq(200)
        })
        it('check the response message', () => {
            expect(res.body.message).to.eq('Get Vendor by id ok')
        })
        it('check the response message', () => {
            expect(res.body.payload._id).to.eq(`${vendorId}`)
        })
    })

    describe('Update Vendor', () => {
        let updVendor, res, vendorId
        before(async()=>{
            vendorId = (await vendorHelper.createVendor()).body.payload
            res = await vendorHelper.updateVendor(vendorId)
            updVendor = await vendorHelper.getSingle(vendorId)

        })
        it('check the response status', () => {
            expect(res.statusCode).to.eq(200)
        })
        it('check the response message', () => {
            expect(res.body.message).to.eq('Vendor updated')
        })
        it('check if the vendor name updated', ()=>{
            expect(updVendor.body.payload.name).to.eq('updatedVendor')
        })
    });

    describe('Delete vendor', () => {
        let res, vendorId, deletedVendor
        before(async()=>{
            vendorId = (await vendorHelper.createVendor()).body.payload
            res = await vendorHelper.deleteVendor(vendorId)
            deletedVendor = await vendorHelper.getSingle(vendorId)
        })
        it('check the response eststus', () => {
            expect(res.statusCode).to.eq(200)
        });
        it('check the response message', () => {
            expect(res.body.message).to.eq('Vendor deleted')
        });
        it('check if vendor deleted', () => {
            expect(deletedVendor.body.message).to.eq('No vendor for provided id')
        });
    });

    after('delete all vendors', async()=>{
        let vendorsList
        vendorsList = (await vendorHelper.getAll()).body.payload.items
        for(let i=0; i<vendorsList.length; i++){
            await vendorHelper.deleteVendor(vendorsList[i]._id)
        }
    })
})
