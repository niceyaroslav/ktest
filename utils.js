const faker = require('faker')
//const { v4: uuidv4 } = require('uuid')

const generateCustomerInfo = () => {
    const temp = faker.random.alpha(7)
    return {
        //id: uuidv4(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        company: faker.company.companyName(),
        email: `${faker.name.firstName()}${faker.random.alphaNumeric(3)}@gmail.com`,
        phone: faker.phone.phoneNumberFormat(),
        comment: temp
    }
}

const generateAddress = () => {
    return {
        line_1: faker.random.alpha(15),
        line_2: String(Math.floor(Math.random() * 1000)),
        city: faker.address.cityName(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        country: faker.address.country()
    }
}

const createAddressFromArray = (arr) => {
    return {
        line1: arr[0],
        line2: arr[1],
        city: arr[2],
        state: arr[3],
        zip: arr[4],
        country: arr[5]
    }
}

const createProduct = () => {
    return {
        name: faker.lorem.word(),
        unit: 'pcs',
        category: faker.lorem.word(),
        variant: 'M-1',
        price: Math.floor(Math.random() * 1000)
    }
}


const fillProductData = (product) => {
    cy.contains('Search or create item').click().type(product.name).type('{enter}')
    cy.get('[placeholder=Select or create unit of measure]').click().type('pcs')
    cy.get('[placeholder=Select or create category]').type(product.category)
    cy.get('[name=sku]').click().type(procut.variant)
    cy.get('[name=salesPrice]').click().type(product.price)
    cy.contains('Done').click()
}

const checkSavedAndReset = (testable) => {
    
    cy.contains("All changes saved").should('exist')
    cy.get(testable)
        .invoke('val')
        .then((val1) => {
            cy.get('#contactsTab').click()
            cy.get('.ag-header-row-floating-filter')
                .children('[aria-colindex=3]')
                .should('be.visible')
                .clear()
                .type(val1)
            cy.contains(val1).should("exist")
        })
}

const generateTrackId = () => {

    return faker.random.alphaNumeric(10)
}

module.exports = {
    
    generateCustomerInfo,
    generateAddress,
    createProduct,
    fillProductData,
    checkSavedAndReset,
    generateTrackId,
    createAddressFromArray
}