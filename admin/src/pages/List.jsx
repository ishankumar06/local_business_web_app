import React, { useState, useEffect } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { products } from '../../../frontend/src/assets/assets';


const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  // fetch all products
  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // remove product by id
  const removeProduct = async (id) => {
    if (removingId) return; // prevent multiple deletes
    try {
      setRemovingId(id);
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // refresh list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (!list.length) return <p>No products found.</p>;

  return (
    <>
      <p className="mb-2 font-semibold text-gray-700">All Products List</p>

      <div className="flex flex-col gap-2">
        {/* list table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-medium">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* product list */}
        {list.map((item) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-3 border text-sm hover:bg-gray-50 transition"
            key={item._id}
          >
            <img
              className="w-12 h-12 object-cover rounded"
              src={item.image?.[0] || '/placeholder.png'}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className={`text-red-500 text-center cursor-pointer text-lg hover:scale-110 transition ${
                removingId === item._id ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              ✕
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
