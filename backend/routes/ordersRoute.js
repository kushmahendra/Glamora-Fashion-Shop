import express from 'express'
import { handleCreateOrders,handleGetAllOrders,handleGetSingleOrder,handleUpdateStatus,handleDeleteOrder,handleRazorPay,handleOrders,handleverifyRazorpay } from '../controllers/ordersController.js'
import { verifyToken } from '../middlewares/authMiddleWare.js';

const orderRoute=express.Router();


orderRoute.post('/orders',verifyToken,handleCreateOrders)
orderRoute.post('/razorpay',verifyToken,handleRazorPay)
orderRoute.post('/orders',verifyToken,handleOrders)
orderRoute.get('/orders',handleGetAllOrders)
orderRoute.get('/orders/:id',handleGetSingleOrder)
orderRoute.put('/orders/:orderId',handleUpdateStatus)
orderRoute.delete('/orders/:id',handleDeleteOrder)

orderRoute.post('/verifyRazorpay',verifyToken,handleverifyRazorpay )


export default orderRoute;