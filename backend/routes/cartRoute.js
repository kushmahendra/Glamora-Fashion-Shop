import express from 'express'
import { handleAddCart, handleClearCart, handleGetSingleCart, handleRemoveCart, handleUpdateCart,handleUpdateCartItem  } from '../controllers/cartController.js';


const cartRoute=express.Router();

cartRoute.post('/add-to-carts',handleAddCart);
cartRoute.get('/:userId', handleGetSingleCart);
cartRoute.put('/update-cart',handleUpdateCart);
cartRoute.put('/update-cart-item',handleUpdateCartItem);
cartRoute.delete('/remove-cart',handleRemoveCart);
cartRoute.delete('/clear-cart/:userId',handleClearCart);


export default cartRoute;