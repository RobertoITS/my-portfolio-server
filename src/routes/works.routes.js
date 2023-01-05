import { Router } from "express";
import { methods as controllerMethods } from "../controllers/works.controller";

const router = Router()

//* Schema of works
/**
 * @openapi
 * components:
 *   schemas:
 *     works:
 *       type: object
 *       properties:
 *         id: 
 *           type: int
 *           example: 55486
 *         title: 
 *           type: string
 *           example: Object title
 *         descrip:
 *           type: string
 *           example: This is a description of the object
 *         url:
 *           type: string
 *           example: http://object-url.com
 *         img_id:
 *           type: string
 *           example: fast-vc-2345.png
 */

//* Documentation for POST Work
/**
 * @openapi
 * /works:
 *  post:
 *      summary:
 *          Add one record to the data base
 *      tags:
 *          - Works
 *      requestBody:
 *          description: All fields required
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/works"
 *              application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/works"
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
 *          400:
 *              description: ERROR
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
 */

//* Documentation for GET all Works
/**
 * @openapi
 * /works:
 *  get:
 *      summary:
 *          Get all the Works from the DB
 *      tags:
 *          - Works
 *      responses:
 *          200:
 *              description: Information of all the works
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  example: true
 *                              result:
 *                                  type: array
 *                                  items:
 *                                      $ref: "#/components/schemas/works"
 *                              msg:
 *                                  type: string
 *                                  example: approved
 */

//* Documentation for PUT one Teammate
/**
 * @openapi
 * /work/{id}:
 *  put:
 *      summary:
 *          Edit one record to the data base
 *      tags:
 *          - Works
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            description: The ID of the work record
 *      requestBody:
 *          description: All fields required
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/works"
 *              application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/works"
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
 *              description: ERROR
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
 */

//* Documentation for DELETE one Teammate
/**
 * @openapi
 * /works/{id}:
 *  delete:
 *      summary:
 *          Delete one record from the data base
 *      tags:
 *          - Works
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: number
 *            description: The ID of a Work
 *      responses:
 *          200:
 *              description: Information of one work
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
 *                                          example: "Some approved message"
 *                              msg:
 *                                  type: string
 *                                  example: approved
 *          400:
 *              description: ERROR
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
 */

router.get('/works', controllerMethods.getAll)
router.post('/works', controllerMethods.post)
router.put('/works/:id', controllerMethods.put)
router.delete('/works/:id', controllerMethods.deleteOne)

export default router