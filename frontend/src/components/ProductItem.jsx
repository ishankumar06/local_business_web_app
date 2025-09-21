import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
      </div>

      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem;

// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";

// const ProductItem = ({ id, image, name, price }) => {
//   const { addToCart, currency } = useContext(ShopContext);

//   // Use the first image from the array
//   const mainImage = Array.isArray(image) && image.length > 0 ? image[0] : "/placeholder.png";

//   return (
//     <div className="border p-3 rounded shadow hover:shadow-lg transition flex flex-col items-center">
//       <img
//         src={mainImage}
//         alt={name}
//         className="w-full h-40 object-cover mb-3 rounded"
//       />
//       <h3 className="font-semibold text-sm text-center">{name}</h3>
//       <p className="text-gray-700">{currency}{price}</p>
//       <button
//         className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//         onClick={() => addToCart(id, "M")} // replace "M" with default or selected size
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// export default ProductItem;


