/// <reference types="Cypress" />
const global = require('../pages/global')

class item {

    elements = {
        unitOfMeasure: () => cy.get('[placeholder="Select or create unit of measure"]'),
        variant: () => cy.get('[name=sku]'),
        price: () => cy.get('[name=salesPrice]'),
        doneBtn: () => cy.contains('Done')

    }

    fillProductData(product) {
        this.elements.unitOfMeasure().type(product.unit)
        this.elements.variant().type(product.variant)
        this.elements.price().type(product.price)
        this.elements.doneBtn().should('exist').click()
        //global.elements.saveMessage().should('exist')
    }
}

module.exports = new item();