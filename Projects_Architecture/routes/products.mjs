import express from 'express'
import { allProducts, createProduct, deleteProduct, getProduct, searchProduct, updateProduct } from '../controllers/productsC.mjs'

const productsRouter = express.Router()

productsRouter.route('/').get(allProducts).post(createProduct);
productsRouter.get('/view/:id', getProduct);
productsRouter.get('/query', searchProduct);
productsRouter.delete('/delete/:id', deleteProduct);
productsRouter.patch('/update/:id', updateProduct);

export {productsRouter}