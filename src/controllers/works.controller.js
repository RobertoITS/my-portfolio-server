import { response, request } from "express";
import { connect } from "../database/database";

const getAll = async(req = request, res = response) => {
    try {
        const connection = await connect
        const result = await connection.query('SELECT * FROM works')
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'rejected'
        })
    }
}

const post = async(req = request, res = response) => {
    const work = { //* Obtain the data from the body
        title: req.body.title,
        descrip: req.body.descrip,
        url: req.body.url,
        //img_id: ''
    }

    try {
        const connection = await connect
        const result = await connection.query('INSERT INTO works SET ?', work)

        res.status(201).json({
            ok: true,
            result,
            msg: 'approved'
        })
    }
    catch(e){
        res.status(400).json({
            ok: false,
            e,
            msg: 'rejected'
        })
    }
}

const put = async(req = request, res = response) => {

    const id = req.params.id

    const work = { //* Obtain the data from the body
        title: req.body.title,
        descrip: req.body.descrip,
        url: req.body.url,
        //img_id: ''
    }

    try {
        const connection = await connect
        const result = await connection.query('UPDATE works SET ? WHERE id = ?', [work, id])
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })

    }
    catch (e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'rejected'
        })
    }
}

const deleteOne = async(req = request, res = response) => {
    const id = req.params.id

    try {
        const connection = await connection
        const result = await connection.query('DELETE FROM works WHERE id = ?', id)
        res.status(200).json({
            ok: true,
            result,
            msg: 'approved'
        })
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'rejected'
        })
    }
}

export const methods = { getAll, post, put, deleteOne }