// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({

//    name: {type:String, required:true},
//    description: {type:String, required:true},
//    price:{type:Number , required:true},
//    image: {type: Array, required:true},
//    category: {type:String, required: true},
//    subCategory: { type: String, default: "general" },
//    sizes:{type:Array, required: true},
//    bestseller: {type:Boolean},
//    date: {type :Number, required: true}

// })

// const productModel = mongoose.models.product || mongoose.model("product",productSchema);

// export default productModel




import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: [String], required: true }, // Specify array of strings for URLs
  category: { 
    type: String, 
    required: true,
    enum: ['Newspapers', 'Books'] // Add allowed category options for validation
  },
  subCategory: { 
    type: String, 
    default: "general",
    enum: [
      'Daily', 'Weekly',    // For Newspapers
      'Fiction', 'Non-Fiction', 'Comic', // For Books
      'general'
    ],
  },
  sizes: { 
    type: [String], 
    required: true,
    default: [],             // Default empty array for products without sizes (e.g., newspapers)
  },
  bestseller: { type: Boolean, default: false },
  date: { type: Number, required: true }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
