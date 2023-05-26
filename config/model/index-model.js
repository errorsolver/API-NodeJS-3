const Users = require('./users')
const Password = require('./password')
const Username = require('./username')
const model = {
    Users, Username, Password
}

// model.Users = Users
// model.Password = Password
// model.Username = Username
console.log('user model: ', model)

module.exports = model