import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload"; //! Upload files to the server!
var cors = require('cors');

//*Routes
import teammates from "./routes/teammates.routes"
import upload from "./routes/upload.file.routes"
import works from "./routes/works.routes"

//* Express
const app = express();

//* Cors
app.use(cors());

//* Settings
app.set('port', 3000); //! The port
app.use(express.urlencoded({ extended: false })) //! Parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.json()) //! Return the petition as an object json

//* MiddleWares
app.use(morgan('dev'));

//* FileUpload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true
}));

//* Routes direction
app.use( /* Routes */ teammates, upload, works );

export default app;