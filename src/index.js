import app from './app'

//* Documentation swagger
const { swaggerDocs: V1SwaggerDocs } = require('./routes/swagger')

const main = () => {
    app.listen(app.get('port'))
    console.log(`Server on port ${app.get('port')}`);
    V1SwaggerDocs(app, app.get('port'))
}
main()