import { request, response } from "express";
import { connect } from "../database/database";
import { files } from "../helpers/uploader";

//! Get all the data
const get = async(req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query('SELECT * FROM teammates')
        res.status(200).json({
            ok:true,
            result,
            msg: 'approved'
        })
    }
    catch (e) {
        res.status(400).json({
            ok:false,
            e,
            msg: 'rejected'
        })
    }
}

//! Insert data
//* Sacando lo yankee para comentar, la idea es una sola pagina de carga, con la imagen
//* hacemos la peticion de la imagen aca, que se guardo cuando se cargue el teammate
//* en la seccion, poner una imagen predeterminada, para que, en caso de no poder cargar una imagen, se cargue una por defecto
//* despues se cambia!
const post = async (req = request, res = response) => { //! La key para referenciar el archivo es "file"
    //* First we get the image name, and upload it at the server:
    //if(!req.files || Object.keys(req.files).length == 0 || !req.files.file) { //! If the file not exist
    //    res.status(400).send(`Files weren't uploaded`)
    //    return //** Return! */
    //}

    //* Else, get the file name:
    //const img_id = await files.uploadFiles(req.files, undefined, 'images/teammates')
    //* Obtains other data from the body:
    const teammate = {
        link: req.body.link,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        linkedin: req.body.linkedin,
        github: req.body.github,
        name: req.body.name,
        profession: req.body.profession,
        locate: req.body.locate,
        img_id: req.body.img_id
    } //! Creates the object!
    try {
        const connection = await connect
        const result = await connection.query(/** insert! */ 'INSERT INTO teammates SET ?', teammate)
        res.status(200).json({
            ok:true,
            result,
            msg: 'approved'
        })
    }
    catch (e) {
        res.status(400).json({
            ok:false,
            e,
            msg:'rejected'
        })
    }
}

export const methods = { get, post }