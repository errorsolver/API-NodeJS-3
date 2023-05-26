const { DataTypes } = require('sequelize')

const db = require('../database/db')
const Usernames = require('./username')

const Passwords = db.define('passwords', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Usernames,
        key: 'uuid'
      }
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
})

Passwords.sync({ alter: true })
    .then(console.log('Passwords Table synchronized'))
    .catch(err => {console.error('\nSync passwords error: ', err.message,'\n',err.parent)})
module.exports = Passwords