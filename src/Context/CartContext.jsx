import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [loadingProduct, setLoadingPro] = useState(null);
  const [cart, setCart] = useState(null);
  const [cartOwner, setCartOwner] = useState(null);
  const { userData } = useContext(UserContext);
  const headers = userData ? { token: userData } : "";

  /* add to Cart */
  async function addToCart(productId) {
    if (!headers) {
      toast.error("You need to be logged in to add products to the cart.");
      return;
    }
    setLoading(true);
    setLoadingPro(productId);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );
      setCart(data);
      setNumOfCartItems(data.numOfCartItems);
      toast.success("Added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    } finally {
      setLoading(false);
      setLoadingPro(null);
    }
  }

  /* get Cart */
  async function getCart() {
    if (!headers) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      setCart(data);
      setCartOwner(data.data.cartOwner);
      setNumOfCartItems(data.numOfCartItems);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to retrieve cart items.");
    } finally {
      setLoading(false);
    }
  }

  /* delete Cart */
  async function deleteCart(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
      setCart(data);
      setNumOfCartItems(data.numOfCartItems);
      toast.success("Deleted from cart successfully");
    } catch (error) {
      console.error("Error deleting product from cart:", error);
      toast.error("Failed to delete product from cart.");
    }
  }

  /* updateCount*/
  async function updateCount(productId, count) {
    if (count > 0) {
      try {
        const { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          { count },
          { headers }
        );
        setCart(data);
        setNumOfCartItems(data.numOfCartItems);
        toast.success("Item to updated successfully.");
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      deleteCart(productId);
    }
  }

  /* checkOut online*/
  const checkOut = async (shippingAddress) => {
    try {
      setLoading(true);
        const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data?._id}?url=${window.location.origin}`,
        { shippingAddress },
        { headers }
       );

      if (data?.status === "success") {
        toast.success("Redirecting to payment...", { duration: 2000 });
        window.location.href = data.session.url; 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed", {
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  /* checkOut cash*/
  const cashPayment = async (shippingAddress) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.data?._id}`,
        { shippingAddress },
        { headers }
      );
      if (data?.status === "success") {
        toast.success("Order placed successfully with cash on delivery!", {
          duration: 2000,
        });
      } else {
        toast.error(data?.message || "Failed to place cash order.", {
          duration: 2000,
        });
      }
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed", {
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  /* Clear Product*/
  const ClearAllProduct = async () => {
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart/",
        {
          headers: {
            token: localStorage.getItem("userData"),
          },
        }
      );

      if (data.message) {
        setCart(null);
        setNumOfCartItems(0);
        toast.success(data.message, {
          duration: 2000,
          className: "text-emerald-700",
          iconTheme: {
            primary: "#059669",
            secondary: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ ما!", {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (userData) getCart();
    else setCart(null);
  }, [userData]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        setCart,
        cart,
        getCart,
        isLoading,
        deleteCart,
        updateCount,
        ClearAllProduct,
        numOfCartItems,
        loadingProduct,
        checkOut,
        cashPayment,
        cartOwner,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
