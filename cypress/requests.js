/// <reference types="Cypress" />
const apiKey = Cypress.env('KEY')
const customersApi = Cypress.env('CUSTOMERS')


const getRequestForCustomer = (obj) => {
    cy.request({
    method: 'GET',
    url: `${customersApi}?name=${obj.name}`,
    headers: {
        'Accept': 'application/json',  
        'Authorization': `Bearer ${apiKey}`
    }})
    .then(response => response.body.data[0].name === obj.name)
}


const postRequestForCustomer = (obj) => {
    cy.request({
    method: 'POST',
    url: customersApi,
    headers: {
        'Accept': 'application/json',  
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
    })
    .its('status')
    .should('deep.equal', 200)
}

const faultyPostRequestForCustomer = (obj) => {
    cy.request({
    method: 'POST',
    url: customersApi,
    headers: {
        'Accept': 'application/json',  
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
    })
    .its('status')
    .should('deep.equal', 422)
}

module.exports = {
    postRequestForCustomer,
    getRequestForCustomer,
    faultyPostRequestForCustomer
}