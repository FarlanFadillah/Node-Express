import express from 'express'
import { home } from '../controllers/homeC.mjs'

const homeRouter = express.Router()

homeRouter.get('/', home)

export {homeRouter}