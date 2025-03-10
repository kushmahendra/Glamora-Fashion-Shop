import express from 'express'
import {handleCreateProduct,handleGetAllProducts,handleSingleProduct,handleUpdateProduct,handleDeleteProduct,handleRelatedProduct,getAllProducts} from '../controllers/productController.js';
import { verifyToken } from '../middlewares/userMiddleWare.js';
import verifyAdmin from '../middlewares/verifyAdminMiddleware.js';

const productRoute=express.Router();


productRoute.post('/products',handleCreateProduct)
productRoute.get('/products',handleGetAllProducts)
productRoute.get('/all',getAllProducts)
productRoute.get('/product/:id',handleSingleProduct)
productRoute.patch('/update-product/:id',verifyToken,verifyAdmin,handleUpdateProduct)
productRoute.put('/product/:id',handleUpdateProduct);
productRoute.delete('/product/:id',handleDeleteProduct)
productRoute.get('/related/:id',handleRelatedProduct)

export default productRoute;

