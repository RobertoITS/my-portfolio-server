import config from './../config'
import { Pool } from 'pg'

//* Generate the connection
const connection = new Pool({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
})

//* Obtain the connection and returns
const getConnection = () => {
    console.log('Connect to the database');
    return connection
}

//* Exports
export const connect = getConnection()