import { Router } from "express";
import { methods as controllerMethods } from "../controllers/teammates.controller";

const router = Router()

//! CreateReadUpdateDelete petitions

router.get('/teammates', controllerMethods.getAll)
router.get('/teammates/:last_name', controllerMethods.getOne)
router.post('/teammates', controllerMethods.postOne)
router.delete('/teammates/:id', controllerMethods.deleteOne)
router.put('/teammates/:id', controllerMethods.putOne)

export default router