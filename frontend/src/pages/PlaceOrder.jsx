// import React, { useContext, useState } from "react";
// import CartTotal from "../components/CartTotal";
// import { ShopContext } from "../context/ShopContext";
// import Title from "../components/Title";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Placeorder = () => {
//   const [method, setMethod] = useState("cod");

//   // Destructure only context fields that are always there
//   const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

//   // Always get userId from localStorage so it's available even on refresh
//   const userId = localStorage.getItem("userId");

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       let orderItems = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             const itemInfo = structuredClone(products.find(product => product._id === items));
//             if (itemInfo) {
//               itemInfo.size = item;
//               itemInfo.quantity = cartItems[items][item];
//               orderItems.push(itemInfo);
//             }
//           }
//         }
//       }

//       if (!userId) {
//         toast.error("Login required to place an order.");
//         navigate("/login");
//         return;
//       }

//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee,
//         userId: userId,
//       };

//       switch (method) {
//         case "cod":
//           const response = await axios.post(
//             backendUrl + "/api/order/place",
//             orderData,
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           console.log(response.data);
//           if (response.data.success) {
//             setCartItems({});
//             navigate("/orders");
//           } else {
//             toast.error(response.data.message);
//           }
//           break;

//         default:
//           break;
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       toast.error(error.message || "Something went wrong!");
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
//       {/* Left side */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <div className="text-xl sm:text-2xl my-3">
//           <Title text1="DELIVERY" text2="INFORMATION" />
//         </div>

//         <div className="flex gap-3">
//           <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
//           <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
//         </div>

//         <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
//         <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />

//         <div className="flex gap-3">
//           <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
//           <input required onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
//         </div>

//         <div className="flex gap-3">
//           <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
//           <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
//         </div>

//         <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
//       </div>

//       {/* Right side */}
//       <div className="mt-8">
//         <div className="mt-8 min-w-80">
//           <CartTotal />
//         </div>

//         <div className="mt-12">
//           <Title text1="PAYMENT" text2="METHOD" />

//           {/* Payment method selection */}
//           <div className="flex gap-3 flex-col lg:flex-row">
//             <div
//               onClick={() => setMethod("stripe")}
//               className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md transition-all duration-200 ${
//                 method === "stripe" ? "border-green-400" : "border-gray-300"
//               }`}
//             >
//               <p
//                 className={`w-4 h-4 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}
//               ></p>
//               <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
//             </div>

//             <div
//               onClick={() => setMethod("razorpay")}
//               className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md transition-all duration-200 ${
//                 method === "razorpay" ? "border-green-400" : "border-gray-300"
//               }`}
//             >
//               <p
//                 className={`w-4 h-4 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}
//               ></p>
//               <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
//             </div>

//             <div
//               onClick={() => setMethod("cod")}
//               className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md transition-all duration-200 ${
//                 method === "cod" ? "border-green-400" : "border-gray-300"
//               }`}
//             >
//               <p
//                 className={`w-4 h-4 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}
//               ></p>
//               <p className="text-gray-500 text-sm font-medium mx-4">
//                 Cash on delivery
//               </p>
//             </div>
//           </div>

//           <div className="w-full text-end mt-8">
//             <button
//               type="submit"
//               className="bg-black text-white px-16 py-3 text-sm"
//             >
//               PLACE ORDER
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Placeorder;

import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [method, setMethod] = useState("cod");

  // Destructure context fields
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  // Always get userId from localStorage so it's available after refresh
  const userId = localStorage.getItem("userId");

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Updates form data on input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle order form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Prepare order items, skipping size if not relevant
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemId));
            if (itemInfo) {
              // Assign size only if item's sizes exist and size is valid
              if (itemInfo.sizes && itemInfo.sizes.length > 0) {
                itemInfo.size = size;
              } else {
                itemInfo.size = undefined;
              }
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (!userId) {
        toast.error("Login required to place an order.");
        navigate("/login");
        return;
      }

      const amount = (typeof getCartAmount === "function" ? getCartAmount() : 0) + (delivery_fee || 0);

      let orderData = {
        address: formData,
        items: orderItems,
        amount,
        userId,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log(response.data);

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        // Implement other payment methods like stripe/razorpay if needed
        default:
          break;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left side - Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
        </div>

        <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
        <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
        </div>

        <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
      </div>

      {/* Right side - Cart Total and Payment Method */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          {/* Payment method selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md transition-all duration-200 ${
                method === "stripe" ? "border-green-400" : "border-gray-300"
              }`}
            >
              <p className={`w-4 h-4 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md transition-all duration-200 ${
                method === "razorpay" ? "border-green-400" : "border-gray-300"
              }`}
            >
              <p className={`w-4 h-4 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md transition-all duration-200 ${
                method === "cod" ? "border-green-400" : "border-gray-300"
              }`}
            >
              <p className={`w-4 h-4 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash on delivery
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
