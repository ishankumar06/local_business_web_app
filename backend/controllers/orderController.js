// import orderModel from '../models/orderModel.js';
// import userModel from '../models/userModel.js';

// // Placing orders using COD method
// const placeOrder = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;

//     // Validate required fields
//     if (!userId || !items || !amount || !address) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "COD",
//       payment: false,
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     // Clear user cart with $set for safety
//     await userModel.findByIdAndUpdate(userId, { $set: { cartData: {} } });

//     res.json({ success: true, message: "Order Placed Successfully", orderId: newOrder._id });
//   } catch (error) {
//     console.error("placeOrder ERROR:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Stripe method stub (to implement)
// const placeOrderStripe = async (req,res) => {
//   res.status(501).json({ success: false, message: "Stripe order not implemented" });
// };

// // Razorpay method stub (to implement)
// const placeOrderRazorpay = async (req,res) => {
//   res.status(501).json({ success: false, message: "Razorpay order not implemented" });
// };

// // All orders data for admin panel
// const allOrders = async (req,res) => {
//   try {
//     const orders = await orderModel.find({});
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("allOrders ERROR:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // User orders for frontend
// const userOrders = async (req,res) => {
//   try {
//     const { userId } = req.body;
//     if (!userId) {
//       return res.status(400).json({ success: false, message: "Missing userId" });
//     }
//     const orders = await orderModel.find({ userId });
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("userOrders ERROR:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Update order status from admin panel
// const updateStatus = async (req,res) => {
//   try {
//     const { orderId, status } = req.body;
//     if (!orderId || !status) {
//       return res.status(400).json({ success: false, message: "Missing orderId or status" });
//     }
//     await orderModel.findByIdAndUpdate(orderId, { status });
//     res.json({ success: true, message: 'Status Updated' });
//   } catch (error) {
//     console.error("updateStatus ERROR:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };


import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Placing orders using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Validate required fields
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Validate items array and required fields within items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order items are required" });
    }
    for (let item of items) {
      if (!item._id || !item.quantity) {
        return res.status(400).json({ success: false, message: "Invalid item data in order items" });
      }
      // size is optional and can be undefined or null here
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user cart
    await userModel.findByIdAndUpdate(userId, { $set: { cartData: {} } });

    res.json({ success: true, message: "Order Placed Successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("placeOrder ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stripe method stub (to implement)
const placeOrderStripe = async (req, res) => {
  res.status(501).json({ success: false, message: "Stripe order not implemented" });
};

// Razorpay method stub (to implement)
const placeOrderRazorpay = async (req, res) => {
  res.status(501).json({ success: false, message: "Razorpay order not implemented" });
};

// All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error("allOrders ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// User orders for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("userOrders ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Missing orderId or status" });
    }
    // You can add validation for allowed statuses here if needed
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'Status Updated' });
  } catch (error) {
    console.error("updateStatus ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };
