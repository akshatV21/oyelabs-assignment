// Done with mongoDB / mongoose js
// Let's assume we have a single collection for customers

// Customer collection
// -> properties - { name: string, email: string }

// This result can be achieved in 2 ways
// 1) Function to register all customers at once
/**
 * @param { Array } customersArray - Array of customers
 */
const registerMultipleCustomers = async customersArray => {
  // to store the customer.save() method to call it in Promise.all()
  const saves = []

  // registering/updating all the customers
  customersArray.forEach(async customer => {
    // if customer already exists
    const existingCustomer = await emailAlreadyExists(customer.email)
    if (existingCustomer) {
      existingCustomer.name = customer.name
      saves.push(existingCustomer.save())
    }

    // if is a new customer
    if (!existingCustomer) {
      const newCustomer = new CustomerModel(customer)
      saves.push(newCustomer.save())
    }
  })

  // saving the documents
  await Promise.all(saves)
}

// 2) Function to register one customer at a time
/**
 * @param {object} customer
 * @param {string} customer.email
 * @param {string} customer.name
 */
const registerSingleCustomer = async customer => {
  const existingCustomer = await emailAlreadyExists(customer.email)

  // if the customer is already registered
  if (existingCustomer) {
    existingCustomer.name = customer.name
    return existingCustomer.save()
  }

  // if is a new customer
  if (!existingCustomer) {
    const newCustomer = new CustomerModel(customer)
    return newCustomer.save()
  }
}

// validating if the email exists
const emailAlreadyExists = async email => {
  const customer = await CustomerModel.findOne({ email: email }) // returns null if does not exists
  return customer
}
