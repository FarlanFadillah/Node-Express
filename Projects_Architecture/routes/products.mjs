import express from 'express'
import { allProducts, createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/productsC.mjs'

const productsRouter = express.Router()

productsRouter.route('/').get(allProducts).post(createProduct)
productsRouter.get('/view/:id', getProduct)
productsRouter.delete('/delete/:id', deleteProduct)
productsRouter.patch('/update/:id', updateProduct)

export {productsRouter}