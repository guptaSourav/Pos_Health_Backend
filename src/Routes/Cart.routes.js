const {
    addToCart,
    getCart,
    updateCartItem,
    clearCart,
} = require('../Controllers/Cart/Cart.controller');
const express = require('express');

const router = express.Router();

router.post('/add-to-cart/:userId', addToCart);
router.get('/get-cart-items/:userId', getCart);
router.patch('/update', updateCartItem);
router.delete('/clear/:userId', clearCart);


module.exports = router;