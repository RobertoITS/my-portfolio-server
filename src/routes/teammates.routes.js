import { Router } from "express";
import { methods as controllerMethods } from "../controllers/teammates.controller";

const router = Router()

//! CreateReadUpdateDelete petitions

router.get('/', controllerMethods.getAll)
router.get('/:last_name', controllerMethods.getOne)
router.post('/', controllerMethods.postOne)
router.delete('/:id', controllerMethods.deleteOne)
router.put('/:id', controllerMethods.putOne)

export default router