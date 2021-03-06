/// <reference types="Cypress" />
const url = Cypress.env("URI")
const email = Cypress.env("EMAIL")
const password = Cypress.env("PASSWORD")
const login = `${url}/login`

class homepage {
    elements = {
        emailInput: () => cy.get('[name=email]'),
        passwordInput:() => cy.get('[name=password]'), 
        loginBtn: () => cy.get('[name=submit]')
    }

    logIn() {
        cy.visit(login)
        this.elements.emailInput().type(email)
        expect(email, 'email was set').to.be.a('string').and.not.be.empty
        this.elements.passwordInput().type(password, {log: false})
        this.elements.loginBtn().click()
    }
}

module.exports = new homepage();