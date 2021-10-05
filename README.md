# ktest
To run in headless mode use npm test<br>
To run using Cypress dashboard use npm run cypress
<br>
Functions for dummy data generation and handling are located in utils.js.<br>
Functions for api requests are located in cypress/requests.js.<br>
Files contained in the /cypress/pages directory represent specific pages or page elements to<br>
fascilitate POM style testing. Among these pages are:<br>
- homepage.js (for authentication needed for authentication)
- global.js (for working with elements present across multiple pages)
- customers.js (for working with the list of customers)
- items.js (for working with the list of available products)
- sales.js (for working with the list of available sales orders)
- address.js (for interacting with address form)
- item.js (for interacting with product creation form)
- order.js (for interacting with sales order form)
- customer.js (for interacting with customer data form)

<br>
<br>
Cypress integration test are located in cypress/integration/ and are denoted as '_.spec.js'<br>
- api.spec.js - testing customer creation using api calls
- customer-creation.spec.js - testing customer creation using UI
- customer-update.spec.js - testing changing customer addresses in sales orders using UI
- order-creation.spec.js - testing order creation with available customers using UI
