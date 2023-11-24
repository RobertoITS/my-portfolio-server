import mysql from 'promise-mysql'
import config from './../config'

//* Generate the connection
const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: 'raqueveque',
    password: config.password
})
//* Obtain the connection and returns
export const getConnection = () => {
    console.log('Connect to the database');
    return connection
}