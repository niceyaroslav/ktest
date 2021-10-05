/// <reference types="Cypress" />
const utils = require('../../utils')
const apiKey = Cypress.env('KEY')
const customersApi = Cypress.env('CUSTOMERS')
const requests = require('../requests')

const createCustomerObject = (custObj, arr) => {
    let template = {
        name: '',
        first_name: '',
        last_name: '',
        company: '',
        email: '',
        phone: '',
        currency: '',
        comment: '',
        addresses: []
    }
    Object.keys(template).map((key, _) => {
        template[key] = custObj[key]
      })
    template.addresses = arr
    return template
}



const createAddressObject = (entity, adrs) => {
    let obj1 =  {
        entity_type: entity,
        default: true,
        first_name: '',
        last_name: '',
        company: '',
        phone: '',
    }

    return {...obj1, ...adrs}

}


describe('Creating customers through API calls', () => {
    let newCustomer
    let billingAddress
    let shippingAddress
    beforeEach(() => {
        newCustomer = utils.generateCustomerInfo()
        billingAddress = utils.generateAddress()
        shippingAddress = utils.generateAddress()
    })

    it('Create new customer with name and email', () => {
        let subsetObject = {
            name: newCustomer.name,
            email: newCustomer.email
        }
        let customerObject = createCustomerObject(subsetObject, [])
        requests.postRequestForCustomer(customerObject)
        requests.getRequestForCustomer(customerObject)
    })
    
    it('Create new customer with name, first name and email', () => {
        let subsetObject = {
            name: newCustomer.name,
            first_name: newCustomer.first_name,
            email: newCustomer.email
        }
        let customerObject = createCustomerObject(subsetObject, [])
        requests.postRequestForCustomer(customerObject)
        requests.getRequestForCustomer(customerObject)
    })

    it('Create new customer with all personal data', () => {
        let customerObject = createCustomerObject(newCustomer, [])
        requests.postRequestForCustomer(customerObject)
        requests.getRequestForCustomer(customerObject)
    })

    it('Create customer with all personal data and billing address', () => {
        let billingAddressObject = createAddressObject('billing', billingAddress)
        let customerObject = createCustomerObject(newCustomer, [billingAddressObject])
        requests.postRequestForCustomer(customerObject)
        requests.getRequestForCustomer(customerObject)
    })

    it('Create customer with all data fields filled', () => {
        let billingAddressObject = createAddressObject('billing', billingAddress)
        let shippingAddressObject = createAddressObject('shipping', shippingAddress)
        let customerObject = createCustomerObject(newCustomer, [billingAddressObject, shippingAddressObject])
        requests.postRequestForCustomer(customerObject)
        requests.getRequestForCustomer(customerObject)
    })
})
