/// <reference types="Cypress" />
const utils = require('../../utils')
const global = require('../pages/global')
const homepage = require('../pages/homepage')
const customer = require('../pages/customer')
const address = require('../pages/address')

describe("Testing customer creation and sales orders' creation", () => {
    let customerData
    let addressData
    beforeEach(() => {
        cy.viewport(1280, 720)
        homepage.logIn()
        customerData = utils.generateCustomerInfo()
        addressData = utils.generateAddress()
        global.addNewCustomer()
        customer.fillCustomerData(customerData)
        customer.elements.billingAddress().click()
        //global.elements.saveMessage().should('exist')
        address.fillAddress(addressData)
        global.elements.okBtn().click()
      })

    it("Tests customer creation with billing address only", () => {
        utils.checkSavedAndReset('[name=name]')
    })

    it("Tests customer creation with billing and shipping addresses", () => {

        let shippingAddress = utils.generateAddress()
        customer.elements.shippingAddress().click()
        address.fillAddress(shippingAddress)
        global.elements.okBtn().should('exist').click()
        utils.checkSavedAndReset('[name=name]')
    })

    it("Tests customer creation with billing address as shipping address", () => {
     
        let addressString = Object.values(addressData).join(", ")
        customer.elements.shippingAddress().click()
        address.fillAddress(addressData)
        global.elements.okBtn().should('exist').click()
        customer.checkAddressEntry(addressString)
        utils.checkSavedAndReset('[name=name]')
    })

})
