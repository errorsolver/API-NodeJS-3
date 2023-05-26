const {Sequelize, DataTypes} = require('sequelize')
const db = require('../database/db')

let users = db.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

users.sync({ alter: true })
    .then(console.log('User Table synchronized'))
    .catch(err => {console.error('\nSync users error: ', err.message,'\n',err.parent)})
// users.removeAtribute = id
module.exports = users