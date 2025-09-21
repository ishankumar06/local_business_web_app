// import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = "$";
//   const delivery_fee = 10;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [products, setProducts] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

//   console.log(userId);
  
//   const navigate = useNavigate();

//   // Fetch products from backend on mount
//   useEffect(() => {
//     const getProductsData = async () => {
//       console.log("Backend URL ishan:", backendUrl);

//       try {
//         const response = await axios.get(`${backendUrl}/api/product/list`);
//         console.log(response.data);
//         if (response.data.success) {
//           setProducts(response.data.products);
//         } else {
//           toast.error(response.data.message || "Failed to fetch products");
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         toast.error("Error fetching products");
//       }
//     };
//     getProductsData();
//   }, [backendUrl]);

//   // Fetch user cart when token or userId changes
//   useEffect(() => {
//     const getUserCart = async (userToken, currentUserId) => {
//       if (!userToken || !currentUserId) {
//         console.warn("No user token or user ID provided, skipping cart fetch");
//         return;
//       }
//       console.log("Fetching cart with userId:", currentUserId, "and token:", userToken);

//       try {
//        const response = await axios.post(
//   `${backendUrl}/api/cart/get`,
//   { userId: currentUserId },
//   { headers: { Authorization: `Bearer ${userToken}` } }
// );


//         console.log(response.data)

//         if (response.data && response.data.success) {
//           if (response.data.cartData) {
//             setCartItems(response.data.cartData);
//           } else {
//             setCartItems({});
//           }
//         } else {
//           toast.error(response.data?.message || "Failed to fetch cart or cart is empty");
//           setCartItems({});
//         }
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//         if (error.response) {
//           // Handle unauthorized state by clearing token and userId and redirecting to login
//           if (error.response.status === 401) {
//             setToken("");
//             setUserId("");
//             localStorage.removeItem("token");
//             localStorage.removeItem("userId");
//             toast.error("Session expired. Please log in again.");
//             navigate("/login");
//           } else {
//             toast.error(error.response.data?.message || "Error fetching cart");
//           }
//         } else {
//           toast.error("Network error or no response from server");
//         }
//       }
//     };

//     getUserCart(token, userId);
//   }, [token, userId, backendUrl, navigate]);

//   // Add item to cart with size and re-fetch cart after successful backend update
//   const addToCart = async (itemId, size) => {
//     if (!size) {
//       toast.error("Select Product Size");
//       return;
//     }

//     // Optimistically update the cart locally
//     const updatedCart = structuredClone(cartItems);
//     if (updatedCart[itemId]) {
//       if (updatedCart[itemId][size]) {
//         updatedCart[itemId][size] += 1;
//       } else {
//         updatedCart[itemId][size] = 1;
//       }
//     } else {
//       updatedCart[itemId] = { [size]: 1 };
//     }
//     setCartItems(updatedCart);

//     if (token && userId) {
//       try {
//         await axios.post(
//           `${backendUrl}/api/cart/add`,
//           { userId, itemId, size },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         // Fetch latest cart from backend to sync state
//         const cartResponse = await axios.post(
//           `${backendUrl}/api/cart/get`,
//           { userId },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (cartResponse.data && cartResponse.data.success) {
//           setCartItems(cartResponse.data.cartData || {});
//         }
//       } catch (error) {
//         console.error("Error adding to cart:", error);
//         toast.error("Failed to add item to cart");
//       }
//     }
//   };

//   // Count total quantity of items in cart
//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const itemId in cartItems) {
//       for (const size in cartItems[itemId]) {
//         totalCount += cartItems[itemId][size];
//       }
//     }
//     return totalCount;
//   };

//   // Update quantity for product and size in cart and re-fetch cart after update
//   const updateQuantity = async (itemId, size, quantity) => {
//     const updatedCart = structuredClone(cartItems);
//     if (updatedCart[itemId] && updatedCart[itemId][size] !== undefined) {
//       updatedCart[itemId][size] = quantity;
//       setCartItems(updatedCart);

//       if (token && userId) {
//         try {
//           await axios.post(
//             `${backendUrl}/api/cart/update`,
//             { userId, itemId, size, quantity },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           // Fetch latest cart from backend to sync state
//           const cartResponse = await axios.post(
//             `${backendUrl}/api/cart/get`,
//             { userId },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           if (cartResponse.data && cartResponse.data.success) {
//             setCartItems(cartResponse.data.cartData || {});
//           }
//         } catch (error) {
//           console.error("Error updating cart:", error);
//           toast.error("Failed to update cart");
//         }
//       }
//     }
//   };

//   // Calculate total cart amount based on quantity and price
//   const getCartAmount = () => {
//   let totalAmount = 0;
//   for (const itemId in cartItems) {
//     const itemInfo = products.find((p) => String(p._id) === String(itemId));
//     if (!itemInfo) continue;

//     for (const size in cartItems[itemId]) {
//       totalAmount += itemInfo.price * cartItems[itemId][size];
//     }
//   }
//   return totalAmount;
// };


//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     addToCart,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//     backendUrl,
//     setToken,
//     token,
//     setCartItems,
//     userId,
//     setUserId,
//   };

//   return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
// };

// export default ShopContextProvider;

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 120;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  const navigate = useNavigate();

  // Fetch products from backend on mount
  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/list`);
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          toast.error(response.data.message || "Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      }
    };
    getProductsData();
  }, [backendUrl]);

  // Fetch user cart when token or userId changes
  useEffect(() => {
    const getUserCart = async (userToken, currentUserId) => {
      if (!userToken || !currentUserId) {
        console.warn("No user token or user ID provided, skipping cart fetch");
        return;
      }

      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/get`,
          { userId: currentUserId },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );

        if (response.data && response.data.success) {
          setCartItems(response.data.cartData || {});
        } else {
          toast.error(response.data?.message || "Failed to fetch cart or cart is empty");
          setCartItems({});
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        if (error.response) {
          if (error.response.status === 401) {
            setToken("");
            setUserId("");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            toast.error("Session expired. Please log in again.");
            navigate("/login");
          } else {
            toast.error(error.response.data?.message || "Error fetching cart");
          }
        } else {
          toast.error("Network error or no response from server");
        }
      }
    };

    getUserCart(token, userId);
  }, [token, userId, backendUrl, navigate]);

  // Add item to cart with size (defaulting size to "default" if missing)
  const addToCart = async (itemId, size) => {
    // Use "default" if size is missing or empty string
    const sizeKey = size && size.trim() !== "" ? size : "default";

    // Optimistically update cart locally
    const updatedCart = structuredClone(cartItems);
    if (updatedCart[itemId]) {
      if (updatedCart[itemId][sizeKey]) {
        updatedCart[itemId][sizeKey] += 1;
      } else {
        updatedCart[itemId][sizeKey] = 1;
      }
    } else {
      updatedCart[itemId] = { [sizeKey]: 1 };
    }
    setCartItems(updatedCart);

    if (token && userId) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { userId, itemId, size: sizeKey },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Sync latest cart from backend
        const cartResponse = await axios.post(
          `${backendUrl}/api/cart/get`,
          { userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (cartResponse.data && cartResponse.data.success) {
          setCartItems(cartResponse.data.cartData || {});
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart");
      }
    }
  };

  // Count total quantity of items in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  // Update quantity for product and size in cart and re-fetch cart after update
  const updateQuantity = async (itemId, size, quantity) => {
    const updatedCart = structuredClone(cartItems);
    if (updatedCart[itemId] && updatedCart[itemId][size] !== undefined) {
      updatedCart[itemId][size] = quantity;
      setCartItems(updatedCart);

      if (token && userId) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/update`,
            { userId, itemId, size, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const cartResponse = await axios.post(
            `${backendUrl}/api/cart/get`,
            { userId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (cartResponse.data && cartResponse.data.success) {
            setCartItems(cartResponse.data.cartData || {});
          }
        } catch (error) {
          console.error("Error updating cart:", error);
          toast.error("Failed to update cart");
        }
      }
    }
  };

  // Calculate total cart amount based on quantity and price
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => String(p._id) === String(itemId));
      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        totalAmount += itemInfo.price * cartItems[itemId][size];
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems,
    userId,
    setUserId,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;

