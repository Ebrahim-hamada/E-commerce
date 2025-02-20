import { useContext, useEffect } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import add from "../../assets/shopping-cart-add.png";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Scroll from "../Scroll/Scroll";
import { UserContext } from "../../Context/UserContext";

function Wishlist() {
  const { wishlist, getWishlist, deleteWish, loading } =
    useContext(WishlistContext);
  const { addToCart, isLoading } = useContext(CartContext);
  const { userName } = useContext(UserContext);

  Scroll();

  useEffect(() => {
    getWishlist();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-[90%] mx-auto">
      {Wishlist && wishlist?.data?.length > 0 ? (
        <>
          <h3 className="py-10 font-bold text-center text-3xl text-gray-500 dark:text-gray-500">
            Welcome <span className="text-emerald-500">{userName}</span> to your
            Cart
            <i className="fa-solid fa-cart-arrow-down text-emerald-500 ps-2 text-3xl"></i>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 p-5">
            {wishlist?.data?.map((item, index) => (
              <div key={index} className="product  ">
                <div className="bg-transparent px-3 py-3 relative shadow-md my-3 rounded-lg">
                    <button onClick={() => deleteWish(item.id)}>
                      <i className="fa fa-trash text-red-800 text-2xl"></i>
                    </button>
                  <Link to={`/productDetails/${item.id}/${wishlist}`}>
                    <div className="mx-auto  flex justify-center">
                      <img
                        className="w-[250px] h-[250px] p-7"
                        src={item.imageCover}
                        alt={item.title}
                      />
                    </div>

                    <p className="text-green-600 mt-3 text-sm">{item.name}</p>
                    <h3 className="text-lg font-semibold">
                      {item?.title.split(" ").slice(0, 2).join(" ")}
                    </h3>

                    <div className="flex justify-between items-center mt-2">
                      <p className="text-green-600 font-medium">
                        {item.price} EGP
                      </p>
                      <div className="flex items-center text-yellow-500 text-sm">
                        <i className="fa fa-star"></i>
                        <span className="text-gray-600 ml-1">
                          {item.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => addToCart(item)}
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
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center ">
          <div className="w-80">
            <img src={add} alt="" />
          </div>
          <h1 className="text-[#4cba68] text-4xl md:text-5xl font-semibold">
            Your Wishlist Is Empty
          </h1>
          <Link to="/">
            <button className="bg-[#4cba68] hover:bg-[#3e9754c7] text-white font-semibold px-10 py-3  rounded-lg my-5">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
