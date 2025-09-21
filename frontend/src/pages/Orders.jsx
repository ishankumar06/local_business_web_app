// import React, { useContext, useState, useEffect } from 'react';
// import Title from '../components/Title';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Orders = () => {
//   const { backendUrl, token, currency, userId } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load user orders from backend
//   const loadOrderData = async () => {
//     if (loading) return; // Prevent concurrent fetches
//     setLoading(true);
//     try {
//       if (!token) {
//         toast.error("User not authenticated. Please login.");
//         setLoading(false);
//         return;
//       }
//       if (!userId) {
//         toast.error("User ID not found. Please login again.");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.post(
//         `${backendUrl}/api/order/userorders`,
//         { userId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.forEach((order) => {
//           order.items.forEach((item) => {
//             item.status = order.status;
//             item.date = order.date;
//             item.payment = order.payment;
//             item.paymentMethod = order.paymentMethod;
//             allOrdersItem.push(item);
//           });
//         });
//         setOrderData(allOrdersItem.reverse());
//         toast.success("Orders refreshed");
//       } else {
//         toast.error(response.data.message || "Failed to fetch orders");
//       }
//     } catch (error) {
//       console.error("Error loading orders:", error);
//       toast.error(error?.response?.data?.message || error.message || "Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token, userId]);

//   return (
//     <div className='border-t pt-16'>
//       <div className='text-2xl mb-4'>
//         <Title text1={'MY'} text2={'ORDERS'} />
//         <button
//           onClick={loadOrderData}
//           className='border px-4 py-2 text-sm font-medium rounded-sm float-right'
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Refresh Orders"}
//         </button>
//       </div>

//       <div>
//         {orderData.length === 0 ? (
//           <p className='text-gray-500 mt-6 text-center'>You have no orders yet.</p>
//         ) : (
//           orderData.map((item, index) => (
//             <div
//               key={index}
//               className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
//             >
//               <div className='flex items-start gap-6 text-sm'>
//                 <img
//                   className='w-16 sm:w-20'
//                   src={item.image?.[0] || ''}
//                   alt={item.name || 'Product image'}
//                 />

//                 <div>
//                   <p className='sm:text-base font-medium'>{item.name}</p>
//                   <div>
//                     <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
//                       <p>{currency}{item.price}</p>
//                       <p>Quantity: {item.quantity}</p>
//                       <p>Size: {item.size}</p>
//                     </div>
//                     <p className='mt-1'>
//                       Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
//                     </p>
//                     <p className='mt-1'>
//                       Payment Method: <span className='text-gray-400'>{item.paymentMethod}</span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className='md:w-1/2 flex justify-between'>
//                   <div className='flex items-center gap-2'>
//                     <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                     <p className='text-sm md:text-base'>{item.status}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency, userId } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load user orders from backend
  const loadOrderData = async () => {
    if (loading) return; // Prevent concurrent fetches
    setLoading(true);
    try {
      if (!token) {
        toast.error("User not authenticated. Please login.");
        setLoading(false);
        return;
      }
      if (!userId) {
        toast.error("User ID not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.date = order.date;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
        toast.success("Orders refreshed");
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error(error?.response?.data?.message || error.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-4">
        <Title text1={'MY'} text2={'ORDERS'} />
        <button
          onClick={loadOrderData}
          className="border px-4 py-2 text-sm font-medium rounded-sm float-right"
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh Orders"}
        </button>
      </div>

      <div>
        {orderData.length === 0 ? (
          <p className="text-gray-500 mt-6 text-center">You have no orders yet.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={item.image?.[0] || '/fallback-image.png'} // Replace '/fallback-image.png' with path to your fallback image
                  alt={item.name || 'Product image'}
                />

                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p>
                        {currency}{item.price.toFixed(2)}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      {item.size && <p>Size: {item.size}</p>}
                    </div>
                    <p className="mt-1">
                      Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                    </p>
                    <p className="mt-1">
                      Payment Method: <span className="text-gray-400">{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
