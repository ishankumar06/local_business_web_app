// import React, { useContext, useState, useEffect } from 'react';
// import Title from './Title';
// import { ShopContext } from '../context/ShopContext';
// import ProductItem from './ProductItem';  

// const BestSeller = () => {
//   const { products } = useContext(ShopContext);
//   const [bestSeller, setBestSeller] = useState([]);

//   useEffect(() => {
//     console.log("All products:", products);
//     const bestProduct = products.filter((item) => item.bestseller);
//     setBestSeller(bestProduct.slice(0, 5));
//   }, [products]);

//   return (
//     <div className='my-10'>
//       <div className='text-center text-3xl py-8'>
//         <Title text1={'BEST'} text2={'SELLERS'} />
//         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque pariatur dolores ea, quidem dignissimos laudantium, numquam, enim nihil ex quas tempore ducimus voluptatibus. Officiis illum iusto quod explicabo amet recusandae.
//         </p>
//       </div>

//       {/* Render best sellers */}
//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//         {bestSeller.map((item, index) => (
//           <ProductItem
//             key={index}
//             id={item._id}
//             image={item.image}
//             name={item.name}
//             price={item.price}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BestSeller;



import React, { useContext, useState, useEffect } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';  

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    console.log("All products:", products);
    const bestProduct = products.filter(
      (item) =>
        item.bestseller &&
        (item.category === "Newspapers" || item.category === "Books")
    );
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'PRODUCTS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Explore our top-selling newspapers and books, carefully selected by our customers for their quality and popularity. Stay informed and inspired with these best-loved picks.
        </p>
      </div>

      {/* Render best sellers */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;




