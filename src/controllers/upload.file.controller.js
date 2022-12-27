import { request, response } from "express";
import { connect } from "../database/database";
import { files } from "../helpers/uploader";
const path = require('path')
const fs = require('fs') //* File system


/**
 * Para tener en cuenta, se cargan primero los datos escritos del usuario,
 * si todo esta OK, continua con la carga de la imagen.
 * Controlar todo desde el fron!
 */

/**
 * @param {endpoints} http://localhost:3000/'tabla'/'id'
 */

//* Upload a file:
//! MANDAR EL NOMBRE DE LA TABLA EN EL PARAMETRO!!!!! e.d. localhost:3000/'tabla'/'id'
const postFile = async(req = request, res = response) => { //! Reference key: "file"
    const id = req.params.id //* Object's id
    const table = req.body.table //* Reference table
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file) { //* If hasn't a file:
        res.status(400).send('Files where not uploaded')
        return
    }

    //* Get the file name and assemble to the object
    const img_id = await files.uploadFiles(req.files, undefined, `images/${table}`)
    const record = { img_id: img_id } //* Create the object
    try {
        const connection = await connect
        //* Update the user
        const result = await connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [record, id])
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
    }
    catch (err){
        res.status(400).json({
            ok: false,
            e,
            msg: 'rejected'
        })
    }
}

//* Change the file
//! MANDAR LA COLECION COMO PARAMETRO!!!! e.d. localhost:3000/'table'/'id'
const putFile = async(req = request, res = response) => {
    const id = req.params.id //* Object's id
    const table = req.params.table //* Reference table
    const connection = await connect
    const record = await connection.query(`SELECT * FROM ${table} WHERE id = ?`, id)
    console.log(record);
    if(record.length < 1) { //* Comprobamos que el usuario exista:
        return res.status(400).json({
            msg: 'No record available'
        })
    } else { 
        const img_id = record[0].img_id
        try {
            if(img_id){ //* If exist
                //* Generate the image path
                const imagePath = path.join(__dirname, '../uploads/images', table, img_id)
                if(fs.existsSync(imagePath)) { //* If exist
                    fs.unlinkSync(imagePath) //* Deleted
                    console.log('deleted');
                }
            }
        } catch (err){ /** Do nothing */ }
        //* Now, generate the new image
        const newImage = await files.uploadFiles(req.files, undefined, `images/${table}`) //* Image name
        const result = await connection.query(`UPDATE ${table} SET img_id = ? WHERE id = ?`, [newImage, id])
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
    }

}

//* Obtenemos el archivo
//! RECORDAR PONER EN LOS PARAMETROS LA COLECION O TABLA!!!
const getFile = async(req = request, res = response) => {
    const id = req.params.id //* Object's id
    const table = req.params.table  //* Reference table
    const connection = await connect
    const record = await connection.query(`SELECT id, img_id FROM ${table} WHERE id = ?`, id)
    if(record.length < 1) { //* If not exist
        return res.status(400).json({
            msg: `No record found`
        })
    } else {
        const img_id = record[0].img_id
        try {
            if (img_id){ //* If exist
                const imagePath = path.join(__dirname, '../uploads/images', table, img_id)
                console.log(imagePath)
                if(fs.existsSync(imagePath)){
                    return res.sendFile(imagePath) //* Send the file
                }
            }
        }
        catch (error) {
            res.status(500).json({
                ok:false,
                msg:error.msg
            })
        }
    }
    res.json({ //* If no image foun:
        ok:false,
        msg: 'Miss place holder'
    })

}

const deleteFile = async (req = request, res = response) => {
    const id = req.params.id //* Object's id
    const table = req.params.table  //* Reference table

    const connection = await connect

    const record = await connection.query(`SELECT img_id FROM ${table} WHERE id = ?`, id)
    console.log(record);
    const img_id = record[0].img_id //* Image's name
    try {
        if(img_id){ //* If exist
            //* Generate the image path
            const imagePath = path.join(__dirname, '../uploads/images', table, img_id)
            console.log(imagePath);
            if(fs.existsSync(imagePath)) { //* If exist
                fs.unlinkSync(imagePath) //* Deleted
                res.status(200).json({
                    ok:true,
                    msg: 'deleted'
                })
            }
        }
        else {
            res.status(200).json({
                ok:true,
                msg: 'no picture found'
            })
        }
    } catch (err){
        res.status(400).json({
            ok:false,
            msg: 'rejected'
        })
    }
}

export const methods = { postFile, putFile, getFile, deleteFile }