import { Router } from "express";
import { methods as controllerMethods } from "../controllers/teammates.controller";

const router = Router()

//* Schema of teammates
/**
 * @openapi
 * components:
 *   schemas:
 *     teammates:
 *       type: object
 *       properties:
 *         id: 
 *           type: int
 *           example: 55486
 *         link: 
 *           type: string
 *           example: https://my-host.com/portfolio
 *         facebook:
 *           type: string
 *           example: http://facebook.com/my-facebook
 *         twitter:
 *           type: string
 *           example: http://twitter.com/my-twitter
 *         instagram:
 *           type: string
 *           example: http://instagram.com/my-instagram
 *         linkedin:
 *           type: string
 *           example: http://linkedin.com/my-linkedin
 *         github: 
 *           type: string
 *           example: http://git-hub.com/my-git-hub
 *         name:
 *           type: string
 *           example: John
 *         profession:
 *           type: string
 *           example: Developer
 *         locate:
 *           type: string
 *           example: United States
 *         img_id:
 *           type: string
 *           string: fasd-vc-2345.png
 *         last_name:
 *           type: string
 *           example: Millers
 */

//* Documentation for POST Teammate
/**
 * @openapi
 * /teammates:
 *  post:
 *      summary:
 *          Add one record to the data base
 *      tags:
 *          - Teammates
 *      requestBody:
 *          description: All fields required
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/teammates"
 *              application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/teammates"
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

//* Documentation for GET all Teammates
/**
 * @openapi
 * /teammates/:
 *  get:
 *      summary:
 *          Get all the teammates from the DB
 *      tags:
 *          - Teammates
 *      responses:
 *          200:
 *              description: Information of all the teammates
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
 *                                      $ref: "#/components/schemas/teammates"
 *                              msg:
 *                                  type: string
 *                                  example: approved
 */

//* Documentation for GET one Teammate
/**
 * @openapi
 * /teammates/{last_name}:
 *  get:
 *      summary:
 *          Get one record from the data base
 *      tags:
 *          - Teammates
 *      parameters:
 *          - in: path
 *            name: last_name
 *            schema:
 *                type: string
 *            description: The last name of a Teammate
 *      responses:
 *          200:
 *              description: Information of one teammate
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
 *                                      $ref: "#/components/schemas/teammates"
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

//* Documentation for PUT one Teammate
/**
 * @openapi
 * /teammates/{id}:
 *  put:
 *      summary:
 *          Edit one record to the data base
 *      tags:
 *          - Teammates
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            description: The ID of the teammate record
 *      requestBody:
 *          description: All fields required
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/teammates"
 *              application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/teammates"
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
 * /teammates/{id}:
 *  delete:
 *      summary:
 *          Delete one record from the data base
 *      tags:
 *          - Teammates
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: number
 *            description: The ID of a Teammate
 *      responses:
 *          200:
 *              description: Information of one teammate
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


//! CreateReadUpdateDelete petitions

router.get('/teammates', controllerMethods.getAll)
router.get('/teammates/:last_name', controllerMethods.getOne)
router.post('/teammates', controllerMethods.postOne)
router.delete('/teammates/:id', controllerMethods.deleteOne)
router.put('/teammates/:id', controllerMethods.putOne)

export default router