const Cart = require("../../Models/Cart");
const Test = require("../../Models/Test.model");
const HealthPackage = require("../../Models/HealthPackage");
const HealthRisk = require("../../Models/HealthRisk");

// Helper function to fetch item details based on testType
const getItemDetails = async (itemId, itemType) => {
  let item = null;

  if (itemType === "HealthPackage") {
    item = await HealthPackage.findById(itemId).select("packageName price");
    if (item) {
      item = { name: item.packageName, price: item.price }; // Manually renaming
    }
  } 
  else if (itemType === "Test") {  // ✅ Corrected syntax
    item = await Test.findById(itemId).select("name price");
  }

  return item;
};


const addToCart = async (req, res) => {
  try {
    const { item, quantity = 1, itemType } = req.body;
    const userId = req.user?.id; // Ensure userId exists

    console.log("🔹 User ID:", userId);
    console.log("🔹 Request Body:", req.body);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }
    if (!item || quantity <= 0 || !itemType) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Fetch item details
    const itemDetails = await getItemDetails(item, itemType);
    if (!itemDetails) {
      console.log("❌ Item not found:", item);
      return res.status(404).json({ message: "Item not found" });
    }

    console.log("✅ Item Details:", itemDetails);

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], totalAmount: 0 });
    }

    // Check if item already exists in the cart
    const existingItem = cart.items.find((i) => i.itemId.toString() === item);
    if (existingItem) {
      existingItem.quantity += quantity;
      console.log("🔄 Updated Quantity:", existingItem.quantity);
    } else {
      cart.items.push({
        itemId: item,
        itemType,
        name: itemDetails.name, // Fix: Use fetched details
        price: itemDetails.price, // Fix: Use fetched details
        quantity,
      });
      console.log("➕ New Item Added:", itemDetails.name);
    }

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    await cart.save();
    console.log("🛒 Cart Updated Successfully:", cart);

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("❌ Error in addToCart:", error);
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
    const userId = req.user.id;

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


const removeCartItem = async (req, res) => {
  try {
    console.log("inside cart remove!");
    const { itemId } = req.params;
    console.log("item id : ",itemId);
    const userId = req.user.id;

    let cart = await Cart.findOne({userId});
    console.log("before cart item : ",cart);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item to remove it
    const initialItemCount = cart.items.length;
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    console.log("after filter cart item : ",cart);
    
    // If no items were removed, return an error
    if (cart.items.length === initialItemCount) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    console.log("🗑️ Item removed successfully", itemId);

    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
    console.error("❌ Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getCartDetailsById = async (req, res) => {
  try {
    const patientId = req.user.id;

    const cart = await Cart.findOne({ userId: patientId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user." });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  clearCart,
  getCartDetailsById,
  removeCartItem
};
