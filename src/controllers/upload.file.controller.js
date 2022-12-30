import { request, response } from "express";
import { connect } from "../database/database";
import { files } from "../helpers/uploader";
const path = require('path')
const fs = require('fs') //* File system


/**
 * Status codes:
 * 200 ok
 * 201 created
 * 204 no content (body)
 * 304 not modify
 * 400 bad request
 * 404 not found
 */

/**
 * @description:
 *      Remember, first upload teammate's data (follow teammate routes), then
 *      proceeds with the file upload.
 *      If the first load fails, the file will not be uploaded.
 *      Otherwise, if the data fails, and the file is uploaded, it will 
 *      create junk files on the server.
 */

/**
 * @param {endpoints} http://localhost:3000/'tabla'/'id'
 */

//* Upload a file:
/**
 * @param {table}: string => //! in - endpoint -
 * @param {id}: string => //! in - endpoint -
 * @returns object type: teammate
 */
const postFile = async(req = request, res = response) => { //! Reference key: "file"
    const id = req.params.id //* Object's id
    const table = req.params.table //* Reference table
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file) { //* If hasn't a file:
        res.status(204).send('Files where not uploaded')
        return
    }

    //* Get the file name and assemble to the object
    const img_id = await files.uploadFiles(req.files, undefined, `images/${table}`)
    const record = { img_id: img_id } //* Create the object
    try {
        const connection = await connect
        //* Update the user
        const result = await connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [record, id])
        res.status(201).json({
            ok: true,
            result,
            msg: 'approved'
        })
    }
    catch (err){
        res.status(404).json({
            ok: false,
            err,
            msg: 'rejected'
        })
    }
}

//* Get the file
/**
 * @param {table}: string => //! in - endpoint -
 * @param {id}: string => //! in - endpoint -
 * @returns object type: teammate
 */
const getFile = async(req = request, res = response) => {
    const id = req.params.id //* Object's id
    const table = req.params.table  //* Reference table
    try {
        const connection = await connect
        const record = await connection.query(`SELECT id, img_id FROM ${table} WHERE id = ?`, id)
        if(record.length < 1) { //* If not exist
            return res.status(404).json({
                ok: false,
                e: 'No record found',
                msg: 'rejected'
            })
        } else {
            const img_id = record[0].img_id
            try {
                if (img_id){ //* If exist
                    const imagePath = path.join(__dirname, '../uploads/images', table, img_id)
                    console.log(imagePath)
                    if(fs.existsSync(imagePath)){
                        return res.status(200).sendFile(imagePath) //* Send the file
                    }
                }
            }
            catch (err) {
                res.status(400).json({
                    ok:false,
                    err,
                    msg:'rejected'
                })
            }
        }
        res.status(404).json({ //* If no image foun:
            ok:false,
            e: 'Miss place holder',
            msg: 'rejected'
        })
    }
    catch (err) {
        res.status(400).json({
            ok:false,
            err,
            msg: 'rejected'
        })
    }
    

}

//* Change the file
/**
 * @param {table}: string => //! in - endpoint -
 * @param {id}: string => //! in - endpoint -
 * @returns object type: teammate
 */
const putFile = async(req = request, res = response) => {
    const id = req.params.id //* Object's id
    const table = req.params.table //* Reference table
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file) { //* If hasn't a file:
        res.status(204).send('Files where not uploaded')
        return
    }
    try {
        const connection = await connect
        const record = await connection.query(`SELECT * FROM ${table} WHERE id = ?`, id)
        console.log(record);
        if(record.length < 1) { //* If user exist:
            return res.status(404).json({
                ok: false,
                e: 'No record available',
                msg: 'rejected'
            })
        } else { 
            const img_id = record[0].img_id
            try {
                if(img_id){ //* If exist
                    //* Generate the image path
                    const imagePath = path.join(__dirname, '../uploads/images', table, img_id)
                    if(fs.existsSync(imagePath)) { //* If exist
                        fs.unlinkSync(imagePath) //* Deleted
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
    catch (err) {
        res.status(400).json({
            ok: false,
            err,
            msg: 'rejected'
        })
    }
    

}

//* Deletes a file
/**
 * @param {table}: string => //! in - endpoint -
 * @param {id}: string => //! in - endpoint -
 * @returns object type: teammate
 */
const deleteFile = async (req = request, res = response) => {
    const id = req.params.id //* Object's id
    const table = req.params.table  //* Reference table

    try {
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
                res.status(404).json({
                    ok:true,
                    msg: 'no picture found'
                })
            }
        } catch (err){
            res.status(400).json({
                ok:false,
                err,
                msg: 'rejected'
            })
        }
    }
    catch (err) {
        res.status(400).json({
            ok: false,
            err,
            msg: 'rejected'
        })
    }
    
}

export const methods = { postFile, putFile, getFile, deleteFile }