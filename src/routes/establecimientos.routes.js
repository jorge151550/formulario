import { Router } from "express";
import {deleteEstablecimiento, getEstablecimiento,getEstablecimientos, postEstablecimiento, putEstablecimiento} from '../controllers/establecimiento.controller.js'

const router = Router()
router.get('/establecimientos', getEstablecimientos)
router.get('/establecimientos/:id', getEstablecimiento)
router.post('/establecimientos', postEstablecimiento )
router.patch('/establecimientos/:id', putEstablecimiento)
router.delete('/establecimientos/:id', deleteEstablecimiento)

export default router