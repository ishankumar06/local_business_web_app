// import userModel from "../models/userModel.js";

// // Add products to user cart
// const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId, size } = req.body;

//     const userData = await userModel.findById(userId);
//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found", cartData: {} });
//     }
//     let cartData = userData.cartData || {};

//     const itemKey = String(itemId);
//     if (!cartData[itemKey]) cartData[itemKey] = {};
//     cartData[itemKey][size] = (cartData[itemKey][size] || 0) + 1;

//     // Make sure to use $set to avoid overwriting
//     const updatedUser = await userModel.findByIdAndUpdate(
//       userId,
//       { $set: { cartData } },
//       { new: true, useFindAndModify: false }
//     );

//     res.json({ success: true, message: "Item added to cart successfully", cartData: updatedUser.cartData });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message, cartData: {} });
//   }
// };

// // Update products in user cart
// const updateCart = async (req, res) => {
//   try {
//     const { userId, itemId, size, quantity } = req.body;

//     const userData = await userModel.findById(userId);
//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found", cartData: {} });
//     }
//     let cartData = userData.cartData || {};

//     const itemKey = String(itemId);
//     if (!cartData[itemKey]) cartData[itemKey] = {};
//     cartData[itemKey][size] = quantity;

//     const updatedUser = await userModel.findByIdAndUpdate(
//       userId,
//       { $set: { cartData } },
//       { new: true, useFindAndModify: false }
//     );

//     res.json({ success: true, message: "Cart updated", cartData: updatedUser.cartData });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message, cartData: {} });
//   }
// };

// // Get user cart data
// const getUserCart = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     // Validate userId: must exist and be a valid MongoDB ObjectId string
//     if (!userId || typeof userId !== "string" || userId.trim() === "") {
//       return res.status(400).json({
//         success: false,
//         message: "No valid userId provided",
//         cartData: {},
//       });
//     }

//     const userData = await userModel.findById(userId);
//     if (!userData) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//         cartData: {},
//       });
//     }

//     const cartData = userData.cartData || {};
//     res.json({ success: true, cartData });
//   } catch (error) {
//     console.error("Get user cart ERROR:", error);
//     res.status(500).json({ success: false, message: error.message, cartData: {} });
//   }
// };


// export { addToCart, updateCart, getUserCart };

import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found", cartData: {} });
    }
    let cartData = userData.cartData || {};

    const itemKey = String(itemId);
    const sizeKey = size && size.trim() !== "" ? size : "default"; // Use "default" if size is missing

    if (!cartData[itemKey]) cartData[itemKey] = {};
    cartData[itemKey][sizeKey] = (cartData[itemKey][sizeKey] || 0) + 1;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { cartData } },
      { new: true, useFindAndModify: false }
    );

    res.json({ success: true, message: "Item added to cart successfully", cartData: updatedUser.cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message, cartData: {} });
  }
};

// Update products in user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found", cartData: {} });
    }
    let cartData = userData.cartData || {};

    const itemKey = String(itemId);
    const sizeKey = size && size.trim() !== "" ? size : "default";

    if (!cartData[itemKey]) cartData[itemKey] = {};
    cartData[itemKey][sizeKey] = quantity;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { cartData } },
      { new: true, useFindAndModify: false }
    );

    res.json({ success: true, message: "Cart updated", cartData: updatedUser.cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message, cartData: {} });
  }
};

// Get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId || typeof userId !== "string" || userId.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "No valid userId provided",
        cartData: {},
      });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        cartData: {},
      });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Get user cart ERROR:", error);
    res.status(500).json({ success: false, message: error.message, cartData: {} });
  }
};

export { addToCart, updateCart, getUserCart };
