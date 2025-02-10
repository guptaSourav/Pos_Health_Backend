const Cart = require("../../Models/Cart");
const Test = require("../../Models/Test.model");
const HealthPackage = require("../../Models/HealthPackage");

// Helper function to fetch item details based on testType
const getItemDetails = async (itemId, itemType) => {
  let item = null;

  if (itemType === "HealthPackage") {
    item = await HealthPackage.findById(itemId).select("packageName price");
    if (item) {
      item = { name: item.packageName, price: item.price }; // Manually renaming
    }
  } else if (itemType === "Test") {
    item = await Test.findById(itemId).select("name price");
  }

  return item;
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { itemId, quantity = 1, itemType } = req.body;
    const {userId} = req.params;
    // console.log("user id : ",userId);

    if (!userId || !itemId || quantity <= 0 || !itemType) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Fetch item details from the correct collection
    const item = await getItemDetails(itemId, itemType);
    // console.log("items : ",item);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], totalAmount: 0 });
    }

    // Check if item already exists in the cart
    const existingItem = cart.items.find((i) => i.itemId.toString() === itemId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        itemId,
        itemType,
        name: item.name,
        price: item.price,
        quantity,
      });
    }

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get cart details (populate item details)
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate(
      "items.itemId",
      "name price"
    );

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
    const { itemId, quantity, itemType } = req.body;
    const userId = req.user.id

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.itemId.toString() !== itemId);

    if (quantity > 0) {
      const item = await getItemDetails(itemId, testType);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      cart.items.push({
        itemId,
        itemType,
        name: item.name,
        price: item.price,
        quantity,
      });
    }

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
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

    await Cart.findOneAndDelete({ userId });

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
