// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   items: { type: Array, required: true },
//   amount: { type: Number, required: true },
//   address: { type: Object, required: true },
//   status: { type: String, required: true, default: 'Order Placed' },
//   paymentMethod: { type: String, required: true },
//   payment: { type: Boolean, required: true, default: false },
//   date: { type: Number, required: true }
// });


// const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

// export default Order;

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  _id: { type: String, required: true },         // product ID
  name: { type: String, required: true },        // product name
  price: { type: Number, required: true },       // product price
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, default: null },         // optional size; null if not applicable
});

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: [itemSchema], required: true },  // array of order items
  amount: { type: Number, required: true },
  address: { type: Object, required: true },      // address object with fields defined at app level
  status: {
    type: String,
    enum: ['Order Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Order Placed',
    required: true,
  },
  paymentMethod: { type: String, required: true }, // e.g., 'COD', 'Stripe', 'Razorpay'
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },          // timestamp as a number
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
