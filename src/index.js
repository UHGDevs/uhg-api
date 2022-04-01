exports.Client = require('./client/Client');


/**
* TESTS
**/
const Client = require('./client/Client')
const options = {key: "dc"}
try {
  new Client(options)
} catch (e) {
  console.log(e)
}
