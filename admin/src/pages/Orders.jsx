import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all orders from the backend (admin)
  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("Admin token missing. Please login.");
      return;
    }
    setLoading(true);
    try {
      // Use header format compatible with most Express backends
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle order status change
  const statusHandler = async (event, orderId) => {
    if (!token) {
      toast.error("Admin token missing. Please login.");
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="mb-4">Order Page</h3>
      {loading ? (
        <p className="text-center text-gray-600 my-8">Loading orders...</p>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500 my-8">No orders found.</p>
          ) : (
            orders.map((order) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
                key={order._id}
              >
                <img className="w-12" src={assets.parcel_icon} alt="Parcel Icon" />
                <div>
                  <div>
                    {order.items.map((item, idx) => (
                      <p className="py-0.5" key={idx}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                        {idx !== order.items.length - 1 ? ',' : ''}
                      </p>
                    ))}
                  </div>
                  <p className="mt-3 mb-2 font-medium">
                    {order.address?.firstName ?? ''} {order.address?.lastName ?? ''}
                  </p>
                  <div>
                    <p>{(order.address?.street ?? '') + ','}</p>
                    <p>
                      {(order.address?.city ?? '') + ','}
                      {(order.address?.state ?? '') + ','}
                      {(order.address?.country ?? '') + ','}
                      {order.address?.zipcode ?? ''}
                    </p>
                  </div>
                  <p>{order.address?.phone ?? ''}</p>
                </div>
                <div>
                  <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
                  <p className="mt-3">Method : {order.paymentMethod}</p>
                  <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm sm:text-[15px]">
                  {currency} {order.amount}
                </p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="p-2 font-semibold"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
