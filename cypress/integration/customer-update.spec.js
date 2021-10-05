/// <reference types="Cypress" />
const utils = require('../../utils')
const global = require('../pages/global')
const homepage = require('../pages/homepage')
const address = require('../pages/address')
const order = require('../pages/order')
const sales = require('../pages/sales')



describe('Testing customer addres updation in sales orders', () => {
    let newBilling
    let newShipping
        beforeEach(() => {
        cy.viewport(1280, 720)
        homepage.logIn()
        global.elements.sales().click()
    })

    it('Changing shipping address only', () => {
        const testCase = () => {
            newShipping = utils.generateAddress()
            order.changeAddress(newShipping, 'shipping', true)
        } 
        sales.executeWithRandomOrder(testCase)
    }) 

    it('Changing billing address only', () => {
        const testCase = () => {
            newBilling = utils.generateAddress()
            order.changeAddress(newBilling, 'billing', true)
        } 
        sales.executeWithRandomOrder(testCase)
    })

    it('Changing billing and shipping addresses', () => {
        const testCase = () => {
            newShipping = utils.generateAddress()
            order.changeAddress(newShipping, 'shipping', true)
            newBilling = utils.generateAddress()
            order.changeAddress(newBilling, 'billing', true)

        } 
        sales.executeWithRandomOrder(testCase)
    })

    it('Making shipping address same as billing address', () => {
        const testCase = () => {
           let newAddress = utils.generateAddress()
           order.changeAddress(newAddress, 'billing', false)
           order.changeAddress(newAddress, 'shipping', false)
           order.elements.shippingAddressInput()
            .invoke('text')
            .should((text1) => {
                    let controlString = text1.replace('Ship to', '')
                    let billingString = Object.values(newAddress).join(', ').replace('Bill to', '')
                    expect(controlString).to.eq(billingString)
                })
        } 
        sales.executeWithRandomOrder(testCase)
    })
})