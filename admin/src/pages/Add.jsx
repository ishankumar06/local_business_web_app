// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import axios from 'axios'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify'

// const Add = ({ token }) => {
//   const [image1, setImage1] = useState(false);
//   const [image2, setImage2] = useState(false);
//   const [image3, setImage3] = useState(false);
//   const [image4, setImage4] = useState(false);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [subcategory, setSubcategory] = useState("Topwear");
//   const [sizes, setSizes] = useState([]);
//   const [bestseller, setBestseller] = useState(false);
  
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       image1 && formData.append('image1', image1);
//       image2 && formData.append('image2', image2);
//       image3 && formData.append('image3', image3);
//       image4 && formData.append('image4', image4);

//       formData.append('name', name);
//       formData.append('description', description);
//       formData.append('price', price);
//       formData.append('category', category);
//       formData.append('subcategory', subcategory);
//       formData.append('sizes', JSON.stringify(sizes));
//       formData.append('bestseller', bestseller);

//       const response = await axios.post(
//         backendUrl + "/api/product/add",
//         formData,
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setName('');
//         setDescription('');
//         setImage1(false);
//         setImage2(false);
//         setImage3(false);
//         setImage4(false);
//         setPrice('');
//         setSizes([]);
//         setBestseller(false);
//       } else {
//         toast.error(response.data.message);
//       }

//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error(error.message || "Something went wrong!");
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
//       {/* Upload Images */}
//       <div>
//         <p className='mb-2'>Upload Images</p>
//         <div className='flex gap-2'>
//           {[setImage1, setImage2, setImage3, setImage4].map((setImg, idx) => {
//             const img = [image1, image2, image3, image4][idx];
//             return (
//               <label key={idx} htmlFor={`image${idx + 1}`}>
//                 <img className='w-20 h-20 object-cover border'
//                   src={!img ? assets.upload_area : URL.createObjectURL(img)}
//                   alt={`upload-${idx + 1}`} />
//                 <input onChange={(e) => setImg(e.target.files[0])} type="file" id={`image${idx + 1}`} hidden />
//               </label>
//             );
//           })}
//         </div>
//       </div>

//       {/* Name */}
//       <div className='w-full'>
//         <p className='mb-2'>Product Name</p>
//         <input onChange={(e) => setName(e.target.value)} value={name}
//           className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Type here' />
//       </div>

//       {/* Description */}
//       <div className='w-full'>
//         <p className='mb-2'>Product Description</p>
//         <textarea onChange={(e) => setDescription(e.target.value)} value={description}
//           className='w-full max-w-[500px] px-3 py-2 border' placeholder='Write content here' />
//       </div>

//       {/* Category, Subcategory, Price */}
//       <div className='flex flex-col sm:flex-row gap-4 w-full'>
//         <div>
//           <p className='mb-2'>Category</p>
//           <select onChange={(e) => setCategory(e.target.value)} value={category}
//             className='w-full px-3 py-2 border'>
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             <option value="Kids">Kids</option>
//           </select>
//         </div>

//         <div>
//           <p className='mb-2'>Sub Category</p>
//           <select onChange={(e) => setSubcategory(e.target.value)} value={subcategory}
//             className='w-full px-3 py-2 border'>
//             <option value="Topwear">Topwear</option>
//             <option value="Bottomwear">Bottomwear</option>
//             <option value="Winterwear">Winterwear</option>
//           </select>
//         </div>

//         <div>
//           <p className='mb-2'>Price</p>
//           <input onChange={(e) => setPrice(e.target.value)} value={price}
//             className='w-full sm:w-[120px] px-3 py-2 border' type="number" placeholder='25' />
//         </div>
//       </div>

//       {/* Sizes */}
//       <div>
//         <p className='mb-2'>Available Sizes</p>
//         <div className='flex gap-3'>
//           {["S", "M", "L", "XL", "XXL"].map(size => (
//             <div key={size} onClick={() =>
//               setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
//             }>
//               <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>
//                 {size}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bestseller */}
//       <div className='flex gap-2 mt-2'>
//         <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
//         <label htmlFor="bestseller" className='cursor-pointer'>Add to Bestseller</label>
//       </div>

//       <button type='submit' className='w-28 py-3 mt-4 bg-black text-white rounded'>
//         ADD
//       </button>
//     </form>
//   );
// };

// export default Add;


import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { currency } from '../App';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Newspapers');
  const [subcategory, setSubcategory] = useState('Daily');
  const [formats, setFormats] = useState([]); // updated from sizes
  const [bestseller, setBestseller] = useState(false);

  // Show formats only if category is Books
  const showFormats = category === 'Books';

  const bookFormats = ['Hardcover', 'Paperback', 'eBook', 'Audiobook'];

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subcategory);
      formData.append('formats', JSON.stringify(formats)); // send formats instead of sizes
      formData.append('bestseller', bestseller);

      const response = await axios.post(
        backendUrl + '/api/product/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setFormats([]); // reset formats
        setBestseller(false);
        setCategory('Newspapers');
        setSubcategory('Daily');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.message || 'Something went wrong!');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      {/* Upload Images */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {[setImage1, setImage2, setImage3, setImage4].map((setImg, idx) => {
            const img = [image1, image2, image3, image4][idx];
            return (
              <label key={idx} htmlFor={`image${idx + 1}`}>
                <img
                  className="w-20 h-20 object-cover border"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt={`upload-${idx + 1}`}
                />
                <input onChange={(e) => setImg(e.target.files[0])} type="file" id={`image${idx + 1}`} hidden />
              </label>
            );
          })}
        </div>
      </div>

      {/* Name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-[500px] px-3 py-2 border"
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Write content here"
          required
          className="w-full max-w-[500px] px-3 py-2 border"
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div>
          <p className="mb-2">Category</p>
          <select
            onChange={(e) => {
              const val = e.target.value;
              setCategory(val);
              setSubcategory(val === 'Books' ? 'Fiction' : 'Daily');
              if (val !== 'Books') setFormats([]);
            }}
            value={category}
            required
            className="w-full px-3 py-2 border"
          >
            <option value="Newspapers">Newspapers</option>
            <option value="Books">Books</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubcategory(e.target.value)}
            value={subcategory}
            required
            className="w-full px-3 py-2 border"
          >
            {category === 'Books' ? (
              <>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Comic">Comic</option>
                <option value="general">General</option>
              </>
            ) : (
              <>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="general">General</option>
              </>
            )}
          </select>
        </div>

        <div>
          <p className="mb-2">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="25"
            min="0"
            step="0.01"
            required
            className="w-full sm:w-[120px] px-3 py-2 border"
          />
        </div>
      </div>

      {/* Formats only for Books */}
      {showFormats && (
        <div>
          <p className="mb-2">Available Formats</p>
          <div className="flex gap-3 flex-wrap">
            {bookFormats.map((format) => (
              <div
                key={format}
                onClick={() =>
                  setFormats((prev) =>
                    prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
                  )
                }
              >
                <p className={`${formats.includes(format) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>
                  {format}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bestseller */}
      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to Bestproducts
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white rounded">
        ADD
      </button>
    </form>
  );
};

export default Add;
