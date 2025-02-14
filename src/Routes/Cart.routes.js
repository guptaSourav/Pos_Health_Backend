const {
    addToCart,
    getCart,
    updateCartItem,
    clearCart,
    getCartDetailsById,
    removeCartItem
} = require('../Controllers/Cart/Cart.controller');
const express = require('express');
const accessControl = require("../Middleware/AccessControle.middleware");

const router = express.Router();

router.post('/add-to-cart',accessControl(["Patient"]), addToCart);
router.get('/get-cart-items',accessControl(["Admin"]), getCart);
router.patch('/update', updateCartItem);
router.delete('/clear/:userId', clearCart);
router.delete("/remove/:itemId",accessControl(["Patient"]),removeCartItem);
router.get("/get-cart-by-patient",accessControl(["Patient"]),getCartDetailsById);


module.exports = router;