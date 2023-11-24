import mysql from 'mysql2'
import config from './../config'

console.log(config);
//* Generate the connection
const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
})
//* Obtain the connection and returns
export const getConnection = () => {
    console.log('Connect to the database');
    return connection
}