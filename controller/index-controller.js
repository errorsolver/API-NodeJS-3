const users = require('./users')
const controller = {}

controller.users = users
console.log('user controller: ', controller)

module.exports = controller