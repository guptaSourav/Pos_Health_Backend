const Cart = require("../../Models/Cart");

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, itemType, name, price, quantity } = req.body;

    if (!userId || !itemId || !itemType || !name || !price || quantity <= 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalAmount: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.itemId.toString() === itemId && item.itemType === itemType
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ itemId, itemType, name, price, quantity });
    }

    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get cart details
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update cart item (Change quantity or remove item)
const updateCartItem = async (req, res) => {
  try {
    const { userId, itemId, itemType, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => !(item.itemId.toString() === itemId && item.itemType === itemType));

    if (quantity > 0) {
      cart.items.push({ itemId, itemType, quantity });
    }

    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  clearCart,
};
