import { Router } from "express"
import { check } from "express-validator"
import { tables } from "../middlewares/table.validator"
import { methods as controllerMethods } from "../controllers/upload.file.controller"

const router = Router()

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
router.delete('upload/:table/:id', [
    check('table').custom(t => tables.allowedTable(t, tablesArray))
], controllerMethods.deleteFile)

export default router