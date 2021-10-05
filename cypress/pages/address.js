

class address {
 
    elements = {
        line1: () => cy.get('[name=line1]'),
        line2: () => cy.get('[name=line2]'),
        city: () => cy.get('[name=city]'),
        state: () => cy.get('[name=state]'),
        zip: () => cy.get('[name=zip]'),
        country: () => cy.get('[name=country]')
    }

    fillAddress = (addressData) => {
        this.elements.line1().type(`${addressData.line_1}`)
        this.elements.line2().type(`${addressData.line_2}`)
        this.elements.city().type(`${addressData.city}`)
        this.elements.state().type(`${addressData.state}`)
        this.elements.zip().type(`${addressData.zip}`)
        this.elements.country().type(`${addressData.country}`)
    }
}

module.exports = new address();