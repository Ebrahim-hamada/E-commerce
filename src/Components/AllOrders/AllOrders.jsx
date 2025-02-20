import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Loading from "../Loading/Loading";
import { UserContext } from "../../Context/UserContext";
import Scroll from "../Scroll/Scroll";

function AllOrders() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState(null);
  const [showDetails, setShow] = useState(null);
  const { userId, userName } = useContext(UserContext);

  Scroll();

  async function getOrders() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setOrders(data);
    } catch (err) {
      setError(err.response.data.message || err.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleToggle(id) {
    setShow((showDetails) => (showDetails === id ? null : id));
  }

  useEffect(() => {
    if (userId) {
      getOrders();
    } else setLoading(true);
  }, [userId]);

  if (isLoading) return <Loading />;
  return (
    <div className="px-4 md:px-20 lg:px-40 ">
      <h3 className="mt-5 pt-3 font-bold text-center text-3xl text-gray-500 dark:text-gray-500">
        Welcome <span className="text-emerald-500">{userName}</span> to your
        Order
      </h3>
      {orders?.map((order, index) => (
        <div key={index} className="shadow-md shadow-emerald-300 my-10 w-full ">
          <div className=" p-10 flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between items-center ">
            <div>
              <h1 className="text-emerald-500 text-xl font-bold">
                Order Id: {order?.id}
              </h1>
              <p className=" font-semibold pb-2 text-gray-500">
                Order Date: {new Date(order?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="font-semibold text-gray-500">
              Delivery Status: {order?.isDelivered ? "Delivered" : "On The Way"}
            </p>
            <button
              onClick={() => handleToggle(order?.id)}
              className="bg-emerald-500 hover:bg-emerald-300 text-white px-4 py-2 rounded-md"
            >
              {showDetails === order?.id ? "Hide Details" : "Show Details"}
            </button>
          </div>
          {showDetails === order.id &&
            order?.cartItems?.map((item, index) => (
              <>
                <div
                  key={index}
                  className="flex flex-col md:flex-row text-center  items-center space-y-3 md:space-y-0 md:items-center justify-between py-5 p-5 sm:px-8 md:px-16"
                >
                  <div className="w-full flex flex-col sm:flex-row items-center space-x-3 space-y-2 sm:space-y-0">
                    <div className="w-[30%] md:w-[15%]">
                      <img
                        src={item?.product?.imageCover}
                        alt={item?.product?.title}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-emerald-500 font-semibold text-lg">
                        {item?.product?.title.split(" ").splice(0, 1).join(" ")}
                      </h3>
                      <h3 className="text-gray-500 font-semibold">
                        {item?.product?.category?.name}
                      </h3>
                      <div className="text-gray-500">
                        <span>Rating: </span>
                        <span>{item?.product.ratingsAverage}</span>
                        <i className="fa-solid fa-star text-yellow-400 ml-1"></i>{" "}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-xl whitespace-nowrap">
                      Price :{" "}
                      <span className="text-emerald-600">
                        {item?.price} EGP
                      </span>
                    </h3>
                    <h4 className="text-gray-500 font-semibold text-xl">
                      Quantity :{" "}
                      <span className="text-emerald-600">{item?.count}</span>
                    </h4>
                  </div>
                </div>

                <hr className="border-emerald-500 border-[1px] w-full" />
              </>
            ))}
        </div>
      ))}
    </div>
  );
}

export default AllOrders;
