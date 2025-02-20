import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import Scroll from "../Scroll/Scroll";

function ProductDetails() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { addToCart, loadingProduct } = useContext(CartContext);

  Scroll();

  async function getDetails() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProduct(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <Loading />;
  if (error) console.log(error);

  return (
    <>
      <div className="flex items-center w-[90%] mx-auto md:space-x-10 p-5 flex-wrap space-y-4 sm:space-y-0">
        <div className="w-full sm:w-3/11 sm:me-5 rounded-md pb-10">
          {product && product?.images?.length > 1 ? (
            <Slider {...settings}>
              {product.images.map((src, index) => (
                <img src={src} alt="" key={index} />
              ))}
            </Slider>
          ) : (
            <img src={product?.imageCover} alt="" />
          )}
        </div>
        <div className="space-y-3 w-full sm:w-8/12">
          <h4 className="font-semibold text-3xl text-green-600">
            {product?.title.split(" ").slice(0, 2).join(" ")}
          </h4>
          <h5 className="">
            {product?.description.split(" ").slice(0, 5).join(" ")}
          </h5>
          <div className="flex  justify-between items-center">
            <h3 className=" text-green-600">{product?.price} EGP</h3>
            <h3>
              <i className="fa-solid fa-star text-yellow-400">
                <span className="text-gray-400">{product?.ratingsAverage}</span>
              </i>
            </h3>
          </div>
          <h4 className="font-semibold">Quantity : {product?.quantity}</h4>
          <button
            className="w-full bg-green-600 py-2 hover:bg-green-500 rounded-md text-white group-hover:bottom-2 duration-500"
            onClick={() => addToCart(product?.id)}
          >
            {loadingProduct === product?.id ? (
              <>
                <i className="fa fa-spinner fa-spin text-sm"></i>
                <span className="text-lg ml-1">Loading...</span>
              </>
            ) : (
              <span>
                <i className="fa-solid fa-cart-shopping me-2"></i>Add to Cart
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
