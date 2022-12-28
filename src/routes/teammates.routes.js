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
 *              description: The mode of teammates
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

//! CreateReadUpdateDelete petitions

router.get('/teammates', controllerMethods.getAll)
router.get('/teammates/:last_name', controllerMethods.getOne)
router.post('/teammates', controllerMethods.postOne)
router.delete('/teammates/:id', controllerMethods.deleteOne)
router.put('/teammates/:id', controllerMethods.putOne)

export default router