// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "../components/Title";
// import ProductItem from "../components/ProductItem";
// import { assets } from "../assets/assets";

// const Collection = () => {
//   const { products, search, showSearch } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subcategory, setSubcategory] = useState([]);
//   const [sortType, setSortType] = useState("relevant");

//   const toggleCategory = (e) => {
//     const value = e.target.value.toLowerCase();
//     if (category.includes(value)) {
//       setCategory((prev) => prev.filter((item) => item !== value));
//     } else {
//       setCategory((prev) => [...prev, value]);
//     }
//   };

//   const toggleSubcategory = (e) => {
//     const value = e.target.value.toLowerCase();
//     if (subcategory.includes(value)) {
//       setSubcategory((prev) => prev.filter((item) => item !== value));
//     } else {
//       setSubcategory((prev) => [...prev, value]);
//     }
//   };

//   const applyFilter = () => {
//     let productsCopy = [...products];

//     // Search filter
//     if (showSearch && search) {
//       productsCopy = productsCopy.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // Category filter
//     if (category.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         category.includes(item.category.toLowerCase())
//       );
//     }

//     // Subcategory filter
//     if (subcategory.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         subcategory.includes(item.subCategory.toLowerCase())
//       );
//     }

//     setFilterProducts(productsCopy);
//   };

//   const sortProducts = () => {
//     let fpCopy = [...filterProducts];

//     switch (sortType) {
//       case "low-high":
//         setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
//         break;

//       case "high-low":
//         setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
//         break;

//       default:
//         applyFilter();
//         break;
//     }
//   };

//   useEffect(() => {
//     setFilterProducts(products);
//   }, [products]);

//   useEffect(() => {
//     applyFilter();
//   }, [search, showSearch, category, subcategory,products]);

//   useEffect(() => {
//     sortProducts();
//   }, [sortType]);

//   return (
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
//       {/* Filter options */}
//       <div className="min-w-60">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="my-2 text-xl flex items-center cursor-pointer gap-2"
//         >
//           FILTERS
//           <img
//             className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
//             src={assets.dropdown_icon}
//             alt=""
//           />
//         </p>

//         {/* Category filter */}
//         <div
//           className={`border border-gray-300 pl-5 py-3 mt-6 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             <label className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="men"
//                 onChange={toggleCategory}
//               />
//               MEN
//             </label>
//             <label className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="women"
//                 onChange={toggleCategory}
//               />
//               WOMEN
//             </label>
//             <label className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="kids"
//                 onChange={toggleCategory}
//               />
//               KIDS
//             </label>
//           </div>
//         </div>

//         {/* Subcategory filter */}
//         <div
//           className={`border border-gray-300 pl-5 py-3 my-5 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">TYPE</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             <label className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="topwear"
//                 onChange={toggleSubcategory}
//               />
//               TopWear
//             </label>
//             <label className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="bottomwear"
//                 onChange={toggleSubcategory}
//               />
//               BottomWear
//             </label>
//             <label className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value="winterwear"
//                 onChange={toggleSubcategory}
//               />
//               WinterWear
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Product listing */}
//       <div className="flex-1">
//         <div className="flex justify-between text-base sm:text-2xl mb-4">
//           <Title text1="ALL" text2="COLLECTION" />
//           <select
//             onChange={(e) => setSortType(e.target.value)}
//             className="border-2 border-gray-300 text-sm px-2"
//           >
//             <option value="relevant">Sort by relevant</option>
//             <option value="low-high">Sort by low to high</option>
//             <option value="high-low">Sort by high to low</option>
//           </select>
//         </div>

//         {/* Map products */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//           {filterProducts.map((item) => (
//             <ProductItem
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collection;


import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value.toLowerCase();
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubcategory = (e) => {
    const value = e.target.value.toLowerCase();
    if (subcategory.includes(value)) {
      setSubcategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubcategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    // Search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category.toLowerCase())
      );
    }

    // Subcategory filter
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory.toLowerCase())
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = [...filterProducts];

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [search, showSearch, category, subcategory, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="newspapers"
                onChange={toggleCategory}
              />
              NEWSPAPERS
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="books"
                onChange={toggleCategory}
              />
              BOOKS
            </label>
          </div>
        </div>

        {/* Subcategory filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {/* Subcategories for Newspapers */}
            <p className="font-semibold">Newspapers</p>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="daily"
                onChange={toggleSubcategory}
              />
              Daily
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="weekly"
                onChange={toggleSubcategory}
              />
              Weekly
            </label>

            {/* Subcategories for Books */}
            <p className="font-semibold mt-4">Books</p>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="fiction"
                onChange={toggleSubcategory}
              />
              Fiction
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="non-fiction"
                onChange={toggleSubcategory}
              />
              Non-Fiction
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="comic"
                onChange={toggleSubcategory}
              />
              Comic
            </label>
            {/* Add other book subcategories as needed */}
          </div>
        </div>
      </div>

      {/* Product listing */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTION" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by relevant</option>
            <option value="low-high">Sort by low to high</option>
            <option value="high-low">Sort by high to low</option>
          </select>
        </div>

        {/* Map products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
