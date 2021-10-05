/// <reference types="Cypress" />



class customer {

    elements = {
        phone : () => cy.get('[name=phone]'),
        email : () => cy.get('[name=email]'),
        comment : () => cy.get('[name=comment]'),
        name : () => cy.get('[name=name'),
        billingAddress: () => cy.get('[name=defaultBillingAddress]'),
        shippingAddress: () => cy.get('[name=defaultShippingAddress]'),
        filledAddress: () => cy.get('[data-testid=textAddressInformation]')
    }

    fillCustomerData(customerData) {
        this.elements.phone().type(`${customerData.phone}`)
        this.elements.email().type(`${customerData.email}`)
        this.elements.comment().type(`${customerData.comment}`)
        this.elements.name().type(`${customerData.first_name} ${customerData.last_name} [TEST]`)
    }

    checkAddressEntry(addressString) {
        this.elements.filledAddress()
            .should('have.length', 2)
            .should('have.text', `${addressString}${addressString}`)
    }
}

module.exports = new customer();