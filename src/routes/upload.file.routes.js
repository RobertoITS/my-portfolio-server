import { Router } from "express"
import { check } from "express-validator"
import { tables } from "../middlewares/table.validator"
import { methods as controllerMethods } from "../controllers/upload.file.controller"

const router = Router()

//* Schema for the file uploaded
/**
 * @openapi
 * components:
 *  schemas:
 *      upload:
 *          type: object
 *          properties:
 *              file:
 *                  type: string
 *                  format: binary
 */

//* Documentation for the file upload (POST)
/**
 * @openapi
 * paths:
 *  /upload/{table}/{id}:
 *    post:
 *      summary: Uploads an avatar image for one teammate record.
 *      tags:
 *          - Upload
 *      parameters:
 *          - in: path
 *            name: table
 *            schema:
 *              type: string
 *            description: The table where be inserted the record
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            description: The ID of the teammate owner of the avatar
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          file:
 *                              type: string
 *                              format: binary
 *      responses:
 *          201:
 *              description: Created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  example: true
 *                              result:
 *                                  type: object
 *                                  properties:
 *                                      message:
 *                                          type: string
 *                                          example: Some row count message
 *                              msg:
 *                                  type: string
 *                                  example: approved
 *          404:
 *              description: Not Found (Table or Teammate's ID)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok: 
 *                                  type: boolean
 *                                  example: false
 *                              e:
 *                                  type: object
 *                                  properties:
 *                                      error:
 *                                          type: string 
 *                                          example: "Some error message"
 *                              msg:
 *                                  type: string
 *                                  example: rejected
 *          204:
 *              description: Empty form body
 *              content:
 *                  text/html:
 *                      schema:
 *                          type: string
 *                          example: Files where not uploaded
 */

//* Documentation for the file upload (GET)
/**
 * @openapi
 * paths:
 *  /upload/{table}/{id}:
 *    get:
 *      summary: Gets the avatar image for one teammate record.
 *      tags:
 *          - Upload
 *      parameters:
 *          - in: path
 *            name: table
 *            schema:
 *              type: string
 *            description: The table where be inserted the record
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            description: The ID of the teammate owner of the avatar
 *      responses:
 *          200:
 *              description: Teammate avatar
 *              content:
 *                  application/png:
 *                      schema:
 *                          type: string
 *                          format: binary
 *          400:
 *              description: Bad request (Something goes wrong)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok: 
 *                                  type: boolean
 *                                  example: false
 *                              e:
 *                                  type: object
 *                                  properties:
 *                                      error:
 *                                          type: string 
 *                                          example: "Some error message"
 *                              msg:
 *                                  type: string
 *                                  example: rejected
 *          404:
 *              description: Not Found (Teammate's ID or Avatar)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok: 
 *                                  type: boolean
 *                                  example: false
 *                              e:
 *                                  type: string
 *                                  example: "No record found || Miss place holder"
 *                              msg:
 *                                  type: string
 *                                  example: rejected
 */

//* Documentation for the file upload (PUT)
/**
 * @openapi
 * paths:
 *  /upload/{table}/{id}:
 *    put:
 *      summary: Update the avatar image for one teammate record.
 *      tags:
 *          - Upload
 *      parameters:
 *          - in: path
 *            name: table
 *            schema:
 *              type: string
 *            description: The table where be inserted the record
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            description: The ID of the teammate owner of the avatar
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          file:
 *                              type: string
 *                              format: binary
 *      responses:
 *          200:
 *              description: Edited
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  example: true
 *                              result:
 *                                  type: object
 *                                  properties:
 *                                      message:
 *                                          type: string
 *                                          example: Some row count message
 *                              msg:
 *                                  type: string
 *                                  example: approved
 *          400:
 *              description: Not Found (Table or Teammate's ID)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok: 
 *                                  type: boolean
 *                                  example: false
 *                              e:
 *                                  type: object
 *                                  properties:
 *                                      error:
 *                                          type: string 
 *                                          example: "Some error message"
 *                              msg:
 *                                  type: string
 *                                  example: rejected
 *          204:
 *              description: Empty form body
 *              content:
 *                  text/html:
 *                      schema:
 *                          type: string
 *                          example: Files where not uploaded
 *          404:
 *              description: Not Found (Teammate's ID)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok: 
 *                                  type: boolean
 *                                  example: false
 *                              e:
 *                                  type: string
 *                                  example: "No record available"
 *                              msg:
 *                                  type: string
 *                                  example: rejected
 */

//* Documentation for the file upload (DELETE)
/**
 * @openapi
 * paths:
 *  /upload/{table}/{id}:
 *    delete:
 *      summary: Delete the avatar image for one teammate record.
 *      tags:
 *          - Upload
 *      parameters:
 *          - in: path
 *            name: table
 *            schema:
 *              type: string
 *            description: The table where be inserted the record
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            description: The ID of the teammate owner of the avatar
 *      responses:
 *          200:
 *              description: Edited
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  example: true
 *                              msg:
 *                                  type: string
 *                                  example: deleted
 *          400:
 *              description: Not Found (Table or Teammate's ID)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok: 
 *                                  type: boolean
 *                                  example: false
 *                              e:
 *                                  type: object
 *                                  properties:
 *                                      error:
 *                                          type: string 
 *                                          example: "Some error message"
 *                              msg:
 *                                  type: string
 *                                  example: rejected
 *          404:
 *              description: Not Found (Teammate's avatar)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok: 
 *                                  type: boolean
 *                                  example: false
 *                              msg:
 *                                  type: string
 *                                  example: no picture found
 */

//! CreateReadUpdateDelete petitions

const tablesArray = ['teammates', 'projects']

router.get('/upload/:table/:id', [
    check('table').custom(t => tables.allowedTable(t, tablesArray)) //* Check the tables allowed
], controllerMethods.getFile)
router.post('/upload/:table/:id', [
    check('table').custom(t => tables.allowedTable(t, tablesArray))
], controllerMethods.postFile)
router.put('/upload/:table/:id', [
    check('table').custom(t => tables.allowedTable(t, tablesArray))
], controllerMethods.putFile)
router.delete('/upload/:table/:id', [
    check('table').custom(t => tables.allowedTable(t, tablesArray))
], controllerMethods.deleteFile)

export default router