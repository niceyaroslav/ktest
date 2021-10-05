/// <reference types="Cypress" />
const global = require('../pages/global')
const item = require('../pages/item')
const sales = require('../pages/sales')
const address = require('../pages/address')

class order {

    elements = {
        productInput: () => cy.get('.cellText'),
        dropdownOptions: () => cy.get('.MuiAutocomplete-listbox > li'),
        customerInput: () => cy.get('[placeholder="Search or create customer"]'),
        trackingNumberBtn: () => cy.get('[data-testid=iconButtonOpenTrackingNumberPopover]'),
        trackingNumberInput: () => cy.get('[name=trackingNumber]'),
        trackingNumberSubmit: () => cy.get('[data-testid=buttonSubmitTrackingNumber]'),
        orderId: () => cy.get('[name=orderNo]'),
        billingAddressInput: () => cy.get('[data-testid="inputSalesOrderBillingAddress"]'),
        shippingAddressInput: () => cy.get('[data-testid="inputSalesOrderShippingAddress"]')
    }

    fillOrderData(customer, productName, trackId) {
        this.elements.productInput().type(`${productName}`)
        this.elements.dropdownOptions().should('have.length.gt', 1).get('[data-option-index=0]').click()
        this.elements.customerInput().type(`${customer}`)
        this.elements.dropdownOptions().get('[data-option-index=0]').should('have.text', customer).click()
        if (trackId) {
            this.elements.trackingNumberBtn().click()
            this.elements.trackingNumberInput().type(trackId)
            this.elements.trackingNumberSubmit().click()
        }
        global.elements.saveMessage().should('exist')
        this.elements.orderId()
        .invoke('val')
        .then((val1) => {
            global.elements.sales().click()
            sales.checkOrderCreated(val1)
        })
    }

    fillOrderWithNewProduct(customer, product){
        this.elements.productInput().type(`${product.name}`)
        this.elements.dropdownOptions().should('have.text', `Create new "${product.name}"`).click()
        item.fillProductData(product)
        this.elements.customerInput().type(`${customer}`)
        this.elements.dropdownOptions().should('have.text', customer).click()
        global.elements.saveMessage().should('exist')
        this.elements.orderId()
        .invoke('val')
        .then((val1) => {
            global.elements.sales().click()
            sales.checkOrderCreated(val1)
        })
    }

    changeAddress(adrs, type, check){
        let addressString = Object.values(adrs).join(", ")
        if (type === "billing") {
            this.elements.billingAddressInput().click()
        } else if (type === "shipping") {
            this.elements.shippingAddressInput().click()
        }
        global.elements.saveMessage().should('exist')
        address.fillAddress(adrs)
        global.elements.saveMessage().should('exist')
        global.elements.okBtn().should('exist').click()
        if (type === "billing" && check) {
            this.elements.billingAddressInput().should('have.text', `Bill to${addressString}`)
        } else if (type === "shipping" && check) {
            this.elements.shippingAddressInput().should('have.text', `Ship to${addressString}`)
        }
    }
}

module.exports = new order();