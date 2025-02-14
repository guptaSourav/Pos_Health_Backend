const Order = require("../../Models/Order");
const Cart = require("../../Models/Cart");
const mongoose = require("mongoose");
const { generateReceipt } = require("../../Utils/generateReceipt");
const Test = require("../../Models/Test.model");

// Create Order from Cart (With Validation & Error Handling)
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    // Validate User ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Fetch Cart
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create Order
    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      paymentMethod: "COD",
      status: "pending",
    });

    await newOrder.save();

      // **Increment bookingsCount for each test in the order**
      for (const item of cart.items) {
        console.log("item : ",item);
        await Test.findByIdAndUpdate(item.itemId, { $inc: { bookingsCount: 1 } });
      }

    // Clear the cart after order placement
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Orders (Admin Only)
const getAllOrders = async (req, res) => {
  try {
    
    const orders = await Order.find()
      .populate("userId", "fullName address mobileNumber")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    const formattedOrders = orders.map((order) => ({
      id: order._id.toString(),
      patientName: order.userId.fullName || "Unknown",
      address: order.userId.address || "N/A",
      mobile: order.userId.mobileNumber || "N/A",
      items: order.items.map((item) => ({
        id: item.itemId,
        name: item.name,
        price: item.price,
      })),
      status: order.status.toLowerCase(),
      createdAt: order.createdAt.toISOString(),
      totalAmount: order.totalAmount,
    }));

    // console.log("formate data : ",formattedOrders);

    res.status(200).json({status:200, ordersData: formattedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get Orders by User ID
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Order by Order ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Order Status (Admin Only)

const updateOrderStatus = async (req, res) => {
  try {
    
    const { orderId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const validStatuses = ["pending", "called", "follow-up", "closed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order status
    order.status = status;
    await order.save();

    let receiptUrl = null;

    // Generate receipt if order is completed
    if (status === "Completed") {
      receiptUrl = await generateReceipt(order);
      order.receiptUrl = receiptUrl;
      await order.save();
    }

    res.status(200).json({
      status:200,
      message: "Order status updated successfully",
      order,
      receiptUrl,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Order (Admin Only)
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.status(200).json({status:200, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
