/// <reference types="Cypress" />
const utils = require('../../utils')
const global = require('../pages/global')
const homepage = require('../pages/homepage')
const customer = require('../pages/customer')
const customers = require('../pages/customers')
const address = require('../pages/address')
const order = require('../pages/order')
const sales = require('../pages/sales')
const item = require('../pages/item')
const items = require('../pages/items')


describe('Testing order creation with customers', () => {
        beforeEach(() => {
        cy.viewport(1280, 720)
        homepage.logIn()
        global.elements.customers().click()
    })

    it('Testing order creation when product card is available', () => {
        const testCase = (contact) => {
            global.elements.items().click()
            items.executeWithRandomProductItem(contact)
            
        } 
        customers.executeWithRandomCustomer(testCase)
    }) 

    it('Testing order creation with new product', () => {
        const testCase = (contact) => {
            let product = utils.createProduct()
            global.elements.globalAdd().click()
            global.elements.addSale().click()
            order.fillOrderWithNewProduct(contact, product)
        } 
        customers.executeWithRandomCustomer(testCase)
    })

    it('Testing order creation with addition of tracking number', () => {
        const testCase = (contact) => {
            let trackId = utils.generateTrackId()
            global.elements.items().click()
            items.executeWithRandomProductItem(contact, trackId)
        } 
        customers.executeWithRandomCustomer(testCase)
    })
})