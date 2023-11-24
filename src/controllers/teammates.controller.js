import { request, response } from "express";
import { getConnection } from "../database/database";

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
 * @param {endpoints} http://localhost:3000/teammates // :last_name // :id
 */

//! Insert data
/**
 * 
 * @param {request data: teammate data and image} req Object json()
 * @param {any} res Sends message
 * @returns The data inserted
 * * In the form, insert an default image!
 */
const postOne = async (req = request, res = response) => { //! The reference key is "file"

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
        //img_id: '', //! Null value, send the image later (or not, depends of the user)
        last_name: req.body.last_name
    } //! Creates the object!
    
    try {
        const connection = await getConnection()
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
    }
}


//! Get all the data
/**
 * 
 * @param {none} req No request
 * @param {any} res Returns the obtain data from the data base
 */
const getAll = async(req = request, res = response) => {
    try {
        console.log(getConnection());
        const connection = await getConnection()
        const result = await connection.query('SELECT * FROM teammates')
        
        res.status(200).json({
            ok:true,
            result,
            msg: 'approved'
        })
        return result
    }
    catch (e) {
        console.log(e);
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
        const connection = await getConnection()
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

//! Delete data
/**
 * 
 * @param { id } req string => ID of the teammate
 * @param { json } res Object json
 * @returns Object json => row change
 */
const deleteOne = async(req = request, res = response) => {
    const id = req.params.id
    try {
        const connection = await getConnection()
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
/**
 * 
 * @param { id } req string => ID of the teammate
 * @param { json } res Object json => Returns the row change
 */
const putOne = async(req = request, res = response) => {

    const id = req.params.id

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
        last_name: req.body.last_name
    } //! Creates the object!

    try {
        const connection = await getConnection()

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