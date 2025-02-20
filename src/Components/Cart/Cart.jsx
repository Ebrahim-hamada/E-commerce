import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Scroll from "../Scroll/Scroll";
import add from "../../assets/shopping-cart-add.png";
import { UserContext } from "./../../Context/UserContext";
import "./Cart.css";

function Cart() {
  const {
    cart,
    numOfCartItems,
    deleteCart,
    updateCount,
    isLoading,
    getCart,
    ClearAllProduct,
  } = useContext(CartContext);

  const { userName } = useContext(UserContext);
  Scroll();

  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) return <Loading />;

  const products = cart?.data?.products || [];
  const total = cart?.data?.totalCartPrice || 0;

  return (
    <div className="p-5">
      {products.length > 0 ? (
        <>
          <h3 className="mt-5 pt-3 font-bold text-center text-3xl text-gray-500 dark:text-gray-500">
            Welcome <span className="text-emerald-500">{userName}</span> to your Cart
            <i className="fa-solid fa-cart-arrow-down text-emerald-500 ps-2 text-3xl"></i>
          </h3>

          <div className="w-[90%] mx-auto md:flex md:items-start md:pt-10">
            {/* ملخص السلة */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center">
              <img className="w-[25%] h-[50%]" src={add} alt="shoppingCart" />

              <div className="orderPayment my-5 text-gray-500 text-center">
                <h2 className="text-center py-3 text-black text-2xl font-bold">
                  Orders
                </h2>

                <h5 className="pt-3 px-3 pb-2 text-lg">
                  Products : 
                  <span className="text-green-600"> {numOfCartItems} items</span>
                </h5>

                <h5 className="px-3 text-lg">
                  Total Price :
                  <span className="text-green-600"> {total} EGP</span>
                </h5>

                <Link to={"/checkout"}>
                  <button className="border border-green-600 text-green-600 font-bold mt-3 w-3/4 mx-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition">
                    CheckOut
                  </button>
                </Link>

                <button
                  onClick={() => ClearAllProduct()}
                  className="border border-red-600 text-red-600 font-bold my-3 w-3/4 mx-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  Clear All Product
                </button>
              </div>
            </div>
          </div>

          <div>
            {/* قائمة المنتجات */}
            <div className="w-full md:pt-10">
              {products.map((product, index) => (
                <div key={index} className="flex items-center border-b py-4">
                  {/* صورة المنتج */}
                  <div className="w-[150px] text-center">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="imgCart w-[100%] h-[100px] rounded-2xl"
                    />
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="w-full space-y-2 md:ps-4 flex flex-col">
                    <div className="w-[20%] whitespace-nowrap">
                      <h6 className="text-emerald-600 font-bold">
                        {product?.product?.title
                          ?.split(" ")
                          .splice(0, 2)
                          .join(" ")}
                      </h6>
                      <h6 className="text-gray-500 dark:text-gray-500 py-1.5">
                        Price:
                        <span className="text-emerald-600 font-bold">
                          {product.price} EGP
                        </span>
                      </h6>

                      <button
                        onClick={() => deleteCart(product.product._id)}
                        className="px-3 py-1.5 text-red-700 border border-red-700  rounded-lg hover:bg-red-700 hover:text-white whitespace-nowrap"
                      >
                        <i className="fa-solid fa-trash-can text-danger pe-1"></i>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* أزرار التحكم في العدد */}
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateCount(product.product._id, product.count + 1)
                      }
                      className="text-emerald-500 border border-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-500 hover:text-white"
                    >
                      +
                    </button>
                    <h4 className="text-gray-500 dark:text-gray-500 px-3 font-bold">
                      {product.count}
                    </h4>
                    <button
                      onClick={() =>
                        updateCount(product.product._id, product.count - 1)
                      }
                      className="text-red-700 border border-red-700 px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // في حالة السلة الفارغة
        <div className="flex flex-col items-center">
          <div className="w-80">
            <img src={add} alt="Empty Cart" />
          </div>
          <h1 className="text-[#4cba68] text-4xl md:text-5xl font-semibold">
            Your Cart Is Empty
          </h1>
          <Link to="/">
            <button className="bg-[#4cba68] hover:bg-[#3e9754c7] text-white font-semibold px-10 py-3 rounded-lg my-5">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
