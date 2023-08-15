import express from 'express'
const router = express.Router()
import { userController } from '../controllers'
// import * as validation from '../validation'

router.get('/cashFreeIntegration', userController.cashFreeIntegration)




export const userRouter = router