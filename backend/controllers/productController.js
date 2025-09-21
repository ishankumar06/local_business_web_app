// import { v2 as cloudinary } from "cloudinary";
// import productModel from "../models/productModel.js";

// // Add product
// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

//     const image1 = req.files.image1 && req.files.image1[0];
//     const image2 = req.files.image2 && req.files.image2[0];
//     const image3 = req.files.image3 && req.files.image3[0];
//     const image4 = req.files.image4 && req.files.image4[0];

//     const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
//         return result.secure_url;
//       })
//     );

//     const productData = {
//       name,
//       description,
//       category,
//       price: Number(price),
//       subCategory,
//       bestseller: bestseller === "true",
//       sizes: JSON.parse(sizes),
//       image: imagesUrl,
//       date: Date.now(),
//     };

//     const product = new productModel(productData);
//     await product.save();

//     res.json({ success: true, message: "Product Added" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // List all products
// const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.json({ success: true, products });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Remove product by ID (RESTful)
// const removeProduct = async (req, res) => {
//   try {
//     const { id } = req.params; // updated
//     const product = await productModel.findByIdAndDelete(id);

//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, message: "Product Removed" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Single product info by ID
// const singleProduct = async (req, res) => {
//   try {
//     const { id } = req.params; // updated
//     const product = await productModel.findById(id);

//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, product });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { listProducts, addProduct, removeProduct, singleProduct };


import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2;
    const image3 = req.files.image3 && req.files.image3;
    const image4 = req.files.image4 && req.files.image4;

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      // Parse sizes safely: if sizes is undefined or empty string, default to empty array
      sizes: sizes ? JSON.parse(sizes) : [],
      image: imagesUrl,
      date: Date.now(),
    };

    // Optional: Validate category and subCategory against allowed enums here or in schema middleware

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all products, with optional filtering by category and subCategory
const listProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.subCategory) filter.subCategory = req.query.subCategory;

    const products = await productModel.find(filter).sort({ date: -1 });
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove product by ID
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Single product info by ID
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
