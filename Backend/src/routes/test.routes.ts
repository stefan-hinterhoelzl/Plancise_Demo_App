
import { Router } from 'express'
import { testCall } from '../controllers/test.controller'
export const testRouter = Router();



testRouter.get('/', testCall)
