import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Add product
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);

// Remove product by ID (RESTful)
productRouter.delete('/remove/:id', adminAuth, removeProduct);

// Get single product by ID
productRouter.get('/single/:id', singleProduct);

// List all products
productRouter.get('/list', listProducts);

export default productRouter;
