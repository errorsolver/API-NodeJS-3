const { DataTypes } = require('sequelize')
const db = require('../database/db')

const Usernames = db.define('usernames', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Usernames.sync({ alter: true })
    .then(console.log('Usernames Table synchronized'))
    .catch(err => {console.error('\nSync username error: ', err.message,'\n',err.parent)})
module.exports = Usernames