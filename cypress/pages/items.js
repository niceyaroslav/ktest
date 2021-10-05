/// <reference types="Cypress" />
const global = require('../pages/global')
const order = require('../pages/order')
const sales = require('../pages/sales')

class items {
    elements = {
        productItem: () => cy.get('.ag-row > [col-id=name] > .ag-react-container > a')
    }

    executeWithRandomProductItem(customer, trackId) {
        global.elements.items().click()
            this.elements.productItem()
                .should('be.visible')
                .then($p => {
                    const items = $p.toArray()
                    return Cypress._.sample(items)
                })
                .then($p => {
                    expect(Cypress.dom.isJquery($p), 'jQuery element').to.be.true
                    cy.log($p)
                    let productName = $p.text()
                    global.elements.globalAdd().click()
                    global.elements.addSale().click()
                    cy.log(productName)
                    order.fillOrderData(customer, productName, trackId)
                })
    }

}

module.exports = new items();