/// <reference types="Cypress" />

class sales {

    elements = {
        orderInput: () => cy.get('[aria-rowindex=2]').children('[aria-colindex=3]'),
        orderId: () => cy.get('[row-index=0] > [col-id=orderNo]'),
        orderIds: () => cy.get('[col-id=orderNo] > .ag-react-container > a')

    }

    checkOrderCreated(id) {

        this.elements.orderInput().should('be.visible').clear().type(id)
        this.elements.orderId().should('have.text', id)
    }

   
    executeWithRandomOrder(testCase){
        this.elements.orderIds()
            .should("be.visible")
            .then($id => {
                const ids = $id.toArray()
                return Cypress._.sample(ids)
            })
            .then($id => {
                expect(Cypress.dom.isJquery($id), 'jQuery element').to.be.true
                cy.log(`you picked "${$id.text()}"`)
                let order = $id.text()
                this.elements.orderInput().type(order)
                this.elements.orderId().should('have.text', order).click()
                testCase()
            }
            )
    }
}

module.exports = new sales();