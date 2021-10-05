/// <reference types="Cypress" />

class customers {

    elements = {
        customerNames: () => cy.get('[data-testid=cellName]')
    }

    executeWithRandomCustomer = (testCase) => {
        this.elements.customerNames()
            .should("be.visible")
            .then($name => {
                const items = $name.toArray()
                return Cypress._.sample(items)
            })
            .then($name => {
                expect(Cypress.dom.isJquery($name), 'jQuery element').to.be.true
                cy.log(`you picked "${$name.text()}"`)
                let customer = $name.text()
                testCase(customer)
            }
            )
    }
}

module.exports = new customers();