import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserContext);
  const headers = userData ? { token: userData } : "";

  async function addToWishlist(productId) {
    if (!headers) {
      toast.error("You need to be logged in to add products to the wishlist.");
      return;
    }
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/Wishlist",
        { productId },
        { headers }
      );
      getWishlist();
      toast.success("Added to wishlist successfully");
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error("Failed to add product to wishlist.");
    }
  }

  async function getWishlist() {
    if (!headers) return;

    setLoading(true);

    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      setWishlist(data);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error("Failed to retrieve wishlist items.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteWish(productId) {
    if (!headers) {
      toast.error("You need to be logged in to add products to the wishlist.");
      return;
    }

    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );

      setWishlist((prev) => ({
        ...prev,
        data: prev.data.filter((item) => item._id !== productId),
      }));

      toast.success("Deleted from wishlist successfully");
    } catch (error) {
      console.error("Error deleting product from wishlist:", error);
      toast.error("Failed to delete product from wishlist.");
    }
  }

  useEffect(() => {
    if (userData) getWishlist();
    else setWishlist(null);
  }, [userData]);

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        setWishlist,
        wishlist,
        getWishlist,
        loading,
        deleteWish,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
