import { Router } from "express";
import { methods as controllerMethods } from "../controllers/teammates.controller";

const router = Router()

//! CreateReadUpdateDelete petitions

router.get('/', controllerMethods.get)
router.post('/', controllerMethods.post)

export default router