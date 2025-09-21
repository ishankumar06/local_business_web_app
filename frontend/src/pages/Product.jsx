// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import RelatedProduct from '../components/RelatedProducts';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [size, setSize] = useState('');

//   const fetchProductData = () => {
//     products.forEach((item) => {
//       if (item._id === productId) {
//         setProductData(item);
//         setImage(item.image[0]);
//       }
//     });
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products]);

//   if (!productData) return <div className="opacity-0"></div>;

//   // Ensure there are at least 4 images
//   const thumbnailImages = [...(productData.image || [])];
//   while (thumbnailImages.length < 4) {
//     thumbnailImages.push(thumbnailImages[0] || 'https://via.placeholder.com/300');
//   }

//   return (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/* Product Section */}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/* Product Images */}
//         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//           {/* Thumbnails */}
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
//             {thumbnailImages.slice(0, 4).map((item, index) => (
//               <img
//                 onClick={() => setImage(item)}
//                 src={item}
//                 key={index}
//                 className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border 
//                   ${image === item ? 'border-orange-500' : 'border-gray-300'} 
//                   hover:border-orange-500 transition`}
//                 alt={`Thumbnail ${index + 1}`}
//               />
//             ))}
//           </div>

//           {/* Main Image */}
//           <div className="w-full sm:w-[80%]">
//             <img className="w-full h-auto object-contain" src={image} alt="Main product" />
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="flex-1">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           <div className="flex items-center gap-1 mt-2">
//             {[...Array(5)].map((_, i) => (
//               <img key={i} src={assets.star_icon} alt="" className="w-3.5" />
//             ))}
//             <p className="pl-2">(122)</p>
//           </div>

//           <p className="mt-5 text-3xl font-medium">
//             {currency}
//             {productData.price}
//           </p>
//           <p className="mt-5 text-gray md:w-4/5">{productData.description}</p>

//           <div className="flex flex-col gap-4 my-8">
//             <p>Select size</p>
//             <div className="flex gap-2">
//               {productData.sizes.map((item, index) => (
//                 <button
//                   onClick={() => setSize(item)}
//                   className={`border py-2 px-4 bg-gray-100 ${
//                     item === size ? 'border-orange-500' : ''
//                   }`}
//                   key={index}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <button 
//             onClick={() => addToCart(productData._id, size)} 
//             className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
//           >
//             ADD TO CART
//           </button>
//           <hr className="mt-8 sm:w-4/5" />
//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>100% original product</p>
//             <p>Cash on delivery is available on this product</p>
//             <p>Easy return and exchange policy within 7 days</p>
//           </div>
//         </div>
//       </div>

//       {/* Description and Reviews */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className="border px-5 py-3 text-sm">Description</b>
//           <p className="border px-5 py-3 text-sm">Reviews (122)</p>
//         </div>
//         <div className="flex flex-col gap-4 border px-6 text-sm text-gray-500">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet...
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed descriptions, images...
//           </p>
//         </div>
//       </div>

//       {/* Related Products */}
//       <RelatedProduct
//         category={productData.category}
//         subCategory={productData.subCategory}
//       />
//     </div>
//   );
// };

// export default Product;



import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RelatedProduct from '../components/RelatedProducts';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image && product.image.length > 0 ? product.image[0] : 'https://via.placeholder.com/300');
      // Reset size when product changes
      setSize('');
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) return <div className="opacity-0"></div>;

  // Ensure there are at least 4 images for thumbnails, fill with first or placeholder
  const thumbnailImages = [...(productData.image || [])];
  while (thumbnailImages.length < 4) {
    thumbnailImages.push(thumbnailImages[0] || 'https://via.placeholder.com/300');
  }

  // Determine if size selection should be shown (skip if no sizes or empty)
  const showSizeSelection = productData.sizes && productData.sizes.length > 0;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Section */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {thumbnailImages.slice(0, 4).map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border 
                  ${image === item ? 'border-orange-500' : 'border-gray-300'} 
                  hover:border-orange-500 transition`}
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto object-contain" src={image} alt="Main product" loading="lazy" />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="Star" className="w-3.5" />
            ))}
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}{productData.price.toFixed(2)}
          </p>
          <p className="mt-5 text-gray md:w-4/5">{productData.description}</p>

          {showSizeSelection && (
            <div className="flex flex-col gap-4 my-8">
              <p>Select size</p>
              <div className="flex gap-2 flex-wrap">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? 'border-orange-500' : ''
                    }`}
                    key={index}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            disabled={showSizeSelection && !size}
            title={showSizeSelection && !size ? "Please select a size" : "Add to cart"}
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm cursor-pointer">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet...
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed descriptions, images...
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
