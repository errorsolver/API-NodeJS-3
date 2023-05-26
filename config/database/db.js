const Sequelize = require('sequelize')
// const { Pool, Client } = require('pg')
const DB_URI = process.env.DB_URI

const db = new Sequelize(DB_URI, {
    dialect: "postgres"
})

// const pool = new Pool(
//     {connectionString: DB_URI}
// )
// const client = new Client(
//     {connectionString: DB_URI}
// )

// pool.connect()
//     .then(
//         console.log('connected to db pool'),
//         pool.end
//     ).catch(err)(
//         console.log(err)
//     )

// client.connect()
//     .then(
//         console.log('connected to db clent'),
//         client.end
//     ).catch(err)(
//         console.log(err)
//     )

module.exports = db