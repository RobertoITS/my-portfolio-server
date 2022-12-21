import { request, response } from "express";
import { connect } from "../database/database";
import { files } from "../helpers/uploader";
const path = require('path')
import { unlink } from 'node:fs/promises';
const fs = require('fs') //* File system

//! Get all the data
/**
 * 
 * @param {none} req No request
 * @param {any} res Returns the obtain data from the data base
 */
const getAll = async(req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query('SELECT * FROM teammates')

        //! Sector para devolver la imagen! Ver como funciona en tiempo real!
        result.forEach( function(element, index) { //* Recorremos la lista!
            try {
                if (element.img_id){
                    const imagePath = path.join(__dirname, '../uploads/images', 'teammates', element.img_id)
                    console.log(imagePath);
                    if(fs.existsSync(imagePath)){
                        
                        //Colocamos el path de la imagen
                        result[index].img_id = imagePath //* Enviamos la imagen
                    }
                    else {
                        result[index].img_id = null
                    }
                }
            }
            catch (error) {
                res.status(500).json({
                    ok:false,
                    msg:error.msg
                })
            }
        })
        //!
        
        res.status(200).json({
            ok:true,
            result,
            msg: 'approved'
        })
        return result
    }
    catch (e) {
        res.status(400).json({
            ok:false,
            e,
            msg: 'rejected'
        })
    }
}

//! Get one record
/**
 * 
 * @param {Request Data: Last Name} req string
 * @param {Return the search, or null} res Object json()
 */
const getOne = async(req =request, res = response) => {
    const last_name = req.params.last_name //* Obtains last name for search
    try {
        const connection = await connect
        const result = await connection.query('SELECT * FROM teammates WHERE last_name = ?', last_name)
        res.status(200).json({
            ok:true,
            result,
            msg:'approved'
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

//! Insert data
/**
 * 
 * @param {request data: teammate data and image} req Object json()
 * @param {any} res Sends message
 * @returns The data inserted
 * * In the form, insert an default image!
 */
const postOne = async (req = request, res = response) => { //! The reference key is "file"
    const data = req.body
    console.log(data);
    //* First we getAll the image name, and upload it at the server:
    if(!req.files || Object.keys(req.files).length == 0 || !req.files.file) { //! If the file not exist
        res.status(400).send(`Files weren't uploaded`)
        return //** Return! */
    }

    //* Get the file name:
    const img_id = await files.uploadFiles(req.files, undefined, 'images/teammates')

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
        img_id: img_id,
        last_name: req.body.last_name
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
    catch (e) { //! If it has an error:
        res.status(400).json({ //* Returns the error msg
            ok:false,
            e,
            msg:'rejected'
        })
        const filePath = path.join(__dirname, '../uploads/images/teammates/', img_id)
        console.log(dir);
        try {
            await unlink(filePath) //! Deletes the image
            console.log('Image successfully deleted');
        }
        catch (e) {
            console.log(`There was an error: ${e}`);
        }
    }
}

//! Delete data
//* La idea seria que la busqueda sea por el apellido, despues pasar el id, para que sea
//* 100% segura!
//* Poner en el sector de busqueda total (getAll), un boton de borrado (lista con boton), y cuando se clickee ahi,
//* pase el id
const deleteOne = async(req = request, res = response) => {
    const id = req.params.id
    try {
        const connection = await connect
        const result = await connection.query('DELETE FROM teammates WHERE id = ?', id)
        res.status(200).json({
            ok:true,
            result,
            msg:'approved'
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

//! Edit teammate info
//* Lo mismo que para borrar, la lista trae un boton, que pasa los datos obtenidos al body

const putOne = async(req = request, res = response) => {

    const id = req.params.id

    //* First we getAll the image name, and upload it at the server:
    if(!req.files || Object.keys(req.files).length == 0 || !req.files.file) { //! If the file not exist
        res.status(400).send(`Files weren't uploaded`)
        return //** Return! */
    }

    //* Get the file name:
    const img_id = await files.uploadFiles(req.files, undefined, 'images/teammates')

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
        img_id: img_id,
        last_name: req.body.last_name
    } //! Creates the object!

    try {
        const connection = await connect
        const result = await connection.query('UPDATE teammates SET ? WHERE id = ?', [teammate, id])
        res.status(200).json({
            ok:true,
            result,
            msg:'approved'
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

export const methods = { getAll, postOne, getOne, deleteOne, putOne }