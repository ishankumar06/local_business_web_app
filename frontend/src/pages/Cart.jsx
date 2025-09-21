// import React, { useContext, useState, useEffect } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import CartTotal from '../components/CartTotal';
// import { assets } from '../assets/assets';

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {

//     if(products.length > 0) {

//          const tempData = [];
//     for (const productId in cartItems) {
//       for (const size in cartItems[productId]) {
//         if (cartItems[productId][size] > 0) {
//           tempData.push({
//             _id: productId,
//             size,
//             quantity: cartItems[productId][size],
//           });
//         }
//       }
//     }
//     setCartData(tempData);

//     }

 
//   }, [cartItems,products]);

//   return (
//     <div className="border-t pt-14">
//       <div className="text-2xl mb-3">
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       <div>
//         {cartData.map((item, index) => {
//           const productData = products.find((p) => p._id === item._id);
//           if (!productData) return null;

//           return (
//             <div
//               key={index}
//               className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//             >
//               <div className="flex items-start gap-6">
//                 <img className="w-16 sm:w-20" src={productData.image[0]} alt={productData.name} />
//                 <div>
//                   <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
//                   <div className="flex items-center gap-5 mt-2">
//                     <p>
//                       {currency}
//                       {productData.price}
//                     </p>
//                     <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
//                   </div>
//                 </div>
//               </div>

//               <input
//                 onChange={(e) =>
//                   e.target.value === '' || e.target.value === '0'
//                     ? null
//                     : updateQuantity(item._id, item.size, Number(e.target.value))
//                 }
//                 className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                 type="number"
//                 min={1}
//                 defaultValue={item.quantity}
//               />

//               <img
//                 onClick={() => updateQuantity(item._id, item.size, 0)}
//                 className="w-4 mr-4 sm:w-5 cursor-pointer"
//                 src={assets.bin_icon}
//                 alt="Remove item"
//               />
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-[450px]">
//           <CartTotal />
//           <div className="w-full text-end">
//             <button
//               onClick={() => navigate('/place-order')}
//               className="bg-black text-white text-sm my-8 px-8 py-3"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Confirm before removing item
  const handleRemoveItem = (itemId, size) => {
    if (window.confirm("Are you sure you want to remove this item from your cart?")) {
      updateQuantity(itemId, size, 0);
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);
          if (!productData) return null;

          // Use first image or fallback
          const productImage =
            productData.image && productData.image.length > 0
              ? productData.image[0]
              : assets.fallback_img; // make sure you have a fallback image in assets

          // Determine if size should show (only if product has sizes and size is valid)
          const showSize = productData.sizes && productData.sizes.length > 0 && item.size;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productImage} alt={productData.name} />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    {showSize && (
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                    )}
                  </div>
                </div>
              </div>

              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              <img
                onClick={() => handleRemoveItem(item._id, item.size)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove item"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
