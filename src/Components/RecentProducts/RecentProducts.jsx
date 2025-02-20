import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { UserContext } from "../../Context/UserContext";
import "./RecentProduct.css";

function RecentProducts({ product }) {
  const {
    title = "",
    imageCover = "",
    id = "",
    category = {},
    price = 0,
    ratingsAverage = 0,
  } = product || {};

  const { addToCart, isLoading } = useContext(CartContext);
  const { wishlist, addToWishlist, deleteWish } = useContext(WishlistContext);
  const { userData } = useContext(UserContext);
  const [isliked, setLiked] = useState(false);

  useEffect(() => {
    if (wishlist?.data) {
      const status = wishlist.data.some((item) => item._id === id);
      setLiked(status);
    }
  }, [wishlist, id]);

  function handletoggle() {
    const newliked = !isliked;
    if (newliked) {
      addToWishlist(id);
    } else {
      deleteWish(id);
    }
    setLiked(newliked);
  }

  return (
    <div className="product w-full sm:w-1/2 md:w-1/3 lg:w-1/5  ">
      <div className="bg-transparent px-3 py-3 relative shadow-md my-3 rounded-lg">
        <button
          className="rounded-full text-red-700 h-9 w-9 flex justify-center items-center absolute right-1 duration-500 top-1 text-2xl"
          onClick={() => handletoggle()}
        >
          <i
            className={`${
              isliked && userData ? "fa-solid" : "fa-regular"
            } fa-heart`}
          ></i>
        </button>

        <Link to={`/productDetails/${id}/${category.slug}`}>
          <div className="mx-auto flex justify-center">
            <img
              className="w-[250px] h-[250px] p-10 object-contain"
              src={imageCover}
              alt={title}
            />
          </div>

          <p className="text-green-600 mt-3 text-sm">
            {category.name || "Unknown"}
          </p>
          <h3 className="text-lg font-semibold">
            {title.split(" ").splice(0, 1).join(" ")}
          </h3>

          <div className="flex justify-between items-center mt-2">
            <p className="text-green-600 font-medium">{price} EGP</p>
            <div className="flex items-center text-yellow-500 text-sm">
              <i className="fa fa-star"></i>
              <span className="text-gray-600 ml-1">{ratingsAverage}</span>
            </div>
          </div>
        </Link>

        <button
          onClick={() => addToCart(id)}
          className="btn mt-3 bg-green-600 text-white w-full py-2 rounded-lg flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <i className="fa fa-spinner fa-spin text-sm"></i>
              <span className="text-lg ml-1">Loading...</span>
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}

export default RecentProducts;
