import { config } from 'dotenv'

config()

//* Server connection configuration!
export default {
    host: process.env.host,
    port: process.env.port,
    database: process.env.database,
    user: 'raqueveque',
    password: process.env.password
}