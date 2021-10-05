/// <reference types="Cypress" />


class global {
    elements = {
        userInfo: () => cy.get('[data-testid=userInfoContainer]'), 
        logoutBtn: () => cy.contains('Logout'),
        globalAdd: () => cy.get('#globalAdd'),
        addCustomer: () => cy.get('#add-customer'),
        addSale: () => cy.get('#add-sales'),
        addProduct: () => cy.get('#add-product'),
        sales: () => cy.get('#salesTab'),
        items: () => cy.get('#portfolioTab'),
        customers: () => cy.get('#contactsTab'),
        saveMessage: () => cy.contains("All changes saved"),
        okBtn: () => cy.get('.MuiButton-label').contains('Ok')

    }

    logOut() {
        this.elements.userInfo().click()
        this.elements.logoutBtn().click()
    }

    addNewCustomer(){
        this.elements.globalAdd().click()
        this.elements.addCustomer().click()
    }

    addNewSale(){
        this.elements.globalAdd().click()
        this.elements.addSale().click()
    }

    addNewProduct(){
        this.elements.globalAdd().click()
        this.elements.addProduct().click()
    }

}

module.exports = new global();